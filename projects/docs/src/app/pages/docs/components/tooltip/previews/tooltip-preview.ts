import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FrButton, FrButtonIcon, FrButtonLabel } from '@frame-ui-ng/components/button';
import { FrTooltipModule } from '@frame-ui-ng/components/tooltip';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  tablerCopy,
  tablerDeviceFloppy,
  tablerHelpCircle,
  tablerInfoCircle,
  tablerKeyboard,
  tablerLock,
} from '@ng-icons/tabler-icons';

export type TooltipPreviewMode =
  | 'arrow'
  | 'basic'
  | 'custom-styling'
  | 'delay'
  | 'disabled'
  | 'inspector'
  | 'rtl'
  | 'shortcut'
  | 'sides';

export type TooltipPreviewConfig = {
  mode: TooltipPreviewMode;
};

@Component({
  selector: 'docs-tooltip-preview',
  host: {
    class: 'block w-full',
  },
  imports: [FrButton, FrButtonIcon, FrButtonLabel, FrTooltipModule, NgIcon],
  viewProviders: [
    provideIcons({
      tablerCopy,
      tablerDeviceFloppy,
      tablerHelpCircle,
      tablerInfoCircle,
      tablerKeyboard,
      tablerLock,
    }),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @switch (config().mode) {
      @case ('basic') {
        <div class="docs-tooltip-row">
          <button
            frButton
            appearance="outline"
            frTooltip="Helpful details appear on hover or keyboard focus."
            [frTooltipOpenDelay]="150"
            type="button"
          >
            <span frButtonLabel>Hover for context</span>
          </button>
        </div>
      }

      @case ('arrow') {
        <div class="docs-tooltip-row">
          <button
            frButton
            appearance="outline"
            frTooltip="A compact label without an arrow."
            [frTooltipOpenDelay]="150"
            type="button"
          >
            No arrow
          </button>

          <button
            frButton
            appearance="outline"
            frTooltip="A small arrow points back to the trigger."
            [frTooltipOpenDelay]="150"
            frTooltipArrow
            type="button"
          >
            With arrow
          </button>
        </div>
      }

      @case ('sides') {
        <div class="docs-tooltip-grid">
          @for (side of sides; track side) {
            <button
              frButton
              appearance="outline"
              [frTooltip]="side + ' side'"
              [frTooltipOpenDelay]="100"
              [frTooltipSide]="side"
              frTooltipArrow
              type="button"
            >
              {{ side }}
            </button>
          }
        </div>
      }

      @case ('shortcut') {
        <div class="docs-tooltip-row">
          <button frButton appearance="outline" [frTooltip]="saveTip" frTooltipArrow type="button">
            <ng-icon frButtonIcon name="tablerDeviceFloppy" />
            <span frButtonLabel>Save draft</span>
          </button>

          <ng-template #saveTip>
            <div class="docs-tooltip-shortcut">
              <span>Save current draft</span>
              <kbd frTooltipShortcut>Ctrl S</kbd>
            </div>
          </ng-template>
        </div>
      }

      @case ('disabled') {
        <div class="docs-tooltip-row">
          <button
            frButton
            frTooltip="Upgrade permissions before running this action."
            [frTooltipOpenDelay]="150"
            frTooltipArrow
            disabled
            type="button"
          >
            <ng-icon frButtonIcon name="tablerLock" />
            <span frButtonLabel>Locked action</span>
          </button>
        </div>
      }

      @case ('delay') {
        <div class="docs-tooltip-row">
          <button
            frButton
            appearance="outline"
            frTooltip="Delayed hints avoid flashing while users move across controls."
            [frTooltipOpenDelay]="650"
            [frTooltipCloseDelay]="120"
            frTooltipArrow
            type="button"
          >
            Intentional delay
          </button>
        </div>
      }

      @case ('custom-styling') {
        <div class="docs-tooltip-row">
          <button
            frButton
            appearance="outline"
            class="docs-tooltip-custom-trigger"
            frTooltip="Styled with local tooltip tokens."
            [frTooltipOpenDelay]="150"
            frTooltipArrow
            type="button"
          >
            Branded hint
          </button>
        </div>
      }

      @case ('rtl') {
        <div class="docs-tooltip-grid" dir="rtl" lang="ar">
          @for (side of sides; track side) {
            <button
              frButton
              appearance="outline"
              [frTooltip]="'تلميح في جهة ' + side"
              [frTooltipOpenDelay]="100"
              [frTooltipSide]="side"
              frTooltipArrow
              type="button"
            >
              {{ side }}
            </button>
          }
        </div>
      }

      @case ('inspector') {
        <div class="docs-tooltip-inspector" data-token-target="tooltip-region">
          <div class="frame-tooltip__content docs-tooltip-static-panel" data-arrow data-side="top" data-token-target="tooltip-panel">
            <span data-token-target="tooltip-text">Persistent tooltip panel</span>
          </div>
        </div>
      }
    }
  `,
  styles: `
    .docs-tooltip-row,
    .docs-tooltip-grid {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      width: min(100%, 34rem);
      margin-inline: auto;
    }

    .docs-tooltip-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, max-content));
    }

    .docs-tooltip-inspector {
      display: grid;
      width: min(100%, 34rem);
      margin-inline: auto;
      justify-items: center;
      gap: 1rem;
    }

    .docs-tooltip-static-panel {
      animation: none;
    }

    .docs-tooltip-static-panel--soft {
      --frame-tooltip-content-bg: var(--frame-muted);
      --frame-tooltip-content-color: var(--frame-muted-foreground);
      display: inline-flex;
      align-items: center;
      gap: 0.375rem;
    }

    .docs-tooltip-shortcut {
      display: inline-flex;
      align-items: center;
      gap: 0.75rem;
    }

    .docs-tooltip-custom-trigger {
      --frame-tooltip-content-bg: linear-gradient(135deg, #16302b, #315c4f);
      --frame-tooltip-content-color: #f6fff9;
      --frame-tooltip-content-radius: var(--frame-radius-full);
      --frame-tooltip-content-padding: 0.5rem 0.875rem;
      --frame-tooltip-content-shadow: 0 16px 36px rgb(22 48 43 / 0.28);
    }
  `,
})
export class DocsTooltipPreviewComponent {
  readonly config = input.required<TooltipPreviewConfig>();
  protected readonly sides = ['top', 'right', 'bottom', 'left'] as const;
}
