import { CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';
import { ConnectedPosition } from '@angular/cdk/overlay';
import {
  DestroyRef,
  Directive,
  InputSignal,
  OnDestroy,
  booleanAttribute,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { FrContextMenuContent } from './context-menu.content';
import { defaultPositions } from '@frame-ui/components/dropdown-menu';
import {
  FR_DROPDOWN_MENU_PARENT,
  FrDropdownMenuTree,
} from '@frame-ui/components/dropdown-menu';
import {
  FrDropdownMenuItemVariant,
  FrDropdownMenuTriggerMode,
} from '@frame-ui/components/dropdown-menu';

@Directive({
  selector: '[frContextMenuSubTrigger]',
  hostDirectives: [CdkMenuItem, CdkMenuTrigger],
  host: {
    class: 'frame-context-menu__item frame-context-menu__sub-trigger frame-dropdown-menu__item frame-dropdown-menu__sub-trigger',
    '[attr.data-inset]': 'inset() ? "" : null',
    '[attr.data-state]': 'isOpen() ? "open" : "closed"',
    '[attr.data-variant]': 'variant()',
    '(mouseenter)': 'handleMouseEnter()',
    '(mouseleave)': 'handleMouseLeave()',
  },
})
export class FrContextMenuSubTrigger implements OnDestroy {
  private readonly cdkMenuTrigger = inject(CdkMenuTrigger);
  private readonly destroyRef = inject(DestroyRef);
  private readonly tree = inject(FrDropdownMenuTree);
  private readonly parent = inject(FR_DROPDOWN_MENU_PARENT);

  readonly menuContent: InputSignal<FrContextMenuContent | null> = input<FrContextMenuContent | null>(null, {
    alias: 'frContextMenuSubTrigger',
  });
  readonly inset = input(false, { transform: booleanAttribute });
  readonly triggerModeInput = input<FrDropdownMenuTriggerMode | null>(null, {
    alias: 'triggerMode',
  });
  readonly variant = input<FrDropdownMenuItemVariant>('default');
  readonly isOpen = signal(false);

  constructor() {
    this.tree.register(this);

    effect(() => {
      const content = this.menuContent();

      this.cdkMenuTrigger.menuTemplateRef = content?.templateRef ?? null;
      this.cdkMenuTrigger.menuPosition = this.resolvePositions();

      if (content?.isDebugVisible() && !this.cdkMenuTrigger.isOpen()) {
        queueMicrotask(() => {
          if (!this.cdkMenuTrigger.isOpen()) {
            this.cdkMenuTrigger.open();
          }
        });
      }
    });

    this.cdkMenuTrigger.opened.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.tree.cancelClose();
      this.isOpen.set(true);
    });

    this.cdkMenuTrigger.closed.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      if (this.menuContent()?.isDebugVisible()) {
        queueMicrotask(() => {
          if (!this.cdkMenuTrigger.isOpen()) {
            this.cdkMenuTrigger.open();
          }
        });
        return;
      }

      this.isOpen.set(false);
    });
  }

  close(): void {
    if (this.menuContent()?.isDebugVisible()) {
      return;
    }

    if (this.cdkMenuTrigger.isOpen()) {
      this.cdkMenuTrigger.close();
    }
  }

  ngOnDestroy(): void {
    this.tree.unregister(this);
  }

  protected handleMouseEnter(): void {
    this.tree.enterInteractiveArea();

    if (this.triggerMode === 'hover' || this.triggerMode === 'both') {
      this.tree.cancelClose();

      if (!this.cdkMenuTrigger.isOpen()) {
        this.cdkMenuTrigger.open();
      }
    }
  }

  protected handleMouseLeave(): void {
    if (this.menuContent()?.isDebugVisible()) {
      return;
    }

    if (this.triggerMode === 'hover' || this.triggerMode === 'both') {
      this.tree.leaveInteractiveArea(this.parent.closeDelay());
    }
  }

  private get triggerMode(): FrDropdownMenuTriggerMode {
    return this.triggerModeInput() ?? this.parent.triggerMode();
  }

  private resolvePositions(): ConnectedPosition[] {
    return this.menuContent()?.getPositions(true) ?? defaultPositions(true);
  }
}

