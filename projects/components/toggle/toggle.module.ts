import { NgModule } from '@angular/core';

import { FrToggle, FrToggleIcon, FrToggleLabel } from './src/toggle';

@NgModule({
  imports: [FrToggle, FrToggleIcon, FrToggleLabel],
  exports: [FrToggle, FrToggleIcon, FrToggleLabel],
})
export class FrToggleModule {}
