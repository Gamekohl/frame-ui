export const FR_TOOLTIP_SIDES = ['top', 'right', 'bottom', 'left'] as const;
export const FR_TOOLTIP_ALIGNMENTS = ['start', 'center', 'end'] as const;

export type FrTooltipSide = (typeof FR_TOOLTIP_SIDES)[number];
export type FrTooltipAlignment = (typeof FR_TOOLTIP_ALIGNMENTS)[number];
