import { Directive, ElementRef, effect, inject, input } from '@angular/core';

import { FrPopoverContent } from './popover.content';
import { FR_POPOVER_CONTROLLER } from './popover.tokens';

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
export class FrPopoverTrigger {
  readonly content = input<FrPopoverContent | null>(null, {
    alias: 'frPopoverTrigger',
  });

  protected readonly root = inject(FR_POPOVER_CONTROLLER);
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  constructor() {
    this.root.registerTrigger(this.elementRef.nativeElement);

    effect(() => {
      const content = this.content();

      if (content) {
        this.root.setContent(content);
      }
    });
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
