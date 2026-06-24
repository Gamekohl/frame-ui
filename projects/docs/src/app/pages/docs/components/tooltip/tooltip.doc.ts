import { ComponentDoc } from '../../shared/models/component-doc.model';
import { DocsTooltipPreviewComponent } from './previews/tooltip-preview';

const importsCode = `import { FrTooltipModule } from '@frame-ui-ng/components/tooltip';`;
const buttonImportsCode = `import { FrButtonModule } from '@frame-ui-ng/components/button';
${importsCode}`;

const usageHtml = `<button frButton frTooltip="Helpful details." type="button">
  Hover for context
</button>`;

const arrowHtml = `<button frButton frTooltip="A small arrow points back to the trigger." frTooltipArrow type="button">
  With arrow
</button>`;

const sidesHtml = `<button frButton frTooltip="Top side" frTooltipSide="top" frTooltipArrow type="button">
  Top
</button>`;

const shortcutHtml = `<button frButton appearance="outline" [frTooltip]="tip" frTooltipArrow type="button">
  <ng-icon frButtonIcon name="tablerDeviceFloppy" />
  <span frButtonLabel>Save draft</span>
</button>

<ng-template #tip>
  <div class="shortcut-tooltip">
    <span>Save current draft</span>
    <kbd frTooltipShortcut>Ctrl S</kbd>
  </div>
</ng-template>`;

const disabledHtml = `<button
  frButton
  frTooltip="Upgrade permissions before running this action."
  frTooltipArrow
  disabled
  type="button"
>
  Locked action
</button>`;

const delayHtml = `<button
  frButton
  frTooltip="Delayed hints avoid flashing."
  [frTooltipOpenDelay]="650"
  [frTooltipCloseDelay]="120"
  frTooltipArrow
  type="button"
>
  Intentional delay
</button>`;

const customCss = `.branded-tooltip {
  --frame-tooltip-content-bg: linear-gradient(135deg, #16302b, #315c4f);
  --frame-tooltip-content-color: #f6fff9;
  --frame-tooltip-content-radius: var(--frame-radius-full);
  --frame-tooltip-content-padding: 0.5rem 0.875rem;
  --frame-tooltip-content-shadow: 0 16px 36px rgb(22 48 43 / 0.28);
}`;

const rtlHtml = `<div dir="rtl" lang="ar">
  <button frButton frTooltip="تلميح قصير مرتبط بالزر." frTooltipSide="right" frTooltipArrow type="button">
    مساعدة
  </button>
</div>`;

const tokens = `--frame-tooltip-content-bg: var(--frame-foreground, #09090b);
--frame-tooltip-content-color: var(--frame-background, #fff);
--frame-tooltip-content-border: transparent;
--frame-tooltip-content-radius: var(--frame-radius-md);
--frame-tooltip-content-shadow: 0 12px 32px rgb(0 0 0 / 0.18);
--frame-tooltip-content-padding: 0.375rem 0.625rem;
--frame-tooltip-content-max-width: 18rem;
--frame-tooltip-content-font-size: 0.8125rem;
--frame-tooltip-content-font-weight: 500;
--frame-tooltip-content-line-height: 1.35;
--frame-tooltip-shortcut-bg: color-mix(in srgb, currentColor 14%, transparent);
--frame-tooltip-shortcut-radius: 0.25rem;
--frame-tooltip-shortcut-padding: 0.0625rem 0.3125rem;
--frame-tooltip-shortcut-font-size: 0.75rem;
--frame-tooltip-arrow-size: 0.5rem;
--frame-tooltip-motion-duration: 140ms;
--frame-tooltip-motion-distance: 0.25rem;
--frame-tooltip-motion-scale: 0.96;
--frame-tooltip-motion-easing: cubic-bezier(0.16, 1, 0.3, 1);`;

export const TOOLTIP_DOC: ComponentDoc = {
  slug: 'tooltip',
  breadcrumb: 'Components / Tooltip',

  hero: {
    id: 'tooltip-hero',
    title: 'Preview',
    preview: {
      component: DocsTooltipPreviewComponent,
      inputs: {
        config: { mode: 'basic' },
      },
    },
  },

  installation: {
    cli: {
      language: 'bash',
      code: 'npx your-cli add tooltip',
    },
    manual: {
      steps: [
        {
          title: 'Import the tooltip primitives.',
          code: {
            language: 'ts',
            code: importsCode,
          },
        },
      ],
    },
  },

  usage: [
    { language: 'ts', code: buttonImportsCode },
    { language: 'html', code: usageHtml },
  ],

  composition: `FrTooltipDirective
└── FrTooltipShortcut`,

  tokenInspector: {
    id: 'token-inspector',
    title: 'Token inspector',
    description:
      'The preview renders a persistent static panel so you can inspect tooltip surface, text, arrow, and motion tokens without fighting hover state.',
    preview: {
      component: DocsTooltipPreviewComponent,
      containerClass: 'block',
      inputs: {
        config: { mode: 'inspector' },
      },
      inspectorTargets: [
        {
          id: 'panel',
          label: 'Tooltip panel',
          selector: '[data-token-target="tooltip-panel"]',
          description: 'The floating panel controls surface, border, radius, shadow, padding, and max width.',
          tokens: [
            '--frame-tooltip-content-bg',
            '--frame-tooltip-content-color',
            '--frame-tooltip-content-border',
            '--frame-tooltip-content-radius',
            '--frame-tooltip-content-shadow',
            '--frame-tooltip-content-padding',
            '--frame-tooltip-content-max-width',
          ],
        },
        {
          id: 'text',
          label: 'Tooltip text',
          selector: '[data-token-target="tooltip-text"]',
          description: 'Tooltip copy uses compact text tokens for short supplemental hints.',
          tokens: [
            '--frame-tooltip-content-font-size',
            '--frame-tooltip-content-font-weight',
            '--frame-tooltip-content-line-height',
          ],
        },
        {
          id: 'shortcut',
          label: 'Shortcut',
          selector: '[data-token-target="tooltip-panel"]',
          description: 'Shortcut hints use a dedicated attribute and compact tokenized styling.',
          tokens: [
            '--frame-tooltip-shortcut-bg',
            '--frame-tooltip-shortcut-radius',
            '--frame-tooltip-shortcut-padding',
            '--frame-tooltip-shortcut-font-size',
          ],
        },
        {
          id: 'motion',
          label: 'Motion',
          selector: '[data-token-target="tooltip-panel"]',
          description: 'Motion tokens tune the entrance distance, scale, duration, and easing.',
          tokens: [
            '--frame-tooltip-motion-duration',
            '--frame-tooltip-motion-distance',
            '--frame-tooltip-motion-scale',
            '--frame-tooltip-motion-easing',
          ],
        },
        {
          id: 'arrow',
          label: 'Arrow',
          selector: '[data-token-target="tooltip-panel"]',
          description: 'Arrow tooltips use the same panel background and a dedicated arrow size token.',
          tokens: ['--frame-tooltip-arrow-size', '--frame-tooltip-content-bg'],
        },
      ],
    },
  },

  styling: {
    description:
      'Set tooltip tokens on the trigger. The overlay copies --frame-tooltip-* custom properties to the floating panel when it opens.',
    preview: {
      id: 'custom-styling-preview',
      title: 'Custom Styling Preview',
      description: 'This preview uses local token overrides on the trigger for a softer branded tooltip.',
      preview: {
        component: DocsTooltipPreviewComponent,
        inputs: {
          config: { mode: 'custom-styling' },
        },
      },
      code: [
        { language: 'ts', code: buttonImportsCode },
        {
          language: 'html',
          code: `<button
  frButton
  class="branded-tooltip"
  frTooltip="Styled with local tooltip tokens."
  frTooltipArrow
  type="button"
>
  Branded hint
</button>`,
        },
        { language: 'css', code: customCss },
      ],
    },
  },

  examples: [
    {
      id: 'basic',
      title: 'Basic',
      description: 'Use a tooltip for concise supplemental information on hover or keyboard focus.',
      preview: {
        component: DocsTooltipPreviewComponent,
        inputs: { config: { mode: 'basic' } },
      },
      code: [
        { language: 'ts', code: buttonImportsCode },
        { language: 'html', code: usageHtml },
      ],
    },
    {
      id: 'arrow',
      title: 'Arrow',
      description: 'Use arrow when the trigger relationship benefits from a stronger visual pointer.',
      preview: {
        component: DocsTooltipPreviewComponent,
        inputs: { config: { mode: 'arrow' } },
      },
      code: [
        { language: 'ts', code: importsCode },
        { language: 'html', code: arrowHtml },
      ],
    },
    {
      id: 'side',
      title: 'Side',
      description: 'Set side to top, right, bottom, or left. The overlay falls back when space is tight.',
      preview: {
        component: DocsTooltipPreviewComponent,
        inputs: { config: { mode: 'sides' } },
      },
      code: [
        { language: 'ts', code: buttonImportsCode },
        { language: 'html', code: sidesHtml },
      ],
    },
    {
      id: 'shortcut',
      title: 'With Keyboard Shortcut',
      description: 'Tooltips can include tiny shortcut hints when an action has a matching key command.',
      preview: {
        component: DocsTooltipPreviewComponent,
        inputs: { config: { mode: 'shortcut' } },
      },
      code: [
        { language: 'ts', code: buttonImportsCode },
        { language: 'html', code: shortcutHtml },
      ],
    },
    {
      id: 'disabled-button',
      title: 'Disabled Button',
      description: 'Wrap disabled buttons because native disabled controls do not dispatch hover or focus events.',
      preview: {
        component: DocsTooltipPreviewComponent,
        inputs: { config: { mode: 'disabled' } },
      },
      code: [
        { language: 'ts', code: buttonImportsCode },
        { language: 'html', code: disabledHtml },
      ],
    },
    {
      id: 'delay',
      title: 'Delay',
      description: 'Tune open and close delays for dense toolbars where accidental hover is common.',
      preview: {
        component: DocsTooltipPreviewComponent,
        inputs: { config: { mode: 'delay' } },
      },
      code: [
        { language: 'ts', code: buttonImportsCode },
        { language: 'html', code: delayHtml },
      ],
    },
    {
      id: 'rtl',
      title: 'RTL',
      description: 'Tooltip positioning works in right-to-left layouts and keeps content direction intact.',
      preview: {
        component: DocsTooltipPreviewComponent,
        inputs: { config: { mode: 'rtl' } },
      },
      code: [
        { language: 'ts', code: buttonImportsCode },
        { language: 'html', code: rtlHtml },
      ],
    },
  ],

  tokensTitle: 'Design Tokens',
  tokensDescription:
    'Use these CSS custom properties to tune tooltip surface, typography, shortcut hints, arrow size, and entrance motion.',
  tokens,
};
