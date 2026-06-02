import { Directive, input } from '@angular/core';

export const FR_EMPTY_MEDIA_VARIANTS = ['default', 'icon'] as const;
export const FR_EMPTY_ORIENTATIONS = ['vertical', 'horizontal'] as const;
export const FR_EMPTY_VARIANTS = ['default', 'outline', 'soft'] as const;

export type FrEmptyMediaVariant = (typeof FR_EMPTY_MEDIA_VARIANTS)[number];
export type FrEmptyOrientation = (typeof FR_EMPTY_ORIENTATIONS)[number];
export type FrEmptyVariant = (typeof FR_EMPTY_VARIANTS)[number];

@Directive({
  selector: '[frEmpty], frame-empty',
  host: {
    class: 'frame-empty',
    '[attr.data-orientation]': 'orientation()',
    '[attr.data-variant]': 'variant()',
  },
})
export class FrEmpty {
  readonly orientation = input<FrEmptyOrientation>('vertical');
  readonly variant = input<FrEmptyVariant>('default');
}

@Directive({
  selector: '[frEmptyHeader], frame-empty-header',
  host: {
    class: 'frame-empty__header',
  },
})
export class FrEmptyHeader {}

@Directive({
  selector: '[frEmptyMedia], frame-empty-media',
  host: {
    class: 'frame-empty__media',
    '[attr.data-variant]': 'variant()',
  },
})
export class FrEmptyMedia {
  readonly variant = input<FrEmptyMediaVariant>('default');
}

@Directive({
  selector: '[frEmptyTitle], frame-empty-title',
  host: {
    class: 'frame-empty__title',
  },
})
export class FrEmptyTitle {}

@Directive({
  selector: '[frEmptyDescription], frame-empty-description',
  host: {
    class: 'frame-empty__description',
  },
})
export class FrEmptyDescription {}

@Directive({
  selector: '[frEmptyContent], frame-empty-content',
  host: {
    class: 'frame-empty__content',
  },
})
export class FrEmptyContent {}
