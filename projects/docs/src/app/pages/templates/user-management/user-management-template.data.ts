export type UserStatus = 'Active' | 'Inactive' | 'Invited';
export type UserRole = 'Admin' | 'Analyst' | 'Developer' | 'Manager' | 'Owner' | 'Support';
export type ViewMode = 'table' | 'board' | 'list';

export type TemplateUser = {
  id: number;
  name: string;
  email: string;
  initials: string;
  color: string;
  role: UserRole;
  status: UserStatus;
  joined: string;
  lastSeen: string;
  twoFactor: boolean;
  team: string;
};

export type TemplateNavItem = {
  label: string;
  icon: string;
  active: boolean;
  badge?: string | null;
};

export const ROLE_OPTIONS = [
  'All roles',
  'Owner',
  'Admin',
  'Manager',
  'Developer',
  'Analyst',
  'Support',
];

export const STATUS_OPTIONS = ['All status', 'Active', 'Inactive', 'Invited'];

export const STATUS_DROP_LIST_STATUSES: UserStatus[] = ['Active', 'Inactive', 'Invited'];

export const USER_COLUMNS = [
  'select',
  'name',
  'email',
  'role',
  'status',
  'joined',
  'twoFactor',
  'actions',
];

export const MAIN_NAV: TemplateNavItem[] = [
  { label: 'Home', icon: 'tablerHome', active: false, badge: null },
  { label: 'Dashboard', icon: 'tablerLayoutBoard', active: false, badge: null },
  { label: 'Notifications', icon: 'tablerBell', active: false, badge: '10' },
  { label: 'Documentation', icon: 'tablerFileText', active: false, badge: null },
];

export const ADMIN_NAV: TemplateNavItem[] = [
  { label: 'Authentication', icon: 'tablerKey', active: false },
  { label: 'User management', icon: 'tablerUsers', active: true },
  { label: 'Security', icon: 'tablerShield', active: false },
  { label: 'Audit log', icon: 'tablerActivity', active: false },
  { label: 'Data exports', icon: 'tablerDatabase', active: false },
];

export const TEMPLATE_USERS: TemplateUser[] = [
  {
    id: 1,
    name: 'Liam Smith',
    email: 'liam.smith@acme.com',
    initials: 'LS',
    color: 'bg-sky-600 text-white',
    role: 'Manager',
    status: 'Active',
    joined: '24 Jun 2024',
    lastSeen: '5 minutes ago',
    twoFactor: true,
    team: 'Product',
  },
  {
    id: 2,
    name: 'Noah Anderson',
    email: 'noah.anderson@acme.com',
    initials: 'NA',
    color: 'bg-cyan-600 text-white',
    role: 'Developer',
    status: 'Active',
    joined: '15 Mar 2023',
    lastSeen: '18 minutes ago',
    twoFactor: true,
    team: 'Design Systems',
  },
  {
    id: 3,
    name: 'Isabella Garcia',
    email: 'isabella.garcia@acme.com',
    initials: 'IG',
    color: 'bg-pink-600 text-white',
    role: 'Developer',
    status: 'Inactive',
    joined: '10 Apr 2022',
    lastSeen: '22 days ago',
    twoFactor: true,
    team: 'Frontend',
  },
  {
    id: 4,
    name: 'William Clark',
    email: 'william.clark@acme.com',
    initials: 'WC',
    color: 'bg-blue-600 text-white',
    role: 'Owner',
    status: 'Active',
    joined: '28 Feb 2023',
    lastSeen: '1 hour ago',
    twoFactor: true,
    team: 'Leadership',
  },
  {
    id: 5,
    name: 'James Hall',
    email: 'james.hall@acme.com',
    initials: 'JH',
    color: 'bg-fuchsia-600 text-white',
    role: 'Analyst',
    status: 'Active',
    joined: '19 May 2024',
    lastSeen: 'Today, 09:41',
    twoFactor: true,
    team: 'Business Ops',
  },
  {
    id: 6,
    name: 'Benjamin Lewis',
    email: 'benjamin.lewis@acme.com',
    initials: 'BL',
    color: 'bg-amber-500 text-zinc-950',
    role: 'Analyst',
    status: 'Active',
    joined: '03 Jan 2024',
    lastSeen: 'Today, 08:25',
    twoFactor: true,
    team: 'Revenue',
  },
  {
    id: 7,
    name: 'Amelia Davis',
    email: 'amelia.davis@acme.com',
    initials: 'AD',
    color: 'bg-violet-600 text-white',
    role: 'Developer',
    status: 'Inactive',
    joined: '21 Jul 2023',
    lastSeen: '14 days ago',
    twoFactor: true,
    team: 'Mobile',
  },
  {
    id: 8,
    name: 'Emma Johnson',
    email: 'emma.johnson@acme.com',
    initials: 'EJ',
    color: 'bg-emerald-600 text-white',
    role: 'Developer',
    status: 'Active',
    joined: '16 Sep 2023',
    lastSeen: 'Yesterday',
    twoFactor: true,
    team: 'Platform',
  },
  {
    id: 9,
    name: 'Olivia Brown',
    email: 'olivia.brown@acme.com',
    initials: 'OB',
    color: 'bg-teal-600 text-white',
    role: 'Support',
    status: 'Active',
    joined: '04 Nov 2022',
    lastSeen: 'Today, 11:12',
    twoFactor: true,
    team: 'Customer Ops',
  },
  {
    id: 10,
    name: 'Ava Williams',
    email: 'ava.williams@acme.com',
    initials: 'AW',
    color: 'bg-rose-600 text-white',
    role: 'Developer',
    status: 'Active',
    joined: '30 Dec 2023',
    lastSeen: 'Today, 10:03',
    twoFactor: true,
    team: 'Infrastructure',
  },
  {
    id: 11,
    name: 'Mia Miller',
    email: 'mia.miller@acme.com',
    initials: 'MM',
    color: 'bg-purple-600 text-white',
    role: 'Admin',
    status: 'Inactive',
    joined: '12 Aug 2022',
    lastSeen: '31 days ago',
    twoFactor: true,
    team: 'Security',
  },
  {
    id: 12,
    name: 'Lucas Young',
    email: 'lucas.young@acme.com',
    initials: 'LY',
    color: 'bg-cyan-700 text-white',
    role: 'Developer',
    status: 'Active',
    joined: '17 Oct 2023',
    lastSeen: '2 hours ago',
    twoFactor: true,
    team: 'Frontend',
  },
  {
    id: 13,
    name: 'Alexander Wright',
    email: 'alexander.wright@acme.com',
    initials: 'AW',
    color: 'bg-blue-500 text-white',
    role: 'Developer',
    status: 'Active',
    joined: '08 Feb 2023',
    lastSeen: 'Just now',
    twoFactor: true,
    team: 'DevOps',
  },
  {
    id: 14,
    name: 'Harper Martinez',
    email: 'harper.martinez@acme.com',
    initials: 'HM',
    color: 'bg-indigo-600 text-white',
    role: 'Admin',
    status: 'Invited',
    joined: '27 Jul 2024',
    lastSeen: 'Invite pending',
    twoFactor: false,
    team: 'Architecture',
  },
];
