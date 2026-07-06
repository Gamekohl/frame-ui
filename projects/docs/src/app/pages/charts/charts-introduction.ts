import { Component } from '@angular/core';
import { FrCornerHandles } from '@frame-ui-ng/components';
import { DocsCodeBlockComponent } from '../docs/shared/components/docs-code-block/docs-code-block';

@Component({
  selector: 'docs-chart-introduction',
  imports: [DocsCodeBlockComponent, FrCornerHandles],
  template: `
    <article class="docs-article min-w-0 space-y-12">
      <header animate.enter="slide-in-enter" style="--docs-enter-delay: 90ms" class="min-w-0">
        <p class="docs-blueprint-meta mb-3">Data Visualization</p>
        <h1 class="text-4xl font-semibold tracking-tight text-foreground uppercase">Charts</h1>
        <p class="mt-3 max-w-3xl text-base leading-8 text-muted-foreground">
          Theme-aware chart patterns for dashboards, reports, and operational interfaces. Charts are
          shipped separately from
          <code class="font-mono text-foreground">&#64;frame-ui-ng/components</code> so you only add
          visualization code when your app needs it.
        </p>
      </header>

      <section
        frCornerHandles
        animate.enter="slide-in-enter"
        style="--docs-enter-delay: 150ms"
        class="min-w-0 border border-border bg-background p-4 docs-blueprint-sheet"
        aria-labelledby="charts-installation-title"
      >
        <div class="flex min-w-0 flex-col gap-2">
          <p id="charts-installation-title" class="docs-blueprint-meta">Install</p>
          <p class="text-sm leading-7 text-muted-foreground">
            Add the charts package next to your existing Frame UI setup, then import the chart
            styles once in your global stylesheet.
          </p>
        </div>

        <div class="mt-4 flex min-w-0 flex-col gap-3 text-sm">
          <docs-code-block code="npm install @frame-ui-ng/charts" language="bash"></docs-code-block>
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
            <code class="font-mono text-foreground">&#64;frame-ui-ng/foundation</code> as well for
            the base tokens and theme styles.
          </p>
        </div>
      </section>
    </article>
  `,
})
export class ChartsIntroduction {}