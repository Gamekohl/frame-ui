import { ComponentDoc } from '../../shared/models/component-doc.model';
import { DocsSkeletonPreviewComponent } from './previews/skeleton-preview';

const importsCode = `import { FrSkeletonModule } from '@frame-ui-ng/components/skeleton';`;
const fieldImportsCode = `import { FrFieldModule } from '@frame-ui-ng/components/field';
${importsCode}`;

const basicHtml = `<div class="loading-user">
  <div frSkeleton width="3rem" height="3rem" radius="999px"></div>

  <div class="loading-user__content">
    <div frSkeleton width="12rem" height="1rem"></div>
    <div frSkeleton width="8rem" height="0.875rem"></div>
  </div>
</div>`;

const avatarHtml = `<div class="profile-placeholder">
  <div frSkeleton width="4rem" height="4rem" radius="999px"></div>
  <div>
    <div frSkeleton width="11rem" height="1.125rem"></div>
    <div frSkeleton width="15rem" height="0.875rem"></div>
    <div frSkeleton width="9rem" height="0.875rem"></div>
  </div>
</div>`;

const cardHtml = `<section class="metric-card">
  <div frSkeleton height="8rem" radius="0.875rem"></div>
  <div frSkeleton width="65%" height="1rem"></div>
  <div frSkeleton width="92%" height="0.875rem"></div>
  <div frSkeleton width="74%" height="0.875rem"></div>
</section>`;

const textHtml = `<article aria-busy="true">
  <div frSkeleton width="42%" height="1.25rem"></div>
  <div frSkeleton></div>
  <div frSkeleton></div>
  <div frSkeleton width="86%"></div>
  <div frSkeleton width="52%"></div>
</article>`;

const formHtml = `<form aria-label="Loading account settings">
  <div frField>
    <label frFieldLabel>Email</label>
    <div frSkeleton height="2.5rem" radius="0.625rem"></div>
  </div>

  <div frField>
    <label frFieldLabel>Workspace URL</label>
    <div frSkeleton height="2.5rem" radius="0.625rem"></div>
  </div>

  <div frSkeleton width="7rem" height="2.25rem" radius="0.625rem"></div>
</form>`;

const tableHtml = `<div role="table" aria-label="Loading deployment rows">
  @for (row of loadingRows; track row) {
    <div role="row" class="loading-row">
      <div frSkeleton width="32%" height="0.875rem"></div>
      <div frSkeleton width="22%" height="0.875rem"></div>
      <div frSkeleton width="18%" height="0.875rem"></div>
    </div>
  }
</div>`;

const tableTs = `readonly loadingRows = Array.from({ length: 5 }, (_, index) => index);`;

const customCss = `.metric-card {
  --frame-skeleton-bg: color-mix(in srgb, var(--frame-primary) 16%, var(--frame-muted));
  --frame-skeleton-highlight: color-mix(in srgb, var(--frame-primary-foreground) 55%, transparent);
  --frame-skeleton-animation-duration: 1s;
}`;

const rtlHtml = `<div class="profile-placeholder" dir="rtl" lang="ar">
  <div frSkeleton width="4rem" height="4rem" radius="999px"></div>
  <div>
    <div frSkeleton width="10rem" height="1.125rem"></div>
    <div frSkeleton width="14rem" height="0.875rem"></div>
    <div frSkeleton width="8rem" height="0.875rem"></div>
  </div>
</div>`;

const tokens = `--frame-skeleton-bg: color-mix(in srgb, var(--frame-muted, #f4f4f5) 84%, var(--frame-foreground, #09090b) 8%);
--frame-skeleton-highlight: color-mix(in srgb, var(--frame-background, #fff) 64%, transparent);
--frame-skeleton-radius: var(--frame-radius-md, 0.5rem);
--frame-skeleton-width: 100%;
--frame-skeleton-height: 1rem;
--frame-skeleton-animation-duration: 1.4s;`;

export const SKELETON_DOC: ComponentDoc = {
  slug: 'skeleton',
  breadcrumb: 'Components / Skeleton',

  hero: {
    id: 'skeleton-hero',
    title: 'Preview',
    preview: {
      component: DocsSkeletonPreviewComponent,
      inputs: {
        config: { mode: 'basic' },
      },
    },
  },

  installation: {
    cli: {
      language: 'bash',
      code: 'npx your-cli add skeleton',
    },
    manual: {
      steps: [
        {
          title: 'Import the skeleton primitive.',
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
      code: `<div frSkeleton width="12rem" height="1rem"></div>`,
    },
  ],

  tokenInspector: {
    id: 'token-inspector',
    title: 'Token inspector',
    description:
      'Hover the skeleton surface or individual placeholders to inspect the tokens that control shape, color, size, and motion.',
    preview: {
      component: DocsSkeletonPreviewComponent,
      containerClass: 'block',
      inputs: {
        config: { mode: 'inspector' },
      },
      inspectorTargets: [
        {
          id: 'surface',
          label: 'Preview surface',
          selector: '[data-token-target="skeleton-surface"]',
          description: 'The surrounding card demonstrates how skeleton tokens can be inherited from a local loading region.',
          tokens: ['--frame-surface', '--frame-border', '--frame-radius-lg'],
        },
        {
          id: 'avatar',
          label: 'Circular skeleton',
          selector: '[data-token-target="skeleton-avatar"]',
          description: 'Circular placeholders use the same primitive with a pill radius and explicit sizing.',
          tokens: ['--frame-skeleton-width', '--frame-skeleton-height', '--frame-skeleton-radius', '--frame-skeleton-bg'],
        },
        {
          id: 'line',
          label: 'Text line',
          selector: '[data-token-target="skeleton-line"]',
          description: 'Line placeholders use width and height tokens to match the rhythm of the future content.',
          tokens: [
            '--frame-skeleton-width',
            '--frame-skeleton-height',
            '--frame-skeleton-bg',
            '--frame-skeleton-highlight',
            '--frame-skeleton-animation-duration',
          ],
        },
      ],
    },
  },

  styling: {
    description:
      'Override skeleton tokens on a loading region or on an individual placeholder to tune color, radius, dimensions, and shimmer timing.',
    preview: {
      id: 'custom-styling-preview',
      title: 'Custom Styling Preview',
      description: 'This preview uses local token overrides for a stronger branded loading state.',
      preview: {
        component: DocsSkeletonPreviewComponent,
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
          code: cardHtml,
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
      id: 'avatar',
      title: 'Avatar',
      description: 'Pair a circular placeholder with shorter text rows while a user summary is loading.',
      preview: {
        component: DocsSkeletonPreviewComponent,
        inputs: {
          config: { mode: 'avatar' },
        },
      },
      code: [
        { language: 'ts', code: importsCode },
        { language: 'html', code: avatarHtml },
      ],
    },
    {
      id: 'card',
      title: 'Card',
      description: 'Stack large and small placeholders to preserve the footprint of a dashboard card.',
      preview: {
        component: DocsSkeletonPreviewComponent,
        inputs: {
          config: { mode: 'card' },
        },
      },
      code: [
        { language: 'ts', code: importsCode },
        { language: 'html', code: cardHtml },
      ],
    },
    {
      id: 'text',
      title: 'Text',
      description: 'Use varied line widths so paragraphs feel closer to the content that will replace them.',
      preview: {
        component: DocsSkeletonPreviewComponent,
        inputs: {
          config: { mode: 'text' },
        },
      },
      code: [
        { language: 'ts', code: importsCode },
        { language: 'html', code: textHtml },
      ],
    },
    {
      id: 'form',
      title: 'Form',
      description: 'Skeletons can sit inside field layouts to keep labels and form spacing stable during loading.',
      preview: {
        component: DocsSkeletonPreviewComponent,
        inputs: {
          config: { mode: 'form' },
        },
      },
      code: [
        { language: 'ts', code: fieldImportsCode },
        { language: 'html', code: formHtml },
      ],
    },
    {
      id: 'table',
      title: 'Table',
      description: 'Repeat placeholder rows when tabular data is still being fetched.',
      preview: {
        component: DocsSkeletonPreviewComponent,
        inputs: {
          config: { mode: 'table' },
        },
      },
      code: [
        { language: 'ts', code: `${importsCode}

${tableTs}` },
        { language: 'html', code: tableHtml },
      ],
    },
    {
      id: 'rtl',
      title: 'RTL',
      description: 'Skeletons use logical sizing, so loading layouts compose naturally inside right-to-left regions.',
      preview: {
        component: DocsSkeletonPreviewComponent,
        inputs: {
          config: { mode: 'rtl' },
        },
      },
      code: [
        { language: 'ts', code: importsCode },
        { language: 'html', code: rtlHtml },
      ],
    },
  ],

  tokensTitle: 'Design Tokens',
  tokensDescription:
    'Use these CSS custom properties to tune skeleton color, highlight, radius, default size, and animation speed.',
  tokens,
};
