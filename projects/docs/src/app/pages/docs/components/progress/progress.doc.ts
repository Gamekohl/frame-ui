import { ComponentDoc } from '../../shared/models/component-doc.model';
import { DocsProgressPreviewComponent } from './previews/progress-preview';

const importsCode = `import { FrProgressModule } from '@frame-ui-ng/components/progress';`;
const fieldImportsCode = `${importsCode}
import { FrFieldModule } from '@frame-ui-ng/components/field';`;
const controlledImportsCode = `import { signal } from '@angular/core';
${importsCode}
import { FrButtonModule } from '@frame-ui-ng/components/button';`;

const basicHtml = `<div frProgress aria-label="Sync progress" [value]="42">
  <div frProgressIndicator></div>
</div>`;

const labelHtml = `<div frField>
  <div frFieldContent>
    <label frFieldLabel for="deploy-progress">Deployment progress</label>
    <p frFieldDescription>Seven of ten release checks have completed.</p>
  </div>

  <div id="deploy-progress" frProgress aria-label="Deployment progress" [value]="70">
    <div frProgressIndicator></div>
  </div>

  <span>70%</span>
</div>`;

const controlledTs = `${controlledImportsCode}

progress = signal(55);

increase(): void {
  this.progress.update((value) => Math.min(value + 15, 100));
}

decrease(): void {
  this.progress.update((value) => Math.max(value - 15, 0));
}`;

const controlledHtml = `<div class="progress-example">
  <div class="progress-example__header">
    <span>Import queue</span>
    <strong>{{ progress() }}%</strong>
  </div>

  <div frProgress aria-label="Import queue progress" [value]="progress()">
    <div frProgressIndicator></div>
  </div>

  <button frButton appearance="outline" type="button" (click)="decrease()">Less</button>
  <button frButton type="button" (click)="increase()">More</button>
</div>`;

const indeterminateHtml = `<div frProgress aria-label="Preparing preview" [value]="null">
  <div frProgressIndicator></div>
</div>`;

const customCss = `.storage-progress {
  --frame-progress-height: 0.875rem;
  --frame-progress-radius: var(--frame-radius-full);
  --frame-progress-bg: color-mix(in srgb, var(--frame-primary) 12%, var(--frame-muted));
  --frame-progress-border: color-mix(in srgb, var(--frame-primary) 24%, transparent);
  --frame-progress-shadow: inset 0 1px 2px rgb(0 0 0 / 0.08);
  --frame-progress-indicator-bg: linear-gradient(90deg, var(--frame-primary), var(--frame-foreground));
  --frame-progress-indicator-shadow: 0 0 18px color-mix(in srgb, var(--frame-primary) 36%, transparent);
}`;

const tokens = `--frame-progress-height: 0.5rem;
--frame-progress-width: 100%;
--frame-progress-radius: var(--frame-radius-full);
--frame-progress-bg: var(--frame-accent);
--frame-progress-border: transparent;
--frame-progress-shadow: none;
--frame-progress-indicator-bg: var(--frame-primary);
--frame-progress-indicator-radius: inherit;
--frame-progress-indicator-shadow: none;
--frame-progress-transition-duration: 300ms;
--frame-progress-transition-easing: cubic-bezier(0.16, 1, 0.3, 1);
--frame-progress-indeterminate-size: 35%;
--frame-progress-indeterminate-duration: 1.25s;`;

export const PROGRESS_DOC: ComponentDoc = {
  slug: 'progress',
  breadcrumb: 'Components / Progress',

  hero: {
    id: 'progress-hero',
    title: 'Preview',
    preview: {
      component: DocsProgressPreviewComponent,
      inputs: {
        config: { mode: 'label' },
      },
    },
  },

  installation: {
    cli: {
      language: 'bash',
      code: 'npx your-cli add progress',
    },
    manual: {
      steps: [
        {
          title: 'Import the progress root and indicator primitives.',
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
      code: importsCode,
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
      'Hover the field wrapper, label, helper text, value, progress root, or indicator to inspect the tokens behind the full labeled progress pattern.',
    preview: {
      component: DocsProgressPreviewComponent,
      containerClass: 'block',
      inputs: {
        config: { mode: 'inspector' },
      },
      inspectorTargets: [
        {
          id: 'field',
          label: 'Field wrapper',
          selector: '[data-token-target="progress-field"]',
          description: 'The Field wrapper controls the vertical spacing rhythm around the label, helper text, value, and progress bar.',
          tokens: ['--frame-field-gap'],
        },
        {
          id: 'content',
          label: 'Field content',
          selector: '[data-token-target="progress-content"]',
          description: 'The content stack defines the spacing between label/value rows and helper copy.',
          tokens: ['--frame-field-content-gap'],
        },
        {
          id: 'label',
          label: 'Label',
          selector: '[data-token-target="progress-label"]',
          description: 'Label tokens control the supporting text scale, weight, and color used with labeled progress bars.',
          tokens: [
            '--frame-field-label-font-size',
            '--frame-field-label-font-weight',
            '--frame-field-label-color',
          ],
        },
        {
          id: 'description',
          label: 'Description',
          selector: '[data-token-target="progress-description"]',
          description: 'Description tokens keep progress helper copy quieter than the primary label.',
          tokens: ['--frame-field-description-color', '--frame-field-description-font-size'],
        },
        {
          id: 'value',
          label: 'Value text',
          selector: '[data-token-target="progress-value"]',
          description: 'The visible percentage inherits local text color and type treatment from the surrounding pattern.',
          tokens: [
            '--frame-foreground',
            '--frame-muted-foreground',
          ],
        },
        {
          id: 'root',
          label: 'Progress root',
          selector: '[data-token-target="progress-root"]',
          description: 'The root controls the track size, surface, radius, border, shadow, and animated value contract.',
          tokens: [
            '--frame-progress-height',
            '--frame-progress-width',
            '--frame-progress-radius',
            '--frame-progress-bg',
            '--frame-progress-border',
            '--frame-progress-shadow',
            '--frame-progress-transition-duration',
            '--frame-progress-transition-easing',
            '--frame-progress-indeterminate-size',
            '--frame-progress-indeterminate-duration',
          ],
        },
        {
          id: 'indicator',
          label: 'Indicator',
          selector: '[data-token-target="progress-indicator"]',
          description: 'The indicator tokens define the filled track surface, radius, and optional emphasis shadow.',
          tokens: [
            '--frame-progress-indicator-bg',
            '--frame-progress-indicator-radius',
            '--frame-progress-indicator-shadow',
          ],
        },
      ],
    },
  },

  styling: {
    description:
      'Override progress tokens on the root or an ancestor to tune bar height, track color, fill treatment, border, radius, and motion locally.',
    preview: {
      id: 'custom-styling-preview',
      title: 'Custom Styling Preview',
      description: 'This preview uses local token overrides for a thicker storage progress treatment.',
      preview: {
        component: DocsProgressPreviewComponent,
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
          code: `<div class="storage-progress" frProgress aria-label="Storage budget" [value]="82">
  <div frProgressIndicator></div>
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
      description: 'Use a determinate progress bar when the completion value is known.',
      preview: {
        component: DocsProgressPreviewComponent,
        inputs: {
          config: { mode: 'basic' },
        },
      },
      code: [
        {
          language: 'ts',
          code: importsCode,
        },
        {
          language: 'html',
          code: basicHtml,
        },
      ],
    },
    {
      id: 'label',
      title: 'With Field',
      description: 'Pair progress with Field primitives when the bar needs a label, helper copy, or visible value.',
      preview: {
        component: DocsProgressPreviewComponent,
        inputs: {
          config: { mode: 'label' },
        },
      },
      code: [
        {
          language: 'ts',
          code: fieldImportsCode,
        },
        {
          language: 'html',
          code: labelHtml,
        },
      ],
    },
    {
      id: 'controlled',
      title: 'Controlled',
      description: 'Bind the value to a signal when progress changes from user actions, polling, or async work.',
      preview: {
        component: DocsProgressPreviewComponent,
        inputs: {
          config: { mode: 'controlled' },
        },
      },
      code: [
        {
          language: 'ts',
          code: controlledTs,
        },
        {
          language: 'html',
          code: controlledHtml,
        },
      ],
    },
    {
      id: 'indeterminate',
      title: 'Indeterminate',
      description: 'Pass a null value when work is active but no reliable completion percentage is available yet.',
      preview: {
        component: DocsProgressPreviewComponent,
        inputs: {
          config: { mode: 'indeterminate' },
        },
      },
      code: [
        {
          language: 'ts',
          code: importsCode,
        },
        {
          language: 'html',
          code: indeterminateHtml,
        },
      ],
    },
    {
      id: 'rtl',
      title: 'RTL',
      description: 'The indicator follows logical inline direction, so the bar fills correctly inside RTL layouts.',
      preview: {
        component: DocsProgressPreviewComponent,
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
          code: `<div dir="rtl">
  <div frProgress aria-label="تقدم المزامنة" [value]="66">
    <div frProgressIndicator></div>
  </div>
</div>`,
        },
      ],
    },
  ],

  tokensTitle: 'Design Tokens',
  tokensDescription:
    'Use these CSS custom properties to tune progress track sizing, surfaces, indicator styling, transition timing, and indeterminate animation behavior.',
  tokens,
};

