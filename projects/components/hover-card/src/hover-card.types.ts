export const FR_HOVER_CARD_ALIGNMENTS = ['start', 'center', 'end'] as const;
export const FR_HOVER_CARD_SIDES = ['top', 'right', 'bottom', 'left'] as const;

export type FrHoverCardAlignment = (typeof FR_HOVER_CARD_ALIGNMENTS)[number];
export type FrHoverCardSide = (typeof FR_HOVER_CARD_SIDES)[number];
