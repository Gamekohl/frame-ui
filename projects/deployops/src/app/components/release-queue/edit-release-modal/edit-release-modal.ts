import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FrBadgeModule } from '@frame-ui-ng/components/badge';
import { FrButtonModule } from '@frame-ui-ng/components/button';
import { FrFieldModule } from '@frame-ui-ng/components/field';
import { FrInputModule } from '@frame-ui-ng/components/input';
import { FR_MODAL_DATA, FrModalModule, FrModalRef } from '@frame-ui-ng/components/modal';
import { FrSelectModule } from '@frame-ui-ng/components/select';
import { FrTextareaModule } from '@frame-ui-ng/components/textarea';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { tablerChevronDown } from '@ng-icons/tabler-icons';
import { Release } from '../../../services/api.service';

export type EditReleaseModalData = {
  release: Release;
};

export type EditReleaseModalResult = 'cancel' | 'saved';

@Component({
  selector: 'app-edit-release-modal',
  imports: [
    FrBadgeModule,
    FrButtonModule,
    FrFieldModule,
    FrInputModule,
    FrModalModule,
    FrSelectModule,
    FrTextareaModule,
    ReactiveFormsModule,
    NgIcon,
  ],
  templateUrl: './edit-release-modal.html',
  styleUrl: './edit-release-modal.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [provideIcons({ tablerChevronDown })],
})
export class EditReleaseModalComponent {
  private readonly data = inject<EditReleaseModalData>(FR_MODAL_DATA);
  private readonly modalRef = inject(FrModalRef<EditReleaseModalComponent, EditReleaseModalResult>);

  readonly release = computed(() => this.data.release);
  readonly form = new FormGroup({
    release: new FormControl(this.data.release.release, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    version: new FormControl(this.data.release.version, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    environment: new FormControl(this.data.release.environment, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    status: new FormControl<Release['status']>(this.data.release.status, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    note: new FormControl(
      `Coordinate with ${this.data.release.environment} owners before changing queue position.`,
      {
        nonNullable: true,
        validators: [Validators.required],
      },
    ),
  });

  readonly environments = ['Production', 'Staging', 'Development'] as const;

  readonly statuses = [
    { label: 'In Queue', value: 'in-queue' },
    { label: 'Deploying', value: 'deploying' },
    { label: 'Healthy', value: 'healthy' },
    { label: 'Blocked', value: 'blocked' },
  ] as const satisfies ReadonlyArray<{ label: string; value: Release['status'] }>;

  close(result: EditReleaseModalResult): void {
    this.modalRef.close(result);
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.modalRef.close('saved');
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
}
