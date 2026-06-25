import { NgOptimizedImage, isPlatformBrowser } from '@angular/common';
import {
  Component,
  DestroyRef,
  PLATFORM_ID,
  ViewContainerRef,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';
import {
  FrButton,
  FrButtonIcon,
  FrCommandDialog,
  FrCommandDialogRef,
  FrCommandService,
  FrIconButton,
} from '@frame-ui-ng/components';
import { FrCommandModule } from '@frame-ui-ng/components/command';
import { FrDropdownMenuModule } from '@frame-ui-ng/components/dropdown-menu';
import { FrModalService } from '@frame-ui-ng/components/modal';
import { FrSeparator } from '@frame-ui-ng/components/separator';
import { ThemeService } from '@frame-ui-ng/foundation';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  tablerBorderCorners,
  tablerBorderRadius,
  tablerBrandGithub,
  tablerCheck,
  tablerCode,
  tablerCoffee,
  tablerComponents,
  tablerFileText,
  tablerSearch,
  tablerShadow,
  tablerSunMoon,
  tablerTools,
} from '@ng-icons/tabler-icons';

import { ComponentCatalogEntry } from '../../pages/docs/shared/models/component-catalog-entry.model';
import { ComponentsCatalogService } from '../../pages/docs/shared/services/components-catalog.service';
import { DocsAppearanceExportModalComponent } from '../docs-appearance-export-modal/docs-appearance-export-modal.component';

type DocsSearchPage = {
  readonly title: string;
  readonly path: string;
  readonly section: string;
  readonly keywords: readonly string[];
};

type DocsPaletteId = 'frame' | 'circuit' | 'signal' | 'plasma';
type DocsRadiusId = 'none' | 'sm' | 'md' | 'lg';
type DocsShadowId = 'flat' | 'default' | 'raised';

type DocsPalette = {
  readonly id: DocsPaletteId;
  readonly label: string;
  readonly description: string;
  readonly swatch: string;
};

type DocsRadiusPreset = {
  readonly id: DocsRadiusId;
  readonly label: string;
  readonly description: string;
  readonly values: {
    readonly sm: string;
    readonly md: string;
    readonly lg: string;
  };
};

type DocsShadowPreset = {
  readonly id: DocsShadowId;
  readonly label: string;
  readonly description: string;
};

const DOCS_PALETTE_STORAGE_KEY = 'docs-palette';
const DOCS_RADIUS_STORAGE_KEY = 'docs-radius';
const DOCS_SHADOW_STORAGE_KEY = 'docs-shadow';
const DOCS_CORNER_HANDLES_STORAGE_KEY = 'docs-corner-handles';

const DOCS_EXPORT_COLOR_TOKENS: readonly (readonly [frameToken: string, sourceToken: string])[] = [
  ['--frame-background', '--color-background'],
  ['--frame-foreground', '--color-foreground'],
  ['--frame-muted', '--color-muted'],
  ['--frame-muted-foreground', '--color-muted-foreground'],
  ['--frame-border', '--color-border'],
  ['--frame-surface', '--color-surface'],
  ['--frame-surface-foreground', '--color-surface-foreground'],
  ['--frame-primary', '--color-primary'],
  ['--frame-primary-foreground', '--color-primary-foreground'],
  ['--frame-accent', '--color-accent'],
  ['--frame-accent-foreground', '--color-accent-foreground'],
  ['--frame-input', '--color-input'],
  ['--frame-ring', '--color-ring'],
  ['--frame-border-strong', '--frame-border-strong'],
  ['--frame-success', '--frame-success'],
  ['--frame-warning', '--frame-warning'],
  ['--frame-info', '--frame-info'],
  ['--frame-destructive', '--frame-destructive'],
];

const DOCS_PALETTES: readonly DocsPalette[] = [
  {
    id: 'frame',
    label: 'Frame Red',
    description: 'Default technical palette',
    swatch: '#d71920',
  },
  {
    id: 'circuit',
    label: 'Circuit Green',
    description: 'Sharper product tint',
    swatch: 'oklch(0.58 0.18 153)',
  },
  {
    id: 'signal',
    label: 'Signal Blue',
    description: 'Cooler app surface',
    swatch: 'oklch(0.58 0.2 255)',
  },
  {
    id: 'plasma',
    label: 'Plasma Violet',
    description: 'Louder neon system',
    swatch: 'oklch(0.65 0.26 318)',
  },
];

const DOCS_RADIUS_PRESETS: readonly DocsRadiusPreset[] = [
  {
    id: 'none',
    label: 'Sharp',
    description: 'No rounding',
    values: {
      sm: '0px',
      md: '0px',
      lg: '0px',
    },
  },
  {
    id: 'sm',
    label: 'Small',
    description: 'Subtle rounding',
    values: {
      sm: '0.125rem',
      md: '0.25rem',
      lg: '0.375rem',
    },
  },
  {
    id: 'md',
    label: 'Medium',
    description: 'Balanced rounding',
    values: {
      sm: '0.25rem',
      md: '0.5rem',
      lg: '0.75rem',
    },
  },
  {
    id: 'lg',
    label: 'Large',
    description: 'Soft surfaces',
    values: {
      sm: '0.375rem',
      md: '0.75rem',
      lg: '1rem',
    },
  }
];

const DOCS_SHADOW_PRESETS: readonly DocsShadowPreset[] = [
  {
    id: 'flat',
    label: 'Flat',
    description: 'No elevation',
  },
  {
    id: 'default',
    label: 'Default',
    description: 'Default elevation',
  },
  {
    id: 'raised',
    label: 'Raised',
    description: 'Stronger elevation',
  },
];

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
  {
    title: 'Changelog',
    path: '/docs/changelog',
    section: 'Planning',
    keywords: ['changelog', 'release', 'version', 'beta', 'changes'],
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
    FrCommandModule,
    FrDropdownMenuModule,
    NgOptimizedImage,
    FrSeparator,
  ],
  templateUrl: './docs-header.component.html',
  host: {
    '(document:keydown)': 'handleDocumentKeydown($event)',
  },
  viewProviders: [
    provideIcons({
      tablerBorderCorners,
      tablerBorderRadius,
      tablerComponents,
      tablerFileText,
      tablerSearch,
      tablerShadow,
      tablerSunMoon,
      tablerTools,
      tablerBrandGithub,
      tablerCheck,
      tablerCode,
      tablerCoffee,
    }),
  ],
})
export class DocsHeaderComponent {
  private readonly commandService = inject(FrCommandService);
  private readonly componentsCatalog = inject(ComponentsCatalogService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly modalService = inject(FrModalService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly router = inject(Router);
  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly searchDialog = viewChild.required<FrCommandDialog>('searchDialog');
  private searchDialogRef: FrCommandDialogRef | null = null;

  readonly themeService = inject(ThemeService);
  readonly palettes = DOCS_PALETTES;
  readonly radiusPresets = DOCS_RADIUS_PRESETS;
  readonly shadowPresets = DOCS_SHADOW_PRESETS;
  readonly selectedPalette = signal<DocsPaletteId>('frame');
  readonly selectedRadius = signal<DocsRadiusId>('none');
  readonly selectedShadow = signal<DocsShadowId>('default');
  readonly cornerHandlesEnabled = signal(true);
  readonly appearanceExportCssCode = computed(() => {
    this.selectedPalette();
    this.selectedRadius();
    this.selectedShadow();
    this.cornerHandlesEnabled();
    this.themeService.theme();

    return this.buildAppearanceExportCssCode();
  });
  readonly appearanceExportTsCode = computed(() => {
    this.selectedShadow();
    this.cornerHandlesEnabled();

    return this.buildAppearanceExportTsCode();
  });
  readonly pages = DOCS_SEARCH_PAGES;
  readonly tools = DOCS_TOOLS_PAGES;
  readonly components = toSignal(this.componentsCatalog.entries$, {
    initialValue: [] as ComponentCatalogEntry[],
  });

  constructor() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.restoreAppearancePreferences();
  }

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

  setPalette(palette: DocsPaletteId): void {
    this.selectedPalette.set(palette);
    this.applyPalette(palette);
    localStorage.setItem(DOCS_PALETTE_STORAGE_KEY, palette);
  }

  setRadius(radius: DocsRadiusId): void {
    this.selectedRadius.set(radius);
    this.applyRadius(radius);
    localStorage.setItem(DOCS_RADIUS_STORAGE_KEY, radius);
  }

  setShadow(shadow: DocsShadowId): void {
    this.selectedShadow.set(shadow);
    this.applyShadow(shadow);
    localStorage.setItem(DOCS_SHADOW_STORAGE_KEY, shadow);
  }

  toggleCornerHandles(): void {
    this.setCornerHandlesEnabled(!this.cornerHandlesEnabled());
  }

  openExportModal(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    this.modalService.open(
      DocsAppearanceExportModalComponent,
      {
        cssCode: this.appearanceExportCssCode(),
        tsCode: this.appearanceExportTsCode(),
      },
      {
        ariaLabel: 'Export appearance code',
        height: '52rem',
        width: 'min(48rem, calc(100vw - 2rem))',
      },
    );
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

  private restoreAppearancePreferences(): void {
    const storedPalette = localStorage.getItem(DOCS_PALETTE_STORAGE_KEY);
    const storedRadius = localStorage.getItem(DOCS_RADIUS_STORAGE_KEY);
    const storedShadow = localStorage.getItem(DOCS_SHADOW_STORAGE_KEY);
    const palette = this.isDocsPalette(storedPalette) ? storedPalette : 'frame';
    const radius = this.isDocsRadius(storedRadius) ? storedRadius : 'none';
    const shadow = this.isDocsShadow(storedShadow) ? storedShadow : 'default';
    const cornerHandles = localStorage.getItem(DOCS_CORNER_HANDLES_STORAGE_KEY) !== 'false';

    this.selectedPalette.set(palette);
    this.selectedRadius.set(radius);
    this.selectedShadow.set(shadow);
    this.cornerHandlesEnabled.set(cornerHandles);
    this.applyPalette(palette);
    this.applyRadius(radius);
    this.applyShadow(shadow);
    this.applyCornerHandles(cornerHandles);
  }

  private setCornerHandlesEnabled(enabled: boolean): void {
    this.cornerHandlesEnabled.set(enabled);
    this.applyCornerHandles(enabled);
    localStorage.setItem(DOCS_CORNER_HANDLES_STORAGE_KEY, enabled ? 'true' : 'false');
  }

  private applyPalette(palette: DocsPaletteId): void {
    const root = document.documentElement;

    if (palette === 'frame') {
      root.removeAttribute('data-docs-palette');
      return;
    }

    root.setAttribute('data-docs-palette', palette);
  }

  private applyRadius(radius: DocsRadiusId): void {
    const root = document.documentElement;
    const preset = DOCS_RADIUS_PRESETS.find((entry) => entry.id === radius) ?? DOCS_RADIUS_PRESETS[0];

    root.setAttribute('data-docs-radius', preset.id);
    root.style.setProperty('--frame-radius-sm', preset.values.sm);
    root.style.setProperty('--frame-radius-md', preset.values.md);
    root.style.setProperty('--frame-radius-lg', preset.values.lg);
  }

  private applyShadow(shadow: DocsShadowId): void {
    const root = document.documentElement;

    if (shadow === 'default') {
      root.removeAttribute('data-shadow');
      return;
    }

    root.setAttribute('data-shadow', shadow);
  }

  private applyCornerHandles(enabled: boolean): void {
    const root = document.documentElement;

    if (enabled) {
      root.removeAttribute('data-frame-corner-handles');
      return;
    }

    root.setAttribute('data-frame-corner-handles', 'false');
  }

  private buildAppearanceExportCssCode(): string {
    if (!isPlatformBrowser(this.platformId)) {
      return '';
    }

    const palette = DOCS_PALETTES.find((entry) => entry.id === this.selectedPalette()) ?? DOCS_PALETTES[0];
    const radius = DOCS_RADIUS_PRESETS.find((entry) => entry.id === this.selectedRadius()) ?? DOCS_RADIUS_PRESETS[0];
    const shadow = DOCS_SHADOW_PRESETS.find((entry) => entry.id === this.selectedShadow()) ?? DOCS_SHADOW_PRESETS[1];
    const cornerHandles = this.cornerHandlesEnabled();

    return [
      `/* ${palette.label}, ${radius.label}, ${shadow.label}, corner handles ${cornerHandles ? 'enabled' : 'disabled'} */`,
      ':root {',
      ...DOCS_EXPORT_COLOR_TOKENS.map(
        ([frameToken, sourceToken]) => `  ${frameToken}: ${this.readCssVariable(sourceToken)};`,
      ),
      `  --frame-radius-sm: ${radius.values.sm};`,
      `  --frame-radius-md: ${radius.values.md};`,
      `  --frame-radius-lg: ${radius.values.lg};`,
      `  --frame-shadow-sm: ${this.readCssVariable('--frame-shadow-sm')};`,
      `  --frame-shadow-md: ${this.readCssVariable('--frame-shadow-md')};`,
      `  --frame-shadow-lg: ${this.readCssVariable('--frame-shadow-lg')};`,
      '}',
    ].join('\n');
  }

  private buildAppearanceExportTsCode(): string {
    const shadow = this.selectedShadow();
    const cornerHandles = this.cornerHandlesEnabled();

    return [
      "import { ApplicationConfig } from '@angular/core';",
      "import { provideFrameUI } from '@frame-ui-ng/foundation';",
      '',
      'export const appConfig: ApplicationConfig = {',
      '  providers: [',
      '    // ...',
      '    provideFrameUI({',
      '      theme: {',
      "        controlledBy: 'app',",
      "        using: 'class',",
      '      },',
      `      shadow: '${shadow}',`,
      `      disableCornerHandles: ${cornerHandles ? 'false' : 'true'},`,
      '    }),',
      '  ],',
      '};',
    ].join('\n');
  }

  private readCssVariable(name: string): string {
    const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();

    return value || 'initial';
  }

  private isDocsPalette(value: string | null): value is DocsPaletteId {
    return value === 'frame' || value === 'circuit' || value === 'signal' || value === 'plasma';
  }

  private isDocsRadius(value: string | null): value is DocsRadiusId {
    return value === 'none' || value === 'sm' || value === 'md' || value === 'lg';
  }

  private isDocsShadow(value: string | null): value is DocsShadowId {
    return value === 'flat' || value === 'default' || value === 'raised';
  }
}
