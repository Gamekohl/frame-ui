import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { FrCarouselModule, FrCarouselApi, FrCarouselPlugin } from '@frame-ui-ng/components/carousel';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { tablerChevronLeft, tablerChevronRight } from '@ng-icons/tabler-icons';

export type CarouselPreviewMode =
  | 'basic'
  | 'sizes'
  | 'spacing'
  | 'vertical'
  | 'options'
  | 'api'
  | 'plugins'
  | 'inspector'
  | 'rtl';

export type CarouselPreviewConfig = {
  mode?: CarouselPreviewMode;
  className?: string;
  style?: string;
};

@Component({
  selector: 'docs-carousel-preview',
  imports: [
    FrCarouselModule,
    NgIcon,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [provideIcons({ tablerChevronLeft, tablerChevronRight })],
  template: `
    <div
      [class]="config().className ?? 'w-full flex justify-center'"
      [style]="config().style ?? null"
    >
      @switch (config().mode ?? 'basic') {
        @case ('sizes') {
          <section
            frCarousel
            class="docs-carousel docs-carousel--wide"
            style="--frame-carousel-item-size: min(100%, 16rem); --frame-carousel-control-offset: 0.5rem;"
          >
            <div frCarouselContent>
              @for (slide of slides; track slide.title) {
                <article frCarouselItem class="docs-carousel-slide docs-carousel-slide--compact">
                  <span>{{ slide.kicker }}</span>
                  <strong>{{ slide.title }}</strong>
                </article>
              }
            </div>
            <button frCarouselPrevious appearance="outline" size="sm">
              <ng-icon name="tablerChevronLeft" size="18" />
            </button>
            <button frCarouselNext appearance="outline" size="sm">
              <ng-icon name="tablerChevronRight" size="18" />
            </button>
          </section>
        }

        @case ('spacing') {
          <section
            frCarousel
            class="docs-carousel docs-carousel--wide docs-carousel--airy"
            style="--frame-carousel-gap: 1.5rem; --frame-carousel-item-size: min(100%, 18rem); --frame-carousel-control-offset: 0.5rem;"
          >
            <div frCarouselContent>
              @for (slide of slides; track slide.title) {
                <article frCarouselItem class="docs-carousel-slide docs-carousel-slide--compact">
                  <span>{{ slide.kicker }}</span>
                  <strong>{{ slide.title }}</strong>
                </article>
              }
            </div>
            <button frCarouselPrevious appearance="outline" size="sm">
              <ng-icon name="tablerChevronLeft" size="18" />
            </button>
            <button frCarouselNext appearance="outline" size="sm">
              <ng-icon name="tablerChevronRight" size="18" />
            </button>
          </section>
        }

        @case ('vertical') {
          <section
            frCarousel
            orientation="vertical"
            class="docs-carousel docs-carousel--vertical"
            style="--frame-carousel-vertical-size: 18rem; --frame-carousel-control-offset: 0.5rem;"
          >
            <div frCarouselContent>
              @for (slide of slides; track slide.title) {
                <article frCarouselItem class="docs-carousel-slide">
                  <span>{{ slide.kicker }}</span>
                  <strong>{{ slide.title }}</strong>
                  <p>{{ slide.description }}</p>
                </article>
              }
            </div>
            <button frCarouselPrevious appearance="outline" size="sm">
              <ng-icon name="tablerChevronLeft" size="18" />
            </button>
            <button frCarouselNext appearance="outline" size="sm">
              <ng-icon name="tablerChevronRight" size="18" />
            </button>
          </section>
        }

        @case ('options') {
          <section
            frCarousel
            [opts]="{ align: 'center', loop: true }"
            class="docs-carousel docs-carousel--wide"
            style="--frame-carousel-item-size: min(100%, 18rem); --frame-carousel-control-offset: 0.5rem;"
          >
            <div frCarouselContent>
              @for (slide of slides; track slide.title) {
                <article frCarouselItem class="docs-carousel-slide docs-carousel-slide--compact">
                  <span>Loop enabled</span>
                  <strong>{{ slide.title }}</strong>
                </article>
              }
            </div>
            <button frCarouselPrevious appearance="outline" size="sm">
              <ng-icon name="tablerChevronLeft" size="18" />
            </button>
            <button frCarouselNext appearance="outline" size="sm">
              <ng-icon name="tablerChevronRight" size="18" />
            </button>
          </section>
        }

        @case ('api') {
          <div>
            <section
              frCarousel
              class="docs-carousel"
              style="--frame-carousel-control-offset: 0.5rem;"
              (apiReady)="handleApiReady($event)"
              (selectedChange)="selectedSlide.set($event)"
            >
              <div frCarouselContent>
                @for (slide of slides; track slide.title) {
                  <article frCarouselItem class="docs-carousel-slide">
                    <span>{{ slide.kicker }}</span>
                    <strong>{{ slide.title }}</strong>
                    <p>{{ slide.description }}</p>
                  </article>
                }
              </div>
              <button frCarouselPrevious appearance="outline" size="sm">
                <ng-icon name="tablerChevronLeft" size="18" />
              </button>
              <button frCarouselNext appearance="outline" size="sm">
                <ng-icon name="tablerChevronRight" size="18" />
              </button>
            </section>
            <p class="docs-carousel-status">
              Slide {{ selectedSlide() + 1 }} of {{ slides.length }}
            </p>
          </div>
        }

        @case ('plugins') {
          <section
            frCarousel
            [loop]="true"
            [plugins]="[autoplayPlugin]"
            class="docs-carousel"
            style="--frame-carousel-control-offset: 0.5rem;"
          >
            <div frCarouselContent>
              @for (slide of slides; track slide.title) {
                <article frCarouselItem class="docs-carousel-slide">
                  <span>Autoplay plugin</span>
                  <strong>{{ slide.title }}</strong>
                  <p>{{ slide.description }}</p>
                </article>
              }
            </div>
            <button frCarouselPrevious appearance="outline" size="sm">
              <ng-icon name="tablerChevronLeft" size="18" />
            </button>
            <button frCarouselNext appearance="outline" size="sm">
              <ng-icon name="tablerChevronRight" size="18" />
            </button>
          </section>
        }

        @case ('inspector') {
          <section
            frCarousel
            class="docs-carousel"
            style="--frame-carousel-control-offset: 0.5rem;"
            data-token-target="carousel-root"
          >
            <div frCarouselContent data-token-target="carousel-content">
              @for (slide of slides; track slide.title) {
                <article frCarouselItem class="docs-carousel-slide" data-token-target="carousel-item">
                  <span>{{ slide.kicker }}</span>
                  <strong>{{ slide.title }}</strong>
                  <p>{{ slide.description }}</p>
                </article>
              }
            </div>
            <button
              frCarouselPrevious
              appearance="outline"
              size="sm"
              data-token-target="carousel-previous"
            >
              <ng-icon name="tablerChevronLeft" size="18" />
            </button>
            <button
              frCarouselNext
              appearance="outline"
              size="sm"
              data-token-target="carousel-next"
            >
              <ng-icon name="tablerChevronRight" size="18" />
            </button>
          </section>
        }

        @case ('rtl') {
          <section
            frCarousel
            [opts]="{ direction: 'rtl', align: 'start' }"
            class="docs-carousel"
            style="--frame-carousel-control-offset: 0.5rem;"
          >
            <div frCarouselContent>
              @for (slide of rtlSlides; track slide.title) {
                <article frCarouselItem class="docs-carousel-slide">
                  <span>{{ slide.kicker }}</span>
                  <strong>{{ slide.title }}</strong>
                  <p>{{ slide.description }}</p>
                </article>
              }
            </div>
            <button frCarouselPrevious appearance="outline" size="sm">
              <ng-icon name="tablerChevronLeft" size="18" />
            </button>
            <button frCarouselNext appearance="outline" size="sm">
              <ng-icon name="tablerChevronRight" size="18" />
            </button>
          </section>
        }

        @default {
          <section
            frCarousel
            class="docs-carousel"
            style="--frame-carousel-control-offset: 0.5rem;"
          >
            <div frCarouselContent>
              @for (slide of slides; track slide.title) {
                <article frCarouselItem class="docs-carousel-slide">
                  <span>{{ slide.kicker }}</span>
                  <strong>{{ slide.title }}</strong>
                  <p>{{ slide.description }}</p>
                </article>
              }
            </div>
            <button frCarouselPrevious appearance="outline" size="sm">
              <ng-icon name="tablerChevronLeft" size="18" />
            </button>
            <button frCarouselNext appearance="outline" size="sm">
              <ng-icon name="tablerChevronRight" size="18" />
            </button>
          </section>
        }
      }
    </div>
  `,
  styles: `
    .docs-carousel {
      width: min(100%, 28rem);
    }

    .docs-carousel--wide {
      width: min(100%, 42rem);
    }

    .docs-carousel--vertical {
      width: min(100%, 24rem);
    }

    .docs-carousel-slide {
      display: grid;
      align-content: center;
      min-block-size: 17rem;
      gap: 0.75rem;
      border: 1px solid var(--frame-border);
      border-radius: var(--frame-radius-xl);
      background:
        radial-gradient(circle at 20% 20%, color-mix(in srgb, var(--frame-primary) 18%, transparent), transparent 32%),
        linear-gradient(145deg, var(--frame-surface), color-mix(in srgb, var(--frame-muted) 70%, transparent));
      padding: 2rem;
      text-align: center;
    }

    .docs-carousel-slide--compact {
      min-block-size: 12rem;
    }

    .docs-carousel-slide span {
      color: var(--frame-muted-foreground);
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .docs-carousel-slide strong {
      color: var(--frame-foreground);
      font-size: clamp(1.5rem, 4vw, 2.75rem);
      line-height: 1;
    }

    .docs-carousel-slide p,
    .docs-carousel-status {
      margin: 0;
      color: var(--frame-muted-foreground);
    }

    .docs-carousel--airy [frCarouselContent] {
      padding: 0.25rem;
    }
  `,
})
export class DocsCarouselPreviewComponent {
  readonly config = input<CarouselPreviewConfig>({});
  readonly selectedSlide = signal(0);
  readonly api = signal<FrCarouselApi | null>(null);

  readonly slides = [
    {
      kicker: 'Primitive',
      title: 'Compose',
      description: 'Build the viewport, slides, and controls from small directives.',
    },
    {
      kicker: 'Motion',
      title: 'Snap',
      description: 'Native scroll snap keeps the carousel smooth without a runtime dependency.',
    },
    {
      kicker: 'Theming',
      title: 'Tokenize',
      description: 'Tune spacing, item width, radius, and control placement with CSS variables.',
    },
  ];

  readonly rtlSlides = [
    {
      kicker: 'RTL',
      title: 'اتجاه',
      description: 'The carousel can render right-to-left with the direction option.',
    },
    {
      kicker: 'RTL',
      title: 'تنقل',
      description: 'Controls and slide flow follow the configured document direction.',
    },
    {
      kicker: 'RTL',
      title: 'تكوين',
      description: 'Use the same primitives and tokens for bidirectional layouts.',
    },
  ];

  readonly autoplayPlugin: FrCarouselPlugin = (api) => {
    if (typeof window === 'undefined') {
      return;
    }

    const timer = window.setInterval(() => api.scrollNext(), 2400);
    return () => window.clearInterval(timer);
  };

  handleApiReady(api: FrCarouselApi): void {
    this.api.set(api);
    this.selectedSlide.set(api.selectedScrollSnap());
    api.on('select', () => this.selectedSlide.set(api.selectedScrollSnap()));
  }
}

