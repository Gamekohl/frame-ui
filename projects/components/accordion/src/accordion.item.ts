import {
  Directive,
  booleanAttribute,
  computed,
  inject,
  input,
} from '@angular/core';

import { ACCORDION_ITEM, ACCORDION_ROOT } from './accordion.tokens';

let accordionItemId = 0;

@Directive({
  selector: '[frAccordionItem]',
  exportAs: 'frAccordionItem',
  standalone: true,
  providers: [{ provide: ACCORDION_ITEM, useExisting: FrAccordionItem }],
  host: {
    class: 'frame-accordion__item',
    '[attr.data-disabled]': 'disabled() ? "" : null',
    '[attr.data-state]': 'open() ? "open" : "closed"',
  },
})
export class FrAccordionItem {
  private readonly root = inject(ACCORDION_ROOT);
  private readonly itemId = ++accordionItemId;

  readonly value = input.required<string>();
  readonly disabled = input(false, { transform: booleanAttribute });

  readonly open = computed(() => this.root.isItemOpen(this.value()));
  readonly triggerId = computed(() => `frame-accordion-trigger-${this.itemId}`);
  readonly contentId = computed(() => `frame-accordion-content-${this.itemId}`);

  toggle(): void {
    if (this.disabled()) {
      return;
    }

    this.root.toggleItem(this.value());
  }
}
