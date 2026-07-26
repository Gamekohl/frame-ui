import { ConnectedPosition } from '@angular/cdk/overlay';
import { Directive, TemplateRef, booleanAttribute, inject, input } from '@angular/core';

import { buildHoverCardPositions } from './hover-card.position';
import { FR_HOVER_CARD_CONTROLLER } from './hover-card.tokens';
import { FrHoverCardAlignment, FrHoverCardSide } from './hover-card.types';

type FrHoverCardContentController = {
  enterInteractiveArea(): void;
  leaveInteractiveArea(): void;
};

/** Content slot for hover card. */
@Directive({
  selector: 'ng-template[frHoverCardContent]',
  exportAs: 'frHoverCardContent',
})
export class FrHoverCardContent {
  readonly templateRef = inject(TemplateRef<unknown>);
  private controller: FrHoverCardContentController | null = null;

  readonly align = input<FrHoverCardAlignment>('center');
  readonly alignOffset = input(0);
  readonly debugVisible = input(false, { transform: booleanAttribute });
  readonly side = input<FrHoverCardSide>('bottom');
  readonly sideOffset = input(8);

  getPositions(): ConnectedPosition[] {
    return buildHoverCardPositions({
      align: this.align(),
      alignOffset: this.alignOffset(),
      side: this.side(),
      sideOffset: this.sideOffset(),
    });
  }

  setController(controller: FrHoverCardContentController | null): void {
    this.controller = controller;
  }

  enterInteractiveArea(): void {
    this.controller?.enterInteractiveArea();
  }

  leaveInteractiveArea(): void {
    this.controller?.leaveInteractiveArea();
  }
}

/** Panel slot for hover card. */
@Directive({
  selector: '[frHoverCardPanel]',
  host: {
    class: 'frame-hover-card__content frame-corner-handles',
    '[attr.data-side]': 'content.side()',
    '(mouseenter)': 'handleMouseEnter()',
    '(mouseleave)': 'handleMouseLeave()',
  },
})
export class FrHoverCardPanel {
  protected readonly content = inject(FrHoverCardContent);
  private readonly root = inject(FR_HOVER_CARD_CONTROLLER, { optional: true });

  protected handleMouseEnter(): void {
    (this.root ?? this.content).enterInteractiveArea();
  }

  protected handleMouseLeave(): void {
    (this.root ?? this.content).leaveInteractiveArea();
  }
}
