import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  ElementRef,
  InjectionToken,
  ViewChild,
  booleanAttribute,
  computed,
  inject,
  input,
  numberAttribute,
  output,
  signal,
} from '@angular/core';

import { FrControlValueAccessor, provideDsValueAccessor } from '@frame-ui/components/forms';
import { FrInput } from '@frame-ui/components/input';

export const FR_INPUT_OTP_PATTERN_DIGITS = /^[0-9]$/;
export const FR_INPUT_OTP_PATTERN_DIGITS_AND_CHARS = /^[a-zA-Z0-9]$/;

export type FrInputOtpPattern = RegExp | string | null;

type FrInputOtpController = {
  activeIndex: () => number;
  charAt: (index: number) => string;
  disabled: () => boolean;
  focus: (index?: number) => void;
  invalid: () => boolean;
};

const FR_INPUT_OTP_CONTROLLER = new InjectionToken<FrInputOtpController>('FrInputOtpController');

@Component({
  selector: 'frame-input-otp',
  exportAs: 'frInputOtp',
  imports: [FrInput],
  providers: [
    provideDsValueAccessor(FrInputOtp),
    {
      provide: FR_INPUT_OTP_CONTROLLER,
      useExisting: FrInputOtp,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'frame-input-otp',
    role: 'group',
    '[attr.data-disabled]': 'disabled() ? "" : null',
    '[attr.data-invalid]': 'invalid() ? "" : null',
    '[attr.data-complete]': 'isComplete() ? "" : null',
    '(click)': 'focus(activeIndex())',
  },
  template: `
    <input
      #nativeInput
      frInput
      class="frame-input-otp__native"
      type="text"
      inputmode="numeric"
      autocomplete="one-time-code"
      [attr.aria-invalid]="invalid() ? 'true' : null"
      [attr.aria-label]="ariaLabel()"
      [disabled]="disabled()"
      [maxLength]="maxLength()"
      [value]="value()"
      (blur)="markTouched()"
      (focus)="syncActiveIndex()"
      (input)="handleNativeInput($any($event.target).value)"
      (keydown)="handleKeydown($event)"
      (paste)="handlePaste($event)"
      (select)="syncActiveIndex()"
      (click)="syncActiveIndex()"
    />

    <ng-content />
  `,
})
export class FrInputOtp extends FrControlValueAccessor<string> {
  @ViewChild('nativeInput') private readonly nativeInput?: ElementRef<HTMLInputElement>;

  readonly maxLength = input(6, { transform: numberAttribute });
  readonly pattern = input<FrInputOtpPattern>(FR_INPUT_OTP_PATTERN_DIGITS);
  readonly disabledInput = input(false, { alias: 'disabled', transform: booleanAttribute });
  readonly invalidInput = input(false, { alias: 'invalid', transform: booleanAttribute });
  readonly ariaLabel = input('One-time password');

  readonly valueChange = output<string>();
  readonly complete = output<string>();

  protected readonly value = signal('');
  readonly activeIndex = signal(0);
  readonly disabled = computed(() => this.disabledInput() || this.formDisabled());
  readonly invalid = computed(() => this.invalidInput() || this.formInvalid());
  readonly isComplete = computed(() => this.value().length >= this.maxLength());

  focus(index = this.activeIndex()): void {
    if (this.disabled()) {
      return;
    }

    const inputElement = this.nativeInput?.nativeElement;

    if (!inputElement) {
      return;
    }

    const nextIndex = clamp(index, 0, this.maxLength());
    inputElement.focus();
    inputElement.setSelectionRange(nextIndex, nextIndex);
    this.activeIndex.set(nextIndex);
  }

  charAt(index: number): string {
    return this.value().at(index) ?? '';
  }

  handleNativeInput(rawValue: string): void {
    this.commitValue(this.sanitize(rawValue));
    this.syncActiveIndex();
  }

  handleKeydown(event: KeyboardEvent): void {
    if (this.disabled()) {
      return;
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.focus(this.activeIndex() - 1);
      return;
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.focus(this.activeIndex() + 1);
      return;
    }

    if (event.key === 'Backspace') {
      event.preventDefault();
      this.removeAt(this.activeIndex());
      return;
    }

    if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
      event.preventDefault();
      this.insertAt(event.key, this.activeIndex());
    }
  }

  handlePaste(event: ClipboardEvent): void {
    const text = event.clipboardData?.getData('text') ?? '';

    if (!text) {
      return;
    }

    event.preventDefault();
    const next = this.replaceFrom(this.activeIndex(), this.sanitize(text));
    this.commitValue(next);
    this.focus(Math.min(next.length, this.maxLength()));
  }

  syncActiveIndex(): void {
    const inputElement = this.nativeInput?.nativeElement;
    const index = inputElement?.selectionStart ?? this.value().length;
    this.activeIndex.set(clamp(index, 0, this.maxLength()));
  }

  markTouched(): void {
    this.markAsTouched();
  }

  protected setViewValue(value: string | null): void {
    this.value.set(this.sanitize(value ?? ''));
    this.activeIndex.set(Math.min(this.value().length, this.maxLength()));
  }

  private insertAt(character: string, index: number): void {
    const sanitized = this.sanitize(character);

    if (!sanitized) {
      return;
    }

    const next = this.replaceFrom(index, sanitized.at(0) ?? '');
    this.commitValue(next);
    this.focus(Math.min(index + 1, this.maxLength()));
  }

  private removeAt(index: number): void {
    const value = this.value();
    const targetIndex = value.at(index) ? index : index - 1;

    if (targetIndex < 0) {
      return;
    }

    const next = `${value.slice(0, targetIndex)}${value.slice(targetIndex + 1)}`;
    this.commitValue(next);
    this.focus(targetIndex);
  }

  private replaceFrom(index: number, text: string): string {
    const value = this.value();
    const start = clamp(index, 0, this.maxLength());
    const next = `${value.slice(0, start)}${text}${value.slice(start + text.length)}`;

    return this.sanitize(next);
  }

  private commitValue(value: string): void {
    const next = this.sanitize(value);
    this.value.set(next);
    this.notifyValueChange(next);
    this.valueChange.emit(next);

    if (next.length >= this.maxLength()) {
      this.complete.emit(next);
    }
  }

  private sanitize(value: string): string {
    const matcher = toMatcher(this.pattern());
    const characters = Array.from(value).filter((character) => matcher(character));

    return characters.slice(0, this.maxLength()).join('');
  }
}

@Directive({
  selector: '[frInputOtpGroup], frame-input-otp-group',
  host: {
    class: 'frame-input-otp__group',
  },
})
export class FrInputOtpGroup {}

@Component({
  selector: '[frInputOtpSlot], frame-input-otp-slot',
  imports: [NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'frame-input-otp__slot',
    role: 'presentation',
    '[attr.data-active]': 'active() ? "" : null',
    '[attr.data-filled]': 'filled() ? "" : null',
    '[attr.data-invalid]': 'root.invalid() ? "" : null',
    '[attr.data-disabled]': 'root.disabled() ? "" : null',
    '(click)': 'root.focus(index())',
  },
  template: `
    <span class="frame-input-otp__slot-char" [ngClass]="{ 'frame-input-otp__slot-char--empty': !filled() }">
      {{ char() || placeholder() }}
    </span>
  `,
})
export class FrInputOtpSlot {
  protected readonly root = inject(FR_INPUT_OTP_CONTROLLER);

  readonly index = input.required<number>();
  readonly placeholder = input('');

  readonly char = computed(() => this.root.charAt(this.index()));
  readonly filled = computed(() => !!this.char());
  readonly active = computed(() => this.root.activeIndex() === this.index());
}

@Directive({
  selector: '[frInputOtpSeparator], frame-input-otp-separator',
  host: {
    class: 'frame-input-otp__separator',
    role: 'separator',
    'aria-hidden': 'true',
  },
})
export class FrInputOtpSeparator {}

function toMatcher(pattern: FrInputOtpPattern): (character: string) => boolean {
  if (!pattern) {
    return () => true;
  }

  if (pattern instanceof RegExp) {
    return (character) => {
      pattern.lastIndex = 0;
      return pattern.test(character);
    };
  }

  const regex = new RegExp(pattern);
  return (character) => regex.test(character);
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

