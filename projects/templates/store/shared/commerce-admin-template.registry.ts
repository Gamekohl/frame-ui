export type StorePageId = 'overview' | 'product-catalog' | 'inventory' | 'orders' | 'suppliers';

export type StorePageGroup = 'store' | 'fulfillment';

export type StoreNavItem = {
  label: string;
  icon: string;
  active: boolean;
  badge?: string | null;
  path: string;
};

export type StoreTemplatePage = {
  id: StorePageId;
  label: string;
  description: string;
  icon: string;
  path: string;
  group: StorePageGroup;
  badge?: string | null;
  keywords: readonly string[];
};

export const STORE_TEMPLATE_PAGES: readonly StoreTemplatePage[] = [
  {
    id: 'overview',
    label: 'Overview',
    description: 'Daily store exceptions, workload, and operational priorities.',
    icon: 'tablerHome',
    path: '/templates/store/overview',
    group: 'store',
    keywords: ['dashboard', 'overview', 'operations', 'exceptions'],
  },
  {
    id: 'product-catalog',
    label: 'Product catalog',
    description: 'Product CRUD, publishing, stock context, and bulk actions.',
    icon: 'tablerBuildingStore',
    path: '/templates/store/product-catalog',
    group: 'store',
    keywords: ['catalog', 'products', 'crud', 'bulk actions'],
  },
  {
    id: 'inventory',
    label: 'Inventory',
    description: 'Locations, transfers, cycle counts, and stock holds.',
    icon: 'tablerDatabase',
    path: '/templates/store/inventory',
    group: 'store',
    badge: '8',
    keywords: ['inventory', 'warehouse', 'stock', 'cycle count'],
  },
  {
    id: 'orders',
    label: 'Orders & fulfillment',
    description: 'Order queues, payment review, picking, and shipment handoff.',
    icon: 'tablerLayoutBoard',
    path: '/templates/store/orders',
    group: 'fulfillment',
    badge: '6',
    keywords: ['orders', 'fulfillment', 'shipping', 'refunds'],
  },
  {
    id: 'suppliers',
    label: 'Suppliers & POs',
    description: 'Supplier terms, purchase orders, receipts, and variances.',
    icon: 'tablerFileText',
    path: '/templates/store/suppliers',
    group: 'fulfillment',
    keywords: ['suppliers', 'purchase orders', 'procurement', 'receiving'],
  },
];

export function createStoreNavigation(activePage: StorePageId): {
  mainNav: StoreNavItem[];
  adminNav: StoreNavItem[];
} {
  const items = STORE_TEMPLATE_PAGES.map((page) => ({
    label: page.label,
    icon: page.icon,
    active: page.id === activePage,
    badge: page.badge,
    path: page.path,
  }));

  return {
    mainNav: items.filter((_, index) => STORE_TEMPLATE_PAGES[index].group === 'store'),
    adminNav: items.filter((_, index) => STORE_TEMPLATE_PAGES[index].group === 'fulfillment'),
  };
}
