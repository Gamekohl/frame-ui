import { Directive } from '@angular/core';

@Directive({
  selector: '[frCommandFooter]',
  host: {
    class: 'frame-command__footer',
  },
})
export class FrCommandFooter {}
