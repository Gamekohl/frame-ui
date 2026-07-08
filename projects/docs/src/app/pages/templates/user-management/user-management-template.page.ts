import { SelectionModel } from '@angular/cdk/collections';
import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FrAvatarModule } from '@frame-ui-ng/components/avatar';
import { FrBadgeModule } from '@frame-ui-ng/components/badge';
import { FrBreadcrumbModule } from '@frame-ui-ng/components/breadcrumb';
import { FrButtonModule } from '@frame-ui-ng/components/button';
import { FrCheckboxModule } from '@frame-ui-ng/components/checkbox';
import { type CdkDragDrop, FrDragDropModule } from '@frame-ui-ng/components/drag-drop';
import { FrDropdownMenuModule } from '@frame-ui-ng/components/dropdown-menu';
import { FrHoverCardModule } from '@frame-ui-ng/components/hover-card';
import { FrInputModule } from '@frame-ui-ng/components/input';
import { FrModalService } from '@frame-ui-ng/components/modal';
import { FrPaginationModule } from '@frame-ui-ng/components/pagination';
import { FrSidebarModule } from '@frame-ui-ng/components/sidebar';
import { FrTableModule } from '@frame-ui-ng/components/table';
import { FrTabsModule } from '@frame-ui-ng/components/tabs';
import { FrTooltipModule } from '@frame-ui-ng/components/tooltip';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  tablerActivity,
  tablerAdjustmentsHorizontal,
  tablerBell,
  tablerBrandGithub,
  tablerBuildingStore,
  tablerChevronDown,
  tablerCircleCheck,
  tablerDatabase,
  tablerDots,
  tablerEdit,
  tablerFileText,
  tablerHome,
  tablerKey,
  tablerLayoutBoard,
  tablerLayoutList,
  tablerLayoutSidebar,
  tablerListDetails,
  tablerMail,
  tablerSearch,
  tablerSettings,
  tablerShield,
  tablerShieldLock,
  tablerTrash,
  tablerUserPlus,
  tablerUsers,
  tablerX,
} from '@ng-icons/tabler-icons';

import { UserDetailsModalComponent } from './user-details-modal.component';
import {
  ADMIN_NAV,
  MAIN_NAV,
  ROLE_OPTIONS,
  STATUS_DROP_LIST_STATUSES,
  STATUS_OPTIONS,
  TEMPLATE_USERS,
  USER_COLUMNS,
  type TemplateUser,
  type UserStatus,
  type ViewMode,
} from './user-management-template.data';

@Component({
  selector: 'docs-user-management-template-page',
  imports: [
    FrAvatarModule,
    FrBadgeModule,
    FrBreadcrumbModule,
    FrButtonModule,
    FrCheckboxModule,
    FrDropdownMenuModule,
    FrHoverCardModule,
    FrInputModule,
    FrPaginationModule,
    FrSidebarModule,
    FrTableModule,
    FrTabsModule,
    FrTooltipModule,
    FrDragDropModule,
    RouterLink,
    NgClass,
    NgIcon,
  ],
  templateUrl: './user-management-template.page.html',
  styleUrl: './user-management-template.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    provideIcons({
      tablerActivity,
      tablerAdjustmentsHorizontal,
      tablerBell,
      tablerBrandGithub,
      tablerBuildingStore,
      tablerChevronDown,
      tablerCircleCheck,
      tablerDatabase,
      tablerDots,
      tablerEdit,
      tablerFileText,
      tablerHome,
      tablerKey,
      tablerLayoutBoard,
      tablerLayoutList,
      tablerLayoutSidebar,
      tablerListDetails,
      tablerSearch,
      tablerSettings,
      tablerShield,
      tablerShieldLock,
      tablerTrash,
      tablerUserPlus,
      tablerUsers,
      tablerX,
      tablerMail,
    }),
  ],
})
export class UserManagementTemplatePage {
  private readonly modal = inject(FrModalService);

  protected readonly viewMode = signal<ViewMode>('table');
  protected readonly searchTerm = signal('');
  protected readonly roleFilter = signal('All roles');
  protected readonly statusFilter = signal('All status');
  protected readonly selection = new SelectionModel<number>(true);

  protected readonly roleOptions = ROLE_OPTIONS;
  protected readonly statusOptions = STATUS_OPTIONS;
  protected readonly statusDropListIds = STATUS_DROP_LIST_STATUSES.map((status) =>
    this.dropListId(status),
  );
  protected readonly userColumns = USER_COLUMNS;
  protected readonly mainNav = MAIN_NAV;
  protected readonly adminNav = ADMIN_NAV;
  protected readonly users = signal<TemplateUser[]>(TEMPLATE_USERS);
  protected readonly selectedUser = signal<TemplateUser>(this.users()[12]);

  protected readonly filteredUsers = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    const role = this.roleFilter();
    const status = this.statusFilter();

    return this.users().filter((user) => {
      const matchesTerm =
        term.length === 0 ||
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term) ||
        user.team.toLowerCase().includes(term);
      const matchesRole = role === 'All roles' || user.role === role;
      const matchesStatus = status === 'All status' || user.status === status;

      return matchesTerm && matchesRole && matchesStatus;
    });
  });

  protected readonly metrics = computed(() => [
    { label: 'Active', value: this.users().filter((user) => user.status === 'Active').length },
    { label: 'Inactive', value: this.users().filter((user) => user.status === 'Inactive').length },
    {
      label: '2FA',
      value: `${Math.round((this.users().filter((user) => user.twoFactor).length / this.users().length) * 100)}%`,
    },
  ]);

  protected readonly statusGroups = computed(() =>
    STATUS_DROP_LIST_STATUSES.map((status) => ({
      status,
      users: this.filteredUsers().filter((user) => user.status === status),
    })),
  );

  protected allVisibleSelected(): boolean {
    const visibleIds = this.filteredUsers().map((user) => user.id);

    return visibleIds.length > 0 && visibleIds.every((id) => this.selection.isSelected(id));
  }

  protected headerSelectionIndeterminate(): boolean {
    return this.selection.hasValue() && !this.allVisibleSelected();
  }

  protected dropListId(status: string): string {
    return `user-status-${status.toLowerCase()}`;
  }

  protected dropUser(
    event: CdkDragDrop<TemplateUser[], TemplateUser[], TemplateUser>,
    status: UserStatus,
  ): void {
    const user = event.item.data;

    if (user.status === status) {
      return;
    }

    const updatedUser = { ...user, status };

    this.users.update((users) =>
      users.map((entry) => (entry.id === user.id ? updatedUser : entry)),
    );

    if (this.selectedUser().id === user.id) {
      this.selectedUser.set(updatedUser);
    }
  }

  protected setViewMode(value: string | null): void {
    if (value === 'table' || value === 'board' || value === 'list') {
      this.viewMode.set(value);
    }
  }

  protected setSearch(event: Event): void {
    const input = event.target as HTMLInputElement | null;
    this.searchTerm.set(input?.value ?? '');
  }

  protected resetFilters(): void {
    this.searchTerm.set('');
    this.roleFilter.set('All roles');
    this.statusFilter.set('All status');
  }

  protected selectUser(user: TemplateUser): void {
    this.selectedUser.set(user);
  }

  protected openUserDetails(user: TemplateUser): void {
    this.selectedUser.set(user);
    this.modal.open(UserDetailsModalComponent, {
      ariaLabel: `${user.name} details`,
      data: user,
    });
  }

  protected toggleAllVisible(): void {
    const visibleIds = this.filteredUsers().map((user) => user.id);

    if (this.allVisibleSelected()) {
      visibleIds.forEach((id) => this.selection.deselect(id));
      return;
    }

    visibleIds.forEach((id) => this.selection.select(id));
  }

  protected statusVariant(status: UserStatus): 'destructive' | 'secondary' | 'success' {
    if (status === 'Active') {
      return 'success';
    }

    if (status === 'Inactive') {
      return 'destructive';
    }

    return 'secondary';
  }
}
