import { Directive, computed, input } from '@angular/core';

export const FR_CORNER_HANDLE_MODES = ['auto', 'always', 'never'] as const;

export type FrCornerHandleMode = (typeof FR_CORNER_HANDLE_MODES)[number];

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
    '[attr.data-frame-corner-handles-mode]': 'normalizedMode()',
  },
})
export class FrCornerHandles {
  readonly mode = input<FrCornerHandleMode | ''>('auto', { alias: 'frCornerHandles' });

  protected readonly normalizedMode = computed<FrCornerHandleMode>(() => {
    const mode = this.mode();
    return mode === '' ? 'auto' : mode;
  });
}
