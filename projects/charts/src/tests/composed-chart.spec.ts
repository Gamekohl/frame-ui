import { TestBed } from '@angular/core/testing';

import { ComposedChartHost } from './chart-test-hosts';

describe('FrChart composed chart', () => {
  it('renders bar, area, and line series in one chart', () => {
    const fixture = TestBed.createComponent(ComposedChartHost);
    fixture.detectChanges();

    const host = fixture.nativeElement.querySelector('frame-chart') as HTMLElement;

    expect(host.getAttribute('data-type')).toBe('composed');
    expect(fixture.nativeElement.querySelectorAll('.frame-chart__bar').length).toBe(3);
    expect(fixture.nativeElement.querySelectorAll('.frame-chart__area').length).toBeGreaterThan(0);
    expect(fixture.nativeElement.querySelectorAll('.frame-chart__line').length).toBe(2);
  });

  it('keeps composed bar marks inside the plot area above the x axis', () => {
    const fixture = TestBed.createComponent(ComposedChartHost);
    fixture.detectChanges();

    const bar = fixture.nativeElement.querySelector('.frame-chart__bar') as SVGRectElement;
    const xAxisLabel = fixture.nativeElement.querySelector('.frame-chart__axis--x text') as SVGTextElement;
    const barBottom = Number(bar.getAttribute('y')) + Number(bar.getAttribute('height'));
    const xAxisY = Number(xAxisLabel.getAttribute('y'));

    expect(barBottom).toBeLessThan(xAxisY);
  });

  it('keeps composed bar marks inside the plot area after the y axis', () => {
    const fixture = TestBed.createComponent(ComposedChartHost);
    fixture.detectChanges();

    const bar = fixture.nativeElement.querySelector('.frame-chart__bar') as SVGRectElement;
    const gridLine = fixture.nativeElement.querySelector('.frame-chart__grid line') as SVGLineElement;
    const barLeft = Number(bar.getAttribute('x'));
    const plotLeft = Number(gridLine.getAttribute('x1'));

    expect(barLeft).toBeGreaterThanOrEqual(plotLeft);
  });

  it('can hide and show individual series from the legend', () => {
    const fixture = TestBed.createComponent(ComposedChartHost);
    fixture.detectChanges();

    const buttons = Array.from(fixture.nativeElement.querySelectorAll('.frame-chart__legend-button')) as HTMLButtonElement[];
    const revenueButton = buttons.find((button) => button.textContent?.includes('Revenue'));

    revenueButton?.click();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('.frame-chart__bar').length).toBe(0);
    expect(revenueButton?.getAttribute('data-hidden')).toBe('');

    revenueButton?.click();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('.frame-chart__bar').length).toBe(3);
  });
});
