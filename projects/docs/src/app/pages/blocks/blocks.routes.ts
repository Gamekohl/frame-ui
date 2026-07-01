import { Routes } from '@angular/router';

export default [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'authentication',
  },
  {
    path: ':category',
    loadComponent: () => import('./blocks.page').then((m) => m.BlocksPage),
  },
] satisfies Routes;
