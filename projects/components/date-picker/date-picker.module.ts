import { NgModule } from '@angular/core';
import {
  FrDatePicker,
} from './src/date-picker';

@NgModule({
  imports: [
    FrDatePicker,
  ],
  exports: [
    FrDatePicker,
  ],
})
export class FrDatePickerModule {}
