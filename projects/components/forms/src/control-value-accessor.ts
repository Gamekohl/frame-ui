import {
  DestroyRef,
  Directive,
  Injector,
  OnInit,
  Type,
  computed,
  forwardRef,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';

export function provideDsValueAccessor(type: Type<ControlValueAccessor>) {
  return {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => type),
    multi: true,
  };
}

/** Base ControlValueAccessor implementation for FrameUI form controls. */
@Directive()
export abstract class FrControlValueAccessor<T> implements ControlValueAccessor, OnInit {
  private readonly injector = inject(Injector);
  private readonly FrControlDestroyRef = inject(DestroyRef);
  private readonly disabledFromForms = signal(false);
  private readonly controlStateVersion = signal(0);
  protected ngControl: NgControl | null = null;
  private onChange: (value: T) => void = () => {};
  private onTouched: () => void = () => {};

  protected readonly formDisabled = computed(() => this.disabledFromForms());
  protected readonly formInvalid = computed(() => {
    this.controlStateVersion();

    if (!this.ngControl) {
      return false;
    }

    return this.ngControl.invalid && (this.ngControl.touched || this.ngControl.dirty);
  });

  ngOnInit(): void {
    this.ngControl = this.injector.get(NgControl, null);

    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
      this.ngControl.statusChanges?.pipe(takeUntilDestroyed(this.FrControlDestroyRef)).subscribe(() => {
        this.refreshControlState();
      });
      this.ngControl.valueChanges?.pipe(takeUntilDestroyed(this.FrControlDestroyRef)).subscribe(() => {
        this.refreshControlState();
      });
      this.refreshControlState();
    }
  }

  writeValue(value: T): void {
    this.setViewValue(value);
  }

  registerOnChange(fn: (value: T) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabledFromForms.set(isDisabled);
  }

  protected notifyValueChange(value: T): void {
    this.onChange(value);
  }

  protected markAsTouched(): void {
    this.onTouched();
    this.refreshControlState();
  }

  protected abstract setViewValue(value: T): void;

  private refreshControlState(): void {
    this.controlStateVersion.update((version) => version + 1);
  }
}

