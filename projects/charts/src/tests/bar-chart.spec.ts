import { TestBed } from '@angular/core/testing';

import { BarChartHost, BarChartLongLabelsHost } from './chart-test-hosts';

describe('FrChart bar chart', () => {
  it('renders grouped bars and series legend items', () => {
    const fixture = TestBed.createComponent(BarChartHost);
    fixture.detectChanges();

    const host = fixture.nativeElement.querySelector('frame-chart') as HTMLElement;
    const bars = fixture.nativeElement.querySelectorAll('.frame-chart__bar');
    const legend = fixture.nativeElement.querySelector('.frame-chart__legend') as HTMLElement;

    expect(host.getAttribute('data-type')).toBe('bar');
    expect(bars.length).toBe(6);
    expect(legend.textContent).toContain('Critical');
    expect(legend.textContent).toContain('Warning');
  });

  it('shows shortened long x-axis labels with the full value as tooltip content', () => {
    const fixture = TestBed.createComponent(BarChartLongLabelsHost);
    fixture.detectChanges();

    const xAxisLabel = fixture.nativeElement.querySelector('.frame-chart__axis--x text') as SVGTextElement;

    expect(xAxisLabel.textContent).toContain('…');
    expect(xAxisLabel.querySelector('title')?.textContent).toBe('checkout-orchestration-worker');
  });
});
