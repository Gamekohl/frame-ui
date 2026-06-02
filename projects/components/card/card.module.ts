import { NgModule } from '@angular/core';
import {
  FrCard,
  FrCardAction,
  FrCardContent,
  FrCardDescription,
  FrCardFooter,
  FrCardHeader,
  FrCardTitle,
} from './src/card';

@NgModule({
  imports: [
    FrCard,
    FrCardAction,
    FrCardContent,
    FrCardDescription,
    FrCardFooter,
    FrCardHeader,
    FrCardTitle,
  ],
  exports: [
    FrCard,
    FrCardAction,
    FrCardContent,
    FrCardDescription,
    FrCardFooter,
    FrCardHeader,
    FrCardTitle,
  ],
})
export class FrCardModule {}
