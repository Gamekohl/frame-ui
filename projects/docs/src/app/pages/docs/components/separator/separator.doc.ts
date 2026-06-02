import { ComponentDoc } from '../../shared/models/component-doc.model';
import { DocsSeparatorPreviewComponent } from './previews/separator-preview';

const importsCode = `import { FrSeparatorModule } from '@frame-ui/components/separator';`;

const basicHtml = `<section aria-labelledby="release-notes-title">
  <div>
    <h3 id="release-notes-title">Release notes</h3>
    <p>Small fixes, clearer navigation, and a few quality-of-life updates.</p>
  </div>

  <div frSeparator></div>

  <p>Updated 12 minutes ago by the docs team.</p>
</section>`;

const verticalHtml = `<nav aria-label="Product sections">
  <a href="#">Overview</a>
  <div frSeparator orientation="vertical"></div>
  <a href="#">Components</a>
  <div frSeparator orientation="vertical"></div>
  <a href="#">Tokens</a>
</nav>`;

const menuHtml = `<div role="list">
  <article role="listitem">
    <strong>Notifications</strong>
    <span>Choose when the workspace should interrupt you.</span>
  </article>

  <div frSeparator></div>

  <article role="listitem">
    <strong>Security</strong>
    <span>Review sessions, passkeys, and recovery methods.</span>
  </article>
</div>`;

const listHtml = `<div class="summary-list">
  <div class="summary-list__row">
    <span>Drafts reviewed</span>
    <strong>18</strong>
  </div>

  <div frSeparator></div>

  <div class="summary-list__row">
    <span>Comments resolved</span>
    <strong>42</strong>
  </div>
</div>`;

const semanticHtml = `<section aria-labelledby="keyboard-region-title">
  <h3 id="keyboard-region-title">Keyboard region</h3>
  <p>Use a semantic separator when the boundary itself communicates structure.</p>

  <div frSeparator [decorative]="false" aria-label="End of keyboard instructions"></div>

  <p>Decorative separators remain presentation-only by default.</p>
</section>`;

const customCss = `.health-card {
  --frame-separator-color: linear-gradient(90deg, transparent, var(--frame-primary), transparent);
  --frame-separator-thickness: 2px;
  --frame-separator-horizontal-margin-block: 0.25rem;
  --frame-separator-vertical-height: 1.5rem;
  --frame-separator-vertical-margin-inline: 0.25rem;
}`;

const rtlHtml = `<section dir="rtl" lang="ar">
  <h3>ملخص المساحة</h3>
  <p>تساعد الفواصل على تنظيم المعلومات داخل الواجهات ثنائية الاتجاه.</p>

  <div frSeparator></div>

  <nav aria-label="أقسام المنتج">
    <a href="#">نظرة عامة</a>
    <div frSeparator orientation="vertical"></div>
    <a href="#">المكونات</a>
  </nav>
</section>`;

const tokens = `--frame-separator-color: var(--frame-border);
--frame-separator-thickness: 1px;
--frame-separator-radius: 999px;
--frame-separator-horizontal-width: 100%;
--frame-separator-horizontal-margin-block: 0;
--frame-separator-vertical-height: 100%;
--frame-separator-vertical-margin-inline: 0;`;

export const SEPARATOR_DOC: ComponentDoc = {
  slug: 'separator',
  breadcrumb: 'Components / Separator',

  hero: {
    id: 'separator-hero',
    title: 'Preview',
    preview: {
      component: DocsSeparatorPreviewComponent,
      inputs: {
        config: { mode: 'basic' },
      },
    },
  },

  installation: {
    cli: {
      language: 'bash',
      code: 'npx your-cli add separator',
    },
    manual: {
      steps: [
        {
          title: 'Import the separator primitive.',
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
      code: `<div frSeparator></div>`,
    },
  ],

  tokenInspector: {
    id: 'token-inspector',
    title: 'Token inspector',
    description:
      'Hover the card, horizontal separator, or vertical separator to inspect the tokens that control the separator surface and sizing.',
    preview: {
      component: DocsSeparatorPreviewComponent,
      containerClass: 'block',
      inputs: {
        config: { mode: 'inspector' },
      },
      inspectorTargets: [
        {
          id: 'card',
          label: 'Preview surface',
          selector: '[data-token-target="separator-card"]',
          description: 'The surrounding surface demonstrates how separators inherit local token overrides from an ancestor.',
          tokens: ['--frame-surface', '--frame-border', '--frame-radius-lg'],
        },
        {
          id: 'horizontal',
          label: 'Horizontal separator',
          selector: '[data-token-target="separator-horizontal"]',
          description: 'Horizontal separators use logical inline sizing and block-axis thickness.',
          tokens: [
            '--frame-separator-color',
            '--frame-separator-thickness',
            '--frame-separator-radius',
            '--frame-separator-horizontal-width',
            '--frame-separator-horizontal-margin-block',
          ],
        },
        {
          id: 'vertical',
          label: 'Vertical separator',
          selector: '[data-token-target="separator-vertical"]',
          description: 'Vertical separators use the same thickness token, with a dedicated block-size and inline margin.',
          tokens: [
            '--frame-separator-color',
            '--frame-separator-thickness',
            '--frame-separator-radius',
            '--frame-separator-vertical-height',
            '--frame-separator-vertical-margin-inline',
          ],
        },
      ],
    },
  },

  styling: {
    description:
      'Override separator tokens on the separator itself or on an ancestor to adjust color, thickness, radius, and orientation-specific spacing.',
    preview: {
      id: 'custom-styling-preview',
      title: 'Custom Styling Preview',
      description: 'This preview uses local token overrides for a stronger divider treatment inside a compact status card.',
      preview: {
        component: DocsSeparatorPreviewComponent,
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
          code: `<section class="health-card">
  <h3>Repository health</h3>

  <div>
    <span>Checks passing</span>
    <div frSeparator orientation="vertical"></div>
    <strong>98%</strong>
  </div>

  <div frSeparator></div>
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
      description: 'Use a horizontal separator to create a quiet visual break between related pieces of content.',
      preview: {
        component: DocsSeparatorPreviewComponent,
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
      id: 'vertical',
      title: 'Vertical',
      description: 'Set orientation to vertical when the separator sits between inline links, actions, or metadata.',
      preview: {
        component: DocsSeparatorPreviewComponent,
        inputs: {
          config: { mode: 'vertical' },
        },
      },
      code: [
        {
          language: 'ts',
          code: importsCode,
        },
        {
          language: 'html',
          code: verticalHtml,
        },
      ],
    },
    {
      id: 'menu',
      title: 'Menu',
      description: 'Separators can group stacked action rows without requiring a dedicated menu component.',
      preview: {
        component: DocsSeparatorPreviewComponent,
        inputs: {
          config: { mode: 'menu' },
        },
      },
      code: [
        {
          language: 'ts',
          code: importsCode,
        },
        {
          language: 'html',
          code: menuHtml,
        },
      ],
    },
    {
      id: 'list',
      title: 'List',
      description: 'Use separators between rows when the row content has enough visual weight to benefit from a divider.',
      preview: {
        component: DocsSeparatorPreviewComponent,
        inputs: {
          config: { mode: 'list' },
        },
      },
      code: [
        {
          language: 'ts',
          code: importsCode,
        },
        {
          language: 'html',
          code: listHtml,
        },
      ],
    },
    {
      id: 'semantic',
      title: 'Semantic',
      description: 'Set decorative to false when assistive technology should announce the separator as a structural boundary.',
      preview: {
        component: DocsSeparatorPreviewComponent,
        inputs: {
          config: { mode: 'semantic' },
        },
      },
      code: [
        {
          language: 'ts',
          code: importsCode,
        },
        {
          language: 'html',
          code: semanticHtml,
        },
      ],
    },
    {
      id: 'rtl',
      title: 'RTL',
      description: 'Separator sizing and spacing use logical properties, so horizontal and vertical patterns work in RTL layouts.',
      preview: {
        component: DocsSeparatorPreviewComponent,
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
          code: rtlHtml,
        },
      ],
    },
  ],

  tokensTitle: 'Design Tokens',
  tokensDescription:
    'Use these CSS custom properties to tune separator color, thickness, radius, and orientation-specific sizing or spacing.',
  tokens,
};

