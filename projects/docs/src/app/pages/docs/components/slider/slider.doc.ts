import { ComponentDoc } from '../../shared/models/component-doc.model';
import { DocsSliderPreviewComponent } from './previews/slider-preview';

const importsCode = `import { FrSliderModule } from '@frame-ui-ng/components/slider';`;
const formImportsCode = `import { ReactiveFormsModule } from '@angular/forms';
import { FrFieldModule } from '@frame-ui-ng/components/field';
${importsCode}`;

const basicHtml = `<frame-slider [defaultValue]="42" aria-label="Volume" />`;

const rangeHtml = `<frame-slider
  [defaultValue]="[24, 76]"
  [min]="0"
  [max]="100"
  [step]="2"
  aria-label="Budget"
/>`;

const multipleHtml = `<frame-slider
  [defaultValue]="[20, 50, 82]"
  [minStepsBetweenThumbs]="2"
  aria-label="Milestone"
/>`;

const verticalHtml = `<frame-slider
  orientation="vertical"
  [defaultValue]="62"
  aria-label="Light level"
/>`;

const controlledTs = `import { signal } from '@angular/core';
${importsCode}

readonly temperature = signal(48);

setTemperature(value: number | number[]): void {
  this.temperature.set(Array.isArray(value) ? value[0] : value);
}`;

const controlledHtml = `<frame-slider
  [value]="temperature()"
  (valueChange)="setTemperature($event)"
  aria-label="Temperature"
/>`;

const formTs = `import { FormControl, Validators } from '@angular/forms';
${formImportsCode}

threshold = new FormControl(10, {
  nonNullable: true,
  validators: [Validators.min(25)],
});`;

const formHtml = `<div frField [invalid]="threshold.invalid && threshold.touched">
  <label frFieldLabel>Deployment threshold</label>
  <p frFieldDescription>Choose a value of 25 or higher before rollout can continue.</p>

  <frame-slider
    [formControl]="threshold"
    [min]="0"
    [max]="100"
    [step]="5"
    [invalid]="threshold.invalid && threshold.touched"
    aria-label="Deployment threshold"
  />

  @if (threshold.invalid && threshold.touched) {
    <p frFieldError>Raise the threshold to at least 25.</p>
  }
</div>`;

const disabledHtml = `<frame-slider
  [defaultValue]="68"
  disabled
  aria-label="Locked capacity"
/>`;

const customCss = `.brand-slider {
  --frame-slider-track-bg: color-mix(in srgb, var(--frame-primary) 12%, var(--frame-muted));
  --frame-slider-range-bg: linear-gradient(90deg, var(--frame-primary), var(--frame-warning));
  --frame-slider-thumb-size: 1.45rem;
  --frame-slider-thumb-border: color-mix(in srgb, var(--frame-primary) 82%, var(--frame-warning));
  --frame-slider-thumb-shadow: 0 10px 30px color-mix(in srgb, var(--frame-primary) 26%, transparent);
}`;

const rtlHtml = `<section dir="rtl" lang="ar">
  <label>كثافة العرض</label>
  <frame-slider [defaultValue]="35" aria-label="كثافة العرض" />
</section>`;

const tokens = `--frame-slider-width: 100%;
--frame-slider-height: 1.25rem;
--frame-slider-vertical-width: 1.25rem;
--frame-slider-vertical-height: 12rem;
--frame-slider-track-size: 0.5rem;
--frame-slider-track-bg: var(--frame-muted);
--frame-slider-range-bg: var(--frame-primary);
--frame-slider-thumb-size: 1.25rem;
--frame-slider-thumb-bg: var(--frame-background);
--frame-slider-thumb-border: var(--frame-primary);
--frame-slider-thumb-border-width: 2px;
--frame-slider-thumb-shadow: 0 2px 10px rgb(0 0 0 / 0.16);
--frame-slider-thumb-focus-shadow: 0 0 0 4px color-mix(in srgb, var(--frame-ring) 24%, transparent);
--frame-slider-disabled-opacity: 0.5;
--frame-slider-radius: var(--frame-radius-sm);`;

export const SLIDER_DOC: ComponentDoc = {
  slug: 'slider',
  breadcrumb: 'Components / Slider',

  hero: {
    id: 'slider-hero',
    title: 'Preview',
    preview: {
      component: DocsSliderPreviewComponent,
      inputs: {
        config: { mode: 'basic' },
      },
    },
  },

  installation: {
    cli: {
      language: 'bash',
      code: 'npx your-cli add slider',
    },
    manual: {
      steps: [
        {
          title: 'Import the slider primitive and ReactiveFormsModule when binding to Angular forms.',
          code: {
            language: 'ts',
            code: `import { ReactiveFormsModule } from '@angular/forms';
${importsCode}`,
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
      'Hover the slider surface, label, description, or slider root to inspect the tokens that control track, range, thumb, and focus treatment.',
    preview: {
      component: DocsSliderPreviewComponent,
      containerClass: 'block',
      inputs: {
        config: { mode: 'inspector' },
      },
      inspectorTargets: [
        {
          id: 'surface',
          label: 'Preview surface',
          selector: '[data-token-target="slider-surface"]',
          description: 'The surrounding surface demonstrates how slider tokens can be scoped to a settings card.',
          tokens: ['--frame-surface', '--frame-border', '--frame-radius-lg'],
        },
        {
          id: 'root',
          label: 'Slider root',
          selector: '[data-token-target="slider-root"]',
          description: 'The root exposes sizing, track, range, thumb, disabled, and focus tokens.',
          tokens: [
            '--frame-slider-width',
            '--frame-slider-height',
            '--frame-slider-track-size',
            '--frame-slider-track-bg',
            '--frame-slider-range-bg',
            '--frame-slider-thumb-size',
            '--frame-slider-thumb-bg',
            '--frame-slider-thumb-border',
            '--frame-slider-thumb-border-width',
            '--frame-slider-thumb-shadow',
            '--frame-slider-thumb-focus-shadow',
            '--frame-slider-disabled-opacity',
            '--frame-slider-radius',
          ],
        },
        {
          id: 'label',
          label: 'Label',
          selector: '[data-token-target="slider-label"]',
          description: 'Labels usually come from the surrounding composition and inherit document typography.',
          tokens: ['--frame-foreground'],
        },
        {
          id: 'description',
          label: 'Description',
          selector: '[data-token-target="slider-description"]',
          description: 'Supporting copy uses muted foreground tokens in the docs composition.',
          tokens: ['--frame-muted-foreground'],
        },
      ],
    },
  },

  styling: {
    description:
      'Override slider tokens on the slider or an ancestor to tune track color, range treatment, thumb size, focus ring, and disabled opacity.',
    preview: {
      id: 'custom-styling-preview',
      title: 'Custom Styling Preview',
      description: 'This preview uses local token overrides for a more expressive range treatment.',
      preview: {
        component: DocsSliderPreviewComponent,
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
          code: `<section class="brand-slider">
  <frame-slider [defaultValue]="58" aria-label="Accent strength" />
</section>`,
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
      description: 'Use a slider when a setting benefits from quick spatial adjustment inside a bounded range.',
      preview: {
        component: DocsSliderPreviewComponent,
        inputs: {
          config: { mode: 'basic' },
        },
      },
      code: [
        { language: 'ts', code: importsCode },
        { language: 'html', code: basicHtml },
      ],
    },
    {
      id: 'range',
      title: 'Range',
      description: 'Pass two values to create a range selection with a highlighted segment between both thumbs.',
      preview: {
        component: DocsSliderPreviewComponent,
        inputs: {
          config: { mode: 'range' },
        },
      },
      code: [
        { language: 'ts', code: importsCode },
        { language: 'html', code: rangeHtml },
      ],
    },
    {
      id: 'multiple-thumbs',
      title: 'Multiple Thumbs',
      description: 'Use more than two values when users need several checkpoints on the same scale.',
      preview: {
        component: DocsSliderPreviewComponent,
        inputs: {
          config: { mode: 'multiple' },
        },
      },
      code: [
        { language: 'ts', code: importsCode },
        { language: 'html', code: multipleHtml },
      ],
    },
    {
      id: 'vertical',
      title: 'Vertical',
      description: 'Set orientation to vertical for compact panels, mixers, or side controls.',
      preview: {
        component: DocsSliderPreviewComponent,
        inputs: {
          config: { mode: 'vertical' },
        },
      },
      code: [
        { language: 'ts', code: importsCode },
        { language: 'html', code: verticalHtml },
      ],
    },
    {
      id: 'controlled',
      title: 'Controlled',
      description: 'Bind value and valueChange when parent state should own the current slider value.',
      preview: {
        component: DocsSliderPreviewComponent,
        inputs: {
          config: { mode: 'controlled' },
        },
      },
      code: [
        { language: 'ts', code: controlledTs },
        { language: 'html', code: controlledHtml },
      ],
    },
    {
      id: 'disabled',
      title: 'Disabled',
      description: 'Disable the slider when a value is locked by permissions, policy, or another field.',
      preview: {
        component: DocsSliderPreviewComponent,
        inputs: {
          config: { mode: 'disabled' },
        },
      },
      code: [
        { language: 'ts', code: importsCode },
        { language: 'html', code: disabledHtml },
      ],
    },
    {
      id: 'reactive-forms',
      title: 'Reactive Forms',
      description: 'Use the slider as a ControlValueAccessor with validators, touched state, and Field error messaging.',
      preview: {
        component: DocsSliderPreviewComponent,
        inputs: {
          config: { mode: 'form' },
        },
      },
      code: [
        { language: 'ts', code: formTs },
        { language: 'html', code: formHtml },
      ],
    },
    {
      id: 'rtl',
      title: 'RTL',
      description: 'Horizontal sliders follow the document direction and keep thumb positioning logical in RTL layouts.',
      preview: {
        component: DocsSliderPreviewComponent,
        inputs: {
          config: { mode: 'rtl' },
        },
      },
      code: [
        { language: 'ts', code: importsCode },
        { language: 'html', code: rtlHtml },
      ],
    },
  ],

  tokensTitle: 'Design Tokens',
  tokensDescription:
    'Use these CSS custom properties to tune slider dimensions, track, range, thumb, radius, focus ring, and disabled opacity.',
  tokens,
};
