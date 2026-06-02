import { NgModule } from '@angular/core';
import {
  FrCollapsible,
  FrCollapsibleContent,
  FrCollapsibleTrigger,
} from './src/collapsible';

@NgModule({
  imports: [
    FrCollapsible,
    FrCollapsibleContent,
    FrCollapsibleTrigger,
  ],
  exports: [
    FrCollapsible,
    FrCollapsibleContent,
    FrCollapsibleTrigger,
  ],
})
export class FrCollapsibleModule {}
