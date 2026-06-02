import { Injectable, computed, signal } from '@angular/core';

import { FrToastOptions, FrToastRecord, FrToastVariant } from './toast.types';

const DEFAULT_DURATION = 4000;
const DISMISS_ANIMATION_DURATION = 180;
let nextToastId = 0;

@Injectable({ providedIn: 'root' })
export class FrToastService {
  private readonly timers = new Map<string, ReturnType<typeof setTimeout>>();
  private readonly removalTimers = new Map<string, ReturnType<typeof setTimeout>>();
  private readonly toastRecords = signal<FrToastRecord[]>([]);

  readonly toasts = computed(() => this.toastRecords());

  show(title: string, options?: Omit<FrToastOptions, 'title'>): string;
  show(options: FrToastOptions): string;
  show(titleOrOptions: string | FrToastOptions, options: Omit<FrToastOptions, 'title'> = {}): string {
    const toast = this.createToast(titleOrOptions, options);

    this.clearRemovalTimer(toast.id);
    this.toastRecords.update((toasts) => [toast, ...toasts.filter((item) => item.id !== toast.id)]);
    this.scheduleDismiss(toast);

    return toast.id;
  }

  success(title: string, options: Omit<FrToastOptions, 'title' | 'variant'> = {}): string {
    return this.show(title, { ...options, variant: 'success' });
  }

  info(title: string, options: Omit<FrToastOptions, 'title' | 'variant'> = {}): string {
    return this.show(title, { ...options, variant: 'info' });
  }

  warning(title: string, options: Omit<FrToastOptions, 'title' | 'variant'> = {}): string {
    return this.show(title, { ...options, variant: 'warning' });
  }

  error(title: string, options: Omit<FrToastOptions, 'title' | 'variant'> = {}): string {
    return this.show(title, { ...options, variant: 'error' });
  }

  loading(title: string, options: Omit<FrToastOptions, 'title' | 'variant' | 'loading'> = {}): string {
    return this.show(title, { ...options, variant: 'loading', loading: true, duration: options.duration ?? 0 });
  }

  update(id: string, options: Partial<Omit<FrToastOptions, 'id'>>): void {
    let updatedToast: FrToastRecord | undefined;

    this.clearRemovalTimer(id);
    this.toastRecords.update((toasts) =>
      toasts.map((toast) => {
        if (toast.id !== id) {
          return toast;
        }

        updatedToast = {
          ...toast,
          ...options,
          variant: options.variant ?? toast.variant,
          loading: options.loading ?? toast.loading,
          state: 'visible',
        };

        return updatedToast;
      }),
    );

    if (updatedToast) {
      this.scheduleDismiss(updatedToast);
    }
  }

  dismiss(id: string): void {
    this.clearTimer(id);

    let shouldRemove = false;

    this.toastRecords.update((toasts) =>
      toasts.map((toast) => {
        if (toast.id !== id) {
          return toast;
        }

        if (toast.state === 'dismissing') {
          return toast;
        }

        shouldRemove = true;
        return { ...toast, state: 'dismissing' };
      }),
    );

    if (!shouldRemove) {
      return;
    }

    this.removalTimers.set(
      id,
      setTimeout(() => {
        this.removalTimers.delete(id);
        this.toastRecords.update((toasts) => toasts.filter((toast) => toast.id !== id));
      }, DISMISS_ANIMATION_DURATION),
    );
  }

  dismissAll(): void {
    for (const id of this.timers.keys()) {
      this.clearTimer(id);
    }

    for (const id of this.removalTimers.keys()) {
      this.clearRemovalTimer(id);
    }

    this.toastRecords.set([]);
  }

  private createToast(
    titleOrOptions: string | FrToastOptions,
    options: Omit<FrToastOptions, 'title'>,
  ): FrToastRecord {
    const merged = typeof titleOrOptions === 'string'
      ? { ...options, title: titleOrOptions }
      : titleOrOptions;
    const variant: FrToastVariant = merged.variant ?? (merged.loading ? 'loading' : 'default');

    return {
      id: merged.id ?? `frame-toast-${nextToastId++}`,
      title: merged.title,
      description: merged.description,
      variant,
      position: merged.position ?? 'bottom-right',
      duration: merged.duration ?? (merged.loading || variant === 'loading' ? 0 : DEFAULT_DURATION),
      dismissible: merged.dismissible ?? true,
      action: merged.action,
      loading: merged.loading ?? variant === 'loading',
      createdAt: Date.now(),
      state: 'visible',
    };
  }

  private scheduleDismiss(toast: FrToastRecord): void {
    this.clearTimer(toast.id);

    if (!toast.duration || toast.duration <= 0) {
      return;
    }

    this.timers.set(
      toast.id,
      setTimeout(() => this.dismiss(toast.id), toast.duration),
    );
  }

  private clearTimer(id: string): void {
    const timer = this.timers.get(id);

    if (timer) {
      clearTimeout(timer);
      this.timers.delete(id);
    }
  }

  private clearRemovalTimer(id: string): void {
    const timer = this.removalTimers.get(id);

    if (timer) {
      clearTimeout(timer);
      this.removalTimers.delete(id);
    }
  }
}
