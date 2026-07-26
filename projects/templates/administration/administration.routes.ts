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
      import('./user-management/user-management-template.page').then(
        (component) => component.UserManagementTemplatePage,
      ),
  },
  {
    path: 'roles-permissions',
    loadComponent: () =>
      import('./roles-permissions/roles-permissions-template.page').then(
        (component) => component.RolesPermissionsTemplatePage,
      ),
  },
  {
    path: 'audit-log',
    loadComponent: () =>
      import('./audit-log/audit-log-template.page').then(
        (component) => component.AuditLogTemplatePage,
      ),
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./settings/settings-template.page').then(
        (component) => component.SettingsTemplatePage,
      ),
  },
] satisfies Routes;
