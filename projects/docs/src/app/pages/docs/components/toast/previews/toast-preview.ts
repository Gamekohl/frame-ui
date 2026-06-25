import { ChangeDetectionStrategy, Component, effect, inject, input } from '@angular/core';
import { FrButton, FrButtonLabel } from '@frame-ui-ng/components/button';
import { FrToastModule, FrToastPosition, FrToastService } from '@frame-ui-ng/components/toast';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { tablerX } from '@ng-icons/tabler-icons';

export type ToastPreviewMode =
  | 'action'
  | 'basic'
  | 'custom-styling'
  | 'dismissible'
  | 'inspector'
  | 'loading'
  | 'position'
  | 'rtl'
  | 'stack'
  | 'variants';

export type ToastPreviewConfig = {
  mode: ToastPreviewMode;
};

@Component({
  selector: 'docs-toast-preview',
  host: {
    class: 'block w-full',
  },
  providers: [FrToastService],
  imports: [FrButton, FrButtonLabel, FrToastModule, NgIcon],
  viewProviders: [provideIcons({ tablerX })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-template #closeIcon>
      <ng-icon name="tablerX" />
    </ng-template>

    @switch (config().mode) {
      @case ('basic') {
        <div class="docs-toast-demo">
          <button frButton type="button" (click)="showBasic()">
            <span frButtonLabel>Show notification</span>
          </button>
          <frame-toast-viewport [closeIcon]="closeIcon" />
        </div>
      }

      @case ('variants') {
        <div class="docs-toast-demo">
          <div class="docs-toast-actions">
            <button frButton appearance="outline" type="button" (click)="showVariant('default')">Default</button>
            <button frButton appearance="outline" type="button" (click)="showVariant('success')">Success</button>
            <button frButton appearance="outline" type="button" (click)="showVariant('info')">Info</button>
            <button frButton appearance="outline" type="button" (click)="showVariant('warning')">Warning</button>
            <button frButton appearance="outline" type="button" (click)="showVariant('error')">Error</button>
          </div>
          <frame-toast-viewport [closeIcon]="closeIcon" />
        </div>
      }

      @case ('stack') {
        <div class="docs-toast-demo">
          <button frButton type="button" (click)="showStack()">
            <span frButtonLabel>Queue updates</span>
          </button>
          <frame-toast-viewport [closeIcon]="closeIcon" />
        </div>
      }

      @case ('action') {
        <div class="docs-toast-demo">
          <button frButton type="button" (click)="showAction()">
            <span frButtonLabel>Show action</span>
          </button>
          <frame-toast-viewport [closeIcon]="closeIcon" />
        </div>
      }

      @case ('loading') {
        <div class="docs-toast-demo">
          <button frButton type="button" (click)="showLoading()">
            <span frButtonLabel>Start upload</span>
          </button>
          <frame-toast-viewport [closeIcon]="closeIcon" />
        </div>
      }

      @case ('dismissible') {
        <div class="docs-toast-demo">
          <div class="docs-toast-actions">
            <button frButton type="button" (click)="showPinned()">Pinned</button>
            <button frButton appearance="outline" type="button" (click)="dismissAll()">Clear all</button>
          </div>
          <frame-toast-viewport [closeIcon]="closeIcon" />
        </div>
      }

      @case ('position') {
        <div class="docs-toast-demo">
          <div class="docs-toast-actions">
            @for (position of positions; track position) {
              <button frButton appearance="outline" type="button" (click)="showAt(position)">
                {{ position }}
              </button>
            }
          </div>
          <frame-toast-viewport [closeIcon]="closeIcon" />
        </div>
      }

      @case ('custom-styling') {
        <div class="docs-toast-demo docs-toast-custom">
          <button frButton type="button" (click)="showCustom()">
            <span frButtonLabel>Show styled toast</span>
          </button>
          <frame-toast-viewport [closeIcon]="closeIcon" />
        </div>
      }

      @case ('rtl') {
        <div class="docs-toast-demo" dir="rtl" lang="ar">
          <button frButton type="button" (click)="showRtl()">
            <span frButtonLabel>عرض إشعار</span>
          </button>
          <frame-toast-viewport [closeIcon]="closeIcon" />
        </div>
      }

      @case ('inspector') {
        <div class="docs-toast-demo docs-toast-inspector">
          <div class="docs-toast-static-stack">
            <article
              class="frame-toast"
              data-variant="success"
              data-loading="false"
              data-dismissible="true"
              data-has-description="true"
              data-has-action="true"
              data-state="visible"
              data-token-target="toast-root"
            >
              <span class="frame-toast__status" aria-hidden="true" data-token-target="toast-status"></span>

              <div class="frame-toast__content" data-token-target="toast-content">
                <h2 class="frame-toast__title" data-token-target="toast-title">Build published</h2>
                <p class="frame-toast__description" data-token-target="toast-description">
                  The production bundle is available for review.
                </p>
              </div>

              <button class="frame-toast__action" type="button" data-token-target="toast-action">
                Open
              </button>
            </article>

            <article
              class="frame-toast"
              data-variant="default"
              data-loading="false"
              data-dismissible="true"
              data-has-description="false"
              data-has-action="false"
              data-state="visible"
            >
              <span class="frame-toast__status" aria-hidden="true"></span>

              <div class="frame-toast__content">
                <h2 class="frame-toast__title">Title-only toast</h2>
              </div>

              <button class="frame-toast__close" type="button" aria-label="Dismiss notification" data-token-target="toast-close">
                <ng-icon name="tablerX" />
              </button>
            </article>
          </div>
        </div>
      }
    }
  `,
  styles: `
    .docs-toast-demo {
      display: grid;
      gap: 1rem;
      width: min(100%, 34rem);
      margin-inline: auto;
    }

    .docs-toast-actions {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 0.5rem;
    }

    .docs-toast-demo > button {
      justify-self: center;
    }

    .docs-toast-custom {
      --frame-toast-bg: color-mix(in srgb, var(--frame-primary) 10%, var(--frame-surface));
      --frame-toast-border: color-mix(in srgb, var(--frame-primary) 38%, var(--frame-border));
      --frame-toast-radius: var(--frame-radius-lg);
      --frame-toast-shadow: 0 24px 70px color-mix(in srgb, var(--frame-primary) 22%, transparent);
      --frame-toast-status-bg: var(--frame-primary);
      --frame-toast-action-bg: var(--frame-foreground);
      --frame-toast-action-color: var(--frame-background);
    }

    .docs-toast-inspector {
      display: flex;
      min-height: 12rem;
      align-items: center;
      justify-content: center;
    }

    .docs-toast-static-stack {
      display: grid;
      width: min(100%, var(--frame-toast-viewport-width));
      padding-block-end: var(--frame-toast-stack-depth);
    }

    .docs-toast-static-stack .frame-toast {
      grid-area: 1 / 1;
      transform-origin: center top;
    }

    .docs-toast-static-stack .frame-toast:first-child {
      z-index: 2;
    }

    .docs-toast-static-stack .frame-toast + .frame-toast {
      z-index: 1;
      transform: translateY(var(--frame-toast-stack-offset)) scale(calc(1 - var(--frame-toast-stack-scale-step)));
    }

    .docs-toast-inspector .frame-toast {
      width: min(100%, var(--frame-toast-viewport-width));
    }
  `,
})
export class DocsToastPreviewComponent {
  private readonly toast = inject(FrToastService);

  readonly config = input.required<ToastPreviewConfig>();

  protected readonly positions: FrToastPosition[] = [
    'top-left',
    'top-center',
    'top-right',
    'bottom-left',
    'bottom-center',
    'bottom-right',
  ];

  constructor() {
    effect(() => {
      this.config().mode;
      this.toast.dismissAll();
    });
  }

  protected showBasic(): void {
    this.toast.show('Workspace synced', {
      description: 'All local changes are now available on the server.',
    });
  }

  protected showVariant(variant: 'default' | 'success' | 'info' | 'warning' | 'error'): void {
    const messages = {
      default: 'Draft saved',
      success: 'Release promoted',
      info: 'Preview refreshed',
      warning: 'Storage almost full',
      error: 'Deploy failed',
    };

    this.toast.show(messages[variant], {
      variant,
      description: 'Use variants to communicate severity without changing the API shape.',
    });
  }

  protected showStack(): void {
    this.toast.dismissAll();
    this.toast.info('Import started', { duration: 0 });
    this.toast.success('Assets optimized', { duration: 0 });
    this.toast.warning('Two rows need review', { duration: 0 });
  }

  protected showAction(): void {
    this.toast.show('Comment archived', {
      description: 'You can restore it before leaving this page.',
      action: {
        label: 'Undo',
        handler: () => this.toast.success('Comment restored'),
      },
    });
  }

  protected showLoading(): void {
    const id = this.toast.loading('Uploading package', {
      description: 'This toast stays open while work is pending.',
    });

    window.setTimeout(() => {
      this.toast.update(id, {
        title: 'Package uploaded',
        description: 'The artifact is ready to attach to a release.',
        variant: 'success',
        loading: false,
        duration: 3200,
      });
    }, 1400);
  }

  protected showPinned(): void {
    this.toast.show('Manual review required', {
      description: 'This toast has no close button and can only be cleared from code.',
      duration: 0,
      dismissible: false,
      variant: 'warning',
    });
  }

  protected dismissAll(): void {
    this.toast.dismissAll();
  }

  protected showAt(position: FrToastPosition): void {
    this.toast.info(`Position: ${position}`, {
      position,
      description: 'The viewport groups messages by their requested edge.',
    });
  }

  protected showCustom(): void {
    this.toast.show('Styled locally', {
      description: 'Override toast tokens on an ancestor to brand a specific flow.',
      duration: 0,
      action: {
        label: 'Review',
      },
    });
  }

  protected showRtl(): void {
    this.toast.success('تم حفظ الإعدادات', {
      description: 'يدعم منفذ الإشعارات اتجاه النص من الحاوية المحيطة.',
    });
  }
}
