import { ComponentDoc } from '../../shared/models/component-doc.model';
import { DocsCollapsiblePreviewComponent } from './previews/collapsible-preview';

const collapsibleImportsCode = `import { FrButtonModule } from '@frame-ui/components/button';
import { FrCardModule } from '@frame-ui/components/card';
import { FrCollapsibleModule } from '@frame-ui/components/collapsible';
import { FrInputModule } from '@frame-ui/components/input';`;

export const COLLAPSIBLE_DOC: ComponentDoc = {
  slug: 'collapsible',
  breadcrumb: 'Components / Collapsible',

  hero: {
    id: 'collapsible-hero',
    title: 'Preview',
    preview: {
      component: DocsCollapsiblePreviewComponent,
    },
  },

  installation: {
    cli: {
      language: 'bash',
      code: 'npx your-cli add collapsible',
    },
    manual: {
      steps: [
        {
          title: 'Import the collapsible primitives into your component.',
          code: {
            language: 'ts',
            code: collapsibleImportsCode,
          },
        },
      ],
    },
  },

  usage: [
    {
      language: 'ts',
      code: collapsibleImportsCode,
    },
    {
      language: 'html',
      code: `<section frCollapsible>
  <button frCollapsibleTrigger>Can I use this in my project?</button>
  <div frCollapsibleContent>
    Yes. Free to use for personal and commercial projects.
  </div>
</section>`,
    },
  ],

  composition: `FrCollapsible
+-- FrCollapsibleTrigger
+-- FrCollapsibleContent`,

  tokenInspector: {
    id: 'token-inspector',
    title: 'Token inspector',
    description: 'Inspect the collapsible trigger, disclosure content, and animation tokens.',
    preview: {
      component: DocsCollapsiblePreviewComponent,
      inputs: {
        config: {
          mode: 'inspector',
        },
      },
      inspectorTargets: [
        {
          id: 'root',
          label: 'Collapsible',
          selector: '[data-token-target="collapsible-root"]',
          description: 'The root exposes state attributes for styling open and closed variants.',
          tokens: [],
        },
        {
          id: 'trigger',
          label: 'Trigger',
          selector: '[data-token-target="collapsible-trigger"]',
          description: 'The trigger controls the disclosure region and can be paired with button styles.',
          tokens: [
            '--frame-collapsible-trigger-gap',
            '--frame-collapsible-trigger-color',
            '--frame-collapsible-trigger-disabled-opacity',
          ],
        },
        {
          id: 'content',
          label: 'Content',
          selector: '[data-token-target="collapsible-content"]',
          description: 'Content tokens tune text, spacing, opacity, and the open/close transition.',
          tokens: [
            '--frame-collapsible-content-color',
            '--frame-collapsible-content-font-size',
            '--frame-collapsible-content-line-height',
            '--frame-collapsible-content-padding-block-start',
            '--frame-collapsible-content-transition-duration',
            '--frame-collapsible-content-transition-timing',
          ],
        },
      ],
    },
  },

  styling: {
    description:
      'Override collapsible tokens locally to tune trigger spacing, content typography, and reveal motion.',
    preview: {
      id: 'custom-styling-preview',
      title: 'Custom Styling Preview',
      description: 'This preview customizes the content color, spacing, and transition timing.',
      preview: {
        component: DocsCollapsiblePreviewComponent,
        inputs: {
          config: {
            style: `--frame-collapsible-content-color: var(--frame-foreground);
--frame-collapsible-content-padding-block-start: 1rem;
--frame-collapsible-content-transition-duration: 320ms;`,
          },
        },
      },
      code: [
        {
          language: 'ts',
          code: collapsibleImportsCode,
        },
        {
          language: 'html',
          code: `<section frCollapsible defaultOpen class="order-collapsible">
  <div class="order-collapsible__row">
    <div>
      <p class="order-collapsible__eyebrow">Order #4189</p>
      <p class="order-collapsible__title">Product details</p>
    </div>
    <button frButton frCollapsibleTrigger appearance="outline" size="sm" type="button">
      Toggle details
    </button>
  </div>
  <div frCollapsibleContent>
    <div frCard>
      <div frCardContent class="order-collapsible__status">
        <span>Status</span>
        <strong>Shipped</strong>
      </div>
    </div>
  </div>
</section>`,
        },
        {
          language: 'css',
          code: `.order-collapsible {
  --frame-collapsible-content-color: var(--frame-foreground);
  --frame-collapsible-content-padding-block-start: 1rem;
  --frame-collapsible-content-transition-duration: 320ms;
}`,
        },
      ],
    },
  },

  examples: [
    {
      id: 'basic',
      title: 'Basic',
      description: 'An uncontrolled collapsible that starts open and can be toggled by the trigger.',
      preview: {
        component: DocsCollapsiblePreviewComponent,
      },
      code: [
        {
          language: 'ts',
          code: collapsibleImportsCode,
        },
        {
          language: 'html',
          code: `<section frCollapsible defaultOpen class="order-collapsible">
  <div class="order-collapsible__row">
    <div>
      <p>Order #4189</p>
      <h3>Product details</h3>
    </div>
    <button frButton frCollapsibleTrigger appearance="outline" size="sm" type="button">
      Toggle details
    </button>
  </div>
  <div frCollapsibleContent>
    <div frCard>
      <div frCardContent class="order-collapsible__status">
        <span>Status</span>
        <strong>Shipped</strong>
      </div>
    </div>
  </div>
</section>`,
        },
      ],
    },
    {
      id: 'controlled-state',
      title: 'Controlled State',
      description: 'Use open and openChange when the surrounding component owns the expanded state.',
      preview: {
        component: DocsCollapsiblePreviewComponent,
        inputs: { config: { mode: 'controlled' } },
      },
      code: [
        {
          language: 'ts',
          code: `import { signal } from '@angular/core';
import { FrButtonModule } from '@frame-ui/components/button';
import { FrCardModule } from '@frame-ui/components/card';
import { FrCollapsibleModule } from '@frame-ui/components/collapsible';

readonly detailsOpen = signal(false);`,
        },
        {
          language: 'html',
          code: `<section
  frCollapsible
  [open]="detailsOpen()"
  (openChange)="detailsOpen.set($event)"
>
  <div class="order-collapsible__row">
    <div>
      <p>Order #4189</p>
      <h3>Toggle shipping details</h3>
    </div>
    <button frButton frCollapsibleTrigger appearance="outline" size="sm" type="button">
      {{ detailsOpen() ? 'Hide' : 'Show' }}
    </button>
  </div>
  <div frCollapsibleContent>
    <div frCard>
      <div frCardContent class="order-collapsible__status">
        <span>Status</span>
        <strong>Shipped</strong>
      </div>
    </div>
  </div>
</section>`,
        },
      ],
    },
    {
      id: 'settings-panel',
      title: 'Settings Panel',
      description: 'Use a trigger button to reveal additional settings without leaving the page.',
      preview: {
        component: DocsCollapsiblePreviewComponent,
        inputs: { config: { mode: 'settings' } },
      },
      code: [
        {
          language: 'ts',
          code: collapsibleImportsCode,
        },
        {
          language: 'html',
          code: `<section frCollapsible defaultOpen class="settings-collapsible">
  <button
    frButton
    frCollapsibleTrigger
    appearance="ghost"
    class="settings-collapsible__trigger"
    type="button"
  >
    <span>Advanced radius settings</span>
    <ng-icon name="tablerChevronDown" size="16" />
  </button>
  <div frCollapsibleContent>
    <div class="settings-collapsible__grid">
      <label>
        <span>Radius X</span>
        <input frInput value="12px" />
      </label>
      <label>
        <span>Radius Y</span>
        <input frInput value="16px" />
      </label>
    </div>
  </div>
</section>`,
        },
      ],
    },
    {
      id: 'file-tree',
      title: 'File Tree',
      description: 'Nest collapsibles to build disclosure-based trees and outline panels.',
      preview: {
        component: DocsCollapsiblePreviewComponent,
        inputs: { config: { mode: 'file-tree' } },
      },
      code: [
        {
          language: 'ts',
          code: collapsibleImportsCode,
        },
        {
          language: 'html',
          code: `<section frCollapsible defaultOpen class="file-tree">
  <button frCollapsibleTrigger class="file-tree__trigger" type="button">
    <ng-icon name="tablerChevronRight" size="16" />
    <span>components</span>
  </button>
  <div frCollapsibleContent>
    <section frCollapsible defaultOpen class="file-tree__branch">
      <button frCollapsibleTrigger class="file-tree__trigger" type="button">
        <ng-icon name="tablerChevronRight" size="16" />
        <span>collapsible</span>
      </button>
      <div frCollapsibleContent class="file-tree__files">
        <span>collapsible.ts</span>
        <span>collapsible.css</span>
        <span>collapsible.spec.ts</span>
      </div>
    </section>
    <section frCollapsible class="file-tree__branch">
      <button frCollapsibleTrigger class="file-tree__trigger" type="button">
        <ng-icon name="tablerChevronRight" size="16" />
        <span>button</span>
      </button>
      <div frCollapsibleContent class="file-tree__files">
        <span>button.ts</span>
        <span>button.css</span>
      </div>
    </section>
  </div>
</section>`,
        },
      ],
    },
    {
      id: 'rtl',
      title: 'RTL support',
      description: 'Collapsible uses logical properties, so spacing and nested content adapt in RTL.',
      preview: {
        component: DocsCollapsiblePreviewComponent,
        inputs: { config: { mode: 'rtl' } },
      },
      code: [
        {
          language: 'ts',
          code: collapsibleImportsCode,
        },
        {
          language: 'html',
          code: `<section frCollapsible defaultOpen dir="rtl" class="order-collapsible">
  <div class="order-collapsible__row">
    <div>
      <p>الطلب #4189</p>
      <h3>تفاصيل الشحن</h3>
    </div>
    <button frButton frCollapsibleTrigger appearance="outline" size="sm" type="button">
      تبديل
    </button>
  </div>
  <div frCollapsibleContent>
    <div frCard>
      <div frCardContent class="order-collapsible__status">
        <span>الحالة</span>
        <strong>تم الشحن</strong>
      </div>
    </div>
  </div>
</section>`,
        },
      ],
    },
  ],

  tokensTitle: 'Design Tokens',
  tokensDescription:
    'Use these CSS custom properties to tune trigger spacing, content typography, and disclosure motion.',
  tokens: `
  --frame-collapsible-trigger-gap: 0.5rem;
  --frame-collapsible-trigger-color: var(--frame-foreground);
  --frame-collapsible-trigger-disabled-opacity: 0.55;
  --frame-collapsible-content-color: var(--frame-muted-foreground);
  --frame-collapsible-content-font-size: 0.875rem;
  --frame-collapsible-content-line-height: 1.6;
  --frame-collapsible-content-padding-block-start: 0.75rem;
  --frame-collapsible-content-transition-duration: 220ms;
  --frame-collapsible-content-transition-timing: ease;
  `,
};

