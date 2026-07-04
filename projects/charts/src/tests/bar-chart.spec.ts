import { TestBed } from '@angular/core/testing';

import { BarChartHost, BarChartLongLabelsHost, HorizontalBarChartHost, StackedBarChartHost } from './chart-test-hosts';

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

  it('renders stacked bars on a shared category position', () => {
    const fixture = TestBed.createComponent(StackedBarChartHost);
    fixture.detectChanges();

    const bars = Array.from(fixture.nativeElement.querySelectorAll('.frame-chart__bar')) as SVGRectElement[];
    const firstSegment = bars[0];
    const secondSegment = bars[3];

    expect(bars.length).toBe(6);
    expect(firstSegment.getAttribute('x')).toBe(secondSegment.getAttribute('x'));
    expect(Number(firstSegment.getAttribute('height'))).toBeGreaterThan(0);
    expect(Number(secondSegment.getAttribute('height'))).toBeGreaterThan(0);
  });

  it('renders horizontal bars with category labels on the y axis', () => {
    const fixture = TestBed.createComponent(HorizontalBarChartHost);
    fixture.detectChanges();

    const bars = Array.from(fixture.nativeElement.querySelectorAll('.frame-chart__bar')) as SVGRectElement[];
    const yAxis = fixture.nativeElement.querySelector('.frame-chart__axis--y') as SVGGElement;

    expect(bars.length).toBe(6);
    expect(Number(bars[0].getAttribute('width'))).toBeGreaterThan(Number(bars[0].getAttribute('height')));
    expect(yAxis.textContent).toContain('API');
  });
});
