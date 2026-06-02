import { ComponentDoc } from '../../shared/models/component-doc.model';
import { DocsItemPreviewComponent } from './previews/item-preview';

const importsCode = `import { FrItemModule } from '@frame-ui/components/item';`;
const actionImportsCode = `${importsCode}
import { FrButtonModule } from '@frame-ui/components/button';`;
const avatarImportsCode = `${importsCode}
import { FrAvatarModule } from '@frame-ui/components/avatar';
import { FrBadgeModule } from '@frame-ui/components/badge';`;

const basicHtml = `<div frItem variant="outline">
  <span frItemMedia variant="icon">
    <ng-icon name="tablerFileText" />
  </span>
  <span frItemContent>
    <span frItemTitle>Component documentation</span>
    <span frItemDescription>
      Build rows with media, content, descriptions, and actions.
    </span>
  </span>
  <span frItemActions>
    <button frButton appearance="outline" size="sm" type="button">Open</button>
  </span>
</div>`;

const groupHtml = `<div frItemGroup>
  <div frItem interactive>
    <span frItemMedia variant="icon">
      <ng-icon name="tablerFileText" />
    </span>
    <span frItemContent>
      <span frItemTitle>Documentation</span>
      <span frItemDescription>Read setup guides and API reference.</span>
    </span>
  </div>
  <div frItemSeparator></div>
  <div frItem interactive>
    <span frItemMedia variant="icon">
      <ng-icon name="tablerCode" />
    </span>
    <span frItemContent>
      <span frItemTitle>Examples</span>
      <span frItemDescription>Copy working patterns into your app.</span>
    </span>
  </div>
</div>`;

const linkHtml = `<a frItem interactive variant="outline" href="/docs/components/item">
  <span frItemMedia variant="icon">
    <ng-icon name="tablerArrowRight" />
  </span>
  <span frItemContent>
    <span frItemTitle>Open component docs</span>
    <span frItemDescription>Items can be anchors when the whole row navigates.</span>
  </span>
  <span frItemActions>
    <ng-icon name="tablerChevronRight" size="16" />
  </span>
</a>`;

const variantsHtml = `<div frItem>...</div>
<div frItem variant="outline">...</div>
<div frItem variant="muted">...</div>`;

const sizesHtml = `<div frItem size="default">...</div>
<div frItem size="sm">...</div>
<div frItem size="xs">...</div>`;

const mediaHtml = `<div frItem variant="outline">
  <span frItemMedia variant="icon">
    <ng-icon name="tablerCalendar" />
  </span>
  <span frItemContent>
    <span frItemTitle>Icon media</span>
    <span frItemDescription>Use icons for compact semantic hints.</span>
  </span>
</div>

<div frItem variant="outline">
  <span frItemMedia variant="image">
    <img src="/preview.jpg" alt="Preview" />
  </span>
  <span frItemContent>
    <span frItemTitle>Image media</span>
    <span frItemDescription>Use images for visual previews.</span>
  </span>
</div>`;

const avatarHtml = `<div frItem variant="outline">
  <span frItemMedia variant="avatar">
    <span frAvatar>
      <span frAvatarFallback>JD</span>
    </span>
  </span>
  <span frItemContent>
    <span frItemTitle>Julia Designer</span>
    <span frItemDescription>Product designer, FrameUIs</span>
  </span>
  <span frItemActions>
    <span frBadge variant="secondary">Online</span>
  </span>
</div>`;

const actionsHtml = `<div frItem variant="outline">
  <span frItemMedia variant="icon">
    <ng-icon name="tablerSettings" />
  </span>
  <span frItemContent>
    <span frItemTitle>Notification settings</span>
    <span frItemDescription>Choose how this workspace keeps you updated.</span>
  </span>
  <span frItemActions>
    <button frButton appearance="ghost" size="sm" type="button" aria-label="More options">
      <ng-icon frButtonIcon name="tablerDots" size="18" />
    </button>
  </span>
</div>`;

const customStylingHtml = `<div frItem class="docs-item-featured">
  <span frItemMedia variant="icon">
    <ng-icon name="tablerPalette" />
  </span>
  <span frItemContent>
    <span frItemTitle>Featured item</span>
    <span frItemDescription>Override item tokens locally.</span>
  </span>
</div>`;

const customStylingCss = `.docs-item-featured {
  --frame-item-bg: color-mix(in srgb, var(--frame-primary) 10%, var(--frame-surface));
  --frame-item-border: color-mix(in srgb, var(--frame-primary) 24%, var(--frame-border));
  --frame-item-radius: 1.25rem;
  --frame-item-media-bg: var(--frame-primary);
  --frame-item-media-color: var(--frame-primary-foreground);
}`;

const rtlHtml = `<div dir="rtl">
  <div frItem variant="outline">
    <span frItemMedia variant="icon">
      <ng-icon name="tablerUser" />
    </span>
    <span frItemContent>
      <span frItemTitle>ملف المستخدم</span>
      <span frItemDescription>العناصر تستخدم خصائص منطقية لدعم الاتجاه.</span>
    </span>
    <span frItemActions>
      <button frButton appearance="outline" size="sm" type="button">فتح</button>
    </span>
  </div>
</div>`;

export const ITEM_DOC: ComponentDoc = {
  slug: 'item',
  breadcrumb: 'Components / Item',

  hero: {
    id: 'item-hero',
    title: 'Preview',
    description:
      'A flexible row primitive for building settings rows, navigation rows, object summaries, and grouped lists.',
    preview: {
      component: DocsItemPreviewComponent,
    },
  },

  installation: {
    cli: {
      language: 'bash',
      code: 'npx your-cli add item',
    },
    manual: {
      steps: [
        {
          title: 'Import the item primitives your template needs.',
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
      code: actionImportsCode,
    },
    {
      language: 'html',
      code: basicHtml,
    },
  ],

  composition: `Item
├── ItemMedia
├── ItemContent
│   ├── ItemHeader
│   ├── ItemTitle
│   ├── ItemDescription
│   └── ItemFooter
├── ItemActions
└── ItemGroup
    ├── Item
    └── ItemSeparator`,

  tokenInspector: {
    id: 'item-tokens',
    title: 'Token Inspector',
    description:
      'Inspect the item root, grouped surface, media, content, text, actions, footer, and separator tokens.',
    preview: {
      component: DocsItemPreviewComponent,
      inputs: {
        config: {
          mode: 'inspector',
        },
      },
      inspectorTargets: [
        {
          id: 'item-root',
          label: 'Item',
          selector: '[data-token-target="item-root"]',
          description:
            'The item root controls row layout, spacing, radius, border, surface, hover state, focus ring, and disabled opacity.',
          tokens: [
            '--frame-item-gap',
            '--frame-item-padding',
            '--frame-item-radius',
            '--frame-item-bg',
            '--frame-item-color',
            '--frame-item-border',
            '--frame-item-hover-bg',
            '--frame-item-hover-color',
            '--frame-item-focus-shadow',
            '--frame-item-disabled-opacity',
          ],
        },
        {
          id: 'item-group',
          label: 'Group',
          selector: '[data-token-target="item-group"]',
          description:
            'Groups wrap related items in a shared bordered surface and reuse the item radius and border tokens.',
          tokens: ['--frame-item-radius', '--frame-item-outline-border'],
        },
        {
          id: 'item-media',
          label: 'Media',
          selector: '[data-token-target="item-media"]',
          description:
            'Media tokens size and style the leading icon, image, or avatar container.',
          tokens: [
            '--frame-item-media-size',
            '--frame-item-media-radius',
            '--frame-item-media-bg',
            '--frame-item-media-color',
            '--frame-item-media-icon-size',
          ],
        },
        {
          id: 'item-content',
          label: 'Content',
          selector: '[data-token-target="item-content"]',
          description:
            'Content tokens define the vertical rhythm for title, description, header, and footer areas.',
          tokens: ['--frame-item-content-gap', '--frame-item-header-gap', '--frame-item-footer-gap'],
        },
        {
          id: 'item-title',
          label: 'Title',
          selector: '[data-token-target="item-title"]',
          description: 'Title tokens tune the primary text treatment inside each item.',
          tokens: [
            '--frame-item-title-color',
            '--frame-item-title-font-size',
            '--frame-item-title-font-weight',
          ],
        },
        {
          id: 'item-description',
          label: 'Description',
          selector: '[data-token-target="item-description"]',
          description: 'Description tokens tune secondary explanatory text inside each item.',
          tokens: ['--frame-item-description-color', '--frame-item-description-font-size'],
        },
        {
          id: 'item-actions',
          label: 'Actions',
          selector: '[data-token-target="item-actions"]',
          description:
            'Actions sit at the far inline edge and use a dedicated gap token for controls or metadata.',
          tokens: ['--frame-item-actions-gap'],
        },
        {
          id: 'item-separator',
          label: 'Separator',
          selector: '[data-token-target="item-separator"]',
          description: 'Separators divide grouped rows using the same outline border token.',
          tokens: ['--frame-item-padding', '--frame-item-outline-border'],
        },
      ],
    },
  },

  styling: {
    description:
      'Override item tokens locally to tune row density, media treatment, hover states, and grouped surfaces without changing the markup.',
    preview: {
      id: 'custom-styling-preview',
      title: 'Custom Styling Preview',
      description: 'This preview customizes the item surface, radius, and media treatment.',
      preview: {
        component: DocsItemPreviewComponent,
        inputs: {
          config: {
            mode: 'basic',
            style: `--frame-item-bg: color-mix(in srgb, var(--frame-primary) 10%, var(--frame-surface));
--frame-item-border: color-mix(in srgb, var(--frame-primary) 24%, var(--frame-border));
--frame-item-radius: 1.25rem;
--frame-item-media-bg: var(--frame-primary);
--frame-item-media-color: var(--frame-primary-foreground);`,
          },
        },
      },
      code: [
        {
          language: 'ts',
          code: importsCode,
        },
        {
          language: 'html',
          code: customStylingHtml,
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
      id: 'item-basic',
      title: 'Basic',
      description: 'Use an item to align media, content, descriptions, and trailing actions.',
      preview: {
        component: DocsItemPreviewComponent,
      },
      code: [
        { language: 'ts', code: actionImportsCode },
        { language: 'html', code: basicHtml },
      ],
    },
    {
      id: 'item-group',
      title: 'Group',
      description: 'Wrap related rows in an item group and separate them with item separators.',
      preview: {
        component: DocsItemPreviewComponent,
        inputs: { config: { mode: 'group' } },
      },
      code: [
        { language: 'ts', code: importsCode },
        { language: 'html', code: groupHtml },
      ],
    },
    {
      id: 'item-link',
      title: 'Link',
      description:
        'Apply FrItem to an anchor and mark it interactive when the whole row navigates.',
      preview: {
        component: DocsItemPreviewComponent,
        inputs: { config: { mode: 'link' } },
      },
      code: [
        { language: 'ts', code: importsCode },
        { language: 'html', code: linkHtml },
      ],
    },
    {
      id: 'item-variants',
      title: 'Variants',
      description: 'Use default, outline, or muted variants depending on row emphasis.',
      preview: {
        component: DocsItemPreviewComponent,
        inputs: { config: { mode: 'variants' } },
      },
      code: [
        { language: 'ts', code: importsCode },
        { language: 'html', code: variantsHtml },
      ],
    },
    {
      id: 'item-sizes',
      title: 'Sizes',
      description: 'Use default, sm, or xs sizes for different row densities.',
      preview: {
        component: DocsItemPreviewComponent,
        inputs: { config: { mode: 'sizes' } },
      },
      code: [
        { language: 'ts', code: importsCode },
        { language: 'html', code: sizesHtml },
      ],
    },
    {
      id: 'item-media',
      title: 'Media',
      description: 'Use media variants for icons, images, and other leading visuals.',
      preview: {
        component: DocsItemPreviewComponent,
        inputs: { config: { mode: 'media' } },
      },
      code: [
        { language: 'ts', code: importsCode },
        { language: 'html', code: mediaHtml },
      ],
    },
    {
      id: 'item-avatar',
      title: 'Avatar',
      description: 'Pair item media with Avatar for people, teams, and account rows.',
      preview: {
        component: DocsItemPreviewComponent,
        inputs: { config: { mode: 'avatar' } },
      },
      code: [
        { language: 'ts', code: avatarImportsCode },
        { language: 'html', code: avatarHtml },
      ],
    },
    {
      id: 'item-actions',
      title: 'Actions',
      description: 'Use actions for controls, badges, shortcuts, or row-level metadata.',
      preview: {
        component: DocsItemPreviewComponent,
        inputs: { config: { mode: 'actions' } },
      },
      code: [
        { language: 'ts', code: actionImportsCode },
        { language: 'html', code: actionsHtml },
      ],
    },
    {
      id: 'item-rtl',
      title: 'RTL support',
      description:
        'Items use logical spacing, so media and actions adapt when direction changes.',
      preview: {
        component: DocsItemPreviewComponent,
        inputs: { config: { mode: 'rtl' } },
      },
      code: [
        { language: 'ts', code: actionImportsCode },
        { language: 'html', code: rtlHtml },
      ],
    },
  ],

  tokensTitle: 'Design Tokens',
  tokensDescription:
    'Use these CSS custom properties to customize item spacing, variants, media, typography, actions, and compact sizes.',
  tokens: `
  --frame-item-gap: 0.875rem;
  --frame-item-padding: 1rem;
  --frame-item-radius: var(--frame-radius-lg);
  --frame-item-bg: transparent;
  --frame-item-color: var(--frame-foreground);
  --frame-item-border: transparent;
  --frame-item-outline-border: var(--frame-border);
  --frame-item-muted-bg: var(--frame-muted);
  --frame-item-hover-bg: var(--frame-accent);
  --frame-item-hover-color: var(--frame-accent-foreground);
  --frame-item-focus-shadow: 0 0 0 3px color-mix(in srgb, var(--frame-ring) 24%, transparent);
  --frame-item-disabled-opacity: 0.5;
  --frame-item-content-gap: 0.25rem;
  --frame-item-header-gap: 0.625rem;
  --frame-item-footer-gap: 0.5rem;
  --frame-item-actions-gap: 0.5rem;
  --frame-item-media-size: 2.5rem;
  --frame-item-media-radius: var(--frame-radius-md);
  --frame-item-media-bg: var(--frame-muted);
  --frame-item-media-color: var(--frame-muted-foreground);
  --frame-item-media-icon-size: 1.25rem;
  --frame-item-title-color: var(--frame-foreground);
  --frame-item-title-font-size: 0.9375rem;
  --frame-item-title-font-weight: 600;
  --frame-item-description-color: var(--frame-muted-foreground);
  --frame-item-description-font-size: 0.875rem;
  --frame-item-sm-padding: 0.75rem;
  --frame-item-sm-media-size: 2rem;
  --frame-item-sm-title-font-size: 0.875rem;
  --frame-item-xs-padding: 0.5rem;
  --frame-item-xs-media-size: 1.75rem;
  --frame-item-xs-title-font-size: 0.8125rem;
  `,
};

