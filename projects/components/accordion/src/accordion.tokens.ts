import { InjectionToken, Signal } from '@angular/core';

export interface FrAccordionRootContext {
  isItemOpen(value: string): boolean;
  toggleItem(value: string): void;
}

export interface FrAccordionItemContext {
  readonly contentId: Signal<string>;
  readonly disabled: Signal<boolean>;
  readonly open: Signal<boolean>;
  readonly triggerId: Signal<string>;
  toggle(): void;
}

export const ACCORDION_ROOT = new InjectionToken<FrAccordionRootContext>('FrAccordion');
export const ACCORDION_ITEM = new InjectionToken<FrAccordionItemContext>('FrAccordionItem');
