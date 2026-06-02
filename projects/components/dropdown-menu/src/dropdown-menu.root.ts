import { Directive, Injectable, InjectionToken, effect, inject, input, signal } from '@angular/core';

import { FrDropdownMenuTriggerMode } from './dropdown-menu.types';

export interface FrDropdownMenuParent {
  readonly closeDelay: () => number;
  readonly triggerMode: () => FrDropdownMenuTriggerMode;
}

export const FR_DROPDOWN_MENU_PARENT = new InjectionToken<FrDropdownMenuParent>(
  'FrDropdownMenuParent',
);

@Injectable()
export class FrDropdownMenuTree {
  private readonly triggers = new Set<{ close(): void }>();
  private closeTimeoutId: ReturnType<typeof setTimeout> | null = null;
  private pointerInsideCount = 0;

  register(trigger: { close(): void }): void {
    this.triggers.add(trigger);
  }

  unregister(trigger: { close(): void }): void {
    this.triggers.delete(trigger);
  }

  cancelClose(): void {
    if (this.closeTimeoutId !== null) {
      clearTimeout(this.closeTimeoutId);
      this.closeTimeoutId = null;
    }
  }

  enterInteractiveArea(): void {
    this.pointerInsideCount += 1;
    this.cancelClose();
  }

  leaveInteractiveArea(delay: number): void {
    this.pointerInsideCount = Math.max(0, this.pointerInsideCount - 1);

    if (this.pointerInsideCount === 0) {
      this.scheduleClose(delay);
    }
  }

  scheduleClose(delay: number): void {
    this.cancelClose();
    this.closeTimeoutId = setTimeout(() => {
      this.closeAll();
    }, delay);
  }

  closeAll(): void {
    this.cancelClose();

    for (const trigger of this.triggers) {
      trigger.close();
    }
  }
}

@Directive({
  selector: '[frDropdownMenu]',
  providers: [
    FrDropdownMenuTree,
    {
      provide: FR_DROPDOWN_MENU_PARENT,
      useExisting: FrDropdownMenu,
    },
  ],
  host: {
    class: 'frame-dropdown-menu-root',
  },
})
export class FrDropdownMenu implements FrDropdownMenuParent {
  readonly closeDelay = input(140);
  readonly triggerMode = input<FrDropdownMenuTriggerMode>('click');
}

@Directive({
  selector: '[frDropdownMenuSub]',
  providers: [
    {
      provide: FR_DROPDOWN_MENU_PARENT,
      useExisting: FrDropdownMenuSub,
    },
  ],
  host: {
    class: 'frame-dropdown-menu-sub',
  },
})
export class FrDropdownMenuSub implements FrDropdownMenuParent {
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
