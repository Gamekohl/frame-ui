import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { DocsInstallation } from '../models/component-doc.model';
import { DocsCodeBlockComponent } from './docs-code-block/docs-code-block';

type InstallTab = 'cli' | 'manual';

@Component({
  selector: 'docs-installation',
  imports: [DocsCodeBlockComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="rounded-xl border border-border bg-surface overflow-hidden">
      <div class="flex gap-2 border-b border-border px-4 py-3">
        @if (installation().cli) {
          <button
            type="button"
            class="rounded-full px-3 py-1.5 text-sm transition"
            [class.bg-foreground]="tab() === 'cli'"
            [class.text-background]="tab() === 'cli'"
            [class.text-muted-foreground]="tab() !== 'cli'"
            (click)="tab.set('cli')"
          >
            Command
          </button>
        }

        @if (installation().manual) {
          <button
            type="button"
            class="rounded-full px-3 py-1.5 text-sm transition"
            [class.bg-foreground]="tab() === 'manual'"
            [class.text-background]="tab() === 'manual'"
            [class.text-muted-foreground]="tab() !== 'manual'"
            (click)="tab.set('manual')"
          >
            Manual
          </button>
        }
      </div>

      @if (tab() === 'cli' && installation().cli; as cli) {
        <docs-code-block [code]="cli.code" [language]="cli.language" />
      }

      @if (tab() === 'manual' && installation().manual; as manual) {
        <div class="space-y-5 px-5 py-4 text-sm text-muted-foreground">
          <p class="rounded-xl border border-border bg-background px-4 py-3 leading-6">
            You can either import the component module for a simpler setup or import the separate primitives if you
            prefer more explicit standalone imports.
          </p>

          @for (step of manual.steps; track step.title) {
            <div>
              <p class="font-medium text-foreground">{{ $index + 1 }}. {{ step.title }}</p>

              @if (step.description) {
                <p class="mt-1">
                  {{ step.description }}
                </p>
              }
            </div>

            @if (step.code; as codeBlock) {
              <docs-code-block [code]="codeBlock.code" [language]="codeBlock.language" />
            }
          }
        </div>
      }
    </div>
  `,
})
export class DocsInstallationComponent {
  readonly installation = input.required<DocsInstallation>();
  readonly tab = signal<InstallTab>('cli');
}
