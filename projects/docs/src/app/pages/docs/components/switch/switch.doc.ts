import { ComponentDoc } from '../../shared/models/component-doc.model';
import { DocsSwitchPreviewComponent, SwitchPreviewConfig } from './previews/switch-preview';

const importsCode = `import { FrSwitchModule } from '@frame-ui-ng/components/switch';`;
const formImportsCode = `import { FormControl, ReactiveFormsModule } from '@angular/forms';
${importsCode}`;

const heroConfig: SwitchPreviewConfig = {
  items: [
    {
      id: 'hero-release',
      label: 'Release notifications',
      description: 'Notify workspace members when a rollout completes.',
      initialChecked: true,
      icon: 'tablerBell',
    },
    {
      id: 'hero-mode',
      label: 'System dark mode',
      description: 'Follow the operating system appearance automatically.',
      icon: 'tablerMoonStars',
    },
  ],
};

const basicConfig: SwitchPreviewConfig = {
  items: [
    {
      id: 'basic-switch',
      label: 'Enable release notifications',
      description: 'Notify workspace members when a rollout completes.',
      initialChecked: true,
      icon: 'tablerBell',
    },
  ],
};

const sizeConfig: SwitchPreviewConfig = {
  items: [
    {
      id: 'default-size',
      label: 'Default switch size',
      description: 'Use the default size for full-size form rows and settings pages.',
      initialChecked: true,
      icon: 'tablerRocket',
    },
    {
      id: 'small-size',
      label: 'Small switch size',
      description: 'Use the compact size when space is limited inside dense toolbars or filters.',
      size: 'sm',
      initialChecked: true,
      icon: 'tablerDeviceDesktop',
    },
  ],
};

const disabledConfig: SwitchPreviewConfig = {
  items: [
    {
      id: 'disabled-off',
      label: 'Managed by organization policy',
      description: 'This setting can only be changed by an admin.',
      disabled: true,
      icon: 'tablerLock',
    },
    {
      id: 'disabled-on',
      label: 'Security review required',
      description: 'This protection stays enabled until the review is complete.',
      initialChecked: true,
      disabled: true,
      icon: 'tablerShieldCheck',
    },
  ],
};

const invalidConfig: SwitchPreviewConfig = {
  items: [
    {
      id: 'required-approval',
      label: 'I confirm the production rollout checklist is complete',
      description: 'Turn this off to see the reactive validation state driven by Validators.requiredTrue.',
      initialChecked: true,
      reactiveRequiredDemo: true,
      error: 'Confirmation is required before continuing.',
      icon: 'tablerShieldCheck',
    },
  ],
};

const inspectorConfig: SwitchPreviewConfig = {
  items: [
    {
      id: 'inspector-switch',
      label: 'Automatic workspace backups',
      description: 'Inspect the field, control, content stack, label, helper text, and error copy.',
      initialChecked: true,
      reactiveRequiredDemo: true,
      error: 'Automatic backups must remain enabled.',
      icon: 'tablerDeviceDesktop',
      tokenPrefix: 'switch',
    },
  ],
};

const customStylingConfig: SwitchPreviewConfig = {
  style: `--frame-switch-field-gap: 1rem;
--frame-switch-width: 2.75rem;
--frame-switch-height: 1.5rem;
--frame-switch-thumb-size: 1.125rem;
--frame-switch-bg: color-mix(in srgb, var(--frame-muted) 82%, var(--frame-surface));
--frame-switch-checked-bg: green;
--frame-switch-checked-hover-bg: darkgreen;
--frame-switch-focus-shadow: 0 0 0 3px color-mix(in srgb, var(--frame-primary) 18%, transparent);
--frame-switch-label-font-weight: 700;
--frame-switch-description-color: color-mix(in srgb, var(--frame-primary) 42%, var(--frame-muted-foreground));`,
  items: [
    {
      id: 'custom-switch',
      label: 'Enable guided setup',
      description: 'This preview applies local spacing, sizing, thumb, and checked-state overrides.',
      initialChecked: true,
      icon: 'tablerRocket',
    },
  ],
};

export const SWITCH_DOC: ComponentDoc = {
  slug: 'switch',
  breadcrumb: 'Components / Switch',

  hero: {
    id: 'switch-hero',
    title: 'Preview',
    preview: {
      component: DocsSwitchPreviewComponent,
      inputs: {
        config: heroConfig,
      },
    },
  },

  installation: {
    cli: {
      language: 'bash',
      code: 'npx your-cli add switch',
    },
    manual: {
      steps: [
        {
          title: 'Import the switch primitives for the control, content stack, and optional helper text.',
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
import { FrSwitchModule } from '@frame-ui-ng/components/switch';

notificationsControl = new FormControl(true, { nonNullable: true });`,
    },
    {
      language: 'html',
      code: `<label frSwitchField>
  <input frSwitch type="checkbox" [formControl]="notificationsControl" />

  <span frSwitchContent>
    <span frSwitchLabel>Enable release notifications</span>
    <span frSwitchDescription>Notify workspace members when a rollout completes.</span>
  </span>
</label>`,
    },
  ],

  tokenInspector: {
    id: 'token-inspector',
    title: 'Token inspector',
    description:
      'Hover the field wrapper, switch control, content stack, label, description, or error copy to inspect the tokens that govern sizing, spacing, checked state, and validation treatment.',
    preview: {
      component: DocsSwitchPreviewComponent,
      containerClass: 'block',
      inputs: {
        config: inspectorConfig,
      },
      inspectorTargets: [
        {
          id: 'field',
          label: 'Field wrapper',
          selector: '[data-token-target="switch-field"]',
          description: 'The field wrapper controls the spacing between the switch and its content stack, plus the disabled text color contract.',
          tokens: ['--frame-switch-field-gap', '--frame-switch-field-color', '--frame-switch-field-disabled-color'],
        },
        {
          id: 'control',
          label: 'Switch control',
          selector: '[data-token-target="switch-control"]',
          description: 'The control tokens define the switch track dimensions, thumb size, checked and hover states, focus ring, and invalid treatment.',
          tokens: [
            '--frame-switch-width',
            '--frame-switch-height',
            '--frame-switch-thumb-size',
            '--frame-switch-padding',
            '--frame-switch-radius',
            '--frame-switch-bg',
            '--frame-switch-hover-bg',
            '--frame-switch-checked-bg',
            '--frame-switch-checked-hover-bg',
            '--frame-switch-thumb-bg',
            '--frame-switch-thumb-shadow',
            '--frame-switch-border-shadow',
            '--frame-switch-checked-border-shadow',
            '--frame-switch-focus-shadow',
            '--frame-switch-invalid-border',
            '--frame-switch-invalid-shadow',
            '--frame-switch-disabled-opacity',
          ],
        },
        {
          id: 'content',
          label: 'Content stack',
          selector: '[data-token-target="switch-content"]',
          description: 'The content wrapper sets the vertical spacing rhythm between the label, description, and error message.',
          tokens: ['--frame-switch-content-gap'],
        },
        {
          id: 'label',
          label: 'Label',
          selector: '[data-token-target="switch-label"]',
          description: 'Label tokens control the primary type scale and emphasis for the switch row.',
          tokens: ['--frame-switch-label-font-size', '--frame-switch-label-font-weight'],
        },
        {
          id: 'description',
          label: 'Description',
          selector: '[data-token-target="switch-description"]',
          description: 'Description tokens keep the supporting copy quieter than the main label.',
          tokens: ['--frame-switch-description-color', '--frame-switch-description-font-size'],
        },
        {
          id: 'error',
          label: 'Error text',
          selector: '[data-token-target="switch-error"]',
          description: 'Error tokens define the validation color and supporting type scale below the label.',
          tokens: ['--frame-switch-error-color', '--frame-switch-error-font-size'],
        },
      ],
    },
  },

  styling: {
    description:
      'Scope switch token overrides to a wrapper when a settings area needs different spacing, a larger track, or a more pronounced checked state without changing the primitive structure.',
    preview: {
      id: 'custom-styling-preview',
      title: 'Custom Styling Preview',
      description:
        'This preview applies local overrides to the field spacing, control size, thumb scale, checked state, and helper-text tone.',
      preview: {
        component: DocsSwitchPreviewComponent,
        inputs: {
          config: customStylingConfig,
        },
      },
      code: [
        {
          language: 'ts',
          code: `${formImportsCode}

guidedSetupControl = new FormControl(true, { nonNullable: true });`,
        },
        {
          language: 'html',
          code: `<div class="guided-setup-switch">
  <label frSwitchField>
    <input frSwitch type="checkbox" [formControl]="guidedSetupControl" />

    <span frSwitchContent>
      <span frSwitchLabel>Enable guided setup</span>
      <span frSwitchDescription>
        This preview applies local spacing, sizing, thumb, and checked-state overrides.
      </span>
    </span>
  </label>
</div>`,
        },
        {
          language: 'css',
          code: `.guided-setup-switch {
${customStylingConfig.style}
}`,
        },
      ],
    },
  },

  examples: [
    {
      id: 'basic',
      title: 'Basic switch',
      description:
        'Use a switch for immediate on/off settings where the current state should be visible without opening another surface.',
      preview: {
        component: DocsSwitchPreviewComponent,
        inputs: {
          config: basicConfig,
        },
      },
      code: [
        {
          language: 'ts',
          code: `${formImportsCode}

notificationsControl = new FormControl(true, { nonNullable: true });`,
        },
        {
          language: 'html',
          code: `<label frSwitchField>
  <input frSwitch type="checkbox" [formControl]="notificationsControl" />

  <span frSwitchContent>
    <span frSwitchLabel>Enable release notifications</span>
    <span frSwitchDescription>Notify workspace members when a rollout completes.</span>
  </span>
</label>`,
        },
      ],
    },
    {
      id: 'sizes',
      title: 'Sizes',
      description:
        'Use the default size for settings pages and the small size when switches sit inside denser toolbars or filters.',
      preview: {
        component: DocsSwitchPreviewComponent,
        inputs: {
          config: sizeConfig,
        },
      },
      code: [
        {
          language: 'ts',
          code: importsCode,
        },
        {
          language: 'html',
          code: `<label frSwitchField>
  <input frSwitch type="checkbox" checked />
  <span frSwitchContent>
    <span frSwitchLabel>Default switch size</span>
    <span frSwitchDescription>Use the default size for full-size form rows and settings pages.</span>
  </span>
</label>

<label frSwitchField>
  <input frSwitch type="checkbox" size="sm" checked />
  <span frSwitchContent>
    <span frSwitchLabel>Small switch size</span>
    <span frSwitchDescription>Use the compact size when space is limited inside dense toolbars or filters.</span>
  </span>
</label>`,
        },
      ],
    },
    {
      id: 'disabled',
      title: 'Disabled state',
      description:
        'Disable a switch when a policy or upstream dependency temporarily prevents changes while still exposing the current state.',
      preview: {
        component: DocsSwitchPreviewComponent,
        inputs: {
          config: disabledConfig,
        },
      },
      code: [
        {
          language: 'ts',
          code: `${formImportsCode}

managedControl = new FormControl({ value: false, disabled: true }, { nonNullable: true });
securityControl = new FormControl({ value: true, disabled: true }, { nonNullable: true });`,
        },
        {
          language: 'html',
          code: `<label frSwitchField>
  <input frSwitch type="checkbox" [formControl]="managedControl" />
  <span frSwitchContent>
    <span frSwitchLabel>Managed by organization policy</span>
    <span frSwitchDescription>This setting can only be changed by an admin.</span>
  </span>
</label>`,
        },
      ],
    },
    {
      id: 'invalid',
      title: 'Invalid with reactive forms',
      description:
        'Reactive forms can drive required confirmation flows directly, so the switch track and error text stay synchronized with Angular validation.',
      preview: {
        component: DocsSwitchPreviewComponent,
        inputs: {
          config: invalidConfig,
        },
      },
      code: [
        {
          language: 'ts',
          code: `import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { FrSwitchModule } from '@frame-ui-ng/components/switch';

confirmationControl = new FormControl(true, {
  nonNullable: true,
  validators: [Validators.requiredTrue],
});`,
        },
        {
          language: 'html',
          code: `<label frSwitchField>
  <input frSwitch type="checkbox" [formControl]="confirmationControl" />

  <span frSwitchContent>
    <span frSwitchLabel>I confirm the production rollout checklist is complete</span>
    <span frSwitchDescription>
      Turn this off to see the reactive validation state driven by Validators.requiredTrue.
    </span>

    @if (confirmationControl.invalid && (confirmationControl.touched || confirmationControl.dirty)) {
      <span frSwitchError>Confirmation is required before continuing.</span>
    }
  </span>
</label>`,
        },
      ],
    },
  ],

  tokensTitle: 'Design Tokens',
  tokensDescription:
    'Use these CSS custom properties to tune switch sizing, checked-state surfaces, thumb treatment, field spacing, and helper-text typography without changing the primitive structure.',
  tokens: `
  --frame-switch-field-gap: 0.75rem;
  --frame-switch-field-color: var(--frame-foreground);
  --frame-switch-field-disabled-color: var(--frame-muted-foreground);
  --frame-switch-content-gap: 0.25rem;
  --frame-switch-label-font-size: 0.875rem;
  --frame-switch-label-font-weight: 600;
  --frame-switch-description-color: var(--frame-muted-foreground);
  --frame-switch-description-font-size: 0.8125rem;
  --frame-switch-error-color: var(--frame-destructive);
  --frame-switch-error-font-size: 0.8125rem;
  --frame-switch-width: 2.25rem;
  --frame-switch-height: 1.25rem;
  --frame-switch-thumb-size: 1rem;
  --frame-switch-padding: 0.125rem;
  --frame-switch-sm-width: 1.75rem;
  --frame-switch-sm-height: 1rem;
  --frame-switch-sm-thumb-size: 0.75rem;
  --frame-switch-radius: 999px;
  --frame-switch-bg: var(--frame-input);
  --frame-switch-hover-bg: color-mix(in srgb, var(--frame-input) 82%, var(--frame-foreground));
  --frame-switch-checked-bg: var(--frame-primary);
  --frame-switch-checked-hover-bg: color-mix(in srgb, var(--frame-primary) 88%, var(--frame-foreground));
  --frame-switch-thumb-bg: var(--frame-background);
  --frame-switch-thumb-shadow: 0 1px 2px rgb(0 0 0 / 0.22);
  --frame-switch-border-shadow: inset 0 0 0 1px color-mix(in srgb, var(--frame-border) 70%, transparent);
  --frame-switch-checked-border-shadow: inset 0 0 0 1px color-mix(in srgb, var(--frame-primary) 80%, var(--frame-border));
  --frame-switch-focus-shadow: 0 0 0 3px color-mix(in srgb, var(--frame-ring) 28%, transparent);
  --frame-switch-invalid-border: color-mix(in srgb, var(--frame-destructive) 65%, var(--frame-border));
  --frame-switch-invalid-shadow: inset 0 0 0 1px color-mix(in srgb, var(--frame-destructive) 40%, transparent), 0 0 0 3px color-mix(in srgb, var(--frame-destructive) 14%, transparent);
  --frame-switch-disabled-opacity: 0.5;
  --frame-switch-transition-duration: 160ms;
  --frame-switch-transition-easing: cubic-bezier(0.16, 1, 0.3, 1);
  `,
};

