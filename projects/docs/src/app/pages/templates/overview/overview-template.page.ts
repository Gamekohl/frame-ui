import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FrAlertModule } from '@frame-ui-ng/components/alert';
import { FrAvatarModule } from '@frame-ui-ng/components/avatar';
import { FrBadgeModule } from '@frame-ui-ng/components/badge';
import { FrBreadcrumbModule } from '@frame-ui-ng/components/breadcrumb';
import { FrButtonModule } from '@frame-ui-ng/components/button';
import { FrProgressModule } from '@frame-ui-ng/components/progress';
import { FrSidebarModule } from '@frame-ui-ng/components/sidebar';
import { FrToastModule, FrToastService } from '@frame-ui-ng/components/toast';
import { FrTooltipModule } from '@frame-ui-ng/components/tooltip';
import { FrChart, type FrChartSeries } from '@frame-ui-ng/charts';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  tablerActivity,
  tablerAlertTriangle,
  tablerArrowRight,
  tablerBell,
  tablerBrandGithub,
  tablerBuildingStore,
  tablerChartBar,
  tablerCircleCheck,
  tablerDatabase,
  tablerFileText,
  tablerHome,
  tablerLayoutBoard,
  tablerLayoutSidebar,
  tablerPackage,
  tablerSettings,
  tablerShieldLock,
  tablerTruckDelivery,
  tablerUsers,
  tablerX,
} from '@ng-icons/tabler-icons';

import { CommerceAdminAuditStore } from '../shared/commerce-admin-audit.store';
import {
  INITIAL_OVERVIEW_TASKS,
  MAIN_NAV,
  ADMIN_NAV,
  ORDER_VOLUME,
  type OverviewTask,
} from './overview-template.data';

@Component({
  selector: 'docs-overview-template-page',
  imports: [
    FrAlertModule,
    FrAvatarModule,
    FrBadgeModule,
    FrBreadcrumbModule,
    FrButtonModule,
    FrChart,
    FrProgressModule,
    FrSidebarModule,
    FrToastModule,
    FrTooltipModule,
    NgIcon,
    RouterLink,
  ],
  templateUrl: './overview-template.page.html',
  styleUrl: './overview-template.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    provideIcons({
      tablerActivity,
      tablerAlertTriangle,
      tablerArrowRight,
      tablerBell,
      tablerBrandGithub,
      tablerBuildingStore,
      tablerChartBar,
      tablerCircleCheck,
      tablerDatabase,
      tablerFileText,
      tablerHome,
      tablerLayoutBoard,
      tablerLayoutSidebar,
      tablerPackage,
      tablerSettings,
      tablerShieldLock,
      tablerTruckDelivery,
      tablerUsers,
      tablerX,
    }),
  ],
})
export class OverviewTemplatePage {
  private readonly toast = inject(FrToastService);
  private readonly audit = inject(CommerceAdminAuditStore);

  protected readonly toastCloseIcon = tablerX;
  protected readonly mainNav = MAIN_NAV;
  protected readonly adminNav = ADMIN_NAV;
  protected readonly orderVolume = ORDER_VOLUME;
  protected readonly orderSeries: readonly FrChartSeries[] = [{ key: 'orders', label: 'Orders' }];
  protected readonly tasks = signal<OverviewTask[]>([...INITIAL_OVERVIEW_TASKS]);
  protected readonly reviewedTaskIds = signal<Set<string>>(new Set());
  protected readonly openTasks = computed(() =>
    this.tasks().filter((task) => !this.reviewedTaskIds().has(task.id)),
  );
  protected readonly recentActivity = computed(() => this.audit.events().slice(0, 5));
  protected readonly metrics = computed(() => [
    { label: 'Orders to process', value: 4, detail: '1 payment exception' },
    { label: 'Units inbound', value: 198, detail: 'Across 3 open POs' },
    { label: 'Catalog alerts', value: 2, detail: 'Stock or publishing' },
    { label: 'Fulfillment SLA', value: '94%', detail: 'Target 96%' },
  ]);

  protected markReviewed(task: OverviewTask): void {
    this.reviewedTaskIds.update((ids) => new Set([...ids, task.id]));
    this.toast.success(`${task.title} marked as reviewed.`);
  }

  protected severityVariant(
    severity: OverviewTask['severity'],
  ): 'destructive' | 'outline' | 'secondary' {
    if (severity === 'Critical') {
      return 'destructive';
    }

    if (severity === 'Attention') {
      return 'outline';
    }

    return 'secondary';
  }

  protected eventVariant(outcome: string): 'destructive' | 'secondary' | 'success' {
    if (outcome === 'Success') {
      return 'success';
    }

    if (outcome === 'Blocked') {
      return 'destructive';
    }

    return 'secondary';
  }
}
