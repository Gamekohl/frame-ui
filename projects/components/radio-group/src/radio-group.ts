import { Directive, booleanAttribute, input } from '@angular/core';

export const FR_RADIO_GROUP_ORIENTATIONS = ['vertical', 'horizontal'] as const;
export const FR_RADIO_GROUP_VARIANTS = ['default', 'cards'] as const;

export type FrRadioGroupOrientation = (typeof FR_RADIO_GROUP_ORIENTATIONS)[number];
export type FrRadioGroupVariant = (typeof FR_RADIO_GROUP_VARIANTS)[number];

/** Radio group host with orientation and variant controls. */
@Directive({
  selector: '[frRadioGroup], frame-radio-group',
  exportAs: 'frRadioGroup',
  host: {
    class: 'frame-radio-group',
    role: 'radiogroup',
    '[attr.data-orientation]': 'orientation()',
    '[attr.data-variant]': 'variant()',
    '[attr.data-disabled]': 'disabled() ? "" : null',
  },
})
export class FrRadioGroup {
  readonly orientation = input<FrRadioGroupOrientation>('vertical');
  readonly variant = input<FrRadioGroupVariant>('default');
  readonly disabled = input(false, { transform: booleanAttribute });
}

/** Item slot for radio group. */
@Directive({
  selector: 'input[type=radio][frRadioGroupItem]',
  host: {
    class: 'frame-radio-group__item',
  },
})
export class FrRadioGroupItem {}

/** Field slot for radio group. */
@Directive({
  selector: 'label[frRadioGroupField]',
  host: {
    class: 'frame-field frame-radio-group__field',
    'data-orientation': 'horizontal',
    '[attr.data-disabled]': 'disabled() ? "" : null',
    '[attr.data-invalid]': 'invalid() ? "" : null',
    role: 'group',
  },
})
export class FrRadioGroupField {
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly invalid = input(false, { transform: booleanAttribute });
}

/** Card layout option for radio group choices. */
@Directive({
  selector: 'label[frRadioGroupCard]',
  host: {
    class: 'frame-radio-group__card',
  },
})
export class FrRadioGroupCard {}

/** Meta slot for radio group card. */
@Directive({
  selector: '[frRadioGroupCardMeta]',
  host: {
    class: 'frame-radio-group__card-meta',
  },
})
export class FrRadioGroupCardMeta {}

