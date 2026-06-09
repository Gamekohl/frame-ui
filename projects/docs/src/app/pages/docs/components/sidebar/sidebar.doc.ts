import { ComponentDoc } from '../../shared/models/component-doc.model';
import { DocsSidebarPreviewComponent } from './previews/sidebar-preview';

const importsCode = `import { FrSidebarModule } from '@frame-ui-ng/components/sidebar';`;

const basicHtml = `<div frSidebarProvider>
  <aside frSidebar>
    <div frSidebarHeader>
      <a frSidebarMenuButton size="lg" href="#">
        <span>Atlas Studio</span>
      </a>
    </div>

    <div frSidebarContent>
      <div frSidebarGroup>
        <div frSidebarGroupLabel>Workspace</div>
        <div frSidebarGroupContent>
          <ul frSidebarMenu>
            <li frSidebarMenuItem>
              <a frSidebarMenuButton active href="#">
                <span>Dashboard</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div frSidebarFooter>
      <a frSidebarMenuButton variant="outline" href="#">
        <span>Settings</span>
      </a>
    </div>

    <div frSidebarRail></div>
  </aside>

  <main frSidebarInset>
    <button frSidebarTrigger type="button">Toggle sidebar</button>
  </main>
</div>`;

const providerTs = `import { signal } from '@angular/core';
${importsCode}

readonly open = signal(true);

handleOpenChange(open: boolean): void {
  this.open.set(open);
}`;

const providerHtml = `<div frSidebarProvider [open]="open()" (openChange)="handleOpenChange($event)">
  <aside frSidebar collapsible="icon">
    <!-- Sidebar content -->
  </aside>

  <main frSidebarInset>
    <button frSidebarTrigger type="button">Toggle sidebar</button>
  </main>
</div>`;

const iconHtml = `<div frSidebarProvider defaultOpen="false">
  <aside frSidebar collapsible="icon">
    <div frSidebarContent>
      <ul frSidebarMenu>
        <li frSidebarMenuItem>
          <a frSidebarMenuButton active href="#">
            <span>Dashboard</span>
          </a>
        </li>
      </ul>
    </div>
    <div frSidebarRail></div>
  </aside>
</div>`;

const scrollableHtml = `<div frSidebarProvider class="app-shell">
  <aside frSidebar>
    <div frSidebarHeader>
      <a frSidebarMenuButton size="lg" href="#">
        <span>Atlas Studio</span>
      </a>
    </div>

    <div frSidebarContent>
      <div frSidebarGroup>
        <div frSidebarGroupLabel>Workspace</div>
        <div frSidebarGroupContent>
          <ul frSidebarMenu>
            <li frSidebarMenuItem>
              <a frSidebarMenuButton active href="#">Dashboard</a>
            </li>
            <li frSidebarMenuItem>
              <a frSidebarMenuButton href="#">Projects</a>
            </li>
            <li frSidebarMenuItem>
              <a frSidebarMenuButton href="#">Members</a>
            </li>
            <li frSidebarMenuItem>
              <a frSidebarMenuButton href="#">Audit log</a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div frSidebarFooter>
      <a frSidebarMenuButton variant="outline" href="#">Settings</a>
    </div>
  </aside>

  <main frSidebarInset>
    Main content
  </main>
</div>`;

const scrollableCss = `.app-shell {
  height: 100dvh;
}`;

const variantsHtml = `<aside frSidebar variant="floating" collapsible="offcanvas">
  <!-- Floating sidebar content -->
</aside>

<aside frSidebar variant="inset" collapsible="offcanvas">
  <!-- Inset sidebar content -->
</aside>`;

const menuHtml = `<ul frSidebarMenu>
  <li frSidebarMenuItem>
    <a frSidebarMenuButton active href="#">
      <span>Projects</span>
    </a>
    <span frSidebarMenuBadge>12</span>
    <button frSidebarMenuAction showOnHover type="button">More</button>
  </li>

  <li frSidebarMenuItem>
    <a frSidebarMenuButton href="#">Teams</a>
    <ul frSidebarMenuSub>
      <li frSidebarMenuSubItem>
        <a frSidebarMenuSubButton active href="#">FrameUIs</a>
      </li>
    </ul>
  </li>
</ul>`;

const skeletonHtml = `<ul frSidebarMenu>
  <li frSidebarMenuItem>
    <div frSidebarMenuSkeleton showIcon width="68%"></div>
  </li>
  <li frSidebarMenuItem>
    <div frSidebarMenuSkeleton showIcon width="52%"></div>
  </li>
</ul>`;

const rightHtml = `<div frSidebarProvider>
  <main frSidebarInset>
    <button frSidebarTrigger type="button">Toggle sidebar</button>
  </main>

  <aside frSidebar side="right" collapsible="none">
    <!-- Right sidebar content -->
  </aside>
</div>`;

const rtlHtml = `<div frSidebarProvider dir="rtl">
  <main frSidebarInset>
    <button frSidebarTrigger type="button">فتح القائمة</button>
  </main>

  <aside frSidebar side="right" collapsible="none">
    <!-- RTL sidebar content -->
  </aside>
</div>`;

const customCss = `.workspace-shell {
  --frame-sidebar-bg: color-mix(in srgb, var(--frame-primary) 8%, var(--frame-background));
  --frame-sidebar-accent: color-mix(in srgb, var(--frame-primary) 14%, var(--frame-background));
  --frame-sidebar-primary: var(--frame-primary);
  --frame-sidebar-border: color-mix(in srgb, var(--frame-primary) 28%, var(--frame-border));
  --frame-sidebar-radius: 1.25rem;
  --frame-sidebar-shadow: 0 24px 80px color-mix(in srgb, var(--frame-primary) 20%, transparent);
}`;

const tokens = `--frame-sidebar-width: 16rem;
--frame-sidebar-width-icon: 3.5rem;
--frame-sidebar-width-mobile: 18rem;
--frame-sidebar-bg: var(--frame-background, #fff);
--frame-sidebar-color: var(--frame-foreground, #09090b);
--frame-sidebar-muted-color: var(--frame-muted-foreground, #71717a);
--frame-sidebar-border: var(--frame-border, #e5e7eb);
--frame-sidebar-accent: var(--frame-accent, #f4f4f5);
--frame-sidebar-accent-color: var(--frame-accent-foreground, #18181b);
--frame-sidebar-primary: var(--frame-primary, #18181b);
--frame-sidebar-primary-color: var(--frame-primary-foreground, #fff);
--frame-sidebar-ring: var(--frame-ring, #18181b);
--frame-sidebar-radius: var(--frame-radius-lg, 0.75rem);
--frame-sidebar-margin: 0.5rem;
--frame-sidebar-padding: 0.5rem;
--frame-sidebar-gap: 0.5rem;
--frame-sidebar-menu-button-height: 2rem;
--frame-sidebar-menu-button-radius: var(--frame-radius-md, 0.5rem);
--frame-sidebar-shadow: 0 20px 60px rgb(0 0 0 / 0.12);
--frame-sidebar-transition-duration: 200ms;
--frame-sidebar-z-index: 40;
--frame-sidebar-mobile-backdrop: rgb(0 0 0 / 0.42);`;

export const SIDEBAR_DOC: ComponentDoc = {
  slug: 'sidebar',
  breadcrumb: 'Components / Sidebar',

  hero: {
    id: 'sidebar-hero',
    title: 'Preview',
    preview: {
      component: DocsSidebarPreviewComponent,
      inputs: {
        config: { mode: 'basic' },
      },
    },
  },

  installation: {
    cli: {
      language: 'bash',
      code: 'npx your-cli add sidebar',
    },
    manual: {
      steps: [
        {
          title: 'Import the sidebar provider and primitives you need.',
          code: {
            language: 'ts',
            code: importsCode,
          },
        },
      ],
    },
  },

  usage: [
    {
      language: 'ts',
      code: importsCode,
    },
    {
      language: 'html',
      code: basicHtml,
    },
  ],

  composition: `FrSidebarProvider
├── FrSidebar
│   ├── FrSidebarHeader
│   ├── FrSidebarContent
│   │   └── FrSidebarGroup
│   │       ├── FrSidebarGroupLabel
│   │       ├── FrSidebarGroupAction
│   │       └── FrSidebarMenu
│   │           ├── FrSidebarMenuItem
│   │           │   ├── FrSidebarMenuButton
│   │           │   ├── FrSidebarMenuAction
│   │           │   └── FrSidebarMenuBadge
│   │           └── FrSidebarMenuSub
│   ├── FrSidebarFooter
│   └── FrSidebarRail
├── FrSidebarInset
└── FrSidebarTrigger`,

  tokenInspector: {
    id: 'token-inspector',
    title: 'Token inspector',
    description:
      'Hover the provider, sidebar, header, content, menu, active button, badge, rail, trigger, or inset to inspect the tokens used by the composed shell.',
    preview: {
      component: DocsSidebarPreviewComponent,
      containerClass: 'block',
      inputs: {
        config: { mode: 'inspector' },
      },
      inspectorTargets: [
        {
          id: 'provider',
          label: 'Provider',
          selector: '[data-token-target="sidebar-provider"]',
          description: 'The provider coordinates open state, mobile state, shortcut behavior, and layout context.',
          tokens: ['--frame-sidebar-width', '--frame-sidebar-width-icon', '--frame-sidebar-width-mobile'],
        },
        {
          id: 'root',
          label: 'Sidebar',
          selector: '[data-token-target="sidebar-root"]',
          description: 'The sidebar root owns width, surface, border, color, shadow, and transition behavior.',
          tokens: [
            '--frame-sidebar-width',
            '--frame-sidebar-width-icon',
            '--frame-sidebar-bg',
            '--frame-sidebar-color',
            '--frame-sidebar-border',
            '--frame-sidebar-radius',
            '--frame-sidebar-margin',
            '--frame-sidebar-shadow',
            '--frame-sidebar-transition-duration',
          ],
        },
        {
          id: 'content',
          label: 'Content',
          selector: '[data-token-target="sidebar-content"]',
          description: 'The content region scrolls between the sticky-style header and footer areas.',
          tokens: ['--frame-sidebar-padding', '--frame-sidebar-gap'],
        },
        {
          id: 'menu',
          label: 'Menu',
          selector: '[data-token-target="sidebar-menu"]',
          description: 'Menu tokens define item rhythm and button interaction states.',
          tokens: [
            '--frame-sidebar-menu-button-height',
            '--frame-sidebar-menu-button-radius',
            '--frame-sidebar-accent',
            '--frame-sidebar-accent-color',
          ],
        },
        {
          id: 'active',
          label: 'Active button',
          selector: '[data-token-target="sidebar-active-button"]',
          description: 'Active menu buttons use primary tokens to establish the current location.',
          tokens: ['--frame-sidebar-primary', '--frame-sidebar-primary-color'],
        },
        {
          id: 'badge',
          label: 'Badge',
          selector: '[data-token-target="sidebar-menu-badge"]',
          description: 'Menu badges inherit muted sidebar text and sit inside menu item positioning.',
          tokens: ['--frame-sidebar-muted-color'],
        },
        {
          id: 'sub',
          label: 'Submenu',
          selector: '[data-token-target="sidebar-menu-sub"]',
          description: 'Submenus use the sidebar border and muted text to create secondary hierarchy.',
          tokens: ['--frame-sidebar-border', '--frame-sidebar-muted-color'],
        },
        {
          id: 'trigger',
          label: 'Trigger',
          selector: '[data-token-target="sidebar-trigger"]',
          description: 'The trigger toggles provider state and follows the sidebar surface and border tokens.',
          tokens: ['--frame-sidebar-bg', '--frame-sidebar-border', '--frame-sidebar-color'],
        },
        {
          id: 'rail',
          label: 'Rail',
          selector: '[data-token-target="sidebar-rail"]',
          description: 'The rail is a narrow hit target that toggles the sidebar from the edge.',
          tokens: ['--frame-sidebar-border'],
        },
      ],
    },
  },

  styling: {
    description:
      'Override sidebar tokens on the provider, sidebar, or any ancestor to tune width, surfaces, borders, active states, radius, and motion.',
    preview: {
      id: 'custom-styling-preview',
      title: 'Custom Styling Preview',
      description: 'This preview uses local token overrides for a floating, branded workspace shell.',
      preview: {
        component: DocsSidebarPreviewComponent,
        inputs: {
          config: { mode: 'custom-styling' },
        },
      },
      code: [
        {
          language: 'ts',
          code: importsCode,
        },
        {
          language: 'html',
          code: `<div frSidebarProvider class="workspace-shell">
  <aside frSidebar variant="floating">
    <!-- Sidebar content -->
  </aside>
</div>`,
        },
        {
          language: 'css',
          code: customCss,
        },
      ],
    },
  },

  examples: [
    {
      id: 'basic',
      title: 'Basic',
      description: 'Wrap the sidebar and main content in a provider so triggers, rails, and menu state share one context.',
      preview: {
        component: DocsSidebarPreviewComponent,
        inputs: {
          config: { mode: 'basic' },
        },
      },
      code: [
        { language: 'ts', code: importsCode },
        { language: 'html', code: basicHtml },
      ],
    },
    {
      id: 'icon',
      title: 'Icon Collapse',
      description: 'Use collapsible="icon" when the collapsed state should keep the sidebar rail visible for icon navigation.',
      preview: {
        component: DocsSidebarPreviewComponent,
        inputs: {
          config: { mode: 'icon' },
        },
      },
      code: [
        { language: 'ts', code: importsCode },
        { language: 'html', code: iconHtml },
      ],
    },
    {
      id: 'scrollable-content',
      title: 'Scrollable Content',
      description:
        'Give the provider a bounded height. The sidebar keeps its header and footer fixed while FrSidebarContent owns vertical scrolling.',
      preview: {
        component: DocsSidebarPreviewComponent,
        inputs: {
          config: { mode: 'scrollable' },
        },
      },
      code: [
        { language: 'ts', code: importsCode },
        { language: 'html', code: scrollableHtml },
        { language: 'css', code: scrollableCss },
      ],
    },
    {
      id: 'variants',
      title: 'Variants',
      description: 'Use sidebar, floating, or inset variants depending on whether the panel should feel attached or card-like.',
      preview: {
        component: DocsSidebarPreviewComponent,
        inputs: {
          config: { mode: 'floating' },
        },
      },
      code: [
        { language: 'ts', code: importsCode },
        { language: 'html', code: variantsHtml },
      ],
    },
    {
      id: 'menu',
      title: 'Menu Composition',
      description: 'Compose menu buttons with badges, actions, and nested submenus for richer app navigation.',
      preview: {
        component: DocsSidebarPreviewComponent,
        inputs: {
          config: { mode: 'menu' },
        },
      },
      code: [
        { language: 'ts', code: importsCode },
        { language: 'html', code: menuHtml },
      ],
    },
    {
      id: 'controlled',
      title: 'Controlled',
      description: 'Bind the provider open input and listen for openChange when parent state should own expansion.',
      preview: {
        component: DocsSidebarPreviewComponent,
        inputs: {
          config: { mode: 'controlled' },
        },
      },
      code: [
        { language: 'ts', code: providerTs },
        { language: 'html', code: providerHtml },
      ],
    },
    {
      id: 'skeleton',
      title: 'Skeleton',
      description: 'Use menu skeleton rows while navigation data is loading or permissions are being resolved.',
      preview: {
        component: DocsSidebarPreviewComponent,
        inputs: {
          config: { mode: 'skeleton' },
        },
      },
      code: [
        { language: 'ts', code: importsCode },
        { language: 'html', code: skeletonHtml },
      ],
    },
    {
      id: 'right',
      title: 'Right Side',
      description: 'Set side="right" for secondary panels, inspectors, or workflows that should attach to the opposite edge.',
      preview: {
        component: DocsSidebarPreviewComponent,
        inputs: {
          config: { mode: 'right' },
        },
      },
      code: [
        { language: 'ts', code: importsCode },
        { language: 'html', code: rightHtml },
      ],
    },
    {
      id: 'rtl',
      title: 'RTL',
      description: 'Use logical properties and side placement to support right-to-left application shells.',
      preview: {
        component: DocsSidebarPreviewComponent,
        inputs: {
          config: { mode: 'rtl' },
        },
      },
      code: [
        { language: 'ts', code: importsCode },
        { language: 'html', code: rtlHtml },
      ],
    },
  ],

  tokensTitle: 'Design Tokens',
  tokensDescription:
    'Use these CSS custom properties to tune sidebar width, surfaces, text, borders, active states, menu rhythm, shadows, motion, and mobile layering.',
  tokens,
};

