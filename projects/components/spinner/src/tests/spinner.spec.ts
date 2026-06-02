import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { FrSpinner } from '../spinner';

@Component({
  imports: [FrSpinner],
  template: `<span frSpinner size="lg" label="Saving"></span>`,
})
class SpinnerHostComponent {}

@Component({
  imports: [FrSpinner],
  template: `<frame-spinner decorative sizeValue="2rem" duration="1s" stroke="3px" />`,
})
class DecorativeSpinnerHostComponent {}

describe('FrSpinner', () => {
  it('renders an accessible status spinner', () => {
    const fixture = TestBed.createComponent(SpinnerHostComponent);
    fixture.detectChanges();

    const spinner = fixture.nativeElement.querySelector('[frSpinner]') as HTMLElement;
    expect(spinner.classList.contains('frame-spinner')).toBe(true);
    expect(spinner.getAttribute('data-size')).toBe('lg');
    expect(spinner.getAttribute('role')).toBe('status');
    expect(spinner.getAttribute('aria-label')).toBe('Saving');
  });

  it('supports decorative and custom sizing inputs', () => {
    const fixture = TestBed.createComponent(DecorativeSpinnerHostComponent);
    fixture.detectChanges();

    const spinner = fixture.nativeElement.querySelector('frame-spinner') as HTMLElement;
    expect(spinner.getAttribute('aria-hidden')).toBe('true');
    expect(spinner.getAttribute('role')).toBeNull();
    expect(spinner.style.getPropertyValue('--frame-spinner-size')).toBe('2rem');
    expect(spinner.style.getPropertyValue('--frame-spinner-duration')).toBe('1s');
    expect(spinner.style.getPropertyValue('--frame-spinner-stroke')).toBe('3px');
  });
});

