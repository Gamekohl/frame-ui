import { Component, input } from '@angular/core';
import { FrButton, FrButtonIcon, FrButtonLabel, FrIconButton, FrInputGroup, FrInputGroupAddon, FrInputGroupInput } from '@frame-ui-ng/components';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-header',
  imports: [
    FrButton,
    FrButtonIcon,
    FrButtonLabel,
    FrIconButton,
    FrInputGroup,
    FrInputGroupAddon,
    FrInputGroupInput,
    NgIcon,
  ],
  template: `
    <header class="dashboard-header flex items-center justify-end gap-4">
      <h2 class="text-xl font-semibold flex-1">{{ title() }}</h2>

      <div class="flex">
        <div class="w-96!" frInputGroup>
          <span frInputGroupAddon align="inline-start" variant="ghost">
            <ng-icon frButtonIcon name="tablerSearch" size="16" />
          </span>

          <input
            frInputGroupInput
            id="search"
            type="text"
            placeholder="Search releases, services, ..."
          />

          <div frInputGroupAddon align="inline-end">
            <button appearance="outline" frButton type="button">
              <ng-icon frButtonIcon name="tablerFilter" size="16" />
              <span frButtonLabel>Filter</span>
            </button>
          </div>
        </div>
      </div>

      <button frIconButton appearance="ghost" aria-label="Notifications" type="button">
        <span frButtonIcon>
          <ng-icon name="tablerBell" size="16" />
        </span>
      </button>
    </header>
  `,
  styles: `
    .dashboard-header {
      border-bottom: 1px solid var(--frame-border);
      background: var(--frame-surface);
      padding: 0.6rem 1rem;
    }
  `,
})
export class Header {
  title = input.required<string>();
}
