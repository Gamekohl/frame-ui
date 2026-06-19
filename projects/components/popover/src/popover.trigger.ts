import { Directive, DoCheck, ElementRef, inject, input } from '@angular/core';

import { FrPopoverContent } from './popover.content';
import { FR_POPOVER_CONTROLLER } from './popover.tokens';

/** Trigger control for popover. */
@Directive({
  selector: '[frPopoverTrigger]',
  host: {
    class: 'frame-popover__trigger',
    '[attr.aria-expanded]': 'root.isOpen()',
    '[attr.data-state]': 'root.isOpen() ? "open" : "closed"',
    '(click)': 'handleClick($event)',
    '(keydown)': 'handleKeydown($event)',
  },
})
export class FrPopoverTrigger implements DoCheck {
  readonly content = input<FrPopoverContent | null>(null, {
    alias: 'frPopoverTrigger',
  });

  protected readonly root = inject(FR_POPOVER_CONTROLLER);
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private lastContent: FrPopoverContent | null = null;

  constructor() {
    this.root.registerTrigger(this.elementRef.nativeElement);
  }

  ngDoCheck(): void {
    const content = this.content();

    if (content && content !== this.lastContent) {
      this.root.setContent(content);
    }

    this.lastContent = content;
  }

  protected handleClick(event: Event): void {
    event.preventDefault();
    this.root.setContent(this.content());
    this.root.toggle();
  }

  protected handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.root.close();
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.root.setContent(this.content());
      this.root.toggle();
    }
  }
}
