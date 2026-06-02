import { ChangeDetectionStrategy, Component, effect, input, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { FrComboboxModule } from '@frame-ui/components/combobox';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { tablerCheck, tablerChevronDown, tablerX } from '@ng-icons/tabler-icons';

export type ComboboxPreviewItem = {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
};

export type ComboboxPreviewGroup = {
  label?: string;
  items: ComboboxPreviewItem[];
};

export type ComboboxPreviewConfig = {
  variant?: 'input' | 'trigger' | 'chips';
  className?: string;
  style?: string;
  persistentPanel?: boolean;
  placeholder?: string;
  triggerLabel?: string;
  emptyLabel?: string;
  errorText?: string;
  showClear?: boolean;
  invalid?: boolean;
  disabled?: boolean;
  multiple?: boolean;
  autoHighlight?: boolean;
  debugVisible?: boolean;
  reactiveInvalidDemo?: boolean;
  tokenPrefix?: string;
  initialValue?: string | string[] | null;
  groups: ComboboxPreviewGroup[];
};

@Component({
  selector: 'docs-combobox-preview',
  imports: [
    FrComboboxModule,
    NgIcon,
    ReactiveFormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [provideIcons({ tablerCheck, tablerChevronDown, tablerX })],
  template: `
    @if (config().persistentPanel) {
      <div [class]="config().className ?? 'w-full max-w-5xl'" [style]="config().style ?? null">
        <div class="grid w-full items-start gap-4 lg:grid-cols-[18rem_minmax(0,1fr)]">
          <div
            class="min-w-0"
            frCombobox
            [showClear]="config().showClear ?? false"
            [invalid]="config().invalid ?? false"
            [disabled]="config().disabled ?? false"
            [autoHighlight]="config().autoHighlight ?? true"
            [debugVisible]="config().debugVisible ?? false"
            [(value)]="value"
          >
            <div class="relative">
              <input
                frComboboxInput
                [placeholder]="config().placeholder ?? 'Search frameworks'"
                [style.paddingInlineEnd]="config().showClear ? '2.5rem' : null"
                [attr.data-token-target]="tokenTarget('control')"
              />

              @if (config().showClear) {
                <button frComboboxClear [attr.data-token-target]="tokenTarget('clear')">
                  <ng-icon name="tablerX" size="14" />
                </button>
              }
            </div>

            <ng-template frComboboxContent>
              <div frComboboxPanel>
                <p frComboboxEmpty>
                  {{ config().emptyLabel ?? 'No matches found.' }}
                </p>

                <div frComboboxCollection>
                  @for (group of config().groups; track group.label ?? $index) {
                    <section frComboboxGroup>
                      @if (group.label) {
                        <p frComboboxLabel>
                          {{ group.label }}
                        </p>
                      }

                      <div frComboboxList>
                        @for (item of group.items; track item.value) {
                          <button frComboboxItem [value]="item.value" [label]="item.label">
                            <span frComboboxItemIndicator>
                              <ng-icon name="tablerCheck" size="14" />
                            </span>

                            <span class="grid gap-1">
                              <span class="font-medium">{{ item.label }}</span>
                              @if (item.description) {
                                <span class="text-xs text-muted-foreground">{{ item.description }}</span>
                              }
                            </span>
                          </button>
                        }
                      </div>
                    </section>
                  }
                </div>
              </div>
            </ng-template>
          </div>

          <div class="frame-combobox__panel min-w-0" [attr.data-token-target]="tokenTarget('panel-preview')">
            @if (!hasVisibleItems()) {
              <p class="frame-combobox__empty" [attr.data-token-target]="tokenTarget('empty-preview')">
                {{ config().emptyLabel ?? 'No matches found.' }}
              </p>
            }

            @if (hasVisibleItems()) {
              <div class="frame-combobox__collection">
                @for (group of config().groups; track group.label ?? $index) {
                  <section class="frame-combobox__group">
                    @if (group.label) {
                      <p
                        class="frame-combobox__label"
                        [attr.data-token-target]="tokenTarget('group-label-preview')"
                      >
                        {{ group.label }}
                      </p>
                    }

                    <div class="frame-combobox__list">
                      @for (item of groupVisibleItems(group); track item.value) {
                        <button
                          type="button"
                          class="frame-combobox__item"
                          [attr.data-token-target]="tokenTarget('item-preview')"
                          [attr.data-selected]="isPreviewSelected(item.value) ? '' : null"
                          [attr.data-highlighted]="isPreviewHighlighted(item.value) ? '' : null"
                          [disabled]="item.disabled ?? false"
                        >
                          <span
                            class="frame-combobox__item-indicator"
                            [attr.data-token-target]="tokenTarget('item-indicator-preview')"
                          >
                            <ng-icon name="tablerCheck" size="14" />
                          </span>

                          <span class="grid gap-1" [attr.data-token-target]="tokenTarget('item-copy-preview')">
                            <span
                              class="font-medium"
                              [attr.data-token-target]="tokenTarget('item-label-preview')"
                            >
                              {{ item.label }}
                            </span>
                            @if (item.description) {
                              <span class="text-xs text-muted-foreground">
                                {{ item.description }}
                              </span>
                            }
                          </span>
                        </button>
                      }
                    </div>
                  </section>
                }
              </div>
            }
          </div>
        </div>
      </div>
    } @else {
      <div [class]="config().className ?? 'w-full max-w-2xl'" [style]="config().style ?? null">
        @if (config().variant === 'trigger') {
          <div frCombobox [disabled]="config().disabled ?? false" [(value)]="value">
            <button frComboboxTrigger type="button">
              <span>{{ triggerText() }}</span>
              <ng-icon name="tablerChevronDown" size="16" />
            </button>

            <ng-template frComboboxContent>
              <div frComboboxPanel>
                <p frComboboxEmpty>
                  {{ config().emptyLabel ?? 'No matches found.' }}
                </p>

                <div frComboboxCollection>
                  @for (group of config().groups; track group.label ?? $index) {
                    <section frComboboxGroup>
                      @if (group.label) {
                        <p frComboboxLabel>{{ group.label }}</p>
                      }

                      <div frComboboxList>
                        @for (item of group.items; track item.value) {
                          <button frComboboxItem [value]="item.value" [label]="item.label">
                            <span frComboboxItemIndicator>
                              <ng-icon name="tablerCheck" size="14" />
                            </span>
                            <span class="grid gap-1">
                              <span class="font-medium">{{ item.label }}</span>
                              @if (item.description) {
                                <span class="text-xs text-muted-foreground">{{ item.description }}</span>
                              }
                            </span>
                          </button>
                        }
                      </div>
                    </section>
                  }
                </div>
              </div>
            </ng-template>
          </div>
        } @else if (config().variant === 'chips') {
          <div
            class="grid gap-2"
            frCombobox
            [multiple]="isMultiple()"
            [showClear]="config().showClear ?? false"
            [invalid]="config().invalid ?? false"
            [disabled]="config().disabled ?? false"
            [autoHighlight]="config().autoHighlight ?? true"
            [debugVisible]="config().debugVisible ?? false"
            [(value)]="value"
          >
            <div frComboboxChips>
              <div frComboboxValue>
                @for (item of selectedValues(); track item) {
                  <span frComboboxChip [value]="item">
                    {{ itemLabel(item) }}
                    <button frComboboxChipRemove aria-label="Remove selection">
                      <ng-icon name="tablerX" size="12" />
                    </button>
                  </span>
                }
              </div>

              <input frComboboxChipsInput [placeholder]="config().placeholder ?? 'Add frameworks'" />
            </div>

            <ng-template frComboboxContent>
              <div frComboboxPanel>
                <p frComboboxEmpty>
                  {{ config().emptyLabel ?? 'No matches found.' }}
                </p>

                <div frComboboxCollection>
                  @for (group of config().groups; track group.label ?? $index) {
                    <section frComboboxGroup>
                      @if (group.label) {
                        <p frComboboxLabel>{{ group.label }}</p>
                      }

                      <div frComboboxList>
                        @for (item of group.items; track item.value) {
                          <button frComboboxItem [value]="item.value" [label]="item.label">
                            <span frComboboxItemIndicator>
                              <ng-icon name="tablerCheck" size="14" />
                            </span>
                            <span class="grid gap-1">
                              <span class="font-medium">{{ item.label }}</span>
                              @if (item.description) {
                                <span class="text-xs text-muted-foreground">{{ item.description }}</span>
                              }
                            </span>
                          </button>
                        }
                      </div>
                    </section>
                  }
                </div>
              </div>
            </ng-template>

            @if (config().errorText) {
              <p frComboboxError>{{ config().errorText }}</p>
            }
          </div>
        } @else {
          @if (config().reactiveInvalidDemo) {
            <div
              class="grid gap-2"
              frCombobox
              [formControl]="invalidDemoControl"
              [showClear]="config().showClear ?? false"
              [invalid]="invalidDemoControl.invalid && invalidDemoControl.touched"
              [disabled]="config().disabled ?? false"
              [autoHighlight]="config().autoHighlight ?? true"
              [debugVisible]="config().debugVisible ?? false"
            >
              <div class="relative">
                <input
                  frComboboxInput
                  [placeholder]="config().placeholder ?? 'Search frameworks'"
                  [style.paddingInlineEnd]="config().showClear ? '2.5rem' : null"
                />

                @if (config().showClear) {
                  <button frComboboxClear aria-label="Clear selection">
                    <ng-icon name="tablerX" size="14" />
                  </button>
                }
              </div>

              <ng-template frComboboxContent>
                <div frComboboxPanel>
                  <p frComboboxEmpty>
                    {{ config().emptyLabel ?? 'No matches found.' }}
                  </p>

                  <div frComboboxCollection>
                    @for (group of config().groups; track group.label ?? $index) {
                      <section frComboboxGroup>
                        @if (group.label) {
                          <p frComboboxLabel>{{ group.label }}</p>
                        }

                        <div frComboboxList>
                          @for (item of group.items; track item.value) {
                            <button frComboboxItem [value]="item.value" [label]="item.label">
                              <span frComboboxItemIndicator>
                                <ng-icon name="tablerCheck" size="14" />
                              </span>
                              <span class="grid gap-1">
                                <span class="font-medium">{{ item.label }}</span>
                                @if (item.description) {
                                  <span class="text-xs text-muted-foreground">{{ item.description }}</span>
                                }
                              </span>
                            </button>
                          }
                        </div>
                      </section>
                    }
                  </div>
                </div>
              </ng-template>

              @if (invalidDemoControl.invalid && invalidDemoControl.touched && config().errorText) {
                <p frComboboxError>{{ config().errorText }}</p>
              }
            </div>
          } @else {
            <div
              class="grid gap-2"
              frCombobox
              [showClear]="config().showClear ?? false"
              [invalid]="config().invalid ?? false"
              [disabled]="config().disabled ?? false"
              [autoHighlight]="config().autoHighlight ?? true"
              [debugVisible]="config().debugVisible ?? false"
              [(value)]="value"
            >
              <div class="relative">
                <input
                  frComboboxInput
                  [placeholder]="config().placeholder ?? 'Search frameworks'"
                  [style.paddingInlineEnd]="config().showClear ? '2.5rem' : null"
                />

                @if (config().showClear) {
                  <button frComboboxClear aria-label="Clear selection">
                    <ng-icon name="tablerX" size="14" />
                  </button>
                }
              </div>

              <ng-template frComboboxContent>
                <div frComboboxPanel>
                  <p frComboboxEmpty>
                    {{ config().emptyLabel ?? 'No matches found.' }}
                  </p>

                  <div frComboboxCollection>
                    @for (group of config().groups; track group.label ?? $index) {
                      <section frComboboxGroup>
                        @if (group.label) {
                          <p frComboboxLabel>{{ group.label }}</p>
                        }

                        <div frComboboxList>
                          @for (item of group.items; track item.value) {
                            <button frComboboxItem [value]="item.value" [label]="item.label">
                              <span frComboboxItemIndicator>
                                <ng-icon name="tablerCheck" size="14" />
                              </span>
                              <span class="grid gap-1">
                                <span class="font-medium">{{ item.label }}</span>
                                @if (item.description) {
                                  <span class="text-xs text-muted-foreground">{{ item.description }}</span>
                                }
                              </span>
                            </button>
                          }
                        </div>
                      </section>
                    }
                  </div>
                </div>
              </ng-template>

              @if (config().errorText) {
                <p frComboboxError>{{ config().errorText }}</p>
              }
            </div>
          }
        }
      </div>
    }
  `,
})
export class DocsComboboxPreviewComponent {
  readonly config = input.required<ComboboxPreviewConfig>();
  protected value = signal<unknown | unknown[] | null>(null);
  protected readonly invalidDemoControl = new FormControl<string | null>(null, {
    validators: [Validators.required],
    nonNullable: false,
  });

  constructor() {
    effect(() => {
      this.value.set(this.cloneValue(this.config().initialValue ?? (this.isMultiple() ? [] : null)));
      if (this.config().reactiveInvalidDemo) {
        this.invalidDemoControl.reset(null, { emitEvent: false });
      } else {
        const initialValue = this.config().initialValue;
        const singleValue: string | null = typeof initialValue === 'string' ? initialValue : null;
        this.invalidDemoControl.reset(singleValue, { emitEvent: false });
      }
    });
  }

  protected tokenTarget(key: string): string | null {
    const prefix = this.config().tokenPrefix;
    return prefix ? `${prefix}-${key}` : null;
  }

  protected itemLabel(value: unknown): string {
    const item = this.flattenItems().find((entry) => Object.is(entry.value, value));
    return item?.label ?? String(value ?? '');
  }

  protected triggerText(): string {
    const selected = this.value();

    if (Array.isArray(selected)) {
      return selected.length ? selected.map((item) => this.itemLabel(item)).join(', ') : this.placeholderText();
    }

    return selected === null ? this.placeholderText() : this.itemLabel(selected);
  }

  private placeholderText(): string {
    return this.config().triggerLabel ?? 'Choose a framework';
  }

  private flattenItems(): ComboboxPreviewItem[] {
    return this.config().groups.flatMap((group) => group.items);
  }

  protected visibleItems(): ComboboxPreviewItem[] {
    return this.flattenItems();
  }

  protected groupVisibleItems(group: ComboboxPreviewGroup): ComboboxPreviewItem[] {
    return group.items;
  }

  protected hasVisibleItems(): boolean {
    return this.visibleItems().length > 0;
  }

  protected isPreviewSelected(value: string): boolean {
    const current = this.value();
    return Array.isArray(current)
      ? current.some((item) => Object.is(item, value))
      : Object.is(current, value);
  }

  protected isPreviewHighlighted(value: string): boolean {
    if (this.isPreviewSelected(value)) {
      return true;
    }

    return this.visibleItems()[0]?.value === value;
  }

  protected selectedValues(): unknown[] {
    const current = this.value();
    return Array.isArray(current) ? current : [];
  }

  protected isMultiple(): boolean {
    return this.config().multiple ?? this.config().variant === 'chips';
  }

  private cloneValue(value: string | string[] | null): string | string[] | null {
    return Array.isArray(value) ? [...value] : value;
  }
}

