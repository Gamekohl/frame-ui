import { NgModule } from '@angular/core';
import {
  FrCheckbox,
  FrCheckboxField,
  FrCheckboxLabel,
} from './src/checkbox';

@NgModule({
  imports: [
    FrCheckbox,
    FrCheckboxField,
    FrCheckboxLabel,
  ],
  exports: [
    FrCheckbox,
    FrCheckboxField,
    FrCheckboxLabel,
  ],
})
export class FrCheckboxModule {}
