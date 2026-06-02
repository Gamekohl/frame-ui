import { Directive, computed, inject } from '@angular/core';

import { FrVirtualViewport } from './virtual-scroll.viewport';

@Directive({
  selector: '[frVirtualContent], frame-virtual-content',
  host: {
    class: 'frame-virtual-scroll__content',
    '[style.padding-top.px]': 'before()',
    '[style.padding-bottom.px]': 'after()',
  },
})
export class FrVirtualContent {
  private readonly viewport = inject(FrVirtualViewport);

  protected readonly before = computed(() => this.viewport.before());
  protected readonly after = computed(() => this.viewport.after());
}
