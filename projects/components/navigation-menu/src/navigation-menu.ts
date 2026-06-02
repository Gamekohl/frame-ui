import { Directive, InjectionToken, booleanAttribute, input } from '@angular/core';

import {
  FR_DROPDOWN_MENU_CONTENT,
  FR_DROPDOWN_MENU_PARENT,
  FrDropdownMenuContent,
  FrDropdownMenuPanel,
  FrDropdownMenuTree,
  FrDropdownMenuTrigger,
} from '@frame-ui/components/dropdown-menu';
import { FrDropdownMenuParent } from '@frame-ui/components/dropdown-menu';
import { FrDropdownMenuTriggerMode } from '@frame-ui/components/dropdown-menu';

export const FR_NAVIGATION_MENU_PARENT = new InjectionToken<FrNavigationMenu>(
  'FrNavigationMenuParent',
);

@Directive({
  selector: '[frNavigationMenu], frame-navigation-menu',
  providers: [
    FrDropdownMenuTree,
    {
      provide: FR_DROPDOWN_MENU_PARENT,
      useExisting: FrNavigationMenu,
    },
    {
      provide: FR_NAVIGATION_MENU_PARENT,
      useExisting: FrNavigationMenu,
    },
  ],
  host: {
    class: 'frame-navigation-menu',
    role: 'navigation',
  },
})
export class FrNavigationMenu implements FrDropdownMenuParent {
  readonly closeDelay = input(140);
  readonly triggerMode = input<FrDropdownMenuTriggerMode>('both');
}

@Directive({
  selector: '[frNavigationMenuList], frame-navigation-menu-list',
  host: {
    class: 'frame-navigation-menu__list',
    role: 'list',
  },
})
export class FrNavigationMenuList {}

@Directive({
  selector: '[frNavigationMenuItem], frame-navigation-menu-item',
  host: {
    class: 'frame-navigation-menu__item',
    role: 'listitem',
  },
})
export class FrNavigationMenuItem {}

@Directive({
  selector: '[frNavigationMenuTrigger]',
  hostDirectives: [
    {
      directive: FrDropdownMenuTrigger,
      inputs: ['frDropdownMenuTrigger: frNavigationMenuTrigger', 'triggerMode'],
    },
  ],
  host: {
    class: 'frame-navigation-menu__trigger',
    type: 'button',
  },
})
export class FrNavigationMenuTrigger {}

@Directive({
  selector: 'ng-template[frNavigationMenuContent]',
  exportAs: 'frNavigationMenuContent',
  providers: [
    {
      provide: FrDropdownMenuContent,
      useExisting: FrNavigationMenuContent,
    },
    {
      provide: FR_DROPDOWN_MENU_CONTENT,
      useExisting: FrNavigationMenuContent,
    },
  ],
})
export class FrNavigationMenuContent extends FrDropdownMenuContent {}

@Directive({
  selector: '[frNavigationMenuPanel]',
  hostDirectives: [FrDropdownMenuPanel],
  host: {
    class: 'frame-navigation-menu__content',
  },
})
export class FrNavigationMenuPanel {}

@Directive({
  selector: '[frNavigationMenuLink], a[frNavigationMenuLink]',
  host: {
    class: 'frame-navigation-menu__link',
    '[attr.data-active]': 'active() ? "" : null',
  },
})
export class FrNavigationMenuLink {
  readonly active = input(false, { transform: booleanAttribute });
}

@Directive({
  selector: '[frNavigationMenuGrid]',
  host: {
    class: 'frame-navigation-menu__grid',
    '[attr.data-columns]': 'columns()',
  },
})
export class FrNavigationMenuGrid {
  readonly columns = input<1 | 2 | 3>(1);
}

@Directive({
  selector: '[frNavigationMenuFeature]',
  host: {
    class: 'frame-navigation-menu__feature',
  },
})
export class FrNavigationMenuFeature {}

@Directive({
  selector: '[frNavigationMenuLinkTitle]',
  host: {
    class: 'frame-navigation-menu__link-title',
  },
})
export class FrNavigationMenuLinkTitle {}

@Directive({
  selector: '[frNavigationMenuLinkDescription]',
  host: {
    class: 'frame-navigation-menu__link-description',
  },
})
export class FrNavigationMenuLinkDescription {}

@Directive({
  selector: '[frNavigationLinkSeparator]',
  host: {
    class: 'frame-navigation-menu__link-separator',
    role: 'separator',
    'aria-hidden': 'true',
  },
})
export class FrNavigationLinkSeparator {}

@Directive({
  selector: '[frNavigationMenuIndicator], frame-navigation-menu-indicator',
  host: {
    class: 'frame-navigation-menu__indicator',
    'aria-hidden': 'true',
  },
})
export class FrNavigationMenuIndicator {}

@Directive({
  selector: '[frNavigationMenuViewport], frame-navigation-menu-viewport',
  host: {
    class: 'frame-navigation-menu__viewport',
  },
})
export class FrNavigationMenuViewport {}

