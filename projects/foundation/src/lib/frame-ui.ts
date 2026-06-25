import { DOCUMENT } from '@angular/common';
import {
  EnvironmentProviders,
  ENVIRONMENT_INITIALIZER,
  Injectable,
  InjectionToken,
  OnDestroy,
  Signal,
  computed,
  inject,
  makeEnvironmentProviders,
  signal,
} from '@angular/core';

export type FrameUIThemeController = 'frame' | 'app';
export type FrameUIThemeSelector = 'data-theme' | 'class';
export type FrameUITheme = 'light' | 'dark';
export type FrameUIDensity = 'compact' | 'default' | 'comfortable';
export type FrameUIShadow = 'flat' | 'default' | 'raised';

export interface FrameUIThemeConfig {
  controlledBy: FrameUIThemeController;
  using: FrameUIThemeSelector;
}

export interface FrameUIConfig {
  defaultTheme: FrameUITheme;
  density: FrameUIDensity | null;
  disableCornerHandles: boolean;
  shadow: FrameUIShadow | null;
  theme: FrameUIThemeConfig;
}

const DEFAULT_CONFIG: FrameUIConfig = {
  defaultTheme: 'light',
  density: null,
  disableCornerHandles: false,
  shadow: null,
  theme: {
    controlledBy: 'frame',
    using: 'data-theme',
  },
};

const CORNER_HANDLES_ATTRIBUTE = 'data-frame-corner-handles';
const DENSITY_ATTRIBUTE = 'data-density';
const SHADOW_ATTRIBUTE = 'data-shadow';

export const FRAME_UI_CONFIG = new InjectionToken<FrameUIConfig>(
  'FRAME_UI_CONFIG',
  {
    factory: () => DEFAULT_CONFIG,
  },
);

export interface FrameUIOptions {
  defaultTheme?: FrameUITheme;
  density?: FrameUIDensity;
  disableCornerHandles?: boolean;
  shadow?: FrameUIShadow;
  theme?: Partial<FrameUIThemeConfig>;
}

export function provideFrameUI(
  options: FrameUIOptions = {},
): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: FRAME_UI_CONFIG,
      useValue: createFrameUIConfig(options),
    },
    ThemeService,
    {
      provide: ENVIRONMENT_INITIALIZER,
      multi: true,
      useValue: () => {
        inject(ThemeService);
      },
    },
  ]);
}

export function createFrameUIConfig(
  options: FrameUIOptions = {},
): FrameUIConfig {
  const defaultTheme = options.defaultTheme ?? DEFAULT_CONFIG.defaultTheme;

  return {
    defaultTheme,
    density: options.density ?? DEFAULT_CONFIG.density,
    disableCornerHandles:
      options.disableCornerHandles ?? DEFAULT_CONFIG.disableCornerHandles,
    shadow: options.shadow ?? DEFAULT_CONFIG.shadow,
    theme: {
      controlledBy:
        options.theme?.controlledBy ?? DEFAULT_CONFIG.theme.controlledBy,
      using: options.theme?.using ?? DEFAULT_CONFIG.theme.using,
    },
  };
}

@Injectable()
export class ThemeService implements OnDestroy {
  private readonly document = inject(DOCUMENT);
  private readonly config = inject(FRAME_UI_CONFIG);
  private readonly activeTheme = signal(this.config.defaultTheme);
  private observer: MutationObserver | null = null;

  readonly theme: Signal<FrameUITheme> = this.activeTheme.asReadonly();

  readonly isDark = computed(() => this.activeTheme() === 'dark');

  constructor() {
    this.applyCornerHandlesPreference();
    this.applyDensityPreference();
    this.applyShadowPreference();

    if (this.config.theme.controlledBy === 'app') {
      this.syncFromDom();
      this.observeThemeChanges();
      return;
    }

    this.applyTheme(this.activeTheme());
  }

  setTheme(name: FrameUITheme): void {
    if (!isFrameUITheme(name)) {
      throw new Error(`Unknown theme "${name}".`);
    }

    if (this.config.theme.controlledBy === 'app') {
      throw new Error(
        'ThemeService is configured to read app-controlled theme state and cannot set the theme.',
      );
    }

    this.activeTheme.set(name);
    this.applyTheme(name);
  }

  toggleTheme(): FrameUITheme {
    const nextTheme = this.activeTheme() === 'dark' ? 'light' : 'dark';

    this.setTheme(nextTheme);

    return nextTheme;
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.observer = null;
  }

  private applyTheme(name: FrameUITheme): void {
    const root = this.document?.documentElement;

    if (!root) {
      return;
    }

    if (this.config.theme.using === 'class') {
      root.classList.toggle('dark', name === 'dark');
      return;
    }

    root.setAttribute('data-theme', name);
  }

  private applyCornerHandlesPreference(): void {
    const root = this.document?.documentElement;

    if (!root) {
      return;
    }

    if (this.config.disableCornerHandles) {
      root.setAttribute(CORNER_HANDLES_ATTRIBUTE, 'false');
      return;
    }

    root.removeAttribute(CORNER_HANDLES_ATTRIBUTE);
  }

  private applyDensityPreference(): void {
    const root = this.document?.documentElement;

    if (!root || !this.config.density) {
      return;
    }

    root.setAttribute(DENSITY_ATTRIBUTE, this.config.density);
  }

  private applyShadowPreference(): void {
    const root = this.document?.documentElement;

    if (!root || !this.config.shadow) {
      return;
    }

    root.setAttribute(SHADOW_ATTRIBUTE, this.config.shadow);
  }

  private observeThemeChanges(): void {
    const root = this.document?.documentElement;

    if (!root || typeof MutationObserver === 'undefined') {
      return;
    }

    const attributeFilter =
      this.config.theme.using === 'class' ? ['class'] : ['data-theme'];

    this.observer = new MutationObserver(() => {
      this.syncFromDom();
    });
    this.observer.observe(root, {
      attributeFilter,
      attributes: true,
    });
  }

  private syncFromDom(): void {
    const root = this.document?.documentElement;

    if (!root) {
      return;
    }

    this.activeTheme.set(this.readThemeFromDom(root));
  }

  private readThemeFromDom(root: HTMLElement): FrameUITheme {
    if (this.config.theme.using === 'class') {
      return root.classList.contains('dark') ? 'dark' : 'light';
    }

    const theme = root.getAttribute('data-theme');

    return isFrameUITheme(theme) ? theme : this.config.defaultTheme;
  }
}

function isFrameUITheme(value: unknown): value is FrameUITheme {
  return value === 'light' || value === 'dark';
}
