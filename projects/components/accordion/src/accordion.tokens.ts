import { InjectionToken, Signal } from '@angular/core';

import { FrAccordionType } from './accordion.types';

export interface FrAccordionRootContext {
  readonly collapsible: Signal<boolean>;
  readonly type: Signal<FrAccordionType>;
  isDefaultItemOpen(value: string): boolean;
  itemExpansionChanged(value: string, expanded: boolean): void;
  syncCdkMode(): void;
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
