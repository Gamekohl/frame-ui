export const FR_DROPDOWN_MENU_ALIGNMENTS = ['center', 'end', 'start'] as const;
export const FR_DROPDOWN_MENU_SIDES = ['bottom', 'left', 'right', 'top'] as const;
export const FR_DROPDOWN_MENU_TRIGGER_MODES = ['both', 'click', 'hover'] as const;
export const FR_DROPDOWN_MENU_ITEM_VARIANTS = ['default', 'destructive'] as const;

export type FrDropdownMenuAlignment = (typeof FR_DROPDOWN_MENU_ALIGNMENTS)[number];
export type FrDropdownMenuSide = (typeof FR_DROPDOWN_MENU_SIDES)[number];
export type FrDropdownMenuTriggerMode = (typeof FR_DROPDOWN_MENU_TRIGGER_MODES)[number];
export type FrDropdownMenuItemVariant = (typeof FR_DROPDOWN_MENU_ITEM_VARIANTS)[number];
