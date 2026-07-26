import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FrAccordionModule } from '@frame-ui-ng/components/accordion';
import { FrAlertModule } from '@frame-ui-ng/components/alert';
import { FrAvatarModule } from '@frame-ui-ng/components/avatar';
import { FrBreadcrumbModule } from '@frame-ui-ng/components/breadcrumb';
import { FrButtonModule } from '@frame-ui-ng/components/button';
import { FrCheckboxModule } from '@frame-ui-ng/components/checkbox';
import { FrCollapsibleModule } from '@frame-ui-ng/components/collapsible';
import { FrComboboxModule } from '@frame-ui-ng/components/combobox';
import { FrDropdownMenuModule } from '@frame-ui-ng/components/dropdown-menu';
import { FrInputModule } from '@frame-ui-ng/components/input';
import { FrPopoverModule } from '@frame-ui-ng/components/popover';
import { FrSidebarModule } from '@frame-ui-ng/components/sidebar';
import { FrTabsModule } from '@frame-ui-ng/components/tabs';
import { FrTextareaModule } from '@frame-ui-ng/components/textarea';
import { FrTooltipModule } from '@frame-ui-ng/components/tooltip';
import { FrToastModule, FrToastService } from '@frame-ui-ng/components/toast';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  tablerActivity,
  tablerAt,
  tablerBell,
  tablerBrandGithub,
  tablerBuildingStore,
  tablerCalendar,
  tablerChevronDown,
  tablerCircleCheck,
  tablerCreditCard,
  tablerDatabase,
  tablerEyeOff,
  tablerFileText,
  tablerHash,
  tablerHome,
  tablerInfoCircle,
  tablerKey,
  tablerLayoutBoard,
  tablerLayoutSidebar,
  tablerLock,
  tablerMail,
  tablerSettings,
  tablerShield,
  tablerShieldLock,
  tablerTrash,
  tablerUser,
  tablerUserCircle,
  tablerUsers,
  tablerWorld,
  tablerX,
} from '@ng-icons/tabler-icons';

import { CommerceAdminAuditStore } from '../shared/commerce-admin-audit.store';
import {
  ADMIN_NAV,
  MAIN_NAV,
  NOTIFICATION_GROUPS,
  PLAN_OPTIONS,
  SETTINGS_SECTIONS,
  TEAM_MEMBERS,
  TEAM_ROLES,
  TeamMember,
} from './settings-template.data';

@Component({
  selector: 'docs-settings-template-page',
  imports: [
    FrAccordionModule,
    FrAlertModule,
    FrAvatarModule,
    FrBreadcrumbModule,
    FrButtonModule,
    FrCheckboxModule,
    FrCollapsibleModule,
    FrComboboxModule,
    FrDropdownMenuModule,
    FrInputModule,
    FrPopoverModule,
    FrSidebarModule,
    FrTabsModule,
    FrTextareaModule,
    FrTooltipModule,
    FrToastModule,
    RouterLink,
    NgClass,
    NgIcon,
  ],
  templateUrl: './settings-template.page.html',
  styleUrl: './settings-template.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    provideIcons({
      tablerActivity,
      tablerBell,
      tablerBrandGithub,
      tablerBuildingStore,
      tablerCalendar,
      tablerChevronDown,
      tablerCircleCheck,
      tablerCreditCard,
      tablerDatabase,
      tablerEyeOff,
      tablerFileText,
      tablerHash,
      tablerHome,
      tablerInfoCircle,
      tablerKey,
      tablerLayoutBoard,
      tablerLayoutSidebar,
      tablerLock,
      tablerMail,
      tablerSettings,
      tablerShield,
      tablerShieldLock,
      tablerTrash,
      tablerUser,
      tablerUserCircle,
      tablerUsers,
      tablerWorld,
      tablerX,
      tablerAt,
    }),
  ],
})
export class SettingsTemplatePage {
  private readonly toast = inject(FrToastService);
  private readonly audit = inject(CommerceAdminAuditStore);

  protected readonly mainNav = MAIN_NAV;
  protected readonly adminNav = ADMIN_NAV;
  protected readonly sections = SETTINGS_SECTIONS;
  protected readonly plans = PLAN_OPTIONS;
  protected readonly roles = TEAM_ROLES;
  protected readonly activeSection = signal('account');
  protected readonly notificationGroups = signal(NOTIFICATION_GROUPS);
  protected readonly selectedPlan = signal('operations');
  protected readonly teamMembers = signal(TEAM_MEMBERS);

  protected accountCountry = signal('Germany');
  protected accountLanguage = signal('English');
  protected billingCountry = signal('Germany');

  protected selectSection(sectionId: string | null): void {
    if (sectionId) {
      this.activeSection.set(sectionId);
    }
  }

  protected selectPlan(planId: string): void {
    this.selectedPlan.set(planId);
  }

  protected toggleNotification(groupId: string, settingId: string): void {
    this.notificationGroups.update((groups) =>
      groups.map((group) =>
        group.id === groupId
          ? {
              ...group,
              settings: group.settings.map((setting) =>
                setting.id === settingId ? { ...setting, enabled: !setting.enabled } : setting,
              ),
            }
          : group,
      ),
    );
  }

  protected setTeamRole(memberId: string, role: TeamMember['role']): void {
    this.teamMembers.update((members) =>
      members.map((member) => (member.id === memberId ? { ...member, role } : member)),
    );
  }

  protected removeTeamMember(memberId: string): void {
    this.teamMembers.update((members) => members.filter((member) => member.id !== memberId));
  }

  protected saveSettings(): void {
    this.toast.success('Settings saved', {
      description: 'Your store settings have been updated.',
    });
    this.audit.record({
      actor: 'Mika Stone',
      initials: 'MS',
      action: 'Saved store settings',
      target:
        this.sections.find((section) => section.id === this.activeSection())?.label ?? 'Settings',
      area: 'Settings',
      outcome: 'Success',
      summary: 'The current store settings section was saved.',
      source: 'Settings workspace',
      ipAddress: 'Current session',
      changes: [],
    });
  }
}
