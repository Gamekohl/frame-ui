import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FrButton, FrButtonIcon, FrButtonLabel } from '@frame-ui/components/button';
import { FrTooltipModule } from '@frame-ui/components/tooltip';
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
          <frame-tooltip [openDelay]="150">
            <button frButton appearance="outline" [frTooltipTrigger]="tip" type="button">
              <span frButtonLabel>Hover for context</span>
            </button>

            <ng-template #tip="frTooltipContent" frTooltipContent>
              <div frTooltipPanel>Helpful details appear on hover or keyboard focus.</div>
            </ng-template>
          </frame-tooltip>
        </div>
      }

      @case ('arrow') {
        <div class="docs-tooltip-row">
          <frame-tooltip [openDelay]="150">
            <button frButton appearance="outline" [frTooltipTrigger]="noArrow" type="button">
              No arrow
            </button>
            <ng-template #noArrow="frTooltipContent" frTooltipContent>
              <div frTooltipPanel>A compact label without an arrow.</div>
            </ng-template>
          </frame-tooltip>

          <frame-tooltip [openDelay]="150">
            <button frButton appearance="outline" [frTooltipTrigger]="withArrow" type="button">
              With arrow
            </button>
            <ng-template #withArrow="frTooltipContent" frTooltipContent arrow>
              <div frTooltipPanel>A small arrow points back to the trigger.</div>
            </ng-template>
          </frame-tooltip>
        </div>
      }

      @case ('sides') {
        <div class="docs-tooltip-grid">
          @for (side of sides; track side) {
            <frame-tooltip [openDelay]="100">
              <button frButton appearance="outline" [frTooltipTrigger]="sideTip" type="button">
                {{ side }}
              </button>
              <ng-template #sideTip="frTooltipContent" frTooltipContent [side]="side" arrow>
                <div frTooltipPanel>{{ side }} side</div>
              </ng-template>
            </frame-tooltip>
          }
        </div>
      }

      @case ('shortcut') {
        <div class="docs-tooltip-row">
          <frame-tooltip [openDelay]="150">
            <button frButton appearance="outline" [frTooltipTrigger]="saveTip" type="button">
              <ng-icon frButtonIcon name="tablerDeviceFloppy" />
              <span frButtonLabel>Save draft</span>
            </button>
            <ng-template #saveTip="frTooltipContent" frTooltipContent arrow>
              <div frTooltipPanel class="docs-tooltip-shortcut">
                <span>Save current draft</span>
                <kbd frTooltipShortcut>Ctrl S</kbd>
              </div>
            </ng-template>
          </frame-tooltip>
        </div>
      }

      @case ('disabled') {
        <div class="docs-tooltip-row">
          <frame-tooltip [openDelay]="150">
            <span [frTooltipTrigger]="disabledTip" tabindex="0" class="docs-tooltip-disabled-trigger">
              <button frButton disabled type="button">
                <ng-icon frButtonIcon name="tablerLock" />
                <span frButtonLabel>Locked action</span>
              </button>
            </span>
            <ng-template #disabledTip="frTooltipContent" frTooltipContent arrow>
              <div frTooltipPanel>Upgrade permissions before running this action.</div>
            </ng-template>
          </frame-tooltip>
        </div>
      }

      @case ('delay') {
        <div class="docs-tooltip-row">
          <frame-tooltip [openDelay]="650" [closeDelay]="120">
            <button frButton appearance="outline" [frTooltipTrigger]="delayTip" type="button">
              Intentional delay
            </button>
            <ng-template #delayTip="frTooltipContent" frTooltipContent arrow>
              <div frTooltipPanel>Delayed hints avoid flashing while users move across controls.</div>
            </ng-template>
          </frame-tooltip>
        </div>
      }

      @case ('custom-styling') {
        <div class="docs-tooltip-row">
          <frame-tooltip [openDelay]="150" class="docs-tooltip-custom-trigger">
            <button frButton appearance="outline" [frTooltipTrigger]="customTip" type="button">
              Branded hint
            </button>
            <ng-template #customTip="frTooltipContent" frTooltipContent arrow>
              <div frTooltipPanel>Styled with local tooltip tokens.</div>
            </ng-template>
          </frame-tooltip>
        </div>
      }

      @case ('rtl') {
        <div class="docs-tooltip-grid" dir="rtl" lang="ar">
          @for (side of sides; track side) {
            <frame-tooltip [openDelay]="100">
              <button frButton appearance="outline" [frTooltipTrigger]="rtlTip" type="button">
                {{ side }}
              </button>
              <ng-template #rtlTip="frTooltipContent" frTooltipContent [side]="side" arrow>
                <div frTooltipPanel>تلميح في جهة {{ side }}</div>
              </ng-template>
            </frame-tooltip>
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

    .docs-tooltip-disabled-trigger {
      display: inline-flex;
    }

    .docs-tooltip-custom-trigger {
      --frame-tooltip-content-bg: linear-gradient(135deg, #16302b, #315c4f);
      --frame-tooltip-content-color: #f6fff9;
      --frame-tooltip-content-radius: 999px;
      --frame-tooltip-content-padding: 0.5rem 0.875rem;
      --frame-tooltip-content-shadow: 0 16px 36px rgb(22 48 43 / 0.28);
    }
  `,
})
export class DocsTooltipPreviewComponent {
  readonly config = input.required<TooltipPreviewConfig>();
  protected readonly sides = ['top', 'right', 'bottom', 'left'] as const;
}
