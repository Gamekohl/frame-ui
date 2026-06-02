import { ComponentDoc } from '../../shared/models/component-doc.model';
import { BreadcrumbPreviewConfig, DocsBreadcrumbPreviewComponent } from './previews/breadcrumb-preview';

const breadcrumbImportsCode = `import { FrBreadcrumbModule } from '@frame-ui/components/breadcrumb';`;

const customStylingConfig: BreadcrumbPreviewConfig = {
  className: 'w-full rounded-3xl border p-6',
  style: `--frame-breadcrumb-root-color: color-mix(in srgb, var(--frame-primary) 42%, var(--frame-muted-foreground));
--frame-breadcrumb-link-hover-color: var(--frame-primary);
--frame-breadcrumb-page-color: var(--frame-primary);
--frame-breadcrumb-list-gap: 0.5rem;
--frame-breadcrumb-separator-color: yellow;
--frame-breadcrumb-ellipsis-hover-bg: color-mix(in srgb, var(--frame-primary) 12%, transparent);`,
};

export const BREADCRUMB_DOC: ComponentDoc = {
  slug: 'breadcrumb',
  breadcrumb: 'Components / Breadcrumb',

  hero: {
    id: 'breadcrumb-hero',
    title: 'Preview',
    preview: {
      component: DocsBreadcrumbPreviewComponent,
    },
  },

  installation: {
    cli: {
      language: 'bash',
      code: 'npx your-cli add breadcrumb',
    },
    manual: {
      steps: [
        {
          title: 'Import the breadcrumb primitives you need for the navigation trail.',
          code: {
            language: 'ts',
            code: breadcrumbImportsCode,
          },
        },
      ],
    },
  },

  usage: [
    {
      language: 'ts',
      code: breadcrumbImportsCode,
    },
    {
      language: 'html',
      code: `<nav frBreadcrumb aria-label="Breadcrumb">
  <ol frBreadcrumbList>
    <li frBreadcrumbItem>
      <a frBreadcrumbLink href="/">Home</a>
    </li>
    <li frBreadcrumbSeparator></li>
    <li frBreadcrumbItem>
      <a frBreadcrumbLink href="/docs/components">Components</a>
    </li>
    <li frBreadcrumbSeparator></li>
    <li frBreadcrumbItem>
      <span frBreadcrumbPage>Breadcrumb</span>
    </li>
  </ol>
</nav>`,
    },
  ],

  tokenInspector: {
    id: 'token-inspector',
    title: 'Token inspector',
    description:
      'Hover the breadcrumb root, list, link, separator, or current page to inspect the tokens that shape the navigation trail.',
    preview: {
      component: DocsBreadcrumbPreviewComponent,
      inputs: {
        config: {
          tokenPrefix: 'breadcrumb',
        },
      },
      inspectorTargets: [
        {
          id: 'root',
          label: 'Root',
          selector: '[data-token-target="breadcrumb-root"]',
          description: 'The root establishes the text color, size, and line-height for the trail.',
          tokens: [
            '--frame-breadcrumb-root-color',
            '--frame-breadcrumb-root-font-size',
            '--frame-breadcrumb-root-line-height',
          ],
        },
        {
          id: 'list',
          label: 'List',
          selector: '[data-token-target="breadcrumb-list"]',
          description: 'The list handles wrapping and spacing between items and separators.',
          tokens: ['--frame-breadcrumb-list-gap'],
        },
        {
          id: 'link',
          label: 'Link',
          selector: '[data-token-target="breadcrumb-link"]',
          description: 'Links keep previous pages quiet until hover or keyboard focus.',
          tokens: [
            '--frame-breadcrumb-link-color',
            '--frame-breadcrumb-link-hover-color',
            '--frame-breadcrumb-link-focus-shadow',
          ],
        },
        {
          id: 'separator',
          label: 'Separator',
          selector: '[data-token-target="breadcrumb-separator"]',
          description: 'Separators visually divide the trail while remaining hidden from assistive technology.',
          tokens: ['--frame-breadcrumb-separator-color', '--frame-breadcrumb-separator-size'],
        },
        {
          id: 'page',
          label: 'Current page',
          selector: '[data-token-target="breadcrumb-page"]',
          description: 'The current page uses aria-current="page" and a stronger foreground color.',
          tokens: ['--frame-breadcrumb-page-color'],
        },
      ],
    },
  },

  styling: {
    description:
      'Override breadcrumb tokens on a local wrapper when navigation needs stronger brand color, wider spacing, or a custom hover treatment.',
    preview: {
      id: 'custom-styling-preview',
      title: 'Custom Styling Preview',
      description:
        'This preview applies local overrides for link color, current-page color, separator color, spacing, and ellipsis hover background.',
      preview: {
        component: DocsBreadcrumbPreviewComponent,
        inputs: {
          config: customStylingConfig,
        },
      },
      code: [
        {
          language: 'ts',
          code: breadcrumbImportsCode,
        },
        {
          language: 'html',
          code: `<div class="brand-breadcrumb">
  <nav frBreadcrumb aria-label="Breadcrumb">
    <!-- breadcrumb list -->
  </nav>
</div>`,
        },
        {
          language: 'css',
          code: `.brand-breadcrumb {
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
        'Use a nav landmark with an ordered list so the trail has clear navigation semantics and predictable screen reader output.',
      preview: {
        component: DocsBreadcrumbPreviewComponent,
      },
      code: [
        {
          language: 'ts',
          code: breadcrumbImportsCode,
        },
        {
          language: 'html',
          code: `<nav frBreadcrumb aria-label="Breadcrumb">
  <ol frBreadcrumbList>
    <li frBreadcrumbItem>
      <a frBreadcrumbLink href="/">Home</a>
    </li>
    <li frBreadcrumbSeparator></li>
    <li frBreadcrumbItem>
      <a frBreadcrumbLink href="/docs/components">Components</a>
    </li>
    <li frBreadcrumbSeparator></li>
    <li frBreadcrumbItem>
      <span frBreadcrumbPage>Breadcrumb</span>
    </li>
  </ol>
</nav>`,
        },
      ],
    },
    {
      id: 'custom-separator',
      title: 'Custom separator',
      description:
        'Place content inside FrBreadcrumbSeparator when the default slash should be replaced by a product-specific glyph.',
      preview: {
        component: DocsBreadcrumbPreviewComponent,
        inputs: {
          config: { mode: 'custom-separator' },
        },
      },
      code: [
        {
          language: 'ts',
          code: breadcrumbImportsCode,
        },
        {
          language: 'html',
          code: `<nav frBreadcrumb aria-label="Breadcrumb">
  <ol frBreadcrumbList>
    <li frBreadcrumbItem>
      <a frBreadcrumbLink href="/">Docs</a>
    </li>
    <li frBreadcrumbSeparator>→</li>
    <li frBreadcrumbItem>
      <a frBreadcrumbLink href="/docs/components">Components</a>
    </li>
    <li frBreadcrumbSeparator>→</li>
    <li frBreadcrumbItem>
      <span frBreadcrumbPage>Breadcrumb</span>
    </li>
  </ol>
</nav>`,
        },
      ],
    },
    {
      id: 'collapsed',
      title: 'Collapsed',
      description:
        'Use FrBreadcrumbEllipsis to represent omitted levels while keeping an accessible label for assistive technology.',
      preview: {
        component: DocsBreadcrumbPreviewComponent,
        inputs: {
          config: { mode: 'collapsed' },
        },
      },
      code: [
        {
          language: 'ts',
          code: breadcrumbImportsCode,
        },
        {
          language: 'html',
          code: `<nav frBreadcrumb aria-label="Breadcrumb">
  <ol frBreadcrumbList>
    <li frBreadcrumbItem>
      <a frBreadcrumbLink href="/">Home</a>
    </li>
    <li frBreadcrumbSeparator></li>
    <li frBreadcrumbItem>
      <span frBreadcrumbEllipsis label="More documentation pages"></span>
    </li>
    <li frBreadcrumbSeparator></li>
    <li frBreadcrumbItem>
      <a frBreadcrumbLink href="/docs/components">Components</a>
    </li>
    <li frBreadcrumbSeparator></li>
    <li frBreadcrumbItem>
      <span frBreadcrumbPage>Breadcrumb</span>
    </li>
  </ol>
</nav>`,
        },
      ],
    },
    {
      id: 'responsive',
      title: 'Responsive',
      description:
        'Hide lower-value ancestors at smaller breakpoints and truncate long current pages to preserve layout stability.',
      preview: {
        component: DocsBreadcrumbPreviewComponent,
        containerClass: 'block w-full',
        inputs: {
          config: { mode: 'responsive' },
        },
      },
      code: [
        {
          language: 'ts',
          code: breadcrumbImportsCode,
        },
        {
          language: 'html',
          code: `<div class="responsive-breadcrumb">
  <nav frBreadcrumb aria-label="Breadcrumb">
    <ol frBreadcrumbList class="responsive-breadcrumb__list">
      <li frBreadcrumbItem class="responsive-breadcrumb__optional-sm">
        <a frBreadcrumbLink href="/">FrameUI</a>
      </li>
      <li frBreadcrumbSeparator class="responsive-breadcrumb__optional-sm"></li>
      <li frBreadcrumbItem class="responsive-breadcrumb__optional-md">
        <a frBreadcrumbLink href="/docs">Documentation</a>
      </li>
      <li frBreadcrumbSeparator class="responsive-breadcrumb__optional-md"></li>
      <li frBreadcrumbItem>
        <a frBreadcrumbLink href="/docs/components">Components</a>
      </li>
      <li frBreadcrumbSeparator></li>
      <li frBreadcrumbItem class="responsive-breadcrumb__current-item">
        <span frBreadcrumbPage class="responsive-breadcrumb__current">
          Breadcrumb with a long current page
        </span>
      </li>
    </ol>
  </nav>
</div>`,
        },
        {
          language: 'css',
          code: `.responsive-breadcrumb {
  container-type: inline-size;
  inline-size: 100%;
  min-inline-size: 0;
}

.responsive-breadcrumb__list {
  flex-wrap: nowrap;
  min-inline-size: 0;
}

.responsive-breadcrumb__optional-sm,
.responsive-breadcrumb__optional-md {
  display: none;
}

.responsive-breadcrumb__current-item {
  flex: 1 1 auto;
  min-inline-size: 0;
}

.responsive-breadcrumb__current {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@container (min-width: 28rem) {
  .responsive-breadcrumb__optional-sm {
    display: inline-flex;
  }
}

@container (min-width: 38rem) {
  .responsive-breadcrumb__optional-md {
    display: inline-flex;
  }
}`,
        },
      ],
    },
    {
      id: 'rtl',
      title: 'RTL support',
      description:
        'Breadcrumb layout follows document direction, so separators, spacing, and wrapping work in right-to-left contexts too.',
      preview: {
        component: DocsBreadcrumbPreviewComponent,
        inputs: {
          config: { mode: 'rtl' },
        },
      },
      code: [
        {
          language: 'ts',
          code: breadcrumbImportsCode,
        },
        {
          language: 'html',
          code: `<div dir="rtl">
  <nav frBreadcrumb aria-label="Breadcrumb">
    <ol frBreadcrumbList>
      <li frBreadcrumbItem>
        <a frBreadcrumbLink href="/">الرئيسية</a>
      </li>
      <li frBreadcrumbSeparator></li>
      <li frBreadcrumbItem>
        <a frBreadcrumbLink href="/docs/components">المكونات</a>
      </li>
      <li frBreadcrumbSeparator></li>
      <li frBreadcrumbItem>
        <span frBreadcrumbPage>مسار التنقل</span>
      </li>
    </ol>
  </nav>
</div>`,
        },
      ],
    },
  ],

  tokensTitle: 'Design Tokens',
  tokensDescription:
    'Use these CSS custom properties to tune breadcrumb color, spacing, focus treatment, separators, and ellipsis affordance.',
  tokens: `
  --frame-breadcrumb-root-color: var(--frame-muted-foreground);
  --frame-breadcrumb-root-font-size: 0.875rem;
  --frame-breadcrumb-root-line-height: 1.25rem;
  --frame-breadcrumb-list-gap: 0.375rem;
  --frame-breadcrumb-link-color: var(--frame-muted-foreground);
  --frame-breadcrumb-link-hover-color: var(--frame-foreground);
  --frame-breadcrumb-link-focus-shadow: 0 0 0 3px color-mix(in srgb, var(--frame-ring) 24%, transparent);
  --frame-breadcrumb-page-color: var(--frame-foreground);
  --frame-breadcrumb-separator-color: var(--frame-muted-foreground);
  --frame-breadcrumb-separator-size: 0.875rem;
  --frame-breadcrumb-ellipsis-size: 1.5rem;
  --frame-breadcrumb-ellipsis-radius: var(--frame-radius-sm);
  --frame-breadcrumb-ellipsis-hover-bg: var(--frame-muted);
  --frame-breadcrumb-transition-duration: 150ms;
  `,
};

