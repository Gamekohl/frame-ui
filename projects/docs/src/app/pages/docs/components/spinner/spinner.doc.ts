import { ComponentDoc } from '../../shared/models/component-doc.model';
import { DocsSpinnerPreviewComponent } from './previews/spinner-preview';

const importsCode = `import { FrSpinnerModule } from '@frame-ui-ng/components/spinner';`;
const buttonImportsCode = `import { FrButtonModule } from '@frame-ui-ng/components/button';
${importsCode}`;
const badgeImportsCode = `import { FrBadgeModule } from '@frame-ui-ng/components/badge';
${importsCode}`;
const inputImportsCode = `import { FrInputModule } from '@frame-ui-ng/components/input';
${importsCode}`;
const emptyImportsCode = `import { FrEmptyModule } from '@frame-ui-ng/components/empty';
${importsCode}`;

const basicHtml = `<span frSpinner label="Loading project data"></span>`;

const sizesHtml = `<span frSpinner size="xs" decorative></span>
<span frSpinner size="sm" decorative></span>
<span frSpinner size="md" decorative></span>
<span frSpinner size="lg" decorative></span>
<span frSpinner size="xl" decorative></span>`;

const buttonHtml = `<button frButton [loading]="true" loadingDisplay="inline" type="button">
  <span frButtonIcon>
    <ng-icon name="tablerCloudUpload" size="16" />
  </span>
  <span frButtonLabel>Uploading</span>
  <span frSpinner size="sm"></span>
</button>`;

const badgeHtml = `<span frBadge variant="secondary">
  <span frSpinner size="xs"></span>
  <span frBadgeLabel>Syncing</span>
</span>

<span frBadge variant="outline">
  <span frBadgeLabel>Queued</span>
  <span frSpinner size="xs"></span>
</span>`;

const inputGroupHtml = `<div frInputGroup>
  <span frInputGroupAddon align="inline-start">
    <ng-icon name="tablerClock" size="16" />
  </span>
  <input frInputGroupInput value="Checking workspace status" aria-label="Workspace status" />
  <span frInputGroupAddon align="inline-end">
    <span frSpinner decorative size="sm"></span>
  </span>
</div>`;

const emptyHtml = `<div frEmpty variant="outline">
  <div frEmptyMedia variant="icon">
    <span frSpinner decorative size="lg"></span>
  </div>
  <div frEmptyHeader>
    <h3 frEmptyTitle>Preparing the workspace</h3>
    <p frEmptyDescription>A few project details are still being assembled.</p>
  </div>
</div>`;

const customCss = `.refresh-spinner {
  --frame-spinner-size: 2.25rem;
  --frame-spinner-stroke: 3px;
  --frame-spinner-track-color: color-mix(in srgb, var(--frame-primary) 18%, transparent);
  --frame-spinner-indicator-color: var(--frame-primary);
  --frame-spinner-duration: 560ms;
  filter: drop-shadow(0 0 18px color-mix(in srgb, var(--frame-primary) 30%, transparent));
}`;

const tokens = `--frame-spinner-size: 1rem;
--frame-spinner-stroke: 2px;
--frame-spinner-track-color: color-mix(in srgb, currentColor 24%, transparent);
--frame-spinner-indicator-color: currentColor;
--frame-spinner-radius: var(--frame-radius-full);
--frame-spinner-duration: 700ms;`;

export const SPINNER_DOC: ComponentDoc = {
  slug: 'spinner',
  breadcrumb: 'Components / Spinner',

  hero: {
    id: 'spinner-hero',
    title: 'Preview',
    preview: {
      component: DocsSpinnerPreviewComponent,
      inputs: {
        config: { mode: 'basic' },
      },
    },
  },

  installation: {
    cli: {
      language: 'bash',
      code: 'npx your-cli add spinner',
    },
    manual: {
      steps: [
        {
          title: 'Import the spinner primitive where loading affordances are composed.',
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
      code: basicHtml,
    },
  ],

  tokenInspector: {
    id: 'token-inspector',
    title: 'Token inspector',
    description:
      'Hover the spinner or supporting label to inspect the tokens that control loading size, stroke, color, radius, and motion.',
    preview: {
      component: DocsSpinnerPreviewComponent,
      containerClass: 'block',
      inputs: {
        config: { mode: 'inspector' },
      },
      inspectorTargets: [
        {
          id: 'root',
          label: 'Spinner',
          selector: '[data-token-target="spinner-root"]',
          description:
            'The spinner token set is intentionally portable so it can be reused inside buttons, badges, inputs, empty states, and custom loading regions.',
          tokens: [
            '--frame-spinner-size',
            '--frame-spinner-stroke',
            '--frame-spinner-track-color',
            '--frame-spinner-indicator-color',
            '--frame-spinner-radius',
            '--frame-spinner-duration',
          ],
        },
        {
          id: 'label',
          label: 'Nearby label',
          selector: '[data-token-target="spinner-label"]',
          description:
            'Spinner labels usually inherit text treatment from their host pattern; use an explicit aria-label when the spinner communicates status by itself.',
          tokens: ['--frame-foreground', '--frame-muted-foreground'],
        },
      ],
    },
  },

  styling: {
    description:
      'Override spinner tokens directly on the element or on a local wrapper when a loading state needs a stronger product-specific treatment.',
    preview: {
      id: 'custom-styling-preview',
      title: 'Custom Styling Preview',
      description: 'This preview tunes the spinner size, stroke, speed, and glow without changing the markup.',
      preview: {
        component: DocsSpinnerPreviewComponent,
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
          code: `<span frSpinner class="refresh-spinner" label="Refreshing analytics"></span>`,
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
      description:
        'Use a status spinner when the loading indicator is the only announcement for an in-progress region.',
      preview: {
        component: DocsSpinnerPreviewComponent,
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
          code: basicHtml,
        },
      ],
    },
    {
      id: 'sizes',
      title: 'Sizes',
      description:
        'Use size presets for common inline, control, and empty-state loading treatments. `sizeValue` can still override the exact CSS size.',
      preview: {
        component: DocsSpinnerPreviewComponent,
        inputs: {
          config: { mode: 'sizes' },
        },
      },
      code: [
        {
          language: 'ts',
          code: importsCode,
        },
        {
          language: 'html',
          code: sizesHtml,
        },
      ],
    },
    {
      id: 'button',
      title: 'Inside Button',
      description:
        'Place Spinner in the button loading slot when you want the shared spinner token contract instead of a one-off indicator.',
      preview: {
        component: DocsSpinnerPreviewComponent,
        inputs: {
          config: { mode: 'button' },
        },
      },
      code: [
        {
          language: 'ts',
          code: buttonImportsCode,
        },
        {
          language: 'html',
          code: buttonHtml,
        },
      ],
    },
    {
      id: 'badge',
      title: 'Inside Badge',
      description:
        'Badge spinners compose the same primitive, so badge loading states inherit the shared spinner inputs and tokens.',
      preview: {
        component: DocsSpinnerPreviewComponent,
        inputs: {
          config: { mode: 'badge' },
        },
      },
      code: [
        {
          language: 'ts',
          code: badgeImportsCode,
        },
        {
          language: 'html',
          code: badgeHtml,
        },
      ],
    },
    {
      id: 'input-group',
      title: 'Inside Input Group',
      description:
        'Use a decorative spinner in trailing input-group content when a field is checking, searching, or validating in the background.',
      preview: {
        component: DocsSpinnerPreviewComponent,
        inputs: {
          config: { mode: 'input-group' },
        },
      },
      code: [
        {
          language: 'ts',
          code: inputImportsCode,
        },
        {
          language: 'html',
          code: inputGroupHtml,
        },
      ],
    },
    {
      id: 'empty',
      title: 'Inside Empty',
      description:
        'Spinner can sit in the media slot of an empty state when content is still being prepared rather than truly missing.',
      preview: {
        component: DocsSpinnerPreviewComponent,
        inputs: {
          config: { mode: 'empty' },
        },
      },
      code: [
        {
          language: 'ts',
          code: emptyImportsCode,
        },
        {
          language: 'html',
          code: emptyHtml,
        },
      ],
    },
    {
      id: 'rtl',
      title: 'RTL',
      description:
        'The spinner itself is direction-neutral and composes naturally with right-to-left labels and surrounding layouts.',
      preview: {
        component: DocsSpinnerPreviewComponent,
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
          code: `<div dir="rtl">
  <span frSpinner decorative size="sm"></span>
  <span>جار تحضير البيانات</span>
</div>`,
        },
      ],
    },
  ],

  tokensTitle: 'Design Tokens',
  tokensDescription:
    'Use these CSS custom properties to tune spinner dimensions, stroke width, track and indicator color, radius, and animation speed across every component that composes Spinner.',
  tokens,
};
