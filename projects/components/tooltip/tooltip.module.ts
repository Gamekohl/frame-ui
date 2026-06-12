import { NgModule } from '@angular/core';

import { FrTooltipDirective, FrTooltipShortcut } from './src/tooltip.directive';

@NgModule({
  imports: [FrTooltipDirective, FrTooltipShortcut],
  exports: [FrTooltipDirective, FrTooltipShortcut],
})
export class FrTooltipModule {}
