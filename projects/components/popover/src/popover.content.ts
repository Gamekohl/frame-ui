import { ConnectedPosition } from '@angular/cdk/overlay';
import { Directive, TemplateRef, booleanAttribute, inject, input } from '@angular/core';

import { buildPopoverPositions } from './popover.position';
import { FR_POPOVER_CONTROLLER } from './popover.tokens';
import { FrPopoverAlignment, FrPopoverSide } from './popover.types';

@Directive({
  selector: 'ng-template[frPopoverContent]',
  exportAs: 'frPopoverContent',
})
export class FrPopoverContent {
  readonly templateRef = inject(TemplateRef<unknown>);

  readonly align = input<FrPopoverAlignment>('center');
  readonly alignOffset = input(0);
  readonly debugVisible = input(false, { transform: booleanAttribute });
  readonly side = input<FrPopoverSide>('bottom');
  readonly sideOffset = input(8);

  getPositions(): ConnectedPosition[] {
    return buildPopoverPositions({
      align: this.align(),
      alignOffset: this.alignOffset(),
      side: this.side(),
      sideOffset: this.sideOffset(),
    });
  }
}

@Directive({
  selector: '[frPopoverPanel]',
  host: {
    class: 'frame-popover__content',
    '[attr.data-side]': 'content.side()',
    role: 'dialog',
    tabindex: '-1',
  },
})
export class FrPopoverPanel {
  protected readonly content = inject(FrPopoverContent);
}

@Directive({
  selector: '[frPopoverHeader]',
  host: {
    class: 'frame-popover__header',
  },
})
export class FrPopoverHeader {}

@Directive({
  selector: '[frPopoverTitle]',
  host: {
    class: 'frame-popover__title',
  },
})
export class FrPopoverTitle {}

@Directive({
  selector: '[frPopoverDescription]',
  host: {
    class: 'frame-popover__description',
  },
})
export class FrPopoverDescription {}

@Directive({
  selector: '[frPopoverBody]',
  host: {
    class: 'frame-popover__body',
  },
})
export class FrPopoverBody {}

@Directive({
  selector: '[frPopoverFooter]',
  host: {
    class: 'frame-popover__footer',
  },
})
export class FrPopoverFooter {}

@Directive({
  selector: '[frPopoverClose]',
  host: {
    class: 'frame-popover__close',
    '(click)': 'handleClick($event)',
  },
})
export class FrPopoverClose {
  private readonly root = inject(FR_POPOVER_CONTROLLER);

  protected handleClick(event: Event): void {
    event.preventDefault();
    this.root.close();
  }
}
