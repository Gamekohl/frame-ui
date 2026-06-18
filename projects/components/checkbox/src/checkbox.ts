import { Directive, booleanAttribute, input } from '@angular/core';

/** Checkbox input styled as a FrameUI control. */
@Directive({
  selector: 'input[type=checkbox][frCheckbox]',
  host: {
    class: 'frame-checkbox',
    '[attr.aria-checked]': 'indeterminate() ? "mixed" : null',
    '[attr.data-indeterminate]': 'indeterminate() ? "" : null',
    '[indeterminate]': 'indeterminate()',
  },
})
export class FrCheckbox {
  readonly indeterminate = input(false, { transform: booleanAttribute });
}

/** Field slot for checkbox. */
@Directive({
  selector: 'label[frCheckboxField]',
  host: {
    class: 'frame-checkbox-field',
  },
})
export class FrCheckboxField {}

/** Label slot for checkbox. */
@Directive({
  selector: '[frCheckboxLabel]',
  host: {
    class: 'frame-checkbox-label',
  },
})
export class FrCheckboxLabel {}

