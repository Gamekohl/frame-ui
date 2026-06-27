import { DialogRef } from '@angular/cdk/dialog';
import { Component, Directive, booleanAttribute, inject, input } from '@angular/core';

export const FR_SHEET_SIDES = ['top', 'right', 'bottom', 'left'] as const;
export type FrSheetSide = (typeof FR_SHEET_SIDES)[number];

export function coerceSheetSide(value: unknown): FrSheetSide {
  return value === 'top' || value === 'bottom' || value === 'left' ? value : 'right';
}

/** Close control for sheet. */
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

/** Panel slot for sheet. */
@Component({
  selector: '[frSheetPanel], frame-sheet-panel',
  host: {
    class: 'frame-sheet__panel frame-corner-handles',
    'data-frame-corner-handles-mode': 'auto',
    '[attr.data-scrollable]': 'scrollable() ? "" : null',
    '[attr.data-side]': 'side()',
  },
  template: `
    <ng-content />
    @if (showCloseButton()) {
      <button class="frame-sheet__close" type="button" aria-label="Close sheet" (click)="close()">
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 6 6 18"></path>
          <path d="m6 6 12 12"></path>
        </svg>
      </button>
    }
  `,
})
export class FrSheetPanel {
  private readonly dialogRef = inject<DialogRef<unknown, unknown>>(DialogRef, { optional: true });

  readonly scrollable = input(false, { transform: booleanAttribute });
  readonly showCloseButton = input(true, { transform: booleanAttribute });
  readonly side = input<FrSheetSide, unknown>('right', { transform: coerceSheetSide });

  close(): void {
    this.dialogRef?.close();
  }
}

/** Header slot for sheet. */
@Directive({
  selector: '[frSheetHeader], frame-sheet-header',
  host: {
    class: 'frame-sheet__header',
  },
})
export class FrSheetHeader {}

/** Body slot for sheet. */
@Directive({
  selector: '[frSheetBody], frame-sheet-body',
  host: {
    class: 'frame-sheet__body',
  },
})
export class FrSheetBody {}

/** Footer slot for sheet. */
@Directive({
  selector: '[frSheetFooter], frame-sheet-footer',
  host: {
    class: 'frame-sheet__footer',
  },
})
export class FrSheetFooter {}

/** Title slot for sheet. */
@Directive({
  selector: '[frSheetTitle], frame-sheet-title',
  host: {
    class: 'frame-sheet__title',
  },
})
export class FrSheetTitle {}

/** Description slot for sheet. */
@Directive({
  selector: '[frSheetDescription], frame-sheet-description',
  host: {
    class: 'frame-sheet__description',
  },
})
export class FrSheetDescription {}
