import { NgModule } from '@angular/core';
import {
  FrAvatar,
  FrAvatarBadge,
  FrAvatarFallback,
  FrAvatarGroup,
  FrAvatarGroupCount,
  FrAvatarIcon,
  FrAvatarImage,
} from './src/avatar';

@NgModule({
  imports: [
    FrAvatar,
    FrAvatarBadge,
    FrAvatarFallback,
    FrAvatarGroup,
    FrAvatarGroupCount,
    FrAvatarIcon,
    FrAvatarImage,
  ],
  exports: [
    FrAvatar,
    FrAvatarBadge,
    FrAvatarFallback,
    FrAvatarGroup,
    FrAvatarGroupCount,
    FrAvatarIcon,
    FrAvatarImage,
  ],
})
export class FrAvatarModule {}
