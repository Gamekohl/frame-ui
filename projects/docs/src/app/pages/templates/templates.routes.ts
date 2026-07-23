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
        (m) => m.ProductCatalogTemplatePage,
      ),
  },
  {
    path: 'inventory',
    loadComponent: () =>
      import('./inventory/inventory-template.page').then((m) => m.InventoryTemplatePage),
  },
  {
    path: 'user-management',
    loadComponent: () =>
      import('./user-management/user-management-template.page').then(
        (m) => m.UserManagementTemplatePage,
      ),
  },
  {
    path: 'roles-permissions',
    loadComponent: () =>
      import('./roles-permissions/roles-permissions-template.page').then(
        (m) => m.RolesPermissionsTemplatePage,
      ),
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./settings/settings-template.page').then((m) => m.SettingsTemplatePage),
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
  {
    path: 'audit-log',
    loadComponent: () =>
      import('./audit-log/audit-log-template.page').then((m) => m.AuditLogTemplatePage),
  },
] satisfies Routes;
