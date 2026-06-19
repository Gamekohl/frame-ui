import { Directive, booleanAttribute, input } from '@angular/core';

export const FR_ITEM_VARIANTS = ['default', 'outline', 'muted'] as const;
export const FR_ITEM_SIZES = ['default', 'sm', 'xs'] as const;
export const FR_ITEM_MEDIA_VARIANTS = ['default', 'icon', 'image', 'avatar'] as const;

export type FrItemVariant = (typeof FR_ITEM_VARIANTS)[number];
export type FrItemSize = (typeof FR_ITEM_SIZES)[number];
export type FrItemMediaVariant = (typeof FR_ITEM_MEDIA_VARIANTS)[number];

/** Composable item row for lists and menus. */
@Directive({
  selector: '[frItem], frame-item',
  host: {
    class: 'frame-item',
    '[attr.data-disabled]': 'disabled() ? "" : null',
    '[attr.data-interactive]': 'interactive() ? "" : null',
    '[attr.data-size]': 'size()',
    '[attr.data-variant]': 'variant()',
  },
})
export class FrItem {
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly interactive = input(false, { transform: booleanAttribute });
  readonly size = input<FrItemSize>('default');
  readonly variant = input<FrItemVariant>('default');
}

/** Group slot for item. */
@Directive({
  selector: '[frItemGroup], frame-item-group',
  host: {
    class: 'frame-item-group',
  },
})
export class FrItemGroup {}

/** Separator slot for item. */
@Directive({
  selector: '[frItemSeparator], frame-item-separator',
  host: {
    class: 'frame-item-separator',
    role: 'separator',
  },
})
export class FrItemSeparator {}

/** Header slot for item. */
@Directive({
  selector: '[frItemHeader], frame-item-header',
  host: {
    class: 'frame-item__header',
  },
})
export class FrItemHeader {}

/** Media slot for item. */
@Directive({
  selector: '[frItemMedia], frame-item-media',
  host: {
    class: 'frame-item__media',
    '[attr.data-variant]': 'variant()',
  },
})
export class FrItemMedia {
  readonly variant = input<FrItemMediaVariant>('default');
}

/** Content slot for item. */
@Directive({
  selector: '[frItemContent], frame-item-content',
  host: {
    class: 'frame-item__content',
  },
})
export class FrItemContent {}

/** Title slot for item. */
@Directive({
  selector: '[frItemTitle], frame-item-title',
  host: {
    class: 'frame-item__title',
  },
})
export class FrItemTitle {}

/** Description slot for item. */
@Directive({
  selector: '[frItemDescription], frame-item-description',
  host: {
    class: 'frame-item__description',
  },
})
export class FrItemDescription {}

/** Actions slot for item. */
@Directive({
  selector: '[frItemActions], frame-item-actions',
  host: {
    class: 'frame-item__actions',
  },
})
export class FrItemActions {}

/** Footer slot for item. */
@Directive({
  selector: '[frItemFooter], frame-item-footer',
  host: {
    class: 'frame-item__footer',
  },
})
export class FrItemFooter {}

