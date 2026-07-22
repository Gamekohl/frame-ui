import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';

import {
  FrCarousel,
  FrCarouselApi,
  FrCarouselContent,
  FrCarouselControls,
  FrCarouselDot,
  FrCarouselDots,
  FrCarouselItem,
  FrCarouselNext,
  FrCarouselPrevious,
  FrCarouselThumb,
  FrCarouselThumbs,
} from '../carousel';

@Component({
  imports: [
    FrCarousel,
    FrCarouselContent,
    FrCarouselControls,
    FrCarouselDot,
    FrCarouselDots,
    FrCarouselItem,
    FrCarouselNext,
    FrCarouselPrevious,
    FrCarouselThumb,
    FrCarouselThumbs,
  ],
  standalone: true,
  template: `
    <section
      #carousel="frCarousel"
      frCarousel
      orientation="vertical"
      [slidesToScroll]="2"
      [loop]="true"
      [opts]="{ align: 'center', direction: 'rtl' }"
      (apiReady)="api.set($event)"
      (selectedChange)="selected.set($event)"
    >
      <div frCarouselContent>
        <div frCarouselItem>One</div>
        <div frCarouselItem>Two</div>
      </div>
      <div frCarouselDots>
        @for (index of carousel.snapIndexes(); track index) {
          <button frCarouselDot [index]="index">Dot {{ index + 1 }}</button>
        }
      </div>
      <div frCarouselControls>
        <button frCarouselPrevious>Previous</button>
        <button frCarouselNext>Next</button>
      </div>
      <div frCarouselThumbs>
        @for (index of carousel.snapIndexes(); track index) {
          <button frCarouselThumb [index]="index">Thumb {{ index + 1 }}</button>
        }
      </div>
    </section>
  `,
})
class CarouselHostComponent {
  readonly api = signal<FrCarouselApi | null>(null);
  readonly selected = signal(0);
}

describe('FrCarousel', () => {
  it('adds carousel classes, attributes, and exposes an API', async () => {
    const fixture = TestBed.createComponent(CarouselHostComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    const carousel = fixture.nativeElement.querySelector('[frCarousel]') as HTMLElement;
    const content = fixture.nativeElement.querySelector('[frCarouselContent]') as HTMLElement;
    const items = fixture.nativeElement.querySelectorAll('[frCarouselItem]');
    const dots = fixture.nativeElement.querySelector('[frCarouselDots]') as HTMLElement;
    const dot = fixture.nativeElement.querySelector('[frCarouselDot]') as HTMLButtonElement;
    const controls = fixture.nativeElement.querySelector('[frCarouselControls]') as HTMLElement;
    const previous = fixture.nativeElement.querySelector('[frCarouselPrevious]') as HTMLButtonElement;
    const next = fixture.nativeElement.querySelector('[frCarouselNext]') as HTMLButtonElement;
    const thumbs = fixture.nativeElement.querySelector('[frCarouselThumbs]') as HTMLElement;
    const thumb = fixture.nativeElement.querySelector('[frCarouselThumb]') as HTMLButtonElement;

    expect(carousel.classList.contains('frame-carousel')).toBe(true);
    expect(carousel.getAttribute('data-orientation')).toBe('vertical');
    expect(carousel.getAttribute('data-align')).toBe('center');
    expect(carousel.hasAttribute('data-drag-free')).toBe(true);
    expect(carousel.getAttribute('data-direction')).toBe('rtl');
    expect(content.classList.contains('frame-carousel__content')).toBe(true);
    expect(content.hasAttribute('data-drag-free')).toBe(true);
    expect(items.length).toBe(2);
    expect(dots.classList.contains('frame-carousel__dots')).toBe(true);
    expect(dot.classList.contains('frame-carousel__dot')).toBe(true);
    expect(controls.classList.contains('frame-carousel__controls')).toBe(true);
    expect(previous.classList.contains('frame-carousel__control--previous')).toBe(true);
    expect(next.classList.contains('frame-carousel__control--next')).toBe(true);
    expect(thumbs.classList.contains('frame-carousel__thumbs')).toBe(true);
    expect(thumb.classList.contains('frame-carousel__thumb')).toBe(true);
    expect(fixture.componentInstance.api()).toBeTruthy();
    expect(fixture.componentInstance.api()?.scrollSnapList()).toEqual([0, 1]);
  });

  it('forwards wheel gestures to the page instead of scrolling slides', async () => {
    const fixture = TestBed.createComponent(CarouselHostComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    const content = fixture.nativeElement.querySelector('[frCarouselContent]') as HTMLElement;
    const scrollBy = vi.fn();
    const descriptor = Object.getOwnPropertyDescriptor(Document.prototype, 'scrollingElement');

    try {
      Object.defineProperty(document, 'scrollingElement', {
        configurable: true,
        value: { scrollBy },
      });

      const event = new WheelEvent('wheel', {
        bubbles: true,
        cancelable: true,
        deltaX: 8,
        deltaY: 24,
      });

      content.dispatchEvent(event);

      expect(event.defaultPrevented).toBe(true);
      expect(scrollBy).toHaveBeenCalledWith({ top: 24, left: 8, behavior: 'auto' });
    } finally {
      if (descriptor) {
        Object.defineProperty(document, 'scrollingElement', descriptor);
      } else {
        delete (document as unknown as { scrollingElement?: Element }).scrollingElement;
      }
    }
  });
});
