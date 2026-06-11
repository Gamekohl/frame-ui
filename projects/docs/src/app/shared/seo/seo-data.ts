export const SITE_NAME = 'FrameUI';
export const SITE_URL = 'https://frame-ui.com';
export const DEFAULT_IMAGE_PATH = '/frame-ui-logo.png';

export interface SeoMetadata {
  readonly title: string;
  readonly description: string;
  readonly path: string;
  readonly imagePath?: string;
  readonly robots?: string;
}

interface ComponentSeoEntry {
  readonly name: string;
  readonly summary: string;
}

export const DEFAULT_SEO: SeoMetadata = {
  title: 'FrameUI - Angular component library',
  description:
    'FrameUI is a polished Angular component library for building accessible, themeable interfaces with components, tokens, and production-ready examples.',
  path: '/',
};

const STATIC_ROUTES = {
  '/': DEFAULT_SEO,
  '/docs': {
    title: `Overview | ${SITE_NAME}`,
    description:
      'Learn how FrameUI organizes Angular components, design tokens, accessibility, theming, and examples for production interfaces.',
    path: '/docs/overview',
  },
  '/docs/overview': {
    title: `Overview | ${SITE_NAME}`,
    description:
      'Learn how FrameUI organizes Angular components, design tokens, accessibility, theming, and examples for production interfaces.',
    path: '/docs/overview',
  },
  '/docs/installation': {
    title: `Installation | ${SITE_NAME}`,
    description:
      'Install FrameUI packages and configure styles, providers, and imports in an Angular application.',
    path: '/docs/installation',
  },
  '/docs/theming': {
    title: `Theming | ${SITE_NAME}`,
    description:
      'Customize FrameUI themes with design tokens, dark mode, CSS variables, and scoped component overrides.',
    path: '/docs/theming',
  },
  '/docs/components': {
    title: `Components | ${SITE_NAME}`,
    description:
      'Browse the FrameUI Angular component catalog, including actions, forms, overlays, navigation, feedback, and data display primitives.',
    path: '/docs/components',
  },
  '/docs/theme-tokens': {
    title: `Theme Tokens | ${SITE_NAME}`,
    description:
      'Explore the FrameUI design token system for colors, typography, spacing, radii, shadows, motion, and component styling.',
    path: '/docs/theme-tokens',
  },
  '/docs/mcp': {
    title: `MCP | ${SITE_NAME}`,
    description:
      'Use the FrameUI MCP workflow to generate Angular component snippets, inspect APIs, and compose UI patterns faster.',
    path: '/docs/mcp',
  },
  '/docs/roadmap': {
    title: `Roadmap | ${SITE_NAME}`,
    description:
      'Follow the FrameUI roadmap for planned Angular components, documentation improvements, theming work, and tooling updates.',
    path: '/docs/roadmap',
  },
  '/docs/changelog': {
    title: `Changelog | ${SITE_NAME}`,
    description:
      'Read the main changes in each FrameUI beta release.',
    path: '/docs/changelog',
  },
} satisfies Record<string, SeoMetadata>;

const COMPONENTS = {
  accordion: {
    name: 'Accordion',
    summary: 'Composable disclosure primitives for progressive reveal content.',
  },
  alert: {
    name: 'Alert',
    summary: 'Contextual feedback blocks for status, caution, and system messaging.',
  },
  avatar: {
    name: 'Avatar',
    summary: 'Identity visuals with image, fallback, badge, and grouping patterns.',
  },
  badge: {
    name: 'Badge',
    summary: 'Small metadata labels for state, tags, and secondary status.',
  },
  button: {
    name: 'Button',
    summary: 'Action primitives with variants, loading, icon support, and sizing options.',
  },
  'button-group': {
    name: 'Button Group',
    summary: 'Grouped actions with shared borders and compact horizontal layouts.',
  },
  breadcrumb: {
    name: 'Breadcrumb',
    summary: 'Semantic navigation trails with links, current page, separators, ellipsis, and RTL support.',
  },
  calendar: {
    name: 'Calendar',
    summary:
      'Date and range selection with dropdown captions, week numbers, disabled dates, timezone formatting, and RTL support.',
  },
  card: {
    name: 'Card',
    summary:
      'Composable content surfaces with header, content, footer, actions, media, sizing, and spacing tokens.',
  },
  carousel: {
    name: 'Carousel',
    summary:
      'Composable scroll-snap carousel primitives with sizing, spacing, orientation, API, plugins, and RTL support.',
  },
  checkbox: {
    name: 'Checkbox',
    summary: 'Native form-compatible boolean input with token-based styling.',
  },
  collapsible: {
    name: 'Collapsible',
    summary: 'Single-panel disclosure primitive for toggling additional content.',
  },
  command: {
    name: 'Command',
    summary: 'Searchable command menus and command palettes for quick actions.',
  },
  combobox: {
    name: 'Combobox',
    summary: 'Searchable single and multi-value selection with composable slots.',
  },
  'context-menu': {
    name: 'Context Menu',
    summary:
      'Right-click and long-press menus with actions, groups, submenus, shortcuts, checkbox and radio items.',
  },
  'date-picker': {
    name: 'Date Picker',
    summary:
      'Calendar-backed date and range picker with presets, editable input, time selection, RTL, and reactive forms support.',
  },
  'dropdown-menu': {
    name: 'Dropdown Menu',
    summary: 'Menus with hover and click triggers, submenus, and keyboard support.',
  },
  empty: {
    name: 'Empty',
    summary: 'Composable empty states with media, title, description, actions, inputs, avatars, and RTL support.',
  },
  'hover-card': {
    name: 'Hover Card',
    summary:
      'Delayed hover previews for links and actions with configurable timing, positioning, styling, and RTL support.',
  },
  field: {
    name: 'Field',
    summary: 'Layout composition primitives for labels, descriptions, and errors.',
  },
  input: {
    name: 'Input',
    summary: 'Native text input primitives with labeling and feedback patterns.',
  },
  'input-otp': {
    name: 'Input OTP',
    summary:
      'One-time password input with grouped slots, separators, paste support, patterns, and reactive forms compatibility.',
  },
  item: {
    name: 'Item',
    summary: 'Composable row primitive with media, content, descriptions, actions, grouping, links, sizing, and RTL support.',
  },
  menubar: {
    name: 'Menubar',
    summary:
      'Persistent application menu built on dropdown-menu primitives with groups, checkbox and radio items, submenus, shortcuts, icons, and RTL support.',
  },
  'navigation-menu': {
    name: 'Navigation Menu',
    summary:
      'Website navigation primitive with dropdown-backed panels, rich links, indicators, viewport styling, direct links, and RTL support.',
  },
  pagination: {
    name: 'Pagination',
    summary:
      'Page navigation primitives with previous, next, active links, ellipsis, disabled states, dropdown pairing, and RTL support.',
  },
  popover: {
    name: 'Popover',
    summary:
      'Anchored overlay content with trigger, close controls, alignment, controlled state, forms, custom styling, and RTL support.',
  },
  progress: {
    name: 'Progress',
    summary:
      'Accessible progress indicators with determinate, indeterminate, labeled, controlled, custom styling, and RTL patterns.',
  },
  'radio-group': {
    name: 'Radio Group',
    summary:
      'Native radio group primitives with descriptions, choice cards, fieldset grouping, reactive forms validation, custom styling, and RTL support.',
  },
  resizable: {
    name: 'Resizable',
    summary:
      'Accessible resizable panel groups with horizontal and vertical layouts, handles, nested groups, constraints, keyboard resizing, and RTL support.',
  },
  separator: {
    name: 'Separator',
    summary: 'Visual and semantic dividers with horizontal, vertical, decorative, custom styling, and RTL support.',
  },
  sheet: {
    name: 'Sheet',
    summary:
      'Edge-mounted dialog panels with sides, headers, descriptions, footers, scrollable content, programmatic opening, and RTL support.',
  },
  sidebar: {
    name: 'Sidebar',
    summary:
      'Composable application sidebars with provider state, variants, collapsible modes, menu primitives, rail, trigger, skeletons, and RTL support.',
  },
  skeleton: {
    name: 'Skeleton',
    summary: 'Composable loading placeholders with sizing inputs, shimmer animation, token styling, and RTL-friendly layouts.',
  },
  spinner: {
    name: 'Spinner',
    summary:
      'Portable loading indicator primitive with accessible status, decorative mode, size presets, token styling, and composition examples.',
  },
  slider: {
    name: 'Slider',
    summary: 'Range input primitive with single, range, multiple thumb, vertical, controlled, RTL, and reactive forms support.',
  },
  modal: {
    name: 'Modal',
    summary: 'Dialog primitives powered by Angular CDK with trigger, close, layout, and programmatic opening support.',
  },
  select: {
    name: 'Select',
    summary: 'Button-triggered listbox selection built with composable primitives.',
  },
  switch: {
    name: 'Switch',
    summary: 'Native checkbox-based toggle control for boolean settings.',
  },
  table: {
    name: 'Table',
    summary:
      'CDK-backed table primitives with captions, headers, rows, footers, sticky columns, empty states, actions, and virtual scrolling support.',
  },
  tabs: {
    name: 'Tabs',
    summary: 'Composable tab panels with list, trigger, content, variants, icons, vertical layout, RTL, and router-link support.',
  },
  textarea: {
    name: 'Textarea',
    summary: 'Native multi-line text input with invalid, disabled, RTL, and Field composition support.',
  },
  toggle: {
    name: 'Toggle',
    summary: 'Two-state button primitive with pressed state, variants, sizing, icons, labels, and reactive forms support.',
  },
  tooltip: {
    name: 'Tooltip',
    summary: 'Hover and focus hints with side, alignment, delay, keyboard dismissal, arrow variants, and RTL support.',
  },
  toast: {
    name: 'Toast',
    summary: 'Stackable notifications with variants, actions, loading states, dismissal controls, positions, and RTL support.',
  },
  'virtual-scroll': {
    name: 'Virtual Scroll',
    summary: 'Reusable fixed-row virtualization primitives for large data sets.',
  },
} satisfies Record<string, ComponentSeoEntry>;

const COMPONENT_ROUTES = Object.fromEntries(
  Object.entries(COMPONENTS).map(([slug, component]) => [
    `/docs/components/${slug}`,
    {
      title: `${component.name} | ${SITE_NAME}`,
      description: `${component.summary} Explore usage, examples, composition notes, and design tokens for the ${component.name} component in FrameUI.`,
      path: `/docs/components/${slug}`,
    },
  ]),
) as Record<string, SeoMetadata>;

const SEO_ROUTES: Record<string, SeoMetadata> = {
  ...STATIC_ROUTES,
  ...COMPONENT_ROUTES,
};

export function getSeoForPath(path: string): SeoMetadata {
  return SEO_ROUTES[normalizePath(path)] ?? DEFAULT_SEO;
}

export function normalizePath(path: string): string {
  const [pathname = '/'] = path.split(/[?#]/);
  const normalized = pathname || '/';

  if (normalized !== '/' && normalized.endsWith('/')) {
    return normalized.slice(0, -1);
  }

  return normalized;
}
