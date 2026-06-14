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
export type ServiceStatus = 'healthy' | 'degraded' | 'incident' | 'maintenance';
export type EnvironmentStatus = 'healthy' | 'warming' | 'degraded' | 'locked';
export type EnvironmentGateStatus = 'passed' | 'running' | 'blocked' | 'scheduled';

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
  checks: DeploymentDetailCheck[];
}

export interface DeploymentDetailCheck {
  label: string;
  status: 'passed' | 'running' | 'healthy' | 'failed' | 'pending';
}

export interface ServiceSummary {
  totalServices: number;
  healthyServices: number;
  degradedServices: number;
  incidentServices: number;
  avgLatencyP95: string;
  statusCounts: {
    all: number;
    healthy: number;
    degraded: number;
    incident: number;
    maintenance: number;
  };
}

export interface ServiceOwner {
  name: string;
  team: string;
  avatarUrl: string;
}

export interface Service {
  id: string;
  name: string;
  displayName: string;
  environment: string;
  status: ServiceStatus;
  tier: 'Tier 1' | 'Tier 2' | 'Tier 3';
  runtime: string;
  version: string;
  uptime: string;
  latencyP95: string;
  errorRate: string;
  instances: string;
  owner: ServiceOwner;
  lastDeployment: string;
  dependencies: number;
}

export interface ServiceDetails {
  id: string;
  serviceId: string;
  name: string;
  displayName: string;
  environment: string;
  status: ServiceStatus;
  tier: Service['tier'];
  runtime: string;
  version: string;
  region: string;
  repository: string;
  description: string;
  owner: ServiceOwner;
  health: {
    uptime: string;
    latencyP95: string;
    errorRate: string;
    saturation: string;
  };
  slo: {
    availability: string;
    target: string;
    errorBudgetRemaining: string;
  };
  dependencies: Array<{
    name: string;
    status: ServiceStatus;
  }>;
  alerts: Array<{
    title: string;
    severity: 'low' | 'medium' | 'high';
    openedAt: string;
  }>;
}

export interface EnvironmentSummary {
  totalEnvironments: number;
  protectedEnvironments: number;
  promotionReady: number;
  activeReleases: number;
  statusCounts: {
    healthy: number;
    warming: number;
    degraded: number;
    locked: number;
  };
}

export interface DeployEnvironment {
  id: string;
  name: string;
  slug: string;
  stage: 'Development' | 'Quality' | 'Staging' | 'Production' | 'Preview';
  status: EnvironmentStatus;
  description: string;
  owner: ServiceOwner;
  regionCount: number;
  serviceCount: number;
  activeRelease: string;
  readiness: {
    passed: number;
    total: number;
  };
  drift: string;
  capacityHeadroom: number;
  dataFreshness: string;
  nextWindow: string;
  protected: boolean;
}

export interface EnvironmentDetails {
  id: string;
  environmentId: string;
  name: string;
  slug: string;
  status: EnvironmentStatus;
  purpose: string;
  owner: ServiceOwner;
  controls: {
    deployPolicy: string;
    approvalsRequired: string;
    freezeWindow: string;
    dataPolicy: string;
  };
  regions: Array<{
    name: string;
    status: EnvironmentStatus;
    capacity: string;
    latencyP95: string;
  }>;
  readiness: Array<{
    label: string;
    status: EnvironmentGateStatus;
    description: string;
  }>;
  releaseChannels: Array<{
    name: string;
    version: string;
    state: EnvironmentGateStatus;
  }>;
  accessGroups: string[];
  recentActivity: Array<{
    title: string;
    time: string;
    actor: string;
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
export type ServicePagination = Omit<PaginatedResponse<Service>, 'data'>;

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

export interface ServicesData {
  summary: ServiceSummary;
  services: Service[];
  servicePagination: ServicePagination;
}

export interface EnvironmentsData {
  summary: EnvironmentSummary;
  environments: DeployEnvironment[];
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

  getServices(page = 1, perPage = 10): Observable<ServicesData> {
    return forkJoin({
      summary: this.http.get<ServiceSummary>(`${this.apiUrl}/serviceSummary`),
      servicePage: this.http.get<PaginatedResponse<Service>>(`${this.apiUrl}/services`, {
        params: {
          _page: page,
          _per_page: perPage,
        },
      }),
    }).pipe(
      map(({ servicePage, summary }) => {
        const { data, ...servicePagination } = servicePage;

        return {
          summary,
          services: data,
          servicePagination,
        };
      }),
    );
  }

  getEnvironments(): Observable<EnvironmentsData> {
    return forkJoin({
      summary: this.http.get<EnvironmentSummary>(`${this.apiUrl}/environmentSummary`),
      environments: this.http.get<DeployEnvironment[]>(`${this.apiUrl}/environments`),
    });
  }

  deploymentDetails(deploymentId: string): Observable<DeploymentDetails> {
    return this.http.get<DeploymentDetails>(`${this.apiUrl}/deploymentDetails/${deploymentId}`);
  }

  releaseDetails(releaseId: string): Observable<ReleaseDetails> {
    return this.http.get<ReleaseDetails>(`${this.apiUrl}/releaseDetails/${releaseId}`);
  }

  serviceDetails(serviceId: string): Observable<ServiceDetails> {
    return this.http.get<ServiceDetails>(`${this.apiUrl}/serviceDetails/${serviceId}`);
  }

  environmentDetails(environmentId: string): Observable<EnvironmentDetails> {
    return this.http.get<EnvironmentDetails>(`${this.apiUrl}/environmentDetails/${environmentId}`);
  }
}
