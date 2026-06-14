import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { FrAvatar, FrAvatarImage, FrBadge, FrButton, FrButtonIcon, FrButtonLabel, FrProgress, FrProgressIndicator,
  FrSeparator
} from '@frame-ui-ng/components';
import { FrConfirmModalTrigger } from '@frame-ui-ng/components/confirm-modal';
import { FrFieldModule } from '@frame-ui-ng/components/field';
import { FrRadioGroupModule } from '@frame-ui-ng/components/radio-group';
import { FrSliderModule } from '@frame-ui-ng/components/slider';
import { FrTabsModule } from '@frame-ui-ng/components/tabs';
import { FrTooltipDirective } from '@frame-ui-ng/components/tooltip';
import { NgIcon } from '@ng-icons/core';
import { finalize, switchMap } from 'rxjs';
import {
  ApiService,
  Deployment,
  DeploymentDetailCheck,
  DeploymentDetails,
  DeploymentStatus,
} from '../../../services/api.service';
import { Sidebar } from '../../../shared/sidebar/sidebar';

@Component({
  selector: 'app-deployment-details',
  imports: [
    FrAvatar,
    FrAvatarImage,
    FrBadge,
    FrButton,
    FrButtonIcon,
    FrButtonLabel,
    FrRadioGroupModule,
    FrSliderModule,
    FrTabsModule,
    FrFieldModule,
    NgIcon,
    Sidebar,
    FrTooltipDirective,
    FrConfirmModalTrigger,
    FrProgress,
    FrProgressIndicator,
    FrSeparator,
  ],
  templateUrl: './deployment-details.html',
  styleUrl: './deployment-details.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeploymentDetailsComponent {
  private readonly api = inject(ApiService);
  private readonly destroyRef = inject(DestroyRef);

  deployment = input.required<Deployment>();

  closed = output<void>();

  readonly details = signal<DeploymentDetails | null>(null);
  readonly loading = signal(true);
  readonly isPausable = computed(() => this.details()?.status === 'running');

  constructor() {
    toObservable(this.deployment)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        switchMap(({ id }) => {
          this.loading.set(true);
          this.details.set(null);

          return this.api.deploymentDetails(id).pipe(finalize(() => this.loading.set(false)));
        }),
      )
      .subscribe({
        next: (details) => this.details.set(details),
      });
  }

  statusBadge = computed(() => {
    const status = this.deployment().status;

    if (status === 'succeeded') return 'success';
    if (status === 'failed' || status === 'rolled-back') return 'destructive';

    return 'secondary';
  });

  statusLabel = computed(() => {
    const status = this.deployment().status;

    const labels: Record<DeploymentStatus, string> = {
      failed: 'Failed',
      paused: 'Paused',
      queued: 'Queued',
      running: 'Running',
      succeeded: 'Succeeded',
      'rolled-back': 'Rolled back',
    };

    return labels[status];
  });

  checkBadge({ status }: DeploymentDetailCheck): 'success' | 'secondary' | 'destructive' {
    if (status === 'passed' || status === 'healthy') return 'success';
    if (status === 'failed') return 'destructive';

    return 'secondary';
  }

  checkLabel({ status }: DeploymentDetailCheck): string {
    const labels: Record<string, string> = {
      failed: 'Failed',
      healthy: 'Healthy',
      passed: 'Passed',
      pending: 'Pending',
      running: 'Running',
    };

    return labels[status];
  }
}
