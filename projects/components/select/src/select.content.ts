import { DestroyRef, Directive, EmbeddedViewRef, ViewContainerRef, inject, input, signal } from '@angular/core';

import {
  FR_DROPDOWN_MENU_CONTENT,
  FrDropdownMenuContent,
  FrDropdownMenuPanel,
} from '@frame-ui/components/dropdown-menu';
import { buildConnectedPositions } from '@frame-ui/components/dropdown-menu';
import { FR_DROPDOWN_MENU_PARENT, FrDropdownMenuTree } from '@frame-ui/components/dropdown-menu';
import { FrSelect } from './select.root';

export const FR_SELECT_POSITIONS = ['item-aligned', 'popper'] as const;
export type FrSelectPosition = (typeof FR_SELECT_POSITIONS)[number];

@Directive({
  selector: 'ng-template[frSelectContent]',
  exportAs: 'frSelectContent',
  providers: [
    {
      provide: FR_DROPDOWN_MENU_CONTENT,
      useExisting: FrSelectContent,
    },
    FrDropdownMenuTree,
    {
      provide: FR_DROPDOWN_MENU_PARENT,
      useValue: {
        closeDelay: () => 0,
        triggerMode: () => 'click',
      },
    },
  ],
})
export class FrSelectContent extends FrDropdownMenuContent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly debugVisibleOverride = signal<boolean | null>(null);
  private readonly triggerWidth = signal<number | null>(null);
  private registrationView: EmbeddedViewRef<unknown> | null = null;

  readonly position = input<FrSelectPosition>('item-aligned');

  select: FrSelect | null = null;

  constructor() {
    super();

    this.destroyRef.onDestroy(() => {
      this.registrationView?.destroy();
    });
  }

  setDebugVisibleOverride(value: boolean | null): void {
    this.debugVisibleOverride.set(value);
  }

  override isDebugVisible(): boolean {
    return this.debugVisibleOverride() ?? this.debugVisible();
  }

  setTriggerWidth(value: number | null): void {
    this.triggerWidth.set(value);
  }

  ensureItemsRegistered(): void {
    if (this.registrationView) {
      return;
    }

    this.registrationView = this.viewContainerRef.createEmbeddedView(this.templateRef);
    this.registrationView.detectChanges();

    const index = this.viewContainerRef.indexOf(this.registrationView);

    if (index >= 0) {
      this.viewContainerRef.detach(index);
    }
  }

  panelMinWidth(): number | null {
    if (this.position() !== 'item-aligned') {
      return null;
    }

    return this.triggerWidth();
  }

  override getPositions(isSubmenu: boolean) {
    if (this.position() === 'item-aligned') {
      return buildConnectedPositions({
        align: this.align(),
        alignOffset: 0,
        isSubmenu,
        side: this.side(),
        sideOffset: 4,
      });
    }

    return super.getPositions(isSubmenu);
  }
}

@Directive({
  selector: '[frSelectPanel], frame-select-panel',
  hostDirectives: [FrDropdownMenuPanel],
  host: {
    class: 'frame-select__content',
    '[attr.data-position]': 'content.position()',
    '[style.min-width.px]': 'content.panelMinWidth()',
  },
})
export class FrSelectPanel {
  protected readonly content = inject(FrSelectContent);
}

