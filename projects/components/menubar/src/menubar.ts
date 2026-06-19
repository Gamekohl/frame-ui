import { Directive, InjectionToken, input } from '@angular/core';

import {
  FR_DROPDOWN_MENU_PARENT,
  FR_DROPDOWN_MENU_CONTENT,
  FrDropdownMenuCheckboxItem,
  FrDropdownMenuContent,
  FrDropdownMenuItem,
  FrDropdownMenuItemIndicator,
  FrDropdownMenuLabel,
  FrDropdownMenuPanel,
  FrDropdownMenuRadioGroup,
  FrDropdownMenuRadioItem,
  FrDropdownMenuSeparator,
  FrDropdownMenuShortcut,
  FrDropdownMenuSub,
  FrDropdownMenuSubTrigger,
  FrDropdownMenuTree,
  FrDropdownMenuTrigger,
} from '@frame-ui-ng/components/dropdown-menu';
import { FrDropdownMenuParent } from '@frame-ui-ng/components/dropdown-menu';
import { FrDropdownMenuTriggerMode } from '@frame-ui-ng/components/dropdown-menu';

export const FR_MENUBAR_PARENT = new InjectionToken<FrMenuBar>('FrMenuBarParent');

/** Menubar root for top-level menu interactions. */
@Directive({
  selector: '[frMenuBar], frame-menubar',
  providers: [
    FrDropdownMenuTree,
    {
      provide: FR_DROPDOWN_MENU_PARENT,
      useExisting: FrMenuBar,
    },
    {
      provide: FR_MENUBAR_PARENT,
      useExisting: FrMenuBar,
    },
  ],
  host: {
    class: 'frame-menubar',
    role: 'menubar',
  },
})
export class FrMenuBar implements FrDropdownMenuParent {
  readonly closeDelay = input(140);
  readonly triggerMode = input<FrDropdownMenuTriggerMode>('both');
}

/** Top-level menu scope inside a menubar. */
@Directive({
  selector: '[frMenuBarMenu], frame-menubar-menu',
  host: {
    class: 'frame-menubar__menu',
    role: 'none',
  },
})
export class FrMenuBarMenu {}

/** Trigger control for menu bar. */
@Directive({
  selector: '[frMenuBarTrigger]',
  hostDirectives: [
    {
      directive: FrDropdownMenuTrigger,
      inputs: ['frDropdownMenuTrigger: frMenuBarTrigger', 'triggerMode'],
    },
  ],
  host: {
    class: 'frame-menubar__trigger',
    role: 'menuitem',
  },
})
export class FrMenuBarTrigger {}

/** Content slot for menu bar. */
@Directive({
  selector: 'ng-template[frMenuBarContent], ng-template[frMenuBarSubContent]',
  exportAs: 'frMenuBarContent',
  providers: [
    {
      provide: FrDropdownMenuContent,
      useExisting: FrMenuBarContent,
    },
    {
      provide: FR_DROPDOWN_MENU_CONTENT,
      useExisting: FrMenuBarContent,
    },
  ],
})
export class FrMenuBarContent extends FrDropdownMenuContent {}

/** Panel slot for menu bar. */
@Directive({
  selector: '[frMenuBarPanel]',
  hostDirectives: [FrDropdownMenuPanel],
  host: {
    class: 'frame-menubar__content',
  },
})
export class FrMenuBarPanel {}

/** Item slot for menu bar. */
@Directive({
  selector: '[frMenuBarItem]',
  hostDirectives: [
    {
      directive: FrDropdownMenuItem,
      inputs: ['inset', 'variant'],
    },
  ],
  host: {
    class: 'frame-menubar__item',
  },
})
export class FrMenuBarItem {}

/** Item slot for menu bar checkbox. */
@Directive({
  selector: 'button[frMenuBarCheckboxItem]',
  hostDirectives: [
    {
      directive: FrDropdownMenuCheckboxItem,
      inputs: ['checked', 'inset', 'variant'],
    },
  ],
  host: {
    class: 'frame-menubar__checkbox-item',
  },
})
export class FrMenuBarCheckboxItem {}

/** Group slot for menu bar radio. */
@Directive({
  selector: '[frMenuBarRadioGroup]',
  hostDirectives: [FrDropdownMenuRadioGroup],
  host: {
    class: 'frame-menubar__radio-group',
  },
})
export class FrMenuBarRadioGroup {}

/** Item slot for menu bar radio. */
@Directive({
  selector: 'button[frMenuBarRadioItem]',
  hostDirectives: [
    {
      directive: FrDropdownMenuRadioItem,
      inputs: ['checked', 'inset', 'variant'],
    },
  ],
  host: {
    class: 'frame-menubar__radio-item',
  },
})
export class FrMenuBarRadioItem {}

/** Label slot for menu bar. */
@Directive({
  selector: '[frMenuBarLabel]',
  hostDirectives: [
    {
      directive: FrDropdownMenuLabel,
      inputs: ['inset'],
    },
  ],
  host: {
    class: 'frame-menubar__label',
  },
})
export class FrMenuBarLabel {}

/** Separator slot for menu bar. */
@Directive({
  selector: '[frMenuBarSeparator]',
  hostDirectives: [FrDropdownMenuSeparator],
  host: {
    class: 'frame-menubar__separator',
  },
})
export class FrMenuBarSeparator {}

/** Shortcut slot for menu bar. */
@Directive({
  selector: '[frMenuBarShortcut]',
  hostDirectives: [FrDropdownMenuShortcut],
  host: {
    class: 'frame-menubar__shortcut',
  },
})
export class FrMenuBarShortcut {}

/** Indicator slot for menu bar item. */
@Directive({
  selector: '[frMenuBarItemIndicator]',
  hostDirectives: [FrDropdownMenuItemIndicator],
  host: {
    class: 'frame-menubar__indicator',
  },
})
export class FrMenuBarItemIndicator {}

/** Nested submenu scope inside a menubar. */
@Directive({
  selector: '[frMenuBarSub]',
  hostDirectives: [
    {
      directive: FrDropdownMenuSub,
      inputs: ['closeDelay', 'triggerMode'],
    },
  ],
  host: {
    class: 'frame-menubar__sub',
  },
})
export class FrMenuBarSub {}

/** Trigger control for menu bar sub. */
@Directive({
  selector: '[frMenuBarSubTrigger]',
  hostDirectives: [
    {
      directive: FrDropdownMenuSubTrigger,
      inputs: ['frDropdownMenuSubTrigger: frMenuBarSubTrigger', 'inset', 'triggerMode', 'variant'],
    },
  ],
  host: {
    class: 'frame-menubar__sub-trigger',
  },
})
export class FrMenuBarSubTrigger {}


