export type AdministrationPageId =
  | 'overview'
  | 'product-catalog'
  | 'inventory'
  | 'orders'
  | 'suppliers'
  | 'user-management'
  | 'roles-permissions'
  | 'audit-log'
  | 'settings';

export type AdministrationPageGroup = 'operations' | 'administration';

export type AdministrationNavItem = {
  label: string;
  icon: string;
  active: boolean;
  badge?: string | null;
  path: string;
};

export type AdministrationTemplatePage = {
  id: AdministrationPageId;
  label: string;
  description: string;
  icon: string;
  path: string;
  group: AdministrationPageGroup;
  badge?: string | null;
  keywords: readonly string[];
};

export const ADMINISTRATION_SIDEBAR_PAGES: readonly AdministrationTemplatePage[] = [
  {
    id: 'overview',
    label: 'Overview',
    description: 'Daily store exceptions, workload, and operational priorities.',
    icon: 'tablerHome',
    path: '/templates/store/overview',
    group: 'operations',
    keywords: ['dashboard', 'overview', 'operations', 'exceptions'],
  },
  {
    id: 'product-catalog',
    label: 'Product catalog',
    description: 'Product CRUD, publishing, stock context, and bulk actions.',
    icon: 'tablerBuildingStore',
    path: '/templates/store/product-catalog',
    group: 'operations',
    keywords: ['catalog', 'products', 'crud', 'bulk actions'],
  },
  {
    id: 'inventory',
    label: 'Inventory',
    description: 'Locations, transfers, cycle counts, and stock holds.',
    icon: 'tablerDatabase',
    path: '/templates/store/inventory',
    group: 'operations',
    badge: '8',
    keywords: ['inventory', 'warehouse', 'stock', 'cycle count'],
  },
  {
    id: 'orders',
    label: 'Orders & fulfillment',
    description: 'Order queues, payment review, picking, and shipment handoff.',
    icon: 'tablerLayoutBoard',
    path: '/templates/store/orders',
    group: 'operations',
    badge: '6',
    keywords: ['orders', 'fulfillment', 'shipping', 'refunds'],
  },
  {
    id: 'suppliers',
    label: 'Suppliers & POs',
    description: 'Supplier terms, purchase orders, receipts, and variances.',
    icon: 'tablerFileText',
    path: '/templates/store/suppliers',
    group: 'operations',
    keywords: ['suppliers', 'purchase orders', 'procurement', 'receiving'],
  },
  {
    id: 'user-management',
    label: 'User management',
    description: 'Operators, access status, teams, and invitations.',
    icon: 'tablerUsers',
    path: '/templates/administration/user-management',
    group: 'administration',
    keywords: ['users', 'team', 'accounts', 'access'],
  },
  {
    id: 'roles-permissions',
    label: 'Roles & permissions',
    description: 'Operational roles, permission groups, and access reviews.',
    icon: 'tablerShieldLock',
    path: '/templates/administration/roles-permissions',
    group: 'administration',
    keywords: ['roles', 'permissions', 'access control', 'reviews'],
  },
  {
    id: 'audit-log',
    label: 'Audit log',
    description: 'Immutable changes across access, policy, and configuration.',
    icon: 'tablerActivity',
    path: '/templates/administration/audit-log',
    group: 'administration',
    badge: '3',
    keywords: ['audit', 'activity', 'events', 'changes'],
  },
  {
    id: 'settings',
    label: 'Settings',
    description: 'Organization defaults, security, billing, notifications, and team.',
    icon: 'tablerSettings',
    path: '/templates/administration/settings',
    group: 'administration',
    keywords: ['settings', 'security', 'billing', 'notifications'],
  },
];

export const ADMINISTRATION_TEMPLATE_PAGES: readonly AdministrationTemplatePage[] =
  ADMINISTRATION_SIDEBAR_PAGES.filter((page) => page.group === 'administration');

export function createAdministrationNavigation(activePage: AdministrationPageId): {
  mainNav: AdministrationNavItem[];
  adminNav: AdministrationNavItem[];
} {
  const items = ADMINISTRATION_SIDEBAR_PAGES.map((page) => ({
    label: page.label,
    icon: page.icon,
    active: page.id === activePage,
    badge: page.badge,
    path: page.path,
  }));

  return {
    mainNav: items.filter(
      (_, index) => ADMINISTRATION_SIDEBAR_PAGES[index].group === 'operations',
    ),
    adminNav: items.filter(
      (_, index) => ADMINISTRATION_SIDEBAR_PAGES[index].group === 'administration',
    ),
  };
}
