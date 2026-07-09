import { NgClass, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FrButton, FrButtonIcon, FrIconButton } from '@frame-ui-ng/components';
import { FrButtonLabel } from '@frame-ui-ng/components/button';
import { FrCollapsibleModule } from '@frame-ui-ng/components/collapsible';
import { FrConfirmPopover } from '@frame-ui-ng/components/confirm-popover';
import { FR_SHEET_DATA, FrSheetModule } from '@frame-ui-ng/components/sheet';
import { FrTabsModule } from '@frame-ui-ng/components/tabs';
import { FrTooltipModule } from '@frame-ui-ng/components/tooltip';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  tablerClipboard,
  tablerChevronDown,
  tablerCode,
  tablerCopy,
  tablerLock,
  tablerLockOpen,
  tablerPalette,
  tablerRefresh,
  tablerSparkles,
} from '@ng-icons/tabler-icons';

import {
  DOCS_CUSTOM_COLOR_DEFAULTS,
  DOCS_CUSTOM_COLOR_GROUPS,
  DOCS_CUSTOM_PALETTE_PRESETS,
  DocsColorModeId,
  DocsCustomColor,
  DocsCustomColorId,
  DocsCustomColors,
  DocsCustomPalettePreset,
  DocsCustomPalettePresetId,
  DocsCustomPaletteSheetData,
} from './docs-custom-palette-sheet.data';

@Component({
  selector: 'app-docs-custom-palette-sheet',
  imports: [
    FrButton,
    FrButtonIcon,
    FrCollapsibleModule,
    FrConfirmPopover,
    FrIconButton,
    FrSheetModule,
    FrTabsModule,
    FrTooltipModule,
    NgClass,
    NgIcon,
    NgTemplateOutlet,
    FrButtonLabel,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    provideIcons({
      tablerClipboard,
      tablerChevronDown,
      tablerCode,
      tablerCopy,
      tablerLock,
      tablerLockOpen,
      tablerPalette,
      tablerRefresh,
      tablerSparkles,
    }),
  ],
  styles: [
    `
      .docs-color-swatch-picker {
        position: relative;
        display: grid;
        width: 2.25rem;
        height: 2.25rem;
        place-items: center;
        cursor: pointer;
        border-radius: var(--frame-radius-md);
      }

      .docs-color-swatch-picker:focus-within {
        outline: 2px solid color-mix(in srgb, var(--color-ring) 45%, transparent);
        outline-offset: 2px;
      }

      .docs-color-swatch {
        width: 1.75rem;
        height: 1.75rem;
        border-radius: calc(var(--frame-radius-sm) + 1px);
        box-shadow:
          inset 0 0 0 1px color-mix(in srgb, var(--color-foreground) 18%, transparent),
          0 1px 2px rgb(0 0 0 / 0.08);
      }

      .docs-color-swatch-input {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        cursor: pointer;
        opacity: 0;
      }
    `,
  ],
  templateUrl: './docs-custom-palette-sheet.component.html',
})
export class DocsCustomPaletteSheetComponent {
  readonly data = inject<DocsCustomPaletteSheetData>(FR_SHEET_DATA);
  readonly customColorGroups = DOCS_CUSTOM_COLOR_GROUPS;
  readonly customPalettePresets = DOCS_CUSTOM_PALETTE_PRESETS;
  readonly activeMode = signal<DocsColorModeId>(this.data.currentColorMode());
  readonly presetBaseOpen = signal(false);
  readonly copiedColor = signal<string | null>(null);

  colorsForMode(mode: DocsColorModeId): DocsCustomColors {
    return this.data.customColors()[mode];
  }

  isColorLocked(color: DocsCustomColorId): boolean {
    return this.data.customColorLocks()[color];
  }

  isColorDefault(mode: DocsColorModeId, color: DocsCustomColorId): boolean {
    return this.colorsForMode(mode)[color] === DOCS_CUSTOM_COLOR_DEFAULTS[mode][color];
  }

  isPresetActive(preset: DocsCustomPalettePreset): boolean {
    const colors = this.data.customColors();

    return (
      this.colorsMatch(colors.light, preset.colors.light) &&
      this.colorsMatch(colors.dark, preset.colors.dark)
    );
  }

  colorLockLabel(field: DocsCustomColor): string {
    return this.isColorLocked(field.id)
      ? `Unlock ${field.label}`
      : `Lock ${field.label}`;
  }

  copyColorLabel(mode: DocsColorModeId, field: DocsCustomColor): string {
    return `Copy ${mode} ${field.label} color`;
  }

  pasteColorLabel(mode: DocsColorModeId, field: DocsCustomColor): string {
    const value = this.copiedColor();

    return value
      ? `Paste ${value} into ${mode} ${field.label}`
      : `Paste color into ${mode} ${field.label}`;
  }

  resetColorLabel(mode: DocsColorModeId, field: DocsCustomColor): string {
    return `Reset ${mode} ${field.label} color`;
  }

  setActiveMode(value: string | null): void {
    if (value !== 'light' && value !== 'dark') {
      return;
    }

    this.activeMode.set(value);
    this.data.setColorMode(value);
  }

  applyPreset(preset: DocsCustomPalettePresetId): void {
    this.copiedColor.set(null);
    this.data.applyPreset(preset);
  }

  setCustomColor(mode: DocsColorModeId, color: DocsCustomColorId, event: Event): void {
    const input = event.target;

    if (!(input instanceof HTMLInputElement)) {
      return;
    }

    this.data.updateColor(mode, color, input.value);
  }

  copyColor(mode: DocsColorModeId, color: DocsCustomColorId): void {
    this.copiedColor.set(this.colorsForMode(mode)[color]);
  }

  pasteColor(mode: DocsColorModeId, color: DocsCustomColorId): void {
    const value = this.copiedColor();

    if (!value) {
      return;
    }

    this.data.updateColor(mode, color, value);
  }

  resetColor(mode: DocsColorModeId, color: DocsCustomColorId): void {
    this.data.resetColor(mode, color);
  }

  toggleColorLock(mode: DocsColorModeId, color: DocsCustomColorId): void {
    this.data.toggleColorLock(mode, color);
  }

  resetCustomPalette(): void {
    this.copiedColor.set(null);
    this.data.resetColors();
  }

  generateTheme(): void {
    this.copiedColor.set(null);
    this.data.generateTheme();
  }

  exportAppearance(): void {
    this.data.exportAppearance();
  }

  private colorsMatch(first: DocsCustomColors, second: DocsCustomColors): boolean {
    return Object.keys(first).every(
      (key) => first[key as DocsCustomColorId] === second[key as DocsCustomColorId],
    );
  }
}
