import {
  Component,
  booleanAttribute,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { CdkAccordion } from '@angular/cdk/accordion';

import { ACCORDION_ROOT } from './accordion.tokens';
import { FrAccordionType } from './accordion.types';

/** Accordion root powered by Angular CDK accordion state management. */
@Component({
  selector: 'frame-accordion',
  exportAs: 'frameAccordion',
  standalone: true,
  hostDirectives: [CdkAccordion],
  providers: [{ provide: ACCORDION_ROOT, useExisting: FrAccordion }],
  host: {
    class: 'frame-accordion',
    '[attr.data-border]': 'border() ? "true" : "false"',
    '[attr.data-type]': 'type()',
  },
  template: `<ng-content />`,
})
export class FrAccordion {
  private readonly cdkAccordion = inject(CdkAccordion, { self: true });

  readonly type = input<FrAccordionType>('single');
  readonly border = input(false, { transform: booleanAttribute });
  readonly collapsible = input(false, { transform: booleanAttribute });
  readonly defaultValue = input<string | readonly string[] | null>(null);
  readonly valueChange = output<string | string[] | null>();

  private readonly defaultOpenValues = computed(() =>
    this.normalizeValues(this.defaultValue(), this.type()),
  );
  private readonly currentOpenValues = signal<string[]>([]);
  private readonly openValues = computed(() => new Set(this.currentOpenValues()));

  constructor() {
    effect(() => {
      this.cdkAccordion.multi = this.type() === 'multiple';
      this.currentOpenValues.set(this.defaultOpenValues());
    });
  }

  isDefaultItemOpen(value: string): boolean {
    return this.currentOpenValues().includes(value);
  }

  itemExpansionChanged(value: string, expanded: boolean): void {
    const current = this.openValues();
    const next = expanded
      ? this.type() === 'multiple'
        ? [...new Set([...current, value])]
        : [value]
      : [...current].filter((item) => item !== value);

    this.currentOpenValues.set(next);
    this.valueChange.emit(this.type() === 'multiple' ? next : (next[0] ?? null));
  }

  openAll(): void {
    this.cdkAccordion.openAll();
  }

  closeAll(): void {
    this.cdkAccordion.closeAll();
  }

  syncCdkMode(): void {
    this.cdkAccordion.multi = this.type() === 'multiple';
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
