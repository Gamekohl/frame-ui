import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { FrButtonModule } from '@frame-ui/components/button';
import { FrInputModule } from '@frame-ui/components/input';
import { FrPopoverModule } from '@frame-ui/components/popover';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { tablerCheck, tablerSettings, tablerX } from '@ng-icons/tabler-icons';

export type PopoverPreviewMode =
  | 'align'
  | 'basic'
  | 'controlled'
  | 'custom-styling'
  | 'form'
  | 'inspector'
  | 'rtl';

export type PopoverPreviewConfig = {
  mode?: PopoverPreviewMode;
  className?: string;
  style?: string;
};

@Component({
  selector: 'docs-popover-preview',
  imports: [
    FrButtonModule,
    FrInputModule,
    FrPopoverModule,
    NgIcon,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    provideIcons({
      tablerCheck,
      tablerSettings,
      tablerX,
    }),
  ],
  template: `
    <div [class]="config().className ?? 'flex w-full justify-center'" [style]="config().style ?? null">
      @switch (config().mode ?? 'basic') {
        @case ('align') {
          <div class="docs-popover-row">
            @for (align of alignments; track align) {
              <frame-popover>
                <button frButton appearance="outline" [frPopoverTrigger]="panel" type="button">
                  {{ align }}
                </button>

                <ng-template #panel="frPopoverContent" frPopoverContent side="bottom" [align]="align">
                  <div frPopoverPanel>
                    <div frPopoverHeader>
                      <h3 frPopoverTitle>{{ align }} aligned</h3>
                      <p frPopoverDescription>
                        The panel keeps its preferred alignment until the viewport requires a fallback.
                      </p>
                    </div>
                  </div>
                </ng-template>
              </frame-popover>
            }
          </div>
        }

        @case ('form') {
          <frame-popover>
            <button frButton appearance="outline" [frPopoverTrigger]="formPanel" type="button">
              Edit project
            </button>

            <ng-template #formPanel="frPopoverContent" frPopoverContent side="bottom" align="center">
              <div frPopoverPanel>
                <div frPopoverHeader>
                  <h3 frPopoverTitle>Project details</h3>
                  <p frPopoverDescription>Update the short label shown in dashboards.</p>
                </div>
                <div frPopoverBody>
                  <label class="docs-popover-field">
                    <span>Name</span>
                    <input frInput value="Launch notes" />
                  </label>
                  <label class="docs-popover-field">
                    <span>Owner</span>
                    <input frInput value="Design team" />
                  </label>
                </div>
                <div frPopoverFooter>
                  <button frButton appearance="outline" frPopoverClose type="button">Cancel</button>
                  <button frButton frPopoverClose type="button">Save</button>
                </div>
              </div>
            </ng-template>
          </frame-popover>
        }

        @case ('controlled') {
          <div class="docs-popover-stack">
            <button frButton appearance="outline" type="button" (click)="controlledOpen.set(true)">
              Open controlled popover
            </button>

            <frame-popover [(open)]="controlledOpen">
              <button frButton appearance="ghost" [frPopoverTrigger]="controlledPanel" type="button">
                <ng-icon frButtonIcon name="tablerSettings" size="16" />
                Preferences
              </button>

              <ng-template #controlledPanel="frPopoverContent" frPopoverContent side="right" align="center">
                <div frPopoverPanel>
                  <div frPopoverHeader>
                    <h3 frPopoverTitle>Controlled state</h3>
                    <p frPopoverDescription>The open signal can be changed from outside the trigger.</p>
                  </div>
                  <div frPopoverFooter>
                    <button frButton frPopoverClose type="button">Close</button>
                  </div>
                </div>
              </ng-template>
            </frame-popover>
          </div>
        }

        @case ('custom-styling') {
          <frame-popover>
            <button
              frButton
              appearance="outline"
              class="docs-popover-custom-trigger"
              [frPopoverTrigger]="customPanel"
              type="button"
            >
              Review status
            </button>

            <ng-template #customPanel="frPopoverContent" frPopoverContent side="right" align="center">
              <div frPopoverPanel class="docs-popover-custom-panel">
                <div frPopoverHeader>
                  <h3 frPopoverTitle>Ready for handoff</h3>
                  <p frPopoverDescription>Three checklist items were completed in the last review.</p>
                </div>
                <div frPopoverBody>
                  <span class="docs-popover-status">
                    <ng-icon name="tablerCheck" size="16" />
                    Tokens, docs, and examples verified
                  </span>
                </div>
              </div>
            </ng-template>
          </frame-popover>
        }

        @case ('rtl') {
          <div dir="rtl">
            <frame-popover>
              <button frButton appearance="outline" [frPopoverTrigger]="rtlPanel" type="button">
                إعدادات العرض
              </button>

              <ng-template #rtlPanel="frPopoverContent" frPopoverContent side="bottom" align="end">
                <div frPopoverPanel>
                  <div frPopoverHeader>
                    <h3 frPopoverTitle>خيارات سريعة</h3>
                    <p frPopoverDescription>يدعم المحتوى اتجاه النص من اليمين إلى اليسار.</p>
                  </div>
                  <div frPopoverFooter>
                    <button frButton frPopoverClose type="button">تم</button>
                  </div>
                </div>
              </ng-template>
            </frame-popover>
          </div>
        }

        @case ('inspector') {
          <div class="frame-popover__content docs-popover-inspector" data-token-target="popover-panel">
            <div frPopoverHeader data-token-target="popover-header">
              <h3 frPopoverTitle data-token-target="popover-title">Release checklist</h3>
              <p frPopoverDescription data-token-target="popover-description">
                Inspect the panel, header, body, footer, and close token hooks.
              </p>
            </div>
            <div frPopoverBody data-token-target="popover-body">
              <label class="docs-popover-field">
                <span>Version</span>
                <input frInput value="2.4.0" />
              </label>
            </div>
            <div frPopoverFooter data-token-target="popover-footer">
              <button frButton appearance="outline" type="button" data-token-target="popover-close">
                <ng-icon frButtonIcon name="tablerX" size="16" />
                Dismiss
              </button>
            </div>
          </div>
        }

        @default {
          <frame-popover>
            <button frButton appearance="outline" [frPopoverTrigger]="panel" type="button">
              Open quick note
            </button>

            <ng-template #panel="frPopoverContent" frPopoverContent side="bottom" align="center">
              <div frPopoverPanel>
                <div frPopoverHeader>
                  <h3 frPopoverTitle>Review reminder</h3>
                  <p frPopoverDescription>
                    Capture the next thing your team should check before publishing.
                  </p>
                </div>
                <div frPopoverFooter>
                  <button frButton appearance="outline" frPopoverClose type="button">Later</button>
                  <button frButton frPopoverClose type="button">Mark done</button>
                </div>
              </div>
            </ng-template>
          </frame-popover>
        }
      }
    </div>
  `,
  styles: `
    .docs-popover-row,
    .docs-popover-stack {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
    }

    .docs-popover-stack {
      flex-direction: column;
    }

    .docs-popover-field {
      display: grid;
      gap: 0.375rem;
      font-size: 0.8125rem;
      font-weight: 500;
    }

    .docs-popover-custom-trigger {
      --frame-popover-content-width: 22rem;
      --frame-popover-content-radius: 1.25rem;
      --frame-popover-content-bg: linear-gradient(135deg, var(--frame-surface), color-mix(in srgb, var(--frame-primary) 10%, var(--frame-surface)));
      --frame-popover-content-shadow: 0 26px 80px color-mix(in srgb, var(--frame-primary) 20%, transparent);
      --frame-popover-title-color: var(--frame-primary);
    }

    .docs-popover-status {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      border-radius: 999px;
      background: color-mix(in srgb, var(--frame-primary) 10%, transparent);
      color: var(--frame-primary);
      font-size: 0.8125rem;
      font-weight: 600;
      padding: 0.375rem 0.625rem;
    }

    .docs-popover-inspector {
      position: static;
    }
  `,
})
export class DocsPopoverPreviewComponent {
  readonly config = input<PopoverPreviewConfig>({});

  protected readonly alignments = ['start', 'center', 'end'] as const;
  protected readonly controlledOpen = signal(false);
}

