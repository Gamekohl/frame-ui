import { Directive, booleanAttribute, input } from '@angular/core';

import { FrAvatarSize } from './avatar.types';

@Directive({
  selector: '[frAvatarGroup]',
  standalone: true,
  host: {
    class: 'frame-avatar-group',
    '[attr.data-expand-on-hover]': 'expandOnHover() ? "true" : "false"',
    '[attr.data-size]': 'size()',
  },
})
export class FrAvatarGroup {
  readonly expandOnHover = input(false, { transform: booleanAttribute });
  readonly size = input<FrAvatarSize>('md');
}

@Directive({
  selector: '[frAvatarGroupCount]',
  standalone: true,
  host: {
    class: 'frame-avatar-group__count',
  },
})
export class FrAvatarGroupCount {}
