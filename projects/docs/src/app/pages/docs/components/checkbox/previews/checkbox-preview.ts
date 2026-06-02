import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FrCheckboxModule } from '@frame-ui/components/checkbox';

export type CheckboxPreviewItem = {
  label: string;
  checked?: boolean;
  disabled?: boolean;
  indeterminate?: boolean;
  invalid?: boolean;
  className?: string;
  style?: string;
  tokenPrefix?: string;
};

export type CheckboxPreviewConfig = {
  className?: string;
  style?: string;
  items: CheckboxPreviewItem[];
};

@Component({
  selector: 'docs-checkbox-preview',
  imports: [FrCheckboxModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="config().className ?? 'grid w-full max-w-xl gap-4'" [style]="config().style ?? null">
      @for (item of config().items; track item.label) {
        <label frCheckboxField [class]="item.className ?? ''" [style]="item.style ?? null" [attr.data-token-target]="tokenTarget(item.tokenPrefix, 'field')">
          <input
            frCheckbox
            type="checkbox"
            [checked]="item.checked ?? false"
            [disabled]="item.disabled ?? false"
            [indeterminate]="item.indeterminate ?? false"
            [attr.aria-invalid]="item.invalid ? 'true' : null"
            [attr.data-token-target]="tokenTarget(item.tokenPrefix, 'box')"
          />
          <span frCheckboxLabel [attr.data-token-target]="tokenTarget(item.tokenPrefix, 'label')">
            {{ item.label }}
          </span>
        </label>
      }
    </div>
  `,
})
export class DocsCheckboxPreviewComponent {
  readonly config = input.required<CheckboxPreviewConfig>();

  protected tokenTarget(prefix: string | undefined, key: string): string {
    return prefix ? `${prefix}-${key}` : key;
  }
}

