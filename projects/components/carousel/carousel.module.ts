import { NgModule } from '@angular/core';
import {
  FrCarousel,
  FrCarouselContent,
  FrCarouselControl,
  FrCarouselControls,
  FrCarouselDot,
  FrCarouselDots,
  FrCarouselItem,
  FrCarouselNext,
  FrCarouselPrevious,
  FrCarouselThumb,
  FrCarouselThumbs,
} from './src/carousel';

@NgModule({
  imports: [
    FrCarousel,
    FrCarouselContent,
    FrCarouselControl,
    FrCarouselControls,
    FrCarouselDot,
    FrCarouselDots,
    FrCarouselItem,
    FrCarouselNext,
    FrCarouselPrevious,
    FrCarouselThumb,
    FrCarouselThumbs,
  ],
  exports: [
    FrCarousel,
    FrCarouselContent,
    FrCarouselControl,
    FrCarouselControls,
    FrCarouselDot,
    FrCarouselDots,
    FrCarouselItem,
    FrCarouselNext,
    FrCarouselPrevious,
    FrCarouselThumb,
    FrCarouselThumbs,
  ],
})
export class FrCarouselModule {}
