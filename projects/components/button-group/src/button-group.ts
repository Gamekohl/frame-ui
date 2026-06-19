import { Directive, input } from '@angular/core';

export const FR_BUTTON_GROUP_ORIENTATIONS = ['horizontal', 'vertical'] as const;
export type FrButtonGroupOrientation = (typeof FR_BUTTON_GROUP_ORIENTATIONS)[number];

/** Groups related buttons with shared orientation. */
@Directive({
  selector: '[frButtonGroup], frame-button-group',
  host: {
    class: 'frame-button-group',
    '[attr.data-orientation]': 'orientation()',
    role: 'group',
  },
})
export class FrButtonGroup {
  readonly orientation = input<FrButtonGroupOrientation>('horizontal');
}
