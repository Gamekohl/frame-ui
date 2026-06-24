import { ComponentDoc } from '../../shared/models/component-doc.model';
import {
  ComboboxPreviewConfig,
  DocsComboboxPreviewComponent,
} from './previews/combobox-preview';

const comboboxImportsCode = `import { FrComboboxModule } from '@frame-ui-ng/components/combobox';`;

const frameworkGroups = [
  {
    label: 'Frontend',
    items: [
      {
        value: 'angular',
        label: 'Angular',
        description: 'Frontend frameworks with a rich ecosystem.',
      },
      {
        value: 'next',
        label: 'Next.js',
        description: 'Lean runtime with transitions and strong progressive enhancement.',
      },
      {
        value: 'nuxt',
        label: 'Nuxt',
        description: 'Vue-first routing, server rendering, and content modules.',
      },
    ],
  },
  {
    label: 'Full-stack',
    items: [
      {
        value: 'remix',
        label: 'Remix',
        description: 'Nested routes and mutation-first form handling.',
      },
      {
        value: 'astro',
        label: 'Astro',
        description: 'Content-heavy sites with selective island hydration.',
      },
    ],
  },
];

const heroConfig: ComboboxPreviewConfig = {
  variant: 'input',
  className: 'min-w-lg max-w-2xl',
  placeholder: 'Search frameworks',
  showClear: true,
  autoHighlight: true,
  initialValue: 'angular',
  groups: frameworkGroups,
};

const basicConfig: ComboboxPreviewConfig = {
  variant: 'input',
  className: 'min-w-lg max-w-2xl',
  placeholder: 'Search frameworks',
  showClear: true,
  initialValue: null,
  groups: frameworkGroups,
};

const triggerConfig: ComboboxPreviewConfig = {
  variant: 'trigger',
  className: 'min-w-lg max-w-2xl',
  triggerLabel: 'Assign owner',
  initialValue: 'platform',
  groups: [
    {
      items: [
        { value: 'platform', label: 'Platform' },
        { value: 'application', label: 'Application' },
        { value: 'marketing', label: 'Marketing' },
      ],
    },
  ],
};

const chipsConfig: ComboboxPreviewConfig = {
  variant: 'chips',
  className: 'min-w-lg max-w-2xl',
  placeholder: 'Add frameworks',
  multiple: true,
  initialValue: ['next', 'astro'],
  groups: frameworkGroups,
};

const invalidConfig: ComboboxPreviewConfig = {
  variant: 'input',
  className: 'min-w-lg max-w-2xl',
  placeholder: 'Select a framework',
  reactiveInvalidDemo: true,
  errorText: 'Choose at least one supported framework before continuing.',
  groups: frameworkGroups,
};

const inspectorConfig: ComboboxPreviewConfig = {
  variant: 'input',
  className: 'w-full max-w-5xl',
  persistentPanel: true,
  placeholder: 'Search frameworks',
  showClear: true,
  initialValue: 'next',
  tokenPrefix: 'combobox',
  groups: [frameworkGroups[0]],
};

const customStylingConfig: ComboboxPreviewConfig = {
  variant: 'chips',
  className: 'min-w-lg max-w-2xl',
  placeholder: 'Add teammates',
  multiple: true,
  initialValue: ['next', 'nuxt'],
  style: `--frame-combobox-control-height: 3rem;
--frame-combobox-control-radius: 1rem;
--frame-combobox-control-border: color-mix(in srgb, var(--frame-primary) 22%, var(--frame-border));
--frame-combobox-control-focus-border: color-mix(in srgb, var(--frame-primary) 55%, var(--frame-border));
--frame-combobox-panel-radius: 1rem;
--frame-combobox-panel-shadow: 0 24px 60px color-mix(in srgb, var(--frame-primary) 12%, transparent);
--frame-combobox-item-radius: 0.875rem;
--frame-combobox-chip-bg: green;
--frame-combobox-chip-color: white`,
  groups: frameworkGroups,
};

export const COMBOBOX_DOC: ComponentDoc = {
  slug: 'combobox',
  breadcrumb: 'Components / Combobox',

  hero: {
    id: 'combobox-hero',
    title: 'Preview',
    preview: {
      component: DocsComboboxPreviewComponent,
      inputs: {
        config: heroConfig,
      },
    },
  },

  installation: {
    cli: {
      language: 'bash',
      code: 'npx your-cli add combobox',
    },
    manual: {
      steps: [
        {
          title: 'Import the combobox primitives and ng-icons into your component.',
          code: {
            language: 'ts',
            code: comboboxImportsCode,
          },
        },
      ],
    },
  },

  usage: [
    {
      language: 'ts',
      code: comboboxImportsCode,
    },
    {
      language: 'html',
      code: `<div frCombobox autoHighlight showClear>
  <input frComboboxInput placeholder="Search frameworks" />

  <button frComboboxClear aria-label="Clear selection">
    <ng-icon name="tablerX" size="14" />
  </button>

  <ng-template frComboboxContent>
    <div frComboboxPanel>
      <p frComboboxEmpty>No frameworks found.</p>

      <div frComboboxCollection>
        <section frComboboxGroup>
          <p frComboboxLabel>Frontend</p>

          <div frComboboxList>
            <button frComboboxItem value="next" label="Next.js">
              <span frComboboxItemIndicator>
                <ng-icon name="tablerCheck" size="14" />
              </span>
              Next.js
            </button>
          </div>
        </section>
      </div>
    </div>
  </ng-template>
</div>`,
    },
  ],

  tokenInspector: {
    id: 'token-inspector',
    title: 'Token inspector',
    description:
      'Hover the control, clear action, panel, option rows, or group labels to inspect the tokens that shape the combobox surface. Click a region to pin the popover while you compare the current values.',
    preview: {
      component: DocsComboboxPreviewComponent,
      containerClass: 'w-full',
      inputs: {
        config: inspectorConfig,
      },
      inspectorLayout: 'popover',
      inspectorTargets: [
        {
          id: 'control',
          label: 'Control shell',
          selector: '[data-token-target="combobox-control"]',
          description:
            'The input shell defines height, radius, border, focus ring, and base typography for the searchable control.',
          tokens: [
            '--frame-combobox-control-height',
            '--frame-combobox-control-radius',
            '--frame-combobox-control-bg',
            '--frame-combobox-control-color',
            '--frame-combobox-control-border',
            '--frame-combobox-control-font-size',
            '--frame-combobox-control-padding-inline',
            '--frame-combobox-control-focus-border',
            '--frame-combobox-control-focus-shadow',
          ],
        },
        {
          id: 'clear',
          label: 'Clear action',
          selector: '[data-token-target="combobox-clear"]',
          description:
            'The clear affordance is positioned independently so it can sit inside input-based comboboxes without changing the field layout.',
          tokens: ['--frame-combobox-clear-offset'],
        },
        {
          id: 'panel',
          label: 'Overlay panel',
          selector: '[data-token-target="combobox-panel-preview"]',
          description:
            'Panel tokens control the dropdown surface, shadow, radius, padding, and motion when the overlay opens above or below the field.',
          tokens: [
            '--frame-combobox-panel-max-height',
            '--frame-combobox-panel-radius',
            '--frame-combobox-panel-bg',
            '--frame-combobox-panel-color',
            '--frame-combobox-panel-border',
            '--frame-combobox-panel-shadow',
            '--frame-combobox-panel-padding',
            '--frame-combobox-motion-duration',
            '--frame-combobox-motion-easing',
          ],
        },
        {
          id: 'item',
          label: 'Option row',
          selector: '[data-token-target="combobox-item-preview"]',
          description:
            'Each option row uses dedicated sizing and spacing tokens so dense command-style lists and roomy picker menus can share the same markup.',
          tokens: [
            '--frame-combobox-item-height',
            '--frame-combobox-item-gap',
            '--frame-combobox-item-radius',
            '--frame-combobox-item-font-size',
            '--frame-combobox-item-padding',
            '--frame-combobox-item-indicator-offset',
            '--frame-combobox-item-disabled-opacity',
          ],
        },
        {
          id: 'group-label',
          label: 'Group label',
          selector: '[data-token-target="combobox-group-label-preview"]',
          description:
            'Muted labels and empty states share a quieter typography layer that helps organize long option collections.',
          tokens: ['--frame-combobox-muted-font-size', '--frame-combobox-muted-padding'],
        },
      ],
    },
  },

  styling: {
    description:
      'Override combobox tokens on a local wrapper when a picker needs a different density, a more branded panel, or custom chip styling without changing the combobox structure itself.',
    preview: {
      id: 'custom-styling-preview',
      title: 'Custom Styling Preview',
      description:
        'This preview applies local token overrides to the control, dropdown, and chips so the same combobox API can feel more tailored to a specific product area.',
      preview: {
        component: DocsComboboxPreviewComponent,
        inputs: {
          config: customStylingConfig,
        },
      },
      code: [
        {
          language: 'ts',
          code: comboboxImportsCode,
        },
        {
          language: 'html',
          code: `<div class="team-picker">
  <div frCombobox multiple>
    <div frComboboxChips>
      <div #values="frComboboxValue" frComboboxValue>
        @for (item of values.values(); track item) {
          <span frComboboxChip [value]="item">
            {{ item }}
            <button frComboboxChipRemove aria-label="Remove selected framework">
              <ng-icon name="tablerX" size="12" />
            </button>
          </span>
        }
      </div>

      <input frComboboxChipsInput placeholder="Add frameworks" />
    </div>

    <ng-template frComboboxContent>
      <div frComboboxPanel>
        <div frComboboxList>
          <button frComboboxItem value="next">Next.js</button>
          <button frComboboxItem value="nuxt">Nuxt</button>
        </div>
      </div>
    </ng-template>
  </div>
</div>`,
        },
        {
          language: 'css',
          code: `.team-picker {
${customStylingConfig.style}
}`,
        },
      ],
    },
  },

  examples: [
    {
      id: 'basic',
      title: 'Searchable input',
      description:
        'Use the input variant when people should filter a long option set as they type and clear the current query or selection quickly.',
      preview: {
        component: DocsComboboxPreviewComponent,
        inputs: {
          config: basicConfig,
        },
      },
      code: [
        {
          language: 'ts',
          code: comboboxImportsCode,
        },
        {
          language: 'html',
          code: `<div frCombobox autoHighlight showClear>
  <input frComboboxInput placeholder="Search frameworks" />
  <button frComboboxClear aria-label="Clear selection">
    <ng-icon name="tablerX" size="14" />
  </button>

  <ng-template frComboboxContent>
    <div frComboboxPanel>
      <p frComboboxEmpty>No frameworks found.</p>
      <div frComboboxList>
        <button frComboboxItem value="next">Next.js</button>
        <button frComboboxItem value="svelte">SvelteKit</button>
      </div>
    </div>
  </ng-template>
</div>`,
        },
      ],
    },
    {
      id: 'grouped',
      title: 'Grouped collections',
      description:
        'Use collection, group, and label primitives to break large menus into smaller sections without losing keyboard navigation or filtering behavior.',
      preview: {
        component: DocsComboboxPreviewComponent,
        inputs: {
          config: heroConfig,
        },
      },
      code: [
        {
          language: 'ts',
          code: comboboxImportsCode,
        },
        {
          language: 'html',
          code: `<ng-template frComboboxContent>
  <div frComboboxPanel>
    <div frComboboxCollection>
      <section frComboboxGroup>
        <p frComboboxLabel>Frontend</p>
        <div frComboboxList>
          <button frComboboxItem value="next">Next.js</button>
          <button frComboboxItem value="svelte">SvelteKit</button>
        </div>
      </section>

      <section frComboboxGroup>
        <p frComboboxLabel>Full-stack</p>
        <div frComboboxList>
          <button frComboboxItem value="remix">Remix</button>
          <button frComboboxItem value="astro">Astro</button>
        </div>
      </section>
    </div>
  </div>
</ng-template>`,
        },
      ],
    },
    {
      id: 'trigger',
      title: 'Trigger button',
      description:
        'Use the trigger primitive when the selected value should read more like a compact picker or assignment control than a free-typing search field.',
      preview: {
        component: DocsComboboxPreviewComponent,
        inputs: {
          config: triggerConfig,
        },
      },
      code: [
        {
          language: 'ts',
          code: comboboxImportsCode,
        },
        {
          language: 'html',
          code: `<div frCombobox>
  <button frComboboxTrigger type="button">
    <span>Assign owner</span>
    <ng-icon name="tablerChevronDown" size="16" />
  </button>

  <ng-template frComboboxContent>
    <div frComboboxPanel>
      <div frComboboxList>
        <button frComboboxItem value="platform">Platform</button>
        <button frComboboxItem value="application">Application</button>
      </div>
    </div>
  </ng-template>
</div>`,
        },
      ],
    },
    {
      id: 'multiple',
      title: 'Multiple values with chips',
      description:
        'Switch to the chips primitives when a combobox should collect several selected values while keeping search input available in the same field.',
      preview: {
        component: DocsComboboxPreviewComponent,
        inputs: {
          config: chipsConfig,
        },
      },
      code: [
        {
          language: 'ts',
          code: comboboxImportsCode,
        },
        {
          language: 'html',
          code: `<div frCombobox multiple>
  <div frComboboxChips>
    <div #values="frComboboxValue" frComboboxValue>
      @for (item of values.values(); track item) {
        <span frComboboxChip [value]="item">
          {{ item }}
          <button frComboboxChipRemove aria-label="Remove selected framework">
            <ng-icon name="tablerX" size="12" />
          </button>
        </span>
      }
    </div>

    <input frComboboxChipsInput placeholder="Add frameworks" />
  </div>

  <ng-template frComboboxContent>
    <div frComboboxPanel>
      <div frComboboxList>
        <button frComboboxItem value="next">Next.js</button>
        <button frComboboxItem value="astro">Astro</button>
      </div>
    </div>
  </ng-template>
</div>`,
        },
      ],
    },
    {
      id: 'invalid',
      title: 'Invalid state',
      description:
        'Use Angular Reactive Forms to drive the invalid state so the combobox reflects real validation rules.',
      preview: {
        component: DocsComboboxPreviewComponent,
        inputs: {
          config: invalidConfig,
        },
      },
      code: [
        {
          language: 'ts',
          code: `import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { FrComboboxModule } from '@frame-ui-ng/components/combobox';

frameworkControl = new FormControl<string | null>(null, {
  validators: [Validators.required],
});`,
        },
        {
          language: 'html',
          code: `<div
  frCombobox
  [formControl]="frameworkControl"
  [invalid]="frameworkControl.invalid && frameworkControl.touched"
>
  <input frComboboxInput placeholder="Select a framework" />

  <ng-template frComboboxContent>
    <div frComboboxPanel>
      <div frComboboxList>
        <button frComboboxItem value="next">Next.js</button>
        <button frComboboxItem value="svelte">SvelteKit</button>
      </div>
    </div>
  </ng-template>
</div>

@if (frameworkControl.invalid && frameworkControl.touched) {
  <p frComboboxError>Choose at least one supported framework before continuing.</p>
}`,
        },
      ],
    },
  ],

  tokensTitle: 'Design Tokens',
  tokensDescription:
    'Use these CSS custom properties to tune the combobox field, overlay panel, option rows, muted labels, chips, and validation treatment without changing the component markup.',
  tokens: `
  --frame-combobox-control-height: 2.5rem;
  --frame-combobox-control-radius: var(--frame-radius-md);
  --frame-combobox-control-bg: var(--frame-surface);
  --frame-combobox-control-color: var(--frame-surface-foreground);
  --frame-combobox-control-border: var(--frame-border);
  --frame-combobox-control-font-size: 0.875rem;
  --frame-combobox-control-padding-inline: 0.875rem;
  --frame-combobox-control-disabled-bg: color-mix(in srgb, var(--frame-surface) 78%, var(--frame-muted));
  --frame-combobox-control-disabled-color: var(--frame-muted-foreground);
  --frame-combobox-control-disabled-opacity: 0.6;
  --frame-combobox-control-focus-border: color-mix(in srgb, var(--frame-ring) 70%, var(--frame-border));
  --frame-combobox-control-focus-shadow: 0 0 0 3px color-mix(in srgb, var(--frame-ring) 22%, transparent);
  --frame-combobox-control-invalid-border: color-mix(in srgb, var(--frame-destructive) 65%, var(--frame-border));
  --frame-combobox-control-invalid-shadow: 0 0 0 3px color-mix(in srgb, var(--frame-destructive) 14%, transparent);
  --frame-combobox-control-transition-duration: 150ms;
  --frame-combobox-clear-offset: 0.375rem;
  --frame-combobox-panel-max-height: min(18rem, 50vh);
  --frame-combobox-panel-radius: var(--frame-radius-md);
  --frame-combobox-panel-bg: var(--frame-surface);
  --frame-combobox-panel-color: var(--frame-surface-foreground);
  --frame-combobox-panel-border: var(--frame-border);
  --frame-combobox-panel-shadow: var(--frame-shadow-md);
  --frame-combobox-panel-padding: 0.25rem;
  --frame-combobox-motion-duration: 140ms;
  --frame-combobox-motion-easing: cubic-bezier(0.16, 1, 0.3, 1);
  --frame-combobox-motion-distance: 0.2rem;
  --frame-combobox-motion-scale: 0.98;
  --frame-combobox-list-gap: 0.125rem;
  --frame-combobox-item-height: 2rem;
  --frame-combobox-item-gap: 0.5rem;
  --frame-combobox-item-radius: var(--frame-radius-sm);
  --frame-combobox-item-font-size: 0.875rem;
  --frame-combobox-item-padding: 0.375rem 0.5rem 0.375rem 2rem;
  --frame-combobox-item-indicator-offset: 0.625rem;
  --frame-combobox-item-disabled-opacity: 0.5;
  --frame-combobox-muted-font-size: 0.8125rem;
  --frame-combobox-muted-padding: 0.5rem;
  --frame-combobox-separator-margin: 0.25rem -0.25rem;
  --frame-combobox-separator-bg: var(--frame-border);
  --frame-combobox-chip-gap: 0.25rem;
  --frame-combobox-chip-height: 1.375rem;
  --frame-combobox-chip-radius: var(--frame-radius-full);
  --frame-combobox-chip-bg: var(--frame-primary);
  --frame-combobox-chip-color: var(--frame-primary-foreground);
  --frame-combobox-chip-font-size: 0.75rem;
  --frame-combobox-chip-font-weight: 600;
  --frame-combobox-chip-padding-block: 0.1875rem;
  --frame-combobox-chip-padding-inline: 0.625rem 0.25rem;
  --frame-combobox-chip-remove-size: 1rem;
  --frame-combobox-chip-remove-radius: var(--frame-radius-full);
  --frame-combobox-chip-remove-bg: color-mix(in srgb, currentColor 12%, transparent);
  --frame-combobox-chip-remove-hover-bg: color-mix(in srgb, currentColor 20%, transparent);
  --frame-combobox-chips-gap: 0.375rem;
  --frame-combobox-chips-padding: 0.375rem;
  --frame-combobox-chips-input-min-width: 8rem;
  --frame-combobox-chips-input-padding: 0.25rem;
  --frame-combobox-error-color: var(--frame-destructive);
  --frame-combobox-error-font-size: 0.8125rem;
  `,
};

