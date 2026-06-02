import { Component, signal, viewChild } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import {
  FrPagination,
  FrPaginationContent,
  FrPaginationEllipsis,
  FrPaginationIcon,
  FrPaginationItem,
  FrPaginationLink,
  FrPaginationNext,
  FrPaginationPrevious,
} from '../pagination';

@Component({
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
  template: `
    <nav frPagination aria-label="results pagination">
      <ul frPaginationContent>
        <li frPaginationItem>
          <a frPaginationPrevious href="/previous" text="Back"></a>
        </li>
        <li frPaginationItem>
          <a frPaginationLink href="/one">1</a>
        </li>
        <li frPaginationItem>
          <button frPaginationLink active type="button">2</button>
        </li>
        <li frPaginationItem>
          <span frPaginationEllipsis></span>
        </li>
        <li frPaginationItem>
          <button frPaginationNext disabled iconOnly type="button">
            <span frPaginationIcon>custom</span>
          </button>
        </li>
      </ul>
    </nav>
  `,
})
class TestHostComponent {}

@Component({
  imports: [
    FrPagination,
    FrPaginationContent,
    FrPaginationEllipsis,
    FrPaginationItem,
    FrPaginationLink,
    FrPaginationNext,
    FrPaginationPrevious,
  ],
  template: `
    <nav frPagination #pagination="frPagination" [(page)]="page" [totalPages]="12">
      <ul frPaginationContent>
        <li frPaginationItem>
          <button frPaginationPrevious type="button"></button>
        </li>
        @for (item of pagination.pages(); track $index) {
          <li frPaginationItem>
            @if (item === 'ellipsis') {
              <span frPaginationEllipsis></span>
            } @else {
              <button frPaginationLink type="button" [page]="item">{{ item }}</button>
            }
          </li>
        }
        <li frPaginationItem>
          <button frPaginationNext type="button"></button>
        </li>
      </ul>
    </nav>
  `,
})
class StatefulTestHostComponent {
  readonly page = signal(6);
  readonly pagination = viewChild.required(FrPagination);
}

describe('FrPagination', () => {
  it('adds semantic structure and active state', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();

    const root = fixture.nativeElement.querySelector('.frame-pagination') as HTMLElement | null;
    const active = fixture.nativeElement.querySelector('[frPaginationLink][data-active]') as HTMLElement | null;

    expect(root?.getAttribute('aria-label')).toBe('results pagination');
    expect(fixture.nativeElement.querySelector('.frame-pagination__content')).not.toBeNull();
    expect(fixture.nativeElement.querySelectorAll('.frame-pagination__item').length).toBe(5);
    expect(active?.getAttribute('aria-current')).toBe('page');
  });

  it('renders previous, next and ellipsis helpers', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();

    const previous = fixture.nativeElement.querySelector('.frame-pagination__previous') as HTMLElement | null;
    const next = fixture.nativeElement.querySelector('.frame-pagination__next') as HTMLElement | null;
    const ellipsis = fixture.nativeElement.querySelector('.frame-pagination__ellipsis') as HTMLElement | null;

    expect(previous?.textContent).toContain('Back');
    expect(next?.getAttribute('aria-label')).toBe('Go to next page');
    expect(next?.getAttribute('data-disabled')).toBe('');
    expect(next?.getAttribute('data-icon-only')).toBe('');
    expect(next?.textContent).toContain('custom');
    expect(ellipsis?.textContent).toContain('...');
  });

  it('keeps pagination window and navigation logic on the root', () => {
    const fixture = TestBed.createComponent(StatefulTestHostComponent);
    fixture.detectChanges();

    expect(fixture.componentInstance.pagination().pages()).toEqual([1, 'ellipsis', 5, 6, 7, 'ellipsis', 12]);

    const next = fixture.nativeElement.querySelector('.frame-pagination__next') as HTMLButtonElement;
    next.click();
    fixture.detectChanges();

    expect(fixture.componentInstance.page()).toBe(7);

    const pageOne = Array.from(
      fixture.nativeElement.querySelectorAll('[frPaginationLink]'),
    )[0] as HTMLButtonElement;
    pageOne.click();
    fixture.detectChanges();

    expect(fixture.componentInstance.page()).toBe(1);
    expect(fixture.nativeElement.querySelector('.frame-pagination__previous')?.getAttribute('data-disabled')).toBe('');
  });
});
