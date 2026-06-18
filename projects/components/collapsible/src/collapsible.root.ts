import {
  Directive,
  booleanAttribute,
  computed,
  input,
  linkedSignal,
  output,
} from '@angular/core';

import { FR_COLLAPSIBLE } from './collapsible.tokens';

let collapsibleId = 0;

/** Root controller for expandable collapsible content. */
@Directive({
  selector: '[frCollapsible], frame-collapsible',
  exportAs: 'frCollapsible',
  standalone: true,
  providers: [{ provide: FR_COLLAPSIBLE, useExisting: FrCollapsible }],
  host: {
    class: 'frame-collapsible',
    '[attr.data-disabled]': 'disabled() ? "" : null',
    '[attr.data-state]': 'open() ? "open" : "closed"',
  },
})
export class FrCollapsible {
  private readonly collapsibleId = ++collapsibleId;
  private readonly internalOpen = linkedSignal(() => this.defaultOpen());

  readonly defaultOpen = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly openInput = input<boolean | undefined>(undefined, { alias: 'open' });
  readonly openChange = output<boolean>();

  readonly open = computed(() => this.openInput() ?? this.internalOpen());
  readonly triggerId = computed(() => `frame-collapsible-trigger-${this.collapsibleId}`);
  readonly contentId = computed(() => `frame-collapsible-content-${this.collapsibleId}`);

  toggle(): void {
    if (this.disabled()) {
      return;
    }

    this.setOpen(!this.open());
  }

  setOpen(open: boolean): void {
    if (this.disabled() || open === this.open()) {
      return;
    }

    if (this.openInput() === undefined) {
      this.internalOpen.set(open);
    }

    this.openChange.emit(open);
  }
}

