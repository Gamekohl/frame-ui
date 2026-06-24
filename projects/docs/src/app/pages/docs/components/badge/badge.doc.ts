import { ComponentDoc } from '../../shared/models/component-doc.model';
import { BadgePreviewConfig, DocsBadgePreviewComponent } from './previews/badge-preview';

const badgeImportsCode = `import { FrBadgeModule } from '@frame-ui-ng/components/badge';
import { FrSpinnerModule } from '@frame-ui-ng/components/spinner';`;

const heroConfig: BadgePreviewConfig = {
  className: 'flex flex-wrap items-center gap-3',
  items: [
    { label: 'Stable', variant: 'default' },
    { label: 'Ready', variant: 'success' },
    { label: 'Internal', variant: 'secondary' },
    { label: 'Requires review', variant: 'outline' },
    { label: 'Open docs', variant: 'link', href: '#' },
  ],
};

const basicConfig: BadgePreviewConfig = {
  items: [{ label: 'New' }],
};

const variantsConfig: BadgePreviewConfig = {
  items: [
    { label: 'Default', variant: 'default' },
    { label: 'Secondary', variant: 'secondary' },
    { label: 'Success', variant: 'success' },
    { label: 'Destructive', variant: 'destructive' },
    { label: 'Outline', variant: 'outline' },
    { label: 'Ghost', variant: 'ghost' },
    { label: 'Link', variant: 'link', href: '#' },
  ],
};

const iconConfig: BadgePreviewConfig = {
  items: [
    { label: 'Beta', variant: 'secondary', icon: 'tablerPlus', iconPosition: 'inline-start' },
    { label: 'Export', variant: 'outline', icon: 'tablerArrowRight', iconPosition: 'inline-end' },
  ],
};

const spinnerConfig: BadgePreviewConfig = {
  items: [
    { label: 'Syncing', variant: 'secondary', spinner: true, spinnerPosition: 'inline-start' },
    { label: 'Publishing', variant: 'default', spinner: true, spinnerPosition: 'inline-end' },
  ],
};

const linkConfig: BadgePreviewConfig = {
  items: [
    {
      label: 'Open release notes',
      variant: 'link',
      href: '#',
      icon: 'tablerArrowUpRight',
      iconPosition: 'inline-end',
    },
  ],
};

const inspectorConfig: BadgePreviewConfig = {
  items: [
    {
      label: 'Publishing',
      variant: 'outline',
      icon: 'tablerPlus',
      iconPosition: 'inline-start',
      spinner: true,
      spinnerPosition: 'inline-end',
      tokenPrefix: 'badge',
    },
  ],
};

const customStylingConfig: BadgePreviewConfig = {
  className: 'flex flex-wrap items-center gap-3',
  style: `--frame-badge-root-gap: 0.375rem;
--frame-badge-root-min-height: 1.5rem;
--frame-badge-root-radius: 0.75rem;
--frame-badge-root-font-size: 0.8125rem;
--frame-badge-root-bg: green;
--frame-badge-root-color: white;
--frame-badge-root-padding-inline: 0.75rem;
--frame-badge-icon-size: 0.625rem;
--frame-spinner-size: 0.625rem;
--frame-badge-root-focus-shadow: 0 0 0 3px color-mix(in srgb, var(--frame-primary) 24%, transparent);`,
  items: [
    { label: 'Team owned', icon: 'tablerPoint', iconPosition: 'inline-start' },
    { label: 'Shipped', icon: 'tablerArrowRight', iconPosition: 'inline-end' },
  ],
};

export const BADGE_DOC: ComponentDoc = {
  slug: 'badge',
  breadcrumb: 'Components / Badge',

  hero: {
    id: 'badge-hero',
    title: 'Preview',
    preview: {
      component: DocsBadgePreviewComponent,
      inputs: {
        config: heroConfig,
      },
    },
  },

  installation: {
    cli: {
      language: 'bash',
      code: 'npx your-cli add badge',
    },
    manual: {
      steps: [
        {
          title: 'Import the badge primitives your template needs.',
          code: {
            language: 'ts',
            code: `import { FrBadgeModule } from '@frame-ui-ng/components/badge';`,
          },
        },
      ],
    },
  },

  usage: [
    {
      language: 'ts',
      code: badgeImportsCode,
    },
    {
      language: 'html',
      code: `<a frBadge href="/docs" variant="link">
  <ng-icon frBadgeIcon position="inline-start" name="tablerPlus" />
  <span frBadgeLabel>Open docs</span>
  <span frSpinner size="xs"></span>
</a>`,
    },
  ],

  tokenInspector: {
    id: 'token-inspector',
    title: 'Token inspector',
    description:
      'Hover the badge shell, icon, label, or spinner to inspect the tokens that control spacing, sizing, focus treatment, and loading affordances. Click a region to pin the inspector while you review the current values.',
    preview: {
      component: DocsBadgePreviewComponent,
      containerClass: 'block',
      inputs: {
        config: inspectorConfig,
      },
      inspectorTargets: [
        {
          id: 'root',
          label: 'Badge shell',
          selector: '[data-token-target="badge-root"]',
          description:
            'The root badge tokens define spacing, height, radius, typography, and focus treatment across all variants.',
          tokens: [
            '--frame-badge-root-gap',
            '--frame-badge-root-min-height',
            '--frame-badge-root-radius',
            '--frame-badge-root-font-size',
            '--frame-badge-root-font-weight',
            '--frame-badge-root-bg',
            '--frame-badge-root-color',
            '--frame-badge-success-bg',
            '--frame-badge-success-border',
            '--frame-badge-success-color',
            '--frame-badge-root-padding-block',
            '--frame-badge-root-padding-inline',
            '--frame-badge-root-focus-shadow',
            '--frame-badge-root-transition-duration',
          ],
        },
        {
          id: 'icon',
          label: 'Leading icon',
          selector: '[data-token-target="badge-icon"]',
          description:
            'Icons use their own size token plus an offset token to stay visually aligned with the pill padding.',
          tokens: ['--frame-badge-icon-size', '--frame-badge-icon-offset'],
        },
        {
          id: 'label',
          label: 'Badge label',
          selector: '[data-token-target="badge-label"]',
          description:
            'The label inherits the root typography and flexes with the badge content width.',
          tokens: ['--frame-badge-root-font-size', '--frame-badge-root-font-weight'],
        },
        {
          id: 'spinner',
          label: 'Spinner',
          selector: '[data-token-target="badge-spinner"]',
          description:
            'Badge spinners compose FrSpinner, so shared spinner tokens control size, stroke, color, and animation speed for inline loading states.',
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
      'Override badge tokens on a local wrapper when a product area needs denser spacing, a different radius, or adjusted icon sizing while keeping the same badge markup.',
    preview: {
      id: 'custom-styling-preview',
      title: 'Custom Styling Preview',
      description:
        'This preview applies local token overrides to adjust the badge shape, horizontal rhythm, and icon sizing.',
      preview: {
        component: DocsBadgePreviewComponent,
        inputs: {
          config: customStylingConfig,
        },
      },
      code: [
        {
          language: 'ts',
          code: badgeImportsCode,
        },
        {
          language: 'html',
          code: `<div class="project-badges">
  <span frBadge>
    <ng-icon frBadgeIcon position="inline-start" name="tablerPoint" />
    <span frBadgeLabel>Team owned</span> 
  </span>

  <span frBadge>
    <span frBadgeLabel>Shipped</span>
    <ng-icon frBadgeIcon position="inline-end" name="tablerArrowRight" />
  </span>
</div>`,
        },
        {
          language: 'css',
          code: `.project-badges {
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
        'Use the default badge for compact state labels, tags, or lightweight status chips.',
      preview: {
        component: DocsBadgePreviewComponent,
        inputs: {
          config: basicConfig,
        },
      },
      code: [
        {
          language: 'ts',
          code: badgeImportsCode,
        },
        {
          language: 'html',
          code: `<span frBadge>New</span>`,
        },
      ],
    },
    {
      id: 'variants',
      title: 'Variants',
      description:
        'Switch the variant to match the amount of emphasis you want, from filled badges to outline, ghost, and link-like treatments.',
      preview: {
        component: DocsBadgePreviewComponent,
        inputs: {
          config: variantsConfig,
        },
      },
      code: [
        {
          language: 'ts',
          code: badgeImportsCode,
        },
        {
          language: 'html',
          code: `<span frBadge>Default</span>
<span frBadge variant="secondary">Secondary</span>
<span frBadge variant="success">Success</span>
<span frBadge variant="destructive">Destructive</span>
<span frBadge variant="outline">Outline</span>
<span frBadge variant="ghost">Ghost</span>
<a frBadge variant="link">Link</a>`,
        },
      ],
    },
    {
      id: 'icons',
      title: 'Icons',
      description:
        'Use leading or trailing icons when the badge needs directional meaning, category cues, or a stronger visual hook.',
      preview: {
        component: DocsBadgePreviewComponent,
        inputs: {
          config: iconConfig,
        },
      },
      code: [
        {
          language: 'ts',
          code: badgeImportsCode,
        },
        {
          language: 'html',
          code: `<span frBadge variant="secondary">
  <ng-icon frBadgeIcon position="inline-start" name="tablerPlus" />
  <span frBadgeLabel>Beta</span>
</span>

<span frBadge variant="outline">
  <span frBadgeLabel>Export</span>
<ng-icon frBadgeIcon position="inline-end" name="tablerArrowRight" />`,
        },
      ],
    },
    {
      id: 'spinners',
      title: 'Loading states',
      description:
        'Inline spinners work well for optimistic mutations, background sync, or short-lived publishing states and share the same token contract as the Spinner component.',
      preview: {
        component: DocsBadgePreviewComponent,
        inputs: {
          config: spinnerConfig,
        },
      },
      code: [
        {
          language: 'ts',
          code: badgeImportsCode,
        },
        {
          language: 'html',
          code: `<span frBadge variant="secondary">
  <span frSpinner size="xs"></span>
  <span frBadgeLabel>Syncing</span>
</span>

<span frBadge>
  <span frBadgeLabel>Publishing</span>
  <span frSpinner size="xs"></span>
</span>`,
        },
      ],
    },
    {
      id: 'links',
      title: 'Links',
      description:
        'Use the link variant on anchor hosts when a badge should behave more like compact inline navigation than a filled status pill.',
      preview: {
        component: DocsBadgePreviewComponent,
        inputs: {
          config: linkConfig,
        },
      },
      code: [
        {
          language: 'ts',
          code: badgeImportsCode,
        },
        {
          language: 'html',
          code: `<a frBadge variant="link">
  <span frBadgeLabel>Open release notes</span>
  <ng-icon frBadgeIcon position="inline-end" name="tablerArrowUpRight" />
</a>`,
        },
      ],
    },
  ],

  tokensTitle: 'Design Tokens',
  tokensDescription:
    'Use these CSS custom properties to tune badge spacing, pill sizing, focus treatment, icon offsets, and the shared spinner behavior without changing the component structure.',
  tokens: `
  --frame-badge-root-gap: 0.25rem;
  --frame-badge-root-min-height: 1.375rem;
  --frame-badge-root-radius: var(--frame-radius-sm);
  --frame-badge-root-font-size: 0.75rem;
  --frame-badge-root-font-weight: 600;
  --frame-badge-root-bg: var(--frame-primary);
  --frame-badge-root-color: var(--frame-primary-foreground);
  --frame-badge-success-bg: color-mix(in srgb, #16a34a 16%, var(--frame-surface));
  --frame-badge-success-border: color-mix(in srgb, #16a34a 32%, transparent);
  --frame-badge-success-color: color-mix(in srgb, #16a34a 78%, var(--frame-foreground));
  --frame-badge-root-padding-block: 0.1875rem;
  --frame-badge-root-padding-inline: 0.625rem;
  --frame-badge-root-focus-shadow: 0 0 0 3px color-mix(in srgb, var(--frame-ring) 24%, transparent);
  --frame-badge-root-transition-duration: 150ms;
  --frame-badge-link-underline-offset: 0.1875rem;
  --frame-badge-icon-size: 0.475rem;
  --frame-badge-icon-offset: -0.125rem;
  --frame-spinner-size: var(--frame-badge-icon-size);
  --frame-spinner-stroke: 0.125rem;
  --frame-spinner-track-color: color-mix(in srgb, currentColor 24%, transparent);
  --frame-spinner-indicator-color: currentColor;
  --frame-spinner-duration: 700ms;
  `,
};

