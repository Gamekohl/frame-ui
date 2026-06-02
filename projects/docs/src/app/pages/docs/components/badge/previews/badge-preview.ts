import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FrBadgeModule, FrBadgeIconPosition, FrBadgeVariant } from '@frame-ui/components/badge';
import { FrSpinner } from '@frame-ui/components/spinner';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  tablerArrowRight,
  tablerArrowUpRight,
  tablerPlus,
  tablerPoint,
} from '@ng-icons/tabler-icons';

export type BadgePreviewItem = {
  label: string;
  variant?: FrBadgeVariant;
  href?: string;
  icon?: string;
  iconPosition?: FrBadgeIconPosition;
  spinner?: boolean;
  spinnerPosition?: FrBadgeIconPosition;
  className?: string;
  style?: string;
  tokenPrefix?: string;
};

export type BadgePreviewConfig = {
  className?: string;
  style?: string;
  items: BadgePreviewItem[];
};

@Component({
  selector: 'docs-badge-preview',
  imports: [FrBadgeModule, FrSpinner, NgIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      [class]="config().className ?? 'flex flex-wrap items-center gap-3'"
      [style]="config().style ?? null"
    >
      @for (item of config().items; track item.label + '-' + (item.variant ?? 'default')) {
        @if (item.href) {
          <a
            frBadge
            [href]="item.href"
            [variant]="item.variant ?? 'default'"
            [class]="item.className ?? ''"
            [style]="item.style ?? null"
            [attr.data-token-target]="tokenTarget(item.tokenPrefix, 'root')"
          >
            @if (item.icon && item.iconPosition !== 'inline-end') {
              <ng-icon
                [name]="item.icon"
                frBadgeIcon
                [position]="item.iconPosition ?? 'inline-start'"
                [attr.data-token-target]="tokenTarget(item.tokenPrefix, 'icon')"
              />
            }

            <span frBadgeLabel [attr.data-token-target]="tokenTarget(item.tokenPrefix, 'label')">
              {{ item.label }}
            </span>

            @if (item.spinner && item.spinnerPosition !== 'inline-start') {
              <span
                frSpinner
                size="xs"
                [attr.data-token-target]="tokenTarget(item.tokenPrefix, 'spinner')"
              ></span>
            }

            @if (item.spinner && item.spinnerPosition === 'inline-start') {
              <span
                frSpinner
                size="xs"
                [attr.data-token-target]="tokenTarget(item.tokenPrefix, 'spinner')"
              ></span>
            }

            @if (item.icon && item.iconPosition === 'inline-end') {
              <ng-icon
                [name]="item.icon"
                frBadgeIcon
                [position]="item.iconPosition"
                [attr.data-token-target]="tokenTarget(item.tokenPrefix, 'icon')"
              />
            }
          </a>
        } @else {
          <span
            frBadge
            [variant]="item.variant ?? 'default'"
            [class]="item.className ?? ''"
            [style]="item.style ?? null"
            [attr.data-token-target]="tokenTarget(item.tokenPrefix, 'root')"
          >
            @if (item.icon && item.iconPosition !== 'inline-end') {
              <ng-icon
                [name]="item.icon"
                frBadgeIcon
                [position]="item.iconPosition ?? 'inline-start'"
                [attr.data-token-target]="tokenTarget(item.tokenPrefix, 'icon')"
              />
            }

            @if (item.spinner && item.spinnerPosition === 'inline-start') {
              <span
                frSpinner
                size="xs"
                [attr.data-token-target]="tokenTarget(item.tokenPrefix, 'spinner')"
              ></span>
            }

            <span frBadgeLabel [attr.data-token-target]="tokenTarget(item.tokenPrefix, 'label')">
              {{ item.label }}
            </span>

            @if (item.spinner && item.spinnerPosition !== 'inline-start') {
              <span
                frSpinner
                size="xs"
                [attr.data-token-target]="tokenTarget(item.tokenPrefix, 'spinner')"
              ></span>
            }

            @if (item.icon && item.iconPosition === 'inline-end') {
              <ng-icon
                [name]="item.icon"
                frBadgeIcon
                [position]="item.iconPosition"
                [attr.data-token-target]="tokenTarget(item.tokenPrefix, 'icon')"
              />
            }
          </span>
        }
      }
    </div>
  `,
  viewProviders: [provideIcons({ tablerPlus, tablerArrowRight, tablerArrowUpRight, tablerPoint })],
})
export class DocsBadgePreviewComponent {
  readonly config = input.required<BadgePreviewConfig>();

  protected tokenTarget(prefix: string | undefined, key: string): string {
    return prefix ? `${prefix}-${key}` : key;
  }
}

