import { NgModule } from '@angular/core';
import {
  FrAlert,
  FrAlertDescription,
  FrAlertIcon,
  FrAlertTitle,
} from './src/alert';

@NgModule({
  imports: [
    FrAlert,
    FrAlertDescription,
    FrAlertIcon,
    FrAlertTitle,
  ],
  exports: [
    FrAlert,
    FrAlertDescription,
    FrAlertIcon,
    FrAlertTitle,
  ],
})
export class FrAlertModule {}
