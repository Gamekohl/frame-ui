import {
  Component,
  DestroyRef,
  ElementRef,
  booleanAttribute,
  computed,
  contentChild,
  effect,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { CdkAccordionItem } from '@angular/cdk/accordion';

import { ACCORDION_ITEM, ACCORDION_ROOT } from './accordion.tokens';
import { FrAccordionContent } from './accordion.content';

/** Accordion item powered by Angular CDK accordion item state. */
@Component({
  selector: 'frame-accordion-item',
  exportAs: 'frameAccordionItem',
  standalone: true,
  imports: [NgTemplateOutlet],
  hostDirectives: [CdkAccordionItem],
  providers: [{ provide: ACCORDION_ITEM, useExisting: FrAccordionItem }],
  host: {
    class: 'frame-accordion__item',
    '[attr.data-disabled]': 'disabled() ? "" : null',
    '[attr.data-state]': 'open() ? "open" : "closed"',
  },
  template: `
    <ng-content select="button[frameAccordionTrigger]" />

    <div
      #contentPanel
      class="frame-accordion__content"
      [attr.aria-hidden]="open() ? null : 'true'"
      [attr.aria-labelledby]="triggerId()"
      [attr.id]="contentId()"
      [attr.data-state]="open() ? 'open' : 'closed'"
      [style.height]="contentHeight()"
      (transitionend)="onContentTransitionEnd($event)"
      role="region"
    >
      <div class="frame-accordion__content-inner">
        <ng-container [ngTemplateOutlet]="content()?.templateRef ?? null" />
      </div>
    </div>
  `,
})
export class FrAccordionItem {
  private readonly root = inject(ACCORDION_ROOT);
  private readonly cdkItem = inject(CdkAccordionItem, { self: true });
  private readonly destroyRef = inject(DestroyRef);
  private readonly expanded = signal(false);
  private frameId: number | null = null;
  private syncingDefaultState = false;

  readonly content = contentChild(FrAccordionContent);
  readonly contentPanel = viewChild<ElementRef<HTMLElement>>('contentPanel');
  readonly value = input.required<string>();
  readonly disabled = input(false, { transform: booleanAttribute });

  readonly open = computed(() => this.expanded());
  readonly contentHeight = signal('0px');
  readonly triggerId = computed(() => `frame-accordion-trigger-${this.cdkItem.id}`);
  readonly contentId = computed(() => `frame-accordion-content-${this.cdkItem.id}`);

  constructor() {
    const expandedSubscription = this.cdkItem.expandedChange.subscribe((expanded) => {
      this.setExpanded(expanded, !this.syncingDefaultState);

      if (!this.syncingDefaultState) {
        this.root.itemExpansionChanged(this.value(), expanded);
      }
    });

    this.destroyRef.onDestroy(() => {
      expandedSubscription.unsubscribe();
      this.cancelFrame();
    });

    effect(() => {
      this.cdkItem.disabled = this.disabled();
    });

    effect(() => {
      this.syncingDefaultState = true;
      const shouldBeExpanded = this.root.isDefaultItemOpen(this.value());

      if (this.cdkItem.expanded !== shouldBeExpanded) {
        this.cdkItem.expanded = shouldBeExpanded;
        this.setExpanded(shouldBeExpanded, false);
      }

      this.syncingDefaultState = false;
    });
  }

  toggle(): void {
    if (this.disabled()) {
      return;
    }

    if (this.open() && this.root.type() === 'single' && !this.root.collapsible()) {
      return;
    }

    this.root.syncCdkMode();
    this.cdkItem.toggle();
  }

  onContentTransitionEnd(event: TransitionEvent): void {
    if (event.target !== this.contentPanel()?.nativeElement || event.propertyName !== 'height') {
      return;
    }

    if (this.open()) {
      this.contentHeight.set('auto');
      return;
    }
  }

  private setExpanded(expanded: boolean, animate: boolean): void {
    this.expanded.set(expanded);

    if (expanded) {
      this.openContent(animate);
      return;
    }

    this.closeContent(animate);
  }

  private openContent(animate: boolean): void {
    this.cancelFrame();

    if (!animate) {
      this.contentHeight.set('auto');
      return;
    }

    this.contentHeight.set('0px');
    this.scheduleFrame(() => {
      const panel = this.contentPanel()?.nativeElement;

      if (!panel || !this.open()) {
        return;
      }

      this.contentHeight.set(`${panel.scrollHeight}px`);
    });
  }

  private closeContent(animate: boolean): void {
    this.cancelFrame();
    const panel = this.contentPanel()?.nativeElement;

    if (!animate || !panel) {
      this.contentHeight.set('0px');
      return;
    }

    this.contentHeight.set(`${panel.getBoundingClientRect().height}px`);
    this.scheduleFrame(() => {
      if (this.open()) {
        return;
      }

      this.contentHeight.set('0px');
    });
  }

  private scheduleFrame(callback: () => void): void {
    if (typeof globalThis.requestAnimationFrame === 'function') {
      this.frameId = globalThis.requestAnimationFrame(callback);
      return;
    }

    callback();
  }

  private cancelFrame(): void {
    if (this.frameId == null || typeof globalThis.cancelAnimationFrame !== 'function') {
      this.frameId = null;
      return;
    }

    globalThis.cancelAnimationFrame(this.frameId);
    this.frameId = null;
  }
}
