import { NgModule } from '@angular/core';
import {
  FrAccordion,
  FrAccordionContent,
  FrAccordionIcon,
  FrAccordionItem,
  FrAccordionTrigger,
} from './src/accordion';

@NgModule({
  imports: [
    FrAccordion,
    FrAccordionContent,
    FrAccordionIcon,
    FrAccordionItem,
    FrAccordionTrigger,
  ],
  exports: [
    FrAccordion,
    FrAccordionContent,
    FrAccordionIcon,
    FrAccordionItem,
    FrAccordionTrigger,
  ],
})
export class FrAccordionModule {}
