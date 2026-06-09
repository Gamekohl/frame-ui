import { NgModule } from '@angular/core';
import {
  FrBadge,
  FrBadgeIcon,
  FrBadgeLabel,
  FrBadgeSpinner,
} from './src/badge';
import { FrSpinner } from '@frame-ui-ng/components/spinner';

@NgModule({
  imports: [
    FrBadge,
    FrBadgeIcon,
    FrBadgeLabel,
    FrBadgeSpinner,
    FrSpinner,
  ],
  exports: [
    FrBadge,
    FrBadgeIcon,
    FrBadgeLabel,
    FrBadgeSpinner,
  ],
})
export class FrBadgeModule {}
