import {
  DestroyRef,
  Directive,
  ElementRef,
  booleanAttribute,
  computed,
  effect,
  inject,
  input,
  model,
  signal,
} from '@angular/core';

import { FrDropdownMenu } from '@frame-ui/components/dropdown-menu';
import { FrDropdownMenuTrigger } from '@frame-ui/components/dropdown-menu';
import { FrControlValueAccessor, provideDsValueAccessor } from '@frame-ui/components/forms';
import { FrSelectContent } from './select.content';

export const FR_SELECT_INDICATOR_POSITIONS = ['start', 'end'] as const;
export type FrSelectIndicatorPosition = (typeof FR_SELECT_INDICATOR_POSITIONS)[number];

@Directive({
  selector: 'button[frSelect]',
  hostDirectives: [
    {
      directive: FrDropdownMenu,
      inputs: ['closeDelay', 'triggerMode'],
    },
    {
      directive: FrDropdownMenuTrigger,
      inputs: ['frDropdownMenuTrigger: frSelect'],
    },
  ],
  providers: [provideDsValueAccessor(FrSelect)],
  host: {
    class: 'frame-select__trigger',
    '[attr.aria-disabled]': 'disabled() ? "true" : null',
    '[attr.aria-invalid]': 'invalid() ? "true" : null',
    '[attr.data-disabled]': 'disabled() ? "" : null',
    '[attr.data-invalid]': 'invalid() ? "" : null',
    '[attr.disabled]': 'disabled() ? "" : null',
    'aria-autocomplete': 'none',
    'aria-haspopup': 'listbox',
    type: 'button',
    role: 'combobox',
  },
})
export class FrSelect extends FrControlValueAccessor<string | null> {
  private readonly destroyRef = inject(DestroyRef);
  private readonly dropdownTrigger = inject(FrDropdownMenuTrigger);
  private readonly elementRef = inject<ElementRef<HTMLButtonElement>>(ElementRef);
  private readonly selectedLabel = signal<string | null>(null);
  private readonly labels = new Map<string | null, string>();
  private resizeObserver: ResizeObserver | null = null;

  readonly value = model<string | null>(null);
  readonly debugVisible = input(false, { transform: booleanAttribute });
  readonly disabledInput = input(false, { alias: 'disabled', transform: booleanAttribute });
  readonly indicatorPosition = input<FrSelectIndicatorPosition>('start');
  readonly invalidInput = input(false, { alias: 'invalid', transform: booleanAttribute });
  readonly disabled = computed(() => this.disabledInput() || this.formDisabled());
  readonly invalid = computed(() => this.invalidInput() || this.formInvalid());

  readonly displayValue = computed(() => {
    const value = this.value();

    if (value === null) {
      return null;
    }

    return this.selectedLabel() ?? this.labels.get(value) ?? value;
  });

  constructor() {
    super();

    effect(() => {
      const content = this.dropdownTrigger.menuContent() as FrSelectContent | null;

      if (content) {
        content.select = this;
        content.setDebugVisibleOverride(this.debugVisible() ? true : null);
        content.setTriggerWidth(this.elementRef.nativeElement.offsetWidth);
        content.ensureItemsRegistered();
      }
    });

    queueMicrotask(() => {
      this.attachResizeObserver();
    });

    this.destroyRef.onDestroy(() => {
      this.resizeObserver?.disconnect();
    });
  }

  registerItem(value: string | null, label: string): void {
    this.labels.set(value, label);

    if (this.value() === value) {
      this.selectedLabel.set(label);
    }
  }

  selectValue(value: string | null, label: string): void {
    this.labels.set(value, label);
    this.selectedLabel.set(label);
    this.value.set(value);
    this.notifyValueChange(value);
    this.markAsTouched();
  }

  protected setViewValue(value: string | null): void {
    this.value.set(value);

    if (value === null) {
      this.selectedLabel.set(null);
      return;
    }

    this.selectedLabel.set(this.labels.get(value) ?? null);
  }

  private attachResizeObserver(): void {
    if (typeof ResizeObserver === 'undefined') {
      return;
    }

    const element = this.elementRef.nativeElement;

    this.resizeObserver = new ResizeObserver(() => {
      const content = this.dropdownTrigger.menuContent() as FrSelectContent | null;
      content?.setTriggerWidth(element.offsetWidth);
    });
    this.resizeObserver.observe(element);
  }
}

