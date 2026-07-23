export type CommerceAdminPageId =
  | 'overview'
  | 'product-catalog'
  | 'inventory'
  | 'orders'
  | 'suppliers'
  | 'user-management'
  | 'roles-permissions'
  | 'audit-log'
  | 'settings';

export type CommerceAdminPageGroup = 'operations' | 'administration';

export type TemplateNavItem = {
  label: string;
  icon: string;
  active: boolean;
  badge?: string | null;
  path: string;
};

export type CommerceAdminPage = {
  id: CommerceAdminPageId;
  label: string;
  description: string;
  icon: string;
  path: string;
  group: CommerceAdminPageGroup;
  badge?: string | null;
  keywords: readonly string[];
};

export const COMMERCE_ADMIN_PAGES: readonly CommerceAdminPage[] = [
  {
    id: 'overview',
    label: 'Overview',
    description: 'Daily store exceptions, workload, and operational priorities.',
    icon: 'tablerHome',
    path: '/templates/overview',
    group: 'operations',
    keywords: ['dashboard', 'overview', 'operations', 'exceptions'],
  },
  {
    id: 'product-catalog',
    label: 'Product catalog',
    description: 'Product CRUD, publishing, stock context, and bulk actions.',
    icon: 'tablerBuildingStore',
    path: '/templates/product-catalog',
    group: 'operations',
    keywords: ['catalog', 'products', 'crud', 'bulk actions'],
  },
  {
    id: 'inventory',
    label: 'Inventory',
    description: 'Locations, transfers, cycle counts, and stock holds.',
    icon: 'tablerDatabase',
    path: '/templates/inventory',
    group: 'operations',
    badge: '8',
    keywords: ['inventory', 'warehouse', 'stock', 'cycle count'],
  },
  {
    id: 'orders',
    label: 'Orders & fulfillment',
    description: 'Order queues, payment review, picking, and shipment handoff.',
    icon: 'tablerLayoutBoard',
    path: '/templates/orders',
    group: 'operations',
    badge: '6',
    keywords: ['orders', 'fulfillment', 'shipping', 'refunds'],
  },
  {
    id: 'suppliers',
    label: 'Suppliers & POs',
    description: 'Supplier terms, purchase orders, receipts, and variances.',
    icon: 'tablerFileText',
    path: '/templates/suppliers',
    group: 'operations',
    keywords: ['suppliers', 'purchase orders', 'procurement', 'receiving'],
  },
  {
    id: 'user-management',
    label: 'User management',
    description: 'Store operators, access status, teams, and invitations.',
    icon: 'tablerUsers',
    path: '/templates/user-management',
    group: 'administration',
    keywords: ['users', 'team', 'accounts', 'access'],
  },
  {
    id: 'roles-permissions',
    label: 'Roles & permissions',
    description: 'Commerce roles, permission groups, and access reviews.',
    icon: 'tablerShieldLock',
    path: '/templates/roles-permissions',
    group: 'administration',
    keywords: ['roles', 'permissions', 'access control', 'reviews'],
  },
  {
    id: 'audit-log',
    label: 'Audit log',
    description: 'Immutable changes across catalog, stock, orders, and access.',
    icon: 'tablerActivity',
    path: '/templates/audit-log',
    group: 'administration',
    badge: '3',
    keywords: ['audit', 'activity', 'events', 'changes'],
  },
  {
    id: 'settings',
    label: 'Settings',
    description: 'Store defaults, security, billing, notifications, and team.',
    icon: 'tablerSettings',
    path: '/templates/settings',
    group: 'administration',
    keywords: ['settings', 'security', 'billing', 'notifications'],
  },
];

export function createCommerceAdminNavigation(activePage: CommerceAdminPageId): {
  mainNav: TemplateNavItem[];
  adminNav: TemplateNavItem[];
} {
  const items = COMMERCE_ADMIN_PAGES.map((page) => ({
    label: page.label,
    icon: page.icon,
    active: page.id === activePage,
    badge: page.badge,
    path: page.path,
  }));

  return {
    mainNav: items.filter((_, index) => COMMERCE_ADMIN_PAGES[index].group === 'operations'),
    adminNav: items.filter((_, index) => COMMERCE_ADMIN_PAGES[index].group === 'administration'),
  };
}

export function commerceAdminPage(id: CommerceAdminPageId): CommerceAdminPage {
  const page = COMMERCE_ADMIN_PAGES.find((entry) => entry.id === id);

  if (!page) {
    throw new Error(`Unknown commerce admin page: ${id}`);
  }

  return page;
}
