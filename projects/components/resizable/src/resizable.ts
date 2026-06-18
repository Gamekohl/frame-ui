import {
  AfterViewInit,
  Directive,
  ElementRef,
  OnDestroy,
  booleanAttribute,
  inject,
  input,
  output,
} from '@angular/core';
import { clampNumber, coerceNumber } from '@frame-ui-ng/components/utils';

export const FR_RESIZABLE_ORIENTATIONS = ['horizontal', 'vertical'] as const;
export type FrResizableOrientation = (typeof FR_RESIZABLE_ORIENTATIONS)[number];

let nextResizableId = 0;

/** Resizable panel group that coordinates pane sizes. */
@Directive({
  selector: '[frResizablePanelGroup], frame-resizable-panel-group',
  exportAs: 'frResizablePanelGroup',
  host: {
    class: 'frame-resizable',
    '[attr.data-orientation]': 'orientation()',
    '[attr.data-disabled]': 'disabled() ? "" : null',
  },
})
export class FrResizablePanelGroup implements AfterViewInit, OnDestroy {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly groupId = `frame-resizable-${++nextResizableId}`;
  private readonly cleanupFns: Array<() => void> = [];

  readonly orientation = input<FrResizableOrientation>('horizontal');
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly layoutChange = output<number[]>();

  ngAfterViewInit(): void {
    queueMicrotask(() => this.initializeLayout());
  }

  ngOnDestroy(): void {
    for (const cleanup of this.cleanupFns) {
      cleanup();
    }
  }

  panelId(index: number): string {
    return `${this.groupId}-panel-${index}`;
  }

  panels(): HTMLElement[] {
    return Array.from(
      this.elementRef.nativeElement.children,
    ).filter((child): child is HTMLElement => child instanceof HTMLElement && child.hasAttribute('FrResizablePanel'));
  }

  handles(): HTMLElement[] {
    return Array.from(
      this.elementRef.nativeElement.children,
    ).filter((child): child is HTMLElement => child instanceof HTMLElement && child.hasAttribute('FrResizableHandle'));
  }

  initializeLayout(): void {
    const panels = this.panels();

    if (!panels.length) {
      return;
    }

    const remainingPanels = panels.filter((panel) => !panel.style.flexBasis);
    const assignedTotal = panels.reduce((total, panel) => total + (this.panelSize(panel) ?? 0), 0);
    const fallbackSize = remainingPanels.length
      ? Math.max((100 - assignedTotal) / remainingPanels.length, 0)
      : 0;

    panels.forEach((panel, index) => {
      panel.id ||= this.panelId(index);
      panel.style.flexGrow = '0';
      panel.style.flexShrink = '0';

      if (!panel.style.flexBasis) {
        this.applyPanelSize(
          panel,
          clampNumber(this.defaultSize(panel) ?? fallbackSize, this.minSize(panel), this.maxSize(panel)),
        );
      } else {
        this.applyPanelSize(panel, this.panelSize(panel) ?? 0);
      }
    });

    this.updateHandleMetadata();
    this.emitLayout();
  }

  startResize(handle: HTMLElement, pointerId: number, startClientX: number, startClientY: number): void {
    if (this.disabled()) {
      return;
    }

    const pair = this.panelPairForHandle(handle);

    if (!pair) {
      return;
    }

    const groupRect = this.elementRef.nativeElement.getBoundingClientRect();
    const dimension = this.orientation() === 'horizontal' ? groupRect.width : groupRect.height;

    if (dimension <= 0) {
      return;
    }

    const [previousPanel, nextPanel] = pair;
    const startPrevious = this.panelSize(previousPanel) ?? 0;
    const startNext = this.panelSize(nextPanel) ?? 0;
    const pairTotal = startPrevious + startNext;
    // Keep pair resizing local so adjacent panels trade space without changing total layout.
    const rtlMultiplier =
      this.orientation() === 'horizontal' && getComputedStyle(this.elementRef.nativeElement).direction === 'rtl'
        ? -1
        : 1;

    handle.setPointerCapture?.(pointerId);
    handle.setAttribute('data-dragging', '');
    this.elementRef.nativeElement.setAttribute('data-resizing', '');

    const move = (event: PointerEvent) => {
      const deltaPx =
        this.orientation() === 'horizontal'
          ? (event.clientX - startClientX) * rtlMultiplier
          : event.clientY - startClientY;
      this.resizePair(previousPanel, nextPanel, pairTotal, startPrevious + (deltaPx / dimension) * 100);
    };

    const end = () => {
      handle.removeAttribute('data-dragging');
      this.elementRef.nativeElement.removeAttribute('data-resizing');
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', end);
      window.removeEventListener('pointercancel', end);
    };

    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', end, { once: true });
    window.addEventListener('pointercancel', end, { once: true });
  }

  resizeFromKeyboard(handle: HTMLElement, key: string): boolean {
    if (this.disabled()) {
      return false;
    }

    const pair = this.panelPairForHandle(handle);

    if (!pair) {
      return false;
    }

    const [previousPanel, nextPanel] = pair;
    const startPrevious = this.panelSize(previousPanel) ?? 0;
    const startNext = this.panelSize(nextPanel) ?? 0;
    const pairTotal = startPrevious + startNext;
    const isRtl =
      this.orientation() === 'horizontal' &&
      getComputedStyle(this.elementRef.nativeElement).direction === 'rtl';
    const step = 10;

    switch (key) {
      case 'ArrowLeft':
        this.resizePair(previousPanel, nextPanel, pairTotal, startPrevious + (isRtl ? step : -step));
        return true;
      case 'ArrowRight':
        this.resizePair(previousPanel, nextPanel, pairTotal, startPrevious + (isRtl ? -step : step));
        return true;
      case 'ArrowUp':
        this.resizePair(previousPanel, nextPanel, pairTotal, startPrevious - step);
        return true;
      case 'ArrowDown':
        this.resizePair(previousPanel, nextPanel, pairTotal, startPrevious + step);
        return true;
      case 'Home':
        this.resizePair(previousPanel, nextPanel, pairTotal, this.minSize(previousPanel));
        return true;
      case 'End':
        this.resizePair(previousPanel, nextPanel, pairTotal, pairTotal - this.minSize(nextPanel));
        return true;
      default:
        return false;
    }
  }

  private resizePair(
    previousPanel: HTMLElement,
    nextPanel: HTMLElement,
    pairTotal: number,
    requestedPreviousSize: number,
  ): void {
    // Clamp the previous panel first; the next panel receives the remaining pair size.
    const previousMin = this.minSize(previousPanel);
    const previousMax = Math.min(this.maxSize(previousPanel), pairTotal - this.minSize(nextPanel));
    const previousSize = clampNumber(requestedPreviousSize, previousMin, previousMax);
    const nextSize = clampNumber(pairTotal - previousSize, this.minSize(nextPanel), this.maxSize(nextPanel));

    this.applyPanelSize(previousPanel, previousSize);
    this.applyPanelSize(nextPanel, nextSize);
    this.updateHandleMetadata();
    this.emitLayout();
  }

  private applyPanelSize(panel: HTMLElement, size: number): void {
    const normalizedSize = Math.max(size, 0);
    const collapsedThreshold = this.collapsible(panel) ? this.collapsedSize(panel) : 0;
    // Collapsible panels snap to their collapsed size instead of shrinking below it.
    const collapsed = normalizedSize <= collapsedThreshold;
    const appliedSize = collapsed ? collapsedThreshold : normalizedSize;

    panel.style.flexBasis = `${appliedSize}%`;
    panel.setAttribute('data-size', String(appliedSize));
    panel.toggleAttribute('data-collapsed', collapsed);
  }

  private panelPairForHandle(handle: HTMLElement): [HTMLElement, HTMLElement] | null {
    let previous = handle.previousElementSibling;
    let next = handle.nextElementSibling;

    while (previous && !(previous instanceof HTMLElement && previous.hasAttribute('FrResizablePanel'))) {
      previous = previous.previousElementSibling;
    }

    while (next && !(next instanceof HTMLElement && next.hasAttribute('FrResizablePanel'))) {
      next = next.nextElementSibling;
    }

    if (!(previous instanceof HTMLElement) || !(next instanceof HTMLElement)) {
      return null;
    }

    return [previous, next];
  }

  private updateHandleMetadata(): void {
    const panels = this.panels();

    this.handles().forEach((handle) => {
      const pair = this.panelPairForHandle(handle);

      if (!pair) {
        return;
      }

      const [previousPanel, nextPanel] = pair;
      const previousIndex = panels.indexOf(previousPanel);
      const nextIndex = panels.indexOf(nextPanel);

      handle.setAttribute('aria-controls', [previousPanel.id, nextPanel.id].filter(Boolean).join(' '));
      handle.setAttribute('aria-valuemin', String(this.minSize(previousPanel)));
      handle.setAttribute('aria-valuemax', String(this.maxSize(previousPanel)));
      handle.setAttribute('aria-valuenow', String(Math.round(this.panelSize(previousPanel) ?? 0)));
      handle.setAttribute('data-panels', `${previousIndex}:${nextIndex}`);
    });
  }

  private emitLayout(): void {
    this.layoutChange.emit(this.panels().map((panel) => this.panelSize(panel) ?? 0));
  }

  private panelSize(panel: HTMLElement): number | null {
    const styleSize = Number.parseFloat(panel.style.flexBasis);

    if (Number.isFinite(styleSize)) {
      return styleSize;
    }

    const dataSize = Number(panel.getAttribute('data-size'));
    return Number.isFinite(dataSize) ? dataSize : null;
  }

  private defaultSize(panel: HTMLElement): number | null {
    const value = panel.getAttribute('data-default-size');
    return value === null ? null : coerceNumber(value, 0);
  }

  private minSize(panel: HTMLElement): number {
    return coerceNumber(panel.getAttribute('data-min-size'), 0);
  }

  private maxSize(panel: HTMLElement): number {
    return coerceNumber(panel.getAttribute('data-max-size'), 100);
  }

  private collapsedSize(panel: HTMLElement): number {
    return coerceNumber(panel.getAttribute('data-collapsed-size'), 0);
  }

  private collapsible(panel: HTMLElement): boolean {
    return panel.hasAttribute('data-collapsible');
  }
}

/** Panel slot for resizable. */
@Directive({
  selector: '[frResizablePanel], frame-resizable-panel',
  host: {
    class: 'frame-resizable__panel',
    '[attr.data-default-size]': 'defaultSize()',
    '[attr.data-min-size]': 'minSize()',
    '[attr.data-max-size]': 'maxSize()',
    '[attr.data-collapsible]': 'collapsible() ? "" : null',
    '[attr.data-collapsed-size]': 'collapsedSize()',
  },
})
export class FrResizablePanel {
  readonly defaultSize = input<number, unknown>(0, { transform: (value) => coerceNumber(value, 0) });
  readonly minSize = input<number, unknown>(0, { transform: (value) => coerceNumber(value, 0) });
  readonly maxSize = input<number, unknown>(100, { transform: (value) => coerceNumber(value, 100) });
  readonly collapsible = input(false, { transform: booleanAttribute });
  readonly collapsedSize = input<number, unknown>(0, { transform: (value) => coerceNumber(value, 0) });
}

/** Resize handle between adjacent resizable panels. */
@Directive({
  selector: '[frResizableHandle], frame-resizable-handle',
  host: {
    class: 'frame-resizable__handle',
    role: 'separator',
    tabindex: '0',
    '[attr.aria-orientation]': 'group.orientation()',
    '[attr.data-orientation]': 'group.orientation()',
    '[attr.data-handle]': 'withHandle() ? "" : null',
    '[attr.data-disabled]': 'group.disabled() ? "" : null',
    '(pointerdown)': 'onPointerDown($event)',
    '(keydown)': 'onKeydown($event)',
  },
})
export class FrResizableHandle {
  protected readonly group = inject(FrResizablePanelGroup);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  readonly withHandle = input(false, { transform: booleanAttribute });

  protected onPointerDown(event: PointerEvent): void {
    if (event.button !== 0) {
      return;
    }

    event.preventDefault();
    this.group.startResize(this.elementRef.nativeElement, event.pointerId, event.clientX, event.clientY);
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (this.group.resizeFromKeyboard(this.elementRef.nativeElement, event.key)) {
      event.preventDefault();
    }
  }
}

