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
import { FrConfirmModalService } from '@frame-ui-ng/components/confirm-modal';
import { FrDropdownMenuModule } from '@frame-ui-ng/components/dropdown-menu';
import { FrEmptyModule } from '@frame-ui-ng/components/empty';
import { FrHoverCardModule } from '@frame-ui-ng/components/hover-card';
import { FrInputModule } from '@frame-ui-ng/components/input';
import { FrModalService } from '@frame-ui-ng/components/modal';
import { FrProgressModule } from '@frame-ui-ng/components/progress';
import { FrSelectModule } from '@frame-ui-ng/components/select';
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
  tablerBell,
  tablerBrandGithub,
  tablerBuildingFactory,
  tablerBuildingStore,
  tablerChevronDown,
  tablerClock,
  tablerDatabase,
  tablerDots,
  tablerEye,
  tablerFilePlus,
  tablerFileText,
  tablerHome,
  tablerLayoutBoard,
  tablerLayoutSidebar,
  tablerMail,
  tablerPackageImport,
  tablerSearch,
  tablerSend,
  tablerSettings,
  tablerShieldLock,
  tablerTruckDelivery,
  tablerUsers,
  tablerX,
} from '@ng-icons/tabler-icons';

import { CommerceAdminAuditStore } from '../shared/commerce-admin-audit.store';
import { PurchaseOrderFormModalComponent } from './purchase-order-form-modal.component';
import { PurchaseOrderReceiveModalComponent } from './purchase-order-receive-modal.component';
import {
  ADMIN_NAV,
  INITIAL_PURCHASE_ORDERS,
  MAIN_NAV,
  PURCHASE_ORDER_COLUMNS,
  PURCHASE_ORDER_STATUSES,
  SUPPLIERS,
  type NewPurchaseOrderValue,
  type PurchaseOrder,
  type PurchaseOrderStatus,
  type ReceivePurchaseOrderValue,
  type Supplier,
  type SupplierStatus,
} from './suppliers-template.data';

@Component({
  selector: 'docs-suppliers-template-page',
  imports: [
    FrAlertModule,
    FrAvatarModule,
    FrBadgeModule,
    FrBreadcrumbModule,
    FrButtonModule,
    FrDropdownMenuModule,
    FrEmptyModule,
    FrHoverCardModule,
    FrInputModule,
    FrProgressModule,
    FrSelectModule,
    FrSheetModule,
    FrSidebarModule,
    FrTableModule,
    FrTabsModule,
    FrToastModule,
    FrTooltipModule,
    NgIcon,
    RouterLink,
  ],
  templateUrl: './suppliers-template.page.html',
  styleUrl: './suppliers-template.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    provideIcons({
      tablerActivity,
      tablerAlertTriangle,
      tablerBell,
      tablerBrandGithub,
      tablerBuildingFactory,
      tablerBuildingStore,
      tablerChevronDown,
      tablerClock,
      tablerDatabase,
      tablerDots,
      tablerEye,
      tablerFilePlus,
      tablerFileText,
      tablerHome,
      tablerLayoutBoard,
      tablerLayoutSidebar,
      tablerMail,
      tablerPackageImport,
      tablerSearch,
      tablerSend,
      tablerSettings,
      tablerShieldLock,
      tablerTruckDelivery,
      tablerUsers,
      tablerX,
    }),
  ],
})
export class SuppliersTemplatePage {
  private readonly modal = inject(FrModalService);
  private readonly confirmModal = inject(FrConfirmModalService);
  private readonly sheet = inject(FrSheetService);
  private readonly toast = inject(FrToastService);
  private readonly audit = inject(CommerceAdminAuditStore);
  private readonly destroyRef = inject(DestroyRef);
  private readonly purchaseOrderSheet =
    viewChild.required<TemplateRef<unknown>>('purchaseOrderSheet');

  protected readonly toastCloseIcon = tablerX;
  protected readonly mainNav = MAIN_NAV;
  protected readonly adminNav = ADMIN_NAV;
  protected readonly columns = PURCHASE_ORDER_COLUMNS;
  protected readonly statusOptions = PURCHASE_ORDER_STATUSES;
  protected readonly suppliers = SUPPLIERS;
  protected readonly purchaseOrders = signal<PurchaseOrder[]>([...INITIAL_PURCHASE_ORDERS]);
  protected readonly viewMode = signal<'orders' | 'suppliers'>('orders');
  protected readonly statusFilter = signal<(typeof PURCHASE_ORDER_STATUSES)[number]>('All status');
  protected readonly searchTerm = signal('');
  protected readonly selectedOrderId = signal(INITIAL_PURCHASE_ORDERS[0].id);

  protected readonly selectedOrder = computed(
    () =>
      this.purchaseOrders().find((order) => order.id === this.selectedOrderId()) ??
      this.purchaseOrders()[0],
  );

  protected readonly filteredOrders = computed(() => {
    const search = this.searchTerm().trim().toLowerCase();
    const status = this.statusFilter();

    return this.purchaseOrders().filter((order) => {
      const supplier = this.supplierById(order.supplierId);
      const matchesStatus = status === 'All status' || order.status === status;
      const matchesSearch =
        !search ||
        `${order.id} ${supplier?.name ?? ''} ${order.lines.map((line) => `${line.product} ${line.sku}`).join(' ')}`
          .toLowerCase()
          .includes(search);

      return matchesStatus && matchesSearch;
    });
  });

  protected readonly metrics = computed(() => {
    const openOrders = this.purchaseOrders().filter(
      (order) => order.status !== 'Received' && order.status !== 'Draft',
    );
    const openValue = openOrders.reduce((total, order) => total + this.orderTotalValue(order), 0);
    const incomingUnits = openOrders.reduce(
      (total, order) =>
        total +
        order.lines.reduce((lineTotal, line) => lineTotal + line.ordered - line.received, 0),
      0,
    );

    return [
      { label: 'Open purchase orders', value: openOrders.length, detail: this.currency(openValue) },
      { label: 'Incoming units', value: incomingUnits, detail: 'Across active orders' },
      {
        label: 'Supplier review',
        value: this.suppliers.filter((supplier) => supplier.status === 'Review').length,
        detail: 'Needs follow-up',
      },
    ];
  });

  protected setViewMode(value: string | null): void {
    if (value === 'orders' || value === 'suppliers') {
      this.viewMode.set(value);
    }
  }

  protected setStatus(value: string | null): void {
    if (PURCHASE_ORDER_STATUSES.includes(value as (typeof PURCHASE_ORDER_STATUSES)[number])) {
      this.statusFilter.set(value as (typeof PURCHASE_ORDER_STATUSES)[number]);
    }
  }

  protected setSearch(event: Event): void {
    this.searchTerm.set((event.target as HTMLInputElement | null)?.value ?? '');
  }

  protected resetFilters(): void {
    this.searchTerm.set('');
    this.statusFilter.set('All status');
  }

  protected createPurchaseOrder(): void {
    const modalRef = this.modal.open(PurchaseOrderFormModalComponent, undefined, {
      ariaLabel: 'Create purchase order',
      width: 'min(36rem, calc(100vw - 2rem))',
      height: '38rem',
    });

    modalRef.closed.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((result) => {
      if (!result || result === 'cancel') {
        return;
      }

      const value = result as NewPurchaseOrderValue;
      const nextId =
        Math.max(...this.purchaseOrders().map((order) => Number(order.id.replace('PO-', '')))) + 1;
      const order: PurchaseOrder = {
        id: `PO-${nextId}`,
        supplierId: value.supplierId,
        status: 'Draft',
        placed: 'Not sent',
        expected: this.formatDate(value.expected),
        lines: [
          {
            sku: value.sku,
            product: value.product,
            ordered: value.quantity,
            received: 0,
            unitCost: value.unitCost,
          },
        ],
        note: 'Draft created in the procurement workspace.',
      };

      this.purchaseOrders.update((orders) => [order, ...orders]);
      this.selectedOrderId.set(order.id);
      this.audit.record({
        actor: 'Mika Stone',
        initials: 'MS',
        action: 'Created purchase order',
        target: order.id,
        area: 'Procurement',
        outcome: 'Success',
        summary: `${order.id} was saved as a draft for ${this.supplierById(order.supplierId)?.name}.`,
        source: 'Procurement workspace',
        ipAddress: 'Current session',
        changes: [{ label: 'Status', before: '-', after: 'Draft' }],
      });
      this.toast.success(`${order.id} saved as a draft.`);
    });
  }

  protected openOrderDetails(order: PurchaseOrder): void {
    this.selectedOrderId.set(order.id);
    this.sheet.open(this.purchaseOrderSheet(), {
      ariaLabel: `${order.id} details`,
      side: 'right',
      width: '30rem',
    });
  }

  protected sendOrder(order: PurchaseOrder): void {
    if (order.status !== 'Draft') {
      return;
    }

    const supplier = this.supplierById(order.supplierId);
    const modalRef = this.confirmModal.open({
      cancelLabel: 'Keep draft',
      confirmLabel: 'Send order',
      description: `${order.id} will be emailed to ${supplier?.contact ?? 'the supplier'} for confirmation.`,
      title: 'Send purchase order?',
    });

    modalRef.closed.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((result) => {
      if (result !== 'confirm') {
        return;
      }

      this.updateOrder(order.id, { status: 'Sent', placed: 'Just now' });
      this.recordOrderChange(
        order,
        'Sent purchase order',
        `${order.id} was sent to ${supplier?.name}.`,
        [{ label: 'Status', before: 'Draft', after: 'Sent' }],
      );
    });
  }

  protected receiveOrder(order: PurchaseOrder): void {
    if (order.status === 'Draft' || order.status === 'Received') {
      return;
    }

    const modalRef = this.modal.open(PurchaseOrderReceiveModalComponent, order, {
      ariaLabel: `Receive ${order.id}`,
      width: 'min(42rem, calc(100vw - 2rem))',
      height: '42rem',
    });

    modalRef.closed.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((result) => {
      if (!result || result === 'cancel') {
        return;
      }

      const value = result as ReceivePurchaseOrderValue;
      const lines = order.lines.map((line) => ({
        ...line,
        received: Math.min(line.ordered, line.received + (value.quantities[line.sku] ?? 0)),
      }));
      const fullyReceived = lines.every((line) => line.received >= line.ordered);
      const receivedNow = Object.values(value.quantities).reduce(
        (total, quantity) => total + quantity,
        0,
      );
      const status: PurchaseOrderStatus = fullyReceived ? 'Received' : 'Partially received';

      this.updateOrder(order.id, {
        lines,
        status,
        note: value.note || order.note,
      });
      this.recordOrderChange(
        order,
        fullyReceived ? 'Completed goods receipt' : 'Recorded partial receipt',
        `${receivedNow} units were received against ${order.id}.`,
        [
          { label: 'Status', before: order.status, after: status },
          {
            label: 'Units received',
            before: String(this.receivedUnits(order)),
            after: String(this.receivedUnits({ ...order, lines })),
          },
        ],
        fullyReceived ? 'Success' : 'Review',
      );
    });
  }

  protected supplierById(supplierId: string): Supplier | undefined {
    return this.suppliers.find((supplier) => supplier.id === supplierId);
  }

  protected orderTotalValue(order: PurchaseOrder): number {
    return order.lines.reduce((total, line) => total + line.ordered * line.unitCost, 0);
  }

  protected receivedUnits(order: PurchaseOrder): number {
    return order.lines.reduce((total, line) => total + line.received, 0);
  }

  protected orderedUnits(order: PurchaseOrder): number {
    return order.lines.reduce((total, line) => total + line.ordered, 0);
  }

  protected receiptProgress(order: PurchaseOrder): number {
    const ordered = this.orderedUnits(order);
    return ordered === 0 ? 0 : Math.round((this.receivedUnits(order) / ordered) * 100);
  }

  protected currency(value: number): string {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  }

  protected statusVariant(
    status: PurchaseOrderStatus,
  ): 'destructive' | 'outline' | 'secondary' | 'success' {
    if (status === 'Received') {
      return 'success';
    }

    if (status === 'Overdue') {
      return 'destructive';
    }

    if (status === 'Partially received') {
      return 'outline';
    }

    return 'secondary';
  }

  protected supplierStatusVariant(status: SupplierStatus): 'destructive' | 'secondary' | 'success' {
    if (status === 'Preferred') {
      return 'success';
    }

    if (status === 'Review') {
      return 'destructive';
    }

    return 'secondary';
  }

  private updateOrder(orderId: string, patch: Partial<PurchaseOrder>): void {
    this.purchaseOrders.update((orders) =>
      orders.map((order) => (order.id === orderId ? { ...order, ...patch } : order)),
    );
    this.selectedOrderId.set(orderId);
  }

  private recordOrderChange(
    order: PurchaseOrder,
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
      area: 'Procurement',
      outcome,
      summary,
      source: 'Procurement workspace',
      ipAddress: 'Current session',
      changes,
    });
    this.toast.success(summary);
  }

  private formatDate(value: string): string {
    const date = new Date(`${value}T12:00:00`);
    return Number.isNaN(date.getTime())
      ? value
      : new Intl.DateTimeFormat('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }).format(date);
  }
}
