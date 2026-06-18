import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, TemplateRef, computed, inject, input } from '@angular/core';
import { FrSpinner } from '@frame-ui-ng/components/spinner';

import { FrToastService } from './toast.service';
import { FR_TOAST_POSITIONS, FrToastPosition, FrToastRecord } from './toast.types';

/** Viewport container for rendered toasts. */
@Component({
  selector: 'frame-toast-viewport',
  exportAs: 'frToastViewport',
  host: {
    class: 'frame-toast-viewport',
    '[attr.data-strategy]': 'strategy()',
    '[attr.aria-live]': 'politeness()',
    '[attr.aria-label]': 'label()',
  },
  imports: [NgTemplateOutlet, FrSpinner],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @for (position of positions; track position) {
      @let positionToasts = groupedToasts().get(position) ?? [];

      @if (positionToasts.length > 0) {
        <section
          class="frame-toast__group"
          [attr.data-position]="position"
          [style.--frame-toast-count]="positionToasts.length"
        >
          @for (toast of positionToasts; track toast.id; let toastIndex = $index) {
            <article
              class="frame-toast"
              [attr.data-variant]="toast.variant"
              [attr.data-loading]="toast.loading"
              [attr.data-dismissible]="toast.dismissible"
              [attr.data-has-description]="toast.description ? 'true' : 'false'"
              [attr.data-has-action]="toast.action ? 'true' : 'false'"
              [attr.data-state]="toast.state"
              [style.--frame-toast-index]="toastIndex"
              data-token-target="toast-root"
            >
              @if (toast.loading) {
                <span
                  frSpinner
                  class="frame-toast__loader"
                  decorative
                  size="sm"
                  data-token-target="toast-loader"
                ></span>
              } @else {
                <span class="frame-toast__status" aria-hidden="true" data-token-target="toast-status"></span>
              }

              <div class="frame-toast__content" data-token-target="toast-content">
                <h2 class="frame-toast__title" data-token-target="toast-title">{{ toast.title }}</h2>

                @if (toast.description) {
                  <p class="frame-toast__description" data-token-target="toast-description">
                    {{ toast.description }}
                  </p>
                }
              </div>

              @if (toast.action) {
                <button
                  class="frame-toast__action"
                  type="button"
                  [attr.aria-label]="toast.action.altText ?? toast.action.label"
                  (click)="runAction(toast)"
                  data-token-target="toast-action"
                >
                  {{ toast.action.label }}
                </button>
              }

              @if (toast.dismissible && !toast.action) {
                <button
                  class="frame-toast__close"
                  type="button"
                  aria-label="Dismiss notification"
                  (click)="dismiss(toast.id)"
                  data-token-target="toast-close"
                >
                  @if (closeIcon(); as iconTemplate) {
                    <ng-container [ngTemplateOutlet]="iconTemplate" />
                  } @else {
                    <span aria-hidden="true">x</span>
                  }
                </button>
              }
            </article>
          }
        </section>
      }
    }
  `,
})
export class FrToastViewport {
  private readonly toast = inject(FrToastService);

  readonly strategy = input<'fixed' | 'inline'>('fixed');
  readonly label = input('Notifications');
  readonly politeness = input<'polite' | 'assertive' | 'off'>('polite');
  readonly closeIcon = input<TemplateRef<unknown> | null>(null);

  protected readonly positions = FR_TOAST_POSITIONS;
  protected readonly groupedToasts = computed(() => {
    const groups = new Map<FrToastPosition, FrToastRecord[]>();

    for (const toast of this.toast.toasts()) {
      const toasts = groups.get(toast.position) ?? [];
      toasts.push(toast);
      groups.set(toast.position, toasts);
    }

    return groups;
  });

  protected dismiss(id: string): void {
    this.toast.dismiss(id);
  }

  protected runAction(toast: FrToastRecord): void {
    toast.action?.handler?.();
    this.toast.dismiss(toast.id);
  }
}

