import { ComponentDoc } from '../../shared/models/component-doc.model';
import { DocsFieldPreviewComponent, FieldPreviewConfig } from './previews/field-preview';

const importsCode = `import { FrFieldModule } from '@frame-ui-ng/components/field';
import { FrInputModule } from '@frame-ui-ng/components/input';`;

const heroConfig: FieldPreviewConfig = {
  legend: 'Profile',
  description:
    'Use field primitives to keep labels, descriptions, controls, and errors aligned across a form.',
  items: [
    {
      label: 'Full name',
      description: 'This appears on invoices and shared workspace receipts.',
      controlKind: 'input',
      placeholder: 'Julia Voss',
    },
    {
      label: 'Team bio',
      description: 'A short summary helps teammates understand the project context.',
      controlKind: 'textarea',
      placeholder: 'Leading the rollout for shared release workflows.',
    },
  ],
};

const basicConfig: FieldPreviewConfig = {
  items: [
    {
      label: 'Workspace name',
      description: 'Visible in share links and the global workspace switcher.',
      placeholder: 'Northwind FrameUI',
    },
  ],
};

const invalidConfig: FieldPreviewConfig = {
  items: [
    {
      label: 'Summary',
      reactiveInvalidDemo: true,
      description: 'Include the release name and the audience that will see it.',
      errors: { message: 'A summary is required.' },
      placeholder: 'Spring campaign launch',
    },
  ],
};

const separatorConfig: FieldPreviewConfig = {
  legend: 'Contact preferences',
  separatorLabel: 'or',
  items: [
    {
      label: 'Primary email',
      description: 'Reach the release owner directly.',
      placeholder: 'owner@northwind.dev',
    },
    {
      label: 'Shared support inbox',
      description: 'Use a shared mailbox when coverage rotates between teammates.',
      placeholder: 'support@northwind.dev',
    },
  ],
};

const inspectorConfig: FieldPreviewConfig = {
  legend: 'Publication settings',
  description:
    'Inspect how field primitives distribute spacing and typography between labels, controls, and supporting text.',
  items: [
    {
      label: 'Announcement title',
      description: 'Shown in the notification center and the release feed.',
      errors: 'A title is required before publishing.',
      invalid: true,
      placeholder: 'Quarterly roadmap update',
      tokenPrefix: 'field',
    },
  ],
};

const customStylingConfig: FieldPreviewConfig = {
  legendVariant: 'label',
  style: `--frame-field-set-gap: 1.25rem;
--frame-field-group-gap: 1.25rem;
--frame-field-gap: 0.625rem;
--frame-field-content-gap: 0.5rem;
--frame-field-legend-color: color-mix(in srgb, var(--frame-primary) 38%, var(--frame-foreground));
--frame-field-label-color: color-mix(in srgb, var(--frame-primary) 22%, var(--frame-foreground));
--frame-field-description-color: color-mix(in srgb, var(--frame-primary) 28%, var(--frame-muted-foreground));
--frame-field-separator-color: color-mix(in srgb, var(--frame-primary) 36%, var(--frame-muted-foreground));`,
  items: [
    {
      label: 'Campaign owner',
      description: 'This preview applies softer field spacing and branded supporting colors.',
      placeholder: 'Julia Voss',
    },
  ],
};

export const FIELD_DOC: ComponentDoc = {
  slug: 'field',
  breadcrumb: 'Components / Field',

  hero: {
    id: 'field-hero',
    title: 'Preview',
    preview: {
      component: DocsFieldPreviewComponent,
      inputs: {
        config: heroConfig,
      },
    },
  },

  installation: {
    cli: {
      language: 'bash',
      code: 'npx your-cli add field',
    },
    manual: {
      steps: [
        {
          title: 'Import the field primitives you need for structure, labels, descriptions, and errors.',
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
      code: `<div frField>
  <label frFieldLabel for="workspace-name">Workspace name</label>

  <div frFieldContent>
    <input frInput id="workspace-name" />
    <p frFieldDescription>Visible in share links and the global workspace switcher.</p>
  </div>
</div>`,
    },
  ],

  tokenInspector: {
    id: 'token-inspector',
    title: 'Token inspector',
    description:
      'Hover the legend, field row, label, content stack, description, error area, or separator to inspect the spacing and typography tokens that shape the field layout.',
    preview: {
      component: DocsFieldPreviewComponent,
      containerClass: 'block',
      inputs: {
        config: inspectorConfig,
      },
      inspectorTargets: [
        {
          id: 'legend',
          label: 'Field legend',
          selector: '[data-token-target="field-legend"]',
          description:
            'Legends establish the section title and can optionally borrow the smaller label typography scale.',
          tokens: [
            '--frame-field-legend-color',
            '--frame-field-legend-font-size',
            '--frame-field-legend-font-weight',
            '--frame-field-set-gap',
          ],
        },
        {
          id: 'row',
          label: 'Field row',
          selector: '[data-token-target="field-field"]',
          description:
            'Row tokens control the vertical spacing between the label and the content stack plus invalid-state inheritance.',
          tokens: ['--frame-field-gap', '--frame-field-content-gap', '--frame-field-error-color'],
        },
        {
          id: 'label',
          label: 'Label',
          selector: '[data-token-target="field-label"]',
          description:
            'Labels define the primary type scale and inherit the error color when the field becomes invalid.',
          tokens: [
            '--frame-field-label-font-size',
            '--frame-field-label-font-weight',
            '--frame-field-label-color',
            '--frame-field-error-color',
          ],
        },
        {
          id: 'content',
          label: 'Content stack',
          selector: '[data-token-target="field-content"]',
          description:
            'The content stack spaces the control, description, and error messaging without pushing that responsibility into each individual control primitive.',
          tokens: ['--frame-field-content-gap', '--frame-field-gap'],
        },
        {
          id: 'description',
          label: 'Description text',
          selector: '[data-token-target="field-description"]',
          description:
            'Descriptions use a quieter color and smaller type scale to support the label without overpowering the control.',
          tokens: ['--frame-field-description-color', '--frame-field-description-font-size'],
        },
        {
          id: 'error',
          label: 'Error message',
          selector: '[data-token-target="field-error"]',
          description: 'Error tokens define the color and type scale for validation messaging.',
          tokens: ['--frame-field-error-color', '--frame-field-error-font-size'],
        },
      ],
    },
  },

  styling: {
    description:
      'Override field tokens on a local wrapper when a form section needs different spacing or more branded supporting typography without changing the structure.',
    preview: {
      id: 'custom-styling-preview',
      title: 'Custom Styling Preview',
      description:
        'This preview applies local token overrides to the set spacing and supporting typography colors.',
      preview: {
        component: DocsFieldPreviewComponent,
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
          code: `<div class="campaign-field">
  <fieldset frFieldSet>
    <legend frFieldLegend variant="label">Campaign settings</legend>

    <div frFieldGroup>
      <div frField>
        <label frFieldLabel for="campaign-owner">Campaign owner</label>

        <div frFieldContent>
          <input frInput id="campaign-owner" />
          <p frFieldDescription>
            This preview applies softer field spacing and branded supporting colors.
          </p>
        </div>
      </div>
    </div>
  </fieldset>
</div>`,
        },
        {
          language: 'css',
          code: `.campaign-field {
${customStylingConfig.style}
}`,
        },
      ],
    },
  },

  examples: [
    {
      id: 'basic',
      title: 'Basic field',
      description:
        'Use the default field layout when labels, supporting text, and controls should stack naturally in a narrow form column.',
      preview: {
        component: DocsFieldPreviewComponent,
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
          code: `<div frField>
  <label frFieldLabel for="workspace-name">Workspace name</label>

  <div frFieldContent>
    <input frInput id="workspace-name" />
    <p frFieldDescription>Visible in share links and the global workspace switcher.</p>
  </div>
</div>`,
        },
      ],
    },
    {
      id: 'invalid',
      title: 'Invalid field',
      description:
        'Invalid fields can react to Angular validation state and surface a single validation message below the control.',
      preview: {
        component: DocsFieldPreviewComponent,
        inputs: {
          config: invalidConfig,
        },
      },
      code: [
        {
          language: 'ts',
          code: `import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { FrFieldModule } from '@frame-ui-ng/components/field';
import { FrInputModule } from '@frame-ui-ng/components/input';

summaryControl = new FormControl('Spring campaign launch', {
  validators: [Validators.required],
  nonNullable: true,
});
`,
        },
        {
          language: 'html',
          code: `<div frField [invalid]="summaryControl.invalid && (summaryControl.touched || summaryControl.dirty)">
  <label frFieldLabel for="summary">Summary</label>

  <div frFieldContent>
    <input frInput id="summary" [formControl]="summaryControl" />
    <p frFieldDescription>Include the release name and the audience that will see it.</p>
    @if (summaryControl.invalid && (summaryControl.touched || summaryControl.dirty)) {
      <p frFieldError [errors]="{ message: 'A summary is required.' }"></p>
    }
  </div>
</div>`,
        },
      ],
    },
    {
      id: 'separator',
      title: 'Field groups and separators',
      description:
        'Combine field groups, legends, and separators when a form section offers multiple equivalent inputs or needs stronger sub-section boundaries.',
      preview: {
        component: DocsFieldPreviewComponent,
        inputs: {
          config: separatorConfig,
        },
      },
      code: [
        {
          language: 'ts',
          code: importsCode,
        },
        {
          language: 'html',
          code: `<fieldset frFieldSet>
  <legend frFieldLegend>Contact preferences</legend>

  <div frFieldGroup>
    <div frField>
      <label frFieldLabel for="primary-email">Primary email</label>
      <div frFieldContent>
        <input frInput id="primary-email" type="email" />
        <p frFieldDescription>Reach the release owner directly.</p>
      </div>
    </div>

    <div frFieldSeparator>or</div>

    <div frField>
      <label frFieldLabel for="support-inbox">Shared support inbox</label>
      <div frFieldContent>
        <input frInput id="support-inbox" type="email" />
        <p frFieldDescription>Use a shared mailbox when coverage rotates between teammates.</p>
      </div>
    </div>
  </div>
</fieldset>`,
        },
      ],
    },
  ],

  tokensTitle: 'Design Tokens',
  tokensDescription:
    'Use these CSS custom properties to tune field spacing, legend and label typography, descriptions, errors, and separator styling without changing the field structure.',
  tokens: `
  --frame-field-set-gap: 1.5rem;
  --frame-field-group-gap: 1rem;
  --frame-field-gap: 0.5rem;
  --frame-field-content-gap: 0.375rem;
  --frame-field-legend-color: var(--frame-foreground);
  --frame-field-legend-font-size: 1rem;
  --frame-field-legend-font-weight: 700;
  --frame-field-label-font-size: 0.875rem;
  --frame-field-label-font-weight: 600;
  --frame-field-label-color: var(--frame-foreground);
  --frame-field-description-color: var(--frame-muted-foreground);
  --frame-field-description-font-size: 0.8125rem;
  --frame-field-error-color: var(--frame-destructive);
  --frame-field-error-font-size: 0.8125rem;
  --frame-field-separator-gap: 0.75rem;
  --frame-field-separator-color: var(--frame-muted-foreground);
  --frame-field-separator-bg: var(--frame-border);
  --frame-field-separator-font-size: 0.75rem;
  `,
};

