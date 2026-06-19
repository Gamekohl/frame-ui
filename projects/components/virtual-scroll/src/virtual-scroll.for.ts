import {
  Directive,
  DoCheck,
  EmbeddedViewRef,
  TemplateRef,
  ViewContainerRef,
  computed,
  inject,
  input,
} from '@angular/core';

import { FrVirtualViewport } from './virtual-scroll.viewport';

export interface FrVirtualForContext<T> {
  $implicit: T;
  count: number;
  even: boolean;
  first: boolean;
  index: number;
  last: boolean;
  odd: boolean;
}

export type FrVirtualTrackBy<T> = (index: number, item: T) => unknown;

/** Structural directive for rendering virtualized ranges. */
@Directive({
  selector: '[frVirtualFor][frVirtualForOf]',
})
export class FrVirtualFor<T> implements DoCheck {
  private readonly templateRef = inject<TemplateRef<FrVirtualForContext<T>>>(TemplateRef);
  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly viewport = inject(FrVirtualViewport);
  private readonly views: EmbeddedViewRef<FrVirtualForContext<T>>[] = [];

  readonly frVirtualForOf = input.required<readonly T[]>();
  readonly frVirtualForTrackBy = input<FrVirtualTrackBy<T> | null>(null);
  private lastRenderKey = '';

  private readonly slice = computed(() => {
    const items = this.frVirtualForOf();
    const start = this.viewport.startIndex();
    const end = this.viewport.endIndex();

    return {
      items,
      start,
      visible: items.slice(start, end),
    };
  });

  ngDoCheck(): void {
    const items = this.frVirtualForOf();
    const renderKey = [
      items,
      items.length,
      this.viewport.startIndex(),
      this.viewport.endIndex(),
      this.frVirtualForTrackBy(),
    ].map(String).join('|');

    this.viewport.setTotalCount(items.length);

    if (renderKey === this.lastRenderKey) {
      return;
    }

    this.lastRenderKey = renderKey;
    this.render();
  }

  static ngTemplateContextGuard<T>(
    _directive: FrVirtualFor<T>,
    _context: unknown,
  ): _context is FrVirtualForContext<T> {
    return true;
  }

  private render(): void {
    const { items, start, visible } = this.slice();
    const trackBy = this.frVirtualForTrackBy();

    while (this.views.length > visible.length) {
      this.viewContainerRef.remove(this.views.length - 1);
      this.views.pop();
    }

    for (let offset = 0; offset < visible.length; offset += 1) {
      const item = visible[offset]!;
      const index = start + offset;
      const view = this.views[offset] ?? this.createView(offset, item, index, items.length);
      const context = view.context;
      const identity = trackBy?.(index, item) ?? item;

      if ((view as EmbeddedViewRef<FrVirtualForContext<T>> & { __frameVirtualIdentity?: unknown }).__frameVirtualIdentity !== identity) {
        (view as EmbeddedViewRef<FrVirtualForContext<T>> & { __frameVirtualIdentity?: unknown }).__frameVirtualIdentity =
          identity;
      }

      context.$implicit = item;
      context.count = items.length;
      context.index = index;
      context.first = index === 0;
      context.last = index === items.length - 1;
      context.even = index % 2 === 0;
      context.odd = !context.even;
      view.detectChanges();
    }
  }

  private createView(
    offset: number,
    item: T,
    index: number,
    count: number,
  ): EmbeddedViewRef<FrVirtualForContext<T>> {
    const view = this.viewContainerRef.createEmbeddedView(
      this.templateRef,
      {
        $implicit: item,
        count,
        even: index % 2 === 0,
        first: index === 0,
        index,
        last: index === count - 1,
        odd: index % 2 !== 0,
      },
      offset,
    );

    this.views[offset] = view;
    return view;
  }
}

