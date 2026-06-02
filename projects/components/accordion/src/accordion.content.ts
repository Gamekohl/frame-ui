import { Directive, ElementRef, effect, inject } from '@angular/core';

import { ACCORDION_ITEM } from './accordion.tokens';

@Directive({
  selector: '[frAccordionContent]',
  standalone: true,
  host: {
    class: 'frame-accordion__content',
    '[attr.aria-hidden]': 'item.open() ? "false" : "true"',
    '[attr.aria-labelledby]': 'item.triggerId()',
    '[attr.data-state]': 'item.open() ? "open" : "closed"',
    '[attr.id]': 'item.contentId()',
    '(transitionend)': 'onTransitionEnd($event)',
    'role': 'region',
  },
})
export class FrAccordionContent {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  protected readonly item = inject(ACCORDION_ITEM);
  private initialized = false;
  private rafId = -1;

  constructor() {
    effect((onCleanup) => {
      const open = this.item.open();

      this.cancelAnimationFrame();

      if (!this.initialized) {
        this.applyStaticState(open);
        this.initialized = true;
        return;
      }

      this.animate(open);
      onCleanup(() => this.cancelAnimationFrame());
    });
  }

  onTransitionEnd(event: TransitionEvent): void {
    if (event.target !== this.host.nativeElement || event.propertyName !== 'height') {
      return;
    }

    if (!this.item.open()) {
      this.host.nativeElement.style.visibility = 'hidden';
      return;
    }

    this.host.nativeElement.style.height = 'auto';
  }

  private animate(open: boolean): void {
    const element = this.host.nativeElement;

    if (open) {
      element.style.visibility = 'visible';
      element.style.height = '0px';
      element.style.opacity = '0';

      this.rafId = requestAnimationFrame(() => {
        element.style.height = `${element.scrollHeight}px`;
        element.style.opacity = '1';
      });
      return;
    }

    element.style.height = `${element.scrollHeight}px`;
    element.style.opacity = '1';

    this.rafId = requestAnimationFrame(() => {
      element.style.height = '0px';
      element.style.opacity = '0';
    });
  }

  private applyStaticState(open: boolean): void {
    const element = this.host.nativeElement;

    element.style.height = open ? 'auto' : '0px';
    element.style.opacity = open ? '1' : '0';
    element.style.visibility = open ? 'visible' : 'hidden';
  }

  private cancelAnimationFrame(): void {
    if (this.rafId === -1) {
      return;
    }

    cancelAnimationFrame(this.rafId);
    this.rafId = -1;
  }
}
