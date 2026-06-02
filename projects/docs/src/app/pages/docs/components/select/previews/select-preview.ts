import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, input } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FrSelectModule, FrSelectIndicatorPosition, FrSelectPosition } from '@frame-ui/components/select';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  tablerArrowRight,
  tablerCheck,
  tablerChevronDown,
  tablerCircleCheck,
  tablerDeviceDesktop,
  tablerDevices,
  tablerFileDescription,
  tablerLeaf,
  tablerPalette,
  tablerRocket,
  tablerWorld,
  tablerX,
} from '@ng-icons/tabler-icons';
import { merge } from 'rxjs';

export type SelectPreviewItem = {
  value: string;
  label: string;
  description?: string;
  icon?: string;
  indicatorIcon?: string;
};

export type SelectPreviewGroup = {
  label?: string;
  items: SelectPreviewItem[];
};

export type SelectPreviewConfig = {
  className?: string;
  style?: string;
  placeholder?: string;
  initialValue?: string | null;
  groups: SelectPreviewGroup[];
  position?: FrSelectPosition;
  indicatorPosition?: FrSelectIndicatorPosition;
  disabled?: boolean;
  invalid?: boolean;
  invalidMessage?: string;
  reactiveInvalidDemo?: boolean;
  debugVisible?: boolean;
  staticPanel?: boolean;
  tokenPrefix?: string;
  groupLabel?: string;
};

@Component({
  selector: 'docs-select-preview',
  host: {
    class: 'block w-full',
  },
  imports: [
    FrSelectModule,
    NgIcon,
    ReactiveFormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    provideIcons({
      tablerArrowRight,
      tablerCheck,
      tablerChevronDown,
      tablerCircleCheck,
      tablerDeviceDesktop,
      tablerDevices,
      tablerFileDescription,
      tablerLeaf,
      tablerPalette,
      tablerRocket,
      tablerWorld,
      tablerX,
    }),
  ],
  template: `
    <div [class]="config().className ?? 'w-full max-w-3xl'" [style]="config().style ?? null">
      <ng-template #menu="frSelectContent" frSelectContent [position]="config().position ?? 'item-aligned'">
        <frame-select-panel [attr.data-token-target]="tokenTarget(config().tokenPrefix, 'panel')">
          @for (group of config().groups; track group.label ?? $index) {
            <frame-select-group [attr.data-token-target]="tokenTarget(config().tokenPrefix, 'group')">
              @if (group.label) {
                <div frSelectLabel [attr.data-token-target]="tokenTarget(config().tokenPrefix, 'label')">
                  {{ group.label }}
                </div>
              }

              @for (item of group.items; track item.value) {
                <button
                  frSelectItem
                  [value]="item.value"
                  [label]="item.label"
                  [attr.data-token-target]="tokenTarget(config().tokenPrefix, 'item')"
                >
                  @if (item.indicatorIcon) {
                    <span
                      frSelectItemIndicator
                      [attr.data-token-target]="tokenTarget(config().tokenPrefix, 'indicator')"
                    >
                      <ng-icon [name]="item.indicatorIcon!" size="16" />
                    </span>
                  }

                  <span class="flex items-center gap-3 min-w-0">
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
              }
            </frame-select-group>

            @if ($index < config().groups.length - 1) {
              <div frSelectSeparator [attr.data-token-target]="tokenTarget(config().tokenPrefix, 'separator')"></div>
            }
          }
        </frame-select-panel>
      </ng-template>

      <div [class]="config().staticPanel ? 'grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,22rem)] lg:items-start' : 'grid gap-3'">
        <div class="grid gap-3">
        @if (!config().staticPanel) {
          <button
            type="button"
            [frSelect]="menu"
            [formControl]="control"
            [indicatorPosition]="config().indicatorPosition ?? 'start'"
            [invalid]="showInvalid()"
            [disabled]="config().disabled ?? false"
            [debugVisible]="config().debugVisible ?? false"
            [attr.data-token-target]="tokenTarget(config().tokenPrefix, 'trigger')"
          >
            <frame-select-value
              [placeholder]="config().placeholder ?? 'Select an option'"
              [attr.data-token-target]="tokenTarget(config().tokenPrefix, 'value')"
            ></frame-select-value>
            <span frSelectIcon [attr.data-token-target]="tokenTarget(config().tokenPrefix, 'icon')">
              <ng-icon name="tablerChevronDown" size="16" />
            </span>
          </button>
        } @else {
          <button
            type="button"
            class="frame-select__trigger"
            [attr.data-invalid]="showInvalid() ? '' : null"
            [attr.data-disabled]="config().disabled ? '' : null"
            [attr.data-token-target]="tokenTarget(config().tokenPrefix, 'trigger')"
          >
            <span
              class="frame-select__value"
              [attr.data-placeholder]="control.value === null ? '' : null"
              [attr.data-token-target]="tokenTarget(config().tokenPrefix, 'value')"
            >
              {{ selectedText() ?? config().placeholder ?? 'Select an option' }}
            </span>
            <span class="frame-select__icon" [attr.data-token-target]="tokenTarget(config().tokenPrefix, 'icon')">
              <ng-icon name="tablerChevronDown" size="16" />
            </span>
          </button>
        }

        @if (showInvalid() && config().invalidMessage) {
          <p frSelectError [attr.data-token-target]="tokenTarget(config().tokenPrefix, 'error')">
            {{ config().invalidMessage }}
          </p>
        }

        </div>

        @if (config().staticPanel) {
          <div
            class="frame-select__content w-full"
            [attr.data-position]="config().position ?? 'item-aligned'"
            [attr.data-token-target]="tokenTarget(config().tokenPrefix, 'panel')"
          >
            @for (group of config().groups; track group.label ?? $index) {
              <div class="frame-select__group" [attr.data-token-target]="tokenTarget(config().tokenPrefix, 'group')">
                @if (group.label) {
                  <div class="frame-select__label" [attr.data-token-target]="tokenTarget(config().tokenPrefix, 'label')">
                    {{ group.label }}
                  </div>
                }

                @for (item of group.items; track item.value) {
                  <button
                    type="button"
                    class="frame-select__item"
                    [attr.data-state]="control.value === item.value ? 'checked' : 'unchecked'"
                    [attr.data-indicator-position]="config().indicatorPosition ?? 'start'"
                    [attr.data-has-custom-indicator]="item.indicatorIcon ? '' : null"
                    [attr.data-token-target]="tokenTarget(config().tokenPrefix, 'item')"
                  >
                    @if (item.indicatorIcon) {
                      <span
                        frSelectItemIndicator
                        [attr.data-token-target]="tokenTarget(config().tokenPrefix, 'indicator')"
                      >
                        <ng-icon [name]="item.indicatorIcon!" size="16" />
                      </span>
                    }

                    <span class="flex items-center gap-3 min-w-0">
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
                }
              </div>

              @if ($index < config().groups.length - 1) {
                <div
                  class="frame-select__separator"
                  [attr.data-token-target]="tokenTarget(config().tokenPrefix, 'separator')"
                ></div>
              }
            }
          </div>
        }
      </div>

    </div>
  `,
})
export class DocsSelectPreviewComponent {
  readonly config = input.required<SelectPreviewConfig>();

  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  protected readonly control = new FormControl<string | null>(null);

  constructor() {
    merge(this.control.valueChanges, this.control.statusChanges)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.cdr.markForCheck());
  }

  ngOnInit(): void {
    this.resetControl();
  }

  ngOnChanges(): void {
    this.resetControl();
  }

  protected tokenTarget(prefix: string | undefined, key: string): string | null {
    return prefix ? `${prefix}-${key}` : null;
  }

  protected showInvalid(): boolean {
    if (this.config().reactiveInvalidDemo) {
      return this.control.invalid && (this.control.touched || this.control.dirty);
    }

    return this.config().invalid ?? false;
  }

  protected selectedText(): string | null {
    const selected = this.config()
      .groups.flatMap((group) => group.items)
      .find((item) => item.value === this.control.value);

    return selected?.label ?? null;
  }

  private resetControl(): void {
    const initialValue =
      this.config().reactiveInvalidDemo && this.config().initialValue === undefined
        ? this.firstValue()
        : (this.config().initialValue ?? null);

    this.control.setValidators(this.config().reactiveInvalidDemo ? [Validators.required] : []);
    this.control.reset(initialValue, { emitEvent: false });
    this.control.updateValueAndValidity({ emitEvent: false });

    if (this.config().disabled) {
      this.control.disable({ emitEvent: false });
    } else {
      this.control.enable({ emitEvent: false });
    }

    this.control.markAsPristine();
    this.control.markAsUntouched();

    if (this.config().reactiveInvalidDemo && initialValue === null) {
      this.control.markAsTouched();
    }

    this.cdr.markForCheck();
  }

  private firstValue(): string | null {
    return this.config().groups.flatMap((group) => group.items)[0]?.value ?? null;
  }
}

