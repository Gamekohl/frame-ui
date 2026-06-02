import { NgModule } from '@angular/core';
import {
  FrPagination,
  FrPaginationContent,
  FrPaginationEllipsis,
  FrPaginationIcon,
  FrPaginationItem,
  FrPaginationLink,
  FrPaginationNext,
  FrPaginationPrevious,
} from './src/pagination';

@NgModule({
  imports: [
    FrPagination,
    FrPaginationContent,
    FrPaginationEllipsis,
    FrPaginationIcon,
    FrPaginationItem,
    FrPaginationLink,
    FrPaginationNext,
    FrPaginationPrevious,
  ],
  exports: [
    FrPagination,
    FrPaginationContent,
    FrPaginationEllipsis,
    FrPaginationIcon,
    FrPaginationItem,
    FrPaginationLink,
    FrPaginationNext,
    FrPaginationPrevious,
  ],
})
export class FrPaginationModule {}
