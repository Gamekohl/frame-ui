export type FrToastVariant =
  | 'default'
  | 'success'
  | 'info'
  | 'warning'
  | 'error'
  | 'loading';

export type FrToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export type FrToastAction = {
  label: string;
  altText?: string;
  handler?: () => void;
};

export type FrToastState = 'visible' | 'dismissing';

export type FrToastOptions = {
  id?: string;
  title: string;
  description?: string;
  variant?: FrToastVariant;
  position?: FrToastPosition;
  duration?: number;
  dismissible?: boolean;
  action?: FrToastAction;
  loading?: boolean;
};

export type FrToastRecord = Required<
  Pick<FrToastOptions, 'id' | 'title' | 'variant' | 'position' | 'dismissible' | 'loading'>
> &
  Pick<FrToastOptions, 'description' | 'duration' | 'action'> & {
    createdAt: number;
    state: FrToastState;
  };

export const FR_TOAST_POSITIONS: FrToastPosition[] = [
  'top-left',
  'top-center',
  'top-right',
  'bottom-left',
  'bottom-center',
  'bottom-right',
];
