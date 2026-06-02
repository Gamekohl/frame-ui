import { Directive, input } from '@angular/core';

import { FrInput } from './input.primitive';

export const FR_INPUT_GROUP_ADDON_ALIGNS = ['inline-start', 'inline-end'] as const;
export type FrInputGroupAddonAlign = (typeof FR_INPUT_GROUP_ADDON_ALIGNS)[number];

@Directive({
  selector: '[frInputGroup], frame-input-group',
  host: {
    class: 'frame-input-group',
  },
})
export class FrInputGroup {}

@Directive({
  selector: '[frInputGroupAddon], frame-input-group-addon',
  host: {
    class: 'frame-input-group__addon',
    '[attr.data-align]': 'align()',
  },
})
export class FrInputGroupAddon {
  readonly align = input<FrInputGroupAddonAlign>('inline-start');
}

@Directive({
  selector: '[frInputGroupText], frame-input-group-text',
  host: {
    class: 'frame-input-group__text',
  },
})
export class FrInputGroupText {}

@Directive({
  selector: 'input[frInputGroupInput]',
  hostDirectives: [FrInput],
  host: {
    class: 'frame-input-group__input',
  },
})
export class FrInputGroupInput {}
