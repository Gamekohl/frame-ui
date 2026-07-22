import {
  DOCS_CUSTOM_COLOR_DEFAULTS,
  DOCS_CUSTOM_COLOR_LOCK_DEFAULTS,
  DOCS_CUSTOM_COLOR_STYLE_PROPERTIES,
  DOCS_CUSTOM_PALETTE_PRESETS,
  DocsColorModeId,
  DocsCustomColorId,
  DocsCustomColorLocks,
  DocsCustomColorSchemes,
  DocsCustomColors,
  DocsCustomPalettePresetId,
} from '../docs-custom-palette-sheet/docs-custom-palette-sheet.data';

import {
  DOCS_DENSITY_PRESETS,
  DOCS_PALETTES,
  DOCS_RADIUS_PRESETS,
  DOCS_SHADOW_PRESETS,
  DocsDensityId,
  DocsDensityPreset,
  DocsPaletteId,
  DocsRadiusId,
  DocsRadiusPreset,
  DocsShadowId,
  DocsShadowPreset,
} from './docs-header-options';

const DOCS_EXPORT_COLOR_TOKENS: readonly (readonly [
  frameToken: string,
  sourceToken: string,
  customColor: DocsCustomColorId,
])[] = [
  ['--frame-background', '--color-background', 'background'],
  ['--frame-foreground', '--color-foreground', 'foreground'],
  ['--frame-muted', '--color-muted', 'muted'],
  ['--frame-muted-foreground', '--color-muted-foreground', 'mutedForeground'],
  ['--frame-border', '--color-border', 'border'],
  ['--frame-surface', '--color-surface', 'surface'],
  ['--frame-surface-foreground', '--color-surface-foreground', 'surfaceForeground'],
  ['--frame-primary', '--color-primary', 'primary'],
  ['--frame-primary-foreground', '--color-primary-foreground', 'primaryForeground'],
  ['--frame-accent', '--color-accent', 'accent'],
  ['--frame-accent-foreground', '--color-accent-foreground', 'accentForeground'],
  ['--frame-ring', '--color-ring', 'ring'],
  ['--frame-border-strong', '--frame-border-strong', 'borderStrong'],
  ['--frame-success', '--frame-success', 'success'],
  ['--frame-warning', '--frame-warning', 'warning'],
  ['--frame-info', '--frame-info', 'info'],
  ['--frame-destructive', '--frame-destructive', 'destructive'],
];

export type DocsAppearanceExportOptions = {
  readonly palette: DocsPaletteId;
  readonly radius: DocsRadiusId;
  readonly density: DocsDensityId;
  readonly shadow: DocsShadowId;
  readonly cornerHandles: boolean;
  readonly customColors: DocsCustomColorSchemes;
  readonly readCssVariable: (name: string) => string;
};

export function createCustomColorSchemes(): DocsCustomColorSchemes {
  return {
    dark: { ...DOCS_CUSTOM_COLOR_DEFAULTS.dark },
    light: { ...DOCS_CUSTOM_COLOR_DEFAULTS.light },
  };
}

export function createCustomColorLocks(): DocsCustomColorLocks {
  return { ...DOCS_CUSTOM_COLOR_LOCK_DEFAULTS };
}

export function createCustomPalettePreview(colors: DocsCustomColorSchemes): string {
  return [
    'linear-gradient(135deg,',
    `${colors.light.background} 0 24%,`,
    `${colors.light.primary} 24% 42%,`,
    `${colors.light.accent} 42% 56%,`,
    `${colors.dark.background} 56% 75%,`,
    `${colors.dark.primary} 75% 88%,`,
    `${colors.dark.foreground} 88%)`,
  ].join(' ');
}

export function updateCustomColorSchemes(
  schemes: DocsCustomColorSchemes,
  locks: DocsCustomColorLocks,
  mode: DocsColorModeId,
  color: DocsCustomColorId,
  rawValue: string,
): DocsCustomColorSchemes {
  const value = normalizeHexColor(rawValue);

  if (locks[color]) {
    return {
      dark: {
        ...schemes.dark,
        [color]: value,
      },
      light: {
        ...schemes.light,
        [color]: value,
      },
    };
  }

  return {
    ...schemes,
    [mode]: {
      ...schemes[mode],
      [color]: value,
    },
  };
}

export function colorsForCustomPreset(presetId: DocsCustomPalettePresetId): DocsCustomColorSchemes {
  const preset =
    DOCS_CUSTOM_PALETTE_PRESETS.find((entry) => entry.id === presetId) ??
    DOCS_CUSTOM_PALETTE_PRESETS[0];

  return {
    dark: { ...preset.colors.dark },
    light: { ...preset.colors.light },
  };
}

export function createRandomCustomColorSchemes(): DocsCustomColorSchemes {
  const hue = randomInt(0, 359);
  const accentHue = rotateHue(hue, randomFrom([35, 55, 145, 180, 215, 325]));
  const infoHue = rotateHue(hue, randomFrom([185, 205, 225]));
  const primarySaturation = randomInt(64, 82);
  const accentSaturation = randomInt(46, 68);
  const lightPrimary = hslToHex(hue, primarySaturation, randomInt(40, 50));
  const darkPrimary = hslToHex(hue, Math.max(58, primarySaturation - 6), randomInt(66, 76));
  const lightAccent = hslToHex(accentHue, accentSaturation, randomInt(88, 94));
  const darkAccent = hslToHex(accentHue, Math.max(34, accentSaturation - 8), randomInt(17, 25));

  return {
    light: {
      accent: lightAccent,
      accentForeground: hslToHex(accentHue, 48, 14),
      background: hslToHex(hue, 30, 98),
      border: hslToHex(hue, 24, 82),
      borderStrong: hslToHex(hue, 26, 58),
      destructive: hslToHex(randomInt(0, 12), 74, 48),
      foreground: hslToHex(hue, 34, 10),
      info: hslToHex(infoHue, 74, 45),
      muted: hslToHex(hue, 26, 93),
      mutedForeground: hslToHex(hue, 20, 36),
      primary: lightPrimary,
      primaryForeground: contrastColor(lightPrimary),
      ring: lightPrimary,
      success: hslToHex(randomInt(138, 156), 66, 38),
      surface: hslToHex(hue, 28, 99),
      surfaceForeground: hslToHex(hue, 34, 10),
      warning: hslToHex(randomInt(36, 48), 82, 45),
    },
    dark: {
      accent: darkAccent,
      accentForeground: hslToHex(accentHue, 36, 92),
      background: hslToHex(hue, 32, 6),
      border: hslToHex(hue, 22, 19),
      borderStrong: hslToHex(hue, 22, 32),
      destructive: hslToHex(randomInt(0, 12), 78, 66),
      foreground: hslToHex(hue, 28, 94),
      info: hslToHex(infoHue, 78, 68),
      muted: hslToHex(hue, 24, 13),
      mutedForeground: hslToHex(hue, 18, 68),
      primary: darkPrimary,
      primaryForeground: contrastColor(darkPrimary),
      ring: darkPrimary,
      success: hslToHex(randomInt(138, 156), 68, 64),
      surface: hslToHex(hue, 28, 10),
      surfaceForeground: hslToHex(hue, 28, 94),
      warning: hslToHex(randomInt(38, 50), 86, 68),
    },
  };
}

export function applyColorLocksToGeneratedColors(
  generatedColors: DocsCustomColorSchemes,
  currentColors: DocsCustomColorSchemes,
  locks: DocsCustomColorLocks,
): DocsCustomColorSchemes {
  const nextColors: DocsCustomColorSchemes = {
    dark: { ...generatedColors.dark },
    light: { ...generatedColors.light },
  };

  (Object.keys(locks) as DocsCustomColorId[]).forEach((color) => {
    if (locks[color]) {
      nextColors.light[color] = currentColors.light[color];
      nextColors.dark[color] = currentColors.light[color];
    }
  });

  return nextColors;
}

export function buildAppearanceExportCssCode(options: DocsAppearanceExportOptions): string {
  const palette = findPalette(options.palette);
  const radius = findRadius(options.radius);
  const density = findDensity(options.density);
  const shadow = findShadow(options.shadow);

  if (palette.id === 'custom') {
    return buildCustomPaletteExportCssCode(options, radius, density, shadow);
  }

  return [
    `/* ${palette.label}, Radius: ${radius.label}, Density: ${density.label}, Shadow: ${shadow.label}, Corner handles ${options.cornerHandles ? 'enabled' : 'disabled'} */`,
    ':root {',
    ...DOCS_EXPORT_COLOR_TOKENS.map(
      ([frameToken, sourceToken]) => `  ${frameToken}: ${options.readCssVariable(sourceToken)};`,
    ),
    `  --frame-radius-sm: ${radius.values.sm};`,
    `  --frame-radius-md: ${radius.values.md};`,
    `  --frame-radius-lg: ${radius.values.lg};`,
    `  --frame-shadow-sm: ${options.readCssVariable('--frame-shadow-sm')};`,
    `  --frame-shadow-md: ${options.readCssVariable('--frame-shadow-md')};`,
    `  --frame-shadow-lg: ${options.readCssVariable('--frame-shadow-lg')};`,
    '}',
  ].join('\n');
}

export function buildAppearanceExportTsCode(
  density: DocsDensityId,
  shadow: DocsShadowId,
  cornerHandles: boolean,
): string {
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

export function applyCustomPalette(root: HTMLElement, colors: DocsCustomColors): void {
  DOCS_EXPORT_COLOR_TOKENS.forEach(([, sourceToken, customColor]) => {
    root.style.setProperty(sourceToken, colors[customColor]);
  });
}

export function clearCustomPaletteProperties(root: HTMLElement): void {
  DOCS_CUSTOM_COLOR_STYLE_PROPERTIES.forEach((property) => {
    root.style.removeProperty(property);
  });
}

export function normalizeHexColor(value: string): string {
  const trimmed = value.trim();

  if (/^#[\da-f]{6}$/i.test(trimmed)) {
    return trimmed.toLowerCase();
  }

  return DOCS_CUSTOM_COLOR_DEFAULTS.light.primary;
}

export function readCurrentColorMode(root: HTMLElement): DocsColorModeId {
  return root.classList.contains('dark') ? 'dark' : 'light';
}

export function applyRadius(root: HTMLElement, radiusId: DocsRadiusId): void {
  const preset = findRadius(radiusId);

  root.setAttribute('data-docs-radius', preset.id);
  root.style.setProperty('--frame-radius-sm', preset.values.sm);
  root.style.setProperty('--frame-radius-md', preset.values.md);
  root.style.setProperty('--frame-radius-lg', preset.values.lg);
  root.style.setProperty('--frame-button-root-radius', preset.values.md);
}

export function applyDensity(root: HTMLElement, density: DocsDensityId): void {
  if (density === 'default') {
    root.removeAttribute('data-density');
    return;
  }

  root.setAttribute('data-density', density);
}

export function applyShadow(root: HTMLElement, shadow: DocsShadowId): void {
  if (shadow === 'default') {
    root.removeAttribute('data-shadow');
    return;
  }

  root.setAttribute('data-shadow', shadow);
}

export function applyCornerHandles(root: HTMLElement, enabled: boolean): void {
  if (enabled) {
    root.removeAttribute('data-frame-corner-handles');
    return;
  }

  root.setAttribute('data-frame-corner-handles', 'false');
}

function buildCustomPaletteExportCssCode(
  options: DocsAppearanceExportOptions,
  radius: DocsRadiusPreset,
  density: DocsDensityPreset,
  shadow: DocsShadowPreset,
): string {
  return [
    `/* Custom, Radius: ${radius.label}, Density: ${density.label}, Shadow: ${shadow.label}, Corner handles ${options.cornerHandles ? 'enabled' : 'disabled'} */`,
    ':root {',
    ...buildCustomPaletteExportColorLines(options.customColors.light),
    `  --frame-radius-sm: ${radius.values.sm};`,
    `  --frame-radius-md: ${radius.values.md};`,
    `  --frame-radius-lg: ${radius.values.lg};`,
    `  --frame-shadow-sm: ${options.readCssVariable('--frame-shadow-sm')};`,
    `  --frame-shadow-md: ${options.readCssVariable('--frame-shadow-md')};`,
    `  --frame-shadow-lg: ${options.readCssVariable('--frame-shadow-lg')};`,
    '}',
    '',
    'html.dark {',
    ...buildCustomPaletteExportColorLines(options.customColors.dark),
    '}',
  ].join('\n');
}

function buildCustomPaletteExportColorLines(colors: DocsCustomColors): string[] {
  return DOCS_EXPORT_COLOR_TOKENS.map(
    ([frameToken, , customColor]) => `  ${frameToken}: ${colors[customColor]};`,
  );
}

function contrastColor(hexColor: string): string {
  const red = Number.parseInt(hexColor.slice(1, 3), 16) / 255;
  const green = Number.parseInt(hexColor.slice(3, 5), 16) / 255;
  const blue = Number.parseInt(hexColor.slice(5, 7), 16) / 255;
  const luminance = 0.2126 * red + 0.7152 * green + 0.0722 * blue;

  return luminance > 0.56 ? '#111827' : '#ffffff';
}

function hslToHex(hue: number, saturation: number, lightness: number): string {
  const normalizedHue = (((hue % 360) + 360) % 360) / 360;
  const normalizedSaturation = clamp(saturation, 0, 100) / 100;
  const normalizedLightness = clamp(lightness, 0, 100) / 100;
  const chroma = (1 - Math.abs(2 * normalizedLightness - 1)) * normalizedSaturation;
  const second = chroma * (1 - Math.abs(((normalizedHue * 6) % 2) - 1));
  const match = normalizedLightness - chroma / 2;
  const section = Math.floor(normalizedHue * 6);
  const [red, green, blue] =
    section === 0
      ? [chroma, second, 0]
      : section === 1
        ? [second, chroma, 0]
        : section === 2
          ? [0, chroma, second]
          : section === 3
            ? [0, second, chroma]
            : section === 4
              ? [second, 0, chroma]
              : [chroma, 0, second];

  return `#${[red, green, blue]
    .map((channel) =>
      Math.round((channel + match) * 255)
        .toString(16)
        .padStart(2, '0'),
    )
    .join('')}`;
}

function findPalette(palette: DocsPaletteId) {
  return DOCS_PALETTES.find((entry) => entry.id === palette) ?? DOCS_PALETTES[0];
}

function findRadius(radius: DocsRadiusId) {
  return DOCS_RADIUS_PRESETS.find((entry) => entry.id === radius) ?? DOCS_RADIUS_PRESETS[0];
}

function findDensity(density: DocsDensityId) {
  return DOCS_DENSITY_PRESETS.find((entry) => entry.id === density) ?? DOCS_DENSITY_PRESETS[0];
}

function findShadow(shadow: DocsShadowId) {
  return DOCS_SHADOW_PRESETS.find((entry) => entry.id === shadow) ?? DOCS_SHADOW_PRESETS[1];
}

function rotateHue(hue: number, amount: number): number {
  return (hue + amount + 360) % 360;
}

function randomFrom<T>(values: readonly T[]): T {
  return values[randomInt(0, values.length - 1)];
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
