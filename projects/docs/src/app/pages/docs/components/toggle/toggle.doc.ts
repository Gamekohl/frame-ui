import { ComponentDoc } from '../../shared/models/component-doc.model';
import { DocsTogglePreviewComponent } from './previews/toggle-preview';

const importsCode = `import { FrToggleModule } from '@frame-ui/components/toggle';`;
const formImportsCode = `import { FormControl, ReactiveFormsModule } from '@angular/forms';
${importsCode}`;

const basicHtml = `<button frToggle aria-label="Save item">
  <ng-icon frToggleIcon name="tablerBookmark" />
</button>`;

const usageHtml = `<button frToggle>
  <span frToggleLabel>Toggle</span>
</button>`;

const outlineHtml = `<button frToggle variant="outline" aria-label="Bold text">
  <ng-icon frToggleIcon name="tablerBold" />
</button>

<button frToggle variant="outline" defaultPressed aria-label="Italic text">
  <ng-icon frToggleIcon name="tablerItalic" />
</button>`;

const textHtml = `<button frToggle variant="outline">
  <ng-icon frToggleIcon name="tablerStar" />
  <span frToggleLabel>Favorite</span>
</button>`;

const sizeHtml = `<button frToggle size="sm" aria-label="Compact favorite">
  <ng-icon frToggleIcon name="tablerStar" />
</button>

<button frToggle aria-label="Default favorite">
  <ng-icon frToggleIcon name="tablerStar" />
</button>

<button frToggle size="lg" aria-label="Large favorite">
  <ng-icon frToggleIcon name="tablerStar" />
</button>`;

const disabledHtml = `<button frToggle disabled aria-label="Muted notifications">
  <ng-icon frToggleIcon name="tablerBell" />
</button>

<button frToggle defaultPressed disabled>
  <ng-icon frToggleIcon name="tablerEye" />
  <span frToggleLabel>Visible</span>
</button>`;

const controlledTs = `import { signal } from '@angular/core';
${importsCode}

readonly previewEnabled = signal(true);`;

const controlledHtml = `<button
  frToggle
  [pressed]="previewEnabled()"
  (pressedChange)="previewEnabled.set($event)"
>
  <ng-icon frToggleIcon name="tablerEye" />
  <span frToggleLabel>
    {{ previewEnabled() ? 'Preview on' : 'Preview off' }}
  </span>
</button>`;

const formsTs = `${formImportsCode}

readonly notificationsControl = new FormControl(true, {
  nonNullable: true,
});`;

const formsHtml = `<button frToggle [formControl]="notificationsControl">
  <ng-icon frToggleIcon name="tablerBell" />
  <span frToggleLabel>Product updates</span>
</button>`;

const customCss = `.favorite-toggle {
  --frame-toggle-bg: color-mix(in srgb, var(--frame-primary) 10%, var(--frame-background));
  --frame-toggle-color: var(--frame-primary);
  --frame-toggle-hover-bg: color-mix(in srgb, var(--frame-primary) 16%, var(--frame-background));
  --frame-toggle-pressed-bg: var(--frame-primary);
  --frame-toggle-pressed-color: var(--frame-primary-foreground);
  --frame-toggle-pressed-shadow: 0 14px 32px color-mix(in srgb, var(--frame-primary) 28%, transparent);
}`;

const rtlHtml = `<div dir="rtl" lang="ar">
  <button frToggle variant="outline">
    <ng-icon frToggleIcon name="tablerBookmark" />
    <span frToggleLabel>حفظ</span>
  </button>
</div>`;

const tokens = `--frame-toggle-height: 2.25rem;
--frame-toggle-padding-x: 0.75rem;
--frame-toggle-gap: 0.5rem;
--frame-toggle-radius: var(--frame-radius-md, 0.5rem);
--frame-toggle-font-size: 0.875rem;
--frame-toggle-font-weight: 600;
--frame-toggle-bg: transparent;
--frame-toggle-color: var(--frame-foreground, #09090b);
--frame-toggle-border: transparent;
--frame-toggle-hover-bg: var(--frame-muted, #f4f4f5);
--frame-toggle-hover-color: var(--frame-foreground, #09090b);
--frame-toggle-pressed-bg: var(--frame-accent, var(--frame-muted, #f4f4f5));
--frame-toggle-pressed-color: var(--frame-accent-foreground, var(--frame-foreground, #09090b));
--frame-toggle-pressed-shadow: inset 0 1px 2px rgb(0 0 0 / 0.08);
--frame-toggle-outline-bg: var(--frame-background, #fff);
--frame-toggle-outline-border: var(--frame-border, #e5e7eb);
--frame-toggle-outline-hover-bg: var(--frame-muted, #f4f4f5);
--frame-toggle-outline-pressed-bg: var(--frame-muted, #f4f4f5);
--frame-toggle-focus-shadow: 0 0 0 3px color-mix(in srgb, var(--frame-ring, #18181b) 28%, transparent);
--frame-toggle-disabled-opacity: 0.5;
--frame-toggle-transition-duration: 160ms;
--frame-toggle-icon-size: 1rem;`;

export const TOGGLE_DOC: ComponentDoc = {
  slug: 'toggle',
  breadcrumb: 'Components / Toggle',

  hero: {
    id: 'toggle-hero',
    title: 'Preview',
    preview: {
      component: DocsTogglePreviewComponent,
      inputs: {
        config: { mode: 'basic' },
      },
    },
  },

  installation: {
    cli: {
      language: 'bash',
      code: 'npx your-cli add toggle',
    },
    manual: {
      steps: [
        {
          title: 'Import the toggle primitive.',
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
    { language: 'html', code: usageHtml },
  ],

  tokenInspector: {
    id: 'token-inspector',
    title: 'Token inspector',
    description:
      'Hover the toggle root, pressed state, outline variant, icon, or label to inspect the tokens that shape the control.',
    preview: {
      component: DocsTogglePreviewComponent,
      containerClass: 'block',
      inputs: {
        config: { mode: 'inspector' },
      },
      inspectorTargets: [
        {
          id: 'root',
          label: 'Toggle root',
          selector: '[data-token-target="toggle-root"]',
          description: 'The root controls base sizing, radius, surface, text color, and interaction timing.',
          tokens: [
            '--frame-toggle-height',
            '--frame-toggle-padding-x',
            '--frame-toggle-radius',
            '--frame-toggle-bg',
            '--frame-toggle-color',
            '--frame-toggle-hover-bg',
            '--frame-toggle-transition-duration',
          ],
        },
        {
          id: 'pressed',
          label: 'Pressed state',
          selector: '[data-token-target="toggle-pressed"]',
          description: 'Pressed toggles use dedicated selected-state surface, foreground, and shadow tokens.',
          tokens: ['--frame-toggle-pressed-bg', '--frame-toggle-pressed-color', '--frame-toggle-pressed-shadow'],
        },
        {
          id: 'outline',
          label: 'Outline variant',
          selector: '[data-token-target="toggle-outline"]',
          description: 'The outline variant adds a border and separate hover/pressed surface tokens.',
          tokens: [
            '--frame-toggle-outline-bg',
            '--frame-toggle-outline-border',
            '--frame-toggle-outline-hover-bg',
            '--frame-toggle-outline-pressed-bg',
          ],
        },
        {
          id: 'icon',
          label: 'Icon',
          selector: '[data-token-target="toggle-icon"]',
          description: 'Projected icons inherit the toggle icon size token.',
          tokens: ['--frame-toggle-icon-size', '--frame-toggle-gap'],
        },
        {
          id: 'label',
          label: 'Label',
          selector: '[data-token-target="toggle-label"]',
          description: 'Labels use the root font size, weight, color, and gap rhythm.',
          tokens: ['--frame-toggle-font-size', '--frame-toggle-font-weight', '--frame-toggle-gap'],
        },
      ],
    },
  },

  styling: {
    description:
      'Override toggle tokens on an individual control or a toolbar wrapper to tune selected states, border treatment, sizing, and motion.',
    preview: {
      id: 'custom-styling-preview',
      title: 'Custom Styling Preview',
      description: 'This preview uses local token overrides for a stronger selected favorite action.',
      preview: {
        component: DocsTogglePreviewComponent,
        inputs: {
          config: { mode: 'custom-styling' },
        },
      },
      code: [
        { language: 'ts', code: importsCode },
        {
          language: 'html',
          code: `<button frToggle defaultPressed class="favorite-toggle">
  <ng-icon frToggleIcon name="tablerStar" />
  <span frToggleLabel>Starred</span>
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
      description: 'Use a toggle for a single independent on/off action such as saving, starring, or muting.',
      preview: {
        component: DocsTogglePreviewComponent,
        inputs: { config: { mode: 'basic' } },
      },
      code: [
        { language: 'ts', code: importsCode },
        { language: 'html', code: basicHtml },
      ],
    },
    {
      id: 'outline',
      title: 'Outline',
      description: 'Use the outline variant when the toggle sits beside other bordered controls.',
      preview: {
        component: DocsTogglePreviewComponent,
        inputs: { config: { mode: 'outline' } },
      },
      code: [
        { language: 'ts', code: importsCode },
        { language: 'html', code: outlineHtml },
      ],
    },
    {
      id: 'with-text',
      title: 'With Text',
      description: 'Project a label when the icon alone would be too ambiguous for the action.',
      preview: {
        component: DocsTogglePreviewComponent,
        inputs: { config: { mode: 'text' } },
      },
      code: [
        { language: 'ts', code: importsCode },
        { language: 'html', code: textHtml },
      ],
    },
    {
      id: 'size',
      title: 'Size',
      description: 'Choose small, default, or large sizing to match dense toolbars or larger action rows.',
      preview: {
        component: DocsTogglePreviewComponent,
        inputs: { config: { mode: 'size' } },
      },
      code: [
        { language: 'ts', code: importsCode },
        { language: 'html', code: sizeHtml },
      ],
    },
    {
      id: 'disabled',
      title: 'Disabled',
      description: 'Disabled toggles preserve their current state while blocking pointer and form interaction.',
      preview: {
        component: DocsTogglePreviewComponent,
        inputs: { config: { mode: 'disabled' } },
      },
      code: [
        { language: 'ts', code: importsCode },
        { language: 'html', code: disabledHtml },
      ],
    },
    {
      id: 'controlled',
      title: 'Controlled',
      description: 'Bind pressed and pressedChange when parent state should own the selected value.',
      preview: {
        component: DocsTogglePreviewComponent,
        inputs: { config: { mode: 'controlled' } },
      },
      code: [
        { language: 'ts', code: controlledTs },
        { language: 'html', code: controlledHtml },
      ],
    },
    {
      id: 'forms',
      title: 'Reactive Forms',
      description: 'Because FrToggle implements ControlValueAccessor, it can bind directly to a boolean FormControl.',
      preview: {
        component: DocsTogglePreviewComponent,
        inputs: { config: { mode: 'forms' } },
      },
      code: [
        { language: 'ts', code: formsTs },
        { language: 'html', code: formsHtml },
      ],
    },
    {
      id: 'rtl',
      title: 'RTL',
      description: 'Toggle spacing is logical, so icon and label rhythm follows the document direction.',
      preview: {
        component: DocsTogglePreviewComponent,
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
    'Use these CSS custom properties to tune toggle sizing, surface states, focus ring, disabled state, icon sizing, and transition timing.',
  tokens,
};
