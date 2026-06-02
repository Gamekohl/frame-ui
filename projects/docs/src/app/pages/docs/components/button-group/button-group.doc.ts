import { ComponentDoc } from '../../shared/models/component-doc.model';
import {
  ButtonGroupPreviewConfig,
  DocsButtonGroupPreviewComponent,
} from './previews/button-group-preview';

const buttonGroupImportsCode = `import { FrButtonModule } from '@frame-ui/components/button';
import { FrButtonGroupModule } from '@frame-ui/components/button-group';`;

const heroConfig: ButtonGroupPreviewConfig = {
  className: 'w-full max-w-xl',
  items: [
    { label: 'Overview', appearance: 'outline' },
    { label: 'Details', appearance: 'outline' },
    { label: 'Activity', appearance: 'outline' },
  ],
};

const basicConfig: ButtonGroupPreviewConfig = {
  items: [
    { label: 'Day', appearance: 'outline' },
    { label: 'Week', appearance: 'outline' },
    { label: 'Month', appearance: 'outline' },
  ],
};

const verticalConfig: ButtonGroupPreviewConfig = {
  orientation: 'vertical',
  className: 'w-full max-w-xs',
  items: [
    { label: 'Profile', appearance: 'outline' },
    { label: 'Notifications', appearance: 'outline' },
    { label: 'Security', appearance: 'outline' },
  ],
};

const iconConfig: ButtonGroupPreviewConfig = {
  className: 'w-full max-w-sm',
  groupClassName: 'w-auto',
  items: [
    {
      icon: 'tablerLayoutGrid',
      iconButton: true,
      appearance: 'outline',
      ariaLabel: 'Grid view',
    },
    {
      icon: 'tablerList',
      iconButton: true,
      appearance: 'outline',
      ariaLabel: 'List view',
    },
    {
      icon: 'tablerPlus',
      iconButton: true,
      appearance: 'outline',
      ariaLabel: 'Add item',
    },
  ],
};

const mixedConfig: ButtonGroupPreviewConfig = {
  className: 'w-full max-w-xl',
  items: [
    { label: 'Create', icon: 'tablerPlus', appearance: 'primary' },
    { label: 'Next', icon: 'tablerArrowRight', appearance: 'outline' },
    { label: 'Close', icon: 'tablerX', appearance: 'ghost' },
  ],
};

const customStylingConfig: ButtonGroupPreviewConfig = {
  className: 'w-full max-w-xl',
  style: `--frame-button-root-height: 2.75rem;
--frame-button-root-padding-x: 1.125rem;
--frame-button-root-font-size: 0.9375rem;
--frame-button-root-radius: 1rem;
--frame-button-root-gap: 0.625rem;
--frame-button-root-border: color-mix(in srgb, var(--frame-primary) 18%, transparent);
--frame-button-root-hover-filter: brightness(1.01);
--frame-button-icon-size: 1rem;`,
  items: [
    { label: 'Create', icon: 'tablerPlus', appearance: 'outline' },
    { label: 'Open', icon: 'tablerArrowRight', appearance: 'outline' },
    { label: 'Close', icon: 'tablerX', appearance: 'outline' },
  ],
};

export const BUTTON_GROUP_DOC: ComponentDoc = {
  slug: 'button-group',
  breadcrumb: 'Components / Button Group',

  hero: {
    id: 'button-group-hero',
    title: 'Preview',
    preview: {
      component: DocsButtonGroupPreviewComponent,
      inputs: {
        config: heroConfig,
      },
    },
  },

  installation: {
    cli: {
      language: 'bash',
      code: 'npx your-cli add button-group',
    },
    manual: {
      steps: [
        {
          title:
            'Import the button group primitive plus the button building blocks you want to place inside it.',
          code: {
            language: 'ts',
            code: `import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { tablerArrowRight, tablerLayoutGrid, tablerList, tablerPlus, tablerX } from '@ng-icons/tabler-icons';
import { FrButtonModule } from '@frame-ui/components/button';
import { FrButtonGroupModule } from '@frame-ui/components/button-group';`,
          },
        },
        {
          title: 'Register the tabler icons used by the grouped actions.',
          code: {
            language: 'ts',
            code: `viewProviders: [
  provideIcons({ tablerPlus, tablerArrowRight, tablerX, tablerLayoutGrid, tablerList }),
]`,
          },
        },
      ],
    },
  },

  usage: [
    {
      language: 'ts',
      code: buttonGroupImportsCode,
    },
    {
      language: 'html',
      code: `<div frButtonGroup>
  <button frButton appearance="outline" type="button">
    <span frButtonIcon>
      <ng-icon name="tablerPlus" size="16" />
    </span>
    <span frButtonLabel>Create</span>
  </button>

  <button frButton appearance="outline" type="button">
    <span frButtonLabel>Review</span>
  </button>
</div>`,
    },
  ],

  tokenInspector: {
    id: 'token-inspector',
    title: 'Token inspector',
    description:
      'Button Group is structural and does not introduce its own component token set. The grouped controls inherit their visual styling from Button, so inspect the grouped button shell, icon, and label to see the button tokens that drive the final result inside the group.'
  },

  styling: {
    description:
      'Button group itself is structural, so most visual customization happens by scoping button tokens to the grouped children. That keeps the shared borders and collapsed radii while letting you tune the contained buttons.',
    preview: {
      id: 'custom-styling-preview',
      title: 'Custom Styling Preview',
      description:
        'This preview applies button-level token overrides inside the group to change height, radius, icon sizing, and border treatment.',
      preview: {
        component: DocsButtonGroupPreviewComponent,
        inputs: {
          config: customStylingConfig,
        },
      },
      code: [
        {
          language: 'ts',
          code: buttonGroupImportsCode,
        },
        {
          language: 'html',
          code: `<div class="release-button-group" frButtonGroup>
  <button frButton appearance="outline" type="button">
    <span frButtonIcon>
      <ng-icon name="tablerPlus" size="16" />
    </span>
    <span frButtonLabel>Create</span>
  </button>

  <button frButton appearance="outline" type="button">
    <span frButtonIcon>
      <ng-icon name="tablerArrowRight" size="16" />
    </span>
    <span frButtonLabel>Open</span>
  </button>

  <button frButton appearance="outline" type="button">
    <span frButtonIcon>
      <ng-icon name="tablerX" size="16" />
    </span>
    <span frButtonLabel>Close</span>
  </button>
</div>`,
        },
      {
        language: 'css',
        code: `.release-button-group {
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
        'Use a horizontal group when several related actions or view states should read as one compact control cluster.',
      preview: {
        component: DocsButtonGroupPreviewComponent,
        inputs: {
          config: basicConfig,
        },
      },
      code: [
        {
          language: 'ts',
          code: buttonGroupImportsCode,
        },
        {
          language: 'html',
          code: `<div frButtonGroup>
  <button frButton appearance="outline" type="button">
    <span frButtonLabel>Day</span>
  </button>

  <button frButton appearance="outline" type="button">
    <span frButtonLabel>Week</span>
  </button>

  <button frButton appearance="outline" type="button">
    <span frButtonLabel>Month</span>
  </button>
</div>`,
        },
      ],
    },
    {
      id: 'vertical',
      title: 'Vertical',
      description:
        'Use vertical orientation when grouped actions stack in sidebars, settings panels, or narrow tool trays.',
      preview: {
        component: DocsButtonGroupPreviewComponent,
        inputs: {
          config: verticalConfig,
        },
      },
      code: [
        {
          language: 'ts',
          code: buttonGroupImportsCode,
        },
        {
          language: 'html',
          code: `<div frButtonGroup orientation="vertical">
  <button frButton appearance="outline" type="button">
    <span frButtonLabel>Profile</span>
  </button>

  <button frButton appearance="outline" type="button">
    <span frButtonLabel>Notifications</span>
  </button>

  <button frButton appearance="outline" type="button">
    <span frButtonLabel>Security</span>
  </button>
</div>`,
        },
      ],
    },
    {
      id: 'icon-actions',
      title: 'Icon actions',
      description:
        'Icon buttons group well for compact display-mode switches or toolbar actions, as long as each button has an accessible label.',
      preview: {
        component: DocsButtonGroupPreviewComponent,
        inputs: {
          config: iconConfig,
        },
      },
      code: [
        {
          language: 'ts',
          code: buttonGroupImportsCode,
        },
        {
          language: 'html',
          code: `<div frButtonGroup>
  <button frIconButton appearance="outline" aria-label="Grid view" type="button">
    <span frButtonIcon>
      <ng-icon name="tablerLayoutGrid" size="16" />
    </span>
  </button>

  <button frIconButton appearance="outline" aria-label="List view" type="button">
    <span frButtonIcon>
      <ng-icon name="tablerList" size="16" />
    </span>
  </button>

  <button frIconButton appearance="outline" aria-label="Add item" type="button">
    <span frButtonIcon>
      <ng-icon name="tablerPlus" size="16" />
    </span>
  </button>
</div>`,
        },
      ],
    },
    {
      id: 'mixed-appearances',
      title: 'Mixed emphasis',
      description:
        'You can mix contained button appearances, but use that sparingly so the group still reads as one coordinated control.',
      preview: {
        component: DocsButtonGroupPreviewComponent,
        inputs: {
          config: mixedConfig,
        },
      },
      code: [
        {
          language: 'ts',
          code: buttonGroupImportsCode,
        },
        {
          language: 'html',
          code: `<div frButtonGroup>
  <button frButton type="button">
    <span frButtonIcon>
      <ng-icon name="tablerPlus" size="16" />
    </span>
    <span frButtonLabel>Create</span>
  </button>

  <button frButton appearance="outline" type="button">
    <span frButtonIcon>
      <ng-icon name="tablerArrowRight" size="16" />
    </span>
    <span frButtonLabel>Next</span>
  </button>

  <button frButton appearance="ghost" type="button">
    <span frButtonIcon>
      <ng-icon name="tablerX" size="16" />
    </span>
    <span frButtonLabel>Close</span>
  </button>
</div>`,
        },
      ],
    },
  ],

  tokensTitle: 'Design Tokens',
  tokensDescription:
    'Button Group does not define its own component-specific design tokens. It inherits the visual token surface from Button, while the group itself only applies structural layout rules such as collapsed borders and shared radii.'
};

