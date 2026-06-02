import { ComponentDoc } from '../../shared/models/component-doc.model';
import { DocsCarouselPreviewComponent } from './previews/carousel-preview';

const carouselImportsCode = `import { FrCarouselModule } from '@frame-ui/components/carousel';`;

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
      code: `<section frCarousel>
  <div frCarouselContent>
    <div frCarouselItem>Slide 1</div>
    <div frCarouselItem>Slide 2</div>
    <div frCarouselItem>Slide 3</div>
  </div>
  <button frCarouselPrevious appearance="outline">
    <ng-icon name="tablerChevronLeft" size="18" />
  </button>
  <button frCarouselNext appearance="outline">
    <ng-icon name="tablerChevronRight" size="18" />
  </button>
</section>`,
    },
  ],

  tokenInspector: {
    id: 'token-inspector',
    title: 'Token inspector',
    description:
      'Inspect the carousel root, scroll viewport, slide item, and positioned controls.',
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
            'The carousel root owns orientation, alignment, direction, and control placement.',
          tokens: ['--frame-carousel-control-offset', '--frame-carousel-control-size'],
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
          id: 'previous',
          label: 'Previous',
          selector: '[data-token-target="carousel-previous"]',
          description: 'Previous control inherits button tokens plus carousel control sizing.',
          tokens: ['--frame-carousel-control-size', '--frame-carousel-control-offset'],
        },
        {
          id: 'next',
          label: 'Next',
          selector: '[data-token-target="carousel-next"]',
          description: 'Next control inherits button tokens plus carousel control sizing.',
          tokens: ['--frame-carousel-control-size', '--frame-carousel-control-offset'],
        },
      ],
    },
  },

  styling: {
    description:
      'Override carousel tokens locally to tune slide width, gap, viewport radius, and control placement.',
    preview: {
      id: 'custom-styling-preview',
      title: 'Custom Styling Preview',
      description: 'This preview customizes slide sizing, gap, radius, and control position.',
      preview: {
        component: DocsCarouselPreviewComponent,
        inputs: {
          config: {
            style: `--frame-carousel-gap: 1.25rem;
--frame-carousel-item-size: min(100%, 18rem);
--frame-carousel-viewport-radius: 1.5rem;
--frame-carousel-control-offset: 0.75rem;`,
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
  --frame-carousel-viewport-radius: 1.5rem;
  --frame-carousel-control-offset: 0.75rem;
}`,
        },
      ],
    },
  },

  examples: [
    {
      id: 'basic',
      title: 'Basic',
      description: 'A basic carousel with a scrollable content viewport, slide items, and controls.',
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
          code: `<section frCarousel>
  <div frCarouselContent>
    <article frCarouselItem>Slide 1</article>
    <article frCarouselItem>Slide 2</article>
    <article frCarouselItem>Slide 3</article>
  </div>
  <button frCarouselPrevious appearance="outline">
    <ng-icon name="tablerChevronLeft" size="18" />
  </button>
  <button frCarouselNext appearance="outline">
    <ng-icon name="tablerChevronRight" size="18" />
  </button>
</section>`,
        },
      ],
    },
    {
      id: 'sizes',
      title: 'Sizes',
      description:
        'Set --frame-carousel-item-size to show multiple slides in the viewport, similar to basis utilities.',
      preview: {
        component: DocsCarouselPreviewComponent,
        inputs: { config: { mode: 'sizes' } },
      },
      code: [
        {
          language: 'ts',
          code: carouselImportsCode,
        },
        {
          language: 'html',
          code: `<section frCarousel class="carousel-sizes">
  <div frCarouselContent>
    <article frCarouselItem>...</article>
  </div>
</section>`,
        },
        {
          language: 'css',
          code: `.carousel-sizes {
  --frame-carousel-item-size: min(100%, 16rem);
}`,
        },
      ],
    },
    {
      id: 'spacing',
      title: 'Spacing',
      description:
        'Set --frame-carousel-gap on the root to control the distance between carousel items.',
      preview: {
        component: DocsCarouselPreviewComponent,
        inputs: { config: { mode: 'spacing' } },
      },
      code: [
        {
          language: 'ts',
          code: carouselImportsCode,
        },
        {
          language: 'html',
          code: `<section frCarousel class="carousel-spacing">
  ...
</section>`,
        },
        {
          language: 'css',
          code: `.carousel-spacing {
  --frame-carousel-gap: 1.5rem;
}`,
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
          code: `import { FrCarouselModule, FrCarouselOptions } from '@frame-ui/components/carousel';

readonly carouselOptions = {
  align: 'center',
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
      title: 'API',
      description:
        'Use apiReady, selectedChange, and the carousel API to react to selection changes or control slides.',
      preview: {
        component: DocsCarouselPreviewComponent,
        inputs: { config: { mode: 'api' } },
      },
      code: [
        {
          language: 'ts',
          code: `import { signal } from '@angular/core';
import { FrCarouselApi, FrCarouselModule } from '@frame-ui/components/carousel';

readonly selected = signal(0);

handleApiReady(api: FrCarouselApi) {
  api.on('select', () => {
    this.selected.set(api.selectedScrollSnap());
  });
}`,
        },
        {
          language: 'html',
          code: `<section
  frCarousel
  (apiReady)="handleApiReady($event)"
  (selectedChange)="selected.set($event)"
>
  ...
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
          code: `import { FrCarouselModule, FrCarouselPlugin } from '@frame-ui/components/carousel';

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
    },
    {
      id: 'rtl',
      title: 'RTL support',
      description:
        'Set direction through opts to render the scroll viewport and controls in right-to-left layouts.',
      preview: {
        component: DocsCarouselPreviewComponent,
        inputs: { config: { mode: 'rtl' } },
      },
      code: [
        {
          language: 'ts',
          code: `import { FrCarouselModule, FrCarouselOptions } from '@frame-ui/components/carousel';

readonly rtlOptions = {
  direction: 'rtl',
  align: 'start',
} satisfies FrCarouselOptions;`,
        },
        {
          language: 'html',
          code: `<section frCarousel [opts]="rtlOptions">
  ...
</section>`,
        },
      ],
    },
  ],

  tokensTitle: 'Design Tokens',
  tokensDescription:
    'Use these CSS custom properties to tune carousel spacing, slide sizing, viewport shape, and control placement.',
  tokens: `
  --frame-carousel-gap: 1rem;
  --frame-carousel-item-size: 100%;
  --frame-carousel-control-offset: -3rem;
  --frame-carousel-control-size: 2.5rem;
  --frame-carousel-viewport-radius: var(--frame-radius-lg);
  --frame-carousel-vertical-size: 20rem;
  `,
};

