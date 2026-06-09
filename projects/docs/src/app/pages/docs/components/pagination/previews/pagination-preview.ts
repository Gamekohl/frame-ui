import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { FrButtonModule } from '@frame-ui-ng/components/button';
import { FrDropdownMenuModule } from '@frame-ui-ng/components/dropdown-menu';
import { FrPaginationModule } from '@frame-ui-ng/components/pagination';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { tablerChevronLeft, tablerChevronRight } from '@ng-icons/tabler-icons';

export type PaginationPreviewMode =
  | 'basic'
  | 'custom-styling'
  | 'disabled'
  | 'dropdown'
  | 'icons-only'
  | 'inspector'
  | 'rtl'
  | 'simple';

export type PaginationPreviewConfig = {
  mode?: PaginationPreviewMode;
  className?: string;
  style?: string;
};

@Component({
  selector: 'docs-pagination-preview',
  imports: [
    FrButtonModule,
    FrDropdownMenuModule,
    FrPaginationModule,
    NgIcon,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    provideIcons({
      tablerChevronLeft,
      tablerChevronRight,
    }),
  ],
  template: `
    <div [class]="config().className ?? 'flex w-full justify-center'" [style]="config().style ?? null">
      @switch (config().mode ?? 'basic') {
        @case ('simple') {
          <nav frPagination aria-label="Simple pagination">
            <ul frPaginationContent>
              @for (page of [1, 2, 3, 4, 5]; track page) {
                <li frPaginationItem>
                  <a frPaginationLink href="#" [active]="page === 3">{{ page }}</a>
                </li>
              }
            </ul>
          </nav>
        }

        @case ('icons-only') {
          <div class="docs-pagination-stack">
            <span class="text-sm text-muted-foreground">Rows per page</span>
            <nav frPagination aria-label="Table pagination">
              <ul frPaginationContent>
                <li frPaginationItem>
                  <button frPaginationPrevious iconOnly type="button">
                    <ng-icon frPaginationIcon name="tablerChevronLeft" size="16" />
                  </button>
                </li>
                <li frPaginationItem>
                  <button frPaginationNext iconOnly type="button">
                    <ng-icon frPaginationIcon name="tablerChevronRight" size="16" />
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        }

        @case ('dropdown') {
          <div class="docs-pagination-toolbar">
            <div frDropdownMenu>
              <button frButton appearance="outline" size="sm" [frDropdownMenuTrigger]="rowsMenu" type="button">
                {{ pageSize() }} / page
              </button>

              <ng-template #rowsMenu="frDropdownMenuContent" frDropdownMenuContent>
                <div frDropdownMenuPanel>
                  @for (size of pageSizes; track size) {
                    <button frDropdownMenuItem type="button" (click)="pageSize.set(size)">
                      {{ size }} rows
                    </button>
                  }
                </div>
              </ng-template>
            </div>

            <nav frPagination aria-label="Pagination with rows per page">
              <ul frPaginationContent>
                <li frPaginationItem>
                  <button frPaginationPrevious type="button"></button>
                </li>
                <li frPaginationItem>
                  <button frPaginationLink type="button">1</button>
                </li>
                <li frPaginationItem>
                  <button frPaginationLink active type="button">2</button>
                </li>
                <li frPaginationItem>
                  <button frPaginationNext type="button"></button>
                </li>
              </ul>
            </nav>
          </div>
        }

        @case ('disabled') {
          <nav frPagination aria-label="Disabled pagination">
            <ul frPaginationContent>
              <li frPaginationItem>
                <button frPaginationPrevious disabled type="button"></button>
              </li>
              <li frPaginationItem>
                <button frPaginationLink active type="button">1</button>
              </li>
              <li frPaginationItem>
                <button frPaginationLink type="button">2</button>
              </li>
              <li frPaginationItem>
                <button frPaginationNext type="button"></button>
              </li>
            </ul>
          </nav>
        }

        @case ('custom-styling') {
          <nav frPagination class="docs-pagination-custom" aria-label="Custom pagination">
            <ul frPaginationContent>
              <li frPaginationItem>
                <a frPaginationPrevious href="#"></a>
              </li>
              <li frPaginationItem>
                <a frPaginationLink href="#">1</a>
              </li>
              <li frPaginationItem>
                <a frPaginationLink active href="#">2</a>
              </li>
              <li frPaginationItem>
                <a frPaginationLink href="#">3</a>
              </li>
              <li frPaginationItem>
                <a frPaginationNext href="#"></a>
              </li>
            </ul>
          </nav>
        }

        @case ('rtl') {
          <div dir="rtl">
            <nav frPagination aria-label="ترقيم الصفحات">
              <ul frPaginationContent>
                <li frPaginationItem>
                  <a frPaginationPrevious href="#" text="السابق" aria-label="الانتقال إلى الصفحة السابقة"></a>
                </li>
                <li frPaginationItem>
                  <a frPaginationLink href="#">١</a>
                </li>
                <li frPaginationItem>
                  <a frPaginationLink active href="#">٢</a>
                </li>
                <li frPaginationItem>
                  <span frPaginationEllipsis label="صفحات إضافية"></span>
                </li>
                <li frPaginationItem>
                  <a frPaginationNext href="#" text="التالي" aria-label="الانتقال إلى الصفحة التالية"></a>
                </li>
              </ul>
            </nav>
          </div>
        }

        @case ('inspector') {
          <nav frPagination aria-label="Pagination token inspector" data-token-target="pagination-root">
            <ul frPaginationContent data-token-target="pagination-content">
              <li frPaginationItem data-token-target="pagination-item">
                <a frPaginationPrevious href="#" data-token-target="pagination-previous"></a>
              </li>
              <li frPaginationItem>
                <a frPaginationLink href="#" data-token-target="pagination-link">1</a>
              </li>
              <li frPaginationItem>
                <a frPaginationLink active href="#" data-token-target="pagination-active-link">2</a>
              </li>
              <li frPaginationItem>
                <span frPaginationEllipsis data-token-target="pagination-ellipsis"></span>
              </li>
              <li frPaginationItem>
                <a frPaginationNext href="#" data-token-target="pagination-next"></a>
              </li>
            </ul>
          </nav>
        }

        @default {
          <div class="docs-pagination-stack">
            <p class="text-sm text-muted-foreground">
              Showing page {{ currentPage() }} of {{ totalPages }}
            </p>

            <nav
              frPagination
              #pagination="frPagination"
              aria-label="Pagination"
              [(page)]="currentPage"
              [totalPages]="totalPages"
            >
              <ul frPaginationContent>
                <li frPaginationItem>
                  <button frPaginationPrevious type="button"></button>
                </li>

                @for (page of pagination.pages(); track $index) {
                  <li frPaginationItem>
                    @if (page === 'ellipsis') {
                      <span frPaginationEllipsis></span>
                    } @else {
                      <button frPaginationLink type="button" [page]="page">
                        {{ page }}
                      </button>
                    }
                  </li>
                }

                <li frPaginationItem>
                  <button frPaginationNext type="button"></button>
                </li>
              </ul>
            </nav>
          </div>
        }
      }
    </div>
  `,
  styles: `
    .docs-pagination-stack {
      display: grid;
      gap: 0.75rem;
      justify-items: center;
    }

    .docs-pagination-toolbar {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      gap: 1rem;
    }

    .docs-pagination-custom {
      --frame-pagination-link-radius: 999px;
      --frame-pagination-link-hover-bg: color-mix(in srgb, var(--frame-primary) 12%, transparent);
      --frame-pagination-link-hover-color: var(--frame-primary);
      --frame-pagination-link-active-bg: var(--frame-primary);
      --frame-pagination-link-active-border: var(--frame-primary);
      --frame-pagination-link-active-color: var(--frame-primary-foreground);
      --frame-pagination-link-focus-shadow: 0 0 0 4px color-mix(in srgb, var(--frame-primary) 20%, transparent);
    }
  `,
})
export class DocsPaginationPreviewComponent {
  readonly config = input<PaginationPreviewConfig>({});

  protected readonly pageSizes = [10, 20, 50];
  protected readonly pageSize = signal(20);
  protected readonly totalPages = 12;
  protected readonly currentPage = signal(6);
}

