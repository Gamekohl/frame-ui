import { Injectable } from '@angular/core';

export type ClipboardResult =
  | {
      success: true;
    }
  | {
      success: false;
      error: unknown;
    };

@Injectable({
  providedIn: 'root',
})
export class ClipboardService {
  async copyText(text: string): Promise<ClipboardResult> {
    const value = text.trimEnd();

    if (!value) {
      return {
        success: false,
        error: new Error('Cannot copy empty text.'),
      };
    }

    try {
      if (this.canUseModernClipboard()) {
        await navigator.clipboard.writeText(value);

        return {
          success: true,
        };
      }

      this.copyTextWithFallback(value);

      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  }

  private canUseModernClipboard(): boolean {
    return (
      typeof navigator !== 'undefined' &&
      !!navigator.clipboard &&
      typeof navigator.clipboard.writeText === 'function' &&
      typeof window !== 'undefined' &&
      window.isSecureContext
    );
  }

  private copyTextWithFallback(text: string): void {
    const textarea = document.createElement('textarea');

    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.top = '0';
    textarea.style.left = '0';
    textarea.style.opacity = '0';
    textarea.style.pointerEvents = 'none';

    document.body.appendChild(textarea);

    textarea.focus();
    textarea.select();

    const copied = document.execCommand('copy');

    document.body.removeChild(textarea);

    if (!copied) {
      throw new Error('Fallback clipboard copy failed.');
    }
  }
}
