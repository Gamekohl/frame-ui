import { NgModule } from '@angular/core';
import {
  FrCarousel,
  FrCarouselContent,
  FrCarouselItem,
  FrCarouselNext,
  FrCarouselPrevious,
} from './src/carousel';

@NgModule({
  imports: [
    FrCarousel,
    FrCarouselContent,
    FrCarouselItem,
    FrCarouselNext,
    FrCarouselPrevious,
  ],
  exports: [
    FrCarousel,
    FrCarouselContent,
    FrCarouselItem,
    FrCarouselNext,
    FrCarouselPrevious,
  ],
})
export class FrCarouselModule {}
