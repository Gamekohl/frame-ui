import { Routes } from '@angular/router';

export default [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'user-management',
  },
  {
    path: 'product-catalog',
    loadComponent: () =>
      import('./product-catalog/product-catalog-template.page').then(
        (m) => m.ProductCatalogTemplatePage,
      ),
  },
  {
    path: 'user-management',
    loadComponent: () =>
      import('./user-management/user-management-template.page').then((m) => m.UserManagementTemplatePage),
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
] satisfies Routes;
