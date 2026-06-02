import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FrField, FrFieldContent, FrFieldDescription, FrFieldLabel } from '@frame-ui/components/field';
import { FrToggleModule } from '@frame-ui/components/toggle';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  tablerBell,
  tablerBold,
  tablerBookmark,
  tablerEye,
  tablerItalic,
  tablerStar,
} from '@ng-icons/tabler-icons';

export type TogglePreviewMode =
  | 'basic'
  | 'controlled'
  | 'custom-styling'
  | 'disabled'
  | 'forms'
  | 'inspector'
  | 'outline'
  | 'rtl'
  | 'size'
  | 'text';

export type TogglePreviewConfig = {
  mode: TogglePreviewMode;
};

@Component({
  selector: 'docs-toggle-preview',
  host: {
    class: 'block w-full',
  },
  imports: [
    FrField,
    FrFieldContent,
    FrFieldDescription,
    FrFieldLabel,
    FrToggleModule,
    NgIcon,
    ReactiveFormsModule,
  ],
  viewProviders: [
    provideIcons({
      tablerBell,
      tablerBold,
      tablerBookmark,
      tablerEye,
      tablerItalic,
      tablerStar,
    }),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @switch (config().mode) {
      @case ('basic') {
        <div class="docs-toggle-row">
          <button frToggle aria-label="Save item">
            <ng-icon frToggleIcon name="tablerBookmark" />
          </button>
        </div>
      }

      @case ('outline') {
        <div class="docs-toggle-row">
          <button frToggle variant="outline" aria-label="Bold text">
            <ng-icon frToggleIcon name="tablerBold" />
          </button>
          <button frToggle variant="outline" defaultPressed aria-label="Italic text">
            <ng-icon frToggleIcon name="tablerItalic" />
          </button>
        </div>
      }

      @case ('text') {
        <div class="docs-toggle-row">
          <button frToggle variant="outline">
            <ng-icon frToggleIcon name="tablerStar" />
            <span frToggleLabel>Favorite</span>
          </button>
        </div>
      }

      @case ('size') {
        <div class="docs-toggle-row">
          <button frToggle size="sm" aria-label="Compact favorite">
            <ng-icon frToggleIcon name="tablerStar" />
          </button>
          <button frToggle aria-label="Default favorite">
            <ng-icon frToggleIcon name="tablerStar" />
          </button>
          <button frToggle size="lg" aria-label="Large favorite">
            <ng-icon frToggleIcon name="tablerStar" />
          </button>
        </div>
      }

      @case ('disabled') {
        <div class="docs-toggle-row">
          <button frToggle disabled aria-label="Muted notifications">
            <ng-icon frToggleIcon name="tablerBell" />
          </button>
          <button frToggle defaultPressed disabled>
            <ng-icon frToggleIcon name="tablerEye" />
            <span frToggleLabel>Visible</span>
          </button>
        </div>
      }

      @case ('controlled') {
        <div class="docs-toggle-stack">
          <button frToggle [pressed]="previewEnabled()" (pressedChange)="previewEnabled.set($event)">
            <ng-icon frToggleIcon name="tablerEye" />
            <span frToggleLabel>{{ previewEnabled() ? 'Preview on' : 'Preview off' }}</span>
          </button>
          <p>Current value: {{ previewEnabled() ? 'on' : 'off' }}</p>
        </div>
      }

      @case ('forms') {
        <div frField class="docs-toggle-field">
          <button frToggle [formControl]="notificationsControl">
            <ng-icon frToggleIcon name="tablerBell" />
            <span frToggleLabel>Product updates</span>
          </button>
          <div frFieldContent>
            <label frFieldLabel>Notifications</label>
            <p frFieldDescription>
              Reactive form value: {{ notificationsControl.value ? 'enabled' : 'disabled' }}
            </p>
          </div>
        </div>
      }

      @case ('custom-styling') {
        <div class="docs-toggle-row">
          <button frToggle defaultPressed class="docs-toggle-custom">
            <ng-icon frToggleIcon name="tablerStar" />
            <span frToggleLabel>Starred</span>
          </button>
        </div>
      }

      @case ('rtl') {
        <div class="docs-toggle-row" dir="rtl" lang="ar">
          <button frToggle variant="outline">
            <ng-icon frToggleIcon name="tablerBookmark" />
            <span frToggleLabel>حفظ</span>
          </button>
        </div>
      }

      @case ('inspector') {
        <div class="docs-toggle-row" data-token-target="toggle-group">
          <button frToggle data-token-target="toggle-root" aria-label="Bookmark">
            <ng-icon frToggleIcon name="tablerBookmark" data-token-target="toggle-icon" />
          </button>
          <button frToggle defaultPressed data-token-target="toggle-pressed">
            <ng-icon frToggleIcon name="tablerStar" />
            <span frToggleLabel data-token-target="toggle-label">Starred</span>
          </button>
          <button frToggle variant="outline" data-token-target="toggle-outline">
            <ng-icon frToggleIcon name="tablerBold" />
            <span frToggleLabel>Outline</span>
          </button>
        </div>
      }
    }

  `,
  styles: `
    .docs-toggle-row,
    .docs-toggle-stack,
    .docs-toggle-field {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      width: min(100%, 32rem);
      margin-inline: auto;
    }

    .docs-toggle-stack {
      flex-direction: column;
    }

    .docs-toggle-stack p,
    .docs-toggle-field p {
      margin: 0;
      color: var(--frame-muted-foreground);
      font-size: 0.875rem;
      line-height: 1.5;
    }

    .docs-toggle-field {
      justify-content: flex-start;
      padding: 1rem;
      border: 1px solid var(--frame-border);
      border-radius: var(--frame-radius-lg);
      background: var(--frame-surface);
    }

    .docs-toggle-custom {
      --frame-toggle-bg: color-mix(in srgb, var(--frame-primary) 10%, var(--frame-background));
      --frame-toggle-color: var(--frame-primary);
      --frame-toggle-hover-bg: color-mix(in srgb, var(--frame-primary) 16%, var(--frame-background));
      --frame-toggle-pressed-bg: var(--frame-primary);
      --frame-toggle-pressed-color: var(--frame-primary-foreground);
      --frame-toggle-pressed-shadow: 0 14px 32px color-mix(in srgb, var(--frame-primary) 28%, transparent);
    }
  `,
})
export class DocsTogglePreviewComponent {
  readonly config = input.required<TogglePreviewConfig>();
  protected readonly previewEnabled = signal(true);
  protected readonly notificationsControl = new FormControl(true, { nonNullable: true });
}
