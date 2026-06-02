import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { FrContextMenuModule } from '@frame-ui/components/context-menu';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  tablerCheck,
  tablerCopy,
  tablerDownload,
  tablerEdit,
  tablerExternalLink,
  tablerEye,
  tablerFileText,
  tablerFolder,
  tablerLink,
  tablerShare,
  tablerTrash,
} from '@ng-icons/tabler-icons';

type ContextMenuPreviewItemVariant = 'default' | 'destructive';

export type ContextMenuPreviewItem = {
  kind: 'checkbox' | 'item' | 'label' | 'radio' | 'separator' | 'submenu';
  label?: string;
  shortcut?: string;
  checked?: boolean;
  value?: string;
  variant?: ContextMenuPreviewItemVariant;
  inset?: boolean;
  icon?: string;
  children?: ContextMenuPreviewItem[];
};

export type ContextMenuPreviewConfig = {
  className?: string;
  style?: string;
  triggerLabel?: string;
  dir?: 'ltr' | 'rtl';
  debugVisible?: boolean;
  persistentPanel?: boolean;
  items: ContextMenuPreviewItem[];
};

@Component({
  selector: 'docs-context-menu-preview',
  imports: [
    NgTemplateOutlet,
    FrContextMenuModule,
    NgIcon,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    provideIcons({
      tablerCheck,
      tablerCopy,
      tablerDownload,
      tablerEdit,
      tablerExternalLink,
      tablerEye,
      tablerFileText,
      tablerFolder,
      tablerLink,
      tablerShare,
      tablerTrash,
    }),
  ],
  template: `
    <div
      [class]="config().className ?? 'flex min-h-64 w-full items-center justify-center'"
      [style]="config().style ?? null"
    >
      @if (config().persistentPanel) {
        <div class="grid w-full gap-6 md:grid-cols-[minmax(0,1fr)_18rem]">
          <ng-container [ngTemplateOutlet]="triggerTemplate" />
          <div
            class="frame-dropdown-menu__content min-w-0"
            data-token-target="context-menu-panel-preview"
          >
            <ng-container [ngTemplateOutlet]="staticItemsTemplate" />
          </div>
        </div>
      } @else {
        <ng-container [ngTemplateOutlet]="triggerTemplate" />
      }
    </div>

    <ng-template #triggerTemplate>
      <div frContextMenu [dir]="config().dir ?? 'ltr'">
        @if (!config().persistentPanel) {
          <div
            [frContextMenuTrigger]="menu"
            class="grid min-h-40 min-w-64 place-items-center rounded-2xl border border-dashed border-border bg-muted/35 px-8 text-center text-sm font-medium text-muted-foreground"
            data-token-target="context-menu-trigger"
          >
            {{ config().triggerLabel ?? 'Right click here' }}
            <span class="mt-1 block text-xs font-normal opacity-75">Long press on touch</span>
          </div>
        }

        <ng-template
          #menu="frContextMenuContent"
          frContextMenuContent
          [debugVisible]="config().debugVisible ?? false"
        >
          <div frContextMenuPanel data-token-target="context-menu-panel">
            @for (item of config().items; track item.label ?? item.kind + '-' + $index) {
              @if (item.kind === 'label') {
                <div frContextMenuLabel>{{ item.label }}</div>
              } @else if (item.kind === 'separator') {
                <div frContextMenuSeparator></div>
              } @else if (item.kind === 'checkbox') {
                <button
                  frContextMenuCheckboxItem
                  [checked]="isCheckboxChecked(item)"
                  (click)="toggleCheckbox(item)"
                  type="button"
                >
                  <span frContextMenuItemIndicator>
                    <ng-icon name="tablerCheck" size="14" />
                  </span>
                  @if (item.icon) {
                    <ng-icon [name]="item.icon" size="14" />
                  }
                  <span>{{ item.label }}</span>
                  @if (item.shortcut) {
                    <span frContextMenuShortcut>{{ item.shortcut }}</span>
                  }
                </button>
              } @else if (item.kind === 'radio') {
                <div frContextMenuRadioGroup>
                  <button
                    frContextMenuRadioItem
                    [checked]="isRadioChecked(item)"
                    (click)="selectRadio(item)"
                    type="button"
                  >
                    <span frContextMenuItemIndicator>
                      <ng-icon name="tablerCheck" size="14" />
                    </span>
                    <span>{{ item.label }}</span>
                  </button>
                </div>
              } @else if (item.kind === 'submenu') {
                <div frContextMenuSub>
                  <button
                    [frContextMenuSubTrigger]="subMenu"
                    [variant]="item.variant ?? 'default'"
                    type="button"
                  >
                    @if (item.icon) {
                      <ng-icon [name]="item.icon" size="14" />
                    }
                    <span>{{ item.label }}</span>
                  </button>

                  <ng-template #subMenu="frContextMenuContent" frContextMenuSubContent>
                    <div frContextMenuPanel>
                      @for (
                        child of item.children ?? [];
                        track child.label ?? child.kind + '-' + $index
                      ) {
                        <button
                          frContextMenuItem
                          [variant]="child.variant ?? 'default'"
                          type="button"
                        >
                          @if (child.icon) {
                            <ng-icon [name]="child.icon" size="14" />
                          }
                          <span>{{ child.label }}</span>
                          @if (child.shortcut) {
                            <span frContextMenuShortcut>{{ child.shortcut }}</span>
                          }
                        </button>
                      }
                    </div>
                  </ng-template>
                </div>
              } @else {
                <button
                  frContextMenuItem
                  [variant]="item.variant ?? 'default'"
                  [inset]="item.inset ?? false"
                  type="button"
                >
                  @if (item.icon) {
                    <ng-icon [name]="item.icon" size="14" />
                  }
                  <span>{{ item.label }}</span>
                  @if (item.shortcut) {
                    <span frContextMenuShortcut>{{ item.shortcut }}</span>
                  }
                </button>
              }
            }
          </div>
        </ng-template>
      </div>
    </ng-template>

    <ng-template #itemsTemplate>
      @for (item of config().items; track item.label ?? item.kind + '-' + $index) {
        @if (item.kind === 'label') {
          <div frContextMenuLabel>{{ item.label }}</div>
        } @else if (item.kind === 'separator') {
          <div frContextMenuSeparator></div>
        } @else if (item.kind === 'checkbox') {
          <button
            frContextMenuCheckboxItem
            [checked]="isCheckboxChecked(item)"
            (click)="toggleCheckbox(item)"
            type="button"
          >
            <span frContextMenuItemIndicator>
              <ng-icon name="tablerCheck" size="14" />
            </span>
            @if (item.icon) {
              <ng-icon [name]="item.icon" size="14" />
            }
            <span>{{ item.label }}</span>
            @if (item.shortcut) {
              <span frContextMenuShortcut>{{ item.shortcut }}</span>
            }
          </button>
        } @else if (item.kind === 'radio') {
          <div frContextMenuRadioGroup>
            <button
              frContextMenuRadioItem
              [checked]="isRadioChecked(item)"
              (click)="selectRadio(item)"
              type="button"
            >
              <span frContextMenuItemIndicator>
                <ng-icon name="tablerCheck" size="14" />
              </span>
              <span>{{ item.label }}</span>
            </button>
          </div>
        } @else if (item.kind === 'submenu') {
          <div frContextMenuSub>
            <button
              [frContextMenuSubTrigger]="subMenu"
              [variant]="item.variant ?? 'default'"
              type="button"
            >
              @if (item.icon) {
                <ng-icon [name]="item.icon" size="14" />
              }
              <span>{{ item.label }}</span>
            </button>

            <ng-template #subMenu="frContextMenuContent" frContextMenuSubContent>
              <div frContextMenuPanel>
                @for (
                  child of item.children ?? [];
                  track child.label ?? child.kind + '-' + $index
                ) {
                  <button frContextMenuItem [variant]="child.variant ?? 'default'" type="button">
                    @if (child.icon) {
                      <ng-icon [name]="child.icon" size="14" />
                    }
                    <span>{{ child.label }}</span>
                    @if (child.shortcut) {
                      <span frContextMenuShortcut>{{ child.shortcut }}</span>
                    }
                  </button>
                }
              </div>
            </ng-template>
          </div>
        } @else {
          <button
            frContextMenuItem
            [variant]="item.variant ?? 'default'"
            [inset]="item.inset ?? false"
            type="button"
          >
            @if (item.icon) {
              <ng-icon [name]="item.icon" size="14" />
            }
            <span>{{ item.label }}</span>
            @if (item.shortcut) {
              <span frContextMenuShortcut>{{ item.shortcut }}</span>
            }
          </button>
        }
      }
    </ng-template>

    <ng-template #staticItemsTemplate>
      @for (item of config().items; track item.label ?? item.kind + '-' + $index) {
        @if (item.kind === 'label') {
          <div class="frame-dropdown-menu__label" data-token-target="context-menu-label-preview">
            {{ item.label }}
          </div>
        } @else if (item.kind === 'separator') {
          <div class="frame-dropdown-menu__separator" data-token-target="context-menu-separator-preview"></div>
        } @else {
          <button
            type="button"
            class="frame-dropdown-menu__item"
            [class.frame-dropdown-menu__checkbox-item]="item.kind === 'checkbox'"
            [class.frame-dropdown-menu__radio-item]="item.kind === 'radio'"
            [class.frame-dropdown-menu__sub-trigger]="item.kind === 'submenu'"
            [attr.data-checked]="isSelectableChecked(item) ? '' : null"
            [attr.data-variant]="item.variant ?? 'default'"
            data-token-target="context-menu-item-preview"
          >
            @if (item.kind === 'checkbox' || item.kind === 'radio') {
              <span
                class="frame-dropdown-menu__indicator"
                data-token-target="context-menu-indicator-preview"
              >
                <ng-icon name="tablerCheck" size="14" />
              </span>
            }
            @if (item.icon) {
              <ng-icon [name]="item.icon" size="14" />
            }
            <span>{{ item.label }}</span>
            @if (item.shortcut) {
              <span
                class="frame-dropdown-menu__shortcut"
                data-token-target="context-menu-shortcut-preview"
              >
                {{ item.shortcut }}
              </span>
            }
          </button>
        }
      }
    </ng-template>
  `,
})
export class DocsContextMenuPreviewComponent {
  readonly config = input.required<ContextMenuPreviewConfig>();
  protected readonly checkboxState = signal<Record<string, boolean>>({});
  protected readonly radioValue = signal<string | null>(null);

  protected isCheckboxChecked(item: ContextMenuPreviewItem): boolean {
    const key = this.itemKey(item);

    return this.checkboxState()[key] ?? item.checked ?? false;
  }

  protected toggleCheckbox(item: ContextMenuPreviewItem): void {
    const key = this.itemKey(item);

    this.checkboxState.update((state) => ({
      ...state,
      [key]: !this.isCheckboxChecked(item),
    }));
  }

  protected isRadioChecked(item: ContextMenuPreviewItem): boolean {
    const selected = this.radioValue() ?? this.initialRadioValue();

    return selected === this.itemKey(item);
  }

  protected selectRadio(item: ContextMenuPreviewItem): void {
    this.radioValue.set(this.itemKey(item));
  }

  protected isSelectableChecked(item: ContextMenuPreviewItem): boolean {
    if (item.kind === 'checkbox') {
      return this.isCheckboxChecked(item);
    }

    if (item.kind === 'radio') {
      return this.isRadioChecked(item);
    }

    return false;
  }

  private initialRadioValue(): string | null {
    const item = this.config().items.find((entry) => entry.kind === 'radio' && entry.checked);

    return item ? this.itemKey(item) : null;
  }

  private itemKey(item: ContextMenuPreviewItem): string {
    return item.value ?? item.label ?? item.kind;
  }
}

