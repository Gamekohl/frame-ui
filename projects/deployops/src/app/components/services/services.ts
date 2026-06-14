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
import { FrDropdownMenuModule } from '@frame-ui-ng/components/dropdown-menu';
import { FrEmptyModule } from '@frame-ui-ng/components/empty';
import { FrHoverCardModule } from '@frame-ui-ng/components/hover-card';
import { FrPaginationModule } from '@frame-ui-ng/components/pagination';
import { FrSkeletonModule } from '@frame-ui-ng/components/skeleton';
import { FrTabsModule } from '@frame-ui-ng/components/tabs';
import { FrTooltipDirective } from '@frame-ui-ng/components/tooltip';
import { NgIcon } from '@ng-icons/core';
import { Subject, startWith, switchMap } from 'rxjs';
import { ApiService, Service, ServiceStatus, ServicesData } from '../../services/api.service';
import { Header } from '../../shared/header/header';
import { ServiceDetailsComponent } from './service-details/service-details';

type ServiceFilter = 'all' | ServiceStatus;

@Component({
  selector: 'app-services',
  imports: [
    FrAvatarModule,
    FrBadgeModule,
    FrButtonModule,
    FrCardModule,
    FrDropdownMenuModule,
    FrEmptyModule,
    FrHoverCardModule,
    FrPaginationModule,
    FrSkeletonModule,
    FrTabsModule,
    FrTooltipDirective,
    Header,
    NgIcon,
    NgStyle,
    ServiceDetailsComponent,
  ],
  templateUrl: './services.html',
  styleUrl: './services.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Services implements OnInit {
  private readonly api = inject(ApiService);
  private readonly destroyRef = inject(DestroyRef);

  readonly refresh$ = new Subject<void>();
  readonly data = signal<ServicesData | null>(null);
  readonly selectedService = signal<Service | null>(null);
  readonly currentPage = signal(1);
  readonly perPage = signal(10);
  readonly selectedFilter = signal<ServiceFilter>('all');
  readonly totalPages = computed(() => this.data()?.servicePagination.pages ?? 1);
  readonly totalItems = computed(() => this.data()?.servicePagination.items ?? 0);
  readonly pageStart = computed(() => {
    if (!this.totalItems()) return 0;

    return (this.currentPage() - 1) * this.perPage() + 1;
  });
  readonly pageEnd = computed(() =>
    Math.min(this.currentPage() * this.perPage(), this.totalItems()),
  );
  readonly attentionServices = computed(() =>
    (this.data()?.services ?? []).filter((service) =>
      service.status === 'degraded' || service.status === 'incident',
    ),
  );
  readonly filteredServices = computed(() => {
    const services = this.data()?.services ?? [];
    const filter = this.selectedFilter();

    return filter === 'all' ? services : services.filter((service) => service.status === filter);
  });

  ngOnInit(): void {
    this.refresh$
      .asObservable()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        startWith(true),
        switchMap(() => this.api.getServices(this.currentPage(), this.perPage())),
      )
      .subscribe({
        next: (data) => this.data.set(data),
      });
  }

  setFilter(filter: string | null): void {
    if (!this.isServiceFilter(filter)) {
      return;
    }

    this.selectedFilter.set(filter);
  }

  selectService(service: Service | null): void {
    this.selectedService.set(service);
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

  statusLabel(status: ServiceStatus): string {
    const labels: Record<ServiceStatus, string> = {
      degraded: 'Degraded',
      healthy: 'Healthy',
      incident: 'Incident',
      maintenance: 'Maintenance',
    };

    return labels[status];
  }

  statusBadge(status: ServiceStatus): 'success' | 'secondary' | 'destructive' {
    if (status === 'healthy') return 'success';
    if (status === 'incident') return 'destructive';

    return 'secondary';
  }

  latencyValue(service: Service): number {
    return Math.min(Number.parseInt(service.latencyP95, 10) || 0, 400);
  }

  latencyWidth(service: Service): number {
    return Math.max(16, Math.min(100, this.latencyValue(service) / 4));
  }

  private isServiceFilter(value: string | null): value is ServiceFilter {
    return value !== null && ['all', 'healthy', 'degraded', 'incident', 'maintenance'].includes(value);
  }
}
