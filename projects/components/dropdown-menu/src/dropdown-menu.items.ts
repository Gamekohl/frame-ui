import { CdkMenuGroup, CdkMenuItem, CdkMenuItemCheckbox, CdkMenuItemRadio } from '@angular/cdk/menu';
import { Directive, booleanAttribute, effect, inject, input } from '@angular/core';

import { FrDropdownMenuItemVariant } from './dropdown-menu.types';

@Directive({
  selector: '[frDropdownMenuItem]',
  hostDirectives: [CdkMenuItem],
  host: {
    class: 'frame-dropdown-menu__item',
    '[attr.data-inset]': 'inset() ? "" : null',
    '[attr.data-variant]': 'variant()',
  },
})
export class FrDropdownMenuItem {
  readonly inset = input(false, { transform: booleanAttribute });
  readonly variant = input<FrDropdownMenuItemVariant>('default');
}

@Directive({
  selector: 'button[frDropdownMenuCheckboxItem]',
  hostDirectives: [CdkMenuItemCheckbox],
  host: {
    class: 'frame-dropdown-menu__item frame-dropdown-menu__checkbox-item',
    '[attr.data-checked]': 'checkboxItem.checked ? "" : null',
    '[attr.data-inset]': 'inset() ? "" : null',
    '[attr.data-variant]': 'variant()',
  },
})
export class FrDropdownMenuCheckboxItem {
  protected readonly checkboxItem = inject(CdkMenuItemCheckbox);

  readonly checked = input(false, {
    alias: 'checked',
    transform: booleanAttribute,
  });
  readonly inset = input(false, { transform: booleanAttribute });
  readonly variant = input<FrDropdownMenuItemVariant>('default');

  constructor() {
    effect(() => {
      this.checkboxItem.checked = this.checked();
    });
  }
}

@Directive({
  selector: '[frDropdownMenuRadioGroup]',
  hostDirectives: [CdkMenuGroup],
  host: {
    class: 'frame-dropdown-menu__radio-group',
  },
})
export class FrDropdownMenuRadioGroup {}

@Directive({
  selector: 'button[frDropdownMenuRadioItem]',
  hostDirectives: [CdkMenuItemRadio],
  host: {
    class: 'frame-dropdown-menu__item frame-dropdown-menu__radio-item',
    '[attr.data-checked]': 'radioItem.checked ? "" : null',
    '[attr.data-inset]': 'inset() ? "" : null',
    '[attr.data-variant]': 'variant()',
  },
})
export class FrDropdownMenuRadioItem {
  protected readonly radioItem = inject(CdkMenuItemRadio);

  readonly checked = input(false, {
    alias: 'checked',
    transform: booleanAttribute,
  });
  readonly inset = input(false, { transform: booleanAttribute });
  readonly variant = input<FrDropdownMenuItemVariant>('default');

  constructor() {
    effect(() => {
      this.radioItem.checked = this.checked();
    });
  }
}

@Directive({
  selector: '[frDropdownMenuLabel]',
  host: {
    class: 'frame-dropdown-menu__label',
    '[attr.data-inset]': 'inset() ? "" : null',
  },
})
export class FrDropdownMenuLabel {
  readonly inset = input(false, { transform: booleanAttribute });
}

@Directive({
  selector: '[frDropdownMenuSeparator]',
  host: {
    class: 'frame-dropdown-menu__separator',
    role: 'separator',
  },
})
export class FrDropdownMenuSeparator {}

@Directive({
  selector: '[frDropdownMenuShortcut]',
  host: {
    class: 'frame-dropdown-menu__shortcut',
  },
})
export class FrDropdownMenuShortcut {}

@Directive({
  selector: '[frDropdownMenuItemIndicator]',
  host: {
    class: 'frame-dropdown-menu__indicator',
    'aria-hidden': 'true',
  },
})
export class FrDropdownMenuItemIndicator {}
