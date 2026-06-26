import { ComponentDoc } from '../../shared/models/component-doc.model';
import { DocsCollapsiblePreviewComponent } from './previews/collapsible-preview';

const collapsibleImportsCode = `import { FrBadgeModule } from '@frame-ui-ng/components/badge';
import { FrButtonModule } from '@frame-ui-ng/components/button';
import { FrCardModule } from '@frame-ui-ng/components/card';
import { FrCollapsibleModule } from '@frame-ui-ng/components/collapsible';
import { FrInputModule } from '@frame-ui-ng/components/input';`;

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
  <button frCollapsibleTrigger type="button">
    <span>Can I use this in my project?</span>
    <ng-icon name="tablerChevronDown" size="18" />
  </button>
  <div frCollapsibleContent>
    Yes. Use collapsible when a short answer or supporting details should stay one click away.
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
            '--frame-collapsible-trigger-open-color',
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
          code: `<section
  frCollapsible
  defaultOpen
  style="--frame-collapsible-content-color: var(--frame-foreground); --frame-collapsible-content-padding-block-start: 1rem; --frame-collapsible-content-transition-duration: 320ms;"
>
  <button frCollapsibleTrigger type="button">
    <span>
      <span>Approval policy</span>
      <span>Show the exact rules used before a release can ship.</span>
    </span>
    <ng-icon name="tablerChevronDown" size="18" />
  </button>

  <div frCollapsibleContent>
    Two maintainers must approve the release. Security-sensitive changes also require a
    production readiness review from the platform team.
  </div>
</section>`,
        },
        {
          language: 'css',
          code: `[frCollapsible] {
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
      description: 'A compact disclosure row for short answers and supporting details.',
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
          code: `<section frCollapsible>
  <button frCollapsibleTrigger type="button">
    <span>Can I use this in my project?</span>
    <ng-icon name="tablerChevronDown" size="18" />
  </button>

  <div frCollapsibleContent>
    Yes. Use collapsible when a short answer or supporting details should stay one click away
    without sending people to a new page.
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
import { FrButtonModule } from '@frame-ui-ng/components/button';
import { FrCardModule } from '@frame-ui-ng/components/card';
import { FrCollapsibleModule } from '@frame-ui-ng/components/collapsible';

readonly detailsOpen = signal(false);`,
        },
        {
          language: 'html',
          code: `<section
  frCollapsible
  [open]="detailsOpen()"
  (openChange)="detailsOpen.set($event)"
>
  <div>
    <div>
      <p>Support handoff</p>
      <h3>Escalate checkout issue</h3>
    </div>
    <button frButton frCollapsibleTrigger appearance="outline" size="sm" type="button">
      {{ detailsOpen() ? 'Hide notes' : 'Show notes' }}
    </button>
  </div>

  <div frCollapsibleContent>
    Customer already tried a second card. Ask billing to verify the latest payment attempt.
  </div>
</section>`,
        },
      ],
    },
    {
      id: 'disabled',
      title: 'Disabled',
      description: 'Disable the root when the disclosure should stay visible but not interactive.',
      preview: {
        component: DocsCollapsiblePreviewComponent,
        inputs: { config: { mode: 'disabled' } },
      },
      code: [
        {
          language: 'ts',
          code: collapsibleImportsCode,
        },
        {
          language: 'html',
          code: `<section frCollapsible disabled>
  <button frCollapsibleTrigger type="button">
    <span>Can the rules be changed right now?</span>
    <ng-icon name="tablerChevronDown" size="18" />
  </button>

  <div frCollapsibleContent>
    This disclosure is disabled while the workspace policy is locked by an active deployment.
  </div>
</section>`,
        },
      ],
    },
    {
      id: 'settings-panel',
      title: 'Settings Panel',
      description: 'Reveal advanced controls without making the default form feel heavy.',
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
          code: `<section frCollapsible defaultOpen>
  <button
    frButton
    frCollapsibleTrigger
    appearance="ghost"
    type="button"
  >
    <span>Advanced radius settings</span>
    <ng-icon name="tablerChevronDown" size="16" />
  </button>
  <div frCollapsibleContent>
    <div>
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
      id: 'metadata-card',
      title: 'Metadata card',
      description: 'Use a collapsible card when secondary metadata should stay available but quiet.',
      preview: {
        component: DocsCollapsiblePreviewComponent,
        inputs: { config: { mode: 'metadata' } },
      },
      code: [
        {
          language: 'ts',
          code: collapsibleImportsCode,
        },
        {
          language: 'html',
          code: `<section frCollapsible defaultOpen>
  <button frCollapsibleTrigger type="button">
    <span>
      <span>Release metadata</span>
      <span>Build target, owner, and rollout gate for the current deploy.</span>
    </span>
    <ng-icon name="tablerChevronDown" size="18" />
  </button>

  <div frCollapsibleContent>
    <dl>
      <div>
        <dt>Environment</dt>
        <dd>Production</dd>
      </div>
      <div>
        <dt>Owner</dt>
        <dd>Platform team</dd>
      </div>
      <div>
        <dt>Status</dt>
        <dd><span frBadge variant="success">Ready</span></dd>
      </div>
    </dl>
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
          code: `<section frCollapsible defaultOpen dir="rtl">
  <button frCollapsibleTrigger type="button">
    <span>هل يمكن استخدامه داخل لوحة إعدادات؟</span>
    <ng-icon name="tablerChevronDown" size="18" />
  </button>

  <div frCollapsibleContent>
    نعم، تستخدم المسافات خصائص منطقية حتى تتكيف مع اتجاه النص.
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
  --frame-collapsible-trigger-open-color: var(--frame-foreground);
  --frame-collapsible-trigger-disabled-opacity: 0.55;
  --frame-collapsible-content-color: var(--frame-muted-foreground);
  --frame-collapsible-content-font-size: 0.875rem;
  --frame-collapsible-content-line-height: 1.6;
  --frame-collapsible-content-padding-block-start: 0.75rem;
  --frame-collapsible-content-transition-duration: 220ms;
  --frame-collapsible-content-transition-timing: ease;
  `,
};

