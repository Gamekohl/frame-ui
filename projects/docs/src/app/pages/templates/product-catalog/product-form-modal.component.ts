import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FrButtonModule } from '@frame-ui-ng/components/button';
import { FrInputModule } from '@frame-ui-ng/components/input';
import { FR_MODAL_DATA, FrModalModule, FrModalRef } from '@frame-ui-ng/components/modal';
import { FrSelectModule } from '@frame-ui-ng/components/select';
import { FrTextareaModule } from '@frame-ui-ng/components/textarea';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { tablerChevronDown, tablerPackage, tablerX } from '@ng-icons/tabler-icons';

import {
  PRODUCT_CATEGORIES,
  PRODUCT_STATUSES,
  PRODUCT_SUPPLIERS,
  PRODUCT_VISIBILITIES,
  type ProductFormValue,
  type ProductStatus,
  type ProductVisibility,
} from './product-catalog-template.data';

export type ProductFormModalData = {
  mode: 'create' | 'duplicate' | 'edit';
  product: ProductFormValue;
};

@Component({
  selector: 'docs-product-form-modal',
  imports: [
    FrButtonModule,
    FrInputModule,
    FrModalModule,
    FrSelectModule,
    FrTextareaModule,
    NgIcon,
  ],
  templateUrl: './product-form-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    provideIcons({
      tablerChevronDown,
      tablerPackage,
      tablerX,
    }),
  ],
})
export class ProductFormModalComponent {
  protected readonly data = inject<ProductFormModalData>(FR_MODAL_DATA);
  private readonly modalRef = inject(
    FrModalRef<ProductFormModalComponent, ProductFormValue | 'cancel'>,
  );

  protected readonly categories = PRODUCT_CATEGORIES;
  protected readonly statuses = PRODUCT_STATUSES;
  protected readonly suppliers = PRODUCT_SUPPLIERS;
  protected readonly visibilities = PRODUCT_VISIBILITIES;

  protected readonly name = signal(this.data.product.name);
  protected readonly sku = signal(this.data.product.sku);
  protected readonly category = signal(this.data.product.category);
  protected readonly price = signal(this.data.product.price);
  protected readonly stock = signal(this.data.product.stock);
  protected readonly status = signal<ProductStatus>(this.data.product.status);
  protected readonly visibility = signal<ProductVisibility>(this.data.product.visibility);
  protected readonly supplier = signal<string | null>(this.data.product.supplier || null);
  protected readonly description = signal(this.data.product.description);

  protected readonly title =
    this.data.mode === 'edit'
      ? `Edit ${this.data.product.name}`
      : this.data.mode === 'duplicate'
        ? 'Duplicate product'
        : 'Add product';

  protected setString(target: 'name' | 'sku' | 'description', event: Event): void {
    const value = (event.target as HTMLInputElement | HTMLTextAreaElement | null)?.value ?? '';

    if (target === 'name') {
      this.name.set(value);
      return;
    }

    if (target === 'sku') {
      this.sku.set(value);
      return;
    }

    this.description.set(value);
  }

  protected setNumber(target: 'price' | 'stock', event: Event): void {
    const value = Number((event.target as HTMLInputElement | null)?.value ?? 0);
    const nextValue = Number.isFinite(value) ? value : 0;

    if (target === 'price') {
      this.price.set(nextValue);
      return;
    }

    this.stock.set(Math.max(0, Math.round(nextValue)));
  }

  protected setCategory(value: string | null): void {
    if (value) {
      this.category.set(value);
    }
  }

  protected setStatus(value: string | null): void {
    if (value === 'Active' || value === 'Draft' || value === 'Archived') {
      this.status.set(value);
    }
  }

  protected setSupplier(value: string | null): void {
    this.supplier.set(value);
  }

  protected setVisibility(value: string | null): void {
    if (value === 'Storefront' || value === 'Hidden') {
      this.visibility.set(value);
    }
  }

  protected save(): void {
    this.modalRef.close({
      name: this.name().trim() || 'Untitled product',
      sku: this.sku().trim() || 'SKU-PENDING',
      category: this.category(),
      price: Math.max(0, this.price()),
      stock: Math.max(0, this.stock()),
      status: this.status(),
      visibility: this.visibility(),
      supplier: this.supplier()?.trim() || 'Unassigned supplier',
      description: this.description().trim(),
    });
  }

  protected cancel(): void {
    this.modalRef.close('cancel');
  }
}
