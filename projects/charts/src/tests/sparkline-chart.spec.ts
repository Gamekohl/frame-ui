import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { FrChart } from '../chart';

import {
  AreaSparklineChartHost,
  BarSparklineChartHost,
  ColumnSparklineChartHost,
  LineSparklineChartHost,
  MixedAreaSparklineChartHost,
  MixedColumnSparklineChartHost,
  SharpAreaSparklineChartHost,
} from './chart-test-hosts';

describe('FrChart sparkline charts', () => {
  it('renders an area sparkline without full chart chrome', () => {
    const fixture = TestBed.createComponent(AreaSparklineChartHost);
    fixture.detectChanges();

    const host = fixture.nativeElement.querySelector('frame-chart') as HTMLElement;

    expect(host.getAttribute('data-type')).toBe('area-sparkline');
    expect(host.getAttribute('data-sparkline')).toBe('');
    expect(host.style.getPropertyValue('--frame-chart-height')).toBe('80px');
    expect(fixture.nativeElement.querySelector('.frame-chart__area')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('.frame-chart__axis')).toBeNull();
    expect(fixture.nativeElement.querySelector('.frame-chart__legend')).toBeNull();
  });

  it('renders a sharp area sparkline with straight segments', () => {
    const fixture = TestBed.createComponent(SharpAreaSparklineChartHost);
    fixture.detectChanges();

    const line = fixture.nativeElement.querySelector('.frame-chart__line') as SVGPathElement;

    expect(line.getAttribute('d')).toContain('L');
    expect(line.getAttribute('d')).not.toContain('C');
  });

  it('renders a point indicator on area and line sparklines when active', () => {
    const fixture = TestBed.createComponent(AreaSparklineChartHost);
    fixture.detectChanges();

    const host = fixture.nativeElement.querySelector('frame-chart') as HTMLElement;
    const chart = fixture.debugElement.query(By.directive(FrChart)).componentInstance as FrChart;

    chart.activeIndex.set(2);
    fixture.detectChanges();

    expect(host.getAttribute('data-sparkline')).toBe('');
    expect(fixture.nativeElement.querySelector('.frame-chart__sparkline-dot')).not.toBeNull();
  });

  it('renders a zero baseline for mixed positive and negative area sparklines', () => {
    const fixture = TestBed.createComponent(MixedAreaSparklineChartHost);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.frame-chart__sparkline-zero-line')).not.toBeNull();
  });

  it('renders a line sparkline as a compact line path', () => {
    const fixture = TestBed.createComponent(LineSparklineChartHost);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('frame-chart')?.getAttribute('data-type')).toBe('line-sparkline');
    expect(fixture.nativeElement.querySelector('.frame-chart__line')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('.frame-chart__area')).toBeNull();
  });

  it('renders a column sparkline with vertical bars', () => {
    const fixture = TestBed.createComponent(ColumnSparklineChartHost);
    fixture.detectChanges();

    const bars = Array.from(fixture.nativeElement.querySelectorAll('.frame-chart__bar')) as SVGRectElement[];

    expect(fixture.nativeElement.querySelector('frame-chart')?.getAttribute('data-type')).toBe('column-sparkline');
    expect(bars.length).toBe(5);
    expect(Number(bars[1].getAttribute('x'))).toBeGreaterThan(Number(bars[0].getAttribute('x')));
  });

  it('renders a zero baseline for mixed positive and negative column sparklines', () => {
    const fixture = TestBed.createComponent(MixedColumnSparklineChartHost);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.frame-chart__sparkline-zero-line')).not.toBeNull();
  });

  it('renders a bar sparkline with horizontal bars', () => {
    const fixture = TestBed.createComponent(BarSparklineChartHost);
    fixture.detectChanges();

    const bars = Array.from(fixture.nativeElement.querySelectorAll('.frame-chart__bar')) as SVGRectElement[];

    expect(fixture.nativeElement.querySelector('frame-chart')?.getAttribute('data-type')).toBe('bar-sparkline');
    expect(bars.length).toBe(3);
    expect(Number(bars[0].getAttribute('width'))).toBeGreaterThan(Number(bars[0].getAttribute('height')));
    expect(Number(bars[1].getAttribute('y'))).toBeGreaterThan(Number(bars[0].getAttribute('y')));
  });
});
