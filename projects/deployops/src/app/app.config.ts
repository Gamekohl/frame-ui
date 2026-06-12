import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, Routes } from '@angular/router';
import { provideFrameUI } from '@frame-ui-ng/foundation';
import { ReleaseQueue } from './components/release-queue/release-queue';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'release-queue' },
  { path: 'release-queue', component: ReleaseQueue },
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    provideRouter(routes),
    provideFrameUI({
      defaultTheme: 'light',
    }),
  ],
};
