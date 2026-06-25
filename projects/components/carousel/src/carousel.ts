import {
  AfterViewInit,
  DestroyRef,
  Directive,
  DoCheck,
  ElementRef,
  InjectionToken,
  Renderer2,
  booleanAttribute,
  computed,
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
  loop?: boolean;
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
    '[attr.data-orientation]': 'orientation()',
    '[attr.dir]': 'effectiveDirection()',
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
  private loopBoundaryClone: HTMLElement | null = null;
  private contentElement: HTMLElement | null = null;
  private itemElements: HTMLElement[] = [];
  private lastLoop = false;
  private lastPlugins: readonly FrCarouselPlugin[] | null = null;

  readonly align = input<FrCarouselAlign>('start');
  readonly loop = input(false, { transform: booleanAttribute });
  readonly orientation = input<FrCarouselOrientation>('horizontal');
  readonly opts = input<FrCarouselOptions | null>(null);
  readonly plugins = input<readonly FrCarouselPlugin[]>([]);

  readonly apiReady = output<FrCarouselApi>();
  readonly selectedChange = output<number>();

  readonly selectedIndex = signal(0);
  readonly snapCount = signal(0);

  protected readonly effectiveAlign = computed(() => this.opts()?.align ?? this.align());
  protected readonly effectiveDirection = computed<FrCarouselDirection>(() => this.opts()?.direction ?? 'ltr');
  private readonly effectiveLoop = computed(() => this.opts()?.loop ?? this.loop());

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
    const nextIndex = this.selectedIndex() - 1;
    if (this.effectiveLoop() && nextIndex < 0) {
      this.scrollLoopBoundary('previous');
      return;
    }

    this.scrollTo(nextIndex < 0 ? this.snapCount() - 1 : nextIndex);
  }

  scrollNext(): void {
    const nextIndex = this.selectedIndex() + 1;
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
    const nextKey = this.orientation() === 'vertical' ? 'ArrowDown' : 'ArrowRight';
    const prevKey = this.orientation() === 'vertical' ? 'ArrowUp' : 'ArrowLeft';

    if (event.key === nextKey) {
      event.preventDefault();
      this.scrollNext();
    }

    if (event.key === prevKey) {
      event.preventDefault();
      this.scrollPrev();
    }
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
    if (this.isProgrammaticScroll || !this.contentElement || !this.itemElements.length) {
      return;
    }

    // Derive the active item from the nearest snap point during user-driven scrolling.
    const current = this.getCurrentScrollOffset();
    const closest = this.itemElements.reduce(
      (best, item, index) => {
        const targetOffset = this.getItemScrollOffset(item);
        const distance = Math.abs(targetOffset - current);
        return distance < best.distance ? { distance, index } : best;
      },
      { distance: Number.POSITIVE_INFINITY, index: this.selectedIndex() },
    );

    this.setSelectedIndex(closest.index);
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

/** Previous-slide control for carousel. */
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
    '[attr.disabled]': 'carousel.canScrollPrev() ? null : ""',
    '(click)': 'carousel.scrollPrev()',
  },
})
export class FrCarouselPrevious {
  protected readonly carousel = inject(FR_CAROUSEL);
  readonly label = input('Previous slide');
}

/** Next-slide control for carousel. */
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
    '[attr.disabled]': 'carousel.canScrollNext() ? null : ""',
    '(click)': 'carousel.scrollNext()',
  },
})
export class FrCarouselNext {
  protected readonly carousel = inject(FR_CAROUSEL);
  readonly label = input('Next slide');
}


