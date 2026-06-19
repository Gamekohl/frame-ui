import { CdkMenuGroup, CdkMenuItem, CdkMenuItemCheckbox, CdkMenuItemRadio } from '@angular/cdk/menu';
import { Directive, DoCheck, booleanAttribute, inject, input } from '@angular/core';

import { FrDropdownMenuItemVariant } from './dropdown-menu.types';

/** Item slot for dropdown menu. */
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

/** Item slot for dropdown menu checkbox. */
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
export class FrDropdownMenuCheckboxItem implements DoCheck {
  protected readonly checkboxItem = inject(CdkMenuItemCheckbox);
  private lastChecked = false;

  readonly checked = input(false, {
    alias: 'checked',
    transform: booleanAttribute,
  });
  readonly inset = input(false, { transform: booleanAttribute });
  readonly variant = input<FrDropdownMenuItemVariant>('default');

  ngDoCheck(): void {
    const checked = this.checked();

    if (checked === this.lastChecked) {
      return;
    }

    this.lastChecked = checked;
    this.checkboxItem.checked = checked;
  }
}

/** Group slot for dropdown menu radio. */
@Directive({
  selector: '[frDropdownMenuRadioGroup]',
  hostDirectives: [CdkMenuGroup],
  host: {
    class: 'frame-dropdown-menu__radio-group',
  },
})
export class FrDropdownMenuRadioGroup {}

/** Item slot for dropdown menu radio. */
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
export class FrDropdownMenuRadioItem implements DoCheck {
  protected readonly radioItem = inject(CdkMenuItemRadio);
  private lastChecked = false;

  readonly checked = input(false, {
    alias: 'checked',
    transform: booleanAttribute,
  });
  readonly inset = input(false, { transform: booleanAttribute });
  readonly variant = input<FrDropdownMenuItemVariant>('default');

  ngDoCheck(): void {
    const checked = this.checked();

    if (checked === this.lastChecked) {
      return;
    }

    this.lastChecked = checked;
    this.radioItem.checked = checked;
  }
}

/** Label slot for dropdown menu. */
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

/** Separator slot for dropdown menu. */
@Directive({
  selector: '[frDropdownMenuSeparator]',
  host: {
    class: 'frame-dropdown-menu__separator',
    role: 'separator',
  },
})
export class FrDropdownMenuSeparator {}

/** Shortcut slot for dropdown menu. */
@Directive({
  selector: '[frDropdownMenuShortcut]',
  host: {
    class: 'frame-dropdown-menu__shortcut',
  },
})
export class FrDropdownMenuShortcut {}

/** Indicator slot for dropdown menu item. */
@Directive({
  selector: '[frDropdownMenuItemIndicator]',
  host: {
    class: 'frame-dropdown-menu__indicator',
    'aria-hidden': 'true',
  },
})
export class FrDropdownMenuItemIndicator {}
