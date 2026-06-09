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
    <div class="rounded-xl border border-border bg-surface overflow-hidden">
      @if (label()) {
        <div class="border-b border-border px-6 py-4">
          <p class="text-sm font-medium text-muted-foreground">
            {{ label() }}
          </p>
        </div>
      }

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
