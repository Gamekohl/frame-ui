import { createStoreNavigation } from '../shared/commerce-admin-template.registry';

export type OverviewTask = {
  id: string;
  area: 'Orders' | 'Inventory' | 'Catalog' | 'Procurement';
  title: string;
  description: string;
  metric: string;
  severity: 'Critical' | 'Attention' | 'Routine';
  owner: string;
  path: string;
};

export const { mainNav: MAIN_NAV, adminNav: ADMIN_NAV } = createStoreNavigation('overview');

export const INITIAL_OVERVIEW_TASKS: readonly OverviewTask[] = [
  {
    id: 'payment-review',
    area: 'Orders',
    title: 'Confirm payment for ORD-2071',
    description: 'The customer sees a pending charge after a failed first attempt.',
    metric: '$186 at risk',
    severity: 'Critical',
    owner: 'Mira Chen',
    path: '/templates/store/orders',
  },
  {
    id: 'overdue-po',
    area: 'Procurement',
    title: 'Get a revised ETA from Corklab',
    description: 'PO-1046 is overdue and 120 standing mats are still outstanding.',
    metric: '5 days late',
    severity: 'Critical',
    owner: 'Mika Stone',
    path: '/templates/store/suppliers',
  },
  {
    id: 'low-stock',
    area: 'Inventory',
    title: 'Protect monitor arm stock',
    description: 'Available units are below the reorder point while two orders wait to pick.',
    metric: '9 available',
    severity: 'Attention',
    owner: 'Jonas Reed',
    path: '/templates/store/inventory',
  },
  {
    id: 'publish-blocked',
    area: 'Catalog',
    title: 'Resolve blocked catalog publish',
    description: 'A draft product cannot go live until its opening stock has been received.',
    metric: '1 blocked',
    severity: 'Attention',
    owner: 'Noah Anderson',
    path: '/templates/store/product-catalog',
  },
];

export const ORDER_VOLUME = [
  { day: 'Thu', orders: 18 },
  { day: 'Fri', orders: 24 },
  { day: 'Sat', orders: 15 },
  { day: 'Sun', orders: 12 },
  { day: 'Mon', orders: 29 },
  { day: 'Tue', orders: 33 },
  { day: 'Wed', orders: 27 },
];
