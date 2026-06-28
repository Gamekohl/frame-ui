import { ComponentDoc } from '../../shared/models/component-doc.model';
import { DocsCornerHandlesPreviewComponent } from './previews/corner-handles-preview';

const cornerHandlesImportsCode = `import { FrCornerHandles } from '@frame-ui-ng/components';`;

export const CORNER_HANDLES_DOC: ComponentDoc = {
  slug: 'corner-handles',
  breadcrumb: 'Utilities / Corner Handles',
  sectionLabel: 'Utilities',
  sectionPath: '/docs/utilities',

  hero: {
    id: 'corner-handles-hero',
    title: 'Preview',
    preview: {
      component: DocsCornerHandlesPreviewComponent,
    },
  },

  usage: [
    {
      language: 'ts',
      code: cornerHandlesImportsCode,
    },
    {
      language: 'html',
      code: `<section frCornerHandles class="product-panel">
  <h3>Release channel</h3>
  <p>Attach corner handles to any regular box element.</p>
</section>`,
    },
  ],

  examples: [
    {
      id: 'basic',
      title: 'Basic',
      description:
        'Apply the directive to any host element that should opt into blueprint corner handles.',
      preview: {
        component: DocsCornerHandlesPreviewComponent,
      },
      code: [
        {
          language: 'ts',
          code: cornerHandlesImportsCode,
        },
        {
          language: 'html',
          code: `<article frCornerHandles class="surface">
  <h3>Pipeline health</h3>
  <p>Corner handles are rendered by the shared Frame UI styles.</p>
</article>`,
        },
      ],
    },
    {
      id: 'actions',
      title: 'Action Surface',
      description:
        'Attach the utility to compact surfaces such as action groups when they should receive the same blueprint treatment.',
      preview: {
        component: DocsCornerHandlesPreviewComponent,
        inputs: {
          config: {
            variant: 'actions',
          },
        },
      },
      code: [
        {
          language: 'ts',
          code: cornerHandlesImportsCode,
        },
        {
          language: 'html',
          code: `<div frCornerHandles class="action-surface">
  <button type="button">Approve</button>
  <button type="button">Archive</button>
</div>`,
        },
      ],
    },
    {
      id: 'container',
      title: 'Container',
      description:
        'The utility is useful for docs previews, custom cards, tool surfaces, and app containers that are not Frame UI components.',
      preview: {
        component: DocsCornerHandlesPreviewComponent,
        inputs: {
          config: {
            variant: 'container',
          },
        },
      },
      code: [
        {
          language: 'ts',
          code: cornerHandlesImportsCode,
        },
        {
          language: 'html',
          code: `<div frCornerHandles class="blueprint-shell">
  <header>Blueprint shell</header>
  <div class="blueprint-row">
    <span>Density</span>
    <strong>Compact</strong>
  </div>
</div>`,
        },
      ],
    },
  ],

  styling: {
    description:
      'Override the corner handle tokens locally when a host needs a different accent, inset, or handle length.',
    preview: {
      id: 'custom-styling-preview',
      title: 'Custom Styling Preview',
      description: 'This preview customizes the handle color, size, and inset on one container.',
      preview: {
        component: DocsCornerHandlesPreviewComponent,
        inputs: {
          config: {
            variant: 'custom',
          },
        },
      },
      code: [
        {
          language: 'ts',
          code: cornerHandlesImportsCode,
        },
        {
          language: 'html',
          code: `<section frCornerHandles class="release-frame">
  ...
</section>`,
        },
        {
          language: 'css',
          code: `.release-frame {
  --frame-corner-handle-color: var(--frame-primary);
  --frame-corner-handle-size: 0.875rem;
  --frame-corner-handle-inset: 0.5rem;
}`,
        },
      ],
    },
  },

  tokensTitle: 'Design Tokens',
  tokensDescription:
    'Use these CSS custom properties on any host with frCornerHandles to tune the local handle treatment.',
  tokens: `
  --frame-corner-handle-size: var(--frame-frame-tick-size, 0.375rem);
  --frame-corner-handle-inset: 0px;
  --frame-corner-handle-color: var(--frame-frame-accent);
  --frame-corner-handle-radius: var(--frame-radius);
  `,
};
