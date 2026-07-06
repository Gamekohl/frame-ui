import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FrAvatarModule } from '@frame-ui-ng/components/avatar';
import { FrBadgeModule } from '@frame-ui-ng/components/badge';
import { FrBreadcrumbModule } from '@frame-ui-ng/components/breadcrumb';
import { FrButtonModule } from '@frame-ui-ng/components/button';
import { FrCheckboxModule } from '@frame-ui-ng/components/checkbox';
import { FrDropdownMenuModule } from '@frame-ui-ng/components/dropdown-menu';
import { FrInputModule } from '@frame-ui-ng/components/input';
import { FrModalService } from '@frame-ui-ng/components/modal';
import { FrPaginationModule } from '@frame-ui-ng/components/pagination';
import { FrProgressModule } from '@frame-ui-ng/components/progress';
import { FrSidebarModule } from '@frame-ui-ng/components/sidebar';
import { FrTableModule } from '@frame-ui-ng/components/table';
import { FrTabsModule } from '@frame-ui-ng/components/tabs';
import { FrTooltipDirective } from '@frame-ui-ng/components/tooltip';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  tablerActivity,
  tablerAdjustmentsHorizontal,
  tablerBell,
  tablerBrandGithub,
  tablerBuildingStore,
  tablerCheck,
  tablerChevronDown,
  tablerCircleCheck,
  tablerDatabase,
  tablerDots,
  tablerEdit,
  tablerFileText,
  tablerHome,
  tablerKey,
  tablerLayoutBoard,
  tablerLayoutSidebar,
  tablerLock,
  tablerMail,
  tablerSearch,
  tablerSettings,
  tablerShield,
  tablerShieldCheck,
  tablerShieldLock,
  tablerUserCog,
  tablerUserPlus,
  tablerUsers,
  tablerX,
} from '@ng-icons/tabler-icons';

import { RolesPermissionsMatrixModalComponent } from './roles-permissions-matrix-modal.component';
import {
  ADMIN_ACCOUNTS,
  ADMIN_NAV,
  MAIN_NAV,
  PERMISSION_GROUPS,
  ROLES,
  type AccessStatus,
  type AdminAccount,
  type RoleKey,
  type RoleSummary,
} from './roles-permissions-template.data';

@Component({
  selector: 'docs-roles-permissions-template-page',
  imports: [
    FrAvatarModule,
    FrBadgeModule,
    FrBreadcrumbModule,
    FrButtonModule,
    FrCheckboxModule,
    FrDropdownMenuModule,
    FrInputModule,
    FrPaginationModule,
    FrProgressModule,
    FrSidebarModule,
    FrTableModule,
    FrTabsModule,
    RouterLink,
    NgClass,
    NgIcon,
    FrTooltipDirective,
  ],
  templateUrl: './roles-permissions-template.page.html',
  styleUrl: './roles-permissions-template.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    provideIcons({
      tablerActivity,
      tablerAdjustmentsHorizontal,
      tablerBell,
      tablerBrandGithub,
      tablerBuildingStore,
      tablerCheck,
      tablerChevronDown,
      tablerCircleCheck,
      tablerDatabase,
      tablerDots,
      tablerEdit,
      tablerFileText,
      tablerHome,
      tablerKey,
      tablerLayoutBoard,
      tablerLayoutSidebar,
      tablerLock,
      tablerMail,
      tablerSearch,
      tablerSettings,
      tablerShield,
      tablerShieldCheck,
      tablerShieldLock,
      tablerUserCog,
      tablerUserPlus,
      tablerUsers,
      tablerX,
    }),
  ],
})
export class RolesPermissionsTemplatePage {
  private readonly modal = inject(FrModalService);

  protected readonly permissionGroups = PERMISSION_GROUPS;
  protected readonly mainNav = MAIN_NAV;
  protected readonly adminNav = ADMIN_NAV;
  protected readonly accountColumns = [
    'account',
    'role',
    'access',
    'status',
    'lastReview',
    'actions',
  ];
  protected readonly statusOptions = ['All status', 'Enabled', 'Review', 'Disabled'];

  protected readonly selectedRoleKey = signal<RoleKey>('admin');
  protected readonly searchTerm = signal('');
  protected readonly statusFilter = signal('All status');
  protected readonly roles = signal<RoleSummary[]>(ROLES);
  protected readonly accounts = signal<AdminAccount[]>(ADMIN_ACCOUNTS);

  protected readonly selectedRole = computed(
    () => this.roleByKey(this.selectedRoleKey()) ?? this.roles()[0],
  );

  protected readonly filteredAccounts = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    const status = this.statusFilter();

    return this.accounts().filter((account) => {
      const roleName = this.roleName(account.role).toLowerCase();
      const matchesTerm =
        term.length === 0 ||
        account.name.toLowerCase().includes(term) ||
        account.email.toLowerCase().includes(term) ||
        roleName.includes(term);
      const matchesStatus = status === 'All status' || account.status === status;

      return matchesTerm && matchesStatus;
    });
  });

  protected readonly reviewCount = computed(
    () => this.accounts().filter((account) => account.status === 'Review').length,
  );

  protected setSearch(event: Event): void {
    const input = event.target as HTMLInputElement | null;
    this.searchTerm.set(input?.value ?? '');
  }

  protected selectRole(role: RoleSummary): void {
    this.selectedRoleKey.set(role.key);
  }

  protected manageRole(event: Event, role: RoleSummary): void {
    event.stopPropagation();
    this.selectedRoleKey.set(role.key);
    this.openPermissionMatrix();
  }

  protected showRoleMembers(event: Event, role: RoleSummary): void {
    event.stopPropagation();
    this.selectedRoleKey.set(role.key);
  }

  protected openPermissionMatrix(): void {
    this.modal.open(
      RolesPermissionsMatrixModalComponent,
      {
        permissionGroups: this.permissionGroups,
        selectedRole: () => this.selectedRole(),
        permissionEnabled: (permissionId: string) =>
          this.permissionEnabled(this.selectedRole(), permissionId),
        togglePermission: (permissionId: string) =>
          this.togglePermission(this.selectedRole(), permissionId),
      },
      {
        ariaLabel: `${this.selectedRole().name} permissions`,
        width: 'min(42rem, calc(100vw - 2rem))',
        height: '42rem',
      },
    );
  }

  protected togglePermission(role: RoleSummary, permissionId: string): void {
    if (role.locked) {
      return;
    }

    const nextValue = !role.permissions[permissionId];

    this.roles.update((roles) =>
      roles.map((entry) =>
        entry.key === role.key
          ? {
              ...entry,
              permissions: {
                ...entry.permissions,
                [permissionId]: nextValue,
              },
            }
          : entry,
      ),
    );
  }

  protected resetFilters(): void {
    this.searchTerm.set('');
    this.statusFilter.set('All status');
  }

  protected roleByKey(roleKey: RoleKey): RoleSummary | undefined {
    return this.roles().find((role) => role.key === roleKey);
  }

  protected roleName(roleKey: RoleKey): string {
    return this.roleByKey(roleKey)?.name ?? roleKey;
  }

  protected roleMembers(roleKey: RoleKey): AdminAccount[] {
    return this.accounts().filter((account) => account.role === roleKey);
  }

  protected permissionEnabled(role: RoleSummary, permissionId: string): boolean {
    return role.permissions[permissionId];
  }

  protected statusVariant(status: AccessStatus): 'destructive' | 'secondary' | 'success' {
    if (status === 'Enabled') {
      return 'success';
    }

    if (status === 'Disabled') {
      return 'destructive';
    }

    return 'secondary';
  }
}
