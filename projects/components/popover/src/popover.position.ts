import { ConnectedPosition } from '@angular/cdk/overlay';

import { FrPopoverAlignment, FrPopoverSide } from './popover.types';

export function buildPopoverPositions(options: {
  align: FrPopoverAlignment;
  alignOffset: number;
  side: FrPopoverSide;
  sideOffset: number;
}): ConnectedPosition[] {
  const primary = buildPosition(options.side, options);
  const opposite = oppositeSide(options.side);
  const fallback = buildPosition(opposite, {
    align: options.align,
    alignOffset: options.alignOffset,
    sideOffset: options.sideOffset,
  });

  return [primary, fallback];
}

function buildPosition(
  side: FrPopoverSide,
  options: {
    align: FrPopoverAlignment;
    alignOffset: number;
    sideOffset: number;
  },
): ConnectedPosition {
  if (side === 'top' || side === 'bottom') {
    const isBottom = side === 'bottom';

    return {
      originX: options.align,
      originY: isBottom ? 'bottom' : 'top',
      overlayX: options.align,
      overlayY: isBottom ? 'top' : 'bottom',
      offsetX: options.alignOffset,
      offsetY: isBottom ? options.sideOffset : -options.sideOffset,
    };
  }

  const isRight = side === 'right';

  return {
    originX: isRight ? 'end' : 'start',
    originY: verticalAlign(options.align),
    overlayX: isRight ? 'start' : 'end',
    overlayY: verticalAlign(options.align),
    offsetX: isRight ? options.sideOffset : -options.sideOffset,
    offsetY: options.alignOffset,
  };
}

function verticalAlign(align: FrPopoverAlignment): 'bottom' | 'center' | 'top' {
  if (align === 'center') {
    return 'center';
  }

  return align === 'end' ? 'bottom' : 'top';
}

function oppositeSide(side: FrPopoverSide): FrPopoverSide {
  if (side === 'top') {
    return 'bottom';
  }

  if (side === 'bottom') {
    return 'top';
  }

  return side === 'left' ? 'right' : 'left';
}
