import { ComponentDoc } from '../../shared/models/component-doc.model';
import { DocsConfirmModalPreviewComponent } from './previews/confirm-modal-preview';

const importsCode = `import { FrConfirmModalModule, FrConfirmModalService } from '@frame-ui-ng/components/confirm-modal';`;
const usageImportsCode = `import { Component, inject } from '@angular/core';
import { FrButtonModule } from '@frame-ui-ng/components/button';
import { FrConfirmModalModule } from '@frame-ui-ng/components/confirm-modal';`;

const basicTs = `shipRelease(): void {
  // Continue with the confirmed action.
}`;

const basicHtml = `<button
  frButton
  type="button"
  [frConfirmModal]="{
    title: 'Ship release?',
    description: 'This will notify everyone watching the release channel.'
  }"
  (frConfirmModalConfirmed)="shipRelease()"
>
  Ship release
</button>`;

const programmaticTs = `readonly confirmModal = inject(FrConfirmModalService);

confirmRelease(): void {
  const modalRef = this.confirmModal.open({
    title: 'Ship release?',
    description: 'This will notify everyone watching the release channel.',
  });

  modalRef.closed.subscribe((result) => {
    if (result === 'confirm') {
      this.shipRelease();
    }
  });
}`;

const customLabelsHtml = `<button
  frButton
  type="button"
  frConfirmModalTitle="Archive workspace?"
  frConfirmModalDescription="Archived workspaces are hidden from the team but can be restored later."
  frConfirmModalCancelLabel="Keep workspace"
  frConfirmModalConfirmLabel="Archive"
  (frConfirmModalConfirmed)="archiveWorkspace()"
>
  Archive workspace
</button>`;

const customLabelsTs = `this.confirmModal.open({
  title: 'Archive workspace?',
  description: 'Archived workspaces are hidden from the team but can be restored later.',
  cancelLabel: 'Keep workspace',
  confirmLabel: 'Archive',
});`;

export const CONFIRM_MODAL_DOC: ComponentDoc = {
  slug: 'confirm-modal',
  breadcrumb: 'Components / Confirm Modal',

  hero: {
    id: 'confirm-modal-hero',
    title: 'Preview',
    preview: {
      component: DocsConfirmModalPreviewComponent,
    },
  },

  installation: {
    cli: {
      language: 'bash',
      code: 'npx your-cli add confirm-modal',
    },
    manual: {
      steps: [
        {
          title: 'Import the confirm modal trigger module or inject the service for programmatic flows.',
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
      code: usageImportsCode,
    },
    {
      language: 'ts',
      code: basicTs,
    },
    {
      language: 'html',
      code: basicHtml,
    },
  ],

  tokenInspector: {
    id: 'token-inspector',
    title: 'Token inspector',
    description:
      'Confirm modal inherits the modal surface tokens, so it can be themed together with every other dialog.'
  },

  examples: [
    {
      id: 'basic',
      title: 'Basic',
      description:
        'Open a typed confirmation flow from code and react only when the user chooses the confirm action.',
      preview: {
        component: DocsConfirmModalPreviewComponent,
      },
      code: [
        {
          language: 'html',
          code: basicHtml,
        },
        {
          language: 'ts',
          code: basicTs,
        },
      ],
    },
    {
      id: 'programmatic',
      title: 'Programmatic',
      description:
        'Inject the service when the confirmation should be opened from application logic instead of a direct trigger.',
      preview: {
        component: DocsConfirmModalPreviewComponent,
      },
      code: [
        {
          language: 'ts',
          code: programmaticTs,
        },
      ],
    },
    {
      id: 'custom-labels',
      title: 'Custom Labels',
      description:
        'Adjust the title, description, and action copy to match the consequence of the decision.',
      preview: {
        component: DocsConfirmModalPreviewComponent,
        inputs: {
          config: { mode: 'custom-labels' },
        },
      },
      code: [
        {
          language: 'html',
          code: customLabelsHtml,
        },
        {
          language: 'ts',
          code: customLabelsTs,
        },
      ],
    },
  ],
  tokensTitle: 'Design Tokens',
  tokensDescription:
    'Confirm modal reuses modal tokens so confirmation flows stay visually aligned with the rest of the overlay system.'
};
