import { TestBed } from '@angular/core/testing';

import { CalendarHeatmapChartHost, CalendarHeatmapEmptyHost } from './chart-test-hosts';

describe('FrChart calendar heatmap chart', () => {
  it('renders calendar cells, month labels, day labels, and an intensity legend', () => {
    const fixture = TestBed.createComponent(CalendarHeatmapChartHost);
    fixture.detectChanges();

    const host = fixture.nativeElement.querySelector('frame-chart') as HTMLElement;
    const cells = fixture.nativeElement.querySelectorAll('.frame-chart__heatmap-cell');
    const dayLabels = fixture.nativeElement.querySelector('.frame-chart__heatmap-rows') as SVGElement;
    const legend = fixture.nativeElement.querySelector('.frame-chart__heatmap-legend') as HTMLElement;

    expect(host.getAttribute('data-type')).toBe('calendar-heatmap');
    expect(cells.length).toBe(7);
    expect(cells[1].getAttribute('aria-label')).toContain('Jun');
    expect(dayLabels.textContent).toContain('Mon');
    expect(legend.textContent).toContain('Less');
    expect(legend.textContent).toContain('More');
  });

  it('renders an empty state without date data', () => {
    const fixture = TestBed.createComponent(CalendarHeatmapEmptyHost);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('.frame-chart__heatmap-cell').length).toBe(0);
    expect(fixture.nativeElement.querySelector('.frame-chart__empty')?.textContent).toContain('No chart data');
  });
});
