import { ConnectedPosition } from '@angular/cdk/overlay';

import { FrDropdownMenuAlignment, FrDropdownMenuSide } from './dropdown-menu.types';

export function defaultPositions(isSubmenu: boolean): ConnectedPosition[] {
  return buildConnectedPositions({
    align: 'start',
    alignOffset: 0,
    isSubmenu,
    side: isSubmenu ? 'right' : 'bottom',
    sideOffset: 4,
  });
}

export function buildConnectedPositions(options: {
  align: FrDropdownMenuAlignment;
  alignOffset: number;
  isSubmenu: boolean;
  side: FrDropdownMenuSide;
  sideOffset: number;
}): ConnectedPosition[] {
  const placements = primaryPlacement(options);

  return [placements.primary, placements.fallback];
}

function primaryPlacement(options: {
  align: FrDropdownMenuAlignment;
  alignOffset: number;
  isSubmenu: boolean;
  side: FrDropdownMenuSide;
  sideOffset: number;
}): {
  fallback: ConnectedPosition;
  primary: ConnectedPosition;
} {
  if (options.isSubmenu) {
    const isRight = options.side !== 'left';
    const horizontalOffset = isRight ? options.sideOffset : -options.sideOffset;
    const originY = submenuOriginY(options.align);
    const overlayY = submenuOverlayY(options.align);

    return {
      primary: {
        originX: isRight ? 'end' : 'start',
        originY,
        overlayX: isRight ? 'start' : 'end',
        overlayY,
        offsetX: horizontalOffset,
        offsetY: options.alignOffset,
      },
      fallback: {
        originX: isRight ? 'start' : 'end',
        originY,
        overlayX: isRight ? 'end' : 'start',
        overlayY,
        offsetX: -horizontalOffset,
        offsetY: options.alignOffset,
      },
    };
  }

  const isBottom = options.side !== 'top';
  const verticalOffset = isBottom ? options.sideOffset : -options.sideOffset;
  const originX = rootOriginX(options.align);
  const overlayX = rootOverlayX(options.align);

  return {
    primary: {
      originX,
      originY: isBottom ? 'bottom' : 'top',
      overlayX,
      overlayY: isBottom ? 'top' : 'bottom',
      offsetX: options.alignOffset,
      offsetY: verticalOffset,
    },
    fallback: {
      originX,
      originY: isBottom ? 'top' : 'bottom',
      overlayX,
      overlayY: isBottom ? 'bottom' : 'top',
      offsetX: options.alignOffset,
      offsetY: -verticalOffset,
    },
  };
}

function rootOriginX(align: FrDropdownMenuAlignment): 'center' | 'end' | 'start' {
  if (align === 'center') {
    return 'center';
  }

  return align;
}

function rootOverlayX(align: FrDropdownMenuAlignment): 'center' | 'end' | 'start' {
  if (align === 'center') {
    return 'center';
  }

  return align;
}

function submenuOriginY(align: FrDropdownMenuAlignment): 'bottom' | 'center' | 'top' {
  if (align === 'center') {
    return 'center';
  }

  return align === 'end' ? 'bottom' : 'top';
}

function submenuOverlayY(align: FrDropdownMenuAlignment): 'bottom' | 'center' | 'top' {
  if (align === 'center') {
    return 'center';
  }

  return align === 'end' ? 'bottom' : 'top';
}
