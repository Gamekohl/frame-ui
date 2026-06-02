import { Directive, ElementRef, booleanAttribute, effect, inject, input } from '@angular/core';

@Directive({
  selector: 'input[type=checkbox][frCheckbox]',
  host: {
    class: 'frame-checkbox',
    '[attr.aria-checked]': 'indeterminate() ? "mixed" : null',
    '[attr.data-indeterminate]': 'indeterminate() ? "" : null',
  },
})
export class FrCheckbox {
  private readonly elementRef = inject(ElementRef<HTMLInputElement>);

  readonly indeterminate = input(false, { transform: booleanAttribute });

  constructor() {
    effect(() => {
      this.elementRef.nativeElement.indeterminate = this.indeterminate();
    });
  }
}

@Directive({
  selector: 'label[frCheckboxField]',
  host: {
    class: 'frame-checkbox-field',
  },
})
export class FrCheckboxField {}

@Directive({
  selector: '[frCheckboxLabel]',
  host: {
    class: 'frame-checkbox-label',
  },
})
export class FrCheckboxLabel {}
