import { ComponentDoc } from '../../shared/models/component-doc.model';
import { DocsTabsPreviewComponent } from './previews/tabs-preview';

const importsCode = `import { FrTabsModule } from '@frame-ui-ng/components/tabs';`;

const usageHtml = `<div frTabs defaultValue="account">
  <div frTabsList>
    <button frTabsTrigger value="account">Account</button>
    <button frTabsTrigger value="security">Security</button>
  </div>

  <div frTabsContent value="account">
    Manage account details.
  </div>

  <div frTabsContent value="security">
    Review security settings.
  </div>
</div>`;

const lineHtml = `<div frTabs defaultValue="overview">
  <div frTabsList variant="line">
    <button frTabsTrigger value="overview">Overview</button>
    <button frTabsTrigger value="activity">Activity</button>
    <button frTabsTrigger value="notes">Notes</button>
  </div>

  <div frTabsContent value="overview">
    Summary content.
  </div>

  <div frTabsContent value="activity">
    Activity content.
  </div>

  <div frTabsContent value="notes">
    Notes content.
  </div>
</div>`;

const verticalHtml = `<div frTabs defaultValue="profile" orientation="vertical">
  <div frTabsList>
    <button frTabsTrigger value="profile">Profile</button>
    <button frTabsTrigger value="security">Security</button>
    <button frTabsTrigger value="billing">Billing</button>
  </div>

  <div frTabsContent value="profile">
    Profile content.
  </div>
</div>`;

const disabledHtml = `<div frTabs defaultValue="home">
  <div frTabsList>
    <button frTabsTrigger value="home">Home</button>
    <button frTabsTrigger value="locked" disabled>Locked</button>
  </div>

  <div frTabsContent value="home">
    Available content.
  </div>
</div>`;

const iconsHtml = `<div frTabs defaultValue="preview">
  <div frTabsList>
    <button frTabsTrigger value="preview">
      <ng-icon name="tablerEye" size="16" />
      Preview
    </button>
    <button frTabsTrigger value="code">
      <ng-icon name="tablerCode" size="16" />
      Code
    </button>
  </div>
</div>`;

const controlledTs = `import { signal } from '@angular/core';
${importsCode}

readonly selectedTab = signal<string | null>('overview');`;

const controlledHtml = `<div frTabs [value]="selectedTab()" (valueChange)="selectedTab.set($event)">
  <div frTabsList>
    <button frTabsTrigger value="overview">Overview</button>
    <button frTabsTrigger value="activity">Activity</button>
  </div>

  <div frTabsContent value="overview">Overview content.</div>
  <div frTabsContent value="activity">Activity content.</div>
</div>`;

const routerTs = `import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
${importsCode}`;

const routerHtml = `<nav frTabsList variant="line" aria-label="Project routes">
  <a
    frTabsTrigger
    routerLink="./overview"
    routerLinkActive
    #overviewLink="routerLinkActive"
    [active]="overviewLink.isActive"
  >
    Overview
  </a>

  <a
    frTabsTrigger
    routerLink="./settings"
    routerLinkActive
    #settingsLink="routerLinkActive"
    [active]="settingsLink.isActive"
  >
    Settings
  </a>
</nav>

<router-outlet />`;

const customCss = `.workspace-tabs {
  --frame-tabs-list-bg: color-mix(in srgb, var(--frame-primary) 10%, var(--frame-background));
  --frame-tabs-trigger-active-bg: var(--frame-primary);
  --frame-tabs-trigger-active-color: var(--frame-primary-foreground);
  --frame-tabs-trigger-active-shadow: 0 10px 30px color-mix(in srgb, var(--frame-primary) 22%, transparent);
  --frame-tabs-trigger-hover-bg: color-mix(in srgb, var(--frame-primary) 16%, var(--frame-background));
}`;

const rtlHtml = `<div frTabs defaultValue="overview" dir="rtl" lang="ar">
  <div frTabsList>
    <button frTabsTrigger value="overview">نظرة عامة</button>
    <button frTabsTrigger value="activity">النشاط</button>
    <button frTabsTrigger value="settings">الإعدادات</button>
  </div>

  <div frTabsContent value="overview">
    ملخص مساحة العمل.
  </div>
</div>`;

const tokens = `--frame-tabs-gap: 1rem;
--frame-tabs-list-gap: 0.25rem;
--frame-tabs-list-padding: 0.25rem;
--frame-tabs-list-bg: var(--frame-muted, #f4f4f5);
--frame-tabs-list-border: transparent;
--frame-tabs-list-radius: var(--frame-radius-lg, 0.75rem);
--frame-tabs-trigger-height: 2.25rem;
--frame-tabs-trigger-padding-x: 0.875rem;
--frame-tabs-trigger-radius: var(--frame-radius-md, 0.5rem);
--frame-tabs-trigger-bg: transparent;
--frame-tabs-trigger-color: var(--frame-muted-foreground, #71717a);
--frame-tabs-trigger-hover-bg: color-mix(in srgb, var(--frame-background, #fff) 62%, transparent);
--frame-tabs-trigger-hover-color: var(--frame-foreground, #09090b);
--frame-tabs-trigger-active-bg: var(--frame-background, #fff);
--frame-tabs-trigger-active-color: var(--frame-foreground, #09090b);
--frame-tabs-trigger-active-shadow: 0 1px 3px rgb(0 0 0 / 0.12);
--frame-tabs-trigger-focus-shadow: 0 0 0 3px color-mix(in srgb, var(--frame-ring, #18181b) 28%, transparent);
--frame-tabs-trigger-disabled-opacity: 0.5;
--frame-tabs-line-color: var(--frame-border, #e5e7eb);
--frame-tabs-line-active-color: var(--frame-primary, #18181b);
--frame-tabs-content-padding: 1rem 0 0;`;

export const TABS_DOC: ComponentDoc = {
  slug: 'tabs',
  breadcrumb: 'Components / Tabs',

  hero: {
    id: 'tabs-hero',
    title: 'Preview',
    preview: {
      component: DocsTabsPreviewComponent,
      inputs: {
        config: { mode: 'basic' },
      },
    },
  },

  installation: {
    cli: {
      language: 'bash',
      code: 'npx your-cli add tabs',
    },
    manual: {
      steps: [
        {
          title: 'Import the tabs primitives.',
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
    { language: 'html', code: usageHtml },
  ],

  composition: `FrTabs
├── FrTabsList
│   ├── FrTabsTrigger
│   └── FrTabsTrigger
├── FrTabsContent
└── FrTabsContent`,

  tokenInspector: {
    id: 'token-inspector',
    title: 'Token inspector',
    description:
      'Hover the root, list, triggers, or content to inspect the tokens that control tabs spacing, surfaces, active state, focus ring, and content rhythm.',
    preview: {
      component: DocsTabsPreviewComponent,
      containerClass: 'block',
      inputs: {
        config: { mode: 'inspector' },
      },
      inspectorTargets: [
        {
          id: 'root',
          label: 'Tabs root',
          selector: '[data-token-target="tabs-root"]',
          description: 'The root controls orientation and the gap between list and content.',
          tokens: ['--frame-tabs-gap'],
        },
        {
          id: 'list',
          label: 'Tabs list',
          selector: '[data-token-target="tabs-list"]',
          description: 'The list controls the container surface, padding, gap, border, and radius.',
          tokens: [
            '--frame-tabs-list-gap',
            '--frame-tabs-list-padding',
            '--frame-tabs-list-bg',
            '--frame-tabs-list-border',
            '--frame-tabs-list-radius',
          ],
        },
        {
          id: 'active-trigger',
          label: 'Active trigger',
          selector: '[data-token-target="tabs-active-trigger"]',
          description: 'Active triggers use dedicated background, foreground, and shadow tokens.',
          tokens: [
            '--frame-tabs-trigger-height',
            '--frame-tabs-trigger-padding-x',
            '--frame-tabs-trigger-radius',
            '--frame-tabs-trigger-active-bg',
            '--frame-tabs-trigger-active-color',
            '--frame-tabs-trigger-active-shadow',
            '--frame-tabs-trigger-focus-shadow',
          ],
        },
        {
          id: 'trigger',
          label: 'Inactive trigger',
          selector: '[data-token-target="tabs-trigger"]',
          description: 'Inactive triggers use muted text and hover tokens.',
          tokens: [
            '--frame-tabs-trigger-bg',
            '--frame-tabs-trigger-color',
            '--frame-tabs-trigger-hover-bg',
            '--frame-tabs-trigger-hover-color',
            '--frame-tabs-trigger-disabled-opacity',
          ],
        },
        {
          id: 'content',
          label: 'Content',
          selector: '[data-token-target="tabs-content"]',
          description: 'Content spacing is controlled separately from trigger rhythm.',
          tokens: ['--frame-tabs-content-padding'],
        },
      ],
    },
  },

  styling: {
    description:
      'Override tabs tokens on the root or an ancestor to tune list surface, trigger shape, active treatment, line variant, and content spacing.',
    preview: {
      id: 'custom-styling-preview',
      title: 'Custom Styling Preview',
      description: 'This preview uses local token overrides for a more branded active tab.',
      preview: {
        component: DocsTabsPreviewComponent,
        inputs: {
          config: { mode: 'custom-styling' },
        },
      },
      code: [
        { language: 'ts', code: importsCode },
        {
          language: 'html',
          code: `<div frTabs defaultValue="overview" class="workspace-tabs">
  <div frTabsList>
    <button frTabsTrigger value="overview">Overview</button>
    <button frTabsTrigger value="activity">Activity</button>
  </div>
</div>`,
        },
        { language: 'css', code: customCss },
      ],
    },
  },

  examples: [
    {
      id: 'basic',
      title: 'Basic',
      description: 'Use tabs to switch between closely related panels without navigating away from the current surface.',
      preview: {
        component: DocsTabsPreviewComponent,
        inputs: { config: { mode: 'basic' } },
      },
      code: [
        { language: 'ts', code: importsCode },
        { language: 'html', code: usageHtml },
      ],
    },
    {
      id: 'line',
      title: 'Line',
      description: 'Use the line variant when tabs should feel more like page sections than segmented controls.',
      preview: {
        component: DocsTabsPreviewComponent,
        inputs: { config: { mode: 'line' } },
      },
      code: [
        { language: 'ts', code: importsCode },
        { language: 'html', code: lineHtml },
      ],
    },
    {
      id: 'vertical',
      title: 'Vertical',
      description: 'Set orientation to vertical for settings pages or side-by-side editor panels.',
      preview: {
        component: DocsTabsPreviewComponent,
        inputs: { config: { mode: 'vertical' } },
      },
      code: [
        { language: 'ts', code: importsCode },
        { language: 'html', code: verticalHtml },
      ],
    },
    {
      id: 'disabled',
      title: 'Disabled',
      description: 'Disable triggers when a panel is unavailable because of permissions, setup, or plan limits.',
      preview: {
        component: DocsTabsPreviewComponent,
        inputs: { config: { mode: 'disabled' } },
      },
      code: [
        { language: 'ts', code: importsCode },
        { language: 'html', code: disabledHtml },
      ],
    },
    {
      id: 'icons',
      title: 'Icons',
      description: 'Project icons into triggers when the labels benefit from quick visual scanning.',
      preview: {
        component: DocsTabsPreviewComponent,
        inputs: { config: { mode: 'icons' } },
      },
      code: [
        { language: 'ts', code: importsCode },
        { language: 'html', code: iconsHtml },
      ],
    },
    {
      id: 'controlled',
      title: 'Controlled',
      description: 'Bind value and valueChange when parent state should own the selected tab.',
      preview: {
        component: DocsTabsPreviewComponent,
        inputs: { config: { mode: 'controlled' } },
      },
      code: [
        { language: 'ts', code: controlledTs },
        { language: 'html', code: controlledHtml },
      ],
    },
    {
      id: 'router-link',
      title: 'Router Link',
      description:
        'Use anchor triggers with routerLink and routerLinkActive for route-backed tabs. Bind the active input to routerLinkActive when you need ARIA/data-active state too.',
      preview: {
        component: DocsTabsPreviewComponent,
        inputs: { config: { mode: 'router' } },
      },
      code: [
        { language: 'ts', code: routerTs },
        { language: 'html', code: routerHtml },
      ],
    },
    {
      id: 'rtl',
      title: 'RTL',
      description: 'Tabs use logical spacing, so trigger order and line indicators follow right-to-left documents.',
      preview: {
        component: DocsTabsPreviewComponent,
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
    'Use these CSS custom properties to tune root spacing, list surface, trigger shape, active states, line variant, focus ring, and content padding.',
  tokens,
};
