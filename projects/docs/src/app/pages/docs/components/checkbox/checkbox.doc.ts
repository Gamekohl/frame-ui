import { ComponentDoc } from '../../shared/models/component-doc.model';
import { CheckboxPreviewConfig, DocsCheckboxPreviewComponent } from './previews/checkbox-preview';

const checkboxImportsCode = `import { FrCheckboxModule } from '@frame-ui-ng/components/checkbox';`;

const heroConfig: CheckboxPreviewConfig = {
  items: [
    { label: 'Enable release notifications', checked: true },
    { label: 'Include beta features', indeterminate: true },
    { label: 'Require approval before merge', disabled: true },
  ],
};

const basicConfig: CheckboxPreviewConfig = {
  items: [{ label: 'Accept terms and conditions' }],
};

const checkedConfig: CheckboxPreviewConfig = {
  items: [
    { label: 'Email updates', checked: true },
    { label: 'SMS alerts', checked: false },
  ],
};

const indeterminateConfig: CheckboxPreviewConfig = {
  items: [
    { label: 'Select project permissions', indeterminate: true },
  ],
};

const disabledConfig: CheckboxPreviewConfig = {
  items: [
    { label: 'Locked until verification is complete', disabled: true },
    { label: 'Previously selected option', checked: true, disabled: true },
  ],
};

const invalidConfig: CheckboxPreviewConfig = {
  style: `--frame-checkbox-root-invalid-border: var(--frame-destructive);
--frame-checkbox-label-color: color-mix(in srgb, var(--frame-destructive) 32%, var(--frame-foreground));`,
  items: [
    { label: 'Accept security policy before continuing', invalid: true },
  ],
};

const inspectorConfig: CheckboxPreviewConfig = {
  items: [
    {
      label: 'Allow workspace members to publish changes',
      checked: true,
      tokenPrefix: 'checked',
    },
    {
      label: 'Inherited from organization policy',
      tokenPrefix: 'mixed',
    },
  ],
};

const customStylingConfig: CheckboxPreviewConfig = {
  style: `--frame-checkbox-root-size: 1.125rem;
--frame-checkbox-root-radius: 0.375rem;
--frame-checkbox-root-border: color-mix(in srgb, var(--frame-primary) 24%, var(--frame-border));
--frame-checkbox-root-hover-border: color-mix(in srgb, var(--frame-primary) 50%, var(--frame-border));
--frame-checkbox-root-checked-bg: green;
--frame-checkbox-root-checked-border: darkgreen;
--frame-checkbox-indicator-size: 0.5625rem;
--frame-checkbox-field-gap: 0.875rem;
--frame-checkbox-label-color: color-mix(in srgb, var(--frame-primary) 28%, var(--frame-foreground));`,
  items: [
    { label: 'Use compact approval flow', checked: true },
    { label: 'Send rollout summary to Slack', indeterminate: true },
  ],
};

export const CHECKBOX_DOC: ComponentDoc = {
  slug: 'checkbox',
  breadcrumb: 'Components / Checkbox',

  hero: {
    id: 'checkbox-hero',
    title: 'Preview',
    preview: {
      component: DocsCheckboxPreviewComponent,
      inputs: {
        config: heroConfig,
      },
    },
  },

  installation: {
    cli: {
      language: 'bash',
      code: 'npx your-cli add checkbox',
    },
    manual: {
      steps: [
        {
          title: 'Import the checkbox primitives for the input, field wrapper, and label.',
          code: {
            language: 'ts',
            code: checkboxImportsCode,
          },
        },
      ],
    },
  },

  usage: [
    {
      language: 'ts',
      code: checkboxImportsCode,
    },
    {
      language: 'html',
      code: `<label frCheckboxField>
  <input frCheckbox type="checkbox" />
  <span frCheckboxLabel>Accept terms and conditions</span>
</label>`,
    },
  ],

  tokenInspector: {
    id: 'token-inspector',
    title: 'Token inspector',
    description:
      'Hover the field wrapper, checkbox box, or label to inspect the tokens that control sizing, checked states, label spacing, and invalid treatment. Click a region to pin the inspector while you review the current values.',
    preview: {
      component: DocsCheckboxPreviewComponent,
      containerClass: 'block',
      inputs: {
        config: inspectorConfig,
      },
      inspectorTargets: [
        {
          id: 'field',
          label: 'Checkbox field',
          selector: '[data-token-target="checked-field"]',
          description:
            'The field wrapper is responsible for layout spacing between the control and its label, and it also inherits the label color contract.',
          tokens: ['--frame-checkbox-field-gap', '--frame-checkbox-label-color', '--frame-checkbox-label-disabled-color'],
        },
        {
          id: 'box',
          label: 'Checkbox box',
          selector: '[data-token-target="checked-box"]',
          description:
            'The checkbox box tokens control its size, border, radius, checked fill, focus ring, and invalid border treatment.',
          tokens: [
            '--frame-checkbox-root-size',
            '--frame-checkbox-root-bg',
            '--frame-checkbox-root-border',
            '--frame-checkbox-root-radius',
            '--frame-checkbox-root-hover-bg',
            '--frame-checkbox-root-hover-border',
            '--frame-checkbox-root-checked-bg',
            '--frame-checkbox-root-checked-border',
            '--frame-checkbox-root-checked-color',
            '--frame-checkbox-root-ring-color',
            '--frame-checkbox-root-focus-shadow',
            '--frame-checkbox-root-invalid-border',
            '--frame-checkbox-root-disabled-opacity',
          ],
        },
        {
          id: 'indicator',
          label: 'Indicator shape',
          selector: '[data-token-target="mixed-box"]',
          description:
            'Indicator sizing for both the checkmark and indeterminate bar comes from the indicator and indeterminate dimension tokens.',
          tokens: ['--frame-checkbox-indicator-size', '--frame-checkbox-indeterminate-width', '--frame-checkbox-indeterminate-height'],
        },
        {
          id: 'label',
          label: 'Checkbox label',
          selector: '[data-token-target="checked-label"]',
          description:
            'Labels follow the checkbox field spacing and color tokens while keeping typography intentionally simple and native.',
          tokens: ['--frame-checkbox-label-color', '--frame-checkbox-label-disabled-color'],
        },
      ],
    },
  },

  styling: {
    description:
      'Customize the checkbox by scoping token overrides to a wrapper or form section. This keeps the checkbox semantics intact while letting you adjust size, spacing, and checked treatment locally.',
    preview: {
      id: 'custom-styling-preview',
      title: 'Custom Styling Preview',
      description:
        'This preview applies local token overrides to adjust the checkbox size, border treatment, indicator scale, and label spacing.',
      preview: {
        component: DocsCheckboxPreviewComponent,
        inputs: {
          config: customStylingConfig,
        },
      },
      code: [
        {
          language: 'ts',
          code: checkboxImportsCode,
        },
        {
          language: 'html',
          code: `<div class="approval-checkboxes">
  <label frCheckboxField>
    <input frCheckbox type="checkbox" checked />
    <span frCheckboxLabel>Use compact approval flow</span>
  </label>

  <label frCheckboxField>
    <input frCheckbox type="checkbox" [indeterminate]="true" />
    <span frCheckboxLabel>Send rollout summary to Slack</span>
  </label>
</div>`,
        },
        {
          language: 'css',
          code: `.approval-checkboxes {
${customStylingConfig.style}
}`,
        },
      ],
    },
  },

  examples: [
    {
      id: 'basic',
      title: 'Basic',
      description: 'Use a checkbox for independent yes/no choices that can be toggled without affecting sibling options.',
      preview: {
        component: DocsCheckboxPreviewComponent,
        inputs: {
          config: basicConfig,
        },
      },
      code: [
        {
          language: 'ts',
          code: checkboxImportsCode,
        },
        {
          language: 'html',
          code: `<label frCheckboxField>
  <input frCheckbox type="checkbox" />
  <span frCheckboxLabel>Accept terms and conditions</span>
</label>`,
        },
      ],
    },
    {
      id: 'checked',
      title: 'Checked and unchecked',
      description: 'Use checked state to reflect persisted preferences or current selections directly from your native form model.',
      preview: {
        component: DocsCheckboxPreviewComponent,
        inputs: {
          config: checkedConfig,
        },
      },
      code: [
        {
          language: 'ts',
          code: checkboxImportsCode,
        },
        {
          language: 'html',
          code: `<label frCheckboxField>
  <input frCheckbox type="checkbox" checked />
  <span frCheckboxLabel>Email updates</span>
</label>

<label frCheckboxField>
  <input frCheckbox type="checkbox" />
  <span frCheckboxLabel>SMS alerts</span>
</label>`,
        },
      ],
    },
    {
      id: 'indeterminate',
      title: 'Indeterminate',
      description: 'Use the indeterminate state for partial selection, inherited settings, or parent rows in hierarchical checklists.',
      preview: {
        component: DocsCheckboxPreviewComponent,
        inputs: {
          config: indeterminateConfig,
        },
      },
      code: [
        {
          language: 'ts',
          code: checkboxImportsCode,
        },
        {
          language: 'html',
          code: `<label frCheckboxField>
  <input frCheckbox type="checkbox" [indeterminate]="true" />
  <span frCheckboxLabel>Select project permissions</span>
</label>`,
        },
      ],
    },
    {
      id: 'disabled',
      title: 'Disabled',
      description: 'Disable a checkbox when a policy or upstream dependency temporarily prevents changes while still showing the current state.',
      preview: {
        component: DocsCheckboxPreviewComponent,
        inputs: {
          config: disabledConfig,
        },
      },
      code: [
        {
          language: 'ts',
          code: checkboxImportsCode,
        },
        {
          language: 'html',
          code: `<label frCheckboxField>
  <input frCheckbox type="checkbox" disabled />
  <span frCheckboxLabel>Locked until verification is complete</span>
</label>

<label frCheckboxField>
  <input frCheckbox type="checkbox" checked disabled />
  <span frCheckboxLabel>Previously selected option</span>
</label>`,
        },
      ],
    },
    {
      id: 'invalid',
      title: 'Invalid',
      description: 'Use the native invalid hook when a required checkbox needs attention before form submission can continue.',
      preview: {
        component: DocsCheckboxPreviewComponent,
        inputs: {
          config: invalidConfig,
        },
      },
      code: [
        {
          language: 'ts',
          code: checkboxImportsCode,
        },
        {
          language: 'html',
          code: `<label frCheckboxField>
  <input frCheckbox type="checkbox" aria-invalid="true" />
  <span frCheckboxLabel>Accept security policy before continuing</span>
</label>`,
        },
      ],
    },
  ],

  tokensTitle: 'Design Tokens',
  tokensDescription:
    'Use these CSS custom properties to tune checkbox size, checked-state surfaces, focus treatment, field spacing, and label colors without changing the native input structure.',
  tokens: `
  --frame-checkbox-root-size: 1rem;
  --frame-checkbox-root-bg: var(--frame-surface);
  --frame-checkbox-root-border: var(--frame-border);
  --frame-checkbox-root-color: var(--frame-primary-foreground);
  --frame-checkbox-root-radius: var(--frame-radius-sm);
  --frame-checkbox-root-hover-bg: var(--frame-checkbox-root-bg);
  --frame-checkbox-root-hover-border: color-mix(in srgb, var(--frame-border) 80%, var(--frame-foreground));
  --frame-checkbox-root-checked-bg: var(--frame-primary);
  --frame-checkbox-root-checked-border: var(--frame-primary);
  --frame-checkbox-root-checked-color: var(--frame-primary-foreground);
  --frame-checkbox-root-ring-color: var(--frame-ring);
  --frame-checkbox-root-focus-shadow: 0 0 0 3px color-mix(in srgb, var(--frame-checkbox-root-ring-color) 35%, transparent);
  --frame-checkbox-root-disabled-opacity: 0.55;
  --frame-checkbox-root-invalid-border: color-mix(in srgb, var(--frame-primary) 45%, var(--frame-border));
  --frame-checkbox-indicator-size: 0.5rem;
  --frame-checkbox-indeterminate-width: 0.5rem;
  --frame-checkbox-indeterminate-height: 0.125rem;
  --frame-checkbox-field-gap: 0.75rem;
  --frame-checkbox-label-color: var(--frame-foreground);
  --frame-checkbox-label-disabled-color: var(--frame-muted-foreground);
  `,
};

