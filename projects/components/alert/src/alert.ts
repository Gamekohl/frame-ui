import { Directive, input } from '@angular/core';

export const FR_ALERT_VARIANTS = [
  'default',
  'destructive',
  'success',
  'danger',
  'info',
] as const;

export type FrAlertVariant = (typeof FR_ALERT_VARIANTS)[number];

@Directive({
  selector: '[frAlert]',
  host: {
    class: 'frame-alert',
    '[attr.data-variant]': 'variant()',
    'role': 'alert',
  },
})
export class FrAlert {
  readonly variant = input<FrAlertVariant>('default');
}

@Directive({
  selector: '[frAlertIcon]',
  host: {
    class: 'frame-alert__icon',
    'aria-hidden': 'true',
  },
})
export class FrAlertIcon {}

@Directive({
  selector: '[frAlertTitle]',
  host: {
    class: 'frame-alert__title',
  },
})
export class FrAlertTitle {}

@Directive({
  selector: '[frAlertDescription]',
  host: {
    class: 'frame-alert__description',
  },
})
export class FrAlertDescription {}
