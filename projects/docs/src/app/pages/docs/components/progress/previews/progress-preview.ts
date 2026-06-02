import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { FrButtonModule } from '@frame-ui/components/button';
import { FrFieldModule } from '@frame-ui/components/field';
import { FrProgressModule } from '@frame-ui/components/progress';

export type ProgressPreviewMode =
  | 'basic'
  | 'controlled'
  | 'custom-styling'
  | 'indeterminate'
  | 'inspector'
  | 'label'
  | 'rtl';

export type ProgressPreviewConfig = {
  mode: ProgressPreviewMode;
};

@Component({
  selector: 'docs-progress-preview',
  host: {
    class: 'block w-full',
  },
  imports: [
    FrButtonModule,
    FrFieldModule,
    FrProgressModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @switch (config().mode) {
      @case ('basic') {
        <div class="docs-progress-stack">
          <div frProgress aria-label="Sync progress" [value]="42">
            <div frProgressIndicator></div>
          </div>
        </div>
      }

      @case ('label') {
        <div frField class="docs-progress-field">
          <div frFieldContent>
            <label frFieldLabel for="deploy-progress">Deployment progress</label>
            <p frFieldDescription>Seven of ten release checks have completed.</p>
          </div>

          <div
            id="deploy-progress"
            frProgress
            aria-label="Deployment progress"
            [value]="70"
            data-token-target="progress-root"
          >
            <div frProgressIndicator data-token-target="progress-indicator"></div>
          </div>

          <span class="docs-progress-value">70%</span>
        </div>
      }

      @case ('controlled') {
        <div class="docs-progress-stack">
          <div class="docs-progress-row">
            <span>Import queue</span>
            <strong>{{ controlledValue() }}%</strong>
          </div>

          <div frProgress aria-label="Import queue progress" [value]="controlledValue()">
            <div frProgressIndicator></div>
          </div>

          <div class="docs-progress-actions">
            <button frButton appearance="outline" type="button" (click)="decrease()">Less</button>
            <button frButton type="button" (click)="increase()">More</button>
          </div>
        </div>
      }

      @case ('indeterminate') {
        <div class="docs-progress-stack">
          <div class="docs-progress-row">
            <span>Preparing preview</span>
            <span class="docs-progress-muted">Working</span>
          </div>

          <div frProgress aria-label="Preparing preview" [value]="null">
            <div frProgressIndicator></div>
          </div>
        </div>
      }

      @case ('custom-styling') {
        <div class="docs-progress-card">
          <div class="docs-progress-row">
            <span>Storage budget</span>
            <strong>82%</strong>
          </div>

          <div class="docs-progress-custom" frProgress aria-label="Storage budget" [value]="82">
            <div frProgressIndicator></div>
          </div>
        </div>
      }

      @case ('rtl') {
        <div class="docs-progress-stack" dir="rtl">
          <div frField class="docs-progress-field">
            <div frFieldContent>
              <label frFieldLabel for="rtl-progress">تقدم المزامنة</label>
              <p frFieldDescription>اكتملت معظم خطوات التحضير.</p>
            </div>

            <div id="rtl-progress" frProgress aria-label="تقدم المزامنة" [value]="66">
              <div frProgressIndicator></div>
            </div>

            <span class="docs-progress-value">٦٦٪</span>
          </div>
        </div>
      }

      @case ('inspector') {
        <div frField class="docs-progress-field docs-progress-inspector" data-token-target="progress-field">
          <div frFieldContent data-token-target="progress-content">
            <div class="docs-progress-row">
              <label frFieldLabel for="inspector-progress" data-token-target="progress-label">
                Upload progress
              </label>
              <strong class="docs-progress-value" data-token-target="progress-value">64%</strong>
            </div>
            <p frFieldDescription data-token-target="progress-description">
              Four files are still waiting to be processed.
            </p>
          </div>

          <div
            id="inspector-progress"
            frProgress
            aria-label="Upload progress"
            [value]="64"
            data-token-target="progress-root"
          >
            <div frProgressIndicator data-token-target="progress-indicator"></div>
          </div>
        </div>
      }
    }
  `,
  styles: `
    .docs-progress-stack {
      display: grid;
      gap: 1rem;
      width: min(100%, 28rem);
      margin-inline: auto;
    }

    .docs-progress-field {
      display: grid;
      gap: 0.75rem;
      width: min(100%, 28rem);
      margin-inline: auto;
    }

    .docs-progress-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      color: var(--frame-foreground);
      font-size: 0.875rem;
    }

    .docs-progress-muted,
    .docs-progress-value {
      color: var(--frame-muted-foreground);
      font-size: 0.875rem;
    }

    .docs-progress-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .docs-progress-card {
      display: grid;
      gap: 0.875rem;
      width: min(100%, 30rem);
      margin-inline: auto;
      padding: 1rem;
      border: 1px solid var(--frame-border);
      border-radius: var(--frame-radius-lg);
      background: linear-gradient(135deg, var(--frame-surface), color-mix(in srgb, var(--frame-primary) 8%, var(--frame-surface)));
    }

    .docs-progress-custom {
      --frame-progress-height: 0.875rem;
      --frame-progress-radius: 999px;
      --frame-progress-bg: color-mix(in srgb, var(--frame-primary) 12%, var(--frame-muted));
      --frame-progress-border: color-mix(in srgb, var(--frame-primary) 24%, transparent);
      --frame-progress-shadow: inset 0 1px 2px rgb(0 0 0 / 0.08);
      --frame-progress-indicator-bg: linear-gradient(90deg, var(--frame-primary), color-mix(in srgb, var(--frame-primary) 70%, var(--frame-foreground)));
      --frame-progress-indicator-shadow: 0 0 18px color-mix(in srgb, var(--frame-primary) 36%, transparent);
    }

    .docs-progress-inspector {
      width: min(100%, 30rem);
    }
  `,
})
export class DocsProgressPreviewComponent {
  readonly config = input.required<ProgressPreviewConfig>();

  protected readonly controlledValue = signal(55);

  protected increase(): void {
    this.controlledValue.update((value) => Math.min(value + 15, 100));
  }

  protected decrease(): void {
    this.controlledValue.update((value) => Math.max(value - 15, 0));
  }
}

