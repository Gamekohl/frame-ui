import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { FrButtonModule } from '@frame-ui-ng/components/button';
import { FrConfirmPopoverModule } from '@frame-ui-ng/components/confirm-popover';

type ConfirmPopoverPreviewMode = 'basic' | 'card' | 'custom-labels' | 'inspector' | 'positioning' | 'rtl';

export type ConfirmPopoverPreviewConfig = {
  mode?: ConfirmPopoverPreviewMode;
};

@Component({
  selector: 'docs-confirm-popover-preview',
  imports: [FrButtonModule, FrConfirmPopoverModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="docs-confirm-popover-preview">
      @switch (mode()) {
        @case ('card') {
          <div
            class="docs-confirm-popover-card"
            role="button"
            tabindex="0"
            [frConfirmPopover]="{
              title: 'Archive workspace?',
              description: 'Archived workspaces disappear from the sidebar but can be restored later.',
              cancelLabel: 'Keep active',
              confirmLabel: 'Archive'
            }"
            (frConfirmPopoverConfirmed)="archived.set(true)"
          >
            <span class="docs-confirm-popover-kicker">Workspace</span>
            <strong>Design System</strong>
            <span>{{ archived() ? 'Archived' : 'Click the card to confirm an archive action' }}</span>
          </div>
        }

        @case ('custom-labels') {
          <button
            frButton
            appearance="outline"
            type="button"
            frConfirmPopoverTitle="Discard draft?"
            frConfirmPopoverDescription="Your local edits for this note will be removed."
            frConfirmPopoverCancelLabel="Keep editing"
            frConfirmPopoverConfirmLabel="Discard"
            frConfirmPopoverConfirmAppearance="primary"
          >
            <span frButtonLabel>Discard draft</span>
          </button>
        }

        @case ('positioning') {
          <button
            frButton
            type="button"
            frConfirmPopover="Reset filters?"
            frConfirmPopoverDescription="The table will return to its default view."
            frConfirmPopoverSide="right"
            frConfirmPopoverAlign="start"
          >
            <span frButtonLabel>Reset filters</span>
          </button>
        }

        @case ('rtl') {
          <div dir="rtl">
            <button
              frButton
              appearance="outline"
              type="button"
              [frConfirmPopover]="{
                title: 'حذف العنصر؟',
                description: 'سيتم نقل العنصر إلى الأرشيف.',
                cancelLabel: 'إلغاء',
                confirmLabel: 'تأكيد',
                align: 'end'
              }"
            >
              <span frButtonLabel>فتح التأكيد</span>
            </button>
          </div>
        }

        @case ('inspector') {
          <div class="frame-popover__content frame-confirm-popover__content docs-confirm-popover-inspector" data-token-target="confirm-popover-panel">
            <div class="frame-popover__header frame-confirm-popover__header" data-token-target="confirm-popover-header">
              <h3 class="frame-popover__title frame-confirm-popover__title" data-token-target="confirm-popover-title">
                Publish changes?
              </h3>
              <p class="frame-popover__description frame-confirm-popover__description" data-token-target="confirm-popover-description">
                This will make the latest updates visible to everyone on the team.
              </p>
            </div>
            <div class="frame-popover__footer frame-confirm-popover__footer" data-token-target="confirm-popover-footer">
              <button frButton appearance="outline" size="sm" type="button">
                <span frButtonLabel>Cancel</span>
              </button>
              <button frButton size="sm" type="button">
                <span frButtonLabel>Publish</span>
              </button>
            </div>
          </div>
        }

        @default {
          <button
            frButton
            type="button"
            [frConfirmPopover]="{
              title: 'Ship release?',
              description: 'This will notify everyone watching the release channel.'
            }"
            (frConfirmPopoverConfirmed)="shipped.set(true)"
          >
            <span frButtonLabel>{{ shipped() ? 'Release shipped' : 'Ship release' }}</span>
          </button>
        }
      }
    </div>
  `,
  styles: `
    .docs-confirm-popover-preview {
      display: flex;
      min-height: 14rem;
      width: 100%;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    }

    .docs-confirm-popover-card {
      display: grid;
      width: min(100%, 20rem);
      gap: 0.35rem;
      border: 1px solid var(--frame-border);
      border-radius: var(--frame-radius-lg);
      background: var(--frame-surface);
      box-shadow: var(--frame-shadow-sm);
      color: var(--frame-foreground);
      cursor: pointer;
      padding: 1rem;
      transition:
        background 160ms ease,
        border-color 160ms ease,
        transform 160ms ease;
    }

    .docs-confirm-popover-card:hover,
    .docs-confirm-popover-card:focus-visible {
      border-color: color-mix(in srgb, var(--frame-primary) 35%, var(--frame-border));
      background: color-mix(in srgb, var(--frame-primary) 5%, var(--frame-surface));
      outline: none;
      transform: translateY(-1px);
    }

    .docs-confirm-popover-card span:last-child {
      color: var(--frame-muted-foreground);
      font-size: 0.875rem;
    }

    .docs-confirm-popover-kicker {
      color: var(--frame-muted-foreground);
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .docs-confirm-popover-inspector {
      position: static;
    }
  `,
})
export class DocsConfirmPopoverPreviewComponent {
  readonly config = input<ConfirmPopoverPreviewConfig>({});

  protected readonly archived = signal(false);
  protected readonly shipped = signal(false);

  protected mode(): ConfirmPopoverPreviewMode {
    return this.config().mode ?? 'basic';
  }
}
