import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { FrChart, FrChartSeries, FrChartType } from '../chart';

const emptyCartesianTypes: readonly FrChartType[] = [
  'area',
  'area-sparkline',
  'bar',
  'bar-sparkline',
  'column-sparkline',
  'composed',
  'line',
  'line-sparkline',
];

@Component({
  imports: [FrChart],
  template: `
    <frame-chart
      [type]="type()"
      xKey="label"
      aria-label="Empty chart"
      [data]="data()"
      [series]="series()"
    />
  `,
})
class EmptyChartHost {
  readonly type = signal<FrChartType>('line');
  readonly data = signal<readonly Record<string, number | string>[]>([]);
  readonly series = signal<readonly FrChartSeries[]>([
    { key: 'value', label: 'Value' },
    { key: 'trend', label: 'Trend', type: 'line' },
  ]);
}

@Component({
  imports: [FrChart],
  template: `
    <frame-chart
      [type]="type()"
      xKey="label"
      aria-label="Zero chart"
      [data]="data"
      [series]="series"
    />
  `,
})
class ZeroCartesianChartHost {
  readonly type = signal<FrChartType>('line');
  readonly data = [
    { label: 'A', value: 0 },
    { label: 'B', value: 0 },
  ];
  readonly series: FrChartSeries[] = [{ key: 'value', label: 'Value' }];
}

describe('FrChart empty states', () => {
  it('renders an empty state for cartesian chart types without data', () => {
    for (const type of emptyCartesianTypes) {
      const fixture = TestBed.createComponent(EmptyChartHost);

      fixture.componentInstance.type.set(type);
      fixture.detectChanges();

      const empty = fixture.nativeElement.querySelector('.frame-chart__empty') as HTMLElement | null;

      expect(empty?.textContent).toContain('No chart data');

      fixture.destroy();
    }
  });

  it('does not treat cartesian zero values as empty data', () => {
    for (const type of ['area', 'bar', 'line'] as const) {
      const fixture = TestBed.createComponent(ZeroCartesianChartHost);

      fixture.componentInstance.type.set(type);
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('.frame-chart__empty')).toBeNull();

      fixture.destroy();
    }
  });
});
