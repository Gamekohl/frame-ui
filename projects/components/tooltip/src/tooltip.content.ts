import { ConnectedPosition } from '@angular/cdk/overlay';
import { Directive, TemplateRef, booleanAttribute, inject, input } from '@angular/core';

import { buildTooltipPositions } from './tooltip.position';
import { FR_TOOLTIP_CONTROLLER } from './tooltip.tokens';
import { FrTooltipAlignment, FrTooltipSide } from './tooltip.types';

let nextTooltipId = 0;

@Directive({
  selector: 'ng-template[frTooltipContent]',
  exportAs: 'frTooltipContent',
})
export class FrTooltipContent {
  readonly templateRef = inject(TemplateRef<unknown>);
  readonly id = `frame-tooltip-${nextTooltipId++}`;

  readonly align = input<FrTooltipAlignment>('center');
  readonly alignOffset = input(0);
  readonly arrow = input(false, { transform: booleanAttribute });
  readonly debugVisible = input(false, { transform: booleanAttribute });
  readonly side = input<FrTooltipSide>('top');
  readonly sideOffset = input(8);

  getPositions(): ConnectedPosition[] {
    return buildTooltipPositions({
      align: this.align(),
      alignOffset: this.alignOffset(),
      side: this.side(),
      sideOffset: this.sideOffset(),
    });
  }
}

@Directive({
  selector: '[frTooltipPanel]',
  host: {
    class: 'frame-tooltip__content',
    role: 'tooltip',
    '[id]': 'content.id',
    '[attr.data-side]': 'root.overlaySide()',
    '[attr.data-arrow]': 'content.arrow() ? "" : null',
  },
})
export class FrTooltipPanel {
  protected readonly content = inject(FrTooltipContent);
  protected readonly root = inject(FR_TOOLTIP_CONTROLLER);
}

@Directive({
  selector: '[frTooltipShortcut]',
  host: {
    class: 'frame-tooltip__shortcut',
  },
})
export class FrTooltipShortcut {}
