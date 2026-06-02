import { NgModule } from '@angular/core';
import {
  FrSelect,
  FrSelectContent,
  FrSelectError,
  FrSelectGroup,
  FrSelectIcon,
  FrSelectItem,
  FrSelectItemIndicator,
  FrSelectLabel,
  FrSelectPanel,
  FrSelectSeparator,
  FrSelectValue,
} from './src/select';

@NgModule({
  imports: [
    FrSelect,
    FrSelectContent,
    FrSelectError,
    FrSelectGroup,
    FrSelectIcon,
    FrSelectItem,
    FrSelectItemIndicator,
    FrSelectLabel,
    FrSelectPanel,
    FrSelectSeparator,
    FrSelectValue,
  ],
  exports: [
    FrSelect,
    FrSelectContent,
    FrSelectError,
    FrSelectGroup,
    FrSelectIcon,
    FrSelectItem,
    FrSelectItemIndicator,
    FrSelectLabel,
    FrSelectPanel,
    FrSelectSeparator,
    FrSelectValue,
  ],
})
export class FrSelectModule {}
