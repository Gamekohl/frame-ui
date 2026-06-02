export const FR_ACCORDION_TYPES = ['single', 'multiple'] as const;

export type FrAccordionType = (typeof FR_ACCORDION_TYPES)[number];
