import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FrButton } from '@frame-ui-ng/components';

import { DocsCodeBlockComponent } from '../shared/components/docs-code-block/docs-code-block';
import { DocsTocComponent } from '../shared/components/docs-toc/docs-toc';
import { DocsTocItem } from '../shared/components/docs-toc/docs-toc.types';

@Component({
  selector: 'app-theme-tokens',
  imports: [DocsCodeBlockComponent, DocsTocComponent, RouterLink, FrButton],
  templateUrl: './theme-tokens.html',
  styleUrl: './theme-tokens.scss',
})
export class ThemeTokens {
  protected readonly toc: DocsTocItem[] = [
    { id: 'what-this-page-is', title: 'What this page is' },
    { id: 'shared-tokens', title: 'Shared tokens' },
    { id: 'component-tokens', title: 'Component tokens' },
    { id: 'override-scope', title: 'Override scope' },
    { id: 'where-to-look', title: 'Where to look' },
  ];

  protected readonly sharedTokensCode = `@theme {
  --color-background: oklch(0.99 0 0);
  --color-foreground: oklch(0.15 0 0);
  --color-surface: oklch(1 0 0);
  --color-surface-foreground: oklch(0.15 0 0);
  --color-border: oklch(0.92 0 0);
  --color-primary: oklch(0.21 0 0);
  --color-primary-foreground: oklch(0.98 0 0);
  --color-success: oklch(0.62 0.18 149);
  --color-success-foreground: oklch(0.98 0 0);
  --color-warning: oklch(0.68 0.16 65);
  --color-warning-foreground: oklch(0.15 0 0);
  --color-info: oklch(0.58 0.19 255);
  --color-info-foreground: oklch(0.98 0 0);
  --color-muted: oklch(0.96 0 0);
  --color-muted-foreground: oklch(0.45 0 0);
  --color-accent: oklch(0.96 0 0);
  --color-accent-foreground: oklch(0.15 0 0);
  --color-ring: oklch(0.7 0 0);
}

:root {
  --frame-background: var(--color-background);
  --frame-foreground: var(--color-foreground);
  --frame-surface: var(--color-surface);
  --frame-surface-foreground: var(--color-surface-foreground);
  --frame-border: var(--color-border);
  --frame-primary: var(--color-primary);
  --frame-primary-foreground: var(--color-primary-foreground);
  --frame-success: var(--color-success);
  --frame-success-foreground: var(--color-success-foreground);
  --frame-warning: var(--color-warning);
  --frame-warning-foreground: var(--color-warning-foreground);
  --frame-info: var(--color-info);
  --frame-info-foreground: var(--color-info-foreground);
  --frame-muted: var(--color-muted);
  --frame-muted-foreground: var(--color-muted-foreground);
  --frame-accent: var(--color-accent);
  --frame-accent-foreground: var(--color-accent-foreground);
  --frame-ring: var(--color-ring);
}`;

  protected readonly componentTokensCode = `.release-alert {
  --frame-alert-root-bg: color-mix(in srgb, var(--frame-primary) 8%, var(--frame-surface));
  --frame-alert-root-border: color-mix(in srgb, var(--frame-primary) 20%, var(--frame-border));
  --frame-alert-root-icon-size: 1.125rem;
  --frame-alert-title-font-size: 1rem;
}`;

  protected readonly localOverrideCode = `.settings-panel {
  --frame-surface: oklch(0.98 0 0);
  --frame-border: oklch(0.9 0 0);
}

.settings-panel .danger-zone {
  --frame-alert-root-destructive-bg: color-mix(in srgb, var(--frame-destructive) 12%, var(--frame-surface));
}`;
}
