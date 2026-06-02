import { Component, signal, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrProgress, FrProgressIndicator } from '../progress';

@Component({
  imports: [FrProgress, FrProgressIndicator],
  template: `
    <div frProgress #progress="frProgress" [value]="value()" [max]="max()" aria-label="Upload progress">
      <div frProgressIndicator></div>
    </div>
  `,
})
class ProgressHost {
  readonly value = signal<number | null>(40);
  readonly max = signal(80);
  readonly progress = viewChild.required(FrProgress);
}

describe('FrProgress', () => {
  let fixture: ComponentFixture<ProgressHost>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProgressHost],
    });

    fixture = TestBed.createComponent(ProgressHost);
    fixture.detectChanges();
  });

  it('renders progress semantics and determinate state', () => {
    const root = fixture.nativeElement.querySelector('.frame-progress') as HTMLElement;
    const indicator = fixture.nativeElement.querySelector('.frame-progress__indicator') as HTMLElement;

    expect(root.getAttribute('role')).toBe('progressbar');
    expect(root.getAttribute('aria-valuemin')).toBe('0');
    expect(root.getAttribute('aria-valuemax')).toBe('80');
    expect(root.getAttribute('aria-valuenow')).toBe('40');
    expect(root.getAttribute('data-state')).toBe('loading');
    expect(root.style.getPropertyValue('--frame-progress-percent')).toBe('50%');
    expect(indicator).not.toBeNull();
  });

  it('clamps values and reports complete state', () => {
    fixture.componentInstance.value.set(120);
    fixture.detectChanges();

    const root = fixture.nativeElement.querySelector('.frame-progress') as HTMLElement;

    expect(fixture.componentInstance.progress().normalizedValue()).toBe(80);
    expect(root.getAttribute('aria-valuenow')).toBe('80');
    expect(root.getAttribute('data-state')).toBe('complete');
    expect(root.style.getPropertyValue('--frame-progress-percent')).toBe('100%');
  });

  it('supports indeterminate progress', () => {
    fixture.componentInstance.value.set(null);
    fixture.detectChanges();

    const root = fixture.nativeElement.querySelector('.frame-progress') as HTMLElement;

    expect(root.getAttribute('data-state')).toBe('indeterminate');
    expect(root.getAttribute('aria-valuenow')).toBeNull();
    expect(root.getAttribute('aria-valuemax')).toBeNull();
    expect(root.style.getPropertyValue('--frame-progress-percent')).toBe('');
  });
});
