import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  booleanAttribute,
  computed,
  effect,
  input,
  output,
  signal,
} from '@angular/core';

import { FrControlValueAccessor, provideDsValueAccessor } from '@frame-ui/components/forms';

export const FR_TOGGLE_VARIANTS = ['default', 'outline'] as const;
export const FR_TOGGLE_SIZES = ['sm', 'default', 'lg'] as const;
export const FR_TOGGLE_TYPES = ['button', 'submit', 'reset'] as const;

export type FrToggleVariant = (typeof FR_TOGGLE_VARIANTS)[number];
export type FrToggleSize = (typeof FR_TOGGLE_SIZES)[number];
export type FrToggleType = (typeof FR_TOGGLE_TYPES)[number];

function booleanOrNullAttribute(value: unknown): boolean | null {
  return value === null || value === undefined ? null : booleanAttribute(value);
}

@Component({
  selector: 'button[frToggle]',
  exportAs: 'frToggle',
  providers: [provideDsValueAccessor(FrToggle)],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'frame-toggle',
    '[attr.aria-pressed]': 'pressed()',
    '[attr.data-state]': 'pressed() ? "on" : "off"',
    '[attr.data-variant]': 'variant()',
    '[attr.data-size]': 'size()',
    '[attr.data-disabled]': 'disabled() ? "" : null',
    '[attr.disabled]': 'disabled() ? "" : null',
    '[attr.type]': 'type()',
    '(blur)': 'markTouched()',
    '(click)': 'togglePressed($event)',
  },
  template: `<ng-content />`,
})
export class FrToggle extends FrControlValueAccessor<boolean> {
  private readonly internalPressed = signal(false);
  private controlledByInput = false;

  readonly defaultPressed = input(false, { transform: booleanAttribute });
  readonly pressedInput = input<boolean | null, unknown>(null, {
    alias: 'pressed',
    transform: booleanOrNullAttribute,
  });
  readonly disabledInput = input(false, { alias: 'disabled', transform: booleanAttribute });
  readonly variant = input<FrToggleVariant>('default');
  readonly size = input<FrToggleSize>('default');
  readonly type = input<FrToggleType>('button');

  readonly pressedChange = output<boolean>();

  protected readonly disabled = computed(() => this.disabledInput() || this.formDisabled());
  protected readonly pressed = computed(() => this.internalPressed());

  constructor() {
    super();

    effect(() => {
      const pressed = this.pressedInput();

      if (pressed !== null) {
        this.controlledByInput = true;
        this.internalPressed.set(pressed);
        return;
      }

      if (!this.controlledByInput) {
        this.internalPressed.set(this.defaultPressed());
      }
    });
  }

  protected setViewValue(value: boolean | null): void {
    this.internalPressed.set(!!value);
  }

  protected togglePressed(event: MouseEvent): void {
    if (this.disabled()) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }

    const next = !this.internalPressed();
    this.internalPressed.set(next);
    this.notifyValueChange(next);
    this.pressedChange.emit(next);
    this.markAsTouched();
  }

  protected markTouched(): void {
    this.markAsTouched();
  }
}

@Directive({
  selector: '[frToggleIcon]',
  host: {
    class: 'frame-toggle__icon',
    'aria-hidden': 'true',
  },
})
export class FrToggleIcon {}

@Directive({
  selector: '[frToggleLabel]',
  host: {
    class: 'frame-toggle__label',
  },
})
export class FrToggleLabel {}
