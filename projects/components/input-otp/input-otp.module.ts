import { NgModule } from '@angular/core';
import {
  FrInputOtp,
  FrInputOtpGroup,
  FrInputOtpSeparator,
  FrInputOtpSlot,
} from './src/input-otp';

@NgModule({
  imports: [
    FrInputOtp,
    FrInputOtpGroup,
    FrInputOtpSeparator,
    FrInputOtpSlot,
  ],
  exports: [
    FrInputOtp,
    FrInputOtpGroup,
    FrInputOtpSeparator,
    FrInputOtpSlot,
  ],
})
export class FrInputOtpModule {}
