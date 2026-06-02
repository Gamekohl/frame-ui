import { Directive } from '@angular/core';

@Directive({
  selector: 'textarea[frTextarea]',
  host: {
    class: 'frame-textarea',
  },
})
export class FrTextarea {}
