import { NgModule } from '@angular/core';
import {
  FrItem,
  FrItemActions,
  FrItemContent,
  FrItemDescription,
  FrItemFooter,
  FrItemGroup,
  FrItemHeader,
  FrItemMedia,
  FrItemSeparator,
  FrItemTitle,
} from './src/item';

@NgModule({
  imports: [
    FrItem,
    FrItemActions,
    FrItemContent,
    FrItemDescription,
    FrItemFooter,
    FrItemGroup,
    FrItemHeader,
    FrItemMedia,
    FrItemSeparator,
    FrItemTitle,
  ],
  exports: [
    FrItem,
    FrItemActions,
    FrItemContent,
    FrItemDescription,
    FrItemFooter,
    FrItemGroup,
    FrItemHeader,
    FrItemMedia,
    FrItemSeparator,
    FrItemTitle,
  ],
})
export class FrItemModule {}
