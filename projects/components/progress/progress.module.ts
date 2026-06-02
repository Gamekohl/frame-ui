import { NgModule } from '@angular/core';
import {
  FrProgress,
  FrProgressIndicator,
} from './src/progress';

@NgModule({
  imports: [
    FrProgress,
    FrProgressIndicator,
  ],
  exports: [
    FrProgress,
    FrProgressIndicator,
  ],
})
export class FrProgressModule {}
