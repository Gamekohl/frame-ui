import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/introduction/introduction').then((m) => m.IntroductionComponent),
  },
  {
    path: 'docs',
    loadChildren: () => import('./pages/docs/docs.routes'),
  },
  {
    path: 'charts',
    loadComponent: () =>
      import('./pages/charts/chart.page').then((m) => m.ChartPageComponent),
    children: [
      {
        path: '',
        redirectTo: 'area',
        pathMatch: 'full',
      },
      {
        path: 'area',
        loadComponent: () =>
          import('./pages/charts/pages/area-chart.page').then((m) => m.AreaChartPageComponent),
      },
      {
        path: 'bar',
        loadComponent: () =>
          import('./pages/charts/pages/bar-chart.page').then((m) => m.BarChartPageComponent),
      },
      {
        path: 'line',
        loadComponent: () =>
          import('./pages/charts/pages/line-chart.page').then((m) => m.LineChartPageComponent),
      },
      {
        path: 'pie',
        loadComponent: () =>
          import('./pages/charts/pages/pie-chart.page').then((m) => m.PieChartPageComponent),
      },
      {
        path: 'radial',
        loadComponent: () =>
          import('./pages/charts/pages/radial-chart.page').then((m) => m.RadialChartPageComponent),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'docs',
  },
];
