import { CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';
import { ConnectedPosition } from '@angular/cdk/overlay';
import {
  DestroyRef,
  Directive,
  ElementRef,
  InputSignal,
  booleanAttribute,
  effect,
  inject,
  input,
  signal,
  OnDestroy,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { FrDropdownMenuContent } from './dropdown-menu.content';
import { defaultPositions } from './dropdown-menu.position';
import { FR_DROPDOWN_MENU_PARENT, FrDropdownMenuTree } from './dropdown-menu.root';
import { FrDropdownMenuItemVariant, FrDropdownMenuTriggerMode } from './dropdown-menu.types';

@Directive({
  host: {
    '(mouseenter)': 'handleMouseEnter()',
    '(mouseleave)': 'handleMouseLeave()',
  },
})
abstract class FrDropdownMenuTriggerBase implements OnDestroy {
  private static readonly CUSTOM_PROPERTY_PREFIX = '--frame-dropdown-menu-';

  protected readonly cdkMenuTrigger = inject(CdkMenuTrigger);
  private readonly destroyRef = inject(DestroyRef);
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly tree = inject(FrDropdownMenuTree);
  private readonly parent = inject(FR_DROPDOWN_MENU_PARENT);
  protected readonly isOpen = signal(false);

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
      queueMicrotask(() => {
        this.syncCustomPropertiesToOverlay();
      });
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

  protected abstract readonly menuContent: () => FrDropdownMenuContent | null;
  protected abstract readonly isSubmenuTrigger: boolean;
  protected abstract readonly triggerModeInput: InputSignal<FrDropdownMenuTriggerMode | null>;

  protected get triggerMode(): FrDropdownMenuTriggerMode {
    return this.triggerModeInput() ?? this.parent.triggerMode();
  }

  protected get closeDelay(): number {
    return this.parent.closeDelay();
  }

  protected resolvePositions(): ConnectedPosition[] {
    return (
      this.menuContent()?.getPositions(this.isSubmenuTrigger) ??
      defaultPositions(this.isSubmenuTrigger)
    );
  }

  protected openFromHover(): void {
    if (this.triggerMode === 'hover' || this.triggerMode === 'both') {
      this.tree.cancelClose();

      if (!this.cdkMenuTrigger.isOpen()) {
        this.cdkMenuTrigger.open();
      }
    }
  }

  protected handleMouseEnter(): void {
    this.tree.enterInteractiveArea();
    this.openFromHover();
  }

  protected handleMouseLeave(): void {
    if (this.menuContent()?.isDebugVisible()) {
      return;
    }

    if (this.triggerMode === 'hover' || this.triggerMode === 'both') {
      this.tree.leaveInteractiveArea(this.closeDelay);
    }
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

  private syncCustomPropertiesToOverlay(): void {
    const overlayRef = (this.cdkMenuTrigger as unknown as { overlayRef?: { overlayElement?: HTMLElement | null } })
      .overlayRef;
    const overlayElement = overlayRef?.overlayElement ?? null;

    if (!overlayElement) {
      return;
    }

    const menuPanel =
      overlayElement.querySelector<HTMLElement>('.frame-dropdown-menu__content') ?? overlayElement;
    const sourceStyles = getComputedStyle(this.elementRef.nativeElement);

    for (let index = 0; index < sourceStyles.length; index += 1) {
      const propertyName = sourceStyles.item(index);

      if (!propertyName.startsWith(FrDropdownMenuTriggerBase.CUSTOM_PROPERTY_PREFIX)) {
        continue;
      }

      const propertyValue = sourceStyles.getPropertyValue(propertyName);

      overlayElement.style.setProperty(propertyName, propertyValue);
      menuPanel.style.setProperty(propertyName, propertyValue);
    }
  }
}

@Directive({
  selector: '[frDropdownMenuTrigger]',
  hostDirectives: [CdkMenuTrigger],
  host: {
    class: 'frame-dropdown-menu__trigger',
    '[attr.data-state]': 'isOpen() ? "open" : "closed"',
  },
})
export class FrDropdownMenuTrigger extends FrDropdownMenuTriggerBase {
  readonly menuContent = input<FrDropdownMenuContent | null>(null, {
    alias: 'frDropdownMenuTrigger',
  });
  readonly triggerModeInput = input<FrDropdownMenuTriggerMode | null>(null, {
    alias: 'triggerMode',
  });
  protected readonly isSubmenuTrigger = false;
}

@Directive({
  selector: '[frDropdownMenuSubTrigger]',
  hostDirectives: [CdkMenuItem, CdkMenuTrigger],
  host: {
    class: 'frame-dropdown-menu__item frame-dropdown-menu__sub-trigger',
    '[attr.data-inset]': 'inset() ? "" : null',
    '[attr.data-state]': 'isOpen() ? "open" : "closed"',
    '[attr.data-variant]': 'variant()',
  },
})
export class FrDropdownMenuSubTrigger extends FrDropdownMenuTriggerBase {
  readonly menuContent = input<FrDropdownMenuContent | null>(null, {
    alias: 'frDropdownMenuSubTrigger',
  });
  readonly inset = input(false, { transform: booleanAttribute });
  readonly triggerModeInput = input<FrDropdownMenuTriggerMode | null>(null, {
    alias: 'triggerMode',
  });
  readonly variant = input<FrDropdownMenuItemVariant>('default');
  protected readonly isSubmenuTrigger = true;
}
