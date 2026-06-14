import { NgStyle } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FrAvatarModule } from '@frame-ui-ng/components/avatar';
import { FrBadgeModule } from '@frame-ui-ng/components/badge';
import { FrButtonModule } from '@frame-ui-ng/components/button';
import { FrCardModule } from '@frame-ui-ng/components/card';
import { FrCheckboxModule } from '@frame-ui-ng/components/checkbox';
import { FrConfirmModalModule } from '@frame-ui-ng/components/confirm-modal';
import { FrDropdownMenuModule } from '@frame-ui-ng/components/dropdown-menu';
import { FrEmptyModule } from '@frame-ui-ng/components/empty';
import { FrPaginationModule } from '@frame-ui-ng/components/pagination';
import { FrProgressModule } from '@frame-ui-ng/components/progress';
import { FrSeparatorModule } from '@frame-ui-ng/components/separator';
import { FrSkeletonModule } from '@frame-ui-ng/components/skeleton';
import { FrTableModule } from '@frame-ui-ng/components/table';
import { FrTabsModule } from '@frame-ui-ng/components/tabs';
import { FrTooltipDirective } from '@frame-ui-ng/components/tooltip';
import { NgIcon } from '@ng-icons/core';
import { startWith, Subject, switchMap } from 'rxjs';
import {
  ApiService,
  Deployment,
  DeploymentStatus,
  DeploymentsData,
} from '../../services/api.service';
import { Header } from '../../shared/header/header';
import { DeploymentDetailsComponent } from './deployment-details/deployment-details';

type DeploymentFilter = 'all' | DeploymentStatus;

@Component({
  selector: 'app-deployments',
  imports: [
    FrAvatarModule,
    FrBadgeModule,
    FrButtonModule,
    FrCardModule,
    FrCheckboxModule,
    FrConfirmModalModule,
    FrDropdownMenuModule,
    FrEmptyModule,
    FrPaginationModule,
    FrProgressModule,
    FrSeparatorModule,
    FrSkeletonModule,
    FrTableModule,
    FrTabsModule,
    FrTooltipDirective,
    DeploymentDetailsComponent,
    Header,
    NgIcon,
    NgStyle,
  ],
  templateUrl: './deployments.html',
  styleUrl: './deployments.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Deployments implements OnInit {
  private readonly api = inject(ApiService);
  private readonly destroyRef = inject(DestroyRef);

  readonly displayedColumns = [
    'select',
    'deployment',
    'service',
    'environment',
    'status',
    'startedAt',
    'duration',
    'initiatedBy',
    'actions',
  ];

  readonly refresh$ = new Subject<void>();
  readonly data = signal<DeploymentsData | null>(null);
  readonly selectedDeployment = signal<Deployment | null>(null);
  readonly currentPage = signal(1);
  readonly perPage = signal(10);
  readonly selectedFilter = signal<DeploymentFilter>('all');
  readonly totalPages = computed(() => this.data()?.deploymentPagination.pages ?? 1);
  readonly totalItems = computed(() => this.data()?.deploymentPagination.items ?? 0);
  readonly pageStart = computed(() => {
    if (!this.totalItems()) return 0;

    return (this.currentPage() - 1) * this.perPage() + 1;
  });
  readonly pageEnd = computed(() =>
    Math.min(this.currentPage() * this.perPage(), this.totalItems()),
  );
  readonly filteredDeployments = computed(() => {
    const deployments = this.data()?.deployments ?? [];
    const filter = this.selectedFilter();

    return filter === 'all'
      ? deployments
      : deployments.filter((deployment) => deployment.status === filter);
  });

  ngOnInit(): void {
    this.refresh$
      .asObservable()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        startWith(true),
        switchMap(() => this.api.getDeployments(this.currentPage(), this.perPage())),
      )
      .subscribe({
        next: (data) => {
          this.data.set(data);
          this.selectDeployment(data.deployments[0] ?? null);
        },
      });
  }

  setFilter(filter: string | null): void {
    if (!this.isDeploymentFilter(filter)) {
      return;
    }

    this.selectedFilter.set(filter);
    //this.selectDeployment(this.filteredDeployments()[0] ?? null);
  }

  selectDeployment(deployment: Deployment | null): void {
    this.selectedDeployment.set(deployment);
  }

  refreshData(): void {
    this.refresh$.next();
  }

  goToPage(page: number): void {
    if (page === this.currentPage()) {
      return;
    }

    this.currentPage.set(page);
    this.refreshData();
  }

  statusLabel(status: DeploymentStatus): string {
    const labels: Record<DeploymentStatus, string> = {
      failed: 'Failed',
      paused: 'Paused',
      queued: 'Queued',
      running: 'Running',
      succeeded: 'Succeeded',
      'rolled-back': 'Rolled back',
    };

    return labels[status];
  }

  statusBadge(status: DeploymentStatus): 'success' | 'secondary' | 'destructive' {
    if (status === 'succeeded') return 'success';
    if (status === 'failed' || status === 'rolled-back') return 'destructive';

    return 'secondary';
  }

  showProgress(deployment: Deployment): boolean {
    return deployment.status === 'running' || deployment.status === 'queued' || deployment.status === 'paused';
  }

  private isDeploymentFilter(value: string | null): value is DeploymentFilter {
    return value !== null && ['all', 'queued', 'running', 'succeeded', 'failed', 'rolled-back', 'paused'].includes(value);
  }
}
