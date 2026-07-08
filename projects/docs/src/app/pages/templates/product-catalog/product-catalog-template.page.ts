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
import { FrAccordionModule } from '@frame-ui-ng/components/accordion';
import { FrAlertModule } from '@frame-ui-ng/components/alert';
import { FrAvatarModule } from '@frame-ui-ng/components/avatar';
import { FrBadgeModule } from '@frame-ui-ng/components/badge';
import { FrBreadcrumbModule } from '@frame-ui-ng/components/breadcrumb';
import { FrButtonModule } from '@frame-ui-ng/components/button';
import { FrCheckboxModule } from '@frame-ui-ng/components/checkbox';
import { FrCollapsibleModule } from '@frame-ui-ng/components/collapsible';
import { FrConfirmModalService } from '@frame-ui-ng/components/confirm-modal';
import { FrDropdownMenuModule } from '@frame-ui-ng/components/dropdown-menu';
import { FrHoverCardModule } from '@frame-ui-ng/components/hover-card';
import { FrInputModule } from '@frame-ui-ng/components/input';
import { FrModalService } from '@frame-ui-ng/components/modal';
import { FrPaginationModule } from '@frame-ui-ng/components/pagination';
import { FrPopoverModule } from '@frame-ui-ng/components/popover';
import { FrSheetModule, FrSheetService } from '@frame-ui-ng/components/sheet';
import { FrSidebarModule } from '@frame-ui-ng/components/sidebar';
import { FrTableModule } from '@frame-ui-ng/components/table';
import { FrTabsModule } from '@frame-ui-ng/components/tabs';
import { FrTooltipModule } from '@frame-ui-ng/components/tooltip';
import { FrToastModule, FrToastService } from '@frame-ui-ng/components/toast';
import { FrChart, type FrChartDatum, type FrChartSeries } from '@frame-ui-ng/charts';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  tablerActivity,
  tablerAdjustmentsHorizontal,
  tablerArchive,
  tablerBell,
  tablerBox,
  tablerBrandGithub,
  tablerBuildingStore,
  tablerChevronDown,
  tablerCircleCheck,
  tablerCopy,
  tablerCurrencyDollar,
  tablerDatabase,
  tablerDots,
  tablerEdit,
  tablerExclamationCircle,
  tablerFileText,
  tablerHome,
  tablerKey,
  tablerLayoutBoard,
  tablerLayoutGrid,
  tablerLayoutList,
  tablerLayoutSidebar,
  tablerPackage,
  tablerPlus,
  tablerSearch,
  tablerSettings,
  tablerShield,
  tablerShieldLock,
  tablerShoppingCart,
  tablerTags,
  tablerTruckDelivery,
  tablerUsers,
  tablerX,
} from '@ng-icons/tabler-icons';

import { ProductFormModalComponent } from './product-form-modal.component';
import {
  ProductRestockModalComponent,
  type ProductRestockValue,
} from './product-restock-modal.component';
import {
  ADMIN_NAV,
  CATALOG_PRODUCTS,
  MAIN_NAV,
  PRODUCT_CATEGORIES,
  PRODUCT_COLUMNS,
  STATUS_FILTERS,
  STOCK_FILTERS,
  type CatalogProduct,
  type CatalogViewMode,
  type ProductFormValue,
  type ProductStatus,
  type StockState,
} from './product-catalog-template.data';

@Component({
  selector: 'docs-product-catalog-template-page',
  imports: [
    FrAccordionModule,
    FrAlertModule,
    FrAvatarModule,
    FrBadgeModule,
    FrBreadcrumbModule,
    FrButtonModule,
    FrCheckboxModule,
    FrChart,
    FrCollapsibleModule,
    FrDropdownMenuModule,
    FrHoverCardModule,
    FrInputModule,
    FrPaginationModule,
    FrPopoverModule,
    FrSheetModule,
    FrSidebarModule,
    FrTableModule,
    FrTabsModule,
    FrTooltipModule,
    FrToastModule,
    RouterLink,
    NgClass,
    NgIcon,
  ],
  templateUrl: './product-catalog-template.page.html',
  styleUrl: './product-catalog-template.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    provideIcons({
      tablerActivity,
      tablerAdjustmentsHorizontal,
      tablerArchive,
      tablerBell,
      tablerBox,
      tablerBrandGithub,
      tablerBuildingStore,
      tablerChevronDown,
      tablerCircleCheck,
      tablerCopy,
      tablerCurrencyDollar,
      tablerDatabase,
      tablerDots,
      tablerEdit,
      tablerExclamationCircle,
      tablerFileText,
      tablerHome,
      tablerKey,
      tablerLayoutBoard,
      tablerLayoutGrid,
      tablerLayoutList,
      tablerLayoutSidebar,
      tablerPackage,
      tablerPlus,
      tablerSearch,
      tablerSettings,
      tablerShield,
      tablerShieldLock,
      tablerShoppingCart,
      tablerTags,
      tablerTruckDelivery,
      tablerUsers,
      tablerX,
    }),
  ],
})
export class ProductCatalogTemplatePage {
  private readonly modal = inject(FrModalService);
  private readonly confirmModal = inject(FrConfirmModalService);
  private readonly sheet = inject(FrSheetService);
  private readonly toast = inject(FrToastService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly productDetailsSheet =
    viewChild.required<TemplateRef<unknown>>('productDetailsSheet');

  protected readonly mainNav = MAIN_NAV;
  protected readonly adminNav = ADMIN_NAV;
  protected readonly productColumns = PRODUCT_COLUMNS;
  protected readonly categoryOptions = ['All categories', ...PRODUCT_CATEGORIES];
  protected readonly statusOptions = STATUS_FILTERS;
  protected readonly stockOptions = STOCK_FILTERS;
  protected readonly salesChartSeries: readonly FrChartSeries[] = [
    { key: 'units', label: 'Units sold' },
  ];
  protected readonly inventoryChartSeries: readonly FrChartSeries[] = [
    { key: 'stock', label: 'Stock on hand' },
  ];

  protected readonly products = signal<CatalogProduct[]>(CATALOG_PRODUCTS);
  protected readonly selectedProductId = signal(CATALOG_PRODUCTS[1].id);
  protected readonly viewMode = signal<CatalogViewMode>('table');
  protected readonly searchTerm = signal('');
  protected readonly categoryFilter = signal('All categories');
  protected readonly statusFilter = signal('All status');
  protected readonly stockFilter = signal('All stock');
  protected readonly recentlyChangedProductId = signal<number | null>(null);
  protected readonly selection = new SelectionModel<number>(true);

  protected readonly selectedProduct = computed(
    () => this.products().find((product) => product.id === this.selectedProductId()) ?? this.products()[0],
  );

  protected readonly filteredProducts = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    const category = this.categoryFilter();
    const status = this.statusFilter();
    const stock = this.stockFilter();

    return this.products().filter((product) => {
      const matchesTerm =
        term.length === 0 ||
        product.name.toLowerCase().includes(term) ||
        product.sku.toLowerCase().includes(term) ||
        product.supplier.toLowerCase().includes(term);
      const matchesCategory = category === 'All categories' || product.category === category;
      const matchesStatus = status === 'All status' || product.status === status;
      const matchesStock = stock === 'All stock' || this.stockState(product) === stock;

      return matchesTerm && matchesCategory && matchesStatus && matchesStock;
    });
  });

  protected readonly attentionProducts = computed(() =>
    this.filteredProducts().filter((product) => this.productIssues(product).length > 0),
  );

  protected readonly displayedProducts = computed(() =>
    this.viewMode() === 'attention' ? this.attentionProducts() : this.filteredProducts(),
  );

  protected readonly metrics = computed(() => {
    const products = this.products();

    return [
      {
        label: 'Active products',
        value: products.filter((product) => product.status === 'Active').length.toString(),
      },
      {
        label: 'Low stock',
        value: products.filter((product) => this.stockState(product) === 'Low stock').length.toString(),
      },
      {
        label: 'Drafts',
        value: products.filter((product) => product.status === 'Draft').length.toString(),
      },
      {
        label: 'Catalog value',
        value: this.currency(products.reduce((sum, product) => sum + product.price * product.stock, 0)),
      },
    ];
  });

  protected setViewMode(value: string | null): void {
    if (value === 'table' || value === 'grid' || value === 'attention') {
      this.viewMode.set(value);
    }
  }

  protected setSearch(event: Event): void {
    this.searchTerm.set((event.target as HTMLInputElement | null)?.value ?? '');
  }

  protected resetFilters(): void {
    this.searchTerm.set('');
    this.categoryFilter.set('All categories');
    this.statusFilter.set('All status');
    this.stockFilter.set('All stock');
  }

  protected selectProduct(product: CatalogProduct): void {
    this.selectedProductId.set(product.id);
  }

  protected openProductDetails(product: CatalogProduct): void {
    this.selectProduct(product);
    this.sheet.open(this.productDetailsSheet(), {
      ariaLabel: `${product.name} details`,
      side: 'right',
      width: '24rem',
    });
  }

  protected openCreateProduct(): void {
    this.openProductForm('create', {
      name: '',
      sku: '',
      category: PRODUCT_CATEGORIES[0],
      price: 0,
      stock: 0,
      status: 'Draft',
      visibility: 'Hidden',
      supplier: '',
      description: '',
    });
  }

  protected openEditProduct(product: CatalogProduct): void {
    this.selectProduct(product);
    const { id, updated, ...formValue } = product;
    this.openProductForm('edit', formValue, product.id);
  }

  protected duplicateProduct(product: CatalogProduct): void {
    this.selectProduct(product);
    this.openProductForm('duplicate', {
      ...product,
      name: `${product.name} copy`,
      sku: `${product.sku}-COPY`,
      status: 'Draft',
      visibility: 'Hidden',
    });
  }

  protected publishProduct(product: CatalogProduct): void {
    if (!this.canPublishProduct(product)) {
      this.toast.warning(`${product.name} cannot be published while it is out of stock.`);
      return;
    }

    const modalRef = this.confirmModal.open({
      cancelLabel: 'Cancel',
      confirmLabel: 'Publish',
      description: `${product.name} will become visible on the storefront.`,
      title: 'Publish product?',
    });

    modalRef.closed.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((result) => {
      if (result !== 'confirm') {
        return;
      }

      this.publishProductNow(product);
    });
  }

  protected archiveProduct(product: CatalogProduct): void {
    const modalRef = this.confirmModal.open({
      cancelLabel: 'Keep product',
      confirmLabel: 'Archive',
      description: `${product.name} will be hidden from the storefront and removed from active catalog work.`,
      title: 'Archive product?',
    });

    modalRef.closed.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((result) => {
      if (result !== 'confirm') {
        return;
      }

      this.archiveProductNow(product);
    });
  }

  protected restockProduct(product: CatalogProduct): void {
    this.selectProduct(product);

    const modalRef = this.modal.open(
      ProductRestockModalComponent,
      {
        products: [product],
      },
      {
        ariaLabel: `Schedule restock for ${product.name}`,
        width: 'min(38rem, calc(100vw - 2rem))',
        height: '42rem',
      },
    );

    modalRef.closed.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((result) => {
      if (!result || result === 'cancel') {
        return;
      }

      this.scheduleRestock(product, result as ProductRestockValue);
    });
  }

  protected bulkPublish(): void {
    const selectedProducts = this.selectedProducts();
    const publishableProducts = selectedProducts.filter((product) => this.canPublishProduct(product));
    const blockedCount = selectedProducts.length - publishableProducts.length;

    if (publishableProducts.length === 0) {
      this.toast.warning('No selected products can be published while they are out of stock.');
      return;
    }

    const modalRef = this.confirmModal.open({
      cancelLabel: 'Keep selected',
      confirmLabel: 'Publish',
      description:
        blockedCount > 0
          ? `${publishableProducts.length} products will be published. ${blockedCount} out-of-stock products will be skipped.`
          : `${publishableProducts.length} selected products will become visible on the storefront.`,
      title: 'Publish selected products?',
    });

    modalRef.closed.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((result) => {
      if (result !== 'confirm') {
        return;
      }

      const publishableIds = publishableProducts.map((product) => product.id);
      this.products.update((products) =>
        products.map((product) =>
          publishableIds.includes(product.id)
            ? { ...product, status: 'Active', visibility: 'Storefront', updated: 'Just now' }
            : product,
        ),
      );
      this.finishBulkAction(
        blockedCount > 0
          ? `Published ${publishableProducts.length} products. ${blockedCount} skipped.`
          : `Published ${publishableProducts.length} selected products.`,
      );
    });
  }

  protected bulkArchive(): void {
    const selectedProducts = this.selectedProducts();

    if (selectedProducts.length === 0) {
      return;
    }

    const modalRef = this.confirmModal.open({
      cancelLabel: 'Keep selected',
      confirmLabel: 'Archive',
      description: `${selectedProducts.length} selected products will be hidden from the storefront.`,
      title: 'Archive selected products?',
    });

    modalRef.closed.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((result) => {
      if (result !== 'confirm') {
        return;
      }

      const selectedIds = selectedProducts.map((product) => product.id);
      this.products.update((products) =>
        products.map((product) =>
          selectedIds.includes(product.id)
            ? { ...product, status: 'Archived', visibility: 'Hidden', updated: 'Just now' }
            : product,
        ),
      );
      this.finishBulkAction(`Archived ${selectedProducts.length} selected products.`);
    });
  }

  protected bulkRestock(): void {
    const selectedProducts = this.selectedProducts();

    if (selectedProducts.length === 0) {
      return;
    }

    const modalRef = this.modal.open(
      ProductRestockModalComponent,
      {
        products: selectedProducts,
      },
      {
        ariaLabel: 'Create restock plan for selected products',
        width: 'min(38rem, calc(100vw - 2rem))',
        height: '42rem',
      },
    );

    modalRef.closed.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((result) => {
      if (!result || result === 'cancel') {
        return;
      }

      this.scheduleBulkRestock(selectedProducts, result as ProductRestockValue);
    });
  }

  protected toggleAllVisible(): void {
    const visibleIds = this.displayedProducts().map((product) => product.id);

    if (this.allVisibleSelected()) {
      visibleIds.forEach((id) => this.selection.deselect(id));
      return;
    }

    visibleIds.forEach((id) => this.selection.select(id));
  }

  protected allVisibleSelected(): boolean {
    const visibleIds = this.displayedProducts().map((product) => product.id);

    return visibleIds.length > 0 && visibleIds.every((id) => this.selection.isSelected(id));
  }

  protected headerSelectionIndeterminate(): boolean {
    return this.selection.hasValue() && !this.allVisibleSelected();
  }

  protected stockState(product: CatalogProduct): StockState {
    if (product.stock === 0) {
      return 'Out of stock';
    }

    if (product.stock <= 10) {
      return 'Low stock';
    }

    return 'In stock';
  }

  protected productIssues(product: CatalogProduct): string[] {
    const issues: string[] = [];

    if (product.stock === 0) {
      issues.push('Out of stock');
    } else if (product.stock <= 10) {
      issues.push('Low stock');
    }

    if (product.status === 'Draft') {
      issues.push('Draft not published');
    }

    if (product.visibility === 'Hidden' && product.status === 'Active') {
      issues.push('Hidden from storefront');
    }

    if (product.description.trim().length === 0) {
      issues.push('Missing description');
    }

    return issues;
  }

  protected statusVariant(status: ProductStatus): 'destructive' | 'outline' | 'secondary' | 'success' {
    if (status === 'Active') {
      return 'success';
    }

    if (status === 'Archived') {
      return 'secondary';
    }

    return 'outline';
  }

  protected stockVariant(product: CatalogProduct): 'destructive' | 'secondary' | 'success' {
    const state = this.stockState(product);

    if (state === 'Out of stock') {
      return 'destructive';
    }

    if (state === 'Low stock') {
      return 'secondary';
    }

    return 'success';
  }

  protected currency(value: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  }

  protected salesChartData(product: CatalogProduct): readonly FrChartDatum[] {
    return this.salesSeries(product).map((units, index) => ({
      day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index],
      units,
    }));
  }

  protected inventoryChartData(product: CatalogProduct): readonly FrChartDatum[] {
    return this.inventorySeries(product).map((stock, index) => ({
      week: `W${index + 1}`,
      stock,
    }));
  }

  protected salesSeries(product: CatalogProduct): readonly number[] {
    if (product.status === 'Draft') {
      return Array.from({ length: 7 }, () => 0);
    }

    const base = Math.max(1, Math.round(product.price / 18));
    const stockPressure = product.stock === 0 ? 0 : product.stock <= 10 ? 2 : 4;

    return Array.from({ length: 7 }, (_, index) => {
      const seasonalLift = (product.id * 3 + index * 5) % 7;
      const weekendLift = index >= 5 ? 2 : 0;

      if (product.status === 'Archived' || product.visibility === 'Hidden') {
        return Math.max(0, Math.round((base + seasonalLift) / 3));
      }

      return Math.max(0, base + seasonalLift + stockPressure + weekendLift);
    });
  }

  protected inventorySeries(product: CatalogProduct): readonly number[] {
    const weeklySales = Math.max(1, Math.round(this.totalSales(this.salesSeries(product)) / 4));

    return Array.from({ length: 6 }, (_, index) => {
      const replenishment = index === 1 && product.stock <= 10 ? 18 : 0;
      const projectedStock = product.stock + replenishment - weeklySales * (5 - index);

      return Math.max(0, projectedStock);
    });
  }

  protected totalSales(values: readonly number[]): number {
    return values.reduce((sum, value) => sum + value, 0);
  }

  protected sellThroughRate(product: CatalogProduct): number {
    const unitsSold = this.totalSales(this.salesSeries(product));
    const availableUnits = unitsSold + product.stock;

    if (availableUnits === 0) {
      return 0;
    }

    return Math.min(99, Math.round((unitsSold / availableUnits) * 100));
  }

  protected returnRate(product: CatalogProduct): number {
    if (product.status === 'Draft') {
      return 0;
    }

    const categoryBaseline = product.category === 'Furniture' ? 6 : product.category === 'Accessories' ? 4 : 3;
    const stockAdjustment = product.stock === 0 ? 2 : product.stock <= 10 ? 1 : 0;

    return Math.min(12, categoryBaseline + stockAdjustment + (product.id % 3));
  }

  protected stockCoverage(product: CatalogProduct): number {
    const averageDailySales = Math.max(1, Math.round(this.totalSales(this.salesSeries(product)) / 7));

    return Math.max(0, Math.round((product.stock / (averageDailySales * 7)) * 10) / 10);
  }

  protected supplierLeadTime(product: CatalogProduct): string {
    const leadTimes: Record<string, string> = {
      'Northline Goods': '4-6 days',
      'Linear Systems': '7-10 days',
      'Kin & Co': '5-8 days',
      Portsmith: '10-14 days',
      'Quiet Field': '8-12 days',
      'Keyline Studio': '6-9 days',
      Soundyard: '12-16 days',
    };

    return leadTimes[product.supplier] ?? '7-10 days';
  }

  protected supplierOpenOrders(product: CatalogProduct): string {
    if (product.incomingStock) {
      return `${product.incomingOrder} · ${product.incomingStock} incoming`;
    }

    if (product.stock <= 10) {
      return 'No open order';
    }

    return 'No active replenishment';
  }

  private openProductForm(
    mode: 'create' | 'duplicate' | 'edit',
    product: ProductFormValue,
    productId?: number,
  ): void {
    const modalRef = this.modal.open(
      ProductFormModalComponent,
      {
        mode,
        product,
      },
      {
        ariaLabel:
          mode === 'edit'
            ? `Edit ${product.name}`
            : mode === 'duplicate'
              ? `Duplicate ${product.name}`
              : 'Add product',
        width: 'min(42rem, calc(100vw - 2rem))',
        height: '44rem',
      },
    );

    modalRef.closed.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((result) => {
      if (!result || result === 'cancel') {
        return;
      }

      const formValue = result as ProductFormValue;

      if (mode === 'create' || mode === 'duplicate') {
        const createdProduct = this.withGeneratedFields(formValue);
        this.products.update((products) => [createdProduct, ...products]);
        this.markChanged(
          createdProduct.id,
          mode === 'duplicate'
            ? `${createdProduct.name} was saved as a copy.`
            : `${createdProduct.name} was added to the catalog.`,
        );
        return;
      }

      if (productId) {
        this.updateProduct(productId, formValue);
        this.markChanged(productId, `${formValue.name} was updated.`);
      }
    });
  }

  private withGeneratedFields(product: ProductFormValue): CatalogProduct {
    const nextId = Math.max(...this.products().map((entry) => entry.id), 0) + 1;

    return {
      ...product,
      id: nextId,
      updated: 'Just now',
    };
  }

  private updateProduct(productId: number, patch: Partial<Omit<CatalogProduct, 'id'>>): void {
    this.products.update((products) =>
      products.map((product) =>
        product.id === productId ? { ...product, ...patch, updated: patch.updated ?? 'Just now' } : product,
      ),
    );
  }

  private scheduleRestock(product: CatalogProduct, value: ProductRestockValue): void {
    const incomingStock = Math.max(1, Math.round(value.quantity));
    const incomingSupplier = value.supplier ?? product.supplier;
    const incomingOrder = this.restockOrderNumber(product, incomingStock);

    this.updateProduct(product.id, {
      supplier: incomingSupplier,
      incomingStock,
      incomingEta: value.eta,
      incomingSupplier,
      incomingOrder,
      updated: 'Restock scheduled',
    });
    this.markChanged(
      product.id,
      `${incomingOrder}: ${incomingStock} units ordered from ${incomingSupplier}. ETA ${value.eta}.`,
    );
  }

  private scheduleBulkRestock(products: CatalogProduct[], value: ProductRestockValue): void {
    const lineQuantities = new Map(
      value.lines.map((line) => [line.productId, Math.max(0, Math.round(line.quantity))]),
    );
    const plannedProducts = products.filter((product) => (lineQuantities.get(product.id) ?? 0) > 0);
    const productIds = plannedProducts.map((product) => product.id);
    const totalIncoming = plannedProducts.reduce(
      (sum, product) => sum + (lineQuantities.get(product.id) ?? 0),
      0,
    );

    this.products.update((currentProducts) =>
      currentProducts.map((product) => {
        if (!productIds.includes(product.id)) {
          return product;
        }

        const incomingStock = lineQuantities.get(product.id) ?? 0;
        const incomingSupplier = value.supplier ?? product.supplier;

        return {
          ...product,
          supplier: incomingSupplier,
          incomingStock,
          incomingEta: value.eta,
          incomingSupplier,
          incomingOrder: this.restockOrderNumber(product, incomingStock),
          updated: 'Restock scheduled',
        };
      }),
    );
    this.finishBulkAction(
      `Created restock plan for ${plannedProducts.length} products (${totalIncoming} incoming units).`,
    );
  }

  private restockOrderNumber(product: CatalogProduct, quantity: number): string {
    const skuPrefix = product.sku.split('-').slice(0, 2).join('-');

    return `PO-${skuPrefix}-${product.id}${quantity}`;
  }

  private canPublishProduct(product: CatalogProduct): boolean {
    return product.stock > 0;
  }

  private publishProductNow(product: CatalogProduct): void {
    this.updateProduct(product.id, {
      status: 'Active',
      visibility: 'Storefront',
    });
    this.markChanged(product.id, `${product.name} is now active on the storefront.`);
  }

  private archiveProductNow(product: CatalogProduct): void {
    this.updateProduct(product.id, {
      status: 'Archived',
      visibility: 'Hidden',
    });
    this.selection.deselect(product.id);
    this.markChanged(product.id, `${product.name} was archived.`);
  }

  private selectedIds(): number[] {
    return this.selection.selected;
  }

  private selectedProducts(): CatalogProduct[] {
    const selectedIds = this.selectedIds();

    return this.products().filter((product) => selectedIds.includes(product.id));
  }

  private finishBulkAction(message: string): void {
    this.recentlyChangedProductId.set(this.selection.selected[0] ?? null);
    this.selection.clear();
    this.toast.success(message);
  }

  private markChanged(productId: number, message: string): void {
    this.selectedProductId.set(productId);
    this.recentlyChangedProductId.set(productId);
    this.toast.success(message);
  }
}
