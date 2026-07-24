import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FrButtonModule } from '@frame-ui-ng/components/button';
import { FrInputModule } from '@frame-ui-ng/components/input';
import { FrModalModule, FrModalRef } from '@frame-ui-ng/components/modal';
import { FrSelectModule } from '@frame-ui-ng/components/select';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { tablerChevronDown, tablerFilePlus, tablerX } from '@ng-icons/tabler-icons';

import {
  PURCHASABLE_PRODUCTS,
  SUPPLIERS,
  type NewPurchaseOrderValue,
} from './suppliers-template.data';

@Component({
  selector: 'docs-purchase-order-form-modal',
  imports: [FrButtonModule, FrInputModule, FrModalModule, FrSelectModule, NgIcon],
  templateUrl: './purchase-order-form-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [provideIcons({ tablerChevronDown, tablerFilePlus, tablerX })],
})
export class PurchaseOrderFormModalComponent {
  private readonly modalRef = inject(
    FrModalRef<PurchaseOrderFormModalComponent, NewPurchaseOrderValue | 'cancel'>,
  );

  protected readonly suppliers = SUPPLIERS;
  protected readonly products = PURCHASABLE_PRODUCTS;
  protected readonly supplierId = signal<string | null>(SUPPLIERS[0].id);
  protected readonly productSku = signal<string | null>(PURCHASABLE_PRODUCTS[0].sku);
  protected readonly quantity = signal(40);
  protected readonly expected = signal('2026-08-08');

  protected setSupplier(value: string | null): void {
    this.supplierId.set(value);
  }

  protected setProduct(value: string | null): void {
    this.productSku.set(value);
  }

  protected setQuantity(event: Event): void {
    const value = Number((event.target as HTMLInputElement | null)?.value ?? 0);
    this.quantity.set(Math.max(1, Number.isFinite(value) ? Math.round(value) : 1));
  }

  protected setExpected(event: Event): void {
    this.expected.set((event.target as HTMLInputElement | null)?.value ?? '');
  }

  protected save(): void {
    const product =
      this.products.find((entry) => entry.sku === this.productSku()) ?? this.products[0];

    this.modalRef.close({
      supplierId: this.supplierId() ?? this.suppliers[0].id,
      product: product.name,
      sku: product.sku,
      quantity: this.quantity(),
      unitCost: product.unitCost,
      expected: this.expected(),
    });
  }

  protected cancel(): void {
    this.modalRef.close('cancel');
  }
}
