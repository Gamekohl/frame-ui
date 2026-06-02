import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FrButtonModule, FrButtonAppearance, FrButtonSize } from '@frame-ui/components/button';
import { FrButtonGroupModule, FrButtonGroupOrientation } from '@frame-ui/components/button-group';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { tablerArrowRight, tablerLayoutGrid, tablerList, tablerPlus, tablerX } from '@ng-icons/tabler-icons';

export type ButtonGroupPreviewItem = {
  label?: string;
  icon?: string;
  appearance?: FrButtonAppearance;
  disabled?: boolean;
  iconButton?: boolean;
  ariaLabel?: string;
  size?: FrButtonSize;
  tokenPrefix?: string;
};

export type ButtonGroupPreviewConfig = {
  orientation?: FrButtonGroupOrientation;
  className?: string;
  style?: string;
  groupClassName?: string;
  tokenPrefix?: string;
  items: ButtonGroupPreviewItem[];
};

@Component({
  selector: 'docs-button-group-preview',
  imports: [
    FrButtonGroupModule,
    FrButtonModule,
    NgIconComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="config().className ?? 'w-full max-w-xl'" [style]="config().style ?? null">
      <div
        frButtonGroup
        [orientation]="config().orientation ?? 'horizontal'"
        [class]="config().groupClassName ?? 'w-full'"
      >
        @for (item of config().items; track trackItem(item, $index)) {
          @if (item.iconButton) {
            <button
              frIconButton
              type="button"
              [appearance]="item.appearance ?? 'outline'"
              [disabled]="item.disabled ?? false"
              [size]="item.size ?? 'md'"
              [attr.aria-label]="item.ariaLabel ?? item.label ?? 'Button action'"
              class="flex-1"
            >
              @if (item.icon) {
                <span frButtonIcon>
                  <ng-icon [name]="item.icon" size="16" />
                </span>
              }
            </button>
          } @else {
            <button
              frButton
              type="button"
              [appearance]="item.appearance ?? 'outline'"
              [disabled]="item.disabled ?? false"
              [size]="item.size ?? 'md'"
              class="flex-1"
            >
              @if (item.icon) {
                <span frButtonIcon>
                  <ng-icon [name]="item.icon" size="16" />
                </span>
              }

              @if (item.label) {
                <span frButtonLabel>{{ item.label }}</span>
              }
            </button>
          }
        }
      </div>
    </div>
  `,
  viewProviders: [
    provideIcons({ tablerPlus, tablerArrowRight, tablerX, tablerLayoutGrid, tablerList }),
  ],
})
export class DocsButtonGroupPreviewComponent {
  readonly config = input.required<ButtonGroupPreviewConfig>();

  protected trackItem(item: ButtonGroupPreviewItem, index: number): string {
    return `${item.label ?? item.ariaLabel ?? item.icon ?? 'group-item'}-${item.appearance ?? 'outline'}-${index}`;
  }
}

