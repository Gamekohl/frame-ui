import { Directive, ElementRef, effect, inject, input } from '@angular/core';

import { FrTooltipContent } from './tooltip.content';
import { FR_TOOLTIP_CONTROLLER } from './tooltip.tokens';

@Directive({
  selector: '[frTooltipTrigger]',
  host: {
    class: 'frame-tooltip__trigger',
    '[attr.aria-describedby]': 'root.isOpen() ? content()?.id : null',
    '[attr.data-state]': 'root.isOpen() ? "open" : "closed"',
    '(mouseenter)': 'handleMouseEnter()',
    '(mouseleave)': 'handleMouseLeave()',
    '(focusin)': 'handleFocusIn()',
    '(focusout)': 'handleFocusOut()',
    '(keydown)': 'handleKeydown($event)',
  },
})
export class FrTooltipTrigger {
  readonly content = input<FrTooltipContent | null>(null, {
    alias: 'frTooltipTrigger',
  });

  protected readonly root = inject(FR_TOOLTIP_CONTROLLER);
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

  protected handleMouseEnter(): void {
    this.root.setContent(this.content());
    this.root.openWithDelay();
  }

  protected handleMouseLeave(): void {
    this.root.closeWithDelay();
  }

  protected handleFocusIn(): void {
    this.root.setContent(this.content());
    this.root.openWithDelay();
  }

  protected handleFocusOut(): void {
    this.root.closeWithDelay();
  }

  protected handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.root.close();
    }
  }
}
