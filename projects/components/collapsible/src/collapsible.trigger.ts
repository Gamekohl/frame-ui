import { Directive, inject } from '@angular/core';

import { FR_COLLAPSIBLE } from './collapsible.tokens';

@Directive({
  selector: 'button[frCollapsibleTrigger]',
  standalone: true,
  host: {
    class: 'frame-collapsible__trigger',
    '[attr.aria-controls]': 'collapsible.contentId()',
    '[attr.aria-expanded]': 'collapsible.open() ? "true" : "false"',
    '[attr.data-disabled]': 'collapsible.disabled() ? "" : null',
    '[attr.data-state]': 'collapsible.open() ? "open" : "closed"',
    '[attr.disabled]': 'collapsible.disabled() ? "" : null',
    '[attr.id]': 'collapsible.triggerId()',
    type: 'button',
    '(click)': 'collapsible.toggle()',
  },
})
export class FrCollapsibleTrigger {
  protected readonly collapsible = inject(FR_COLLAPSIBLE);
}
