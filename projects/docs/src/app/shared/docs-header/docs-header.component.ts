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
import { FrTooltipModule } from '@frame-ui-ng/components/tooltip';
import { ThemeService } from '@frame-ui-ng/foundation';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  tablerBaselineDensityMedium,
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
type DocsDensityId = 'default' | 'compact' | 'comfortable';
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

type DocsDensityPreset = {
  readonly id: DocsDensityId;
  readonly label: string;
  readonly description: string;
};

type DocsShadowPreset = {
  readonly id: DocsShadowId;
  readonly label: string;
  readonly description: string;
};

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

const DOCS_DENSITY_PRESETS: readonly DocsDensityPreset[] = [
  {
    id: 'default',
    label: 'Default',
    description: 'Balanced controls',
  },
  {
    id: 'compact',
    label: 'Compact',
    description: 'Tighter screens',
  },
  {
    id: 'comfortable',
    label: 'Comfortable',
    description: 'More room',
  },
];

const DOCS_SHADOW_PRESETS: readonly DocsShadowPreset[] = [
  {
    id: 'default',
    label: 'Default',
    description: 'Default elevation',
  },
  {
    id: 'flat',
    label: 'Flat',
    description: 'No elevation',
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
    FrTooltipModule,
    NgOptimizedImage,
    FrSeparator,
  ],
  templateUrl: './docs-header.component.html',
  host: {
    '(document:keydown)': 'handleDocumentKeydown($event)',
  },
  viewProviders: [
    provideIcons({
      tablerBaselineDensityMedium,
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
  readonly densityPresets = DOCS_DENSITY_PRESETS;
  readonly shadowPresets = DOCS_SHADOW_PRESETS;
  readonly selectedPalette = signal<DocsPaletteId>('frame');
  readonly selectedRadius = signal<DocsRadiusId>('none');
  readonly selectedDensity = signal<DocsDensityId>('default');
  readonly selectedShadow = signal<DocsShadowId>('default');
  readonly cornerHandlesEnabled = signal(true);
  readonly cornerHandlesLocked = computed(() => this.selectedRadius() !== 'none');
  readonly cornerHandlesTooltip = computed(() =>
    this.cornerHandlesLocked()
      ? 'Corner handles are only available when Radius is set to Sharp.'
      : null,
  );
  readonly appearanceExportCssCode = computed(() => {
    this.selectedPalette();
    this.selectedRadius();
    this.selectedDensity();
    this.selectedShadow();
    this.cornerHandlesEnabled();
    this.themeService.theme();

    return this.buildAppearanceExportCssCode();
  });
  readonly appearanceExportTsCode = computed(() => {
    this.selectedDensity();
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

    this.resetAppearancePreview();
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
  }

  setRadius(radius: DocsRadiusId): void {
    this.selectedRadius.set(radius);
    this.applyRadius(radius);

    if (radius !== 'none') {
      this.setCornerHandlesEnabled(false);
    }
  }

  setDensity(density: DocsDensityId): void {
    this.selectedDensity.set(density);
    this.applyDensity(density);
  }

  setShadow(shadow: DocsShadowId): void {
    this.selectedShadow.set(shadow);
    this.applyShadow(shadow);
  }

  toggleCornerHandles(): void {
    if (this.cornerHandlesLocked()) {
      this.setCornerHandlesEnabled(false);
      return;
    }

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

  private resetAppearancePreview(): void {
    this.selectedPalette.set('frame');
    this.selectedRadius.set('none');
    this.selectedDensity.set('default');
    this.selectedShadow.set('default');
    this.cornerHandlesEnabled.set(true);
    this.applyPalette('frame');
    this.applyRadius('none');
    this.applyDensity('default');
    this.applyShadow('default');
    this.applyCornerHandles(true);
  }

  private setCornerHandlesEnabled(enabled: boolean): void {
    this.cornerHandlesEnabled.set(enabled);
    this.applyCornerHandles(enabled);
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

  private applyDensity(density: DocsDensityId): void {
    const root = document.documentElement;

    if (density === 'default') {
      root.removeAttribute('data-density');
      return;
    }

    root.setAttribute('data-density', density);
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
    const density =
      DOCS_DENSITY_PRESETS.find((entry) => entry.id === this.selectedDensity()) ?? DOCS_DENSITY_PRESETS[0];
    const shadow = DOCS_SHADOW_PRESETS.find((entry) => entry.id === this.selectedShadow()) ?? DOCS_SHADOW_PRESETS[1];
    const cornerHandles = this.cornerHandlesEnabled();

    return [
      `/* ${palette.label}, Radius: ${radius.label}, Density: ${density.label}, Shadow: ${shadow.label}, Corner handles ${cornerHandles ? 'enabled' : 'disabled'} */`,
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
    const density = this.selectedDensity();
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
      `      density: '${density}',`,
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

}
