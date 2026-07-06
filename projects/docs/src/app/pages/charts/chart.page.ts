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

import { chartCategories } from './chart-examples.data';

@Component({
  selector: 'docs-chart-page',
  imports: [RouterLink, RouterLinkActive, RouterOutlet, FrTooltipDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="mx-auto flex max-w-350 flex-col gap-10 px-4 py-8 sm:px-6 xl:px-0">
      <section class="grid min-w-0 gap-8 lg:grid-cols-[15rem_minmax(0,1fr)] lg:items-start">
        <aside class="min-w-0 lg:sticky lg:top-24">
          <div class="docs-blueprint-sheet space-y-7 overflow-y-auto overflow-x-hidden p-4 scrollbar-none lg:max-h-[calc(100vh-7rem)]">
            <section>
              <p class="docs-blueprint-meta mb-3">01 Intro</p>
              <nav class="grid gap-1 text-sm" aria-label="Charts introduction">
                <a
                  class="rounded-md border border-transparent p-2 text-muted-foreground hover:border-border hover:bg-muted hover:text-foreground"
                  routerLinkActive="font-semibold !text-foreground"
                  routerLink="/charts/introduction"
                >
                  Introduction
                </a>
              </nav>
            </section>

            <section>
              <p class="docs-blueprint-meta mb-3">02 Chart Types</p>
              <nav class="grid gap-1 text-sm" aria-label="Chart types">
                @for (item of categories; track item.id) {
                  <a
                    class="rounded-md border border-transparent p-2 text-muted-foreground hover:border-border hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:text-muted-foreground"
                    routerLinkActive="font-semibold !text-foreground"
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
            </section>
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
    this.router.events.pipe(takeUntilDestroyed()).subscribe((event) => {
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
