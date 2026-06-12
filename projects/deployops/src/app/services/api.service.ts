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

export interface DeployopsDashboardData {
  summary: DeployopsSummary;
  releases: Release[];
  releasePagination: ReleasePagination;
  incidents: Incident[];
  team: TeamMember[];
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

  releaseDetails(releaseId: string): Observable<ReleaseDetails> {
    return this.http.get<ReleaseDetails>(`${this.apiUrl}/releaseDetails/${releaseId}`);
  }
}
