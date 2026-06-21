import { DIALOG_DATA } from '@angular/cdk/dialog';
import { InjectionToken } from '@angular/core';

import { FrModalRef } from './modal.ref';

export type FrModalPanelLayout = {
  height?: string;
  maxHeight?: string;
  maxWidth?: string;
  minHeight?: string;
  minWidth?: string;
  width?: string;
};

export const FR_MODAL_DATA = DIALOG_DATA;
export const FR_MODAL_PANEL_LAYOUT = new InjectionToken<FrModalPanelLayout>('FrModalPanelLayout');
export const FR_MODAL_REF = FrModalRef;
