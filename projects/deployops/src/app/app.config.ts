import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, Routes, withViewTransitions } from '@angular/router';
import { provideFrameUI } from '@frame-ui-ng/foundation';
import { Deployments } from './components/deployments/deployments';
import { Environments } from './components/environments/environments';
import { ReleaseQueue } from './components/release-queue/release-queue';
import { Services } from './components/services/services';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'release-queue' },
  { path: 'release-queue', component: ReleaseQueue },
  { path: 'deployments', component: Deployments },
  { path: 'environments', component: Environments },
  { path: 'services', component: Services },
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    provideRouter(
      routes,
      withViewTransitions()
    ),
    provideFrameUI({
      defaultTheme: 'light',
    }),
  ],
};
