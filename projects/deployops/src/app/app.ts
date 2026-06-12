import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
  DestroyRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FrAvatarModule } from '@frame-ui-ng/components/avatar';
import { FrBadgeModule } from '@frame-ui-ng/components/badge';
import { FrButtonModule } from '@frame-ui-ng/components/button';
import { FrCardModule } from '@frame-ui-ng/components/card';
import { FrCheckboxModule } from '@frame-ui-ng/components/checkbox';
import { FrDropdownMenuModule } from '@frame-ui-ng/components/dropdown-menu';
import { FrFieldModule } from '@frame-ui-ng/components/field';
import { FrInputModule } from '@frame-ui-ng/components/input';
import { FrSelectModule } from '@frame-ui-ng/components/select';
import { FrSidebarModule } from '@frame-ui-ng/components/sidebar';
import { FrTableModule } from '@frame-ui-ng/components/table';
import { FrTooltipDirective } from '@frame-ui-ng/components/tooltip';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  tablerArrowDown,
  tablerArrowUp,
  tablerBell,
  tablerCalendar,
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
} from '@ng-icons/tabler-icons';
import { startWith, Subject, switchMap } from 'rxjs';
import { ReleaseDetailsComponent } from './components/release-details/release-details';
import {
  DeployopsApiService,
  DeployopsDashboardData,
  Release,
} from './deployops-api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FrAvatarModule,
    FrBadgeModule,
    FrButtonModule,
    FrCardModule,
    FrCheckboxModule,
    FrDropdownMenuModule,
    FrFieldModule,
    FrInputModule,
    FrSidebarModule,
    FrTableModule,
    FrSelectModule,
    NgIcon,
    ReactiveFormsModule,
    ReleaseDetailsComponent,
    FrTooltipDirective,
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
    }),
  ],
})
export class App implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly api = inject(DeployopsApiService);

  readonly displayedColumns = [
    'select',
    'release',
    'service',
    'environment',
    'status',
    'progress',
    'team',
    'updatedAt',
    'actions',
  ];
  readonly navItems = [
    { label: 'Dashboard', icon: 'tablerProgressCheck', active: true },
    { label: 'Deployments', icon: 'tablerPackages', active: false },
    { label: 'Environments', icon: 'tablerServer', active: false },
    { label: 'Services', icon: 'tablerServer', active: false },
    { label: 'Insights', icon: 'tablerChartDots', active: false },
    { label: 'Alerts', icon: 'tablerBell', active: false },
    { label: 'Approvals', icon: 'tablerCheckbox', active: false },
    { label: 'Settings', icon: 'tablerSettings', active: false },
  ];

  readonly data = signal<DeployopsDashboardData | null>(null);
  readonly selectedRelease = signal<Release | null>(null);

  readonly refresh$ = new Subject<void>();

  deploymentControl = new FormControl<string | null>({ value: 'production', disabled: true });

  ngOnInit(): void {
    this.refresh$
      .asObservable()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        startWith(true),
        switchMap(() => this.api.getDashboard()),
      )
      .subscribe({
        next: (data) => {
          this.data.set(data);
        },
      });
  }

  releaseBadge(release: Release): 'success' | 'secondary' | 'destructive' {
    if (release.status === 'blocked') {
      return 'destructive';
    }

    return release.status === 'healthy' ? 'success' : 'secondary';
  }

  statusLabel(release: Release): string {
    const labels: Record<Release['status'], string> = {
      blocked: 'Blocked',
      deploying: 'Deploying',
      healthy: 'Healthy',
      'in-queue': 'In Queue',
    };

    return labels[release.status];
  }

  visibleTeam(release: Release): string[] {
    return (release.team ?? []).slice(0, 3);
  }

  hiddenTeamCount(release: Release): number {
    return Math.max(0, (release.team ?? []).length - 3);
  }

  openReleaseDetails(release: Release): void {
    this.selectedRelease.set(release);
  }

  closeReleaseDetails(): void {
    this.selectedRelease.set(null);
  }

  refreshData(): void {
    this.refresh$.next();
  }
}
