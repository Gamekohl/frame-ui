import { SelectionModel } from '@angular/cdk/collections';
import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  TemplateRef,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { FrAlertModule } from '@frame-ui-ng/components/alert';
import { FrAvatarModule } from '@frame-ui-ng/components/avatar';
import { FrBadgeModule } from '@frame-ui-ng/components/badge';
import { FrBreadcrumbModule } from '@frame-ui-ng/components/breadcrumb';
import { FrButtonModule } from '@frame-ui-ng/components/button';
import { FrCheckboxModule } from '@frame-ui-ng/components/checkbox';
import { FrConfirmModalService } from '@frame-ui-ng/components/confirm-modal';
import { FrDropdownMenuModule } from '@frame-ui-ng/components/dropdown-menu';
import { FrEmptyModule } from '@frame-ui-ng/components/empty';
import { FrInputModule } from '@frame-ui-ng/components/input';
import { FrModalService } from '@frame-ui-ng/components/modal';
import { FrSheetModule, FrSheetService } from '@frame-ui-ng/components/sheet';
import { FrSidebarModule } from '@frame-ui-ng/components/sidebar';
import { FrTableModule } from '@frame-ui-ng/components/table';
import { FrTabsModule } from '@frame-ui-ng/components/tabs';
import { FrToastModule, FrToastService } from '@frame-ui-ng/components/toast';
import { FrTooltipModule } from '@frame-ui-ng/components/tooltip';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  tablerActivity,
  tablerAlertTriangle,
  tablerBan,
  tablerBell,
  tablerBrandGithub,
  tablerBuildingStore,
  tablerChevronDown,
  tablerCircleCheck,
  tablerClock,
  tablerCreditCard,
  tablerDatabase,
  tablerDots,
  tablerEye,
  tablerFileText,
  tablerHome,
  tablerLayoutBoard,
  tablerLayoutSidebar,
  tablerPackage,
  tablerPackageExport,
  tablerPlayerPlay,
  tablerPrinter,
  tablerSearch,
  tablerSettings,
  tablerShieldLock,
  tablerTruckDelivery,
  tablerUsers,
  tablerX,
} from '@ng-icons/tabler-icons';

import { CommerceAdminAuditStore } from '../shared/commerce-admin-audit.store';
import { OrderShipmentModalComponent } from './order-shipment-modal.component';
import {
  ADMIN_NAV,
  INITIAL_ORDERS,
  MAIN_NAV,
  ORDER_COLUMNS,
  ORDER_STATUSES,
  type CommerceOrder,
  type OrderStatus,
  type ShipmentValue,
} from './orders-template.data';

@Component({
  selector: 'docs-orders-template-page',
  imports: [
    FrAlertModule,
    FrAvatarModule,
    FrBadgeModule,
    FrBreadcrumbModule,
    FrButtonModule,
    FrCheckboxModule,
    FrDropdownMenuModule,
    FrEmptyModule,
    FrInputModule,
    FrSheetModule,
    FrSidebarModule,
    FrTableModule,
    FrTabsModule,
    FrToastModule,
    FrTooltipModule,
    NgClass,
    NgIcon,
    RouterLink,
  ],
  templateUrl: './orders-template.page.html',
  styleUrl: './orders-template.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    provideIcons({
      tablerActivity,
      tablerAlertTriangle,
      tablerBan,
      tablerBell,
      tablerBrandGithub,
      tablerBuildingStore,
      tablerChevronDown,
      tablerCircleCheck,
      tablerClock,
      tablerCreditCard,
      tablerDatabase,
      tablerDots,
      tablerEye,
      tablerFileText,
      tablerHome,
      tablerLayoutBoard,
      tablerLayoutSidebar,
      tablerPackage,
      tablerPackageExport,
      tablerPlayerPlay,
      tablerPrinter,
      tablerSearch,
      tablerSettings,
      tablerShieldLock,
      tablerTruckDelivery,
      tablerUsers,
      tablerX,
    }),
  ],
})
export class OrdersTemplatePage {
  private readonly modal = inject(FrModalService);
  private readonly confirmModal = inject(FrConfirmModalService);
  private readonly sheet = inject(FrSheetService);
  private readonly toast = inject(FrToastService);
  private readonly audit = inject(CommerceAdminAuditStore);
  private readonly destroyRef = inject(DestroyRef);
  private readonly orderDetailsSheet =
    viewChild.required<TemplateRef<unknown>>('orderDetailsSheet');

  protected readonly toastCloseIcon = tablerX;
  protected readonly mainNav = MAIN_NAV;
  protected readonly adminNav = ADMIN_NAV;
  protected readonly columns = ORDER_COLUMNS;
  protected readonly statuses = ORDER_STATUSES;
  protected readonly selection = new SelectionModel<string>(true);
  protected readonly orders = signal<CommerceOrder[]>([...INITIAL_ORDERS]);
  protected readonly statusFilter = signal<(typeof ORDER_STATUSES)[number]>('All orders');
  protected readonly searchTerm = signal('');
  protected readonly selectedOrderId = signal(INITIAL_ORDERS[0].id);
  protected readonly recentlyChangedOrderId = signal<string | null>(null);

  protected readonly filteredOrders = computed(() => {
    const search = this.searchTerm().trim().toLowerCase();
    const status = this.statusFilter();

    return this.orders().filter((order) => {
      const matchesStatus = status === 'All orders' || order.status === status;
      const matchesSearch =
        !search ||
        `${order.id} ${order.customer} ${order.email} ${order.items.map((item) => item.name).join(' ')}`
          .toLowerCase()
          .includes(search);

      return matchesStatus && matchesSearch;
    });
  });

  protected readonly selectedOrder = computed(
    () => this.orders().find((order) => order.id === this.selectedOrderId()) ?? this.orders()[0],
  );

  protected readonly queueMetrics = computed(() => [
    {
      label: 'Payment review',
      value: this.orders().filter((order) => order.status === 'Payment review').length,
      detail: 'Requires a decision',
    },
    {
      label: 'Ready to pick',
      value: this.orders().filter((order) => order.status === 'Ready to pick').length,
      detail: 'Open pick lists',
    },
    {
      label: 'Packing',
      value: this.orders().filter((order) => order.status === 'Packing').length,
      detail: 'At packing benches',
    },
  ]);

  protected setSearch(event: Event): void {
    this.searchTerm.set((event.target as HTMLInputElement | null)?.value ?? '');
  }

  protected setStatus(value: string | null): void {
    if (ORDER_STATUSES.includes(value as (typeof ORDER_STATUSES)[number])) {
      this.statusFilter.set(value as (typeof ORDER_STATUSES)[number]);
      this.selection.clear();
    }
  }

  protected resetFilters(): void {
    this.searchTerm.set('');
    this.statusFilter.set('All orders');
    this.selection.clear();
  }

  protected openOrderDetails(order: CommerceOrder): void {
    this.selectedOrderId.set(order.id);
    this.sheet.open(this.orderDetailsSheet(), {
      ariaLabel: `${order.id} details`,
      side: 'right',
      width: '28rem',
    });
  }

  protected approvePayment(order: CommerceOrder): void {
    this.updateOrder(order.id, { payment: 'Paid', status: 'Ready to pick' });
    this.recordOrderChange(
      order,
      'Approved payment',
      `${order.id} cleared payment review and entered the pick queue.`,
      [
        { label: 'Payment', before: order.payment, after: 'Paid' },
        { label: 'Fulfillment', before: order.status, after: 'Ready to pick' },
      ],
    );
  }

  protected startPacking(order: CommerceOrder): void {
    if (order.status !== 'Ready to pick') {
      return;
    }

    this.updateOrder(order.id, { status: 'Packing' });
    this.recordOrderChange(
      order,
      'Started packing order',
      `${order.id} was assigned to the packing queue.`,
      [{ label: 'Fulfillment', before: order.status, after: 'Packing' }],
    );
  }

  protected shipOrder(order: CommerceOrder): void {
    if (order.status !== 'Packing') {
      return;
    }

    const modalRef = this.modal.open(OrderShipmentModalComponent, order, {
      ariaLabel: `Ship ${order.id}`,
      width: 'min(34rem, calc(100vw - 2rem))',
      height: '34rem',
    });

    modalRef.closed.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((result) => {
      if (!result || result === 'cancel') {
        return;
      }

      const shipment = result as ShipmentValue;
      this.updateOrder(order.id, {
        status: 'Shipped',
        carrier: shipment.carrier,
        tracking: shipment.tracking,
      });
      this.recordOrderChange(
        order,
        'Shipped order',
        `${order.id} was handed to ${shipment.carrier}.`,
        [
          { label: 'Fulfillment', before: order.status, after: 'Shipped' },
          { label: 'Tracking', before: '-', after: shipment.tracking },
        ],
      );
    });
  }

  protected cancelOrder(order: CommerceOrder): void {
    if (order.status === 'Shipped' || order.status === 'Cancelled') {
      return;
    }

    const modalRef = this.confirmModal.open({
      cancelLabel: 'Keep order',
      confirmLabel: 'Cancel order',
      description: `${order.id} will leave the fulfillment queue. Paid funds will be marked for refund.`,
      title: 'Cancel this order?',
    });

    modalRef.closed.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((result) => {
      if (result !== 'confirm') {
        return;
      }

      this.updateOrder(order.id, {
        status: 'Cancelled',
        payment: order.payment === 'Paid' ? 'Refunded' : order.payment,
      });
      this.recordOrderChange(
        order,
        'Cancelled order',
        `${order.id} was cancelled before shipment.`,
        [{ label: 'Fulfillment', before: order.status, after: 'Cancelled' }],
        'Review',
      );
    });
  }

  protected printPickLists(): void {
    const eligible = this.selectedOrders().filter((order) => order.status === 'Ready to pick');

    if (eligible.length === 0) {
      this.toast.warning('Select at least one order that is ready to pick.');
      return;
    }

    this.toast.success(
      `${eligible.length} pick ${eligible.length === 1 ? 'list' : 'lists'} prepared.`,
    );
    this.selection.clear();
  }

  protected bulkStartPacking(): void {
    const eligible = this.selectedOrders().filter((order) => order.status === 'Ready to pick');

    if (eligible.length === 0) {
      this.toast.warning('No selected orders can move to packing.');
      return;
    }

    const ids = new Set(eligible.map((order) => order.id));
    this.orders.update((orders) =>
      orders.map((order) => (ids.has(order.id) ? { ...order, status: 'Packing' } : order)),
    );
    this.recentlyChangedOrderId.set(eligible[0].id);
    this.audit.record({
      actor: 'Mika Stone',
      initials: 'MS',
      action: 'Started bulk packing',
      target: `${eligible.length} orders`,
      area: 'Orders',
      outcome: 'Success',
      summary: `${eligible.length} selected orders entered the packing queue.`,
      source: 'Order workspace',
      ipAddress: 'Current session',
      changes: [{ label: 'Fulfillment', before: 'Ready to pick', after: 'Packing' }],
    });
    this.selection.clear();
    this.toast.success(`${eligible.length} orders moved to packing.`);
  }

  protected toggleAllVisible(): void {
    const visibleIds = this.filteredOrders().map((order) => order.id);

    if (visibleIds.length > 0 && visibleIds.every((id) => this.selection.isSelected(id))) {
      this.selection.deselect(...visibleIds);
      return;
    }

    this.selection.select(...visibleIds);
  }

  protected allVisibleSelected(): boolean {
    const visibleIds = this.filteredOrders().map((order) => order.id);
    return visibleIds.length > 0 && visibleIds.every((id) => this.selection.isSelected(id));
  }

  protected headerSelectionIndeterminate(): boolean {
    return this.selection.hasValue() && !this.allVisibleSelected();
  }

  protected statusVariant(
    status: OrderStatus,
  ): 'destructive' | 'outline' | 'secondary' | 'success' {
    if (status === 'Shipped') {
      return 'success';
    }

    if (status === 'Cancelled') {
      return 'destructive';
    }

    if (status === 'Payment review') {
      return 'outline';
    }

    return 'secondary';
  }

  protected paymentVariant(
    payment: CommerceOrder['payment'],
  ): 'destructive' | 'outline' | 'secondary' | 'success' {
    if (payment === 'Paid' || payment === 'Authorized') {
      return 'success';
    }

    if (payment === 'Refunded') {
      return 'secondary';
    }

    return 'destructive';
  }

  protected orderItemCount(order: CommerceOrder): number {
    return order.items.reduce((total, item) => total + item.quantity, 0);
  }

  protected orderTotal(value: number): string {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  }

  private selectedOrders(): CommerceOrder[] {
    const ids = new Set(this.selection.selected);
    return this.orders().filter((order) => ids.has(order.id));
  }

  private updateOrder(orderId: string, patch: Partial<CommerceOrder>): void {
    this.orders.update((orders) =>
      orders.map((order) => (order.id === orderId ? { ...order, ...patch } : order)),
    );
    this.selectedOrderId.set(orderId);
    this.recentlyChangedOrderId.set(orderId);
  }

  private recordOrderChange(
    order: CommerceOrder,
    action: string,
    summary: string,
    changes: { label: string; before: string; after: string }[],
    outcome: 'Success' | 'Review' = 'Success',
  ): void {
    this.audit.record({
      actor: 'Mika Stone',
      initials: 'MS',
      action,
      target: order.id,
      area: 'Orders',
      outcome,
      summary,
      source: 'Order workspace',
      ipAddress: 'Current session',
      changes,
    });
    this.toast.success(summary);
  }
}
