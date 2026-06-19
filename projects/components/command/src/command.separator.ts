import { Directive } from '@angular/core';

/** Separator slot for command. */
@Directive({
  selector: '[frCommandSeparator]',
  standalone: true,
  host: {
    class: 'frame-command__separator',
    role: 'separator',
  },
})
export class FrCommandSeparator {}
