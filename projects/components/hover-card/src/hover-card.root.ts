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
} from '@angular/core';

import { FrHoverCardContent } from './hover-card.content';
import { buildHoverCardPositions } from './hover-card.position';
import { FR_HOVER_CARD_CONTROLLER } from './hover-card.tokens';

const DEFAULT_POSITIONS: ConnectedPosition[] = buildHoverCardPositions({
  align: 'center',
  alignOffset: 0,
  side: 'bottom',
  sideOffset: 8,
});

@Component({
  selector: 'frame-hover-card',
  exportAs: 'frHoverCard',
  imports: [CdkConnectedOverlay, CdkOverlayOrigin, NgTemplateOutlet],
  providers: [
    {
      provide: FR_HOVER_CARD_CONTROLLER,
      useExisting: FrHoverCardRoot,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'frame-hover-card',
    '[attr.data-state]': 'isOpen() ? "open" : "closed"',
  },
  template: `
    <span cdkOverlayOrigin #origin="cdkOverlayOrigin" class="frame-hover-card__anchor">
      <ng-content />
    </span>

    <ng-template
      cdkConnectedOverlay
      [cdkConnectedOverlayOrigin]="origin"
      [cdkConnectedOverlayOpen]="isOpen()"
      [cdkConnectedOverlayPositions]="positions()"
      [cdkConnectedOverlayPanelClass]="overlayPanelClasses()"
      [cdkConnectedOverlayPush]="true"
      [cdkConnectedOverlayViewportMargin]="12"
      (detach)="close()"
      (positionChange)="handlePositionChange($event)"
    >
      <ng-container [ngTemplateOutlet]="content()?.templateRef ?? null" />
    </ng-template>
  `,
})
export class FrHoverCardRoot {
  readonly openDelay = input(700);
  readonly closeDelay = input(300);
  readonly defaultOpen = input(false, { transform: booleanAttribute });
  readonly debugVisible = input(false, { transform: booleanAttribute });
  readonly openChange = output<boolean>();

  readonly isOpen = signal(false);
  readonly content = signal<FrHoverCardContent | null>(null);
  readonly overlaySide = signal('bottom');

  private openTimer: ReturnType<typeof setTimeout> | null = null;
  private closeTimer: ReturnType<typeof setTimeout> | null = null;
  private pointerInsideCount = 0;
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
    this.content.set(content instanceof FrHoverCardContent ? content : null);
  }

  enterInteractiveArea(): void {
    this.pointerInsideCount += 1;
    this.cancelClose();
  }

  leaveInteractiveArea(): void {
    this.pointerInsideCount = Math.max(0, this.pointerInsideCount - 1);

    if (this.pointerInsideCount === 0) {
      this.closeWithDelay();
    }
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
      queueMicrotask(() => this.syncCustomPropertiesToOverlay());
    }
  }

  close(): void {
    if (this.debugVisible()) {
      return;
    }

    this.cancelOpen();
    this.cancelClose();
    this.pointerInsideCount = 0;

    if (this.isOpen()) {
      this.isOpen.set(false);
      this.openChange.emit(false);
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
    return ['frame-hover-card-overlay', `frame-hover-card-overlay--${this.overlaySide()}`];
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
    const overlayPane = document.querySelector<HTMLElement>('.cdk-overlay-pane.frame-hover-card-overlay');
    const panel = overlayPane?.querySelector<HTMLElement>('.frame-hover-card__content');

    if (!triggerElement || !overlayPane || !panel) {
      return;
    }

    const sourceStyles = getComputedStyle(triggerElement);

    for (let index = 0; index < sourceStyles.length; index += 1) {
      const propertyName = sourceStyles.item(index);

      if (!propertyName.startsWith('--frame-hover-card-')) {
        continue;
      }

      const propertyValue = sourceStyles.getPropertyValue(propertyName);
      overlayPane.style.setProperty(propertyName, propertyValue);
      panel.style.setProperty(propertyName, propertyValue);
    }
  }
}
