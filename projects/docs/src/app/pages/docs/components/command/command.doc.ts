import { ComponentDoc } from '../../shared/models/component-doc.model';
import {
  DocsCommandPreviewComponent
} from './previews/command-preview';

const commandImports = `import { FrCommandModule, FrCommandService } from '@frame-ui-ng/components/command';`;

const inlineCommandHtml = `<section frCommand class="command-demo">
  <input frCommandInput placeholder="Type a command or search..." />
  <div frCommandList>
    <p frCommandEmpty>No results found.</p>
    <div frCommandGroup heading="Suggestions">
      <p frCommandGroupHeading>Suggestions</p>
      <button frCommandItem value="calendar" label="Calendar">Calendar</button>
      <button frCommandItem value="emoji" label="Search Emoji">Search Emoji</button>
      <button frCommandItem value="calculator" label="Calculator" keywords="math,numbers">
        Calculator
      </button>
    </div>
    <div frCommandSeparator></div>
    <div frCommandGroup heading="Settings">
      <p frCommandGroupHeading>Settings</p>
      <button frCommandItem value="profile" label="Profile">
        <span>Profile</span>
        <span frCommandShortcut>⌘P</span>
      </button>
      <button frCommandItem value="billing" label="Billing">
        <span>Billing</span>
        <span frCommandShortcut>⌘B</span>
      </button>
    </div>
  </div>
  <div frCommandFooter>
    <span><kbd>↑↓</kbd> to navigate</span>
    <span><kbd>↵</kbd> to select</span>
    <span><kbd>esc</kbd> to close</span>
  </div>
</section>`;

const dialogCommandHtml = `<button frButton [frCommandDialogTrigger]="commandDialog" type="button">
  Open Menu
</button>

<ng-template #commandDialog="frCommandDialog" frCommandDialog aria-label="Command palette">
  <section frCommand closeOnSelect>
    <input frCommandInput placeholder="Search for a command to run..." />
    <div frCommandList>
      <p frCommandEmpty>No results found.</p>
      <div frCommandGroup heading="Suggestions">
        <p frCommandGroupHeading>Suggestions</p>
        <button frCommandItem value="calendar" label="Calendar">Calendar</button>
        <button frCommandItem value="emoji" label="Search Emoji">Search Emoji</button>
        <button frCommandItem value="calculator" label="Calculator">Calculator</button>
      </div>
    </div>
  </section>
</ng-template>`;

const shortcutsHtml = `<section frCommand closeOnSelect>
  <input frCommandInput placeholder="Search for a command to run..." />
  <div frCommandList>
    <p frCommandEmpty>No results found.</p>
    <div frCommandGroup heading="Settings">
      <p frCommandGroupHeading>Settings</p>
      <button frCommandItem value="profile" label="Profile">
        <span>Profile</span>
        <span frCommandShortcut>⌘P</span>
      </button>
      <button frCommandItem value="billing" label="Billing">
        <span>Billing</span>
        <span frCommandShortcut>⌘B</span>
      </button>
      <button frCommandItem value="settings" label="Settings">
        <span>Settings</span>
        <span frCommandShortcut>⌘S</span>
      </button>
    </div>
  </div>
</section>`;

const groupsHtml = `<section frCommand closeOnSelect>
  <input frCommandInput placeholder="Search for a command to run..." />
  <div frCommandList>
    <p frCommandEmpty>No results found.</p>
    <div frCommandGroup heading="Suggestions">
      <p frCommandGroupHeading>Suggestions</p>
      <button frCommandItem value="calendar" label="Calendar">
        <ng-icon frCommandItemIcon name="tablerCalendar" size="16" />
        <span>Calendar</span>
      </button>
      <button frCommandItem value="emoji" label="Search Emoji">
        <ng-icon frCommandItemIcon name="tablerMoodSearch" size="16" />
        <span>Search Emoji</span>
      </button>
    </div>
    <div frCommandSeparator></div>
    <div frCommandGroup heading="Settings">
      <p frCommandGroupHeading>Settings</p>
      <button frCommandItem value="profile" label="Profile">
        <ng-icon frCommandItemIcon name="tablerUser" size="16" />
        <span>Profile</span>
        <span frCommandShortcut>⌘P</span>
      </button>
    </div>
  </div>
</section>`;

const scrollableHtml = `<section frCommand closeOnSelect>
  <input frCommandInput placeholder="Search docs..." />
  <div frCommandList style="--frame-command-list-max-height: 14rem;">
    <p frCommandEmpty>No results found.</p>
    <div frCommandGroup heading="Components">
      <p frCommandGroupHeading>Components</p>
      @for (item of components; track item) {
        <button frCommandItem [value]="item" [label]="item">{{ item }}</button>
      }
    </div>
  </div>
</section>`;

const rtlHtml = `<section frCommand dir="rtl">
  <input frCommandInput placeholder="ابحث عن أمر..." />
  <div frCommandList>
    <p frCommandEmpty>لم يتم العثور على نتائج.</p>
    <div frCommandGroup heading="اقتراحات">
      <p frCommandGroupHeading>اقتراحات</p>
      <button frCommandItem value="calendar" label="التقويم">التقويم</button>
      <button frCommandItem value="emoji" label="البحث عن الرموز التعبيرية">
        البحث عن الرموز التعبيرية
      </button>
      <button frCommandItem value="calculator" label="الآلة الحاسبة">الآلة الحاسبة</button>
    </div>
    <div frCommandSeparator></div>
    <div frCommandGroup heading="الإعدادات">
      <p frCommandGroupHeading>الإعدادات</p>
      <button frCommandItem value="profile" label="الملف الشخصي">
        <span>الملف الشخصي</span>
        <span frCommandShortcut>⌘P</span>
      </button>
    </div>
  </div>
</section>`;

export const COMMAND_DOC: ComponentDoc = {
  slug: 'command',
  breadcrumb: 'Components / Command',

  hero: {
    id: 'command-hero',
    title: 'Preview',
    preview: {
      component: DocsCommandPreviewComponent,
    },
  },

  installation: {
    cli: {
      language: 'bash',
      code: 'npx your-cli add command',
    },
    manual: {
      steps: [
        {
          title: 'Import the command primitives your template needs.',
          code: {
            language: 'ts',
            code: commandImports,
          },
        },
      ],
    },
  },

  usage: [
    {
      language: 'ts',
      code: commandImports,
    },
    {
      language: 'html',
      code: inlineCommandHtml,
    },
  ],

  composition: `FrCommand
+-- FrCommandInput
+-- FrCommandList
    +-- FrCommandEmpty
    +-- FrCommandGroup
    |   +-- FrCommandGroupHeading
    |   +-- FrCommandItem
    |   +-- FrCommandShortcut
    +-- FrCommandSeparator
    +-- FrCommandGroup
+-- FrCommandFooter`,

  tokenInspector: {
    id: 'token-inspector',
    title: 'Token inspector',
    description:
      'Inspect the command shell, input, list, group, item, footer, and shortcut tokens.',
    preview: {
      component: DocsCommandPreviewComponent,
      inputs: {
        config: {
          mode: 'inspector',
        },
      },
      inspectorTargets: [
        {
          id: 'root',
          label: 'Command',
          selector: '[data-token-target="command-root"]',
          description: 'The command root controls the surface, radius, border, color, and shadow.',
          tokens: [
            '--frame-command-bg',
            '--frame-command-color',
            '--frame-command-border',
            '--frame-command-radius',
            '--frame-command-shadow',
          ],
        },
        {
          id: 'input',
          label: 'Input',
          selector: '[data-token-target="command-input"]',
          description: 'Input tokens tune search height, padding, border, and placeholder color.',
          tokens: [
            '--frame-command-input-height',
            '--frame-command-input-padding-inline',
            '--frame-command-input-border',
            '--frame-command-input-color',
            '--frame-command-input-placeholder-color',
          ],
        },
        {
          id: 'list',
          label: 'List',
          selector: '[data-token-target="command-list"]',
          description: 'The list owns scrolling, spacing, and interior padding.',
          tokens: [
            '--frame-command-list-max-height',
            '--frame-command-list-padding',
            '--frame-command-list-gap',
          ],
        },
        {
          id: 'group',
          label: 'Group',
          selector: '[data-token-target="command-group"]',
          description: 'Group heading tokens control muted section labels.',
          tokens: [
            '--frame-command-group-heading-padding',
            '--frame-command-group-heading-color',
            '--frame-command-group-heading-font-size',
            '--frame-command-group-heading-font-weight',
          ],
        },
        {
          id: 'item',
          label: 'Item',
          selector: '[data-token-target="command-item"]',
          description:
            'Item tokens tune action row sizing, radius, spacing, and highlighted state.',
          tokens: [
            '--frame-command-item-height',
            '--frame-command-item-gap',
            '--frame-command-item-padding',
            '--frame-command-item-radius',
            '--frame-command-item-highlighted-bg',
            '--frame-command-item-highlighted-color',
          ],
        },
        {
          id: 'shortcut',
          label: 'Shortcut',
          selector: '[data-token-target="command-shortcut"]',
          description: 'Shortcut tokens style display-only keyboard hints.',
          tokens: ['--frame-command-shortcut-color', '--frame-command-shortcut-font-size'],
        },
        {
          id: 'footer',
          label: 'Footer',
          selector: '[data-token-target="command-footer"]',
          description: 'Footer tokens style persistent navigation or close hints below the list.',
          tokens: [
            '--frame-command-footer-border',
            '--frame-command-footer-color',
            '--frame-command-footer-font-size',
            '--frame-command-footer-gap',
            '--frame-command-footer-padding',
            '--frame-command-footer-margin',
            '--frame-command-footer-key-bg',
            '--frame-command-footer-key-border',
            '--frame-command-footer-key-color',
            '--frame-command-footer-key-font-size',
          ],
        },
      ],
    },
  },

  styling: {
    description:
      'Override command tokens locally to tune the surface, list height, item highlight treatment, or dialog presentation.',
    preview: {
      id: 'custom-styling-preview',
      title: 'Custom Styling Preview',
      description: 'This preview customizes the command surface and highlighted item state.',
      preview: {
        component: DocsCommandPreviewComponent,
        inputs: {
          config: {
            style: `--frame-command-radius: 1.25rem;
--frame-command-shadow: 0 24px 60px rgb(0 0 0 / 0.18);
--frame-command-item-highlighted-bg: color-mix(in srgb, var(--frame-primary) 14%, transparent);`,
          },
        },
      },
      code: [
        { language: 'ts', code: commandImports },
        {
          language: 'html',
          code: `<section frCommand class="custom-command">
  <input frCommandInput placeholder="Type a command or search..." />
  <div frCommandList>
    <p frCommandEmpty>No results found.</p>
    <div frCommandGroup heading="Suggestions">
      <p frCommandGroupHeading>Suggestions</p>
      <button frCommandItem value="calendar" label="Calendar">Calendar</button>
      <button frCommandItem value="emoji" label="Search Emoji">Search Emoji</button>
    </div>
  </div>
  <div frCommandFooter>
    <span><kbd>↑↓</kbd> to navigate</span>
    <span><kbd>↵</kbd> to select</span>
    <span><kbd>esc</kbd> to close</span>
  </div>
</section>`,
        },
        {
          language: 'css',
          code: `.custom-command {
  --frame-command-radius: 1.25rem;
  --frame-command-shadow: 0 24px 60px rgb(0 0 0 / 0.18);
  --frame-command-item-highlighted-bg: color-mix(in srgb, var(--frame-primary) 14%, transparent);
}`,
        },
      ],
    },
  },

  examples: [
    {
      id: 'basic',
      title: 'Basic',
      description: 'A searchable command menu with groups, empty state, separators, and shortcuts.',
      preview: {
        component: DocsCommandPreviewComponent,
      },
      code: [
        { language: 'ts', code: commandImports },
        { language: 'html', code: inlineCommandHtml },
      ],
    },
    {
      id: 'dialog',
      title: 'Dialog',
      description:
        'Open a command menu from the template with FrCommandDialog and FrCommandDialogTrigger.',
      preview: {
        component: DocsCommandPreviewComponent,
        inputs: { config: { mode: 'dialog' } },
      },
      code: [
        { language: 'ts', code: commandImports },
        {
          language: 'html',
          code: dialogCommandHtml,
        },
      ],
    },
    {
      id: 'programmatic',
      title: 'Programmatic',
      description: 'Inject FrCommandService and open a command menu component directly from code.',
      preview: {
        component: DocsCommandPreviewComponent,
        inputs: { config: { mode: 'programmatic' } },
      },
      code: [
        {
          language: 'ts',
          code: `import { Component, inject } from '@angular/core';
import { FrCommandService } from '@frame-ui-ng/components/command';

@Component({
  selector: 'app-example',
  template: \`<button frButton type="button" (click)="openCommand()">Open from code</button>\`,
})
export class ExampleComponent {
  private readonly command = inject(FrCommandService);

  openCommand(): void {
    this.command.open(DocsProgrammaticCommandBodyComponent);
  }
}`,
        },
        {
          language: 'html',
          code: `<section frCommand closeOnSelect>
  <input frCommandInput placeholder="Search programmatic commands..." />
  <div frCommandList>
    <p frCommandEmpty>No results found.</p>
    <div frCommandGroup heading="Actions">
      <p frCommandGroupHeading>Actions</p>
      <button frCommandItem value="calendar" label="Open calendar">Open calendar</button>
      <button frCommandItem value="settings" label="Open settings">
        <span>Open settings</span>
        <span frCommandShortcut>⌘S</span>
      </button>
    </div>
  </div>
</section>`,
        },
        {
          language: 'ts',
          code: `@Component({
  selector: 'docs-programmatic-command-body',
  imports: [
    FrCommandModule,
    NgIcon,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [provideIcons(commandIcons)],
  template: \`
    <section frCommand closeOnSelect aria-label="Programmatic command menu">
      <input frCommandInput placeholder="Search programmatic commands..." />
      <div frCommandList>
        <p frCommandEmpty>No results found.</p>
        <div frCommandGroup heading="Actions">
          <p frCommandGroupHeading>Actions</p>
          <button frCommandItem value="calendar" label="Open calendar">
            <ng-icon frCommandItemIcon name="tablerCalendar" size="16" />
            <span>Open calendar</span>
          </button>
          <button frCommandItem value="settings" label="Open settings">
            <ng-icon frCommandItemIcon name="tablerSettings" size="16" />
            <span>Open settings</span>
            <span frCommandShortcut>⌘S</span>
          </button>
        </div>
      </div>
    </section>
  \`,
})
export class DocsProgrammaticCommandBodyComponent {}`,
        },
      ],
    },
    {
      id: 'shortcuts',
      title: 'Shortcuts',
      description: 'Use FrCommandShortcut for display-only keyboard shortcut hints.',
      preview: {
        component: DocsCommandPreviewComponent,
        inputs: { config: { mode: 'shortcuts' } },
      },
      code: [
        { language: 'ts', code: commandImports },
        { language: 'html', code: shortcutsHtml },
      ],
    },
    {
      id: 'groups',
      title: 'Groups',
      description:
        'Group related commands, add icons, and separate sections with FrCommandSeparator.',
      preview: {
        component: DocsCommandPreviewComponent,
        inputs: { config: { mode: 'groups' } },
      },
      code: [
        { language: 'ts', code: commandImports },
        { language: 'html', code: groupsHtml },
      ],
    },
    {
      id: 'scrollable',
      title: 'Scrollable',
      description: 'Limit the command list height to keep long menus usable.',
      preview: {
        component: DocsCommandPreviewComponent,
        inputs: { config: { mode: 'scrollable' } },
      },
      code: [
        {
          language: 'ts',
          code: `${commandImports}

readonly components = [
  'Accordion',
  'Alert',
  'Avatar',
  'Badge',
  'Breadcrumb',
  'Button',
  'Calendar',
  'Card',
  'Carousel',
  'Checkbox',
  'Collapsible',
  'Combobox',
  'Command',
  'Dropdown Menu',
  'Input',
  'Modal',
  'Select',
  'Switch',
  'Textarea',
];`,
        },
        { language: 'html', code: scrollableHtml },
      ],
    },
    {
      id: 'rtl',
      title: 'RTL support',
      description:
        'Command uses logical spacing, so items, shortcuts, groups, and icons adapt in RTL.',
      preview: {
        component: DocsCommandPreviewComponent,
        inputs: { config: { mode: 'rtl' } },
      },
      code: [
        { language: 'ts', code: commandImports },
        { language: 'html', code: rtlHtml },
      ],
    },
  ],

  tokensTitle: 'Design Tokens',
  tokensDescription:
    'Use these CSS custom properties to tune command surfaces, search input, groups, items, shortcuts, separators, and dialog overlays.',
  tokens: `
  --frame-command-bg: var(--frame-surface);
  --frame-command-color: var(--frame-surface-foreground);
  --frame-command-border: var(--frame-border);
  --frame-command-radius: var(--frame-radius-lg);
  --frame-command-shadow: 0 16px 48px rgb(0 0 0 / 0.14);
  --frame-command-input-height: 3.25rem;
  --frame-command-list-max-height: 20rem;
  --frame-command-item-height: 2.5rem;
  --frame-command-item-highlighted-bg: var(--frame-accent);
  --frame-command-item-highlighted-color: var(--frame-accent-foreground);
  --frame-command-shortcut-color: var(--frame-muted-foreground);
  --frame-command-backdrop-bg: rgb(0 0 0 / 0.42);
  `,
};

