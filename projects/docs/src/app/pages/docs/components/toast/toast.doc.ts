import { ComponentDoc } from '../../shared/models/component-doc.model';
import { DocsToastPreviewComponent } from './previews/toast-preview';

const importsCode = `import { FrToastModule, FrToastService } from '@frame-ui-ng/components/toast';`;

const basicTs = `import { inject } from '@angular/core';
${importsCode}

private readonly toast = inject(FrToastService);

notify(): void {
  this.toast.show('Workspace synced', {
    description: 'All local changes are now available on the server.',
  });
}`;

const viewportHtml = `<ng-template #toastCloseIcon>
  <ng-icon name="tablerX" />
</ng-template>

<frame-toast-viewport [closeIcon]="toastCloseIcon" />`;

const variantsTs = `this.toast.success('Release promoted');
this.toast.info('Preview refreshed');
this.toast.warning('Storage almost full');
this.toast.error('Deploy failed');`;

const actionTs = `this.toast.show('Comment archived', {
  description: 'You can restore it before leaving this page.',
  action: {
    label: 'Undo',
    handler: () => this.toast.success('Comment restored'),
  },
});`;

const loadingTs = `const id = this.toast.loading('Uploading package', {
  description: 'This toast stays open while work is pending.',
});

this.toast.update(id, {
  title: 'Package uploaded',
  description: 'The artifact is ready to attach to a release.',
  variant: 'success',
  loading: false,
  duration: 3200,
});`;

const dismissibleTs = `this.toast.show('Manual review required', {
  description: 'This toast has no close button.',
  duration: 0,
  dismissible: false,
  variant: 'warning',
});

this.toast.dismissAll();`;

const positionTs = `this.toast.info('Position: top-center', {
  position: 'top-center',
});`;

const customCss = `.branded-toasts {
  --frame-toast-bg: color-mix(in srgb, var(--frame-primary) 10%, var(--frame-surface));
  --frame-toast-border: color-mix(in srgb, var(--frame-primary) 38%, var(--frame-border));
  --frame-toast-radius: 1.25rem;
  --frame-toast-shadow: 0 24px 70px color-mix(in srgb, var(--frame-primary) 22%, transparent);
  --frame-toast-status-bg: var(--frame-primary);
  --frame-toast-action-bg: var(--frame-foreground);
  --frame-toast-action-color: var(--frame-background);
}`;

const tokens = `--frame-toast-viewport-inset: 1rem;
--frame-toast-viewport-width: min(100vw - 2rem, 26rem);
--frame-toast-stack-offset: 0.875rem;
--frame-toast-stack-depth: 2.25rem;
--frame-toast-stack-scale-step: 0.025;
--frame-toast-stack-expanded-gap: 0.75rem;
--frame-toast-stack-expanded-depth: 28rem;
--frame-toast-padding: 0.875rem;
--frame-toast-gap: 0.75rem;
--frame-toast-radius: var(--frame-radius-lg);
--frame-toast-bg: var(--frame-surface);
--frame-toast-color: var(--frame-foreground);
--frame-toast-border: var(--frame-border);
--frame-toast-shadow: 0 18px 45px rgb(0 0 0 / 0.14);
--frame-toast-title-font-size: 0.875rem;
--frame-toast-title-font-weight: 650;
--frame-toast-description-font-size: 0.8125rem;
--frame-toast-description-color: var(--frame-muted-foreground);
--frame-toast-status-size: 0.625rem;
--frame-toast-status-bg: var(--frame-muted-foreground);
--frame-toast-action-bg: var(--frame-primary);
--frame-toast-action-color: var(--frame-primary-foreground);
--frame-toast-action-hover-bg: color-mix(in srgb, var(--frame-primary) 88%, black);
--frame-toast-action-radius: var(--frame-radius-md);
--frame-toast-close-size: 1.75rem;
--frame-toast-close-icon-size: 1rem;
--frame-toast-close-color: var(--frame-muted-foreground);
--frame-toast-close-hover-bg: var(--frame-accent);
--frame-toast-motion-duration: 180ms;
--frame-toast-motion-easing: cubic-bezier(0.16, 1, 0.3, 1);
--frame-toast-stack-transition-duration: 220ms;
--frame-toast-stack-transition-easing: cubic-bezier(0.16, 1, 0.3, 1);`;

export const TOAST_DOC: ComponentDoc = {
  slug: 'toast',
  breadcrumb: 'Components / Toast',

  hero: {
    id: 'toast-hero',
    title: 'Preview',
    preview: {
      component: DocsToastPreviewComponent,
      inputs: {
        config: { mode: 'basic' },
      },
    },
  },

  installation: {
    cli: {
      language: 'bash',
      code: 'npx your-cli add toast',
    },
    manual: {
      steps: [
        {
          title: 'Import the toast viewport and service.',
          code: {
            language: 'ts',
            code: importsCode,
          },
        },
        {
          title: 'Place one viewport near the application root.',
          description:
            'The service can be injected anywhere. The viewport is responsible for rendering queued notifications.',
          code: {
            language: 'html',
            code: viewportHtml,
          },
        },
      ],
    },
  },

  usage: [
    {
      language: 'html',
      code: viewportHtml,
    },
    {
      language: 'ts',
      code: basicTs,
    },
  ],

  tokenInspector: {
    id: 'token-inspector',
    title: 'Token inspector',
    description:
      'Inspect the toast surface, status marker, content stack, text, action, and close affordance. The preview renders persistent static toast markup instead of firing live page-level notifications.',
    preview: {
      component: DocsToastPreviewComponent,
      containerClass: 'block',
      inputs: {
        config: { mode: 'inspector' },
      },
      inspectorTargets: [
        {
          id: 'root',
          label: 'Toast root',
          selector: '[data-token-target="toast-root"]',
          description:
            'The root controls the notification surface, border, radius, shadow, padding, and stack spacing.',
          tokens: [
            '--frame-toast-padding',
            '--frame-toast-gap',
            '--frame-toast-radius',
            '--frame-toast-bg',
            '--frame-toast-color',
            '--frame-toast-border',
            '--frame-toast-shadow',
            '--frame-toast-stack-offset',
            '--frame-toast-stack-depth',
            '--frame-toast-stack-scale-step',
            '--frame-toast-stack-expanded-gap',
            '--frame-toast-stack-expanded-depth',
            '--frame-toast-motion-duration',
            '--frame-toast-motion-easing',
            '--frame-toast-stack-transition-duration',
            '--frame-toast-stack-transition-easing',
          ],
        },
        {
          id: 'status',
          label: 'Status marker',
          selector: '[data-token-target="toast-status"]',
          description: 'The marker communicates variant state without relying only on the panel background.',
          tokens: ['--frame-toast-status-size', '--frame-toast-status-bg'],
        },
        {
          id: 'content',
          label: 'Content',
          selector: '[data-token-target="toast-content"]',
          description: 'The content stack keeps title and description aligned inside the notification.',
          tokens: ['--frame-toast-gap'],
        },
        {
          id: 'title',
          label: 'Title',
          selector: '[data-token-target="toast-title"]',
          description: 'Title tokens control the primary notification message.',
          tokens: ['--frame-toast-title-font-size', '--frame-toast-title-font-weight', '--frame-toast-color'],
        },
        {
          id: 'description',
          label: 'Description',
          selector: '[data-token-target="toast-description"]',
          description: 'Description tokens keep supporting copy quieter than the main title.',
          tokens: ['--frame-toast-description-font-size', '--frame-toast-description-color'],
        },
        {
          id: 'action',
          label: 'Action',
          selector: '[data-token-target="toast-action"]',
          description: 'Action tokens style the optional inline recovery or follow-up button.',
          tokens: [
            '--frame-toast-action-bg',
            '--frame-toast-action-color',
            '--frame-toast-action-hover-bg',
            '--frame-toast-action-radius',
          ],
        },
        {
          id: 'close',
          label: 'Close button',
          selector: '[data-token-target="toast-close"]',
          description: 'Close tokens style the dismiss affordance when a toast is dismissible.',
          tokens: [
            '--frame-toast-close-size',
            '--frame-toast-close-icon-size',
            '--frame-toast-close-color',
            '--frame-toast-close-hover-bg',
          ],
        },
      ],
    },
  },

  styling: {
    description:
      'Override toast tokens on the viewport or a wrapping element to brand one notification region without changing service calls.',
    preview: {
      id: 'custom-styling-preview',
      title: 'Custom Styling Preview',
      description: 'This preview applies local surface, border, status, action, and shadow tokens.',
      preview: {
        component: DocsToastPreviewComponent,
        inputs: {
          config: { mode: 'custom-styling' },
        },
      },
      code: [
        {
          language: 'ts',
          code: importsCode,
        },
        {
          language: 'html',
          code: `<ng-template #toastCloseIcon>
  <ng-icon name="tablerX" />
</ng-template>

<div class="branded-toasts">
  <frame-toast-viewport [closeIcon]="toastCloseIcon" />
</div>`,
        },
        {
          language: 'css',
          code: customCss,
        },
      ],
    },
  },

  examples: [
    {
      id: 'basic',
      title: 'Basic',
      description: 'Trigger a short notification from any component that can inject the service.',
      preview: {
        component: DocsToastPreviewComponent,
        inputs: {
          config: { mode: 'basic' },
        },
      },
      code: [
        { language: 'html', code: viewportHtml },
        { language: 'ts', code: basicTs },
      ],
    },
    {
      id: 'variants',
      title: 'Variants',
      description: 'Use semantic variants for neutral, success, info, warning, and error states.',
      preview: {
        component: DocsToastPreviewComponent,
        inputs: {
          config: { mode: 'variants' },
        },
      },
      code: [{ language: 'ts', code: variantsTs }],
    },
    {
      id: 'stackable',
      title: 'Card stack',
      description: 'Multiple calls layer into a compact card stack instead of replacing the previous message.',
      preview: {
        component: DocsToastPreviewComponent,
        inputs: {
          config: { mode: 'stack' },
        },
      },
      code: [
        {
          language: 'ts',
          code: `this.toast.info('Import started', { duration: 0 });
this.toast.success('Assets optimized', { duration: 0 });
this.toast.warning('Two rows need review', { duration: 0 });`,
        },
      ],
    },
    {
      id: 'action',
      title: 'Action',
      description: 'Attach one optional action for undo, retry, open, or review flows.',
      preview: {
        component: DocsToastPreviewComponent,
        inputs: {
          config: { mode: 'action' },
        },
      },
      code: [{ language: 'ts', code: actionTs }],
    },
    {
      id: 'loading',
      title: 'Loading',
      description: 'Create a persistent loading toast and update it when the async work completes.',
      preview: {
        component: DocsToastPreviewComponent,
        inputs: {
          config: { mode: 'loading' },
        },
      },
      code: [{ language: 'ts', code: loadingTs }],
    },
    {
      id: 'dismissible',
      title: 'Dismissible',
      description: 'Disable the close button for pinned notices and dismiss them from code.',
      preview: {
        component: DocsToastPreviewComponent,
        inputs: {
          config: { mode: 'dismissible' },
        },
      },
      code: [{ language: 'ts', code: dismissibleTs }],
    },
    {
      id: 'position',
      title: 'Position',
      description: 'Choose one of six viewport positions per toast.',
      preview: {
        component: DocsToastPreviewComponent,
        inputs: {
          config: { mode: 'position' },
        },
      },
      code: [{ language: 'ts', code: positionTs }],
    },
    {
      id: 'rtl',
      title: 'RTL',
      description: 'The toast viewport inherits text direction from its surrounding container.',
      preview: {
        component: DocsToastPreviewComponent,
        inputs: {
          config: { mode: 'rtl' },
        },
      },
      code: [
        {
          language: 'ts',
          code: importsCode,
        },
        {
          language: 'html',
          code: `<ng-template #toastCloseIcon>
  <ng-icon name="tablerX" />
</ng-template>

<div dir="rtl" lang="ar">
  <frame-toast-viewport [closeIcon]="toastCloseIcon" />
</div>`,
        },
      ],
    },
  ],

  tokensTitle: 'Design tokens',
  tokensDescription:
    'Toast tokens control viewport placement, stack rhythm, panel surface, text, actions, close button, variants, and motion.',
  tokens,
};
