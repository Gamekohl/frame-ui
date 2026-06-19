import { Directive, input } from '@angular/core';

import { FrInput } from './input.primitive';

export const FR_INPUT_GROUP_ADDON_ALIGNS = ['inline-start', 'inline-end'] as const;
export const FR_INPUT_GROUP_ADDON_VARIANTS = ['default', 'ghost'] as const;
export type FrInputGroupAddonAlign = (typeof FR_INPUT_GROUP_ADDON_ALIGNS)[number];
export type FrInputGroupAddonVariant = (typeof FR_INPUT_GROUP_ADDON_VARIANTS)[number];

/** Group slot for input. */
@Directive({
  selector: '[frInputGroup], frame-input-group',
  host: {
    class: 'frame-input-group',
  },
})
export class FrInputGroup {}

/** Addon slot for grouped inputs. */
@Directive({
  selector: '[frInputGroupAddon], frame-input-group-addon',
  host: {
    class: 'frame-input-group__addon',
    '[attr.data-align]': 'align()',
    '[attr.data-variant]': 'variant()',
  },
})
export class FrInputGroupAddon {
  readonly align = input<FrInputGroupAddonAlign>('inline-start');
  readonly variant = input<FrInputGroupAddonVariant>('default');
}

/** Text slot for grouped inputs. */
@Directive({
  selector: '[frInputGroupText], frame-input-group-text',
  host: {
    class: 'frame-input-group__text',
  },
})
export class FrInputGroupText {}

/** Input control slot inside an input group. */
@Directive({
  selector: 'input[frInputGroupInput]',
  hostDirectives: [FrInput],
  host: {
    class: 'frame-input-group__input',
  },
})
export class FrInputGroupInput {}

