import { NgModule } from '@angular/core';
import {
  FrRadioGroup,
  FrRadioGroupCard,
  FrRadioGroupCardMeta,
  FrRadioGroupField,
  FrRadioGroupItem,
} from './src/radio-group';

@NgModule({
  imports: [
    FrRadioGroup,
    FrRadioGroupCard,
    FrRadioGroupCardMeta,
    FrRadioGroupField,
    FrRadioGroupItem,
  ],
  exports: [
    FrRadioGroup,
    FrRadioGroupCard,
    FrRadioGroupCardMeta,
    FrRadioGroupField,
    FrRadioGroupItem,
  ],
})
export class FrRadioGroupModule {}
