import { ComponentDoc } from '../../shared/models/component-doc.model';
import { AlertPreviewConfig, DocsAlertPreviewComponent } from './previews/alert-preview';

const alertImportsCode = `import { FrAlertModule } from '@frame-ui-ng/components/alert';`;

const heroConfig: AlertPreviewConfig = {
  className: 'grid w-full max-w-2xl gap-4',
  items: [
    {
      icon: 'tablerInfoCircle',
      variant: 'info',
      title: 'Scheduled maintenance tonight',
      description:
        'Dashboard exports will be briefly unavailable from 23:00 to 23:30 while reporting infrastructure is upgraded.',
    },
  ],
};

const basicConfig: AlertPreviewConfig = {
  className: 'grid w-full max-w-2xl gap-4',
  items: [
    {
      icon: 'tablerInfoCircle',
      title: 'Heads up',
      description:
        'Use alerts for important context, status changes, or system guidance that should remain visible near the related workflow.',
    },
  ],
};

const variantsConfig: AlertPreviewConfig = {
  className: 'grid w-full max-w-2xl gap-4',
  items: [
    {
      icon: 'tablerInfoCircle',
      variant: 'info',
      title: 'Information',
      description:
        'Share neutral system context, rollout notes, or guidance before someone makes a decision.',
    },
    {
      icon: 'tablerCheck',
      variant: 'success',
      title: 'Success',
      description:
        'Confirm completed work, successful submissions, or background jobs that finished as expected.',
    },
    {
      icon: 'tablerExclamationCircle',
      variant: 'danger',
      title: 'Caution',
      description:
        'Warn about risky steps, incomplete setup, or edge cases that deserve extra attention.',
    },
    {
      icon: 'tablerX',
      variant: 'destructive',
      title: 'Destructive',
      description:
        'Call out permanent loss, failed operations, or urgent states that need immediate action.',
    },
  ],
};

const richContentConfig: AlertPreviewConfig = {
  className: 'grid w-full max-w-2xl gap-4',
  items: [
    {
      icon: 'tablerInfoCircle',
      variant: 'danger',
      title: 'Payment verification needed',
      description:
        'This workspace cannot invite new members until the billing contact confirms the updated card details.',
      meta: 'Remind owners before the renewal date to avoid access interruptions.',
    },
  ],
};

const inspectorConfig: AlertPreviewConfig = {
  className: 'grid w-full max-w-2xl gap-4',
  items: [
    {
      icon: 'tablerInfoCircle',
      variant: 'danger',
      title: 'Action required',
      description:
        'Review the validation summary before publishing so missing data does not reach production.',
    },
  ],
};

const customStylingConfig: AlertPreviewConfig = {
  className: 'grid w-full max-w-2xl gap-4',
  style: `--frame-alert-root-bg: color-mix(in srgb, var(--frame-primary) 9%, var(--frame-surface));
--frame-alert-root-border: color-mix(in srgb, var(--frame-primary) 24%, transparent);
--frame-alert-root-radius: var(--frame-radius-lg);
--frame-alert-root-padding-y: 1.125rem;
--frame-alert-root-padding-x: 1.125rem;
--frame-alert-root-gap: 0.875rem;
--frame-alert-root-icon-size: 1.25rem;
--frame-alert-title-font-size: 1rem;
--frame-alert-description-color: color-mix(in srgb, var(--frame-primary) 44%, var(--frame-muted-foreground));`,
  items: [
    {
      icon: 'tablerInfoCircle',
      variant: 'info',
      title: 'Release notes available',
      description:
        'Highlight launch details with a softer branded surface while keeping the core alert structure intact.',
    },
  ],
};

export const ALERT_DOC: ComponentDoc = {
  slug: 'alert',
  breadcrumb: 'Components / Alert',

  hero: {
    id: 'alert-hero',
    title: 'Preview',
    preview: {
      component: DocsAlertPreviewComponent,
      inputs: {
        config: heroConfig,
      },
    },
  },

  installation: {
    cli: {
      language: 'bash',
      code: 'npx your-cli add alert',
    },
    manual: {
      steps: [
        {
          title: 'Import the alert primitives into your component.',
          code: {
            language: 'ts',
            code: `import { FrAlertModule } from '@frame-ui-ng/components/alert';`,
          },
        },
      ],
    },
  },

  usage: [
    {
      language: 'ts',
      code: alertImportsCode,
    },
    {
      language: 'html',
      code: `<section frAlert [variant]="'info'">
  <ng-icon frAlertIcon name="tablerInfoCircle" />
  <h3 frAlertTitle>Scheduled maintenance tonight</h3>
  <p frAlertDescription>
    Dashboard exports will be briefly unavailable from 23:00 to 23:30 while reporting infrastructure is upgraded.
  </p>
</section>`,
    },
  ],

  tokenInspector: {
    id: 'token-inspector',
    title: 'Token inspector',
    description:
      'Hover the icon, container, title, or description to inspect which alert tokens define spacing, type, and semantic surfaces. Click a region to pin the inspector while you review the current values.',
    preview: {
      component: DocsAlertPreviewComponent,
      containerClass: 'block',
      inputs: {
        config: inspectorConfig,
      },
      inspectorTargets: [
        {
          id: 'container',
          label: 'Alert container',
          selector: '[data-token-target="container"]',
          description:
            'The alert shell controls layout, radius, padding, and the semantic variant surfaces used for status messaging.',
          tokens: [
            '--frame-alert-root-bg',
            '--frame-alert-root-border',
            '--frame-alert-root-color',
            '--frame-alert-root-radius',
            '--frame-alert-root-padding-y',
            '--frame-alert-root-padding-x',
            '--frame-alert-root-gap',
            '--frame-alert-root-danger-bg',
            '--frame-alert-root-danger-border',
            '--frame-alert-root-danger-color',
          ],
        },
        {
          id: 'icon',
          label: 'Leading icon',
          selector: '[data-token-target="icon"]',
          description:
            'The optional FrAlertIcon primitive is sized through the alert icon token and aligned to the title row.',
          tokens: ['--frame-alert-root-icon-size'],
        },
        {
          id: 'title',
          label: 'Alert title',
          selector: '[data-token-target="title"]',
          description:
            'Titles carry the strongest emphasis in the alert and use dedicated typography tokens.',
          tokens: ['--frame-alert-title-font-size', '--frame-alert-title-font-weight'],
        },
        {
          id: 'description',
          label: 'Alert description',
          selector: '[data-token-target="description"]',
          description:
            'Description text uses its own color and reading rhythm so supporting context stays legible without overpowering the title.',
          tokens: [
            '--frame-alert-description-color',
            '--frame-alert-description-font-size',
            '--frame-alert-description-line-height',
          ],
        },
      ],
    },
  },

  styling: {
    description:
      'Override alert tokens on a wrapper when a specific workflow needs a branded surface or denser spacing, while leaving the base component API unchanged.',
    preview: {
      id: 'custom-styling-preview',
      title: 'Custom Styling Preview',
      description:
        'This preview applies local token overrides to adjust the alert surface, spacing, icon size, and supporting text color.',
      preview: {
        component: DocsAlertPreviewComponent,
        inputs: {
          config: customStylingConfig,
        },
      },
      code: [
        {
          language: 'ts',
          code: alertImportsCode,
        },
        {
          language: 'html',
          code: `<div class="release-alert">
  <section frAlert [variant]="'info'">
    <ng-icon frAlertIcon name="tablerInfoCircle" />
    <h3 frAlertTitle>Release notes available</h3>
    <p frAlertDescription>
      Highlight launch details with a softer branded surface while keeping the core alert structure intact.
    </p>
  </section>
</div>`,
        },
        {
          language: 'css',
          code: `.release-alert {
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
      description:
        'A straightforward informational alert with a title, description, and leading icon.',
      preview: {
        component: DocsAlertPreviewComponent,
        inputs: {
          config: basicConfig,
        },
      },
      code: [
        {
          language: 'ts',
          code: alertImportsCode,
        },
        {
          language: 'html',
          code: `<section frAlert>
  <ng-icon frAlertIcon name="tablerInfoCircle" />
  <h3 frAlertTitle>Heads up</h3>
  <p frAlertDescription>
    Use alerts for important context, status changes, or system guidance that should remain visible near the related workflow.
  </p>
</section>`,
        },
      ],
    },
    {
      id: 'variants',
      title: 'Variants',
      description:
        'Switch the variant input to match the tone of the message, from neutral guidance to confirmation, caution, or destructive states.',
      preview: {
        component: DocsAlertPreviewComponent,
        inputs: {
          config: variantsConfig,
        },
      },
      code: [
        {
          language: 'ts',
          code: alertImportsCode,
        },
        {
          language: 'html',
          code: `<section frAlert [variant]="'info'">
  <ng-icon frAlertIcon name="tablerInfoCircle" />
  <h3 frAlertTitle>Information</h3>
  <p frAlertDescription>Share neutral system context before someone makes a decision.</p>
</section>

<section frAlert [variant]="'success'">
  <ng-icon frAlertIcon name="tablerCheck" />
  <h3 frAlertTitle>Success</h3>
  <p frAlertDescription>Confirm completed work or successful submissions.</p>
</section>

<section frAlert [variant]="'danger'">
  <ng-icon frAlertIcon name="tablerExclamationCircle" />
  <h3 frAlertTitle>Caution</h3>
  <p frAlertDescription>Warn about risky steps or incomplete setup.</p>
</section>

<section frAlert [variant]="'destructive'">
  <ng-icon frAlertIcon name="tablerX" />
  <h3 frAlertTitle>Destructive</h3>
  <p frAlertDescription>Call out failed operations or permanent loss.</p>
</section>`,
        },
      ],
    },
    {
      id: 'rich-content',
      title: 'Supporting content',
      description:
        'Additional non-title content stays in the message column, which makes room for short follow-up guidance beneath the main description.',
      preview: {
        component: DocsAlertPreviewComponent,
        inputs: {
          config: richContentConfig,
        },
      },
      code: [
        {
          language: 'ts',
          code: alertImportsCode,
        },
        {
          language: 'html',
          code: `<section frAlert [variant]="'danger'">
  <ng-icon frAlertIcon name="tablerExclamationCircle" />
  <h3 frAlertTitle>Payment verification needed</h3>
  <p frAlertDescription>
    This workspace cannot invite new members until the billing contact confirms the updated card details.
  </p>
  <p class="mt-3 text-sm text-muted-foreground">
    Remind owners before the renewal date to avoid access interruptions.
  </p>
</section>`,
        },
      ],
    },
  ],

  tokensTitle: 'Design Tokens',
  tokensDescription:
    'Use these CSS custom properties to tune alert surfaces, spacing, icon sizing, semantic variants, and text styles without changing the markup structure.',
  tokens: `
  --frame-alert-root-bg: var(--frame-surface);
  --frame-alert-root-border: var(--frame-border);
  --frame-alert-root-color: var(--frame-surface-foreground);
  --frame-alert-root-radius: var(--frame-radius-md);
  --frame-alert-root-padding-y: 1rem;
  --frame-alert-root-padding-x: 1rem;
  --frame-alert-root-gap: 0.75rem;
  --frame-alert-root-icon-size: 1rem;
  --frame-alert-root-shadow: none;
  --frame-alert-root-destructive-bg: color-mix(in srgb, var(--frame-destructive) 10%, var(--frame-surface));
  --frame-alert-root-destructive-border: color-mix(in srgb, var(--frame-destructive) 28%, var(--frame-border));
  --frame-alert-root-destructive-color: var(--frame-surface-foreground);
  --frame-alert-root-success-bg: color-mix(in srgb, var(--frame-success) 10%, var(--frame-surface));
  --frame-alert-root-success-border: color-mix(in srgb, var(--frame-success) 28%, var(--frame-border));
  --frame-alert-root-success-color: var(--frame-surface-foreground);
  --frame-alert-root-danger-bg: color-mix(in srgb, var(--frame-warning) 10%, var(--frame-surface));
  --frame-alert-root-danger-border: color-mix(in srgb, var(--frame-warning) 30%, var(--frame-border));
  --frame-alert-root-danger-color: var(--frame-surface-foreground);
  --frame-alert-root-info-bg: color-mix(in srgb, var(--frame-info) 10%, var(--frame-surface));
  --frame-alert-root-info-border: color-mix(in srgb, var(--frame-info) 28%, var(--frame-border));
  --frame-alert-root-info-color: var(--frame-surface-foreground);
  --frame-alert-title-font-size: 0.9375rem;
  --frame-alert-title-font-weight: 600;
  --frame-alert-description-color: var(--frame-muted-foreground);
  --frame-alert-description-font-size: 0.875rem;
  --frame-alert-description-line-height: 1.5;
  `,
};

