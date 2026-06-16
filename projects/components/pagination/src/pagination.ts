import { Component, Directive, booleanAttribute, computed, inject, input, model } from '@angular/core';
import { clampNumber } from '@frame-ui-ng/components/utils';

export type FrPaginationPage = number | 'ellipsis';

@Directive({
  selector: 'nav[frPagination], [frPagination]',
  exportAs: 'frPagination',
  host: {
    class: 'frame-pagination',
    '[attr.aria-label]': 'ariaLabel()',
    '[attr.data-page]': 'page()',
    '[attr.data-total-pages]': 'totalPages()',
  },
})
export class FrPagination {
  readonly ariaLabel = input('pagination', { alias: 'aria-label' });
  readonly boundaryCount = input(1);
  readonly page = model(1);
  readonly siblingCount = input(1);
  readonly totalPages = input(1);

  readonly canPrevious = computed(() => this.page() > 1);
  readonly canNext = computed(() => this.page() < this.normalizedTotalPages());
  readonly pages = computed(() => this.buildPages());

  goToPage(page: number): void {
    this.page.set(clampNumber(page, 1, this.normalizedTotalPages()));
  }

  goToPreviousPage(): void {
    this.goToPage(this.page() - 1);
  }

  goToNextPage(): void {
    this.goToPage(this.page() + 1);
  }

  private normalizedTotalPages(): number {
    return Math.max(1, Math.floor(this.totalPages()));
  }

  private buildPages(): FrPaginationPage[] {
    const totalPages = this.normalizedTotalPages();
    const boundaryCount = Math.max(0, Math.floor(this.boundaryCount()));
    const siblingCount = Math.max(0, Math.floor(this.siblingCount()));
    const currentPage = clampNumber(this.page(), 1, totalPages);
    const pages = new Set<number>();

    for (let page = 1; page <= Math.min(boundaryCount, totalPages); page += 1) {
      pages.add(page);
    }

    for (let page = Math.max(1, totalPages - boundaryCount + 1); page <= totalPages; page += 1) {
      pages.add(page);
    }

    for (let page = currentPage - siblingCount; page <= currentPage + siblingCount; page += 1) {
      if (page >= 1 && page <= totalPages) {
        pages.add(page);
      }
    }

    const sortedPages = Array.from(pages).sort((a, b) => a - b);
    const visiblePages: FrPaginationPage[] = [];

    for (const page of sortedPages) {
      const previousPage = visiblePages.at(-1);

      if (typeof previousPage === 'number' && page - previousPage > 1) {
        visiblePages.push('ellipsis');
      }

      visiblePages.push(page);
    }

    return visiblePages;
  }
}

@Directive({
  selector: 'ul[frPaginationContent], ol[frPaginationContent], [frPaginationContent]',
  host: {
    class: 'frame-pagination__content',
  },
})
export class FrPaginationContent {}

@Directive({
  selector: 'li[frPaginationItem], [frPaginationItem]',
  host: {
    class: 'frame-pagination__item',
  },
})
export class FrPaginationItem {}

@Directive({
  selector: 'a[frPaginationLink], button[frPaginationLink]',
  host: {
    class: 'frame-pagination__link',
    '[attr.aria-current]': 'isActive() ? "page" : null',
    '[attr.aria-disabled]': 'isDisabled() ? "true" : null',
    '[attr.data-active]': 'isActive() ? "" : null',
    '[attr.data-disabled]': 'isDisabled() ? "" : null',
    '[attr.disabled]': 'isDisabled() ? "" : null',
    '[attr.tabindex]': 'isDisabled() ? "-1" : null',
    '(click)': 'handleClick($event)',
  },
})
export class FrPaginationLink {
  private readonly pagination = inject(FrPagination, { optional: true });

  readonly active = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly page = input<number | null>(null);

  protected readonly isActive = computed(() => {
    const page = this.page();

    return this.active() || (page !== null && this.pagination?.page() === page);
  });
  protected readonly isDisabled = computed(() => this.disabled());

  protected handleClick(event: Event): void {
    if (this.isDisabled()) {
      event.preventDefault();
      return;
    }

    const page = this.page();

    if (page === null || !this.pagination) {
      return;
    }

    event.preventDefault();
    this.pagination.goToPage(page);
  }
}

@Directive({
  selector: '[frPaginationIcon]',
  host: {
    class: 'frame-pagination__projected-icon',
    'aria-hidden': 'true',
  },
})
export class FrPaginationIcon {}

@Component({
  selector: 'a[frPaginationPrevious], button[frPaginationPrevious]',
  host: {
    class: 'frame-pagination__link frame-pagination__previous',
    '[attr.aria-label]': 'ariaLabel()',
    '[attr.aria-disabled]': 'isDisabled() ? "true" : null',
    '[attr.data-disabled]': 'isDisabled() ? "" : null',
    '[attr.data-icon-only]': 'iconOnly() ? "" : null',
    '[attr.disabled]': 'isDisabled() ? "" : null',
    '[attr.tabindex]': 'isDisabled() ? "-1" : null',
    '(click)': 'handleClick($event)',
  },
  template: `
    <span class="frame-pagination__control-icon" aria-hidden="true">
      <ng-content select="[frPaginationIcon]">‹</ng-content>
    </span>
    @if (!iconOnly()) {
      <span class="frame-pagination__control-text">{{ text() }}</span>
    }
  `,
})
export class FrPaginationPrevious {
  private readonly pagination = inject(FrPagination, { optional: true });

  readonly ariaLabel = input('Go to previous page', { alias: 'aria-label' });
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly iconOnly = input(false, { transform: booleanAttribute });
  readonly text = input('Previous');
  protected readonly isDisabled = computed(() => this.disabled() || this.pagination?.canPrevious() === false);

  protected handleClick(event: Event): void {
    if (this.isDisabled()) {
      event.preventDefault();
      return;
    }

    if (!this.pagination) {
      return;
    }

    event.preventDefault();
    this.pagination.goToPreviousPage();
  }
}

@Component({
  selector: 'a[frPaginationNext], button[frPaginationNext]',
  host: {
    class: 'frame-pagination__link frame-pagination__next',
    '[attr.aria-label]': 'ariaLabel()',
    '[attr.aria-disabled]': 'isDisabled() ? "true" : null',
    '[attr.data-disabled]': 'isDisabled() ? "" : null',
    '[attr.data-icon-only]': 'iconOnly() ? "" : null',
    '[attr.disabled]': 'isDisabled() ? "" : null',
    '[attr.tabindex]': 'isDisabled() ? "-1" : null',
    '(click)': 'handleClick($event)',
  },
  template: `
    @if (!iconOnly()) {
      <span class="frame-pagination__control-text">{{ text() }}</span>
    }
    <span class="frame-pagination__control-icon" aria-hidden="true">
      <ng-content select="[frPaginationIcon]">›</ng-content>
    </span>
  `,
})
export class FrPaginationNext {
  private readonly pagination = inject(FrPagination, { optional: true });

  readonly ariaLabel = input('Go to next page', { alias: 'aria-label' });
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly iconOnly = input(false, { transform: booleanAttribute });
  readonly text = input('Next');
  protected readonly isDisabled = computed(() => this.disabled() || this.pagination?.canNext() === false);

  protected handleClick(event: Event): void {
    if (this.isDisabled()) {
      event.preventDefault();
      return;
    }

    if (!this.pagination) {
      return;
    }

    event.preventDefault();
    this.pagination.goToNextPage();
  }
}

@Component({
  selector: '[frPaginationEllipsis], frame-pagination-ellipsis',
  host: {
    class: 'frame-pagination__ellipsis',
    role: 'presentation',
  },
  template: `
    <span aria-hidden="true">...</span>
    <span class="frame-pagination__sr-only">{{ label() }}</span>
  `,
})
export class FrPaginationEllipsis {
  readonly label = input('More pages');
}
