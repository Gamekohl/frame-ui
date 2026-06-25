import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  effect,
  inject,
  input,
  signal,
  booleanAttribute,
} from '@angular/core';
import { NgClass } from '@angular/common';
import { SafeHtml } from '@angular/platform-browser';

import { ClipboardService } from '../../services/clipboard.service';
import { CodeHighlightService } from '../../services/code-highlight.service';
import { CopyState, DocsCodeLanguage, DocsCodeTheme } from './docs-code-block.types';

@Component({
  selector: 'docs-code-block',
  imports: [NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <figure
      class="docs-code-block overflow-hidden border border-border bg-muted dark:bg-surface text-sm"
      [ngClass]="{
        'docs-code-block--line-numbers': showLineNumbers(),
        'rounded-xl': rounded(),
      }"
    >
      @if (showHeader()) {
        <figcaption
          class="flex items-center justify-between gap-4 border-b border-border/70 px-4 py-3"
        >
          <div class="min-w-0">
            @if (title()) {
              <p class="truncate text-sm font-medium text-foreground">
                {{ title() }}
              </p>
            } @else {
              <p class="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {{ languageLabel() }}
              </p>
            }
          </div>

          @if (allowCopy()) {
            <button
              type="button"
              class="rounded-md px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition hover:bg-black/5 hover:text-foreground"
              (click)="copyCode()"
            >
              {{ copyLabel() }}
            </button>
          }
        </figcaption>
      }

      @if (highlightedHtml(); as html) {
        <div class="docs-code-block__highlight" [innerHTML]="html"></div>
      } @else {
        <pre
          class="m-0 overflow-x-auto p-5 font-mono text-[13px] leading-6"
        ><code>{{ code() }}</code></pre>
      }
    </figure>
  `,
  styles: [
    `
      .docs-code-block {
        --docs-code-line-number-width: 2rem;
        width: 100%;
        max-width: 100%;
        min-width: 0;
      }

      docs-code-block {
        display: block;
        max-width: 100%;
        min-width: 0;
      }

      .docs-code-block__highlight {
        max-width: 100%;
        min-width: 0;
        overflow-x: auto;
      }

      .docs-code-block__highlight pre {
        margin: 0;
        overflow-x: auto;
        background: transparent !important;
        padding: 1.25rem;
        font-size: 13px;
        line-height: 1;
      }

      .docs-code-block__highlight code {
        display: block;
        min-width: max-content;
        font-family:
          ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New',
          monospace;
      }

      .docs-code-block__highlight .line {
        display: block;
        min-height: 1em;
      }

      :where(.dark, [data-theme='dark']) .docs-code-block__highlight .shiki,
      :where(.dark, [data-theme='dark']) .docs-code-block__highlight .shiki span {
        background-color: var(--shiki-dark-bg) !important;
        color: var(--shiki-dark) !important;
      }

      .docs-code-block--line-numbers .docs-code-block__highlight code {
        counter-reset: docs-code-line;
      }

      .docs-code-block--line-numbers .docs-code-block__highlight .line::before {
        counter-increment: docs-code-line;
        content: counter(docs-code-line);
        display: inline-block;
        width: var(--docs-code-line-number-width);
        margin-right: 1.5rem;
        text-align: right;
        color: rgb(115 115 115);
        user-select: none;
      }
    `,
  ],
})
export class DocsCodeBlockComponent {
  private readonly highlighter = inject(CodeHighlightService);
  private readonly clipboard = inject(ClipboardService);

  readonly code = input.required<string>();
  readonly language = input<DocsCodeLanguage>('text');
  readonly title = input<string | null>(null);
  readonly theme = input<DocsCodeTheme | null>(null);
  readonly showLineNumbers = input(true);
  readonly allowCopy = input(true);
  readonly rounded = input(false, { transform: booleanAttribute });

  readonly highlightedHtml = signal<SafeHtml | null>(null);
  readonly copyState = signal<CopyState>('idle');

  readonly languageLabel = computed(() => this.language().toUpperCase());

  readonly showHeader = computed(() => {
    return !!this.title() || !!this.language() || this.allowCopy();
  });

  readonly copyLabel = computed(() => {
    switch (this.copyState()) {
      case 'copied':
        return 'Copied';
      case 'failed':
        return 'Failed';
      default:
        return 'Copy';
    }
  });

  private highlightRequestId = 0;
  private copyTimeoutId: number | null = null;

  constructor() {
    effect(() => {
      const code = this.code();
      const language = this.language();
      const theme = this.theme();

      void this.highlightCode(code, language, theme ?? undefined);
    });
  }

  async copyCode(): Promise<void> {
    const result = await this.clipboard.copyText(this.code());

    this.copyState.set(result.success ? 'copied' : 'failed');

    if (this.copyTimeoutId) {
      window.clearTimeout(this.copyTimeoutId);
    }

    this.copyTimeoutId = window.setTimeout(() => {
      this.copyState.set('idle');
      this.copyTimeoutId = null;
    }, 1500);
  }

  private async highlightCode(
    code: string,
    language: DocsCodeLanguage,
    theme?: DocsCodeTheme,
  ): Promise<void> {
    const requestId = ++this.highlightRequestId;

    this.highlightedHtml.set(null);

    try {
      const html = await this.highlighter.highlight({
        code,
        language,
        theme,
      });

      if (requestId === this.highlightRequestId) {
        this.highlightedHtml.set(html);
      }
    } catch {
      if (requestId === this.highlightRequestId) {
        this.highlightedHtml.set(null);
      }
    }
  }
}
