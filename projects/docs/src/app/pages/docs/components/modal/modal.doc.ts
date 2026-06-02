import { ComponentDoc } from '../../shared/models/component-doc.model';
import { DocsModalPreviewComponent } from './previews/modal-preview';

const importsCode = `import { FrModalModule, FrModalService } from '@frame-ui/components/modal';`;
const triggerImportsCode = `import { FrButtonModule } from '@frame-ui/components/button';
${importsCode}`;

const customStylingConfig = {
  className: 'modal-brand-demo flex min-h-48 w-full items-center justify-center rounded-3xl border p-8',
  style: `--frame-modal-bg: color-mix(in srgb, var(--frame-background) 88%, var(--frame-primary));
--frame-modal-border: color-mix(in srgb, var(--frame-primary) 36%, var(--frame-border));
--frame-modal-radius: 1.25rem;
--frame-modal-padding: 1.75rem;
--frame-modal-shadow: 0 32px 100px rgb(0 0 0 / 0.26), 0 0 0 1px color-mix(in srgb, var(--frame-primary) 16%, transparent);
--frame-modal-close-hover-bg: color-mix(in srgb, var(--frame-primary) 12%, transparent);
--frame-modal-close-hover-color: var(--frame-primary);`,
};

export const MODAL_DOC: ComponentDoc = {
  slug: 'modal',
  breadcrumb: 'Components / Modal',

  hero: {
    id: 'modal-hero',
    title: 'Preview',
    preview: {
      component: DocsModalPreviewComponent,
    },
  },

  installation: {
    cli: {
      language: 'bash',
      code: 'npx your-cli add modal',
    },
    manual: {
      steps: [
        {
          title:
            'Import the modal primitives you need for the trigger, panel, layout, and close controls.',
          code: {
            language: 'ts',
            code: importsCode,
          },
        },
      ],
    },
  },

  usage: [
    {
      language: 'ts',
      code: triggerImportsCode,
    },
    {
      language: 'html',
      code: `<button frButton [frModalTrigger]="modal">Open modal</button>

<ng-template #modal="frModalContent" frModalContent aria-label="Workspace settings">
  <div frModalPanel>
    <div frModalHeader>
      <h2 frModalTitle>Workspace settings</h2>
      <p frModalDescription>Make focused changes without leaving the current page.</p>
    </div>

    <div frModalBody>
      Modal content goes here.
    </div>

    <div frModalFooter>
      <button frButton appearance="outline" frModalClose>Cancel</button>
      <button frButton [frModalClose]="'saved'">Save changes</button>
    </div>
  </div>
</ng-template>`,
    },
    {
      language: 'ts',
      code: `@Component({
  selector: 'app-settings-modal-body',
  template: \`<p>{{ summary }}</p>\`,
})
class SettingsModalBodyComponent {
  summary = input('This content is rendered from a dedicated body component.');
}

readonly modal = inject(FrModalService);

openFromCode(): void {
  this.modal.open(SettingsModalBodyComponent, {
    ariaLabel: 'Workspace settings',
    bodyInputs: {
      summary: 'Review the generated workspace settings before saving.',
    },
    description: 'The shell is configured through FrModalConfig.',
    footerActions: [
      { appearance: 'outline', label: 'Cancel', result: 'cancel' },
      { label: 'Save changes', result: 'saved' },
    ],
    title: 'Workspace settings',
    width: '32rem',
  });
}`,
    },
  ],

  tokenInspector: {
    id: 'token-inspector',
    title: 'Token inspector',
    description:
      'Hover the modal surface, header, title, description, body, or footer to inspect the tokens that shape the dialog composition.',
    preview: {
      component: DocsModalPreviewComponent,
      inputs: {
        config: {
          className: 'flex min-h-96 w-full items-center justify-center p-8',
          mode: 'inline',
          tokenPrefix: 'modal',
        },
      },
      inspectorTargets: [
        {
          id: 'panel',
          label: 'Panel',
          selector: '[data-token-target="modal-panel"]',
          description:
            'The panel controls the modal surface, radius, border, shadow, spacing, and animation target.',
          tokens: [
            '--frame-modal-bg',
            '--frame-modal-border',
            '--frame-modal-color',
            '--frame-modal-radius',
            '--frame-modal-shadow',
            '--frame-modal-gap',
            '--frame-modal-padding',
          ],
        },
        {
          id: 'title',
          label: 'Title',
          selector: '[data-token-target="modal-title"]',
          description:
            'Modal title text inherits the modal foreground color and establishes the dialog purpose.',
          tokens: ['--frame-modal-color'],
        },
        {
          id: 'description',
          label: 'Description',
          selector: '[data-token-target="modal-description"]',
          description: 'Descriptions use a quieter modal text color for supporting context.',
          tokens: ['--frame-modal-muted-color'],
        },
        {
          id: 'body',
          label: 'Body',
          selector: '[data-token-target="modal-body"]',
          description: 'The body is the scroll container when the panel is marked scrollable.',
          tokens: ['--frame-modal-padding', '--frame-modal-gap'],
        },
        {
          id: 'footer',
          label: 'Footer',
          selector: '[data-token-target="modal-footer"]',
          description:
            'The footer inherits modal spacing and can become a persistent action area for long content.',
          tokens: ['--frame-modal-padding', '--frame-modal-border', '--frame-modal-bg'],
        },
      ],
    },
  },

  styling: {
    description:
      'Override modal tokens on a local wrapper when a product flow needs a branded surface, stronger radius, or more prominent elevation without replacing the CDK Dialog foundation.',
    preview: {
      id: 'custom-styling-preview',
      title: 'Custom Styling Preview',
      description:
        'This preview applies local modal overrides for surface color, border, radius, spacing, shadow, and close-button hover treatment.',
      preview: {
        component: DocsModalPreviewComponent,
        inputs: {
          config: customStylingConfig,
        },
      },
      code: [
        {
          language: 'ts',
          code: triggerImportsCode,
        },
        {
          language: 'html',
          code: `<div class="modal-brand-demo">
  <button frButton [frModalTrigger]="modal">Open modal</button>

  <ng-template #modal="frModalContent" frModalContent>
    <div frModalPanel>
      <!-- header, body, and footer -->
    </div>
  </ng-template>
</div>`,
        },
        {
          language: 'css',
          code: `.modal-brand-demo {
${customStylingConfig.style}
}`,
        },
      ],
    },
  },

  examples: [
    {
      id: 'basic',
      title: 'Basic',
      description:
        'Use a trigger and a template-backed content block for the common modal composition.',
      preview: {
        component: DocsModalPreviewComponent,
      },
      code: [
        {
          language: 'ts',
          code: triggerImportsCode,
        },
        {
          language: 'html',
          code: `<button frButton type="button" [frModalTrigger]="modal">
  Open modal
</button>

<ng-template #modal="frModalContent" frModalContent aria-label="Workspace settings">
  <div frModalPanel>
    <div frModalHeader>
      <h2 frModalTitle>Workspace settings</h2>
      <p frModalDescription>A composable modal built on top of Angular CDK Dialog.</p>
    </div>

    <div frModalBody>
      Configure a focused workflow without sending people to a new route.
    </div>

    <div frModalFooter>
      <button frButton appearance="outline" type="button" frModalClose>Cancel</button>
      <button frButton type="button" [frModalClose]="'saved'">Save changes</button>
    </div>
  </div>
</ng-template>`,
        },
      ],
    },
    {
      id: 'programmatic',
      title: 'Programmatic open',
      description:
        'Inject FrModalService when a modal needs to open from application logic instead of a direct trigger.',
      preview: {
        component: DocsModalPreviewComponent,
        inputs: {
          config: { mode: 'programmatic' },
        },
      },
      code: [
        {
          language: 'ts',
          code: `import { TemplateRef, inject, viewChild } from '@angular/core';
import { FrButtonModule } from '@frame-ui/components/button';
${importsCode}

private readonly modal = inject(FrModalService);
private readonly programmaticModal = viewChild.required<TemplateRef<unknown>>('programmaticModal');

openProgrammatic(): void {
  this.modal.open(this.programmaticModal(), {
    ariaLabel: 'Programmatic workspace settings',
    width: '32rem',
  });
}`,
        },
        {
          language: 'html',
          code: `<button frButton type="button" (click)="openProgrammatic()">
  Open from code
</button>

<ng-template #programmaticModal>
  <div frModalPanel>
    <div frModalHeader>
      <h2 frModalTitle>Programmatic workspace settings</h2>
      <p frModalDescription>Opened from application logic with FrModalService.</p>
    </div>

    <div frModalFooter>
      <button frButton appearance="outline" type="button" frModalClose>Cancel</button>
      <button frButton type="button" [frModalClose]="'saved'">Save changes</button>
    </div>
  </div>
</ng-template>`,
        },
      ],
    },
    {
      id: 'no-close',
      title: 'Without default close button',
      description:
        'Set showCloseButton to false when users should choose an explicit footer action.',
      preview: {
        component: DocsModalPreviewComponent,
        inputs: {
          config: { mode: 'no-close' },
        },
      },
      code: [
        {
          language: 'ts',
          code: triggerImportsCode,
        },
        {
          language: 'html',
          code: `<ng-template #modal="frModalContent" frModalContent>
  <div frModalPanel [showCloseButton]="false">
    <div frModalHeader>
      <h2 frModalTitle>Confirm deployment</h2>
      <p frModalDescription>Omit the default close button when the action needs an explicit choice.</p>
    </div>

    <div frModalFooter>
      <button frButton appearance="outline" type="button" frModalClose>Cancel</button>
      <button frButton type="button" [frModalClose]="'confirmed'">Confirm</button>
    </div>
  </div>
</ng-template>`,
        },
      ],
    },
    {
      id: 'disable-close',
      title: 'Disable outside close',
      description:
        'Set disableClose on the content template when backdrop clicks should be ignored and the modal must be closed through explicit controls.',
      preview: {
        component: DocsModalPreviewComponent,
        inputs: {
          config: { mode: 'disable-close' },
        },
      },
      code: [
        {
          language: 'ts',
          code: triggerImportsCode,
        },
        {
          language: 'html',
          code: `<button frButton type="button" [frModalTrigger]="modal">
  Open guarded modal
</button>

<ng-template #modal="frModalContent" frModalContent disableClose>
  <div frModalPanel>
    <div frModalHeader>
      <h2 frModalTitle>Unsaved changes</h2>
      <p frModalDescription>
        Backdrop clicks are ignored, so users must choose one of the explicit controls.
      </p>
    </div>

    <div frModalFooter>
      <button frButton appearance="outline" type="button" frModalClose>Cancel</button>
      <button frButton type="button" [frModalClose]="'saved'">Save changes</button>
    </div>
  </div>
</ng-template>`,
        },
      ],
    },
    {
      id: 'scrollable',
      title: 'Scrollable with sticky footer',
      description:
        'Enable scrollable and stickyFooter on the panel for longer content while keeping actions visible.',
      preview: {
        component: DocsModalPreviewComponent,
        inputs: {
          config: { mode: 'scrollable' },
        },
      },
      code: [
        {
          language: 'ts',
          code: triggerImportsCode,
        },
        {
          language: 'html',
          code: `<ng-template #modal="frModalContent" frModalContent>
  <div frModalPanel size="lg" scrollable stickyFooter>
    <div frModalHeader>
      <h2 frModalTitle>Workspace settings</h2>
      <p frModalDescription>Use a scrollable body with a persistent footer for longer workflows.</p>
    </div>

    <div frModalBody>
      <!-- Long content scrolls here. -->
    </div>

    <div frModalFooter>
      <button frButton appearance="outline" type="button" frModalClose>Cancel</button>
      <button frButton type="button">Save changes</button>
    </div>
  </div>
</ng-template>`,
        },
        {
          language: 'css',
          code: `.settings-modal {
  --frame-modal-scrollable-height: min(calc(100dvh - 2rem), 28rem);
}`,
        },
      ],
    },
  ],

  tokensTitle: 'Design Tokens',
  tokensDescription:
    'Use these CSS custom properties to tune the modal surface, backdrop, spacing, radius, shadow, and close affordance.',
  tokens: `
  --frame-modal-backdrop-blur: 3px;
  --frame-modal-backdrop-bg: rgb(0 0 0 / 0.52);
  --frame-modal-bg: var(--frame-background);
  --frame-modal-border: var(--frame-border);
  --frame-modal-color: var(--frame-foreground);
  --frame-modal-muted-color: var(--frame-muted-foreground);
  --frame-modal-radius: var(--frame-radius-lg);
  --frame-modal-shadow: 0 24px 80px rgb(0 0 0 / 0.18), 0 8px 24px rgb(0 0 0 / 0.12);
  --frame-modal-padding: 1.5rem;
  --frame-modal-gap: 1rem;
  --frame-modal-scrollable-height: min(calc(100dvh - 2rem), 28rem);
  --frame-modal-close-bg: transparent;
  --frame-modal-close-color: var(--frame-muted-foreground);
  --frame-modal-close-hover-bg: var(--frame-muted);
  --frame-modal-close-hover-color: var(--frame-foreground);
  --frame-modal-z-index: 1000;
  `,
};


