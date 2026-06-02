import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  PLATFORM_ID,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { DOCUMENT, isPlatformBrowser, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

import { DocsTocItem } from './docs-toc.types';

@Component({
  selector: 'docs-toc',
  imports: [RouterLink, NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    :host {
      display: none;
    }

    @media (min-width: 1280px) {
      :host {
        display: block;
        position: sticky;
        top: 5rem;
        align-self: start;
      }
    }
  `,
  template: `
    <aside>
      <p class="mb-4 text-sm font-semibold text-muted-foreground">On This Page</p>

      <nav class="grid gap-1 border-l border-border text-sm text-muted-foreground">
        @for (item of items(); track item.id) {
          <a
            [routerLink]="[]"
            [fragment]="item.id"
            class="-ml-px border-l border-transparent py-1.5 pl-4 transition hover:text-foreground"
            [ngClass]="{
              'border-foreground font-medium text-foreground': activeId() === item.id,
            }"
            (click)="setActive(item.id)"
          >
            {{ item.title }}
          </a>

          @if (item.children?.length) {
            @for (child of item.children; track child.id) {
              <a
                [routerLink]="[]"
                [fragment]="child.id"
                class="-ml-px border-l border-transparent py-1.5 pl-8 transition hover:text-foreground"
                [ngClass]="{
                  'border-foreground font-medium text-foreground': activeId() === child.id,
                }"
                (click)="setActive(child.id)"
              >
                {{ child.title }}
              </a>
            }
          }
        }
      </nav>
    </aside>
  `,
})
export class DocsTocComponent {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);

  readonly items = input.required<DocsTocItem[]>();

  readonly activeId = signal<string | null>(null);

  readonly flattenedItems = computed(() => {
    return this.items().flatMap((item) => [item, ...(item.children ?? [])]);
  });

  private observer: IntersectionObserver | null = null;

  constructor() {
    effect((onCleanup) => {
      if (!isPlatformBrowser(this.platformId)) {
        return;
      }

      const ids = this.flattenedItems().map((item) => item.id);

      if (!ids.length) {
        return;
      }

      const timeoutId = window.setTimeout(() => {
        this.observeHeadings(ids);
      });

      onCleanup(() => {
        window.clearTimeout(timeoutId);
        this.observer?.disconnect();
        this.observer = null;
      });
    });

    this.destroyRef.onDestroy(() => {
      this.observer?.disconnect();
    });
  }

  setActive(id: string): void {
    this.activeId.set(id);
  }

  private observeHeadings(ids: string[]): void {
    this.observer?.disconnect();

    const elements = ids
      .map((id) => this.document.getElementById(id))
      .filter((element): element is HTMLElement => !!element);

    if (!elements.length) {
      return;
    }

    this.activeId.set(elements[0].id);

    this.observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        const firstVisibleEntry = visibleEntries[0];

        if (firstVisibleEntry?.target.id) {
          this.activeId.set(firstVisibleEntry.target.id);
        }
      },
      {
        root: null,
        rootMargin: '-96px 0px -65% 0px',
        threshold: [0, 1],
      },
    );

    for (const element of elements) {
      this.observer.observe(element);
    }
  }
}
