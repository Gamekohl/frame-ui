import { NgModule } from '@angular/core';
import {
  FrHoverCard,
  FrHoverCardContent,
  FrHoverCardPanel,
  FrHoverCardTrigger,
} from './src/hover-card';

@NgModule({
  imports: [
    FrHoverCard,
    FrHoverCardContent,
    FrHoverCardPanel,
    FrHoverCardTrigger,
  ],
  exports: [
    FrHoverCard,
    FrHoverCardContent,
    FrHoverCardPanel,
    FrHoverCardTrigger,
  ],
})
export class FrHoverCardModule {}
