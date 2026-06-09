import { ComponentDoc } from '../../shared/models/component-doc.model';
import { DocsCardPreviewComponent } from './previews/card-preview';

const cardImportsCode = `import { FrBadgeModule } from '@frame-ui-ng/components/badge';
import { FrButtonModule } from '@frame-ui-ng/components/button';
import { FrCardModule } from '@frame-ui-ng/components/card';
import { FrInputModule } from '@frame-ui-ng/components/input';`;

export const CARD_DOC: ComponentDoc = {
  slug: 'card',
  breadcrumb: 'Components / Card',

  hero: {
    id: 'card-hero',
    title: 'Preview',
    preview: {
      component: DocsCardPreviewComponent,
    },
  },

  installation: {
    cli: {
      language: 'bash',
      code: 'npx your-cli add card',
    },
    manual: {
      steps: [
        {
          title: 'Import the card primitives your template needs.',
          code: {
            language: 'ts',
            code: cardImportsCode,
          },
        },
      ],
    },
  },

  usage: [
    {
      language: 'ts',
      code: cardImportsCode,
    },
    {
      language: 'html',
      code: `<section frCard>
  <header frCardHeader>
    <h3 frCardTitle>Card Title</h3>
    <p frCardDescription>Card Description</p>
    <button frCardAction type="button">Action</button>
  </header>
  <div frCardContent>
    <input frInput type="email" />
  </div>
  <footer frCardFooter>Card Footer</footer>
</section>`,
    },
  ],

  tokenInspector: {
    id: 'token-inspector',
    title: 'Token inspector',
    description:
      'Inspect the card shell, header, title, description, action, content, and footer tokens.',
    preview: {
      component: DocsCardPreviewComponent,
      inputs: {
        config: {
          mode: 'inspector',
        },
      },
      inspectorTargets: [
        {
          id: 'root',
          label: 'Card',
          selector: '[data-token-target="card-root"]',
          description:
            'The card root controls the surface, border, radius, shadow, spacing, and typography.',
          tokens: [
            '--frame-card-bg',
            '--frame-card-color',
            '--frame-card-border',
            '--frame-card-radius',
            '--frame-card-shadow',
            '--frame-card-spacing',
            '--frame-card-font-size',
          ],
        },
        {
          id: 'header',
          label: 'Header',
          selector: '[data-token-target="card-header"]',
          description:
            'The header uses the shared card spacing and switches to a two-column layout when an action is present.',
          tokens: ['--frame-card-spacing', '--frame-card-gap'],
        },
        {
          id: 'title',
          label: 'Title',
          selector: '[data-token-target="card-title"]',
          description: 'Title tokens define emphasis and rhythm for the primary card heading.',
          tokens: [
            '--frame-card-title-color',
            '--frame-card-title-font-size',
            '--frame-card-title-font-weight',
            '--frame-card-title-line-height',
          ],
        },
        {
          id: 'description',
          label: 'Description',
          selector: '[data-token-target="card-description"]',
          description: 'Description tokens tune secondary helper text below the card title.',
          tokens: [
            '--frame-card-description-color',
            '--frame-card-description-font-size',
            '--frame-card-description-line-height',
          ],
        },
        {
          id: 'content',
          label: 'Content',
          selector: '[data-token-target="card-content"]',
          description:
            'Card content inherits the root foreground and uses the shared spacing token for inset.',
          tokens: ['--frame-card-spacing', '--frame-card-color'],
        },
        {
          id: 'footer',
          label: 'Footer',
          selector: '[data-token-target="card-footer"]',
          description: 'Footer tokens control the separated action area at the bottom of the card.',
          tokens: ['--frame-card-footer-bg', '--frame-card-footer-border', '--frame-card-spacing'],
        },
      ],
    },
  },

  styling: {
    description:
      'Override card tokens locally to tune spacing, radius, surface, shadow, or footer treatment without changing the markup.',
    preview: {
      id: 'custom-styling-preview',
      title: 'Custom Styling Preview',
      description: 'This preview customizes the root card spacing and surface tokens.',
      preview: {
        component: DocsCardPreviewComponent,
        inputs: {
          config: {
            mode: 'basic',
            style: `--frame-card-spacing: 1.25rem;
--frame-card-radius: 1.5rem;
--frame-card-bg: color-mix(in srgb, var(--frame-surface) 86%, var(--frame-primary));
--frame-card-shadow: 0 18px 48px rgb(0 0 0 / 0.14);`,
          },
        },
      },
      code: [
        {
          language: 'ts',
          code: cardImportsCode,
        },
        {
          language: 'html',
          code: `<div class=".account-card">
<section frCard>
  <header frCardHeader>
    <h3 frCardTitle>Login to your account</h3>
    <p frCardDescription>Enter your email below to login to your account</p>
    <button frCardAction frButton appearance="outline" type="button">Sign Up</button>
  </header>
  <div frCardContent>
    <label>
      <span>Email</span>
      <input frInput type="email" />
    </label>
  </div>
  <footer frCardFooter>
    <button frButton type="button">Login</button>
    <button frButton appearance="outline" type="button">Login with Google</button>
  </footer>
</section>
</div>`,
        },
        {
          language: 'css',
          code: `.account-card {
  --frame-card-spacing: 1.25rem;
  --frame-card-radius: 1.5rem;
  --frame-card-bg: color-mix(in srgb, var(--frame-surface) 86%, var(--frame-primary));
  --frame-card-shadow: 0 18px 48px rgb(0 0 0 / 0.14);
}`,
        },
      ],
    },
  },

  examples: [
    {
      id: 'basic',
      title: 'Basic',
      description: 'Displays a card with header, content, and footer sections.',
      preview: {
        component: DocsCardPreviewComponent,
      },
      code: [
        {
          language: 'ts',
          code: cardImportsCode,
        },
        {
          language: 'html',
          code: `<section frCard>
  <header frCardHeader>
    <h3 frCardTitle>Login to your account</h3>
    <p frCardDescription>Enter your email below to login to your account</p>
    <button frCardAction frButton appearance="outline" type="button">Sign Up</button>
  </header>
  <div frCardContent>
    <label>
      <span>Email</span>
      <input frInput type="email" />
    </label>
  </div>
  <footer frCardFooter>
    <button frButton type="button">Login</button>
  </footer>
</section>`,
        },
      ],
    },
    {
      id: 'composition',
      title: 'Composition',
      description:
        'Use the card parts together when the card needs title, description, action, body, and footer areas.',
      preview: {
        component: DocsCardPreviewComponent,
      },
      code: [
        {
          language: 'bash',
          code: `FrCard
+-- FrCardHeader
|   +-- FrCardTitle
|   +-- FrCardDescription
|   +-- FrCardAction
+-- FrCardContent
+-- FrCardFooter`,
        },
      ],
    },
    {
      id: 'size',
      title: 'Size',
      description: 'Use size="sm" for a more compact card with smaller shared spacing.',
      preview: {
        component: DocsCardPreviewComponent,
        inputs: { config: { mode: 'size' } },
      },
      code: [
        {
          language: 'ts',
          code: cardImportsCode,
        },
        {
          language: 'html',
          code: `<section frCard size="sm">
  <header frCardHeader>
    <h3 frCardTitle>Small Card</h3>
    <p frCardDescription>This card uses the compact size variant.</p>
    <button frCardAction frButton appearance="outline" size="sm">Action</button>
  </header>
</section>`,
        },
      ],
    },
    {
      id: 'spacing',
      title: 'Spacing',
      description:
        'Use the spacing input for standard card density. The supported values are "sm", "md", "lg", and "xl", mapping to 12px, 16px, 20px, and 32px.',
      preview: {
        component: DocsCardPreviewComponent,
        inputs: { config: { mode: 'spacing' } },
      },
      code: [
        {
          language: 'ts',
          code: cardImportsCode,
        },
        {
          language: 'html',
          code: `<section frCard spacing="lg">
  ...
</section>`,
        },
      ],
    },
    {
      id: 'custom-spacing',
      title: 'Custom spacing',
      description:
        'When the standard spacing options are not enough, omit the spacing input and override --frame-card-spacing locally.',
      preview: {
        component: DocsCardPreviewComponent,
        inputs: {
          config: {
            style: '--frame-card-spacing: 3rem;',
          },
        },
      },
      code: [
        {
          language: 'ts',
          code: cardImportsCode,
        },
        {
          language: 'html',
          code: `<section frCard class="custom-card-spacing">
  ...
</section>`,
        },
        {
          language: 'css',
          code: `.custom-card-spacing {
  --frame-card-spacing: 3rem;
}`,
        },
      ],
    },
    {
      id: 'image',
      title: 'Image',
      description: 'Add an image before the card header to create a media card.',
      preview: {
        component: DocsCardPreviewComponent,
        inputs: { config: { mode: 'image' } },
      },
      code: [
        {
          language: 'ts',
          code: cardImportsCode,
        },
        {
          language: 'html',
          code: `<section frCard>
  <img src="/event-cover.jpg" alt="Event cover" />
  <header frCardHeader>
    <span frBadge variant="secondary">Featured</span>
    <h3 frCardTitle>FrameUIs meetup</h3>
    <p frCardDescription>Component APIs, accessibility, and shipping faster.</p>
  </header>
</section>`,
        },
      ],
    },
    {
      id: 'rtl',
      title: 'RTL support',
      description:
        'Cards use logical properties, so header action placement, spacing, and media radii adapt in RTL layouts.',
      preview: {
        component: DocsCardPreviewComponent,
        inputs: { config: { mode: 'rtl' } },
      },
      code: [
        {
          language: 'ts',
          code: cardImportsCode,
        },
        {
          language: 'html',
          code: `<section frCard dir="rtl">
  <header frCardHeader>
    <h3 frCardTitle>تسجيل الدخول إلى حسابك</h3>
    <p frCardDescription>أدخل بريدك الإلكتروني أدناه لتسجيل الدخول إلى حسابك</p>
    <button frCardAction frButton appearance="outline">إنشاء حساب</button>
  </header>
</section>`,
        },
      ],
    },
  ],

  tokensTitle: 'Design Tokens',
  tokensDescription:
    'Use these CSS custom properties to tune card surface, spacing, typography, footer separation, and compact sizing.',
  tokens: `
  --frame-card-bg: var(--frame-surface);
  --frame-card-color: var(--frame-surface-foreground);
  --frame-card-border: var(--frame-border);
  --frame-card-radius: var(--frame-radius-xl);
  --frame-card-shadow: 0 1px 2px rgb(0 0 0 / 0.04);
  --frame-card-font-size: 0.875rem;
  --frame-card-title-color: var(--frame-foreground);
  --frame-card-title-font-size: 1rem;
  --frame-card-title-font-weight: 600;
  --frame-card-description-color: var(--frame-muted-foreground);
  --frame-card-footer-bg: color-mix(in srgb, var(--frame-muted) 48%, transparent);
  --frame-card-footer-border: var(--frame-border);
  `,
};

