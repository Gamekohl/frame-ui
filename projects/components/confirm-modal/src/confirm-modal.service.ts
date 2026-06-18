import { ChangeDetectionStrategy, Component, Injectable, inject } from '@angular/core';
import { FrButton, FrButtonLabel } from '@frame-ui-ng/components/button';
import { FrModalConfig, FrModalRef, FrModalService } from '@frame-ui-ng/components/modal';
import {
  FR_MODAL_DATA,
  FrModalClose,
  FrModalDescription,
  FrModalFooter,
  FrModalHeader,
  FrModalPanel,
  FrModalTitle,
} from '@frame-ui-ng/components/modal';

import { FrConfirmModalData, FrConfirmModalResult } from './confirm-modal';

/** Default modal content used by the confirmation service. */
@Component({
  selector: 'frame-confirm-modal',
  imports: [
    FrButton,
    FrButtonLabel,
    FrModalClose,
    FrModalDescription,
    FrModalFooter,
    FrModalHeader,
    FrModalPanel,
    FrModalTitle,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div frModalPanel data-confirm-modal size="sm" [showCloseButton]="false">
      <div frModalHeader>
        <h2 frModalTitle>{{ data.title }}</h2>

        @if (data.description) {
          <p frModalDescription>{{ data.description }}</p>
        }
      </div>

      <div frModalFooter>
        <button frButton appearance="outline" type="button" [frModalClose]="'cancel'">
          <span frButtonLabel>{{ data.cancelLabel }}</span>
        </button>
        <button frButton type="button" [frModalClose]="'confirm'">
          <span frButtonLabel>{{ data.confirmLabel }}</span>
        </button>
      </div>
    </div>
  `,
})
class FrConfirmModalContent {
  readonly data = inject<FrConfirmModalData>(FR_MODAL_DATA);
}

export type FrConfirmModalConfig = Omit<
  FrModalConfig<FrConfirmModalData, FrConfirmModalResult, unknown>,
  'data' | 'description' | 'footerActions' | 'inputs' | 'showCloseButton' | 'size' | 'title'
> & {
  cancelLabel?: string;
  confirmLabel?: string;
  description?: string;
  title?: string;
};

/** Service for opening confirmation dialogs. */
@Injectable({ providedIn: 'root' })
export class FrConfirmModalService {
  private readonly modal = inject(FrModalService);

  open(config: FrConfirmModalConfig = {}): FrModalRef<unknown, FrConfirmModalResult> {
    const {
      cancelLabel = 'Cancel',
      confirmLabel = 'Confirm',
      description,
      title = 'Are you sure?',
      ...modalConfig
    } = config;

    const internalConfig = {
      ...(modalConfig as Omit<
        FrModalConfig<FrConfirmModalData, FrConfirmModalResult, FrConfirmModalContent>,
        'data' | 'description' | 'footerActions' | 'inputs' | 'showCloseButton' | 'size' | 'title'
      >),
      ariaLabel: modalConfig.ariaLabel ?? title,
      data: {
        cancelLabel,
        confirmLabel,
        description,
        title,
      },
      disableClose: modalConfig.disableClose ?? true,
    } satisfies FrModalConfig<FrConfirmModalData, FrConfirmModalResult, FrConfirmModalContent>;

    return this.modal.open<FrConfirmModalResult, FrConfirmModalData, FrConfirmModalContent>(
      FrConfirmModalContent,
      internalConfig,
    ) as FrModalRef<unknown, FrConfirmModalResult>;
  }
}
