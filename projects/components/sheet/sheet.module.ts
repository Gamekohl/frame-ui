import { NgModule } from '@angular/core';
import {
  FrSheetBody,
  FrSheetClose,
  FrSheetContent,
  FrSheetDescription,
  FrSheetFooter,
  FrSheetHeader,
  FrSheetPanel,
  FrSheetShell,
  FrSheetTitle,
  FrSheetTrigger,
} from './src/sheet';

@NgModule({
  imports: [
    FrSheetBody,
    FrSheetClose,
    FrSheetContent,
    FrSheetDescription,
    FrSheetFooter,
    FrSheetHeader,
    FrSheetPanel,
    FrSheetShell,
    FrSheetTitle,
    FrSheetTrigger,
  ],
  exports: [
    FrSheetBody,
    FrSheetClose,
    FrSheetContent,
    FrSheetDescription,
    FrSheetFooter,
    FrSheetHeader,
    FrSheetPanel,
    FrSheetShell,
    FrSheetTitle,
    FrSheetTrigger,
  ],
})
export class FrSheetModule {}
