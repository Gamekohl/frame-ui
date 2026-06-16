import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FrTooltipDirective } from '@frame-ui-ng/components/tooltip';
import { DocsCodeBlockComponent } from '../docs/shared/components/docs-code-block/docs-code-block';

import { chartCategories } from './chart-examples.data';

@Component({
  selector: 'docs-chart-page',
  imports: [RouterLink, RouterLinkActive, RouterOutlet, FrTooltipDirective, DocsCodeBlockComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="mx-auto flex max-w-350 flex-col gap-10 px-4 py-8 sm:px-6 xl:px-0">
      <header class="flex flex-col gap-4">
        <div>
          <p class="docs-blueprint-meta mb-3">Data Visualization</p>
          <h1 class="text-4xl font-semibold tracking-tight text-foreground uppercase">Charts</h1>
          <p class="mt-3 max-w-3xl text-base leading-8 text-muted-foreground">
            Theme-aware chart patterns for dashboards, reports, and operational interfaces. Charts
            are shipped separately from
            <code class="font-mono text-foreground">@frame-ui-ng/components</code> so you only add
            visualization code when your app needs it.
          </p>
        </div>

        <section
          class="flex flex-col gap-4 border-y border-border py-5 lg:flex-row lg:items-stretch"
          aria-labelledby="charts-installation-title"
        >
          <div class="flex min-w-0 flex-1 flex-col gap-2">
            <p id="charts-installation-title" class="docs-blueprint-meta">Install</p>
            <p class="max-w-2xl text-sm leading-7 text-muted-foreground">
              Add the charts package next to your existing Frame UI setup, then import the chart
              styles once in your global stylesheet.
            </p>
          </div>

          <div class="flex min-w-0 flex-1 flex-col gap-3 text-sm">
            <docs-code-block
              code="npm install @frame-ui-ng/charts"
              language="bash"
            ></docs-code-block>
            <docs-code-block
              code="@import '@frame-ui-ng/charts/styles.css';"
              language="css"
            ></docs-code-block>
            <docs-code-block
              code="import &#123; FrChartModule &#125; from '@frame-ui-ng/charts';"
              language="ts"
            ></docs-code-block>
            <p class="text-xs leading-6 text-muted-foreground">
              New project? Install
              <code class="font-mono text-foreground">@frame-ui-ng/foundation</code> as well for the
              base tokens and theme styles.
            </p>
          </div>
        </section>

        <nav class="flex flex-wrap gap-6 text-sm font-semibold" aria-label="Chart types">
          @for (item of categories; track item.id) {
            <a
              class="cursor-pointer text-muted-foreground transition hover:text-foreground disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:text-muted-foreground"
              [class.pointer-events-none]="item.disabled"
              [class.opacity-45]="item.disabled"
              [routerLink]="item.disabled ? null : ['/charts', item.id]"
              routerLinkActive="text-foreground"
              [routerLinkActiveOptions]="{ exact: true }"
              [attr.aria-disabled]="item.disabled ? 'true' : null"
              frTooltipArrow
              frTooltipOpenDelay="700"
              [frTooltip]="item.disabled ? 'Available soon' : ''"
            >
              {{ item.label }}
            </a>
          }
        </nav>
      </header>

      <router-outlet />
    </main>
  `,
})
export class ChartPageComponent {
  protected readonly categories = chartCategories;
}
