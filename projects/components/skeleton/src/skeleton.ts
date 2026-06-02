import { booleanAttribute, Directive, input } from '@angular/core';

@Directive({
  selector: '[frSkeleton], frame-skeleton',
  exportAs: 'frSkeleton',
  host: {
    class: 'frame-skeleton',
    'aria-hidden': 'true',
    '[attr.data-animated]': 'animated()',
    '[style.--frame-skeleton-width]': 'width()',
    '[style.--frame-skeleton-height]': 'height()',
    '[style.--frame-skeleton-radius]': 'radius()',
  },
})
export class FrSkeleton {
  readonly animated = input(true, { transform: booleanAttribute });
  readonly width = input<string | null>(null);
  readonly height = input<string | null>(null);
  readonly radius = input<string | null>(null);
}
