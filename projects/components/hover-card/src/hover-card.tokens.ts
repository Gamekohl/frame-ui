import { InjectionToken } from '@angular/core';

export type FrHoverCardController = {
  close: () => void;
  closeWithDelay: () => void;
  enterInteractiveArea: () => void;
  isOpen: () => boolean;
  leaveInteractiveArea: () => void;
  openWithDelay: () => void;
  registerTrigger: (trigger: HTMLElement) => void;
  setContent: (content: unknown | null) => void;
};

export const FR_HOVER_CARD_CONTROLLER = new InjectionToken<FrHoverCardController>('FrHoverCardController');
