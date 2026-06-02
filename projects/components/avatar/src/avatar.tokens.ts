import { InjectionToken } from '@angular/core';

export interface FrAvatarContext {
  readonly status: () => 'error' | 'idle' | 'loaded';
  setStatus(status: 'error' | 'idle' | 'loaded'): void;
}

export const AVATAR_ROOT = new InjectionToken<FrAvatarContext>('FrAvatar');
