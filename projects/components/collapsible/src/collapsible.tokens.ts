import { InjectionToken, Signal } from '@angular/core';

export interface FrCollapsibleContext {
  readonly contentId: Signal<string>;
  readonly disabled: Signal<boolean>;
  readonly open: Signal<boolean>;
  readonly triggerId: Signal<string>;
  toggle(): void;
}

export const FR_COLLAPSIBLE = new InjectionToken<FrCollapsibleContext>('FrCollapsible');
