import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FrAvatarModule } from '@frame-ui-ng/components/avatar';
import { FrButtonModule } from '@frame-ui-ng/components/button';
import { FrDropdownMenuModule } from '@frame-ui-ng/components/dropdown-menu';
import { FrFieldModule } from '@frame-ui-ng/components/field';
import { FrSelectModule } from '@frame-ui-ng/components/select';
import { FrSidebarModule } from '@frame-ui-ng/components/sidebar';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FrToastModule } from '@frame-ui-ng/components/toast';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  tablerBell,
  tablerChartDots,
  tablerCheckbox,
  tablerChevronDown,
  tablerCircleCheck,
  tablerDots,
  tablerEdit,
  tablerExclamationCircle,
  tablerExternalLink,
  tablerFilter,
  tablerHeartbeat,
  tablerHome,
  tablerLayersIntersect,
  tablerLogout,
  tablerPackages,
  tablerProgressCheck,
  tablerRefresh,
  tablerRocket,
  tablerSearch,
  tablerSend,
  tablerServer,
  tablerSettings,
  tablerShieldCheck,
  tablerTrash,
  tablerUsers,
  tablerX,
  tablerArrowDown,
  tablerArrowUp,
  tablerCalendar,
  tablerTimelineEventText,
} from '@ng-icons/tabler-icons';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FrAvatarModule,
    FrButtonModule,
    FrDropdownMenuModule,
    FrFieldModule,
    FrSidebarModule,
    FrSelectModule,
    NgIcon,
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    FrToastModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    provideIcons({
      tablerBell,
      tablerChevronDown,
      tablerCircleCheck,
      tablerDots,
      tablerHome,
      tablerRocket,
      tablerSearch,
      tablerServer,
      tablerSettings,
      tablerShieldCheck,
      tablerUsers,
      tablerProgressCheck,
      tablerPackages,
      tablerChartDots,
      tablerCheckbox,
      tablerFilter,
      tablerCalendar,
      tablerArrowUp,
      tablerArrowDown,
      tablerHeartbeat,
      tablerExclamationCircle,
      tablerLogout,
      tablerLayersIntersect,
      tablerExternalLink,
      tablerSend,
      tablerEdit,
      tablerTrash,
      tablerX,
      tablerRefresh,
      tablerTimelineEventText,
    }),
  ],
})
export class App {
  readonly navItems = [
    { label: 'Release Queue', icon: 'tablerTimelineEventText', route: '/release-queue' },
    { label: 'Deployments', icon: 'tablerPackages', route: '/deployments' },
    { label: 'Environments', icon: 'tablerServer', route: '/environments' },
    { label: 'Services', icon: 'tablerServer', route: '/services' },
    { label: 'Insights', icon: 'tablerChartDots', route: null },
    { label: 'Alerts', icon: 'tablerBell', route: null },
    { label: 'Approvals', icon: 'tablerCheckbox', route: null },
    { label: 'Settings', icon: 'tablerSettings', route: null },
  ];

  deploymentControl = new FormControl<string | null>({ value: 'production', disabled: true });
}
