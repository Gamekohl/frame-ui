import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { FrButton, FrButtonIcon, FrButtonLabel } from '@frame-ui-ng/components/button';
import { FrChart } from '@frame-ui-ng/charts';
import {
  FrSheetBody,
  FrSheetClose,
  FrSheetContent,
  FrSheetDescription,
  FrSheetHeader,
  FrSheetPanel,
  FrSheetTitle,
  FrSheetTrigger,
} from '@frame-ui-ng/components/sheet';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { tablerChartAreaLine, tablerCode } from '@ng-icons/tabler-icons';

import { DocsCodeBlockComponent } from '../docs/shared/components/docs-code-block/docs-code-block';
import { DocsTokenInspectorComponent } from '../docs/shared/components/docs-token-inspector/docs-token-inspector';
import {
  chartCategories,
  ChartExample,
  chartExamples,
  chartInspectorTargets,
  chartTokens,
} from './chart-examples.data';
import type { ChartCategoryId } from './chart-examples.data';

@Component({
  selector: 'docs-chart-examples',
  imports: [
    DocsCodeBlockComponent,
    DocsTokenInspectorComponent,
    FrButton,
    FrButtonIcon,
    FrButtonLabel,
    FrChart,
    FrSheetBody,
    FrSheetClose,
    FrSheetContent,
    FrSheetDescription,
    FrSheetHeader,
    FrSheetPanel,
    FrSheetTitle,
    FrSheetTrigger,
    NgIcon,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="flex flex-col gap-16">
      @if (featuredExample(); as featured) {
        <article class="flex flex-col gap-3">
          <div class="flex items-center justify-between gap-4">
            <p class="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <ng-icon name="tablerChartAreaLine" size="16" />
              {{ categoryLabel() }}
            </p>
            <button
              frButton
              appearance="outline"
              size="sm"
              type="button"
              [frSheetTrigger]="codeSheet"
              (click)="selectedExample.set(featured)"
            >
              <ng-icon name="tablerCode" size="16" frButtonIcon />
              <span frButtonLabel>View Code</span>
            </button>
          </div>

          <div class="docs-chart-example docs-chart-example--featured">
            <div class="docs-chart-example__header">
              <div>
                <h2>{{ featured.title }}</h2>
                <p>{{ featured.description }}</p>
              </div>
            </div>
            <frame-chart
              [type]="featured.type"
              [barLayout]="featured.barLayout ?? 'grouped'"
              [barOrientation]="featured.barOrientation ?? 'vertical'"
              [curve]="featured.curve ?? 'smooth'"
              [xKey]="featured.xKey ?? 'month'"
              [data]="featured.data"
              [series]="featured.series"
              [legendToggle]="featured.legendToggle ?? false"
              [valueFormatter]="featured.valueFormatter ?? null"
            />
          </div>
        </article>
      }

      <div class="flex flex-wrap gap-8">
        @for (example of compactExamples(); track example.id) {
          <article
            class="docs-chart-card"
            [class.docs-chart-card--sparkline-pair]="isSparklinePair(example)"
          >
            <div class="flex items-center justify-between gap-4">
              <p class="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <ng-icon name="tablerChartAreaLine" size="16" />
                {{ categoryLabel() }}
              </p>
              <button
                frButton
                appearance="outline"
                size="sm"
                type="button"
                [frSheetTrigger]="codeSheet"
                (click)="selectedExample.set(example)"
              >
                <ng-icon name="tablerCode" size="16" frButtonIcon />
                <span frButtonLabel>View Code</span>
              </button>
            </div>

            <div class="docs-chart-example">
              <div class="docs-chart-example__header">
                <div>
                  <h2>{{ example.title }}</h2>
                  <p>{{ example.description }}</p>
                </div>
              </div>
              @if (example.barLabel) {
                <div class="docs-chart-example__bar-label-shell">
                  <frame-chart
                    [type]="example.type"
                    [barLayout]="example.barLayout ?? 'grouped'"
                    [barOrientation]="example.barOrientation ?? 'vertical'"
                    [curve]="example.curve ?? 'smooth'"
                    [xKey]="example.xKey ?? 'month'"
                    [data]="example.data"
                    [series]="example.series"
                    [legendToggle]="example.legendToggle ?? false"
                    [valueFormatter]="example.valueFormatter ?? null"
                    [showYAxis]="example.type === 'bar' && example.barOrientation === 'horizontal'"
                  />
                  <span class="docs-chart-example__bar-label">{{ example.barLabel }}</span>
                </div>
              } @else {
                <frame-chart
                  [type]="example.type"
                  [barLayout]="example.barLayout ?? 'grouped'"
                  [barOrientation]="example.barOrientation ?? 'vertical'"
                  [curve]="example.curve ?? 'smooth'"
                  [xKey]="example.xKey ?? 'month'"
                  [data]="example.data"
                  [series]="example.series"
                  [legendToggle]="example.legendToggle ?? false"
                  [valueFormatter]="example.valueFormatter ?? null"
                  [showYAxis]="example.type === 'bar' && example.barOrientation === 'horizontal'"
                />
              }
            </div>
          </article>
        }
      </div>
    </section>

    <ng-template
      #codeSheet="frSheetContent"
      frSheetContent
      aria-label="Chart example code"
      width="min(92vw, 64rem)"
      maxWidth="100vw"
    >
      <div frSheetPanel side="right" scrollable style="inline-size: min(92vw, 64rem); max-inline-size: 100vw">
        <div frSheetHeader>
          <h2 frSheetTitle>{{ selectedExample()?.title ?? 'Chart code' }}</h2>
          <p frSheetDescription>
            {{ selectedExample()?.description ?? 'Example implementation.' }}
          </p>
        </div>

        <div frSheetBody>
          <div class="flex flex-col gap-8">
            <section class="flex flex-col gap-4">
              <div>
                <h3 class="docs-mono text-sm font-semibold uppercase text-foreground">Code</h3>
                <p class="mt-1 text-sm leading-6 text-muted-foreground">
                  Implementation snippets for the selected chart example.
                </p>
              </div>

              @for (block of selectedExample()?.code ?? []; track block.code) {
                <docs-code-block [code]="block.code" [language]="block.language" rounded />
              }
            </section>

            @if (selectedExample()) {
              <section class="flex flex-col gap-4">
                <div>
                  <h3 class="docs-mono text-sm font-semibold uppercase text-foreground">Token Inspector</h3>
                  <p class="mt-1 text-sm leading-6 text-muted-foreground">
                    Hover or click a chart region to inspect the tokens that shape the selected example.
                  </p>
                </div>

                <docs-token-inspector
                  [component]="chartComponent"
                  [inputs]="chartInspectorInputs()"
                  [targets]="chartInspectorTargets"
                  [containerClass]="'flex min-h-85 items-center justify-center px-4 py-6'"
                  layout="side-panel"
                />
              </section>
            }

            <section class="flex flex-col gap-4">
              <div>
                <h3 class="docs-mono text-sm font-semibold uppercase text-foreground">Design Tokens</h3>
                <p class="mt-1 text-sm leading-6 text-muted-foreground">
                  Chart tokens control height, the seed palette, grid and axis treatment, and tooltip presentation.
                </p>
              </div>

              <docs-code-block [code]="chartTokens" language="css" rounded />
            </section>

            <div class="flex-1"></div>
            <div class="flex items-center justify-end gap-2">
              <button frSheetClose size="lg" frButton>Close</button>
            </div>
          </div>
        </div>
      </div>
    </ng-template>
  `,
  styles: `
    .docs-chart-example,
    .docs-chart-card {
      min-width: min(100%, 22rem);
    }

    .docs-chart-card {
      flex: 1 1 22rem;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .docs-chart-card--sparkline-pair {
      flex-basis: min(100%, calc(50% - 1rem));
    }

    .docs-chart-example {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      overflow: hidden;
      border: 1px solid var(--frame-border);
      border-radius: var(--frame-radius-xl);
      background: color-mix(in srgb, var(--frame-surface) 96%, var(--frame-primary));
      box-shadow: var(--frame-shadow-sm);
    }

    .docs-chart-example--featured {
      --frame-chart-height: 22rem;
    }

    .docs-chart-example:not(.docs-chart-example--featured) {
      --frame-chart-height: 15rem;
    }

    .docs-chart-example__header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 1rem;
      padding: 1.25rem 1.5rem 0;
    }

    .docs-chart-example__header h2 {
      margin: 0;
      color: var(--frame-foreground);
      font-size: 1.05rem;
      font-weight: 700;
      letter-spacing: 0;
    }

    .docs-chart-example__header p {
      margin: 0.25rem 0 0;
      color: var(--frame-muted-foreground);
      font-size: 0.875rem;
      line-height: 1.5;
    }

    .docs-chart-example frame-chart {
      padding: 0 1.25rem 1.25rem;
    }

    .docs-chart-example [data-sparkline] {
      --frame-chart-height: 7.5rem;
    }

    .docs-chart-example__bar-label-shell {
      position: relative;
      min-width: 0;
      padding: 0 1.25rem 1.25rem;
    }

    .docs-chart-example__bar-label-shell frame-chart {
      padding: 0;
    }

    .docs-chart-example__bar-label {
      position: absolute;
      top: calc((100% - 1.25rem) / 2);
      right: 2rem;
      color: var(--frame-primary-foreground);
      font-size: 0.75rem;
      font-weight: 650;
      letter-spacing: -0.01em;
      line-height: 1;
      pointer-events: none;
      transform: translateY(-50%);
    }
  `,
  viewProviders: [provideIcons({ tablerChartAreaLine, tablerCode })],
})
export class ChartExamplesComponent {
  readonly category = input.required<ChartCategoryId>();

  protected readonly chartComponent = FrChart;
  protected readonly chartInspectorTargets = chartInspectorTargets;
  protected readonly chartTokens = chartTokens;
  protected readonly selectedExample = signal<ChartExample | null>(null);
  protected readonly visibleExamples = computed(() =>
    chartExamples.filter((example) => example.category === this.category()),
  );
  protected readonly featuredExample = computed(
    () =>
      this.visibleExamples().find((example) => example.featured) ??
      this.visibleExamples()[0] ??
      null,
  );
  protected readonly compactExamples = computed(() =>
    this.visibleExamples().filter((example) => example.id !== this.featuredExample()?.id),
  );
  protected readonly chartInspectorInputs = computed(() => {
    const example = this.selectedExample() ?? this.featuredExample();

    if (!example) {
      return {};
    }

    return {
      type: example.type,
      barLayout: example.barLayout ?? 'grouped',
      barOrientation: example.barOrientation ?? 'vertical',
      curve: example.curve ?? 'smooth',
      xKey: example.xKey ?? 'month',
      data: example.data,
      series: example.series,
      legendToggle: example.legendToggle ?? false,
      valueFormatter: example.valueFormatter ?? null,
      showYAxis: !(example.type === 'pie' || example.type === 'donut' || example.type === 'radial'),
      height: 260,
      ariaLabel: example.title,
    };
  });

  protected categoryLabel(): string {
    return (
      chartCategories
        .find((category) => category.id === this.category())
        ?.label.replace(/s$/, '') ?? 'Chart'
    );
  }

  protected isSparklinePair(example: ChartExample): boolean {
    return example.id === 'sparkline-column' || example.id === 'sparkline-bar';
  }
}
