import { CdkMenu, CdkTargetMenuAim } from '@angular/cdk/menu';
import { ConnectedPosition } from '@angular/cdk/overlay';
import {
  Directive,
  InjectionToken,
  TemplateRef,
  booleanAttribute,
  inject,
  input,
} from '@angular/core';

import { buildConnectedPositions } from './dropdown-menu.position';
import { FR_DROPDOWN_MENU_PARENT, FrDropdownMenuTree } from './dropdown-menu.root';
import { FrDropdownMenuAlignment, FrDropdownMenuSide } from './dropdown-menu.types';

export const FR_DROPDOWN_MENU_CONTENT = new InjectionToken<FrDropdownMenuContent>(
  'FrDropdownMenuContent',
);

/** Content slot for dropdown menu. */
@Directive({
  selector: 'ng-template[frDropdownMenuContent], ng-template[frDropdownMenuSubContent]',
  exportAs: 'frDropdownMenuContent',
  providers: [
    {
      provide: FR_DROPDOWN_MENU_CONTENT,
      useExisting: FrDropdownMenuContent,
    },
  ],
})
export class FrDropdownMenuContent {
  readonly templateRef = inject(TemplateRef<unknown>);

  readonly align = input<FrDropdownMenuAlignment>('start');
  readonly alignOffset = input(0);
  readonly debugVisible = input(false, { transform: booleanAttribute });
  readonly side = input<FrDropdownMenuSide>('auto');
  readonly sideOffset = input(4);

  isDebugVisible(): boolean {
    return this.debugVisible();
  }

  getPositions(isSubmenu: boolean): ConnectedPosition[] {
    return buildConnectedPositions({
      align: this.align(),
      alignOffset: this.alignOffset(),
      isSubmenu,
      side: this.side(),
      sideOffset: this.sideOffset(),
    });
  }
}

/** Panel slot for dropdown menu. */
@Directive({
  selector: '[frDropdownMenuPanel]',
  hostDirectives: [CdkMenu, CdkTargetMenuAim],
  host: {
    class: 'frame-dropdown-menu__content',
    '[attr.data-side]': 'side()',
    tabindex: '-1',
    '(mouseenter)': 'handleMouseEnter()',
    '(mouseleave)': 'handleMouseLeave()'
  },
})
export class FrDropdownMenuPanel {
  protected readonly side = inject(FR_DROPDOWN_MENU_CONTENT).side;
  private readonly tree = inject(FrDropdownMenuTree);
  private readonly parent = inject(FR_DROPDOWN_MENU_PARENT);

  protected handleMouseEnter(): void {
    this.tree.enterInteractiveArea();
  }

  protected handleMouseLeave(): void {
    this.tree.leaveInteractiveArea(this.parent.closeDelay());
  }
}
