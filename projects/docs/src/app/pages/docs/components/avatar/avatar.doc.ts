import { ComponentDoc } from '../../shared/models/component-doc.model';
import {
  AVATAR_PREVIEW_IMAGE,
  AvatarPreviewConfig,
  DocsAvatarPreviewComponent,
} from './previews/avatar-preview';

const avatarImportsCode = `import { FrAvatarModule } from '@frame-ui-ng/components/avatar';`;

const heroConfig: AvatarPreviewConfig = {
  className: 'grid w-full max-w-2xl gap-6',
  avatars: [
    {
      imageSrc: AVATAR_PREVIEW_IMAGE,
      fallback: 'SC',
      alt: 'Sarah Chen',
      size: 'lg',
      badge: '4',
    },
    {
      imageSrc: AVATAR_PREVIEW_IMAGE,
      fallback: 'MT',
      alt: 'Maya Torres',
      size: 'md',
    },
    {
      brokenImage: true,
      fallback: 'JR',
      alt: 'Jordan Reed',
      size: 'md',
    },
    {
      icon: '@',
      alt: 'Generic account avatar',
      size: 'md',
    },
  ],
};

const basicConfig: AvatarPreviewConfig = {
  className: 'grid w-full max-w-2xl gap-6',
  avatars: [
    {
      imageSrc: AVATAR_PREVIEW_IMAGE,
      fallback: 'SC',
      alt: 'Sarah Chen',
      size: 'md',
    },
  ],
};

const fallbackConfig: AvatarPreviewConfig = {
  className: 'grid w-full max-w-2xl gap-6',
  avatars: [
    {
      brokenImage: true,
      fallback: 'JR',
      alt: 'Jordan Reed',
      size: 'md',
    },
    {
      icon: '@',
      alt: 'Generic account avatar',
      size: 'md',
    },
  ],
};

const sizesConfig: AvatarPreviewConfig = {
  className: 'grid w-full max-w-2xl gap-6',
  avatars: [
    {
      imageSrc: AVATAR_PREVIEW_IMAGE,
      fallback: 'SC',
      alt: 'Sarah Chen',
      size: 'xs',
    },
    {
      imageSrc: AVATAR_PREVIEW_IMAGE,
      fallback: 'MT',
      alt: 'Maya Torres',
      size: 'sm',
    },
    {
      imageSrc: AVATAR_PREVIEW_IMAGE,
      fallback: 'JR',
      alt: 'Jordan Reed',
      size: 'md',
    },
    {
      imageSrc: AVATAR_PREVIEW_IMAGE,
      fallback: 'NS',
      alt: 'Nina Shah',
      size: 'lg',
    },
  ],
};

const badgeConfig: AvatarPreviewConfig = {
  className: 'grid w-full max-w-2xl gap-6',
  avatars: [
    {
      imageSrc: AVATAR_PREVIEW_IMAGE,
      fallback: 'MT',
      alt: 'Maya Torres',
      size: 'lg',
      badge: '9',
    },
  ],
};

const groupConfig: AvatarPreviewConfig = {
  className: 'grid w-full max-w-2xl gap-6',
  group: {
    size: 'md',
    expandOnHover: true,
    countLabel: '+3',
    members: [
      {
        imageSrc: AVATAR_PREVIEW_IMAGE,
        fallback: 'SC',
        alt: 'Sarah Chen',
      },
      {
        imageSrc: AVATAR_PREVIEW_IMAGE,
        fallback: 'MT',
        alt: 'Maya Torres',
      },
      {
        brokenImage: true,
        fallback: 'JR',
        alt: 'Jordan Reed',
      },
    ],
  },
};

const inspectorConfig: AvatarPreviewConfig = {
  className: 'grid w-full max-w-2xl gap-6',
  avatars: [
    {
      imageSrc: AVATAR_PREVIEW_IMAGE,
      fallback: 'SC',
      alt: 'Sarah Chen',
      size: 'md',
      badge: '4',
      tokenPrefix: 'hero',
    },
    {
      brokenImage: true,
      fallback: 'JR',
      alt: 'Jordan Reed',
      size: 'md',
      tokenPrefix: 'fallback',
    },
  ],
  group: {
    size: 'md',
    expandOnHover: true,
    countLabel: '+2',
    tokenPrefix: 'group',
    members: [
      {
        imageSrc: AVATAR_PREVIEW_IMAGE,
        fallback: 'MT',
        alt: 'Maya Torres',
      },
      {
        imageSrc: AVATAR_PREVIEW_IMAGE,
        fallback: 'NS',
        alt: 'Nina Shah',
      },
    ],
  },
};

const customStylingConfig: AvatarPreviewConfig = {
  className: 'grid w-full max-w-2xl gap-6',
  style: `--frame-avatar-root-radius: var(--frame-radius-lg);
--frame-avatar-root-bg: color-mix(in srgb, var(--frame-primary) 10%, var(--frame-surface));
--frame-avatar-root-border: color-mix(in srgb, var(--frame-primary) 22%, transparent);
--frame-avatar-root-color: var(--frame-primary);
--frame-avatar-size-md: 2.75rem;
--frame-avatar-badge-bg: var(--frame-primary);
--frame-avatar-badge-color: var(--frame-primary-foreground);
--frame-avatar-badge-size: 1rem;
--frame-avatar-group-overlap: 0.875rem;
--frame-avatar-group-count-bg: color-mix(in srgb, var(--frame-primary) 8%, var(--frame-surface));`,
  avatars: [
    {
      imageSrc: AVATAR_PREVIEW_IMAGE,
      fallback: 'NS',
      alt: 'Nina Shah',
      size: 'md',
      badge: '2',
    },
  ],
  group: {
    size: 'md',
    countLabel: '+1',
    members: [
      {
        imageSrc: AVATAR_PREVIEW_IMAGE,
        fallback: 'SC',
        alt: 'Sarah Chen',
      },
      {
        brokenImage: true,
        fallback: 'JR',
        alt: 'Jordan Reed',
      },
    ],
  },
};

export const AVATAR_DOC: ComponentDoc = {
  slug: 'avatar',
  breadcrumb: 'Components / Avatar',

  hero: {
    id: 'avatar-hero',
    title: 'Preview',
    preview: {
      component: DocsAvatarPreviewComponent,
      inputs: {
        config: heroConfig,
      },
    },
  },

  installation: {
    cli: {
      language: 'bash',
      code: 'npx your-cli add avatar',
    },
    manual: {
      steps: [
        {
          title: 'Import the avatar primitives your view needs.',
          code: {
            language: 'ts',
            code: `import { FrAvatarModule } from '@frame-ui-ng/components/avatar';`,
          },
        },
      ],
    },
  },

  usage: [
    {
      language: 'ts',
      code: avatarImportsCode,
    },
    {
      language: 'html',
      code: `<span frAvatar size="md">
  <img frAvatarImage src="data:image/svg+xml;utf8,..." alt="Sarah Chen" />
  <span frAvatarFallback>SC</span>
</span>`,
    },
  ],

  tokenInspector: {
    id: 'token-inspector',
    title: 'Token inspector',
    description:
      'Hover the avatar shell, image, fallback, badge, or group count to inspect the tokens that control sizing, surfaces, overlays, and overlap behavior. Click a region to pin the inspector while you review the current values.',
    preview: {
      component: DocsAvatarPreviewComponent,
      containerClass: 'block',
      inputs: {
        config: inspectorConfig,
      },
      inspectorTargets: [
        {
          id: 'root',
          label: 'Avatar shell',
          selector: '[data-token-target="hero-root"]',
          description:
            'The root avatar token set controls size, radius, background, border, and default text styling.',
          tokens: [
            '--frame-avatar-root-size',
            '--frame-avatar-root-radius',
            '--frame-avatar-root-bg',
            '--frame-avatar-root-border',
            '--frame-avatar-root-color',
            '--frame-avatar-root-font-size',
            '--frame-avatar-root-font-weight',
          ],
        },
        {
          id: 'image',
          label: 'Avatar image',
          selector: '[data-token-target="hero-image"]',
          description: 'Image presentation is controlled through the shared object-fit token.',
          tokens: ['--frame-avatar-image-fit'],
        },
        {
          id: 'fallback',
          label: 'Fallback content',
          selector: '[data-token-target="fallback-fallback"]',
          description:
            'Fallback content inherits the root sizing while adding its own internal padding for initials or short labels.',
          tokens: [
            '--frame-avatar-fallback-padding',
            '--frame-avatar-root-color',
            '--frame-avatar-root-font-size',
          ],
        },
        {
          id: 'badge',
          label: 'Badge',
          selector: '[data-token-target="hero-badge"]',
          description:
            'Badges define their own size, color, radius, and border so counts stay legible over the avatar.',
          tokens: [
            '--frame-avatar-badge-size',
            '--frame-avatar-badge-radius',
            '--frame-avatar-badge-bg',
            '--frame-avatar-badge-border',
            '--frame-avatar-badge-color',
            '--frame-avatar-badge-font-size',
            '--frame-avatar-badge-font-weight',
          ],
        },
        {
          id: 'group',
          label: 'Avatar group',
          selector: '[data-token-target="group-group"]',
          description:
            'Groups use overlap and motion tokens to control how tightly stacked avatars spread apart on hover.',
          tokens: [
            '--frame-avatar-group-overlap',
            '--frame-avatar-group-transition-duration',
            '--frame-avatar-group-transition-timing',
          ],
        },
        {
          id: 'group-count',
          label: 'Group count',
          selector: '[data-token-target="group-count"]',
          description:
            'The count chip has its own background, border, and foreground tokens for overflow cases.',
          tokens: [
            '--frame-avatar-group-count-bg',
            '--frame-avatar-group-count-border',
            '--frame-avatar-group-count-color',
          ],
        },
      ],
    },
  },

  styling: {
    description:
      'Override avatar tokens on a local wrapper when a specific product area needs different radii, badge treatments, or grouping density while keeping the same markup and behaviors.',
    preview: {
      id: 'custom-styling-preview',
      title: 'Custom Styling Preview',
      description:
        'This preview applies local token overrides to reshape the avatar, tweak badge sizing, and loosen the group overlap.',
      preview: {
        component: DocsAvatarPreviewComponent,
        inputs: {
          config: customStylingConfig,
        },
      },
      code: [
        {
          language: 'ts',
          code: avatarImportsCode,
        },
        {
          language: 'html',
          code: `<div class="team-avatar-surface">
  <span frAvatar size="md">
    <img frAvatarImage src="data:image/svg+xml;utf8,..." alt="Nina Shah" />
    <span frAvatarFallback>NS</span>
    <span frAvatarBadge>2</span>
  </span>

  <div frAvatarGroup size="md">
    <span frAvatar>
      <img frAvatarImage src="data:image/svg+xml;utf8,..." alt="Sarah Chen" />
      <span frAvatarFallback>SC</span>
    </span>
    <span frAvatar>
      <span frAvatarFallback>JR</span>
    </span>
    <span frAvatarGroupCount>+1</span>
  </div>
</div>`,
        },
        {
          language: 'css',
          code: `.team-avatar-surface {
${customStylingConfig.style}
}`,
        },
      ],
    },
  },

  examples: [
    {
      id: 'basic',
      title: 'Basic',
      description:
        'Use an image with a fallback so the avatar still renders meaningful identity when the image is missing or fails.',
      preview: {
        component: DocsAvatarPreviewComponent,
        inputs: {
          config: basicConfig,
        },
      },
      code: [
        {
          language: 'ts',
          code: avatarImportsCode,
        },
        {
          language: 'html',
          code: `<span frAvatar size="md">
  <img frAvatarImage src="data:image/svg+xml;utf8,..." alt="Sarah Chen" />
  <span frAvatarFallback>SC</span>
</span>`,
        },
      ],
    },
    {
      id: 'fallback',
      title: 'Fallbacks',
      description:
        'Fallback initials and icon-only avatars cover broken images, generic accounts, and not-yet-uploaded profiles.',
      preview: {
        component: DocsAvatarPreviewComponent,
        inputs: {
          config: fallbackConfig,
        },
      },
      code: [
        {
          language: 'ts',
          code: avatarImportsCode,
        },
        {
          language: 'html',
          code: `<span frAvatar>
  <img frAvatarImage src="" alt="Jordan Reed" />
  <span frAvatarFallback>JR</span>
</span>

<span frAvatar>
  <span frAvatarIcon>@</span>
</span>`,
        },
      ],
    },
    {
      id: 'sizes',
      title: 'Sizes',
      description:
        'Choose from `xs`, `sm`, `md`, and `lg` to match dense lists, cards, or larger profile surfaces.',
      preview: {
        component: DocsAvatarPreviewComponent,
        inputs: {
          config: sizesConfig,
        },
      },
      code: [
        {
          language: 'ts',
          code: avatarImportsCode,
        },
        {
          language: 'html',
          code: `<span frAvatar size="xs">
  <span frAvatarFallback>SC</span>
</span>

<span frAvatar size="sm">
  <span frAvatarFallback>MT</span>
</span>

<span frAvatar size="md">
  <span frAvatarFallback>JR</span>
</span>

<span frAvatar size="lg">
  <span frAvatarFallback>NS</span>
</span>`,
        },
      ],
    },
    {
      id: 'badge',
      title: 'Badges',
      description:
        'Badges work well for unread counts, online markers, or lightweight secondary status attached to a person.',
      preview: {
        component: DocsAvatarPreviewComponent,
        inputs: {
          config: badgeConfig,
        },
      },
      code: [
        {
          language: 'ts',
          code: avatarImportsCode,
        },
        {
          language: 'html',
          code: `<span frAvatar size="lg">
  <img frAvatarImage src="data:image/svg+xml;utf8,..." alt="Maya Torres" />
  <span frAvatarFallback>MT</span>
  <span frAvatarBadge>9</span>
</span>`,
        },
      ],
    },
    {
      id: 'group',
      title: 'Groups',
      description:
        'Group avatars when several people share ownership of a task, thread, or document, and expand them on hover when overlap should relax.',
      preview: {
        component: DocsAvatarPreviewComponent,
        inputs: {
          config: groupConfig,
        },
      },
      code: [
        {
          language: 'ts',
          code: avatarImportsCode,
        },
        {
          language: 'html',
          code: `<div frAvatarGroup size="md" expandOnHover>
  <span frAvatar>
    <img frAvatarImage src="data:image/svg+xml;utf8,..." alt="Sarah Chen" />
    <span frAvatarFallback>SC</span>
  </span>

  <span frAvatar>
    <img frAvatarImage src="data:image/svg+xml;utf8,..." alt="Maya Torres" />
    <span frAvatarFallback>MT</span>
  </span>

  <span frAvatar>
    <span frAvatarFallback>JR</span>
  </span>

  <span frAvatarGroupCount>+3</span>
</div>`,
        },
      ],
    },
  ],

  tokensTitle: 'Design Tokens',
  tokensDescription:
    'Use these CSS custom properties to tune avatar sizing, fallback spacing, badge styling, and group overlap without changing the component markup.',
  tokens: `
  --frame-avatar-root-size: 2.5rem;
  --frame-avatar-root-radius: var(--frame-radius-full);
  --frame-avatar-root-bg: var(--frame-muted);
  --frame-avatar-root-border: transparent;
  --frame-avatar-root-color: var(--frame-muted-foreground);
  --frame-avatar-root-font-size: 0.875rem;
  --frame-avatar-root-font-weight: 600;
  --frame-avatar-root-shadow: none;
  --frame-avatar-size-xs: 1.5rem;
  --frame-avatar-size-sm: 2rem;
  --frame-avatar-size-md: 2.5rem;
  --frame-avatar-size-lg: 3.5rem;
  --frame-avatar-font-size-xs: 0.5rem;
  --frame-avatar-font-size-sm: 0.75rem;
  --frame-avatar-font-size-md: 0.875rem;
  --frame-avatar-font-size-lg: 1rem;
  --frame-avatar-image-fit: cover;
  --frame-avatar-fallback-padding: 0.25rem;
  --frame-avatar-icon-size: 1rem;
  --frame-avatar-badge-size: 0.875rem;
  --frame-avatar-badge-radius: var(--frame-radius-full);
  --frame-avatar-badge-bg: var(--frame-primary);
  --frame-avatar-badge-border: var(--frame-surface);
  --frame-avatar-badge-color: var(--frame-primary-foreground);
  --frame-avatar-badge-font-size: 0.625rem;
  --frame-avatar-badge-font-weight: 700;
  --frame-avatar-group-overlap: 0.625rem;
  --frame-avatar-group-transition-duration: 180ms;
  --frame-avatar-group-transition-timing: ease;
  --frame-avatar-group-count-bg: var(--frame-surface);
  --frame-avatar-group-count-border: var(--frame-border);
  --frame-avatar-group-count-color: var(--frame-muted-foreground);
  `,
};

