import { Directive, booleanAttribute, computed, contentChild, input } from '@angular/core';
import { FrSpinner } from '@frame-ui-ng/components/spinner';

export const FR_BUTTON_APPEARANCES = [
  'ghost',
  'outline',
  'primary',
] as const;
export const FR_BUTTON_LOADING_DISPLAYS = ['inline', 'replace'] as const;
export const FR_BUTTON_SIZES = ['sm', 'md', 'lg'] as const;

export type FrButtonAppearance = (typeof FR_BUTTON_APPEARANCES)[number];
export type FrButtonLoadingDisplay = (typeof FR_BUTTON_LOADING_DISPLAYS)[number];
export type FrButtonSize = (typeof FR_BUTTON_SIZES)[number];

/** Button host with FrameUI size and appearance variants. */
@Directive({
  selector: 'a[frButton], button[frButton]',
  host: {
    class: 'frame-button',
    '[attr.data-appearance]': 'appearance()',
    '[attr.data-disabled]': 'disabled() ? "" : null',
    '[attr.data-has-custom-loading]': 'hasCustomLoadingIndicator() ? "" : null',
    '[attr.data-loading]': 'loading() ? "" : null',
    '[attr.data-loading-display]': 'loadingDisplay()',
    '[attr.data-size]': 'size()',
    '[attr.aria-busy]': 'loading() ? "true" : null',
    '[attr.aria-disabled]': 'disabled() ? "true" : null',
    '[attr.disabled]': 'isUnavailable() ? "" : null',
    '[class.frame-button-disabled]': 'isUnavailable()',
    '[class.frame-button-loading]': 'loading()',
  },
})
export class FrButton {
  private readonly loadingIndicator = contentChild(FrButtonLoading);
  private readonly spinnerIndicator = contentChild(FrSpinner);

  readonly appearance = input<FrButtonAppearance>('primary');
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly loading = input(false, { transform: booleanAttribute });
  readonly loadingDisplay = input<FrButtonLoadingDisplay>('replace');
  readonly size = input<FrButtonSize>('md');
  protected readonly hasCustomLoadingIndicator = computed(
    () => !!this.loadingIndicator() || !!this.spinnerIndicator(),
  );
  protected readonly isUnavailable = computed(() => this.disabled() || this.loading());
}

/** Icon-only button host with square sizing. */
@Directive({
  selector: 'a[frIconButton], button[frIconButton]',
  hostDirectives: [
    {
      directive: FrButton,
      inputs: ['appearance', 'disabled', 'loading', 'loadingDisplay', 'size'],
    },
  ],
  host: {
    class: 'frame-icon-button',
    '[attr.data-icon-button]': '""',
    '[attr.aria-label]': 'ariaLabel()',
  },
})
export class FrIconButton {
  readonly ariaLabel = input<string | null>(null, { alias: 'aria-label' });
}

/** Icon slot for button. */
@Directive({
  selector: '[frButtonIcon]',
  host: {
    class: 'frame-button__icon',
    'aria-hidden': 'true',
  },
})
export class FrButtonIcon {}

/** Label slot for button. */
@Directive({
  selector: '[frButtonLabel]',
  host: {
    class: 'frame-button__label',
  },
})
export class FrButtonLabel {}

/** Loading indicator slot for button. */
@Directive({
  selector: '[frButtonLoading]',
  host: {
    class: 'frame-button__loading',
    'aria-hidden': 'true',
  },
})
export class FrButtonLoading {}

