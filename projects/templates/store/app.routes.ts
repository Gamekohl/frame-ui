import { Routes } from '@angular/router';

import storeRoutes from './store.routes';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'templates/store/overview',
  },
  {
    path: 'templates/store',
    children: storeRoutes,
  },
  {
    path: '**',
    redirectTo: 'templates/store/overview',
  },
];
