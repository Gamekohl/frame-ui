import { Directive, computed, inject, input } from '@angular/core';

import { FrDropdownMenuTriggerMode } from '@frame-ui-ng/components/dropdown-menu';
import {
  FR_DROPDOWN_MENU_PARENT,
  FrDropdownMenuParent,
  FrDropdownMenuTree,
} from '@frame-ui-ng/components/dropdown-menu';

/** Root controller for context menu interactions. */
@Directive({
  selector: '[frContextMenu]',
  providers: [
    FrDropdownMenuTree,
    {
      provide: FR_DROPDOWN_MENU_PARENT,
      useExisting: FrContextMenu,
    },
  ],
  host: {
    class: 'frame-context-menu-root',
  },
})
export class FrContextMenu implements FrDropdownMenuParent {
  readonly closeDelay = input(140);
  readonly triggerMode = input<FrDropdownMenuTriggerMode>('both');
}

/** Nested submenu controller for context menu. */
@Directive({
  selector: '[frContextMenuSub]',
  providers: [
    {
      provide: FR_DROPDOWN_MENU_PARENT,
      useExisting: FrContextMenuSub,
    },
  ],
  host: {
    class: 'frame-context-menu-sub frame-dropdown-menu-sub',
  },
})
export class FrContextMenuSub implements FrDropdownMenuParent {
  private readonly parent = inject(FR_DROPDOWN_MENU_PARENT, { skipSelf: true });

  readonly closeDelayInput = input<number | null>(null, { alias: 'closeDelay' });
  readonly triggerModeInput = input<FrDropdownMenuTriggerMode | null>(null, {
    alias: 'triggerMode',
  });

  readonly closeDelay = computed(() => this.closeDelayInput() ?? this.parent.closeDelay());
  readonly triggerMode = computed(() => this.triggerModeInput() ?? this.parent.triggerMode());
}


