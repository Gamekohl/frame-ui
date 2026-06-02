import { DialogRef } from '@angular/cdk/dialog';
import { Component, Directive, booleanAttribute, inject, input } from '@angular/core';

export const FR_SHEET_SIDES = ['top', 'right', 'bottom', 'left'] as const;
export type FrSheetSide = (typeof FR_SHEET_SIDES)[number];

function coerceSheetSide(value: unknown): FrSheetSide {
  return value === 'top' || value === 'bottom' || value === 'left' ? value : 'right';
}

@Directive({
  selector: '[frSheetClose]',
  host: {
    class: 'frame-sheet__close-control',
    '(click)': 'close()',
  },
})
export class FrSheetClose {
  private readonly dialogRef = inject<DialogRef<unknown, unknown>>(DialogRef, { optional: true });
  readonly result = input<unknown>(undefined, { alias: 'frSheetClose' });

  close(): void {
    this.dialogRef?.close(this.result());
  }
}

@Component({
  selector: '[frSheetPanel], frame-sheet-panel',
  host: {
    class: 'frame-sheet__panel',
    '[attr.data-scrollable]': 'scrollable() ? "" : null',
    '[attr.data-side]': 'side()',
  },
  template: `
    <ng-content />
    @if (showCloseButton()) {
      <button class="frame-sheet__close" frSheetClose type="button" aria-label="Close sheet">
        <span aria-hidden="true">×</span>
      </button>
    }
  `,
  imports: [FrSheetClose],
})
export class FrSheetPanel {
  readonly scrollable = input(false, { transform: booleanAttribute });
  readonly showCloseButton = input(true, { transform: booleanAttribute });
  readonly side = input<FrSheetSide, unknown>('right', { transform: coerceSheetSide });
}

@Directive({
  selector: '[frSheetHeader], frame-sheet-header',
  host: {
    class: 'frame-sheet__header',
  },
})
export class FrSheetHeader {}

@Directive({
  selector: '[frSheetBody], frame-sheet-body',
  host: {
    class: 'frame-sheet__body',
  },
})
export class FrSheetBody {}

@Directive({
  selector: '[frSheetFooter], frame-sheet-footer',
  host: {
    class: 'frame-sheet__footer',
  },
})
export class FrSheetFooter {}

@Directive({
  selector: '[frSheetTitle], frame-sheet-title',
  host: {
    class: 'frame-sheet__title',
  },
})
export class FrSheetTitle {}

@Directive({
  selector: '[frSheetDescription], frame-sheet-description',
  host: {
    class: 'frame-sheet__description',
  },
})
export class FrSheetDescription {}
