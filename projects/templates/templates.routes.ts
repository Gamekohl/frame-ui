import { Routes } from '@angular/router';

export default [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'store/overview',
  },
  {
    path: 'store',
    loadChildren: () => import('./store/store.routes'),
  },
  {
    path: 'administration',
    loadChildren: () => import('./administration/administration.routes'),
  },
] satisfies Routes;
