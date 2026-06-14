import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FrAccordionModule } from '@frame-ui-ng/components/accordion';
import { FrAvatarModule } from '@frame-ui-ng/components/avatar';
import { FrBadgeModule } from '@frame-ui-ng/components/badge';
import { FrButtonModule } from '@frame-ui-ng/components/button';
import { FrCardModule } from '@frame-ui-ng/components/card';
import { FrEmptyModule } from '@frame-ui-ng/components/empty';
import { FrProgressModule } from '@frame-ui-ng/components/progress';
import { FrSkeletonModule } from '@frame-ui-ng/components/skeleton';
import { FrTabsModule } from '@frame-ui-ng/components/tabs';
import { FrTooltipDirective } from '@frame-ui-ng/components/tooltip';
import { NgIcon } from '@ng-icons/core';
import { Subject, startWith, switchMap } from 'rxjs';
import {
  AlertItem,
  AlertRoute,
  AlertSeverity,
  AlertStatus,
  AlertsData,
  ApiService,
} from '../../services/api.service';
import { Header } from '../../shared/header/header';

type AlertFilter = 'all' | AlertStatus;

@Component({
  selector: 'app-alerts',
  imports: [
    FrAccordionModule,
    FrAvatarModule,
    FrBadgeModule,
    FrButtonModule,
    FrCardModule,
    FrEmptyModule,
    FrProgressModule,
    FrSkeletonModule,
    FrTabsModule,
    FrTooltipDirective,
    Header,
    NgIcon,
  ],
  templateUrl: './alerts.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Alerts implements OnInit {
  private readonly api = inject(ApiService);
  private readonly destroyRef = inject(DestroyRef);

  readonly refresh$ = new Subject<void>();
  readonly data = signal<AlertsData | null>(null);
  readonly selectedFilter = signal<AlertFilter>('firing');

  readonly filteredAlerts = computed(() => {
    const filter = this.selectedFilter();
    const alerts = this.data()?.alerts ?? [];

    return filter === 'all' ? alerts : alerts.filter((alert) => alert.status === filter);
  });

  readonly primaryAlert = computed(() => {
    const alerts = this.data()?.alerts ?? [];

    return [...alerts]
      .filter((alert) => alert.status === 'firing' || alert.status === 'acknowledged')
      .sort((a, b) => this.severityRank(a.severity) - this.severityRank(b.severity))[0] ?? null;
  });

  readonly noisySignals = computed(() =>
    (this.data()?.alerts ?? [])
      .filter((alert) => alert.status !== 'resolved')
      .slice(0, 4),
  );

  ngOnInit(): void {
    this.refresh$
      .asObservable()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        startWith(true),
        switchMap(() => this.api.getAlerts()),
      )
      .subscribe({
        next: (data) => this.data.set(data),
      });
  }

  setFilter(filter: string | null): void {
    if (!this.isAlertFilter(filter)) {
      return;
    }

    this.selectedFilter.set(filter);
  }

  refreshData(): void {
    this.refresh$.next();
  }

  statusCount(status: AlertFilter): number {
    const alerts = this.data()?.alerts ?? [];

    return status === 'all' ? alerts.length : alerts.filter((alert) => alert.status === status).length;
  }

  statusLabel(status: AlertStatus): string {
    const labels: Record<AlertStatus, string> = {
      acknowledged: 'Acknowledged',
      firing: 'Firing',
      resolved: 'Resolved',
      suppressed: 'Suppressed',
    };

    return labels[status];
  }

  statusBadge(status: AlertStatus): 'success' | 'secondary' | 'destructive' {
    if (status === 'resolved') return 'success';
    if (status === 'firing') return 'destructive';

    return 'secondary';
  }

  severityLabel(severity: AlertSeverity): string {
    const labels: Record<AlertSeverity, string> = {
      info: 'Info',
      sev1: 'SEV 1',
      sev2: 'SEV 2',
      sev3: 'SEV 3',
    };

    return labels[severity];
  }

  severityBadge(severity: AlertSeverity): 'secondary' | 'destructive' {
    return severity === 'sev1' || severity === 'sev2' ? 'destructive' : 'secondary';
  }

  routeHealthLabel(route: AlertRoute): string {
    const labels: Record<AlertRoute['health'], string> = {
      covered: 'Covered',
      handoff: 'Handoff',
      thin: 'Thin',
    };

    return labels[route.health];
  }

  routeHealthBadge(route: AlertRoute): 'success' | 'secondary' | 'destructive' {
    if (route.health === 'covered') return 'success';
    if (route.health === 'thin') return 'destructive';

    return 'secondary';
  }

  private severityRank(severity: AlertSeverity): number {
    const ranks: Record<AlertSeverity, number> = {
      info: 4,
      sev1: 1,
      sev2: 2,
      sev3: 3,
    };

    return ranks[severity];
  }

  private isAlertFilter(value: string | null): value is AlertFilter {
    return value !== null && ['all', 'firing', 'acknowledged', 'suppressed', 'resolved'].includes(value);
  }
}
