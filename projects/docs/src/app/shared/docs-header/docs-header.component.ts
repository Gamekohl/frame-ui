import { Overlay } from '@angular/cdk/overlay';
import { NgOptimizedImage, isPlatformBrowser } from '@angular/common';
import {
  Component,
  DestroyRef,
  PLATFORM_ID,
  ViewContainerRef,
  inject,
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
  FrCornerHandles,
  FrIconButton,
} from '@frame-ui-ng/components';
import { FrCommandModule } from '@frame-ui-ng/components/command';
import { FrDropdownMenuModule } from '@frame-ui-ng/components/dropdown-menu';
import { FrModalService } from '@frame-ui-ng/components/modal';
import { FrSeparator } from '@frame-ui-ng/components/separator';
import { FrSheetService } from '@frame-ui-ng/components/sheet';
import { FrTooltipModule } from '@frame-ui-ng/components/tooltip';
import { ThemeService } from '@frame-ui-ng/foundation';
import { NgIcon, provideIcons } from '@ng-icons/core';

import { ComponentCatalogEntry } from '../../pages/docs/shared/models/component-catalog-entry.model';
import { ComponentsCatalogService } from '../../pages/docs/shared/services/components-catalog.service';
import { DocsAppearanceExportModalComponent } from '../docs-appearance-export-modal/docs-appearance-export-modal.component';
import { DocsCustomPaletteSheetComponent } from '../docs-custom-palette-sheet/docs-custom-palette-sheet.component';
import { DocsHeaderAppearanceState } from './docs-header-appearance-state';
import { DOCS_HEADER_ICONS } from './docs-header-icons';
import {
  DOCS_CHART_PAGES,
  DOCS_RADIUS_PRESETS,
  DOCS_SEARCH_PAGES,
  DOCS_TOOLS_PAGES,
  DocsDensityId,
  DocsPaletteId,
  DocsRadiusId,
  DocsShadowId,
} from './docs-header-options';

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
  viewProviders: [provideIcons(DOCS_HEADER_ICONS)],
})
export class DocsHeaderComponent {
  private readonly commandService = inject(FrCommandService);
  private readonly componentsCatalog = inject(ComponentsCatalogService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly modalService = inject(FrModalService);
  private readonly overlay = inject(Overlay);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly router = inject(Router);
  private readonly sheetService = inject(FrSheetService);
  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly searchDialog = viewChild.required<FrCommandDialog>('searchDialog');
  private searchDialogRef: FrCommandDialogRef | null = null;

  readonly themeService = inject(ThemeService);
  readonly appearance = new DocsHeaderAppearanceState(
    this.themeService,
    isPlatformBrowser(this.platformId),
  );
  readonly palettes = this.appearance.palettes;
  readonly radiusPresets = this.appearance.radiusPresets;
  readonly densityPresets = this.appearance.densityPresets;
  readonly shadowPresets = this.appearance.shadowPresets;
  readonly selectedPalette = this.appearance.selectedPalette;
  readonly selectedRadius = this.appearance.selectedRadius;
  readonly selectedDensity = this.appearance.selectedDensity;
  readonly selectedShadow = this.appearance.selectedShadow;
  readonly customPalettePreview = this.appearance.customPalettePreview;
  readonly cornerHandlesEnabled = this.appearance.cornerHandlesEnabled;
  readonly cornerHandlesLocked = this.appearance.cornerHandlesLocked;
  readonly cornerHandlesTooltip = this.appearance.cornerHandlesTooltip;
  readonly pages = DOCS_SEARCH_PAGES;
  readonly charts = DOCS_CHART_PAGES;
  readonly tools = DOCS_TOOLS_PAGES;
  readonly components = toSignal(this.componentsCatalog.entries$, {
    initialValue: [] as ComponentCatalogEntry[],
  });

  toggleTheme(): void {
    this.appearance.toggleTheme();
  }

  setPalette(palette: DocsPaletteId): void {
    this.appearance.setPalette(palette);
  }

  openCustomPaletteSheet(event: Event): void {
    event.preventDefault();
    this.appearance.setPalette('custom');
    this.sheetService.closeAll();
    this.sheetService.open(DocsCustomPaletteSheetComponent, {
      ariaLabel: 'Custom colors',
      ariaModal: false,
      autoFocus: false,
      data: this.appearance.createCustomPaletteSheetData(() => this.openAppearanceExportModal()),
      hasBackdrop: false,
      restoreFocus: false,
      scrollStrategy: this.overlay.scrollStrategies.noop(),
      viewContainerRef: this.viewContainerRef,
      width: 'min(100vw, 30rem)',
    });
  }

  setRadius(radius: DocsRadiusId): void {
    this.appearance.setRadius(radius);
  }

  setDensity(density: DocsDensityId): void {
    this.appearance.setDensity(density);
  }

  setShadow(shadow: DocsShadowId): void {
    this.appearance.setShadow(shadow);
  }

  toggleCornerHandles(): void {
    this.appearance.toggleCornerHandles();
  }

  openExportModal(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.openAppearanceExportModal();
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
    if (typeof value === 'string') {
      void this.router.navigateByUrl(value);
    }
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
    root.style.setProperty('--frame-button-root-radius', preset.values.md);
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

  private openAppearanceExportModal(): void {
    this.modalService.open(
      DocsAppearanceExportModalComponent,
      {
        cssCode: this.appearance.appearanceExportCssCode(),
        tsCode: this.appearance.appearanceExportTsCode(),
      },
      {
        ariaLabel: 'Export appearance code',
        height: '52rem',
        width: 'min(48rem, calc(100vw - 2rem))',
      },
    );
  }
}
