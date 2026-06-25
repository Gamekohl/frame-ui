import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { tablerArrowRight } from '@ng-icons/tabler-icons';

import { DocsCodeBlockComponent } from '../shared/components/docs-code-block/docs-code-block';
import { DocsTocComponent } from '../shared/components/docs-toc/docs-toc';
import { DocsTocItem } from '../shared/components/docs-toc/docs-toc.types';

@Component({
  selector: 'app-theming',
  imports: [DocsCodeBlockComponent, DocsTocComponent, NgIcon],
  templateUrl: './theming.html',
  styleUrl: './theming.scss',
  viewProviders: [provideIcons({ tablerArrowRight })],
})
export class Theming {
  protected readonly toc: DocsTocItem[] = [
    { id: 'how-it-works', title: 'How it works' },
    { id: 'what-you-can-change', title: 'What you can change' },
    {
      id: 'source-of-truth',
      title: 'Choose who controls the theme',
      children: [
        { id: 'frame-controls-data-theme', title: 'FrameUI controls data-theme', level: 2 },
        {
          id: 'frame-controls-class',
          title: 'FrameUI controls .dark',
          level: 2,
        },
        {
          id: 'app-controls-class',
          title: 'App controls .dark',
          level: 2,
        },
        {
          id: 'app-controls-data-theme',
          title: 'App controls data-theme',
          level: 2,
        },
      ],
    },
    { id: 'global-appearance-options', title: 'Global appearance options' },
    { id: 'migration', title: 'Migration' },
    { id: 'tailwind-css', title: 'Tailwind CSS' },
    { id: 'bootstrap-and-other-css-frameworks', title: 'Bootstrap and other CSS frameworks' },
    { id: 'local-overrides', title: 'Local overrides' },
  ];

  protected readonly frameControlsDataThemeCode = `import { provideFrameUI } from '@frame-ui-ng/foundation';

export const appConfig = {
  providers: [
    provideFrameUI({
      defaultTheme: 'light',
      theme: {
        controlledBy: 'frame',
        using: 'data-theme',
      },
    }),
  ],
};`;

  protected readonly frameControlsClassCode = `import { provideFrameUI } from '@frame-ui-ng/foundation';

export const appConfig = {
  providers: [
    provideFrameUI({
      theme: {
        controlledBy: 'frame',
        using: 'class',
      },
    }),
  ],
};`;

  protected readonly appControlsClassCode = `import { provideFrameUI } from '@frame-ui-ng/foundation';

export const appConfig = {
  providers: [
    provideFrameUI({
      theme: {
        controlledBy: 'app',
        using: 'class',
      },
    }),
  ],
};`;

  protected readonly appControlsDataThemeCode = `import { provideFrameUI } from '@frame-ui-ng/foundation';

export const appConfig = {
  providers: [
    provideFrameUI({
      theme: {
        controlledBy: 'app',
        using: 'data-theme',
      },
    }),
  ],
};`;

  protected readonly globalAppearanceCode = `import { provideFrameUI } from '@frame-ui-ng/foundation';

export const appConfig = {
  providers: [
    provideFrameUI({
      density: 'compact',
      shadow: 'flat',
      disableCornerHandles: true,
    }),
  ],
};`;

  protected readonly migrationCode = `// Before
provideFrameUI({
  strategy: 'class',
  mode: 'observe',
});

// After
provideFrameUI({
  theme: {
    controlledBy: 'app',
    using: 'class',
  },
});`;

  protected readonly tailwindCode = `@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));

@theme {
  --color-background: oklch(0.99 0 0);
  --color-foreground: oklch(0.15 0 0);
  --color-muted: oklch(0.96 0 0);
  --color-muted-foreground: oklch(0.45 0 0);
  --color-surface: oklch(1 0 0);
  --color-surface-foreground: oklch(0.15 0 0);
  --color-border: oklch(0.92 0 0);
  --color-border-strong: oklch(0.72 0 0);
  --color-primary: oklch(0.21 0 0);
  --color-primary-foreground: oklch(0.98 0 0);
  --color-destructive: oklch(0.58 0.2 25);
  --color-destructive-foreground: oklch(0.98 0 0);
  --color-success: oklch(0.62 0.18 149);
  --color-success-foreground: oklch(0.98 0 0);
  --color-warning: oklch(0.68 0.16 65);
  --color-warning-foreground: oklch(0.15 0 0);
  --color-info: oklch(0.58 0.19 255);
  --color-info-foreground: oklch(0.98 0 0);
  --color-accent: oklch(0.96 0 0);
  --color-accent-foreground: oklch(0.15 0 0);
  --color-input: oklch(0.92 0 0);
  --color-ring: oklch(0.7 0 0);
  --shadow-frame-sm: none;
  --shadow-frame-md: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  --shadow-frame-lg: 0 24px 80px rgb(0 0 0 / 0.18), 0 8px 24px rgb(0 0 0 / 0.12);
}

:root {
  --frame-background: var(--color-background);
  --frame-foreground: var(--color-foreground);
  --frame-muted: var(--color-muted);
  --frame-muted-foreground: var(--color-muted-foreground);
  --frame-surface: var(--color-surface);
  --frame-surface-foreground: var(--color-surface-foreground);
  --frame-border: var(--color-border);
  --frame-border-strong: var(--color-border-strong);
  --frame-primary: var(--color-primary);
  --frame-primary-foreground: var(--color-primary-foreground);
  --frame-destructive: var(--color-destructive);
  --frame-destructive-foreground: var(--color-destructive-foreground);
  --frame-success: var(--color-success);
  --frame-success-foreground: var(--color-success-foreground);
  --frame-warning: var(--color-warning);
  --frame-warning-foreground: var(--color-warning-foreground);
  --frame-info: var(--color-info);
  --frame-info-foreground: var(--color-info-foreground);
  --frame-accent: var(--color-accent);
  --frame-accent-foreground: var(--color-accent-foreground);
  --frame-input: var(--color-input);
  --frame-ring: var(--color-ring);
  --frame-shadow-sm: var(--shadow-frame-sm);
  --frame-shadow-md: var(--shadow-frame-md);
  --frame-shadow-lg: var(--shadow-frame-lg);
}

.dark {
  --color-background: oklch(0.15 0 0);
  --color-foreground: oklch(0.98 0 0);
  --color-muted: oklch(0.27 0 0);
  --color-muted-foreground: oklch(0.71 0 0);
  --color-surface: oklch(0.2 0 0);
  --color-surface-foreground: oklch(0.98 0 0);
  --color-border: oklch(1 0 0 / 0.12);
  --color-border-strong: oklch(1 0 0 / 0.24);
  --color-primary: oklch(0.92 0 0);
  --color-primary-foreground: oklch(0.2 0 0);
  --color-destructive: oklch(0.7 0.19 22);
  --color-destructive-foreground: oklch(0.98 0 0);
  --color-success: oklch(0.72 0.17 149);
  --color-success-foreground: oklch(0.15 0 0);
  --color-warning: oklch(0.78 0.16 75);
  --color-warning-foreground: oklch(0.15 0 0);
  --color-info: oklch(0.72 0.15 255);
  --color-info-foreground: oklch(0.15 0 0);
  --color-accent: oklch(0.27 0 0);
  --color-accent-foreground: oklch(0.98 0 0);
  --color-input: oklch(1 0 0 / 0.15);
  --color-ring: oklch(0.56 0 0);
  --shadow-frame-md: 0 10px 15px -3px rgb(0 0 0 / 0.35);
  --shadow-frame-lg: 0 24px 80px rgb(0 0 0 / 0.38), 0 8px 24px rgb(0 0 0 / 0.24);
}`;

  protected readonly bootstrapCode = `:root {
  --bs-body-bg: #ffffff;
  --bs-body-color: #18181b;
  --bs-border-color: #e4e4e7;
  --bs-primary: #18181b;
  --bs-primary-text-emphasis: #ffffff;
  --bs-secondary-bg: #f4f4f5;
  --bs-secondary-color: #18181b;
  --frame-background: var(--bs-body-bg);
  --frame-foreground: var(--bs-body-color);
  --frame-border: var(--bs-border-color);
  --frame-primary: var(--bs-primary);
  --frame-primary-foreground: var(--bs-primary-text-emphasis);
  --frame-surface: var(--bs-secondary-bg);
  --frame-surface-foreground: var(--bs-secondary-color);
}

[data-bs-theme='dark'] {
  --bs-body-bg: #18181b;
  --bs-body-color: #fafafa;
  --bs-border-color: rgba(255, 255, 255, 0.12);
  --bs-primary: #fafafa;
  --bs-primary-text-emphasis: #18181b;
  --bs-secondary-bg: #27272a;
  --bs-secondary-color: #fafafa;
}`;

  protected readonly scopedOverrideCode = `.marketing-hero {
  --frame-primary: oklch(0.69 0.19 38);
  --frame-primary-foreground: oklch(0.99 0.01 95);
  --frame-radius-lg: 1rem;
}`;
}
