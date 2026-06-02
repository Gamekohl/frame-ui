import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { FrSwitchModule, FrSwitchSize } from '@frame-ui/components/switch';
import { merge } from 'rxjs';

export type SwitchPreviewItem = {
  id: string;
  label: string;
  description?: string;
  error?: string;
  initialChecked?: boolean;
  disabled?: boolean;
  size?: FrSwitchSize;
  reactiveRequiredDemo?: boolean;
  tokenPrefix?: string;
  icon?: string;
  className?: string;
  style?: string;
};

export type SwitchPreviewConfig = {
  className?: string;
  style?: string;
  items: SwitchPreviewItem[];
};

@Component({
  selector: 'docs-switch-preview',
  host: {
    class: 'block',
  },
  imports: [
    FrSwitchModule,
    ReactiveFormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      [class]="config().className ?? 'grid w-full max-w-2xl gap-4'"
      [style]="config().style ?? null"
    >
      @for (item of config().items; track item.id) {
        <label
          frSwitchField
          [class]="item.className ?? ''"
          [style]="item.style ?? null"
          [attr.data-token-target]="tokenTarget(item.tokenPrefix, 'field')"
        >
          <input
            frSwitch
            type="checkbox"
            [formControl]="controlFor(item)"
            [size]="item.size ?? 'default'"
            [attr.aria-invalid]="showError(item) ? 'true' : null"
            [attr.data-token-target]="tokenTarget(item.tokenPrefix, 'control')"
          />

          <span frSwitchContent [attr.data-token-target]="tokenTarget(item.tokenPrefix, 'content')">
            <span frSwitchLabel [attr.data-token-target]="tokenTarget(item.tokenPrefix, 'label')">
              <span>{{ item.label }}</span>
            </span>

            @if (item.description) {
              <span
                frSwitchDescription
                [attr.data-token-target]="tokenTarget(item.tokenPrefix, 'description')"
              >
                {{ item.description }}
              </span>
            }

            @if (showError(item) && item.error) {
              <span frSwitchError [attr.data-token-target]="tokenTarget(item.tokenPrefix, 'error')">
                {{ item.error }}
              </span>
            }
          </span>
        </label>
      }
    </div>
  `,
})
export class DocsSwitchPreviewComponent {
  readonly config = input.required<SwitchPreviewConfig>();

  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly controls = new Map<string, FormControl<boolean>>();

  ngOnInit(): void {
    this.resetControls();
  }

  ngOnChanges(): void {
    this.resetControls();
  }

  protected controlFor(item: SwitchPreviewItem): FormControl<boolean> {
    return this.controls.get(item.id)!;
  }

  protected showError(item: SwitchPreviewItem): boolean {
    const control = this.controlFor(item);

    if (item.reactiveRequiredDemo) {
      return control.invalid && (control.touched || control.dirty);
    }

    return false;
  }

  protected tokenTarget(prefix: string | undefined, key: string): string | null {
    return prefix ? `${prefix}-${key}` : null;
  }

  private resetControls(): void {
    this.controls.clear();

    for (const item of this.config().items) {
      const control = new FormControl(item.initialChecked ?? false, {
        nonNullable: true,
        validators: item.reactiveRequiredDemo ? [Validators.requiredTrue] : [],
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

