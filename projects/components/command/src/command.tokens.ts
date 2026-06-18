import { InjectionToken, Signal, WritableSignal } from '@angular/core';

import type { FrCommandItem } from './command.item';

export interface FrCommandRootContext {
  readonly disabled: Signal<boolean>;
  readonly highlightedIndex: WritableSignal<number>;
  readonly query: Signal<string>;
  readonly selectedValue: Signal<unknown>;
  close(value?: unknown): void;
  filteredItemVisible(label: string, keywords: readonly string[]): boolean;
  isHighlighted(item: FrCommandItem): boolean;
  isItemSelected(value: unknown): boolean;
  moveHighlight(delta: number): void;
  refreshItems(): void;
  registerItem(item: FrCommandItem): void;
  selectItem(item: FrCommandItem): void;
  setQuery(query: string): void;
  unregisterItem(item: FrCommandItem): void;
  visibleCount(): number;
  visibleItems(): FrCommandItem[];
}

export interface FrCommandGroupContext {
  registerItem(item: FrCommandItem): void;
  unregisterItem(item: FrCommandItem): void;
}

export const FR_COMMAND = new InjectionToken<FrCommandRootContext>('FrCommand');
export const FR_COMMAND_GROUP = new InjectionToken<FrCommandGroupContext>('FrCommandGroup');
