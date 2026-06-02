import { Directive, booleanAttribute, input } from '@angular/core';

export const FR_SPINNER_SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

export type FrSpinnerSize = (typeof FR_SPINNER_SIZES)[number];

@Directive({
  selector: '[frSpinner], frame-spinner',
  exportAs: 'frSpinner',
  host: {
    class: 'frame-spinner',
    '[attr.data-size]': 'size()',
    '[attr.role]': 'decorative() ? null : "status"',
    '[attr.aria-hidden]': 'decorative() ? "true" : null',
    '[attr.aria-label]': 'decorative() ? null : label()',
    '[style.--frame-spinner-size]': 'customSize()',
    '[style.--frame-spinner-duration]': 'duration()',
    '[style.--frame-spinner-stroke]': 'stroke()',
  },
})
export class FrSpinner {
  readonly customSize = input<string | null>(null, { alias: 'sizeValue' });
  readonly decorative = input(false, { transform: booleanAttribute });
  readonly duration = input<string | null>(null);
  readonly label = input('Loading');
  readonly size = input<FrSpinnerSize>('md');
  readonly stroke = input<string | null>(null);
}

