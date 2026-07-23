import { createCommerceAdminNavigation } from '../shared/commerce-admin-template.registry';

export type InventoryLocationKey = 'main' | 'retail' | 'returns' | 'qa';
export type InventoryStatus = 'Healthy' | 'Low' | 'Critical' | 'On hold';
export type InventoryActionMode = 'transfer' | 'count' | 'hold';

export type InventoryLocation = {
  key: InventoryLocationKey;
  label: string;
  code: string;
  capacity: number;
};

export type InventoryItem = {
  id: number;
  name: string;
  sku: string;
  category: string;
  locations: Record<InventoryLocationKey, number>;
  reserved: number;
  hold: number;
  reorderPoint: number;
  updated: string;
};

export type InventoryMovement = {
  id: number;
  type: 'Transfer' | 'Cycle count' | 'Hold';
  item: string;
  sku: string;
  detail: string;
  quantity: number;
  user: string;
  time: string;
};

export const INVENTORY_LOCATIONS: InventoryLocation[] = [
  { key: 'main', label: 'Main warehouse', code: 'MW', capacity: 420 },
  { key: 'retail', label: 'Retail floor', code: 'RF', capacity: 96 },
  { key: 'returns', label: 'Returns bay', code: 'RB', capacity: 80 },
  { key: 'qa', label: 'QA hold', code: 'QA', capacity: 64 },
];

export const INVENTORY_COLUMNS = [
  'item',
  'available',
  'reserved',
  'hold',
  'main',
  'retail',
  'returns',
  'qa',
  'status',
  'updated',
  'actions',
];

export const { mainNav: MAIN_NAV, adminNav: ADMIN_NAV } =
  createCommerceAdminNavigation('inventory');

export const INVENTORY_ITEMS: InventoryItem[] = [
  {
    id: 1,
    name: 'Atlas desk lamp',
    sku: 'LGT-ATL-001',
    category: 'Lighting',
    locations: { main: 28, retail: 8, returns: 3, qa: 1 },
    reserved: 6,
    hold: 1,
    reorderPoint: 18,
    updated: 'Today, 09:32',
  },
  {
    id: 2,
    name: 'Rail monitor arm',
    sku: 'DSK-RMA-014',
    category: 'Desk setup',
    locations: { main: 9, retail: 0, returns: 2, qa: 0 },
    reserved: 7,
    hold: 0,
    reorderPoint: 16,
    updated: 'Today, 08:48',
  },
  {
    id: 3,
    name: 'Cork standing mat',
    sku: 'FUR-CSM-033',
    category: 'Furniture',
    locations: { main: 0, retail: 0, returns: 1, qa: 2 },
    reserved: 2,
    hold: 2,
    reorderPoint: 20,
    updated: 'Yesterday',
  },
  {
    id: 4,
    name: 'Docking station pro',
    sku: 'ACC-DSP-020',
    category: 'Accessories',
    locations: { main: 14, retail: 4, returns: 0, qa: 0 },
    reserved: 5,
    hold: 0,
    reorderPoint: 10,
    updated: '2 days ago',
  },
  {
    id: 5,
    name: 'Acoustic desk panel',
    sku: 'FUR-ADP-008',
    category: 'Furniture',
    locations: { main: 6, retail: 0, returns: 0, qa: 1 },
    reserved: 4,
    hold: 1,
    reorderPoint: 14,
    updated: '3 days ago',
  },
  {
    id: 6,
    name: 'Cable tray kit',
    sku: 'DSK-CTK-017',
    category: 'Desk setup',
    locations: { main: 58, retail: 12, returns: 4, qa: 0 },
    reserved: 11,
    hold: 0,
    reorderPoint: 24,
    updated: '4 days ago',
  },
  {
    id: 7,
    name: 'Focus keyboard',
    sku: 'ACC-FKB-052',
    category: 'Accessories',
    locations: { main: 21, retail: 6, returns: 1, qa: 0 },
    reserved: 8,
    hold: 0,
    reorderPoint: 18,
    updated: '1 week ago',
  },
  {
    id: 8,
    name: 'Archive storage box',
    sku: 'STR-ASB-026',
    category: 'Storage',
    locations: { main: 4, retail: 0, returns: 0, qa: 0 },
    reserved: 3,
    hold: 0,
    reorderPoint: 12,
    updated: '1 week ago',
  },
];

export const INVENTORY_MOVEMENTS: InventoryMovement[] = [
  {
    id: 1,
    type: 'Transfer',
    item: 'Atlas desk lamp',
    sku: 'LGT-ATL-001',
    detail: 'Moved 6 from Main warehouse to Retail floor',
    quantity: 6,
    user: 'Mika Stone',
    time: '09:32',
  },
  {
    id: 2,
    type: 'Cycle count',
    item: 'Rail monitor arm',
    sku: 'DSK-RMA-014',
    detail: 'Main warehouse counted at 9 units',
    quantity: -2,
    user: 'Jonas Reed',
    time: '08:48',
  },
  {
    id: 3,
    type: 'Hold',
    item: 'Cork standing mat',
    sku: 'FUR-CSM-033',
    detail: '2 units held for QA inspection',
    quantity: 2,
    user: 'Mira Chen',
    time: 'Yesterday',
  },
];
