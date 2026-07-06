import { TestBed } from '@angular/core/testing';

import { PieChartCustomColorsHost, PieChartHost, PieChartZeroValuesHost } from './chart-test-hosts';

describe('FrChart pie chart', () => {
  it('renders slices with category legend items', () => {
    const fixture = TestBed.createComponent(PieChartHost);
    fixture.detectChanges();

    const host = fixture.nativeElement.querySelector('frame-chart') as HTMLElement;
    const slices = fixture.nativeElement.querySelectorAll('.frame-chart__pie-slice');
    const legend = fixture.nativeElement.querySelector('.frame-chart__legend') as HTMLElement;

    expect(host.getAttribute('data-type')).toBe('pie');
    expect(slices.length).toBe(3);
    expect(legend.textContent).toContain('Organic');
    expect(legend.textContent).toContain('Direct');
  });

  it('uses datum colors before generated defaults', () => {
    const fixture = TestBed.createComponent(PieChartCustomColorsHost);
    fixture.detectChanges();

    const slices = fixture.nativeElement.querySelectorAll('.frame-chart__pie-slice');

    expect(slices[0].getAttribute('fill')).toBe('#15803d');
    expect(slices[1].getAttribute('fill')).toBe('var(--custom-direct-color)');
    expect(slices[5].getAttribute('fill')).toContain('color-mix');
  });

  it('renders an empty state when all values are zero', () => {
    const fixture = TestBed.createComponent(PieChartZeroValuesHost);
    fixture.detectChanges();

    const slices = fixture.nativeElement.querySelectorAll('.frame-chart__pie-slice');
    const empty = fixture.nativeElement.querySelector('.frame-chart__empty') as HTMLElement;

    expect(slices.length).toBe(0);
    expect(empty.textContent).toContain('No chart data');
  });
});
