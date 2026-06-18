import { Directive, DoCheck, ElementRef, inject, input } from '@angular/core';

import { FrHoverCardContent } from './hover-card.content';
import { FR_HOVER_CARD_CONTROLLER } from './hover-card.tokens';

/** Trigger control for hover card. */
@Directive({
  selector: '[frHoverCardTrigger]',
  host: {
    class: 'frame-hover-card__trigger',
    '[attr.aria-expanded]': 'root.isOpen()',
    '[attr.data-state]': 'root.isOpen() ? "open" : "closed"',
    '(mouseenter)': 'handleMouseEnter()',
    '(mouseleave)': 'handleMouseLeave()',
    '(focusin)': 'handleFocusIn()',
    '(focusout)': 'handleFocusOut()',
    '(keydown)': 'handleKeydown($event)',
  },
})
export class FrHoverCardTrigger implements DoCheck {
  readonly content = input<FrHoverCardContent | null>(null, {
    alias: 'frHoverCardTrigger',
  });

  protected readonly root = inject(FR_HOVER_CARD_CONTROLLER);
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private lastContent: FrHoverCardContent | null = null;

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

  protected handleMouseEnter(): void {
    this.root.setContent(this.content());
    this.root.enterInteractiveArea();
    this.root.openWithDelay();
  }

  protected handleMouseLeave(): void {
    this.root.leaveInteractiveArea();
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
