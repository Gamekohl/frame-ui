import { Component, Directive, booleanAttribute, input } from '@angular/core';

export const FR_FIELD_LEGEND_VARIANTS = ['legend', 'label'] as const;
export const FR_FIELD_ORIENTATIONS = ['vertical', 'horizontal'] as const;

export type FrFieldLegendVariant = (typeof FR_FIELD_LEGEND_VARIANTS)[number];
export type FrFieldOrientation = (typeof FR_FIELD_ORIENTATIONS)[number];
export type FrFieldErrorLike = string | { message?: string | null } | null | undefined;

/** Fieldset wrapper for related form fields. */
@Directive({
  selector: 'fieldset[frFieldSet], frame-field-set',
  host: {
    class: 'frame-field-set',
  },
})
export class FrFieldSet {}

/** Legend slot for field. */
@Directive({
  selector: 'legend[frFieldLegend], frame-field-legend',
  host: {
    class: 'frame-field-legend',
    '[attr.data-variant]': 'variant()',
  },
})
export class FrFieldLegend {
  readonly variant = input<FrFieldLegendVariant>('legend');
}

/** Group slot for field. */
@Directive({
  selector: '[frFieldGroup], frame-field-group',
  host: {
    class: 'frame-field-group',
  },
})
export class FrFieldGroup {}

/** Form field row with orientation and responsive layout. */
@Directive({
  selector: '[frField], frame-field',
  host: {
    class: 'frame-field',
    '[attr.data-orientation]': 'orientation() === "horizontal" ? orientation() : null',
    '[attr.data-disabled]': 'disabled() ? "" : null',
    '[attr.data-invalid]': 'invalid() ? "" : null',
    role: 'group',
  },
})
export class FrField {
  readonly orientation = input<FrFieldOrientation>('vertical');
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly invalid = input(false, { transform: booleanAttribute });
}

/** Content slot for field. */
@Directive({
  selector: '[frFieldContent], frame-field-content',
  host: {
    class: 'frame-field-content',
  },
})
export class FrFieldContent {}

/** Label slot for field. */
@Directive({
  selector: '[frFieldLabel], frame-field-label',
  host: {
    class: 'frame-field-label',
  },
})
export class FrFieldLabel {}

/** Description slot for field. */
@Directive({
  selector: '[frFieldDescription], frame-field-description',
  host: {
    class: 'frame-field-description',
  },
})
export class FrFieldDescription {}

/** Separator slot for field. */
@Directive({
  selector: '[frFieldSeparator], frame-field-separator',
  host: {
    class: 'frame-field-separator',
    role: 'separator',
  },
})
export class FrFieldSeparator {}

/** Error slot for field. */
@Component({
  selector: '[frFieldError], frame-field-error',
  host: {
    class: 'frame-field-error',
    'aria-live': 'polite',
  },
  template: `
    @if (message()) {
      <span>{{ message() }}</span>
    } @else {
      <ng-content />
    }
  `,
})
export class FrFieldError {
  readonly errors = input<FrFieldErrorLike>(undefined);

  message(): string {
    const error = this.errors();

    if (typeof error === 'string') {
      return error;
    }

    return error?.message ?? '';
  }
}

