import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FrChartModule, FrChartSeries } from '@frame-ui-ng/charts';

export type ChartPreviewMode = 'area' | 'bar' | 'line' | 'inspector';

export type ChartPreviewConfig = {
  mode: ChartPreviewMode;
};

const trafficData = [
  { month: 'Jan', desktop: 186, mobile: 80 },
  { month: 'Feb', desktop: 305, mobile: 200 },
  { month: 'Mar', desktop: 237, mobile: 120 },
  { month: 'Apr', desktop: 273, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'Jun', desktop: 314, mobile: 260 },
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

@Component({
  selector: 'docs-chart-preview',
  host: {
    class: 'block w-full',
  },
  imports: [FrChartModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @switch (config().mode) {
      @case ('area') {
        <section class="docs-chart-card">
          <div class="docs-chart-header">
            <span>Traffic overview</span>
            <strong>574k</strong>
          </div>
          <frame-chart
            aria-label="Traffic by device"
            type="area"
            xKey="month"
            [data]="trafficData"
            [series]="trafficSeries"
          />
        </section>
      }

      @case ('line') {
        <section class="docs-chart-card">
          <div class="docs-chart-header">
            <span>Revenue trend</span>
            <strong>+18.4%</strong>
          </div>
          <frame-chart
            aria-label="Revenue and pipeline"
            type="line"
            xKey="month"
            [data]="revenueData"
            [series]="revenueSeries"
            [valueFormatter]="currencyFormatter"
          />
        </section>
      }

      @case ('bar') {
        <section class="docs-chart-card">
          <div class="docs-chart-header">
            <span>Incident volume</span>
            <strong>23 open</strong>
          </div>
          <frame-chart
            aria-label="Incidents by severity"
            type="bar"
            xKey="month"
            [data]="incidentData"
            [series]="incidentSeries"
          />
        </section>
      }

      @case ('inspector') {
        <section class="docs-chart-card docs-chart-inspector" data-token-target="chart-card">
          <div class="docs-chart-header">
            <span>Session mix</span>
            <strong>+12.5%</strong>
          </div>
          <frame-chart
            data-token-target="chart-root"
            aria-label="Session mix"
            type="area"
            xKey="month"
            [data]="trafficData"
            [series]="trafficSeries"
          />
        </section>
      }
    }
  `,
  styles: `
    .docs-chart-card {
      display: flex;
      width: min(100%, 46rem);
      margin-inline: auto;
      flex-direction: column;
      gap: 1rem;
      padding: 1rem;
      border: 1px solid var(--frame-border);
      border-radius: var(--frame-radius-xl);
      background: color-mix(in srgb, var(--frame-surface) 94%, var(--frame-primary));
      box-shadow: var(--frame-shadow-sm);
    }

    .docs-chart-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 1rem;
      color: var(--frame-muted-foreground);
      font-size: 0.875rem;
    }

    .docs-chart-header strong {
      color: var(--frame-foreground);
      font-size: 1.25rem;
      font-weight: 700;
    }

    .docs-chart-inspector {
      --frame-chart-1: color-mix(in srgb, var(--frame-primary) 90%, var(--frame-foreground));
      --frame-chart-2: color-mix(in srgb, var(--frame-primary) 42%, var(--frame-foreground));
      --frame-chart-height: 18rem;
    }
  `,
})
export class DocsChartPreviewComponent {
  readonly config = input.required<ChartPreviewConfig>();

  protected readonly trafficData = trafficData;
  protected readonly revenueData = revenueData;
  protected readonly incidentData = incidentData;
  protected readonly trafficSeries: FrChartSeries[] = [
    { key: 'desktop', label: 'Desktop' },
    { key: 'mobile', label: 'Mobile' },
  ];
  protected readonly revenueSeries: FrChartSeries[] = [
    { key: 'revenue', label: 'Revenue' },
    { key: 'pipeline', label: 'Pipeline' },
  ];
  protected readonly incidentSeries: FrChartSeries[] = [
    { key: 'critical', label: 'Critical' },
    { key: 'warning', label: 'Warning' },
  ];
  protected readonly currencyFormatter = (value: number) => `$${value.toFixed(0)}k`;
}
