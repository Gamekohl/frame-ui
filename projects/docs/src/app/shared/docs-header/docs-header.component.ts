import { NgOptimizedImage } from '@angular/common';
import { Component, DestroyRef, ViewContainerRef, inject, viewChild } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';
import {
  FrButton,
  FrButtonIcon,
  FrCommand,
  FrCommandDialog,
  FrCommandDialogRef,
  FrCommandEmpty,
  FrCommandGroup,
  FrCommandGroupHeading,
  FrCommandInput,
  FrCommandItem,
  FrCommandItemIcon,
  FrCommandList,
  FrCommandSeparator,
  FrCommandService,
  FrCommandShortcut,
  FrIconButton,
} from '@frame-ui-ng/components';
import { ThemeService } from '@frame-ui-ng/foundation';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  tablerComponents,
  tablerFileText,
  tablerSearch,
  tablerSunMoon,
  tablerTools,
} from '@ng-icons/tabler-icons';

import { ComponentCatalogEntry } from '../../pages/docs/shared/models/component-catalog-entry.model';
import { ComponentsCatalogService } from '../../pages/docs/shared/services/components-catalog.service';

type DocsSearchPage = {
  readonly title: string;
  readonly path: string;
  readonly section: string;
  readonly keywords: readonly string[];
};

const DOCS_SEARCH_PAGES: readonly DocsSearchPage[] = [
  {
    title: 'Overview',
    path: '/docs/overview',
    section: 'Docs',
    keywords: ['introduction', 'component library', 'getting started'],
  },
  {
    title: 'Installation',
    path: '/docs/installation',
    section: 'Docs',
    keywords: ['setup', 'install', 'npm', 'angular'],
  },
  {
    title: 'Theming',
    path: '/docs/theming',
    section: 'Docs',
    keywords: ['theme', 'css variables', 'customization'],
  },
  {
    title: 'Components',
    path: '/docs/components',
    section: 'Docs',
    keywords: ['catalog', 'primitives', 'ui'],
  },
  {
    title: 'Theme tokens',
    path: '/docs/theme-tokens',
    section: 'Docs',
    keywords: ['tokens', 'colors', 'foundation'],
  },
  {
    title: 'Roadmap',
    path: '/docs/roadmap',
    section: 'Planning',
    keywords: ['roadmap', 'planned', 'in progress', 'work in progress', 'todo'],
  },
];

const DOCS_TOOLS_PAGES: readonly DocsSearchPage[] = [
  {
    title: 'MCP',
    path: '/docs/mcp',
    section: 'Tooling',
    keywords: ['model context protocol', 'ai', 'tools', 'composer', 'coming soon'],
  },
];

@Component({
  selector: 'app-docs-header',
  imports: [
    RouterLink,
    FrIconButton,
    FrButton,
    FrButtonIcon,
    NgIcon,
    FrCommand,
    FrCommandDialog,
    FrCommandEmpty,
    FrCommandGroup,
    FrCommandGroupHeading,
    FrCommandInput,
    FrCommandItem,
    FrCommandItemIcon,
    FrCommandList,
    FrCommandSeparator,
    FrCommandShortcut,
    NgOptimizedImage,
  ],
  templateUrl: './docs-header.component.html',
  host: {
    '(document:keydown)': 'handleDocumentKeydown($event)',
  },
  viewProviders: [
    provideIcons({ tablerComponents, tablerFileText, tablerSearch, tablerSunMoon, tablerTools }),
  ],
})
export class DocsHeaderComponent {
  private readonly commandService = inject(FrCommandService);
  private readonly componentsCatalog = inject(ComponentsCatalogService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);
  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly searchDialog = viewChild.required<FrCommandDialog>('searchDialog');
  private searchDialogRef: FrCommandDialogRef | null = null;

  readonly themeService = inject(ThemeService);
  readonly pages = DOCS_SEARCH_PAGES;
  readonly tools = DOCS_TOOLS_PAGES;
  readonly components = toSignal(this.componentsCatalog.entries$, {
    initialValue: [] as ComponentCatalogEntry[],
  });

  toggleTheme(): void {
    const isDarkMode = document.documentElement.classList.contains('dark');

    if (isDarkMode) {
      localStorage.removeItem('theme');
      document.documentElement.classList.remove('dark');
    } else {
      localStorage.setItem('theme', 'dark');
      document.documentElement.classList.add('dark');
    }
  }

  openSearch(): void {
    const dialog = this.searchDialog();

    this.commandService.closeAll();

    const dialogRef = this.commandService.open(
      dialog.templateRef,
      dialog.buildConfig(this.viewContainerRef),
    );
    this.searchDialogRef = dialogRef;

    dialogRef.closed.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      if (this.searchDialogRef === dialogRef) {
        this.searchDialogRef = null;
      }
    });
  }

  navigateTo(value: unknown): void {
    if (typeof value !== 'string') {
      return;
    }

    void this.router.navigateByUrl(value);
  }

  componentKeywords(component: ComponentCatalogEntry): readonly string[] {
    return [component.slug, component.summary, component.category, component.status];
  }

  handleDocumentKeydown(event: KeyboardEvent): void {
    if (event.defaultPrevented || !event.altKey || event.key.toLowerCase() !== 'p') {
      return;
    }

    event.preventDefault();
    this.openSearch();
  }
}
