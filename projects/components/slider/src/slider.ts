import {
  ChangeDetectionStrategy,
  Component,
  DoCheck,
  ElementRef,
  booleanAttribute,
  computed,
  inject,
  input,
  numberAttribute,
  output,
  signal,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { FrControlValueAccessor, provideDsValueAccessor } from '@frame-ui-ng/components/forms';
import { clampNumber, coerceNumber } from '@frame-ui-ng/components/utils';

export const FR_SLIDER_ORIENTATIONS = ['horizontal', 'vertical'] as const;

export type FrSliderOrientation = (typeof FR_SLIDER_ORIENTATIONS)[number];
export type FrSliderValue = number | number[];

function coerceOrientation(value: unknown): FrSliderOrientation {
  return value === 'vertical' ? 'vertical' : 'horizontal';
}

function coerceValue(value: FrSliderValue | null | undefined): number[] {
  if (Array.isArray(value)) {
    return value.map((item) => coerceNumber(item, 0));
  }

  if (value === null || value === undefined) {
    return [0];
  }

  return [coerceNumber(value, 0)];
}

/** Slider control with single and range value support. */
@Component({
  selector: 'frame-slider',
  exportAs: 'frSlider',
  providers: [provideDsValueAccessor(FrSlider)],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'frame-slider',
    '[attr.data-orientation]': 'orientation()',
    '[attr.data-disabled]': 'disabled() ? "" : null',
    '[attr.data-invalid]': 'invalid() ? "" : null',
    '[attr.data-inverted]': 'inverted() ? "" : null',
    '[style.--frame-slider-start-percent]': 'rangeStartPercent() + "%"',
    '[style.--frame-slider-end-percent]': 'rangeEndPercent() + "%"',
    '(pointerdown)': 'handlePointerDown($event)',
  },
  template: `
    <span class="frame-slider__track">
      <span class="frame-slider__range"></span>
    </span>

    @for (thumb of values(); track $index) {
      <input
        class="frame-slider__native"
        type="range"
        [attr.aria-label]="thumbLabel($index)"
        [attr.aria-valuetext]="valueText(thumb)"
        [disabled]="disabled()"
        [min]="min()"
        [max]="max()"
        [step]="step()"
        [value]="thumb"
        (blur)="markTouched()"
        (input)="handleNativeInput($index, $any($event.target).value)"
      />
      <span
        class="frame-slider__thumb"
        [attr.data-active]="activeThumb() === $index ? '' : null"
        [style.--frame-slider-thumb-percent]="percentForValue(thumb) + '%'"
      ></span>
    }
  `,
})
export class FrSlider extends FrControlValueAccessor<FrSliderValue | null> implements DoCheck {
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly document = inject(DOCUMENT);
  private controlledByInput = false;
  private lastInputKey = '';

  readonly min = input(0, { transform: numberAttribute });
  readonly max = input(100, { transform: numberAttribute });
  readonly step = input(1, { transform: numberAttribute });
  readonly minStepsBetweenThumbs = input(0, { transform: numberAttribute });
  readonly orientation = input<FrSliderOrientation, unknown>('horizontal', { transform: coerceOrientation });
  readonly disabledInput = input(false, { alias: 'disabled', transform: booleanAttribute });
  readonly invalidInput = input(false, { alias: 'invalid', transform: booleanAttribute });
  readonly inverted = input(false, { transform: booleanAttribute });
  readonly defaultValue = input<FrSliderValue>(0);
  readonly valueInput = input<FrSliderValue | null>(null, { alias: 'value' });
  readonly ariaLabel = input('Slider thumb', { alias: 'aria-label' });
  readonly formatValue = input<((value: number) => string) | null>(null);

  readonly valueChange = output<FrSliderValue>();

  protected readonly values = signal<number[]>([0]);
  protected readonly activeThumb = signal<number | null>(null);
  protected readonly disabled = computed(() => this.disabledInput() || this.formDisabled());
  protected readonly invalid = computed(() => this.invalidInput() || this.formInvalid());
  protected readonly rangeStartPercent = computed(() => {
    const values = this.values();
    return values.length > 1 ? this.percentForValue(values[0]) : 0;
  });
  protected readonly rangeEndPercent = computed(() => {
    const values = this.values();
    return this.percentForValue(values.at(-1) ?? this.min());
  });

  ngDoCheck(): void {
    const inputKey = [
      this.valueInput(),
      this.defaultValue(),
      this.min(),
      this.max(),
      this.step(),
      this.minStepsBetweenThumbs(),
    ].map((value) => (Array.isArray(value) ? value.join(',') : String(value))).join('|');

    if (inputKey === this.lastInputKey) {
      return;
    }

    this.lastInputKey = inputKey;

    const controlledValue = this.valueInput();
    if (controlledValue !== null) {
      this.controlledByInput = true;
      this.values.set(this.normalizeValues(coerceValue(controlledValue)));
      return;
    }

    if (!this.controlledByInput) {
      this.values.set(this.normalizeValues(coerceValue(this.defaultValue())));
    }
  }

  protected setViewValue(value: FrSliderValue | null): void {
    if (value === null || value === undefined) {
      this.values.set(this.normalizeValues(coerceValue(this.defaultValue())));
      return;
    }

    this.values.set(this.normalizeValues(coerceValue(value)));
  }

  protected handleNativeInput(index: number, rawValue: string): void {
    this.commitThumbValue(index, Number(rawValue));
  }

  protected markTouched(): void {
    this.markAsTouched();
  }

  protected handlePointerDown(event: PointerEvent): void {
    if (this.disabled() || event.button !== 0) {
      return;
    }

    const target = event.target as HTMLElement | null;
    if (target?.classList.contains('frame-slider__native')) {
      return;
    }

    event.preventDefault();
    const index = this.closestThumbIndex(this.valueFromPointer(event));
    this.activeThumb.set(index);
    this.commitThumbValue(index, this.valueFromPointer(event));

    const move = (moveEvent: PointerEvent) => {
      moveEvent.preventDefault();
      this.commitThumbValue(index, this.valueFromPointer(moveEvent));
    };

    const up = () => {
      this.document.removeEventListener('pointermove', move);
      this.document.removeEventListener('pointerup', up);
      this.activeThumb.set(null);
      this.markTouched();
    };

    this.document.addEventListener('pointermove', move);
    this.document.addEventListener('pointerup', up, { once: true });
  }

  protected thumbLabel(index: number): string {
    const count = this.values().length;

    if (count === 1) {
      return this.ariaLabel();
    }

    if (index === 0) {
      return `${this.ariaLabel()} minimum`;
    }

    if (index === count - 1) {
      return `${this.ariaLabel()} maximum`;
    }

    return `${this.ariaLabel()} ${index + 1}`;
  }

  protected valueText(value: number): string {
    return this.formatValue()?.(value) ?? String(value);
  }

  protected percentForValue(value: number): number {
    const min = this.min();
    const max = this.max();
    const range = max - min;

    if (range <= 0) {
      return 0;
    }

    return ((value - min) / range) * 100;
  }

  private commitThumbValue(index: number, rawValue: number): void {
    const next = [...this.values()];
    next[index] = rawValue;
    const normalized = this.normalizeValues(next, index);
    this.values.set(normalized);

    const emitted = this.toExternalValue(normalized);
    this.notifyValueChange(emitted);
    this.valueChange.emit(emitted);
  }

  private normalizeValues(values: number[], activeIndex = -1): number[] {
    const min = Math.min(this.min(), this.max());
    const max = Math.max(this.min(), this.max());
    const step = Math.max(this.step(), 0.000001);
    const minDistance = Math.max(this.minStepsBetweenThumbs(), 0) * step;
    const normalized = values.length ? values : [min];

    // Only the active thumb is bounded by neighbors; passive thumbs keep their full range.
    return normalized.map((value, index) => {
      const previous = index > 0 ? normalized[index - 1] + minDistance : min;
      const next = index < normalized.length - 1 ? normalized[index + 1] - minDistance : max;
      const lower = activeIndex === index ? previous : min;
      const upper = activeIndex === index ? next : max;
      return this.snap(clampNumber(value, lower, upper), min, step);
    });
  }

  private snap(value: number, min: number, step: number): number {
    const decimals = String(step).split('.')[1]?.length ?? 0;
    return Number((Math.round((value - min) / step) * step + min).toFixed(decimals));
  }

  private toExternalValue(values: number[]): FrSliderValue {
    return values.length === 1 ? values[0] : values;
  }

  private valueFromPointer(event: PointerEvent): number {
    const rect = this.elementRef.nativeElement.getBoundingClientRect();
    const horizontal = this.orientation() === 'horizontal';
    const size = horizontal ? rect.width : rect.height;
    const offset = horizontal ? event.clientX - rect.left : rect.bottom - event.clientY;
    const direction = horizontal && this.isRtl() ? -1 : 1;
    let percent = size > 0 ? offset / size : 0;

    // Convert visual position into logical value direction for RTL and inverted sliders.
    if (direction === -1) {
      percent = 1 - percent;
    }

    if (this.inverted()) {
      percent = 1 - percent;
    }

    return this.min() + clampNumber(percent, 0, 1) * (this.max() - this.min());
  }

  private closestThumbIndex(value: number): number {
    return this.values().reduce((closestIndex, thumb, index, values) => {
      const currentDistance = Math.abs(value - thumb);
      const closestDistance = Math.abs(value - values[closestIndex]);
      return currentDistance < closestDistance ? index : closestIndex;
    }, 0);
  }

  private isRtl(): boolean {
    return getComputedStyle(this.elementRef.nativeElement).direction === 'rtl';
  }
}

