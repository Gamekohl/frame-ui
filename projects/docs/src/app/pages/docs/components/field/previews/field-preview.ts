import {
  ChangeDetectionStrategy,
  Component,
  input,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { FrFieldModule } from '@frame-ui/components/field';
import { FrInputModule } from '@frame-ui/components/input';
import { FrTextareaModule } from '@frame-ui/components/textarea';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { tablerInfoCircle } from '@ng-icons/tabler-icons';
import { merge } from 'rxjs';
import { startWith } from 'rxjs/operators';

type FieldControlKind = 'input' | 'textarea' | 'note';

export type FieldPreviewItem = {
  label?: string;
  description?: string;
  errors?: string | { message?: string | null };
  invalid?: boolean;
  reactiveInvalidDemo?: boolean;
  controlKind?: FieldControlKind;
  placeholder?: string;
  tokenPrefix?: string;
};

export type FieldPreviewConfig = {
  className?: string;
  style?: string;
  legend?: string;
  legendVariant?: 'legend' | 'label';
  description?: string;
  separatorLabel?: string;
  items: FieldPreviewItem[];
};

@Component({
  selector: 'docs-field-preview',
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [provideIcons({ tablerInfoCircle })],
  template: `
    <div [class]="config().className ?? 'w-full max-w-4xl'" [style]="config().style ?? null">
      <fieldset frFieldSet>
        @if (config().legend) {
          <legend
            frFieldLegend
            [variant]="config().legendVariant ?? 'legend'"
            [attr.data-token-target]="tokenTarget(config().items[0]?.tokenPrefix, 'legend')"
          >
            {{ config().legend }}
          </legend>
        }

        @if (config().description) {
          <p
            frFieldDescription
            [attr.data-token-target]="tokenTarget(config().items[0]?.tokenPrefix, 'fieldset-description')"
          >
            {{ config().description }}
          </p>
        }

        <div frFieldGroup>
          @for (item of config().items; track item.label ?? $index) {
            <div
              frField
              [invalid]="isInvalid(item)"
              [attr.data-token-target]="tokenTarget(item.tokenPrefix, 'field')"
            >
              <label
                frFieldLabel
                [attr.for]="fieldId($index)"
                [attr.data-token-target]="tokenTarget(item.tokenPrefix, 'label')"
              >
                {{ item.label }}
              </label>

              <div frFieldContent [attr.data-token-target]="tokenTarget(item.tokenPrefix, 'content')">
                @switch (item.controlKind ?? 'input') {
                  @case ('textarea') {
                    <textarea
                      frTextarea
                      rows="4"
                      [id]="fieldId($index)"
                      [attr.data-token-target]="tokenTarget(item.tokenPrefix, 'control')"
                    >{{ item.placeholder ?? 'Describe the request...' }}</textarea>
                  }
                  @case ('note') {
                    <div
                      class="rounded-lg border border-border bg-muted/30 px-3 py-2 text-sm text-foreground"
                      [attr.data-token-target]="tokenTarget(item.tokenPrefix, 'control')"
                    >
                      <span class="inline-flex items-center gap-2">
                        <ng-icon name="tablerInfoCircle" size="16" />
                        <span>{{ item.placeholder ?? 'This field reuses your account profile.' }}</span>
                      </span>
                    </div>
                  }
                  @default {
                    @if (item.reactiveInvalidDemo) {
                      <input
                        frInput
                        [id]="fieldId($index)"
                        [type]="inputType(item)"
                        [placeholder]="item.placeholder ?? 'Enter a value'"
                        [formControl]="invalidDemoControl"
                        [attr.data-token-target]="tokenTarget(item.tokenPrefix, 'control')"
                      />
                    } @else {
                      <input
                        frInput
                        [id]="fieldId($index)"
                        [type]="inputType(item)"
                        [value]="item.placeholder ?? 'Enter a value'"
                        [attr.data-token-target]="tokenTarget(item.tokenPrefix, 'control')"
                      />
                    }
                  }
                }

                @if (item.description) {
                  <p
                    frFieldDescription
                    [attr.data-token-target]="tokenTarget(item.tokenPrefix, 'description')"
                  >
                    {{ item.description }}
                  </p>
                }

                @if (showError(item)) {
                  <div [attr.data-token-target]="tokenTarget(item.tokenPrefix, 'error')">
                    <p frFieldError [errors]="item.errors"></p>
                  </div>
                }
              </div>
            </div>

            @if (config().separatorLabel && $index < config().items.length - 1) {
              <div
                frFieldSeparator
                [attr.data-token-target]="tokenTarget(item.tokenPrefix, 'separator')"
              >
                {{ config().separatorLabel }}
              </div>
            }
          }
        </div>
      </fieldset>
    </div>
  `,
})
export class DocsFieldPreviewComponent {
  readonly config = input.required<FieldPreviewConfig>();
  protected readonly invalidDemoControl = new FormControl('', {
    validators: [Validators.required],
    nonNullable: true,
  });
  private readonly invalidDemoState = toSignal(
    merge(this.invalidDemoControl.valueChanges, this.invalidDemoControl.statusChanges).pipe(startWith(null)),
    { initialValue: null },
  );

  ngOnInit(): void {
    this.invalidDemoControl.patchValue('');
    this.invalidDemoControl.markAsTouched();
  }

  protected tokenTarget(prefix: string | undefined, key: string): string | null {
    return prefix ? `${prefix}-${key}` : null;
  }

  protected fieldId(index: number): string {
    return `docs-field-preview-${index}`;
  }

  protected inputType(item: FieldPreviewItem): string {
    if ((item.label ?? '').toLowerCase().includes('email')) {
      return 'email';
    }

    return 'text';
  }

  protected isInvalid(item: FieldPreviewItem): boolean {
    if (item.reactiveInvalidDemo) {
      this.invalidDemoState();
      return this.invalidDemoControl.invalid && (this.invalidDemoControl.touched || this.invalidDemoControl.dirty);
    }

    return item.invalid ?? false;
  }

  protected showError(item: FieldPreviewItem): boolean {
    if (!item.errors) {
      return false;
    }

    if (item.reactiveInvalidDemo) {
      this.invalidDemoState();
      return this.invalidDemoControl.invalid && (this.invalidDemoControl.touched || this.invalidDemoControl.dirty);
    }

    return true;
  }
}

