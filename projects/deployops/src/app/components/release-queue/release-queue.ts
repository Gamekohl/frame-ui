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
import { FrDropdownMenuModule } from '@frame-ui-ng/components/dropdown-menu';
import { FrInputModule } from '@frame-ui-ng/components/input';
import { FrPaginationModule } from '@frame-ui-ng/components/pagination';
import { FrTableModule } from '@frame-ui-ng/components/table';
import { FrTooltipDirective } from '@frame-ui-ng/components/tooltip';
import { NgIcon } from '@ng-icons/core';
import { startWith, Subject, switchMap } from 'rxjs';
import { ApiService, DeployopsDashboardData, Release } from '../../services/api.service';
import { Header } from '../../shared/header/header';
import { ReleaseDetailsComponent } from '../release-details/release-details';

@Component({
  selector: 'app-release-queue',
  imports: [
    FrAvatarModule,
    FrBadgeModule,
    FrButtonModule,
    FrCardModule,
    FrCheckboxModule,
    FrDropdownMenuModule,
    FrInputModule,
    FrPaginationModule,
    FrTableModule,
    FrTooltipDirective,
    NgIcon,
    NgStyle,
    ReleaseDetailsComponent,
    Header,
  ],
  templateUrl: './release-queue.html',
  styleUrl: './release-queue.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReleaseQueue implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly api = inject(ApiService);

  readonly displayedColumns = [
    'select',
    'release',
    'service',
    'environment',
    'status',
    'progress',
    'team',
    'updatedAt',
    'actions',
  ];

  readonly refresh$ = new Subject<void>();

  readonly isInitialLoad = signal<boolean>(true);
  readonly data = signal<DeployopsDashboardData | null>(null);
  readonly selectedRelease = signal<Release | null>(null);
  readonly currentPage = signal(1);
  readonly perPage = signal(10);
  readonly totalPages = computed(() => this.data()?.releasePagination.pages ?? 1);
  readonly totalItems = computed(() => this.data()?.releasePagination.items ?? 0);
  readonly pageStart = computed(() => {
    if (!this.totalItems()) return 0;

    return (this.currentPage() - 1) * this.perPage() + 1;
  });
  readonly pageEnd = computed(() =>
    Math.min(this.currentPage() * this.perPage(), this.totalItems()),
  );

  ngOnInit(): void {
    this.refresh$
      .asObservable()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        startWith(true),
        switchMap(() => this.api.getDashboard(this.currentPage(), this.perPage())),
      )
      .subscribe({
        next: (data) => {
          this.data.set(data);

          if (this.isInitialLoad()) {
            this.selectedRelease.set(data.releases[0] ?? null);
            this.isInitialLoad.set(false);
          }
        },
      });
  }

  releaseBadge(release: Release): 'success' | 'secondary' | 'destructive' {
    if (release.status === 'blocked') {
      return 'destructive';
    }

    return release.status === 'healthy' ? 'success' : 'secondary';
  }

  statusLabel(release: Release): string {
    const labels: Record<Release['status'], string> = {
      blocked: 'Blocked',
      deploying: 'Deploying',
      healthy: 'Healthy',
      'in-queue': 'In Queue',
    };

    return labels[release.status];
  }

  visibleTeam(release: Release): string[] {
    return (release.team ?? []).slice(0, 3);
  }

  hiddenTeamCount(release: Release): number {
    return Math.max(0, (release.team ?? []).length - 3);
  }

  openReleaseDetails(release: Release): void {
    this.selectedRelease.set(release);
  }

  closeReleaseDetails(): void {
    this.selectedRelease.set(null);
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
}
