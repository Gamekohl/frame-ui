import { Directive, inject } from '@angular/core';

import { ACCORDION_ITEM } from './accordion.tokens';

/** Trigger control for accordion items. */
@Directive({
  selector: 'button[frameAccordionTrigger]',
  standalone: true,
  host: {
    class: 'frame-accordion__trigger',
    '[attr.aria-controls]': 'item.contentId()',
    '[attr.aria-expanded]': 'item.open() ? "true" : "false"',
    '[attr.data-disabled]': 'item.disabled() ? "" : null',
    '[attr.data-state]': 'item.open() ? "open" : "closed"',
    '[attr.disabled]': 'item.disabled() ? "" : null',
    '[attr.id]': 'item.triggerId()',
    'type': 'button',
    '(click)': 'item.toggle()',
  },
})
export class FrAccordionTrigger {
  protected readonly item = inject(ACCORDION_ITEM);
}

/** Optional icon slot for accordion triggers. */
@Directive({
  selector: '[frameAccordionIcon]',
  standalone: true,
  host: {
    class: 'frame-accordion__icon',
    'aria-hidden': 'true',
  },
})
export class FrAccordionIcon {}
