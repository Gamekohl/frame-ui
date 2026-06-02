import { NgModule } from '@angular/core';
import {
  FrButton,
  FrButtonIcon,
  FrButtonLabel,
  FrButtonLoading,
  FrIconButton,
} from './src/button';

@NgModule({
  imports: [
    FrButton,
    FrButtonIcon,
    FrButtonLabel,
    FrButtonLoading,
    FrIconButton,
  ],
  exports: [
    FrButton,
    FrButtonIcon,
    FrButtonLabel,
    FrButtonLoading,
    FrIconButton,
  ],
})
export class FrButtonModule {}
