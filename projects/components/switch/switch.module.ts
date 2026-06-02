import { NgModule } from '@angular/core';
import {
  FrSwitch,
  FrSwitchContent,
  FrSwitchDescription,
  FrSwitchError,
  FrSwitchField,
  FrSwitchLabel,
} from './src/switch';

@NgModule({
  imports: [
    FrSwitch,
    FrSwitchContent,
    FrSwitchDescription,
    FrSwitchError,
    FrSwitchField,
    FrSwitchLabel,
  ],
  exports: [
    FrSwitch,
    FrSwitchContent,
    FrSwitchDescription,
    FrSwitchError,
    FrSwitchField,
    FrSwitchLabel,
  ],
})
export class FrSwitchModule {}
