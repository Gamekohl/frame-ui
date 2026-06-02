import { NgModule } from '@angular/core';

import { FrTabs, FrTabsContent, FrTabsList, FrTabsTrigger } from './src/tabs';

@NgModule({
  imports: [FrTabs, FrTabsContent, FrTabsList, FrTabsTrigger],
  exports: [FrTabs, FrTabsContent, FrTabsList, FrTabsTrigger],
})
export class FrTabsModule {}
