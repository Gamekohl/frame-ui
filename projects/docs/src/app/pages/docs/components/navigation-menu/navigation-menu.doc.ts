import { ComponentDoc } from '../../shared/models/component-doc.model';
import { DocsNavigationMenuPreviewComponent } from './previews/navigation-menu-preview';

const importsCode = `import { FrNavigationMenuModule } from '@frame-ui-ng/components/navigation-menu';`;

const basicHtml = `<nav frNavigationMenu>
  <ul frNavigationMenuList>
    <li frNavigationMenuItem>
      <button [frNavigationMenuTrigger]="gettingStarted" type="button">
        Getting started
        <ng-icon name="tablerChevronDown" size="16" />
      </button>

      <ng-template #gettingStarted="frNavigationMenuContent" frNavigationMenuContent>
        <div frNavigationMenuPanel>
          <div frNavigationMenuGrid [columns]="2">
            <a frNavigationMenuLink frNavigationMenuFeature href="/docs/overview">
              <span frNavigationMenuLinkTitle>Angular Components</span>
              <span frNavigationMenuLinkDescription>
                Token-first primitives built for modern Angular.
              </span>
            </a>
            <div frNavigationMenuGrid>
              <a frNavigationMenuLink href="/docs/overview">
                <span frNavigationMenuLinkTitle>Introduction</span>
                <span frNavigationMenuLinkDescription>
                  Understand the library and styling foundation.
                </span>
              </a>
              <div frNavigationLinkSeparator></div>
              <a frNavigationMenuLink href="/docs/installation">
                <span frNavigationMenuLinkTitle>Installation</span>
                <span frNavigationMenuLinkDescription>
                  Add the library and configure shared styles.
                </span>
              </a>
            </div>
          </div>
        </div>
      </ng-template>
    </li>

    <li frNavigationMenuItem>
      <a frNavigationMenuLink href="/docs">Docs</a>
    </li>
  </ul>
  <div frNavigationMenuIndicator></div>
</nav>`;

const customLinkHtml = `<nav frNavigationMenu>
  <ul frNavigationMenuList>
    <li frNavigationMenuItem>
      <a frNavigationMenuLink href="/docs" class="frame-navigation-menu__trigger">
        Documentation
      </a>
    </li>
    <li frNavigationMenuItem>
      <a frNavigationMenuLink active href="/docs/components">
        Components
      </a>
    </li>
  </ul>
</nav>`;

const viewportHtml = `<div class="navigation-menu-demo">
  <nav frNavigationMenu>
    <ul frNavigationMenuList>
      <li frNavigationMenuItem>
        <button [frNavigationMenuTrigger]="menu" type="button">
          Getting started
          <ng-icon name="tablerChevronDown" size="16" />
        </button>

        <ng-template #menu="frNavigationMenuContent" frNavigationMenuContent>
          <div frNavigationMenuPanel>
            <!-- regular overlay content -->
          </div>
        </ng-template>
      </li>
    </ul>
    <div frNavigationMenuIndicator></div>
  </nav>

  <div frNavigationMenuViewport>
    <div frNavigationMenuGrid [columns]="2">
      <a frNavigationMenuLink frNavigationMenuFeature href="/docs/overview">
        <span frNavigationMenuLinkTitle>Viewport preview</span>
        <span frNavigationMenuLinkDescription>
          Use the viewport primitive for persistent panel demos or custom layouts.
        </span>
      </a>
    </div>
  </div>
</div>`;

const customStylingCss = `.product-navigation {
  --frame-navigation-menu-bg: color-mix(in srgb, var(--frame-primary) 8%, transparent);
  --frame-navigation-menu-trigger-hover-bg: color-mix(in srgb, var(--frame-primary) 14%, transparent);
  --frame-navigation-menu-trigger-open-bg: var(--frame-primary);
  --frame-navigation-menu-trigger-open-color: var(--frame-primary-foreground);
  --frame-navigation-menu-link-hover-bg: color-mix(in srgb, var(--frame-primary) 12%, transparent);
  --frame-dropdown-menu-panel-radius: var(--frame-radius-lg);
  --frame-dropdown-menu-panel-shadow: 0 24px 70px color-mix(in srgb, var(--frame-primary) 18%, transparent);
}`;

const rtlHtml = `<div dir="rtl">
  <nav frNavigationMenu>
    <ul frNavigationMenuList>
      <li frNavigationMenuItem>
        <button [frNavigationMenuTrigger]="startMenu" type="button">
          البدء
          <ng-icon name="tablerChevronDown" size="16" />
        </button>

        <ng-template #startMenu="frNavigationMenuContent" frNavigationMenuContent align="end">
          <div frNavigationMenuPanel>
            <div frNavigationMenuGrid [columns]="2">
              <a frNavigationMenuLink href="/docs/overview">
                <span frNavigationMenuLinkTitle>نظرة عامة</span>
                <span frNavigationMenuLinkDescription>
                  تعرف على المكتبة ومبادئها.
                </span>
              </a>
              <a frNavigationMenuLink href="/docs/installation">
                <span frNavigationMenuLinkTitle>التثبيت</span>
                <span frNavigationMenuLinkDescription>
                  أضف المكونات إلى مشروع Angular.
                </span>
              </a>
            </div>
          </div>
        </ng-template>
      </li>

      <li frNavigationMenuItem>
        <a frNavigationMenuLink href="/docs">الوثائق</a>
      </li>
    </ul>
    <div frNavigationMenuIndicator></div>
  </nav>
</div>`;

export const NAVIGATION_MENU_DOC: ComponentDoc = {
  slug: 'navigation-menu',
  breadcrumb: 'Components / Navigation Menu',

  hero: {
    id: 'navigation-menu-hero',
    title: 'Preview',
    description: 'A collection of links and dropdown panels for navigating websites.',
    preview: {
      component: DocsNavigationMenuPreviewComponent,
    },
  },

  installation: {
    cli: {
      language: 'bash',
      code: 'npx your-cli add navigation-menu',
    },
    manual: {
      steps: [
        {
          title: 'Import the navigation menu primitives your template needs.',
          code: {
            language: 'ts',
            code: importsCode,
          },
        },
      ],
    },
  },

  usage: [
    { language: 'ts', code: importsCode },
    { language: 'html', code: basicHtml },
  ],

  composition: `NavigationMenu
├── NavigationMenuList
│   ├── NavigationMenuItem
│   │   ├── NavigationMenuTrigger
│   │   └── NavigationMenuContent
│   │       ├── NavigationMenuLink
│   │       └── NavigationMenuLink
│   └── NavigationMenuItem
│       └── NavigationMenuLink
├── NavigationMenuIndicator
└── NavigationMenuViewport`,

  tokenInspector: {
    id: 'navigation-menu-tokens',
    title: 'Token Inspector',
    description:
      'Inspect the navigation shell, triggers, dropdown-backed panel, link cards, indicator, and viewport tokens.',
    preview: {
      component: DocsNavigationMenuPreviewComponent,
      containerClass: 'w-full',
      inputs: {
        config: {
          mode: 'inspector',
        },
      },
      inspectorTargets: [
        {
          id: 'navigation-menu-root',
          label: 'Navigation menu',
          selector: '[data-token-target="navigation-menu-root"]',
          description:
            'The root controls overall color and positioning for the navigation menu primitive.',
          tokens: ['--frame-navigation-menu-color'],
        },
        {
          id: 'navigation-menu-list',
          label: 'List',
          selector: '[data-token-target="navigation-menu-list"]',
          description:
            'The list owns horizontal layout, spacing, background, padding, and radius for top-level navigation items.',
          tokens: [
            '--frame-navigation-menu-gap',
            '--frame-navigation-menu-padding',
            '--frame-navigation-menu-radius',
            '--frame-navigation-menu-bg',
          ],
        },
        {
          id: 'navigation-menu-trigger',
          label: 'Trigger',
          selector: '[data-token-target="navigation-menu-trigger"]',
          description:
            'Triggers open dropdown-backed panels and expose hover, focus, and open state tokens.',
          tokens: [
            '--frame-navigation-menu-trigger-height',
            '--frame-navigation-menu-trigger-padding-x',
            '--frame-navigation-menu-trigger-gap',
            '--frame-navigation-menu-trigger-radius',
            '--frame-navigation-menu-trigger-font-size',
            '--frame-navigation-menu-trigger-font-weight',
            '--frame-navigation-menu-trigger-bg',
            '--frame-navigation-menu-trigger-color',
            '--frame-navigation-menu-trigger-hover-bg',
            '--frame-navigation-menu-trigger-hover-color',
            '--frame-navigation-menu-trigger-open-bg',
            '--frame-navigation-menu-trigger-open-color',
            '--frame-navigation-menu-trigger-focus-shadow',
          ],
        },
        {
          id: 'navigation-menu-panel',
          label: 'Panel',
          selector: '[data-token-target="navigation-menu-panel"]',
          description:
            'Panels reuse dropdown-menu surface tokens and add navigation-menu content width and grid spacing.',
          tokens: [
            '--frame-navigation-menu-content-width',
            '--frame-navigation-menu-content-gap',
            '--frame-dropdown-menu-panel-bg',
            '--frame-dropdown-menu-panel-border',
            '--frame-dropdown-menu-panel-radius',
            '--frame-dropdown-menu-panel-shadow',
            '--frame-dropdown-menu-panel-padding',
          ],
        },
        {
          id: 'navigation-menu-link',
          label: 'Link',
          selector: '[data-token-target="navigation-menu-link"]',
          description:
            'Links work as standalone top-level links or rich cards inside dropdown content.',
          tokens: [
            '--frame-navigation-menu-link-gap',
            '--frame-navigation-menu-link-padding',
            '--frame-navigation-menu-link-radius',
            '--frame-navigation-menu-link-bg',
            '--frame-navigation-menu-link-color',
            '--frame-navigation-menu-link-hover-bg',
            '--frame-navigation-menu-link-hover-color',
            '--frame-navigation-menu-link-active-bg',
            '--frame-navigation-menu-link-active-color',
          ],
        },
        {
          id: 'navigation-menu-link-title',
          label: 'Link title',
          selector: '[data-token-target="navigation-menu-link-title"]',
          description: 'Title tokens define the primary text treatment inside navigation links.',
          tokens: [
            '--frame-navigation-menu-link-title-font-size',
            '--frame-navigation-menu-link-title-font-weight',
          ],
        },
        {
          id: 'navigation-menu-link-description',
          label: 'Link description',
          selector: '[data-token-target="navigation-menu-link-description"]',
          description: 'Description tokens tune secondary explanatory text inside rich links.',
          tokens: [
            '--frame-navigation-menu-link-description-color',
            '--frame-navigation-menu-link-description-font-size',
          ],
        },
        {
          id: 'navigation-menu-link-separator',
          label: 'Link separator',
          selector: '[data-token-target="navigation-menu-link-separator"]',
          description: 'Separators divide related navigation-link groups inside dropdown panels.',
          tokens: [
            '--frame-navigation-menu-link-separator-color',
            '--frame-navigation-menu-link-separator-margin-y',
          ],
        },
        {
          id: 'navigation-menu-feature',
          label: 'Feature link',
          selector: '[data-token-target="navigation-menu-feature"]',
          description: 'Feature links use a larger visual treatment for promoted destinations.',
          tokens: [
            '--frame-navigation-menu-feature-bg',
            '--frame-navigation-menu-feature-color',
          ],
        },
        {
          id: 'navigation-menu-indicator',
          label: 'Indicator',
          selector: '[data-token-target="navigation-menu-indicator"]',
          description: 'The indicator is a small bridge between the trigger row and open content.',
          tokens: ['--frame-navigation-menu-indicator-size', '--frame-navigation-menu-indicator-bg'],
        },
        {
          id: 'navigation-menu-viewport',
          label: 'Viewport',
          selector: '[data-token-target="navigation-menu-viewport"]',
          description:
            'The viewport primitive mirrors dropdown-menu panel surface tokens for persistent or custom panel layouts.',
          tokens: [
            '--frame-navigation-menu-viewport-radius',
            '--frame-navigation-menu-viewport-border',
            '--frame-navigation-menu-viewport-bg',
            '--frame-navigation-menu-viewport-shadow',
          ],
        },
      ],
    },
  },

  styling: {
    description:
      'Override navigation-menu tokens for the top-level trigger row and link cards, and dropdown-menu tokens for opened panel surfaces.',
    preview: {
      id: 'custom-styling-preview',
      title: 'Custom Styling Preview',
      description: 'This preview customizes the trigger row, panel radius, shadow, and link hover treatment.',
      preview: {
        component: DocsNavigationMenuPreviewComponent,
        inputs: {
          config: {
            mode: 'custom-styling',
          },
        },
      },
      code: [
        {
          language: 'ts',
          code: importsCode,
        },
        {
          language: 'html',
          code: `<nav frNavigationMenu class="product-navigation">
  ...
</nav>`,
        },
        {
          language: 'css',
          code: customStylingCss,
        },
      ],
    },
  },

  examples: [
    {
      id: 'navigation-menu-basic',
      title: 'Basic',
      description:
        'Use triggers for destinations that need rich dropdown content and links for direct navigation.',
      preview: {
        component: DocsNavigationMenuPreviewComponent,
      },
      code: [
        { language: 'ts', code: importsCode },
        { language: 'html', code: basicHtml },
      ],
    },
    {
      id: 'navigation-menu-custom-link',
      title: 'Link Component',
      description:
        'Compose `FrNavigationMenuLink` with anchors or router links, and add the trigger class when a direct link should visually match trigger buttons.',
      preview: {
        component: DocsNavigationMenuPreviewComponent,
        inputs: { config: { mode: 'custom-link' } },
      },
      code: [
        { language: 'ts', code: importsCode },
        { language: 'html', code: customLinkHtml },
      ],
    },
    {
      id: 'navigation-menu-indicator',
      title: 'Indicator',
      description: 'Use the indicator primitive when you want a visual bridge from trigger row to panel.',
      preview: {
        component: DocsNavigationMenuPreviewComponent,
        inputs: { config: { mode: 'indicator' } },
      },
      code: [
        { language: 'ts', code: importsCode },
        { language: 'html', code: `<div frNavigationMenuIndicator></div>` },
      ],
    },
    {
      id: 'navigation-menu-viewport',
      title: 'Viewport',
      description:
        'Use the viewport primitive for persistent preview panels or custom layouts that should use the same surface tokens.',
      preview: {
        component: DocsNavigationMenuPreviewComponent,
        inputs: { config: { mode: 'viewport' } },
      },
      code: [
        { language: 'ts', code: importsCode },
        { language: 'html', code: viewportHtml },
      ],
    },
    {
      id: 'navigation-menu-rtl',
      title: 'RTL support',
      description:
        'Navigation menu inherits direction and supports aligned RTL dropdown panels through the content alignment input.',
      preview: {
        component: DocsNavigationMenuPreviewComponent,
        inputs: { config: { mode: 'rtl' } },
      },
      code: [
        { language: 'ts', code: importsCode },
        { language: 'html', code: rtlHtml },
      ],
    },
  ],

  tokensTitle: 'Design Tokens',
  tokensDescription:
    'Navigation Menu defines tokens for trigger rows, rich links, feature cards, indicator, and viewport while opened panels reuse the dropdown-menu surface token contract.',
  tokens: `
  --frame-navigation-menu-gap: 0.25rem;
  --frame-navigation-menu-padding: 0.25rem;
  --frame-navigation-menu-radius: var(--frame-radius-md);
  --frame-navigation-menu-bg: transparent;
  --frame-navigation-menu-color: var(--frame-foreground);
  --frame-navigation-menu-trigger-height: 2.25rem;
  --frame-navigation-menu-trigger-padding-x: 0.875rem;
  --frame-navigation-menu-trigger-gap: 0.375rem;
  --frame-navigation-menu-trigger-radius: var(--frame-radius-sm);
  --frame-navigation-menu-trigger-font-size: 0.875rem;
  --frame-navigation-menu-trigger-font-weight: 500;
  --frame-navigation-menu-trigger-bg: transparent;
  --frame-navigation-menu-trigger-color: var(--frame-navigation-menu-color);
  --frame-navigation-menu-trigger-hover-bg: var(--frame-accent);
  --frame-navigation-menu-trigger-hover-color: var(--frame-accent-foreground);
  --frame-navigation-menu-trigger-open-bg: var(--frame-accent);
  --frame-navigation-menu-trigger-open-color: var(--frame-accent-foreground);
  --frame-navigation-menu-content-width: 36rem;
  --frame-navigation-menu-content-gap: 0.75rem;
  --frame-navigation-menu-link-gap: 0.25rem;
  --frame-navigation-menu-link-padding: 0.75rem;
  --frame-navigation-menu-link-radius: var(--frame-radius-md);
  --frame-navigation-menu-link-hover-bg: var(--frame-accent);
  --frame-navigation-menu-link-active-bg: var(--frame-accent);
  --frame-navigation-menu-link-separator-color: var(--frame-border);
  --frame-navigation-menu-link-separator-margin-y: 0.25rem;
  --frame-navigation-menu-feature-bg: linear-gradient(135deg, var(--frame-muted), color-mix(in srgb, var(--frame-primary) 12%, var(--frame-surface)));
  --frame-navigation-menu-indicator-size: 0.625rem;
  --frame-navigation-menu-viewport-bg: var(--frame-dropdown-menu-panel-bg, var(--frame-surface));
  `,
};

