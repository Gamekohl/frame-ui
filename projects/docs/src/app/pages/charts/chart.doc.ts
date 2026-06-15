import { ComponentDoc } from '../docs/shared/models/component-doc.model';
import { DocsChartPreviewComponent } from './previews/chart-preview';

const importsCode = `import { FrChartModule } from '@frame-ui-ng/charts';`;

const dataCode = `trafficData = [
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

const areaHtml = `<frame-chart
  aria-label="Traffic by device"
  type="area"
  xKey="month"
  [data]="trafficData"
  [series]="trafficSeries"
/>`;

const lineHtml = `<frame-chart
  aria-label="Revenue and pipeline"
  type="line"
  xKey="month"
  [data]="revenueData"
  [series]="revenueSeries"
  [valueFormatter]="currencyFormatter"
/>`;

const barHtml = `<frame-chart
  aria-label="Incidents by severity"
  type="bar"
  xKey="month"
  [data]="incidentData"
  [series]="incidentSeries"
/>`;

const customCss = `.business-chart {
  --frame-chart-height: 18rem;
  --frame-chart-1: color-mix(in srgb, var(--frame-primary) 90%, var(--frame-foreground));
  --frame-chart-2: color-mix(in srgb, var(--frame-primary) 42%, var(--frame-foreground));
  --frame-chart-grid-color: color-mix(in srgb, var(--frame-border) 58%, transparent);
}`;

const tokens = `--frame-chart-height: 20rem;
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
--frame-chart-tooltip-shadow: var(--frame-shadow-lg, 0 12px 30px rgb(0 0 0 / 0.12));`;

export const CHART_DOC: ComponentDoc = {
  slug: 'chart',
  breadcrumb: 'Charts / Chart',
  sectionLabel: 'Charts',
  sectionPath: '/charts',

  hero: {
    id: 'chart-hero',
    title: 'Preview',
    preview: {
      component: DocsChartPreviewComponent,
      inputs: {
        config: { mode: 'area' },
      },
    },
  },

  installation: {
    cli: {
      language: 'bash',
      code: 'npx your-cli add chart',
    },
    manual: {
      steps: [
        {
          title: 'Import the chart module.',
          code: {
            language: 'ts',
            code: importsCode,
          },
        },
      ],
    },
  },

  usage: [
    {
      language: 'ts',
      code: `${importsCode}

${dataCode}`,
    },
    {
      language: 'html',
      code: areaHtml,
    },
  ],

  tokenInspector: {
    id: 'token-inspector',
    title: 'Token inspector',
    description:
      'Hover the chart shell or chart root to inspect the tokens that control colors, grid treatment, tooltip surface, and chart height.',
    preview: {
      component: DocsChartPreviewComponent,
      containerClass: 'block',
      inputs: {
        config: { mode: 'inspector' },
      },
      inspectorTargets: [
        {
          id: 'root',
          label: 'Chart root',
          selector: '[data-token-target="chart-root"]',
          description: 'The root exposes the chart seed palette, grid, axis, tooltip, and sizing tokens.',
          tokens: [
            '--frame-chart-height',
            '--frame-chart-1',
            '--frame-chart-2',
            '--frame-chart-3',
            '--frame-chart-4',
            '--frame-chart-5',
            '--frame-chart-grid-color',
            '--frame-chart-axis-color',
            '--frame-chart-tooltip-bg',
            '--frame-chart-tooltip-color',
            '--frame-chart-tooltip-border',
            '--frame-chart-tooltip-shadow',
          ],
        },
      ],
    },
  },

  styling: {
    description:
      'Override chart tokens on the chart root or an ancestor to tune the seed palette, tooltip surface, grid color, and chart height.',
    preview: {
      id: 'custom-styling-preview',
      title: 'Custom Styling Preview',
      description: 'This preview uses local token overrides for a sharper business dashboard chart.',
      preview: {
        component: DocsChartPreviewComponent,
        inputs: {
          config: { mode: 'inspector' },
        },
      },
      code: [
        {
          language: 'ts',
          code: importsCode,
        },
        {
          language: 'html',
          code: `<frame-chart class="business-chart" type="area" xKey="month" [data]="trafficData" [series]="trafficSeries" />`,
        },
        {
          language: 'css',
          code: customCss,
        },
      ],
    },
  },

  examples: [
    {
      id: 'area',
      title: 'Area',
      description: 'Use area charts for volume trends where the filled surface should emphasize magnitude over time.',
      preview: {
        component: DocsChartPreviewComponent,
        inputs: {
          config: { mode: 'area' },
        },
      },
      code: [
        { language: 'ts', code: `${importsCode}\n\n${dataCode}` },
        { language: 'html', code: areaHtml },
      ],
    },
    {
      id: 'line',
      title: 'Line',
      description: 'Use line charts when comparing trend direction across multiple related metrics.',
      preview: {
        component: DocsChartPreviewComponent,
        inputs: {
          config: { mode: 'line' },
        },
      },
      code: [
        { language: 'ts', code: importsCode },
        { language: 'html', code: lineHtml },
      ],
    },
    {
      id: 'bar',
      title: 'Bar',
      description: 'Use bar charts when discrete categories or period totals need stronger visual separation.',
      preview: {
        component: DocsChartPreviewComponent,
        inputs: {
          config: { mode: 'bar' },
        },
      },
      code: [
        { language: 'ts', code: importsCode },
        { language: 'html', code: barHtml },
      ],
    },
  ],

  tokensTitle: 'Design Tokens',
  tokensDescription:
    'Use these CSS custom properties to tune chart height, the seed palette, grid lines, axis labels, and tooltip styling.',
  tokens,
};
