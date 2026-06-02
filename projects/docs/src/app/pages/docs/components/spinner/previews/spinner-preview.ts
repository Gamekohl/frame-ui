import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FrBadgeModule } from '@frame-ui/components/badge';
import { FrButtonModule } from '@frame-ui/components/button';
import { FrEmptyModule } from '@frame-ui/components/empty';
import { FrInputModule } from '@frame-ui/components/input';
import { FrSpinner } from '@frame-ui/components/spinner';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { tablerClock, tablerCloudUpload } from '@ng-icons/tabler-icons';

export type SpinnerPreviewMode =
  | 'badge'
  | 'basic'
  | 'button'
  | 'custom-styling'
  | 'empty'
  | 'input-group'
  | 'inspector'
  | 'rtl'
  | 'sizes';

export type SpinnerPreviewConfig = {
  mode: SpinnerPreviewMode;
};

@Component({
  selector: 'docs-spinner-preview',
  host: {
    class: 'block w-full',
  },
  imports: [
    FrBadgeModule,
    FrButtonModule,
    FrEmptyModule,
    FrInputModule,
    FrSpinner,
    NgIconComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @switch (config().mode) {
      @case ('basic') {
        <div class="docs-spinner-center">
          <span frSpinner label="Loading project data"></span>
        </div>
      }

      @case ('sizes') {
        <div class="docs-spinner-sizes" aria-label="Spinner sizes">
          @for (size of sizes; track size) {
            <div class="docs-spinner-size">
              <span frSpinner [size]="size" decorative></span>
              <span>{{ size }}</span>
            </div>
          }
        </div>
      }

      @case ('button') {
        <div class="docs-spinner-center">
          <button frButton [loading]="true" loadingDisplay="inline" type="button">
            <span frButtonIcon>
              <ng-icon name="tablerCloudUpload" size="16" />
            </span>
            <span frButtonLabel>Uploading</span>
            <span frSpinner size="sm"></span>
          </button>
        </div>
      }

      @case ('badge') {
        <div class="docs-spinner-center docs-spinner-gap">
          <span frBadge variant="secondary">
            <span frSpinner size="xs"></span>
            <span frBadgeLabel>Syncing</span>
          </span>

          <span frBadge variant="outline">
            <span frBadgeLabel>Queued</span>
            <span frSpinner size="xs"></span>
          </span>
        </div>
      }

      @case ('input-group') {
        <div frInputGroup class="docs-spinner-input-group">
          <span frInputGroupAddon align="inline-start">
            <ng-icon name="tablerClock" size="16" />
          </span>
          <input frInputGroupInput value="Checking workspace status" aria-label="Workspace status" />
          <span frInputGroupAddon align="inline-end">
            <span frSpinner decorative size="sm"></span>
          </span>
        </div>
      }

      @case ('empty') {
        <div frEmpty variant="outline" class="docs-spinner-empty">
          <div frEmptyMedia variant="icon">
            <span frSpinner decorative size="lg"></span>
          </div>
          <div frEmptyHeader>
            <h3 frEmptyTitle>Preparing the workspace</h3>
            <p frEmptyDescription>
              A few project details are still being assembled.
            </p>
          </div>
        </div>
      }

      @case ('custom-styling') {
        <div class="docs-spinner-center">
          <span frSpinner class="docs-spinner-custom" label="Refreshing analytics"></span>
        </div>
      }

      @case ('rtl') {
        <div class="docs-spinner-rtl" dir="rtl">
          <span frSpinner decorative size="sm"></span>
          <span>جار تحضير البيانات</span>
        </div>
      }

      @case ('inspector') {
        <div class="docs-spinner-inspector">
          <span
            frSpinner
            size="xl"
            label="Inspect spinner tokens"
            data-token-target="spinner-root"
          ></span>
          <div class="docs-spinner-inspector-copy">
            <span data-token-target="spinner-label">Loading preview</span>
            <small>Hover the spinner to inspect size, stroke, colors, radius, and timing.</small>
          </div>
        </div>
      }
    }
  `,
  styles: `
    .docs-spinner-center {
      display: flex;
      align-items: center;
      justify-content: center;
      min-block-size: 10rem;
    }

    .docs-spinner-gap {
      flex-wrap: wrap;
      gap: 0.75rem;
    }

    .docs-spinner-sizes {
      display: flex;
      flex-wrap: wrap;
      align-items: end;
      justify-content: center;
      gap: 1rem;
    }

    .docs-spinner-size {
      display: grid;
      justify-items: center;
      gap: 0.5rem;
      min-inline-size: 3.5rem;
      color: var(--frame-muted-foreground);
      font-size: 0.8125rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    .docs-spinner-input-group {
      width: min(100%, 26rem);
      margin-inline: auto;
    }

    .docs-spinner-empty {
      width: min(100%, 28rem);
      margin-inline: auto;
    }

    .docs-spinner-custom {
      --frame-spinner-size: 2.25rem;
      --frame-spinner-stroke: 3px;
      --frame-spinner-track-color: color-mix(in srgb, var(--frame-primary) 18%, transparent);
      --frame-spinner-indicator-color: var(--frame-primary);
      --frame-spinner-duration: 560ms;
      filter: drop-shadow(0 0 18px color-mix(in srgb, var(--frame-primary) 30%, transparent));
    }

    .docs-spinner-rtl,
    .docs-spinner-inspector {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      min-block-size: 10rem;
      color: var(--frame-foreground);
    }

    .docs-spinner-inspector-copy {
      display: grid;
      gap: 0.2rem;
    }

    .docs-spinner-inspector-copy span {
      font-weight: 650;
    }

    .docs-spinner-inspector-copy small {
      color: var(--frame-muted-foreground);
      font-size: 0.8125rem;
    }
  `,
  viewProviders: [
    provideIcons({
      tablerClock,
      tablerCloudUpload,
    }),
  ],
})
export class DocsSpinnerPreviewComponent {
  readonly config = input.required<SpinnerPreviewConfig>();

  protected readonly sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
}
