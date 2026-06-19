import { NgModule } from '@angular/core';
import {
  FrDrag,
  FrDragDropGroup,
  FrDragHandle,
  FrDragPlaceholder,
  FrDragPreview,
  FrDropList,
} from './src/drag-drop';

@NgModule({
  imports: [
    FrDrag,
    FrDragDropGroup,
    FrDragHandle,
    FrDragPlaceholder,
    FrDragPreview,
    FrDropList,
  ],
  exports: [
    FrDrag,
    FrDragDropGroup,
    FrDragHandle,
    FrDragPlaceholder,
    FrDragPreview,
    FrDropList,
  ],
})
export class FrDragDropModule {}
