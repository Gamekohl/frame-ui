import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FrBadgeModule } from '@frame-ui-ng/components/badge';
import { FrButtonModule } from '@frame-ui-ng/components/button';
import { FrInputModule } from '@frame-ui-ng/components/input';
import { FR_MODAL_DATA, FrModalModule, FrModalRef } from '@frame-ui-ng/components/modal';
import { FrSelectModule } from '@frame-ui-ng/components/select';
import { FrTextareaModule } from '@frame-ui-ng/components/textarea';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  tablerChevronDown,
  tablerClipboardCheck,
  tablerDatabase,
  tablerTruckDelivery,
} from '@ng-icons/tabler-icons';

import {
  type InventoryActionMode,
  type InventoryItem,
  type InventoryLocation,
  type InventoryLocationKey,
} from './inventory-template.data';

export type InventoryActionModalData = {
  mode: InventoryActionMode;
  item: InventoryItem;
  locations: InventoryLocation[];
};

export type InventoryActionValue =
  | {
      mode: 'transfer';
      from: InventoryLocationKey;
      to: InventoryLocationKey;
      quantity: number;
      note: string;
    }
  | {
      mode: 'count';
      location: InventoryLocationKey;
      counted: number;
      note: string;
    }
  | {
      mode: 'hold';
      location: InventoryLocationKey;
      quantity: number;
      reason: string;
      note: string;
    };

const HOLD_REASONS = ['QA inspection', 'Damaged packaging', 'Customer claim', 'Missing label'];

@Component({
  selector: 'docs-inventory-action-modal',
  imports: [
    FrBadgeModule,
    FrButtonModule,
    FrInputModule,
    FrModalModule,
    FrSelectModule,
    FrTextareaModule,
    NgIcon,
  ],
  templateUrl: './inventory-action-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    provideIcons({
      tablerChevronDown,
      tablerClipboardCheck,
      tablerDatabase,
      tablerTruckDelivery,
    }),
  ],
})
export class InventoryActionModalComponent {
  protected readonly data = inject<InventoryActionModalData>(FR_MODAL_DATA);
  private readonly modalRef = inject(
    FrModalRef<InventoryActionModalComponent, InventoryActionValue | 'cancel'>,
  );

  protected readonly holdReasons = HOLD_REASONS;
  protected readonly from = signal<InventoryLocationKey>('main');
  protected readonly to = signal<InventoryLocationKey>('retail');
  protected readonly location = signal<InventoryLocationKey>('main');
  protected readonly quantity = signal(1);
  protected readonly counted = signal(this.data.item.locations.main);
  protected readonly reason = signal(HOLD_REASONS[0]);
  protected readonly note = signal('');

  protected readonly title = computed(() => {
    if (this.data.mode === 'transfer') {
      return `Transfer ${this.data.item.name}`;
    }

    if (this.data.mode === 'count') {
      return `Count ${this.data.item.name}`;
    }

    return `Hold ${this.data.item.name}`;
  });

  protected readonly description = computed(() => {
    if (this.data.mode === 'transfer') {
      return 'Move stock between locations without changing total inventory.';
    }

    if (this.data.mode === 'count') {
      return 'Reconcile the system quantity with a physical count.';
    }

    return 'Reserve units that should not be promised to customers.';
  });

  protected readonly icon = computed(() => {
    if (this.data.mode === 'transfer') {
      return 'tablerTruckDelivery';
    }

    if (this.data.mode === 'count') {
      return 'tablerClipboardCheck';
    }

    return 'tablerDatabase';
  });

  protected readonly currentLocationStock = computed(
    () => this.data.item.locations[this.location()],
  );
  protected readonly fromStock = computed(() => this.data.item.locations[this.from()]);
  protected readonly countDelta = computed(() => this.counted() - this.currentLocationStock());

  protected setFrom(value: string | null): void {
    if (this.isLocationKey(value)) {
      this.from.set(value);
    }
  }

  protected setTo(value: string | null): void {
    if (this.isLocationKey(value)) {
      this.to.set(value);
    }
  }

  protected setLocation(value: string | null): void {
    if (this.isLocationKey(value)) {
      this.location.set(value);
      this.counted.set(this.data.item.locations[value]);
    }
  }

  protected setReason(value: string | null): void {
    if (value && HOLD_REASONS.includes(value)) {
      this.reason.set(value);
    }
  }

  protected setNumber(target: 'quantity' | 'counted', event: Event): void {
    const value = Number((event.target as HTMLInputElement | null)?.value ?? 0);
    const nextValue = Math.max(0, Number.isFinite(value) ? Math.round(value) : 0);

    if (target === 'quantity') {
      this.quantity.set(nextValue);
      return;
    }

    this.counted.set(nextValue);
  }

  protected setNote(event: Event): void {
    this.note.set((event.target as HTMLTextAreaElement | null)?.value ?? '');
  }

  protected canSave(): boolean {
    if (this.data.mode === 'transfer') {
      return (
        this.quantity() > 0 && this.from() !== this.to() && this.quantity() <= this.fromStock()
      );
    }

    if (this.data.mode === 'count') {
      return this.counted() >= 0;
    }

    return this.quantity() > 0 && this.quantity() <= this.currentLocationStock();
  }

  protected save(): void {
    if (!this.canSave()) {
      return;
    }

    if (this.data.mode === 'transfer') {
      this.modalRef.close({
        mode: 'transfer',
        from: this.from(),
        to: this.to(),
        quantity: this.quantity(),
        note: this.note().trim(),
      });
      return;
    }

    if (this.data.mode === 'count') {
      this.modalRef.close({
        mode: 'count',
        location: this.location(),
        counted: this.counted(),
        note: this.note().trim(),
      });
      return;
    }

    this.modalRef.close({
      mode: 'hold',
      location: this.location(),
      quantity: this.quantity(),
      reason: this.reason(),
      note: this.note().trim(),
    });
  }

  protected cancel(): void {
    this.modalRef.close('cancel');
  }

  private isLocationKey(value: string | null): value is InventoryLocationKey {
    return this.data.locations.some((location) => location.key === value);
  }
}
