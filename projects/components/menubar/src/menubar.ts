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

@Directive({
  selector: '[frMenuBarMenu], frame-menubar-menu',
  host: {
    class: 'frame-menubar__menu',
    role: 'none',
  },
})
export class FrMenuBarMenu {}

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

@Directive({
  selector: '[frMenuBarPanel]',
  hostDirectives: [FrDropdownMenuPanel],
  host: {
    class: 'frame-menubar__content',
  },
})
export class FrMenuBarPanel {}

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

@Directive({
  selector: '[frMenuBarRadioGroup]',
  hostDirectives: [FrDropdownMenuRadioGroup],
  host: {
    class: 'frame-menubar__radio-group',
  },
})
export class FrMenuBarRadioGroup {}

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

@Directive({
  selector: '[frMenuBarSeparator]',
  hostDirectives: [FrDropdownMenuSeparator],
  host: {
    class: 'frame-menubar__separator',
  },
})
export class FrMenuBarSeparator {}

@Directive({
  selector: '[frMenuBarShortcut]',
  hostDirectives: [FrDropdownMenuShortcut],
  host: {
    class: 'frame-menubar__shortcut',
  },
})
export class FrMenuBarShortcut {}

@Directive({
  selector: '[frMenuBarItemIndicator]',
  hostDirectives: [FrDropdownMenuItemIndicator],
  host: {
    class: 'frame-menubar__indicator',
  },
})
export class FrMenuBarItemIndicator {}

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

