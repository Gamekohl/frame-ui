import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FrResizableModule } from '@frame-ui-ng/components/resizable';

export type ResizablePreviewMode =
  | 'basic'
  | 'constraints'
  | 'custom-styling'
  | 'handle'
  | 'hero'
  | 'inspector'
  | 'nested'
  | 'rtl'
  | 'vertical';

export type ResizablePreviewConfig = {
  mode: ResizablePreviewMode;
};

@Component({
  selector: 'docs-resizable-preview',
  host: {
    class: 'block w-full',
  },
  imports: [FrResizableModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @switch (config().mode) {
      @case ('hero') {
        <div frResizablePanelGroup class="docs-resizable-shell" aria-label="Workspace shell">
          <section frResizablePanel [defaultSize]="24" [minSize]="18">
            <span class="docs-resizable-eyebrow">Navigation</span>
          </section>
          <div frResizableHandle withHandle></div>
          <section frResizablePanel [defaultSize]="48" [minSize]="28">
            <span class="docs-resizable-eyebrow">Canvas</span>
          </section>
          <div frResizableHandle withHandle></div>
          <section frResizablePanel [defaultSize]="28" [minSize]="18">
            <span class="docs-resizable-eyebrow">Inspector</span>
          </section>
        </div>
      }

      @case ('basic') {
        <div frResizablePanelGroup class="docs-resizable-shell" aria-label="Inbox split view">
          <section frResizablePanel [defaultSize]="32" [minSize]="20">Inbox</section>
          <div frResizableHandle></div>
          <section frResizablePanel [defaultSize]="68" [minSize]="30">Message preview</section>
        </div>
      }

      @case ('vertical') {
        <div frResizablePanelGroup orientation="vertical" class="docs-resizable-shell docs-resizable-tall" aria-label="Report editor">
          <section frResizablePanel [defaultSize]="28" [minSize]="18">Toolbar</section>
          <div frResizableHandle withHandle></div>
          <section frResizablePanel [defaultSize]="72" [minSize]="35">Report body</section>
        </div>
      }

      @case ('handle') {
        <div frResizablePanelGroup class="docs-resizable-shell" aria-label="Visible handle split view">
          <section frResizablePanel [defaultSize]="35" [minSize]="20">Filters</section>
          <div frResizableHandle withHandle></div>
          <section frResizablePanel [defaultSize]="65" [minSize]="35">Results</section>
        </div>
      }

      @case ('nested') {
        <div frResizablePanelGroup class="docs-resizable-shell docs-resizable-tall" aria-label="Nested workspace">
          <section frResizablePanel [defaultSize]="28" [minSize]="18">Project list</section>
          <div frResizableHandle withHandle></div>
          <section frResizablePanel [defaultSize]="72" [minSize]="35" data-no-padding>
            <div frResizablePanelGroup orientation="vertical" class="docs-resizable-nested" aria-label="Nested editor panels">
              <section frResizablePanel [defaultSize]="62" [minSize]="35">Editor</section>
              <div frResizableHandle withHandle></div>
              <section frResizablePanel [defaultSize]="38" [minSize]="20">Activity log</section>
            </div>
          </section>
        </div>
      }

      @case ('constraints') {
        <div frResizablePanelGroup class="docs-resizable-shell" aria-label="Constrained split view">
          <section frResizablePanel [defaultSize]="24">
            <span class="docs-resizable-eyebrow">Optional nav</span>
          </section>
          <div frResizableHandle withHandle></div>
          <section frResizablePanel [defaultSize]="30" [minSize]="18" [maxSize]="45" collapsible [collapsedSize]="8">
            <span class="docs-resizable-eyebrow">Pinned filters</span>
          </section>
          <div frResizableHandle withHandle></div>
          <section frResizablePanel [defaultSize]="46" [minSize]="40">
            <span class="docs-resizable-eyebrow">Content</span>
          </section>
        </div>
      }

      @case ('custom-styling') {
        <div frResizablePanelGroup class="docs-resizable-shell docs-resizable-custom" aria-label="Custom resizable view">
          <section frResizablePanel [defaultSize]="38" [minSize]="24">Queue</section>
          <div frResizableHandle withHandle></div>
          <section frResizablePanel [defaultSize]="62" [minSize]="32">Review board</section>
        </div>
      }

      @case ('rtl') {
        <div dir="rtl" frResizablePanelGroup class="docs-resizable-shell" aria-label="واجهة قابلة لتغيير الحجم">
          <section frResizablePanel [defaultSize]="34" [minSize]="20">القائمة</section>
          <div frResizableHandle withHandle></div>
          <section frResizablePanel [defaultSize]="66" [minSize]="30">المحتوى</section>
        </div>
      }

      @case ('inspector') {
        <div
          frResizablePanelGroup
          class="docs-resizable-shell"
          aria-label="Token inspector resizable view"
          data-token-target="resizable-root"
        >
          <section frResizablePanel [defaultSize]="34" [minSize]="20" data-token-target="resizable-panel">Sidebar</section>
          <div frResizableHandle withHandle data-token-target="resizable-handle"></div>
          <section frResizablePanel [defaultSize]="66" [minSize]="30">Content</section>
        </div>
      }
    }
  `,
  styles: `
    .docs-resizable-shell {
      width: min(100%, 42rem);
      height: 16rem;
      margin-inline: auto;
    }

    .docs-resizable-tall {
      height: 20rem;
    }

    .docs-resizable-shell [frResizablePanel] {
      display: grid;
      place-items: center;
      color: var(--frame-muted-foreground);
      font-size: 0.875rem;
      font-weight: 600;
    }

    .docs-resizable-eyebrow {
      border-radius: var(--frame-radius-full);
      background: var(--frame-muted);
      padding: 0.375rem 0.75rem;
    }

    .docs-resizable-nested {
      width: 100%;
      height: 100%;
      border: 0;
      border-radius: 0;
    }

    .docs-resizable-custom {
      --frame-resizable-radius: 1.25rem;
      --frame-resizable-border: color-mix(in srgb, var(--frame-primary) 22%, var(--frame-border));
      --frame-resizable-bg: linear-gradient(135deg, var(--frame-surface), color-mix(in srgb, var(--frame-primary) 8%, var(--frame-surface)));
      --frame-resizable-handle-size: 0.75rem;
      --frame-resizable-handle-hover-bg: color-mix(in srgb, var(--frame-primary) 22%, transparent);
      --frame-resizable-handle-active-bg: color-mix(in srgb, var(--frame-primary) 34%, transparent);
      --frame-resizable-handle-indicator-bg: var(--frame-primary);
      --frame-resizable-handle-indicator-size: 2.5rem;
    }
  `,
})
export class DocsResizablePreviewComponent {
  readonly config = input.required<ResizablePreviewConfig>();
}

