import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import {
  FrBadge,
  FrBadgeIcon,
  FrBadgeIconPosition,
  FrBadgeLabel,
  FrBadgeSpinner,
  FrBadgeVariant,
} from '../badge';

@Component({
  imports: [FrBadge, FrBadgeIcon, FrBadgeLabel, FrBadgeSpinner],
  standalone: true,
  template: `
    <a frBadge href="/docs" [variant]="variant()">
      <span frBadgeIcon [position]="iconPosition()">+</span>
      <span frBadgeLabel>Open Link</span>
      <span frBadgeSpinner position="inline-end"></span>
    </a>
  `,
})
class TestHostComponent {
  readonly variant = signal<FrBadgeVariant>('link');
  readonly iconPosition = signal<FrBadgeIconPosition>('inline-start');
}

describe('FrBadge', () => {
  it('reflects variant state and supports link hosts', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();

    const badge = fixture.nativeElement.querySelector('a') as HTMLAnchorElement;

    expect(badge.classList.contains('frame-badge')).toBe(true);
    expect(badge.getAttribute('data-variant')).toBe('link');
    expect(badge.getAttribute('href')).toBe('/docs');
  });

  it('marks icon, label, and spinner slots', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();

    const icon = fixture.nativeElement.querySelector('[frBadgeIcon]') as HTMLElement;
    const label = fixture.nativeElement.querySelector('[frBadgeLabel]') as HTMLElement;
    const spinner = fixture.nativeElement.querySelector('[frBadgeSpinner]') as HTMLElement;

    expect(icon.classList.contains('frame-badge__icon')).toBe(true);
    expect(icon.getAttribute('data-icon')).toBe('inline-start');
    expect(label.classList.contains('frame-badge__label')).toBe(true);
    expect(spinner.classList.contains('frame-badge__spinner')).toBe(true);
    expect(spinner.getAttribute('data-icon')).toBe('inline-end');
  });
});
