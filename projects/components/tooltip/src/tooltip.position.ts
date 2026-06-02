import { ConnectedPosition } from '@angular/cdk/overlay';

import { FrTooltipAlignment, FrTooltipSide } from './tooltip.types';

export function buildTooltipPositions(options: {
  align: FrTooltipAlignment;
  alignOffset: number;
  side: FrTooltipSide;
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
  side: FrTooltipSide,
  options: {
    align: FrTooltipAlignment;
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
    originY: verticalPosition(options.align),
    overlayX: isRight ? 'start' : 'end',
    overlayY: verticalPosition(options.align),
    offsetX: isRight ? options.sideOffset : -options.sideOffset,
    offsetY: options.alignOffset,
  };
}

function verticalPosition(align: FrTooltipAlignment): 'top' | 'center' | 'bottom' {
  if (align === 'center') {
    return 'center';
  }

  return align === 'start' ? 'top' : 'bottom';
}

function oppositeSide(side: FrTooltipSide): FrTooltipSide {
  if (side === 'top') {
    return 'bottom';
  }

  if (side === 'bottom') {
    return 'top';
  }

  if (side === 'left') {
    return 'right';
  }

  return 'left';
}
