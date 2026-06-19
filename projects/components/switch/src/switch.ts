import { Directive, input } from '@angular/core';

export const FR_SWITCH_SIZES = ['sm', 'default'] as const;
export type FrSwitchSize = (typeof FR_SWITCH_SIZES)[number];

/** Switch input styled as a FrameUI control. */
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

/** Field slot for switch. */
@Directive({
  selector: '[frSwitchField], frame-switch-field',
  host: {
    class: 'frame-switch-field',
  },
})
export class FrSwitchField {}

/** Content slot for switch. */
@Directive({
  selector: '[frSwitchContent], frame-switch-content',
  host: {
    class: 'frame-switch-content',
  },
})
export class FrSwitchContent {}

/** Label slot for switch. */
@Directive({
  selector: '[frSwitchLabel], frame-switch-label',
  host: {
    class: 'frame-switch-label',
  },
})
export class FrSwitchLabel {}

/** Description slot for switch. */
@Directive({
  selector: '[frSwitchDescription], frame-switch-description',
  host: {
    class: 'frame-switch-description',
  },
})
export class FrSwitchDescription {}

/** Error slot for switch. */
@Directive({
  selector: '[frSwitchError], frame-switch-error',
  host: {
    class: 'frame-switch-error',
    'aria-live': 'polite',
  },
})
export class FrSwitchError {}

