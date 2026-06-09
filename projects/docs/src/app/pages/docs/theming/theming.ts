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
    { id: 'setup', title: 'Setup' },
    {
      id: 'source-of-truth',
      title: 'Choose a source of truth',
      children: [
        { id: 'library-managed-via-data-theme', title: 'Library-managed via data-theme', level: 2 },
        {
          id: 'library-managed-via-shared-dark-class',
          title: 'Library-managed via shared .dark class',
          level: 2,
        },
        {
          id: 'externally-managed-and-observed-by-the-library',
          title: 'Externally managed and observed by the library',
          level: 2,
        },
      ],
    },
    { id: 'tailwind-css', title: 'Tailwind CSS' },
    { id: 'bootstrap-and-other-css-frameworks', title: 'Bootstrap and other CSS frameworks' },
    { id: 'local-overrides', title: 'Local overrides' },
  ];

  protected readonly installFoundationCode = `"styles": [
    "node_modules/@frame-ui-ng/components/styles.css",
    ...
  ]`;

  protected readonly managedAttributeCode = `import { provideFrameUI } from '@frame-ui-ng/foundation';

export const appConfig = {
  providers: [
    provideFrameUI({
      defaultTheme: 'light',
    }),
  ],
};`;

  protected readonly managedClassCode = `import { provideFrameUI } from '@frame-ui-ng/foundation';

export const appConfig = {
  providers: [
    provideFrameUI({
      strategy: 'class',
      className: 'dark',
    }),
  ],
};`;

  protected readonly observedClassCode = `import { provideFrameUI } from '@frame-ui-ng/foundation';

export const appConfig = {
  providers: [
    provideFrameUI({
      strategy: 'class',
      mode: 'observe',
      className: 'dark',
    }),
  ],
};`;

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
  --color-primary: oklch(0.21 0 0);
  --color-primary-foreground: oklch(0.98 0 0);
  --color-accent: oklch(0.96 0 0);
  --color-accent-foreground: oklch(0.15 0 0);
  --color-input: oklch(0.92 0 0);
  --color-ring: oklch(0.7 0 0);
}

:root {
  --frame-background: var(--color-background);
  --frame-foreground: var(--color-foreground);
  --frame-muted: var(--color-muted);
  --frame-muted-foreground: var(--color-muted-foreground);
  --frame-surface: var(--color-surface);
  --frame-surface-foreground: var(--color-surface-foreground);
  --frame-border: var(--color-border);
  --frame-primary: var(--color-primary);
  --frame-primary-foreground: var(--color-primary-foreground);
  --frame-accent: var(--color-accent);
  --frame-accent-foreground: var(--color-accent-foreground);
  --frame-input: var(--color-input);
  --frame-ring: var(--color-ring);
}

.dark {
  --color-background: oklch(0.15 0 0);
  --color-foreground: oklch(0.98 0 0);
  --color-muted: oklch(0.27 0 0);
  --color-muted-foreground: oklch(0.71 0 0);
  --color-surface: oklch(0.2 0 0);
  --color-surface-foreground: oklch(0.98 0 0);
  --color-border: oklch(1 0 0 / 0.12);
  --color-primary: oklch(0.92 0 0);
  --color-primary-foreground: oklch(0.2 0 0);
  --color-accent: oklch(0.27 0 0);
  --color-accent-foreground: oklch(0.98 0 0);
  --color-input: oklch(1 0 0 / 0.15);
  --color-ring: oklch(0.56 0 0);
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
