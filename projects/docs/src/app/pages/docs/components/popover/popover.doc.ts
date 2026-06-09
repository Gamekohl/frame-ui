import { ComponentDoc } from '../../shared/models/component-doc.model';
import { DocsPopoverPreviewComponent } from './previews/popover-preview';

const importsCode = `import { FrButtonModule } from '@frame-ui-ng/components/button';
import { FrInputModule } from '@frame-ui-ng/components/input';
import { FrPopoverModule } from '@frame-ui-ng/components/popover';`;

const basicHtml = `<frame-popover>
  <button frButton appearance="outline" [frPopoverTrigger]="panel" type="button">
    Open quick note
  </button>

  <ng-template #panel="frPopoverContent" frPopoverContent side="bottom" align="center">
    <div frPopoverPanel>
      <div frPopoverHeader>
        <h3 frPopoverTitle>Review reminder</h3>
        <p frPopoverDescription>
          Capture the next thing your team should check before publishing.
        </p>
      </div>
      <div frPopoverFooter>
        <button frButton appearance="outline" frPopoverClose type="button">Later</button>
        <button frButton frPopoverClose type="button">Mark done</button>
      </div>
    </div>
  </ng-template>
</frame-popover>`;

const alignHtml = `<div class="popover-align-demo">
  <frame-popover>
    <button frButton appearance="outline" [frPopoverTrigger]="startPanel" type="button">
      Start
    </button>
    <ng-template #startPanel="frPopoverContent" frPopoverContent side="bottom" align="start">
      <div frPopoverPanel>Start aligned content</div>
    </ng-template>
  </frame-popover>

  <frame-popover>
    <button frButton appearance="outline" [frPopoverTrigger]="endPanel" type="button">
      End
    </button>
    <ng-template #endPanel="frPopoverContent" frPopoverContent side="bottom" align="end">
      <div frPopoverPanel>End aligned content</div>
    </ng-template>
  </frame-popover>
</div>`;

const formHtml = `<frame-popover>
  <button frButton appearance="outline" [frPopoverTrigger]="formPanel" type="button">
    Edit project
  </button>

  <ng-template #formPanel="frPopoverContent" frPopoverContent>
    <div frPopoverPanel>
      <div frPopoverHeader>
        <h3 frPopoverTitle>Project details</h3>
        <p frPopoverDescription>Update the short label shown in dashboards.</p>
      </div>
      <div frPopoverBody>
        <label>
          <span>Name</span>
          <input frInput value="Launch notes" />
        </label>
        <label>
          <span>Owner</span>
          <input frInput value="Design team" />
        </label>
      </div>
      <div frPopoverFooter>
        <button frButton appearance="outline" frPopoverClose type="button">Cancel</button>
        <button frButton frPopoverClose type="button">Save</button>
      </div>
    </div>
  </ng-template>
</frame-popover>`;

const controlledTs = `import { signal } from '@angular/core';
${importsCode}

readonly open = signal(false);`;

const controlledHtml = `<button frButton appearance="outline" type="button" (click)="open.set(true)">
  Open controlled popover
</button>

<frame-popover [(open)]="open">
  <button frButton appearance="ghost" [frPopoverTrigger]="panel" type="button">
    Preferences
  </button>

  <ng-template #panel="frPopoverContent" frPopoverContent side="right" align="center">
    <div frPopoverPanel>
      <div frPopoverHeader>
        <h3 frPopoverTitle>Controlled state</h3>
        <p frPopoverDescription>The open signal can be changed from outside the trigger.</p>
      </div>
      <div frPopoverFooter>
        <button frButton frPopoverClose type="button">Close</button>
      </div>
    </div>
  </ng-template>
</frame-popover>`;

const customStylingCss = `.review-popover-trigger {
  --frame-popover-content-width: 22rem;
  --frame-popover-content-radius: 1.25rem;
  --frame-popover-content-bg: linear-gradient(
    135deg,
    var(--frame-surface),
    color-mix(in srgb, var(--frame-primary) 10%, var(--frame-surface))
  );
  --frame-popover-content-shadow: 0 26px 80px color-mix(in srgb, var(--frame-primary) 20%, transparent);
  --frame-popover-title-color: var(--frame-primary);
}`;

const rtlHtml = `<div dir="rtl">
  <frame-popover>
    <button frButton appearance="outline" [frPopoverTrigger]="panel" type="button">
      إعدادات العرض
    </button>

    <ng-template #panel="frPopoverContent" frPopoverContent side="bottom" align="end">
      <div frPopoverPanel>
        <div frPopoverHeader>
          <h3 frPopoverTitle>خيارات سريعة</h3>
          <p frPopoverDescription>يدعم المحتوى اتجاه النص من اليمين إلى اليسار.</p>
        </div>
        <div frPopoverFooter>
          <button frButton frPopoverClose type="button">تم</button>
        </div>
      </div>
    </ng-template>
  </frame-popover>
</div>`;

export const POPOVER_DOC: ComponentDoc = {
  slug: 'popover',
  breadcrumb: 'Components / Popover',

  hero: {
    id: 'popover-hero',
    title: 'Preview',
    description: 'Displays rich, dismissible content in an overlay anchored to a trigger.',
    preview: {
      component: DocsPopoverPreviewComponent,
    },
  },

  installation: {
    cli: {
      language: 'bash',
      code: 'npx your-cli add popover',
    },
    manual: {
      steps: [
        {
          title: 'Import the popover primitives your template needs.',
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
    { language: 'html', code: basicHtml },
  ],

  composition: `Popover
├── PopoverTrigger
└── PopoverContent
    └── PopoverPanel
        ├── PopoverHeader
        │   ├── PopoverTitle
        │   └── PopoverDescription
        ├── PopoverBody
        └── PopoverFooter`,

  tokenInspector: {
    id: 'popover-tokens',
    title: 'Token Inspector',
    description: 'Inspect the popover panel, header, title, description, body, footer, and close affordance.',
    preview: {
      component: DocsPopoverPreviewComponent,
      inputs: {
        config: { mode: 'inspector' },
      },
      inspectorLayout: 'popover',
      inspectorTargets: [
        {
          id: 'panel',
          label: 'Panel',
          selector: '[data-token-target="popover-panel"]',
          description: 'The panel controls width, padding, surface, border, radius, shadow, spacing, and motion.',
          tokens: [
            '--frame-popover-content-width',
            '--frame-popover-content-padding',
            '--frame-popover-content-radius',
            '--frame-popover-content-bg',
            '--frame-popover-content-color',
            '--frame-popover-content-border',
            '--frame-popover-content-shadow',
            '--frame-popover-content-gap',
            '--frame-popover-motion-duration',
            '--frame-popover-motion-easing',
            '--frame-popover-motion-distance',
            '--frame-popover-motion-scale',
          ],
        },
        {
          id: 'header',
          label: 'Header',
          selector: '[data-token-target="popover-header"]',
          description: 'Header tokens tune the rhythm between title and supporting description.',
          tokens: ['--frame-popover-header-gap'],
        },
        {
          id: 'title',
          label: 'Title',
          selector: '[data-token-target="popover-title"]',
          description: 'Title tokens define the primary heading treatment.',
          tokens: [
            '--frame-popover-title-color',
            '--frame-popover-title-font-size',
            '--frame-popover-title-font-weight',
          ],
        },
        {
          id: 'description',
          label: 'Description',
          selector: '[data-token-target="popover-description"]',
          description: 'Description tokens style supporting explanatory text.',
          tokens: ['--frame-popover-description-color', '--frame-popover-description-font-size'],
        },
        {
          id: 'body',
          label: 'Body',
          selector: '[data-token-target="popover-body"]',
          description: 'Body tokens control spacing for custom content such as forms.',
          tokens: ['--frame-popover-body-gap'],
        },
        {
          id: 'footer',
          label: 'Footer',
          selector: '[data-token-target="popover-footer"]',
          description: 'Footer tokens control action spacing.',
          tokens: ['--frame-popover-footer-gap'],
        },
        {
          id: 'close',
          label: 'Close',
          selector: '[data-token-target="popover-close"]',
          description: 'Close tokens cover focusable close affordances inside the popover.',
          tokens: ['--frame-popover-close-radius', '--frame-popover-close-hover-bg'],
        },
      ],
    },
  },

  styling: {
    description:
      'Override popover tokens on the trigger or an ancestor to customize panel width, surface, radius, shadow, text, and motion.',
    preview: {
      id: 'custom-styling-preview',
      title: 'Custom Styling Preview',
      description: 'This preview uses a warmer panel surface, larger radius, and primary-colored title.',
      preview: {
        component: DocsPopoverPreviewComponent,
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
          code: `<frame-popover class="review-popover-trigger">
  <button frButton [frPopoverTrigger]="panel" type="button">
  Review status
  </button>

  <ng-template #panel="frPopoverContent" frPopoverContent>
    <div frPopoverPanel>
      <div frPopoverHeader>
        <h3 frPopoverTitle>Review status</h3>
        <p frPopoverDescription>Check the warmer panel surface and rounded corners.</p>
      </div>
    </div>
  </ng-template>
</frame-popover>`,
        },
        {
          language: 'css',
          code: customStylingCss,
        },
      ],
    },
  },

  examples: [
    {
      id: 'popover-basic',
      title: 'Basic',
      description: 'Use a trigger and content template to show dismissible rich content.',
      preview: {
        component: DocsPopoverPreviewComponent,
      },
      code: [
        { language: 'ts', code: importsCode },
        { language: 'html', code: basicHtml },
      ],
    },
    {
      id: 'popover-align',
      title: 'Align',
      description: 'Use the content alignment input to align the panel with the trigger edge or center.',
      preview: {
        component: DocsPopoverPreviewComponent,
        inputs: { config: { mode: 'align' } },
      },
      code: [
        { language: 'ts', code: importsCode },
        { language: 'html', code: alignHtml },
      ],
    },
    {
      id: 'popover-form',
      title: 'With Form',
      description: 'Place form fields and actions inside the popover body and footer.',
      preview: {
        component: DocsPopoverPreviewComponent,
        inputs: { config: { mode: 'form' } },
      },
      code: [
        { language: 'ts', code: importsCode },
        { language: 'html', code: formHtml },
      ],
    },
    {
      id: 'popover-controlled',
      title: 'Controlled',
      description: 'Bind the open state when the popover should also be opened from elsewhere in the UI.',
      preview: {
        component: DocsPopoverPreviewComponent,
        inputs: { config: { mode: 'controlled' } },
      },
      code: [
        { language: 'ts', code: controlledTs },
        { language: 'html', code: controlledHtml },
      ],
    },
    {
      id: 'popover-rtl',
      title: 'RTL support',
      description: 'Popover content inherits document direction and supports aligned RTL placement.',
      preview: {
        component: DocsPopoverPreviewComponent,
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
    'Popover defines tokens for the overlay surface, header rhythm, title and description text, body and footer spacing, close affordances, and entry motion.',
  tokens: `
  --frame-popover-content-width: 20rem;
  --frame-popover-content-padding: 1rem;
  --frame-popover-content-radius: var(--frame-radius-md);
  --frame-popover-content-bg: var(--frame-surface);
  --frame-popover-content-color: var(--frame-surface-foreground);
  --frame-popover-content-border: var(--frame-border);
  --frame-popover-content-shadow: var(--frame-shadow-md);
  --frame-popover-content-gap: 0.875rem;
  --frame-popover-header-gap: 0.25rem;
  --frame-popover-title-color: var(--frame-foreground);
  --frame-popover-title-font-size: 0.875rem;
  --frame-popover-title-font-weight: 600;
  --frame-popover-description-color: var(--frame-muted-foreground);
  --frame-popover-description-font-size: 0.875rem;
  --frame-popover-body-gap: 0.75rem;
  --frame-popover-footer-gap: 0.5rem;
  --frame-popover-close-radius: var(--frame-radius-sm);
  --frame-popover-close-hover-bg: var(--frame-accent);
  --frame-popover-motion-duration: 140ms;
  --frame-popover-motion-distance: 0.25rem;
  --frame-popover-motion-scale: 0.96;
  `,
};

