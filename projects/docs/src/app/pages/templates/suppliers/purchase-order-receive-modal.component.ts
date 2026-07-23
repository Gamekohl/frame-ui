import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FrAlertModule } from '@frame-ui-ng/components/alert';
import { FrButtonModule } from '@frame-ui-ng/components/button';
import { FrInputModule } from '@frame-ui-ng/components/input';
import { FR_MODAL_DATA, FrModalModule, FrModalRef } from '@frame-ui-ng/components/modal';
import { FrTextareaModule } from '@frame-ui-ng/components/textarea';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { tablerAlertTriangle, tablerPackageImport, tablerX } from '@ng-icons/tabler-icons';

import { type PurchaseOrder, type ReceivePurchaseOrderValue } from './suppliers-template.data';

@Component({
  selector: 'docs-purchase-order-receive-modal',
  imports: [FrAlertModule, FrButtonModule, FrInputModule, FrModalModule, FrTextareaModule, NgIcon],
  templateUrl: './purchase-order-receive-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [provideIcons({ tablerAlertTriangle, tablerPackageImport, tablerX })],
})
export class PurchaseOrderReceiveModalComponent {
  protected readonly order = inject<PurchaseOrder>(FR_MODAL_DATA);
  private readonly modalRef = inject(
    FrModalRef<PurchaseOrderReceiveModalComponent, ReceivePurchaseOrderValue | 'cancel'>,
  );

  protected readonly quantities = signal<Record<string, number>>(
    Object.fromEntries(this.order.lines.map((line) => [line.sku, line.ordered - line.received])),
  );
  protected readonly note = signal('');

  protected remaining(line: PurchaseOrder['lines'][number]): number {
    return Math.max(0, line.ordered - line.received);
  }

  protected setQuantity(sku: string, remaining: number, event: Event): void {
    const rawValue = Number((event.target as HTMLInputElement | null)?.value ?? 0);
    const value = Math.min(
      remaining,
      Math.max(0, Number.isFinite(rawValue) ? Math.round(rawValue) : 0),
    );
    this.quantities.update((quantities) => ({ ...quantities, [sku]: value }));
  }

  protected setNote(event: Event): void {
    this.note.set((event.target as HTMLTextAreaElement | null)?.value ?? '');
  }

  protected hasVariance(): boolean {
    return this.order.lines.some((line) => this.quantities()[line.sku] !== this.remaining(line));
  }

  protected save(): void {
    this.modalRef.close({ quantities: this.quantities(), note: this.note().trim() });
  }

  protected cancel(): void {
    this.modalRef.close('cancel');
  }
}
