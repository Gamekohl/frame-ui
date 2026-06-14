import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { FrAvatar, FrAvatarImage, FrBadge, FrButton, FrButtonIcon, FrButtonLabel, FrSeparator } from '@frame-ui-ng/components';
import { FrTabsModule } from '@frame-ui-ng/components/tabs';
import { NgIcon } from '@ng-icons/core';
import { finalize, switchMap } from 'rxjs';
import {
  ApiService,
  DeployEnvironment,
  EnvironmentDetails,
  EnvironmentGateStatus,
  EnvironmentStatus,
} from '../../../services/api.service';
import { Sidebar } from '../../../shared/sidebar/sidebar';

@Component({
  selector: 'app-environment-details',
  imports: [
    FrAvatar,
    FrAvatarImage,
    FrBadge,
    FrButton,
    FrButtonIcon,
    FrButtonLabel,
    FrTabsModule,
    NgIcon,
    Sidebar,
    FrSeparator,
  ],
  templateUrl: './environment-details.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnvironmentDetailsComponent {
  private readonly api = inject(ApiService);
  private readonly destroyRef = inject(DestroyRef);

  environment = input.required<DeployEnvironment>();

  closed = output<void>();

  readonly details = signal<EnvironmentDetails | null>(null);
  readonly loading = signal(true);

  constructor() {
    toObservable(this.environment)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        switchMap(({ id }) => {
          this.loading.set(true);
          this.details.set(null);

          return this.api.environmentDetails(id).pipe(finalize(() => this.loading.set(false)));
        }),
      )
      .subscribe({
        next: (details) => this.details.set(details),
      });
  }

  statusLabel(status = this.environment().status): string {
    const labels: Record<EnvironmentStatus, string> = {
      degraded: 'Degraded',
      healthy: 'Healthy',
      locked: 'Locked',
      warming: 'Warming',
    };

    return labels[status];
  }

  statusBadge(status = this.environment().status): 'success' | 'secondary' | 'destructive' {
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

  gateBadge(status: EnvironmentGateStatus): 'success' | 'secondary' | 'destructive' {
    if (status === 'passed') return 'success';
    if (status === 'blocked') return 'destructive';

    return 'secondary';
  }
}
