import { Component } from '@angular/core';

import { FrChart, FrChartSeries } from '../chart';

@Component({
  imports: [FrChart],
  template: `
    <frame-chart
      type="area"
      xKey="month"
      aria-label="Visitors"
      [data]="data"
      [series]="series"
    />
  `,
})
export class AreaChartHost {
  readonly data = [
    { month: 'Jan', desktop: 186, mobile: 80 },
    { month: 'Feb', desktop: 305, mobile: 200 },
    { month: 'Mar', desktop: 237, mobile: 120 },
  ];
  readonly series: FrChartSeries[] = [
    { key: 'desktop', label: 'Desktop' },
    { key: 'mobile', label: 'Mobile' },
  ];
}

@Component({
  imports: [FrChart],
  template: `
    <frame-chart
      type="bar"
      xKey="month"
      aria-label="Incidents"
      [data]="data"
      [series]="series"
    />
  `,
})
export class BarChartHost {
  readonly data = [
    { month: 'Jan', critical: 2, warning: 7 },
    { month: 'Feb', critical: 1, warning: 6 },
    { month: 'Mar', critical: 3, warning: 8 },
  ];
  readonly series: FrChartSeries[] = [
    { key: 'critical', label: 'Critical' },
    { key: 'warning', label: 'Warning' },
  ];
}

@Component({
  imports: [FrChart],
  template: `
    <frame-chart
      type="bar"
      xKey="service"
      aria-label="Long labels"
      [data]="data"
      [series]="series"
    />
  `,
})
export class BarChartLongLabelsHost {
  readonly data = [
    { service: 'checkout-orchestration-worker', latency: 242 },
    { service: 'customer-profile-enrichment-api', latency: 186 },
  ];
  readonly series: FrChartSeries[] = [{ key: 'latency', label: 'Latency' }];
}

@Component({
  imports: [FrChart],
  template: `
    <frame-chart
      type="line"
      xKey="day"
      aria-label="Uptime"
      [data]="data"
      [series]="series"
      [valueFormatter]="valueFormatter"
    />
  `,
})
export class LineChartNarrowDomainHost {
  readonly data = [
    { day: 'Mon', uptime: 99.91 },
    { day: 'Tue', uptime: 99.94 },
    { day: 'Wed', uptime: 99.9 },
    { day: 'Thu', uptime: 99.97 },
    { day: 'Fri', uptime: 99.96 },
    { day: 'Sat', uptime: 99.98 },
    { day: 'Sun', uptime: 99.95 },
  ];
  readonly series: FrChartSeries[] = [{ key: 'uptime', label: 'Uptime' }];
  readonly valueFormatter = (value: number) => `${value.toFixed(2)}%`;
}

@Component({
  imports: [FrChart],
  template: `
    <frame-chart
      type="pie"
      xKey="channel"
      aria-label="Acquisition"
      [data]="data"
      [series]="series"
    />
  `,
})
export class PieChartHost {
  readonly data = [
    { channel: 'Organic', visitors: 420 },
    { channel: 'Direct', visitors: 260 },
    { channel: 'Referral', visitors: 190 },
  ];
  readonly series: FrChartSeries[] = [{ key: 'visitors', label: 'Visitors' }];
}

@Component({
  imports: [FrChart],
  template: `
    <frame-chart
      type="pie"
      xKey="channel"
      aria-label="Acquisition"
      [data]="data"
      [series]="series"
    />
  `,
})
export class PieChartCustomColorsHost {
  readonly data = [
    { channel: 'Organic', visitors: 420, color: '#15803d' },
    { channel: 'Direct', visitors: 260, color: 'var(--custom-direct-color)' },
    { channel: 'Referral', visitors: 190 },
    { channel: 'Paid', visitors: 150 },
    { channel: 'Social', visitors: 110 },
    { channel: 'Partner', visitors: 80 },
  ];
  readonly series: FrChartSeries[] = [{ key: 'visitors', label: 'Visitors' }];
}

@Component({
  imports: [FrChart],
  template: `
    <frame-chart
      type="pie"
      xKey="reason"
      aria-label="Zero values"
      [data]="data"
      [series]="series"
    />
  `,
})
export class PieChartZeroValuesHost {
  readonly data = [
    { reason: 'No traffic', count: 0 },
    { reason: 'No referrals', count: 0 },
  ];
  readonly series: FrChartSeries[] = [{ key: 'count', label: 'Count' }];
}

@Component({
  imports: [FrChart],
  template: `
    <frame-chart
      type="radial"
      xKey="metric"
      aria-label="Readiness"
      [data]="data"
      [series]="series"
    />
  `,
})
export class RadialChartHost {
  readonly data = [
    { metric: 'Preflight', value: 100, max: 100 },
    { metric: 'Smoke tests', value: 78, max: 100 },
    { metric: 'Approvals', value: 66, max: 100 },
  ];
  readonly series: FrChartSeries[] = [{ key: 'value', label: 'Progress' }];
}

@Component({
  imports: [FrChart],
  template: `
    <frame-chart
      type="radial"
      xKey="metric"
      aria-label="Zero readiness"
      [data]="data"
      [series]="series"
    />
  `,
})
export class RadialChartZeroValuesHost {
  readonly data = [
    { metric: 'Preflight', value: 0, max: 100 },
    { metric: 'Smoke tests', value: 0, max: 100 },
  ];
  readonly series: FrChartSeries[] = [{ key: 'value', label: 'Progress' }];
}
