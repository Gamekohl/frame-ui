import { TestBed } from '@angular/core/testing';

import { DonutChartHost, DonutChartZeroValuesHost } from './chart-test-hosts';

describe('FrChart donut chart', () => {
  it('renders ring slices with category legend items', () => {
    const fixture = TestBed.createComponent(DonutChartHost);
    fixture.detectChanges();

    const host = fixture.nativeElement.querySelector('frame-chart') as HTMLElement;
    const slices = fixture.nativeElement.querySelectorAll('.frame-chart__pie-slice');
    const legend = fixture.nativeElement.querySelector('.frame-chart__legend') as HTMLElement;

    expect(host.getAttribute('data-type')).toBe('donut');
    expect(slices.length).toBe(3);
    expect(slices[0].getAttribute('d')).toMatch(/^M [\d.-]+ [\d.-]+ A /);
    expect(legend.textContent).toContain('Organic');
    expect(legend.textContent).toContain('Direct');
  });

  it('renders an empty state when all values are zero', () => {
    const fixture = TestBed.createComponent(DonutChartZeroValuesHost);
    fixture.detectChanges();

    const slices = fixture.nativeElement.querySelectorAll('.frame-chart__pie-slice');
    const empty = fixture.nativeElement.querySelector('.frame-chart__empty') as HTMLElement;

    expect(slices.length).toBe(0);
    expect(empty.textContent).toContain('No chart data');
  });
});
