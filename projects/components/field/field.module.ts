import { NgModule } from '@angular/core';
import {
  FrField,
  FrFieldContent,
  FrFieldDescription,
  FrFieldError,
  FrFieldGroup,
  FrFieldLabel,
  FrFieldLegend,
  FrFieldSeparator,
  FrFieldSet,
} from './src/field';

@NgModule({
  imports: [
    FrField,
    FrFieldContent,
    FrFieldDescription,
    FrFieldError,
    FrFieldGroup,
    FrFieldLabel,
    FrFieldLegend,
    FrFieldSeparator,
    FrFieldSet,
  ],
  exports: [
    FrField,
    FrFieldContent,
    FrFieldDescription,
    FrFieldError,
    FrFieldGroup,
    FrFieldLabel,
    FrFieldLegend,
    FrFieldSeparator,
    FrFieldSet,
  ],
})
export class FrFieldModule {}
