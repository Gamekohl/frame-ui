import { Directive, inject } from '@angular/core';

import { AVATAR_ROOT } from './avatar.tokens';

@Directive({
  selector: '[frAvatarIcon]',
  standalone: true,
  host: {
    class: 'frame-avatar__icon',
    '[attr.aria-hidden]': 'root.status() === "loaded" ? "true" : "false"',
    '[attr.data-visible]': 'root.status() === "loaded" ? "false" : "true"',
  },
})
export class FrAvatarIcon {
  protected readonly root = inject(AVATAR_ROOT);
}
