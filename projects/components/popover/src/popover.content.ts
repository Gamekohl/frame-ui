import { ConnectedPosition } from '@angular/cdk/overlay';
import { Directive, TemplateRef, booleanAttribute, inject, input } from '@angular/core';

import { buildPopoverPositions } from './popover.position';
import { FR_POPOVER_CONTROLLER } from './popover.tokens';
import { FrPopoverAlignment, FrPopoverSide } from './popover.types';

type FrPopoverContentController = {
  close(): void;
};

/** Content slot for popover. */
@Directive({
  selector: 'ng-template[frPopoverContent]',
  exportAs: 'frPopoverContent',
})
export class FrPopoverContent {
  readonly templateRef = inject(TemplateRef<unknown>);
  private controller: FrPopoverContentController | null = null;

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

  setController(controller: FrPopoverContentController | null): void {
    this.controller = controller;
  }

  close(): void {
    this.controller?.close();
  }
}

/** Panel slot for popover. */
@Directive({
  selector: '[frPopoverPanel]',
  host: {
    class: 'frame-popover__content frame-corner-handles',
    '[attr.data-side]': 'content.side()',
    role: 'dialog',
    tabindex: '-1',
  },
})
export class FrPopoverPanel {
  protected readonly content = inject(FrPopoverContent);
}

/** Header slot for popover. */
@Directive({
  selector: '[frPopoverHeader]',
  host: {
    class: 'frame-popover__header',
  },
})
export class FrPopoverHeader {}

/** Title slot for popover. */
@Directive({
  selector: '[frPopoverTitle]',
  host: {
    class: 'frame-popover__title',
  },
})
export class FrPopoverTitle {}

/** Description slot for popover. */
@Directive({
  selector: '[frPopoverDescription]',
  host: {
    class: 'frame-popover__description',
  },
})
export class FrPopoverDescription {}

/** Body slot for popover. */
@Directive({
  selector: '[frPopoverBody]',
  host: {
    class: 'frame-popover__body',
  },
})
export class FrPopoverBody {}

/** Footer slot for popover. */
@Directive({
  selector: '[frPopoverFooter]',
  host: {
    class: 'frame-popover__footer',
  },
})
export class FrPopoverFooter {}

/** Close control for popover. */
@Directive({
  selector: '[frPopoverClose]',
  host: {
    class: 'frame-popover__close',
    '(click)': 'handleClick($event)',
  },
})
export class FrPopoverClose {
  private readonly root = inject(FR_POPOVER_CONTROLLER, { optional: true });
  private readonly content = inject(FrPopoverContent, { optional: true });

  protected handleClick(event: Event): void {
    event.preventDefault();
    (this.root ?? this.content)?.close();
  }
}
