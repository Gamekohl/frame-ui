import { Routes } from '@angular/router';

export default [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'overview',
  },
  {
    path: 'overview',
    loadComponent: () =>
      import('./overview/overview-template.page').then(
        (component) => component.OverviewTemplatePage,
      ),
  },
  {
    path: 'product-catalog',
    loadComponent: () =>
      import('./product-catalog/product-catalog-template.page').then(
        (component) => component.ProductCatalogTemplatePage,
      ),
  },
  {
    path: 'inventory',
    loadComponent: () =>
      import('./inventory/inventory-template.page').then(
        (component) => component.InventoryTemplatePage,
      ),
  },
  {
    path: 'orders',
    loadComponent: () =>
      import('./orders/orders-template.page').then((component) => component.OrdersTemplatePage),
  },
  {
    path: 'suppliers',
    loadComponent: () =>
      import('./suppliers/suppliers-template.page').then(
        (component) => component.SuppliersTemplatePage,
      ),
  },
] satisfies Routes;
