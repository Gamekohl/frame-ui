import { NgModule } from '@angular/core';

import { FrTooltipContent, FrTooltipPanel, FrTooltipShortcut } from './src/tooltip.content';
import { FrTooltipRoot } from './src/tooltip.root';
import { FrTooltipTrigger } from './src/tooltip.trigger';

@NgModule({
  imports: [FrTooltipRoot, FrTooltipTrigger, FrTooltipContent, FrTooltipPanel, FrTooltipShortcut],
  exports: [FrTooltipRoot, FrTooltipTrigger, FrTooltipContent, FrTooltipPanel, FrTooltipShortcut],
})
export class FrTooltipModule {}
