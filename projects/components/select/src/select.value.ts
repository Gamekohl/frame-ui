import { Directive, booleanAttribute, computed, inject, input } from '@angular/core';

import { FrSelect } from './select.root';

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
  },
})
export class FrSelectIcon {}

@Directive({
  selector: '[frSelectError], frame-select-error',
  host: {
    class: 'frame-select__error',
    'aria-live': 'polite',
  },
})
export class FrSelectError {}
