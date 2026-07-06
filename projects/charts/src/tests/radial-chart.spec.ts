import { TestBed } from '@angular/core/testing';

import { RadialChartHost, RadialChartZeroValuesHost } from './chart-test-hosts';

describe('FrChart radial', () => {
  it('renders radial tracks, segments, center label, and legend items', () => {
    const fixture = TestBed.createComponent(RadialChartHost);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('.frame-chart__radial-track').length).toBe(3);
    expect(fixture.nativeElement.querySelectorAll('.frame-chart__radial-segment').length).toBe(3);
    expect(fixture.nativeElement.querySelector('.frame-chart__radial-value')?.textContent?.trim()).toBe('100');
    expect(fixture.nativeElement.querySelector('.frame-chart__radial-label')?.textContent?.trim()).toBe('Preflight');
    expect(fixture.nativeElement.querySelectorAll('.frame-chart__legend-item').length).toBe(3);
  });

  it('shows an empty state when every radial value is zero', () => {
    const fixture = TestBed.createComponent(RadialChartZeroValuesHost);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('.frame-chart__radial-segment').length).toBe(0);
    expect(fixture.nativeElement.querySelector('.frame-chart__empty')?.textContent).toContain('No chart data');
  });
});
