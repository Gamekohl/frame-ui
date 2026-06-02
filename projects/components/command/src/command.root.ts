import {
  Directive,
  booleanAttribute,
  computed,
  effect,
  inject,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';

import { FR_COMMAND } from './command.tokens';
import type { FrCommandItem } from './command.item';

export type FrCommandFilter = (
  query: string,
  label: string,
  keywords: readonly string[],
) => boolean;

const DEFAULT_FILTER: FrCommandFilter = (query, label, keywords) => {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return true;
  }

  return [label, ...keywords].some((value) => value.toLowerCase().includes(normalizedQuery));
};

@Directive({
  selector: '[frCommand], frame-command',
  exportAs: 'frCommand',
  standalone: true,
  providers: [{ provide: FR_COMMAND, useExisting: FrCommand }],
  host: {
    class: 'frame-command',
    '[attr.data-disabled]': 'disabled() ? "" : null',
    '[attr.data-state]': 'visibleCount() > 0 ? "results" : "empty"',
    '(keydown)': 'handleKeydown($event)',
  },
})
export class FrCommand {
  private readonly dialogRef = inject<DialogRef<unknown>>(DialogRef, { optional: true });
  private readonly items = new Set<FrCommandItem>();
  private readonly itemsVersion = signal(0);

  readonly closeOnSelect = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly filter = input<FrCommandFilter>(DEFAULT_FILTER);
  readonly loop = input(true, { transform: booleanAttribute });
  readonly value = model<unknown>(null);

  readonly itemSelected = output<unknown>();
  readonly queryChange = output<string>();

  readonly query = signal('');
  readonly highlightedIndex = signal(0);
  readonly selectedValue = computed(() => this.value());

  constructor() {
    effect(() => {
      this.query();
      this.itemsVersion();
      this.normalizeHighlight();
    });

    effect(() => {
      this.highlightedIndex();
      this.itemsVersion();
      this.scrollHighlightedItemIntoView();
    });
  }

  registerItem(item: FrCommandItem): void {
    this.items.add(item);
    this.bumpItems();
  }

  unregisterItem(item: FrCommandItem): void {
    this.items.delete(item);
    this.bumpItems();
  }

  visibleItems(): FrCommandItem[] {
    this.itemsVersion();
    return Array.from(this.items).filter((item) => item.isVisible() && !item.disabled());
  }

  visibleCount(): number {
    return this.visibleItems().length;
  }

  filteredItemVisible(label: string, keywords: readonly string[]): boolean {
    return this.filter()(this.query(), label, keywords);
  }

  isHighlighted(item: FrCommandItem): boolean {
    return this.visibleItems()[this.highlightedIndex()] === item;
  }

  isItemSelected(value: unknown): boolean {
    return Object.is(this.value(), value);
  }

  setQuery(query: string): void {
    this.query.set(query);
    this.queryChange.emit(query);
    this.highlightedIndex.set(0);
  }

  moveHighlight(delta: number): void {
    const count = this.visibleCount();

    if (count === 0) {
      this.highlightedIndex.set(0);
      return;
    }

    const next = this.highlightedIndex() + delta;

    if (this.loop()) {
      this.highlightedIndex.set((next + count) % count);
      return;
    }

    this.highlightedIndex.set(Math.max(0, Math.min(next, count - 1)));
  }

  highlightFirst(): void {
    this.highlightedIndex.set(0);
  }

  highlightLast(): void {
    this.highlightedIndex.set(Math.max(0, this.visibleCount() - 1));
  }

  selectHighlighted(): void {
    this.visibleItems()[this.highlightedIndex()]?.select();
  }

  selectItem(item: FrCommandItem): void {
    const value = item.value();

    this.value.set(value);
    this.itemSelected.emit(value);

    if (this.closeOnSelect()) {
      this.close(value);
    }
  }

  close(value?: unknown): void {
    this.dialogRef?.close(value);
  }

  handleKeydown(event: KeyboardEvent): void {
    if (this.disabled()) {
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.moveHighlight(1);
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.moveHighlight(-1);
      return;
    }

    if (event.key === 'Home') {
      event.preventDefault();
      this.highlightFirst();
      return;
    }

    if (event.key === 'End') {
      event.preventDefault();
      this.highlightLast();
      return;
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      this.selectHighlighted();
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      this.close();
    }
  }

  private normalizeHighlight(): void {
    const count = this.visibleCount();

    if (count === 0) {
      this.highlightedIndex.set(0);
      return;
    }

    if (this.highlightedIndex() >= count) {
      this.highlightedIndex.set(count - 1);
    }
  }

  private bumpItems(): void {
    this.itemsVersion.update((value) => value + 1);
  }

  private scrollHighlightedItemIntoView(): void {
    this.visibleItems()[this.highlightedIndex()]?.scrollIntoView();
  }
}
