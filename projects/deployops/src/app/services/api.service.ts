import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

export interface DeployopsSummary {
  healthyServices: number;
  activeDeployments: number;
  changeFailureRate: number;
  leadTimeMinutes: number;
}

export interface Release {
  id: string;
  release: string;
  version: string;
  service: string;
  environment: string;
  status: 'in-queue' | 'deploying' | 'healthy' | 'blocked';
  progress: number;
  team: string[];
  updatedAt: string;
}

export type DeploymentStatus = 'queued' | 'running' | 'succeeded' | 'failed' | 'rolled-back' | 'paused';

export interface DeploymentSummary {
  activeDeployments: number;
  successRate: number;
  avgDurationMinutes: number;
  rollbackRate: number;
  statusCounts: {
    all: number;
    running: number;
    succeeded: number;
    failed: number;
    rolledBack: number;
    queued: number;
  };
}

export interface Deployment {
  id: string;
  deployment: string;
  version: string;
  service: string;
  environment: string;
  strategy: 'Canary' | 'Blue-green' | 'Rolling' | 'Recreate';
  status: DeploymentStatus;
  progress: number;
  startedAt: string;
  duration: string;
  initiatedBy: {
    name: string;
    avatarUrl: string;
  };
}

export interface DeploymentDetails {
  id: string;
  deploymentId: string;
  deployment: string;
  version: string;
  service: string;
  environment: string;
  strategy: Deployment['strategy'];
  status: DeploymentStatus;
  startedAt: string;
  initiatedBy: {
    name: string;
    avatarUrl: string;
  };
  currentPhase: string;
  description: string;
  health: {
    errorRate: string;
    latencyP95: string;
    instances: string;
  };
  checks: Array<{
    label: string;
    status: 'passed' | 'running' | 'healthy' | 'failed' | 'pending';
  }>;
}

export interface ReleaseApproval {
  name: string;
  team: string;
  avatarUrl: string;
  status: 'approved' | 'pending';
}

export interface ReleaseDetails {
  id: string;
  releaseId: string;
  release: string;
  version: string;
  service: string;
  environment: string;
  status: Release['status'];
  releaseType: string;
  createdBy: {
    name: string;
    avatarUrl: string;
  };
  createdAt: string;
  description: string;
  changeSummary: {
    commits: number;
    filesChanged: number;
    testResults: 'Passed' | 'Failed';
    qualityGate: 'Passed' | 'Failed';
  };
  approvals: ReleaseApproval[];
}

export interface Incident {
  id: string;
  title: string;
  severity: 'low' | 'medium' | 'high';
  service: string;
  openedAt: string;
}

export interface TeamMember {
  id: string;
  email: string;
  avatarUrl: string;
}

export interface PaginatedResponse<T> {
  first: number;
  prev: number | null;
  next: number | null;
  last: number;
  pages: number;
  items: number;
  data: T[];
}

export type ReleasePagination = Omit<PaginatedResponse<Release>, 'data'>;
export type DeploymentPagination = Omit<PaginatedResponse<Deployment>, 'data'>;

export interface DeployopsDashboardData {
  summary: DeployopsSummary;
  releases: Release[];
  releasePagination: ReleasePagination;
  incidents: Incident[];
  team: TeamMember[];
}

export interface DeploymentsData {
  summary: DeploymentSummary;
  deployments: Deployment[];
  deploymentPagination: DeploymentPagination;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:4300';

  getDashboard(page = 1, perPage = 10): Observable<DeployopsDashboardData> {
    return forkJoin({
      summary: this.http.get<DeployopsSummary>(`${this.apiUrl}/summary`),
      releasePage: this.http.get<PaginatedResponse<Release>>(`${this.apiUrl}/releases`, {
        params: {
          _page: page,
          _per_page: perPage,
        },
      }),
      incidents: this.http.get<Incident[]>(`${this.apiUrl}/incidents`),
      team: this.http.get<TeamMember[]>(`${this.apiUrl}/team`),
    }).pipe(
      map(({ releasePage, ...dashboardData }) => {
        const { data, ...releasePagination } = releasePage;

        return {
          ...dashboardData,
          releases: data,
          releasePagination,
        };
      }),
    );
  }

  getDeployments(page = 1, perPage = 10): Observable<DeploymentsData> {
    return forkJoin({
      summary: this.http.get<DeploymentSummary>(`${this.apiUrl}/deploymentSummary`),
      deploymentPage: this.http.get<PaginatedResponse<Deployment>>(`${this.apiUrl}/deployments`, {
        params: {
          _page: page,
          _per_page: perPage,
        },
      }),
    }).pipe(
      map(({ deploymentPage, summary }) => {
        const { data, ...deploymentPagination } = deploymentPage;

        return {
          summary,
          deployments: data,
          deploymentPagination,
        };
      }),
    );
  }

  deploymentDetails(deploymentId: string): Observable<DeploymentDetails> {
    return this.http.get<DeploymentDetails>(`${this.apiUrl}/deploymentDetails/${deploymentId}`);
  }

  releaseDetails(releaseId: string): Observable<ReleaseDetails> {
    return this.http.get<ReleaseDetails>(`${this.apiUrl}/releaseDetails/${releaseId}`);
  }
}
