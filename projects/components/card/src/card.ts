import { Directive, computed, input } from '@angular/core';

export const FR_CARD_SIZES = ['default', 'sm'] as const;
export const FR_CARD_SPACINGS = ['sm', 'md', 'lg', 'xl'] as const;
export const FR_CARD_FOOTER_ALIGNS = ['start', 'end', 'between'] as const;

export type FrCardSize = (typeof FR_CARD_SIZES)[number];
export type FrCardSpacing = (typeof FR_CARD_SPACINGS)[number];
export type FrCardFooterAlign = (typeof FR_CARD_FOOTER_ALIGNS)[number];

const FR_CARD_SPACING_VALUES: Record<FrCardSpacing, string> = {
  sm: '0.75rem',
  md: '1rem',
  lg: '1.25rem',
  xl: '2rem',
};

/** Card container with size and spacing controls. */
@Directive({
  selector: '[frCard], frame-card',
  host: {
    class: 'frame-card',
    '[attr.data-size]': 'size()',
    '[attr.data-spacing]': 'spacing()',
    '[style.--frame-card-spacing]': 'spacingValue()',
  },
})
export class FrCard {
  readonly size = input<FrCardSize>('default');
  readonly spacing = input<FrCardSpacing | null>(null);
  protected readonly spacingValue = computed(() => {
    const spacing = this.spacing();
    return spacing ? FR_CARD_SPACING_VALUES[spacing] : null;
  });
}

/** Header slot for card. */
@Directive({
  selector: '[frCardHeader]',
  host: {
    class: 'frame-card__header',
  },
})
export class FrCardHeader {}

/** Title slot for card. */
@Directive({
  selector: '[frCardTitle]',
  host: {
    class: 'frame-card__title',
  },
})
export class FrCardTitle {}

/** Description slot for card. */
@Directive({
  selector: '[frCardDescription]',
  host: {
    class: 'frame-card__description',
  },
})
export class FrCardDescription {}

/** Action slot for card. */
@Directive({
  selector: '[frCardAction]',
  host: {
    class: 'frame-card__action',
  },
})
export class FrCardAction {}

/** Content slot for card. */
@Directive({
  selector: '[frCardContent]',
  host: {
    class: 'frame-card__content',
  },
})
export class FrCardContent {}

/** Footer slot for card. */
@Directive({
  selector: '[frCardFooter]',
  host: {
    class: 'frame-card__footer',
    '[attr.data-align]': 'align()',
  },
})
export class FrCardFooter {
  readonly align = input<FrCardFooterAlign>('start');
}

