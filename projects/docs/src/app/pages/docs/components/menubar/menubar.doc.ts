import { ComponentDoc } from '../../shared/models/component-doc.model';
import { DocsMenubarPreviewComponent } from './previews/menubar-preview';

const importsCode = `import { FrMenubarModule } from '@frame-ui-ng/components/menubar';`;
const signalImportsCode = `import { signal } from '@angular/core';
${importsCode}`;

const basicHtml = `<div frMenuBar>
  <div frMenuBarMenu>
    <button [frMenuBarTrigger]="fileMenu" type="button">File</button>

    <ng-template #fileMenu="frMenuBarContent" frMenuBarContent>
      <div frMenuBarPanel>
        <button frMenuBarItem type="button">
          New Tab
          <span frMenuBarShortcut>⌘T</span>
        </button>
        <button frMenuBarItem type="button">New Window</button>
        <div frMenuBarSeparator></div>
        <button frMenuBarItem type="button">Share</button>
        <button frMenuBarItem type="button">
          Print
          <span frMenuBarShortcut>⌘P</span>
        </button>
      </div>
    </ng-template>
  </div>
</div>`;

const checkboxHtml = `<div frMenuBar>
  <div frMenuBarMenu>
    <button [frMenuBarTrigger]="viewMenu" type="button">View</button>

    <ng-template #viewMenu="frMenuBarContent" frMenuBarContent>
      <div frMenuBarPanel>
        <button frMenuBarCheckboxItem [checked]="showToolbar()" type="button">
          <span frMenuBarItemIndicator>
            <ng-icon name="tablerCheck" size="14" />
          </span>
          Toolbar
        </button>
        <button frMenuBarCheckboxItem [checked]="showSidebar()" type="button">
          <span frMenuBarItemIndicator>
            <ng-icon name="tablerCheck" size="14" />
          </span>
          Sidebar
        </button>
      </div>
    </ng-template>
  </div>
</div>`;
const checkboxTs = `${signalImportsCode}

showToolbar = signal(true);
showSidebar = signal(false);`;

const radioHtml = `<div frMenuBar>
  <div frMenuBarMenu>
    <button [frMenuBarTrigger]="profilesMenu" type="button">Profiles</button>

    <ng-template #profilesMenu="frMenuBarContent" frMenuBarContent>
      <div frMenuBarPanel>
        <div frMenuBarLabel>People</div>
        <div frMenuBarRadioGroup>
          <button frMenuBarRadioItem [checked]="profile() === 'julia'" type="button">
            <span frMenuBarItemIndicator>
              <ng-icon name="tablerCheck" size="14" />
            </span>
            Julia
          </button>
          <button frMenuBarRadioItem [checked]="profile() === 'alex'" type="button">
            <span frMenuBarItemIndicator>
              <ng-icon name="tablerCheck" size="14" />
            </span>
            Alex
          </button>
        </div>
      </div>
    </ng-template>
  </div>
</div>`;
const radioTs = `${signalImportsCode}

profile = signal<'julia' | 'alex'>('julia');`;

const submenuHtml = `<div frMenuBar>
  <div frMenuBarMenu>
    <button [frMenuBarTrigger]="fileMenu" type="button">File</button>

    <ng-template #fileMenu="frMenuBarContent" frMenuBarContent>
      <div frMenuBarPanel>
        <button frMenuBarItem type="button">New Tab</button>
        <div frMenuBarSeparator></div>

        <div frMenuBarSub>
          <button [frMenuBarSubTrigger]="shareMenu" type="button">
            Share
          </button>

          <ng-template #shareMenu="frMenuBarContent" frMenuBarSubContent>
            <div frMenuBarPanel>
              <button frMenuBarItem type="button">Copy link</button>
              <button frMenuBarItem type="button">Email link</button>
            </div>
          </ng-template>
        </div>
      </div>
    </ng-template>
  </div>
</div>`;

const iconsHtml = `<div frMenuBar>
  <div frMenuBarMenu>
    <button [frMenuBarTrigger]="fileMenu" type="button">File</button>

    <ng-template #fileMenu="frMenuBarContent" frMenuBarContent>
      <div frMenuBarPanel>
        <button frMenuBarItem type="button">
          <ng-icon name="tablerFileText" size="14" />
          New File
          <span frMenuBarShortcut>⌘N</span>
        </button>
        <button frMenuBarItem type="button">
          <ng-icon name="tablerFolder" size="14" />
          Open Folder
        </button>
        <button frMenuBarItem type="button">
          <ng-icon name="tablerDeviceFloppy" size="14" />
          Save
          <span frMenuBarShortcut>⌘S</span>
        </button>
      </div>
    </ng-template>
  </div>
</div>`;

const customStylingCss = `.project-menubar {
  --frame-menubar-radius: var(--frame-radius-full);
  --frame-menubar-bg: color-mix(in srgb, var(--frame-primary) 8%, var(--frame-surface));
  --frame-menubar-border: color-mix(in srgb, var(--frame-primary) 20%, var(--frame-border));
  --frame-menubar-trigger-open-bg: var(--frame-primary);
  --frame-menubar-trigger-open-color: var(--frame-primary-foreground);
  --frame-dropdown-menu-panel-radius: 1rem;
}`;

const rtlHtml = `<div dir="rtl">
  <div frMenuBar>
    <div frMenuBarMenu>
      <button [frMenuBarTrigger]="fileMenu" type="button">ملف</button>

      <ng-template #fileMenu="frMenuBarContent" frMenuBarContent align="end">
        <div frMenuBarPanel>
          <button frMenuBarItem type="button">
            تبويب جديد
            <span frMenuBarShortcut>⌘T</span>
          </button>
          <button frMenuBarItem type="button">نافذة جديدة</button>
        </div>
      </ng-template>
    </div>
  </div>
</div>`;

export const MENUBAR_DOC: ComponentDoc = {
  slug: 'menubar',
  breadcrumb: 'Components / Menubar',

  hero: {
    id: 'menubar-hero',
    title: 'Preview',
    description:
      'A visually persistent application menu for quick access to grouped commands.',
    preview: {
      component: DocsMenubarPreviewComponent,
    },
  },

  installation: {
    cli: {
      language: 'bash',
      code: 'npx your-cli add menubar',
    },
    manual: {
      steps: [
        {
          title: 'Import the menubar primitives your template needs.',
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

  composition: `Menubar
├── MenubarMenu
│   ├── MenubarTrigger
│   └── MenubarContent
│       ├── MenubarGroup / MenubarLabel
│       ├── MenubarItem
│       ├── MenubarCheckboxItem
│       ├── MenubarRadioGroup / MenubarRadioItem
│       ├── MenubarSeparator
│       └── MenubarSub
│           ├── MenubarSubTrigger
│           └── MenubarSubContent
└── MenubarMenu`,

  tokenInspector: {
    id: 'menubar-tokens',
    title: 'Token Inspector',
    description:
      'Inspect the menubar shell and trigger tokens alongside the inherited dropdown-menu panel and item tokens.',
    preview: {
      component: DocsMenubarPreviewComponent,
      containerClass: 'w-full',
      inputs: {
        config: {
          mode: 'inspector',
        },
      },
      inspectorTargets: [
        {
          id: 'menubar-root',
          label: 'Menubar',
          selector: '[data-token-target="menubar-root"]',
          description:
            'The menubar root controls the persistent horizontal shell, border, radius, padding, gap, color, and shadow.',
          tokens: [
            '--frame-menubar-bg',
            '--frame-menubar-color',
            '--frame-menubar-border',
            '--frame-menubar-radius',
            '--frame-menubar-padding',
            '--frame-menubar-gap',
            '--frame-menubar-shadow',
          ],
        },
        {
          id: 'menubar-trigger',
          label: 'Trigger',
          selector: '[data-token-target="menubar-trigger"]',
          description:
            'Trigger tokens control the top-level menu labels and their hover, focus, and open states.',
          tokens: [
            '--frame-menubar-trigger-height',
            '--frame-menubar-trigger-padding-x',
            '--frame-menubar-trigger-gap',
            '--frame-menubar-trigger-radius',
            '--frame-menubar-trigger-font-size',
            '--frame-menubar-trigger-font-weight',
            '--frame-menubar-trigger-bg',
            '--frame-menubar-trigger-color',
            '--frame-menubar-trigger-hover-bg',
            '--frame-menubar-trigger-hover-color',
            '--frame-menubar-trigger-open-bg',
            '--frame-menubar-trigger-open-color',
            '--frame-menubar-trigger-focus-shadow',
          ],
        },
        {
          id: 'menubar-panel',
          label: 'Menu panel',
          selector: '[data-token-target="menubar-panel"]',
          description:
            'Menubar panels reuse the dropdown-menu panel token contract for overlay surfaces.',
          tokens: [
            '--frame-dropdown-menu-panel-min-width',
            '--frame-dropdown-menu-panel-radius',
            '--frame-dropdown-menu-panel-bg',
            '--frame-dropdown-menu-panel-color',
            '--frame-dropdown-menu-panel-border',
            '--frame-dropdown-menu-panel-shadow',
            '--frame-dropdown-menu-panel-padding',
          ],
        },
        {
          id: 'menubar-item',
          label: 'Item',
          selector: '[data-token-target="menubar-item"]',
          description:
            'Menu rows reuse dropdown-menu item tokens for spacing, radius, typography, hover, disabled, and destructive states.',
          tokens: [
            '--frame-dropdown-menu-item-gap',
            '--frame-dropdown-menu-item-height',
            '--frame-dropdown-menu-item-radius',
            '--frame-dropdown-menu-item-padding',
            '--frame-dropdown-menu-item-font-size',
            '--frame-dropdown-menu-item-hover-bg',
            '--frame-dropdown-menu-item-hover-color',
            '--frame-dropdown-menu-item-disabled-opacity',
            '--frame-dropdown-menu-item-destructive-color',
          ],
        },
        {
          id: 'menubar-label',
          label: 'Label',
          selector: '[data-token-target="menubar-label"]',
          description: 'Labels use the inherited dropdown-menu section heading tokens.',
          tokens: [
            '--frame-dropdown-menu-label-color',
            '--frame-dropdown-menu-label-font-size',
            '--frame-dropdown-menu-label-font-weight',
          ],
        },
        {
          id: 'menubar-separator',
          label: 'Separator',
          selector: '[data-token-target="menubar-separator"]',
          description: 'Separators divide menubar content groups using dropdown-menu separator tokens.',
          tokens: ['--frame-dropdown-menu-separator-margin', '--frame-dropdown-menu-separator-bg'],
        },
        {
          id: 'menubar-shortcut',
          label: 'Shortcut',
          selector: '[data-token-target="menubar-shortcut"]',
          description: 'Shortcut copy inherits the dropdown-menu keyboard hint treatment.',
          tokens: [
            '--frame-dropdown-menu-shortcut-gap',
            '--frame-dropdown-menu-shortcut-color',
            '--frame-dropdown-menu-shortcut-font-size',
          ],
        },
        {
          id: 'menubar-indicator',
          label: 'Indicator',
          selector: '[data-token-target="menubar-indicator"]',
          description: 'Checkbox and radio items reserve indicator space through the shared token.',
          tokens: ['--frame-dropdown-menu-indicator-size'],
        },
      ],
    },
  },

  styling: {
    description:
      'Override menubar tokens for the persistent shell and trigger state, and dropdown-menu tokens for the opened panels.',
    preview: {
      id: 'custom-styling-preview',
      title: 'Custom Styling Preview',
      description: 'This preview customizes the menubar shell, trigger open state, and panel radius.',
      preview: {
        component: DocsMenubarPreviewComponent,
        inputs: {
          config: {
            mode: 'basic',
            style: `--frame-menubar-radius: var(--frame-radius-full);
--frame-menubar-bg: color-mix(in srgb, var(--frame-primary) 8%, var(--frame-surface));
--frame-menubar-border: color-mix(in srgb, var(--frame-primary) 20%, var(--frame-border));
--frame-menubar-trigger-open-bg: var(--frame-primary);
--frame-menubar-trigger-open-color: var(--frame-primary-foreground);
--frame-dropdown-menu-panel-radius: 1rem;`,
          },
        },
      },
      code: [
        { language: 'ts', code: importsCode },
        {
          language: 'html',
          code: `<div class="project-menubar">
${basicHtml}
</div>`,
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
      id: 'menubar-basic',
      title: 'Basic',
      description:
        'Use menubar menus for persistent desktop-style command groups such as File, Edit, View, and Profiles.',
      preview: {
        component: DocsMenubarPreviewComponent,
      },
      code: [
        { language: 'ts', code: importsCode },
        { language: 'html', code: basicHtml },
      ],
    },
    {
      id: 'menubar-checkbox',
      title: 'Checkbox',
      description: 'Use checkbox items for independent view or formatting toggles.',
      preview: {
        component: DocsMenubarPreviewComponent,
        inputs: { config: { mode: 'checkbox' } },
      },
      code: [
        { language: 'ts', code: checkboxTs },
        { language: 'html', code: checkboxHtml },
      ],
    },
    {
      id: 'menubar-radio',
      title: 'Radio',
      description: 'Use radio groups for exclusive selections such as profiles or themes.',
      preview: {
        component: DocsMenubarPreviewComponent,
        inputs: { config: { mode: 'radio' } },
      },
      code: [
        { language: 'ts', code: radioTs },
        { language: 'html', code: radioHtml },
      ],
    },
    {
      id: 'menubar-submenu',
      title: 'Submenu',
      description:
        'Use submenus for nested command branches that should stay attached to the active menubar panel.',
      preview: {
        component: DocsMenubarPreviewComponent,
        inputs: { config: { mode: 'submenu' } },
      },
      code: [
        { language: 'ts', code: importsCode },
        { language: 'html', code: submenuHtml },
      ],
    },
    {
      id: 'menubar-icons',
      title: 'With Icons',
      description: 'Add icons to menu rows when the actions benefit from fast scanning.',
      preview: {
        component: DocsMenubarPreviewComponent,
        inputs: { config: { mode: 'icons' } },
      },
      code: [
        { language: 'ts', code: importsCode },
        { language: 'html', code: iconsHtml },
      ],
    },
    {
      id: 'menubar-rtl',
      title: 'RTL support',
      description: 'Menubar triggers and overlay content inherit document direction and support aligned RTL panels.',
      preview: {
        component: DocsMenubarPreviewComponent,
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
    'Menubar defines tokens for the persistent horizontal shell and trigger states. Opened panels intentionally reuse the dropdown-menu token contract.',
  tokens: `
  --frame-menubar-bg: var(--frame-surface);
  --frame-menubar-color: var(--frame-surface-foreground);
  --frame-menubar-border: var(--frame-border);
  --frame-menubar-radius: var(--frame-radius-md);
  --frame-menubar-padding: 0.25rem;
  --frame-menubar-gap: 0.25rem;
  --frame-menubar-shadow: none;
  --frame-menubar-trigger-height: 2rem;
  --frame-menubar-trigger-padding-x: 0.75rem;
  --frame-menubar-trigger-gap: 0.375rem;
  --frame-menubar-trigger-radius: var(--frame-radius-sm);
  --frame-menubar-trigger-font-size: 0.875rem;
  --frame-menubar-trigger-font-weight: 500;
  --frame-menubar-trigger-bg: transparent;
  --frame-menubar-trigger-color: var(--frame-menubar-color);
  --frame-menubar-trigger-hover-bg: color-mix(in srgb, var(--frame-accent) 48%, transparent);
  --frame-menubar-trigger-hover-color: var(--frame-menubar-color);
  --frame-menubar-trigger-open-bg: var(--frame-accent);
  --frame-menubar-trigger-open-color: var(--frame-accent-foreground);
  --frame-menubar-trigger-focus-shadow: 0 0 0 3px color-mix(in srgb, var(--frame-ring) 24%, transparent);
  `,
};

