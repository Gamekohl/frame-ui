import { Directive } from '@angular/core';

/**
 * Enables Frame UI corner handles on any normal box element.
 *
 * The directive only marks the host. Rendering is handled by the shared
 * blueprint CSS so it stays cheap and works outside Angular components too.
 */
@Directive({
  selector: '[frCornerHandles]',
  host: {
    class: 'frame-corner-handles',
  },
})
export class FrCornerHandles {}
