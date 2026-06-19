import { AfterViewInit, Directive, DoCheck, ElementRef, OnDestroy, inject } from '@angular/core';

import { FR_COLLAPSIBLE } from './collapsible.tokens';

/** Content slot for collapsible. */
@Directive({
  selector: '[frCollapsibleContent]',
  standalone: true,
  host: {
    class: 'frame-collapsible__content',
    '[attr.aria-hidden]': 'collapsible.open() ? "false" : "true"',
    '[attr.aria-labelledby]': 'collapsible.triggerId()',
    '[attr.data-state]': 'collapsible.open() ? "open" : "closed"',
    '[attr.id]': 'collapsible.contentId()',
    '(transitionend)': 'onTransitionEnd($event)',
    role: 'region',
  },
})
export class FrCollapsibleContent implements AfterViewInit, DoCheck, OnDestroy {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  protected readonly collapsible = inject(FR_COLLAPSIBLE);
  private initialized = false;
  private lastOpen = false;
  private rafId = -1;

  ngAfterViewInit(): void {
    this.lastOpen = this.collapsible.open();
    this.applyStaticState(this.lastOpen);
    this.initialized = true;
  }

  ngDoCheck(): void {
    const open = this.collapsible.open();

    if (!this.initialized || open === this.lastOpen) {
      return;
    }

    this.cancelAnimationFrame();
    this.lastOpen = open;
    this.animate(open);
  }

  ngOnDestroy(): void {
    this.cancelAnimationFrame();
  }

  onTransitionEnd(event: TransitionEvent): void {
    if (event.target !== this.host.nativeElement || event.propertyName !== 'height') {
      return;
    }

    if (!this.collapsible.open()) {
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
