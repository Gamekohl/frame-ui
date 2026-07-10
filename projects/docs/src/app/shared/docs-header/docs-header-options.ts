export type DocsSearchPage = {
  readonly title: string;
  readonly path: string;
  readonly section: string;
  readonly keywords: readonly string[];
};

export type DocsPaletteId = 'frame' | 'circuit' | 'signal' | 'plasma' | 'custom';
export type DocsRadiusId = 'none' | 'sm' | 'md' | 'lg';
export type DocsDensityId = 'default' | 'compact' | 'comfortable';
export type DocsShadowId = 'flat' | 'default' | 'raised';

export type DocsPalette = {
  readonly id: DocsPaletteId;
  readonly label: string;
  readonly description: string;
  readonly swatch: string;
};

export type DocsRadiusPreset = {
  readonly id: DocsRadiusId;
  readonly label: string;
  readonly description: string;
  readonly values: {
    readonly sm: string;
    readonly md: string;
    readonly lg: string;
  };
};

export type DocsDensityPreset = {
  readonly id: DocsDensityId;
  readonly label: string;
  readonly description: string;
};

export type DocsShadowPreset = {
  readonly id: DocsShadowId;
  readonly label: string;
  readonly description: string;
};

export const DOCS_PALETTES: readonly DocsPalette[] = [
  {
    id: 'frame',
    label: 'Frame Red',
    description: 'Default technical palette',
    swatch: '#d71920',
  },
  {
    id: 'circuit',
    label: 'Circuit Green',
    description: 'Sharper product tint',
    swatch: 'oklch(0.58 0.18 153)',
  },
  {
    id: 'signal',
    label: 'Signal Blue',
    description: 'Cooler app surface',
    swatch: 'oklch(0.58 0.2 255)',
  },
  {
    id: 'plasma',
    label: 'Plasma Violet',
    description: 'Louder neon system',
    swatch: 'oklch(0.65 0.26 318)',
  },
  {
    id: 'custom',
    label: 'Custom...',
    description: 'Your color tokens',
    swatch: 'linear-gradient(135deg, #ffffff 0 35%, #d71920 35% 58%, #f2f2f2 58% 76%, #111827 76%)',
  },
];

export const DOCS_RADIUS_PRESETS: readonly DocsRadiusPreset[] = [
  {
    id: 'none',
    label: 'Sharp',
    description: 'No rounding',
    values: {
      sm: '0px',
      md: '0px',
      lg: '0px',
    },
  },
  {
    id: 'sm',
    label: 'Small',
    description: 'Subtle rounding',
    values: {
      sm: '0.125rem',
      md: '0.25rem',
      lg: '0.375rem',
    },
  },
  {
    id: 'md',
    label: 'Medium',
    description: 'Balanced rounding',
    values: {
      sm: '0.25rem',
      md: '0.5rem',
      lg: '0.75rem',
    },
  },
  {
    id: 'lg',
    label: 'Large',
    description: 'Soft surfaces',
    values: {
      sm: '0.375rem',
      md: '0.75rem',
      lg: '1rem',
    },
  },
];

export const DOCS_DENSITY_PRESETS: readonly DocsDensityPreset[] = [
  {
    id: 'default',
    label: 'Default',
    description: 'Balanced controls',
  },
  {
    id: 'compact',
    label: 'Compact',
    description: 'Tighter screens',
  },
  {
    id: 'comfortable',
    label: 'Comfortable',
    description: 'More room',
  },
];

export const DOCS_SHADOW_PRESETS: readonly DocsShadowPreset[] = [
  {
    id: 'default',
    label: 'Default',
    description: 'Default elevation',
  },
  {
    id: 'flat',
    label: 'Flat',
    description: 'No elevation',
  },
  {
    id: 'raised',
    label: 'Raised',
    description: 'Stronger elevation',
  },
];

export const DOCS_SEARCH_PAGES: readonly DocsSearchPage[] = [
  {
    title: 'Overview',
    path: '/docs/overview',
    section: 'Docs',
    keywords: ['introduction', 'component library', 'getting started'],
  },
  {
    title: 'Installation',
    path: '/docs/installation',
    section: 'Docs',
    keywords: ['setup', 'install', 'npm', 'angular'],
  },
  {
    title: 'Theming',
    path: '/docs/theming',
    section: 'Docs',
    keywords: ['theme', 'css variables', 'customization'],
  },
  {
    title: 'Components',
    path: '/docs/components',
    section: 'Docs',
    keywords: ['catalog', 'primitives', 'ui'],
  },
  {
    title: 'Blocks',
    path: '/blocks/authentication',
    section: 'Examples',
    keywords: [
      'blocks',
      'templates',
      'authentication',
      'dashboard',
      'settings',
      'examples',
      'patterns',
    ],
  },
  {
    title: 'Product catalog',
    path: '/templates/product-catalog',
    section: 'Templates',
    keywords: ['templates', 'admin', 'product catalog', 'crud', 'products', 'inventory', 'table'],
  },
  {
    title: 'Inventory',
    path: '/templates/inventory',
    section: 'Templates',
    keywords: ['templates', 'admin', 'inventory', 'warehouse', 'stock', 'transfer', 'cycle count'],
  },
  {
    title: 'User management',
    path: '/templates/user-management',
    section: 'Templates',
    keywords: ['templates', 'admin', 'user management', 'roles', 'permissions', 'table'],
  },
  {
    title: 'Roles & Permissions',
    path: '/templates/roles-permissions',
    section: 'Templates',
    keywords: ['templates', 'admin', 'roles', 'permissions', 'matrix', 'access control'],
  },
  {
    title: 'Settings',
    path: '/templates/settings',
    section: 'Templates',
    keywords: ['templates', 'admin', 'settings', 'workspace', 'billing', 'security'],
  },
  {
    title: 'Theme tokens',
    path: '/docs/theme-tokens',
    section: 'Docs',
    keywords: ['tokens', 'colors', 'foundation'],
  },
  {
    title: 'Roadmap',
    path: '/docs/roadmap',
    section: 'Planning',
    keywords: ['roadmap', 'planned', 'in progress', 'work in progress', 'todo'],
  },
  {
    title: 'Changelog',
    path: '/docs/changelog',
    section: 'Planning',
    keywords: ['changelog', 'release', 'version', 'beta', 'changes'],
  },
];

export const DOCS_CHART_PAGES: readonly DocsSearchPage[] = [
  {
    title: 'Area',
    path: '/charts/area',
    section: 'Charts',
    keywords: ['charts', 'area chart', 'graph', 'data visualization'],
  },
  {
    title: 'Bar',
    path: '/charts/bar',
    section: 'Charts',
    keywords: ['charts', 'bar chart', 'columns', 'data visualization'],
  },
  {
    title: 'Line',
    path: '/charts/line',
    section: 'Charts',
    keywords: ['charts', 'line chart', 'trend', 'data visualization'],
  },
  {
    title: 'Pie',
    path: '/charts/pie',
    section: 'Charts',
    keywords: ['charts', 'pie chart', 'donut', 'categories', 'data visualization'],
  },
  {
    title: 'Radial',
    path: '/charts/radial',
    section: 'Charts',
    keywords: ['charts', 'radial chart', 'progress ring', 'data visualization'],
  },
];

export const DOCS_TOOLS_PAGES: readonly DocsSearchPage[] = [
  {
    title: 'MCP',
    path: '/docs/mcp',
    section: 'Tooling',
    keywords: ['model context protocol', 'ai', 'tools', 'composer', 'coming soon'],
  },
];
