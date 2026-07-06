export type RoleKey = 'owner' | 'admin' | 'manager' | 'accountant' | 'support' | 'auditor';
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
  access: 'Full access' | 'Limited admin' | 'Read only' | 'Billing only';
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
    id: 'workspace',
    label: 'Workspace',
    description: 'Global console areas, dashboard exports, and team visibility.',
    permissions: [
      {
        id: 'workspace.view_dashboard',
        label: 'View dashboard',
        description: 'Open operational dashboard and workspace overview.',
      },
      {
        id: 'workspace.export_data',
        label: 'Export data',
        description: 'Download dashboard tables and reporting snapshots.',
      },
      {
        id: 'workspace.manage_settings',
        label: 'Manage settings',
        description: 'Edit workspace name, domain, and default preferences.',
      },
    ],
  },
  {
    id: 'users',
    label: 'Users',
    description: 'People, invitations, status changes, and role assignment.',
    permissions: [
      {
        id: 'users.invite',
        label: 'Invite users',
        description: 'Send invitations and resend pending access emails.',
      },
      {
        id: 'users.change_roles',
        label: 'Change roles',
        description: 'Move users between admin, manager, and support roles.',
      },
      {
        id: 'users.deactivate',
        label: 'Deactivate users',
        description: 'Disable account access while preserving audit history.',
      },
    ],
  },
  {
    id: 'billing',
    label: 'Billing',
    description: 'Invoices, payment methods, plans, and financial exports.',
    permissions: [
      {
        id: 'billing.view',
        label: 'View billing',
        description: 'Read invoices, plan details, and seat usage.',
      },
      {
        id: 'billing.update_payment',
        label: 'Update payment',
        description: 'Change payment methods and invoice recipients.',
      },
      {
        id: 'billing.approve_refunds',
        label: 'Approve refunds',
        description: 'Approve refunds before they are sent to customers.',
      },
    ],
  },
  {
    id: 'security',
    label: 'Security',
    description: 'Sensitive access rules, audit exports, and policy changes.',
    permissions: [
      {
        id: 'security.view_audit',
        label: 'View audit log',
        description: 'Inspect login, permission, and billing events.',
      },
      {
        id: 'security.edit_policy',
        label: 'Edit policies',
        description: 'Change two-factor, session, and password policies.',
      },
      {
        id: 'security.break_glass',
        label: 'Emergency access',
        description: 'Grant temporary access during incidents.',
      },
    ],
  },
];

export const ROLES: RoleSummary[] = [
  {
    key: 'owner',
    name: 'Owner',
    description: 'Full workspace control with security and billing authority.',
    memberCount: 2,
    enabledCount: 2,
    reviewCount: 0,
    locked: true,
    permissions: {
      'workspace.view_dashboard': true,
      'workspace.export_data': true,
      'workspace.manage_settings': true,
      'users.invite': true,
      'users.change_roles': true,
      'users.deactivate': true,
      'billing.view': true,
      'billing.update_payment': true,
      'billing.approve_refunds': true,
      'security.view_audit': true,
      'security.edit_policy': true,
      'security.break_glass': true,
    },
  },
  {
    key: 'admin',
    name: 'Admin',
    description: 'Runs daily account operations without emergency overrides.',
    memberCount: 5,
    enabledCount: 4,
    reviewCount: 1,
    permissions: {
      'workspace.view_dashboard': true,
      'workspace.export_data': true,
      'workspace.manage_settings': true,
      'users.invite': true,
      'users.change_roles': true,
      'users.deactivate': true,
      'billing.view': true,
      'billing.update_payment': false,
      'billing.approve_refunds': false,
      'security.view_audit': true,
      'security.edit_policy': false,
      'security.break_glass': false,
    },
  },
  {
    key: 'manager',
    name: 'Manager',
    description: 'Can operate team access and reporting for their department.',
    memberCount: 7,
    enabledCount: 6,
    reviewCount: 1,
    permissions: {
      'workspace.view_dashboard': true,
      'workspace.export_data': true,
      'workspace.manage_settings': false,
      'users.invite': true,
      'users.change_roles': false,
      'users.deactivate': false,
      'billing.view': false,
      'billing.update_payment': false,
      'billing.approve_refunds': false,
      'security.view_audit': false,
      'security.edit_policy': false,
      'security.break_glass': false,
    },
  },
  {
    key: 'accountant',
    name: 'Accountant',
    description: 'Handles invoices, seats, and billing records.',
    memberCount: 3,
    enabledCount: 2,
    reviewCount: 1,
    permissions: {
      'workspace.view_dashboard': true,
      'workspace.export_data': true,
      'workspace.manage_settings': false,
      'users.invite': false,
      'users.change_roles': false,
      'users.deactivate': false,
      'billing.view': true,
      'billing.update_payment': true,
      'billing.approve_refunds': true,
      'security.view_audit': false,
      'security.edit_policy': false,
      'security.break_glass': false,
    },
  },
  {
    key: 'support',
    name: 'Support lead',
    description: 'Reviews customer-facing access and refund escalations.',
    memberCount: 4,
    enabledCount: 4,
    reviewCount: 0,
    permissions: {
      'workspace.view_dashboard': true,
      'workspace.export_data': false,
      'workspace.manage_settings': false,
      'users.invite': false,
      'users.change_roles': false,
      'users.deactivate': false,
      'billing.view': true,
      'billing.update_payment': false,
      'billing.approve_refunds': true,
      'security.view_audit': true,
      'security.edit_policy': false,
      'security.break_glass': false,
    },
  },
  {
    key: 'auditor',
    name: 'Auditor',
    description: 'Reads audit trails and exports evidence without changing access.',
    memberCount: 3,
    enabledCount: 2,
    reviewCount: 1,
    permissions: {
      'workspace.view_dashboard': true,
      'workspace.export_data': true,
      'workspace.manage_settings': false,
      'users.invite': false,
      'users.change_roles': false,
      'users.deactivate': false,
      'billing.view': true,
      'billing.update_payment': false,
      'billing.approve_refunds': false,
      'security.view_audit': true,
      'security.edit_policy': false,
      'security.break_glass': false,
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
    role: 'owner',
    access: 'Full access',
    status: 'Enabled',
    lastReview: 'Today',
  },
  {
    id: 2,
    name: 'Mira Chen',
    email: 'mira.chen@acme.com',
    initials: 'MC',
    color: 'bg-fuchsia-600 text-white',
    role: 'admin',
    access: 'Limited admin',
    status: 'Enabled',
    lastReview: 'Yesterday',
  },
  {
    id: 3,
    name: 'Noah Patel',
    email: 'noah.patel@acme.com',
    initials: 'NP',
    color: 'bg-cyan-600 text-white',
    role: 'manager',
    access: 'Read only',
    status: 'Review',
    lastReview: '12 days ago',
  },
  {
    id: 4,
    name: 'Ava Martinez',
    email: 'ava.martinez@acme.com',
    initials: 'AM',
    color: 'bg-rose-600 text-white',
    role: 'accountant',
    access: 'Billing only',
    status: 'Enabled',
    lastReview: '3 days ago',
  },
  {
    id: 5,
    name: 'Jin Park',
    email: 'jin.park@acme.com',
    initials: 'JP',
    color: 'bg-amber-500 text-zinc-950',
    role: 'support',
    access: 'Limited admin',
    status: 'Enabled',
    lastReview: 'Today',
  },
  {
    id: 6,
    name: 'Sofia Lee',
    email: 'sofia.lee@acme.com',
    initials: 'SL',
    color: 'bg-violet-600 text-white',
    role: 'admin',
    access: 'Full access',
    status: 'Disabled',
    lastReview: '42 days ago',
  },
  {
    id: 7,
    name: 'Ethan Brooks',
    email: 'ethan.brooks@acme.com',
    initials: 'EB',
    color: 'bg-emerald-600 text-white',
    role: 'auditor',
    access: 'Read only',
    status: 'Enabled',
    lastReview: '4 days ago',
  },
  {
    id: 8,
    name: 'Lina Gomez',
    email: 'lina.gomez@acme.com',
    initials: 'LG',
    color: 'bg-indigo-600 text-white',
    role: 'auditor',
    access: 'Read only',
    status: 'Review',
    lastReview: '18 days ago',
  },
  {
    id: 9,
    name: 'Owen Reed',
    email: 'owen.reed@acme.com',
    initials: 'OR',
    color: 'bg-teal-600 text-white',
    role: 'auditor',
    access: 'Read only',
    status: 'Enabled',
    lastReview: 'Yesterday',
  },
];

export const MAIN_NAV: TemplateNavItem[] = [
  { label: 'Home', icon: 'tablerHome', active: false, badge: null },
  { label: 'Dashboard', icon: 'tablerLayoutBoard', active: false, badge: null },
  { label: 'Notifications', icon: 'tablerBell', active: false, badge: '6' },
  { label: 'Documentation', icon: 'tablerFileText', active: false, badge: null },
];

export const ADMIN_NAV: TemplateNavItem[] = [
  { label: 'Authentication', icon: 'tablerKey', active: false },
  { label: 'User management', icon: 'tablerUsers', active: false, path: '/templates/user-management' },
  {
    label: 'Roles & Permissions',
    icon: 'tablerShieldLock',
    active: true,
    path: '/templates/roles-permissions',
  },
  { label: 'Settings', icon: 'tablerSettings', active: false, path: '/templates/settings' },
  { label: 'Security', icon: 'tablerShield', active: false },
  { label: 'Audit log', icon: 'tablerActivity', active: false },
  { label: 'Data exports', icon: 'tablerDatabase', active: false },
];
