export type RoleKey =
  | 'store_owner'
  | 'catalog_manager'
  | 'inventory_planner'
  | 'fulfillment_lead'
  | 'customer_support'
  | 'finance_admin';
export type AccessStatus = 'Enabled' | 'Disabled' | 'Review';

export type Permission = {
  id: string;
  label: string;
  description: string;
};

export type PermissionGroup = {
  id: string;
  label: string;
  description: string;
  permissions: Permission[];
};

export type RoleSummary = {
  key: RoleKey;
  name: string;
  description: string;
  memberCount: number;
  enabledCount: number;
  reviewCount: number;
  locked?: boolean;
  permissions: Record<string, boolean>;
};

export type AdminAccount = {
  id: number;
  name: string;
  email: string;
  initials: string;
  color: string;
  role: RoleKey;
  access:
    | 'Full store access'
    | 'Catalog access'
    | 'Inventory access'
    | 'Support access'
    | 'Finance access'
    | 'Read only';
  status: AccessStatus;
  lastReview: string;
};

export type TemplateNavItem = {
  label: string;
  icon: string;
  active: boolean;
  badge?: string | null;
  path?: string;
};

export const PERMISSION_GROUPS: PermissionGroup[] = [
  {
    id: 'catalog',
    label: 'Catalog',
    description: 'Product records, pricing, categories, and storefront visibility.',
    permissions: [
      {
        id: 'catalog.view_products',
        label: 'View products',
        description: 'Open product records, variants, and catalog status.',
      },
      {
        id: 'catalog.edit_products',
        label: 'Edit products',
        description: 'Update names, descriptions, images, categories, and tags.',
      },
      {
        id: 'catalog.publish_products',
        label: 'Publish products',
        description: 'Move drafts live or hide products from the storefront.',
      },
    ],
  },
  {
    id: 'inventory',
    label: 'Inventory',
    description: 'Stock counts, reorder points, warehouse notes, and adjustments.',
    permissions: [
      {
        id: 'inventory.view_stock',
        label: 'View stock',
        description: 'Read stock levels, low-stock warnings, and warehouse location.',
      },
      {
        id: 'inventory.adjust_stock',
        label: 'Adjust stock',
        description: 'Change inventory counts and record adjustment reasons.',
      },
      {
        id: 'inventory.manage_reorder',
        label: 'Manage reorder rules',
        description: 'Update reorder thresholds and supplier handoff notes.',
      },
    ],
  },
  {
    id: 'orders',
    label: 'Orders',
    description: 'Customer order context, refunds, returns, and fulfillment decisions.',
    permissions: [
      {
        id: 'orders.view_orders',
        label: 'View orders',
        description: 'Read order history, customer notes, and fulfillment state.',
      },
      {
        id: 'orders.process_returns',
        label: 'Process returns',
        description: 'Create return labels and approve replacement workflows.',
      },
      {
        id: 'orders.approve_refunds',
        label: 'Approve refunds',
        description: 'Approve customer refunds and high-value exceptions.',
      },
    ],
  },
  {
    id: 'store_access',
    label: 'Store access',
    description: 'Team invitations, role assignment, audit visibility, and policy changes.',
    permissions: [
      {
        id: 'store_access.invite_users',
        label: 'Invite teammates',
        description: 'Invite catalog, inventory, support, and finance operators.',
      },
      {
        id: 'store_access.change_roles',
        label: 'Change roles',
        description: 'Move teammates between store-specific access roles.',
      },
      {
        id: 'store_access.view_audit',
        label: 'View audit log',
        description: 'Inspect product, stock, refund, and permission changes.',
      },
    ],
  },
];

export const ROLES: RoleSummary[] = [
  {
    key: 'store_owner',
    name: 'Store owner',
    description: 'Full store control across catalog, stock, refunds, and access.',
    memberCount: 1,
    enabledCount: 1,
    reviewCount: 0,
    locked: true,
    permissions: {
      'catalog.view_products': true,
      'catalog.edit_products': true,
      'catalog.publish_products': true,
      'inventory.view_stock': true,
      'inventory.adjust_stock': true,
      'inventory.manage_reorder': true,
      'orders.view_orders': true,
      'orders.process_returns': true,
      'orders.approve_refunds': true,
      'store_access.invite_users': true,
      'store_access.change_roles': true,
      'store_access.view_audit': true,
    },
  },
  {
    key: 'catalog_manager',
    name: 'Catalog manager',
    description: 'Maintains product records, categories, pricing, and publish state.',
    memberCount: 2,
    enabledCount: 1,
    reviewCount: 0,
    permissions: {
      'catalog.view_products': true,
      'catalog.edit_products': true,
      'catalog.publish_products': true,
      'inventory.view_stock': true,
      'inventory.adjust_stock': false,
      'inventory.manage_reorder': false,
      'orders.view_orders': false,
      'orders.process_returns': false,
      'orders.approve_refunds': false,
      'store_access.invite_users': false,
      'store_access.change_roles': false,
      'store_access.view_audit': true,
    },
  },
  {
    key: 'inventory_planner',
    name: 'Inventory planner',
    description: 'Keeps stock levels, reorder points, and supplier handoffs accurate.',
    memberCount: 1,
    enabledCount: 0,
    reviewCount: 1,
    permissions: {
      'catalog.view_products': true,
      'catalog.edit_products': false,
      'catalog.publish_products': false,
      'inventory.view_stock': true,
      'inventory.adjust_stock': true,
      'inventory.manage_reorder': true,
      'orders.view_orders': true,
      'orders.process_returns': false,
      'orders.approve_refunds': false,
      'store_access.invite_users': false,
      'store_access.change_roles': false,
      'store_access.view_audit': false,
    },
  },
  {
    key: 'fulfillment_lead',
    name: 'Fulfillment lead',
    description: 'Handles order exceptions, return labels, and replacement decisions.',
    memberCount: 2,
    enabledCount: 1,
    reviewCount: 1,
    permissions: {
      'catalog.view_products': true,
      'catalog.edit_products': false,
      'catalog.publish_products': false,
      'inventory.view_stock': true,
      'inventory.adjust_stock': true,
      'inventory.manage_reorder': false,
      'orders.view_orders': true,
      'orders.process_returns': true,
      'orders.approve_refunds': false,
      'store_access.invite_users': false,
      'store_access.change_roles': false,
      'store_access.view_audit': false,
    },
  },
  {
    key: 'customer_support',
    name: 'Customer support',
    description: 'Reads customer order context and starts return workflows.',
    memberCount: 1,
    enabledCount: 1,
    reviewCount: 0,
    permissions: {
      'catalog.view_products': true,
      'catalog.edit_products': false,
      'catalog.publish_products': false,
      'inventory.view_stock': true,
      'inventory.adjust_stock': false,
      'inventory.manage_reorder': false,
      'orders.view_orders': true,
      'orders.process_returns': true,
      'orders.approve_refunds': false,
      'store_access.invite_users': false,
      'store_access.change_roles': false,
      'store_access.view_audit': false,
    },
  },
  {
    key: 'finance_admin',
    name: 'Finance admin',
    description: 'Reviews revenue-sensitive order data and approves refunds.',
    memberCount: 2,
    enabledCount: 2,
    reviewCount: 0,
    permissions: {
      'catalog.view_products': true,
      'catalog.edit_products': false,
      'catalog.publish_products': false,
      'inventory.view_stock': false,
      'inventory.adjust_stock': false,
      'inventory.manage_reorder': false,
      'orders.view_orders': true,
      'orders.process_returns': false,
      'orders.approve_refunds': true,
      'store_access.invite_users': false,
      'store_access.change_roles': false,
      'store_access.view_audit': true,
    },
  },
];

export const ADMIN_ACCOUNTS: AdminAccount[] = [
  {
    id: 1,
    name: 'Mika Stone',
    email: 'mika.stone@acme.com',
    initials: 'MS',
    color: 'bg-sky-600 text-white',
    role: 'store_owner',
    access: 'Full store access',
    status: 'Enabled',
    lastReview: 'Today',
  },
  {
    id: 2,
    name: 'Mira Chen',
    email: 'mira.chen@acme.com',
    initials: 'MC',
    color: 'bg-fuchsia-600 text-white',
    role: 'catalog_manager',
    access: 'Catalog access',
    status: 'Enabled',
    lastReview: 'Yesterday',
  },
  {
    id: 3,
    name: 'Noah Patel',
    email: 'noah.patel@acme.com',
    initials: 'NP',
    color: 'bg-cyan-600 text-white',
    role: 'inventory_planner',
    access: 'Inventory access',
    status: 'Review',
    lastReview: '12 days ago',
  },
  {
    id: 4,
    name: 'Ava Martinez',
    email: 'ava.martinez@acme.com',
    initials: 'AM',
    color: 'bg-rose-600 text-white',
    role: 'finance_admin',
    access: 'Finance access',
    status: 'Enabled',
    lastReview: '3 days ago',
  },
  {
    id: 5,
    name: 'Jin Park',
    email: 'jin.park@acme.com',
    initials: 'JP',
    color: 'bg-amber-500 text-zinc-950',
    role: 'customer_support',
    access: 'Support access',
    status: 'Enabled',
    lastReview: 'Today',
  },
  {
    id: 6,
    name: 'Sofia Lee',
    email: 'sofia.lee@acme.com',
    initials: 'SL',
    color: 'bg-violet-600 text-white',
    role: 'catalog_manager',
    access: 'Catalog access',
    status: 'Disabled',
    lastReview: '42 days ago',
  },
  {
    id: 7,
    name: 'Ethan Brooks',
    email: 'ethan.brooks@acme.com',
    initials: 'EB',
    color: 'bg-emerald-600 text-white',
    role: 'fulfillment_lead',
    access: 'Support access',
    status: 'Enabled',
    lastReview: '4 days ago',
  },
  {
    id: 8,
    name: 'Lina Gomez',
    email: 'lina.gomez@acme.com',
    initials: 'LG',
    color: 'bg-indigo-600 text-white',
    role: 'fulfillment_lead',
    access: 'Inventory access',
    status: 'Review',
    lastReview: '18 days ago',
  },
  {
    id: 9,
    name: 'Owen Reed',
    email: 'owen.reed@acme.com',
    initials: 'OR',
    color: 'bg-teal-600 text-white',
    role: 'finance_admin',
    access: 'Read only',
    status: 'Enabled',
    lastReview: 'Yesterday',
  },
];

export const MAIN_NAV: TemplateNavItem[] = [
  { label: 'Overview', icon: 'tablerHome', active: false, badge: null },
  { label: 'Product catalog', icon: 'tablerBuildingStore', active: false, badge: null, path: '/templates/product-catalog' },
  { label: 'Inventory', icon: 'tablerDatabase', active: false, badge: '8' },
  { label: 'Orders', icon: 'tablerLayoutBoard', active: false, badge: null },
  { label: 'Customers', icon: 'tablerUsers', active: false, badge: null },
  { label: 'Store docs', icon: 'tablerFileText', active: false, badge: null },
];

export const ADMIN_NAV: TemplateNavItem[] = [
  { label: 'User management', icon: 'tablerUsers', active: false, path: '/templates/user-management' },
  {
    label: 'Roles & Permissions',
    icon: 'tablerShieldLock',
    active: true,
    path: '/templates/roles-permissions',
  },
  { label: 'Settings', icon: 'tablerSettings', active: false, path: '/templates/settings' },
  { label: 'Authentication', icon: 'tablerKey', active: false },
  { label: 'Security', icon: 'tablerShield', active: false },
  { label: 'Audit log', icon: 'tablerActivity', active: false },
  { label: 'Data exports', icon: 'tablerDatabase', active: false },
];
