import { NgModule } from '@angular/core';
import {
  FrPopover,
  FrPopoverBody,
  FrPopoverClose,
  FrPopoverContent,
  FrPopoverDescription,
  FrPopoverFooter,
  FrPopoverHeader,
  FrPopoverPanel,
  FrPopoverTitle,
  FrPopoverTrigger,
} from './src/popover';

@NgModule({
  imports: [
    FrPopover,
    FrPopoverBody,
    FrPopoverClose,
    FrPopoverContent,
    FrPopoverDescription,
    FrPopoverFooter,
    FrPopoverHeader,
    FrPopoverPanel,
    FrPopoverTitle,
    FrPopoverTrigger,
  ],
  exports: [
    FrPopover,
    FrPopoverBody,
    FrPopoverClose,
    FrPopoverContent,
    FrPopoverDescription,
    FrPopoverFooter,
    FrPopoverHeader,
    FrPopoverPanel,
    FrPopoverTitle,
    FrPopoverTrigger,
  ],
})
export class FrPopoverModule {}
