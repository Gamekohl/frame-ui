import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { FrAvatar, FrAvatarImage, FrBadge, FrButton, FrButtonIcon, FrButtonLabel } from '@frame-ui-ng/components';
import { FrTabsModule } from '@frame-ui-ng/components/tabs';
import { NgIcon } from '@ng-icons/core';
import { finalize, switchMap } from 'rxjs';
import { ApiService, Service, ServiceDetails, ServiceStatus } from '../../../services/api.service';
import { Sidebar } from '../../../shared/sidebar/sidebar';

@Component({
  selector: 'app-service-details',
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
  ],
  templateUrl: './service-details.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceDetailsComponent {
  private readonly api = inject(ApiService);
  private readonly destroyRef = inject(DestroyRef);

  service = input.required<Service>();

  closed = output<void>();

  readonly details = signal<ServiceDetails | null>(null);
  readonly loading = signal(true);
  readonly hasAlerts = computed(() => (this.details()?.alerts.length ?? 0) > 0);

  constructor() {
    toObservable(this.service)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        switchMap(({ id }) => {
          this.loading.set(true);
          this.details.set(null);

          return this.api.serviceDetails(id).pipe(finalize(() => this.loading.set(false)));
        }),
      )
      .subscribe({
        next: (details) => this.details.set(details),
      });
  }

  statusBadge(status = this.service().status): 'success' | 'secondary' | 'destructive' {
    if (status === 'healthy') return 'success';
    if (status === 'incident') return 'destructive';

    return 'secondary';
  }

  statusLabel(status = this.service().status): string {
    const labels: Record<ServiceStatus, string> = {
      degraded: 'Degraded',
      healthy: 'Healthy',
      incident: 'Incident',
      maintenance: 'Maintenance',
    };

    return labels[status];
  }

  alertBadge(severity: ServiceDetails['alerts'][number]['severity']): 'success' | 'secondary' | 'destructive' {
    return severity === 'high' ? 'destructive' : 'secondary';
  }
}
