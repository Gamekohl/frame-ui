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

export type ThemeBindingStrategy = 'attribute' | 'class';
export type ThemeSyncMode = 'managed' | 'observe';
export type FrameUITheme = 'light' | 'dark';

export interface FrameUIConfig {
  attribute: string;
  className: string;
  defaultTheme: FrameUITheme;
  disableCornerHandles: boolean;
  mode: ThemeSyncMode;
  strategy: ThemeBindingStrategy;
}

const DEFAULT_CONFIG: FrameUIConfig = {
  attribute: 'data-theme',
  className: 'dark',
  defaultTheme: 'light',
  disableCornerHandles: false,
  mode: 'managed',
  strategy: 'attribute',
};

const CORNER_HANDLES_ATTRIBUTE = 'data-frame-corner-handles';

export const FRAME_UI_CONFIG = new InjectionToken<FrameUIConfig>(
  'FRAME_UI_CONFIG',
  {
    factory: () => DEFAULT_CONFIG,
  },
);

export interface FrameUIOptions {
  attribute?: string;
  className?: string;
  defaultTheme?: FrameUITheme;
  disableCornerHandles?: boolean;
  mode?: ThemeSyncMode;
  strategy?: ThemeBindingStrategy;
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
    attribute: options.attribute ?? DEFAULT_CONFIG.attribute,
    className: options.className ?? DEFAULT_CONFIG.className,
    defaultTheme,
    disableCornerHandles:
      options.disableCornerHandles ?? DEFAULT_CONFIG.disableCornerHandles,
    mode: options.mode ?? DEFAULT_CONFIG.mode,
    strategy: options.strategy ?? DEFAULT_CONFIG.strategy,
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

    if (this.config.mode === 'observe') {
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

    if (this.config.mode === 'observe') {
      throw new Error(
        'ThemeService is configured to observe external theme state and cannot set the theme.',
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

    if (this.config.strategy === 'class') {
      root.classList.toggle(this.config.className, name === 'dark');
      return;
    }

    root.setAttribute(this.config.attribute, name);
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

  private observeThemeChanges(): void {
    const root = this.document?.documentElement;

    if (!root || typeof MutationObserver === 'undefined') {
      return;
    }

    const attributeFilter =
      this.config.strategy === 'class' ? ['class'] : [this.config.attribute];

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
    if (this.config.strategy === 'class') {
      return root.classList.contains(this.config.className) ? 'dark' : 'light';
    }

    const theme = root.getAttribute(this.config.attribute);

    return isFrameUITheme(theme) ? theme : this.config.defaultTheme;
  }
}

function isFrameUITheme(value: unknown): value is FrameUITheme {
  return value === 'light' || value === 'dark';
}
