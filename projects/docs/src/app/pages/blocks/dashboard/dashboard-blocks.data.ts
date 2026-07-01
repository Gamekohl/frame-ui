import { buildComponentCode, type ComponentCodeModule } from '../blocks-code';
import { BlockImplementation } from '../blocks.models';
import { DashboardBlockPreview, DashboardBlockVariant } from './dashboard-block-preview';

type DashboardBlockImplementation = BlockImplementation<DashboardBlockVariant>;

const badgeModule = { name: 'FrBadgeModule', path: 'badge' } as const;
const buttonModule = { name: 'FrButtonModule', path: 'button' } as const;
const cardModule = { name: 'FrCardModule', path: 'card' } as const;
const itemModule = { name: 'FrItemModule', path: 'item' } as const;
const progressModule = { name: 'FrProgressModule', path: 'progress' } as const;

const metricsOverviewImports = [
  badgeModule,
  cardModule,
  progressModule,
] satisfies readonly ComponentCodeModule[];

const revenueSnapshotImports = [
  badgeModule,
  cardModule,
  progressModule,
] satisfies readonly ComponentCodeModule[];

const reviewQueueImports = [
  badgeModule,
  buttonModule,
  cardModule,
  itemModule,
] satisfies readonly ComponentCodeModule[];

const metricsOverviewCode = `<section frCard spacing="xl" class="w-full max-w-5xl bg-surface/95">
  <div frCardContent class="grid gap-6">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div class="grid gap-1">
        <p class="font-mono text-xs font-extrabold uppercase tracking-wider text-primary!">Control room</p>
        <h2 class="m-0 text-2xl font-bold leading-tight">Metrics overview</h2>
        <p class="m-0 text-sm leading-6 text-muted-foreground">A compact executive surface for daily product health.</p>
      </div>
      <span frBadge variant="secondary">Updated 4 min ago</span>
    </div>

    <div class="grid gap-3 md:grid-cols-4">
      @for (metric of healthMetrics; track metric.label) {
        <div class="grid gap-3 border border-border bg-muted p-4">
          <span class="flex items-center justify-between gap-3">
            <ng-icon [name]="metric.icon" size="18" class="text-primary!" />
            <span class="text-xs font-semibold uppercase text-muted-foreground">{{ metric.delta }}</span>
          </span>
          <span>
            <strong class="block text-2xl font-bold leading-none">{{ metric.value }}</strong>
            <span class="mt-1 block text-xs text-muted-foreground">{{ metric.label }}</span>
          </span>
        </div>
      }
    </div>

    <div class="grid gap-4 lg:grid-cols-3">
      <div class="grid gap-3 border border-border p-4 lg:col-span-2">
        <div class="flex items-center justify-between">
          <span class="text-sm font-semibold">Weekly activation</span>
          <span class="text-sm text-muted-foreground">74%</span>
        </div>
        <div frProgress aria-label="Weekly activation" [value]="74">
          <div frProgressIndicator></div>
        </div>
      </div>
      <div class="grid gap-2 border border-border p-4">
        <span class="text-sm font-semibold">Focus</span>
        <p class="m-0 text-sm leading-6 text-muted-foreground">
          Trial teams are converting faster after the onboarding update.
        </p>
      </div>
    </div>
  </div>
</section>`;

const revenueSnapshotCode = `<section frCard spacing="xl" class="w-full max-w-4xl bg-surface/95">
  <div frCardContent class="grid gap-6">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div class="grid gap-1">
        <p class="font-mono text-xs font-extrabold uppercase tracking-wider text-primary!">Billing desk</p>
        <h2 class="m-0 text-2xl font-bold leading-tight">Revenue snapshot</h2>
        <p class="m-0 text-sm leading-6 text-muted-foreground">Track cash movement before month close.</p>
      </div>
      <span frBadge variant="success">On track</span>
    </div>

    <div class="grid gap-3 md:grid-cols-3">
      @for (metric of revenueMetrics; track metric.label) {
        <div class="grid gap-2 border border-border bg-muted p-4">
          <span class="text-xs font-semibold uppercase text-muted-foreground">{{ metric.label }}</span>
          <strong class="text-2xl font-bold leading-none">{{ metric.value }}</strong>
          <span class="text-xs text-muted-foreground">{{ metric.detail }}</span>
        </div>
      }
    </div>

    <div class="grid gap-3">
      @for (line of revenueLines; track line.label) {
        <div class="grid gap-2">
          <div class="flex items-center justify-between gap-3 text-sm">
            <span class="font-semibold">{{ line.label }}</span>
            <span class="text-muted-foreground">{{ line.value }}%</span>
          </div>
          <div frProgress [value]="line.value" [attr.aria-label]="line.label">
            <div frProgressIndicator></div>
          </div>
        </div>
      }
    </div>
  </div>
</section>`;

const reviewQueueCode = `<section frCard spacing="xl" class="w-full max-w-3xl bg-surface/95">
  <div frCardContent class="grid gap-6">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div class="grid gap-1">
        <p class="font-mono text-xs font-extrabold uppercase tracking-wider text-primary!">Operations</p>
        <h2 class="m-0 text-2xl font-bold leading-tight">Review queue</h2>
        <p class="m-0 text-sm leading-6 text-muted-foreground">Prioritized work that needs human approval.</p>
      </div>
      <button frButton appearance="outline" type="button">
        <span frButtonLabel>Open all</span>
        <ng-icon name="tablerArrowRight" size="16" frButtonIcon />
      </button>
    </div>

    <div frItemGroup>
      @for (item of reviewItems; track item.title) {
        <div frItem interactive>
          <span frItemMedia variant="icon">
            <ng-icon [name]="item.icon" size="18" />
          </span>
          <span frItemContent>
            <span frItemTitle>{{ item.title }}</span>
            <span frItemDescription>{{ item.description }}</span>
          </span>
          <span frItemActions>
            <span frBadge [variant]="item.variant">{{ item.status }}</span>
          </span>
        </div>
        @if (!$last) {
          <div frItemSeparator></div>
        }
      }
    </div>
  </div>
</section>`;

export const DASHBOARD_BLOCK_IMPLEMENTATIONS = {
  'metrics-overview': {
    variant: 'metrics-overview',
    previewComponent: DashboardBlockPreview,
    previewInputs: ({ device }) => ({ device, variant: 'metrics-overview' }),
    componentCode: buildComponentCode(
      'MetricsOverview',
      'app-metrics-overview',
      metricsOverviewCode,
      `  protected readonly healthMetrics = [
    { label: 'Active teams', value: '248', delta: '+12%', icon: 'tablerUsers' },
    { label: 'Activation', value: '74%', delta: '+8%', icon: 'tablerTrendingUp' },
    { label: 'Data sync', value: '99.9%', delta: 'Stable', icon: 'tablerDatabase' },
    { label: 'Open risks', value: '6', delta: '-2', icon: 'tablerFlag' },
  ];`,
      {
        frameModules: metricsOverviewImports,
        iconImports: ['tablerDatabase', 'tablerFlag', 'tablerTrendingUp', 'tablerUsers'],
      },
    ),
  },
  'revenue-snapshot': {
    variant: 'revenue-snapshot',
    previewComponent: DashboardBlockPreview,
    previewInputs: ({ device }) => ({ device, variant: 'revenue-snapshot' }),
    componentCode: buildComponentCode(
      'RevenueSnapshot',
      'app-revenue-snapshot',
      revenueSnapshotCode,
      `  protected readonly revenueMetrics = [
    { label: 'MRR', value: '$128.4k', detail: '+9.6% from last month' },
    { label: 'Expansion', value: '$18.2k', detail: '14 accounts upgraded' },
    { label: 'Open invoices', value: '$7.8k', detail: '3 need follow-up' },
  ];

  protected readonly revenueLines = [
    { label: 'Plan attainment', value: 82 },
    { label: 'Collection progress', value: 68 },
    { label: 'Forecast confidence', value: 91 },
  ];`,
      {
        frameModules: revenueSnapshotImports,
      },
    ),
  },
  'review-queue': {
    variant: 'review-queue',
    previewComponent: DashboardBlockPreview,
    previewInputs: ({ device }) => ({ device, variant: 'review-queue' }),
    componentCode: buildComponentCode(
      'ReviewQueue',
      'app-review-queue',
      reviewQueueCode,
      `  protected readonly reviewItems = [
    {
      title: 'Enterprise contract exception',
      description: 'Legal approved pricing, finance needs final sign-off.',
      icon: 'tablerFileInvoice',
      status: 'Finance',
      variant: 'secondary',
    },
    {
      title: 'Data export request',
      description: 'Security review required before the export window opens.',
      icon: 'tablerDatabase',
      status: 'Security',
      variant: 'outline',
    },
    {
      title: 'SLA breach warning',
      description: 'Queue latency is above target for the EU workspace.',
      icon: 'tablerAlertTriangle',
      status: 'Urgent',
      variant: 'destructive',
    },
  ] as const;`,
      {
        frameModules: reviewQueueImports,
        iconImports: ['tablerAlertTriangle', 'tablerArrowRight', 'tablerDatabase', 'tablerFileInvoice'],
      },
    ),
  },
} satisfies Record<string, DashboardBlockImplementation>;
