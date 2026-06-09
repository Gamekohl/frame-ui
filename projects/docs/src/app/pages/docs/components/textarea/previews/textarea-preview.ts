import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { FrFieldModule } from '@frame-ui-ng/components/field';
import { FrInputModule } from '@frame-ui-ng/components/input';
import { FrTextareaModule } from '@frame-ui-ng/components/textarea';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  tablerBell,
  tablerFileDescription,
  tablerLock,
  tablerMessage2,
  tablerNotebook,
  tablerStars,
} from '@ng-icons/tabler-icons';
import { merge } from 'rxjs';

export type TextareaPreviewItem = {
  id: string;
  label: string;
  description?: string;
  error?: string;
  placeholder?: string;
  badge?: string;
  initialValue?: string;
  disabled?: boolean;
  readonly?: boolean;
  reactiveInvalidDemo?: boolean;
  icon?: string;
  rows?: number;
  tokenPrefix?: string;
};

export type TextareaPreviewConfig = {
  className?: string;
  style?: string;
  items: TextareaPreviewItem[];
};

@Component({
  selector: 'docs-textarea-preview',
  host: {
    class: 'block w-full',
  },
  imports: [
    FrFieldModule,
    FrInputModule,
    FrTextareaModule,
    NgIcon,
    ReactiveFormsModule,
  ],
  viewProviders: [
    provideIcons({
      tablerBell,
      tablerFileDescription,
      tablerLock,
      tablerMessage2,
      tablerNotebook,
      tablerStars,
    }),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="config().className ?? 'w-full max-w-3xl'" [style]="config().style ?? null">
      <div frFieldGroup>
        @for (item of config().items; track item.id) {
          <div
            frField
            [invalid]="showError(item)"
            [disabled]="item.disabled ?? false"
            [attr.data-token-target]="tokenTarget(item.tokenPrefix, 'field')"
          >
            <div frInputHeader>
              <label
                frFieldLabel
                [attr.for]="fieldId(item)"
                [attr.data-token-target]="tokenTarget(item.tokenPrefix, 'label')"
              >
                <span class="inline-flex items-center gap-2">
                  @if (item.icon) {
                    <ng-icon [name]="item.icon!" size="16" class="text-muted-foreground" />
                  }
                  <span>{{ item.label }}</span>
                </span>
              </label>

              @if (item.badge) {
                <span frInputBadge [attr.data-token-target]="tokenTarget(item.tokenPrefix, 'badge')">
                  {{ item.badge }}
                </span>
              }
            </div>

            <div frFieldContent [attr.data-token-target]="tokenTarget(item.tokenPrefix, 'content')">
              <textarea
                frTextarea
                [id]="fieldId(item)"
                [rows]="item.rows ?? 4"
                [placeholder]="item.placeholder ?? ''"
                [formControl]="controlFor(item)"
                [readOnly]="item.readonly ?? false"
                [attr.data-token-target]="tokenTarget(item.tokenPrefix, 'control')"
              ></textarea>

              @if (item.description) {
                <p
                  frFieldDescription
                  [attr.data-token-target]="tokenTarget(item.tokenPrefix, 'description')"
                >
                  {{ item.description }}
                </p>
              }

              @if (showError(item) && item.error) {
                <p frFieldError [attr.data-token-target]="tokenTarget(item.tokenPrefix, 'error')">
                  {{ item.error }}
                </p>
              }
            </div>
          </div>
        }
      </div>
    </div>
  `,
})
export class DocsTextareaPreviewComponent {
  readonly config = input.required<TextareaPreviewConfig>();

  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly controls = new Map<string, FormControl<string>>();

  ngOnInit(): void {
    this.resetControls();
  }

  ngOnChanges(): void {
    this.resetControls();
  }

  protected fieldId(item: TextareaPreviewItem): string {
    return `docs-textarea-preview-${item.id}`;
  }

  protected controlFor(item: TextareaPreviewItem): FormControl<string> {
    return this.controls.get(item.id)!;
  }

  protected showError(item: TextareaPreviewItem): boolean {
    if (!item.reactiveInvalidDemo) {
      return false;
    }

    const control = this.controlFor(item);
    return control.invalid && (control.touched || control.dirty);
  }

  protected tokenTarget(prefix: string | undefined, key: string): string | null {
    return prefix ? `${prefix}-${key}` : null;
  }

  private resetControls(): void {
    this.controls.clear();

    for (const item of this.config().items) {
      const control = new FormControl(item.initialValue ?? '', {
        nonNullable: true,
        validators: item.reactiveInvalidDemo ? [Validators.required] : [],
      });

      if (item.disabled) {
        control.disable({ emitEvent: false });
      }

      merge(control.valueChanges, control.statusChanges)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => this.cdr.markForCheck());

      this.controls.set(item.id, control);
    }

    this.cdr.markForCheck();
  }
}

