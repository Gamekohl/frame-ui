import { Directive } from '@angular/core';

@Directive({
  selector: '[frVirtualList], frame-virtual-list',
  host: {
    class: 'frame-virtual-scroll__list',
  },
})
export class FrVirtualList {}

@Directive({
  selector: '[frVirtualPanel], frame-virtual-panel',
  host: {
    class: 'frame-virtual-scroll__panel',
  },
})
export class FrVirtualPanel {}

@Directive({
  selector: '[frVirtualItem], frame-virtual-item',
  host: {
    class: 'frame-virtual-scroll__item',
  },
})
export class FrVirtualItem {}

@Directive({
  selector: '[frVirtualItemMeta], frame-virtual-item-meta',
  host: {
    class: 'frame-virtual-scroll__item-meta',
  },
})
export class FrVirtualItemMeta {}
