import {
  Directive,
  booleanAttribute,
  effect,
  input,
  output,
  signal,
} from '@angular/core';

import { ACCORDION_ROOT } from './accordion.tokens';
import { FrAccordionType } from './accordion.types';

@Directive({
  selector: '[frAccordion]',
  exportAs: 'frAccordion',
  standalone: true,
  providers: [{ provide: ACCORDION_ROOT, useExisting: FrAccordion }],
  host: {
    class: 'frame-accordion',
    '[attr.data-border]': 'border() ? "true" : "false"',
    '[attr.data-type]': 'type()',
  },
})
export class FrAccordion {
  readonly type = input<FrAccordionType>('single');
  readonly border = input(true, { transform: booleanAttribute });
  readonly collapsible = input(false, { transform: booleanAttribute });
  readonly defaultValue = input<string | readonly string[] | null>(null);
  readonly valueChange = output<string | string[] | null>();

  private readonly openItems = signal<string[]>([]);

  constructor() {
    effect(() => {
      this.openItems.set(this.normalizeValues(this.defaultValue(), this.type()));
    });
  }

  isItemOpen(value: string): boolean {
    return this.openItems().includes(value);
  }

  toggleItem(value: string): void {
    const current = this.openItems();
    const isOpen = current.includes(value);

    if (this.type() === 'multiple') {
      const next = isOpen
        ? current.filter((item) => item !== value)
        : [...current, value];
      this.commit(next);
      return;
    }

    if (isOpen) {
      if (!this.collapsible()) {
        return;
      }

      this.commit([]);
      return;
    }

    this.commit([value]);
  }

  private commit(next: string[]): void {
    this.openItems.set(next);

    if (this.type() === 'multiple') {
      this.valueChange.emit(next);
      return;
    }

    this.valueChange.emit(next[0] ?? null);
  }

  private normalizeValues(
    value: string | readonly string[] | null,
    type: FrAccordionType,
  ): string[] {
    if (Array.isArray(value)) {
      return type === 'multiple' ? [...value] : value.length ? [value[0]] : [];
    }

    if (value == null || value === '') {
      return [];
    }

    return [value as string];
  }
}
