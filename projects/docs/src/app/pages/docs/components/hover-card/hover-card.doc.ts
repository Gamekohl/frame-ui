import { ComponentDoc } from '../../shared/models/component-doc.model';
import { DocsHoverCardPreviewComponent } from './previews/hover-card-preview';

const importsCode = `import { FrAvatarModule } from '@frame-ui-ng/components/avatar';
import { FrButtonModule } from '@frame-ui-ng/components/button';
import { FrHoverCardModule } from '@frame-ui-ng/components/hover-card';`;

const basicHtml = `<frame-hover-card>
  <button frButton appearance="ghost" [frHoverCardTrigger]="card" type="button">
    @angular
  </button>

  <ng-template #card="frHoverCardContent" frHoverCardContent side="bottom" align="center">
    <div frHoverCardPanel>
      <div class="flex gap-3">
        <span frAvatar>
          <span frAvatarFallback>NG</span>
        </span>
        <div>
          <p class="frame-hover-card__title">@angular</p>
          <p class="frame-hover-card__description">
            The web development framework for building modern applications.
          </p>
          <p class="frame-hover-card__meta">Joined January 2010</p>
        </div>
      </div>
    </div>
  </ng-template>
</frame-hover-card>`;

const delayHtml = `<frame-hover-card [openDelay]="100" [closeDelay]="200">
  <button frButton appearance="outline" [frHoverCardTrigger]="card" type="button">
    Hover slowly
  </button>

  <ng-template #card="frHoverCardContent" frHoverCardContent side="top" align="center">
    <div frHoverCardPanel>
      <p class="frame-hover-card__title">Calmer timing</p>
      <p class="frame-hover-card__description">
        This card opens quickly and stays available a little longer.
      </p>
    </div>
  </ng-template>
</frame-hover-card>`;

const positioningHtml = `<frame-hover-card>
  <button frButton appearance="outline" [frHoverCardTrigger]="card" type="button">
    Top center
  </button>

  <ng-template
    #card="frHoverCardContent"
    frHoverCardContent
    side="top"
    align="center"
    [sideOffset]="16"
    [alignOffset]="0"
  >
    <div frHoverCardPanel>
      <p class="frame-hover-card__title">Top side</p>
      <p class="frame-hover-card__description">
        Use side, align, sideOffset, and alignOffset to tune placement.
      </p>
    </div>
  </ng-template>
</frame-hover-card>`;

const customStylingHtml = `<frame-hover-card>
  <button
    frButton
    appearance="outline"
    [frHoverCardTrigger]="card"
    type="button"
    class="custom-hover-card-trigger"
  >
    Hover custom card
  </button>

  <ng-template #card="frHoverCardContent" frHoverCardContent side="right" align="center">
    <div frHoverCardPanel class="custom-hover-card">
      <span class="custom-hover-card__badge">Team</span>
      <p class="frame-hover-card__title">FrameUIs Guild</p>
      <p class="frame-hover-card__description">
        Token overrides can reshape the card without changing the primitive.
      </p>
    </div>
  </ng-template>
</frame-hover-card>`;

const customStylingCss = `.custom-hover-card-trigger {
  --frame-hover-card-content-width: 18rem;
  --frame-hover-card-content-radius: var(--frame-radius-lg);
  --frame-hover-card-content-bg: linear-gradient(
    135deg,
    var(--frame-surface),
    color-mix(in srgb, var(--frame-primary) 10%, var(--frame-surface))
  );
  --frame-hover-card-content-shadow: 0 24px 70px color-mix(in srgb, var(--frame-primary) 18%, transparent);
  --frame-hover-card-title-color: var(--frame-primary);
}

.custom-hover-card__badge {
  border-radius: var(--frame-radius-full);
  background: color-mix(in srgb, var(--frame-primary) 12%, transparent);
  color: var(--frame-primary);
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.125rem 0.5rem;
}`;

const rtlHtml = `<div dir="rtl">
  <frame-hover-card>
    <button frButton appearance="outline" [frHoverCardTrigger]="card" type="button">
      العربية
    </button>

    <ng-template #card="frHoverCardContent" frHoverCardContent side="bottom" align="end">
      <div frHoverCardPanel>
        <p class="frame-hover-card__title">@angular_ar</p>
        <p class="frame-hover-card__description">
          بطاقة تظهر عند التحويم وتدعم اتجاه النص من اليمين إلى اليسار.
        </p>
      </div>
    </ng-template>
  </frame-hover-card>
</div>`;

export const HOVER_CARD_DOC: ComponentDoc = {
  slug: 'hover-card',
  breadcrumb: 'Components / Hover Card',

  hero: {
    id: 'hover-card-hero',
    title: 'Preview',
    description: 'For sighted users to preview content available behind a link or action.',
    preview: {
      component: DocsHoverCardPreviewComponent,
    },
  },

  installation: {
    cli: {
      language: 'bash',
      code: 'npx your-cli add hover-card',
    },
    manual: {
      steps: [
        {
          title: 'Import the hover card primitives.',
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
    { language: 'html', code: basicHtml },
  ],

  composition: `HoverCard
├── HoverCardTrigger
└── HoverCardContent
    └── HoverCardPanel`,

  tokenInspector: {
    id: 'token-inspector',
    title: 'Token inspector',
    description: 'Inspect the hover card surface, title, description, and supporting metadata.',
    preview: {
      component: DocsHoverCardPreviewComponent,
      inputs: {
        config: { mode: 'inspector' },
      },
      inspectorLayout: 'popover',
      inspectorTargets: [
        {
          id: 'content',
          label: 'Panel',
          selector: '[data-token-target="hover-card-content"]',
          description: 'The panel controls width, padding, surface, border, radius, shadow, spacing, and motion.',
          tokens: [
            '--frame-hover-card-content-width',
            '--frame-hover-card-content-padding',
            '--frame-hover-card-content-radius',
            '--frame-hover-card-content-bg',
            '--frame-hover-card-content-color',
            '--frame-hover-card-content-border',
            '--frame-hover-card-content-shadow',
            '--frame-hover-card-content-gap',
            '--frame-hover-card-motion-duration',
            '--frame-hover-card-motion-easing',
            '--frame-hover-card-motion-distance',
            '--frame-hover-card-motion-scale',
          ],
        },
        {
          id: 'title',
          label: 'Title',
          selector: '[data-token-target="hover-card-title"]',
          description: 'Title tokens define the primary identity or heading inside the card.',
          tokens: [
            '--frame-hover-card-title-color',
            '--frame-hover-card-title-font-size',
            '--frame-hover-card-title-font-weight',
          ],
        },
        {
          id: 'description',
          label: 'Description',
          selector: '[data-token-target="hover-card-description"]',
          description: 'Description tokens tune the supporting copy beneath the title.',
          tokens: ['--frame-hover-card-description-color', '--frame-hover-card-description-font-size'],
        },
        {
          id: 'meta',
          label: 'Meta',
          selector: '[data-token-target="hover-card-meta"]',
          description: 'Meta tokens style secondary facts such as dates, counts, or compact context rows.',
          tokens: ['--frame-hover-card-meta-color', '--frame-hover-card-meta-font-size'],
        },
      ],
    },
  },

  examples: [
    {
      id: 'basic',
      title: 'Basic',
      description: 'A basic hover card that previews content behind a trigger.',
      preview: {
        component: DocsHoverCardPreviewComponent,
      },
      code: [
        { language: 'ts', code: importsCode },
        { language: 'html', code: basicHtml },
      ],
    },
    {
      id: 'trigger-delays',
      title: 'Trigger Delays',
      description: 'Use `openDelay` and `closeDelay` on the root to control hover timing.',
      preview: {
        component: DocsHoverCardPreviewComponent,
        inputs: { config: { mode: 'custom-delay' } },
      },
      code: [
        { language: 'ts', code: importsCode },
        { language: 'html', code: delayHtml },
      ],
    },
    {
      id: 'positioning',
      title: 'Positioning',
      description: 'Use `side`, `align`, `sideOffset`, and `alignOffset` to place the card on any side of the trigger.',
      preview: {
        component: DocsHoverCardPreviewComponent,
        inputs: { config: { mode: 'sides' } },
      },
      code: [
        { language: 'ts', code: importsCode },
        { language: 'html', code: positioningHtml },
      ],
    },
    {
      id: 'custom-styling',
      title: 'Custom Styling',
      description: 'Override hover-card tokens from the trigger tree to customize the overlay panel.',
      preview: {
        component: DocsHoverCardPreviewComponent,
        inputs: { config: { mode: 'custom-styling' } },
      },
      code: [
        { language: 'ts', code: importsCode },
        { language: 'html', code: customStylingHtml },
        { language: 'css', code: customStylingCss },
      ],
    },
    {
      id: 'rtl',
      title: 'RTL',
      description: 'Hover cards inherit text direction from their surrounding context.',
      preview: {
        component: DocsHoverCardPreviewComponent,
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
    'Hover card tokens style the floating content shell and common text affordances while leaving nested primitives such as Avatar and Button to their own token contracts.',
  tokens: `
  --frame-hover-card-content-width: 20rem;
  --frame-hover-card-content-padding: 1rem;
  --frame-hover-card-content-radius: var(--frame-radius-md);
  --frame-hover-card-content-bg: var(--frame-surface);
  --frame-hover-card-content-color: var(--frame-surface-foreground);
  --frame-hover-card-content-border: var(--frame-border);
  --frame-hover-card-content-shadow: var(--frame-shadow-md);
  --frame-hover-card-content-gap: 0.75rem;
  --frame-hover-card-title-color: var(--frame-foreground);
  --frame-hover-card-title-font-size: 0.875rem;
  --frame-hover-card-title-font-weight: 600;
  --frame-hover-card-description-color: var(--frame-muted-foreground);
  --frame-hover-card-description-font-size: 0.875rem;
  --frame-hover-card-meta-color: var(--frame-muted-foreground);
  --frame-hover-card-meta-font-size: 0.75rem;
  --frame-hover-card-motion-duration: 140ms;
  --frame-hover-card-motion-easing: cubic-bezier(0.16, 1, 0.3, 1);
  --frame-hover-card-motion-distance: 0.25rem;
  --frame-hover-card-motion-scale: 0.96;
  `,
};

