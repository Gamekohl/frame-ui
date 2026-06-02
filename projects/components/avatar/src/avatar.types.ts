export const FR_AVATAR_SIZES = ['xs', 'sm', 'md', 'lg'] as const;

export type FrAvatarSize = (typeof FR_AVATAR_SIZES)[number];
