import { computed, signal } from '@angular/core';
import { ThemeService } from '@frame-ui-ng/foundation';

import {
  DOCS_CUSTOM_COLOR_DEFAULTS,
  DocsColorModeId,
  DocsCustomColorId,
  DocsCustomPalettePresetId,
  DocsCustomPaletteSheetData,
} from '../docs-custom-palette-sheet/docs-custom-palette-sheet.data';

import {
  applyColorLocksToGeneratedColors,
  applyCornerHandles,
  applyCustomPalette,
  applyDensity as applyDensityToRoot,
  applyRadius as applyRadiusToRoot,
  applyShadow as applyShadowToRoot,
  buildAppearanceExportCssCode,
  buildAppearanceExportTsCode,
  clearCustomPaletteProperties,
  colorsForCustomPreset,
  createCustomColorLocks,
  createCustomColorSchemes,
  createCustomPalettePreview,
  createRandomCustomColorSchemes,
  readCurrentColorMode,
  updateCustomColorSchemes,
} from './docs-appearance-helpers';
import {
  DOCS_DENSITY_PRESETS,
  DOCS_PALETTES,
  DOCS_RADIUS_PRESETS,
  DOCS_SHADOW_PRESETS,
  DocsDensityId,
  DocsPaletteId,
  DocsRadiusId,
  DocsShadowId,
} from './docs-header-options';

export class DocsHeaderAppearanceState {
  readonly palettes = DOCS_PALETTES;
  readonly radiusPresets = DOCS_RADIUS_PRESETS;
  readonly densityPresets = DOCS_DENSITY_PRESETS;
  readonly shadowPresets = DOCS_SHADOW_PRESETS;
  readonly selectedPalette = signal<DocsPaletteId>('frame');
  readonly selectedRadius = signal<DocsRadiusId>('none');
  readonly selectedDensity = signal<DocsDensityId>('default');
  readonly selectedShadow = signal<DocsShadowId>('default');
  readonly customColors = signal(createCustomColorSchemes());
  readonly customColorLocks = signal(createCustomColorLocks());
  readonly currentColorMode = computed<DocsColorModeId>(() =>
    this.themeService.theme() === 'dark' ? 'dark' : 'light',
  );
  readonly customPalettePreview = computed(() => createCustomPalettePreview(this.customColors()));
  readonly cornerHandlesEnabled = signal(true);
  readonly cornerHandlesLocked = computed(() => this.selectedRadius() !== 'none');
  readonly cornerHandlesTooltip = computed(() =>
    this.cornerHandlesLocked()
      ? 'Corner handles are only available when Radius is set to Sharp.'
      : null,
  );
  readonly appearanceExportCssCode = computed(() =>
    this.isBrowser
      ? buildAppearanceExportCssCode({
          palette: this.selectedPalette(),
          radius: this.selectedRadius(),
          density: this.selectedDensity(),
          shadow: this.selectedShadow(),
          cornerHandles: this.cornerHandlesEnabled(),
          customColors: this.customColors(),
          readCssVariable: (name) => this.readCssVariable(name),
        })
      : '',
  );
  readonly appearanceExportTsCode = computed(() =>
    buildAppearanceExportTsCode(
      this.selectedDensity(),
      this.selectedShadow(),
      this.cornerHandlesEnabled(),
    ),
  );

  constructor(
    private readonly themeService: ThemeService,
    private readonly isBrowser: boolean,
  ) {
    if (this.isBrowser) {
      this.resetAppearancePreview();
    }
  }

  createCustomPaletteSheetData(exportAppearance: () => void): DocsCustomPaletteSheetData {
    return {
      applyPreset: (preset) => this.applyCustomPalettePreset(preset),
      currentColorMode: this.currentColorMode,
      customColorLocks: this.customColorLocks,
      customColors: this.customColors,
      exportAppearance,
      generateTheme: () => this.generateCustomPaletteColors(),
      resetColor: (mode, color) => this.resetCustomColorValue(mode, color),
      resetColors: () => this.resetCustomPaletteColors(),
      selectedPalette: this.selectedPalette,
      setColorMode: (mode) => this.setPreviewColorMode(mode),
      toggleColorLock: (mode, color) => this.toggleCustomColorLock(mode, color),
      updateColor: (mode, color, value) => this.setCustomColorValue(mode, color, value),
    };
  }

  toggleTheme(): void {
    this.setPreviewColorMode(this.readPreviewColorMode() === 'dark' ? 'light' : 'dark');
  }

  setPalette(palette: DocsPaletteId): void {
    this.selectedPalette.set(palette);
    this.applyPalette(palette);
  }

  setRadius(radius: DocsRadiusId): void {
    this.selectedRadius.set(radius);
    applyRadiusToRoot(document.documentElement, radius);

    if (radius !== 'none') {
      this.setCornerHandlesEnabled(false);
    }
  }

  setDensity(density: DocsDensityId): void {
    this.selectedDensity.set(density);
    applyDensityToRoot(document.documentElement, density);
  }

  setShadow(shadow: DocsShadowId): void {
    this.selectedShadow.set(shadow);
    applyShadowToRoot(document.documentElement, shadow);
  }

  toggleCornerHandles(): void {
    this.setCornerHandlesEnabled(this.cornerHandlesLocked() ? false : !this.cornerHandlesEnabled());
  }

  private setCustomColorValue(
    mode: DocsColorModeId,
    color: DocsCustomColorId,
    value: string,
  ): void {
    this.customColors.update((schemes) =>
      updateCustomColorSchemes(schemes, this.customColorLocks(), mode, color, value),
    );
    this.setPalette('custom');
  }

  private applyCustomPalettePreset(presetId: DocsCustomPalettePresetId): void {
    this.customColors.set(colorsForCustomPreset(presetId));
    this.customColorLocks.set(createCustomColorLocks());
    this.setPalette('custom');
  }

  private generateCustomPaletteColors(): void {
    const generatedColors = createRandomCustomColorSchemes();

    this.customColors.set(
      applyColorLocksToGeneratedColors(
        generatedColors,
        this.customColors(),
        this.customColorLocks(),
      ),
    );
    this.setPalette('custom');
  }

  private resetCustomColorValue(mode: DocsColorModeId, color: DocsCustomColorId): void {
    this.setCustomColorValue(mode, color, DOCS_CUSTOM_COLOR_DEFAULTS[mode][color]);
  }

  private toggleCustomColorLock(mode: DocsColorModeId, color: DocsCustomColorId): void {
    const nextLocked = !this.customColorLocks()[color];

    this.customColorLocks.update((locks) => ({ ...locks, [color]: nextLocked }));

    if (nextLocked) {
      this.setCustomColorValue(mode, color, this.customColors()[mode][color]);
    }

    this.setPalette('custom');
  }

  private resetCustomPaletteColors(): void {
    this.customColors.set(createCustomColorSchemes());
    this.customColorLocks.set(createCustomColorLocks());
    this.setPalette('custom');
  }

  private resetAppearancePreview(): void {
    this.selectedPalette.set('frame');
    this.selectedRadius.set('none');
    this.selectedDensity.set('default');
    this.selectedShadow.set('default');
    this.cornerHandlesEnabled.set(true);
    this.applyPalette('frame');
    applyRadiusToRoot(document.documentElement, 'none');
    applyDensityToRoot(document.documentElement, 'default');
    applyShadowToRoot(document.documentElement, 'default');
    applyCornerHandles(document.documentElement, true);
  }

  private setCornerHandlesEnabled(enabled: boolean): void {
    this.cornerHandlesEnabled.set(enabled);
    applyCornerHandles(document.documentElement, enabled);
  }

  private applyPalette(palette: DocsPaletteId): void {
    const root = document.documentElement;

    if (palette === 'frame') {
      root.removeAttribute('data-docs-palette');
      clearCustomPaletteProperties(root);
      return;
    }

    if (palette === 'custom') {
      root.removeAttribute('data-docs-palette');
      applyCustomPalette(root, this.customColors()[this.readPreviewColorMode()]);
      return;
    }

    clearCustomPaletteProperties(root);
    root.setAttribute('data-docs-palette', palette);
  }

  private setPreviewColorMode(mode: DocsColorModeId): void {
    const root = document.documentElement;

    if (mode === 'dark') {
      localStorage.setItem('theme', 'dark');
      root.classList.add('dark');
    } else {
      localStorage.removeItem('theme');
      root.classList.remove('dark');
    }

    if (this.selectedPalette() === 'custom') {
      applyCustomPalette(root, this.customColors()[mode]);
    }
  }

  private readPreviewColorMode(): DocsColorModeId {
    return readCurrentColorMode(document.documentElement);
  }

  private readCssVariable(name: string): string {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || 'initial';
  }
}
