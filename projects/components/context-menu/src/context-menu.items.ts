import { CdkMenuGroup, CdkMenuItem, CdkMenuItemCheckbox, CdkMenuItemRadio } from '@angular/cdk/menu';
import { Directive, booleanAttribute, effect, inject, input } from '@angular/core';

import { FrDropdownMenuItemVariant } from '@frame-ui/components/dropdown-menu';

@Directive({
  selector: '[frContextMenuItem]',
  hostDirectives: [CdkMenuItem],
  host: {
    class: 'frame-context-menu__item frame-dropdown-menu__item',
    '[attr.data-inset]': 'inset() ? "" : null',
    '[attr.data-variant]': 'variant()',
  },
})
export class FrContextMenuItem {
  readonly inset = input(false, { transform: booleanAttribute });
  readonly variant = input<FrDropdownMenuItemVariant>('default');
}

@Directive({
  selector: 'button[frContextMenuCheckboxItem]',
  hostDirectives: [CdkMenuItemCheckbox],
  host: {
    class: 'frame-context-menu__item frame-context-menu__checkbox-item frame-dropdown-menu__item frame-dropdown-menu__checkbox-item',
    '[attr.data-checked]': 'checkboxItem.checked ? "" : null',
    '[attr.data-inset]': 'inset() ? "" : null',
    '[attr.data-variant]': 'variant()',
  },
})
export class FrContextMenuCheckboxItem {
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
  selector: '[frContextMenuRadioGroup]',
  hostDirectives: [CdkMenuGroup],
  host: {
    class: 'frame-context-menu__radio-group frame-dropdown-menu__radio-group',
  },
})
export class FrContextMenuRadioGroup {}

@Directive({
  selector: 'button[frContextMenuRadioItem]',
  hostDirectives: [CdkMenuItemRadio],
  host: {
    class: 'frame-context-menu__item frame-context-menu__radio-item frame-dropdown-menu__item frame-dropdown-menu__radio-item',
    '[attr.data-checked]': 'radioItem.checked ? "" : null',
    '[attr.data-inset]': 'inset() ? "" : null',
    '[attr.data-variant]': 'variant()',
  },
})
export class FrContextMenuRadioItem {
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
  selector: '[frContextMenuLabel]',
  host: {
    class: 'frame-context-menu__label frame-dropdown-menu__label',
    '[attr.data-inset]': 'inset() ? "" : null',
  },
})
export class FrContextMenuLabel {
  readonly inset = input(false, { transform: booleanAttribute });
}

@Directive({
  selector: '[frContextMenuSeparator]',
  host: {
    class: 'frame-context-menu__separator frame-dropdown-menu__separator',
    role: 'separator',
  },
})
export class FrContextMenuSeparator {}

@Directive({
  selector: '[frContextMenuShortcut]',
  host: {
    class: 'frame-context-menu__shortcut frame-dropdown-menu__shortcut',
  },
})
export class FrContextMenuShortcut {}

@Directive({
  selector: '[frContextMenuItemIndicator]',
  host: {
    class: 'frame-context-menu__indicator frame-dropdown-menu__indicator',
    'aria-hidden': 'true',
  },
})
export class FrContextMenuItemIndicator {}

