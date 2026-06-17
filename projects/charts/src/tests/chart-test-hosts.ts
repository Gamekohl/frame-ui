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
      type="bar"
      barLayout="stacked"
      xKey="month"
      aria-label="Stacked incidents"
      [data]="data"
      [series]="series"
    />
  `,
})
export class StackedBarChartHost {
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
      barOrientation="horizontal"
      xKey="service"
      aria-label="Service volume"
      [data]="data"
      [series]="series"
    />
  `,
})
export class HorizontalBarChartHost {
  readonly data = [
    { service: 'API', requests: 320, errors: 12 },
    { service: 'Worker', requests: 220, errors: 18 },
    { service: 'Queue', requests: 160, errors: 6 },
  ];
  readonly series: FrChartSeries[] = [
    { key: 'requests', label: 'Requests' },
    { key: 'errors', label: 'Errors' },
  ];
}

@Component({
  imports: [FrChart],
  template: `
    <frame-chart
      type="composed"
      xKey="month"
      aria-label="Revenue composition"
      legendToggle
      [data]="data"
      [series]="series"
    />
  `,
})
export class ComposedChartHost {
  readonly data = [
    { month: 'Jan', revenue: 42, forecast: 48, conversion: 18 },
    { month: 'Feb', revenue: 55, forecast: 58, conversion: 21 },
    { month: 'Mar', revenue: 49, forecast: 62, conversion: 24 },
  ];
  readonly series: FrChartSeries[] = [
    { key: 'revenue', label: 'Revenue', type: 'bar' },
    { key: 'forecast', label: 'Forecast', type: 'area' },
    { key: 'conversion', label: 'Conversion', type: 'line' },
  ];
}

@Component({
  imports: [FrChart],
  template: `
    <frame-chart
      type="donut"
      xKey="channel"
      aria-label="Acquisition mix"
      [data]="data"
      [series]="series"
    />
  `,
})
export class DonutChartHost {
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
      type="donut"
      xKey="reason"
      aria-label="Zero values"
      [data]="data"
      [series]="series"
    />
  `,
})
export class DonutChartZeroValuesHost {
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

@Component({
  imports: [FrChart],
  template: `
    <frame-chart
      type="area-sparkline"
      xKey="day"
      aria-label="Weekly visitors"
      [data]="data"
      [series]="series"
    />
  `,
})
export class AreaSparklineChartHost {
  readonly data = [
    { day: 'Mon', value: 18 },
    { day: 'Tue', value: 22 },
    { day: 'Wed', value: 19 },
    { day: 'Thu', value: 28 },
    { day: 'Fri', value: 31 },
  ];
  readonly series: FrChartSeries[] = [{ key: 'value', label: 'Visitors' }];
}

@Component({
  imports: [FrChart],
  template: `
    <frame-chart
      type="area-sparkline"
      curve="sharp"
      xKey="day"
      aria-label="Weekly sharp visitors"
      [data]="data"
      [series]="series"
    />
  `,
})
export class SharpAreaSparklineChartHost {
  readonly data = [
    { day: 'Mon', value: 18 },
    { day: 'Tue', value: 22 },
    { day: 'Wed', value: 19 },
    { day: 'Thu', value: 28 },
    { day: 'Fri', value: 31 },
  ];
  readonly series: FrChartSeries[] = [{ key: 'value', label: 'Visitors' }];
}

@Component({
  imports: [FrChart],
  template: `
    <frame-chart
      type="area-sparkline"
      curve="sharp"
      xKey="day"
      aria-label="Mixed visitors"
      [data]="data"
      [series]="series"
    />
  `,
})
export class MixedAreaSparklineChartHost {
  readonly data = [
    { day: 'Mon', value: 18 },
    { day: 'Tue', value: -10 },
    { day: 'Wed', value: 24 },
  ];
  readonly series: FrChartSeries[] = [{ key: 'value', label: 'Visitors' }];
}

@Component({
  imports: [FrChart],
  template: `
    <frame-chart
      type="column-sparkline"
      xKey="day"
      aria-label="Mixed signups"
      [data]="data"
      [series]="series"
    />
  `,
})
export class MixedColumnSparklineChartHost {
  readonly data = [
    { day: 'Mon', value: 18 },
    { day: 'Tue', value: -10 },
    { day: 'Wed', value: 24 },
  ];
  readonly series: FrChartSeries[] = [{ key: 'value', label: 'Signups' }];
}

@Component({
  imports: [FrChart],
  template: `
    <frame-chart
      type="line-sparkline"
      xKey="day"
      aria-label="Weekly latency"
      [data]="data"
      [series]="series"
    />
  `,
})
export class LineSparklineChartHost {
  readonly data = [
    { day: 'Mon', value: 142 },
    { day: 'Tue', value: 138 },
    { day: 'Wed', value: 151 },
    { day: 'Thu', value: 133 },
    { day: 'Fri', value: 129 },
  ];
  readonly series: FrChartSeries[] = [{ key: 'value', label: 'Latency' }];
}

@Component({
  imports: [FrChart],
  template: `
    <frame-chart
      type="column-sparkline"
      xKey="day"
      aria-label="Weekly signups"
      [data]="data"
      [series]="series"
    />
  `,
})
export class ColumnSparklineChartHost {
  readonly data = [
    { day: 'Mon', value: 12 },
    { day: 'Tue', value: 18 },
    { day: 'Wed', value: 14 },
    { day: 'Thu', value: 24 },
    { day: 'Fri', value: 20 },
  ];
  readonly series: FrChartSeries[] = [{ key: 'value', label: 'Signups' }];
}

@Component({
  imports: [FrChart],
  template: `
    <frame-chart
      type="bar-sparkline"
      xKey="team"
      aria-label="Team queue"
      [data]="data"
      [series]="series"
    />
  `,
})
export class BarSparklineChartHost {
  readonly data = [
    { team: 'API', value: 12 },
    { team: 'Jobs', value: 18 },
    { team: 'UI', value: 8 },
  ];
  readonly series: FrChartSeries[] = [{ key: 'value', label: 'Queued' }];
}
