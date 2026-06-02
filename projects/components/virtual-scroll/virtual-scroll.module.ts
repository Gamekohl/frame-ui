import { NgModule } from '@angular/core';
import {
  FrVirtualContent,
  FrVirtualFor,
  FrVirtualItem,
  FrVirtualItemMeta,
  FrVirtualList,
  FrVirtualPanel,
  FrVirtualViewport,
} from './src/virtual-scroll';

@NgModule({
  imports: [
    FrVirtualContent,
    FrVirtualFor,
    FrVirtualItem,
    FrVirtualItemMeta,
    FrVirtualList,
    FrVirtualPanel,
    FrVirtualViewport,
  ],
  exports: [
    FrVirtualContent,
    FrVirtualFor,
    FrVirtualItem,
    FrVirtualItemMeta,
    FrVirtualList,
    FrVirtualPanel,
    FrVirtualViewport,
  ],
})
export class FrVirtualScrollModule {}
