import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';

import {
  createFrameUIConfig,
  FRAME_UI_CONFIG,
  provideFrameUI,
  ThemeService,
} from './frame-ui';

describe('FrameUI', () => {
  afterEach(() => {
    const document = TestBed.inject(DOCUMENT);
    const root = document.documentElement;

    root.removeAttribute('data-theme');
    root.removeAttribute('data-mode');

    for (const name of root.getAttributeNames()) {
      if (name.startsWith('data-')) {
        root.removeAttribute(name);
      }
    }

    TestBed.resetTestingModule();
  });

  it('creates a light/dark config', () => {
    const config = createFrameUIConfig({
      defaultTheme: 'dark',
    });

    expect(config.defaultTheme).toBe('dark');
    expect(config.attribute).toBe('data-theme');
    expect(config.className).toBe('dark');
    expect(config.density).toBeNull();
    expect(config.disableCornerHandles).toBe(false);
  });

  it('creates a density config', () => {
    const config = createFrameUIConfig({
      density: 'compact',
    });

    expect(config.density).toBe('compact');
  });

  it('applies the active theme attribute', () => {
    TestBed.configureTestingModule({
      providers: [
        provideFrameUI({
          attribute: 'data-mode',
        }),
      ],
    });

    const config = TestBed.inject(FRAME_UI_CONFIG);
    const document = TestBed.inject(DOCUMENT);
    const themeService = TestBed.inject(ThemeService);
    const root = document.documentElement;

    expect(config.defaultTheme).toBe('light');
    expect(root.getAttribute('data-mode')).toBe('light');

    themeService.setTheme('dark');

    expect(themeService.theme()).toBe('dark');
    expect(root.getAttribute('data-mode')).toBe('dark');
  });

  it('ignores unsupported externally managed theme names', () => {
    const root = document.documentElement;

    root.setAttribute('data-theme', 'midnight');

    TestBed.configureTestingModule({
      providers: [
        provideFrameUI({
          mode: 'observe',
        }),
      ],
    });

    const themeService = TestBed.inject(ThemeService);

    expect(themeService.theme()).toBe('light');
    expect(root.getAttribute('data-theme')).toBe('midnight');
  });

  it('can manage a Tailwind-style dark class', () => {
    TestBed.configureTestingModule({
      providers: [
        provideFrameUI({
          strategy: 'class',
          className: 'dark',
        }),
      ],
    });

    const document = TestBed.inject(DOCUMENT);
    const themeService = TestBed.inject(ThemeService);
    const root = document.documentElement;

    expect(root.classList.contains('dark')).toBe(false);

    themeService.setTheme('dark');

    expect(themeService.theme()).toBe('dark');
    expect(themeService.isDark()).toBe(true);
    expect(root.classList.contains('dark')).toBe(true);
  });

  it('can observe an externally managed dark class', () => {
    const root = document.documentElement;

    root.classList.add('dark');

    TestBed.configureTestingModule({
      providers: [
        provideFrameUI({
          strategy: 'class',
          mode: 'observe',
          className: 'dark',
        }),
      ],
    });

    const themeService = TestBed.inject(ThemeService);

    expect(themeService.theme()).toBe('dark');
    expect(themeService.isDark()).toBe(true);
  });

  it('can disable component corner handles globally', () => {
    TestBed.configureTestingModule({
      providers: [
        provideFrameUI({
          disableCornerHandles: true,
        }),
      ],
    });

    const document = TestBed.inject(DOCUMENT);
    TestBed.inject(ThemeService);

    expect(document.documentElement.getAttribute('data-frame-corner-handles')).toBe(
      'false',
    );
  });

  it('does not write the corner handles attribute by default', () => {
    TestBed.configureTestingModule({
      providers: [provideFrameUI()],
    });

    const document = TestBed.inject(DOCUMENT);
    TestBed.inject(ThemeService);

    expect(document.documentElement.hasAttribute('data-frame-corner-handles')).toBe(
      false,
    );
  });

  it('can apply density globally', () => {
    TestBed.configureTestingModule({
      providers: [
        provideFrameUI({
          density: 'comfortable',
        }),
      ],
    });

    const document = TestBed.inject(DOCUMENT);
    TestBed.inject(ThemeService);

    expect(document.documentElement.getAttribute('data-density')).toBe(
      'comfortable',
    );
  });

  it('does not write the density attribute by default', () => {
    TestBed.configureTestingModule({
      providers: [provideFrameUI()],
    });

    const document = TestBed.inject(DOCUMENT);
    TestBed.inject(ThemeService);

    expect(document.documentElement.hasAttribute('data-density')).toBe(false);
  });
});
