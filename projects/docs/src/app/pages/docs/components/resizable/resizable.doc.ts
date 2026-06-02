import { ComponentDoc } from '../../shared/models/component-doc.model';
import { DocsResizablePreviewComponent } from './previews/resizable-preview';

const importsCode = `import { FrResizableModule } from '@frame-ui/components/resizable';`;

const basicHtml = `<div frResizablePanelGroup aria-label="Inbox split view">
  <section frResizablePanel [defaultSize]="32" [minSize]="20">Inbox</section>
  <div frResizableHandle></div>
  <section frResizablePanel [defaultSize]="68" [minSize]="30">Message preview</section>
</div>`;

const verticalHtml = `<div frResizablePanelGroup orientation="vertical" aria-label="Report editor">
  <section frResizablePanel [defaultSize]="28" [minSize]="18">Toolbar</section>
  <div frResizableHandle withHandle></div>
  <section frResizablePanel [defaultSize]="72" [minSize]="35">Report body</section>
</div>`;

const handleHtml = `<div frResizablePanelGroup aria-label="Visible handle split view">
  <section frResizablePanel [defaultSize]="35" [minSize]="20">Filters</section>
  <div frResizableHandle withHandle></div>
  <section frResizablePanel [defaultSize]="65" [minSize]="35">Results</section>
</div>`;

const nestedHtml = `<div frResizablePanelGroup aria-label="Nested workspace">
  <section frResizablePanel [defaultSize]="28" [minSize]="18">Project list</section>
  <div frResizableHandle withHandle></div>
  <section frResizablePanel [defaultSize]="72" [minSize]="35" data-no-padding>
    <div frResizablePanelGroup orientation="vertical" aria-label="Nested editor panels">
      <section frResizablePanel [defaultSize]="62" [minSize]="35">Editor</section>
      <div frResizableHandle withHandle></div>
      <section frResizablePanel [defaultSize]="38" [minSize]="20">Activity log</section>
    </div>
  </section>
</div>`;

const customCss = `.review-resizable {
  --frame-resizable-radius: 1.25rem;
  --frame-resizable-border: color-mix(in srgb, var(--frame-primary) 22%, var(--frame-border));
  --frame-resizable-bg: linear-gradient(135deg, var(--frame-surface), color-mix(in srgb, var(--frame-primary) 8%, var(--frame-surface)));
  --frame-resizable-handle-size: 0.75rem;
  --frame-resizable-handle-hover-bg: color-mix(in srgb, var(--frame-primary) 22%, transparent);
  --frame-resizable-handle-active-bg: color-mix(in srgb, var(--frame-primary) 34%, transparent);
  --frame-resizable-handle-indicator-bg: var(--frame-primary);
  --frame-resizable-handle-indicator-size: 2.5rem;
}`;

const tokens = `--frame-resizable-border: var(--frame-border);
--frame-resizable-radius: var(--frame-radius-lg);
--frame-resizable-bg: var(--frame-surface);
--frame-resizable-color: var(--frame-foreground);
--frame-resizable-panel-padding: 1rem;
--frame-resizable-panel-min-size: 0;
--frame-resizable-handle-size: 0.625rem;
--frame-resizable-handle-hit-size: 1rem;
--frame-resizable-handle-bg: transparent;
--frame-resizable-handle-hover-bg: color-mix(in srgb, var(--frame-primary) 16%, transparent);
--frame-resizable-handle-active-bg: color-mix(in srgb, var(--frame-primary) 24%, transparent);
--frame-resizable-handle-border: var(--frame-border);
--frame-resizable-handle-indicator-size: 2rem;
--frame-resizable-handle-indicator-thickness: 0.25rem;
--frame-resizable-handle-indicator-bg: var(--frame-border);
--frame-resizable-handle-focus-shadow: 0 0 0 3px color-mix(in srgb, var(--frame-ring) 28%, transparent);
--frame-resizable-transition-duration: 150ms;
--frame-resizable-transition-easing: ease;`;

export const RESIZABLE_DOC: ComponentDoc = {
  slug: 'resizable',
  breadcrumb: 'Components / Resizable',

  hero: {
    id: 'resizable-hero',
    title: 'Preview',
    preview: {
      component: DocsResizablePreviewComponent,
      inputs: {
        config: { mode: 'hero' },
      },
    },
  },

  installation: {
    cli: {
      language: 'bash',
      code: 'npx your-cli add resizable',
    },
    manual: {
      steps: [
        {
          title: 'Import the resizable panel group, panel, and handle primitives.',
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

  composition: `FrResizablePanelGroup
├── FrResizablePanel
├── FrResizableHandle
└── FrResizablePanel`,

  tokenInspector: {
    id: 'token-inspector',
    title: 'Token inspector',
    description:
      'Hover the resizable group, panel, or handle to inspect the tokens behind borders, surfaces, panel padding, handle affordances, and focus treatment.',
    preview: {
      component: DocsResizablePreviewComponent,
      containerClass: 'block',
      inputs: {
        config: { mode: 'inspector' },
      },
      inspectorTargets: [
        {
          id: 'root',
          label: 'Panel group',
          selector: '[data-token-target="resizable-root"]',
          description: 'The group tokens control the surrounding border, radius, surface, and text color.',
          tokens: [
            '--frame-resizable-border',
            '--frame-resizable-radius',
            '--frame-resizable-bg',
            '--frame-resizable-color',
          ],
        },
        {
          id: 'panel',
          label: 'Panel',
          selector: '[data-token-target="resizable-panel"]',
          description: 'Panel tokens control the default padding and minimum rendered size.',
          tokens: ['--frame-resizable-panel-padding', '--frame-resizable-panel-min-size'],
        },
        {
          id: 'handle',
          label: 'Resize handle',
          selector: '[data-token-target="resizable-handle"]',
          description: 'Handle tokens define hit target size, visible indicator, hover/active states, focus ring, and transitions.',
          tokens: [
            '--frame-resizable-handle-size',
            '--frame-resizable-handle-hit-size',
            '--frame-resizable-handle-bg',
            '--frame-resizable-handle-hover-bg',
            '--frame-resizable-handle-active-bg',
            '--frame-resizable-handle-indicator-size',
            '--frame-resizable-handle-indicator-thickness',
            '--frame-resizable-handle-indicator-bg',
            '--frame-resizable-handle-focus-shadow',
            '--frame-resizable-transition-duration',
            '--frame-resizable-transition-easing',
          ],
        },
      ],
    },
  },

  styling: {
    description:
      'Scope resizable tokens to a panel group when a split view needs a stronger container treatment or more visible drag affordance.',
    preview: {
      id: 'custom-styling-preview',
      title: 'Custom Styling Preview',
      description: 'This preview customizes the group border, surface, radius, and handle indicator.',
      preview: {
        component: DocsResizablePreviewComponent,
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
          code: `<div frResizablePanelGroup class="review-resizable" aria-label="Custom resizable view">
  <section frResizablePanel [defaultSize]="38" [minSize]="24">Queue</section>
  <div frResizableHandle withHandle></div>
  <section frResizablePanel [defaultSize]="62" [minSize]="32">Review board</section>
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
      description: 'Use a horizontal panel group for common master-detail and sidebar layouts.',
      preview: {
        component: DocsResizablePreviewComponent,
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
      id: 'vertical',
      title: 'Vertical',
      description: 'Switch orientation when users need to resize stacked regions such as toolbars, editors, and logs.',
      preview: {
        component: DocsResizablePreviewComponent,
        inputs: {
          config: { mode: 'vertical' },
        },
      },
      code: [
        {
          language: 'ts',
          code: importsCode,
        },
        {
          language: 'html',
          code: verticalHtml,
        },
      ],
    },
    {
      id: 'handle',
      title: 'Handle',
      description: 'Add withHandle to show a visible drag affordance while keeping the full handle area easy to target.',
      preview: {
        component: DocsResizablePreviewComponent,
        inputs: {
          config: { mode: 'handle' },
        },
      },
      code: [
        {
          language: 'ts',
          code: importsCode,
        },
        {
          language: 'html',
          code: handleHtml,
        },
      ],
    },
    {
      id: 'nested',
      title: 'Nested',
      description: 'Nest panel groups to combine sidebar resizing with independently resizable editor regions.',
      preview: {
        component: DocsResizablePreviewComponent,
        inputs: {
          config: { mode: 'nested' },
        },
      },
      code: [
        {
          language: 'ts',
          code: importsCode,
        },
        {
          language: 'html',
          code: nestedHtml,
        },
      ],
    },
    {
      id: 'constraints',
      title: 'Panel constraints',
      description: 'Use minSize and maxSize to constrain panels. If minSize is omitted, a panel can collapse to 0% and expand again from the handle.',
      preview: {
        component: DocsResizablePreviewComponent,
        inputs: {
          config: { mode: 'constraints' },
        },
      },
      code: [
        {
          language: 'ts',
          code: importsCode,
        },
        {
          language: 'html',
          code: `<div frResizablePanelGroup aria-label="Constrained split view">
  <!-- No minSize: this panel can collapse completely and expand again. -->
  <section frResizablePanel [defaultSize]="24">
    Optional navigation
  </section>
  <div frResizableHandle withHandle></div>

  <section frResizablePanel [defaultSize]="30" [minSize]="18" [maxSize]="45" collapsible [collapsedSize]="8">
    Pinned filters
  </section>
  <div frResizableHandle withHandle></div>
  <section frResizablePanel [defaultSize]="46" [minSize]="40">
    Content
  </section>
</div>`,
        },
      ],
    },
    {
      id: 'rtl',
      title: 'RTL',
      description: 'Horizontal resizing accounts for RTL direction so keyboard and pointer movement feel natural.',
      preview: {
        component: DocsResizablePreviewComponent,
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
          code: `<div dir="rtl" frResizablePanelGroup aria-label="واجهة قابلة لتغيير الحجم">
  <section frResizablePanel [defaultSize]="34" [minSize]="20">القائمة</section>
  <div frResizableHandle withHandle></div>
  <section frResizablePanel [defaultSize]="66" [minSize]="30">المحتوى</section>
</div>`,
        },
      ],
    },
  ],

  tokensTitle: 'Design Tokens',
  tokensDescription:
    'Use these CSS custom properties to tune the resizable container, panel padding, handle sizing, visible affordance, focus ring, and motion.',
  tokens,
};

