import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FrButtonModule } from '@frame-ui-ng/components/button';
import { FrCheckboxModule } from '@frame-ui-ng/components/checkbox';
import { FrInputModule } from '@frame-ui-ng/components/input';
import { FR_MODAL_DATA, FrModalModule, FrModalRef } from '@frame-ui-ng/components/modal';
import { FrSelectModule } from '@frame-ui-ng/components/select';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { tablerChevronDown, tablerPackageExport, tablerX } from '@ng-icons/tabler-icons';

import { SHIPPING_CARRIERS, type CommerceOrder, type ShipmentValue } from './orders-template.data';

@Component({
  selector: 'docs-order-shipment-modal',
  imports: [FrButtonModule, FrCheckboxModule, FrInputModule, FrModalModule, FrSelectModule, NgIcon],
  templateUrl: './order-shipment-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [provideIcons({ tablerChevronDown, tablerPackageExport, tablerX })],
})
export class OrderShipmentModalComponent {
  protected readonly order = inject<CommerceOrder>(FR_MODAL_DATA);
  private readonly modalRef = inject(
    FrModalRef<OrderShipmentModalComponent, ShipmentValue | 'cancel'>,
  );

  protected readonly carriers = SHIPPING_CARRIERS;
  protected readonly carrier = signal<string | null>(this.order.carrier ?? 'DHL');
  protected readonly tracking = signal(this.order.tracking ?? '');
  protected readonly notifyCustomer = signal(true);

  protected setCarrier(value: string | null): void {
    this.carrier.set(value);
  }

  protected setTracking(event: Event): void {
    this.tracking.set((event.target as HTMLInputElement | null)?.value ?? '');
  }

  protected save(): void {
    this.modalRef.close({
      carrier: this.carrier() ?? 'DHL',
      tracking: this.tracking().trim() || `ACME-${this.order.id.replace('ORD-', '')}`,
      notifyCustomer: this.notifyCustomer(),
    });
  }

  protected cancel(): void {
    this.modalRef.close('cancel');
  }
}
