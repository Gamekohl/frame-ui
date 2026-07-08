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
import { FrBadgeModule } from '@frame-ui-ng/components/badge';
import { FrBreadcrumbModule } from '@frame-ui-ng/components/breadcrumb';
import { FrButtonModule } from '@frame-ui-ng/components/button';
import { FrCollapsibleModule } from '@frame-ui-ng/components/collapsible';
import { FrDropdownMenuModule } from '@frame-ui-ng/components/dropdown-menu';
import { FrHoverCardModule } from '@frame-ui-ng/components/hover-card';
import { FrInputModule } from '@frame-ui-ng/components/input';
import { FrModalService } from '@frame-ui-ng/components/modal';
import { FrPopoverModule } from '@frame-ui-ng/components/popover';
import { FrSheetModule, FrSheetService } from '@frame-ui-ng/components/sheet';
import { FrSidebarModule } from '@frame-ui-ng/components/sidebar';
import { FrTableModule } from '@frame-ui-ng/components/table';
import { FrTooltipModule } from '@frame-ui-ng/components/tooltip';
import { FrToastModule, FrToastService } from '@frame-ui-ng/components/toast';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  tablerActivity,
  tablerAdjustmentsHorizontal,
  tablerBell,
  tablerBrandGithub,
  tablerBuildingStore,
  tablerChevronDown,
  tablerClipboardCheck,
  tablerDatabase,
  tablerDots,
  tablerExclamationCircle,
  tablerFileText,
  tablerHome,
  tablerKey,
  tablerLayoutBoard,
  tablerLayoutSidebar,
  tablerPackage,
  tablerSearch,
  tablerSettings,
  tablerShield,
  tablerShieldLock,
  tablerTruckDelivery,
  tablerUsers,
  tablerX,
} from '@ng-icons/tabler-icons';

import {
  InventoryActionModalComponent,
  type InventoryActionValue,
} from './inventory-action-modal.component';
import {
  ADMIN_NAV,
  INVENTORY_COLUMNS,
  INVENTORY_ITEMS,
  INVENTORY_LOCATIONS,
  INVENTORY_MOVEMENTS,
  MAIN_NAV,
  type InventoryActionMode,
  type InventoryItem,
  type InventoryLocation,
  type InventoryLocationKey,
  type InventoryMovement,
  type InventoryStatus,
} from './inventory-template.data';

@Component({
  selector: 'docs-inventory-template-page',
  imports: [
    FrAccordionModule,
    FrAlertModule,
    FrBadgeModule,
    FrBreadcrumbModule,
    FrButtonModule,
    FrCollapsibleModule,
    FrDropdownMenuModule,
    FrHoverCardModule,
    FrInputModule,
    FrPopoverModule,
    FrSheetModule,
    FrSidebarModule,
    FrTableModule,
    FrTooltipModule,
    FrToastModule,
    RouterLink,
    NgClass,
    NgIcon,
  ],
  templateUrl: './inventory-template.page.html',
  styleUrl: './inventory-template.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    provideIcons({
      tablerActivity,
      tablerAdjustmentsHorizontal,
      tablerBell,
      tablerBrandGithub,
      tablerBuildingStore,
      tablerChevronDown,
      tablerClipboardCheck,
      tablerDatabase,
      tablerDots,
      tablerExclamationCircle,
      tablerFileText,
      tablerHome,
      tablerKey,
      tablerLayoutBoard,
      tablerLayoutSidebar,
      tablerPackage,
      tablerSearch,
      tablerSettings,
      tablerShield,
      tablerShieldLock,
      tablerTruckDelivery,
      tablerUsers,
      tablerX,
    }),
  ],
})
export class InventoryTemplatePage {
  private readonly modal = inject(FrModalService);
  private readonly sheet = inject(FrSheetService);
  private readonly toast = inject(FrToastService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly operationsLogSheet =
    viewChild.required<TemplateRef<unknown>>('operationsLogSheet');

  protected readonly mainNav = MAIN_NAV;
  protected readonly adminNav = ADMIN_NAV;
  protected readonly columns = INVENTORY_COLUMNS;
  protected readonly locations = INVENTORY_LOCATIONS;
  protected readonly locationOptions = ['All locations', ...INVENTORY_LOCATIONS.map((location) => location.label)];
  protected readonly statusOptions = ['All status', 'Healthy', 'Low', 'Critical', 'On hold'];

  protected readonly items = signal<InventoryItem[]>(INVENTORY_ITEMS);
  protected readonly movements = signal<InventoryMovement[]>(INVENTORY_MOVEMENTS);
  protected readonly searchTerm = signal('');
  protected readonly locationFilter = signal('All locations');
  protected readonly statusFilter = signal('All status');
  protected readonly recentlyChangedItemId = signal<number | null>(null);

  protected readonly filteredItems = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    const location = this.locationFilter();
    const status = this.statusFilter();

    return this.items().filter((item) => {
      const matchesTerm =
        term.length === 0 ||
        item.name.toLowerCase().includes(term) ||
        item.sku.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term);
      const matchesLocation =
        location === 'All locations' ||
        this.stockAt(item, this.locationKeyByLabel(location)) > 0;
      const matchesStatus = status === 'All status' || this.status(item) === status;

      return matchesTerm && matchesLocation && matchesStatus;
    });
  });

  protected readonly metrics = computed(() => {
    const items = this.items();
    const onHand = items.reduce((sum, item) => sum + this.onHand(item), 0);
    const reserved = items.reduce((sum, item) => sum + item.reserved, 0);
    const hold = items.reduce((sum, item) => sum + item.hold, 0);
    const exceptions = items.filter((item) => this.status(item) !== 'Healthy').length;

    return [
      { label: 'On hand', value: onHand.toString(), detail: 'Total units in all locations' },
      { label: 'Available', value: Math.max(0, onHand - reserved - hold).toString(), detail: 'Ready to promise' },
      { label: 'Reserved', value: reserved.toString(), detail: 'Allocated to open orders' },
      { label: 'Exceptions', value: exceptions.toString(), detail: 'Low, critical, or held' },
    ];
  });

  protected readonly locationSummaries = computed(() =>
    this.locations.map((location) => {
      const units = this.items().reduce((sum, item) => sum + item.locations[location.key], 0);

      return {
        ...location,
        units,
        utilization: Math.min(100, Math.round((units / location.capacity) * 100)),
      };
    }),
  );

  protected readonly exceptionItems = computed(() =>
    this.items().filter((item) => this.status(item) !== 'Healthy'),
  );

  protected setSearch(event: Event): void {
    this.searchTerm.set((event.target as HTMLInputElement | null)?.value ?? '');
  }

  protected resetFilters(): void {
    this.searchTerm.set('');
    this.locationFilter.set('All locations');
    this.statusFilter.set('All status');
  }

  protected updateReorderPoint(item: InventoryItem, input: HTMLInputElement): void {
    const value = Number(input.value || item.reorderPoint);
    const reorderPoint = Math.max(0, Number.isFinite(value) ? Math.round(value) : item.reorderPoint);

    this.items.update((items) =>
      items.map((entry) =>
        entry.id === item.id
          ? {
              ...entry,
              reorderPoint,
              updated: 'Just now',
            }
          : entry,
      ),
    );
    this.recentlyChangedItemId.set(item.id);
    this.toast.success(`${item.name}: reorder point updated.`);
  }

  protected openOperationsLog(): void {
    this.sheet.open(this.operationsLogSheet(), {
      ariaLabel: 'Inventory operations log',
      side: 'right',
      width: '24rem',
    });
  }

  protected openAction(item: InventoryItem, mode: InventoryActionMode): void {
    const modalRef = this.modal.open(
      InventoryActionModalComponent,
      {
        mode,
        item,
        locations: this.locations,
      },
      {
        ariaLabel: `${mode} ${item.name}`,
        width: 'min(38rem, calc(100vw - 2rem))',
        height: '36rem',
      },
    );

    modalRef.closed.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((result) => {
      if (!result || result === 'cancel') {
        return;
      }

      this.applyInventoryAction(item, result as InventoryActionValue);
    });
  }

  protected onHand(item: InventoryItem): number {
    return Object.values(item.locations).reduce((sum, value) => sum + value, 0);
  }

  protected available(item: InventoryItem): number {
    return Math.max(0, this.onHand(item) - item.reserved - item.hold);
  }

  protected stockAt(item: InventoryItem, location: InventoryLocationKey): number {
    return item.locations[location];
  }

  protected status(item: InventoryItem): InventoryStatus {
    if (this.available(item) <= 0) {
      return 'Critical';
    }

    if (item.hold > 0) {
      return 'On hold';
    }

    if (this.available(item) <= item.reorderPoint) {
      return 'Low';
    }

    return 'Healthy';
  }

  protected statusVariant(status: InventoryStatus): 'destructive' | 'outline' | 'secondary' | 'success' {
    if (status === 'Healthy') {
      return 'success';
    }

    if (status === 'Critical') {
      return 'destructive';
    }

    if (status === 'On hold') {
      return 'secondary';
    }

    return 'outline';
  }

  protected movementVariant(type: InventoryMovement['type']): 'outline' | 'secondary' | 'success' {
    if (type === 'Transfer') {
      return 'success';
    }

    if (type === 'Hold') {
      return 'secondary';
    }

    return 'outline';
  }

  protected utilizationWidth(value: number): string {
    return `${Math.max(0, Math.min(100, value))}%`;
  }

  protected trackLocation(_index: number, location: InventoryLocation): InventoryLocationKey {
    return location.key;
  }

  private applyInventoryAction(item: InventoryItem, action: InventoryActionValue): void {
    if (action.mode === 'transfer') {
      this.applyTransfer(item, action);
      return;
    }

    if (action.mode === 'count') {
      this.applyCount(item, action);
      return;
    }

    this.applyHold(item, action);
  }

  private applyTransfer(
    item: InventoryItem,
    action: Extract<InventoryActionValue, { mode: 'transfer' }>,
  ): void {
    const fromLabel = this.locationLabel(action.from);
    const toLabel = this.locationLabel(action.to);
    const quantity = Math.min(action.quantity, item.locations[action.from]);

    this.items.update((items) =>
      items.map((entry) =>
        entry.id === item.id
          ? {
              ...entry,
              locations: {
                ...entry.locations,
                [action.from]: entry.locations[action.from] - quantity,
                [action.to]: entry.locations[action.to] + quantity,
              },
              updated: 'Just now',
            }
          : entry,
      ),
    );
    this.recordMovement({
      type: 'Transfer',
      item,
      quantity,
      detail: `Moved ${quantity} from ${fromLabel} to ${toLabel}`,
    });
  }

  private applyCount(item: InventoryItem, action: Extract<InventoryActionValue, { mode: 'count' }>): void {
    const current = item.locations[action.location];
    const diff = action.counted - current;
    const location = this.locationLabel(action.location);

    this.items.update((items) =>
      items.map((entry) =>
        entry.id === item.id
          ? {
              ...entry,
              locations: {
                ...entry.locations,
                [action.location]: action.counted,
              },
              updated: 'Just now',
            }
          : entry,
      ),
    );
    this.recordMovement({
      type: 'Cycle count',
      item,
      quantity: diff,
      detail: `${location} counted at ${action.counted} units`,
    });
  }

  private applyHold(item: InventoryItem, action: Extract<InventoryActionValue, { mode: 'hold' }>): void {
    const quantity = Math.min(action.quantity, item.locations[action.location]);
    const location = this.locationLabel(action.location);

    this.items.update((items) =>
      items.map((entry) =>
        entry.id === item.id
          ? {
              ...entry,
              hold: entry.hold + quantity,
              updated: 'Just now',
            }
          : entry,
      ),
    );
    this.recordMovement({
      type: 'Hold',
      item,
      quantity,
      detail: `${quantity} held at ${location} for ${action.reason}`,
    });
  }

  private recordMovement(entry: {
    type: InventoryMovement['type'];
    item: InventoryItem;
    quantity: number;
    detail: string;
  }): void {
    const movement: InventoryMovement = {
      id: Math.max(...this.movements().map((movement) => movement.id), 0) + 1,
      type: entry.type,
      item: entry.item.name,
      sku: entry.item.sku,
      detail: entry.detail,
      quantity: entry.quantity,
      user: 'Mika Stone',
      time: 'Just now',
    };

    this.movements.update((movements) => [movement, ...movements].slice(0, 8));
    this.recentlyChangedItemId.set(entry.item.id);
    this.toast.success(`${entry.item.name}: inventory updated.`);
  }

  private locationLabel(key: InventoryLocationKey): string {
    return this.locations.find((location) => location.key === key)?.label ?? key;
  }

  private locationKeyByLabel(label: string): InventoryLocationKey {
    return this.locations.find((location) => location.label === label)?.key ?? 'main';
  }
}
