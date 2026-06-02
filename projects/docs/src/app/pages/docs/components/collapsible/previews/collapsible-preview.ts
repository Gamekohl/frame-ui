import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { FrButtonModule } from '@frame-ui/components/button';
import { FrCardModule } from '@frame-ui/components/card';
import { FrCollapsibleModule } from '@frame-ui/components/collapsible';
import { FrInputModule } from '@frame-ui/components/input';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { tablerChevronDown, tablerChevronRight } from '@ng-icons/tabler-icons';

export type CollapsiblePreviewMode =
  | 'basic'
  | 'controlled'
  | 'settings'
  | 'file-tree'
  | 'inspector'
  | 'rtl';

export type CollapsiblePreviewConfig = {
  mode?: CollapsiblePreviewMode;
  className?: string;
  style?: string;
};

@Component({
  selector: 'docs-collapsible-preview',
  imports: [
    FrButtonModule,
    FrCardModule,
    FrCollapsibleModule,
    FrInputModule,
    NgIcon,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [provideIcons({ tablerChevronDown, tablerChevronRight })],
  template: `
    <div
      [class]="config().className ?? 'w-full flex justify-center py-2'"
      [style]="config().style ?? null"
    >
      @switch (config().mode ?? 'basic') {
        @case ('controlled') {
          <section
            frCollapsible
            [open]="controlledOpen()"
            (openChange)="controlledOpen.set($event)"
            class="docs-collapsible-order"
          >
            <div class="docs-collapsible-row">
              <div>
                <p class="docs-collapsible-eyebrow">Order #4189</p>
                <p class="docs-collapsible-title">Toggle shipping details</p>
              </div>
              <button frButton frCollapsibleTrigger appearance="outline" size="sm" type="button">
                <span frButtonLabel>{{ controlledOpen() ? 'Hide' : 'Show' }}</span>
              </button>
            </div>
            <div frCollapsibleContent>
              <div frCard>
                <div frCardContent class="docs-collapsible-card-content">
                  <span>Status</span>
                  <strong>Shipped</strong>
                </div>
              </div>
            </div>
          </section>
        }

        @case ('settings') {
          <section frCollapsible defaultOpen class="docs-collapsible-panel">
            <button
              frButton
              frCollapsibleTrigger
              appearance="ghost"
              type="button"
              class="docs-collapsible-panel-trigger"
            >
              <span frButtonLabel>Advanced radius settings</span>
              <ng-icon name="tablerChevronDown" size="16" />
            </button>
            <div frCollapsibleContent>
              <div class="docs-collapsible-settings-grid">
                <label>
                  <span>Radius X</span>
                  <input frInput value="12px" />
                </label>
                <label>
                  <span>Radius Y</span>
                  <input frInput value="16px" />
                </label>
              </div>
            </div>
          </section>
        }

        @case ('file-tree') {
          <div class="docs-collapsible-tree" aria-label="Project files">
            <section frCollapsible defaultOpen>
              <button frCollapsibleTrigger class="docs-collapsible-tree-trigger" type="button">
                <ng-icon
                  name="tablerChevronRight"
                  size="16"
                />
                <span>components</span>
              </button>
              <div frCollapsibleContent>
                <section frCollapsible defaultOpen class="group docs-collapsible-tree-branch">
                  <button frCollapsibleTrigger class="docs-collapsible-tree-trigger" type="button">
                    <ng-icon
                      class="group-data-[state=open]:rotate-90"
                      name="tablerChevronRight"
                      size="16"
                    />
                    <span>collapsible</span>
                  </button>
                  <div frCollapsibleContent class="docs-collapsible-tree-files">
                    <span>collapsible.ts</span>
                    <span>collapsible.css</span>
                    <span>collapsible.spec.ts</span>
                  </div>
                </section>
                <section frCollapsible class="group docs-collapsible-tree-branch">
                  <button frCollapsibleTrigger class="docs-collapsible-tree-trigger" type="button">
                    <ng-icon
                      class="group-data-[state=open]:rotate-90"
                      name="tablerChevronRight"
                      size="16"
                    />
                    <span>button</span>
                  </button>
                  <div frCollapsibleContent class="docs-collapsible-tree-files">
                    <span>button.ts</span>
                    <span>button.css</span>
                  </div>
                </section>
              </div>
            </section>
          </div>
        }

        @case ('inspector') {
          <section
            frCollapsible
            defaultOpen
            class="docs-collapsible-order"
            data-token-target="collapsible-root"
          >
            <div class="docs-collapsible-row">
              <div>
                <p class="docs-collapsible-eyebrow">Order #4189</p>
                <p class="docs-collapsible-title">Toggle details</p>
              </div>
              <button
                frButton
                frCollapsibleTrigger
                appearance="outline"
                size="sm"
                type="button"
                data-token-target="collapsible-trigger"
              >
                <span frButtonLabel>Details</span>
                <ng-icon name="tablerChevronDown" size="16" />
              </button>
            </div>
            <div frCollapsibleContent data-token-target="collapsible-content">
              <div frCard>
                <div frCardContent class="docs-collapsible-card-content">
                  <span>Status</span>
                  <strong>Shipped</strong>
                </div>
              </div>
            </div>
          </section>
        }

        @case ('rtl') {
          <section frCollapsible defaultOpen class="docs-collapsible-order" dir="rtl">
            <div class="docs-collapsible-row">
              <div>
                <p class="docs-collapsible-eyebrow">الطلب #4189</p>
                <p class="docs-collapsible-title">تفاصيل الشحن</p>
              </div>
              <button frButton frCollapsibleTrigger appearance="outline" size="sm" type="button">
                <span frButtonLabel>تبديل</span>
                <ng-icon name="tablerChevronDown" size="16" />
              </button>
            </div>
            <div frCollapsibleContent>
              <div frCard>
                <div frCardContent class="docs-collapsible-card-content">
                  <span>الحالة</span>
                  <strong>تم الشحن</strong>
                </div>
              </div>
            </div>
          </section>
        }

        @default {
          <section frCollapsible defaultOpen class="docs-collapsible-order">
            <div class="docs-collapsible-row">
              <div>
                <p class="docs-collapsible-eyebrow">Order #4189</p>
                <p class="docs-collapsible-title">Product details</p>
              </div>
              <button frButton frCollapsibleTrigger appearance="outline" size="sm" type="button">
                <span frButtonLabel>Toggle details</span>
                <ng-icon name="tablerChevronDown" size="16" />
              </button>
            </div>
            <div frCollapsibleContent>
              <div frCard>
                <div frCardContent class="docs-collapsible-card-content">
                  <span>Status</span>
                  <strong>Shipped</strong>
                </div>
              </div>
            </div>
          </section>
        }
      }
    </div>
  `,
  styles: `
    .docs-collapsible-order,
    .docs-collapsible-panel,
    .docs-collapsible-tree {
      width: min(100%, 28rem);
    }

    .docs-collapsible-order {
      display: grid;
      gap: 0.75rem;
      padding-block: 0.125rem;
    }

    .docs-collapsible-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
    }

    .docs-collapsible-eyebrow {
      margin: 0;
      color: var(--frame-muted-foreground);
      font-size: 0.8125rem;
    }

    .docs-collapsible-title {
      margin: 0;
      color: var(--frame-foreground);
      font-size: 1rem;
      font-weight: 600;
    }

    .docs-collapsible-card-content {
      display: flex;
      justify-content: space-between;
      gap: 1rem;
    }

    .docs-collapsible-panel {
      border: 1px solid var(--frame-border);
      border-radius: var(--frame-radius-lg);
      padding: 0.5rem;
    }

    .docs-collapsible-panel-trigger {
      width: 100%;
      justify-content: space-between;
    }

    .docs-collapsible-settings-grid {
      display: grid;
      gap: 0.75rem;
      padding-inline: 0.5rem;
    }

    .docs-collapsible-settings-grid label {
      display: grid;
      gap: 0.375rem;
      color: var(--frame-foreground);
      font-size: 0.875rem;
      font-weight: 500;
    }

    .docs-collapsible-tree {
      border: 1px solid var(--frame-border);
      border-radius: var(--frame-radius-lg);
      padding: 1rem;
      font-size: 0.875rem;
    }

    .docs-collapsible-tree-trigger {
      inline-size: 100%;
      display: inline-flex;
      align-items: center;
      gap: 0.375rem;
      border: 0;
      background: transparent;
      color: var(--frame-foreground);
      cursor: pointer;
      font: inherit;
      padding: 0.25rem 0;
      text-align: start;
    }

    .docs-collapsible-tree-branch {
      margin-inline-start: 1.25rem;
    }

    .docs-collapsible-tree-files {
      display: grid;
      gap: 0.25rem;
      margin-inline-start: 2.75rem;
      color: var(--frame-muted-foreground);
    }
  `,
})
export class DocsCollapsiblePreviewComponent {
  readonly config = input<CollapsiblePreviewConfig>({});
  readonly controlledOpen = signal(false);
}

