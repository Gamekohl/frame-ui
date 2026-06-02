import { ComponentDoc } from '../../shared/models/component-doc.model';
import { DocsRadioGroupPreviewComponent } from './previews/radio-group-preview';

const importsCode = `import { FrFieldModule } from '@frame-ui/components/field';
import { FrRadioGroupModule } from '@frame-ui/components/radio-group';`;

const usageHtml = `<div frRadioGroup aria-label="Notification channel">
  <label frRadioGroupField>
    <input frRadioGroupItem type="radio" name="channel" value="email" checked />
    <span frFieldLabel>Email</span>
  </label>

  <label frRadioGroupField>
    <input frRadioGroupItem type="radio" name="channel" value="slack" />
    <span frFieldLabel>Slack</span>
  </label>
</div>`;

const descriptionsHtml = `<div frRadioGroup aria-label="Review cadence">
  <label frRadioGroupField>
    <input frRadioGroupItem type="radio" name="cadence" value="daily" />
    <span frFieldContent>
      <span frFieldLabel>Daily review</span>
      <span frFieldDescription>Check activity every morning before standup.</span>
    </span>
  </label>

  <label frRadioGroupField>
    <input frRadioGroupItem type="radio" name="cadence" value="weekly" checked />
    <span frFieldContent>
      <span frFieldLabel>Weekly review</span>
      <span frFieldDescription>Bundle updates into one predictable team pass.</span>
    </span>
  </label>
</div>`;

const cardsHtml = `<div frRadioGroup variant="cards" aria-label="Workspace plan">
  <label frRadioGroupCard>
    <input frRadioGroupItem type="radio" name="plan" value="starter" />
    <span frFieldContent>
      <span frFieldLabel>Starter</span>
      <span frFieldDescription>For pilots and internal tooling.</span>
    </span>
    <span frRadioGroupCardMeta>Free</span>
  </label>

  <label frRadioGroupCard>
    <input frRadioGroupItem type="radio" name="plan" value="team" checked />
    <span frFieldContent>
      <span frFieldLabel>Team</span>
      <span frFieldDescription>For shared workspaces and release reviews.</span>
    </span>
    <span frRadioGroupCardMeta>$24</span>
  </label>
</div>`;

const fieldsetHtml = `<fieldset frFieldSet>
  <legend frFieldLegend>Export schedule</legend>
  <p frFieldDescription>Choose when reports should be generated for your workspace.</p>

  <div frRadioGroup aria-label="Export schedule">
    <label frRadioGroupField>
      <input frRadioGroupItem type="radio" name="schedule" value="daily" />
      <span frFieldLabel>Daily at 08:00</span>
    </label>

    <label frRadioGroupField>
      <input frRadioGroupItem type="radio" name="schedule" value="weekly" checked />
      <span frFieldLabel>Weekly on Monday</span>
    </label>
  </div>
</fieldset>`;

const invalidTs = `import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
${importsCode}

ownerControl = new FormControl('', {
  nonNullable: true,
  validators: [Validators.required],
});`;

const invalidHtml = `<fieldset frFieldSet>
  <legend frFieldLegend>Escalation path</legend>
  <p frFieldDescription>Select one owner before saving the workflow.</p>

  <div frRadioGroup aria-label="Escalation path">
    <label frRadioGroupField [invalid]="ownerControl.invalid && ownerControl.touched">
      <input
        frRadioGroupItem
        type="radio"
        name="owner"
        value="design"
        [formControl]="ownerControl"
        [attr.aria-invalid]="ownerControl.invalid && ownerControl.touched ? 'true' : null"
      />
      <span frFieldLabel>FrameUIs team</span>
    </label>
  </div>

  @if (ownerControl.invalid && ownerControl.touched) {
    <p frFieldError>Choose an escalation owner to continue.</p>
  }
</fieldset>`;

const customCss = `.accent-radios {
  --frame-radio-group-gap: 0.875rem;
  --frame-radio-group-item-size: 1.125rem;
  --frame-radio-group-item-dot-size: 0.5625rem;
  --frame-radio-group-item-border: color-mix(in srgb, var(--frame-primary) 28%, var(--frame-border));
  --frame-radio-group-item-hover-border: color-mix(in srgb, var(--frame-primary) 68%, var(--frame-border));
  --frame-radio-group-item-checked-border: var(--frame-primary);
  --frame-radio-group-item-color: var(--frame-primary);
  --frame-radio-group-item-focus-shadow: 0 0 0 4px color-mix(in srgb, var(--frame-primary) 18%, transparent);
}`;

const tokens = `--frame-radio-group-gap: 0.75rem;
--frame-radio-group-horizontal-gap: 1rem;
--frame-radio-group-card-gap: 0.75rem;
--frame-radio-group-card-padding: 1rem;
--frame-radio-group-card-radius: var(--frame-radius-lg);
--frame-radio-group-card-bg: var(--frame-surface);
--frame-radio-group-card-border: var(--frame-border);
--frame-radio-group-card-hover-border: color-mix(in srgb, var(--frame-border) 70%, var(--frame-foreground));
--frame-radio-group-card-checked-border: var(--frame-primary);
--frame-radio-group-card-checked-shadow: 0 0 0 3px color-mix(in srgb, var(--frame-primary) 14%, transparent);
--frame-radio-group-card-disabled-opacity: 0.55;
--frame-radio-group-card-meta-color: var(--frame-muted-foreground);
--frame-radio-group-card-meta-font-size: 0.875rem;
--frame-radio-group-card-meta-font-weight: 600;
--frame-radio-group-item-size: 1rem;
--frame-radio-group-item-bg: var(--frame-surface);
--frame-radio-group-item-border: var(--frame-border);
--frame-radio-group-item-color: var(--frame-primary);
--frame-radio-group-item-hover-border: color-mix(in srgb, var(--frame-border) 72%, var(--frame-foreground));
--frame-radio-group-item-checked-border: var(--frame-primary);
--frame-radio-group-item-checked-bg: var(--frame-surface);
--frame-radio-group-item-dot-size: 0.5rem;
--frame-radio-group-item-focus-shadow: 0 0 0 3px color-mix(in srgb, var(--frame-ring) 32%, transparent);
--frame-radio-group-item-invalid-border: var(--frame-destructive);
--frame-radio-group-item-disabled-opacity: 0.5;
--frame-radio-group-transition-duration: 150ms;
--frame-radio-group-transition-easing: ease;`;

export const RADIO_GROUP_DOC: ComponentDoc = {
  slug: 'radio-group',
  breadcrumb: 'Components / Radio Group',

  hero: {
    id: 'radio-group-hero',
    title: 'Preview',
    preview: {
      component: DocsRadioGroupPreviewComponent,
      inputs: {
        config: { mode: 'hero' },
      },
    },
  },

  installation: {
    cli: {
      language: 'bash',
      code: 'npx your-cli add radio-group',
    },
    manual: {
      steps: [
        {
          title: 'Import the radio group primitives and Field helpers used in your layout.',
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
      code: usageHtml,
    },
  ],

  composition: `FrRadioGroup
├── FrRadioGroupItem
├── FrRadioGroupItem
├── FrRadioGroupItem
└── FrRadioGroupCard (for variant="cards")`,

  tokenInspector: {
    id: 'token-inspector',
    title: 'Token inspector',
    description:
      'Hover the group, field, radio item, content, label, description, or disabled item to inspect the tokens that shape the radio group pattern.',
    preview: {
      component: DocsRadioGroupPreviewComponent,
      containerClass: 'block',
      inputs: {
        config: { mode: 'inspector' },
      },
      inspectorTargets: [
        {
          id: 'group',
          label: 'Radio group',
          selector: '[data-token-target="radio-group"]',
          description: 'The group controls vertical or horizontal spacing between radio rows.',
          tokens: ['--frame-radio-group-gap', '--frame-radio-group-horizontal-gap'],
        },
        {
          id: 'card',
          label: 'Choice card',
          selector: '[data-token-target="radio-card"]',
          description: 'Card tokens style the first-class choice card option for card-based radio groups.',
          tokens: [
            '--frame-radio-group-card-gap',
            '--frame-radio-group-card-padding',
            '--frame-radio-group-card-radius',
            '--frame-radio-group-card-bg',
            '--frame-radio-group-card-border',
            '--frame-radio-group-card-hover-border',
            '--frame-radio-group-card-checked-border',
            '--frame-radio-group-card-checked-shadow',
            '--frame-radio-group-card-disabled-opacity',
          ],
        },
        {
          id: 'card-meta',
          label: 'Card meta',
          selector: '[data-token-target="radio-card-meta"]',
          description: 'Card meta tokens style trailing values, prices, or short status copy inside choice cards.',
          tokens: [
            '--frame-radio-group-card-meta-color',
            '--frame-radio-group-card-meta-font-size',
            '--frame-radio-group-card-meta-font-weight',
          ],
        },
        {
          id: 'field',
          label: 'Field row',
          selector: '[data-token-target="radio-field"]',
          description: 'Field row spacing and text rhythm come from the shared Field primitives paired with each radio.',
          tokens: ['--frame-field-gap', '--frame-field-content-gap'],
        },
        {
          id: 'item',
          label: 'Radio item',
          selector: '[data-token-target="radio-item"]',
          description: 'The item tokens control size, track surface, border, checked state, dot size, focus ring, invalid treatment, and disabled opacity.',
          tokens: [
            '--frame-radio-group-item-size',
            '--frame-radio-group-item-bg',
            '--frame-radio-group-item-border',
            '--frame-radio-group-item-color',
            '--frame-radio-group-item-hover-border',
            '--frame-radio-group-item-checked-border',
            '--frame-radio-group-item-checked-bg',
            '--frame-radio-group-item-dot-size',
            '--frame-radio-group-item-focus-shadow',
            '--frame-radio-group-item-invalid-border',
            '--frame-radio-group-item-disabled-opacity',
          ],
        },
        {
          id: 'content',
          label: 'Content stack',
          selector: '[data-token-target="radio-content"]',
          description: 'The content stack sets the gap between labels and supporting descriptions.',
          tokens: ['--frame-field-content-gap'],
        },
        {
          id: 'label',
          label: 'Label',
          selector: '[data-token-target="radio-label"]',
          description: 'Radio labels use Field label tokens for type size, weight, and color.',
          tokens: ['--frame-field-label-font-size', '--frame-field-label-font-weight', '--frame-field-label-color'],
        },
        {
          id: 'description',
          label: 'Description',
          selector: '[data-token-target="radio-description"]',
          description: 'Descriptions use Field description tokens for secondary copy.',
          tokens: ['--frame-field-description-color', '--frame-field-description-font-size'],
        },
        {
          id: 'disabled',
          label: 'Disabled item',
          selector: '[data-token-target="radio-disabled-item"]',
          description: 'Disabled item opacity is controlled by the radio item disabled token.',
          tokens: ['--frame-radio-group-item-disabled-opacity'],
        },
      ],
    },
  },

  styling: {
    description:
      'Scope radio group token overrides to a wrapper when a form section needs a stronger selected state, larger target, or different focus treatment.',
    preview: {
      id: 'custom-styling-preview',
      title: 'Custom Styling Preview',
      description: 'This preview increases the radio size and gives the selected indicator a stronger accent.',
      preview: {
        component: DocsRadioGroupPreviewComponent,
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
          code: `<div frRadioGroup class="accent-radios" aria-label="Theme accent">
  <label frRadioGroupField>
    <input frRadioGroupItem type="radio" name="accent" value="ocean" checked />
    <span frFieldContent>
      <span frFieldLabel>Ocean</span>
      <span frFieldDescription>Use a cool highlight for dense data views.</span>
    </span>
  </label>
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
      description: 'Use a radio group when users must pick exactly one option from a small set.',
      preview: {
        component: DocsRadioGroupPreviewComponent,
        inputs: {
          config: { mode: 'basic' },
        },
      },
      code: [
        {
          language: 'ts',
          code: importsCode,
        },
        {
          language: 'html',
          code: usageHtml,
        },
      ],
    },
    {
      id: 'descriptions',
      title: 'Descriptions',
      description: 'Pair radio items with Field content when each option needs supporting explanation.',
      preview: {
        component: DocsRadioGroupPreviewComponent,
        inputs: {
          config: { mode: 'descriptions' },
        },
      },
      code: [
        {
          language: 'ts',
          code: importsCode,
        },
        {
          language: 'html',
          code: descriptionsHtml,
        },
      ],
    },
    {
      id: 'choice-card',
      title: 'Choice card',
      description: 'Use the card variant and card primitives when each radio option should render as a larger selection surface.',
      preview: {
        component: DocsRadioGroupPreviewComponent,
        inputs: {
          config: { mode: 'cards' },
        },
      },
      code: [
        {
          language: 'ts',
          code: importsCode,
        },
        {
          language: 'html',
          code: cardsHtml,
        },
      ],
    },
    {
      id: 'fieldset',
      title: 'Fieldset',
      description: 'Use FieldSet and FieldLegend when a group needs a visible question or section heading.',
      preview: {
        component: DocsRadioGroupPreviewComponent,
        inputs: {
          config: { mode: 'fieldset' },
        },
      },
      code: [
        {
          language: 'ts',
          code: importsCode,
        },
        {
          language: 'html',
          code: fieldsetHtml,
        },
      ],
    },
    {
      id: 'disabled',
      title: 'Disabled',
      description: 'Disable individual radios when a policy or upstream dependency prevents selecting that value.',
      preview: {
        component: DocsRadioGroupPreviewComponent,
        inputs: {
          config: { mode: 'disabled' },
        },
      },
      code: [
        {
          language: 'ts',
          code: importsCode,
        },
        {
          language: 'html',
          code: `<div frRadioGroup aria-label="Region">
  <label frRadioGroupField>
    <input frRadioGroupItem type="radio" name="region" value="eu" disabled />
    <span frFieldLabel>Europe locked by policy</span>
  </label>

  <label frRadioGroupField>
    <input frRadioGroupItem type="radio" name="region" value="us" checked />
    <span frFieldLabel>United States</span>
  </label>
</div>`,
        },
      ],
    },
    {
      id: 'invalid',
      title: 'Invalid with reactive forms',
      description: 'Use Angular validation to drive invalid styling and error text while keeping each option a native radio input.',
      preview: {
        component: DocsRadioGroupPreviewComponent,
        inputs: {
          config: { mode: 'invalid' },
        },
      },
      code: [
        {
          language: 'ts',
          code: invalidTs,
        },
        {
          language: 'html',
          code: invalidHtml,
        },
      ],
    },
    {
      id: 'rtl',
      title: 'RTL',
      description: 'Radio rows use logical spacing and native inputs, so labels and controls follow the document direction.',
      preview: {
        component: DocsRadioGroupPreviewComponent,
        inputs: {
          config: { mode: 'rtl' },
        },
      },
      code: [
        {
          language: 'ts',
          code: importsCode,
        },
        {
          language: 'html',
          code: `<div dir="rtl" frRadioGroup aria-label="كثافة العرض">
  <label frRadioGroupField>
    <input frRadioGroupItem type="radio" name="density" value="standard" checked />
    <span frFieldContent>
      <span frFieldLabel>قياسي</span>
      <span frFieldDescription>تباعد مناسب لمعظم شاشات الإعدادات.</span>
    </span>
  </label>
</div>`,
        },
      ],
    },
  ],

  tokensTitle: 'Design Tokens',
  tokensDescription:
    'Use these CSS custom properties to tune radio group spacing, radio item sizing, checked state, focus ring, invalid state, and disabled opacity.',
  tokens,
};

