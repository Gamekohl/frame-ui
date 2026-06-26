import { AfterViewInit, Directive, ElementRef, OnDestroy, effect, inject } from '@angular/core';

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
export class FrCollapsibleContent implements AfterViewInit, OnDestroy {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  protected readonly collapsible = inject(FR_COLLAPSIBLE);
  private animationFrameId = -1;
  private initialized = false;
  private lastOpen = false;
  private mutationObserver?: MutationObserver;
  private resizeFrameId = -1;
  private resizeObserver?: ResizeObserver;

  constructor() {
    effect(() => {
      const open = this.collapsible.open();

      if (!this.initialized || open === this.lastOpen) {
        this.lastOpen = open;
        return;
      }

      this.lastOpen = open;
      this.animate(open);
    });
  }

  ngAfterViewInit(): void {
    this.lastOpen = this.collapsible.open();
    this.applyStaticState(this.lastOpen);
    this.observeContentSize();
    this.initialized = true;
  }

  ngOnDestroy(): void {
    this.cancelAnimationFrame();
    this.cancelResizeFrame();
    this.mutationObserver?.disconnect();
    this.resizeObserver?.disconnect();
  }

  onTransitionEnd(event: TransitionEvent): void {
    if (event.target !== this.host.nativeElement || event.propertyName !== 'height') {
      return;
    }

    if (!this.collapsible.open()) {
      this.host.nativeElement.style.visibility = 'hidden';
      return;
    }

    this.setOpenHeight();
  }

  private animate(open: boolean): void {
    const element = this.host.nativeElement;

    this.cancelAnimationFrame();
    this.cancelResizeFrame();

    if (open) {
      element.style.visibility = 'visible';
      element.style.height = '0px';
      element.style.opacity = '0';

      this.animationFrameId = requestAnimationFrame(() => {
        element.style.height = `${element.scrollHeight}px`;
        element.style.opacity = '1';
      });
      return;
    }

    element.style.height = `${element.getBoundingClientRect().height || element.scrollHeight}px`;
    element.style.opacity = '1';

    void element.offsetHeight;

    element.style.height = '0px';
    element.style.opacity = '0';
  }

  private applyStaticState(open: boolean): void {
    const element = this.host.nativeElement;

    element.style.height = open ? 'auto' : '0px';
    element.style.opacity = open ? '1' : '0';
    element.style.visibility = open ? 'visible' : 'hidden';
  }

  private cancelAnimationFrame(): void {
    if (this.animationFrameId === -1) {
      return;
    }

    cancelAnimationFrame(this.animationFrameId);
    this.animationFrameId = -1;
  }

  private cancelResizeFrame(): void {
    if (this.resizeFrameId === -1) {
      return;
    }

    cancelAnimationFrame(this.resizeFrameId);
    this.resizeFrameId = -1;
  }

  private observeContentSize(): void {
    if (typeof ResizeObserver === 'undefined') {
      return;
    }

    this.resizeObserver = new ResizeObserver(() => this.scheduleOpenHeightSync());
    this.observeResizeTargets();

    if (typeof MutationObserver === 'undefined') {
      return;
    }

    this.mutationObserver = new MutationObserver(() => {
      this.observeResizeTargets();
      this.scheduleOpenHeightSync();
    });
    this.mutationObserver.observe(this.host.nativeElement, { childList: true });
  }

  private observeResizeTargets(): void {
    if (!this.resizeObserver) {
      return;
    }

    const element = this.host.nativeElement;
    const targets = Array.from(element.children);

    this.resizeObserver.disconnect();

    if (targets.length === 0) {
      this.resizeObserver.observe(element);
      return;
    }

    targets.forEach((target) => this.resizeObserver?.observe(target));
  }

  private scheduleOpenHeightSync(): void {
    if (!this.initialized || !this.collapsible.open()) {
      return;
    }

    this.cancelResizeFrame();
    this.resizeFrameId = requestAnimationFrame(() => this.setOpenHeight());
  }

  private setOpenHeight(): void {
    if (!this.collapsible.open()) {
      return;
    }

    this.host.nativeElement.style.height = `${this.host.nativeElement.scrollHeight}px`;
  }
}
