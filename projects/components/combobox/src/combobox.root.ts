import {
  CdkConnectedOverlay,
  CdkOverlayOrigin,
  ConnectedOverlayPositionChange,
  ConnectedPosition,
} from '@angular/cdk/overlay';
import { NgTemplateOutlet } from '@angular/common';
import {
  AfterViewInit,
  Component,
  DestroyRef,
  DoCheck,
  ElementRef,
  booleanAttribute,
  computed,
  contentChild,
  effect,
  inject,
  input,
  model,
  signal,
  ViewContainerRef,
  viewChild,
} from '@angular/core';

import { FrControlValueAccessor, provideDsValueAccessor } from '@frame-ui-ng/components/forms';
import { FrComboboxContent, FrComboboxRootLookup } from './combobox.content';
import { FrComboboxItem } from './combobox.items';

export type FrComboboxValue = unknown;

const POSITIONS: ConnectedPosition[] = [
  {
    originX: 'start',
    originY: 'bottom',
    overlayX: 'start',
    overlayY: 'top',
    offsetY: 4,
  },
  {
    originX: 'start',
    originY: 'top',
    overlayX: 'start',
    overlayY: 'bottom',
    offsetY: -4,
  },
];

/** Combobox control with single and multi-value support. */
@Component({
  selector: '[frCombobox], frame-combobox',
  exportAs: 'frCombobox',
  imports: [CdkConnectedOverlay, CdkOverlayOrigin, NgTemplateOutlet],
  providers: [
    provideDsValueAccessor(FrCombobox),
    {
      provide: FrComboboxRootLookup,
      useExisting: FrCombobox,
    },
  ],
  host: {
    class: 'frame-combobox',
    '[attr.data-disabled]': 'disabled() ? "" : null',
    '[attr.data-invalid]': 'invalid() ? "" : null',
    '[attr.data-show-clear]': 'showClear() ? "" : null',
  },
  template: `
    <span cdkOverlayOrigin #origin="cdkOverlayOrigin" class="frame-combobox__anchor">
      <ng-content />
    </span>

    <ng-template
      cdkConnectedOverlay
      [cdkConnectedOverlayOrigin]="origin"
      [cdkConnectedOverlayOpen]="isOpen()"
      [cdkConnectedOverlayPositions]="positions"
      [cdkConnectedOverlayPanelClass]="overlayPanelClasses()"
      [cdkConnectedOverlayWidth]="overlayMinWidth()"
      [cdkConnectedOverlayMinWidth]="overlayMinWidth()"
      (overlayOutsideClick)="close()"
      (positionChange)="handlePositionChange($event)"
      (detach)="close()"
    >
      @if (content()) {
        <ng-container [ngTemplateOutlet]="content()!.templateRef" />
      }
    </ng-template>
  `,
})
export class FrCombobox
  extends FrControlValueAccessor<FrComboboxValue | FrComboboxValue[] | null>
  implements AfterViewInit, DoCheck {
  private readonly destroyRef = inject(DestroyRef);
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly items = new Set<FrComboboxItem>();
  private readonly itemsVersion = signal(0);
  private readonly selectedLabels = new Map<FrComboboxValue, string>();
  private readonly selectedLabelsVersion = signal(0);
  private lastAutoHighlight = false;
  private lastItemsVersion = -1;
  private lastQuery = '';
  private primingLabels = false;
  private resizeObserver: ResizeObserver | null = null;

  private readonly origin = viewChild(CdkOverlayOrigin);

  readonly content = contentChild(FrComboboxContent);
  readonly autoHighlight = input(false, { transform: booleanAttribute });
  readonly debugVisible = input(false, { transform: booleanAttribute });
  readonly disabledInput = input(false, { alias: 'disabled', transform: booleanAttribute });
  readonly invalidInput = input(false, { alias: 'invalid', transform: booleanAttribute });
  readonly multiple = input(false, { transform: booleanAttribute });
  readonly showClear = input(false, { transform: booleanAttribute });
  readonly value = model<FrComboboxValue | FrComboboxValue[] | null>(null);

  readonly disabled = computed(() => this.disabledInput() || this.formDisabled());
  readonly invalid = computed(() => this.invalidInput() || this.formInvalid());
  readonly isOpen = signal(false);
  readonly query = signal('');
  readonly queryActive = signal(false);
  readonly anchorWidth = signal<number | null>(null);
  readonly highlightedIndex = signal(0);
  readonly overlaySide = signal<'bottom' | 'top'>('bottom');
  readonly positions = POSITIONS;

  readonly selectedValues = computed(() => {
    const value = this.value();
    return Array.isArray(value) ? value : value === null ? [] : [value];
  });

  readonly displayValue = computed(() => {
    if (this.multiple()) {
      return this.query();
    }

    const value = this.value();
    this.selectedLabelsVersion();

    if (this.queryActive() || value === null || Array.isArray(value)) {
      return this.query();
    }

    return this.query() || this.selectedLabels.get(value) || this.labelFromValue(value);
  });

  readonly hasValue = computed(() => this.selectedValues().length > 0 || this.query().length > 0);

  constructor() {
    super();

    effect(() => {
      const content = this.content();
      const unresolvedValue = this.selectedValues().some((value) => !this.selectedLabels.has(value));

      if (content && unresolvedValue && !this.isOpen()) {
        queueMicrotask(() => this.primeSelectedLabels());
      }
    });

    queueMicrotask(() => {
      this.measureAnchor();
      this.attachResizeObserver();
    });

    this.destroyRef.onDestroy(() => {
      this.resizeObserver?.disconnect();
    });
  }

  ngAfterViewInit(): void {
    if (this.debugVisible()) {
      this.open();
    }
  }

  ngDoCheck(): void {
    if (this.debugVisible() && !this.isOpen()) {
      this.open();
    }

    const autoHighlight = this.autoHighlight();
    const itemsVersion = this.itemsVersion();
    const query = this.query();

    if (
      autoHighlight &&
      (query !== this.lastQuery ||
        itemsVersion !== this.lastItemsVersion ||
        autoHighlight !== this.lastAutoHighlight)
    ) {
      // Filtering can invalidate the current index, so restart highlight at the first visible item.
      this.highlightedIndex.set(0);
    }

    this.lastAutoHighlight = autoHighlight;
    this.lastItemsVersion = itemsVersion;
    this.lastQuery = query;
  }

  registerItem(item: FrComboboxItem): void {
    this.items.add(item);
    this.bumpItems();
  }

  unregisterItem(item: FrComboboxItem): void {
    this.items.delete(item);
    this.bumpItems();
  }

  refreshItems(): void {
    this.bumpItems();
  }

  visibleItems(): FrComboboxItem[] {
    this.itemsVersion();
    return Array.from(this.items).filter((item) => item.isVisible());
  }

  visibleCount(): number {
    return this.visibleItems().length;
  }

  overlayMinWidth(): number {
    return this.anchorWidth() ?? 0;
  }

  overlayPanelClasses(): string[] {
    return ['frame-combobox-overlay', `frame-combobox-overlay--${this.overlaySide()}`];
  }

  isSelected(value: FrComboboxValue): boolean {
    return this.selectedValues().some((selected) => Object.is(selected, value));
  }

  isHighlighted(item: FrComboboxItem): boolean {
    return this.visibleItems()[this.highlightedIndex()] === item;
  }

  rememberItemLabel(value: FrComboboxValue, label: string): void {
    if (this.selectedLabels.get(value) === label) {
      return;
    }

    this.selectedLabels.set(value, label);
    this.selectedLabelsVersion.update((version) => version + 1);
  }

  itemVisible(label: string): boolean {
    const query = this.query().trim().toLowerCase();
    return !query || label.toLowerCase().includes(query);
  }

  open(): void {
    if (this.disabled()) {
      return;
    }

    this.measureAnchor();
    this.isOpen.set(true);
  }

  close(): void {
    if (this.debugVisible()) {
      return;
    }

    this.isOpen.set(false);
    if (!this.query()) {
      this.queryActive.set(false);
    }
    this.markAsTouched();
  }

  touch(): void {
    this.markAsTouched();
  }

  clear(): void {
    this.query.set('');
    this.queryActive.set(false);
    this.value.set(this.multiple() ? [] : null);
    this.notifyValueChange(this.value());
    this.markAsTouched();
  }

  selectItem(value: FrComboboxValue, label: string): void {
    this.rememberItemLabel(value, label);

    if (this.multiple()) {
      const current = this.selectedValues();
      const exists = current.some((item) => Object.is(item, value));
      const next = exists ? current.filter((item) => !Object.is(item, value)) : [...current, value];
      this.value.set(next);
      this.notifyValueChange(next);
      this.query.set('');
      this.queryActive.set(false);
      this.open();
      return;
    }

    this.value.set(value);
    this.notifyValueChange(value);
    this.query.set('');
    this.queryActive.set(false);
    this.close();
  }

  removeItem(value: FrComboboxValue): void {
    if (!this.multiple()) {
      this.clear();
      return;
    }

    const next = this.selectedValues().filter((item) => !Object.is(item, value));
    this.value.set(next);
    this.notifyValueChange(next);
    this.markAsTouched();
  }

  updateQuery(value: string): void {
    this.query.set(value);
    this.queryActive.set(true);
    this.highlightedIndex.set(0);
    this.open();
  }

  moveHighlight(delta: number): void {
    const count = this.visibleCount();

    if (count === 0) {
      this.highlightedIndex.set(0);
      return;
    }

    this.highlightedIndex.set((this.highlightedIndex() + delta + count) % count);
    this.scrollHighlightedItemIntoView();
  }

  selectHighlighted(): void {
    const item = this.visibleItems()[this.highlightedIndex()];
    item?.select();
  }

  handlePositionChange(event: ConnectedOverlayPositionChange): void {
    this.overlaySide.set(event.connectionPair.overlayY === 'bottom' ? 'top' : 'bottom');
  }

  protected setViewValue(value: FrComboboxValue | FrComboboxValue[] | null): void {
    this.value.set(value);
    this.query.set('');
    this.queryActive.set(false);
  }

  private bumpItems(): void {
    this.itemsVersion.update((value) => value + 1);
  }

  private labelFromValue(value: FrComboboxValue): string {
    if (typeof value === 'object' && value !== null && 'label' in value) {
      const label = (value as { readonly label?: unknown }).label;

      if (typeof label === 'string') {
        return label;
      }
    }

    return String(value ?? '');
  }

  private primeSelectedLabels(): void {
    if (this.primingLabels || this.isOpen()) {
      return;
    }

    const content = this.content();
    const unresolvedValues = this.selectedValues().filter((value) => !this.selectedLabels.has(value));

    if (!content || unresolvedValues.length === 0) {
      return;
    }

    this.primingLabels = true;
    const view = this.viewContainerRef.createEmbeddedView(content.templateRef);

    try {
      view.detectChanges();
      for (const item of this.items) {
        if (unresolvedValues.some((value) => Object.is(value, item.value()))) {
          item.captureLabel();
        }
      }
    } finally {
      const viewIndex = this.viewContainerRef.indexOf(view);

      if (viewIndex >= 0) {
        this.viewContainerRef.remove(viewIndex);
      }
      this.primingLabels = false;
    }
  }

  private scrollHighlightedItemIntoView(): void {
    queueMicrotask(() => {
      this.visibleItems()[this.highlightedIndex()]?.scrollIntoView();
    });
  }

  private measureAnchor(): void {
    const element = this.origin()?.elementRef.nativeElement ?? this.elementRef.nativeElement;

    if (typeof element?.getBoundingClientRect !== 'function') {
      this.anchorWidth.set(null);
      return;
    }

    // Match the overlay width to the trigger even when content is rendered in the CDK overlay.
    this.anchorWidth.set(element.getBoundingClientRect().width || null);
  }

  private attachResizeObserver(): void {
    if (typeof ResizeObserver === 'undefined') {
      return;
    }

    const element = this.origin()?.elementRef.nativeElement ?? this.elementRef.nativeElement;

    if (typeof element?.getBoundingClientRect !== 'function') {
      return;
    }

    this.resizeObserver = new ResizeObserver(() => this.measureAnchor());
    this.resizeObserver.observe(element);
  }
}


