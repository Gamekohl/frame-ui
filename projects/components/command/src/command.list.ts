import { Directive, inject } from '@angular/core';

import { FR_COMMAND } from './command.tokens';

@Directive({
  selector: '[frCommandList]',
  standalone: true,
  host: {
    class: 'frame-command__list',
    role: 'listbox',
  },
})
export class FrCommandList {}

@Directive({
  selector: '[frCommandEmpty]',
  standalone: true,
  host: {
    class: 'frame-command__empty',
    '[attr.hidden]': 'command.visibleCount() > 0 ? "" : null',
  },
})
export class FrCommandEmpty {
  protected readonly command = inject(FR_COMMAND);
}
