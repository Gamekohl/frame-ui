import { CdkMenuGroup, CdkMenuItem, CdkMenuItemCheckbox, CdkMenuItemRadio } from '@angular/cdk/menu';
import { Directive, DoCheck, booleanAttribute, inject, input } from '@angular/core';

import { FrDropdownMenuItemVariant } from '@frame-ui-ng/components/dropdown-menu';

/** Item slot for context menu. */
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

/** Item slot for context menu checkbox. */
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
export class FrContextMenuCheckboxItem implements DoCheck {
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

/** Group slot for context menu radio. */
@Directive({
  selector: '[frContextMenuRadioGroup]',
  hostDirectives: [CdkMenuGroup],
  host: {
    class: 'frame-context-menu__radio-group frame-dropdown-menu__radio-group',
  },
})
export class FrContextMenuRadioGroup {}

/** Item slot for context menu radio. */
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
export class FrContextMenuRadioItem implements DoCheck {
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

/** Label slot for context menu. */
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

/** Separator slot for context menu. */
@Directive({
  selector: '[frContextMenuSeparator]',
  host: {
    class: 'frame-context-menu__separator frame-dropdown-menu__separator',
    role: 'separator',
  },
})
export class FrContextMenuSeparator {}

/** Shortcut slot for context menu. */
@Directive({
  selector: '[frContextMenuShortcut]',
  host: {
    class: 'frame-context-menu__shortcut frame-dropdown-menu__shortcut',
  },
})
export class FrContextMenuShortcut {}

/** Indicator slot for context menu item. */
@Directive({
  selector: '[frContextMenuItemIndicator]',
  host: {
    class: 'frame-context-menu__indicator frame-dropdown-menu__indicator',
    'aria-hidden': 'true',
  },
})
export class FrContextMenuItemIndicator {}

