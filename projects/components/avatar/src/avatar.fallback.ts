import { Directive, inject } from '@angular/core';

import { AVATAR_ROOT } from './avatar.tokens';

/** Avatar fallback component primitive. */
@Directive({
  selector: '[frAvatarFallback]',
  standalone: true,
  host: {
    class: 'frame-avatar__fallback',
    '[attr.aria-hidden]': 'root.status() === "loaded" ? "true" : "false"',
    '[attr.data-visible]': 'root.status() === "loaded" ? "false" : "true"',
  },
})
export class FrAvatarFallback {
  protected readonly root = inject(AVATAR_ROOT);
}
