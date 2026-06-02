import { NgModule } from '@angular/core';
import {
  FrEmpty,
  FrEmptyContent,
  FrEmptyDescription,
  FrEmptyHeader,
  FrEmptyMedia,
  FrEmptyTitle,
} from './src/empty';

@NgModule({
  imports: [
    FrEmpty,
    FrEmptyContent,
    FrEmptyDescription,
    FrEmptyHeader,
    FrEmptyMedia,
    FrEmptyTitle,
  ],
  exports: [
    FrEmpty,
    FrEmptyContent,
    FrEmptyDescription,
    FrEmptyHeader,
    FrEmptyMedia,
    FrEmptyTitle,
  ],
})
export class FrEmptyModule {}
