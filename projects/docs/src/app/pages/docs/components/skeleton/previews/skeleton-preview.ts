import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FrField, FrFieldLabel } from '@frame-ui-ng/components/field';
import { FrSkeletonModule } from '@frame-ui-ng/components/skeleton';

export type SkeletonPreviewMode =
  | 'avatar'
  | 'basic'
  | 'card'
  | 'custom-styling'
  | 'form'
  | 'inspector'
  | 'rtl'
  | 'table'
  | 'text';

export type SkeletonPreviewConfig = {
  mode: SkeletonPreviewMode;
};

@Component({
  selector: 'docs-skeleton-preview',
  host: {
    class: 'block w-full',
  },
  imports: [FrField, FrFieldLabel, FrSkeletonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @switch (config().mode) {
      @case ('basic') {
        <div class="docs-skeleton-row">
          <div frSkeleton width="3rem" height="3rem" radius="var(--frame-radius-full)"></div>
          <div class="docs-skeleton-stack">
            <div frSkeleton width="12rem" height="1rem"></div>
            <div frSkeleton width="8rem" height="0.875rem"></div>
          </div>
        </div>
      }

      @case ('avatar') {
        <div class="docs-skeleton-card docs-skeleton-profile">
          <div frSkeleton width="4rem" height="4rem" radius="var(--frame-radius-full)"></div>
          <div class="docs-skeleton-stack">
            <div frSkeleton width="11rem" height="1.125rem"></div>
            <div frSkeleton width="15rem" height="0.875rem"></div>
            <div frSkeleton width="9rem" height="0.875rem"></div>
          </div>
        </div>
      }

      @case ('card') {
        <section class="docs-skeleton-dashboard-card">
          <div frSkeleton height="8rem" radius="var(--frame-radius-lg)"></div>
          <div class="docs-skeleton-stack">
            <div frSkeleton width="65%" height="1rem"></div>
            <div frSkeleton width="92%" height="0.875rem"></div>
            <div frSkeleton width="74%" height="0.875rem"></div>
          </div>
        </section>
      }

      @case ('text') {
        <article class="docs-skeleton-card">
          <div frSkeleton width="42%" height="1.25rem"></div>
          <div class="docs-skeleton-lines">
            <div frSkeleton></div>
            <div frSkeleton></div>
            <div frSkeleton width="86%"></div>
            <div frSkeleton width="52%"></div>
          </div>
        </article>
      }

      @case ('form') {
        <form class="docs-skeleton-form" aria-label="Loading account settings">
          <div frField>
            <label frFieldLabel>Email</label>
            <div frSkeleton height="2.5rem" radius="var(--frame-radius-md)"></div>
          </div>
          <div frField>
            <label frFieldLabel>Workspace URL</label>
            <div frSkeleton height="2.5rem" radius="var(--frame-radius-md)"></div>
          </div>
          <div frSkeleton width="7rem" height="2.25rem" radius="var(--frame-radius-md)"></div>
        </form>
      }

      @case ('table') {
        <div class="docs-skeleton-table" role="table" aria-label="Loading deployment rows">
          @for (row of tableRows; track row) {
            <div class="docs-skeleton-table__row" role="row">
              <div frSkeleton width="32%" height="0.875rem"></div>
              <div frSkeleton width="22%" height="0.875rem"></div>
              <div frSkeleton width="18%" height="0.875rem"></div>
            </div>
          }
        </div>
      }

      @case ('custom-styling') {
        <section class="docs-skeleton-dashboard-card docs-skeleton-dashboard-card--custom">
          <div frSkeleton height="7rem" radius="var(--frame-radius-lg)"></div>
          <div class="docs-skeleton-stack">
            <div frSkeleton width="55%" height="1rem"></div>
            <div frSkeleton width="88%" height="0.875rem"></div>
            <div frSkeleton width="62%" height="0.875rem"></div>
          </div>
        </section>
      }

      @case ('rtl') {
        <div class="docs-skeleton-card docs-skeleton-profile" dir="rtl" lang="ar">
          <div frSkeleton width="4rem" height="4rem" radius="var(--frame-radius-full)"></div>
          <div class="docs-skeleton-stack">
            <div frSkeleton width="10rem" height="1.125rem"></div>
            <div frSkeleton width="14rem" height="0.875rem"></div>
            <div frSkeleton width="8rem" height="0.875rem"></div>
          </div>
        </div>
      }

      @case ('inspector') {
        <section class="docs-skeleton-card docs-skeleton-inspector" data-token-target="skeleton-surface">
          <div
            frSkeleton
            width="3.5rem"
            height="3.5rem"
            radius="var(--frame-radius-full)"
            data-token-target="skeleton-avatar"
          ></div>
          <div class="docs-skeleton-stack">
            <div frSkeleton width="12rem" height="1rem" data-token-target="skeleton-line"></div>
            <div frSkeleton width="8rem" height="0.875rem" data-token-target="skeleton-short-line"></div>
          </div>
        </section>
      }
    }
  `,
  styles: `
    .docs-skeleton-row,
    .docs-skeleton-card,
    .docs-skeleton-dashboard-card,
    .docs-skeleton-form,
    .docs-skeleton-table {
      width: min(100%, 30rem);
      margin-inline: auto;
    }

    .docs-skeleton-row,
    .docs-skeleton-card {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1.25rem;
      border: 1px solid var(--frame-border);
      border-radius: var(--frame-radius-lg);
      background: var(--frame-surface);
      box-shadow: 0 16px 40px rgb(0 0 0 / 0.06);
    }

    .docs-skeleton-stack,
    .docs-skeleton-lines {
      display: grid;
      flex: 1;
      gap: 0.625rem;
      min-width: 0;
    }

    .docs-skeleton-profile {
      align-items: flex-start;
    }

    .docs-skeleton-dashboard-card,
    .docs-skeleton-form,
    .docs-skeleton-table {
      display: grid;
      gap: 1rem;
      padding: 1.25rem;
      border: 1px solid var(--frame-border);
      border-radius: var(--frame-radius-lg);
      background: var(--frame-surface);
      box-shadow: 0 16px 40px rgb(0 0 0 / 0.06);
    }

    .docs-skeleton-form {
      gap: 1rem;
    }

    .docs-skeleton-table {
      gap: 0;
      padding: 0.5rem;
    }

    .docs-skeleton-table__row {
      display: grid;
      grid-template-columns: 1.5fr 1fr 0.75fr;
      gap: 1rem;
      padding: 0.875rem;
      border-radius: var(--frame-radius-md);
    }

    .docs-skeleton-table__row + .docs-skeleton-table__row {
      border-block-start: 1px solid var(--frame-border);
    }

    .docs-skeleton-dashboard-card--custom {
      --frame-skeleton-bg: color-mix(in srgb, var(--frame-primary) 16%, var(--frame-muted));
      --frame-skeleton-highlight: color-mix(in srgb, var(--frame-primary-foreground) 55%, transparent);
      --frame-skeleton-animation-duration: 1s;
      background:
        radial-gradient(circle at top right, color-mix(in srgb, var(--frame-primary) 14%, transparent), transparent 38%),
        var(--frame-surface);
    }

    .docs-skeleton-inspector {
      width: min(100%, 28rem);
    }
  `,
})
export class DocsSkeletonPreviewComponent {
  readonly config = input.required<SkeletonPreviewConfig>();
  protected readonly tableRows = Array.from({ length: 5 }, (_, index) => index);
}
