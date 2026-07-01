import { buildComponentCode, type ComponentCodeModule } from '../blocks-code';
import { BlockImplementation } from '../blocks.models';
import { DashboardBlockPreview, DashboardBlockVariant } from './dashboard-block-preview';

type DashboardBlockImplementation = BlockImplementation<DashboardBlockVariant>;

const badgeModule = { name: 'FrBadgeModule', path: 'badge' } as const;
const buttonModule = { name: 'FrButtonModule', path: 'button' } as const;
const cardModule = { name: 'FrCardModule', path: 'card' } as const;
const dropdownMenuModule = { name: 'FrDropdownMenuModule', path: 'dropdown-menu' } as const;
const itemModule = { name: 'FrItemModule', path: 'item' } as const;
const progressModule = { name: 'FrProgressModule', path: 'progress' } as const;
const tableModule = { name: 'FrTableModule', path: 'table' } as const;
const tabsModule = { name: 'FrTabsModule', path: 'tabs' } as const;

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

const orderFulfillmentImports = [
  badgeModule,
  buttonModule,
  cardModule,
  dropdownMenuModule,
  tableModule,
  tabsModule,
] satisfies readonly ComponentCodeModule[];

const metricsOverviewCode = `<section frCard spacing="xl" class="w-full max-w-5xl bg-surface/95">
  <div frCardContent class="grid gap-6">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div class="grid gap-1">
        <p class="font-mono text-xs font-extrabold uppercase tracking-wider text-primary!">Shop floor</p>
        <h2 class="m-0 text-2xl font-bold leading-tight">Store overview</h2>
        <p class="m-0 text-sm leading-6 text-muted-foreground">Watch today's orders, checkout conversion, inventory sync, and open support issues.</p>
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
          <span class="text-sm font-semibold">Checkout conversion</span>
          <span class="text-sm text-muted-foreground">74%</span>
        </div>
        <div frProgress aria-label="Weekly activation" [value]="74">
          <div frProgressIndicator></div>
        </div>
      </div>
      <div class="grid gap-2 border border-border p-4">
        <span class="text-sm font-semibold">Focus</span>
        <p class="m-0 text-sm leading-6 text-muted-foreground">
          Back-in-stock emails are driving most orders this morning.
        </p>
      </div>
    </div>
  </div>
</section>`;

const revenueSnapshotCode = `<section frCard spacing="xl" class="w-full max-w-4xl bg-surface/95">
  <div frCardContent class="grid gap-6">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div class="grid gap-1">
        <p class="font-mono text-xs font-extrabold uppercase tracking-wider text-primary!">Invoices</p>
        <h2 class="m-0 text-2xl font-bold leading-tight">Invoice tracker</h2>
        <p class="m-0 text-sm leading-6 text-muted-foreground">See paid, overdue, and due invoices before finance closes the week.</p>
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
        <p class="font-mono text-xs font-extrabold uppercase tracking-wider text-primary!">Support desk</p>
        <h2 class="m-0 text-2xl font-bold leading-tight">Refund queue</h2>
        <p class="m-0 text-sm leading-6 text-muted-foreground">Review refunds, returns, and damaged-order claims before customers wait too long.</p>
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

const orderFulfillmentCode = `<section frCard spacing="xl" class="w-full max-w-5xl bg-surface/95">
  <div frCardContent class="grid gap-6">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div class="grid gap-1">
        <p class="font-mono text-xs font-extrabold uppercase tracking-wider text-primary!">Shipping desk</p>
        <h2 class="m-0 text-2xl font-bold leading-tight">Order fulfillment</h2>
        <p class="m-0 text-sm leading-6 text-muted-foreground">
          Track paid orders, shipping status, and the next action before packages miss pickup.
        </p>
      </div>
      <button frButton appearance="outline" type="button">
        <ng-icon name="tablerRocket" size="16" frButtonIcon />
        <span frButtonLabel>Create shipment</span>
      </button>
    </div>

    <div frTabs defaultValue="orders" class="grid gap-4">
      <div frTabsList variant="line" aria-label="Order views">
        <button frTabsTrigger value="orders">Orders</button>
        <button frTabsTrigger value="delays">Delays</button>
        <button frTabsTrigger value="carriers">Carriers</button>
      </div>

      <div frTabsContent value="orders" class="grid gap-4">
        <div frTableContainer class="w-full overflow-x-auto">
          <table frTable variant="outline" [dataSource]="orders">
            <ng-container frColumnDef="order">
              <th frHeaderCell *frHeaderCellDef>Order</th>
              <td frCell *frCellDef="let order">
                <span class="grid gap-1">
                  <span class="font-semibold">{{ order.id }}</span>
                  <span class="text-xs text-muted-foreground">{{ order.customer }}</span>
                </span>
              </td>
            </ng-container>

            <ng-container frColumnDef="items">
              <th frHeaderCell *frHeaderCellDef>Items</th>
              <td frCell *frCellDef="let order">{{ order.items }}</td>
            </ng-container>

            <ng-container frColumnDef="status">
              <th frHeaderCell *frHeaderCellDef>Status</th>
              <td frCell *frCellDef="let order">
                <span frBadge [variant]="orderBadgeVariant(order.status)">
                  {{ order.status }}
                </span>
              </td>
            </ng-container>

            <ng-container frColumnDef="delivery">
              <th frHeaderCell *frHeaderCellDef>Delivery</th>
              <td frCell *frCellDef="let order" frTableMuted>{{ order.delivery }}</td>
            </ng-container>

            <ng-container frColumnDef="actions">
              <th frHeaderCell frTableNumeric *frHeaderCellDef>Actions</th>
              <td frCell frTableNumeric *frCellDef="let order">
                <div frDropdownMenu>
                  <button
                    frButton
                    appearance="ghost"
                    size="sm"
                    type="button"
                    [frDropdownMenuTrigger]="orderMenu"
                    aria-label="Open order actions"
                  >
                    <ng-icon name="tablerDots" size="16" />
                  </button>

                  <ng-template #orderMenu="frDropdownMenuContent" frDropdownMenuContent>
                    <div frDropdownMenuPanel>
                      <div frDropdownMenuLabel>{{ order.id }}</div>
                      <button frDropdownMenuItem type="button">Open order</button>
                      <button frDropdownMenuItem type="button">Print label</button>
                      <div frDropdownMenuSeparator></div>
                      <button frDropdownMenuItem variant="destructive" type="button">Cancel shipment</button>
                    </div>
                  </ng-template>
                </div>
              </td>
            </ng-container>

            <tr frHeaderRow *frHeaderRowDef="orderColumns"></tr>
            <tr frRow *frRowDef="let row; columns: orderColumns"></tr>
          </table>
        </div>
      </div>

      <div frTabsContent value="delays">
        <div class="grid gap-2 border border-border bg-muted p-4">
          <span class="text-sm font-semibold">2 orders need carrier pickup</span>
          <span class="text-sm leading-6 text-muted-foreground">Both are packed and waiting at the Berlin warehouse.</span>
        </div>
      </div>

      <div frTabsContent value="carriers">
        <div class="grid gap-3 border border-border bg-muted p-4">
          @for (carrier of carriers; track carrier.name) {
            <div class="flex items-center justify-between gap-3 text-sm">
              <span class="font-semibold">{{ carrier.name }}</span>
              <span class="text-muted-foreground">{{ carrier.pickup }}</span>
            </div>
          }
        </div>
      </div>
    </div>
  </div>
</section>`;

export const DASHBOARD_BLOCK_IMPLEMENTATIONS = {
  'order-fulfillment': {
    variant: 'order-fulfillment',
    previewComponent: DashboardBlockPreview,
    previewInputs: ({ device }) => ({ device, variant: 'order-fulfillment' }),
    componentCode: buildComponentCode(
      'OrderFulfillment',
      'app-order-fulfillment',
      orderFulfillmentCode,
      `  protected readonly orderColumns = ['order', 'items', 'status', 'delivery', 'actions'];
  protected readonly orders = [
    { id: 'ORD-2048', customer: 'Mika Stone', items: 'Desk lamp, cable tray', status: 'Packed', delivery: 'DHL Express' },
    { id: 'ORD-2049', customer: 'Nora Patel', items: 'Monitor arm', status: 'Picking', delivery: 'UPS Ground' },
    { id: 'ORD-2050', customer: 'Jonas Reed', items: 'Standing mat', status: 'Delayed', delivery: 'DHL Express' },
    { id: 'ORD-2051', customer: 'Mira Chen', items: 'Keyboard kit', status: 'Packed', delivery: 'FedEx Priority' },
  ] as const;
  protected readonly carriers = [
    { name: 'DHL Express', pickup: '16:30 pickup' },
    { name: 'UPS Ground', pickup: 'Tomorrow' },
    { name: 'FedEx Priority', pickup: '18:00 pickup' },
  ] as const;

  protected orderBadgeVariant(status: string): 'success' | 'secondary' | 'destructive' {
    if (status === 'Delayed') {
      return 'destructive';
    }

    return status === 'Picking' ? 'secondary' : 'success';
  }`,
      {
        frameModules: orderFulfillmentImports,
        iconImports: ['tablerDots', 'tablerRocket'],
      },
    ),
  },
  'metrics-overview': {
    variant: 'metrics-overview',
    previewComponent: DashboardBlockPreview,
    previewInputs: ({ device }) => ({ device, variant: 'metrics-overview' }),
    componentCode: buildComponentCode(
      'StoreOverview',
      'app-metrics-overview',
      metricsOverviewCode,
      `  protected readonly healthMetrics = [
    { label: 'Orders today', value: '248', delta: '+12%', icon: 'tablerUsers' },
    { label: 'Checkout conversion', value: '7.4%', delta: '+8%', icon: 'tablerTrendingUp' },
    { label: 'Inventory sync', value: '99.9%', delta: 'Stable', icon: 'tablerDatabase' },
    { label: 'Support issues', value: '6', delta: '-2', icon: 'tablerFlag' },
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
      'InvoiceTracker',
      'app-revenue-snapshot',
      revenueSnapshotCode,
      `  protected readonly revenueMetrics = [
    { label: 'Paid invoices', value: '$128.4k', detail: '42 invoices paid this month' },
    { label: 'Due this week', value: '$18.2k', detail: '14 invoices awaiting payment' },
    { label: 'Overdue', value: '$7.8k', detail: '3 customers need follow-up' },
  ];

  protected readonly revenueLines = [
    { label: 'Invoices paid', value: 82 },
    { label: 'Payment collection', value: 68 },
    { label: 'Tax review ready', value: 91 },
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
      'RefundQueue',
      'app-review-queue',
      reviewQueueCode,
      `  protected readonly reviewItems = [
    {
      title: 'Refund for ORD-2048',
      description: 'Customer received the wrong lamp color and asked for store credit.',
      icon: 'tablerFileInvoice',
      status: 'Refund',
      variant: 'secondary',
    },
    {
      title: 'Return label request',
      description: 'A damaged monitor arm needs a prepaid label before pickup.',
      icon: 'tablerDatabase',
      status: 'Return',
      variant: 'outline',
    },
    {
      title: 'VIP order delay',
      description: 'Express shipment missed pickup and needs a customer update.',
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
