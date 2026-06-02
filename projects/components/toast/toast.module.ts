import { NgModule } from '@angular/core';
import { FrSpinner } from '@frame-ui/components/spinner';

import { FrToastViewport } from './src/toast';

@NgModule({
  imports: [FrToastViewport, FrSpinner],
  exports: [FrToastViewport],
})
export class FrToastModule {}
