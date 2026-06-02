import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FrSeparatorModule } from '@frame-ui/components/separator';

export type SeparatorPreviewMode =
  | 'basic'
  | 'custom-styling'
  | 'inspector'
  | 'list'
  | 'menu'
  | 'semantic'
  | 'vertical'
  | 'rtl';

export type SeparatorPreviewConfig = {
  mode: SeparatorPreviewMode;
};

@Component({
  selector: 'docs-separator-preview',
  host: {
    class: 'block w-full',
  },
  imports: [FrSeparatorModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @switch (config().mode) {
      @case ('basic') {
        <section class="docs-separator-card" aria-labelledby="basic-title">
          <div>
            <h3 id="basic-title">Release notes</h3>
            <p>Small fixes, clearer navigation, and a few quality-of-life updates.</p>
          </div>
          <div frSeparator></div>
          <p class="docs-separator-muted">Updated 12 minutes ago by the docs team.</p>
        </section>
      }

      @case ('vertical') {
        <nav class="docs-separator-nav" aria-label="Product sections">
          <a href="#">Overview</a>
          <div frSeparator orientation="vertical"></div>
          <a href="#">Components</a>
          <div frSeparator orientation="vertical"></div>
          <a href="#">Tokens</a>
        </nav>
      }

      @case ('menu') {
        <div class="docs-separator-menu" role="list">
          <article role="listitem">
            <strong>Notifications</strong>
            <span>Choose when the workspace should interrupt you.</span>
          </article>
          <div frSeparator></div>
          <article role="listitem">
            <strong>Security</strong>
            <span>Review sessions, passkeys, and recovery methods.</span>
          </article>
          <div frSeparator></div>
          <article role="listitem">
            <strong>Billing</strong>
            <span>Manage invoices, seats, and payment details.</span>
          </article>
        </div>
      }

      @case ('list') {
        <div class="docs-separator-list">
          <div class="docs-separator-list__row">
            <span>Drafts reviewed</span>
            <strong>18</strong>
          </div>
          <div frSeparator></div>
          <div class="docs-separator-list__row">
            <span>Comments resolved</span>
            <strong>42</strong>
          </div>
          <div frSeparator></div>
          <div class="docs-separator-list__row">
            <span>Ready to publish</span>
            <strong>7</strong>
          </div>
        </div>
      }

      @case ('semantic') {
        <section class="docs-separator-card" aria-labelledby="semantic-title">
          <h3 id="semantic-title">Keyboard region</h3>
          <p>Use a semantic separator when the boundary itself communicates structure.</p>
          <div frSeparator [decorative]="false" aria-label="End of keyboard instructions"></div>
          <p class="docs-separator-muted">Decorative separators remain presentation-only by default.</p>
        </section>
      }

      @case ('custom-styling') {
        <section class="docs-separator-card docs-separator-card--custom">
          <h3>Repository health</h3>
          <div class="docs-separator-metrics">
            <span>Checks passing</span>
            <div class="docs-separator-custom" frSeparator orientation="vertical"></div>
            <strong>98%</strong>
          </div>
          <div class="docs-separator-custom" frSeparator></div>
          <p>Use local token overrides when a separator needs stronger visual rhythm.</p>
        </section>
      }

      @case ('rtl') {
        <section class="docs-separator-card" dir="rtl" lang="ar">
          <h3>ملخص المساحة</h3>
          <p>تساعد الفواصل على تنظيم المعلومات داخل الواجهات ثنائية الاتجاه.</p>
          <div frSeparator></div>
          <nav class="docs-separator-nav" aria-label="أقسام المنتج">
            <a href="#">نظرة عامة</a>
            <div frSeparator orientation="vertical"></div>
            <a href="#">المكونات</a>
            <div frSeparator orientation="vertical"></div>
            <a href="#">الألوان</a>
          </nav>
        </section>
      }

      @case ('inspector') {
        <section class="docs-separator-card docs-separator-inspector" data-token-target="separator-card">
          <h3>Workspace summary</h3>
          <p>Three high-priority updates are waiting for review.</p>
          <div frSeparator data-token-target="separator-horizontal"></div>
          <div class="docs-separator-metrics">
            <span>Open</span>
            <div frSeparator orientation="vertical" data-token-target="separator-vertical"></div>
            <strong>12 issues</strong>
          </div>
        </section>
      }
    }
  `,
  styles: `
    .docs-separator-card {
      display: grid;
      gap: 1rem;
      width: min(100%, 30rem);
      margin-inline: auto;
      padding: 1.25rem;
      border: 1px solid var(--frame-border);
      border-radius: var(--frame-radius-lg);
      background: var(--frame-surface);
      color: var(--frame-foreground);
      box-shadow: 0 16px 40px rgb(0 0 0 / 0.06);
    }

    .docs-separator-card h3,
    .docs-separator-card p {
      margin: 0;
    }

    .docs-separator-card h3 {
      font-size: 1rem;
      font-weight: 650;
    }

    .docs-separator-card p,
    .docs-separator-muted {
      color: var(--frame-muted-foreground);
      font-size: 0.875rem;
      line-height: 1.5;
    }

    .docs-separator-nav {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.875rem;
      min-block-size: 2.25rem;
      width: min(100%, 28rem);
      margin-inline: auto;
      color: var(--frame-foreground);
      font-size: 0.9375rem;
    }

    .docs-separator-nav a {
      color: inherit;
      text-decoration: none;
    }

    .docs-separator-nav a:hover {
      text-decoration: underline;
      text-underline-offset: 0.25rem;
    }

    .docs-separator-menu,
    .docs-separator-list {
      display: grid;
      width: min(100%, 28rem);
      margin-inline: auto;
      padding: 0.5rem;
      border: 1px solid var(--frame-border);
      border-radius: var(--frame-radius-lg);
      background: var(--frame-surface);
      color: var(--frame-foreground);
    }

    .docs-separator-menu article {
      display: grid;
      gap: 0.25rem;
      padding: 0.875rem;
    }

    .docs-separator-menu span,
    .docs-separator-list span {
      color: var(--frame-muted-foreground);
      font-size: 0.875rem;
    }

    .docs-separator-list {
      gap: 0.75rem;
      padding: 1rem;
    }

    .docs-separator-list__row,
    .docs-separator-metrics {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.875rem;
    }

    .docs-separator-card--custom {
      --frame-separator-color: linear-gradient(90deg, transparent, var(--frame-primary), transparent);
      --frame-separator-thickness: 2px;
      --frame-separator-horizontal-margin-block: 0.25rem;
      --frame-separator-vertical-height: 1.5rem;
      --frame-separator-vertical-margin-inline: 0.25rem;
      background:
        radial-gradient(circle at top right, color-mix(in srgb, var(--frame-primary) 16%, transparent), transparent 35%),
        var(--frame-surface);
    }

    .docs-separator-custom[data-orientation='vertical'] {
      --frame-separator-color: var(--frame-primary);
    }

    .docs-separator-inspector {
      width: min(100%, 28rem);
    }
  `,
})
export class DocsSeparatorPreviewComponent {
  readonly config = input.required<SeparatorPreviewConfig>();
}

