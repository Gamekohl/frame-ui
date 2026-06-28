import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { FrBadgeModule } from '@frame-ui-ng/components/badge';
import { FrButtonModule } from '@frame-ui-ng/components/button';
import { FrCardModule } from '@frame-ui-ng/components/card';
import { FrCollapsibleModule } from '@frame-ui-ng/components/collapsible';
import { FrInputModule } from '@frame-ui-ng/components/input';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { tablerChevronDown } from '@ng-icons/tabler-icons';

export type CollapsiblePreviewMode =
  | 'basic'
  | 'controlled'
  | 'disabled'
  | 'settings'
  | 'metadata'
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
    FrBadgeModule,
    FrButtonModule,
    FrCardModule,
    FrCollapsibleModule,
    FrInputModule,
    NgIcon,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [provideIcons({ tablerChevronDown })],
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
            class="docs-collapsible-surface"
          >
            <div class="docs-collapsible-surface__header">
              <div>
                <p class="docs-collapsible-eyebrow">Support handoff</p>
                <h3 class="docs-collapsible-title">Escalate checkout issue</h3>
              </div>
              <button frButton frCollapsibleTrigger appearance="outline" size="sm" type="button">
                <span frButtonLabel>{{ controlledOpen() ? 'Hide notes' : 'Show notes' }}</span>
              </button>
            </div>

            <div frCollapsibleContent>
              <div class="docs-collapsible-note">
                Customer already tried a second card. Ask billing to verify the latest payment
                attempt before creating a replacement order.
              </div>
            </div>
          </section>
        }

        @case ('disabled') {
          <section frCollapsible disabled class="docs-collapsible-faq docs-collapsible-faq--disabled">
            <button frCollapsibleTrigger class="docs-collapsible-faq__trigger" type="button">
              <span>Can the rules be changed right now?</span>
              <ng-icon name="tablerChevronDown" size="18" />
            </button>
            <div frCollapsibleContent>
              This disclosure is disabled while the workspace policy is locked by an active
              deployment.
            </div>
          </section>
        }

        @case ('settings') {
          <section frCollapsible defaultOpen class="docs-collapsible-settings">
            <button frCollapsibleTrigger class="docs-collapsible-trigger" type="button">
              <span>
                <span class="docs-collapsible-title">Advanced matching rules</span>
                <span class="docs-collapsible-description">
                  Tune how strict search should be for this workspace.
                </span>
              </span>
              <ng-icon name="tablerChevronDown" size="18" />
            </button>

            <div frCollapsibleContent>
              <div class="docs-collapsible-settings__grid">
                <label>
                  <span>Minimum score</span>
                  <input frInput value="82" />
                </label>
                <label>
                  <span>Fallback region</span>
                  <input frInput value="Europe" />
                </label>
              </div>
            </div>
          </section>
        }

        @case ('metadata') {
          <section frCollapsible defaultOpen class="docs-collapsible-surface">
            <button frCollapsibleTrigger class="docs-collapsible-trigger" type="button">
              <span>
                <span class="docs-collapsible-title">Release metadata</span>
                <span class="docs-collapsible-description">
                  Build target, owner, and rollout gate for the current deploy.
                </span>
              </span>
              <ng-icon name="tablerChevronDown" size="18" />
            </button>

            <div frCollapsibleContent>
              <dl class="docs-collapsible-metadata">
                <div>
                  <dt>Environment</dt>
                  <dd>Production</dd>
                </div>
                <div>
                  <dt>Owner</dt>
                  <dd>Platform team</dd>
                </div>
                <div>
                  <dt>Status</dt>
                  <dd><span frBadge variant="success">Ready</span></dd>
                </div>
              </dl>
            </div>
          </section>
        }

        @case ('inspector') {
          <section
            frCollapsible
            defaultOpen
            class="docs-collapsible-faq"
            data-token-target="collapsible-root"
          >
            <button
              frCollapsibleTrigger
              class="docs-collapsible-faq__trigger"
              type="button"
              data-token-target="collapsible-trigger"
            >
              <span>Can I use this in production?</span>
              <ng-icon name="tablerChevronDown" size="18" />
            </button>
            <div frCollapsibleContent data-token-target="collapsible-content">
              Yes. Keep the content concise and use the controlled API when the surrounding view
              owns the disclosure state.
            </div>
          </section>
        }

        @case ('rtl') {
          <section frCollapsible defaultOpen class="docs-collapsible-faq" dir="rtl">
            <button frCollapsibleTrigger class="docs-collapsible-faq__trigger" type="button">
              <span>هل يمكن استخدامه داخل لوحة إعدادات؟</span>
              <ng-icon name="tablerChevronDown" size="18" />
            </button>
            <div frCollapsibleContent>
              نعم، تستخدم المسافات خصائص منطقية حتى تتكيف مع اتجاه النص.
            </div>
          </section>
        }

        @default {
          <section frCollapsible class="docs-collapsible-faq">
            <button frCollapsibleTrigger class="docs-collapsible-faq__trigger" type="button">
              <span>Can I use this in my project?</span>
              <ng-icon name="tablerChevronDown" size="18" />
            </button>
            <div frCollapsibleContent>
              Yes. Use collapsible when a short answer or supporting details should stay one click
              away without sending people to a new page.
            </div>
          </section>
        }
      }
    </div>
  `,
  styles: `
    .docs-collapsible-faq,
    .docs-collapsible-settings,
    .docs-collapsible-surface {
      width: min(100%, 42rem);
    }

    .docs-collapsible-surface {
      padding-block: 1rem;  
    }
    
    .docs-collapsible-faq {
      border-bottom: 1px solid var(--frame-border);
    }

    .docs-collapsible-faq--disabled {
      opacity: 0.72;
    }

    .docs-collapsible-faq__trigger,
    .docs-collapsible-trigger {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      border: 0;
      background: transparent;
      color: var(--frame-foreground);
      cursor: pointer;
      font: inherit;
      font-weight: 600;
      padding: 1rem 0;
      text-align: start;
    }

    .docs-collapsible-faq__trigger:disabled,
    .docs-collapsible-trigger:disabled {
      cursor: not-allowed;
    }

    .docs-collapsible-faq__trigger ng-icon,
    .docs-collapsible-trigger ng-icon {
      color: var(--frame-muted-foreground);
      transition: transform 180ms ease;
    }

    .docs-collapsible-faq__trigger[data-state='open'] ng-icon,
    .docs-collapsible-trigger[data-state='open'] ng-icon {
      transform: rotate(180deg);
    }

    .docs-collapsible-title {
      display: block;
      color: var(--frame-foreground);
      font-size: 1rem;
      font-weight: 650;
      line-height: 1.35;
    }

    .docs-collapsible-description {
      display: block;
      margin-block-start: 0.25rem;
      color: var(--frame-muted-foreground);
      font-size: 0.875rem;
      font-weight: 400;
      line-height: 1.45;
    }

    .docs-collapsible-eyebrow {
      margin: 0 0 0.25rem;
      color: var(--frame-muted-foreground);
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }

    .docs-collapsible-settings,
    .docs-collapsible-surface {
      border: 1px solid var(--frame-border);
      border-radius: var(--frame-radius-xl);
      background: var(--frame-surface);
      padding-inline: 1rem;
    }

    .docs-collapsible-settings__grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 0.75rem;
    }

    .docs-collapsible-settings__grid label {
      display: grid;
      gap: 0.375rem;
      color: var(--frame-foreground);
      font-size: 0.875rem;
      font-weight: 500;
    }

    .docs-collapsible-surface__header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 1rem;
    }

    .docs-collapsible-note {
      border: 1px solid var(--frame-border);
      background: var(--frame-muted);
      color: var(--frame-foreground);
      padding: 0.875rem;
    }

    .docs-collapsible-metadata {
      display: grid;
      gap: 0.5rem;
      margin: 0;
    }

    .docs-collapsible-metadata div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      border-top: 1px solid var(--frame-border);
      padding-block: 0.625rem;
    }

    .docs-collapsible-metadata dt {
      color: var(--frame-muted-foreground);
    }

    .docs-collapsible-metadata dd {
      margin: 0;
      color: var(--frame-foreground);
      font-weight: 600;
    }

    @media (max-width: 640px) {
      .docs-collapsible-settings__grid,
      .docs-collapsible-surface__header {
        grid-template-columns: 1fr;
      }

      .docs-collapsible-surface__header {
        display: grid;
      }
    }
  `,
})
export class DocsCollapsiblePreviewComponent {
  readonly config = input<CollapsiblePreviewConfig>({});
  readonly controlledOpen = signal(false);
}
