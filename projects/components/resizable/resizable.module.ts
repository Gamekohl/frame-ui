import { NgModule } from '@angular/core';
import {
  FrResizableHandle,
  FrResizablePanel,
  FrResizablePanelGroup,
} from './src/resizable';

@NgModule({
  imports: [
    FrResizableHandle,
    FrResizablePanel,
    FrResizablePanelGroup,
  ],
  exports: [
    FrResizableHandle,
    FrResizablePanel,
    FrResizablePanelGroup,
  ],
})
export class FrResizableModule {}
