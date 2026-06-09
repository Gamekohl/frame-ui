import { ComponentDoc } from '../../shared/models/component-doc.model';
import { DocsSelectPreviewComponent, SelectPreviewConfig } from './previews/select-preview';

const importsCode = `import { FrSelectModule } from '@frame-ui-ng/components/select';`;
const formImportsCode = `import { FormControl, ReactiveFormsModule } from '@angular/forms';
${importsCode}`;

const frameworkGroups = [
  {
    label: 'Frontend',
    items: [
      {
        value: 'angular',
        label: 'Angular',
        description: 'Signals, SSR, and typed tooling for large apps.',
        icon: 'tablerRocket',
      },
      {
        value: 'react',
        label: 'React',
        description: 'Flexible rendering model for product surfaces.',
        icon: 'tablerDevices',
      },
      {
        value: 'vue',
        label: 'Vue',
        description: 'Single-file components with progressive adoption.',
        icon: 'tablerLeaf',
      },
    ],
  },
  {
    label: 'Content',
    items: [
      {
        value: 'marketing',
        label: 'Marketing site',
        description: 'Docs, campaigns, and public launch pages.',
        icon: 'tablerWorld',
      },
      {
        value: 'FrameUI',
        label: 'FrameUI',
        description: 'Tokens, primitives, and shared UI governance.',
        icon: 'tablerPalette',
      },
    ],
  },
];

const heroConfig: SelectPreviewConfig = {
  placeholder: 'Choose a workspace surface',
  initialValue: 'angular',
  indicatorPosition: 'end',
  groups: frameworkGroups,
};

const basicConfig: SelectPreviewConfig = {
  placeholder: 'Choose a framework',
  initialValue: 'angular',
  indicatorPosition: 'end',
  groups: [
    {
      items: [
        { value: 'angular', label: 'Angular', icon: 'tablerRocket' },
        { value: 'react', label: 'React', icon: 'tablerDevices' },
        { value: 'vue', label: 'Vue', icon: 'tablerLeaf' },
      ],
    },
  ],
};

const groupedConfig: SelectPreviewConfig = {
  placeholder: 'Choose a surface',
  initialValue: 'marketing',
  groups: frameworkGroups,
};

const invalidConfig: SelectPreviewConfig = {
  placeholder: 'Choose a release channel',
  initialValue: null,
  reactiveInvalidDemo: true,
  invalidMessage: 'A release channel is required.',
  groups: [
    {
      items: [
        { value: 'alpha', label: 'Alpha', icon: 'tablerRocket' },
        { value: 'beta', label: 'Beta', icon: 'tablerCircleCheck' },
        { value: 'stable', label: 'Stable', icon: 'tablerCheck' },
      ],
    },
  ],
};

const disabledConfig: SelectPreviewConfig = {
  placeholder: 'Choose a template',
  initialValue: 'brief',
  disabled: true,
  groups: [
    {
      items: [
        { value: 'brief', label: 'Project brief', icon: 'tablerFileDescription' },
        { value: 'roadmap', label: 'Roadmap', icon: 'tablerArrowRight' },
      ],
    },
  ],
};

const inspectorConfig: SelectPreviewConfig = {
  placeholder: 'Choose a template',
  initialValue: 'brief',
  indicatorPosition: 'end',
  staticPanel: true,
  tokenPrefix: 'select',
  groups: [
    {
      label: 'Templates',
      items: [
        {
          value: 'brief',
          label: 'Project brief',
          description: 'Narrative overview for product and launch work.',
          icon: 'tablerFileDescription',
          indicatorIcon: 'tablerCheck',
        },
        {
          value: 'roadmap',
          label: 'Roadmap',
          description: 'Milestones, sequencing, and delivery scope.',
          icon: 'tablerArrowRight',
          indicatorIcon: 'tablerCheck',
        },
      ],
    },
  ],
};

const customStylingConfig: SelectPreviewConfig = {
  style: `--frame-select-trigger-radius: 1rem;
--frame-select-trigger-height: 2.75rem;
--frame-select-trigger-border: color-mix(in srgb, var(--frame-primary) 26%, var(--frame-border));
--frame-select-trigger-focus-shadow: 0 0 0 3px color-mix(in srgb, var(--frame-primary) 18%, transparent);
--frame-select-content-popper-shadow: 0 18px 40px -22px rgb(0 0 0 / 0.34);
--frame-select-group-gap: 0.25rem;
--frame-select-item-indicator-offset: 0.75rem;`,
  placeholder: 'Choose a campaign type',
  initialValue: 'launch',
  indicatorPosition: 'end',
  staticPanel: true,
  groups: [
    {
      items: [
        { value: 'launch', label: 'Launch', icon: 'tablerRocket' },
        { value: 'docs', label: 'Documentation', icon: 'tablerFileDescription' },
        { value: 'brand', label: 'Brand refresh', icon: 'tablerPalette' },
      ],
    },
  ],
};

export const SELECT_DOC: ComponentDoc = {
  slug: 'select',
  breadcrumb: 'Components / Select',

  hero: {
    id: 'select-hero',
    title: 'Preview',
    preview: {
      component: DocsSelectPreviewComponent,
      inputs: {
        config: heroConfig,
      },
    },
  },

  installation: {
    cli: {
      language: 'bash',
      code: 'npx your-cli add select',
    },
    manual: {
      steps: [
        {
          title: 'Import the trigger, content, and item primitives you need for the select composition.',
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
      code: `import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FrSelectModule } from '@frame-ui-ng/components/select';

frameworkControl = new FormControl<string | null>('angular');`,
    },
    {
      language: 'html',
      code: `<button [frSelect]="frameworkMenu" [formControl]="frameworkControl" indicatorPosition="end" type="button">
  <frame-select-value placeholder="Choose a framework"></frame-select-value>
  <span frSelectIcon>
    <ng-icon name="tablerChevronDown" size="16" />
  </span>
</button>

<ng-template #frameworkMenu="frSelectContent" frSelectContent>
  <frame-select-panel>
    <frame-select-group>
      <button frSelectItem value="angular" label="Angular">
        <span>Angular</span>
      </button>
      <button frSelectItem value="react" label="React">
        <span>React</span>
      </button>
    </frame-select-group>
  </frame-select-panel>
</ng-template>`,
    },
  ],

  tokenInspector: {
    id: 'token-inspector',
    title: 'Token inspector',
    description:
      'Inspect the trigger, selected value, icon, panel, labels, items, indicator, separator, and error text with the menu kept open for easier comparison.',
    preview: {
      component: DocsSelectPreviewComponent,
      containerClass: 'block',
      inputs: {
        config: inspectorConfig,
      },
      inspectorTargets: [
        {
          id: 'trigger',
          label: 'Trigger shell',
          selector: '[data-token-target="select-trigger"]',
          description: 'Trigger tokens define height, spacing, border, focus treatment, invalid state, and disabled opacity.',
          tokens: [
            '--frame-select-trigger-height',
            '--frame-select-trigger-min-width',
            '--frame-select-trigger-gap',
            '--frame-select-trigger-radius',
            '--frame-select-trigger-padding-inline',
            '--frame-select-trigger-font-size',
            '--frame-select-trigger-font-weight',
            '--frame-select-trigger-focus-shadow',
            '--frame-select-trigger-invalid-border',
            '--frame-select-trigger-invalid-shadow',
            '--frame-select-trigger-disabled-opacity',
            '--frame-select-trigger-transition-duration',
          ],
        },
        {
          id: 'value',
          label: 'Selected value',
          selector: '[data-token-target="select-value"]',
          description: 'The selected value inherits trigger typography and uses placeholder styling when no value is selected.',
          tokens: ['--frame-select-trigger-font-size', '--frame-select-trigger-font-weight'],
        },
        {
          id: 'icon',
          label: 'Trigger icon',
          selector: '[data-token-target="select-icon"]',
          description: 'The trailing icon inherits muted foreground styling and rotates when the panel opens.',
          tokens: ['--frame-select-trigger-gap'],
        },
        {
          id: 'panel',
          label: 'Panel',
          selector: '[data-token-target="select-panel"]',
          description: 'Panel tokens control the minimum width, maximum height, and popper shadow behavior.',
          tokens: [
            '--frame-select-content-min-width',
            '--frame-select-content-max-height',
            '--frame-select-content-popper-shadow',
          ],
        },
        {
          id: 'group',
          label: 'Group stack',
          selector: '[data-token-target="select-group"]',
          description: 'Group tokens define the spacing rhythm between grouped select items.',
          tokens: ['--frame-select-group-gap'],
        },
        {
          id: 'label',
          label: 'Group label',
          selector: '[data-token-target="select-label"]',
          description: 'Labels inherit the dropdown label treatment and work as structural headings inside the panel.',
          tokens: ['--frame-select-group-gap'],
        },
        {
          id: 'item',
          label: 'Select item',
          selector: '[data-token-target="select-item"]',
          description: 'Item tokens define padding and reserve space for the built-in or custom selection indicator.',
          tokens: [
            '--frame-select-item-padding-start',
            '--frame-select-item-padding-end',
            '--frame-select-item-padding-inline',
            '--frame-select-item-indicator-offset',
          ],
        },
        {
          id: 'indicator',
          label: 'Selection indicator',
          selector: '[data-token-target="select-indicator"]',
          description: 'Indicator tokens size and position the selection checkmark or custom icon within each item.',
          tokens: [
            '--frame-select-item-indicator-size',
            '--frame-select-item-indicator-offset',
            '--frame-select-item-indicator-font-size',
          ],
        },
        {
          id: 'separator',
          label: 'Separator',
          selector: '[data-token-target="select-separator"]',
          description: 'Separators inherit the dropdown menu surface and divide adjacent select groups.',
          tokens: ['--frame-select-group-gap'],
        },
        {
          id: 'error',
          label: 'Error text',
          selector: '[data-token-target="select-error"]',
          description: 'Error tokens define the color and type scale for validation messaging below the trigger.',
          tokens: ['--frame-select-error-color', '--frame-select-error-font-size'],
        },
      ],
    },
  },

  styling: {
    description:
      'Override select tokens on a local wrapper when a section needs a different trigger radius, a deeper panel shadow, or adjusted item spacing without changing the select composition.',
    preview: {
      id: 'custom-styling-preview',
      title: 'Custom Styling Preview',
      description:
        'This preview applies local overrides to the trigger radius, focus ring, panel shadow, and item spacing.',
      preview: {
        component: DocsSelectPreviewComponent,
        inputs: {
          config: customStylingConfig,
        },
      },
      code: [
        {
          language: 'ts',
          code: `${formImportsCode}

campaignControl = new FormControl<string | null>('launch');`,
        },
        {
          language: 'html',
          code: `<div class="campaign-select">
  <button [frSelect]="campaignMenu" [formControl]="campaignControl" indicatorPosition="end" [debugVisible]="true" type="button">
    <frame-select-value placeholder="Choose a campaign type"></frame-select-value>
    <span frSelectIcon>
      <ng-icon name="tablerChevronDown" size="16" />
    </span>
  </button>

  <ng-template #campaignMenu="frSelectContent" frSelectContent>
    <frame-select-panel>
      <frame-select-group>
        <button frSelectItem value="launch" label="Launch">
          <span>Launch</span>
        </button>
        <button frSelectItem value="docs" label="Documentation">
          <span>Documentation</span>
        </button>
      </frame-select-group>
    </frame-select-panel>
  </ng-template>
</div>`,
        },
        {
          language: 'css',
          code: `.campaign-select {
${customStylingConfig.style}
}`,
        },
      ],
    },
  },

  examples: [
    {
      id: 'basic',
      title: 'Basic select',
      description: 'Use a trigger, placeholder, and a small item list when the selected value should always be one choice from a fixed set.',
      preview: {
        component: DocsSelectPreviewComponent,
        inputs: {
          config: basicConfig,
        },
      },
      code: [
        {
          language: 'ts',
          code: `${formImportsCode}

frameworkControl = new FormControl<string | null>('angular');`,
        },
        {
          language: 'html',
          code: `<button [frSelect]="frameworkMenu" [formControl]="frameworkControl" indicatorPosition="end" type="button">
  <frame-select-value placeholder="Choose a framework"></frame-select-value>
  <span frSelectIcon>
    <ng-icon name="tablerChevronDown" size="16" />
  </span>
</button>

<ng-template #frameworkMenu="frSelectContent" frSelectContent>
  <frame-select-panel>
    <frame-select-group>
      <button frSelectItem value="angular" label="Angular">
        <span>Angular</span>
      </button>
      <button frSelectItem value="react" label="React">
        <span>React</span>
      </button>
      <button frSelectItem value="vue" label="Vue">
        <span>Vue</span>
      </button>
    </frame-select-group>
  </frame-select-panel>
</ng-template>`,
        },
      ],
    },
    {
      id: 'grouped',
      title: 'Grouped items',
      description: 'Use labels and separators when the option list has meaningful categories that help people scan faster.',
      preview: {
        component: DocsSelectPreviewComponent,
        inputs: {
          config: groupedConfig,
        },
      },
      code: [
        {
          language: 'ts',
          code: `${formImportsCode}

surfaceControl = new FormControl<string | null>('marketing');`,
        },
        {
          language: 'html',
          code: `<button [frSelect]="surfaceMenu" [formControl]="surfaceControl" type="button">
  <frame-select-value placeholder="Choose a surface"></frame-select-value>
  <span frSelectIcon>
    <ng-icon name="tablerChevronDown" size="16" />
  </span>
</button>

<ng-template #surfaceMenu="frSelectContent" frSelectContent>
  <frame-select-panel>
    <frame-select-group>
      <div frSelectLabel>Frontend</div>
      <button frSelectItem value="angular" label="Angular">
        <span>Angular</span>
      </button>
      <button frSelectItem value="react" label="React">
        <span>React</span>
      </button>
    </frame-select-group>

    <div frSelectSeparator></div>

    <frame-select-group>
      <div frSelectLabel>Content</div>
      <button frSelectItem value="marketing" label="Marketing site">
        <span>Marketing site</span>
      </button>
    </frame-select-group>
  </frame-select-panel>
</ng-template>`,
        },
      ],
    },
    {
      id: 'invalid',
      title: 'Invalid with reactive forms',
      description: 'Reactive forms can drive the invalid state directly, so the trigger styling and error text stay synchronized with Angular validation.',
      preview: {
        component: DocsSelectPreviewComponent,
        inputs: {
          config: invalidConfig,
        },
      },
      code: [
        {
          language: 'ts',
          code: `import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { FrSelectModule } from '@frame-ui-ng/components/select';

channelControl = new FormControl<string | null>(null, {
  validators: [Validators.required],
});`,
        },
        {
          language: 'html',
          code: `<button
  [frSelect]="channelMenu"
  [formControl]="channelControl"
  [invalid]="channelControl.invalid && (channelControl.touched || channelControl.dirty)"
  type="button"
>
  <frame-select-value placeholder="Choose a release channel"></frame-select-value>
  <span frSelectIcon>
    <ng-icon name="tablerChevronDown" size="16" />
  </span>
</button>

@if (channelControl.invalid && (channelControl.touched || channelControl.dirty)) {
  <p frSelectError>A release channel is required.</p>
}

<ng-template #channelMenu="frSelectContent" frSelectContent>
  <frame-select-panel>
    <frame-select-group>
      <button frSelectItem value="alpha" label="Alpha">Alpha</button>
      <button frSelectItem value="beta" label="Beta">Beta</button>
      <button frSelectItem value="stable" label="Stable">Stable</button>
    </frame-select-group>
  </frame-select-panel>
</ng-template>`,
        },
      ],
    },
    {
      id: 'disabled',
      title: 'Disabled state',
      description: 'Disabled triggers preserve the same composition while preventing interaction and dimming the entire control.',
      preview: {
        component: DocsSelectPreviewComponent,
        inputs: {
          config: disabledConfig,
        },
      },
      code: [
        {
          language: 'ts',
          code: `${formImportsCode}

templateControl = new FormControl<string | null>({ value: 'brief', disabled: true });`,
        },
        {
          language: 'html',
          code: `<button [frSelect]="templateMenu" [formControl]="templateControl" type="button">
  <frame-select-value placeholder="Choose a template"></frame-select-value>
  <span frSelectIcon>
    <ng-icon name="tablerChevronDown" size="16" />
  </span>
</button>

<ng-template #templateMenu="frSelectContent" frSelectContent>
  <frame-select-panel>
    <frame-select-group>
      <button frSelectItem value="brief" label="Project brief">Project brief</button>
      <button frSelectItem value="roadmap" label="Roadmap">Roadmap</button>
    </frame-select-group>
  </frame-select-panel>
</ng-template>`,
        },
      ],
    },
  ],

  tokensTitle: 'Design Tokens',
  tokensDescription:
    'Use these CSS custom properties to tune trigger sizing, panel behavior, grouped item spacing, indicator placement, and validation feedback without changing the select composition.',
  tokens: `
  --frame-select-trigger-height: 2.5rem;
  --frame-select-trigger-min-width: 12rem;
  --frame-select-trigger-gap: 0.5rem;
  --frame-select-trigger-radius: var(--frame-radius-md);
  --frame-select-trigger-padding-inline: 1rem;
  --frame-select-trigger-font-size: 0.875rem;
  --frame-select-trigger-font-weight: 600;
  --frame-select-trigger-focus-shadow: 0 0 0 3px color-mix(in srgb, var(--frame-ring) 28%, transparent);
  --frame-select-trigger-invalid-border: color-mix(in srgb, var(--frame-destructive) 65%, var(--frame-border));
  --frame-select-trigger-invalid-shadow: 0 0 0 3px color-mix(in srgb, var(--frame-destructive) 14%, transparent);
  --frame-select-trigger-disabled-opacity: 0.55;
  --frame-select-trigger-hover-filter: brightness(0.98);
  --frame-select-trigger-active-filter: brightness(0.96);
  --frame-select-trigger-transition-duration: 150ms;
  --frame-select-content-min-width: 12rem;
  --frame-select-content-max-height: min(18rem, 50vh);
  --frame-select-content-popper-shadow: 0 16px 32px -18px rgb(0 0 0 / 0.28);
  --frame-select-group-gap: 0.125rem;
  --frame-select-item-indicator-size: 1rem;
  --frame-select-item-indicator-offset: 0.625rem;
  --frame-select-item-padding-start: 2rem;
  --frame-select-item-padding-end: 2rem;
  --frame-select-item-padding-inline: 0.75rem;
  --frame-select-item-indicator-font-size: 0.875rem;
  --frame-select-error-color: var(--frame-destructive);
  --frame-select-error-font-size: 0.8125rem;
  `,
};

