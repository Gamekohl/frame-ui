import { Directive } from '@angular/core';

@Directive({
  selector: '[frCommandSeparator]',
  standalone: true,
  host: {
    class: 'frame-command__separator',
    role: 'separator',
  },
})
export class FrCommandSeparator {}
