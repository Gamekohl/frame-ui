import {
  AfterViewInit,
  DestroyRef,
  Directive,
  DoCheck,
  ElementRef,
  InjectionToken,
  booleanAttribute,
  computed,
  numberAttribute,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent } from 'rxjs';
import { FrButton } from '@frame-ui-ng/components/button';

export const FR_CAROUSEL_ORIENTATIONS = ['horizontal', 'vertical'] as const;
export const FR_CAROUSEL_ALIGNS = ['start', 'center', 'end'] as const;
export const FR_CAROUSEL_DIRECTIONS = ['ltr', 'rtl'] as const;

export type FrCarouselOrientation = (typeof FR_CAROUSEL_ORIENTATIONS)[number];
export type FrCarouselAlign = (typeof FR_CAROUSEL_ALIGNS)[number];
export type FrCarouselDirection = (typeof FR_CAROUSEL_DIRECTIONS)[number];
export type FrCarouselEvent = 'init' | 'select' | 'reInit';
export type FrCarouselPlugin = (api: FrCarouselApi) => void | (() => void);

export type FrCarouselOptions = {
  align?: FrCarouselAlign;
  direction?: FrCarouselDirection;
  dragFree?: boolean;
  mouseDrag?: boolean;
  loop?: boolean;
  slidesToScroll?: number;
};

export type FrCarouselApi = {
  canScrollNext: () => boolean;
  canScrollPrev: () => boolean;
  scrollNext: () => void;
  scrollPrev: () => void;
  scrollTo: (index: number) => void;
  scrollSnapList: () => number[];
  selectedScrollSnap: () => number;
  on: (event: FrCarouselEvent, callback: () => void) => () => void;
};

const FR_CAROUSEL = new InjectionToken<FrCarousel>('FrCarousel');
const POINTER_FLICK_VELOCITY = 0.25;
const POINTER_SETTLE_THRESHOLD_RATIO = 0.12;

/** Carousel root that coordinates scroll state and navigation. */
@Directive({
  selector: '[frCarousel], frame-carousel',
  exportAs: 'frCarousel',
  host: {
    class: 'frame-carousel',
    role: 'region',
    tabindex: '0',
    '[attr.aria-roledescription]': '"carousel"',
    '[attr.data-align]': 'effectiveAlign()',
    '[attr.data-direction]': 'effectiveDirection()',
    '[attr.data-drag-free]': 'effectiveDragFree() ? "" : null',
    '[attr.data-orientation]': 'orientation()',
    '(keydown)': 'handleKeydown($event)',
  },
  providers: [{ provide: FR_CAROUSEL, useExisting: FrCarousel }],
})
export class FrCarousel implements AfterViewInit, DoCheck {
  private readonly destroyRef = inject(DestroyRef);
  private readonly listeners = new Map<FrCarouselEvent, Set<() => void>>();
  private readonly pluginCleanups: Array<() => void> = [];
  private loopResetTimer: number | null = null;
  private loopResetScrollEndCleanup: (() => void) | null = null;
  private scrollSyncTimer: number | null = null;
  private isProgrammaticScroll = false;
  private isPointerDragging = false;
  private pointerDragStartOffset = 0;
  private pointerDragStartPosition = 0;
  private pointerDragStartIndex = 0;
  private pointerDragLastPosition = 0;
  private pointerDragLastTime = 0;
  private pointerDragVelocity = 0;
  private pendingPointerDragOffset: number | null = null;
  private pointerDragFrame: number | null = null;
  private activePointerId: number | null = null;
  private loopBoundaryClone: HTMLElement | null = null;
  private contentElement: HTMLElement | null = null;
  private itemElements: HTMLElement[] = [];
  private lastLoop = false;
  private lastPlugins: readonly FrCarouselPlugin[] | null = null;

  readonly align = input<FrCarouselAlign>('start');
  readonly dragFree = input(true, { transform: booleanAttribute });
  readonly loop = input(false, { transform: booleanAttribute });
  readonly mouseDrag = input(true, { transform: booleanAttribute });
  readonly orientation = input<FrCarouselOrientation>('horizontal');
  readonly opts = input<FrCarouselOptions | null>(null);
  readonly plugins = input<readonly FrCarouselPlugin[]>([]);
  readonly slidesToScroll = input(1, { transform: numberAttribute });

  readonly apiReady = output<FrCarouselApi>();
  readonly selectedChange = output<number>();

  readonly selectedIndex = signal(0);
  readonly snapIndexes = computed(() =>
    Array.from({ length: this.snapCount() }, (_, index) => index),
  );
  readonly snapCount = signal(0);

  protected readonly effectiveAlign = computed(() => this.opts()?.align ?? this.align());
  protected readonly effectiveDirection = computed<FrCarouselDirection>(() => this.opts()?.direction ?? 'ltr');
  readonly effectiveDragFree = computed(() => this.opts()?.dragFree ?? this.dragFree());
  private readonly effectiveMouseDrag = computed(() => this.opts()?.mouseDrag ?? this.mouseDrag());
  private readonly effectiveLoop = computed(() => this.opts()?.loop ?? this.loop());
  private readonly effectiveSlidesToScroll = computed(() => {
    const value = this.opts()?.slidesToScroll ?? this.slidesToScroll();
    return Math.max(1, Math.floor(Number.isFinite(value) ? value : 1));
  });

  readonly api: FrCarouselApi = {
    canScrollNext: () => this.canScrollNext(),
    canScrollPrev: () => this.canScrollPrev(),
    scrollNext: () => this.scrollNext(),
    scrollPrev: () => this.scrollPrev(),
    scrollTo: (index: number) => this.scrollTo(index),
    scrollSnapList: () => this.itemElements.map((_, index) => index),
    selectedScrollSnap: () => this.selectedIndex(),
    on: (event: FrCarouselEvent, callback: () => void) => this.on(event, callback),
  };

  constructor() {
    this.destroyRef.onDestroy(() => {
      this.pluginCleanups.splice(0).forEach((cleanup) => cleanup());
      this.clearLoopResetTimer();
      this.clearScrollSyncTimer();
      this.clearPointerDragFrame();
    });
  }

  ngDoCheck(): void {
    this.syncPlugins();

    const loop = this.effectiveLoop();
    if (!loop && loop !== this.lastLoop) {
      this.removeLoopClone();
    }
    this.lastLoop = loop;
  }

  ngAfterViewInit(): void {
    queueMicrotask(() => {
      this.recalculate();
      this.emit('init');
      this.apiReady.emit(this.api);
    });
  }

  registerContent(element: HTMLElement): void {
    this.contentElement = element;
    fromEvent(element, 'scroll')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.syncSelectedFromScroll());

    fromEvent<WheelEvent>(element, 'wheel')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => this.handleWheel(event));

    fromEvent<PointerEvent>(element, 'pointerdown')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => this.handlePointerDown(event));

    fromEvent<PointerEvent>(element, 'pointermove')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => this.handlePointerMove(event));

    fromEvent<PointerEvent>(element, 'pointerup')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => this.handlePointerEnd(event));

    fromEvent<PointerEvent>(element, 'pointercancel')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => this.handlePointerEnd(event));
  }

  registerItem(element: HTMLElement): void {
    this.itemElements.push(element);
    this.recalculate();
  }

  unregisterItem(element: HTMLElement): void {
    this.itemElements = this.itemElements.filter((item) => item !== element);
    this.recalculate();
  }

  canScrollPrev(): boolean {
    return this.effectiveLoop() || this.selectedIndex() > 0;
  }

  canScrollNext(): boolean {
    return this.effectiveLoop() || this.selectedIndex() < this.snapCount() - 1;
  }

  scrollPrev(): void {
    const nextIndex = this.selectedIndex() - this.effectiveSlidesToScroll();
    if (this.effectiveLoop() && nextIndex < 0) {
      this.scrollLoopBoundary('previous');
      return;
    }

    this.scrollTo(nextIndex < 0 ? this.snapCount() - 1 : nextIndex);
  }

  scrollNext(): void {
    const nextIndex = this.selectedIndex() + this.effectiveSlidesToScroll();
    if (this.effectiveLoop() && nextIndex >= this.snapCount()) {
      this.scrollLoopBoundary('next');
      return;
    }

    this.scrollTo(nextIndex >= this.snapCount() ? 0 : nextIndex);
  }

  scrollTo(index: number): void {
    const target = this.itemElements[index];
    if (!target || (!this.effectiveLoop() && (index < 0 || index >= this.snapCount()))) {
      return;
    }

    this.pauseScrollSync();
    this.scrollItemIntoView(target);
    this.setSelectedIndex(index);
  }

  handleKeydown(event: KeyboardEvent): void {
    const isRtl = this.orientation() === 'horizontal' && this.effectiveDirection() === 'rtl';
    const nextKey = this.orientation() === 'vertical' ? 'ArrowDown' : isRtl ? 'ArrowLeft' : 'ArrowRight';
    const prevKey = this.orientation() === 'vertical' ? 'ArrowUp' : isRtl ? 'ArrowRight' : 'ArrowLeft';

    if (event.key === nextKey) {
      event.preventDefault();
      this.scrollNext();
    }

    if (event.key === prevKey) {
      event.preventDefault();
      this.scrollPrev();
    }
  }

  private handleWheel(event: WheelEvent): void {
    if (!event.cancelable) {
      return;
    }

    event.preventDefault();

    const scrollingElement = document.scrollingElement ?? document.documentElement;
    scrollingElement.scrollBy({
      top: event.deltaY,
      left: event.deltaX,
      behavior: 'auto',
    });
  }

  private on(event: FrCarouselEvent, callback: () => void): () => void {
    const callbacks = this.listeners.get(event) ?? new Set<() => void>();
    callbacks.add(callback);
    this.listeners.set(event, callbacks);

    return () => callbacks.delete(callback);
  }

  private emit(event: FrCarouselEvent): void {
    this.listeners.get(event)?.forEach((callback) => callback());
  }

  private syncPlugins(): void {
    const plugins = this.plugins();

    if (plugins === this.lastPlugins) {
      return;
    }

    this.pluginCleanups.splice(0).forEach((cleanup) => cleanup());

    for (const plugin of plugins) {
      const cleanup = plugin(this.api);
      if (typeof cleanup === 'function') {
        this.pluginCleanups.push(cleanup);
      }
    }

    this.lastPlugins = plugins;
  }

  private recalculate(): void {
    this.snapCount.set(this.itemElements.length);
    this.emit('reInit');
  }

  private syncSelectedFromScroll(): void {
    if (
      this.isProgrammaticScroll ||
      this.isPointerDragging ||
      !this.contentElement ||
      !this.itemElements.length
    ) {
      return;
    }

    // Derive the active item from the nearest snap point during user-driven scrolling.
    this.setSelectedIndex(this.getClosestItemIndex());
  }

  private handlePointerDown(event: PointerEvent): void {
    if (!this.effectiveMouseDrag() || !this.contentElement || event.button !== 0) {
      return;
    }

    this.isPointerDragging = true;
    this.activePointerId = event.pointerId;
    this.pointerDragStartOffset = this.getCurrentScrollOffset();
    this.pointerDragStartPosition = this.getPointerPosition(event);
    this.pointerDragStartIndex = this.selectedIndex();
    this.pointerDragLastPosition = this.pointerDragStartPosition;
    this.pointerDragLastTime = event.timeStamp;
    this.pointerDragVelocity = 0;
    this.clearPointerDragFrame();
    this.contentElement.setPointerCapture?.(event.pointerId);
    this.contentElement.setAttribute('data-dragging', '');
  }

  private handlePointerMove(event: PointerEvent): void {
    if (
      !this.isPointerDragging ||
      this.activePointerId !== event.pointerId ||
      !this.contentElement
    ) {
      return;
    }

    if (event.cancelable) {
      event.preventDefault();
    }

    const pointerPosition = this.getPointerPosition(event);
    const elapsed = event.timeStamp - this.pointerDragLastTime;
    if (elapsed > 0) {
      this.pointerDragVelocity = (pointerPosition - this.pointerDragLastPosition) / elapsed;
      this.pointerDragLastPosition = pointerPosition;
      this.pointerDragLastTime = event.timeStamp;
    }

    const delta = (pointerPosition - this.pointerDragStartPosition) * this.getDragDirectionMultiplier();
    this.pendingPointerDragOffset = this.pointerDragStartOffset - delta;

    if (this.pointerDragFrame !== null) {
      return;
    }

    this.pointerDragFrame = window.requestAnimationFrame(() => {
      this.pointerDragFrame = null;
      this.applyPointerDragOffset();
    });
  }

  private handlePointerEnd(event: PointerEvent): void {
    if (!this.isPointerDragging || this.activePointerId !== event.pointerId) {
      return;
    }

    this.isPointerDragging = false;
    this.activePointerId = null;
    this.applyPointerDragOffset();
    this.clearPointerDragFrame();
    this.contentElement?.releasePointerCapture?.(event.pointerId);
    this.contentElement?.removeAttribute('data-dragging');
    this.settlePointerDrag();
  }

  private applyPointerDragOffset(): void {
    if (!this.contentElement || this.pendingPointerDragOffset === null) {
      return;
    }

    const next = this.pendingPointerDragOffset;
    this.pendingPointerDragOffset = null;

    if (this.orientation() === 'vertical') {
      this.contentElement.scrollTop = next;
      return;
    }

    this.contentElement.scrollLeft = next;
  }

  private clearPointerDragFrame(): void {
    if (this.pointerDragFrame === null) {
      return;
    }

    window.cancelAnimationFrame(this.pointerDragFrame);
    this.pointerDragFrame = null;
  }

  private getPointerPosition(event: PointerEvent): number {
    return this.orientation() === 'vertical' ? event.clientY : event.clientX;
  }

  private settlePointerDrag(): void {
    if (!this.contentElement || !this.itemElements.length) {
      return;
    }

    const closestIndex = this.getClosestItemIndex();
    const targetIndex = this.getPointerDragSettleIndex(closestIndex);
    const target = this.itemElements[targetIndex];
    if (!target) {
      return;
    }

    this.pauseScrollSync();
    this.scrollItemIntoView(target);
    this.setSelectedIndex(targetIndex);
  }

  private getPointerDragSettleIndex(closestIndex: number): number {
    const forwardDistance =
      -(this.pointerDragLastPosition - this.pointerDragStartPosition) * this.getDragDirectionMultiplier();
    const forwardVelocity = -this.pointerDragVelocity * this.getDragDirectionMultiplier();
    const threshold = this.getPointerSettleThreshold();

    if (Math.abs(forwardVelocity) >= POINTER_FLICK_VELOCITY) {
      return this.getBoundedIndex(this.pointerDragStartIndex + (forwardVelocity > 0 ? 1 : -1));
    }

    if (Math.abs(forwardDistance) >= threshold) {
      return this.getBoundedIndex(this.pointerDragStartIndex + (forwardDistance > 0 ? 1 : -1));
    }

    return closestIndex;
  }

  private getBoundedIndex(index: number): number {
    if (this.effectiveLoop()) {
      return (index + this.snapCount()) % this.snapCount();
    }

    return Math.max(0, Math.min(index, this.snapCount() - 1));
  }

  private getPointerSettleThreshold(): number {
    if (!this.contentElement) {
      return 48;
    }

    const size =
      this.orientation() === 'vertical'
        ? this.contentElement.clientHeight
        : this.contentElement.clientWidth;

    return Math.max(32, size * POINTER_SETTLE_THRESHOLD_RATIO);
  }

  private getDragDirectionMultiplier(): 1 | -1 {
    return this.orientation() === 'horizontal' && this.effectiveDirection() === 'rtl' ? -1 : 1;
  }

  private scrollItemIntoView(target: HTMLElement, behavior: ScrollBehavior = 'smooth'): void {
    if (
      !this.contentElement ||
      typeof this.contentElement.getBoundingClientRect !== 'function' ||
      typeof target.getBoundingClientRect !== 'function'
    ) {
      return;
    }

    const next = this.getItemScrollOffset(target);
    const isVertical = this.orientation() === 'vertical';

    if (typeof this.contentElement.scrollTo === 'function') {
      this.contentElement.scrollTo({
        [isVertical ? 'top' : 'left']: next,
        behavior,
      });
      return;
    }

    if (isVertical) {
      this.contentElement.scrollTop = next;
      return;
    }

    this.contentElement.scrollLeft = next;
  }

  private getItemScrollOffset(target: HTMLElement): number {
    if (!this.contentElement) {
      return 0;
    }

    const contentRect = this.contentElement.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const isVertical = this.orientation() === 'vertical';
    const current = this.getCurrentScrollOffset();
    const contentSize = isVertical ? this.contentElement.clientHeight : this.contentElement.clientWidth;
    const targetSize = isVertical ? target.offsetHeight : target.offsetWidth;
    const targetStart = isVertical
      ? targetRect.top - contentRect.top
      : targetRect.left - contentRect.left;

    let next = current + targetStart;
    if (this.effectiveAlign() === 'center') {
      next -= (contentSize - targetSize) / 2;
    }

    if (this.effectiveAlign() === 'end') {
      next -= contentSize - targetSize;
    }

    return Math.max(0, Math.min(next, this.getMaxScrollOffset()));
  }

  private getCurrentScrollOffset(): number {
    if (!this.contentElement) {
      return 0;
    }

    return this.orientation() === 'vertical'
      ? this.contentElement.scrollTop
      : this.contentElement.scrollLeft;
  }

  private getClosestItemIndex(): number {
    const current = this.getCurrentScrollOffset();
    const closest = this.itemElements.reduce(
      (best, item, index) => {
        const targetOffset = this.getItemScrollOffset(item);
        const distance = Math.abs(targetOffset - current);
        return distance < best.distance ? { distance, index } : best;
      },
      { distance: Number.POSITIVE_INFINITY, index: this.selectedIndex() },
    );

    return closest.index;
  }

  private getMaxScrollOffset(): number {
    if (!this.contentElement) {
      return 0;
    }

    return this.orientation() === 'vertical'
      ? Math.max(0, this.contentElement.scrollHeight - this.contentElement.clientHeight)
      : Math.max(0, this.contentElement.scrollWidth - this.contentElement.clientWidth);
  }

  private scrollLoopBoundary(direction: 'previous' | 'next'): void {
    if (!this.contentElement || !this.effectiveLoop() || this.snapCount() < 2) {
      return;
    }

    // Scroll to a temporary clone first, then jump back to the real edge item invisibly.
    const finalIndex = direction === 'next' ? 0 : this.snapCount() - 1;
    const cloneSource = direction === 'next' ? this.itemElements[0] : this.itemElements[this.snapCount() - 1];
    const resetTarget = this.itemElements[finalIndex];

    if (!cloneSource || !resetTarget) {
      this.scrollTo(finalIndex);
      return;
    }

    this.clearLoopResetTimer();
    this.removeLoopClone();
    this.loopBoundaryClone = this.createLoopClone(cloneSource);
    this.pauseScrollSync();

    if (direction === 'next') {
      this.contentElement.appendChild(this.loopBoundaryClone);
    } else {
      this.contentElement.insertBefore(this.loopBoundaryClone, this.contentElement.firstChild);
      this.scrollItemIntoView(this.itemElements[0], 'auto');
    }

    this.scrollItemIntoView(this.loopBoundaryClone);
    this.setSelectedIndex(finalIndex);

    this.scheduleLoopReset(resetTarget);
  }

  private createLoopClone(item: HTMLElement): HTMLElement {
    const clone = item.cloneNode(true) as HTMLElement;
    clone.setAttribute('aria-hidden', 'true');
    clone.setAttribute('data-frame-carousel-clone', 'true');
    clone.removeAttribute('FrCarouselItem');
    clone.inert = true;
    return clone;
  }

  private removeLoopClone(): void {
    this.loopBoundaryClone?.remove();
    this.loopBoundaryClone = null;
  }

  private clearLoopResetTimer(): void {
    this.loopResetScrollEndCleanup?.();
    this.loopResetScrollEndCleanup = null;

    if (this.loopResetTimer === null) {
      return;
    }

    window.clearTimeout(this.loopResetTimer);
    this.loopResetTimer = null;
  }

  private scheduleLoopReset(resetTarget: HTMLElement): void {
    if (!this.contentElement) {
      return;
    }

    // `scrollend` is not universal, so keep a timeout fallback for the loop reset.
    let didReset = false;
    const reset = () => {
      if (didReset) {
        return;
      }

      didReset = true;
      this.clearLoopResetTimer();
      this.scrollItemIntoView(resetTarget, 'auto');
      this.removeLoopClone();
    };

    this.contentElement.addEventListener('scrollend', reset, { once: true });
    this.loopResetScrollEndCleanup = () => this.contentElement?.removeEventListener('scrollend', reset);

    this.loopResetTimer = window.setTimeout(reset, 1200);
  }

  private pauseScrollSync(duration = 1300): void {
    this.isProgrammaticScroll = true;
    this.clearScrollSyncTimer();

    this.scrollSyncTimer = window.setTimeout(() => {
      this.isProgrammaticScroll = false;
      this.scrollSyncTimer = null;
    }, duration);
  }

  private clearScrollSyncTimer(): void {
    if (this.scrollSyncTimer === null) {
      return;
    }

    window.clearTimeout(this.scrollSyncTimer);
    this.scrollSyncTimer = null;
  }

  private setSelectedIndex(index: number): void {
    if (index === this.selectedIndex()) {
      return;
    }

    this.selectedIndex.set(index);
    this.selectedChange.emit(index);
    this.emit('select');
  }
}

/** Content slot for carousel. */
@Directive({
  selector: '[frCarouselContent]',
  host: {
    class: 'frame-carousel__content',
    '[attr.data-drag-free]': 'carousel.effectiveDragFree() ? "" : null',
    '[attr.data-orientation]': 'carousel.orientation()',
  },
})
export class FrCarouselContent implements AfterViewInit {
  protected readonly carousel = inject(FR_CAROUSEL);
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  ngAfterViewInit(): void {
    this.carousel.registerContent(this.elementRef.nativeElement);
  }
}

/** Item slot for carousel. */
@Directive({
  selector: '[frCarouselItem]',
  host: {
    class: 'frame-carousel__item',
    role: 'group',
    '[attr.aria-roledescription]': '"slide"',
  },
})
export class FrCarouselItem implements AfterViewInit {
  private readonly carousel = inject(FR_CAROUSEL);
  private readonly destroyRef = inject(DestroyRef);
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  ngAfterViewInit(): void {
    this.carousel.registerItem(this.elementRef.nativeElement);
    this.destroyRef.onDestroy(() => this.carousel.unregisterItem(this.elementRef.nativeElement));
  }
}

/** Optional control row for carousel navigation buttons. */
@Directive({
  selector: '[frCarouselControls], frame-carousel-controls',
  host: {
    class: 'frame-carousel__controls',
  },
})
export class FrCarouselControls {}

/** Optional button control for navigating the carousel. */
@Directive({
  selector: 'button[frCarouselControl]',
  hostDirectives: [
    {
      directive: FrButton,
      inputs: ['appearance', 'disabled', 'size'],
    },
  ],
  host: {
    class: 'frame-carousel__control',
    '[class.frame-carousel__control--previous]': 'direction() === "previous"',
    '[class.frame-carousel__control--next]': 'direction() === "next"',
    '[attr.type]': '"button"',
    '[attr.aria-label]': 'label()',
    '[attr.disabled]': 'isDisabled() ? "" : null',
    '(click)': 'handleClick()',
  },
})
export class FrCarouselControl {
  protected readonly carousel = inject(FR_CAROUSEL);

  readonly direction = input<'previous' | 'next'>('next', { alias: 'frCarouselControl' });
  readonly label = input('Navigate carousel');

  protected isDisabled(): boolean {
    return this.direction() === 'previous'
      ? !this.carousel.canScrollPrev()
      : !this.carousel.canScrollNext();
  }

  protected handleClick(): void {
    if (this.direction() === 'previous') {
      this.carousel.scrollPrev();
      return;
    }

    this.carousel.scrollNext();
  }
}

/** Button control for navigating to the previous carousel slide. */
@Directive({
  selector: 'button[frCarouselPrevious]',
  hostDirectives: [
    {
      directive: FrButton,
      inputs: ['appearance', 'disabled', 'size'],
    },
  ],
  host: {
    class: 'frame-carousel__control frame-carousel__control--previous',
    '[attr.type]': '"button"',
    '[attr.aria-label]': 'label()',
    '[attr.disabled]': 'isDisabled() ? "" : null',
    '(click)': 'handleClick()',
  },
})
export class FrCarouselPrevious {
  private readonly carousel = inject(FR_CAROUSEL);
  readonly label = input('Previous slide');

  protected isDisabled(): boolean {
    return !this.carousel.canScrollPrev();
  }

  protected handleClick(): void {
    this.carousel.scrollPrev();
  }
}

/** Button control for navigating to the next carousel slide. */
@Directive({
  selector: 'button[frCarouselNext]',
  hostDirectives: [
    {
      directive: FrButton,
      inputs: ['appearance', 'disabled', 'size'],
    },
  ],
  host: {
    class: 'frame-carousel__control frame-carousel__control--next',
    '[attr.type]': '"button"',
    '[attr.aria-label]': 'label()',
    '[attr.disabled]': 'isDisabled() ? "" : null',
    '(click)': 'handleClick()',
  },
})
export class FrCarouselNext {
  private readonly carousel = inject(FR_CAROUSEL);
  readonly label = input('Next slide');

  protected isDisabled(): boolean {
    return !this.carousel.canScrollNext();
  }

  protected handleClick(): void {
    this.carousel.scrollNext();
  }
}

/** Dot-list slot for carousel pagination controls. */
@Directive({
  selector: '[frCarouselDots], frame-carousel-dots',
  host: {
    class: 'frame-carousel__dots',
    role: 'group',
    '[attr.aria-label]': 'label()',
  },
})
export class FrCarouselDots {
  readonly label = input('Carousel pagination');
}

/** Dot control for selecting a specific slide. */
@Directive({
  selector: 'button[frCarouselDot]',
  host: {
    class: 'frame-carousel__dot',
    '[attr.type]': '"button"',
    '[attr.aria-current]': 'carousel.selectedIndex() === index() ? "true" : null',
    '[attr.aria-label]': 'label()',
    '[attr.data-active]': 'carousel.selectedIndex() === index() ? "" : null',
    '(click)': 'carousel.scrollTo(index())',
  },
})
export class FrCarouselDot {
  protected readonly carousel = inject(FR_CAROUSEL);
  readonly index = input(0, { transform: numberAttribute });
  readonly label = input('Select slide');
}

/** Thumbnail control for selecting a specific slide. */
@Directive({
  selector: 'button[frCarouselThumb]',
  host: {
    class: 'frame-carousel__thumb',
    '[attr.type]': '"button"',
    '[attr.aria-current]': 'carousel.selectedIndex() === index() ? "true" : null',
    '[attr.aria-label]': 'label()',
    '[attr.data-active]': 'carousel.selectedIndex() === index() ? "" : null',
    '(click)': 'carousel.scrollTo(index())',
  },
})
export class FrCarouselThumb {
  protected readonly carousel = inject(FR_CAROUSEL);
  readonly index = input(0, { transform: numberAttribute });
  readonly label = input('Select slide');
}

/** Thumbnail-list slot for carousel thumbnail controls. */
@Directive({
  selector: '[frCarouselThumbs], frame-carousel-thumbs',
  host: {
    class: 'frame-carousel__thumbs',
    role: 'group',
    '[attr.aria-label]': 'label()',
  },
})
export class FrCarouselThumbs {
  readonly label = input('Carousel thumbnails');
}
