import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { FrButtonModule } from '@frame-ui-ng/components/button';
import { FrConfirmModalService } from '@frame-ui-ng/components/confirm-modal';
import {
  FrModalDescription,
  FrModalFooter,
  FrModalHeader,
  FrModalPanel,
  FrModalTitle,
} from '@frame-ui-ng/components/modal';

type ConfirmModalPreviewMode = 'basic' | 'custom-labels' | 'inspector';

export type ConfirmModalPreviewConfig = {
  mode?: ConfirmModalPreviewMode;
};

@Component({
  selector: 'docs-confirm-modal-preview',
  host: {
    class: 'block w-full',
  },
  imports: [
    FrButtonModule,
    FrModalDescription,
    FrModalFooter,
    FrModalHeader,
    FrModalPanel,
    FrModalTitle,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (mode() === 'inspector') {
      <div class="docs-confirm-modal-preview docs-confirm-modal-preview--inspector">
        <div frModalPanel size="sm" [showCloseButton]="false" data-token-target="confirm-panel">
          <div frModalHeader data-token-target="confirm-header">
            <h2 frModalTitle data-token-target="confirm-title">Archive workspace?</h2>
            <p frModalDescription data-token-target="confirm-description">
              Members lose access until the workspace is restored.
            </p>
          </div>
          <div frModalFooter data-token-target="confirm-footer">
            <button frButton appearance="outline" type="button">
              <span frButtonLabel>Keep active</span>
            </button>
            <button frButton type="button">
              <span frButtonLabel>Archive</span>
            </button>
          </div>
        </div>
      </div>
    } @else {
      <div class="docs-confirm-modal-preview">
        <button frButton type="button" (click)="openConfirm()">
          <span frButtonLabel>{{ mode() === 'custom-labels' ? 'Archive workspace' : 'Open confirm modal' }}</span>
        </button>
      </div>
    }
  `,
  styles: `
    .docs-confirm-modal-preview {
      display: flex;
      min-height: 12rem;
      width: 100%;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    }

    .docs-confirm-modal-preview--inspector {
      min-height: 18rem;
    }
  `,
})
export class DocsConfirmModalPreviewComponent {
  readonly config = input<ConfirmModalPreviewConfig>({});
  private readonly confirmModal = inject(FrConfirmModalService);

  protected mode(): ConfirmModalPreviewMode {
    return this.config().mode ?? 'basic';
  }

  protected openConfirm(): void {
    if (this.mode() === 'custom-labels') {
      this.confirmModal.open({
        cancelLabel: 'Keep workspace',
        confirmLabel: 'Archive',
        description: 'Archived workspaces are hidden from the team but can be restored later.',
        title: 'Archive workspace?',
      });
      return;
    }

    this.confirmModal.open({
      description: 'This opens a focused confirmation dialog based on the modal primitives.',
      title: 'Continue with this action?',
    });
  }
}
