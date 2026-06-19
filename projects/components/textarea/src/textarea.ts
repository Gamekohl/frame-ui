import { Directive } from '@angular/core';

/** Textarea control with FrameUI field styling. */
@Directive({
  selector: 'textarea[frTextarea]',
  host: {
    class: 'frame-textarea',
  },
})
export class FrTextarea {}

