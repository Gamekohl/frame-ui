import { Directive } from '@angular/core';

/** Input wrapper for labels, controls, and validation text. */
@Directive({
  selector: 'input[frInput]',
  host: {
    class: 'frame-input',
  },
})
export class FrInput {}

/** Field slot for input. */
@Directive({
  selector: '[frInputField], frame-input-field',
  host: {
    class: 'frame-input-field',
  },
})
export class FrInputField {}

/** Header slot for input. */
@Directive({
  selector: '[frInputHeader], frame-input-header',
  host: {
    class: 'frame-input-header',
  },
})
export class FrInputHeader {}

/** Control slot for input. */
@Directive({
  selector: '[frInputControl], frame-input-control',
  host: {
    class: 'frame-input-control',
  },
})
export class FrInputControl {}

/** Group slot for input field. */
@Directive({
  selector: '[frInputFieldGroup], frame-input-field-group',
  host: {
    class: 'frame-input-field-group',
  },
})
export class FrInputFieldGroup {}

/** Label slot for input. */
@Directive({
  selector: '[frInputLabel], frame-input-label',
  host: {
    class: 'frame-input-label',
  },
})
export class FrInputLabel {}

/** Description slot for input. */
@Directive({
  selector: '[frInputDescription], frame-input-description',
  host: {
    class: 'frame-input-description',
  },
})
export class FrInputDescription {}

/** Error slot for input. */
@Directive({
  selector: '[frInputError], frame-input-error',
  host: {
    class: 'frame-input-error',
    'aria-live': 'polite',
  },
})
export class FrInputError {}

/** Badge slot for input. */
@Directive({
  selector: '[frInputBadge], frame-input-badge',
  host: {
    class: 'frame-input-badge',
  },
})
export class FrInputBadge {}

