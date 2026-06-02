import { Directive } from '@angular/core';

@Directive({
  selector: '[frAvatarBadge]',
  standalone: true,
  host: {
    class: 'frame-avatar__badge',
  },
})
export class FrAvatarBadge {}
