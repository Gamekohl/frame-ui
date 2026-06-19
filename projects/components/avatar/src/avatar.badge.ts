import { Directive } from '@angular/core';

/** Badge slot for avatar. */
@Directive({
  selector: '[frAvatarBadge]',
  standalone: true,
  host: {
    class: 'frame-avatar__badge',
  },
})
export class FrAvatarBadge {}
