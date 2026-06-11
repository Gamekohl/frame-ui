import { NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { FrButton } from '@frame-ui-ng/components';
import { DocsExample } from '../models/component-doc.model';
import { DocsCodeBlockComponent } from './docs-code-block/docs-code-block';

@Component({
  selector: 'docs-preview-card',
  imports: [NgComponentOutlet, DocsCodeBlockComponent, FrButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="docs-blueprint-sheet overflow-hidden">
      <div class="flex items-center justify-between border-b border-border px-4 py-3">
        <p class="docs-blueprint-meta">
          {{ label() ?? 'Component Sheet' }}
        </p>
        <p class="docs-blueprint-meta">Grid: 8px · Scale: 1:1</p>
      </div>

      @if (example().preview; as preview) {
        <div class="px-6 py-8">
          <div [class]="preview.containerClass ?? 'flex min-h-75 items-center justify-center'">
            <ng-container
              [ngComponentOutlet]="preview.component"
              [ngComponentOutletInputs]="preview.inputs ?? {}"
            />
          </div>
        </div>
      }

      @if (example().code?.length) {
        <div class="border-t border-border bg-muted/30 px-6 py-4">
          <button (click)="toggleCode()" frButton appearance="outline">
            {{ codeOpen() ? 'Hide Code' : 'View Code' }}
          </button>
        </div>

        @if (codeOpen()) {
          <div class="border-t border-border">
            @for (codeBlock of example().code!; track codeBlock.code) {
              <docs-code-block [code]="codeBlock.code" [language]="codeBlock.language" />
            }
          </div>
        }
      }
      <div aria-hidden="true" class="grid grid-cols-[1fr_auto_1fr] items-center gap-3 border-t border-border px-4 py-3">
        <span class="docs-blueprint-measure"></span>
        <span class="docs-blueprint-meta">Blueprint Preview</span>
        <span class="docs-blueprint-measure"></span>
      </div>
    </div>
  `,
})
export class DocsPreviewCardComponent {
  readonly example = input.required<DocsExample>();
  readonly label = input<string | null>(null);
  readonly initialCodeOpen = input(false);

  readonly codeOpen = signal(false);

  ngOnInit(): void {
    this.codeOpen.set(this.initialCodeOpen());
  }

  toggleCode(): void {
    this.codeOpen.update((value) => !value);
  }
}
