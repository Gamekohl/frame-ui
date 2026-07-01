import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FrAvatarModule } from '@frame-ui-ng/components/avatar';
import { FrBadgeModule } from '@frame-ui-ng/components/badge';
import { FrButtonModule } from '@frame-ui-ng/components/button';
import { FR_MODAL_DATA, FrModalModule } from '@frame-ui-ng/components/modal';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  tablerActivity,
  tablerBriefcase,
  tablerClock,
  tablerMail,
  tablerUsers,
} from '@ng-icons/tabler-icons';

import { type TemplateUser, type UserStatus } from './user-management-template.data';

@Component({
  selector: 'docs-user-details-modal',
  imports: [FrAvatarModule, FrBadgeModule, FrButtonModule, FrModalModule, NgClass, NgIcon],
  templateUrl: './user-details-modal.component.html',
  styleUrl: './user-details-modal.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    provideIcons({
      tablerActivity,
      tablerBriefcase,
      tablerClock,
      tablerMail,
      tablerUsers,
    }),
  ],
})
export class UserDetailsModalComponent {
  protected readonly user = inject<TemplateUser>(FR_MODAL_DATA);

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
