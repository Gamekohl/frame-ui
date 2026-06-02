export const FR_POPOVER_ALIGNMENTS = ['start', 'center', 'end'] as const;
export const FR_POPOVER_SIDES = ['top', 'right', 'bottom', 'left'] as const;

export type FrPopoverAlignment = (typeof FR_POPOVER_ALIGNMENTS)[number];
export type FrPopoverSide = (typeof FR_POPOVER_SIDES)[number];
