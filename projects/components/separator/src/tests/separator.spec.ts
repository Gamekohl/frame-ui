import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrSeparator } from '../separator';

@Component({
  imports: [FrSeparator],
  template: `
    <div
      frSeparator
      [orientation]="orientation()"
      [decorative]="decorative()"
      aria-label="Content boundary"
    ></div>
  `,
})
class SeparatorHost {
  readonly orientation = signal<'horizontal' | 'vertical'>('horizontal');
  readonly decorative = signal(true);
}

describe('FrSeparator', () => {
  let fixture: ComponentFixture<SeparatorHost>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SeparatorHost],
    });

    fixture = TestBed.createComponent(SeparatorHost);
    fixture.detectChanges();
  });

  it('renders as a decorative horizontal separator by default', () => {
    const separator = fixture.nativeElement.querySelector('[frSeparator]') as HTMLElement;

    expect(separator.classList.contains('frame-separator')).toBe(true);
    expect(separator.getAttribute('data-orientation')).toBe('horizontal');
    expect(separator.getAttribute('data-decorative')).toBe('true');
    expect(separator.getAttribute('role')).toBe('presentation');
    expect(separator.getAttribute('aria-orientation')).toBeNull();
  });

  it('can expose semantic separator attributes', () => {
    fixture.componentInstance.orientation.set('vertical');
    fixture.componentInstance.decorative.set(false);
    fixture.detectChanges();

    const separator = fixture.nativeElement.querySelector('[frSeparator]') as HTMLElement;

    expect(separator.getAttribute('data-orientation')).toBe('vertical');
    expect(separator.getAttribute('data-decorative')).toBe('false');
    expect(separator.getAttribute('role')).toBe('separator');
    expect(separator.getAttribute('aria-orientation')).toBe('vertical');
  });
});
