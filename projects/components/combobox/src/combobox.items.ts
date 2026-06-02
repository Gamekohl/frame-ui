import {
  DestroyRef,
  Directive,
  ElementRef,
  afterNextRender,
  booleanAttribute,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';

import { FrCombobox, FrComboboxValue } from './combobox.root';

@Directive({
  selector: 'button[frComboboxItem]',
  host: {
    class: 'frame-combobox__item',
    '[attr.aria-selected]': 'isSelected() ? "true" : "false"',
    '[attr.data-highlighted]': 'isHighlighted() ? "" : null',
    '[attr.data-hidden]': 'isVisible() ? null : ""',
    '[attr.data-selected]': 'isSelected() ? "" : null',
    '[attr.disabled]': 'disabled() ? "" : null',
    role: 'option',
    type: 'button',
    '(click)': 'select()',
    '(mouseenter)': 'highlightSelf()',
  },
})
export class FrComboboxItem {
  private readonly destroyRef = inject(DestroyRef);
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly root = inject(FrCombobox);
  private mutationObserver: MutationObserver | null = null;

  readonly disabled = input(false, { transform: booleanAttribute });
  readonly itemLabel = input<string | null>(null, { alias: 'label' });
  readonly value = input.required<FrComboboxValue>();
  readonly resolvedLabel = signal('');

  readonly label = computed(() => this.itemLabel() ?? this.resolvedLabel());
  readonly visible = computed(() => this.root.itemVisible(this.label()));

  constructor() {
    this.root.registerItem(this);
    this.destroyRef.onDestroy(() => {
      this.mutationObserver?.disconnect();
      this.root.unregisterItem(this);
    });

    afterNextRender(() => {
      this.refreshResolvedLabel();
      this.observeTextChanges();
    });

    effect(() => {
      if (this.root.isSelected(this.value())) {
        this.root.rememberItemLabel(this.value(), this.label());
      }
    });
  }

  isVisible(): boolean {
    return this.visible();
  }

  isSelected(): boolean {
    return this.root.isSelected(this.value());
  }

  isHighlighted(): boolean {
    return this.root.isHighlighted(this);
  }

  select(): void {
    if (!this.disabled() && this.isVisible()) {
      this.root.selectItem(this.value(), this.label());
    }
  }

  protected highlightSelf(): void {
    const index = this.root.visibleItems().indexOf(this);

    if (index >= 0) {
      this.root.highlightedIndex.set(index);
    }
  }

  private resolveLabel(): string {
    return this.elementRef.nativeElement.textContent?.trim() ?? '';
  }

  private refreshResolvedLabel(): void {
    this.resolvedLabel.set(this.resolveLabel());
  }

  private observeTextChanges(): void {
    if (typeof MutationObserver === 'undefined' || this.itemLabel() !== null) {
      return;
    }

    this.mutationObserver = new MutationObserver(() => this.refreshResolvedLabel());
    this.mutationObserver.observe(this.elementRef.nativeElement, {
      characterData: true,
      childList: true,
      subtree: true,
    });
  }
}

@Directive({
  selector: '[frComboboxItemIndicator]',
  host: {
    class: 'frame-combobox__item-indicator',
    'aria-hidden': 'true',
  },
})
export class FrComboboxItemIndicator {}
