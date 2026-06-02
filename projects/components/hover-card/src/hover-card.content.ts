import { ConnectedPosition } from '@angular/cdk/overlay';
import { Directive, TemplateRef, booleanAttribute, inject, input } from '@angular/core';

import { buildHoverCardPositions } from './hover-card.position';
import { FR_HOVER_CARD_CONTROLLER } from './hover-card.tokens';
import { FrHoverCardAlignment, FrHoverCardSide } from './hover-card.types';

@Directive({
  selector: 'ng-template[frHoverCardContent]',
  exportAs: 'frHoverCardContent',
})
export class FrHoverCardContent {
  readonly templateRef = inject(TemplateRef<unknown>);

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
}

@Directive({
  selector: '[frHoverCardPanel]',
  host: {
    class: 'frame-hover-card__content',
    '[attr.data-side]': 'content.side()',
    '(mouseenter)': 'handleMouseEnter()',
    '(mouseleave)': 'handleMouseLeave()',
  },
})
export class FrHoverCardPanel {
  protected readonly content = inject(FrHoverCardContent);
  private readonly root = inject(FR_HOVER_CARD_CONTROLLER);

  protected handleMouseEnter(): void {
    this.root.enterInteractiveArea();
  }

  protected handleMouseLeave(): void {
    this.root.leaveInteractiveArea();
  }
}
