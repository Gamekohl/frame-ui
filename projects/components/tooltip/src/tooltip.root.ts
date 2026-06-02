import {
  CdkConnectedOverlay,
  CdkOverlayOrigin,
  ConnectedOverlayPositionChange,
  ConnectedPosition,
} from '@angular/cdk/overlay';
import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  afterNextRender,
  booleanAttribute,
  computed,
  input,
  output,
  signal,
  ElementRef,
  inject,
} from '@angular/core';

import { FrTooltipContent } from './tooltip.content';
import { buildTooltipPositions } from './tooltip.position';
import { FR_TOOLTIP_CONTROLLER } from './tooltip.tokens';

const DEFAULT_POSITIONS: ConnectedPosition[] = buildTooltipPositions({
  align: 'center',
  alignOffset: 0,
  side: 'top',
  sideOffset: 8,
});

const TOOLTIP_TOKEN_NAMES = [
  '--frame-tooltip-content-bg',
  '--frame-tooltip-content-color',
  '--frame-tooltip-content-border',
  '--frame-tooltip-content-radius',
  '--frame-tooltip-content-shadow',
  '--frame-tooltip-content-padding',
  '--frame-tooltip-content-max-width',
  '--frame-tooltip-content-font-size',
  '--frame-tooltip-content-font-weight',
  '--frame-tooltip-content-line-height',
  '--frame-tooltip-arrow-size',
  '--frame-tooltip-motion-duration',
  '--frame-tooltip-motion-distance',
  '--frame-tooltip-motion-scale',
  '--frame-tooltip-motion-easing',
] as const;

@Component({
  selector: 'frame-tooltip',
  exportAs: 'frTooltip',
  imports: [CdkConnectedOverlay, CdkOverlayOrigin, NgTemplateOutlet],
  providers: [
    {
      provide: FR_TOOLTIP_CONTROLLER,
      useExisting: FrTooltipRoot,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'frame-tooltip',
    '[attr.data-state]': 'isOpen() ? "open" : "closed"',
  },
  template: `
    <span cdkOverlayOrigin #origin="cdkOverlayOrigin" class="frame-tooltip__anchor">
      <ng-content />
    </span>

    <ng-template
      cdkConnectedOverlay
      [cdkConnectedOverlayOrigin]="origin"
      [cdkConnectedOverlayOpen]="isOpen()"
      [cdkConnectedOverlayPositions]="positions()"
      [cdkConnectedOverlayPanelClass]="overlayPanelClasses()"
      [cdkConnectedOverlayPush]="true"
      [cdkConnectedOverlayViewportMargin]="8"
      (detach)="close()"
      (overlayKeydown)="handleOverlayKeydown($event)"
      (positionChange)="handlePositionChange($event)"
    >
      <ng-container [ngTemplateOutlet]="content()?.templateRef ?? null" />
    </ng-template>
  `,
})
export class FrTooltipRoot {
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  readonly openDelay = input(700);
  readonly closeDelay = input(0);
  readonly defaultOpen = input(false, { transform: booleanAttribute });
  readonly debugVisible = input(false, { transform: booleanAttribute });
  readonly openChange = output<boolean>();

  readonly isOpen = signal(false);
  readonly content = signal<FrTooltipContent | null>(null);
  readonly overlaySide = signal('top');

  private openTimer: ReturnType<typeof setTimeout> | null = null;
  private closeTimer: ReturnType<typeof setTimeout> | null = null;
  private triggerElement: HTMLElement | null = null;

  readonly positions = computed(() => this.content()?.getPositions() ?? DEFAULT_POSITIONS);

  constructor() {
    afterNextRender(() => {
      if (this.defaultOpen() || this.debugVisible()) {
        this.open();
      }
    });
  }

  registerTrigger(trigger: HTMLElement): void {
    this.triggerElement = trigger;
  }

  setContent(content: unknown | null): void {
    this.content.set(content instanceof FrTooltipContent ? content : null);
  }

  openWithDelay(): void {
    this.cancelClose();
    this.cancelOpen();

    const delay = Math.max(0, this.openDelay());

    if (delay === 0) {
      this.open();
      return;
    }

    this.openTimer = setTimeout(() => this.open(), delay);
  }

  closeWithDelay(): void {
    if (this.debugVisible()) {
      return;
    }

    this.cancelOpen();
    this.cancelClose();

    const delay = Math.max(0, this.closeDelay());

    if (delay === 0) {
      this.close();
      return;
    }

    this.closeTimer = setTimeout(() => this.close(), delay);
  }

  open(): void {
    if (!this.content()) {
      return;
    }

    if (!this.isOpen()) {
      this.isOpen.set(true);
      this.openChange.emit(true);
      this.scheduleCustomPropertySync();
    }
  }

  close(): void {
    if (this.debugVisible()) {
      return;
    }

    this.cancelOpen();
    this.cancelClose();

    if (this.isOpen()) {
      this.isOpen.set(false);
      this.openChange.emit(false);
    }
  }

  handleOverlayKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.close();
    }
  }

  handlePositionChange(event: ConnectedOverlayPositionChange): void {
    const pair = event.connectionPair;

    if (pair.overlayY === 'top') {
      this.overlaySide.set('bottom');
      return;
    }

    if (pair.overlayY === 'bottom') {
      this.overlaySide.set('top');
      return;
    }

    this.overlaySide.set(pair.overlayX === 'start' ? 'right' : 'left');
  }

  overlayPanelClasses(): string[] {
    return ['frame-tooltip-overlay', `frame-tooltip-overlay--${this.overlaySide()}`];
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

  private syncCustomPropertiesToOverlay(): void {
    const triggerElement = this.triggerElement;
    const overlayPane = document.querySelector<HTMLElement>('.cdk-overlay-pane.frame-tooltip-overlay');
    const panel = overlayPane?.querySelector<HTMLElement>('.frame-tooltip__content');

    if (!triggerElement || !overlayPane || !panel) {
      return;
    }

    this.copyCustomProperties(this.elementRef.nativeElement, overlayPane, panel);
    this.copyCustomProperties(triggerElement, overlayPane, panel);
  }

  private scheduleCustomPropertySync(): void {
    queueMicrotask(() => {
      this.syncCustomPropertiesToOverlay();
      if (typeof requestAnimationFrame === 'function') {
        requestAnimationFrame(() => this.syncCustomPropertiesToOverlay());
      }
    });
  }

  private copyCustomProperties(
    source: HTMLElement,
    overlayPane: HTMLElement,
    panel: HTMLElement,
  ): void {
    const sourceStyles = getComputedStyle(source);

    for (const propertyName of TOOLTIP_TOKEN_NAMES) {
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
}
