import { CdkContextMenuTrigger } from '@angular/cdk/menu';
import { ConnectedPosition } from '@angular/cdk/overlay';
import {
  DestroyRef,
  Directive,
  ElementRef,
  booleanAttribute,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { FrContextMenuContent } from './context-menu.content';
import { defaultPositions } from '@frame-ui-ng/components/dropdown-menu';

type ContextMenuCoordinates = {
  readonly x: number;
  readonly y: number;
};

@Directive({
  selector: '[frContextMenuTrigger]',
  hostDirectives: [CdkContextMenuTrigger],
  host: {
    class: 'frame-context-menu__trigger',
    '[attr.data-state]': 'isOpen() ? "open" : "closed"',
    '[attr.data-disabled]': 'disabled() ? "" : null',
    '(pointerdown)': 'handlePointerDown($event)',
    '(pointerup)': 'clearLongPress()',
    '(pointercancel)': 'clearLongPress()',
    '(pointerleave)': 'clearLongPress()',
  },
})
export class FrContextMenuTrigger {
  private static readonly CUSTOM_PROPERTY_PREFIX = '--frame-dropdown-menu-';

  private readonly cdkContextMenuTrigger = inject(CdkContextMenuTrigger);
  private readonly destroyRef = inject(DestroyRef);
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private longPressTimeoutId: ReturnType<typeof setTimeout> | null = null;

  readonly menuContent = input<FrContextMenuContent | null>(null, {
    alias: 'frContextMenuTrigger',
  });
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly longPressDelay = input(520);
  readonly opened = output<void>();
  readonly closed = output<void>();
  readonly isOpen = signal(false);

  constructor() {
    effect(() => {
      const content = this.menuContent();

      this.cdkContextMenuTrigger.menuTemplateRef = content?.templateRef ?? null;
      this.cdkContextMenuTrigger.menuPosition = this.resolvePositions();
      this.cdkContextMenuTrigger.disabled = this.disabled();

      if (content?.isDebugVisible() && !this.cdkContextMenuTrigger.isOpen()) {
        queueMicrotask(() => {
          if (!this.cdkContextMenuTrigger.isOpen()) {
            this.openAtCenter();
          }
        });
      }
    });

    this.cdkContextMenuTrigger.opened.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.isOpen.set(true);
      this.opened.emit();
      queueMicrotask(() => {
        this.syncCustomPropertiesToOverlay();
      });
    });

    this.cdkContextMenuTrigger.closed.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      if (this.menuContent()?.isDebugVisible()) {
        queueMicrotask(() => {
          if (!this.cdkContextMenuTrigger.isOpen()) {
            this.openAtCenter();
          }
        });
        return;
      }

      this.isOpen.set(false);
      this.closed.emit();
    });
  }

  openAt(coordinates: ContextMenuCoordinates): void {
    if (this.disabled() || !this.menuContent()) {
      return;
    }

    this.cdkContextMenuTrigger.open(coordinates);
  }

  close(): void {
    this.cdkContextMenuTrigger.close();
  }

  protected handlePointerDown(event: PointerEvent): void {
    if (this.disabled() || (event.pointerType !== 'touch' && event.pointerType !== 'pen')) {
      return;
    }

    this.clearLongPress();
    this.longPressTimeoutId = setTimeout(() => {
      event.preventDefault();
      this.openAt({ x: event.clientX, y: event.clientY });
    }, this.longPressDelay());
  }

  protected clearLongPress(): void {
    if (this.longPressTimeoutId === null) {
      return;
    }

    clearTimeout(this.longPressTimeoutId);
    this.longPressTimeoutId = null;
  }

  private resolvePositions(): ConnectedPosition[] {
    return this.menuContent()?.getPositions(false) ?? defaultPositions(false);
  }

  private openAtCenter(): void {
    const rect = this.elementRef.nativeElement.getBoundingClientRect();

    this.openAt({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });
  }

  private syncCustomPropertiesToOverlay(): void {
    const overlayRef = (this.cdkContextMenuTrigger as unknown as {
      overlayRef?: { overlayElement?: HTMLElement | null };
    }).overlayRef;
    const overlayElement = overlayRef?.overlayElement ?? null;

    if (!overlayElement) {
      return;
    }

    const menuPanel =
      overlayElement.querySelector<HTMLElement>('.frame-dropdown-menu__content') ?? overlayElement;
    const sourceStyles = getComputedStyle(this.elementRef.nativeElement);

    for (let index = 0; index < sourceStyles.length; index += 1) {
      const propertyName = sourceStyles.item(index);

      if (!propertyName.startsWith(FrContextMenuTrigger.CUSTOM_PROPERTY_PREFIX)) {
        continue;
      }

      const propertyValue = sourceStyles.getPropertyValue(propertyName);

      overlayElement.style.setProperty(propertyName, propertyValue);
      menuPanel.style.setProperty(propertyName, propertyValue);
    }
  }
}

