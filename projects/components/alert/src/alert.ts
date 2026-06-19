import { Directive, input } from '@angular/core';

export const FR_ALERT_VARIANTS = [
  'default',
  'destructive',
  'success',
  'danger',
  'info',
] as const;

export type FrAlertVariant = (typeof FR_ALERT_VARIANTS)[number];

/** Alert component primitive. */
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

/** Icon slot for alert. */
@Directive({
  selector: '[frAlertIcon]',
  host: {
    class: 'frame-alert__icon',
    'aria-hidden': 'true',
  },
})
export class FrAlertIcon {}

/** Title slot for alert. */
@Directive({
  selector: '[frAlertTitle]',
  host: {
    class: 'frame-alert__title',
  },
})
export class FrAlertTitle {}

/** Description slot for alert. */
@Directive({
  selector: '[frAlertDescription]',
  host: {
    class: 'frame-alert__description',
  },
})
export class FrAlertDescription {}
