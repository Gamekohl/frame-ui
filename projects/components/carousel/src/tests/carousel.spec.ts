import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import {
  FrCarousel,
  FrCarouselApi,
  FrCarouselContent,
  FrCarouselItem,
  FrCarouselNext,
  FrCarouselPrevious,
} from '../carousel';

@Component({
  imports: [FrCarousel, FrCarouselContent, FrCarouselItem, FrCarouselPrevious, FrCarouselNext],
  standalone: true,
  template: `
    <section
      frCarousel
      orientation="vertical"
      [loop]="true"
      [opts]="{ align: 'center', direction: 'rtl' }"
      (apiReady)="api.set($event)"
      (selectedChange)="selected.set($event)"
    >
      <div frCarouselContent>
        <div frCarouselItem>One</div>
        <div frCarouselItem>Two</div>
      </div>
      <button frCarouselPrevious>Previous</button>
      <button frCarouselNext>Next</button>
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
    const previous = fixture.nativeElement.querySelector('[frCarouselPrevious]') as HTMLButtonElement;
    const next = fixture.nativeElement.querySelector('[frCarouselNext]') as HTMLButtonElement;

    expect(carousel.classList.contains('frame-carousel')).toBe(true);
    expect(carousel.getAttribute('data-orientation')).toBe('vertical');
    expect(carousel.getAttribute('data-align')).toBe('center');
    expect(carousel.getAttribute('dir')).toBe('rtl');
    expect(content.classList.contains('frame-carousel__content')).toBe(true);
    expect(items.length).toBe(2);
    expect(previous.classList.contains('frame-carousel__control--previous')).toBe(true);
    expect(next.classList.contains('frame-carousel__control--next')).toBe(true);
    expect(fixture.componentInstance.api()).toBeTruthy();
    expect(fixture.componentInstance.api()?.scrollSnapList()).toEqual([0, 1]);
  });
});
