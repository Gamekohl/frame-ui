import { Directive, input } from '@angular/core';
import { FrSpinner } from '@frame-ui/components/spinner';

export const FR_BADGE_VARIANTS = [
  'default',
  'secondary',
  'destructive',
  'outline',
  'ghost',
  'link',
] as const;
export const FR_BADGE_ICON_POSITIONS = ['inline-start', 'inline-end'] as const;

export type FrBadgeVariant = (typeof FR_BADGE_VARIANTS)[number];
export type FrBadgeIconPosition = (typeof FR_BADGE_ICON_POSITIONS)[number];

@Directive({
  selector: '[frBadge], frame-badge',
  host: {
    class: 'frame-badge',
    '[attr.data-variant]': 'variant()',
  },
})
export class FrBadge {
  readonly variant = input<FrBadgeVariant>('default');
}

@Directive({
  selector: '[frBadgeIcon]',
  host: {
    class: 'frame-badge__icon',
    '[attr.data-icon]': 'position()',
    'aria-hidden': 'true',
  },
})
export class FrBadgeIcon {
  readonly position = input<FrBadgeIconPosition>('inline-start');
}

@Directive({
  selector: '[frBadgeLabel]',
  host: {
    class: 'frame-badge__label',
  },
})
export class FrBadgeLabel {}

@Directive({
  selector: '[frBadgeSpinner]',
  hostDirectives: [
    {
      directive: FrSpinner,
      inputs: ['sizeValue', 'decorative', 'duration', 'label', 'size', 'stroke'],
    },
  ],
  host: {
    class: 'frame-badge__spinner',
    '[attr.data-icon]': 'position()',
    'aria-hidden': 'true',
    '[attr.role]': 'null',
    '[attr.aria-label]': 'null',
  },
})
export class FrBadgeSpinner {
  readonly position = input<FrBadgeIconPosition>('inline-start');
}
