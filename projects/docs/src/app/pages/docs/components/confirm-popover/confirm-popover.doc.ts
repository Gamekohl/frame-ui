import { ComponentDoc } from '../../shared/models/component-doc.model';
import { DocsConfirmPopoverPreviewComponent } from './previews/confirm-popover-preview';

const importsCode = `import { FrButtonModule } from '@frame-ui-ng/components/button';
import { FrConfirmPopoverModule } from '@frame-ui-ng/components/confirm-popover';`;

const basicTs = `shipRelease(): void {
  // Continue with the confirmed action.
}`;

const basicHtml = `<button
  frButton
  type="button"
  [frConfirmPopover]="{
    title: 'Ship release?',
    description: 'This will notify everyone watching the release channel.'
  }"
  (frConfirmPopoverConfirmed)="shipRelease()"
>
  <span frButtonLabel>Ship release</span>
</button>`;

const cardHtml = `<div
  class="workspace-card"
  role="button"
  tabindex="0"
  [frConfirmPopover]="{
    title: 'Archive workspace?',
    description: 'Archived workspaces disappear from the sidebar but can be restored later.',
    cancelLabel: 'Keep active',
    confirmLabel: 'Archive'
  }"
  (frConfirmPopoverConfirmed)="archiveWorkspace()"
>
  <span>Workspace</span>
  <strong>Design System</strong>
  <span>Click the card to confirm an archive action.</span>
</div>`;

const customLabelsHtml = `<button
  frButton
  appearance="outline"
  type="button"
  frConfirmPopoverTitle="Discard draft?"
  frConfirmPopoverDescription="Your local edits for this note will be removed."
  frConfirmPopoverCancelLabel="Keep editing"
  frConfirmPopoverConfirmLabel="Discard"
>
  <span frButtonLabel>Discard draft</span>
</button>`;

const positioningHtml = `<button
  frButton
  type="button"
  frConfirmPopover="Reset filters?"
  frConfirmPopoverDescription="The table will return to its default view."
  frConfirmPopoverSide="right"
  frConfirmPopoverAlign="start"
>
  <span frButtonLabel>Reset filters</span>
</button>`;

const rtlHtml = `<div dir="rtl">
  <button
    frButton
    appearance="outline"
    type="button"
    [frConfirmPopover]="{
      title: 'حذف العنصر؟',
      description: 'سيتم نقل العنصر إلى الأرشيف.',
      cancelLabel: 'إلغاء',
      confirmLabel: 'تأكيد',
      align: 'end'
    }"
  >
    <span frButtonLabel>فتح التأكيد</span>
  </button>
</div>`;

export const CONFIRM_POPOVER_DOC: ComponentDoc = {
  slug: 'confirm-popover',
  breadcrumb: 'Components / Confirm Popover',

  hero: {
    id: 'confirm-popover-hero',
    title: 'Preview',
    description:
      'Attaches a confirmation prompt to any trigger element while reusing the popover positioning and token system.',
    preview: {
      component: DocsConfirmPopoverPreviewComponent,
    },
  },

  installation: {
    cli: {
      language: 'bash',
      code: 'npx your-cli add confirm-popover',
    },
    manual: {
      steps: [
        {
          title: 'Import the confirm popover directive and any trigger primitives you use.',
          code: {
            language: 'ts',
            code: importsCode,
          },
        },
      ],
    },
  },

  usage: [
    { language: 'ts', code: importsCode },
    { language: 'ts', code: basicTs },
    { language: 'html', code: basicHtml },
  ],

  composition: `ConfirmPopover
└── Any host element with [frConfirmPopover]
    └── Popover-positioned confirmation panel
        ├── Title
        ├── Description
        └── Cancel / Confirm actions`,

  tokenInspector: {
    id: 'confirm-popover-tokens',
    title: 'Token Inspector',
    description:
      'Confirm popover inherits the popover surface tokens.'
  },

  examples: [
    {
      id: 'confirm-popover-basic',
      title: 'Basic',
      description: 'Attach the directive to a regular action and listen for the confirmed event.',
      preview: {
        component: DocsConfirmPopoverPreviewComponent,
      },
      code: [
        { language: 'ts', code: importsCode },
        { language: 'ts', code: basicTs },
        { language: 'html', code: basicHtml },
      ],
    },
    {
      id: 'confirm-popover-card-trigger',
      title: 'Any Trigger',
      description:
        'The directive can attach to cards, rows, icon buttons, or custom components. Non-native triggers should provide role and keyboard focus.',
      preview: {
        component: DocsConfirmPopoverPreviewComponent,
        inputs: { config: { mode: 'card' } },
      },
      code: [
        { language: 'ts', code: importsCode },
        { language: 'html', code: cardHtml },
      ],
    },
    {
      id: 'confirm-popover-custom-labels',
      title: 'Custom Labels',
      description: 'Override title, description, and action labels directly on the host.',
      preview: {
        component: DocsConfirmPopoverPreviewComponent,
        inputs: { config: { mode: 'custom-labels' } },
      },
      code: [
        { language: 'ts', code: importsCode },
        { language: 'html', code: customLabelsHtml },
      ],
    },
    {
      id: 'confirm-popover-positioning',
      title: 'Positioning',
      description: 'Use the same side and alignment language as popover for anchored placement.',
      preview: {
        component: DocsConfirmPopoverPreviewComponent,
        inputs: { config: { mode: 'positioning' } },
      },
      code: [
        { language: 'ts', code: importsCode },
        { language: 'html', code: positioningHtml },
      ],
    },
    {
      id: 'confirm-popover-rtl',
      title: 'RTL support',
      description: 'Confirmation content inherits direction and can align to the logical end edge.',
      preview: {
        component: DocsConfirmPopoverPreviewComponent,
        inputs: { config: { mode: 'rtl' } },
      },
      code: [
        { language: 'ts', code: importsCode },
        { language: 'html', code: rtlHtml },
      ],
    },
  ],

  tokensTitle: 'Design Tokens',
  tokensDescription:
    'Confirm popover inherits popover surface, typography, footer, and motion tokens.'
};
