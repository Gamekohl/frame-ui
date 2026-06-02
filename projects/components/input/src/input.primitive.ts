import { Directive } from '@angular/core';

@Directive({
  selector: 'input[frInput]',
  host: {
    class: 'frame-input',
  },
})
export class FrInput {}

@Directive({
  selector: '[frInputField], frame-input-field',
  host: {
    class: 'frame-input-field',
  },
})
export class FrInputField {}

@Directive({
  selector: '[frInputHeader], frame-input-header',
  host: {
    class: 'frame-input-header',
  },
})
export class FrInputHeader {}

@Directive({
  selector: '[frInputControl], frame-input-control',
  host: {
    class: 'frame-input-control',
  },
})
export class FrInputControl {}

@Directive({
  selector: '[frInputFieldGroup], frame-input-field-group',
  host: {
    class: 'frame-input-field-group',
  },
})
export class FrInputFieldGroup {}

@Directive({
  selector: '[frInputLabel], frame-input-label',
  host: {
    class: 'frame-input-label',
  },
})
export class FrInputLabel {}

@Directive({
  selector: '[frInputDescription], frame-input-description',
  host: {
    class: 'frame-input-description',
  },
})
export class FrInputDescription {}

@Directive({
  selector: '[frInputError], frame-input-error',
  host: {
    class: 'frame-input-error',
    'aria-live': 'polite',
  },
})
export class FrInputError {}

@Directive({
  selector: '[frInputBadge], frame-input-badge',
  host: {
    class: 'frame-input-badge',
  },
})
export class FrInputBadge {}
