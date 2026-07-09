import { ComponentDoc } from '../../shared/models/component-doc.model';
import { DocsCarouselPreviewComponent } from './previews/carousel-preview';

const carouselImportsCode = `import { FrCarouselModule } from '@frame-ui-ng/components/carousel';`;

export const CAROUSEL_DOC: ComponentDoc = {
  slug: 'carousel',
  breadcrumb: 'Components / Carousel',

  hero: {
    id: 'carousel-hero',
    title: 'Preview',
    preview: {
      component: DocsCarouselPreviewComponent,
    },
  },

  installation: {
    cli: {
      language: 'bash',
      code: 'npx your-cli add carousel',
    },
    manual: {
      steps: [
        {
          title: 'Import the carousel primitives your template needs.',
          code: {
            language: 'ts',
            code: carouselImportsCode,
          },
        }
      ],
    },
  },

  usage: [
    {
      language: 'ts',
      code: carouselImportsCode,
    },
    {
      language: 'html',
      code: `<section #carousel="frCarousel" frCarousel>
  <div frCarouselContent>
    <div frCarouselItem>Slide 1</div>
    <div frCarouselItem>Slide 2</div>
    <div frCarouselItem>Slide 3</div>
  </div>
  <div frCarouselControls>
    <button frCarouselPrevious appearance="outline">Previous</button>
    <button frCarouselNext appearance="outline">Next</button>
  </div>
  <div frCarouselDots>
    @for (index of carousel.snapIndexes(); track index) {
      <button frCarouselDot [index]="index"></button>
    }
  </div>
</section>`,
    },
  ],

  tokenInspector: {
    id: 'token-inspector',
    title: 'Token inspector',
    description:
      'Inspect the carousel root, scroll viewport, slide item, dots, and thumbnails.',
    preview: {
      component: DocsCarouselPreviewComponent,
      inputs: {
        config: {
          mode: 'inspector',
        },
      },
      inspectorTargets: [
        {
          id: 'root',
          label: 'Carousel',
          selector: '[data-token-target="carousel-root"]',
          description:
            'The carousel root owns orientation, alignment, direction, and the shared viewport tokens.',
          tokens: ['--frame-carousel-gap', '--frame-carousel-item-size'],
        },
        {
          id: 'content',
          label: 'Content',
          selector: '[data-token-target="carousel-content"]',
          description:
            'The content element is the scrollable snap viewport and controls slide rhythm.',
          tokens: ['--frame-carousel-gap', '--frame-carousel-viewport-radius'],
        },
        {
          id: 'item',
          label: 'Item',
          selector: '[data-token-target="carousel-item"]',
          description: 'Each item uses the item size token and scroll snap alignment.',
          tokens: ['--frame-carousel-item-size', '--frame-carousel-snap-align'],
        },
        {
          id: 'dot',
          label: 'Dot',
          selector: '[data-token-target="carousel-dot"]',
          description: 'Dot controls reflect the selected snap point.',
          tokens: ['--frame-carousel-dot-size', '--frame-carousel-dot-active-size', '--frame-carousel-dot-bg', '--frame-carousel-dot-active-bg'],
        },
        {
          id: 'control',
          label: 'Control',
          selector: '[data-token-target="carousel-control"]',
          description: 'Optional controls use the button primitive and can be placed anywhere in the carousel layout.',
          tokens: ['--frame-carousel-control-gap', '--frame-carousel-control-size'],
        },
        {
          id: 'thumb',
          label: 'Thumb',
          selector: '[data-token-target="carousel-thumb"]',
          description: 'Thumbnail controls provide a larger selectable preview target.',
          tokens: ['--frame-carousel-thumb-size', '--frame-carousel-thumb-gap', '--frame-carousel-thumb-radius', '--frame-carousel-thumb-border', '--frame-carousel-thumb-active-border'],
        },
      ],
    },
  },

  styling: {
    description:
      'Override carousel tokens locally to tune slide width, gap, viewport radius, dots, and thumbnails.',
    preview: {
      id: 'custom-styling-preview',
      title: 'Custom Styling Preview',
      description: 'This preview customizes slide sizing, gap, radius, and dot color.',
      preview: {
        component: DocsCarouselPreviewComponent,
        inputs: {
          config: {
            style: `--frame-carousel-gap: 1.25rem;
--frame-carousel-item-size: min(100%, 18rem);
--frame-carousel-viewport-radius: var(--frame-radius-lg);
--frame-carousel-dot-active-bg: var(--frame-primary);`,
          },
        },
      },
      code: [
        {
          language: 'ts',
          code: carouselImportsCode,
        },
        {
          language: 'html',
          code: `<section frCarousel class="feature-carousel">
  ...
</section>`,
        },
        {
          language: 'css',
          code: `.feature-carousel {
  --frame-carousel-gap: 1.25rem;
  --frame-carousel-item-size: min(100%, 18rem);
  --frame-carousel-viewport-radius: var(--frame-radius-lg);
  --frame-carousel-dot-active-bg: var(--frame-primary);
}`,
        },
      ],
    },
  },

  examples: [
    {
      id: 'basic',
      title: 'Basic',
      description: 'A basic carousel with a drag-free scroll viewport, slide items, and dots.',
      preview: {
        component: DocsCarouselPreviewComponent,
      },
      code: [
        {
          language: 'ts',
          code: carouselImportsCode,
        },
        {
          language: 'html',
          code: `<section #carousel="frCarousel" frCarousel>
  <div frCarouselContent>
    <article frCarouselItem>Slide 1</article>
    <article frCarouselItem>Slide 2</article>
    <article frCarouselItem>Slide 3</article>
  </div>
  <div frCarouselControls>
    <button frCarouselPrevious appearance="outline">Previous</button>
    <button frCarouselNext appearance="outline">Next</button>
  </div>
  <div frCarouselDots>
    @for (index of carousel.snapIndexes(); track index) {
      <button frCarouselDot [index]="index"></button>
    }
  </div>
</section>`,
        },
      ],
    },
    {
      id: 'controls',
      title: 'Controls',
      description:
        'Add optional controls wherever they fit the layout. The default examples place them below the viewport, aligned to the left.',
      preview: {
        component: DocsCarouselPreviewComponent,
      },
      code: [
        {
          language: 'ts',
          code: carouselImportsCode,
        },
        {
          language: 'html',
          code: `<section #carousel="frCarousel" frCarousel>
  <div frCarouselContent>
    <article frCarouselItem>Slide 1</article>
    <article frCarouselItem>Slide 2</article>
    <article frCarouselItem>Slide 3</article>
  </div>
  <div frCarouselControls>
    <button frCarouselPrevious appearance="outline">
      Previous
    </button>
    <button frCarouselNext appearance="outline">
      Next
    </button>
  </div>
</section>`,
        },
      ],
    },
    {
      id: 'thumbnails',
      title: 'Thumbnails',
      description:
        'Use thumbnail controls when users need a stronger visual preview than dots provide.',
      preview: {
        component: DocsCarouselPreviewComponent,
        inputs: { config: { mode: 'thumbnails' } },
      },
      code: [
        {
          language: 'ts',
          code: carouselImportsCode,
        },
        {
          language: 'html',
          code: `<section #carousel="frCarousel" frCarousel>
  <div frCarouselContent>
    @for (slide of slides; track slide.title) {
      <article frCarouselItem>...</article>
    }
  </div>
  <div frCarouselThumbs>
    @for (slide of slides; track slide.title; let index = $index) {
      <button frCarouselThumb [index]="index">
        {{ index + 1 }}
      </button>
    }
  </div>
</section>`,
        },
      ],
    },
    {
      id: 'orientation',
      title: 'Orientation',
      description: 'Use orientation="vertical" for a vertical snap carousel.',
      preview: {
        component: DocsCarouselPreviewComponent,
        inputs: { config: { mode: 'vertical' } },
      },
      code: [
        {
          language: 'ts',
          code: carouselImportsCode,
        },
        {
          language: 'html',
          code: `<section frCarousel orientation="vertical">
  <div frCarouselContent>
    <article frCarouselItem>Slide 1</article>
    <article frCarouselItem>Slide 2</article>
  </div>
</section>`,
        },
      ],
    },
    {
      id: 'options',
      title: 'Options',
      description:
        'Pass opts to configure alignment, loop behavior, and direction from one object.',
      preview: {
        component: DocsCarouselPreviewComponent,
        inputs: { config: { mode: 'options' } },
      },
      code: [
        {
          language: 'ts',
          code: `import { FrCarouselModule, FrCarouselOptions } from '@frame-ui-ng/components/carousel';

readonly carouselOptions = {
  align: 'center',
  mouseDrag: true,
  loop: true,
} satisfies FrCarouselOptions;`,
        },
        {
          language: 'html',
          code: `<section frCarousel [opts]="carouselOptions">
  ...
</section>`,
        },
      ],
    },
    {
      id: 'api',
      title: 'Selection state',
      description:
        'Use selectedChange when the surrounding UI needs to react to the active slide. Navigation buttons can be attached with frCarouselPrevious and frCarouselNext.',
      preview: {
        component: DocsCarouselPreviewComponent,
        inputs: { config: { mode: 'api' } },
      },
      code: [
        {
          language: 'ts',
          code: `import { signal } from '@angular/core';
import { FrCarouselModule } from '@frame-ui-ng/components/carousel';

readonly selected = signal(0);
`,
        },
        {
          language: 'html',
          code: `<section
  frCarousel
  (selectedChange)="selected.set($event)"
>
  <div frCarouselContent>
    <article frCarouselItem>Slide 1</article>
    <article frCarouselItem>Slide 2</article>
    <article frCarouselItem>Slide 3</article>
  </div>

  <button frCarouselPrevious appearance="outline">Previous</button>
  <button frCarouselNext appearance="outline">Next</button>
</section>`,
        },
      ],
    },
    {
      id: 'plugins',
      title: 'Plugins',
      description:
        'Plugins receive the carousel API and may return a cleanup function for timers or listeners.',
      preview: {
        component: DocsCarouselPreviewComponent,
        inputs: { config: { mode: 'plugins' } },
      },
      code: [
        {
          language: 'ts',
          code: `import { FrCarouselModule, FrCarouselPlugin } from '@frame-ui-ng/components/carousel';

readonly autoplayPlugin: FrCarouselPlugin = (api) => {
  const timer = window.setInterval(() => api.scrollNext(), 2400);
  return () => window.clearInterval(timer);
};`,
        },
        {
          language: 'html',
          code: `<section frCarousel [loop]="true" [plugins]="[autoplayPlugin]">
  ...
</section>`,
        },
      ],
    }
  ],

  tokensTitle: 'Design Tokens',
  tokensDescription:
    'Use these CSS custom properties to tune carousel spacing, slide sizing, viewport shape, dots, and thumbnails.',
  tokens: `
  --frame-carousel-gap: 1rem;
  --frame-carousel-item-size: 100%;
  --frame-carousel-viewport-radius: var(--frame-radius-lg);
  --frame-carousel-vertical-size: 20rem;
  --frame-carousel-control-gap: 0.625rem;
  --frame-carousel-control-size: 2.5rem;
  --frame-carousel-dot-size: 0.5rem;
  --frame-carousel-dot-active-size: 1.75rem;
  --frame-carousel-thumb-size: 4.25rem;
  `,
};

