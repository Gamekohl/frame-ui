import { ConnectedPosition } from '@angular/cdk/overlay';

import { FrHoverCardAlignment, FrHoverCardSide } from './hover-card.types';

export function buildHoverCardPositions(options: {
  align: FrHoverCardAlignment;
  alignOffset: number;
  side: FrHoverCardSide;
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
  side: FrHoverCardSide,
  options: {
    align: FrHoverCardAlignment;
    alignOffset: number;
    sideOffset: number;
  },
): ConnectedPosition {
  if (side === 'top' || side === 'bottom') {
    const isBottom = side === 'bottom';
    const offsetY = isBottom ? options.sideOffset : -options.sideOffset;

    return {
      originX: horizontalOrigin(options.align),
      originY: isBottom ? 'bottom' : 'top',
      overlayX: horizontalOverlay(options.align),
      overlayY: isBottom ? 'top' : 'bottom',
      offsetX: options.alignOffset,
      offsetY,
    };
  }

  const isRight = side === 'right';
  const offsetX = isRight ? options.sideOffset : -options.sideOffset;

  return {
    originX: isRight ? 'end' : 'start',
    originY: verticalOrigin(options.align),
    overlayX: isRight ? 'start' : 'end',
    overlayY: verticalOverlay(options.align),
    offsetX,
    offsetY: options.alignOffset,
  };
}

function horizontalOrigin(align: FrHoverCardAlignment): 'center' | 'end' | 'start' {
  return align;
}

function horizontalOverlay(align: FrHoverCardAlignment): 'center' | 'end' | 'start' {
  return align;
}

function verticalOrigin(align: FrHoverCardAlignment): 'bottom' | 'center' | 'top' {
  if (align === 'center') {
    return 'center';
  }

  return align === 'end' ? 'bottom' : 'top';
}

function verticalOverlay(align: FrHoverCardAlignment): 'bottom' | 'center' | 'top' {
  if (align === 'center') {
    return 'center';
  }

  return align === 'end' ? 'bottom' : 'top';
}

function oppositeSide(side: FrHoverCardSide): FrHoverCardSide {
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
