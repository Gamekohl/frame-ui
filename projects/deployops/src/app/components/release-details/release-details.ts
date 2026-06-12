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
import { FrAvatarModule } from '@frame-ui-ng/components/avatar';
import { FrBadgeModule } from '@frame-ui-ng/components/badge';
import { FrButtonModule } from '@frame-ui-ng/components/button';
import { FrTooltipModule } from '@frame-ui-ng/components/tooltip';
import { NgIcon } from '@ng-icons/core';
import { finalize, switchMap } from 'rxjs';
import { DeployopsApiService, Release, ReleaseDetails } from '../../deployops-api.service';

@Component({
  host: {
    role: 'aside'
  },
  selector: 'app-release-details',
  imports: [FrAvatarModule, FrBadgeModule, FrButtonModule, FrTooltipModule, NgIcon],
  templateUrl: './release-details.html',
  styleUrl: './release-details.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReleaseDetailsComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly api = inject(DeployopsApiService);

  readonly release = input.required<Release>();
  readonly closed = output<void>();

  readonly details = signal<ReleaseDetails | null>(null);
  readonly loading = signal(true);
  readonly isApproved = computed(() =>
    this.details()?.approvals.every((approval) => approval.status === 'approved'),
  );

  constructor() {
    toObservable(this.release)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        switchMap(({ id }) =>
          this.api.releaseDetails(id).pipe(finalize(() => this.loading.set(false))),
        ),
      )
      .subscribe({
        next: (details) => this.details.set(details),
      });
  }

  close(): void {
    this.closed.emit();
  }

  releaseBadge(release: Pick<Release, 'status'>): 'success' | 'secondary' | 'destructive' {
    if (release.status === 'blocked') {
      return 'destructive';
    }

    return release.status === 'healthy' ? 'success' : 'secondary';
  }

  statusLabel(release: Pick<Release, 'status'>): string {
    const labels: Record<Release['status'], string> = {
      blocked: 'Blocked',
      deploying: 'Deploying',
      healthy: 'Healthy',
      'in-queue': 'In Queue',
    };

    return labels[release.status];
  }
}
