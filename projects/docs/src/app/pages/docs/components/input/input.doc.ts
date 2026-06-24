import { ComponentDoc } from '../../shared/models/component-doc.model';
import { DocsInputPreviewComponent, InputPreviewConfig } from './previews/input-preview';

const importsCode = `import { FrInputModule } from '@frame-ui-ng/components/input';`;
const formImportsCode = `import { FormControl, ReactiveFormsModule } from '@angular/forms';
${importsCode}`;

const heroConfig: InputPreviewConfig = {
  items: [
    {
      id: 'email',
      label: 'Email',
      type: 'email',
      badge: 'Beta',
      initialValue: 'team@northwind.dev',
      description: 'We will send release updates to this address.',
    },
    {
      id: 'workspace-url',
      label: 'Workspace URL',
      kind: 'group',
      type: 'url',
      prefixText: 'https://',
      suffixIcon: 'tablerWorldWww',
      initialValue: 'northwind.design',
      description: 'Use input groups when text or icons clarify the expected format.',
    },
  ],
};

const basicConfig: InputPreviewConfig = {
  items: [
    {
      id: 'basic-email',
      label: 'Email',
      type: 'email',
      badge: 'Beta',
      initialValue: 'team@northwind.dev',
      description: 'We will send release updates to this address.',
    },
  ],
};

const invalidConfig: InputPreviewConfig = {
  items: [
    {
      id: 'account-name',
      label: 'Account name',
      type: 'text',
      initialValue: 'Northwind',
      placeholder: 'Northwind',
      reactiveInvalidDemo: true,
      error: 'An account name is required.',
      description: 'Delete the value to see the reactive validation state.',
    },
  ],
};

const groupConfig: InputPreviewConfig = {
  items: [
    {
      id: 'docs-search',
      label: 'Docs search',
      kind: 'group',
      type: 'search',
      prefixIcon: 'tablerSearch',
      prefixAddonVariant: 'ghost',
      suffixButtonLabel: 'Filter',
      suffixButtonIcon: 'tablerFilter',
      placeholder: 'Search releases, services, or teams...',
      description: 'Button addons behave like connected segments inside the same input shell.',
    },
    {
      id: 'public-url',
      label: 'Public URL',
      kind: 'group',
      type: 'url',
      prefixText: 'https://',
      suffixIcon: 'tablerLink',
      initialValue: 'northwind.dev/docs',
      description: 'Text addons are useful when part of the value is fixed or implied.',
    },
  ],
};

const stateConfig: InputPreviewConfig = {
  items: [
    {
      id: 'readonly-key',
      label: 'Readonly API key',
      type: 'text',
      initialValue: 'pk_live_northwind_docs',
      readonly: true,
      description: 'Readonly inputs keep the same structure while signaling that the value cannot be changed here.',
    },
    {
      id: 'disabled-password',
      label: 'Disabled password',
      kind: 'group',
      type: 'password',
      prefixIcon: 'tablerLock',
      initialValue: 'password',
      disabled: true,
      description: 'Disabled inputs inherit the primitive opacity treatment and block interaction.',
    },
  ],
};

const inspectorConfig: InputPreviewConfig = {
  items: [
    {
      id: 'inspector-url',
      label: 'Public URL',
      kind: 'group',
      type: 'url',
      badge: 'Live',
      prefixText: 'https://',
      suffixIcon: 'tablerLink',
      initialValue: 'northwind.dev/releases',
      description: 'Inspect the field shell, badge, addon surface, input control, description, and validation text.',
      error: 'A public URL is required.',
      tokenPrefix: 'input',
    },
  ],
};

const customStylingConfig: InputPreviewConfig = {
  style: `--frame-input-field-gap: 0.625rem;
--frame-input-root-height: 2.75rem;
--frame-input-root-radius: 1rem;
--frame-input-root-border: color-mix(in srgb, var(--frame-primary) 24%, var(--frame-border));
--frame-input-root-focus-border: color-mix(in srgb, var(--frame-primary) 60%, var(--frame-border));
--frame-input-root-focus-shadow: 0 0 0 3px color-mix(in srgb, var(--frame-primary) 18%, transparent);
--frame-input-badge-bg: yellow;
--frame-input-badge-border: color-mix(in srgb, var(--frame-primary) 32%, transparent);
--frame-input-group-addon-bg: green;
--frame-input-group-addon-color: color-mix(in srgb, var(--frame-primary) 42%, var(--frame-foreground));`,
  items: [
    {
      id: 'custom-owner',
      label: 'Campaign owner',
      kind: 'group',
      type: 'text',
      prefixIcon: 'tablerMail',
      initialValue: 'julia@northwind.dev',
      badge: 'Team',
      description: 'This preview applies local radius, focus, badge, and addon token overrides.',
    },
  ],
};

export const INPUT_DOC: ComponentDoc = {
  slug: 'input',
  breadcrumb: 'Components / Input',

  hero: {
    id: 'input-hero',
    title: 'Preview',
    preview: {
      component: DocsInputPreviewComponent,
      inputs: {
        config: heroConfig,
      },
    },
  },

  installation: {
    cli: {
      language: 'bash',
      code: 'npx your-cli add input',
    },
    manual: {
      steps: [
        {
          title: 'Import the input primitives you need for standalone fields, feedback text, and grouped addons.',
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
import { FrInputModule } from '@frame-ui-ng/components/input';

emailControl = new FormControl('team@northwind.dev');`,
    },
    {
      language: 'html',
      code: `<div frInputField>
  <div frInputHeader>
    <label frInputLabel for="email">Email</label>
    <span frInputBadge>Beta</span>
  </div>

  <div frInputControl>
    <input frInput id="email" type="email" [formControl]="emailControl" />
  </div>

  <p frInputDescription>We will send release updates to this address.</p>
</div>`,
    },
  ],

  tokenInspector: {
    id: 'token-inspector',
    title: 'Token inspector',
    description:
      'Hover the field shell, label, badge, group surface, addon, description, or error text to inspect how the input primitives distribute spacing and state styling.',
    preview: {
      component: DocsInputPreviewComponent,
      containerClass: 'block',
      inputs: {
        config: inspectorConfig,
      },
      inspectorTargets: [
        {
          id: 'field',
          label: 'Field shell',
          selector: '[data-token-target="input-field"]',
          description: 'Field tokens control the spacing between the header, control surface, description, and error copy.',
          tokens: ['--frame-input-field-gap', '--frame-input-field-group-gap'],
        },
        {
          id: 'label',
          label: 'Label',
          selector: '[data-token-target="input-label"]',
          description: 'Labels use a shared type scale that stays distinct from body copy.',
          tokens: ['--frame-input-label-font-size', '--frame-input-label-font-weight'],
        },
        {
          id: 'badge',
          label: 'Badge',
          selector: '[data-token-target="input-badge"]',
          description: 'Badges can annotate status or rollout stage without introducing a second layout system.',
          tokens: [
            '--frame-input-badge-height',
            '--frame-input-badge-padding-inline',
            '--frame-input-badge-radius',
            '--frame-input-badge-border',
            '--frame-input-badge-bg',
            '--frame-input-badge-color',
          ],
        },
        {
          id: 'group',
          label: 'Input group',
          selector: '[data-token-target="input-group"]',
          description: 'Input-group tokens define the shared shell for grouped addons and the inner input control.',
          tokens: [
            '--frame-input-group-height',
            '--frame-input-group-radius',
            '--frame-input-group-bg',
            '--frame-input-group-border',
            '--frame-input-group-focus-border',
            '--frame-input-group-focus-shadow',
          ],
        },
        {
          id: 'addon',
          label: 'Addon surface',
          selector: '[data-token-target="input-addon"]',
          description: 'Addon tokens tune the icon or text surfaces that sit before or after a grouped input.',
          tokens: [
            '--frame-input-group-addon-min-width',
            '--frame-input-group-addon-bg',
            '--frame-input-group-addon-color',
            '--frame-input-group-addon-padding-inline',
            '--frame-input-group-addon-border',
            '--frame-input-group-text-font-size',
            '--frame-input-group-text-font-weight',
          ],
        },
        {
          id: 'control',
          label: 'Input control',
          selector: '[data-token-target="input-control"]',
          description: 'Root input tokens define height, border, radius, focus treatment, and invalid styling.',
          tokens: [
            '--frame-input-root-height',
            '--frame-input-root-radius',
            '--frame-input-root-bg',
            '--frame-input-root-color',
            '--frame-input-root-border',
            '--frame-input-root-font-size',
            '--frame-input-root-padding-inline',
            '--frame-input-root-placeholder-color',
            '--frame-input-root-hover-border',
            '--frame-input-root-focus-border',
            '--frame-input-root-focus-shadow',
            '--frame-input-root-invalid-border',
            '--frame-input-root-invalid-shadow',
          ],
        },
        {
          id: 'description',
          label: 'Description',
          selector: '[data-token-target="input-description"]',
          description: 'Descriptions use a quieter type scale to support the control without overpowering it.',
          tokens: ['--frame-input-description-color', '--frame-input-description-font-size'],
        },
        {
          id: 'error',
          label: 'Error text',
          selector: '[data-token-target="input-error"]',
          description: 'Error tokens define the color and type scale for validation messaging.',
          tokens: ['--frame-input-error-color', '--frame-input-error-font-size'],
        },
      ],
    },
  },

  styling: {
    description:
      'Override input tokens on a local wrapper when a form section needs a different radius, focus ring, badge treatment, or addon surface without changing the primitive structure.',
    preview: {
      id: 'custom-styling-preview',
      title: 'Custom Styling Preview',
      description:
        'This preview applies local overrides to the control height, focus ring, badge, and grouped addon treatment.',
      preview: {
        component: DocsInputPreviewComponent,
        inputs: {
          config: customStylingConfig,
        },
      },
      code: [
        {
          language: 'ts',
          code: `import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FrInputModule } from '@frame-ui-ng/components/input';

ownerControl = new FormControl('julia@northwind.dev');`,
        },
        {
          language: 'html',
          code: `<div class="campaign-input">
  <div frInputField>
    <div frInputHeader>
      <label frInputLabel for="campaign-owner">Campaign owner</label>
      <span frInputBadge>Team</span>
    </div>

    <div frInputGroup>
      <span frInputGroupAddon align="inline-start">
        <ng-icon name="tablerMail" size="16" />
      </span>
      <input frInputGroupInput id="campaign-owner" [formControl]="ownerControl" />
    </div>

    <p frInputDescription>
      This preview applies local radius, focus, badge, and addon token overrides.
    </p>
  </div>
</div>`,
        },
        {
          language: 'css',
          code: `.campaign-input {
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
        'Use the field helpers when an input needs a label, supporting text, and optional badges around the native control.',
      preview: {
        component: DocsInputPreviewComponent,
        inputs: {
          config: basicConfig,
        },
      },
      code: [
        {
          language: 'ts',
          code: `${formImportsCode}

emailControl = new FormControl('team@northwind.dev');`,
        },
        {
          language: 'html',
          code: `<div frInputField>
  <div frInputHeader>
    <label frInputLabel for="email">Email</label>
    <span frInputBadge>Beta</span>
  </div>

  <div frInputControl>
    <input frInput id="email" type="email" [formControl]="emailControl" />
  </div>

  <p frInputDescription>We will send release updates to this address.</p>
</div>`,
        },
      ],
    },
    {
      id: 'invalid',
      title: 'Invalid with reactive forms',
      description:
        'Reactive forms can drive the invalid state directly, so the control styling and helper message stay in sync with Angular validation.',
      preview: {
        component: DocsInputPreviewComponent,
        inputs: {
          config: invalidConfig,
        },
      },
      code: [
        {
          language: 'ts',
          code: `import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { FrInputModule } from '@frame-ui-ng/components/input';

accountNameControl = new FormControl('Northwind', {
  validators: [Validators.required],
  nonNullable: true,
});`,
        },
        {
          language: 'html',
          code: `<div frInputField>
  <label frInputLabel for="account-name">Account name</label>

  <div frInputControl>
    <input frInput id="account-name" [formControl]="accountNameControl" />
  </div>

  <p frInputDescription>Delete the value to see the reactive validation state.</p>

  @if (accountNameControl.invalid && (accountNameControl.touched || accountNameControl.dirty)) {
    <p frInputError>An account name is required.</p>
  }
</div>`,
        },
      ],
    },
    {
      id: 'group',
      title: 'Input groups',
      description:
        'Use input groups when text, icons, or lightweight shortcuts should sit inside the same interactive shell as the input itself.',
      preview: {
        component: DocsInputPreviewComponent,
        inputs: {
          config: groupConfig,
        },
      },
      code: [
        {
          language: 'ts',
          code: `import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FrButton, FrButtonIcon, FrButtonLabel } from '@frame-ui-ng/components/button';
import { FrInputModule } from '@frame-ui-ng/components/input';

searchControl = new FormControl('');
urlControl = new FormControl('northwind.dev/docs');`,
        },
        {
          language: 'html',
          code: `<div frInputField>
  <label frInputLabel for="docs-search">Docs search</label>

  <div frInputGroup>
    <span frInputGroupAddon align="inline-start" variant="ghost">
      <ng-icon name="tablerSearch" size="16" />
    </span>

    <input
      frInputGroupInput
      id="docs-search"
      type="search"
      placeholder="Search releases, services, or teams..."
      [formControl]="searchControl"
    />

    <span frInputGroupAddon align="inline-end">
      <button frButton appearance="ghost" type="button">
        <ng-icon name="tablerFilter" size="16" frButtonIcon />
        <span frButtonLabel>Filter</span>
      </button>
    </span>
  </div>

  <p frInputDescription>Button addons behave like connected segments inside the same input shell.</p>
</div>

<div frInputField>
  <label frInputLabel for="public-url">Public URL</label>

  <div frInputGroup>
    <span frInputGroupAddon align="inline-start">
      <span frInputGroupText>https://</span>
    </span>

    <input frInputGroupInput id="public-url" [formControl]="urlControl" type="url" />

    <span frInputGroupAddon align="inline-end">
      <ng-icon name="tablerLink" size="16" />
    </span>
  </div>

  <p frInputDescription>Text addons are useful when part of the value is fixed or implied.</p>
</div>`,
        },
      ],
    },
    {
      id: 'states',
      title: 'Readonly and disabled',
      description:
        'Readonly and disabled states stay within the same primitive API, which keeps form structure stable even when behavior changes.',
      preview: {
        component: DocsInputPreviewComponent,
        inputs: {
          config: stateConfig,
        },
      },
      code: [
        {
          language: 'ts',
          code: `${formImportsCode}

readonlyKeyControl = new FormControl('pk_live_northwind_docs');

disabledPasswordControl = new FormControl({ value: 'password', disabled: true });`,
        },
        {
          language: 'html',
          code: `<div frInputField>
  <label frInputLabel for="readonly-key">Readonly API key</label>
  <div frInputControl>
    <input frInput id="readonly-key" [formControl]="readonlyKeyControl" [readOnly]="true" />
  </div>
  <p frInputDescription>Readonly inputs keep the same structure while signaling that the value cannot be changed here.</p>
</div>`,
        },
      ],
    },
  ],

  tokensTitle: 'Design Tokens',
  tokensDescription:
    'Use these CSS custom properties to tune input spacing, label and helper typography, root control states, grouped addons, and badges without changing the primitive structure.',
  tokens: `
  --frame-input-field-gap: 0.5rem;
  --frame-input-header-gap: 0.75rem;
  --frame-input-field-group-gap: 1rem;
  --frame-input-label-font-size: 0.875rem;
  --frame-input-label-font-weight: 600;
  --frame-input-description-color: var(--frame-muted-foreground);
  --frame-input-description-font-size: 0.8125rem;
  --frame-input-error-color: var(--frame-destructive);
  --frame-input-error-font-size: 0.8125rem;
  --frame-input-root-height: 2.5rem;
  --frame-input-root-radius: var(--frame-radius-md);
  --frame-input-root-bg: var(--frame-surface);
  --frame-input-root-color: var(--frame-surface-foreground);
  --frame-input-root-border: var(--frame-border);
  --frame-input-root-font-size: 0.875rem;
  --frame-input-root-padding-inline: 0.875rem;
  --frame-input-root-placeholder-color: var(--frame-muted-foreground);
  --frame-input-root-hover-border: color-mix(in srgb, var(--frame-border) 80%, var(--frame-foreground));
  --frame-input-root-focus-border: color-mix(in srgb, var(--frame-ring) 70%, var(--frame-border));
  --frame-input-root-focus-shadow: 0 0 0 3px color-mix(in srgb, var(--frame-ring) 22%, transparent);
  --frame-input-root-invalid-border: color-mix(in srgb, var(--frame-destructive) 65%, var(--frame-border));
  --frame-input-root-invalid-shadow: 0 0 0 3px color-mix(in srgb, var(--frame-destructive) 14%, transparent);
  --frame-input-root-disabled-opacity: 0.55;
  --frame-input-root-readonly-bg: color-mix(in srgb, var(--frame-surface) 80%, var(--frame-muted));
  --frame-input-root-transition-duration: 150ms;
  --frame-input-file-padding-block: 0.375rem;
  --frame-input-file-button-radius: var(--frame-radius-sm);
  --frame-input-file-button-bg: color-mix(in srgb, var(--frame-surface) 80%, var(--frame-muted));
  --frame-input-file-button-hover-bg: color-mix(in srgb, var(--frame-surface) 65%, var(--frame-muted));
  --frame-input-file-button-font-size: 0.8125rem;
  --frame-input-file-button-font-weight: 600;
  --frame-input-file-button-margin-inline-end: 0.75rem;
  --frame-input-file-button-padding: 0.45rem 0.75rem;
  --frame-input-file-button-transition-duration: var(--frame-input-root-transition-duration);
  --frame-input-badge-height: 1.5rem;
  --frame-input-badge-padding-inline: 0.5rem;
  --frame-input-badge-radius: var(--frame-radius-sm);
  --frame-input-badge-border: color-mix(in srgb, var(--frame-primary) 24%, transparent);
  --frame-input-badge-bg: color-mix(in srgb, var(--frame-primary) 12%, transparent);
  --frame-input-badge-color: var(--frame-primary);
  --frame-input-badge-font-size: 0.6875rem;
  --frame-input-badge-font-weight: 700;
  --frame-input-group-height: var(--frame-input-root-height);
  --frame-input-group-radius: var(--frame-input-root-radius);
  --frame-input-group-bg: var(--frame-input-root-bg);
  --frame-input-group-border: var(--frame-input-root-border);
  --frame-input-group-focus-border: var(--frame-input-root-focus-border);
  --frame-input-group-focus-shadow: var(--frame-input-root-focus-shadow);
  --frame-input-group-transition-duration: var(--frame-input-root-transition-duration);
  --frame-input-group-input-padding-inline: var(--frame-input-root-padding-inline);
  --frame-input-group-addon-min-width: 2.5rem;
  --frame-input-group-addon-bg: color-mix(in srgb, var(--frame-surface) 80%, var(--frame-muted));
  --frame-input-group-addon-color: var(--frame-muted-foreground);
  --frame-input-group-addon-padding-inline: 0.75rem;
  --frame-input-group-addon-border: var(--frame-border);
  --frame-input-group-text-font-size: 0.8125rem;
  --frame-input-group-text-font-weight: 600;
  `,
};

