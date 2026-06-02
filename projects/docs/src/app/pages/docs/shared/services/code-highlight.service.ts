import { Injectable, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { codeToHtml } from 'shiki';

import {
  DocsCodeLanguage,
  DocsCodeTheme,
  HighlightCodeOptions,
} from '../components/docs-code-block/docs-code-block.types';

const DEFAULT_THEME: DocsCodeTheme = {
  light: 'github-light',
  dark: 'github-dark',
};

const LANGUAGE_MAP: Record<DocsCodeLanguage, string> = {
  html: 'html',
  ts: 'typescript',
  tsx: 'tsx',
  js: 'javascript',
  jsx: 'jsx',
  css: 'css',
  scss: 'scss',
  bash: 'bash',
  json: 'json',
  md: 'markdown',
  text: 'text',
};

@Injectable({
  providedIn: 'root',
})
export class CodeHighlightService {
  private readonly sanitizer = inject(DomSanitizer);

  private readonly cache = new Map<string, SafeHtml>();

  async highlight(options: HighlightCodeOptions): Promise<SafeHtml> {
    const code = options.code.trimEnd();
    const language = this.resolveLanguage(options.language);
    const theme = options.theme ?? DEFAULT_THEME;

    const cacheKey = JSON.stringify({
      code,
      language,
      theme,
    });

    const cached = this.cache.get(cacheKey);

    if (cached) {
      return cached;
    }

    const html = await codeToHtml(code, {
      lang: language,
      themes: {
        light: theme.light,
        dark: theme.dark ?? theme.light,
      },
    });

    /**
     * Important:
     * Only use this service for code snippets controlled by your app/docs.
     * Do not pass user-generated HTML through this.
     */
    const safeHtml = this.sanitizer.bypassSecurityTrustHtml(html);

    this.cache.set(cacheKey, safeHtml);

    return safeHtml;
  }

  private resolveLanguage(language: DocsCodeLanguage): string {
    return LANGUAGE_MAP[language] ?? 'text';
  }
}
