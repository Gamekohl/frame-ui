import { ComponentDoc } from '../../shared/models/component-doc.model';
import {
  ContextMenuPreviewConfig,
  ContextMenuPreviewItem,
  DocsContextMenuPreviewComponent,
} from './previews/context-menu-preview';

const importsCode = `import { FrContextMenuModule } from '@frame-ui/components/context-menu';`;
const signalImportsCode = `import { signal } from '@angular/core';
${importsCode}`;

const basicHtml = `<div frContextMenu>
  <div [frContextMenuTrigger]="menu">Right click here</div>

  <ng-template #menu="frContextMenuContent" frContextMenuContent>
    <div frContextMenuPanel>
      <button frContextMenuItem type="button">Profile</button>
      <button frContextMenuItem type="button">Billing</button>
      <button frContextMenuItem type="button">Team</button>
      <button frContextMenuItem type="button">Subscription</button>
    </div>
  </ng-template>
</div>`;

const submenuHtml = `<div frContextMenu>
  <div [frContextMenuTrigger]="menu">Right click here</div>

  <ng-template #menu="frContextMenuContent" frContextMenuContent>
    <div frContextMenuPanel>
      <button frContextMenuItem type="button">Open</button>

      <div frContextMenuSub>
        <button [frContextMenuSubTrigger]="shareMenu" type="button">
          Share
        </button>

        <ng-template #shareMenu="frContextMenuContent" frContextMenuSubContent>
          <div frContextMenuPanel>
            <button frContextMenuItem type="button">Copy link</button>
            <button frContextMenuItem type="button">Invite people</button>
          </div>
        </ng-template>
      </div>
    </div>
  </ng-template>
</div>`;

const checkboxHtml = `<button frContextMenuCheckboxItem [checked]="showBookmarks()" type="button">
  <span frContextMenuItemIndicator>✓</span>
  Show bookmarks
</button>`;
const checkboxTs = `${signalImportsCode}

showBookmarks = signal(true);`;

const radioHtml = `<div frContextMenuRadioGroup>
  <button frContextMenuRadioItem [checked]="density() === 'comfortable'" type="button">
    <span frContextMenuItemIndicator>✓</span>
    Comfortable
  </button>
  <button frContextMenuRadioItem [checked]="density() === 'compact'" type="button">
    <span frContextMenuItemIndicator>✓</span>
    Compact
  </button>
</div>`;
const radioTs = `${signalImportsCode}

density = signal<'comfortable' | 'compact'>('comfortable');`;

const shortcutsHtml = `<div frContextMenu>
  <div [frContextMenuTrigger]="menu">Right click here</div>

  <ng-template #menu="frContextMenuContent" frContextMenuContent>
    <div frContextMenuPanel>
      <button frContextMenuItem type="button">
        Rename
        <span frContextMenuShortcut>F2</span>
      </button>
      <button frContextMenuItem type="button">
        Duplicate
        <span frContextMenuShortcut>Ctrl+D</span>
      </button>
    </div>
  </ng-template>
</div>`;

const groupsHtml = `<div frContextMenu>
  <div [frContextMenuTrigger]="menu">Right click here</div>

  <ng-template #menu="frContextMenuContent" frContextMenuContent>
    <div frContextMenuPanel>
      <div frContextMenuLabel>File</div>
      <button frContextMenuItem type="button">Open</button>
      <button frContextMenuItem type="button">Move to folder</button>
      <div frContextMenuSeparator></div>
      <div frContextMenuLabel>View</div>
      <button frContextMenuCheckboxItem checked type="button">
        <span frContextMenuItemIndicator>✓</span>
        Show preview
      </button>
    </div>
  </ng-template>
</div>`;

const iconsHtml = `<button frContextMenuItem type="button">
  <ng-icon name="tablerExternalLink" size="14" />
  Open
</button>
<button frContextMenuItem type="button">
  <ng-icon name="tablerEdit" size="14" />
  Rename
</button>`;

const destructiveHtml = `<button frContextMenuItem variant="destructive" type="button">
  <ng-icon name="tablerTrash" size="14" />
  Delete file
</button>`;

const customStylingHtml = `<div
  frContextMenu
  style="--frame-dropdown-menu-panel-radius: 1rem; --frame-dropdown-menu-item-hover-bg: color-mix(in srgb, var(--frame-primary) 12%, transparent);"
>
  <div [frContextMenuTrigger]="menu">Right click here</div>

  <ng-template #menu="frContextMenuContent" frContextMenuContent>
    <div frContextMenuPanel>
      <button frContextMenuItem type="button">Open</button>
      <button frContextMenuItem type="button">Move to folder</button>
    </div>
  </ng-template>
</div>`;

const customStylingCss = `[frContextMenu] {
  --frame-dropdown-menu-panel-radius: 1rem;
  --frame-dropdown-menu-panel-shadow: 0 24px 60px color-mix(in srgb, var(--frame-primary) 16%, transparent);
  --frame-dropdown-menu-item-hover-bg: color-mix(in srgb, var(--frame-primary) 12%, transparent);
  --frame-dropdown-menu-item-hover-color: var(--frame-primary);
}`;

const rtlHtml = `<div frContextMenu dir="rtl">
  <div [frContextMenuTrigger]="menu">انقر بزر الماوس الأيمن هنا</div>

  <ng-template #menu="frContextMenuContent" frContextMenuContent>
    <div frContextMenuPanel>
      <button frContextMenuItem type="button">فتح</button>
      <button frContextMenuItem type="button">نسخ</button>
      <div frContextMenuSeparator></div>
      <button frContextMenuItem variant="destructive" type="button">حذف</button>
    </div>
  </ng-template>
</div>`;

const baseItems: ContextMenuPreviewItem[] = [
  { kind: 'item', label: 'Open', icon: 'tablerExternalLink' },
  { kind: 'item', label: 'Rename', icon: 'tablerEdit', shortcut: 'F2' },
  { kind: 'item', label: 'Duplicate', icon: 'tablerCopy', shortcut: 'Ctrl+D' },
  { kind: 'separator' },
  { kind: 'item', label: 'Delete', icon: 'tablerTrash', variant: 'destructive' },
];

const submenuItems: ContextMenuPreviewItem[] = [
  { kind: 'item', label: 'Open', icon: 'tablerExternalLink' },
  {
    kind: 'submenu',
    label: 'Share',
    icon: 'tablerShare',
    children: [
      { kind: 'item', label: 'Copy link', icon: 'tablerLink' },
      { kind: 'item', label: 'Download', icon: 'tablerDownload' },
      { kind: 'item', label: 'Open preview', icon: 'tablerExternalLink' },
    ],
  },
  { kind: 'separator' },
  { kind: 'item', label: 'Delete', icon: 'tablerTrash', variant: 'destructive' },
];

const groupedItems: ContextMenuPreviewItem[] = [
  { kind: 'label', label: 'File' },
  { kind: 'item', label: 'Open', icon: 'tablerFileText' },
  { kind: 'item', label: 'Move to folder', icon: 'tablerFolder' },
  { kind: 'separator' },
  { kind: 'label', label: 'View' },
  { kind: 'checkbox', label: 'Show preview', icon: 'tablerEye', checked: true },
  { kind: 'checkbox', label: 'Show details', checked: false },
];

const radioItems: ContextMenuPreviewItem[] = [
  { kind: 'label', label: 'Density' },
  { kind: 'radio', label: 'Comfortable', checked: true },
  { kind: 'radio', label: 'Compact' },
  { kind: 'radio', label: 'Dense' },
];

const heroConfig: ContextMenuPreviewConfig = {
  items: submenuItems,
};

const basicConfig: ContextMenuPreviewConfig = {
  items: [
    { kind: 'item', label: 'Profile' },
    { kind: 'item', label: 'Billing' },
    { kind: 'item', label: 'Team' },
    { kind: 'item', label: 'Subscription' },
  ],
};

const tokenInspectorConfig: ContextMenuPreviewConfig = {
  className: 'w-full',
  persistentPanel: true,
  triggerLabel: 'Right click the target',
  items: [
    { kind: 'label', label: 'File' },
    { kind: 'item', label: 'Open', icon: 'tablerFileText', shortcut: 'Ctrl+O' },
    { kind: 'item', label: 'Move to folder', icon: 'tablerFolder' },
    { kind: 'separator' },
    { kind: 'label', label: 'View' },
    { kind: 'checkbox', label: 'Show preview', icon: 'tablerEye', checked: true },
    { kind: 'checkbox', label: 'Show details', checked: false },
  ],
};

const customStylingConfig: ContextMenuPreviewConfig = {
  style: `--frame-dropdown-menu-panel-radius: 1rem;
--frame-dropdown-menu-panel-shadow: 0 24px 60px color-mix(in srgb, var(--frame-primary) 16%, transparent);
--frame-dropdown-menu-item-hover-bg: color-mix(in srgb, var(--frame-primary) 12%, transparent);
--frame-dropdown-menu-item-hover-color: var(--frame-primary);
--frame-dropdown-menu-label-color: color-mix(in srgb, var(--frame-primary) 55%, var(--frame-muted-foreground));`,
  items: groupedItems,
};

export const CONTEXT_MENU_DOC: ComponentDoc = {
  slug: 'context-menu',
  breadcrumb: 'Components / Context Menu',

  hero: {
    id: 'context-menu-hero',
    title: 'Preview',
    description: 'Right click the target area, or long press on touch devices.',
    preview: {
      component: DocsContextMenuPreviewComponent,
      inputs: {
        config: heroConfig,
      },
    },
  },

  installation: {
    cli: {
      language: 'bash',
      code: 'npx your-cli add context-menu',
    },
    manual: {
      steps: [
        {
          title: 'Import the context menu primitives your template needs.',
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
      language: 'html',
      code: basicHtml,
    },
  ],

  composition: `ContextMenu
├── ContextMenuTrigger
└── ContextMenuContent
    ├── ContextMenuGroup / ContextMenuLabel
    ├── ContextMenuItem
    ├── ContextMenuCheckboxItem
    ├── ContextMenuRadioGroup / ContextMenuRadioItem
    ├── ContextMenuSeparator
    └── ContextMenuSub
        ├── ContextMenuSubTrigger
        └── ContextMenuSubContent`,

  tokenInspector: {
    id: 'context-menu-tokens',
    title: 'Token Inspector',
    description: 'Inspect the shared dropdown-menu tokens used by context menus.',
    preview: {
      component: DocsContextMenuPreviewComponent,
      inputs: {
        config: tokenInspectorConfig,
      },
      inspectorLayout: 'popover',
      inspectorTargets: [
        {
          id: 'context-menu-panel',
          label: 'Panel',
          selector: '[data-token-target="context-menu-panel-preview"]',
          description:
            'The context menu panel uses the shared dropdown-menu surface tokens for width, radius, border, background, shadow, padding, and open motion.',
          tokens: [
            '--frame-dropdown-menu-panel-min-width',
            '--frame-dropdown-menu-panel-bg',
            '--frame-dropdown-menu-panel-color',
            '--frame-dropdown-menu-panel-border',
            '--frame-dropdown-menu-panel-radius',
            '--frame-dropdown-menu-panel-shadow',
            '--frame-dropdown-menu-panel-padding',
            '--frame-dropdown-menu-motion-duration',
            '--frame-dropdown-menu-motion-easing',
            '--frame-dropdown-menu-motion-distance',
            '--frame-dropdown-menu-motion-scale',
          ],
        },
        {
          id: 'context-menu-label',
          label: 'Label',
          selector: '[data-token-target="context-menu-label-preview"]',
          description:
            'Labels provide quiet section headings inside contextual action groups without competing with the menu rows.',
          tokens: [
            '--frame-dropdown-menu-label-color',
            '--frame-dropdown-menu-label-font-size',
            '--frame-dropdown-menu-label-font-weight',
          ],
        },
        {
          id: 'context-menu-separator',
          label: 'Separator',
          selector: '[data-token-target="context-menu-separator-preview"]',
          description:
            'Separators divide adjacent action groups and inherit their spacing and color from the shared dropdown-menu token surface.',
          tokens: ['--frame-dropdown-menu-separator-margin', '--frame-dropdown-menu-separator-bg'],
        },
        {
          id: 'context-menu-indicator',
          label: 'Selection indicator',
          selector: '[data-token-target="context-menu-indicator-preview"]',
          description:
            'Checkbox and radio rows reserve indicator space so selection state appears without shifting item text.',
          tokens: ['--frame-dropdown-menu-indicator-size'],
        },
        {
          id: 'context-menu-shortcut',
          label: 'Shortcut',
          selector: '[data-token-target="context-menu-shortcut-preview"]',
          description:
            'Shortcut tokens keep keyboard hints aligned at the far edge of the item while using a quieter secondary text treatment.',
          tokens: [
            '--frame-dropdown-menu-shortcut-gap',
            '--frame-dropdown-menu-shortcut-color',
            '--frame-dropdown-menu-shortcut-font-size',
          ],
        },
        {
          id: 'context-menu-item',
          label: 'Item',
          selector: '[data-token-target="context-menu-item-preview"]',
          description:
            'Item tokens control row height, spacing, typography, hover treatment, disabled opacity, destructive states, and inset alignment.',
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
      ],
    },
  },

  examples: [
    {
      id: 'context-menu-basic',
      title: 'Basic',
      description: 'A simple context menu with a few actions.',
      preview: {
        component: DocsContextMenuPreviewComponent,
        inputs: {
          config: basicConfig,
        },
      },
      code: [
        { language: 'ts', code: importsCode },
        { language: 'html', code: basicHtml },
      ],
    },
    {
      id: 'context-menu-submenu',
      title: 'Submenu',
      description: 'Use submenus to nest secondary actions.',
      preview: {
        component: DocsContextMenuPreviewComponent,
        inputs: {
          config: { items: submenuItems },
        },
      },
      code: [
        { language: 'ts', code: importsCode },
        { language: 'html', code: submenuHtml },
      ],
    },
    {
      id: 'context-menu-shortcuts',
      title: 'Shortcuts',
      description: 'Add shortcuts to show keyboard hints beside actions.',
      preview: {
        component: DocsContextMenuPreviewComponent,
        inputs: {
          config: { items: baseItems },
        },
      },
      code: [
        { language: 'ts', code: importsCode },
        { language: 'html', code: shortcutsHtml },
      ],
    },
    {
      id: 'context-menu-groups',
      title: 'Groups',
      description: 'Group related actions with labels and separators.',
      preview: {
        component: DocsContextMenuPreviewComponent,
        inputs: {
          config: { items: groupedItems },
        },
      },
      code: [
        { language: 'ts', code: importsCode },
        { language: 'html', code: groupsHtml },
      ],
    },
    {
      id: 'context-menu-icons',
      title: 'Icons',
      description: 'Combine icons with labels for quick scanning.',
      preview: {
        component: DocsContextMenuPreviewComponent,
        inputs: {
          config: { items: baseItems },
        },
      },
      code: [
        { language: 'ts', code: importsCode },
        { language: 'html', code: iconsHtml },
      ],
    },
    {
      id: 'context-menu-checkboxes',
      title: 'Checkboxes',
      description: 'Use checkbox items for independent toggles.',
      preview: {
        component: DocsContextMenuPreviewComponent,
        inputs: {
          config: { items: groupedItems },
        },
      },
      code: [
        { language: 'ts', code: checkboxTs },
        { language: 'html', code: checkboxHtml },
      ],
    },
    {
      id: 'context-menu-radio',
      title: 'Radio',
      description: 'Use radio items for exclusive choices.',
      preview: {
        component: DocsContextMenuPreviewComponent,
        inputs: {
          config: { items: radioItems },
        },
      },
      code: [
        { language: 'ts', code: radioTs },
        { language: 'html', code: radioHtml },
      ],
    },
    {
      id: 'context-menu-destructive',
      title: 'Destructive',
      description: 'Use destructive variants for dangerous actions.',
      preview: {
        component: DocsContextMenuPreviewComponent,
        inputs: {
          config: { items: [{ kind: 'item', label: 'Delete file', icon: 'tablerTrash', variant: 'destructive' }] },
        },
      },
      code: [
        { language: 'ts', code: importsCode },
        { language: 'html', code: destructiveHtml },
      ],
    },
    {
      id: 'context-menu-custom-styling',
      title: 'Custom Styling',
      description: 'Context menus reuse dropdown-menu tokens for visual customization.',
      preview: {
        component: DocsContextMenuPreviewComponent,
        inputs: {
          config: customStylingConfig,
        },
      },
      code: [
        { language: 'ts', code: importsCode },
        { language: 'html', code: customStylingHtml },
        { language: 'css', code: customStylingCss },
      ],
    },
    {
      id: 'context-menu-rtl',
      title: 'RTL',
      description: 'Context menus inherit direction from the trigger tree.',
      preview: {
        component: DocsContextMenuPreviewComponent,
        inputs: {
          config: {
            dir: 'rtl',
            triggerLabel: 'انقر بزر الماوس الأيمن هنا',
            items: [
              { kind: 'item', label: 'فتح', icon: 'tablerExternalLink' },
              { kind: 'item', label: 'نسخ', icon: 'tablerCopy' },
              { kind: 'separator' },
              { kind: 'item', label: 'حذف', icon: 'tablerTrash', variant: 'destructive' },
            ],
          },
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
    'Context menu is built on the same menu primitives as Dropdown Menu, so it intentionally inherits the shared `--frame-dropdown-menu-*` token contract instead of defining a duplicate context-menu token namespace.',
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

