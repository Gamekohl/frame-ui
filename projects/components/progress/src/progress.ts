import { Directive, computed, input } from '@angular/core';
import { clampNumber } from '@frame-ui-ng/components/utils';

function coerceProgressValue(value: unknown): number | null {
  if (value === null || value === undefined || value === '') {
    return null;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function coerceProgressMax(value: unknown): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 100;
}

/** Progress bar host with value and max state. */
@Directive({
  selector: '[frProgress], frame-progress',
  exportAs: 'frProgress',
  host: {
    class: 'frame-progress',
    role: 'progressbar',
    '[attr.aria-valuemin]': 'isIndeterminate() ? null : 0',
    '[attr.aria-valuemax]': 'isIndeterminate() ? null : max()',
    '[attr.aria-valuenow]': 'isIndeterminate() ? null : normalizedValue()',
    '[attr.data-state]': 'state()',
    '[attr.data-value]': 'isIndeterminate() ? null : normalizedValue()',
    '[attr.data-max]': 'isIndeterminate() ? null : max()',
    '[style.--frame-progress-value]': 'isIndeterminate() ? null : normalizedValue()',
    '[style.--frame-progress-max]': 'isIndeterminate() ? null : max()',
    '[style.--frame-progress-percent]': 'isIndeterminate() ? null : percentage() + "%"',
  },
})
export class FrProgress {
  readonly value = input<number | null, unknown>(0, { transform: coerceProgressValue });
  readonly max = input<number, unknown>(100, { transform: coerceProgressMax });

  readonly isIndeterminate = computed(() => this.value() === null);

  readonly normalizedValue = computed(() => {
    const value = this.value();

    if (value === null) {
      return 0;
    }

    return clampNumber(value, 0, this.max());
  });

  readonly percentage = computed(() => (this.normalizedValue() / this.max()) * 100);

  readonly state = computed(() => {
    if (this.isIndeterminate()) {
      return 'indeterminate';
    }

    return this.normalizedValue() >= this.max() ? 'complete' : 'loading';
  });
}

/** Indicator slot for progress. */
@Directive({
  selector: '[frProgressIndicator], frame-progress-indicator',
  host: {
    class: 'frame-progress__indicator',
  },
})
export class FrProgressIndicator {}

