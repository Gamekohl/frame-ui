import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, input } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FrInputModule } from '@frame-ui/components/input';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  tablerLink,
  tablerLock,
  tablerMail,
  tablerSearch,
  tablerWorldWww,
} from '@ng-icons/tabler-icons';
import { merge } from 'rxjs';

type InputControlKind = 'input' | 'group';
type InputType = 'text' | 'email' | 'password' | 'search' | 'url';

export type InputPreviewItem = {
  id: string;
  label: string;
  type?: InputType;
  kind?: InputControlKind;
  placeholder?: string;
  description?: string;
  error?: string;
  badge?: string;
  initialValue?: string | null;
  disabled?: boolean;
  readonly?: boolean;
  reactiveInvalidDemo?: boolean;
  prefixText?: string;
  prefixIcon?: string;
  suffixIcon?: string;
  tokenPrefix?: string;
};

export type InputPreviewConfig = {
  className?: string;
  style?: string;
  items: InputPreviewItem[];
};

@Component({
  selector: 'docs-input-preview',
  host: {
    class: 'block w-full',
  },
  imports: [
    FrInputModule,
    NgIcon,
    ReactiveFormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    provideIcons({
      tablerMail,
      tablerSearch,
      tablerLock,
      tablerLink,
      tablerWorldWww,
    }),
  ],
  template: `
    <div [class]="config().className ?? 'w-full max-w-3xl'" [style]="config().style ?? null">
      <div frInputFieldGroup>
        @for (item of config().items; track item.id) {
          <div frInputField [attr.data-token-target]="tokenTarget(item.tokenPrefix, 'field')">
            <div frInputHeader>
              <label
                frInputLabel
                [attr.for]="fieldId(item)"
                [attr.data-token-target]="tokenTarget(item.tokenPrefix, 'label')"
              >
                {{ item.label }}
              </label>

              @if (item.badge) {
                <span
                  frInputBadge
                  [attr.data-token-target]="tokenTarget(item.tokenPrefix, 'badge')"
                >
                  {{ item.badge }}
                </span>
              }
            </div>

            @if ((item.kind ?? 'input') === 'group') {
              <div frInputGroup [attr.data-token-target]="tokenTarget(item.tokenPrefix, 'group')">
                @if (item.prefixText || item.prefixIcon) {
                  <span
                    frInputGroupAddon
                    align="inline-start"
                    [attr.data-token-target]="tokenTarget(item.tokenPrefix, 'addon')"
                  >
                    @if (item.prefixIcon) {
                      <ng-icon [name]="item.prefixIcon!" size="16" />
                    } @else if (item.prefixText) {
                      <span frInputGroupText>{{ item.prefixText }}</span>
                    }
                  </span>
                }

                <input
                  frInputGroupInput
                  [id]="fieldId(item)"
                  [type]="item.type ?? 'text'"
                  [placeholder]="item.placeholder ?? ''"
                  [formControl]="controlFor(item)"
                  [readOnly]="item.readonly ?? false"
                  [attr.data-token-target]="tokenTarget(item.tokenPrefix, 'control')"
                />

                @if (item.suffixIcon) {
                  <span
                    frInputGroupAddon
                    align="inline-end"
                    [attr.data-token-target]="tokenTarget(item.tokenPrefix, 'addon')"
                  >
                    <ng-icon [name]="item.suffixIcon!" size="16" />
                  </span>
                }
              </div>
            } @else {
              <div frInputControl [attr.data-token-target]="tokenTarget(item.tokenPrefix, 'control')">
                <input
                  frInput
                  [id]="fieldId(item)"
                  [type]="item.type ?? 'text'"
                  [placeholder]="item.placeholder ?? ''"
                  [formControl]="controlFor(item)"
                  [readOnly]="item.readonly ?? false"
                />
              </div>
            }

            @if (item.description) {
              <p
                frInputDescription
                [attr.data-token-target]="tokenTarget(item.tokenPrefix, 'description')"
              >
                {{ item.description }}
              </p>
            }

            @if (showError(item)) {
              <p frInputError [attr.data-token-target]="tokenTarget(item.tokenPrefix, 'error')">
                {{ item.error }}
              </p>
            }
          </div>
        }
      </div>
    </div>
  `,
})
export class DocsInputPreviewComponent {
  readonly config = input.required<InputPreviewConfig>();

  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly controls = new Map<string, FormControl<string | null>>();

  protected tokenTarget(prefix: string | undefined, key: string): string | null {
    return prefix ? `${prefix}-${key}` : null;
  }

  protected fieldId(item: InputPreviewItem): string {
    return `docs-input-preview-${item.id}`;
  }

  protected controlFor(item: InputPreviewItem): FormControl<string | null> {
    const existing = this.controls.get(item.id);

    if (existing) {
      return existing;
    }

    const control = new FormControl<string | null>(item.initialValue ?? null, {
      validators: item.reactiveInvalidDemo ? [Validators.required] : [],
      nonNullable: false,
    });

    if (item.disabled) {
      control.disable({ emitEvent: false });
    }

    merge(control.valueChanges, control.statusChanges)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.cdr.markForCheck());

    this.controls.set(item.id, control);

    return control;
  }

  protected showError(item: InputPreviewItem): boolean {
    if (!item.error) {
      return false;
    }

    if (!item.reactiveInvalidDemo) {
      return true;
    }

    const control = this.controlFor(item);
    return control.invalid && (control.touched || control.dirty);
  }
}

