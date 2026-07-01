import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FrBadgeModule } from '@frame-ui-ng/components/badge';
import { FrButtonModule } from '@frame-ui-ng/components/button';
import { FrCheckboxModule } from '@frame-ui-ng/components/checkbox';
import { FR_MODAL_DATA, FrModalModule } from '@frame-ui-ng/components/modal';
import { FrTabsModule } from '@frame-ui-ng/components/tabs';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { tablerShieldLock } from '@ng-icons/tabler-icons';

import { type PermissionGroup, type RoleSummary } from './roles-permissions-template.data';

export type RolesPermissionsMatrixModalData = {
  permissionGroups: PermissionGroup[];
  selectedRole: () => RoleSummary;
  permissionEnabled: (permissionId: string) => boolean;
  togglePermission: (permissionId: string) => void;
};

@Component({
  selector: 'docs-roles-permissions-matrix-modal',
  imports: [
    FrBadgeModule,
    FrButtonModule,
    FrCheckboxModule,
    FrModalModule,
    FrTabsModule,
    NgIcon
  ],
  templateUrl: './roles-permissions-matrix-modal.component.html',
  styleUrl: './roles-permissions-matrix-modal.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    provideIcons({
      tablerShieldLock,
    }),
  ],
})
export class RolesPermissionsMatrixModalComponent {
  protected readonly data = inject<RolesPermissionsMatrixModalData>(FR_MODAL_DATA);
}
