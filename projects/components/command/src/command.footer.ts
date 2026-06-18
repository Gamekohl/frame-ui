import { Directive } from '@angular/core';

/** Footer slot for command. */
@Directive({
  selector: '[frCommandFooter]',
  host: {
    class: 'frame-command__footer',
  },
})
export class FrCommandFooter {}
