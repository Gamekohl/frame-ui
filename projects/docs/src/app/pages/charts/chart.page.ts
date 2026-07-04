import { ViewportScroller } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  NavigationEnd,
  NavigationStart,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { FrTooltipDirective } from '@frame-ui-ng/components/tooltip';
import { DocsCodeBlockComponent } from '../docs/shared/components/docs-code-block/docs-code-block';

import { chartCategories } from './chart-examples.data';

@Component({
  selector: 'docs-chart-page',
  imports: [RouterLink, RouterLinkActive, RouterOutlet, FrTooltipDirective, DocsCodeBlockComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="mx-auto flex max-w-350 flex-col gap-10 px-4 py-8 sm:px-6 xl:px-0">
      <header class="grid gap-8 border-b border-border pb-8 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,28rem)] lg:items-start">
        <div class="min-w-0">
          <p class="docs-blueprint-meta mb-3">Data Visualization</p>
          <h1 class="text-4xl font-semibold tracking-tight text-foreground uppercase">Charts</h1>
          <p class="mt-3 max-w-3xl text-base leading-8 text-muted-foreground">
            Theme-aware chart patterns for dashboards, reports, and operational interfaces. Charts
            are shipped separately from
            <code class="font-mono text-foreground">&#64;frame-ui-ng/components</code> so you only add
            visualization code when your app needs it.
          </p>
        </div>

        <section
          class="min-w-0 border border-border bg-background p-4"
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
              <code class="font-mono text-foreground">&#64;frame-ui-ng/foundation</code> as well for the
              base tokens and theme styles.
            </p>
          </div>
        </section>
      </header>

      <section class="grid min-w-0 gap-8 lg:grid-cols-[15rem_minmax(0,1fr)] lg:items-start">
        <aside class="min-w-0 lg:sticky lg:top-24">
          <div class="border-y border-border py-4">
            <p class="docs-blueprint-meta">Chart Types</p>
            <nav class="mt-4 grid gap-1 text-sm font-semibold" aria-label="Chart types">
              @for (item of categories; track item.id) {
                <a
                  class="flex min-h-9 items-center border-l-2 border-transparent px-3 py-2 text-muted-foreground transition hover:border-border hover:bg-muted/40 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:text-muted-foreground"
                  routerLinkActive="border-primary bg-primary/5 text-foreground"
                  [class.pointer-events-none]="item.disabled"
                  [class.opacity-45]="item.disabled"
                  [routerLink]="item.disabled ? null : ['/charts', item.id]"
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
          </div>
        </aside>

        <section class="min-w-0">
          <router-outlet />
        </section>
      </section>
    </main>
  `,
})
export class ChartPageComponent {
  private readonly router = inject(Router);
  private readonly viewportScroller = inject(ViewportScroller);

  protected readonly categories = chartCategories;

  private pendingChartScrollPosition: [number, number] | null = null;

  constructor() {
    this.router.events.pipe(
      takeUntilDestroyed()
    )
      .subscribe((event) => {
        if (event instanceof NavigationStart && this.isChartTypeSwitch(this.router.url, event.url)) {
          this.pendingChartScrollPosition = this.viewportScroller.getScrollPosition();
          return;
        }

        if (event instanceof NavigationEnd && this.pendingChartScrollPosition) {
          const scrollPosition = this.pendingChartScrollPosition;

          this.pendingChartScrollPosition = null;
          setTimeout(() => this.viewportScroller.scrollToPosition(scrollPosition));
        }
      });
  }

  private isChartTypeSwitch(fromUrl: string, toUrl: string): boolean {
    const fromPath = fromUrl.split(/[?#]/)[0];
    const toPath = toUrl.split(/[?#]/)[0];

    return /^\/charts\/[^/]+$/.test(fromPath) && /^\/charts\/[^/]+$/.test(toPath);
  }
}
