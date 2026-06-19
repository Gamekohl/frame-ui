import { Directive } from '@angular/core';

/** List wrapper for virtualized items. */
@Directive({
  selector: '[frVirtualList], frame-virtual-list',
  host: {
    class: 'frame-virtual-scroll__list',
  },
})
export class FrVirtualList {}

/** Panel wrapper for virtualized content. */
@Directive({
  selector: '[frVirtualPanel], frame-virtual-panel',
  host: {
    class: 'frame-virtual-scroll__panel',
  },
})
export class FrVirtualPanel {}

/** Item wrapper for virtualized rows. */
@Directive({
  selector: '[frVirtualItem], frame-virtual-item',
  host: {
    class: 'frame-virtual-scroll__item',
  },
})
export class FrVirtualItem {}

/** Meta slot for virtual item. */
@Directive({
  selector: '[frVirtualItemMeta], frame-virtual-item-meta',
  host: {
    class: 'frame-virtual-scroll__item-meta',
  },
})
export class FrVirtualItemMeta {}

