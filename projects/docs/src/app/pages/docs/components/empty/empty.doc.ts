import { ComponentDoc } from '../../shared/models/component-doc.model';
import { DocsEmptyPreviewComponent } from './previews/empty-preview';

const importsCode = `import { FrEmptyModule } from '@frame-ui/components/empty';`;
const actionImportsCode = `${importsCode}
import { FrButtonModule } from '@frame-ui/components/button';`;
const avatarImportsCode = `${actionImportsCode}
import { FrAvatarModule } from '@frame-ui/components/avatar';`;
const inputImportsCode = `${importsCode}
import { FrInputModule } from '@frame-ui/components/input';`;

const basicHtml = `<div frEmpty>
  <div frEmptyHeader>
    <div frEmptyMedia variant="icon">
      <ng-icon name="tablerFolderCode" />
    </div>
    <h3 frEmptyTitle>No data</h3>
    <p frEmptyDescription>No data found.</p>
  </div>
  <div frEmptyContent>
    <button frButton type="button">Add data</button>
  </div>
</div>`;

const outlineHtml = `<div frEmpty variant="outline">
  <div frEmptyHeader>
    <div frEmptyMedia variant="icon">
      <ng-icon name="tablerCloud" />
    </div>
    <h3 frEmptyTitle>Cloud Storage Empty</h3>
    <p frEmptyDescription>Upload files to your cloud storage to access them anywhere.</p>
  </div>
  <div frEmptyContent>
    <button frButton type="button">Upload Files</button>
  </div>
</div>`;

const backgroundHtml = `<div
  frEmpty
  variant="soft"
  style="--frame-empty-soft-bg: linear-gradient(135deg, color-mix(in srgb, var(--frame-primary) 10%, transparent), var(--frame-muted));"
>
  <div frEmptyHeader>
    <div frEmptyMedia variant="icon">
      <ng-icon name="tablerBell" />
    </div>
    <h3 frEmptyTitle>No Notifications</h3>
    <p frEmptyDescription>You're all caught up. New notifications will appear here.</p>
  </div>
  <div frEmptyContent>
    <button frButton appearance="outline" type="button">Refresh</button>
  </div>
</div>`;

const avatarHtml = `<div frEmpty variant="outline">
  <div frEmptyHeader>
    <div frEmptyMedia>
      <span frAvatar>
        <span frAvatarFallback>LR</span>
      </span>
    </div>
    <h3 frEmptyTitle>User Offline</h3>
    <p frEmptyDescription>This user is currently offline. You can leave a message or try again later.</p>
  </div>
  <div frEmptyContent>
    <button frButton type="button">Leave Message</button>
  </div>
</div>`;

const avatarGroupHtml = `<div frEmpty variant="outline">
  <div frEmptyHeader>
    <div frEmptyMedia>
      <div frAvatarGroup size="sm">
        <span frAvatar><span frAvatarFallback>CN</span></span>
        <span frAvatar><span frAvatarFallback>LR</span></span>
        <span frAvatar><span frAvatarFallback>ER</span></span>
      </div>
    </div>
    <h3 frEmptyTitle>No Team Members</h3>
    <p frEmptyDescription>Invite your team to collaborate on this project.</p>
  </div>
  <div frEmptyContent>
    <button frButton type="button">Invite Members</button>
  </div>
</div>`;

const inputGroupHtml = `<div frEmpty variant="outline">
  <div frEmptyHeader>
    <div frEmptyMedia variant="icon">
      <ng-icon name="tablerSearch" />
    </div>
    <h3 frEmptyTitle>404 - Not Found</h3>
    <p frEmptyDescription>The page you're looking for doesn't exist. Try searching below.</p>
  </div>
  <div frEmptyContent class="w-full max-w-sm">
    <input frInput placeholder="/" />
  </div>
  <a href="#">Need help? Contact support</a>
</div>`;

const rtlHtml = `<div dir="rtl">
  <div frEmpty variant="outline">
    <div frEmptyHeader>
      <div frEmptyMedia variant="icon">
        <ng-icon name="tablerFolderCode" />
      </div>
      <h3 frEmptyTitle>لا توجد مشاريع بعد</h3>
      <p frEmptyDescription>لم تقم بإنشاء أي مشاريع بعد. ابدأ بإنشاء مشروعك الأول.</p>
    </div>
    <div frEmptyContent>
      <button frButton type="button">إنشاء مشروع</button>
      <button frButton appearance="outline" type="button">استيراد مشروع</button>
    </div>
  </div>
</div>`;

export const EMPTY_DOC: ComponentDoc = {
  slug: 'empty',
  breadcrumb: 'Components / Empty',

  hero: {
    id: 'empty-hero',
    title: 'Preview',
    description: 'Use Empty to display an empty state with optional media, title, description, and actions.',
    preview: {
      component: DocsEmptyPreviewComponent,
    },
  },

  installation: {
    cli: {
      language: 'bash',
      code: 'npx your-cli add empty',
    },
    manual: {
      steps: [
        {
          title: 'Import the empty state primitives.',
          code: {
            language: 'ts',
            code: importsCode,
          },
        },
      ],
    },
  },

  usage: [
    { language: 'ts', code: actionImportsCode },
    { language: 'html', code: basicHtml },
  ],

  composition: `Empty
├── EmptyHeader
│   ├── EmptyMedia
│   ├── EmptyTitle
│   └── EmptyDescription
└── EmptyContent`,

  tokenInspector: {
    id: 'token-inspector',
    title: 'Token inspector',
    description: 'Inspect the empty state shell, header, media, title, description, and action content.',
    preview: {
      component: DocsEmptyPreviewComponent,
      inputs: {
        config: { mode: 'inspector' },
      },
      inspectorLayout: 'popover',
      inspectorTargets: [
        {
          id: 'root',
          label: 'Root',
          selector: '.docs-empty-inspector',
          description: 'The root controls layout, spacing, padding, border, background, radius, and text alignment.',
          tokens: [
            '--frame-empty-padding',
            '--frame-empty-gap',
            '--frame-empty-radius',
            '--frame-empty-border',
            '--frame-empty-bg',
            '--frame-empty-color',
          ],
        },
        {
          id: 'header',
          label: 'Header',
          selector: '[data-token-target="empty-header"]',
          description: 'The header groups media, title, and description with a compact vertical rhythm.',
          tokens: ['--frame-empty-header-gap'],
        },
        {
          id: 'media',
          label: 'Media',
          selector: '[data-token-target="empty-media"]',
          description: 'Media can hold icons, avatars, avatar groups, or custom illustration content.',
          tokens: [
            '--frame-empty-media-size',
            '--frame-empty-media-radius',
            '--frame-empty-media-bg',
            '--frame-empty-media-color',
            '--frame-empty-media-icon-size',
          ],
        },
        {
          id: 'title',
          label: 'Title',
          selector: '[data-token-target="empty-title"]',
          description: 'Title tokens define the primary message emphasis.',
          tokens: ['--frame-empty-title-color', '--frame-empty-title-font-size', '--frame-empty-title-font-weight'],
        },
        {
          id: 'description',
          label: 'Description',
          selector: '[data-token-target="empty-description"]',
          description: 'Description tokens tune supporting copy width, color, and type scale.',
          tokens: [
            '--frame-empty-description-color',
            '--frame-empty-description-font-size',
            '--frame-empty-description-max-width',
          ],
        },
        {
          id: 'content',
          label: 'Content',
          selector: '[data-token-target="empty-content"]',
          description: 'Content tokens control spacing between actions, inputs, and links.',
          tokens: ['--frame-empty-content-gap'],
        },
      ],
    },
  },

  examples: [
    {
      id: 'outline',
      title: 'Outline',
      description: 'Use `variant="outline"` to create a bordered empty state.',
      preview: {
        component: DocsEmptyPreviewComponent,
        inputs: { config: { mode: 'outline' } },
      },
      code: [
        { language: 'ts', code: actionImportsCode },
        { language: 'html', code: outlineHtml },
      ],
    },
    {
      id: 'background',
      title: 'Background',
      description: 'Use `variant="soft"` or local token overrides to add a subtle background.',
      preview: {
        component: DocsEmptyPreviewComponent,
        inputs: { config: { mode: 'background' } },
      },
      code: [
        { language: 'ts', code: actionImportsCode },
        { language: 'html', code: backgroundHtml },
      ],
    },
    {
      id: 'avatar',
      title: 'Avatar',
      description: 'Use EmptyMedia to display an avatar inside the empty state.',
      preview: {
        component: DocsEmptyPreviewComponent,
        inputs: { config: { mode: 'avatar' } },
      },
      code: [
        { language: 'ts', code: avatarImportsCode },
        { language: 'html', code: avatarHtml },
      ],
    },
    {
      id: 'avatar-group',
      title: 'Avatar Group',
      description: 'Use EmptyMedia to display an avatar group when the empty state refers to people or teams.',
      preview: {
        component: DocsEmptyPreviewComponent,
        inputs: { config: { mode: 'avatar-group' } },
      },
      code: [
        { language: 'ts', code: avatarImportsCode },
        { language: 'html', code: avatarGroupHtml },
      ],
    },
    {
      id: 'input-group',
      title: 'Input Group',
      description: 'Place inputs, search fields, or compact forms inside EmptyContent.',
      preview: {
        component: DocsEmptyPreviewComponent,
        inputs: { config: { mode: 'input-group' } },
      },
      code: [
        { language: 'ts', code: inputImportsCode },
        { language: 'html', code: inputGroupHtml },
      ],
    },
    {
      id: 'rtl',
      title: 'RTL',
      description: 'Empty states inherit text direction from their container.',
      preview: {
        component: DocsEmptyPreviewComponent,
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
    'Empty tokens style the root layout, media well, copy, and action spacing while leaving nested components like Button, Input, and Avatar to their own token contracts.',
  tokens: `
  --frame-empty-padding: 3rem 1.5rem;
  --frame-empty-gap: 1.5rem;
  --frame-empty-radius: var(--frame-radius-lg);
  --frame-empty-border: transparent;
  --frame-empty-bg: transparent;
  --frame-empty-color: var(--frame-foreground);
  --frame-empty-outline-border: var(--frame-border);
  --frame-empty-soft-bg: var(--frame-muted);
  --frame-empty-header-gap: 0.75rem;
  --frame-empty-content-gap: 0.75rem;
  --frame-empty-media-size: 3rem;
  --frame-empty-media-radius: var(--frame-radius-lg);
  --frame-empty-media-bg: var(--frame-muted);
  --frame-empty-media-color: var(--frame-muted-foreground);
  --frame-empty-media-icon-size: 1.5rem;
  --frame-empty-title-color: var(--frame-foreground);
  --frame-empty-title-font-size: 1rem;
  --frame-empty-title-font-weight: 600;
  --frame-empty-description-color: var(--frame-muted-foreground);
  --frame-empty-description-font-size: 0.875rem;
  --frame-empty-description-max-width: 32rem;
  `,
};

