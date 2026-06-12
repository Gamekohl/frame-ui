import { ConnectedPosition } from '@angular/cdk/overlay';

import { FrDropdownMenuAlignment, FrDropdownMenuSide } from './dropdown-menu.types';

type ConcreteDropdownMenuSide = Exclude<FrDropdownMenuSide, 'auto'>;

const DEFAULT_SIDE_OFFSET = 4;
const MIN_SUBMENU_SIDE_OFFSET = 16;

export function defaultPositions(isSubmenu: boolean): ConnectedPosition[] {
  return buildConnectedPositions({
    align: 'start',
    alignOffset: 0,
    isSubmenu,
    side: 'auto',
    sideOffset: DEFAULT_SIDE_OFFSET,
  });
}

export function buildConnectedPositions(options: {
  align: FrDropdownMenuAlignment;
  alignOffset: number;
  isSubmenu: boolean;
  side: FrDropdownMenuSide;
  sideOffset: number;
}): ConnectedPosition[] {
  const side = normalizeSide(options.side, options.isSubmenu);

  if (side === 'auto') {
    return autoSides(options.isSubmenu).flatMap((side) =>
      primaryPlacement({
        ...options,
        side,
      }),
    );
  }

  return primaryPlacement({
    ...options,
    side,
  });
}

function primaryPlacement(options: {
  align: FrDropdownMenuAlignment;
  alignOffset: number;
  isSubmenu: boolean;
  side: ConcreteDropdownMenuSide;
  sideOffset: number;
}): ConnectedPosition[] {
  if (options.side === 'left' || options.side === 'right') {
    const isRight = options.side === 'right';
    const sideOffset = options.isSubmenu
      ? Math.max(options.sideOffset, MIN_SUBMENU_SIDE_OFFSET)
      : options.sideOffset;
    const horizontalOffset = isRight ? sideOffset : -sideOffset;
    const originY = horizontalOriginY(options.align);
    const overlayY = horizontalOverlayY(options.align);

    return [
      {
        originX: isRight ? 'end' : 'start',
        originY,
        overlayX: isRight ? 'start' : 'end',
        overlayY,
        offsetX: horizontalOffset,
        offsetY: options.alignOffset,
      },
      {
        originX: isRight ? 'start' : 'end',
        originY,
        overlayX: isRight ? 'end' : 'start',
        overlayY,
        offsetX: -horizontalOffset,
        offsetY: options.alignOffset,
      },
    ];
  }

  const isBottom = options.side === 'bottom';
  const verticalOffset = isBottom ? options.sideOffset : -options.sideOffset;
  const originX = rootOriginX(options.align);
  const overlayX = rootOverlayX(options.align);

  return [
    {
      originX,
      originY: isBottom ? 'bottom' : 'top',
      overlayX,
      overlayY: isBottom ? 'top' : 'bottom',
      offsetX: options.alignOffset,
      offsetY: verticalOffset,
    },
    {
      originX,
      originY: isBottom ? 'top' : 'bottom',
      overlayX,
      overlayY: isBottom ? 'bottom' : 'top',
      offsetX: options.alignOffset,
      offsetY: -verticalOffset,
    },
  ];
}

function normalizeSide(side: FrDropdownMenuSide, isSubmenu: boolean): FrDropdownMenuSide {
  if (!isSubmenu || side === 'left' || side === 'right') {
    return side;
  }

  return 'auto';
}

function autoSides(isSubmenu: boolean): ConcreteDropdownMenuSide[] {
  return isSubmenu ? ['right', 'left'] : ['bottom', 'top', 'right', 'left'];
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

function horizontalOriginY(align: FrDropdownMenuAlignment): 'bottom' | 'center' | 'top' {
  if (align === 'center') {
    return 'center';
  }

  return align === 'end' ? 'bottom' : 'top';
}

function horizontalOverlayY(align: FrDropdownMenuAlignment): 'bottom' | 'center' | 'top' {
  if (align === 'center') {
    return 'center';
  }

  return align === 'end' ? 'bottom' : 'top';
}
