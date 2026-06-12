import { Directive, booleanAttribute, computed, inject, input } from '@angular/core';

import { FrSelect } from './select.root';

export const FR_SELECT_ICON_POSITIONS = ['leading', 'trailing'] as const;
export type FrSelectIconPosition = (typeof FR_SELECT_ICON_POSITIONS)[number];

@Directive({
  selector: '[frSelectValue], frame-select-value',
  host: {
    class: 'frame-select__value',
    '[attr.data-placeholder]': 'isPlaceholder() ? "" : null',
    '[textContent]': 'displayText()',
  },
})
export class FrSelectValue {
  private readonly select = inject(FrSelect);

  readonly placeholder = input('Select an option');

  protected readonly isPlaceholder = computed(() => this.select.displayValue() === null);
  protected readonly displayText = computed(() => this.select.displayValue() ?? this.placeholder());
}

@Directive({
  selector: '[frSelectItemIndicator], frame-select-item-indicator',
  host: {
    class: 'frame-select__item-indicator',
    'aria-hidden': 'true',
  },
})
export class FrSelectItemIndicator {}

@Directive({
  selector: '[frSelectIcon], frame-select-icon',
  host: {
    class: 'frame-select__icon',
    'aria-hidden': 'true',
    '[attr.data-position]': 'position()',
  },
})
export class FrSelectIcon {
  readonly position = input<FrSelectIconPosition>('trailing');
}

@Directive({
  selector: '[frSelectError], frame-select-error',
  host: {
    class: 'frame-select__error',
    'aria-live': 'polite',
  },
})
export class FrSelectError {}
