import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  tablerAlertTriangle,
  tablerArrowRight,
  tablerBell,
  tablerChartBar,
  tablerChecklist,
  tablerClock,
  tablerCreditCard,
  tablerDatabase,
  tablerDots,
  tablerFileInvoice,
  tablerFlag,
  tablerHome,
  tablerLayoutSidebar,
  tablerRocket,
  tablerReceipt,
  tablerSettings,
  tablerShoppingBag,
  tablerTrendingUp,
  tablerUsers,
} from '@ng-icons/tabler-icons';
import { FrBadgeModule } from '@frame-ui-ng/components/badge';
import { FrButtonModule } from '@frame-ui-ng/components/button';
import { FrCardModule } from '@frame-ui-ng/components/card';
import { FrDropdownMenuModule } from '@frame-ui-ng/components/dropdown-menu';
import { FrItemModule } from '@frame-ui-ng/components/item';
import { FrProgressModule } from '@frame-ui-ng/components/progress';
import { FrSidebarModule } from '@frame-ui-ng/components/sidebar';
import { FrTableModule } from '@frame-ui-ng/components/table';
import { FrTabsModule } from '@frame-ui-ng/components/tabs';

export type DashboardBlockVariant =
  | 'metrics-overview'
  | 'order-fulfillment'
  | 'revenue-snapshot'
  | 'review-queue'
  | 'workspace-shell';
type DashboardBlockPreviewDevice = 'desktop' | 'mobile';

@Component({
  selector: 'blocks-dashboard-preview',
  imports: [
    FrBadgeModule,
    FrButtonModule,
    FrCardModule,
    FrDropdownMenuModule,
    FrItemModule,
    FrProgressModule,
    FrSidebarModule,
    FrTableModule,
    FrTabsModule,
    NgClass,
    NgIcon,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block min-h-full',
  },
  viewProviders: [
    provideIcons({
      tablerAlertTriangle,
      tablerArrowRight,
      tablerBell,
      tablerChartBar,
      tablerChecklist,
      tablerClock,
      tablerCreditCard,
      tablerDatabase,
      tablerDots,
      tablerFileInvoice,
      tablerFlag,
      tablerHome,
      tablerLayoutSidebar,
      tablerRocket,
      tablerReceipt,
      tablerSettings,
      tablerShoppingBag,
      tablerTrendingUp,
      tablerUsers,
    }),
  ],
  template: `
    <div class="grid min-h-96 place-items-center bg-muted p-4 md:p-8">
      @switch (variant()) {
        @case ('workspace-shell') {
          <section class="w-full max-w-5xl overflow-hidden border border-border bg-background">
            <div
              frSidebarProvider
              class="h-96"
              [defaultOpen]="device() !== 'mobile'"
              [open]="device() === 'mobile' ? shellOpen() : null"
              (openChange)="shellOpen.set($event)"
            >
              <aside frSidebar collapsible="offcanvas" [resizable]="false">
                <div frSidebarHeader>
                  <a frSidebarMenuButton size="lg" href="#">
                    <span class="grid size-8 place-items-center bg-primary text-primary-foreground">
                      <ng-icon name="tablerShoppingBag" size="18" />
                    </span>
                    <span>Acme Store</span>
                  </a>
                </div>

                <div frSidebarContent>
                  <div frSidebarGroup>
                    <div frSidebarGroupLabel>Operations</div>
                    <div frSidebarGroupContent>
                      <ul frSidebarMenu>
                        @for (item of shellNavItems; track item.label) {
                          <li frSidebarMenuItem>
                            <a frSidebarMenuButton [active]="item.active" href="#">
                              <ng-icon [name]="item.icon" size="17" />
                              <span>{{ item.label }}</span>
                            </a>
                            @if (item.badge) {
                              <span frSidebarMenuBadge>{{ item.badge }}</span>
                            }
                          </li>
                        }
                      </ul>
                    </div>
                  </div>
                </div>

                <div frSidebarFooter>
                  <a frSidebarMenuButton variant="outline" href="#">
                    <ng-icon name="tablerSettings" size="17" />
                    <span>Settings</span>
                  </a>
                </div>

                <div frSidebarRail></div>
              </aside>

              <main frSidebarInset class="grid min-h-0 content-start gap-5 overflow-auto bg-muted p-4">
                <div class="flex items-start gap-3">
                  <button frSidebarTrigger type="button" aria-label="Toggle sidebar">
                    <ng-icon name="tablerLayoutSidebar" size="18" />
                  </button>
                  <div class="grid gap-1">
                    <p class="m-0 font-mono text-xs font-extrabold uppercase tracking-wider text-primary!">Today</p>
                    <h2 class="m-0 text-2xl font-bold leading-tight">Store command center</h2>
                    <p class="m-0 text-sm leading-6 text-muted-foreground">Orders, returns, and stock alerts in one workspace.</p>
                  </div>
                </div>

                <div class="grid gap-3" [ngClass]="device() === 'mobile' ? '' : 'md:grid-cols-3'">
                  @for (metric of shellMetrics; track metric.label) {
                    <div class="grid gap-2 border border-border bg-surface p-4">
                      <span class="flex items-center justify-between gap-3">
                        <span class="text-xs font-semibold uppercase text-muted-foreground">{{ metric.label }}</span>
                        <ng-icon [name]="metric.icon" size="17" class="text-primary!" />
                      </span>
                      <strong class="text-2xl font-bold leading-none">{{ metric.value }}</strong>
                      <span class="text-xs text-muted-foreground">{{ metric.detail }}</span>
                    </div>
                  }
                </div>

                <div class="grid gap-4" [ngClass]="device() === 'mobile' ? '' : 'lg:grid-cols-3'">
                  <section class="grid gap-3 border border-border bg-surface p-4" [ngClass]="device() === 'mobile' ? '' : 'lg:col-span-2'">
                    <div class="flex items-center justify-between gap-3">
                      <h3 class="m-0 text-base font-semibold">Fulfillment queue</h3>
                      <span frBadge variant="secondary">6 open</span>
                    </div>
                    <div class="grid gap-3">
                      @for (task of shellTasks; track task.title) {
                        <div class="flex items-start justify-between gap-3 border border-border bg-muted p-3">
                          <span class="grid gap-1">
                            <span class="text-sm font-semibold">{{ task.title }}</span>
                            <span class="text-xs leading-5 text-muted-foreground">{{ task.detail }}</span>
                          </span>
                          <span frBadge [variant]="task.variant">{{ task.status }}</span>
                        </div>
                      }
                    </div>
                  </section>

                  <aside class="grid content-start gap-3 border border-border bg-surface p-4">
                    <h3 class="m-0 text-base font-semibold">Alerts</h3>
                    @for (alert of shellAlerts; track alert.title) {
                      <div class="grid gap-1 border border-border bg-muted p-3">
                        <span class="text-sm font-semibold">{{ alert.title }}</span>
                        <span class="text-xs leading-5 text-muted-foreground">{{ alert.detail }}</span>
                      </div>
                    }
                  </aside>
                </div>
              </main>
            </div>
          </section>
        }

        @case ('order-fulfillment') {
          <section frCard spacing="xl" class="w-full max-w-5xl bg-surface/95">
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
          </section>
        }

        @case ('revenue-snapshot') {
          <section frCard spacing="xl" class="w-full max-w-4xl bg-surface/95">
            <div frCardContent class="grid gap-6">
              <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div class="grid gap-1">
                  <p class="font-mono text-xs font-extrabold uppercase tracking-wider text-primary!">Invoices</p>
                  <h2 class="m-0 text-2xl font-bold leading-tight">Invoice tracker</h2>
                  <p class="m-0 text-sm leading-6 text-muted-foreground">See paid, overdue, and due invoices before finance closes the week.</p>
                </div>
                <span frBadge variant="success">On track</span>
              </div>

              <div
                class="grid gap-3"
                [ngClass]="device() === 'mobile' ? '' : 'md:grid-cols-3'"
              >
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
          </section>
        }

        @case ('review-queue') {
          <section frCard spacing="xl" class="w-full max-w-3xl bg-surface/95">
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
          </section>
        }

        @default {
          <section frCard spacing="xl" class="w-full max-w-5xl bg-surface/95">
            <div frCardContent class="grid gap-6">
              <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div class="grid gap-1">
                  <p class="font-mono text-xs font-extrabold uppercase tracking-wider text-primary!">Shop floor</p>
                  <h2 class="m-0 text-2xl font-bold leading-tight">Store overview</h2>
                  <p class="m-0 text-sm leading-6 text-muted-foreground">Watch today's orders, checkout conversion, inventory sync, and open support issues.</p>
                </div>
                <span frBadge variant="secondary">Updated 4 min ago</span>
              </div>

              <div
                class="grid gap-3"
                [ngClass]="device() === 'mobile' ? '' : 'md:grid-cols-4'"
              >
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

              <div
                class="grid gap-4"
                [ngClass]="device() === 'mobile' ? '' : 'lg:grid-cols-3'"
              >
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
                  <p class="m-0 text-sm leading-6 text-muted-foreground">Back-in-stock emails are driving most orders this morning.</p>
                </div>
              </div>
            </div>
          </section>
        }
      }
    </div>
  `,
})
export class DashboardBlockPreview {
  readonly device = input<DashboardBlockPreviewDevice>('desktop');
  readonly variant = input<DashboardBlockVariant>('metrics-overview');
  protected readonly shellOpen = signal(false);

  protected readonly shellNavItems = [
    { label: 'Overview', icon: 'tablerHome', active: true, badge: null },
    { label: 'Orders', icon: 'tablerShoppingBag', active: false, badge: '12' },
    { label: 'Customers', icon: 'tablerUsers', active: false, badge: null },
    { label: 'Alerts', icon: 'tablerBell', active: false, badge: '3' },
  ] as const;

  protected readonly shellMetrics = [
    { label: 'Orders', value: '248', detail: '32 ready to ship', icon: 'tablerShoppingBag' },
    { label: 'Revenue', value: '$18.4k', detail: 'Today so far', icon: 'tablerReceipt' },
    { label: 'Customers', value: '1,284', detail: '84 active now', icon: 'tablerUsers' },
  ] as const;

  protected readonly shellTasks = [
    { title: 'Pack express orders', detail: 'DHL pickup closes in 42 minutes.', status: 'Soon', variant: 'destructive' },
    { title: 'Review high-value return', detail: 'Monitor arm refund needs owner approval.', status: 'Review', variant: 'secondary' },
    { title: 'Restock desk lamps', detail: 'Berlin shelf is below reorder point.', status: 'Stock', variant: 'outline' },
  ] as const;

  protected readonly shellAlerts = [
    { title: 'Low stock', detail: 'Desk lamp black has 6 units left.' },
    { title: 'Carrier delay', detail: 'UPS Ground missed one pickup window.' },
  ] as const;

  protected readonly healthMetrics = [
    { label: 'Orders today', value: '248', delta: '+12%', icon: 'tablerUsers' },
    { label: 'Checkout conversion', value: '7.4%', delta: '+8%', icon: 'tablerTrendingUp' },
    { label: 'Inventory sync', value: '99.9%', delta: 'Stable', icon: 'tablerDatabase' },
    { label: 'Support issues', value: '6', delta: '-2', icon: 'tablerFlag' },
  ];

  protected readonly revenueMetrics = [
    { label: 'Paid invoices', value: '$128.4k', detail: '42 invoices paid this month' },
    { label: 'Due this week', value: '$18.2k', detail: '14 invoices awaiting payment' },
    { label: 'Overdue', value: '$7.8k', detail: '3 customers need follow-up' },
  ];

  protected readonly revenueLines = [
    { label: 'Invoices paid', value: 82 },
    { label: 'Payment collection', value: 68 },
    { label: 'Tax review ready', value: 91 },
  ];

  protected readonly reviewItems = [
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
  ] as const;

  protected readonly orderColumns = ['order', 'items', 'status', 'delivery', 'actions'];
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
  }
}
