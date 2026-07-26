import { Routes } from '@angular/router';

import administrationRoutes from './administration.routes';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'templates/administration/user-management',
  },
  {
    path: 'templates/administration',
    children: administrationRoutes,
  },
  {
    path: '**',
    redirectTo: 'templates/administration/user-management',
  },
];
