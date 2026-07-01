import { Routes } from '@angular/router';

export default [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'user-management',
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
] satisfies Routes;
