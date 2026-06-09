import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FrButtonModule } from '@frame-ui-ng/components/button';
import { FrDropdownMenuModule, FrDropdownMenuTriggerMode } from '@frame-ui-ng/components/dropdown-menu';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  tablerCheck,
  tablerChevronRight,
  tablerCopy,
  tablerDots,
  tablerExternalLink,
  tablerSettings,
  tablerShare,
  tablerTrash,
  tablerUser,
  tablerUserPlus,
} from '@ng-icons/tabler-icons';

type DropdownMenuPreviewItemVariant = 'default' | 'destructive';

export type DropdownMenuPreviewItem = {
  kind: 'item' | 'checkbox' | 'label' | 'separator' | 'submenu';
  label?: string;
  shortcut?: string;
  checked?: boolean;
  variant?: DropdownMenuPreviewItemVariant;
  inset?: boolean;
  icon?: string;
  children?: DropdownMenuPreviewItem[];
};

export type DropdownMenuPreviewConfig = {
  className?: string;
  style?: string;
  triggerLabel?: string;
  triggerMode?: FrDropdownMenuTriggerMode;
  debugVisible?: boolean;
  persistentPanel?: boolean;
  staticOpen?: boolean;
  tokenPrefix?: string;
  items: DropdownMenuPreviewItem[];
};

@Component({
  selector: 'docs-dropdown-menu-preview',
  imports: [
    FrButtonModule,
    FrDropdownMenuModule,
    NgIcon,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    provideIcons({
      tablerCheck,
      tablerChevronRight,
      tablerCopy,
      tablerDots,
      tablerExternalLink,
      tablerSettings,
      tablerShare,
      tablerTrash,
      tablerUser,
      tablerUserPlus,
    }),
  ],
  template: `
    @if (config().persistentPanel) {
      <div [class]="config().className ?? 'w-full max-w-5xl'" [style]="config().style ?? null">
        <div [class]="persistentLayoutClass()">
          <div frDropdownMenu [triggerMode]="config().triggerMode ?? 'click'">
            <button
              frButton
              appearance="outline"
              type="button"
              [frDropdownMenuTrigger]="menu"
              [attr.data-token-target]="tokenTarget('trigger')"
            >
              <span class="inline-flex items-center gap-2">
                <ng-icon name="tablerDots" size="16" />
                <span>{{ config().triggerLabel ?? 'Open menu' }}</span>
              </span>
            </button>

            <ng-template #menu="frDropdownMenuContent" frDropdownMenuContent>
              <div frDropdownMenuPanel>
                @for (item of config().items; track item.label ?? item.kind + '-' + $index) {
                  @if (item.kind === 'label') {
                    <div frDropdownMenuLabel>{{ item.label }}</div>
                  } @else if (item.kind === 'separator') {
                    <div frDropdownMenuSeparator></div>
                  } @else if (item.kind === 'checkbox') {
                    <button frDropdownMenuCheckboxItem [checked]="item.checked ?? false" type="button">
                      <span frDropdownMenuItemIndicator>
                        <ng-icon name="tablerCheck" size="14" />
                      </span>
                      @if (item.icon) {
                        <ng-icon [name]="item.icon" size="14" />
                      }
                      <span>{{ item.label }}</span>
                      @if (item.shortcut) {
                        <span frDropdownMenuShortcut>{{ item.shortcut }}</span>
                      }
                    </button>
                  } @else if (item.kind === 'submenu') {
                    <div frDropdownMenuSub>
                      <button
                        [frDropdownMenuSubTrigger]="subMenu"
                        [variant]="item.variant ?? 'default'"
                        [inset]="item.inset ?? false"
                        type="button"
                      >
                        @if (item.icon) {
                          <ng-icon [name]="item.icon" size="14" />
                        }
                        <span>{{ item.label }}</span>
                        @if (item.shortcut) {
                          <span frDropdownMenuShortcut>{{ item.shortcut }}</span>
                        }
                      </button>

                      <ng-template #subMenu="frDropdownMenuContent" frDropdownMenuSubContent>
                        <div frDropdownMenuPanel>
                          @for (child of item.children ?? []; track child.label ?? child.kind + '-' + $index) {
                            @if (child.kind === 'label') {
                              <div frDropdownMenuLabel>{{ child.label }}</div>
                            } @else if (child.kind === 'separator') {
                              <div frDropdownMenuSeparator></div>
                            } @else if (child.kind === 'checkbox') {
                              <button
                                frDropdownMenuCheckboxItem
                                [checked]="child.checked ?? false"
                                type="button"
                              >
                                <span frDropdownMenuItemIndicator>
                                  <ng-icon name="tablerCheck" size="14" />
                                </span>
                                @if (child.icon) {
                                  <ng-icon [name]="child.icon" size="14" />
                                }
                                <span>{{ child.label }}</span>
                              </button>
                            } @else {
                              <button
                                frDropdownMenuItem
                                [variant]="child.variant ?? 'default'"
                                [inset]="child.inset ?? false"
                                type="button"
                              >
                                @if (child.icon) {
                                  <ng-icon [name]="child.icon" size="14" />
                                }
                                <span>{{ child.label }}</span>
                                @if (child.shortcut) {
                                  <span frDropdownMenuShortcut>{{ child.shortcut }}</span>
                                }
                              </button>
                            }
                          }
                        </div>
                      </ng-template>
                    </div>
                  } @else {
                    <button
                      frDropdownMenuItem
                      [variant]="item.variant ?? 'default'"
                      [inset]="item.inset ?? false"
                      type="button"
                    >
                      @if (item.icon) {
                        <ng-icon [name]="item.icon" size="14" />
                      }
                      <span>{{ item.label }}</span>
                      @if (item.shortcut) {
                        <span frDropdownMenuShortcut>{{ item.shortcut }}</span>
                      }
                    </button>
                  }
                }
              </div>
            </ng-template>
          </div>

          <div class="frame-dropdown-menu__content min-w-0" [attr.data-token-target]="tokenTarget('panel-preview')">
            @for (item of config().items; track item.label ?? item.kind + '-' + $index) {
              @if (item.kind === 'label') {
                <div
                  class="frame-dropdown-menu__label"
                  [attr.data-token-target]="tokenTarget('label-preview')"
                >
                  {{ item.label }}
                </div>
              } @else if (item.kind === 'separator') {
                <div class="frame-dropdown-menu__separator"></div>
              } @else if (item.kind === 'checkbox') {
                <button
                  type="button"
                  class="frame-dropdown-menu__item frame-dropdown-menu__checkbox-item"
                  [attr.data-checked]="item.checked ? '' : null"
                  [attr.data-variant]="item.variant ?? 'default'"
                  [attr.data-token-target]="tokenTarget('item-preview')"
                >
                  <span
                    class="frame-dropdown-menu__indicator"
                    [attr.data-token-target]="tokenTarget('indicator-preview')"
                  >
                    <ng-icon name="tablerCheck" size="14" />
                  </span>
                  @if (item.icon) {
                    <ng-icon [name]="item.icon" size="14" />
                  }
                  <span>{{ item.label }}</span>
                  @if (item.shortcut) {
                    <span
                      class="frame-dropdown-menu__shortcut"
                      [attr.data-token-target]="tokenTarget('shortcut-preview')"
                    >
                      {{ item.shortcut }}
                    </span>
                  }
                </button>
              } @else if (item.kind === 'submenu') {
                <button
                  type="button"
                  class="frame-dropdown-menu__item frame-dropdown-menu__sub-trigger"
                  [attr.data-variant]="item.variant ?? 'default'"
                  [attr.data-token-target]="tokenTarget('item-preview')"
                >
                  @if (item.icon) {
                    <ng-icon [name]="item.icon" size="14" />
                  }
                  <span>{{ item.label }}</span>
                  @if (item.shortcut) {
                    <span
                      class="frame-dropdown-menu__shortcut"
                      [attr.data-token-target]="tokenTarget('shortcut-preview')"
                    >
                      {{ item.shortcut }}
                    </span>
                  }
                </button>
              } @else {
                <button
                  type="button"
                  class="frame-dropdown-menu__item"
                  [attr.data-variant]="item.variant ?? 'default'"
                  [attr.data-token-target]="tokenTarget('item-preview')"
                >
                  @if (item.icon) {
                    <ng-icon [name]="item.icon" size="14" />
                  }
                  <span>{{ item.label }}</span>
                  @if (item.shortcut) {
                    <span
                      class="frame-dropdown-menu__shortcut"
                      [attr.data-token-target]="tokenTarget('shortcut-preview')"
                    >
                      {{ item.shortcut }}
                    </span>
                  }
                </button>
              }
            }
          </div>

          @if (submenuPreviewItems().length) {
            <div class="frame-dropdown-menu__content min-w-0">
              @for (item of submenuPreviewItems(); track item.label ?? item.kind + '-' + $index) {
                @if (item.kind === 'label') {
                  <div class="frame-dropdown-menu__label">{{ item.label }}</div>
                } @else if (item.kind === 'separator') {
                  <div class="frame-dropdown-menu__separator"></div>
                } @else if (item.kind === 'checkbox') {
                  <button
                    type="button"
                    class="frame-dropdown-menu__item frame-dropdown-menu__checkbox-item"
                    [attr.data-checked]="item.checked ? '' : null"
                    [attr.data-variant]="item.variant ?? 'default'"
                  >
                    <span class="frame-dropdown-menu__indicator">
                      <ng-icon name="tablerCheck" size="14" />
                    </span>
                    @if (item.icon) {
                      <ng-icon [name]="item.icon" size="14" />
                    }
                    <span>{{ item.label }}</span>
                  </button>
                } @else {
                  <button
                    type="button"
                    class="frame-dropdown-menu__item"
                    [attr.data-variant]="item.variant ?? 'default'"
                  >
                    @if (item.icon) {
                      <ng-icon [name]="item.icon" size="14" />
                    }
                    <span>{{ item.label }}</span>
                    @if (item.shortcut) {
                      <span class="frame-dropdown-menu__shortcut">{{ item.shortcut }}</span>
                    }
                  </button>
                }
              }
            </div>
          }
        </div>
      </div>
    } @else if (config().staticOpen) {
      <div [class]="config().className ?? 'w-full max-w-4xl'" [style]="config().style ?? null">
        <div class="grid w-full max-w-fit gap-3">
          <button frButton appearance="outline" type="button">
            <span class="inline-flex items-center gap-2">
              <ng-icon name="tablerDots" size="16" />
              <span>{{ config().triggerLabel ?? 'Open menu' }}</span>
            </span>
          </button>

          <div class="frame-dropdown-menu__content min-w-0">
            @for (item of config().items; track item.label ?? item.kind + '-' + $index) {
              @if (item.kind === 'label') {
                <div class="frame-dropdown-menu__label">{{ item.label }}</div>
              } @else if (item.kind === 'separator') {
                <div class="frame-dropdown-menu__separator"></div>
              } @else if (item.kind === 'checkbox') {
                <button
                  type="button"
                  class="frame-dropdown-menu__item frame-dropdown-menu__checkbox-item"
                  [attr.data-checked]="item.checked ? '' : null"
                  [attr.data-variant]="item.variant ?? 'default'"
                >
                  <span class="frame-dropdown-menu__indicator">
                    <ng-icon name="tablerCheck" size="14" />
                  </span>
                  @if (item.icon) {
                    <ng-icon [name]="item.icon" size="14" />
                  }
                  <span>{{ item.label }}</span>
                  @if (item.shortcut) {
                    <span class="frame-dropdown-menu__shortcut">{{ item.shortcut }}</span>
                  }
                </button>
              } @else if (item.kind === 'submenu') {
                <div class="grid gap-2">
                  <button
                    type="button"
                    class="frame-dropdown-menu__item frame-dropdown-menu__sub-trigger"
                    [attr.data-state]="'open'"
                    [attr.data-variant]="item.variant ?? 'default'"
                  >
                    @if (item.icon) {
                      <ng-icon [name]="item.icon" size="14" />
                    }
                    <span>{{ item.label }}</span>
                    @if (item.shortcut) {
                      <span class="frame-dropdown-menu__shortcut">{{ item.shortcut }}</span>
                    }
                  </button>

                  @if (item.children?.length) {
                    <div class="pl-4">
                      <div class="frame-dropdown-menu__content">
                        @for (child of item.children ?? []; track child.label ?? child.kind + '-' + $index) {
                          @if (child.kind === 'label') {
                            <div class="frame-dropdown-menu__label">{{ child.label }}</div>
                          } @else if (child.kind === 'separator') {
                            <div class="frame-dropdown-menu__separator"></div>
                          } @else if (child.kind === 'checkbox') {
                            <button
                              type="button"
                              class="frame-dropdown-menu__item frame-dropdown-menu__checkbox-item"
                              [attr.data-checked]="child.checked ? '' : null"
                              [attr.data-variant]="child.variant ?? 'default'"
                            >
                              <span class="frame-dropdown-menu__indicator">
                                <ng-icon name="tablerCheck" size="14" />
                              </span>
                              @if (child.icon) {
                                <ng-icon [name]="child.icon" size="14" />
                              }
                              <span>{{ child.label }}</span>
                            </button>
                          } @else {
                            <button
                              type="button"
                              class="frame-dropdown-menu__item"
                              [attr.data-variant]="child.variant ?? 'default'"
                            >
                              @if (child.icon) {
                                <ng-icon [name]="child.icon" size="14" />
                              }
                              <span>{{ child.label }}</span>
                              @if (child.shortcut) {
                                <span class="frame-dropdown-menu__shortcut">{{ child.shortcut }}</span>
                              }
                            </button>
                          }
                        }
                      </div>
                    </div>
                  }
                </div>
              } @else {
                <button
                  type="button"
                  class="frame-dropdown-menu__item"
                  [attr.data-variant]="item.variant ?? 'default'"
                >
                  @if (item.icon) {
                    <ng-icon [name]="item.icon" size="14" />
                  }
                  <span>{{ item.label }}</span>
                  @if (item.shortcut) {
                    <span class="frame-dropdown-menu__shortcut">{{ item.shortcut }}</span>
                  }
                </button>
              }
            }
          </div>
        </div>
      </div>
    } @else {
      <div [class]="config().className ?? 'flex min-h-64 items-start justify-center'" [style]="config().style ?? null">
        <div frDropdownMenu [triggerMode]="config().triggerMode ?? 'click'">
          <button frButton appearance="outline" type="button" [frDropdownMenuTrigger]="menu">
            <span class="inline-flex items-center gap-2">
              <ng-icon name="tablerDots" size="16" />
              <span>{{ config().triggerLabel ?? 'Open menu' }}</span>
            </span>
          </button>

          <ng-template #menu="frDropdownMenuContent" frDropdownMenuContent [debugVisible]="config().debugVisible ?? false">
            <div frDropdownMenuPanel>
              @for (item of config().items; track item.label ?? item.kind + '-' + $index) {
                @if (item.kind === 'label') {
                  <div frDropdownMenuLabel>{{ item.label }}</div>
                } @else if (item.kind === 'separator') {
                  <div frDropdownMenuSeparator></div>
                } @else if (item.kind === 'checkbox') {
                  <button frDropdownMenuCheckboxItem [checked]="item.checked ?? false" type="button">
                    <span frDropdownMenuItemIndicator>
                      <ng-icon name="tablerCheck" size="14" />
                    </span>
                    @if (item.icon) {
                      <ng-icon [name]="item.icon" size="14" />
                    }
                    <span>{{ item.label }}</span>
                    @if (item.shortcut) {
                      <span frDropdownMenuShortcut>{{ item.shortcut }}</span>
                    }
                  </button>
                } @else if (item.kind === 'submenu') {
                  <div frDropdownMenuSub [triggerMode]="config().triggerMode ?? 'click'">
                    <button
                      [frDropdownMenuSubTrigger]="subMenu"
                      [variant]="item.variant ?? 'default'"
                      [inset]="item.inset ?? false"
                      type="button"
                    >
                      @if (item.icon) {
                        <ng-icon [name]="item.icon" size="14" />
                      }
                      <span>{{ item.label }}</span>
                      @if (item.shortcut) {
                        <span frDropdownMenuShortcut>{{ item.shortcut }}</span>
                      }
                    </button>

                    <ng-template
                      #subMenu="frDropdownMenuContent"
                      frDropdownMenuSubContent
                      [debugVisible]="config().debugVisible ?? false"
                    >
                      <div frDropdownMenuPanel>
                        @for (child of item.children ?? []; track child.label ?? child.kind + '-' + $index) {
                          @if (child.kind === 'label') {
                            <div frDropdownMenuLabel>{{ child.label }}</div>
                          } @else if (child.kind === 'separator') {
                            <div frDropdownMenuSeparator></div>
                          } @else if (child.kind === 'checkbox') {
                            <button
                              frDropdownMenuCheckboxItem
                              [checked]="child.checked ?? false"
                              type="button"
                            >
                              <span frDropdownMenuItemIndicator>
                                <ng-icon name="tablerCheck" size="14" />
                              </span>
                              @if (child.icon) {
                                <ng-icon [name]="child.icon" size="14" />
                              }
                              <span>{{ child.label }}</span>
                            </button>
                          } @else {
                            <button
                              frDropdownMenuItem
                              [variant]="child.variant ?? 'default'"
                              [inset]="child.inset ?? false"
                              type="button"
                            >
                              @if (child.icon) {
                                <ng-icon [name]="child.icon" size="14" />
                              }
                              <span>{{ child.label }}</span>
                              @if (child.shortcut) {
                                <span frDropdownMenuShortcut>{{ child.shortcut }}</span>
                              }
                            </button>
                          }
                        }
                      </div>
                    </ng-template>
                  </div>
                } @else {
                  <button
                    frDropdownMenuItem
                    [variant]="item.variant ?? 'default'"
                    [inset]="item.inset ?? false"
                    type="button"
                  >
                    @if (item.icon) {
                      <ng-icon [name]="item.icon" size="14" />
                    }
                    <span>{{ item.label }}</span>
                    @if (item.shortcut) {
                      <span frDropdownMenuShortcut>{{ item.shortcut }}</span>
                    }
                  </button>
                }
              }
            </div>
          </ng-template>
        </div>
      </div>
    }
  `,
})
export class DocsDropdownMenuPreviewComponent {
  readonly config = input.required<DropdownMenuPreviewConfig>();

  protected tokenTarget(key: string): string | null {
    const prefix = this.config().tokenPrefix;
    return prefix ? `${prefix}-${key}` : null;
  }

  protected submenuPreviewItems(): DropdownMenuPreviewItem[] {
    return this.config().items.find((item) => item.kind === 'submenu')?.children ?? [];
  }

  protected persistentLayoutClass(): string {
    return this.submenuPreviewItems().length
      ? 'grid w-full items-center justify-center gap-4 lg:grid-cols-[max-content_minmax(0,16rem)_minmax(0,15rem)]'
      : 'grid w-full items-center justify-center gap-4 lg:grid-cols-[max-content_minmax(0,16rem)]';
  }
}

