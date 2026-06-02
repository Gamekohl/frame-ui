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
  model,
  signal,
} from '@angular/core';

import { FrPopoverContent } from './popover.content';
import { buildPopoverPositions } from './popover.position';
import { FR_POPOVER_CONTROLLER } from './popover.tokens';

const DEFAULT_POSITIONS: ConnectedPosition[] = buildPopoverPositions({
  align: 'center',
  alignOffset: 0,
  side: 'bottom',
  sideOffset: 8,
});

@Component({
  selector: 'frame-popover',
  exportAs: 'frPopover',
  imports: [CdkConnectedOverlay, CdkOverlayOrigin, NgTemplateOutlet],
  providers: [
    {
      provide: FR_POPOVER_CONTROLLER,
      useExisting: FrPopoverRoot,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'frame-popover',
    '[attr.data-state]': 'isOpen() ? "open" : "closed"',
  },
  template: `
    <span cdkOverlayOrigin #origin="cdkOverlayOrigin" class="frame-popover__anchor">
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
      [cdkConnectedOverlayHasBackdrop]="true"
      [cdkConnectedOverlayBackdropClass]="'frame-popover__backdrop'"
      (backdropClick)="close()"
      (detach)="close()"
      (overlayKeydown)="handleOverlayKeydown($event)"
      (positionChange)="handlePositionChange($event)"
    >
      <ng-container [ngTemplateOutlet]="content()?.templateRef ?? null" />
    </ng-template>
  `,
})
export class FrPopoverRoot {
  readonly defaultOpen = input(false, { transform: booleanAttribute });
  readonly debugVisible = input(false, { transform: booleanAttribute });
  readonly open = model(false);

  readonly content = signal<FrPopoverContent | null>(null);
  readonly overlaySide = signal('bottom');

  private triggerElement: HTMLElement | null = null;

  readonly isOpen = computed(() => this.open() || this.debugVisible());
  readonly positions = computed(() => this.content()?.getPositions() ?? DEFAULT_POSITIONS);

  constructor() {
    afterNextRender(() => {
      if (this.defaultOpen() || this.debugVisible()) {
        this.open.set(true);
      }
    });
  }

  registerTrigger(trigger: HTMLElement): void {
    this.triggerElement = trigger;
  }

  setContent(content: unknown | null): void {
    this.content.set(content instanceof FrPopoverContent ? content : null);
  }

  toggle(): void {
    if (this.isOpen()) {
      this.close();
      return;
    }

    this.openPopover();
  }

  openPopover(): void {
    if (!this.content()) {
      return;
    }

    this.open.set(true);
    queueMicrotask(() => this.syncCustomPropertiesToOverlay());
  }

  close(): void {
    if (this.debugVisible()) {
      return;
    }

    this.open.set(false);
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
    return ['frame-popover-overlay', `frame-popover-overlay--${this.overlaySide()}`];
  }

  private syncCustomPropertiesToOverlay(): void {
    if (typeof getComputedStyle === 'undefined') {
      return;
    }

    const triggerElement = this.triggerElement;
    const overlayPane = document.querySelector<HTMLElement>('.cdk-overlay-pane.frame-popover-overlay');
    const panel = overlayPane?.querySelector<HTMLElement>('.frame-popover__content');

    if (!triggerElement || !overlayPane || !panel) {
      return;
    }

    const sourceStyles = getComputedStyle(triggerElement);

    for (let index = 0; index < sourceStyles.length; index += 1) {
      const propertyName = sourceStyles.item(index);

      if (!propertyName.startsWith('--frame-popover-')) {
        continue;
      }

      const propertyValue = sourceStyles.getPropertyValue(propertyName);
      overlayPane.style.setProperty(propertyName, propertyValue);
      panel.style.setProperty(propertyName, propertyValue);
    }
  }
}
