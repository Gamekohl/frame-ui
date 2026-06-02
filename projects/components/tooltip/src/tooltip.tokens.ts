import { InjectionToken } from '@angular/core';

export type FrTooltipController = {
  isOpen(): boolean;
  overlaySide(): string;
  registerTrigger(trigger: HTMLElement): void;
  setContent(content: unknown | null): void;
  openWithDelay(): void;
  closeWithDelay(): void;
  open(): void;
  close(): void;
};

export const FR_TOOLTIP_CONTROLLER = new InjectionToken<FrTooltipController>('FR_TOOLTIP_CONTROLLER');
