export type AdministrationPageId =
  | 'user-management'
  | 'roles-permissions'
  | 'audit-log'
  | 'settings';

export type AdministrationPageGroup = 'access' | 'governance';

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

export const ADMINISTRATION_TEMPLATE_PAGES: readonly AdministrationTemplatePage[] = [
  {
    id: 'user-management',
    label: 'User management',
    description: 'Operators, access status, teams, and invitations.',
    icon: 'tablerUsers',
    path: '/templates/administration/user-management',
    group: 'access',
    keywords: ['users', 'team', 'accounts', 'access'],
  },
  {
    id: 'roles-permissions',
    label: 'Roles & permissions',
    description: 'Operational roles, permission groups, and access reviews.',
    icon: 'tablerShieldLock',
    path: '/templates/administration/roles-permissions',
    group: 'access',
    keywords: ['roles', 'permissions', 'access control', 'reviews'],
  },
  {
    id: 'audit-log',
    label: 'Audit log',
    description: 'Immutable changes across access, policy, and configuration.',
    icon: 'tablerActivity',
    path: '/templates/administration/audit-log',
    group: 'governance',
    badge: '3',
    keywords: ['audit', 'activity', 'events', 'changes'],
  },
  {
    id: 'settings',
    label: 'Settings',
    description: 'Organization defaults, security, billing, notifications, and team.',
    icon: 'tablerSettings',
    path: '/templates/administration/settings',
    group: 'governance',
    keywords: ['settings', 'security', 'billing', 'notifications'],
  },
];

export function createAdministrationNavigation(activePage: AdministrationPageId): {
  mainNav: AdministrationNavItem[];
  adminNav: AdministrationNavItem[];
} {
  const items = ADMINISTRATION_TEMPLATE_PAGES.map((page) => ({
    label: page.label,
    icon: page.icon,
    active: page.id === activePage,
    badge: page.badge,
    path: page.path,
  }));

  return {
    mainNav: items.filter((_, index) => ADMINISTRATION_TEMPLATE_PAGES[index].group === 'access'),
    adminNav: items.filter(
      (_, index) => ADMINISTRATION_TEMPLATE_PAGES[index].group === 'governance',
    ),
  };
}
