import { Directive, effect, inject, input, signal } from '@angular/core';

import { FrDropdownMenuTriggerMode } from '@frame-ui/components/dropdown-menu';
import {
  FR_DROPDOWN_MENU_PARENT,
  FrDropdownMenuParent,
  FrDropdownMenuTree,
} from '@frame-ui/components/dropdown-menu';

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

  readonly closeDelay = signal(this.parent.closeDelay());
  readonly triggerMode = signal(this.parent.triggerMode());

  constructor() {
    effect(() => {
      this.closeDelay.set(this.closeDelayInput() ?? this.parent.closeDelay());
      this.triggerMode.set(this.triggerModeInput() ?? this.parent.triggerMode());
    });
  }
}

