import { NgModule } from '@angular/core';
import {
  FrBreadcrumb,
  FrBreadcrumbEllipsis,
  FrBreadcrumbItem,
  FrBreadcrumbLink,
  FrBreadcrumbList,
  FrBreadcrumbPage,
  FrBreadcrumbSeparator,
} from './src/breadcrumb';

@NgModule({
  imports: [
    FrBreadcrumb,
    FrBreadcrumbEllipsis,
    FrBreadcrumbItem,
    FrBreadcrumbLink,
    FrBreadcrumbList,
    FrBreadcrumbPage,
    FrBreadcrumbSeparator,
  ],
  exports: [
    FrBreadcrumb,
    FrBreadcrumbEllipsis,
    FrBreadcrumbItem,
    FrBreadcrumbLink,
    FrBreadcrumbList,
    FrBreadcrumbPage,
    FrBreadcrumbSeparator,
  ],
})
export class FrBreadcrumbModule {}
