export type TemplateNavItem = {
  label: string;
  icon: string;
  active: boolean;
  badge?: string | null;
  path?: string;
};

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
  role: 'Owner' | 'Editor' | 'Viewer';
  initials: string;
};

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
    active: false,
    path: '/templates/roles-permissions',
  },
  { label: 'Settings', icon: 'tablerSettings', active: true, path: '/templates/settings' },
  { label: 'Security', icon: 'tablerShield', active: false },
  { label: 'Audit log', icon: 'tablerActivity', active: false },
  { label: 'Data exports', icon: 'tablerDatabase', active: false },
];

export const SETTINGS_SECTIONS: SettingsSection[] = [
  {
    id: 'account',
    label: 'Account',
    description: 'Operator profile and contact defaults.',
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
    description: 'Seats, invoice details, and payment method.',
    icon: 'tablerCreditCard',
  },
  {
    id: 'notifications',
    label: 'Notifications',
    description: 'Workspace notices and operational events.',
    icon: 'tablerBell',
  },
  {
    id: 'team',
    label: 'Team',
    description: 'Collaborators and access levels.',
    icon: 'tablerUsers',
  },
];

export const NOTIFICATION_GROUPS: NotificationGroup[] = [
  {
    id: 'workspace',
    title: 'Workspace notices',
    description: 'Choose the updates that should be visible to operators.',
    settings: [
      {
        id: 'releaseNotes',
        label: 'Release notes',
        description: 'Send a short summary when the admin console changes.',
        enabled: true,
      },
      {
        id: 'accessChanges',
        label: 'Access changes',
        description: 'Notify owners when a role, invite, or suspension changes.',
        enabled: true,
      },
      {
        id: 'maintenance',
        label: 'Maintenance windows',
        description: 'Warn the team before scheduled downtime starts.',
        enabled: false,
      },
    ],
  },
  {
    id: 'operations',
    title: 'Operational events',
    description: 'Tune the notifications that come from everyday admin work.',
    settings: [
      {
        id: 'inviteAccepted',
        label: 'Invite accepted',
        description: 'Notify when a new teammate finishes their first sign-in.',
        enabled: false,
      },
      {
        id: 'roleChanged',
        label: 'Role changed',
        description: 'Notify when someone is moved between access levels.',
        enabled: true,
      },
      {
        id: 'exportReady',
        label: 'Export ready',
        description: 'Notify when a requested data export can be downloaded.',
        enabled: true,
      },
      {
        id: 'invoicePaid',
        label: 'Invoice paid',
        description: 'Send a receipt to billing owners after payment clears.',
        enabled: true,
      },
    ],
  },
];

export const PLAN_OPTIONS: PlanOption[] = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'For small teams setting up access control.',
    price: '$12',
  },
  {
    id: 'operations',
    name: 'Operations',
    description: 'For teams running daily admin workflows.',
    price: '$24',
  },
  {
    id: 'scale',
    name: 'Scale',
    description: 'For audit-heavy teams with multiple workspaces.',
    price: '$48',
  },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'dejesus-michael',
    name: 'Dejesus Michael',
    email: 'dejesusmichael@mail.org',
    role: 'Owner',
    initials: 'DM',
  },
  {
    id: 'mclaughlin-steele',
    name: 'Mclaughlin Steele',
    email: 'mclaughlinsteele@mail.me',
    role: 'Owner',
    initials: 'MS',
  },
  {
    id: 'laverne-dodson',
    name: 'Laverne Dodson',
    email: 'lavernedodson@mail.ca',
    role: 'Editor',
    initials: 'LD',
  },
  {
    id: 'trudy-berg',
    name: 'Trudy Berg',
    email: 'trudyberg@mail.us',
    role: 'Viewer',
    initials: 'TB',
  },
  {
    id: 'lamb-underwood',
    name: 'Lamb Underwood',
    email: 'lambunderwood@mail.me',
    role: 'Viewer',
    initials: 'LU',
  },
  {
    id: 'mcleod-wagner',
    name: 'Mcleod Wagner',
    email: 'mcleodwagner@mail.biz',
    role: 'Viewer',
    initials: 'MW',
  },
  {
    id: 'shannon-kennedy',
    name: 'Shannon Kennedy',
    email: 'shannonkennedy@mail.ca',
    role: 'Viewer',
    initials: 'SK',
  },
];

export const TEAM_ROLES: TeamMember['role'][] = ['Owner', 'Editor', 'Viewer'];
