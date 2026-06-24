import { ComponentDoc } from '../../shared/models/component-doc.model';
import { DocsSheetPreviewComponent } from './previews/sheet-preview';

const importsCode = `import { FrSheetModule } from '@frame-ui-ng/components/sheet';`;
const basicImportsCode = `import { FrButtonModule } from '@frame-ui-ng/components/button';
import { FrInputModule } from '@frame-ui-ng/components/input';
${importsCode}`;
const actionImportsCode = `import { FrButtonModule } from '@frame-ui-ng/components/button';
${importsCode}`;
const scrollableImportsCode = `import { FrButtonModule } from '@frame-ui-ng/components/button';
import { FrCardModule } from '@frame-ui-ng/components/card';
import { FrCheckboxModule } from '@frame-ui-ng/components/checkbox';
${importsCode}`;

const basicHtml = `<button frButton type="button" [frSheetTrigger]="sheet">
  <span frButtonLabel>Open sheet</span>
</button>

<ng-template #sheet="frSheetContent" frSheetContent aria-label="Workspace settings">
  <div frSheetPanel>
    <div frSheetHeader>
      <h2 frSheetTitle>Workspace settings</h2>
      <p frSheetDescription>Keep related controls close without leaving the page.</p>
    </div>

    <div frSheetBody>
      <label>
        <span>Workspace name</span>
        <input frInput value="Component library" />
      </label>
    </div>

    <div frSheetFooter>
      <button frButton appearance="outline" type="button" frSheetClose>
        <span frButtonLabel>Cancel</span>
      </button>
      <button frButton type="button" [frSheetClose]="'saved'">
        <span frButtonLabel>Save changes</span>
      </button>
    </div>
  </div>
</ng-template>`;

const sideHtml = `<button frButton type="button" [frSheetTrigger]="leftSheet">
  <span frButtonLabel>Open left sheet</span>
</button>

<ng-template #leftSheet="frSheetContent" frSheetContent aria-label="Left sheet">
  <div frSheetPanel side="left">
    <div frSheetHeader>
      <h2 frSheetTitle>Left sheet</h2>
      <p frSheetDescription>Sheets can enter from any screen edge.</p>
    </div>
  </div>
</ng-template>`;

const noCloseHtml = `<ng-template #sheet="frSheetContent" frSheetContent aria-label="Review export">
  <div frSheetPanel [showCloseButton]="false">
    <div frSheetHeader>
      <h2 frSheetTitle>Review export</h2>
      <p frSheetDescription>Users choose one of the footer actions.</p>
    </div>

    <div frSheetFooter>
      <button frButton appearance="outline" type="button" frSheetClose>
        <span frButtonLabel>Cancel</span>
      </button>
      <button frButton type="button" [frSheetClose]="'exported'">
        <span frButtonLabel>Export</span>
      </button>
    </div>
  </div>
</ng-template>`;

const scrollableHtml = `<ng-template #sheet="frSheetContent" frSheetContent aria-label="Filter activity">
  <div frSheetPanel scrollable>
    <div frSheetHeader>
      <h2 frSheetTitle>Filter activity</h2>
      <p frSheetDescription>Long content scrolls inside the sheet body.</p>
    </div>

    <div frSheetBody>
      <label frCard frCheckboxField spacing="sm">
        <span>
          <strong>Unread activity</strong>
          <small>Show only updates that have not been reviewed yet.</small>
        </span>
        <input frCheckbox type="checkbox" checked />
      </label>

      <label frCard frCheckboxField spacing="sm">
        <span>
          <strong>Assigned to me</strong>
          <small>Include tasks, reviews, and follow-ups where ownership is explicit.</small>
        </span>
        <input frCheckbox type="checkbox" checked />
      </label>

      <label frCard frCheckboxField spacing="sm">
        <span>
          <strong>Build failures</strong>
          <small>Keep failed checks visible while hiding passing automation noise.</small>
        </span>
        <input frCheckbox type="checkbox" checked />
      </label>

      <!-- Add more filter rows as needed. The sheet body owns the scroll. -->
    </div>

    <div frSheetFooter>
      <button frButton type="button" frSheetClose>
        <span frButtonLabel>Apply filters</span>
      </button>
    </div>
  </div>
</ng-template>`;

const programmaticTs = `import { TemplateRef, inject, viewChild } from '@angular/core';
import { FrButtonModule } from '@frame-ui-ng/components/button';
import { FrSheetService } from '@frame-ui-ng/components/sheet';
${importsCode}

private readonly sheet = inject(FrSheetService);
private readonly setupSheet = viewChild.required<TemplateRef<unknown>>('setupSheet');

openSetup(): void {
  this.sheet.open(this.setupSheet(), {
    ariaLabel: 'Generated setup',
    side: 'right',
  });
}`;

const programmaticHtml = `<button frButton type="button" (click)="openSetup()">
  <span frButtonLabel>Open generated setup</span>
</button>

<ng-template #setupSheet>
  <div frSheetPanel>
    <div frSheetHeader>
      <h2 frSheetTitle>Generated setup</h2>
      <p frSheetDescription>Review before applying.</p>
    </div>

    <div frSheetFooter>
      <button frButton appearance="outline" type="button" frSheetClose>
        <span frButtonLabel>Cancel</span>
      </button>
      <button frButton type="button" [frSheetClose]="'applied'">
        <span frButtonLabel>Apply setup</span>
      </button>
    </div>
  </div>
</ng-template>`;

const customCss = `.settings-launcher {
  --frame-sheet-bg: color-mix(in srgb, var(--frame-primary) 8%, var(--frame-background));
  --frame-sheet-border: color-mix(in srgb, var(--frame-primary) 30%, var(--frame-border));
  --frame-sheet-inline-size: min(100vw, 32rem);
}`;

const rtlHtml = `<div dir="rtl">
  <button frButton type="button" [frSheetTrigger]="sheet">
    <span frButtonLabel>فتح</span>
  </button>

  <ng-template #sheet="frSheetContent" frSheetContent direction="rtl" aria-label="إعدادات المساحة">
    <div frSheetPanel side="left">
      <div frSheetHeader>
        <h2 frSheetTitle>إعدادات المساحة</h2>
        <p frSheetDescription>تعمل اللوحة مع تخطيطات RTL.</p>
      </div>
    </div>
  </ng-template>
</div>`;

const tokens = `--frame-sheet-backdrop-blur: 2px;
--frame-sheet-backdrop-bg: rgb(0 0 0 / 0.5);
--frame-sheet-bg: var(--frame-background);
--frame-sheet-border: var(--frame-border);
--frame-sheet-color: var(--frame-foreground);
--frame-sheet-muted-color: var(--frame-muted-foreground);
--frame-sheet-shadow: 0 24px 80px rgb(0 0 0 / 0.2), 0 8px 24px rgb(0 0 0 / 0.14);
--frame-sheet-padding: 1.5rem;
--frame-sheet-gap: 1rem;
--frame-sheet-inline-size: min(100vw, 28rem);
--frame-sheet-block-size: min(100dvh, 28rem);
--frame-sheet-close-bg: transparent;
--frame-sheet-close-color: var(--frame-muted-foreground);
--frame-sheet-close-hover-bg: var(--frame-muted);
--frame-sheet-close-hover-color: var(--frame-foreground);
--frame-sheet-z-index: 1000;`;

export const SHEET_DOC: ComponentDoc = {
  slug: 'sheet',
  breadcrumb: 'Components / Sheet',

  hero: {
    id: 'sheet-hero',
    title: 'Preview',
    preview: {
      component: DocsSheetPreviewComponent,
      inputs: {
        config: { mode: 'basic' },
      },
    },
  },

  installation: {
    cli: {
      language: 'bash',
      code: 'npx your-cli add sheet',
    },
    manual: {
      steps: [
        {
          title: 'Import the sheet primitives you need.',
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
      code: basicImportsCode,
    },
    {
      language: 'html',
      code: basicHtml,
    },
  ],

  composition: `FrSheetTrigger
FrSheetContent
  FrSheetPanel
    FrSheetHeader
      FrSheetTitle
      FrSheetDescription
    FrSheetBody
    FrSheetFooter
      FrSheetClose`,

  tokenInspector: {
    id: 'token-inspector',
    title: 'Token inspector',
    description:
      'Open the sheet, then hover the trigger, panel, header, title, description, body, or footer to inspect the tokens behind each part.',
    preview: {
      component: DocsSheetPreviewComponent,
      containerClass: 'block',
      inputs: {
        config: { mode: 'basic', tokenPrefix: 'sheet' },
      },
      inspectorTargets: [
        {
          id: 'trigger',
          label: 'Trigger',
          selector: '[data-token-target="sheet-trigger"]',
          description: 'The trigger can inherit sheet custom properties that are copied into the overlay when opened.',
          tokens: ['--frame-sheet-bg', '--frame-sheet-border', '--frame-sheet-inline-size'],
        },
        {
          id: 'panel',
          label: 'Panel',
          selector: '[data-token-target="sheet-panel"]',
          description: 'The panel owns placement, surface, border, shadow, spacing, and edge-specific sizing.',
          tokens: [
            '--frame-sheet-bg',
            '--frame-sheet-border',
            '--frame-sheet-color',
            '--frame-sheet-shadow',
            '--frame-sheet-padding',
            '--frame-sheet-gap',
            '--frame-sheet-inline-size',
            '--frame-sheet-block-size',
            '--frame-sheet-z-index',
          ],
        },
        {
          id: 'header',
          label: 'Header',
          selector: '[data-token-target="sheet-header"]',
          description: 'The header inherits panel spacing and reserves space for the optional close button.',
          tokens: ['--frame-sheet-padding', '--frame-sheet-gap'],
        },
        {
          id: 'title',
          label: 'Title',
          selector: '[data-token-target="sheet-title"]',
          description: 'The title uses the sheet foreground token for high-contrast hierarchy.',
          tokens: ['--frame-sheet-color'],
        },
        {
          id: 'description',
          label: 'Description',
          selector: '[data-token-target="sheet-description"]',
          description: 'The description uses muted text for supporting context.',
          tokens: ['--frame-sheet-muted-color'],
        },
        {
          id: 'body',
          label: 'Body',
          selector: '[data-token-target="sheet-body"]',
          description: 'The body is the flexible content area and becomes scrollable when the panel is marked scrollable.',
          tokens: ['--frame-sheet-padding', '--frame-sheet-gap'],
        },
        {
          id: 'footer',
          label: 'Footer',
          selector: '[data-token-target="sheet-footer"]',
          description: 'The footer keeps sheet actions visually grouped at the end of the panel.',
          tokens: ['--frame-sheet-padding', '--frame-sheet-gap'],
        },
      ],
    },
  },

  styling: {
    description:
      'Override sheet tokens on a trigger, the panel, or an ancestor to tune the sheet surface, size, border, shadow, and spacing.',
    preview: {
      id: 'custom-styling-preview',
      title: 'Custom Styling Preview',
      description: 'This preview uses local token overrides for a larger, slightly tinted configuration sheet.',
      preview: {
        component: DocsSheetPreviewComponent,
        inputs: {
          config: { mode: 'custom-styling' },
        },
      },
      code: [
        {
          language: 'ts',
          code: actionImportsCode,
        },
        {
          language: 'html',
          code: `<button class="settings-launcher" frButton type="button" [frSheetTrigger]="sheet">
  <span frButtonLabel>Open sheet</span>
</button>

<ng-template #sheet="frSheetContent" frSheetContent aria-label="Settings">
  <div frSheetPanel>
    <div frSheetHeader>
      <h2 frSheetTitle>Settings</h2>
      <p frSheetDescription>Token overrides apply to this sheet surface.</p>
    </div>
  </div>
</ng-template>`,
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
      description: 'Use a sheet for contextual controls that should appear beside the current page instead of replacing it.',
      preview: {
        component: DocsSheetPreviewComponent,
        inputs: {
          config: { mode: 'basic' },
        },
      },
      code: [
        {
          language: 'ts',
          code: basicImportsCode,
        },
        {
          language: 'html',
          code: basicHtml,
        },
      ],
    },
    {
      id: 'side',
      title: 'Side',
      description: 'Use the side input to choose whether the sheet enters from the top, right, bottom, or left edge.',
      preview: {
        component: DocsSheetPreviewComponent,
        inputs: {
          config: { mode: 'side' },
        },
      },
      code: [
        {
          language: 'ts',
          code: actionImportsCode,
        },
        {
          language: 'html',
          code: sideHtml,
        },
      ],
    },
    {
      id: 'no-close',
      title: 'No Close Button',
      description: 'Hide the default close icon when the flow should resolve through explicit footer actions.',
      preview: {
        component: DocsSheetPreviewComponent,
        inputs: {
          config: { mode: 'no-close' },
        },
      },
      code: [
        {
          language: 'ts',
          code: actionImportsCode,
        },
        {
          language: 'html',
          code: noCloseHtml,
        },
      ],
    },
    {
      id: 'scrollable',
      title: 'Scrollable',
      description: 'Set scrollable when a sheet contains long content but should keep the panel dimensions stable.',
      preview: {
        component: DocsSheetPreviewComponent,
        inputs: {
          config: { mode: 'scrollable' },
        },
      },
      code: [
        {
          language: 'ts',
          code: scrollableImportsCode,
        },
        {
          language: 'html',
          code: scrollableHtml,
        },
      ],
    },
    {
      id: 'programmatic',
      title: 'Programmatic',
      description: 'Open a sheet from code and let FrSheetConfig provide the shell title, description, footer actions, side, and body component inputs.',
      preview: {
        component: DocsSheetPreviewComponent,
        inputs: {
          config: { mode: 'programmatic' },
        },
      },
      code: [
        {
          language: 'ts',
          code: programmaticTs,
        },
        {
          language: 'html',
          code: programmaticHtml,
        },
      ],
    },
    {
      id: 'rtl',
      title: 'RTL',
      description: 'Pass the CDK direction through the sheet content and use logical placement for RTL layouts.',
      preview: {
        component: DocsSheetPreviewComponent,
        inputs: {
          config: { mode: 'rtl' },
        },
      },
      code: [
        {
          language: 'ts',
          code: actionImportsCode,
        },
        {
          language: 'html',
          code: rtlHtml,
        },
      ],
    },
  ],

  tokensTitle: 'Design Tokens',
  tokensDescription:
    'Use these CSS custom properties to tune sheet backdrop, surface, sizing, spacing, close button states, and overlay layering.',
  tokens,
};

