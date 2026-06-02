import { ComponentDoc } from '../../shared/models/component-doc.model';
import {
  DocsVirtualScrollPreviewComponent,
  VirtualScrollDemoItem,
  VirtualScrollPreviewConfig,
} from './previews/virtual-scroll-preview';

const importsCode = `import { FrVirtualScrollModule } from '@frame-ui/components/virtual-scroll';`;

const itemsTs = `${importsCode}

items = Array.from({ length: 500 }, (_, index) => ({
  id: index,
  label: \`Release note \${index + 1}\`,
  meta: \`v\${Math.floor(index / 10) + 1}.\${(index % 10) + 1}\`,
}));

trackItem = (_index: number, item: { id: number }) => item.id;`;

const releaseItems: VirtualScrollDemoItem[] = Array.from({ length: 500 }, (_, index) => ({
  id: `release-${index}`,
  label: `Release note ${index + 1}`,
  description:
    index % 3 === 0
      ? 'Token updates, docs revisions, and rollout guidance for shared UI changes.'
      : 'Preview, QA, and migration detail captured for the next staged deployment.',
  meta: `v${Math.floor(index / 10) + 1}.${(index % 10) + 1}`,
}));

const queueItems: VirtualScrollDemoItem[] = Array.from({ length: 240 }, (_, index) => ({
  id: `queue-${index}`,
  label: `Rollout job ${index + 1}`,
  meta: `${(index % 12) + 1} min`,
}));

const selectItems: VirtualScrollDemoItem[] = [
  { id: 'select-1', label: 'FrameUI', description: 'Tokens, primitives, and component governance.', icon: 'tablerPalette', selected: true },
  { id: 'select-2', label: 'Docs platform', description: 'Reference pages, examples, and onboarding flows.', icon: 'tablerLayoutGrid' },
  { id: 'select-3', label: 'Angular app shell', description: 'Signals, routes, SSR, and app-level composition.', icon: 'tablerBrandAngular' },
  { id: 'select-4', label: 'Vue integration', description: 'Progressive adoption and design token bridging.', icon: 'tablerBrandVue' },
  { id: 'select-5', label: 'Svelte experiments', description: 'Small interactive prototypes and motion tests.', icon: 'tablerBrandSvelte' },
  ...Array.from({ length: 140 }, (_, index) => ({
    id: `select-extra-${index}`,
    label: `Option ${index + 6}`,
    description: 'Longer option sets stay responsive because only the visible window renders.',
    icon: index % 2 === 0 ? 'tablerComponents' : 'tablerCode',
  })),
];

const comboboxItems: VirtualScrollDemoItem[] = [
  { id: 'combo-1', label: 'Open command palette', description: 'Show global actions, navigation, and recent work.', meta: 'Cmd+K', icon: 'tablerBolt', selected: true },
  { id: 'combo-2', label: 'Publish release notes', description: 'Render docs, update changelog, and announce the rollout.', meta: 'Docs', icon: 'tablerRocket' },
  { id: 'combo-3', label: 'Review token coverage', description: 'Audit primitives, examples, and override gaps.', meta: 'Tokens', icon: 'tablerChecklist' },
  { id: 'combo-4', label: 'Reply to support thread', description: 'Open the linked conversation and compose a response.', meta: 'Inbox', icon: 'tablerMessage2' },
  ...Array.from({ length: 180 }, (_, index) => ({
    id: `combo-extra-${index}`,
    label: `Search result ${index + 5}`,
    description: 'Virtualization helps command-style surfaces stay smooth even with very large result sets.',
    meta: index % 2 === 0 ? 'Action' : 'Page',
    icon: index % 3 === 0 ? 'tablerCode' : 'tablerComponents',
  })),
];

const heroConfig: VirtualScrollPreviewConfig = {
  variant: 'basic',
  items: releaseItems,
  height: '20rem',
  itemSize: 56,
};

const controlsConfig: VirtualScrollPreviewConfig = {
  variant: 'controls',
  items: queueItems,
  height: '18rem',
  itemSize: 52,
};

const selectConfig: VirtualScrollPreviewConfig = {
  variant: 'select',
  items: selectItems,
  height: '16rem',
  itemSize: 44,
  title: 'FrameUI',
  subtitle: 'Surfaces',
};

const comboboxConfig: VirtualScrollPreviewConfig = {
  variant: 'combobox',
  items: comboboxItems,
  height: '16rem',
  itemSize: 44,
  title: 'Search commands, pages, or frameworks',
  subtitle: 'Results',
};

const inspectorConfig: VirtualScrollPreviewConfig = {
  variant: 'inspector',
  items: releaseItems.slice(0, 120),
  height: '16rem',
  itemSize: 52,
};

const customStylingConfig: VirtualScrollPreviewConfig = {
  variant: 'custom',
  style: `--frame-border: color-mix(in srgb, var(--frame-primary) 22%, var(--frame-border));
--frame-surface: color-mix(in srgb, var(--frame-primary) 4%, var(--frame-surface));
--frame-accent: color-mix(in srgb, var(--frame-primary) 16%, var(--frame-accent));
--frame-accent-foreground: var(--frame-foreground);
--frame-muted-foreground: color-mix(in srgb, var(--frame-primary) 28%, var(--frame-muted-foreground));`,
  items: releaseItems.slice(0, 160).map((item, index) => ({
    ...item,
    icon: index % 2 === 0 ? 'tablerRocket' : 'tablerComponents',
  })),
  height: '18rem',
  itemSize: 56,
};

export const VIRTUAL_SCROLL_DOC: ComponentDoc = {
  slug: 'virtual-scroll',
  breadcrumb: 'Components / Virtual Scroll',

  hero: {
    id: 'virtual-scroll-hero',
    title: 'Preview',
    preview: {
      component: DocsVirtualScrollPreviewComponent,
      inputs: {
        config: heroConfig,
      },
    },
  },

  installation: {
    cli: {
      language: 'bash',
      code: 'npx your-cli add virtual-scroll',
    },
    manual: {
      steps: [
        {
          title: 'Import the viewport, content, structural directive, and any optional list primitives you want to style with.',
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
      code: itemsTs,
    },
    {
      language: 'html',
      code: `<div frVirtualList>
  <div frVirtualViewport [height]="'18rem'" [itemSize]="52" [overscan]="4">
    <div frVirtualContent>
      <button frVirtualItem *frVirtualFor="let item of items; trackBy: trackItem">
        <span>{{ item.label }}</span>
      </button>
    </div>
  </div>
</div>`,
    },
  ],

  tokenInspector: {
    id: 'token-inspector',
    title: 'Token inspector',
    description:
      'Inspect the list shell, viewport, content padding, item rows, and meta text. Virtual Scroll is intentionally structural, so most of its styling comes from inherited surface tokens plus the helper classes.',
    preview: {
      component: DocsVirtualScrollPreviewComponent,
      containerClass: 'block',
      inputs: {
        config: inspectorConfig,
      },
      inspectorTargets: [
        {
          id: 'panel',
          label: 'List shell',
          selector: '[data-token-target="panel"]',
          description: 'The outer shell inherits border, radius, and surface tokens from the FrameUI instead of defining its own component-specific contract.',
          tokens: ['--frame-border', '--frame-radius-lg', '--frame-surface'],
        },
        {
          id: 'viewport',
          label: 'Viewport',
          selector: '[data-token-target="viewport"]',
          description: 'The viewport is the scrolling window. Its height and overscan inputs determine how much of the virtual range is visible and buffered.',
          tokens: ['--frame-border', '--frame-surface'],
        },
        {
          id: 'content',
          label: 'Virtual content',
          selector: '[data-token-target="content"]',
          description: 'The content wrapper applies dynamic top and bottom padding to represent the items that are not currently rendered.',
          tokens: ['--frame-surface'],
        },
        {
          id: 'item',
          label: 'Item row',
          selector: '[data-token-target="item"]',
          description: 'Item rows inherit foreground, accent hover, and border tokens. You can compose them with other component styles when needed.',
          tokens: ['--frame-foreground', '--frame-border', '--frame-accent', '--frame-accent-foreground'],
        },
        {
          id: 'meta',
          label: 'Item meta',
          selector: '[data-token-target="meta"]',
          description: 'Meta text uses the shared muted-foreground token to stay secondary to the main row label.',
          tokens: ['--frame-muted-foreground'],
        },
      ],
    },
  },

  styling: {
    description:
      'Virtual Scroll does not define dedicated `--frame-virtual-scroll-*` tokens. Customize it by overriding shared surface tokens locally or by targeting the helper classes for row density and spacing.',
    preview: {
      id: 'custom-styling-preview',
      title: 'Custom Styling Preview',
      description:
        'This preview applies local surface-token overrides so the list shell, hover treatment, and supporting text pick up a branded tone.',
      preview: {
        component: DocsVirtualScrollPreviewComponent,
        inputs: {
          config: customStylingConfig,
        },
      },
      code: [
        {
          language: 'ts',
          code: itemsTs,
        },
        {
          language: 'html',
          code: `<div class="release-feed">
  <div frVirtualList>
    <div frVirtualViewport [height]="'18rem'" [itemSize]="56">
      <div frVirtualContent>
        <button frVirtualItem *frVirtualFor="let item of items; trackBy: trackItem">
          <span>{{ item.label }}</span>
          <span frVirtualItemMeta>{{ item.meta }}</span>
        </button>
      </div>
    </div>
  </div>
</div>`,
        },
        {
          language: 'css',
          code: `.release-feed {
${customStylingConfig.style}
}

.release-feed [frVirtualItem] {
  min-block-size: 3.5rem;
}
`,
        },
      ],
    },
  },

  examples: [
    {
      id: 'basic',
      title: 'Long lists',
      description:
        'Use Virtual Scroll when a list is large enough that rendering every row at once would add unnecessary DOM weight and scrolling cost.',
      preview: {
        component: DocsVirtualScrollPreviewComponent,
        inputs: {
          config: heroConfig,
        },
      },
      code: [
        {
          language: 'ts',
          code: itemsTs,
        },
        {
          language: 'html',
          code: `<div frVirtualList>
  <div frVirtualViewport [height]="'20rem'" [itemSize]="56" [overscan]="4">
    <div frVirtualContent>
      <button frVirtualItem *frVirtualFor="let item of items; trackBy: trackItem">
        <span>{{ item.label }}</span>
        <span frVirtualItemMeta>{{ item.meta }}</span>
      </button>
    </div>
  </div>
</div>`,
        },
      ],
    },
    {
      id: 'scroll-to-index',
      title: 'Programmatic scrolling',
      description:
        'The viewport instance exposes `scrollToIndex`, which is useful for jump navigation, keyboard shortcuts, and preserving context after filtering.',
      preview: {
        component: DocsVirtualScrollPreviewComponent,
        inputs: {
          config: controlsConfig,
        },
      },
      code: [
        {
          language: 'ts',
          code: `import { FrButtonModule } from '@frame-ui/components/button';
${itemsTs}`,
        },
        {
          language: 'html',
          code: `<button frButton type="button" (click)="viewport.scrollToIndex(0, 'start')">
  <span frButtonLabel>Top</span>
</button>

<div frVirtualList>
  <div
    #viewport="frVirtualViewport"
    frVirtualViewport
    [height]="'18rem'"
    [itemSize]="52"
    [overscan]="6"
  >
    <div frVirtualContent>
      <button frVirtualItem *frVirtualFor="let item of items; trackBy: trackItem">
        <span>{{ item.label }}</span>
      </button>
    </div>
  </div>
</div>`,
        },
      ],
    },
    {
      id: 'select',
      title: 'Select-style option panels',
      description:
        'Virtual Scroll works well inside Select-like option panels when the option set is large but the visual treatment should still read like a familiar picker.',
      preview: {
        component: DocsVirtualScrollPreviewComponent,
        inputs: {
          config: selectConfig,
        },
      },
      code: [
        {
          language: 'ts',
          code: `import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FrSelectModule } from '@frame-ui/components/select';
${importsCode}

surfaceControl = new FormControl<string | null>(null);

surfaceOptions = Array.from({ length: 150 }, (_, index) => ({
  value: \`option-\${index}\`,
  label: \`Option \${index + 1}\`,
}));

trackOption = (_index: number, option: { value: string }) => option.value;`,
        },
        {
          language: 'html',
          code: `<button [frSelect]="surfaceMenu" [formControl]="surfaceControl" indicatorPosition="end" type="button">
  <frame-select-value placeholder="Choose a surface"></frame-select-value>
  <span frSelectIcon>
    <ng-icon name="tablerChevronDown" size="16" />
  </span>
</button>

<ng-template #surfaceMenu="frSelectContent" frSelectContent>
  <frame-select-panel>
    <div frVirtualViewport [height]="'16rem'" [itemSize]="44" [overscan]="6">
      <div frVirtualContent>
        <frame-select-group>
          <button
            frSelectItem
            *frVirtualFor="let option of surfaceOptions; trackBy: trackOption"
            [value]="option.value"
            [label]="option.label"
          >
            <span>{{ option.label }}</span>
          </button>
        </frame-select-group>
      </div>
    </div>
  </frame-select-panel>
</ng-template>`,
        },
      ],
    },
    {
      id: 'combobox',
      title: 'Combobox-style result lists',
      description:
        'Virtual Scroll also fits Combobox-style search results, where the result set can spike but the panel still needs to feel immediate and keyboard-friendly.',
      preview: {
        component: DocsVirtualScrollPreviewComponent,
        inputs: {
          config: comboboxConfig,
        },
      },
      code: [
        {
          language: 'ts',
          code: `import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FrComboboxModule } from '@frame-ui/components/combobox';
${importsCode}

resultControl = new FormControl<string | null>(null);

results = Array.from({ length: 200 }, (_, index) => ({
  value: \`result-\${index}\`,
  label: \`Search result \${index + 1}\`,
}));

itemToString = (value: unknown) =>
  this.results.find((result) => result.value === value)?.label ?? '';

trackResult = (_index: number, result: { value: string }) => result.value;`,
        },
        {
          language: 'html',
          code: `<div frCombobox [formControl]="resultControl" [itemToStringValue]="itemToString">
  <input frComboboxInput placeholder="Search commands, pages, or frameworks" />

  <ng-template frComboboxContent>
    <div frComboboxPanel>
      <div frComboboxLabel>Results</div>

      <div frVirtualViewport [height]="'16rem'" [itemSize]="44" [overscan]="6">
        <div frVirtualContent>
          <div frComboboxList>
            <button
              frComboboxItem
              *frVirtualFor="let result of results; trackBy: trackResult"
              [value]="result.value"
              [label]="result.label"
            >
              <span>{{ result.label }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </ng-template>
</div>`,
        },
      ],
    },
  ],

  tokensTitle: 'Design Tokens',
  tokensDescription:
    'Virtual Scroll is structural and does not define its own component-scoped token contract. It inherits shared surface, border, radius, accent, and muted-text tokens from the surrounding FrameUI.'
};

