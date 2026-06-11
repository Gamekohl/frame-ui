import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FrButtonModule, FrButtonAppearance, FrButtonLoadingDisplay, FrButtonRadius, FrButtonSize } from '@frame-ui-ng/components/button';
import { FrSpinner } from '@frame-ui-ng/components/spinner';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { tablerArrowRight, tablerPlus, tablerX } from '@ng-icons/tabler-icons';

export type ButtonPreviewItem = {
  label?: string;
  icon?: string;
  appearance?: FrButtonAppearance;
  disabled?: boolean;
  href?: string;
  iconButton?: boolean;
  loading?: boolean;
  loadingDisplay?: FrButtonLoadingDisplay;
  loadingLabel?: string;
  radius?: FrButtonRadius;
  size?: FrButtonSize;
  style?: string;
  className?: string;
  tokenPrefix?: string;
  ariaLabel?: string;
};

export type ButtonPreviewConfig = {
  className?: string;
  style?: string;
  items: ButtonPreviewItem[];
};

@Component({
  selector: 'docs-button-preview',
  imports: [FrButtonModule, FrSpinner, NgIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="config().className ?? 'flex flex-wrap items-center gap-3'" [style]="config().style ?? null">
      @for (item of config().items; track trackItem(item, $index)) {
        @if (item.href && !item.iconButton) {
          <a
            frButton
            [attr.data-token-target]="tokenTarget(item.tokenPrefix, 'root')"
            [class]="item.className ?? ''"
            [disabled]="item.disabled ?? false"
            [href]="item.href"
            [loading]="item.loading ?? false"
            [loadingDisplay]="item.loadingDisplay ?? 'replace'"
            [appearance]="item.appearance ?? 'primary'"
            [radius]="item.radius ?? 'none'"
            [size]="item.size ?? 'md'"
            [style]="item.style ?? null"
          >
            @if (item.icon) {
              <span frButtonIcon [attr.data-token-target]="tokenTarget(item.tokenPrefix, 'icon')">
                <ng-icon [name]="item.icon" size="16" />
              </span>
            }

            @if (!item.iconButton && item.label) {
              <span frButtonLabel [attr.data-token-target]="tokenTarget(item.tokenPrefix, 'label')">
                {{ item.label }}
              </span>
            }

            @if (item.loadingLabel) {
              <span
                frSpinner
                size="sm"
                [attr.data-token-target]="tokenTarget(item.tokenPrefix, 'loading')"
              ></span>
            }
          </a>
        } @else if (item.href && item.iconButton) {
          <a
            frIconButton
            [attr.aria-label]="item.ariaLabel ?? item.label ?? 'Button'"
            [attr.data-token-target]="tokenTarget(item.tokenPrefix, 'root')"
            [class]="item.className ?? ''"
            [disabled]="item.disabled ?? false"
            [href]="item.href"
            [loading]="item.loading ?? false"
            [loadingDisplay]="item.loadingDisplay ?? 'replace'"
            [appearance]="item.appearance ?? 'primary'"
            [radius]="item.radius ?? 'none'"
            [size]="item.size ?? 'md'"
            [style]="item.style ?? null"
          >
            @if (item.icon) {
              <span frButtonIcon [attr.data-token-target]="tokenTarget(item.tokenPrefix, 'icon')">
                <ng-icon [name]="item.icon" size="16" />
              </span>
            }

            @if (item.loadingLabel) {
              <span
                frSpinner
                size="sm"
                [attr.data-token-target]="tokenTarget(item.tokenPrefix, 'loading')"
              ></span>
            }
          </a>
        } @else if (item.iconButton) {
          <button
            frIconButton
            type="button"
            [appearance]="item.appearance ?? 'primary'"
            [disabled]="item.disabled ?? false"
            [loading]="item.loading ?? false"
            [loadingDisplay]="item.loadingDisplay ?? 'replace'"
            [radius]="item.radius ?? 'none'"
            [size]="item.size ?? 'md'"
            [style]="item.style ?? null"
            [class]="item.className ?? ''"
            [attr.aria-label]="item.ariaLabel ?? item.label ?? 'Button'"
            [attr.data-token-target]="tokenTarget(item.tokenPrefix, 'root')"
          >
            @if (item.icon) {
              <span frButtonIcon [attr.data-token-target]="tokenTarget(item.tokenPrefix, 'icon')">
                <ng-icon [name]="item.icon" size="16" />
              </span>
            }

            @if (item.loadingLabel) {
              <span
                frSpinner
                size="sm"
                [attr.data-token-target]="tokenTarget(item.tokenPrefix, 'loading')"
              ></span>
            }
          </button>
        } @else {
          <button
            frButton
            type="button"
            [appearance]="item.appearance ?? 'primary'"
            [disabled]="item.disabled ?? false"
            [loading]="item.loading ?? false"
            [loadingDisplay]="item.loadingDisplay ?? 'replace'"
            [radius]="item.radius ?? 'none'"
            [size]="item.size ?? 'md'"
            [style]="item.style ?? null"
            [class]="item.className ?? ''"
            [attr.data-token-target]="tokenTarget(item.tokenPrefix, 'root')"
          >
            @if (item.icon) {
              <span frButtonIcon [attr.data-token-target]="tokenTarget(item.tokenPrefix, 'icon')">
                <ng-icon [name]="item.icon" size="16" />
              </span>
            }

            @if (item.label) {
              <span frButtonLabel [attr.data-token-target]="tokenTarget(item.tokenPrefix, 'label')">
                {{ item.label }}
              </span>
            }

            @if (item.loadingLabel) {
              <span
                frSpinner
                size="sm"
                [attr.data-token-target]="tokenTarget(item.tokenPrefix, 'loading')"
              ></span>
            }
          </button>
        }
      }
    </div>
  `,
  viewProviders: [provideIcons({ tablerPlus, tablerArrowRight, tablerX })],
})
export class DocsButtonPreviewComponent {
  readonly config = input.required<ButtonPreviewConfig>();

  protected tokenTarget(prefix: string | undefined, key: string): string {
    return prefix ? `${prefix}-${key}` : key;
  }

  protected trackItem(item: ButtonPreviewItem, index: number): string {
    return `${item.label ?? item.ariaLabel ?? item.icon ?? 'button'}-${item.appearance ?? 'primary'}-${index}`;
  }
}

