export type FrConfirmModalResult = 'cancel' | 'confirm';

export type FrConfirmModalData = {
  cancelLabel: string;
  confirmLabel: string;
  description?: string;
  title: string;
};
