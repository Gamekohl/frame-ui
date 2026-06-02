import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrSkeleton } from '../skeleton';

@Component({
  imports: [FrSkeleton],
  template: `
    <div
      frSkeleton
      [animated]="animated()"
      [width]="width()"
      [height]="height()"
      [radius]="radius()"
    ></div>
  `,
})
class SkeletonHost {
  readonly animated = signal(true);
  readonly width = signal<string | null>('8rem');
  readonly height = signal<string | null>('2rem');
  readonly radius = signal<string | null>('999px');
}

describe('FrSkeleton', () => {
  let fixture: ComponentFixture<SkeletonHost>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SkeletonHost],
    });

    fixture = TestBed.createComponent(SkeletonHost);
    fixture.detectChanges();
  });

  it('renders an animated decorative skeleton with sizing variables', () => {
    const skeleton = fixture.nativeElement.querySelector('[frSkeleton]') as HTMLElement;

    expect(skeleton.classList.contains('frame-skeleton')).toBe(true);
    expect(skeleton.getAttribute('aria-hidden')).toBe('true');
    expect(skeleton.getAttribute('data-animated')).toBe('true');
    expect(skeleton.style.getPropertyValue('--frame-skeleton-width')).toBe('8rem');
    expect(skeleton.style.getPropertyValue('--frame-skeleton-height')).toBe('2rem');
    expect(skeleton.style.getPropertyValue('--frame-skeleton-radius')).toBe('999px');
  });

  it('can disable animation', () => {
    fixture.componentInstance.animated.set(false);
    fixture.detectChanges();

    const skeleton = fixture.nativeElement.querySelector('[frSkeleton]') as HTMLElement;

    expect(skeleton.getAttribute('data-animated')).toBe('false');
  });
});
