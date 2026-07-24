import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FrBadgeModule } from '@frame-ui-ng/components/badge';
import { FrButtonModule } from '@frame-ui-ng/components/button';
import { FrInputModule } from '@frame-ui-ng/components/input';
import { FR_MODAL_DATA, FrModalModule, FrModalRef } from '@frame-ui-ng/components/modal';
import { FrSelectModule } from '@frame-ui-ng/components/select';
import { FrTextareaModule } from '@frame-ui-ng/components/textarea';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { tablerChevronDown, tablerTruckDelivery, tablerX } from '@ng-icons/tabler-icons';

import { PRODUCT_SUPPLIERS, type CatalogProduct } from './product-catalog-template.data';

export type ProductRestockModalData = {
  products: CatalogProduct[];
};

export type ProductRestockValue = {
  quantity: number;
  supplier: string | null;
  eta: string;
  reason: string;
  note: string;
  lines: ProductRestockLineValue[];
};

export type ProductRestockLineValue = {
  productId: number;
  quantity: number;
};

const KEEP_CURRENT_SUPPLIERS = 'Keep current suppliers';

const RESTOCK_ETAS = ['2 business days', 'Next supplier run', 'Next week', 'Needs buyer approval'];

const RESTOCK_REASONS = [
  'Low stock threshold',
  'Out-of-stock recovery',
  'Seasonal demand',
  'Launch buffer',
];

const SUMMARY_COLLAPSE_SCROLL_TOP = 120;
const SUMMARY_EXPAND_SCROLL_TOP = 48;

@Component({
  selector: 'docs-product-restock-modal',
  imports: [
    FrBadgeModule,
    FrButtonModule,
    FrInputModule,
    FrModalModule,
    FrSelectModule,
    FrTextareaModule,
    NgIcon,
  ],
  templateUrl: './product-restock-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    provideIcons({
      tablerChevronDown,
      tablerTruckDelivery,
      tablerX,
    }),
  ],
})
export class ProductRestockModalComponent {
  protected readonly data = inject<ProductRestockModalData>(FR_MODAL_DATA);
  private readonly modalRef = inject(
    FrModalRef<ProductRestockModalComponent, ProductRestockValue | 'cancel'>,
  );

  protected readonly products = this.data.products;
  protected readonly product = this.products[0];
  protected readonly isBulk = this.products.length > 1;
  protected readonly suppliers = this.isBulk
    ? [KEEP_CURRENT_SUPPLIERS, ...PRODUCT_SUPPLIERS]
    : PRODUCT_SUPPLIERS;
  protected readonly etas = RESTOCK_ETAS;
  protected readonly reasons = RESTOCK_REASONS;
  protected readonly lineQuantities = signal<Record<number, number>>(
    Object.fromEntries(
      this.products.map((product) => [product.id, this.recommendedQuantity(product)]),
    ),
  );

  protected readonly quantity = signal(this.recommendedQuantity(this.product));
  protected readonly supplier = signal(
    this.isBulk ? KEEP_CURRENT_SUPPLIERS : this.product.supplier || PRODUCT_SUPPLIERS[0],
  );
  protected readonly eta = signal(
    this.hasOutOfStockProducts() ? '2 business days' : 'Next supplier run',
  );
  protected readonly reason = signal(
    this.hasOutOfStockProducts() ? 'Out-of-stock recovery' : 'Low stock threshold',
  );
  protected readonly note = signal('');
  protected readonly summaryCompact = signal(false);

  protected readonly currentStock = computed(() =>
    this.products.reduce((sum, product) => sum + product.stock, 0),
  );

  protected readonly restockLines = computed(() =>
    this.products.map((product) => {
      const quantity = this.isBulk
        ? Math.max(0, Math.round(this.lineQuantities()[product.id] ?? 0))
        : Math.max(0, Math.round(this.quantity()));

      return {
        product,
        quantity,
        value: quantity * product.price,
      };
    }),
  );

  protected readonly totalIncoming = computed(() =>
    this.restockLines().reduce((sum, line) => sum + line.quantity, 0),
  );

  protected readonly projectedStock = computed(() => this.currentStock() + this.totalIncoming());

  protected readonly orderValue = computed(() =>
    this.currency(this.restockLines().reduce((sum, line) => sum + line.value, 0)),
  );

  protected setQuantity(event: Event): void {
    const value = Number((event.target as HTMLInputElement | null)?.value ?? 0);

    this.quantity.set(Number.isFinite(value) ? Math.max(0, Math.round(value)) : 0);
  }

  protected setSummaryCompact(event: Event): void {
    const scrollTop = (event.target as HTMLElement | null)?.scrollTop ?? 0;

    if (this.summaryCompact()) {
      if (scrollTop < SUMMARY_EXPAND_SCROLL_TOP) {
        this.summaryCompact.set(false);
      }

      return;
    }

    if (scrollTop > SUMMARY_COLLAPSE_SCROLL_TOP) {
      this.summaryCompact.set(true);
    }
  }

  protected setLineQuantity(productId: number, event: Event): void {
    const value = Number((event.target as HTMLInputElement | null)?.value ?? 0);
    const quantity = Number.isFinite(value) ? Math.max(0, Math.round(value)) : 0;

    this.lineQuantities.update((quantities) => ({
      ...quantities,
      [productId]: quantity,
    }));
  }

  protected setSupplier(value: string | null): void {
    if (value) {
      this.supplier.set(value);
    }
  }

  protected setEta(value: string | null): void {
    if (value) {
      this.eta.set(value);
    }
  }

  protected setReason(value: string | null): void {
    if (value) {
      this.reason.set(value);
    }
  }

  protected setNote(event: Event): void {
    this.note.set((event.target as HTMLTextAreaElement | null)?.value ?? '');
  }

  protected save(): void {
    if (this.totalIncoming() <= 0) {
      return;
    }

    this.modalRef.close({
      quantity: Math.round(this.quantity()),
      supplier: this.supplier() === KEEP_CURRENT_SUPPLIERS ? null : this.supplier(),
      eta: this.eta(),
      reason: this.reason(),
      note: this.note().trim(),
      lines: this.restockLines().map((line) => ({
        productId: line.product.id,
        quantity: line.quantity,
      })),
    });
  }

  protected cancel(): void {
    this.modalRef.close('cancel');
  }

  private recommendedQuantity(product: CatalogProduct): number {
    if (product.stock === 0) {
      return 36;
    }

    if (product.stock <= 10) {
      return 24;
    }

    return 12;
  }

  private hasOutOfStockProducts(): boolean {
    return this.products.some((product) => product.stock === 0);
  }

  protected currency(value: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  }
}
