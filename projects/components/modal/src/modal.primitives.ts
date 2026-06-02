import { DialogRef } from '@angular/cdk/dialog';
import { Component, Directive, booleanAttribute, inject, input } from '@angular/core';

@Directive({
  selector: '[frModalClose]',
  host: {
    class: 'frame-modal__close-control',
    '(click)': 'close()',
  },
})
export class FrModalClose {
  private readonly dialogRef = inject<DialogRef<unknown, unknown>>(DialogRef, { optional: true });
  readonly result = input<unknown>(undefined, { alias: 'frModalClose' });

  close(): void {
    this.dialogRef?.close(this.result());
  }
}

@Component({
  selector: '[frModalPanel], frame-modal-panel',
  host: {
    class: 'frame-modal__panel',
    '[attr.data-scrollable]': 'scrollable() ? "" : null',
    '[attr.data-sticky-footer]': 'stickyFooter() ? "" : null',
    '[attr.data-size]': 'size()',
  },
  template: `
    <ng-content />
    @if (showCloseButton()) {
      <button
        class="frame-modal__close"
        frModalClose
        type="button"
        aria-label="Close dialog"
      >
        <span aria-hidden="true">×</span>
      </button>
    }
  `,
  imports: [FrModalClose],
})
export class FrModalPanel {
  readonly scrollable = input(false, { transform: booleanAttribute });
  readonly showCloseButton = input(true, { transform: booleanAttribute });
  readonly size = input<'sm' | 'md' | 'lg' | 'xl' | 'full'>('md');
  readonly stickyFooter = input(false, { transform: booleanAttribute });
}

@Directive({
  selector: '[frModalHeader], frame-modal-header',
  host: {
    class: 'frame-modal__header',
  },
})
export class FrModalHeader {}

@Directive({
  selector: '[frModalBody], frame-modal-body',
  host: {
    class: 'frame-modal__body',
  },
})
export class FrModalBody {}

@Directive({
  selector: '[frModalFooter], frame-modal-footer',
  host: {
    class: 'frame-modal__footer',
  },
})
export class FrModalFooter {}

@Directive({
  selector: '[frModalTitle], frame-modal-title',
  host: {
    class: 'frame-modal__title',
  },
})
export class FrModalTitle {}

@Directive({
  selector: '[frModalDescription], frame-modal-description',
  host: {
    class: 'frame-modal__description',
  },
})
export class FrModalDescription {}
