import {
  Directive,
  DestroyRef,
  ElementRef,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';

import {
  FrVirtualScrollAlignment,
  calculateScrollOffsetForIndex,
  calculateVirtualRange,
} from './virtual-scroll.engine';

@Directive({
  selector: '[frVirtualViewport], frame-virtual-viewport',
  exportAs: 'frVirtualViewport',
  host: {
    class: 'frame-virtual-scroll__viewport',
    '(scroll)': 'handleScroll()',
    '[style.block-size]': 'height()',
  },
})
export class FrVirtualViewport {
  private readonly destroyRef = inject(DestroyRef);
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly scrollTop = signal(0);
  private readonly totalCount = signal(0);
  private readonly viewportSize = signal(0);
  private resizeObserver: ResizeObserver | null = null;

  readonly itemSize = input.required<number>();
  readonly overscan = input(4);
  readonly height = input<string | null>(null);

  readonly range = computed(() =>
    calculateVirtualRange({
      itemSize: this.itemSize(),
      overscan: this.overscan(),
      scrollTop: this.scrollTop(),
      totalCount: this.totalCount(),
      viewportSize: this.viewportSize(),
    }),
  );

  readonly before = computed(() => this.range().before);
  readonly after = computed(() => this.range().after);
  readonly startIndex = computed(() => this.range().start);
  readonly endIndex = computed(() => this.range().end);
  readonly renderedCount = computed(() => this.range().end - this.range().start);
  readonly totalSize = computed(() => this.totalCount() * Math.max(this.itemSize(), 1));

  constructor() {
    queueMicrotask(() => {
      this.measure();
      this.attachResizeObserver();
    });

    this.destroyRef.onDestroy(() => {
      this.resizeObserver?.disconnect();
    });
  }

  setTotalCount(count: number): void {
    this.totalCount.set(Math.max(Math.trunc(count), 0));
    this.measure();
  }

  measure(): void {
    const element = this.elementRef.nativeElement;
    this.viewportSize.set(element.clientHeight);
    this.scrollTop.set(element.scrollTop);
  }

  scrollToIndex(index: number, alignment: FrVirtualScrollAlignment = 'auto'): void {
    const element = this.elementRef.nativeElement;
    const nextScrollTop = calculateScrollOffsetForIndex(
      index,
      alignment,
      this.itemSize(),
      element.clientHeight,
      this.totalCount(),
      element.scrollTop,
    );

    element.scrollTop = nextScrollTop;
    this.scrollTop.set(nextScrollTop);
  }

  protected handleScroll(): void {
    this.scrollTop.set(this.elementRef.nativeElement.scrollTop);
  }

  private attachResizeObserver(): void {
    const element = this.elementRef.nativeElement;

    if (typeof ResizeObserver === 'undefined') {
      return;
    }

    this.resizeObserver = new ResizeObserver(() => {
      this.measure();
    });
    this.resizeObserver.observe(element);
  }
}
