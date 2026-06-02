import { Directive, input } from '@angular/core';

export const FR_SWITCH_SIZES = ['sm', 'default'] as const;
export type FrSwitchSize = (typeof FR_SWITCH_SIZES)[number];

@Directive({
  selector: 'input[type=checkbox][frSwitch]',
  host: {
    class: 'frame-switch',
    '[attr.data-size]': 'size()',
    role: 'switch',
  },
})
export class FrSwitch {
  readonly size = input<FrSwitchSize>('default');
}

@Directive({
  selector: '[frSwitchField], frame-switch-field',
  host: {
    class: 'frame-switch-field',
  },
})
export class FrSwitchField {}

@Directive({
  selector: '[frSwitchContent], frame-switch-content',
  host: {
    class: 'frame-switch-content',
  },
})
export class FrSwitchContent {}

@Directive({
  selector: '[frSwitchLabel], frame-switch-label',
  host: {
    class: 'frame-switch-label',
  },
})
export class FrSwitchLabel {}

@Directive({
  selector: '[frSwitchDescription], frame-switch-description',
  host: {
    class: 'frame-switch-description',
  },
})
export class FrSwitchDescription {}

@Directive({
  selector: '[frSwitchError], frame-switch-error',
  host: {
    class: 'frame-switch-error',
    'aria-live': 'polite',
  },
})
export class FrSwitchError {}
