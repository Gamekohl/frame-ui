import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FrCornerHandles } from '@frame-ui-ng/components';

export type CornerHandlesPreviewVariant = 'basic' | 'actions' | 'container' | 'custom';

export type CornerHandlesPreviewConfig = {
  variant?: CornerHandlesPreviewVariant;
  className?: string;
  style?: string;
};

@Component({
  selector: 'docs-corner-handles-preview',
  imports: [FrCornerHandles],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      [class]="config().className ?? 'docs-corner-preview'"
      [style]="config().style ?? null"
    >
      @switch (config().variant ?? 'basic') {
        @case ('actions') {
          <div frCornerHandles class="docs-corner-actions">
            <button type="button">Approve</button>
            <button type="button">Archive</button>
            <button type="button">Escalate</button>
          </div>
        }

        @case ('container') {
          <section frCornerHandles class="docs-corner-container">
            <header>
              <span>Blueprint</span>
              <strong>Container host</strong>
            </header>

            <div class="docs-corner-row">
              <span>Surface</span>
              <code>custom</code>
            </div>
            <div class="docs-corner-row">
              <span>Scope</span>
              <code>local</code>
            </div>
            <div class="docs-corner-row">
              <span>Handles</span>
              <code>enabled</code>
            </div>
          </section>
        }

        @case ('custom') {
          <section frCornerHandles class="docs-corner-custom">
            <span>Custom tokens</span>
            <strong>Release frame</strong>
            <p>Local token overrides tune color, inset, and visible handle length.</p>
          </section>
        }

        @default {
          <section frCornerHandles class="docs-corner-surface docs-corner-surface--hero">
            <span>Utility</span>
            <strong>Attach anywhere</strong>
            <p>Panels, previews, and product containers can opt into corner handles directly.</p>
          </section>
        }
      }
    </div>
  `,
  styles: `
    .docs-corner-preview {
      display: flex;
      width: 100%;
      justify-content: center;
    }

    .docs-corner-surface,
    .docs-corner-container,
    .docs-corner-custom,
    .docs-corner-actions {
      border: 1px solid var(--frame-border);
      background:
        radial-gradient(circle at 18% 12%, color-mix(in srgb, var(--frame-primary) 14%, transparent), transparent 34%),
        linear-gradient(145deg, var(--frame-surface), color-mix(in srgb, var(--frame-muted) 72%, transparent));
      color: var(--frame-foreground);
      box-shadow: var(--frame-shadow-sm);
    }

    .docs-corner-surface,
    .docs-corner-custom {
      display: grid;
      width: min(100%, 28rem);
      min-block-size: 13rem;
      align-content: center;
      gap: 0.75rem;
      border-radius: var(--frame-radius-lg);
      padding: 2rem;
      text-align: center;
    }

    .docs-corner-surface--hero {
      min-block-size: 17rem;
    }

    .docs-corner-custom {
      --frame-corner-handle-color: var(--frame-primary);
      --frame-corner-handle-inset: 0.5rem;
      --frame-corner-handle-size: 0.875rem;
      width: min(100%, 30rem);
      border-color: color-mix(in srgb, var(--frame-primary) 42%, var(--frame-border));
    }

    .docs-corner-surface span,
    .docs-corner-container header span,
    .docs-corner-custom span {
      color: var(--frame-muted-foreground);
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .docs-corner-surface strong,
    .docs-corner-container header strong,
    .docs-corner-custom strong {
      font-size: 1.75rem;
      line-height: 1.1;
    }

    .docs-corner-surface p,
    .docs-corner-custom p {
      margin: 0;
      color: var(--frame-muted-foreground);
      line-height: 1.6;
    }

    .docs-corner-container {
      display: grid;
      width: min(100%, 34rem);
      gap: 0;
      overflow: hidden;
      border-radius: var(--frame-radius-lg);
    }

    .docs-corner-container header,
    .docs-corner-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      padding: 1rem 1.25rem;
    }

    .docs-corner-container header {
      border-bottom: 1px solid var(--frame-border);
    }

    .docs-corner-container header strong {
      font-size: 1.125rem;
    }

    .docs-corner-row + .docs-corner-row {
      border-top: 1px solid color-mix(in srgb, var(--frame-border) 72%, transparent);
    }

    .docs-corner-row span {
      color: var(--frame-muted-foreground);
      font-size: 0.875rem;
    }

    .docs-corner-row code {
      color: var(--frame-foreground);
      font-size: 0.8125rem;
    }

    .docs-corner-actions {
      display: flex;
      width: min(100%, 32rem);
      flex-wrap: wrap;
      justify-content: center;
      gap: 0.75rem;
      border-radius: var(--frame-radius-lg);
      padding: 1.5rem;
    }

    .docs-corner-actions button {
      min-block-size: 2.25rem;
      border: 1px solid var(--frame-border);
      border-radius: var(--frame-radius-md);
      background: var(--frame-background);
      color: var(--frame-foreground);
      cursor: pointer;
      font: inherit;
      font-size: 0.875rem;
      font-weight: 600;
      padding: 0 1rem;
    }
  `,
})
export class DocsCornerHandlesPreviewComponent {
  readonly config = input<CornerHandlesPreviewConfig>({});
}
