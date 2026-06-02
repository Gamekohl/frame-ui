import { NgModule } from '@angular/core';
import {
  FrCalendar,
} from './src/calendar';

@NgModule({
  imports: [
    FrCalendar,
  ],
  exports: [
    FrCalendar,
  ],
})
export class FrCalendarModule {}
