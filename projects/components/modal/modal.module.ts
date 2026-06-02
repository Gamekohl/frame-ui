import { NgModule } from '@angular/core';
import {
  FrModalBody,
  FrModalClose,
  FrModalContent,
  FrModalDescription,
  FrModalFooter,
  FrModalHeader,
  FrModalPanel,
  FrModalShell,
  FrModalTitle,
  FrModalTrigger,
} from './src/modal';

@NgModule({
  imports: [
    FrModalBody,
    FrModalClose,
    FrModalContent,
    FrModalDescription,
    FrModalFooter,
    FrModalHeader,
    FrModalPanel,
    FrModalShell,
    FrModalTitle,
    FrModalTrigger,
  ],
  exports: [
    FrModalBody,
    FrModalClose,
    FrModalContent,
    FrModalDescription,
    FrModalFooter,
    FrModalHeader,
    FrModalPanel,
    FrModalShell,
    FrModalTitle,
    FrModalTrigger,
  ],
})
export class FrModalModule {}
