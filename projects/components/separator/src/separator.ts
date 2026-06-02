import { booleanAttribute, Directive, input } from '@angular/core';

export const FR_SEPARATOR_ORIENTATIONS = ['horizontal', 'vertical'] as const;

export type FrSeparatorOrientation = (typeof FR_SEPARATOR_ORIENTATIONS)[number];

function coerceSeparatorOrientation(value: unknown): FrSeparatorOrientation {
  return value === 'vertical' ? 'vertical' : 'horizontal';
}

@Directive({
  selector: '[frSeparator], frame-separator',
  exportAs: 'frSeparator',
  host: {
    class: 'frame-separator',
    '[attr.data-orientation]': 'orientation()',
    '[attr.data-decorative]': 'decorative()',
    '[attr.role]': 'decorative() ? "presentation" : "separator"',
    '[attr.aria-orientation]': 'decorative() ? null : orientation()',
  },
})
export class FrSeparator {
  readonly orientation = input<FrSeparatorOrientation, unknown>('horizontal', {
    transform: coerceSeparatorOrientation,
  });

  readonly decorative = input(true, { transform: booleanAttribute });
}
