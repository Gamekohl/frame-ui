import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { HeatmapChartHost, HeatmapEmptyHost } from './chart-test-hosts';
import { FrChart, FrChartClickEvent } from '../chart';

describe('FrChart heatmap chart', () => {
  it('renders matrix heatmap cells, column labels, row labels, and an intensity legend', () => {
    const fixture = TestBed.createComponent(HeatmapChartHost);
    fixture.detectChanges();

    const host = fixture.nativeElement.querySelector('frame-chart') as HTMLElement;
    const cells = fixture.nativeElement.querySelectorAll('.frame-chart__heatmap-cell');
    const columnLabels = fixture.nativeElement.querySelector('.frame-chart__heatmap-columns') as SVGElement;
    const rowLabels = fixture.nativeElement.querySelector('.frame-chart__heatmap-rows') as SVGElement;
    const legend = fixture.nativeElement.querySelector('.frame-chart__heatmap-legend') as HTMLElement;

    expect(host.getAttribute('data-type')).toBe('heatmap');
    expect(cells.length).toBe(4);
    expect(cells[0].getAttribute('aria-label')).toContain('Mon / 09:00');
    expect(columnLabels.textContent).toContain('12:00');
    expect(rowLabels.textContent).toContain('Tue');
    expect(legend.textContent).toContain('Less');
    expect(legend.textContent).toContain('More');
  });

  it('renders an empty state without heatmap data', () => {
    const fixture = TestBed.createComponent(HeatmapEmptyHost);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('.frame-chart__heatmap-cell').length).toBe(0);
    expect(fixture.nativeElement.querySelector('.frame-chart__empty')?.textContent).toContain('No chart data');
  });

  it('emits chartClick when a heatmap cell is clicked', () => {
    const fixture = TestBed.createComponent(HeatmapChartHost);
    fixture.detectChanges();

    const chart = fixture.debugElement.query(By.directive(FrChart)).componentInstance as FrChart;
    const svg = fixture.nativeElement.querySelector('.frame-chart__surface') as SVGSVGElement;
    const firstCell = fixture.nativeElement.querySelector('.frame-chart__heatmap-cell') as SVGRectElement;
    const emitted: FrChartClickEvent[] = [];

    chart.chartClick.subscribe((event) => emitted.push(event));
    svg.getBoundingClientRect = () =>
      ({
        bottom: 320,
        height: 320,
        left: 0,
        right: 640,
        top: 0,
        width: 640,
        x: 0,
        y: 0,
        toJSON: () => ({}),
      }) as DOMRect;

    const x = Number(firstCell.getAttribute('x')) + Number(firstCell.getAttribute('width')) / 2;
    const y = Number(firstCell.getAttribute('y')) + Number(firstCell.getAttribute('height')) / 2;

    svg.dispatchEvent(
      new MouseEvent('pointerup', {
        bubbles: true,
        clientX: x,
        clientY: y,
      }),
    );
    fixture.detectChanges();

    expect(emitted.length).toBe(1);
    expect(emitted[0].type).toBe('heatmap');
    expect(emitted[0].label).toContain('Mon / 09:00');
    expect(emitted[0].values[0].label).toBe('Requests');
    expect(emitted[0].values[0].value).toBe(12);
  });
});
