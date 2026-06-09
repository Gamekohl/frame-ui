import { ChangeDetectionStrategy, Component, effect, input, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FrButtonModule } from '@frame-ui-ng/components/button';
import { FrComboboxModule } from '@frame-ui-ng/components/combobox';
import { FrSelectModule } from '@frame-ui-ng/components/select';
import { FrVirtualScrollModule } from '@frame-ui-ng/components/virtual-scroll';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  tablerArrowDown,
  tablerArrowUp,
  tablerBolt,
  tablerBrandAngular,
  tablerBrandSvelte,
  tablerBrandVue,
  tablerChecklist,
  tablerChevronDown,
  tablerCode,
  tablerComponents,
  tablerLayoutGrid,
  tablerMessage2,
  tablerPalette,
  tablerRocket,
  tablerSearch,
} from '@ng-icons/tabler-icons';

export type VirtualScrollDemoItem = {
  id: string;
  label: string;
  meta?: string;
  description?: string;
  icon?: string;
  selected?: boolean;
};

export type VirtualScrollPreviewConfig = {
  variant: 'basic' | 'controls' | 'select' | 'combobox' | 'inspector' | 'custom';
  className?: string;
  style?: string;
  height?: string;
  itemSize?: number;
  overscan?: number;
  items: VirtualScrollDemoItem[];
  title?: string;
  subtitle?: string;
};

@Component({
  selector: 'docs-virtual-scroll-preview',
  host: {
    class: 'block w-full',
  },
  imports: [
    FrButtonModule,
    FrComboboxModule,
    FrSelectModule,
    FrVirtualScrollModule,
    NgIcon,
    ReactiveFormsModule,
  ],
  viewProviders: [
    provideIcons({
      tablerArrowDown,
      tablerArrowUp,
      tablerBolt,
      tablerBrandAngular,
      tablerBrandSvelte,
      tablerBrandVue,
      tablerChecklist,
      tablerChevronDown,
      tablerCode,
      tablerComponents,
      tablerLayoutGrid,
      tablerMessage2,
      tablerPalette,
      tablerRocket,
      tablerSearch,
    }),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="config().className ?? 'w-full max-w-4xl'" [style]="config().style ?? null">
      @switch (config().variant) {
        @case ('basic') {
          <div frVirtualList>
            <div
              frVirtualViewport
              [height]="config().height ?? '18rem'"
              [itemSize]="config().itemSize ?? 52"
              [overscan]="config().overscan ?? 4"
              data-token-target="viewport"
            >
              <div frVirtualContent data-token-target="content">
                <button
                  frVirtualItem
                  *frVirtualFor="let item of config().items; trackBy: trackById; let index = index"
                  class="items-start"
                  data-token-target="item"
                >
                  <span class="grid gap-0.5 min-w-0">
                    <span class="truncate font-medium">{{ index + 1 }}. {{ item.label }}</span>
                    @if (item.description) {
                      <span frVirtualItemMeta data-token-target="meta">{{ item.description }}</span>
                    }
                  </span>
                  @if (item.meta) {
                    <span frVirtualItemMeta class="ml-auto shrink-0">{{ item.meta }}</span>
                  }
                </button>
              </div>
            </div>
          </div>
        }

        @case ('controls') {
          <div class="grid gap-4">
            <div class="flex flex-wrap gap-3">
              <button frButton type="button" (click)="viewport.scrollToIndex(0, 'start')">
                <span frButtonLabel>Top</span>
              </button>
              <button frButton type="button" (click)="viewport.scrollToIndex(120, 'center')">
                <span frButtonLabel>Middle</span>
              </button>
              <button frButton type="button" (click)="viewport.scrollToIndex(config().items.length - 1, 'end')">
                <span frButtonLabel>End</span>
              </button>
            </div>

            <div frVirtualList>
              <div
                #viewport="frVirtualViewport"
                frVirtualViewport
                [height]="config().height ?? '18rem'"
                [itemSize]="config().itemSize ?? 52"
                [overscan]="config().overscan ?? 6"
              >
                <div frVirtualContent>
                  <button
                    frVirtualItem
                    *frVirtualFor="let item of config().items; trackBy: trackById; let index = index"
                  >
                    <span class="inline-flex min-w-0 items-center gap-3">
                      <span class="inline-flex size-7 items-center justify-center rounded-full bg-accent text-accent-foreground text-xs font-semibold">
                        {{ index + 1 }}
                      </span>
                      <span class="truncate">{{ item.label }}</span>
                    </span>
                    @if (item.meta) {
                      <span frVirtualItemMeta class="ml-auto shrink-0">{{ item.meta }}</span>
                    }
                  </button>
                </div>
              </div>
            </div>
          </div>
        }

        @case ('select') {
          <div class="grid gap-3 w-full max-w-xl">
            <button
              type="button"
              [frSelect]="selectMenu"
              [formControl]="selectControl"
              indicatorPosition="end"
            >
              <frame-select-value [placeholder]="config().title ?? 'FrameUI'"></frame-select-value>
              <span frSelectIcon>
                <ng-icon name="tablerChevronDown" size="16" />
              </span>
            </button>

            <ng-template #selectMenu="frSelectContent" frSelectContent>
              <frame-select-panel>
                <div frVirtualViewport [height]="config().height ?? '16rem'" [itemSize]="config().itemSize ?? 44" [overscan]="config().overscan ?? 6">
                  <div frVirtualContent>
                    <frame-select-group>
                      <div frSelectLabel>
                        {{ config().subtitle ?? 'Surfaces' }}
                      </div>

                      <button
                        frSelectItem
                        *frVirtualFor="let item of config().items; trackBy: trackById"
                        [value]="item.id"
                        [label]="item.label"
                      >
                        <span class="flex min-w-0 items-center gap-3">
                          @if (item.icon) {
                            <ng-icon [name]="item.icon!" size="16" class="shrink-0 text-muted-foreground" />
                          }
                          <span class="grid min-w-0 gap-0.5">
                            <span class="truncate">{{ item.label }}</span>
                            @if (item.description) {
                              <span class="truncate text-xs text-muted-foreground">{{ item.description }}</span>
                            }
                          </span>
                        </span>
                      </button>
                    </frame-select-group>
                  </div>
                </div>
              </frame-select-panel>
            </ng-template>
          </div>
        }

        @case ('combobox') {
          <div class="grid gap-3 w-full max-w-xl">
            <div frCombobox [(value)]="comboboxValue">
              <input frComboboxInput [placeholder]="config().title ?? 'Search frameworks or commands'" />

              <ng-template frComboboxContent>
                <div frComboboxPanel class="overflow-hidden" style="max-block-size: none; overflow: hidden;">
                  <div frComboboxLabel>{{ config().subtitle ?? 'Results' }}</div>

                  <div frVirtualViewport [height]="config().height ?? '16rem'" [itemSize]="config().itemSize ?? 44" [overscan]="config().overscan ?? 6">
                    <div frVirtualContent>
                      <div frComboboxList>
                        <button
                          frComboboxItem
                          *frVirtualFor="let item of config().items; trackBy: trackById"
                          [value]="item.id"
                          [label]="item.label"
                        >
                          @if (item.icon) {
                            <ng-icon [name]="item.icon!" size="16" class="shrink-0 text-muted-foreground" />
                          }
                          <span class="grid min-w-0 gap-0.5">
                            <span class="truncate">{{ item.label }}</span>
                            @if (item.description) {
                              <span class="truncate text-xs text-muted-foreground">{{ item.description }}</span>
                            }
                          </span>
                          @if (item.meta) {
                            <span class="ml-auto shrink-0 text-xs text-muted-foreground">{{ item.meta }}</span>
                          }
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </ng-template>
            </div>
          </div>
        }

        @case ('inspector') {
          <div frVirtualList data-token-target="panel">
            <div
              frVirtualViewport
              [height]="config().height ?? '16rem'"
              [itemSize]="config().itemSize ?? 52"
              [overscan]="config().overscan ?? 4"
              data-token-target="viewport"
            >
              <div frVirtualContent data-token-target="content">
                <button
                  frVirtualItem
                  *frVirtualFor="let item of config().items; trackBy: trackById"
                  class="items-start"
                  data-token-target="item"
                >
                  <span class="grid gap-0.5 min-w-0">
                    <span class="truncate font-medium">{{ item.label }}</span>
                    @if (item.description) {
                      <span frVirtualItemMeta data-token-target="meta">{{ item.description }}</span>
                    }
                  </span>
                  @if (item.meta) {
                    <span frVirtualItemMeta class="ml-auto shrink-0">{{ item.meta }}</span>
                  }
                </button>
              </div>
            </div>
          </div>
        }

        @case ('custom') {
          <div frVirtualList>
            <div
              frVirtualViewport
              [height]="config().height ?? '18rem'"
              [itemSize]="config().itemSize ?? 56"
              [overscan]="config().overscan ?? 5"
            >
              <div frVirtualContent>
                <button
                  frVirtualItem
                  *frVirtualFor="let item of config().items; trackBy: trackById"
                  class="items-start"
                >
                  @if (item.icon) {
                    <span class="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                      <ng-icon [name]="item.icon!" size="16" />
                    </span>
                  }
                  <span class="grid gap-0.5 min-w-0">
                    <span class="truncate font-medium">{{ item.label }}</span>
                    @if (item.description) {
                      <span frVirtualItemMeta>{{ item.description }}</span>
                    }
                  </span>
                  @if (item.meta) {
                    <span frVirtualItemMeta class="ml-auto shrink-0">{{ item.meta }}</span>
                  }
                </button>
              </div>
            </div>
          </div>
        }
      }
    </div>
  `,
})
export class DocsVirtualScrollPreviewComponent {
  readonly config = input.required<VirtualScrollPreviewConfig>();
  protected readonly selectControl = new FormControl<string | null>(null);
  protected readonly comboboxValue = signal<string | null>(null);

  constructor() {
    effect(() => {
      const firstSelected =
        this.config()
          .items.find((item) => item.selected)?.id ?? this.config().items[0]?.id ?? null;

      this.selectControl.reset(firstSelected, { emitEvent: false });
      this.comboboxValue.set(firstSelected);
    });
  }

  protected readonly trackById = (_index: number, item: VirtualScrollDemoItem) => item.id;
}

