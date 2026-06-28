import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { FrField, FrFieldDescription, FrFieldError, FrFieldLabel } from '@frame-ui-ng/components/field';
import { FrSliderModule, FrSliderValue } from '@frame-ui-ng/components/slider';

export type SliderPreviewMode =
  | 'basic'
  | 'controlled'
  | 'custom-styling'
  | 'disabled'
  | 'form'
  | 'inspector'
  | 'multiple'
  | 'range'
  | 'rtl'
  | 'vertical';

export type SliderPreviewConfig = {
  mode: SliderPreviewMode;
};

@Component({
  selector: 'docs-slider-preview',
  host: {
    class: 'block w-full',
  },
  imports: [FrField, FrFieldDescription, FrFieldError, FrFieldLabel, FrSliderModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @switch (config().mode) {
      @case ('basic') {
        <section class="docs-slider-card">
          <div class="docs-slider-copy">
            <h3>Volume</h3>
            <p>Set a comfortable playback level for preview audio.</p>
          </div>
          <frame-slider [defaultValue]="42" aria-label="Volume" data-token-target="slider-root" />
        </section>
      }

      @case ('range') {
        <section class="docs-slider-card">
          <div class="docs-slider-copy">
            <h3>Budget window</h3>
            <p>Limit recommendations to a practical monthly spend range.</p>
          </div>
          <frame-slider [defaultValue]="[24, 76]" [min]="0" [max]="100" [step]="2" aria-label="Budget" />
        </section>
      }

      @case ('multiple') {
        <section class="docs-slider-card">
          <div class="docs-slider-copy">
            <h3>Review checkpoints</h3>
            <p>Place several milestones along a single release timeline.</p>
          </div>
          <frame-slider [defaultValue]="[20, 50, 82]" [minStepsBetweenThumbs]="2" aria-label="Milestone" />
        </section>
      }

      @case ('vertical') {
        <section class="docs-slider-card docs-slider-card--vertical">
          <div class="docs-slider-copy">
            <h3>Light level</h3>
            <p>Vertical orientation works well for compact tool panels.</p>
          </div>
          <frame-slider orientation="vertical" [defaultValue]="62" aria-label="Light level" />
        </section>
      }

      @case ('controlled') {
        <section class="docs-slider-card">
          <div class="docs-slider-copy">
            <h3>Temperature</h3>
            <p>{{ controlledValue() }}% creativity applied to generated suggestions.</p>
          </div>
          <frame-slider [value]="controlledValue()" (valueChange)="setControlled($event)" aria-label="Temperature" />
        </section>
      }

      @case ('disabled') {
        <section class="docs-slider-card">
          <div class="docs-slider-copy">
            <h3>Locked capacity</h3>
            <p>This setting is managed by the workspace policy.</p>
          </div>
          <frame-slider [defaultValue]="68" disabled aria-label="Locked capacity" />
        </section>
      }

      @case ('form') {
        <form class="docs-slider-card" aria-label="Deployment threshold">
          <div frField [invalid]="threshold.invalid && threshold.touched">
            <label frFieldLabel>Deployment threshold</label>
            <p frFieldDescription>Choose a value of 25 or higher before rollout can continue.</p>
            <frame-slider
              [formControl]="threshold"
              [min]="0"
              [max]="100"
              [step]="5"
              [invalid]="threshold.invalid && threshold.touched"
              aria-label="Deployment threshold"
            />
            @if (threshold.invalid && threshold.touched) {
              <p frFieldError>Raise the threshold to at least 25.</p>
            }
          </div>
        </form>
      }

      @case ('custom-styling') {
        <section class="docs-slider-card docs-slider-card--custom">
          <div class="docs-slider-copy">
            <h3>Accent strength</h3>
            <p>Local tokens can make a slider feel more branded or more quiet.</p>
          </div>
          <frame-slider [defaultValue]="58" aria-label="Accent strength" />
        </section>
      }

      @case ('rtl') {
        <section class="docs-slider-card" dir="rtl" lang="ar">
          <div class="docs-slider-copy">
            <h3>كثافة العرض</h3>
            <p>يتبع المؤشر اتجاه النص والمنطق المكاني للواجهة.</p>
          </div>
          <frame-slider [defaultValue]="35" aria-label="كثافة العرض" />
        </section>
      }

      @case ('inspector') {
        <section class="docs-slider-card" data-token-target="slider-surface">
          <div class="docs-slider-copy">
            <h3 data-token-target="slider-label">Upload limit</h3>
            <p data-token-target="slider-description">Inspect the track, range, and thumb tokens.</p>
          </div>
          <frame-slider [defaultValue]="[30, 70]" aria-label="Upload limit" data-token-target="slider-root" />
        </section>
      }
    }
  `,
  styles: `
    .docs-slider-card {
      display: grid;
      gap: 1.25rem;
      width: min(100%, 32rem);
      margin-inline: auto;
      padding: 1.25rem;
      border: 1px solid var(--frame-border);
      border-radius: var(--frame-radius-lg);
      background: var(--frame-surface);
      color: var(--frame-foreground);
      box-shadow: 0 16px 40px rgb(0 0 0 / 0.06);
    }

    .docs-slider-card--vertical {
      grid-template-columns: minmax(0, 1fr) auto;
      align-items: center;
      width: min(100%, 24rem);
    }

    .docs-slider-copy {
      display: grid;
      gap: 0.35rem;
    }

    .docs-slider-copy h3,
    .docs-slider-copy p {
      margin: 0;
    }

    .docs-slider-copy h3 {
      font-size: 1rem;
      font-weight: 700;
    }

    .docs-slider-copy p {
      color: var(--frame-muted-foreground);
      font-size: 0.875rem;
      line-height: 1.5;
    }

    .docs-slider-card--custom {
      --frame-slider-track-bg: color-mix(in srgb, var(--frame-primary) 12%, var(--frame-muted));
      --frame-slider-range-bg: linear-gradient(90deg, var(--frame-primary), color-mix(in srgb, var(--frame-primary) 55%, var(--frame-warning)));
      --frame-slider-thumb-size: 1.45rem;
      --frame-slider-thumb-border: color-mix(in srgb, var(--frame-primary) 82%, var(--frame-warning));
      --frame-slider-thumb-shadow: 0 10px 30px color-mix(in srgb, var(--frame-primary) 26%, transparent);
      background:
        radial-gradient(circle at top right, color-mix(in srgb, var(--frame-primary) 14%, transparent), transparent 38%),
        var(--frame-surface);
    }
  `,
})
export class DocsSliderPreviewComponent {
  readonly config = input.required<SliderPreviewConfig>();
  protected readonly controlledValue = signal(48);
  protected readonly threshold = new FormControl(10, {
    nonNullable: true,
    validators: [Validators.min(25)],
  });

  protected setControlled(value: FrSliderValue): void {
    this.controlledValue.set(Array.isArray(value) ? value[0] : value);
  }
}
