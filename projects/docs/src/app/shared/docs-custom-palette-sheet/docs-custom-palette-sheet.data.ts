import { Signal, WritableSignal } from '@angular/core';

export type DocsColorModeId = 'light' | 'dark';
export type DocsCustomPalettePresetId = 'frame' | 'circuit' | 'signal' | 'plasma';

export type DocsCustomColorId =
  | 'accent'
  | 'accentForeground'
  | 'background'
  | 'border'
  | 'borderStrong'
  | 'destructive'
  | 'foreground'
  | 'info'
  | 'muted'
  | 'mutedForeground'
  | 'primary'
  | 'primaryForeground'
  | 'ring'
  | 'success'
  | 'surface'
  | 'surfaceForeground'
  | 'warning';

export type DocsCustomColors = Record<DocsCustomColorId, string>;
export type DocsCustomColorSchemes = Record<DocsColorModeId, DocsCustomColors>;
export type DocsCustomColorLocks = Record<DocsCustomColorId, boolean>;

export type DocsCustomPaletteSheetData = {
  readonly applyPreset: (preset: DocsCustomPalettePresetId) => void;
  readonly currentColorMode: Signal<DocsColorModeId>;
  readonly customColorLocks: WritableSignal<DocsCustomColorLocks>;
  readonly customColors: WritableSignal<DocsCustomColorSchemes>;
  readonly exportAppearance: () => void;
  readonly generateTheme: () => void;
  readonly resetColor: (mode: DocsColorModeId, color: DocsCustomColorId) => void;
  readonly resetColors: () => void;
  readonly selectedPalette: Signal<string>;
  readonly setColorMode: (mode: DocsColorModeId) => void;
  readonly toggleColorLock: (mode: DocsColorModeId, color: DocsCustomColorId) => void;
  readonly updateColor: (mode: DocsColorModeId, color: DocsCustomColorId, value: string) => void;
};

export type DocsCustomColor = {
  readonly id: DocsCustomColorId;
  readonly label: string;
  readonly description: string;
};

export type DocsCustomColorGroup = {
  readonly label: string;
  readonly fields: readonly DocsCustomColor[];
};

export type DocsCustomPalettePreset = {
  readonly id: DocsCustomPalettePresetId;
  readonly label: string;
  readonly description: string;
  readonly swatch: string;
  readonly colors: DocsCustomColorSchemes;
};

export const DOCS_CUSTOM_COLOR_DEFAULTS: DocsCustomColorSchemes = {
  light: {
    accent: '#f2f2f2',
    accentForeground: '#111827',
    background: '#ffffff',
    border: '#d4d4d8',
    borderStrong: '#86888f',
    destructive: '#dc2626',
    foreground: '#111827',
    info: '#2563eb',
    muted: '#f4f4f5',
    mutedForeground: '#4b5563',
    primary: '#d71920',
    primaryForeground: '#ffffff',
    ring: '#d71920',
    success: '#16a34a',
    surface: '#ffffff',
    surfaceForeground: '#111827',
    warning: '#d97706',
  },
  dark: {
    accent: '#2a2a2a',
    accentForeground: '#fafafa',
    background: '#111111',
    border: '#303030',
    borderStrong: '#525252',
    destructive: '#f87171',
    foreground: '#fafafa',
    info: '#60a5fa',
    muted: '#242424',
    mutedForeground: '#b4b4b4',
    primary: '#ff5a5f',
    primaryForeground: '#21090a',
    ring: '#ff5a5f',
    success: '#4ade80',
    surface: '#1f1f1f',
    surfaceForeground: '#fafafa',
    warning: '#fbbf24',
  },
};

export const DOCS_CUSTOM_COLOR_LOCK_DEFAULTS: DocsCustomColorLocks = {
  accent: false,
  accentForeground: false,
  background: false,
  border: false,
  borderStrong: false,
  destructive: false,
  foreground: false,
  info: false,
  muted: false,
  mutedForeground: false,
  primary: false,
  primaryForeground: false,
  ring: false,
  success: false,
  surface: false,
  surfaceForeground: false,
  warning: false,
};

export const DOCS_CUSTOM_PALETTE_PRESETS: readonly DocsCustomPalettePreset[] = [
  {
    id: 'frame',
    label: 'Frame Red',
    description: 'Use the default technical palette as a base.',
    swatch: 'linear-gradient(135deg, #ffffff 0 35%, #d71920 35% 58%, #f2f2f2 58% 76%, #111827 76%)',
    colors: DOCS_CUSTOM_COLOR_DEFAULTS,
  },
  {
    id: 'circuit',
    label: 'Circuit Green',
    description: 'Start with the sharper product tint.',
    swatch: 'linear-gradient(135deg, #fafffc 0 35%, #009741 35% 58%, #dbf7e2 58% 76%, #041009 76%)',
    colors: {
      light: {
        accent: '#dbf7e2',
        accentForeground: '#001d08',
        background: '#fafffc',
        border: '#b2cbbc',
        borderStrong: '#5f856e',
        destructive: '#cc342d',
        foreground: '#041009',
        info: '#0087b4',
        muted: '#e7f4ec',
        mutedForeground: '#30493a',
        primary: '#009741',
        primaryForeground: '#f7fef8',
        ring: '#009741',
        success: '#009741',
        surface: '#f7fefa',
        surfaceForeground: '#041009',
        warning: '#d19000',
      },
      dark: {
        accent: '#112718',
        accentForeground: '#e2efe5',
        background: '#030905',
        border: '#202823',
        borderStrong: '#445048',
        destructive: '#ff6557',
        foreground: '#e5f2ea',
        info: '#00bee7',
        muted: '#0f1f16',
        mutedForeground: '#99b2a2',
        primary: '#33d177',
        primaryForeground: '#000802',
        ring: '#33d177',
        success: '#33d177',
        surface: '#09150e',
        surfaceForeground: '#e5f2ea',
        warning: '#edb333',
      },
    },
  },
  {
    id: 'signal',
    label: 'Signal Blue',
    description: 'Start with the cooler app surface.',
    swatch: 'linear-gradient(135deg, #fafeff 0 35%, #0077ec 35% 58%, #ddf0ff 58% 76%, #060e18 76%)',
    colors: {
      light: {
        accent: '#ddf0ff',
        accentForeground: '#021630',
        background: '#fafeff',
        border: '#b5c6db',
        borderStrong: '#647c9b',
        destructive: '#cc342d',
        foreground: '#060e18',
        info: '#0077ec',
        muted: '#e7f1fc',
        mutedForeground: '#37465a',
        primary: '#0077ec',
        primaryForeground: '#f7fcff',
        ring: '#0077ec',
        success: '#139948',
        surface: '#f8fcff',
        surfaceForeground: '#060e18',
        warning: '#d78c00',
      },
      dark: {
        accent: '#142234',
        accentForeground: '#e2ecf9',
        background: '#04080e',
        border: '#21262d',
        borderStrong: '#464e56',
        destructive: '#ff6557',
        foreground: '#e7effb',
        info: '#59acff',
        muted: '#121b27',
        mutedForeground: '#9cacc1',
        primary: '#59acff',
        primaryForeground: '#010611',
        ring: '#59acff',
        success: '#4fce74',
        surface: '#0b121b',
        surfaceForeground: '#e7effb',
        warning: '#f2b036',
      },
    },
  },
  {
    id: 'plasma',
    label: 'Plasma Violet',
    description: 'Start with the louder neon system.',
    swatch: 'linear-gradient(135deg, #fff7ff 0 35%, #b818de 35% 58%, #a7f8ff 58% 76%, #0e0717 76%)',
    colors: {
      light: {
        accent: '#a7f8ff',
        accentForeground: '#001e27',
        background: '#fff7ff',
        border: '#cda8d9',
        borderStrong: '#7f4b8f',
        destructive: '#e31029',
        foreground: '#0e0717',
        info: '#00a6c4',
        muted: '#f5e4fb',
        mutedForeground: '#453958',
        primary: '#b818de',
        primaryForeground: '#fffaff',
        ring: '#00a6c4',
        success: '#00a648',
        surface: '#fff9ff',
        surfaceForeground: '#0e0717',
        warning: '#e0a200',
      },
      dark: {
        accent: '#002b34',
        accentForeground: '#d4f6fa',
        background: '#080310',
        border: '#2e2736',
        borderStrong: '#5c4f61',
        destructive: '#ff5f5b',
        foreground: '#f9edfd',
        info: '#00d6ee',
        muted: '#1d112d',
        mutedForeground: '#c7adcf',
        primary: '#e76dff',
        primaryForeground: '#080312',
        ring: '#00d6ee',
        success: '#4fce74',
        surface: '#130a1f',
        surfaceForeground: '#f9edfd',
        warning: '#f7b828',
      },
    },
  },
];

export const DOCS_CUSTOM_COLOR_GROUPS: readonly DocsCustomColorGroup[] = [
  {
    label: 'Interactive',
    fields: [
      {
        id: 'primary',
        label: 'Primary',
        description: 'Main action',
      },
      {
        id: 'primaryForeground',
        label: 'Primary foreground',
        description: 'Text on primary',
      },
      {
        id: 'accent',
        label: 'Secondary / accent',
        description: 'Accent surface',
      },
      {
        id: 'accentForeground',
        label: 'Accent foreground',
        description: 'Text on accent',
      },
      {
        id: 'ring',
        label: 'Ring',
        description: 'Focus outline',
      },
    ],
  },
  {
    label: 'Core',
    fields: [
      {
        id: 'background',
        label: 'Background',
        description: 'Page canvas',
      },
      {
        id: 'foreground',
        label: 'Foreground',
        description: 'Default text',
      },
      {
        id: 'surface',
        label: 'Surface',
        description: 'Cards and panels',
      },
      {
        id: 'surfaceForeground',
        label: 'Surface foreground',
        description: 'Text on surfaces',
      },
      {
        id: 'muted',
        label: 'Muted',
        description: 'Subtle fills',
      },
      {
        id: 'mutedForeground',
        label: 'Muted foreground',
        description: 'Secondary text',
      },
      {
        id: 'border',
        label: 'Border',
        description: 'Default lines',
      },
      {
        id: 'borderStrong',
        label: 'Border strong',
        description: 'Blueprint lines',
      },
    ],
  },
  {
    label: 'State',
    fields: [
      {
        id: 'success',
        label: 'Success',
        description: 'Positive state',
      },
      {
        id: 'warning',
        label: 'Warning',
        description: 'Attention state',
      },
      {
        id: 'info',
        label: 'Info',
        description: 'Informational state',
      },
      {
        id: 'destructive',
        label: 'Destructive',
        description: 'Danger state',
      },
    ],
  },
];

export const DOCS_CUSTOM_COLOR_STYLE_PROPERTIES = [
  '--color-background',
  '--color-foreground',
  '--color-muted',
  '--color-muted-foreground',
  '--color-border',
  '--color-surface',
  '--color-surface-foreground',
  '--color-primary',
  '--color-primary-foreground',
  '--color-accent',
  '--color-accent-foreground',
  '--color-ring',
  '--frame-border-strong',
  '--frame-success',
  '--frame-warning',
  '--frame-info',
  '--frame-destructive',
] as const;
