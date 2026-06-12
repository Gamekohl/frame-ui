import { ComponentDoc } from '../../shared/models/component-doc.model';
import {
  DocsDropdownMenuPreviewComponent,
  DropdownMenuPreviewConfig,
  DropdownMenuPreviewItem,
} from './previews/dropdown-menu-preview';

const importsCode = `import { FrDropdownMenuModule } from '@frame-ui-ng/components/dropdown-menu';`;

const basicItems: DropdownMenuPreviewItem[] = [
  { kind: 'label', label: 'Actions' },
  { kind: 'item', label: 'Open profile', icon: 'tablerUser' },
  { kind: 'item', label: 'Invite teammate', icon: 'tablerUserPlus', shortcut: 'Cmd+I' },
  { kind: 'separator' },
  { kind: 'item', label: 'Delete access', icon: 'tablerTrash', variant: 'destructive' },
];

const submenuItems: DropdownMenuPreviewItem[] = [
  { kind: 'label', label: 'Publishing' },
  { kind: 'item', label: 'Save draft', icon: 'tablerCopy', shortcut: 'Cmd+S' },
  {
    kind: 'submenu',
    label: 'Share',
    icon: 'tablerShare',
    children: [
      { kind: 'item', label: 'Copy link', icon: 'tablerCopy' },
      { kind: 'item', label: 'Invite reviewers', icon: 'tablerUserPlus' },
      { kind: 'item', label: 'Open public preview', icon: 'tablerExternalLink' },
    ],
  },
  { kind: 'separator' },
  { kind: 'item', label: 'Delete post', icon: 'tablerTrash', variant: 'destructive' },
];

const shortcutsItems: DropdownMenuPreviewItem[] = [
  { kind: 'label', label: 'Workspace' },
  { kind: 'item', label: 'Settings', icon: 'tablerSettings'  },
  { kind: 'item', label: 'Share workspace', icon: 'tablerShare', shortcut: 'Cmd+Shift+S' },
  { kind: 'item', label: 'Duplicate link', icon: 'tablerCopy', shortcut: 'Alt+D' },
  { kind: 'separator' },
  { kind: 'item', label: 'Remove workspace', icon: 'tablerTrash', variant: 'destructive' },
];

const heroConfig: DropdownMenuPreviewConfig = {
  className: 'flex items-start justify-center',
  triggerLabel: 'Workspace actions',
  items: submenuItems,
};

const basicConfig: DropdownMenuPreviewConfig = {
  className: 'flex items-start justify-center',
  triggerLabel: 'Open actions',
  items: basicItems,
};

const submenuConfig: DropdownMenuPreviewConfig = {
  className: 'flex items-start justify-center',
  triggerLabel: 'Publishing actions',
  items: submenuItems,
};

const shortcutsConfig: DropdownMenuPreviewConfig = {
  className: 'flex items-start justify-center',
  triggerLabel: 'Open workspace menu',
  items: shortcutsItems,
};

const hoverConfig: DropdownMenuPreviewConfig = {
  className: 'flex items-start justify-center',
  triggerMode: 'hover',
  triggerLabel: 'Hover-triggered menu',
  items: submenuItems,
};

const sideConfig: DropdownMenuPreviewConfig = {
  className: 'flex min-h-64 items-center justify-center',
  triggerLabel: 'Open to the right',
  side: 'right',
  items: basicItems,
};

const inspectorConfig: DropdownMenuPreviewConfig = {
  className: 'w-full max-w-5xl',
  persistentPanel: true,
  triggerLabel: 'Inspect menu',
  tokenPrefix: 'dropdown-menu',
  items: [
    { kind: 'label', label: 'Quick actions' },
    { kind: 'checkbox', label: 'Pin in sidebar', checked: true },
    { kind: 'item', label: 'Copy share link', icon: 'tablerCopy', shortcut: 'Cmd+C' },
    { kind: 'submenu', label: 'Invite', icon: 'tablerUserPlus' },
    { kind: 'separator' },
    { kind: 'item', label: 'Delete project', icon: 'tablerTrash', variant: 'destructive' },
  ],
};

const customStylingConfig: DropdownMenuPreviewConfig = {
  className: 'flex items-start justify-center',
  triggerLabel: 'Styled workspace menu',
  style: `--frame-dropdown-menu-panel-radius: 1rem;
--frame-dropdown-menu-panel-shadow: 0 24px 60px color-mix(in srgb, var(--frame-primary) 16%, transparent);
--frame-dropdown-menu-panel-padding: 0.375rem;
--frame-dropdown-menu-item-height: 2.25rem;
--frame-dropdown-menu-item-radius: 0.875rem;
--frame-dropdown-menu-item-hover-bg: yellow;
--frame-dropdown-menu-item-hover-color: color-mix(in srgb, var(--frame-primary) 55%, var(--frame-foreground));
--frame-dropdown-menu-label-color: color-mix(in srgb, var(--frame-primary) 45%, var(--frame-muted-foreground));`,
  items: shortcutsItems,
};

export const DROPDOWN_MENU_DOC: ComponentDoc = {
  slug: 'dropdown-menu',
  breadcrumb: 'Components / Dropdown Menu',

  hero: {
    id: 'dropdown-menu-hero',
    title: 'Preview',
    preview: {
      component: DocsDropdownMenuPreviewComponent,
      inputs: {
        config: heroConfig,
      },
    },
  },

  installation: {
    cli: {
      language: 'bash',
      code: 'npx your-cli add dropdown-menu',
    },
    manual: {
      steps: [
        {
          title:
            'Import the dropdown menu primitives you need for the trigger, panel, items, and submenus.',
          code: {
            language: 'ts',
            code: `import { NgIcon, provideIcons } from '@ng-icons/core';
import { FrDropdownMenuModule } from '@frame-ui-ng/components/dropdown-menu';`,
          },
        },
        {
          title: 'Register the Tabler icons used in your menu rows.',
          code: {
            language: 'ts',
            code: `import {
  tablerCheck,
  tablerCopy,
  tablerExternalLink,
  tablerSettings,
  tablerShare,
  tablerTrash,
  tablerUser,
  tablerUserPlus,
} from '@ng-icons/tabler-icons';

viewProviders: [provideIcons({ tablerCheck, tablerCopy, tablerExternalLink, tablerSettings, tablerShare, tablerTrash, tablerUser, tablerUserPlus })]`,
          },
        },
      ],
    },
  },

  usage: [
    {
      language: 'ts',
      code: `import { FrDropdownMenuModule } from '@frame-ui-ng/components/dropdown-menu';`,
    },
    {
      language: 'html',
      code: `<div frDropdownMenu>
  <button type="button" [frDropdownMenuTrigger]="menu">Open actions</button>

  <ng-template #menu="frDropdownMenuContent" frDropdownMenuContent side="auto">
    <div frDropdownMenuPanel>
      <button frDropdownMenuItem type="button">
        <ng-icon name="tablerUser" size="14" />
        <span>Open profile</span>
      </button>

      <button frDropdownMenuCheckboxItem [checked]="true" type="button">
        <span frDropdownMenuItemIndicator>
          <ng-icon name="tablerCheck" size="14" />
        </span>
        <span>Pin in sidebar</span>
      </button>
    </div>
  </ng-template>
</div>`,
    },
  ],

  tokenInspector: {
    id: 'token-inspector',
    title: 'Token inspector',
    description:
      'The trigger itself is app-owned, so the inspector focuses on the menu surface: panel, labels, rows, shortcuts, and state indicators. Hover a region to inspect the token contract and click to pin the popover.',
    preview: {
      component: DocsDropdownMenuPreviewComponent,
      containerClass: 'w-full',
      inputs: {
        config: inspectorConfig,
      },
      inspectorLayout: 'popover',
      inspectorTargets: [
        {
          id: 'trigger',
          label: 'Trigger button',
          selector: '[data-token-target="dropdown-menu-trigger"]',
          description:
            'The trigger in this docs preview is a regular button rather than a dropdown-menu-owned surface, so it follows the button token contract from the host app or component library button primitive.',
          tokens: [
            '--frame-button-root-height',
            '--frame-button-root-padding-x',
            '--frame-button-root-radius',
            '--frame-button-root-font-size',
            '--frame-button-root-gap',
            '--frame-button-root-bg',
            '--frame-button-root-color',
            '--frame-button-root-hover-filter',
          ],
        },
        {
          id: 'panel',
          label: 'Menu panel',
          selector: '[data-token-target="dropdown-menu-panel-preview"]',
          description:
            'The panel surface defines minimum width, border, radius, background, shadow, padding, and the motion settings used when the overlay opens.',
          tokens: [
            '--frame-dropdown-menu-panel-min-width',
            '--frame-dropdown-menu-panel-radius',
            '--frame-dropdown-menu-panel-bg',
            '--frame-dropdown-menu-panel-color',
            '--frame-dropdown-menu-panel-border',
            '--frame-dropdown-menu-panel-shadow',
            '--frame-dropdown-menu-panel-padding',
            '--frame-dropdown-menu-motion-duration',
            '--frame-dropdown-menu-motion-easing',
            '--frame-dropdown-menu-motion-distance',
            '--frame-dropdown-menu-motion-scale',
          ],
        },
        {
          id: 'label',
          label: 'Section label',
          selector: '[data-token-target="dropdown-menu-label-preview"]',
          description:
            'Labels use a quieter typographic layer so menus can group destructive, navigational, and utility actions without adding visual noise.',
          tokens: [
            '--frame-dropdown-menu-label-color',
            '--frame-dropdown-menu-label-font-size',
            '--frame-dropdown-menu-label-font-weight',
          ],
        },
        {
          id: 'item',
          label: 'Menu item',
          selector: '[data-token-target="dropdown-menu-item-preview"]',
          description:
            'Row tokens control height, spacing, radius, typography, hover colors, destructive variants, and disabled opacity across links, actions, and submenu triggers.',
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
            '--frame-dropdown-menu-item-destructive-hover-bg',
            '--frame-dropdown-menu-item-destructive-hover-color',
            '--frame-dropdown-menu-item-inset-padding',
          ],
        },
        {
          id: 'shortcut',
          label: 'Shortcut copy',
          selector: '[data-token-target="dropdown-menu-shortcut-preview"]',
          description:
            'Shortcuts sit on a lighter secondary layer so keyboard hints stay legible without competing with the action label.',
          tokens: [
            '--frame-dropdown-menu-shortcut-gap',
            '--frame-dropdown-menu-shortcut-color',
            '--frame-dropdown-menu-shortcut-font-size',
          ],
        },
        {
          id: 'indicator',
          label: 'Selection indicator',
          selector: '[data-token-target="dropdown-menu-indicator-preview"]',
          description:
            'Checkbox and radio-style states reserve space through the shared indicator token so aligned rows do not jump when selection changes.',
          tokens: ['--frame-dropdown-menu-indicator-size'],
        },
      ],
    },
  },

  styling: {
    description:
      'Scope token overrides to a wrapper when a product area needs a softer menu radius, a different shadow, or custom hover treatment without changing the dropdown structure or behavior.',
    preview: {
      id: 'custom-styling-preview',
      title: 'Custom Styling Preview',
      description:
        'This preview applies local overrides to the panel surface, menu row sizing, and label color treatment.',
      preview: {
        component: DocsDropdownMenuPreviewComponent,
        inputs: {
          config: customStylingConfig,
        },
      },
      code: [
        {
          language: 'ts',
          code: importsCode,
        },
        {
          language: 'html',
          code: `<div class="workspace-menu">
  <div frDropdownMenu>
    <button type="button" [frDropdownMenuTrigger]="menu">Styled workspace menu</button>

    <ng-template #menu="frDropdownMenuContent" frDropdownMenuContent>
      <div frDropdownMenuPanel>
        <div frDropdownMenuLabel>Workspace</div>

        <button frDropdownMenuItem type="button">
          <ng-icon name="tablerSettings" size="14" />
          <span>Settings</span>
        </button>
      </div>
    </ng-template>
  </div>
</div>`,
        },
        {
          language: 'css',
          code: `.workspace-menu {
${customStylingConfig.style}
}`,
        },
      ],
    },
  },

  examples: [
    {
      id: 'basic',
      title: 'Basic actions',
      description:
        'Use the default item primitive for simple action lists, grouping related commands with labels and separators when the menu needs more structure.',
      preview: {
        component: DocsDropdownMenuPreviewComponent,
        inputs: {
          config: basicConfig,
        },
      },
      code: [
        {
          language: 'ts',
          code: importsCode,
        },
        {
          language: 'html',
          code: `<div frDropdownMenu>
  <button type="button" [frDropdownMenuTrigger]="menu">Open actions</button>

  <ng-template #menu="frDropdownMenuContent" frDropdownMenuContent>
    <div frDropdownMenuPanel>
      <div frDropdownMenuLabel>Actions</div>

      <button frDropdownMenuItem type="button">
        <ng-icon name="tablerUser" size="14" />
        <span>Open profile</span>
      </button>

      <button frDropdownMenuItem type="button">
        <ng-icon name="tablerUserPlus" size="14" />
        <span>Invite teammate</span>
        <span frDropdownMenuShortcut>Cmd+I</span>
      </button>

      <div frDropdownMenuSeparator></div>

      <button frDropdownMenuItem variant="destructive" type="button">
        <ng-icon name="tablerTrash" size="14" />
        <span>Delete access</span>
      </button>
    </div>
  </ng-template>
</div>`,
        },
      ],
    },
    {
      id: 'side',
      title: 'Side placement',
      description:
        'Use side to prefer bottom, top, right, or left placement. Set side="auto" to let root menus try every side in a sensible fallback order.',
      preview: {
        component: DocsDropdownMenuPreviewComponent,
        inputs: {
          config: sideConfig,
        },
      },
      code: [
        {
          language: 'ts',
          code: importsCode,
        },
        {
          language: 'html',
          code: `<div frDropdownMenu>
  <button type="button" [frDropdownMenuTrigger]="menu">Open to the right</button>

  <ng-template #menu="frDropdownMenuContent" frDropdownMenuContent side="right">
    <div frDropdownMenuPanel>
      <button frDropdownMenuItem type="button">Open profile</button>
      <button frDropdownMenuItem type="button">Invite teammate</button>
    </div>
  </ng-template>
</div>

<ng-template #adaptiveMenu="frDropdownMenuContent" frDropdownMenuContent side="auto">
  <div frDropdownMenuPanel>
    <!-- The overlay can fall back across bottom, top, right, and left. -->
  </div>
</ng-template>`,
        },
      ],
    },
    {
      id: 'submenu',
      title: 'Submenus',
      description:
        'Submenus work well for secondary branches like sharing, exporting, or invite flows. They open to the right or left only, default to automatic horizontal fallback, and keep a small offset from the parent menu.',
      preview: {
        component: DocsDropdownMenuPreviewComponent,
        inputs: {
          config: submenuConfig,
        },
      },
      code: [
        {
          language: 'ts',
          code: importsCode,
        },
        {
          language: 'html',
          code: `<div frDropdownMenu>
  <button type="button" [frDropdownMenuTrigger]="menu">Publishing actions</button>

  <ng-template #menu="frDropdownMenuContent" frDropdownMenuContent>
    <div frDropdownMenuPanel>
      <div frDropdownMenuLabel>Publishing</div>

      <button frDropdownMenuItem type="button">
        <ng-icon name="tablerCopy" size="14" />
        <span>Save draft</span>
        <span frDropdownMenuShortcut>Cmd+S</span>
      </button>

      <div frDropdownMenuSub>
        <button [frDropdownMenuSubTrigger]="shareMenu" type="button">
          <ng-icon name="tablerShare" size="14" />
          <span>Share</span>
        </button>

        <ng-template #shareMenu="frDropdownMenuContent" frDropdownMenuSubContent side="auto">
          <div frDropdownMenuPanel>
            <button frDropdownMenuItem type="button">
              <ng-icon name="tablerCopy" size="14" />
              <span>Copy link</span>
            </button>

            <button frDropdownMenuItem type="button">
              <ng-icon name="tablerUserPlus" size="14" />
              <span>Invite reviewers</span>
            </button>

            <button frDropdownMenuItem type="button">
              <ng-icon name="tablerExternalLink" size="14" />
              <span>Open public preview</span>
            </button>
          </div>
        </ng-template>
      </div>

      <div frDropdownMenuSeparator></div>

      <button frDropdownMenuItem variant="destructive" type="button">
        <ng-icon name="tablerTrash" size="14" />
        <span>Delete post</span>
      </button>
    </div>
  </ng-template>
</div>`,
        },
      ],
    },
    {
      id: 'shortcuts',
      title: 'Shortcuts and destructive actions',
      description:
        'Use shortcut copy for power-user hints and the destructive variant for actions that need a stronger warning without leaving the menu pattern.',
      preview: {
        component: DocsDropdownMenuPreviewComponent,
        inputs: {
          config: shortcutsConfig,
        },
      },
      code: [
        {
          language: 'ts',
          code: importsCode,
        },
        {
          language: 'html',
          code: `<div frDropdownMenu>
  <button type="button" [frDropdownMenuTrigger]="menu">Open workspace menu</button>

  <ng-template #menu="frDropdownMenuContent" frDropdownMenuContent>
    <div frDropdownMenuPanel>
      <div frDropdownMenuLabel>Workspace</div>

      <button frDropdownMenuItem type="button">
        <ng-icon name="tablerSettings" size="14" />
        <span>Settings</span>
      </button>

      <button frDropdownMenuItem type="button">
        <ng-icon name="tablerShare" size="14" />
        <span>Share workspace</span>
        <span frDropdownMenuShortcut>Cmd+Shift+S</span>
      </button>

      <button frDropdownMenuItem type="button">
        <ng-icon name="tablerCopy" size="14" />
        <span>Duplicate link</span>
        <span frDropdownMenuShortcut>Alt+D</span>
      </button>

      <div frDropdownMenuSeparator></div>

      <button frDropdownMenuItem variant="destructive" type="button">
        <ng-icon name="tablerTrash" size="14" />
        <span>Remove workspace</span>
      </button>
    </div>
  </ng-template>
</div>`,
        },
      ],
    },
    {
      id: 'hover',
      title: 'Hover trigger mode',
      description:
        'Switch to `hover` or `both` when a menu should behave more like a classic application menubar or nested navigation flyout.',
      preview: {
        component: DocsDropdownMenuPreviewComponent,
        inputs: {
          config: hoverConfig,
        },
      },
      code: [
        {
          language: 'ts',
          code: importsCode,
        },
        {
          language: 'html',
          code: `<div frDropdownMenu triggerMode="hover">
  <button type="button" [frDropdownMenuTrigger]="menu">Hover-triggered menu</button>

  <ng-template #menu="frDropdownMenuContent" frDropdownMenuContent>
    <div frDropdownMenuPanel>
      <div frDropdownMenuLabel>Publishing</div>

      <button frDropdownMenuItem type="button">
        <ng-icon name="tablerCopy" size="14" />
        <span>Save draft</span>
        <span frDropdownMenuShortcut>Cmd+S</span>
      </button>

      <div frDropdownMenuSub triggerMode="hover">
        <button [frDropdownMenuSubTrigger]="shareMenu" type="button">
          <ng-icon name="tablerShare" size="14" />
          <span>Share</span>
        </button>

        <ng-template #shareMenu="frDropdownMenuContent" frDropdownMenuSubContent>
          <div frDropdownMenuPanel>
            <button frDropdownMenuItem type="button">
              <ng-icon name="tablerCopy" size="14" />
              <span>Copy link</span>
            </button>
          </div>
        </ng-template>
      </div>

      <div frDropdownMenuSeparator></div>

      <button frDropdownMenuItem variant="destructive" type="button">
        <ng-icon name="tablerTrash" size="14" />
        <span>Delete post</span>
      </button>
    </div>
  </ng-template>
</div>`,
        },
      ],
    },
  ],

  tokensTitle: 'Design Tokens',
  tokensDescription:
    'Dropdown menu tokens style the overlay surface and its internal rows. The trigger itself remains host-app owned, so pair these menu tokens with whatever button or trigger primitive your app already uses.',
  tokens: `
  --frame-dropdown-menu-panel-min-width: 13rem;
  --frame-dropdown-menu-panel-radius: var(--frame-radius-md);
  --frame-dropdown-menu-panel-bg: var(--frame-surface);
  --frame-dropdown-menu-panel-color: var(--frame-surface-foreground);
  --frame-dropdown-menu-panel-border: var(--frame-border);
  --frame-dropdown-menu-panel-shadow: var(--frame-shadow-md);
  --frame-dropdown-menu-panel-padding: 0.25rem;
  --frame-dropdown-menu-label-color: var(--frame-muted-foreground);
  --frame-dropdown-menu-label-font-size: 0.75rem;
  --frame-dropdown-menu-label-font-weight: 600;
  --frame-dropdown-menu-separator-margin: 0.25rem -0.25rem;
  --frame-dropdown-menu-separator-bg: var(--frame-border);
  --frame-dropdown-menu-item-gap: 0.5rem;
  --frame-dropdown-menu-item-height: 2rem;
  --frame-dropdown-menu-item-radius: calc(var(--frame-radius-md) - 0.125rem);
  --frame-dropdown-menu-item-padding: 0.375rem 0.5rem;
  --frame-dropdown-menu-item-font-size: 0.875rem;
  --frame-dropdown-menu-item-hover-bg: var(--frame-accent);
  --frame-dropdown-menu-item-hover-color: var(--frame-accent-foreground);
  --frame-dropdown-menu-item-disabled-opacity: 0.5;
  --frame-dropdown-menu-item-destructive-color: var(--frame-destructive);
  --frame-dropdown-menu-item-destructive-hover-bg: color-mix(in srgb, var(--frame-destructive) 12%, var(--frame-surface));
  --frame-dropdown-menu-item-destructive-hover-color: var(--frame-destructive);
  --frame-dropdown-menu-item-inset-padding: 2rem;
  --frame-dropdown-menu-shortcut-gap: 0.75rem;
  --frame-dropdown-menu-shortcut-color: var(--frame-muted-foreground);
  --frame-dropdown-menu-shortcut-font-size: 0.75rem;
  --frame-dropdown-menu-indicator-size: 1rem;
  --frame-dropdown-menu-motion-duration: 140ms;
  --frame-dropdown-menu-motion-easing: cubic-bezier(0.16, 1, 0.3, 1);
  --frame-dropdown-menu-motion-distance: 0.2rem;
  --frame-dropdown-menu-motion-scale: 0.98;
  `,
};

