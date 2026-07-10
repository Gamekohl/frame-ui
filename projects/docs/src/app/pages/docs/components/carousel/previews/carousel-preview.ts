import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { FrCarouselModule, FrCarouselPlugin } from '@frame-ui-ng/components/carousel';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { tablerChevronLeft, tablerChevronRight } from '@ng-icons/tabler-icons';

export type CarouselPreviewMode =
  | 'api'
  | 'basic'
  | 'inspector'
  | 'options'
  | 'plugins'
  | 'thumbnails'
  | 'vertical';

export type CarouselPreviewConfig = {
  mode?: CarouselPreviewMode;
  className?: string;
  style?: string;
};

@Component({
  selector: 'docs-carousel-preview',
  imports: [FrCarouselModule, NgIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [provideIcons({ tablerChevronLeft, tablerChevronRight })],
  template: `
    <div
      [class]="config().className ?? 'w-full flex justify-center'"
      [style]="config().style ?? null"
    >
      @switch (config().mode ?? 'basic') {
        @case ('vertical') {
          <section
            frCarousel
            orientation="vertical"
            class="docs-carousel docs-carousel--vertical"
            style="--frame-carousel-vertical-size: 18rem;"
          >
            <div frCarouselContent>
              @for (slide of shortSlides; track slide) {
                <article frCarouselItem class="docs-carousel-slide docs-carousel-slide--vertical">
                  {{ slide }}
                </article>
              }
            </div>
          </section>
        }

        @case ('options') {
          <section
            #carousel="frCarousel"
            frCarousel
            [opts]="{ align: 'center', loop: true, slidesToScroll: 1 }"
            class="docs-carousel"
            style="--frame-carousel-item-size: min(82%, 18rem);"
          >
            <div frCarouselContent>
              @for (slide of slides; track slide) {
                <article frCarouselItem class="docs-carousel-slide">{{ slide }}</article>
              }
            </div>

            <div class="docs-carousel-footer">
              <div frCarouselControls>
                <button frCarouselPrevious appearance="outline" size="sm" label="Previous slide">
                  <ng-icon name="tablerChevronLeft" size="18" />
                </button>
                <button frCarouselNext appearance="outline" size="sm" label="Next slide">
                  <ng-icon name="tablerChevronRight" size="18" />
                </button>
              </div>
              <div frCarouselDots>
                @for (index of carousel.snapIndexes(); track index) {
                  <button
                    frCarouselDot
                    [index]="index"
                    [label]="'Go to slide ' + (index + 1)"
                  ></button>
                }
              </div>
            </div>
          </section>
        }

        @case ('api') {
          <div class="docs-carousel-shell">
            <section
              frCarousel
              class="docs-carousel docs-carousel--wide"
              (selectedChange)="selectedSlide.set($event)"
            >
              <div frCarouselContent>
                @for (slide of slides; track slide) {
                  <article frCarouselItem class="docs-carousel-slide">{{ slide }}</article>
                }
              </div>

              <div class="docs-carousel-actions">
                <button frCarouselPrevious appearance="outline" type="button">Previous</button>
                <p>Showing slide {{ selectedSlide() + 1 }} of {{ slides.length }}</p>
                <button frCarouselNext appearance="outline" type="button">Next</button>
              </div>
            </section>
          </div>
        }

        @case ('plugins') {
          <section
            #carousel="frCarousel"
            frCarousel
            loop
            [plugins]="[autoplayPlugin]"
            class="docs-carousel docs-carousel--wide"
          >
            <div frCarouselContent>
              @for (slide of shortSlides; track slide) {
                <article frCarouselItem class="docs-carousel-slide">{{ slide }}</article>
              }
            </div>

            <div class="docs-carousel-footer">
              <div frCarouselControls>
                <button frCarouselPrevious appearance="outline" size="sm" label="Previous slide">
                  <ng-icon name="tablerChevronLeft" size="18" />
                </button>
                <button frCarouselNext appearance="outline" size="sm" label="Next slide">
                  <ng-icon name="tablerChevronRight" size="18" />
                </button>
              </div>
              <div frCarouselDots>
                @for (index of carousel.snapIndexes(); track index) {
                  <button
                    frCarouselDot
                    [index]="index"
                    [label]="'Go to slide ' + (index + 1)"
                  ></button>
                }
              </div>
            </div>
          </section>
        }

        @case ('thumbnails') {
          <section #carousel="frCarousel" frCarousel class="docs-carousel docs-carousel--wide">
            <div frCarouselContent>
              @for (slide of shortSlides; track slide) {
                <article frCarouselItem class="docs-carousel-slide">{{ slide }}</article>
              }
            </div>

            <div frCarouselThumbs>
              @for (slide of shortSlides; track slide; let index = $index) {
                <button frCarouselThumb [index]="index" [label]="'Preview ' + slide">
                  {{ index + 1 }}
                </button>
              }
            </div>
          </section>
        }

        @case ('inspector') {
          <section
            #carousel="frCarousel"
            frCarousel
            class="docs-carousel docs-carousel--wide"
            data-token-target="carousel-root"
          >
            <div frCarouselContent data-token-target="carousel-content">
              @for (slide of shortSlides; track slide) {
                <article
                  frCarouselItem
                  class="docs-carousel-slide"
                  data-token-target="carousel-item"
                >
                  {{ slide }}
                </article>
              }
            </div>

            <div class="docs-carousel-footer">
              <div frCarouselControls data-token-target="carousel-controls">
                <button
                  frCarouselPrevious
                  appearance="outline"
                  size="sm"
                  data-token-target="carousel-control"
                >
                  <ng-icon name="tablerChevronLeft" size="18" />
                </button>
                <button frCarouselNext appearance="outline" size="sm">
                  <ng-icon name="tablerChevronRight" size="18" />
                </button>
              </div>
              <div frCarouselDots data-token-target="carousel-dots">
                @for (index of carousel.snapIndexes(); track index) {
                  <button frCarouselDot [index]="index" data-token-target="carousel-dot"></button>
                }
              </div>
            </div>
            <div frCarouselThumbs data-token-target="carousel-thumbs">
              @for (slide of shortSlides; track slide; let index = $index) {
                <button frCarouselThumb [index]="index" data-token-target="carousel-thumb">
                  {{ index + 1 }}
                </button>
              }
            </div>
          </section>
        }

        @default {
          <section #carousel="frCarousel" frCarousel class="docs-carousel docs-carousel--hero">
            <div frCarouselContent>
              @for (slide of shortSlides; track slide) {
                <article frCarouselItem class="docs-carousel-slide docs-carousel-slide--hero">
                  {{ slide }}
                </article>
              }
            </div>

            <div class="docs-carousel-footer">
              <div frCarouselControls>
                <button frCarouselPrevious appearance="outline" size="sm" label="Previous slide">
                  <ng-icon name="tablerChevronLeft" size="18" />
                </button>
                <button frCarouselNext appearance="outline" size="sm" label="Next slide">
                  <ng-icon name="tablerChevronRight" size="18" />
                </button>
              </div>
              <div frCarouselDots>
                @for (index of carousel.snapIndexes(); track index) {
                  <button
                    frCarouselDot
                    [index]="index"
                    [label]="'Go to slide ' + (index + 1)"
                  ></button>
                }
              </div>
            </div>
          </section>
        }
      }
    </div>
  `,
  styles: `
    .docs-carousel,
    .docs-carousel-shell {
      width: min(100%, 30rem);
    }

    .docs-carousel--wide,
    .docs-carousel--hero,
    .docs-carousel-shell {
      width: min(100%, 42rem);
    }

    .docs-carousel--vertical {
      width: min(100%, 22rem);
    }

    .docs-carousel-slide {
      display: grid;
      min-block-size: 14rem;
      place-items: center;
      border-radius: calc(var(--frame-carousel-viewport-radius) - 2px);
      background: color-mix(in srgb, var(--frame-muted) 72%, var(--frame-surface));
      color: var(--frame-foreground);
      font-size: clamp(1.75rem, 6vw, 3.25rem);
      font-weight: 800;
      letter-spacing: -0.06em;
    }

    .docs-carousel-slide--hero {
      min-block-size: 18rem;
    }

    .docs-carousel-slide--vertical {
      min-block-size: 100%;
    }

    .docs-carousel-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      margin-top: 0.5rem;
    }

    .docs-carousel-footer [frCarouselDots] {
      margin-block-start: 1rem;
    }

    .docs-carousel-actions {
      display: grid;
      grid-template-columns: minmax(6.75rem, max-content) minmax(0, 1fr) minmax(
          6.75rem,
          max-content
        );
      align-items: center;
      gap: 0.75rem;
      margin-block-start: 0.875rem;
    }

    .docs-carousel-actions button {
      inline-size: 100%;
      min-inline-size: 0;
    }

    .docs-carousel-actions p {
      margin: 0;
      color: var(--frame-muted-foreground);
      text-align: center;
      overflow-wrap: anywhere;
    }

    @media (max-width: 520px) {
      .docs-carousel-actions {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .docs-carousel-actions p {
        grid-column: 1 / -1;
        grid-row: 1;
      }
    }
  `,
})
export class DocsCarouselPreviewComponent {
  readonly config = input<CarouselPreviewConfig>({});
  readonly selectedSlide = signal(0);

  readonly shortSlides = ['Slide 1', 'Slide 2', 'Slide 3'];
  readonly slides = ['Slide 1', 'Slide 2', 'Slide 3', 'Slide 4', 'Slide 5'];

  readonly autoplayPlugin: FrCarouselPlugin = (api) => {
    if (typeof window === 'undefined') {
      return;
    }

    const timer = window.setInterval(() => api.scrollNext(), 2600);
    return () => window.clearInterval(timer);
  };
}
