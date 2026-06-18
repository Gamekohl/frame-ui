import { Directive, inject, input, output } from '@angular/core';
import { take } from 'rxjs';

import { FrConfirmModalResult } from './confirm-modal';
import { FrConfirmModalConfig, FrConfirmModalService } from './confirm-modal.service';

/** Trigger control for confirm modal. */
@Directive({
  selector: '[frConfirmModal]',
  exportAs: 'frConfirmModal',
  host: {
    '(click)': 'open()',
  },
})
export class FrConfirmModalTrigger {
  private readonly confirmModal = inject(FrConfirmModalService);

  readonly config = input<FrConfirmModalConfig | string>({}, { alias: 'frConfirmModal' });
  readonly title = input<string | undefined>(undefined, { alias: 'frConfirmModalTitle' });
  readonly description = input<string | undefined>(undefined, { alias: 'frConfirmModalDescription' });
  readonly cancelLabel = input<string | undefined>(undefined, { alias: 'frConfirmModalCancelLabel' });
  readonly confirmLabel = input<string | undefined>(undefined, { alias: 'frConfirmModalConfirmLabel' });

  readonly closed = output<FrConfirmModalResult | undefined>({ alias: 'frConfirmModalClosed' });
  readonly cancelled = output<void>({ alias: 'frConfirmModalCancelled' });
  readonly confirmed = output<void>({ alias: 'frConfirmModalConfirmed' });

  open(): void {
    this.confirmModal
      .open(this.resolvedConfig())
      .closed
      .pipe(take(1))
      .subscribe((result) => {
        this.closed.emit(result);

        if (result === 'confirm') {
          this.confirmed.emit();
          return;
        }

        if (result === 'cancel') {
          this.cancelled.emit();
        }
      });
  }

  private resolvedConfig(): FrConfirmModalConfig {
    const config = this.config();
    const baseConfig: FrConfirmModalConfig = typeof config === 'string' ? { title: config } : config;

    return {
      ...baseConfig,
      cancelLabel: this.cancelLabel() ?? baseConfig.cancelLabel,
      confirmLabel: this.confirmLabel() ?? baseConfig.confirmLabel,
      description: this.description() ?? baseConfig.description,
      title: this.title() ?? baseConfig.title,
    };
  }
}
