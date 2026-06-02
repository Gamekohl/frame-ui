import { Directive, input, signal } from '@angular/core';

import { AVATAR_ROOT } from './avatar.tokens';
import { FrAvatarSize } from './avatar.types';

@Directive({
  selector: 'FrAvatar, [frAvatar]',
  exportAs: 'frAvatar',
  standalone: true,
  providers: [{ provide: AVATAR_ROOT, useExisting: FrAvatar }],
  host: {
    class: 'frame-avatar',
    '[attr.data-size]': 'size()',
    '[attr.data-status]': 'status()',
  },
})
export class FrAvatar {
  readonly size = input<FrAvatarSize>('md');
  readonly status = signal<'error' | 'idle' | 'loaded'>('idle');

  setStatus(status: 'error' | 'idle' | 'loaded'): void {
    this.status.set(status);
  }
}
