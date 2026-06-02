import {
  Directive,
  ElementRef,
  Renderer2,
  RendererStyleFlags2,
  effect,
  inject,
  input,
} from '@angular/core';

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

@Directive({
  selector: '[frCard], frame-card',
  host: {
    class: 'frame-card',
    '[attr.data-size]': 'size()',
    '[attr.data-spacing]': 'spacing()',
  },
})
export class FrCard {
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly renderer = inject(Renderer2);

  readonly size = input<FrCardSize>('default');
  readonly spacing = input<FrCardSpacing | null>(null);

  constructor() {
    effect(() => {
      const spacing = this.spacing();
      if (!spacing) {
        this.renderer.removeStyle(
          this.elementRef.nativeElement,
          '--frame-card-spacing',
          RendererStyleFlags2.DashCase,
        );
        return;
      }

      this.renderer.setStyle(
        this.elementRef.nativeElement,
        '--frame-card-spacing',
        FR_CARD_SPACING_VALUES[spacing],
        RendererStyleFlags2.DashCase,
      );
    });
  }
}

@Directive({
  selector: '[frCardHeader]',
  host: {
    class: 'frame-card__header',
  },
})
export class FrCardHeader {}

@Directive({
  selector: '[frCardTitle]',
  host: {
    class: 'frame-card__title',
  },
})
export class FrCardTitle {}

@Directive({
  selector: '[frCardDescription]',
  host: {
    class: 'frame-card__description',
  },
})
export class FrCardDescription {}

@Directive({
  selector: '[frCardAction]',
  host: {
    class: 'frame-card__action',
  },
})
export class FrCardAction {}

@Directive({
  selector: '[frCardContent]',
  host: {
    class: 'frame-card__content',
  },
})
export class FrCardContent {}

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
