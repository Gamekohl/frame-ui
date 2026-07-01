import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/introduction/introduction').then((m) => m.IntroductionComponent),
  },
  {
    path: 'blocks',
    loadChildren: () => import('./pages/blocks/blocks.routes'),
  },
  {
    path: 'docs',
    loadChildren: () => import('./pages/docs/docs.routes'),
  },
  {
    path: '**',
    redirectTo: 'docs',
  },
];
