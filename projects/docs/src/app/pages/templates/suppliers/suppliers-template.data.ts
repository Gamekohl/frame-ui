import { createCommerceAdminNavigation } from '../shared/commerce-admin-template.registry';

export type SupplierStatus = 'Preferred' | 'Standard' | 'Review';
export type PurchaseOrderStatus = 'Draft' | 'Sent' | 'Partially received' | 'Received' | 'Overdue';

export type Supplier = {
  id: string;
  name: string;
  code: string;
  contact: string;
  email: string;
  location: string;
  leadTime: number;
  fillRate: number;
  openOrders: number;
  status: SupplierStatus;
};

export type PurchaseOrderLine = {
  sku: string;
  product: string;
  ordered: number;
  received: number;
  unitCost: number;
};

export type PurchaseOrder = {
  id: string;
  supplierId: string;
  status: PurchaseOrderStatus;
  placed: string;
  expected: string;
  lines: readonly PurchaseOrderLine[];
  note: string;
};

export type NewPurchaseOrderValue = {
  supplierId: string;
  product: string;
  sku: string;
  quantity: number;
  unitCost: number;
  expected: string;
};

export type ReceivePurchaseOrderValue = {
  quantities: Record<string, number>;
  note: string;
};

export const PURCHASE_ORDER_COLUMNS = [
  'order',
  'supplier',
  'status',
  'expected',
  'received',
  'total',
  'actions',
];

export const PURCHASE_ORDER_STATUSES: readonly ('All status' | PurchaseOrderStatus)[] = [
  'All status',
  'Draft',
  'Sent',
  'Partially received',
  'Received',
  'Overdue',
];

export const PURCHASABLE_PRODUCTS = [
  { name: 'Atlas desk lamp', sku: 'LGT-ATLAS-01', unitCost: 46 },
  { name: 'Rail monitor arm', sku: 'OFF-RAIL-02', unitCost: 71 },
  { name: 'Cork standing mat', sku: 'OFF-MAT-01', unitCost: 31 },
  { name: 'Oak cable tray', sku: 'OFF-TRAY-03', unitCost: 24 },
];

export const { mainNav: MAIN_NAV, adminNav: ADMIN_NAV } =
  createCommerceAdminNavigation('suppliers');

export const SUPPLIERS: readonly Supplier[] = [
  {
    id: 'sup-nordlicht',
    name: 'Nordlicht Works',
    code: 'NLW',
    contact: 'Clara Weiss',
    email: 'clara@nordlicht.works',
    location: 'Hamburg, Germany',
    leadTime: 12,
    fillRate: 98,
    openOrders: 2,
    status: 'Preferred',
  },
  {
    id: 'sup-formline',
    name: 'Formline Manufacturing',
    code: 'FLM',
    contact: 'Robert Chen',
    email: 'robert@formline.co',
    location: 'Brno, Czech Republic',
    leadTime: 18,
    fillRate: 94,
    openOrders: 1,
    status: 'Standard',
  },
  {
    id: 'sup-corklab',
    name: 'Corklab Materials',
    code: 'CLM',
    contact: 'Ines Almeida',
    email: 'ines@corklab.pt',
    location: 'Porto, Portugal',
    leadTime: 9,
    fillRate: 91,
    openOrders: 1,
    status: 'Review',
  },
  {
    id: 'sup-timber',
    name: 'Timber Assembly Group',
    code: 'TAG',
    contact: 'Marek Zielinski',
    email: 'marek@timberassembly.eu',
    location: 'Poznan, Poland',
    leadTime: 15,
    fillRate: 96,
    openOrders: 0,
    status: 'Standard',
  },
];

export const INITIAL_PURCHASE_ORDERS: readonly PurchaseOrder[] = [
  {
    id: 'PO-1048',
    supplierId: 'sup-nordlicht',
    status: 'Sent',
    placed: 'Jul 18, 2026',
    expected: 'Jul 29, 2026',
    lines: [
      { sku: 'LGT-ATLAS-01', product: 'Atlas desk lamp', ordered: 80, received: 0, unitCost: 46 },
      { sku: 'OFF-TRAY-03', product: 'Oak cable tray', ordered: 40, received: 0, unitCost: 24 },
    ],
    note: 'Confirm carton labels before dispatch.',
  },
  {
    id: 'PO-1047',
    supplierId: 'sup-formline',
    status: 'Partially received',
    placed: 'Jul 12, 2026',
    expected: 'Jul 24, 2026',
    lines: [
      { sku: 'OFF-RAIL-02', product: 'Rail monitor arm', ordered: 60, received: 42, unitCost: 71 },
    ],
    note: 'Eighteen units remain on the supplier backorder.',
  },
  {
    id: 'PO-1046',
    supplierId: 'sup-corklab',
    status: 'Overdue',
    placed: 'Jul 4, 2026',
    expected: 'Jul 17, 2026',
    lines: [
      { sku: 'OFF-MAT-01', product: 'Cork standing mat', ordered: 120, received: 0, unitCost: 31 },
    ],
    note: 'Carrier missed the original collection slot. Revised ETA is pending.',
  },
  {
    id: 'PO-1045',
    supplierId: 'sup-nordlicht',
    status: 'Received',
    placed: 'Jun 26, 2026',
    expected: 'Jul 9, 2026',
    lines: [
      { sku: 'LGT-ATLAS-01', product: 'Atlas desk lamp', ordered: 50, received: 50, unitCost: 45 },
    ],
    note: 'All cartons passed the inbound quality check.',
  },
  {
    id: 'PO-1049',
    supplierId: 'sup-timber',
    status: 'Draft',
    placed: 'Not sent',
    expected: 'Aug 8, 2026',
    lines: [
      { sku: 'OFF-TRAY-03', product: 'Oak cable tray', ordered: 75, received: 0, unitCost: 24 },
    ],
    note: 'Waiting for final packaging quote.',
  },
];
