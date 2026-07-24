import { createAdministrationNavigation } from '../shared/commerce-admin-template.registry';

export type AuditArea = 'Catalog' | 'Inventory' | 'Orders' | 'Procurement' | 'Access' | 'Settings';
export type AuditOutcome = 'Success' | 'Review' | 'Blocked';

export type AuditChange = {
  label: string;
  before: string;
  after: string;
};

export type AuditEvent = {
  id: number;
  actor: string;
  initials: string;
  action: string;
  target: string;
  area: AuditArea;
  outcome: AuditOutcome;
  occurredAt: string;
  displayTime: string;
  summary: string;
  source: string;
  ipAddress: string;
  changes: readonly AuditChange[];
};

export type NewAuditEvent = Omit<AuditEvent, 'id' | 'occurredAt' | 'displayTime'> & {
  occurredAt?: string;
  displayTime?: string;
};

export const AUDIT_COLUMNS = ['event', 'actor', 'area', 'outcome', 'time', 'actions'];
export const AUDIT_AREAS = [
  'All areas',
  'Catalog',
  'Inventory',
  'Orders',
  'Procurement',
  'Access',
  'Settings',
];
export const AUDIT_OUTCOMES = ['All outcomes', 'Success', 'Review', 'Blocked'];

export const { mainNav: MAIN_NAV, adminNav: ADMIN_NAV } =
  createAdministrationNavigation('audit-log');

export const INITIAL_AUDIT_EVENTS: readonly AuditEvent[] = [
  {
    id: 18,
    actor: 'Mika Stone',
    initials: 'MS',
    action: 'Published product',
    target: 'Atlas desk lamp',
    area: 'Catalog',
    outcome: 'Success',
    occurredAt: '2026-07-22T09:42:00.000Z',
    displayTime: 'Today, 09:42',
    summary: 'The product became visible on the storefront after its stock check passed.',
    source: 'Catalog workspace',
    ipAddress: '84.141.32.18',
    changes: [
      { label: 'Status', before: 'Draft', after: 'Active' },
      { label: 'Visibility', before: 'Hidden', after: 'Storefront' },
    ],
  },
  {
    id: 17,
    actor: 'Noah Anderson',
    initials: 'NA',
    action: 'Moved inventory',
    target: 'Rail monitor arm',
    area: 'Inventory',
    outcome: 'Success',
    occurredAt: '2026-07-22T09:18:00.000Z',
    displayTime: 'Today, 09:18',
    summary: 'Six units were moved from the main warehouse to the retail floor.',
    source: 'Inventory workspace',
    ipAddress: '84.141.32.21',
    changes: [
      { label: 'Main warehouse', before: '15', after: '9' },
      { label: 'Retail floor', before: '0', after: '6' },
    ],
  },
  {
    id: 16,
    actor: 'Mira Chen',
    initials: 'MC',
    action: 'Approved refund',
    target: 'Order ORD-2058',
    area: 'Orders',
    outcome: 'Review',
    occurredAt: '2026-07-22T08:56:00.000Z',
    displayTime: 'Today, 08:56',
    summary: 'A partial refund above the normal support limit was approved by a finance admin.',
    source: 'Order workspace',
    ipAddress: '84.141.33.10',
    changes: [{ label: 'Refund', before: '$0', after: '$129' }],
  },
  {
    id: 15,
    actor: 'Jonas Reed',
    initials: 'JR',
    action: 'Changed role permissions',
    target: 'Fulfillment lead',
    area: 'Access',
    outcome: 'Review',
    occurredAt: '2026-07-21T15:34:00.000Z',
    displayTime: 'Yesterday, 15:34',
    summary: 'The role can now release stock holds. A review remains open for the store owner.',
    source: 'Roles & permissions',
    ipAddress: '84.141.35.04',
    changes: [{ label: 'Release stock holds', before: 'Disabled', after: 'Enabled' }],
  },
  {
    id: 14,
    actor: 'System policy',
    initials: 'SP',
    action: 'Blocked product publish',
    target: 'Cork standing mat',
    area: 'Catalog',
    outcome: 'Blocked',
    occurredAt: '2026-07-21T13:11:00.000Z',
    displayTime: 'Yesterday, 13:11',
    summary: 'Publishing was blocked because the product had no available stock.',
    source: 'Catalog policy',
    ipAddress: 'Internal',
    changes: [{ label: 'Stock', before: '0', after: '0' }],
  },
  {
    id: 13,
    actor: 'Amelia Davis',
    initials: 'AD',
    action: 'Completed cycle count',
    target: 'Northline cable tray',
    area: 'Inventory',
    outcome: 'Success',
    occurredAt: '2026-07-21T11:07:00.000Z',
    displayTime: 'Yesterday, 11:07',
    summary: 'The counted quantity was lower than the recorded warehouse quantity.',
    source: 'Inventory workspace',
    ipAddress: '84.141.32.30',
    changes: [{ label: 'Main warehouse', before: '34', after: '31' }],
  },
  {
    id: 12,
    actor: 'Mika Stone',
    initials: 'MS',
    action: 'Updated store security',
    target: 'Session policy',
    area: 'Settings',
    outcome: 'Success',
    occurredAt: '2026-07-20T16:22:00.000Z',
    displayTime: '20 Jul, 16:22',
    summary: 'Owner sessions now require a fresh login after twelve hours.',
    source: 'Store settings',
    ipAddress: '84.141.32.18',
    changes: [{ label: 'Session lifetime', before: '24 hours', after: '12 hours' }],
  },
  {
    id: 11,
    actor: 'Liam Smith',
    initials: 'LS',
    action: 'Archived product',
    target: 'Walnut desk riser',
    area: 'Catalog',
    outcome: 'Success',
    occurredAt: '2026-07-19T10:15:00.000Z',
    displayTime: '19 Jul, 10:15',
    summary: 'The discontinued product was removed from active catalog work and storefront search.',
    source: 'Catalog workspace',
    ipAddress: '84.141.37.08',
    changes: [
      { label: 'Status', before: 'Active', after: 'Archived' },
      { label: 'Visibility', before: 'Storefront', after: 'Hidden' },
    ],
  },
  {
    id: 10,
    actor: 'Nora Patel',
    initials: 'NP',
    action: 'Invited operator',
    target: 'Eva Keller',
    area: 'Access',
    outcome: 'Success',
    occurredAt: '2026-07-18T14:28:00.000Z',
    displayTime: '18 Jul, 14:28',
    summary: 'A new catalog operator was invited with limited product editing access.',
    source: 'User management',
    ipAddress: '84.141.38.19',
    changes: [{ label: 'Account status', before: 'Not created', after: 'Invited' }],
  },
];
