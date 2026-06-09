import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FrBreadcrumbModule } from '@frame-ui-ng/components/breadcrumb';

export type BreadcrumbPreviewMode = 'basic' | 'collapsed' | 'custom-separator' | 'responsive' | 'rtl';

export type BreadcrumbPreviewConfig = {
  mode?: BreadcrumbPreviewMode;
  className?: string;
  style?: string;
  tokenPrefix?: string;
};

@Component({
  selector: 'docs-breadcrumb-preview',
  host: {
    class: 'block',
  },
  imports: [
    FrBreadcrumbModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    .docs-breadcrumb-responsive-demo {
      container-type: inline-size;
      inline-size: 100%;
      min-inline-size: 0;
    }

    .docs-breadcrumb-responsive-demo__list {
      flex-wrap: nowrap;
      min-inline-size: 0;
    }

    .docs-breadcrumb-responsive-demo__optional-sm,
    .docs-breadcrumb-responsive-demo__optional-md {
      display: none;
    }

    .docs-breadcrumb-responsive-demo__current-item {
      flex: 1 1 auto;
      min-inline-size: 0;
    }

    .docs-breadcrumb-responsive-demo__current {
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    @container (min-width: 28rem) {
      .docs-breadcrumb-responsive-demo__optional-sm {
        display: inline-flex;
      }
    }

    @container (min-width: 38rem) {
      .docs-breadcrumb-responsive-demo__optional-md {
        display: inline-flex;
      }
    }
  `,
  template: `
    <div
      [class]="config().className ?? 'w-full'"
      [style]="config().style ?? null"
      [dir]="config().mode === 'rtl' ? 'rtl' : null"
    >
      @switch (config().mode ?? 'basic') {
        @case ('collapsed') {
          <nav
            frBreadcrumb
            aria-label="Breadcrumb"
            [attr.data-token-target]="tokenTarget('root')"
          >
            <ol frBreadcrumbList [attr.data-token-target]="tokenTarget('list')">
              <li frBreadcrumbItem>
                <a frBreadcrumbLink href="#" [attr.data-token-target]="tokenTarget('link')">
                  Home
                </a>
              </li>
              <li frBreadcrumbSeparator [attr.data-token-target]="tokenTarget('separator')"></li>
              <li frBreadcrumbItem>
                <span frBreadcrumbEllipsis label="More documentation pages"></span>
              </li>
              <li frBreadcrumbSeparator></li>
              <li frBreadcrumbItem>
                <a frBreadcrumbLink href="#">Components</a>
              </li>
              <li frBreadcrumbSeparator></li>
              <li frBreadcrumbItem>
                <span frBreadcrumbPage [attr.data-token-target]="tokenTarget('page')">
                  Breadcrumb
                </span>
              </li>
            </ol>
          </nav>
        }

        @case ('custom-separator') {
          <nav frBreadcrumb aria-label="Breadcrumb">
            <ol frBreadcrumbList>
              <li frBreadcrumbItem>
                <a frBreadcrumbLink href="#">Docs</a>
              </li>
              <li frBreadcrumbSeparator>→</li>
              <li frBreadcrumbItem>
                <a frBreadcrumbLink href="#">Components</a>
              </li>
              <li frBreadcrumbSeparator>→</li>
              <li frBreadcrumbItem>
                <span frBreadcrumbPage>Breadcrumb</span>
              </li>
            </ol>
          </nav>
        }

        @case ('responsive') {
          <div class="docs-breadcrumb-responsive-demo rounded-2xl border bg-card p-5">
            <nav frBreadcrumb aria-label="Breadcrumb">
              <ol frBreadcrumbList class="docs-breadcrumb-responsive-demo__list">
                <li frBreadcrumbItem class="docs-breadcrumb-responsive-demo__optional-sm">
                  <a frBreadcrumbLink href="#">FrameUI</a>
                </li>
                <li
                  frBreadcrumbSeparator
                  class="docs-breadcrumb-responsive-demo__optional-sm"
                ></li>
                <li frBreadcrumbItem class="docs-breadcrumb-responsive-demo__optional-md">
                  <a frBreadcrumbLink href="#">Documentation</a>
                </li>
                <li
                  frBreadcrumbSeparator
                  class="docs-breadcrumb-responsive-demo__optional-md"
                ></li>
                <li frBreadcrumbItem>
                  <a frBreadcrumbLink href="#">Components</a>
                </li>
                <li frBreadcrumbSeparator></li>
                <li frBreadcrumbItem class="docs-breadcrumb-responsive-demo__current-item">
                  <span frBreadcrumbPage class="docs-breadcrumb-responsive-demo__current">
                    Breadcrumb with a long current page
                  </span>
                </li>
              </ol>
            </nav>
          </div>
        }

        @case ('rtl') {
          <nav frBreadcrumb aria-label="Breadcrumb">
            <ol frBreadcrumbList>
              <li frBreadcrumbItem>
                <a frBreadcrumbLink href="#">الرئيسية</a>
              </li>
              <li frBreadcrumbSeparator></li>
              <li frBreadcrumbItem>
                <a frBreadcrumbLink href="#">المكونات</a>
              </li>
              <li frBreadcrumbSeparator></li>
              <li frBreadcrumbItem>
                <span frBreadcrumbPage>مسار التنقل</span>
              </li>
            </ol>
          </nav>
        }

        @default {
          <nav
            frBreadcrumb
            aria-label="Breadcrumb"
            [attr.data-token-target]="tokenTarget('root')"
          >
            <ol frBreadcrumbList [attr.data-token-target]="tokenTarget('list')">
              <li frBreadcrumbItem>
                <a frBreadcrumbLink href="#" [attr.data-token-target]="tokenTarget('link')">
                  Home
                </a>
              </li>
              <li frBreadcrumbSeparator [attr.data-token-target]="tokenTarget('separator')"></li>
              <li frBreadcrumbItem>
                <a frBreadcrumbLink href="#">Components</a>
              </li>
              <li frBreadcrumbSeparator></li>
              <li frBreadcrumbItem>
                <span frBreadcrumbPage [attr.data-token-target]="tokenTarget('page')">
                  Breadcrumb
                </span>
              </li>
            </ol>
          </nav>
        }
      }
    </div>
  `,
})
export class DocsBreadcrumbPreviewComponent {
  readonly config = input<BreadcrumbPreviewConfig>({});

  protected tokenTarget(key: string): string | null {
    const prefix = this.config().tokenPrefix;
    return prefix ? `${prefix}-${key}` : null;
  }
}

