import { ConnectedOverlayPositionChange, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { DOCUMENT, NgTemplateOutlet, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  DestroyRef,
  Directive,
  ElementRef,
  PLATFORM_ID,
  TemplateRef,
  booleanAttribute,
  effect,
  inject,
  input,
  signal,
  numberAttribute,
} from '@angular/core';

import { buildTooltipPositions } from './tooltip.position';
import { FR_TOOLTIP_TOKEN_NAMES } from './tooltip.tokens';
import { FrTooltipAlignment, FrTooltipSide } from './tooltip.types';

let nextInlineTooltipId = 0;

@Directive({
  selector: '[frTooltip]',
  host: {
    class: 'frame-tooltip__trigger',
    '[attr.aria-describedby]': 'isOpen() ? tooltipId : null',
    '[attr.data-state]': 'isOpen() ? "open" : "closed"',
  },
})
export class FrTooltipDirective implements AfterViewInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly document = inject(DOCUMENT);
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly overlay = inject(Overlay);
  private readonly platformId = inject(PLATFORM_ID);

  readonly content = input<string | TemplateRef<unknown> | null>(null, { alias: 'frTooltip' });
  readonly align = input<FrTooltipAlignment>('center', { alias: 'frTooltipAlign' });
  readonly alignOffset = input(0, { alias: 'frTooltipAlignOffset' });
  readonly arrow = input(false, { alias: 'frTooltipArrow', transform: booleanAttribute });
  readonly closeDelay = input(0, { alias: 'frTooltipCloseDelay' });
  readonly openDelay = input(0, { alias: 'frTooltipOpenDelay', transform: numberAttribute });
  readonly side = input<FrTooltipSide>('top', { alias: 'frTooltipSide' });
  readonly sideOffset = input(8, { alias: 'frTooltipSideOffset' });

  protected readonly isOpen = signal(false);
  protected readonly tooltipId = `frame-tooltip-inline-${nextInlineTooltipId++}`;

  private closeTimer: ReturnType<typeof setTimeout> | null = null;
  private disabledObserver: MutationObserver | null = null;
  private openTimer: ReturnType<typeof setTimeout> | null = null;
  private overlayRef: OverlayRef | null = null;
  private panelRef: ComponentRef<FrTooltipInlinePanel> | null = null;
  private triggerElement = this.elementRef.nativeElement;
  private wrapped = false;
  private wrapper: HTMLElement | null = null;
  private teardownListeners: Array<() => void> = [];

  constructor() {
    this.destroyRef.onDestroy(() => this.destroy());

    effect(() => {
      const content = this.content();

      if (this.panelRef && content) {
        this.updatePanelInputs();
      }

      if (!content) {
        this.close();
      }
    });
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.ensureDisabledHostWrapper();
    this.bindTriggerEvents();
    this.observeDisabledState();
  }

  private bindTriggerEvents(): void {
    const target = this.triggerElement;

    this.teardownListeners.push(this.listen(target, 'mouseenter', () => this.openWithDelay()));
    this.teardownListeners.push(this.listen(target, 'mouseleave', () => this.closeWithDelay()));
    this.teardownListeners.push(this.listen(target, 'focusin', () => this.openWithDelay()));
    this.teardownListeners.push(this.listen(target, 'focusout', () => this.closeWithDelay()));
    this.teardownListeners.push(
      this.listen(target, 'keydown', (event) => {
        const keyboardEvent = event as KeyboardEvent;

        if (keyboardEvent.key === 'Escape') {
          keyboardEvent.preventDefault();
          this.close();
        }
      }),
    );
  }

  private ensureDisabledHostWrapper(): void {
    const element = this.elementRef.nativeElement;

    if (!('disabled' in element) || !element.hasAttribute('disabled') || this.wrapped) {
      return;
    }

    const parent = element.parentNode;

    if (!parent) {
      return;
    }

    const wrapper = this.document.createElement('span');
    wrapper.className = 'frame-tooltip__disabled-trigger';
    wrapper.tabIndex = 0;
    parent.insertBefore(wrapper, element);
    wrapper.appendChild(element);
    this.triggerElement = wrapper;
    this.wrapper = wrapper;
    this.wrapped = true;
  }

  private observeDisabledState(): void {
    const element = this.elementRef.nativeElement;

    if (!('disabled' in element)) {
      return;
    }

    this.disabledObserver = new MutationObserver(() => {
      if (!element.hasAttribute('disabled') || this.wrapped) {
        return;
      }

      this.teardownTriggerListeners();
      this.ensureDisabledHostWrapper();
      this.bindTriggerEvents();
    });
    this.disabledObserver.observe(element, { attributes: true, attributeFilter: ['disabled'] });
  }

  private openWithDelay(): void {
    if (!this.content()) {
      return;
    }

    this.cancelClose();
    this.cancelOpen();

    const delay = Math.max(0, this.openDelay());

    if (delay === 0) {
      this.open();
      return;
    }

    this.openTimer = setTimeout(() => this.open(), delay);
  }

  private closeWithDelay(): void {
    this.cancelOpen();
    this.cancelClose();

    const delay = Math.max(0, this.closeDelay());

    if (delay === 0) {
      this.close();
      return;
    }

    this.closeTimer = setTimeout(() => this.close(), delay);
  }

  private open(): void {
    const content = this.content();

    if (!content) {
      return;
    }

    if (!this.overlayRef) {
      this.overlayRef = this.createOverlay();
    }

    if (!this.overlayRef.hasAttached()) {
      this.panelRef = this.overlayRef.attach(new ComponentPortal(FrTooltipInlinePanel));
      this.updatePanelInputs();
      this.syncCustomPropertiesToOverlay();
    }

    this.isOpen.set(true);
  }

  private close(): void {
    this.cancelOpen();
    this.cancelClose();
    this.overlayRef?.detach();
    this.panelRef = null;
    this.isOpen.set(false);
  }

  private createOverlay(): OverlayRef {
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.triggerElement)
      .withPositions(this.positions())
      .withPush(true)
      .withViewportMargin(8);

    positionStrategy.positionChanges.subscribe((event) => this.handlePositionChange(event));

    const overlayRef = this.overlay.create({
      panelClass: ['frame-tooltip-overlay', `frame-tooltip-overlay--${this.side()}`],
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
    });

    overlayRef.keydownEvents().subscribe((event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        this.close();
      }
    });

    return overlayRef;
  }

  private positions() {
    return buildTooltipPositions({
      align: this.align(),
      alignOffset: this.alignOffset(),
      side: this.side(),
      sideOffset: this.sideOffset(),
    });
  }

  private handlePositionChange(event: ConnectedOverlayPositionChange): void {
    const pair = event.connectionPair;
    const side = pair.overlayY === 'top'
      ? 'bottom'
      : pair.overlayY === 'bottom'
        ? 'top'
        : pair.overlayX === 'start'
          ? 'right'
          : 'left';

    this.panelRef?.setInput('side', side);
    this.overlayRef?.removePanelClass(['frame-tooltip-overlay--top', 'frame-tooltip-overlay--right', 'frame-tooltip-overlay--bottom', 'frame-tooltip-overlay--left']);
    this.overlayRef?.addPanelClass(`frame-tooltip-overlay--${side}`);
  }

  private updatePanelInputs(): void {
    const panelRef = this.panelRef;

    if (!panelRef) {
      return;
    }

    panelRef.setInput('arrow', this.arrow());
    panelRef.setInput('content', this.content() ?? '');
    panelRef.setInput('id', this.tooltipId);
    panelRef.setInput('side', this.side());
  }

  private syncCustomPropertiesToOverlay(): void {
    const overlayPane = this.overlayRef?.overlayElement;
    const panel = overlayPane?.querySelector<HTMLElement>('.frame-tooltip__content');

    if (!overlayPane || !panel) {
      return;
    }

    this.copyCustomProperties(this.elementRef.nativeElement, overlayPane, panel);

    if (this.wrapper) {
      this.copyCustomProperties(this.wrapper, overlayPane, panel);
    }
  }

  private copyCustomProperties(source: HTMLElement, overlayPane: HTMLElement, panel: HTMLElement): void {
    const sourceStyles = getComputedStyle(source);

    for (const propertyName of FR_TOOLTIP_TOKEN_NAMES) {
      const propertyValue = sourceStyles.getPropertyValue(propertyName);

      if (propertyValue.trim()) {
        overlayPane.style.setProperty(propertyName, propertyValue);
        panel.style.setProperty(propertyName, propertyValue);
      }
    }

    for (let index = 0; index < sourceStyles.length; index += 1) {
      const propertyName = sourceStyles.item(index);

      if (!propertyName.startsWith('--frame-tooltip-')) {
        continue;
      }

      const propertyValue = sourceStyles.getPropertyValue(propertyName);
      overlayPane.style.setProperty(propertyName, propertyValue);
      panel.style.setProperty(propertyName, propertyValue);
    }
  }

  private listen(target: HTMLElement, eventName: string, listener: EventListener): () => void {
    target.addEventListener(eventName, listener);
    return () => target.removeEventListener(eventName, listener);
  }

  private cancelOpen(): void {
    if (this.openTimer) {
      clearTimeout(this.openTimer);
      this.openTimer = null;
    }
  }

  private cancelClose(): void {
    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
      this.closeTimer = null;
    }
  }

  private destroy(): void {
    this.close();
    this.overlayRef?.dispose();
    this.overlayRef = null;
    this.disabledObserver?.disconnect();
    this.disabledObserver = null;

    this.teardownTriggerListeners();
  }

  private teardownTriggerListeners(): void {
    for (const teardown of this.teardownListeners) {
      teardown();
    }

    this.teardownListeners = [];
  }
}

@Directive({
  selector: '[frTooltipShortcut]',
  host: {
    class: 'frame-tooltip__shortcut',
  },
})
export class FrTooltipShortcut {}

@Component({
  selector: 'frame-tooltip-inline-panel',
  imports: [NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="frame-tooltip__content"
      role="tooltip"
      [id]="id()"
      [attr.data-side]="side()"
      [attr.data-arrow]="arrow() ? '' : null"
    >
      @if (templateContent(); as template) {
        <ng-container [ngTemplateOutlet]="template" />
      } @else {
        {{ textContent() }}
      }
    </div>
  `,
})
class FrTooltipInlinePanel {
  readonly arrow = input(false, { transform: booleanAttribute });
  readonly content = input<string | TemplateRef<unknown>>('');
  readonly id = input.required<string>();
  readonly side = input('top');

  protected readonly templateContent = signal<TemplateRef<unknown> | null>(null);
  protected readonly textContent = signal('');

  constructor() {
    effect(() => {
      const content = this.content();

      if (content instanceof TemplateRef) {
        this.templateContent.set(content);
        this.textContent.set('');
        return;
      }

      this.templateContent.set(null);
      this.textContent.set(content ?? '');
    });
  }
}
