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

import { buildConnectedPositions } from '@frame-ui/components/dropdown-menu';
import {
  FR_DROPDOWN_MENU_CONTENT,
  FrDropdownMenuContent,
} from '@frame-ui/components/dropdown-menu';
import {
  FR_DROPDOWN_MENU_PARENT,
  FrDropdownMenuTree,
} from '@frame-ui/components/dropdown-menu';
import {
  FrDropdownMenuAlignment,
  FrDropdownMenuSide,
} from '@frame-ui/components/dropdown-menu';

export const FR_CONTEXT_MENU_CONTENT = new InjectionToken<FrContextMenuContent>(
  'FrContextMenuContent',
);

@Directive({
  selector: 'ng-template[frContextMenuContent], ng-template[frContextMenuSubContent]',
  exportAs: 'frContextMenuContent',
  providers: [
    {
      provide: FR_CONTEXT_MENU_CONTENT,
      useExisting: FrContextMenuContent,
    },
    {
      provide: FR_DROPDOWN_MENU_CONTENT,
      useExisting: FrContextMenuContent,
    },
  ],
})
export class FrContextMenuContent implements Partial<FrDropdownMenuContent> {
  readonly templateRef = inject(TemplateRef<unknown>);

  readonly align = input<FrDropdownMenuAlignment>('start');
  readonly alignOffset = input(0);
  readonly debugVisible = input(false, { transform: booleanAttribute });
  readonly side = input<FrDropdownMenuSide>('right');
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

@Directive({
  selector: '[frContextMenuPanel]',
  hostDirectives: [CdkMenu, CdkTargetMenuAim],
  host: {
    class: 'frame-context-menu__content frame-dropdown-menu__content',
    '[attr.data-side]': 'side()',
    tabindex: '-1',
    '(mouseenter)': 'handleMouseEnter()',
    '(mouseleave)': 'handleMouseLeave()',
  },
})
export class FrContextMenuPanel {
  protected readonly side = inject(FR_CONTEXT_MENU_CONTENT).side;
  private readonly tree = inject(FrDropdownMenuTree);
  private readonly parent = inject(FR_DROPDOWN_MENU_PARENT);

  protected handleMouseEnter(): void {
    this.tree.enterInteractiveArea();
  }

  protected handleMouseLeave(): void {
    this.tree.leaveInteractiveArea(this.parent.closeDelay());
  }
}

