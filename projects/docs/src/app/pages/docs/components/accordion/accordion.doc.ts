import { ComponentDoc } from '../../shared/models/component-doc.model';
import {
  AccordionPreviewConfig,
  DocsAccordionPreviewComponent,
} from './previews/accordion-preview';

const accordionImportsCode = `import { FrAccordionModule } from '@frame-ui-ng/components/accordion';`;

const heroConfig: AccordionPreviewConfig = {
  type: 'single',
  collapsible: true,
  defaultValue: 'section-two',
  border: false,
  className: 'docs-accordion-preview',
  items: [
    {
      value: 'section-one',
      trigger: 'Section One',
      content: 'Keep summary content compact so the row remains easy to scan.',
    },
    {
      value: 'section-two',
      trigger: 'Section Two',
      options: [
        { label: 'Option A', checked: true },
        { label: 'Option B' },
        { label: 'Option C' },
      ],
    },
    {
      value: 'section-three',
      trigger: 'Section Three',
      content: 'Use the last row for secondary information or follow-up controls.',
    },
  ],
};

const basicConfig: AccordionPreviewConfig = {
  type: 'single',
  collapsible: true,
  defaultValue: 'item-1',
  className: 'docs-accordion-preview',
  items: [
    {
      value: 'item-1',
      trigger: 'When should I use an accordion?',
      content:
        'Use an accordion when related details should stay available on the page without overwhelming the default layout.',
    },
    {
      value: 'item-2',
      trigger: 'What belongs inside each panel?',
      content:
        'Keep panel content concise and structured, such as helper text, metadata, or follow-up actions tied to the heading.',
    },
    {
      value: 'item-3',
      trigger: 'How many items should be open?',
      content:
        'Use single mode for tighter scanning flows, or multiple mode when people need to compare several sections at once.',
    },
  ],
};

const inspectorConfig: AccordionPreviewConfig = {
  type: 'single',
  collapsible: true,
  defaultValue: 'item-1',
  border: true,
  className: 'docs-accordion-preview w-full max-w-2xl',
  items: [
    basicConfig.items[0],
    {
      ...basicConfig.items[1],
      disabled: true
    },
    {
      ...basicConfig.items[2],
      disabled: true
    }
  ],
};

const multipleConfig: AccordionPreviewConfig = {
  type: 'multiple',
  defaultValue: ['notifications'],
  className: 'docs-accordion-preview',
  items: [
    {
      value: 'notifications',
      trigger: 'Display preferences',
      content:
        'Let people expand related controls together, like density, label visibility, and surface styling options.',
    },
    {
      value: 'privacy',
      trigger: 'Interaction settings',
      content:
        'Group keyboard behavior, disabled states, and nested actions when teams need a broader control surface.',
    },
    {
      value: 'billing',
      trigger: 'Content guidance',
      content:
        'Use parallel sections for writing rules, truncation guidance, and supporting text when documenting component behavior.',
    },
  ],
};

const borderedConfig: AccordionPreviewConfig = {
  type: 'single',
  collapsible: true,
  defaultValue: 'appearance',
  border: true,
  className: 'docs-accordion-preview',
  items: [
    {
      value: 'appearance',
      trigger: 'Use dividers between items',
      content:
        'Set border to true when each row should read as a distinct setting or when the accordion sits in a dense configuration panel.',
    },
    {
      value: 'layout',
      trigger: 'Remove borders in lighter layouts',
      content:
        'Set border to false when the accordion is already grouped by cards, spacing, or surrounding surfaces.',
    },
  ],
};

const customStylingConfig: AccordionPreviewConfig = {
  type: 'single',
  collapsible: true,
  defaultValue: 'contact',
  border: true,
  className: 'docs-accordion-preview',
  style: `--frame-accordion-item-border: color-mix(in srgb, var(--frame-primary) 18%, transparent);
--frame-accordion-item-radius: var(--frame-radius-md);
--frame-accordion-trigger-min-height: 3.5rem;
--frame-accordion-trigger-padding-x: 1rem;
--frame-accordion-trigger-color: red;
--frame-accordion-content-padding-inline: 1rem;
--frame-accordion-content-padding-bottom: 1.25rem;
--frame-accordion-content-color: var(--frame-primary);
--frame-accordion-icon-rotation: 135deg;`,
  items: [
    {
      value: 'contact',
      trigger: 'Support channels',
      content:
        'Route urgent issues to chat, send account questions by email, and reserve callbacks for verification-heavy requests.',
    },
    {
      value: 'availability',
      trigger: 'Coverage windows',
      content:
        'Surface operating hours, escalation rules, and after-hours handoff notes without sending people away from the page.',
    },
  ],
};

export const ACCORDION_DOC: ComponentDoc = {
  slug: 'accordion',
  breadcrumb: 'Components / Accordion',

  hero: {
    id: 'accordion-hero',
    title: 'Preview',
    preview: {
      component: DocsAccordionPreviewComponent,
      inputs: {
        config: heroConfig,
      },
    },
  },

  installation: {
    cli: {
      language: 'bash',
      code: 'npx your-cli add accordion',
    },
    manual: {
      steps: [
        {
          title: 'Import the accordion primitives into your component.',
          code: {
            language: 'ts',
            code: `import { FrAccordionModule } from '@frame-ui-ng/components/accordion';`,
          },
        },
        {
          title: 'Update the import paths to match your project setup.',
        },
      ],
    },
  },

  usage: [
    {
      language: 'ts',
      code: accordionImportsCode,
    },
    {
      language: 'html',
      code: `<frame-accordion type="single" collapsible [defaultValue]="'item-1'">
  <frame-accordion-item value="item-1">
    <button frameAccordionTrigger type="button">
      <span>Can the trigger include custom content?</span>
      <ng-icon frameAccordionIcon name="tablerChevronDown" size="18"></ng-icon>
    </button>

    <ng-template frameAccordionContent>
      Yes. Triggers can wrap labels, icons, counters, or other inline elements as long as the button stays clear and readable.
    </ng-template>
  </frame-accordion-item>
</frame-accordion>`,
    },
  ],

  tokenInspector: {
    id: 'token-inspector',
    title: 'Token inspector',
    description:
      'Hover the highlighted regions to see which accordion tokens control the trigger, content, border, and icon. Click a region to pin it while you inspect the current token values.',
    preview: {
      component: DocsAccordionPreviewComponent,
      containerClass: 'block',
      inputs: {
        config: inspectorConfig,
      },
      inspectorTargets: [
        {
          id: 'trigger-label',
          label: 'Trigger label',
          selector: '[data-token-target="trigger-label"]',
          description: 'The text label inherits the trigger typography and foreground styling.',
          tokens: [
            '--frame-accordion-trigger-color',
            '--frame-accordion-trigger-font-size',
            '--frame-accordion-trigger-font-weight',
          ],
        },
        {
          id: 'trigger',
          label: 'Trigger row',
          selector: '[data-token-target="trigger"]',
          description: 'The full trigger row controls spacing, height, and interactive alignment.',
          tokens: [
            '--frame-accordion-trigger-min-height',
            '--frame-accordion-trigger-padding-y',
            '--frame-accordion-trigger-padding-x',
            '--frame-accordion-trigger-gap',
          ],
        },
        {
          id: 'content',
          label: 'Expanded content',
          selector: '[data-token-target="content"]',
          description: 'The content panel exposes text color, padding, and motion-related tokens.',
          tokens: [
            '--frame-accordion-content-color',
            '--frame-accordion-content-padding-bottom',
            '--frame-accordion-content-padding-inline',
            '--frame-accordion-content-line-height',
            '--frame-accordion-content-motion-duration',
            '--frame-accordion-content-motion-timing',
          ],
        },
        {
          id: 'item-border',
          label: 'Item container',
          selector: '[data-token-target="item-border"]',
          description: 'Each item container defines the divider and corner treatment.',
          tokens: ['--frame-accordion-item-border', '--frame-accordion-item-radius'],
        },
        {
          id: 'icon',
          label: 'Icon',
          selector: '[data-token-target="icon"]',
          description: 'The icon tokens control size and open-state rotation behavior.',
          tokens: ['--frame-accordion-icon-size', '--frame-accordion-icon-rotation'],
        },
      ],
    },
  },

  styling: {
    description:
      'Customize the accordion by scoping design token overrides to a wrapper class. This keeps one-off treatments local while preserving the default component contract everywhere else.',
    preview: {
      id: 'custom-styling-preview',
      title: 'Custom Styling Preview',
      description:
        'This preview applies local token overrides to adjust spacing, color, radius, and icon rotation.',
      preview: {
        component: DocsAccordionPreviewComponent,
        inputs: {
          config: customStylingConfig,
        },
      },
      code: [
        {
          language: 'ts',
          code: accordionImportsCode,
        },
        {
          language: 'html',
          code: `<frame-accordion
  class="support-accordion"
  type="single"
  collapsible
  [defaultValue]="'contact'"
  border
>
  <frame-accordion-item value="contact">
    <button frameAccordionTrigger type="button">
      <span>Support channels</span>
      <ng-icon frameAccordionIcon name="tablerChevronDown" size="18"></ng-icon>
    </button>

    <ng-template frameAccordionContent>
      Route urgent issues to chat, send account questions by email, and reserve callbacks for verification-heavy requests.
    </ng-template>
  </frame-accordion-item>
</frame-accordion>`,
        },
        {
          language: 'css',
          code: `.support-accordion {
${customStylingConfig.style}
}`,
        },
      ],
    },
  },

  composition: `frame-accordion
├── frame-accordion-item
│   ├── button[frameAccordionTrigger]
│   └── ng-template[frameAccordionContent]
└── frame-accordion-item
    ├── button[frameAccordionTrigger]
    └── ng-template[frameAccordionContent]`,

  examples: [
    {
      id: 'basic',
      title: 'Basic',
      description: 'A single-select accordion with one expanded section by default.',
      preview: {
        component: DocsAccordionPreviewComponent,
        inputs: {
          config: basicConfig,
        },
      },
      code: [
        {
          language: 'ts',
          code: accordionImportsCode,
        },
        {
          language: 'html',
          code: `<frame-accordion type="single" collapsible [defaultValue]="'item-1'" class="docs-accordion-preview">
  <frame-accordion-item value="item-1">
    <button frameAccordionTrigger type="button">
      <span>When should I use an accordion?</span>
      <ng-icon frameAccordionIcon name="tablerChevronDown" size="18"></ng-icon>
    </button>

    <ng-template frameAccordionContent>
      Use an accordion when related details should stay available on the page without overwhelming the default layout.
    </ng-template>
  </frame-accordion-item>
</frame-accordion>`,
        },
      ],
    },
    {
      id: 'multiple',
      title: 'Multiple',
      description: 'Allow several related sections to remain expanded for side-by-side scanning.',
      preview: {
        component: DocsAccordionPreviewComponent,
        inputs: {
          config: multipleConfig,
        },
      },
      code: [
        {
          language: 'ts',
          code: accordionImportsCode,
        },
        {
          language: 'html',
          code: `<frame-accordion type="multiple" [defaultValue]="['notifications']" class="docs-accordion-preview">
  <frame-accordion-item value="notifications">
    <button frameAccordionTrigger type="button">
      <span>Display preferences</span>
      <ng-icon frameAccordionIcon name="tablerChevronDown" size="18"></ng-icon>
    </button>

    <ng-template frameAccordionContent>
      Let people expand related controls together, like density, label visibility, and surface styling options.
    </ng-template>
  </frame-accordion-item>
</frame-accordion>`,
        },
      ],
    },
    {
      id: 'borders',
      title: 'Borders',
      description:
        'Toggle the border input to switch between separated rows and a lighter, borderless presentation.',
      preview: {
        component: DocsAccordionPreviewComponent,
        inputs: {
          config: borderedConfig,
        },
      },
      code: [
        {
          language: 'ts',
          code: accordionImportsCode,
        },
        {
          language: 'html',
          code: `<frame-accordion type="single" collapsible [defaultValue]="'appearance'" border>
  <frame-accordion-item value="appearance">
    <button frameAccordionTrigger type="button">
      <span>Use dividers between items</span>
      <ng-icon frameAccordionIcon name="tablerChevronDown" size="18"></ng-icon>
    </button>

    <ng-template frameAccordionContent>
      Turn borders on when each item should read as a distinct row.
    </ng-template>
  </frame-accordion-item>
</frame-accordion>

<frame-accordion type="single" collapsible [defaultValue]="'appearance'">
  <frame-accordion-item value="appearance">
    <button frameAccordionTrigger type="button">
      <span>Remove borders in lighter layouts</span>
      <ng-icon frameAccordionIcon name="tablerChevronDown" size="18"></ng-icon>
    </button>

    <ng-template frameAccordionContent>
      Leave borders off when surrounding spacing or surfaces already define the grouping.
    </ng-template>
  </frame-accordion-item>
</frame-accordion>`,
        },
      ],
    },
  ],
  tokensTitle: 'Design Tokens',
  tokensDescription:
    'Use these CSS custom properties to tune spacing, typography, borders, motion, and icon behavior without changing the component markup. Override them globally for system-wide defaults or locally on a wrapper class for one-off variants.',
  tokens: `
  --frame-accordion-radius: var(--frame-radius-md);
  --frame-accordion-item-border: var(--frame-border);
  --frame-accordion-item-radius: 0px;
  --frame-accordion-trigger-min-height: 3.25rem;
  --frame-accordion-trigger-padding-y: 1rem;
  --frame-accordion-trigger-padding-x: 1rem;
  --frame-accordion-trigger-gap: 1rem;
  --frame-accordion-trigger-color: var(--frame-foreground);
  --frame-accordion-trigger-font-size: 0.9375rem;
  --frame-accordion-trigger-font-weight: 500;
  --frame-accordion-trigger-hover-color: var(--frame-foreground);
  --frame-accordion-trigger-disabled-opacity: 0.55;
  --frame-accordion-content-padding-bottom: 1rem;
  --frame-accordion-content-padding-inline: 1rem;
  --frame-accordion-content-color: var(--frame-muted-foreground);
  --frame-accordion-content-font-size: 0.875rem;
  --frame-accordion-content-line-height: 1.6;
  --frame-accordion-content-motion-duration: 220ms;
  --frame-accordion-content-motion-timing: cubic-bezier(0.2, 0, 0, 1);
  --frame-accordion-icon-size: 1rem;
  --frame-accordion-icon-rotation: 180deg;
  `,
};

