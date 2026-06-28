import { ComponentDoc } from '../../shared/models/component-doc.model';
import { DocsPaginationPreviewComponent } from './previews/pagination-preview';

const importsCode = `import { FrPaginationModule } from '@frame-ui-ng/components/pagination';`;

const basicHtml = `<p>Showing page {{ currentPage() }} of {{ totalPages }}</p>

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
</nav>`;

const basicTs = `import { signal } from '@angular/core';
${importsCode}

readonly totalPages = 12;
readonly currentPage = signal(6);`;

const simpleHtml = `<nav frPagination aria-label="Simple pagination">
  <ul frPaginationContent>
    <li frPaginationItem><a frPaginationLink href="#">1</a></li>
    <li frPaginationItem><a frPaginationLink href="#">2</a></li>
    <li frPaginationItem><a frPaginationLink active href="#">3</a></li>
    <li frPaginationItem><a frPaginationLink href="#">4</a></li>
    <li frPaginationItem><a frPaginationLink href="#">5</a></li>
  </ul>
</nav>`;

const iconsOnlyHtml = `<nav frPagination aria-label="Table pagination">
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
</nav>`;

const iconsOnlyTs = `${importsCode}
import { NgIcon, provideIcons } from '@ng-icons/core';
import { tablerChevronLeft, tablerChevronRight } from '@ng-icons/tabler-icons';

@Component({
  imports: [NgIcon, FrPaginationModule],
  viewProviders: [provideIcons({ tablerChevronLeft, tablerChevronRight })],
  template: \`...\`,
})
export class PaginationDemo {}`;


const dropdownHtml = `<div class="pagination-toolbar">
  <div frDropdownMenu>
    <button frButton appearance="outline" size="sm" [frDropdownMenuTrigger]="rowsMenu" type="button">
      20 / page
    </button>

    <ng-template #rowsMenu="frDropdownMenuContent" frDropdownMenuContent>
      <div frDropdownMenuPanel>
        <button frDropdownMenuItem type="button">10 rows</button>
        <button frDropdownMenuItem type="button">20 rows</button>
        <button frDropdownMenuItem type="button">50 rows</button>
      </div>
    </ng-template>
  </div>

  <nav frPagination aria-label="Pagination with rows per page">
    <ul frPaginationContent>
      <li frPaginationItem><button frPaginationPrevious type="button"></button></li>
      <li frPaginationItem><button frPaginationLink type="button">1</button></li>
      <li frPaginationItem><button frPaginationLink active type="button">2</button></li>
      <li frPaginationItem><button frPaginationNext type="button"></button></li>
    </ul>
  </nav>
</div>`;

const disabledHtml = `<nav frPagination aria-label="Disabled pagination">
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
</nav>`;

const customStylingCss = `.product-pagination {
  --frame-pagination-link-radius: var(--frame-radius-full);
  --frame-pagination-link-hover-bg: color-mix(in srgb, var(--frame-primary) 12%, transparent);
  --frame-pagination-link-hover-color: var(--frame-primary);
  --frame-pagination-link-active-bg: var(--frame-primary);
  --frame-pagination-link-active-border: var(--frame-primary);
  --frame-pagination-link-active-color: var(--frame-primary-foreground);
}`;

const rtlHtml = `<div dir="rtl">
  <nav frPagination aria-label="ترقيم الصفحات">
    <ul frPaginationContent>
      <li frPaginationItem>
        <a frPaginationPrevious href="#" text="السابق" aria-label="الانتقال إلى الصفحة السابقة"></a>
      </li>
      <li frPaginationItem><a frPaginationLink href="#">١</a></li>
      <li frPaginationItem><a frPaginationLink active href="#">٢</a></li>
      <li frPaginationItem><span frPaginationEllipsis label="صفحات إضافية"></span></li>
      <li frPaginationItem>
        <a frPaginationNext href="#" text="التالي" aria-label="الانتقال إلى الصفحة التالية"></a>
      </li>
    </ul>
  </nav>
</div>`;

export const PAGINATION_DOC: ComponentDoc = {
  slug: 'pagination',
  breadcrumb: 'Components / Pagination',

  hero: {
    id: 'pagination-hero',
    title: 'Preview',
    description: 'Pagination with page navigation, next and previous links.',
    preview: {
      component: DocsPaginationPreviewComponent,
    },
  },

  installation: {
    cli: {
      language: 'bash',
      code: 'npx your-cli add pagination',
    },
    manual: {
      steps: [
        {
          title: 'Import the pagination primitives your template needs.',
          code: {
            language: 'ts',
            code: importsCode,
          },
        },
      ],
    },
  },

  usage: [
    { language: 'ts', code: basicTs },
    { language: 'html', code: basicHtml },
  ],

  composition: `Pagination
└── PaginationContent
    ├── PaginationItem
    │   └── PaginationPrevious
    ├── PaginationItem
    │   └── PaginationLink
    ├── PaginationItem
    │   └── PaginationEllipsis
    └── PaginationItem
        └── PaginationNext`,

  tokenInspector: {
    id: 'pagination-tokens',
    title: 'Token Inspector',
    description: 'Inspect the pagination root, content, links, active state, controls, and ellipsis.',
    preview: {
      component: DocsPaginationPreviewComponent,
      inputs: {
        config: { mode: 'inspector' },
      },
      inspectorTargets: [
        {
          id: 'pagination-root',
          label: 'Root',
          selector: '[data-token-target="pagination-root"]',
          description: 'The root establishes centered navigation and inherited foreground color.',
          tokens: ['--frame-pagination-color'],
        },
        {
          id: 'pagination-content',
          label: 'Content',
          selector: '[data-token-target="pagination-content"]',
          description: 'Content controls item wrapping, alignment, and spacing.',
          tokens: ['--frame-pagination-gap'],
        },
        {
          id: 'pagination-link',
          label: 'Link',
          selector: '[data-token-target="pagination-link"]',
          description: 'Links define shared sizing, padding, radius, color, hover, and focus treatment.',
          tokens: [
            '--frame-pagination-link-size',
            '--frame-pagination-link-min-width',
            '--frame-pagination-link-padding-x',
            '--frame-pagination-link-gap',
            '--frame-pagination-link-radius',
            '--frame-pagination-link-bg',
            '--frame-pagination-link-color',
            '--frame-pagination-link-border',
            '--frame-pagination-link-hover-bg',
            '--frame-pagination-link-hover-color',
            '--frame-pagination-link-focus-shadow',
          ],
        },
        {
          id: 'pagination-active-link',
          label: 'Active link',
          selector: '[data-token-target="pagination-active-link"]',
          description: 'The active page uses aria-current and active state tokens.',
          tokens: [
            '--frame-pagination-link-active-bg',
            '--frame-pagination-link-active-color',
            '--frame-pagination-link-active-border',
          ],
        },
        {
          id: 'pagination-previous',
          label: 'Previous',
          selector: '[data-token-target="pagination-previous"]',
          description: 'Previous and next controls share the link token contract and can hide their text.',
          tokens: ['--frame-pagination-link-size', '--frame-pagination-link-gap'],
        },
        {
          id: 'pagination-ellipsis',
          label: 'Ellipsis',
          selector: '[data-token-target="pagination-ellipsis"]',
          description: 'Ellipsis communicates skipped pages with an accessible hidden label.',
          tokens: ['--frame-pagination-ellipsis-color'],
        },
      ],
    },
  },

  styling: {
    description:
      'Override pagination tokens to customize link shape, active treatment, hover color, and focus ring.',
    preview: {
      id: 'custom-styling-preview',
      title: 'Custom Styling Preview',
      description: 'This preview rounds pagination items into pills and uses the primary color for active state.',
      preview: {
        component: DocsPaginationPreviewComponent,
        inputs: {
          config: { mode: 'custom-styling' },
        },
      },
      code: [
        {
          language: 'ts',
          code: importsCode,
        },
        {
          language: 'html',
          code: `<nav frPagination class="product-pagination">
  ...
</nav>`,
        },
        {
          language: 'css',
          code: customStylingCss,
        },
      ],
    },
  },

  examples: [
    {
      id: 'pagination-basic',
      title: 'Basic',
      description:
        'Keep page state in your component and render a small window around the current page with ellipsis gaps.',
      preview: {
        component: DocsPaginationPreviewComponent,
      },
      code: [
        { language: 'ts', code: basicTs },
        { language: 'html', code: basicHtml },
      ],
    },
    {
      id: 'pagination-simple',
      title: 'Simple',
      description: 'A simple pagination with only page numbers.',
      preview: {
        component: DocsPaginationPreviewComponent,
        inputs: { config: { mode: 'simple' } },
      },
      code: [
        { language: 'ts', code: importsCode },
        { language: 'html', code: simpleHtml },
      ],
    },
    {
      id: 'pagination-icons-only',
      title: 'Icons Only',
      description: 'Project custom icons into previous and next controls for compact table pagination.',
      preview: {
        component: DocsPaginationPreviewComponent,
        inputs: { config: { mode: 'icons-only' } },
      },
      code: [
        { language: 'ts', code: iconsOnlyTs },
        { language: 'html', code: iconsOnlyHtml },
      ],
    },
    {
      id: 'pagination-dropdown',
      title: 'Rows per page',
      description: 'Pair pagination with the dropdown menu primitive for rows-per-page controls.',
      preview: {
        component: DocsPaginationPreviewComponent,
        inputs: { config: { mode: 'dropdown' } },
      },
      code: [
        {
          language: 'ts',
          code: `${importsCode}
import { FrButtonModule } from '@frame-ui-ng/components/button';
import { FrDropdownMenuModule } from '@frame-ui-ng/components/dropdown-menu';`,
        },
        { language: 'html', code: dropdownHtml },
      ],
    },
    {
      id: 'pagination-disabled',
      title: 'Disabled',
      description: 'Disable unavailable page controls with the disabled input.',
      preview: {
        component: DocsPaginationPreviewComponent,
        inputs: { config: { mode: 'disabled' } },
      },
      code: [
        { language: 'ts', code: importsCode },
        { language: 'html', code: disabledHtml },
      ],
    },
    {
      id: 'pagination-rtl',
      title: 'RTL support',
      description: 'Override previous and next text for localized RTL pagination.',
      preview: {
        component: DocsPaginationPreviewComponent,
        inputs: { config: { mode: 'rtl' } },
      },
      code: [
        { language: 'ts', code: importsCode },
        { language: 'html', code: rtlHtml },
      ],
    },
  ],

  tokensTitle: 'Design Tokens',
  tokensDescription:
    'Pagination defines tokens for layout spacing, link sizing, active and hover states, disabled opacity, focus ring, and ellipsis color.',
  tokens: `
  --frame-pagination-gap: 0.25rem;
  --frame-pagination-color: var(--frame-foreground);
  --frame-pagination-link-size: 2.25rem;
  --frame-pagination-link-min-width: 2.25rem;
  --frame-pagination-link-padding-x: 0.75rem;
  --frame-pagination-link-gap: 0.375rem;
  --frame-pagination-link-radius: var(--frame-radius-md);
  --frame-pagination-link-bg: transparent;
  --frame-pagination-link-color: var(--frame-muted-foreground);
  --frame-pagination-link-border: transparent;
  --frame-pagination-link-hover-bg: var(--frame-accent);
  --frame-pagination-link-hover-color: var(--frame-accent-foreground);
  --frame-pagination-link-active-bg: var(--frame-surface);
  --frame-pagination-link-active-color: var(--frame-foreground);
  --frame-pagination-link-active-border: var(--frame-border);
  --frame-pagination-link-disabled-opacity: 0.5;
  --frame-pagination-ellipsis-color: var(--frame-muted-foreground);
  `,
};

