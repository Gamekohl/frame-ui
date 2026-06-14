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
import { FrProgressModule } from '@frame-ui-ng/components/progress';
import { FrTooltipDirective } from '@frame-ui-ng/components/tooltip';
import { NgIcon } from '@ng-icons/core';
import { Subject, startWith, switchMap } from 'rxjs';
import {
  ApiService,
  DeployEnvironment,
  EnvironmentGateStatus,
  EnvironmentStatus,
  EnvironmentsData,
} from '../../services/api.service';
import { Header } from '../../shared/header/header';
import { EnvironmentDetailsComponent } from './environment-details/environment-details';

@Component({
  selector: 'app-environments',
  imports: [
    EnvironmentDetailsComponent,
    FrAvatarModule,
    FrBadgeModule,
    FrButtonModule,
    FrCardModule,
    FrDropdownMenuModule,
    FrProgressModule,
    FrTooltipDirective,
    Header,
    NgIcon,
    NgStyle,
  ],
  templateUrl: './environments.html',
  styleUrl: './environments.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Environments implements OnInit {
  private readonly api = inject(ApiService);
  private readonly destroyRef = inject(DestroyRef);

  readonly refresh$ = new Subject<void>();
  readonly data = signal<EnvironmentsData | null>(null);
  readonly selectedEnvironment = signal<DeployEnvironment | null>(null);
  readonly protectedEnvironments = computed(() =>
    (this.data()?.environments ?? []).filter((environment) => environment.protected),
  );
  readonly selectedReadiness = computed(() => {
    const environment = this.selectedEnvironment();

    if (!environment) return 0;

    return this.readinessPercent(environment);
  });

  ngOnInit(): void {
    this.refresh$
      .asObservable()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        startWith(true),
        switchMap(() => this.api.getEnvironments()),
      )
      .subscribe({
        next: (data) => {
          this.data.set(data);
          this.selectedEnvironment.set(
            data.environments.find((environment) => environment.slug === 'prod') ??
              data.environments[0] ??
              null,
          );
        },
      });
  }

  selectEnvironment(environment: DeployEnvironment | null): void {
    this.selectedEnvironment.set(environment);
  }

  refreshData(): void {
    this.refresh$.next();
  }

  readinessPercent(environment: DeployEnvironment): number {
    return Math.round((environment.readiness.passed / environment.readiness.total) * 100);
  }

  statusLabel(status: EnvironmentStatus): string {
    const labels: Record<EnvironmentStatus, string> = {
      degraded: 'Degraded',
      healthy: 'Healthy',
      locked: 'Locked',
      warming: 'Warming',
    };

    return labels[status];
  }

  statusBadge(status: EnvironmentStatus): 'success' | 'secondary' | 'destructive' {
    if (status === 'healthy') return 'success';
    if (status === 'degraded') return 'destructive';

    return 'secondary';
  }

  gateLabel(status: EnvironmentGateStatus): string {
    const labels: Record<EnvironmentGateStatus, string> = {
      blocked: 'Blocked',
      passed: 'Passed',
      running: 'Running',
      scheduled: 'Scheduled',
    };

    return labels[status];
  }
}
