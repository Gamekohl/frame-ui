import { ComponentDoc } from '../../shared/models/component-doc.model';
import { ButtonPreviewConfig, DocsButtonPreviewComponent } from './previews/button-preview';

const buttonImportsCode = `import { FrButtonModule } from '@frame-ui/components/button';
import { FrSpinnerModule } from '@frame-ui/components/spinner';`;

const heroConfig: ButtonPreviewConfig = {
  className: 'flex flex-wrap items-center gap-3',
  items: [
    { label: 'Save changes', icon: 'tablerPlus', appearance: 'primary' },
    { label: 'Preview', appearance: 'outline' },
    { label: 'Dismiss', appearance: 'ghost' },
    { icon: 'tablerPlus', iconButton: true, appearance: 'outline', ariaLabel: 'Add item' },
  ],
};

const basicConfig: ButtonPreviewConfig = {
  items: [{ label: 'Continue', appearance: 'primary' }],
};

const appearancesConfig: ButtonPreviewConfig = {
  items: [
    { label: 'Primary', appearance: 'primary' },
    { label: 'Outline', appearance: 'outline' },
    { label: 'Ghost', appearance: 'ghost' },
  ],
};

const sizesConfig: ButtonPreviewConfig = {
  items: [
    { label: 'Small', size: 'sm', appearance: 'primary' },
    { label: 'Medium', size: 'md', appearance: 'primary' },
    { label: 'Large', size: 'lg', appearance: 'primary' },
  ],
};

const radiusConfig: ButtonPreviewConfig = {
  items: [
    { label: 'None', radius: 'none', appearance: 'outline' },
    { label: 'Small', radius: 'sm', appearance: 'outline' },
    { label: 'Medium', radius: 'md', appearance: 'outline' },
    { label: 'Large', radius: 'lg', appearance: 'outline' },
    { label: 'Full', radius: 'full', appearance: 'outline' },
  ],
};

const loadingConfig: ButtonPreviewConfig = {
  items: [
    {
      label: 'Saving',
      loading: true,
      loadingDisplay: 'inline',
      loadingLabel: 'Saving',
      appearance: 'primary',
      icon: 'tablerPlus',
    },
    {
      label: 'Publishing',
      loading: true,
      loadingDisplay: 'replace',
      loadingLabel: 'Publishing',
      appearance: 'outline',
      icon: 'tablerPlus',
    },
  ],
};

const linkConfig: ButtonPreviewConfig = {
  items: [
    { label: 'Open docs', href: '#', appearance: 'primary', icon: 'tablerArrowRight' },
    { label: 'Read details', href: '#', appearance: 'ghost' },
  ],
};

const iconButtonConfig: ButtonPreviewConfig = {
  items: [
    { icon: 'tablerPlus', iconButton: true, appearance: 'primary', ariaLabel: 'Add item' },
    { icon: 'tablerArrowRight', iconButton: true, appearance: 'outline', size: 'sm', ariaLabel: 'Next step' },
    { icon: 'tablerX', iconButton: true, appearance: 'ghost', size: 'lg', ariaLabel: 'Close dialog' },
  ],
};

const inspectorConfig: ButtonPreviewConfig = {
  items: [
    {
      label: 'Publishing',
      icon: 'tablerPlus',
      appearance: 'outline',
      size: 'lg',
      loading: true,
      loadingDisplay: 'inline',
      loadingLabel: 'Publishing',
      tokenPrefix: 'button',
    }
  ],
};

const customStylingConfig: ButtonPreviewConfig = {
  className: 'flex flex-wrap items-center gap-3',
  style: `--frame-button-root-height: 2.75rem;
--frame-button-root-padding-x: 1.25rem;
--frame-button-root-radius: 1rem;
--frame-button-root-font-size: 0.9375rem;
--frame-button-root-gap: 0.625rem;
  --frame-button-root-bg: color-mix(in srgb, var(--frame-primary) 90%, black);
--frame-button-root-color: var(--frame-primary-foreground);
  --frame-button-root-hover-filter: brightness(1.01);
  --frame-button-icon-size: 1.125rem;
  --frame-spinner-size: 1.125rem;`,
  items: [
    { label: 'Create release', icon: 'tablerPlus', appearance: 'primary' },
    { label: 'Open checklist', appearance: 'outline' },
  ],
};

export const BUTTON_DOC: ComponentDoc = {
  slug: 'button',
  breadcrumb: 'Components / Button',

  hero: {
    id: 'button-hero',
    title: 'Preview',
    preview: {
      component: DocsButtonPreviewComponent,
      inputs: {
        config: heroConfig,
      },
    },
  },

  installation: {
    cli: {
      language: 'bash',
      code: 'npx your-cli add button',
    },
    manual: {
      steps: [
        {
          title: 'Import the button primitives your template needs.',
          code: {
            language: 'ts',
            code: `import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { FrButtonModule } from '@frame-ui/components/button';
import { FrSpinnerModule } from '@frame-ui/components/spinner';`,
          },
        },
        {
          title: 'Register the tabler icons used by your buttons.',
          code: {
            language: 'ts',
            code: `import { tablerArrowRight, tablerPlus, tablerX } from '@ng-icons/tabler-icons';

viewProviders: [provideIcons({ tablerPlus, tablerArrowRight, tablerX })]`,
          },
        },
      ],
    },
  },

  usage: [
    {
      language: 'ts',
      code: buttonImportsCode,
    },
    {
      language: 'html',
      code: `<button frButton type="button">
  <span frButtonIcon>
    <ng-icon name="tablerPlus" size="16" />
  </span>
  <span frButtonLabel>Save changes</span>
</button>`,
    },
  ],

  tokenInspector: {
    id: 'token-inspector',
    title: 'Token inspector',
    description:
      'Hover the button shell, icon, label, or loading indicator to inspect the tokens that control spacing, height, radius, icon sizing, and loading treatment. Click a region to pin the inspector while you review the current values.',
    preview: {
      component: DocsButtonPreviewComponent,
      containerClass: 'block',
      inputs: {
        config: inspectorConfig,
      },
      inspectorTargets: [
        {
          id: 'root',
          label: 'Button shell',
          selector: '[data-token-target="button-root"]',
          description:
            'The root token set defines the button height, padding, typography, radius, and interactive treatment used across appearances.',
          tokens: [
            '--frame-button-root-gap',
            '--frame-button-root-height',
            '--frame-button-root-padding-x',
            '--frame-button-root-radius',
            '--frame-button-root-font-size',
            '--frame-button-root-font-weight',
            '--frame-button-root-bg',
            '--frame-button-root-color',
            '--frame-button-root-hover-filter',
            '--frame-button-root-active-filter',
            '--frame-button-root-disabled-opacity',
          ],
        },
        {
          id: 'icon',
          label: 'Button icon',
          selector: '[data-token-target="button-icon"]',
          description:
            'Icons scale through their own token and adjust automatically with the button size presets.',
          tokens: ['--frame-button-icon-size', '--frame-button-root-gap'],
        },
        {
          id: 'label',
          label: 'Button label',
          selector: '[data-token-target="button-label"]',
          description:
            'The label inherits the root typography while allowing a separate label weight token when needed.',
          tokens: [
            '--frame-button-root-font-size',
            '--frame-button-root-font-weight',
            '--frame-button-label-weight',
          ],
        },
        {
          id: 'loading',
          label: 'Loading indicator',
          selector: '[data-token-target="button-loading"]',
          description:
            'The loading slot can host FrSpinner, so shared spinner tokens drive custom loading indicators across button modes.',
          tokens: [
            '--frame-spinner-size',
            '--frame-spinner-stroke',
            '--frame-spinner-track-color',
            '--frame-spinner-indicator-color',
            '--frame-spinner-duration',
          ],
        },
      ],
    },
  },

  styling: {
    description:
      'Override button tokens on a local wrapper when a product area needs a different height, radius, or visual density while keeping the same button API and behavior.',
    preview: {
      id: 'custom-styling-preview',
      title: 'Custom Styling Preview',
      description:
        'This preview applies local token overrides to adjust height, radius, icon scale, and the filled button surface.',
      preview: {
        component: DocsButtonPreviewComponent,
        inputs: {
          config: customStylingConfig,
        },
      },
      code: [
        {
          language: 'ts',
          code: buttonImportsCode,
        },
        {
          language: 'html',
          code: `<div class="release-actions">
  <button frButton type="button">
    <span frButtonIcon>
      <ng-icon name="tablerPlus" size="16" />
    </span>
    <span frButtonLabel>Create release</span>
  </button>

  <button frButton appearance="outline" type="button">
    <span frButtonLabel>Open checklist</span>
  </button>
</div>`,
        },
        {
          language: 'css',
          code: `.release-actions {
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
      description: 'Use the primary button for the main action in a section or flow.',
      preview: {
        component: DocsButtonPreviewComponent,
        inputs: {
          config: basicConfig,
        },
      },
      code: [
        {
          language: 'ts',
          code: buttonImportsCode,
        },
        {
          language: 'html',
          code: `<button frButton type="button">
  <span frButtonLabel>Continue</span>
</button>`,
        },
      ],
    },
    {
      id: 'appearances',
      title: 'Appearances',
      description:
        'Switch appearances to control emphasis, from the filled primary action to lighter outline and ghost affordances.',
      preview: {
        component: DocsButtonPreviewComponent,
        inputs: {
          config: appearancesConfig,
        },
      },
      code: [
        {
          language: 'ts',
          code: buttonImportsCode,
        },
        {
          language: 'html',
          code: `<button frButton appearance="primary" type="button">Primary</button>
<button frButton appearance="outline" type="button">Outline</button>
<button frButton appearance="ghost" type="button">Ghost</button>`,
        },
      ],
    },
    {
      id: 'sizes',
      title: 'Sizes',
      description:
        'Use `sm`, `md`, and `lg` to match dense toolbars, default forms, or more prominent page-level actions.',
      preview: {
        component: DocsButtonPreviewComponent,
        inputs: {
          config: sizesConfig,
        },
      },
      code: [
        {
          language: 'ts',
          code: buttonImportsCode,
        },
        {
          language: 'html',
          code: `<button frButton size="sm" type="button">Small</button>
<button frButton size="md" type="button">Medium</button>
<button frButton size="lg" type="button">Large</button>`,
        },
      ],
    },
    {
      id: 'radii',
      title: 'Radius options',
      description:
        'Use radius presets when a button should feel more squared, softly rounded, or fully pill-shaped.',
      preview: {
        component: DocsButtonPreviewComponent,
        inputs: {
          config: radiusConfig,
        },
      },
      code: [
        {
          language: 'ts',
          code: buttonImportsCode,
        },
        {
          language: 'html',
          code: `<button frButton radius="none" appearance="outline" type="button">None</button>
<button frButton radius="sm" appearance="outline" type="button">Small</button>
<button frButton radius="md" appearance="outline" type="button">Medium</button>
<button frButton radius="lg" appearance="outline" type="button">Large</button>
<button frButton radius="full" appearance="outline" type="button">Full</button>`,
        },
      ],
    },
    {
      id: 'loading',
      title: 'Loading states',
      description:
        'Buttons can replace their content with a shared Spinner primitive or keep the label visible and show loading inline, depending on how much continuity the action needs.',
      preview: {
        component: DocsButtonPreviewComponent,
        inputs: {
          config: loadingConfig,
        },
      },
      code: [
        {
          language: 'ts',
          code: buttonImportsCode,
        },
        {
          language: 'html',
          code: `<button frButton [loading]="true" type="button">
  <span frButtonIcon>
    <ng-icon name="tablerPlus" size="16" />
  </span>
  <span frButtonLabel>Saving</span>
  <span frSpinner size="sm"></span>
</button>

<button frButton appearance="outline" [loading]="true" loadingDisplay="inline" type="button">
  <span frButtonIcon>
    <ng-icon name="tablerPlus" size="16" />
  </span>
  <span frButtonLabel>Publishing</span>
  <span frSpinner size="sm"></span>
</button>`,
        },
      ],
    },
    {
      id: 'icon-button',
      title: 'Icon buttons',
      description:
        'Use `FrIconButton` for compact icon-only actions and always provide an accessible label because there is no visible text label.',
      preview: {
        component: DocsButtonPreviewComponent,
        inputs: {
          config: iconButtonConfig,
        },
      },
      code: [
        {
          language: 'ts',
          code: buttonImportsCode,
        },
        {
          language: 'html',
          code: `<button frIconButton aria-label="Add item" type="button">
  <span frButtonIcon>
    <ng-icon name="tablerPlus" size="16" />
  </span>
</button>

<button frIconButton appearance="outline" size="sm" aria-label="Next step" type="button">
  <span frButtonIcon>
    <ng-icon name="tablerArrowRight" size="16" />
  </span>
</button>`,
        },
      ],
    },
    {
      id: 'links',
      title: 'Anchor hosts',
      description:
        'Buttons can be rendered on anchors when the interaction is true navigation but still needs button styling.',
      preview: {
        component: DocsButtonPreviewComponent,
        inputs: {
          config: linkConfig,
        },
      },
      code: [
        {
          language: 'ts',
          code: buttonImportsCode,
        },
        {
          language: 'html',
          code: `<a frButton href="#" type="button">
  <span frButtonIcon>
    <ng-icon name="tablerArrowRight" size="16" />
  </span>
  <span frButtonLabel>Open docs</span>
</a>

<a frButton href="#" appearance="ghost">
  <span frButtonLabel>Read details</span>
</a>`,
        },
      ],
    },
  ],

  tokensTitle: 'Design Tokens',
  tokensDescription:
    'Use these CSS custom properties to tune button height, spacing, icon sizing, loading indicators, and interaction states without changing the markup structure.',
  tokens: `
  --frame-button-root-gap: 0.5rem;
  --frame-button-root-height: 2.25rem;
  --frame-button-root-padding-x: 1rem;
  --frame-button-root-radius: var(--frame-radius-md);
  --frame-button-root-shadow: var(--frame-shadow-sm);
  --frame-button-root-font-size: 0.875rem;
  --frame-button-root-font-weight: 600;
  --frame-button-root-ring-color: var(--frame-ring);
  --frame-button-root-focus-shadow: var(--frame-button-root-shadow), 0 0 0 3px color-mix(in srgb, var(--frame-button-root-ring-color) 35%, transparent);
  --frame-button-root-hover-filter: brightness(0.98);
  --frame-button-root-active-filter: brightness(0.96);
  --frame-button-root-disabled-opacity: 0.55;
  --frame-button-root-disabled-shadow: none;
  --frame-button-loading-size: 1rem;
  --frame-button-loading-stroke: 2px;
  --frame-button-loading-track: color-mix(in srgb, currentColor 24%, transparent);
  --frame-spinner-size: 1rem;
  --frame-spinner-stroke: 2px;
  --frame-spinner-track-color: color-mix(in srgb, currentColor 24%, transparent);
  --frame-spinner-indicator-color: currentColor;
  --frame-button-icon-size: 1rem;
  --frame-button-label-weight: inherit;
  `,
};

