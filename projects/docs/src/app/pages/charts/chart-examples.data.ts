import {
  FrChartBarLayout,
  FrChartBarOrientation,
  FrChartCurve,
  FrChartDatum,
  FrChartSeries,
  FrChartType,
} from '@frame-ui-ng/charts';

import { DocsCodeBlock, DocsTokenInspectorTarget } from '../docs/shared/models/component-doc.model';

export type ChartCategory = {
  readonly id: ChartCategoryId | 'radar' | 'tooltip';
  readonly label: string;
  readonly disabled?: boolean;
};

export type ChartCategoryId = FrChartType | 'sparkline';

export type ChartExample = {
  readonly id: string;
  readonly category: ChartCategoryId;
  readonly title: string;
  readonly description: string;
  readonly featured?: boolean;
  readonly type: FrChartType;
  readonly barLayout?: FrChartBarLayout;
  readonly barOrientation?: FrChartBarOrientation;
  readonly curve?: FrChartCurve;
  readonly legendToggle?: boolean;
  readonly xKey?: string;
  readonly yKey?: string;
  readonly data: readonly FrChartDatum[];
  readonly series: readonly FrChartSeries[];
  readonly code: readonly DocsCodeBlock[];
  readonly barLabel?: string;
  readonly valueFormatter?: (value: number) => string;
};

export const chartCategories: readonly ChartCategory[] = [
  { id: 'area', label: 'Area Charts' },
  { id: 'bar', label: 'Bar Charts' },
  { id: 'composed', label: 'Composed Charts' },
  { id: 'line', label: 'Line Charts' },
  { id: 'pie', label: 'Pie Charts' },
  { id: 'donut', label: 'Donut Charts' },
  { id: 'sparkline', label: 'Sparklines' },
  { id: 'heatmap', label: 'Heatmap Charts' },
  { id: 'radar', label: 'Radar Charts', disabled: true },
  { id: 'radial', label: 'Radial Charts' },
];

const trafficData = [
  { month: 'Jan', desktop: 186, mobile: 80 },
  { month: 'Feb', desktop: 305, mobile: 200 },
  { month: 'Mar', desktop: 237, mobile: 120 },
  { month: 'Apr', desktop: 273, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'Jun', desktop: 314, mobile: 260 },
];

const shortTrafficData = [
  { month: 'Jan', desktop: 120 },
  { month: 'Feb', desktop: 215 },
  { month: 'Mar', desktop: 298 },
  { month: 'Apr', desktop: 244 },
  { month: 'May', desktop: 92 },
  { month: 'Jun', desktop: 188 },
  { month: 'Jul', desktop: 211 },
];

const revenueData = [
  { month: 'Jan', revenue: 42, pipeline: 28 },
  { month: 'Feb', revenue: 55, pipeline: 34 },
  { month: 'Mar', revenue: 49, pipeline: 39 },
  { month: 'Apr', revenue: 73, pipeline: 48 },
  { month: 'May', revenue: 66, pipeline: 55 },
  { month: 'Jun', revenue: 88, pipeline: 61 },
];

const incidentData = [
  { month: 'Jan', critical: 2, warning: 7 },
  { month: 'Feb', critical: 1, warning: 6 },
  { month: 'Mar', critical: 3, warning: 8 },
  { month: 'Apr', critical: 1, warning: 5 },
  { month: 'May', critical: 0, warning: 4 },
  { month: 'Jun', critical: 1, warning: 3 },
];

const acquisitionData = [
  { channel: 'Organic', visitors: 420, color: 'var(--frame-chart-3)' },
  { channel: 'Direct', visitors: 260, color: 'var(--frame-chart-1)' },
  { channel: 'Referral', visitors: 190 },
  { channel: 'Paid search', visitors: 150 },
  { channel: 'Social', visitors: 110 },
  { channel: 'Partner', visitors: 84 },
  { channel: 'Email', visitors: 72 },
];

const runtimeData = [
  { runtime: 'Node.js', services: 18 },
  { runtime: 'Go', services: 11 },
  { runtime: 'Python', services: 8 },
  { runtime: 'Rust', services: 5 },
  { runtime: 'Java', services: 4 },
  { runtime: '.NET', services: 3 },
];

const performanceData = [
  { month: 'Jan', revenue: 42, forecast: 48, conversion: 18 },
  { month: 'Feb', revenue: 55, forecast: 58, conversion: 21 },
  { month: 'Mar', revenue: 49, forecast: 62, conversion: 24 },
  { month: 'Apr', revenue: 73, forecast: 68, conversion: 27 },
  { month: 'May', revenue: 66, forecast: 72, conversion: 25 },
  { month: 'Jun', revenue: 88, forecast: 80, conversion: 31 },
];

const supportLoadDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] as const;
const supportLoadHours = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00'] as const;
const supportLoadData = supportLoadDays.flatMap((day, dayIndex) =>
  supportLoadHours.map((hour, hourIndex) => ({
    day,
    hour,
    tickets: 4 + ((dayIndex + 2) * (hourIndex + 3) + dayIndex * 5) % 31,
  })),
);

const deploymentActivityData = Array.from({ length: 84 }, (_, index) => {
  const date = new Date(Date.UTC(2026, 0, index + 1));
  const weekday = date.getUTCDay();
  const deploys = weekday === 0 || weekday === 6 ? 0 : ((index * 7 + weekday * 3) % 18) + 1;

  return {
    date: date.toISOString().slice(0, 10),
    deploys,
  };
});

const sparklineData = [
  { day: '1', value: 24 },
  { day: '2', value: 20 },
  { day: '3', value: 34 },
  { day: '4', value: 12 },
  { day: '5', value: 4 },
  { day: '6', value: 36 },
  { day: '7', value: 8 },
  { day: '8', value: 5 },
  { day: '9', value: 18 },
  { day: '10', value: 14 },
  { day: '11', value: -10 },
  { day: '12', value: 10 },
];

const sparklineBarData = [
  { team: 'Progress', value: 90 },
];

const serviceVolumeData = [
  { service: 'API', requests: 320, errors: 12 },
  { service: 'Worker', requests: 220, errors: 18 },
  { service: 'Queue', requests: 160, errors: 6 },
  { service: 'Scheduler', requests: 120, errors: 4 },
];

const deploymentData = [
  { status: 'Healthy', services: 42, color: 'var(--frame-chart-3)' },
  { status: 'Degraded', services: 9, color: 'var(--frame-chart-4)' },
  { status: 'Investigating', services: 5, color: 'var(--frame-chart-5)' },
  { status: 'Paused', services: 7 },
];

const readinessData = [
  { check: 'Preflight', value: 100, max: 100 },
  { check: 'Smoke tests', value: 78, max: 100 },
  { check: 'Error budget', value: 92, max: 100 },
  { check: 'Approvals', value: 66, max: 100 },
];

const capacityData = [
  { team: 'Core Platform', value: 184, max: 220, color: 'var(--frame-chart-1)' },
  { team: 'Identity', value: 96, max: 120, color: 'var(--frame-chart-2)' },
  { team: 'Messaging', value: 142, max: 180, color: 'var(--frame-chart-3)' },
  { team: 'Payments', value: 121, max: 160, color: 'var(--frame-chart-4)' },
  { team: 'Search', value: 88, max: 140, color: 'var(--frame-chart-5)' },
];

const zeroRadialData = [
  { metric: 'Rollout', value: 0, max: 100 },
  { metric: 'Verification', value: 0, max: 100 },
];

const importsCode = `import { FrChartModule } from '@frame-ui-ng/charts';`;

const trafficTs = `trafficData = [
  { month: 'Jan', desktop: 186, mobile: 80 },
  { month: 'Feb', desktop: 305, mobile: 200 },
  { month: 'Mar', desktop: 237, mobile: 120 },
  { month: 'Apr', desktop: 273, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'Jun', desktop: 314, mobile: 260 },
];

trafficSeries = [
  { key: 'desktop', label: 'Desktop' },
  { key: 'mobile', label: 'Mobile' },
];`;

const shortAreaTs = `visitors = [
  { month: 'Jan', desktop: 120 },
  { month: 'Feb', desktop: 215 },
  { month: 'Mar', desktop: 298 },
  { month: 'Apr', desktop: 244 },
  { month: 'May', desktop: 92 },
  { month: 'Jun', desktop: 188 },
  { month: 'Jul', desktop: 211 },
];`;

const sparklineTs = `sparklineData = [
  { day: '1', value: 24 },
  { day: '2', value: 20 },
  { day: '3', value: 34 },
  { day: '4', value: 12 },
  { day: '5', value: 4 },
  { day: '6', value: 36 },
  { day: '7', value: 8 },
  { day: '8', value: 5 },
  { day: '9', value: 18 },
  { day: '10', value: 14 },
  { day: '11', value: -10 },
  { day: '12', value: 10 },
];

sparklineSeries = [{ key: 'value', label: 'Value' }];`;

const deploymentActivityTs = `deploymentActivityData = Array.from({ length: 84 }, (_, index) => {
  const date = new Date(Date.UTC(2026, 0, index + 1));
  const weekday = date.getUTCDay();
  const deploys = weekday === 0 || weekday === 6 ? 0 : ((index * 7 + weekday * 3) % 18) + 1;

  return {
    date: date.toISOString().slice(0, 10),
    deploys,
  };
});

deploymentSeries = [{ key: 'deploys', label: 'Deploys' }];`;

const supportLoadTs = `supportLoadDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
supportLoadHours = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00'];

supportLoadData = supportLoadDays.flatMap((day, dayIndex) =>
  supportLoadHours.map((hour, hourIndex) => ({
    day,
    hour,
    tickets: 4 + ((dayIndex + 2) * (hourIndex + 3) + dayIndex * 5) % 31,
  })),
);

supportLoadSeries = [{ key: 'tickets', label: 'Tickets' }];`;

export const chartTokens = `[frChart],
frame-chart {
  --frame-chart-height: 20rem;
  /* Seed palette. Additional chart colors are generated from these tokens. */
  --frame-chart-1: var(--frame-primary);
  --frame-chart-2: color-mix(in srgb, var(--frame-primary) 58%, var(--frame-foreground));
  --frame-chart-3: color-mix(in srgb, var(--frame-success, #16a34a) 82%, var(--frame-foreground));
  --frame-chart-4: color-mix(in srgb, var(--frame-warning, #f59e0b) 82%, var(--frame-foreground));
  --frame-chart-5: color-mix(in srgb, var(--frame-destructive, #dc2626) 82%, var(--frame-foreground));
  --frame-chart-grid-color: color-mix(in srgb, var(--frame-border) 78%, transparent);
  --frame-chart-axis-color: var(--frame-muted-foreground);
  --frame-chart-tooltip-bg: var(--frame-popover, var(--frame-surface));
  --frame-chart-tooltip-color: var(--frame-popover-foreground, var(--frame-foreground));
  --frame-chart-tooltip-border: var(--frame-border);
  --frame-chart-tooltip-offset-x: 0.875rem;
  --frame-chart-tooltip-offset-y: 1rem;
  --frame-chart-tooltip-shadow: var(--frame-shadow-lg, 0 12px 30px rgb(0 0 0 / 0.12));
  --frame-chart-tooltip-motion-duration: 140ms;
  --frame-chart-tooltip-motion-easing: cubic-bezier(0.16, 1, 0.3, 1);
  --frame-chart-tooltip-motion-distance: 0.2rem;
  --frame-chart-tooltip-motion-scale: 0.98;
  --frame-chart-heatmap-empty-bg: color-mix(in srgb, var(--frame-muted) 72%, transparent);
  --frame-chart-heatmap-border: color-mix(in srgb, var(--frame-border) 72%, transparent);
  --frame-chart-heatmap-radius: 0.35rem;
  --frame-chart-heatmap-label-color: var(--frame-muted-foreground);
  --frame-chart-heatmap-active-stroke: var(--frame-foreground);
}`;

export const chartInspectorTargets: DocsTokenInspectorTarget[] = [
  {
    id: 'chart-root',
    label: 'Chart root',
    selector: 'frame-chart',
    description: 'The root chart host defines the chart height, seed palette, tooltip surface, and layout contract.',
    tokens: [
      '--frame-chart-height',
      '--frame-chart-1',
      '--frame-chart-2',
      '--frame-chart-3',
      '--frame-chart-4',
      '--frame-chart-5',
      '--frame-chart-tooltip-offset-x',
      '--frame-chart-tooltip-offset-y',
    ],
  },
  {
    id: 'chart-surface',
    label: 'SVG surface',
    selector: '.frame-chart__surface',
    description: 'The SVG surface reads the chart height token and provides the drawing canvas.',
    tokens: ['--frame-chart-height'],
  },
  {
    id: 'chart-grid',
    label: 'Grid',
    selector: '.frame-chart__grid',
    description: 'Grid lines use the muted chart grid token to sit behind the data marks.',
    tokens: ['--frame-chart-grid-color'],
  },
  {
    id: 'chart-axis',
    label: 'Axis labels',
    selector: '.frame-chart__axis',
    description: 'Axis text uses the chart axis color token for low-emphasis labels.',
    tokens: ['--frame-chart-axis-color'],
  },
  {
    id: 'chart-line',
    label: 'Line marks',
    selector: '.frame-chart__line',
    description: 'Line and area charts consume the chart color series tokens.',
    tokens: ['--frame-chart-1', '--frame-chart-2', '--frame-chart-3', '--frame-chart-4', '--frame-chart-5'],
  },
  {
    id: 'chart-area',
    label: 'Area fill',
    selector: '.frame-chart__area',
    description: 'Area fills reuse the active chart color while lowering opacity.',
    tokens: ['--frame-chart-1', '--frame-chart-2', '--frame-chart-3', '--frame-chart-4', '--frame-chart-5'],
  },
  {
    id: 'chart-bar',
    label: 'Bars',
    selector: '.frame-chart__bar',
    description: 'Bar charts map each series to the chart color sequence.',
    tokens: ['--frame-chart-1', '--frame-chart-2', '--frame-chart-3', '--frame-chart-4', '--frame-chart-5'],
  },
  {
    id: 'chart-heatmap',
    label: 'Heatmap cells',
    selector: '.frame-chart__heatmap-cell',
    description: 'Heatmap cells blend the active chart color with the empty cell token based on value intensity.',
    tokens: [
      '--frame-chart-1',
      '--frame-chart-heatmap-empty-bg',
      '--frame-chart-heatmap-border',
      '--frame-chart-heatmap-radius',
      '--frame-chart-heatmap-active-stroke',
    ],
  },
  {
    id: 'chart-pie',
    label: 'Pie and donut slices',
    selector: '.frame-chart__pie-slice',
    description:
      'Pie and donut charts read optional datum colors first, then use the seed palette and generated colors for the remaining slices.',
    tokens: ['--frame-chart-1', '--frame-chart-2', '--frame-chart-3', '--frame-chart-4', '--frame-chart-5'],
  },
  {
    id: 'chart-radial',
    label: 'Radial segments',
    selector: '.frame-chart__radial-segment',
    description:
      'Radial charts use the same chart palette and optional datum colors while muted tracks inherit the grid token.',
    tokens: [
      '--frame-chart-1',
      '--frame-chart-2',
      '--frame-chart-3',
      '--frame-chart-4',
      '--frame-chart-5',
      '--frame-chart-grid-color',
    ],
  },
  {
    id: 'chart-legend',
    label: 'Legend',
    selector: '.frame-chart__legend',
    description: 'The legend inherits muted foreground styling while its markers use resolved chart colors.',
    tokens: ['--frame-chart-1', '--frame-chart-2', '--frame-chart-3', '--frame-chart-4', '--frame-chart-5'],
  },
  {
    id: 'chart-tooltip',
    label: 'Tooltip',
    selector: '.frame-chart__tooltip',
    description: 'The tooltip uses offset tokens to avoid sitting directly below the cursor and shares dropdown-style enter motion.',
    tokens: [
      '--frame-chart-tooltip-bg',
      '--frame-chart-tooltip-color',
      '--frame-chart-tooltip-border',
      '--frame-chart-tooltip-offset-x',
      '--frame-chart-tooltip-offset-y',
      '--frame-chart-tooltip-shadow',
      '--frame-chart-tooltip-motion-duration',
      '--frame-chart-tooltip-motion-easing',
      '--frame-chart-tooltip-motion-distance',
      '--frame-chart-tooltip-motion-scale',
    ],
  },
];

export const chartExamples: readonly ChartExample[] = [
  {
    id: 'area-interactive',
    category: 'area',
    title: 'Area Chart - Interactive',
    description: 'Showing total visitors for the last 6 months',
    featured: true,
    type: 'area',
    data: trafficData,
    series: [
      { key: 'desktop', label: 'Desktop' },
      { key: 'mobile', label: 'Mobile' },
    ],
    code: [
      { language: 'ts', code: `${importsCode}\n\n${trafficTs}` },
      {
        language: 'html',
        code: `<frame-chart
  aria-label="Traffic by device"
  type="area"
  xKey="month"
  [data]="trafficData"
  [series]="trafficSeries"
/>`,
      },
    ],
  },
  {
    id: 'area-default',
    category: 'area',
    title: 'Area Chart',
    description: 'Showing total visitors for the last 7 months',
    type: 'area',
    data: shortTrafficData,
    series: [{ key: 'desktop', label: 'Desktop' }],
    code: [
      { language: 'ts', code: `${importsCode}\n\n${shortAreaTs}` },
      { language: 'html', code: `<frame-chart type="area" xKey="month" [data]="visitors" />` },
    ],
  },
  {
    id: 'area-linear',
    category: 'area',
    title: 'Area Chart - Linear',
    description: 'Showing total visitors with linear interpolation',
    type: 'area',
    curve: 'linear',
    data: shortTrafficData,
    series: [{ key: 'desktop', label: 'Desktop' }],
    code: [
      { language: 'ts', code: `${importsCode}\n\n${shortAreaTs}` },
      { language: 'html', code: `<frame-chart type="area" curve="linear" xKey="month" [data]="visitors" />` },
    ],
  },
  {
    id: 'area-step',
    category: 'area',
    title: 'Area Chart - Step',
    description: 'Showing total visitors with stepped segments',
    type: 'area',
    curve: 'step',
    data: shortTrafficData,
    series: [{ key: 'desktop', label: 'Desktop' }],
    code: [
      { language: 'ts', code: `${importsCode}\n\n${shortAreaTs}` },
      { language: 'html', code: `<frame-chart type="area" curve="step" xKey="month" [data]="visitors" />` },
    ],
  },
  {
    id: 'bar-incidents',
    category: 'bar',
    title: 'Bar Chart - Grouped',
    description: 'Showing incidents by severity for the last 6 months',
    featured: true,
    type: 'bar',
    data: incidentData,
    series: [
      { key: 'critical', label: 'Critical' },
      { key: 'warning', label: 'Warning' },
    ],
    code: [
      { language: 'ts', code: `${importsCode}\n\nincidentData = ${JSON.stringify(incidentData, null, 2)};` },
      { language: 'html', code: `<frame-chart type="bar" xKey="month" [data]="incidentData" [series]="incidentSeries" />` },
    ],
  },
  {
    id: 'bar-revenue',
    category: 'bar',
    title: 'Bar Chart',
    description: 'Showing booked revenue and pipeline',
    type: 'bar',
    data: revenueData,
    series: [
      { key: 'revenue', label: 'Revenue' },
      { key: 'pipeline', label: 'Pipeline' },
    ],
    valueFormatter: (value) => `$${value.toFixed(0)}k`,
    code: [
      { language: 'ts', code: `${importsCode}\n\nrevenueData = ${JSON.stringify(revenueData, null, 2)};` },
      { language: 'html', code: `<frame-chart type="bar" xKey="month" [data]="revenueData" [valueFormatter]="currencyFormatter" />` },
    ],
  },
  {
    id: 'bar-stacked-incidents',
    category: 'bar',
    title: 'Bar Chart - Stacked',
    description: 'Showing total incidents while preserving severity contribution per month',
    type: 'bar',
    barLayout: 'stacked',
    data: incidentData,
    series: [
      { key: 'critical', label: 'Critical' },
      { key: 'warning', label: 'Warning' },
    ],
    code: [
      { language: 'ts', code: `${importsCode}\n\nincidentData = ${JSON.stringify(incidentData, null, 2)};` },
      {
        language: 'html',
        code: `<frame-chart
  type="bar"
  barLayout="stacked"
  xKey="month"
  [data]="incidentData"
  [series]="incidentSeries"
/>`,
      },
    ],
  },
  {
    id: 'bar-horizontal-services',
    category: 'bar',
    title: 'Bar Chart - Horizontal',
    description: 'Showing service volume where category labels benefit from more horizontal space',
    type: 'bar',
    barOrientation: 'horizontal',
    xKey: 'service',
    data: serviceVolumeData,
    series: [
      { key: 'requests', label: 'Requests' },
      { key: 'errors', label: 'Errors' },
    ],
    code: [
      { language: 'ts', code: `${importsCode}\n\nserviceVolumeData = ${JSON.stringify(serviceVolumeData, null, 2)};` },
      {
        language: 'html',
        code: `<frame-chart
  type="bar"
  barOrientation="horizontal"
  xKey="service"
  [data]="serviceVolumeData"
  [series]="serviceSeries"
/>`,
      },
    ],
  },
  {
    id: 'composed-performance',
    category: 'composed',
    title: 'Composed Chart - Performance',
    description: 'Combining revenue bars, forecast area, and conversion line in one shared timeline',
    featured: true,
    type: 'composed',
    legendToggle: true,
    data: performanceData,
    series: [
      { key: 'forecast', label: 'Forecast', type: 'area', color: 'var(--frame-chart-2)' },
      { key: 'revenue', label: 'Revenue', type: 'bar', color: 'var(--frame-chart-1)' },
      { key: 'conversion', label: 'Conversion', type: 'line', color: 'var(--frame-chart-3)' },
    ],
    code: [
      {
        language: 'ts',
        code: `${importsCode}\n\nperformanceData = ${JSON.stringify(performanceData, null, 2)};\n\nperformanceSeries = [\n  { key: 'forecast', label: 'Forecast', type: 'area' },\n  { key: 'revenue', label: 'Revenue', type: 'bar' },\n  { key: 'conversion', label: 'Conversion', type: 'line' },\n];`,
      },
      {
        language: 'html',
        code: `<frame-chart
  type="composed"
  xKey="month"
  legendToggle
  [data]="performanceData"
  [series]="performanceSeries"
/>`,
      },
    ],
  },
  {
    id: 'line-revenue',
    category: 'line',
    title: 'Line Chart - Multiple',
    description: 'Showing revenue and pipeline trend',
    featured: true,
    type: 'line',
    data: revenueData,
    series: [
      { key: 'revenue', label: 'Revenue' },
      { key: 'pipeline', label: 'Pipeline' },
    ],
    valueFormatter: (value) => `$${value.toFixed(0)}k`,
    code: [
      { language: 'ts', code: `${importsCode}\n\nrevenueData = ${JSON.stringify(revenueData, null, 2)};` },
      { language: 'html', code: `<frame-chart type="line" xKey="month" [data]="revenueData" [series]="revenueSeries" />` },
    ],
  },
  {
    id: 'line-linear',
    category: 'line',
    title: 'Line Chart - Linear',
    description: 'Showing a single trend with linear segments',
    type: 'line',
    curve: 'linear',
    data: shortTrafficData,
    series: [{ key: 'desktop', label: 'Desktop' }],
    code: [
      { language: 'ts', code: `${importsCode}\n\n${shortAreaTs}` },
      { language: 'html', code: `<frame-chart type="line" curve="linear" xKey="month" [data]="visitors" />` },
    ],
  },
  {
    id: 'pie-acquisition',
    category: 'pie',
    title: 'Pie Chart - Acquisition',
    description: 'Showing visitors by acquisition channel',
    featured: true,
    type: 'pie',
    xKey: 'channel',
    data: acquisitionData,
    series: [{ key: 'visitors', label: 'Visitors' }],
    code: [
      { language: 'ts', code: `${importsCode}\n\nacquisitionData = ${JSON.stringify(acquisitionData, null, 2)};` },
      { language: 'html', code: `<frame-chart type="pie" xKey="channel" [data]="acquisitionData" [series]="visitorSeries" />` },
    ],
  },
  {
    id: 'pie-runtime',
    category: 'pie',
    title: 'Pie Chart',
    description: 'Showing services by runtime',
    type: 'pie',
    xKey: 'runtime',
    data: runtimeData,
    series: [{ key: 'services', label: 'Services' }],
    code: [
      { language: 'ts', code: `${importsCode}\n\nruntimeData = ${JSON.stringify(runtimeData, null, 2)};` },
      { language: 'html', code: `<frame-chart type="pie" xKey="runtime" [data]="runtimeData" [series]="runtimeSeries" />` },
    ],
  },
  {
    id: 'donut-deployment',
    category: 'donut',
    title: 'Donut Chart - Deployment Health',
    description: 'Showing service health distribution with room for surrounding summary content',
    featured: true,
    type: 'donut',
    xKey: 'status',
    data: deploymentData,
    series: [{ key: 'services', label: 'Services' }],
    code: [
      { language: 'ts', code: `${importsCode}\n\ndeploymentData = ${JSON.stringify(deploymentData, null, 2)};` },
      { language: 'html', code: `<frame-chart type="donut" xKey="status" [data]="deploymentData" [series]="serviceSeries" />` },
    ],
  },
  {
    id: 'donut-runtime',
    category: 'donut',
    title: 'Donut Chart',
    description: 'Showing services by runtime with the same interaction model as pie charts',
    type: 'donut',
    xKey: 'runtime',
    data: runtimeData,
    series: [{ key: 'services', label: 'Services' }],
    code: [
      { language: 'ts', code: `${importsCode}\n\nruntimeData = ${JSON.stringify(runtimeData, null, 2)};` },
      { language: 'html', code: `<frame-chart type="donut" xKey="runtime" [data]="runtimeData" [series]="runtimeSeries" />` },
    ],
  },
  {
    id: 'sparkline-area-sharp',
    category: 'sparkline',
    title: 'Area Sparkline - Sharp',
    description: 'The same compact area treatment with crisp straight segments',
    type: 'area-sparkline',
    curve: 'sharp',
    xKey: 'day',
    data: sparklineData,
    series: [{ key: 'value', label: 'Visitors' }],
    code: [
      { language: 'ts', code: `${importsCode}\n\n${sparklineTs}` },
      {
        language: 'html',
        code: `<frame-chart
  type="area-sparkline"
  curve="sharp"
  xKey="day"
  aria-label="Weekly visitors"
  [data]="sparklineData"
  [series]="sparklineSeries"
/>`,
      },
    ],
  },
  {
    id: 'sparkline-line',
    category: 'sparkline',
    title: 'Line Sparkline',
    description: 'A low-noise trend line for metrics where shape matters more than scale',
    featured: true,
    type: 'line-sparkline',
    xKey: 'day',
    data: sparklineData,
    series: [{ key: 'value', label: 'Latency' }],
    code: [
      { language: 'ts', code: `${importsCode}\n\n${sparklineTs}` },
      {
        language: 'html',
        code: `<frame-chart
  type="line-sparkline"
  xKey="day"
  aria-label="Weekly latency"
  [data]="sparklineData"
  [series]="sparklineSeries"
/>`,
      },
    ],
  },
  {
    id: 'sparkline-area',
    category: 'sparkline',
    title: 'Area Sparkline - Smooth',
    description: 'A compact filled trend for dense dashboard cards and table cells',
    type: 'area-sparkline',
    curve: 'smooth',
    xKey: 'day',
    data: sparklineData,
    series: [{ key: 'value', label: 'Visitors' }],
    code: [
      { language: 'ts', code: `${importsCode}\n\n${sparklineTs}` },
      {
        language: 'html',
        code: `<frame-chart
  type="area-sparkline"
  curve="smooth"
  xKey="day"
  aria-label="Weekly visitors"
  [data]="sparklineData"
  [series]="sparklineSeries"
/>`,
      },
    ],
  },
  {
    id: 'sparkline-column',
    category: 'sparkline',
    title: 'Column Sparkline',
    description: 'Small vertical bars for quick volume comparison over time',
    type: 'column-sparkline',
    xKey: 'day',
    data: sparklineData,
    series: [{ key: 'value', label: 'Signups' }],
    code: [
      { language: 'ts', code: `${importsCode}\n\n${sparklineTs}` },
      {
        language: 'html',
        code: `<frame-chart
  type="column-sparkline"
  xKey="day"
  aria-label="Weekly signups"
  [data]="sparklineData"
  [series]="sparklineSeries"
/>`,
      },
    ],
  },
  {
    id: 'sparkline-bar',
    category: 'sparkline',
    title: 'Bar Sparkline',
    description: 'Horizontal mini bars for short ranked summaries in narrow layouts',
    type: 'bar-sparkline',
    xKey: 'team',
    data: sparklineBarData,
    series: [{ key: 'value', label: 'Queued' }],
    barLabel: '90%',
    code: [
      {
        language: 'ts',
        code: `${importsCode}\n\nsparklineBarData = ${JSON.stringify(sparklineBarData, null, 2)};\n\nsparklineSeries = [{ key: 'value', label: 'Queued' }];`,
      },
      {
        language: 'html',
        code: `<div class="sparkline-bar-label">
  <frame-chart
    type="bar-sparkline"
    xKey="team"
    aria-label="Queued work by team"
    [data]="sparklineBarData"
    [series]="sparklineSeries"
  />
  <span>90%</span>
</div>`,
      },
      {
        language: 'css',
        code: `.sparkline-bar-label {
  position: relative;
}

.sparkline-bar-label span {
  position: absolute;
  top: 50%;
  right: 1rem;
  color: var(--frame-primary-foreground);
  font-weight: 800;
  transform: translateY(-50%);
}`,
      },
    ],
  },
  {
    id: 'heatmap-support-load',
    category: 'heatmap',
    title: 'Heatmap - Support Load',
    description: 'Showing ticket intensity by weekday and support window.',
    featured: true,
    type: 'heatmap',
    xKey: 'hour',
    yKey: 'day',
    data: supportLoadData,
    series: [{ key: 'tickets', label: 'Tickets' }],
    valueFormatter: (value) => `${value.toFixed(0)} tickets`,
    code: [
      {
        language: 'ts',
        code: `${importsCode}

${supportLoadTs}

ticketFormatter = (value: number) => \`\${value.toFixed(0)} tickets\`;`,
      },
      {
        language: 'html',
        code: `<frame-chart
  type="heatmap"
  xKey="hour"
  yKey="day"
  aria-label="Support load by weekday and hour"
  [data]="supportLoadData"
  [series]="supportLoadSeries"
  [valueFormatter]="ticketFormatter"
/>`,
      },
    ],
  },
  {
    id: 'calendar-heatmap-deployments',
    category: 'heatmap',
    title: 'Calendar Heatmap - Deployment Activity',
    description: 'Showing daily activity intensity across weeks with a compact calendar grid',
    featured: true,
    type: 'calendar-heatmap',
    xKey: 'date',
    data: deploymentActivityData,
    series: [{ key: 'deploys', label: 'Deploys' }],
    valueFormatter: (value) => `${value.toFixed(0)} deploys`,
    code: [
      {
        language: 'ts',
        code: `${importsCode}

${deploymentActivityTs}

deploymentFormatter = (value: number) => \`\${value.toFixed(0)} deploys\`;`,
      },
      {
        language: 'html',
        code: `<frame-chart
  type="calendar-heatmap"
  xKey="date"
  aria-label="Deployment activity"
  [data]="deploymentActivityData"
  [series]="deploymentSeries"
  [valueFormatter]="deploymentFormatter"
/>`,
      },
    ],
  },
  {
    id: 'radial-readiness',
    category: 'radial',
    title: 'Radial Chart - Readiness',
    description: 'Showing release checks as concentric progress rings',
    featured: true,
    type: 'radial',
    xKey: 'check',
    data: readinessData,
    series: [{ key: 'value', label: 'Progress' }],
    valueFormatter: (value) => `${value.toFixed(value % 1 ? 1 : 0)}%`,
    code: [
      {
        language: 'ts',
        code: `${importsCode}

readinessData = ${JSON.stringify(readinessData, null, 2)};

progressSeries = [
  { key: 'value', label: 'Progress' },
];

percentFormatter = (value: number) => \`\${value.toFixed(value % 1 ? 1 : 0)}%\`;`,
      },
      {
        language: 'html',
        code: `<frame-chart
  type="radial"
  xKey="check"
  [data]="readinessData"
  [series]="progressSeries"
  [valueFormatter]="percentFormatter"
/>`,
      },
    ],
  },
  {
    id: 'radial-capacity',
    category: 'radial',
    title: 'Radial Chart - Custom Max',
    description: 'Showing team capacity against different monthly budgets',
    type: 'radial',
    xKey: 'team',
    data: capacityData,
    series: [{ key: 'value', label: 'Hours used' }],
    valueFormatter: (value) => `${value.toFixed(0)}h`,
    code: [
      {
        language: 'ts',
        code: `${importsCode}

capacityData = ${JSON.stringify(capacityData, null, 2)};

hoursSeries = [
  { key: 'value', label: 'Hours used' },
];

hoursFormatter = (value: number) => \`\${value.toFixed(0)}h\`;`,
      },
      {
        language: 'html',
        code: `<frame-chart
  type="radial"
  xKey="team"
  [data]="capacityData"
  [series]="hoursSeries"
  [valueFormatter]="hoursFormatter"
/>`,
      },
    ],
  },
  {
    id: 'radial-empty',
    category: 'radial',
    title: 'Radial Chart - Empty',
    description: 'Showing an empty state when every radial value is zero',
    type: 'radial',
    xKey: 'metric',
    data: zeroRadialData,
    series: [{ key: 'value', label: 'Progress' }],
    code: [
      {
        language: 'ts',
        code: `${importsCode}

zeroRadialData = ${JSON.stringify(zeroRadialData, null, 2)};

progressSeries = [
  { key: 'value', label: 'Progress' },
];`,
      },
      {
        language: 'html',
        code: `<frame-chart
  type="radial"
  xKey="metric"
  [data]="zeroRadialData"
  [series]="progressSeries"
/>`,
      },
    ],
  },
];
