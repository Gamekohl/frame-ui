import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FrButton, FrButtonIcon, FrButtonLabel, FrIconButton } from '@frame-ui-ng/components';
import { FrCommandModule } from '@frame-ui-ng/components/command';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-header',
  imports: [
    FrButton,
    FrButtonIcon,
    FrButtonLabel,
    FrCommandModule,
    FrIconButton,
    NgIcon,
    RouterLink,
  ],
  template: `
    <header
      class="flex items-center justify-end gap-4 border-b border-border bg-surface px-4 py-2.5"
    >
      <h2 class="text-xl font-semibold flex-1">{{ title() }}</h2>

      <button [frCommandDialogTrigger]="commandMenu" appearance="outline" frButton type="button">
        <ng-icon frButtonIcon name="tablerSearch" size="16" />
        <span frButtonLabel>Search releases, services...</span>
      </button>

      <button frIconButton appearance="ghost" aria-label="Notifications" type="button">
        <span frButtonIcon>
          <ng-icon name="tablerBell" size="16" />
        </span>
      </button>
    </header>

    <ng-template
      #commandMenu="frCommandDialog"
      frCommandDialog
      aria-label="DeployOps command palette"
    >
      <section frCommand closeOnSelect>
        <input frCommandInput placeholder="Search commands, pages, or operations..." />

        <div frCommandList>
          <p frCommandEmpty>No matching command.</p>

          <div frCommandGroup heading="Navigation">
            <p frCommandGroupHeading>Navigation</p>
            <button routerLink="/" frCommandItem value="release-queue" label="Open Release Queue">
              <ng-icon frCommandItemIcon name="tablerPackages" size="16" />
              Open Release Queue
            </button>
            <button
              routerLink="/deployments"
              frCommandItem
              value="deployments"
              label="Open Deployments"
            >
              <ng-icon frCommandItemIcon name="tablerRocket" size="16" />
              Open Deployments
            </button>
            <button routerLink="/services" frCommandItem value="services" label="Open Services">
              <ng-icon frCommandItemIcon name="tablerServer" size="16" />
              Open Services
            </button>
            <button routerLink="/environments" frCommandItem value="environments" label="Open Environments">
              <ng-icon frCommandItemIcon name="tablerLayersIntersect" size="16" />
              Open Environments
            </button>
          </div>

          <div frCommandGroup heading="Operations">
            <p frCommandGroupHeading>Operations</p>
            <button frCommandItem value="ship-release" label="Ship approved release">
              <ng-icon frCommandItemIcon name="tablerSend" size="16" />
              Ship approved release
            </button>
            <button frCommandItem value="pause-deployment" label="Pause running deployment">
              <ng-icon frCommandItemIcon name="tablerExclamationCircle" size="16" />
              Pause running deployment
            </button>
            <button frCommandItem value="refresh-data" label="Refresh production data">
              <ng-icon frCommandItemIcon name="tablerRefresh" size="16" />
              Refresh production data
            </button>
          </div>
        </div>

        <div frCommandFooter>Production workspace</div>
      </section>
    </ng-template>
  `,
})
export class Header {
  title = input.required<string>();
}
