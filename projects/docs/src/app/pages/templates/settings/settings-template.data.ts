import { createCommerceAdminNavigation } from '../shared/commerce-admin-template.registry';

export type SettingsSection = {
  id: string;
  label: string;
  description: string;
  icon: string;
};

export type NotificationSetting = {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
};

export type NotificationGroup = {
  id: string;
  title: string;
  description: string;
  settings: NotificationSetting[];
};

export type PlanOption = {
  id: string;
  name: string;
  description: string;
  price: string;
};

export type TeamMember = {
  id: string;
  name: string;
  email: string;
  role:
    | 'Store owner'
    | 'Catalog manager'
    | 'Inventory planner'
    | 'Fulfillment lead'
    | 'Customer support'
    | 'Finance admin';
  initials: string;
};

export const { mainNav: MAIN_NAV, adminNav: ADMIN_NAV } = createCommerceAdminNavigation('settings');

export const SETTINGS_SECTIONS: SettingsSection[] = [
  {
    id: 'account',
    label: 'Account',
    description: 'Store operator profile and contact defaults.',
    icon: 'tablerUserCircle',
  },
  {
    id: 'security',
    label: 'Security',
    description: 'Password rules and login checks.',
    icon: 'tablerLock',
  },
  {
    id: 'billing',
    label: 'Plan & Billing',
    description: 'Store seats, invoice details, and payment method.',
    icon: 'tablerCreditCard',
  },
  {
    id: 'notifications',
    label: 'Notifications',
    description: 'Catalog alerts and operational events.',
    icon: 'tablerBell',
  },
  {
    id: 'team',
    label: 'Team',
    description: 'Store operators and access roles.',
    icon: 'tablerUsers',
  },
];

export const NOTIFICATION_GROUPS: NotificationGroup[] = [
  {
    id: 'catalog',
    title: 'Catalog updates',
    description: 'Choose which product catalog changes should reach operators.',
    settings: [
      {
        id: 'productPublished',
        label: 'Product published',
        description: 'Notify catalog managers when a draft goes live.',
        enabled: true,
      },
      {
        id: 'missingDetails',
        label: 'Missing product details',
        description: 'Flag products missing category, price, SKU, or description.',
        enabled: true,
      },
      {
        id: 'priceChanged',
        label: 'Price changed',
        description: 'Notify finance owners when a product price is updated.',
        enabled: false,
      },
    ],
  },
  {
    id: 'operations',
    title: 'Inventory and order events',
    description: 'Tune the notifications that come from everyday store operations.',
    settings: [
      {
        id: 'lowStock',
        label: 'Low stock',
        description: 'Notify inventory planners when stock drops below threshold.',
        enabled: false,
      },
      {
        id: 'reorderPoint',
        label: 'Reorder point reached',
        description: 'Notify fulfillment leads when a product needs supplier follow-up.',
        enabled: true,
      },
      {
        id: 'returnOpened',
        label: 'Return opened',
        description: 'Notify support when a customer return needs review.',
        enabled: true,
      },
      {
        id: 'refundApproved',
        label: 'Refund approved',
        description: 'Notify finance admins when a refund is approved.',
        enabled: true,
      },
    ],
  },
];

export const PLAN_OPTIONS: PlanOption[] = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'For small stores keeping one catalog organized.',
    price: '$12',
  },
  {
    id: 'operations',
    name: 'Operations',
    description: 'For teams managing catalog, stock, and returns daily.',
    price: '$24',
  },
  {
    id: 'scale',
    name: 'Scale',
    description: 'For multi-store teams with audit and approval needs.',
    price: '$48',
  },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'mika-stone',
    name: 'Mika Stone',
    email: 'mika@acme.com',
    role: 'Store owner',
    initials: 'MS',
  },
  {
    id: 'mira-chen',
    name: 'Mira Chen',
    email: 'mira@acme.com',
    role: 'Catalog manager',
    initials: 'MC',
  },
  {
    id: 'noah-patel',
    name: 'Noah Patel',
    email: 'noah@acme.com',
    role: 'Inventory planner',
    initials: 'NP',
  },
  {
    id: 'ava-martinez',
    name: 'Ava Martinez',
    email: 'ava@acme.com',
    role: 'Finance admin',
    initials: 'AM',
  },
  {
    id: 'jin-park',
    name: 'Jin Park',
    email: 'jin@acme.com',
    role: 'Customer support',
    initials: 'JP',
  },
  {
    id: 'ethan-brooks',
    name: 'Ethan Brooks',
    email: 'ethan@acme.com',
    role: 'Fulfillment lead',
    initials: 'EB',
  },
  {
    id: 'lina-gomez',
    name: 'Lina Gomez',
    email: 'lina@acme.com',
    role: 'Inventory planner',
    initials: 'LG',
  },
];

export const TEAM_ROLES: TeamMember['role'][] = [
  'Store owner',
  'Catalog manager',
  'Inventory planner',
  'Fulfillment lead',
  'Customer support',
  'Finance admin',
];
