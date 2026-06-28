import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FrNavigationMenuModule } from '@frame-ui-ng/components/navigation-menu';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  tablerBook,
  tablerBox,
  tablerBrandAngular,
  tablerChevronDown,
  tablerCode,
  tablerComponents,
  tablerPalette,
  tablerRocket,
} from '@ng-icons/tabler-icons';

export type NavigationMenuPreviewMode =
  | 'basic'
  | 'custom-link'
  | 'custom-styling'
  | 'indicator'
  | 'inspector'
  | 'rtl'
  | 'viewport';

export type NavigationMenuPreviewConfig = {
  mode?: NavigationMenuPreviewMode;
  className?: string;
  style?: string;
};

@Component({
  selector: 'docs-navigation-menu-preview',
  imports: [
    FrNavigationMenuModule,
    NgIcon,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    provideIcons({
      tablerBook,
      tablerBox,
      tablerBrandAngular,
      tablerChevronDown,
      tablerCode,
      tablerComponents,
      tablerPalette,
      tablerRocket,
    }),
  ],
  template: `
    <div [class]="config().className ?? 'flex min-h-72 items-start justify-center'" [style]="config().style ?? null">
      @switch (config().mode ?? 'basic') {
        @case ('custom-link') {
          <nav frNavigationMenu>
            <ul frNavigationMenuList>
              <li frNavigationMenuItem>
                <a frNavigationMenuLink href="/docs" class="frame-navigation-menu__trigger">
                  Documentation
                </a>
              </li>
              <li frNavigationMenuItem>
                <a frNavigationMenuLink active href="/docs/components">
                  Components
                </a>
              </li>
            </ul>
          </nav>
        }

        @case ('viewport') {
          <div class="docs-navigation-menu-stack">
            <nav frNavigationMenu>
              <ul frNavigationMenuList>
                <li frNavigationMenuItem>
                  <button [frNavigationMenuTrigger]="gettingStarted" type="button">
                    Getting started
                    <ng-icon name="tablerChevronDown" size="16" />
                  </button>
                  <ng-template #gettingStarted="frNavigationMenuContent" frNavigationMenuContent>
                    <div frNavigationMenuPanel>
                      <div frNavigationMenuGrid [columns]="2">
                        <a frNavigationMenuLink frNavigationMenuFeature href="/docs/overview">
                          <ng-icon name="tablerBrandAngular" size="22" />
                          <span frNavigationMenuLinkTitle>Angular Components</span>
                          <span frNavigationMenuLinkDescription>
                            Token-first primitives built for modern Angular.
                          </span>
                        </a>
                        <div frNavigationMenuGrid>
                          @for (link of gettingStartedLinks; track link.title) {
                            <a frNavigationMenuLink [href]="link.href">
                              <span frNavigationMenuLinkTitle>{{ link.title }}</span>
                              <span frNavigationMenuLinkDescription>{{ link.description }}</span>
                            </a>
                            @if (link.title === 'Installation') {
                              <div frNavigationLinkSeparator></div>
                            }
                          }
                        </div>
                      </div>
                    </div>
                  </ng-template>
                </li>
                <li frNavigationMenuItem>
                  <button [frNavigationMenuTrigger]="componentsMenu" type="button">
                    Components
                    <ng-icon name="tablerChevronDown" size="16" />
                  </button>
                  <ng-template #componentsMenu="frNavigationMenuContent" frNavigationMenuContent>
                    <div frNavigationMenuPanel>
                      <div frNavigationMenuGrid [columns]="2">
                        @for (link of componentLinks; track link.title) {
                          <a frNavigationMenuLink [href]="link.href">
                            <span frNavigationMenuLinkTitle>{{ link.title }}</span>
                            <span frNavigationMenuLinkDescription>{{ link.description }}</span>
                          </a>
                        }
                      </div>
                    </div>
                  </ng-template>
                </li>
              </ul>
              <div frNavigationMenuIndicator></div>
            </nav>
            <div frNavigationMenuViewport class="docs-navigation-menu-viewport-preview">
              <div frNavigationMenuGrid [columns]="2">
                <a frNavigationMenuLink frNavigationMenuFeature href="/docs/overview">
                  <ng-icon name="tablerBrandAngular" size="22" />
                  <span frNavigationMenuLinkTitle>Viewport preview</span>
                  <span frNavigationMenuLinkDescription>
                    Use the viewport primitive for persistent panel demos or custom layouts.
                  </span>
                </a>
                <div frNavigationMenuGrid>
                  @for (link of gettingStartedLinks; track link.title) {
                    <a frNavigationMenuLink [href]="link.href">
                      <span frNavigationMenuLinkTitle>{{ link.title }}</span>
                      <span frNavigationMenuLinkDescription>{{ link.description }}</span>
                    </a>
                  }
                </div>
              </div>
            </div>
          </div>
        }

        @case ('indicator') {
          <nav frNavigationMenu>
            <ul frNavigationMenuList>
              <li frNavigationMenuItem>
                <button [frNavigationMenuTrigger]="docsMenu" type="button">
                  Docs
                  <ng-icon name="tablerChevronDown" size="16" />
                </button>
                <ng-template #docsMenu="frNavigationMenuContent" frNavigationMenuContent>
                  <div frNavigationMenuPanel>
                    <div frNavigationMenuGrid [columns]="2">
                      @for (link of gettingStartedLinks; track link.title) {
                        <a frNavigationMenuLink [href]="link.href">
                          <span frNavigationMenuLinkTitle>{{ link.title }}</span>
                          <span frNavigationMenuLinkDescription>{{ link.description }}</span>
                        </a>
                      }
                    </div>
                  </div>
                </ng-template>
              </li>
              <li frNavigationMenuItem>
                <a frNavigationMenuLink href="/docs/components">Components</a>
              </li>
              <li frNavigationMenuItem>
                <a frNavigationMenuLink href="/docs/theming">Theming</a>
              </li>
            </ul>
            <div frNavigationMenuIndicator></div>
          </nav>
        }

        @case ('custom-styling') {
          <nav frNavigationMenu class="docs-navigation-menu-custom">
            <ul frNavigationMenuList>
              <li frNavigationMenuItem>
                <button [frNavigationMenuTrigger]="platformMenu" type="button">
                  Platform
                  <ng-icon name="tablerChevronDown" size="16" />
                </button>
                <ng-template #platformMenu="frNavigationMenuContent" frNavigationMenuContent>
                  <div frNavigationMenuPanel>
                    <div frNavigationMenuGrid [columns]="2">
                      @for (link of platformLinks; track link.title) {
                        <a frNavigationMenuLink [href]="link.href">
                          <span frNavigationMenuLinkTitle>{{ link.title }}</span>
                          <span frNavigationMenuLinkDescription>{{ link.description }}</span>
                        </a>
                      }
                    </div>
                  </div>
                </ng-template>
              </li>
              <li frNavigationMenuItem>
                <a frNavigationMenuLink href="/docs/theme-tokens">Tokens</a>
              </li>
              <li frNavigationMenuItem>
                <a frNavigationMenuLink href="/docs/ai-composer">AI Composer</a>
              </li>
            </ul>
          </nav>
        }

        @case ('rtl') {
          <div dir="rtl">
            <nav frNavigationMenu>
              <ul frNavigationMenuList>
                <li frNavigationMenuItem>
                  <button [frNavigationMenuTrigger]="startMenu" type="button">
                    البدء
                    <ng-icon name="tablerChevronDown" size="16" />
                  </button>
                  <ng-template #startMenu="frNavigationMenuContent" frNavigationMenuContent align="end">
                    <div frNavigationMenuPanel>
                      <div frNavigationMenuGrid [columns]="2">
                        <a frNavigationMenuLink href="/docs/overview">
                          <span frNavigationMenuLinkTitle>نظرة عامة</span>
                          <span frNavigationMenuLinkDescription>تعرف على المكتبة ومبادئها.</span>
                        </a>
                        <a frNavigationMenuLink href="/docs/installation">
                          <span frNavigationMenuLinkTitle>التثبيت</span>
                          <span frNavigationMenuLinkDescription>أضف المكونات إلى مشروع Angular.</span>
                        </a>
                      </div>
                    </div>
                  </ng-template>
                </li>
                <li frNavigationMenuItem>
                  <button [frNavigationMenuTrigger]="componentsMenu" type="button">
                    المكونات
                    <ng-icon name="tablerChevronDown" size="16" />
                  </button>
                  <ng-template #componentsMenu="frNavigationMenuContent" frNavigationMenuContent align="end">
                    <div frNavigationMenuPanel>
                      <div frNavigationMenuGrid [columns]="2">
                        <a frNavigationMenuLink href="/docs/components/button">
                          <span frNavigationMenuLinkTitle>زر</span>
                          <span frNavigationMenuLinkDescription>إجراءات بأحجام وحالات متعددة.</span>
                        </a>
                        <a frNavigationMenuLink href="/docs/components/card">
                          <span frNavigationMenuLinkTitle>بطاقة</span>
                          <span frNavigationMenuLinkDescription>سطح محتوى قابل للتركيب.</span>
                        </a>
                      </div>
                    </div>
                  </ng-template>
                </li>
                <li frNavigationMenuItem>
                  <a frNavigationMenuLink href="/docs">الوثائق</a>
                </li>
              </ul>
              <div frNavigationMenuIndicator></div>
            </nav>
          </div>
        }

        @case ('inspector') {
          <div class="docs-navigation-menu-stack" data-token-target="navigation-menu-root">
            <nav frNavigationMenu>
              <ul frNavigationMenuList data-token-target="navigation-menu-list">
                <li frNavigationMenuItem>
                  <button
                    type="button"
                    class="frame-navigation-menu__trigger"
                    data-state="open"
                    data-token-target="navigation-menu-trigger"
                  >
                    Components
                    <ng-icon name="tablerChevronDown" size="16" />
                  </button>
                </li>
                <li frNavigationMenuItem>
                  <a frNavigationMenuLink active href="/docs" data-token-target="navigation-menu-link">
                    Documentation
                  </a>
                </li>
              </ul>
              <div frNavigationMenuIndicator data-token-target="navigation-menu-indicator"></div>
            </nav>

            <div frNavigationMenuViewport data-token-target="navigation-menu-viewport">
              <div class="frame-dropdown-menu__content frame-navigation-menu__content" data-token-target="navigation-menu-panel">
                <div frNavigationMenuGrid [columns]="2" data-token-target="navigation-menu-grid">
                  <a frNavigationMenuLink frNavigationMenuFeature href="/docs/overview" data-token-target="navigation-menu-feature">
                    <ng-icon name="tablerBrandAngular" size="22" />
                    <span frNavigationMenuLinkTitle data-token-target="navigation-menu-link-title">
                      Angular Components
                    </span>
                    <span frNavigationMenuLinkDescription data-token-target="navigation-menu-link-description">
                      Token-first primitives built for modern Angular.
                    </span>
                  </a>
                  <div frNavigationMenuGrid>
                    <a frNavigationMenuLink href="/docs/components/button">
                      <span frNavigationMenuLinkTitle>Button</span>
                      <span frNavigationMenuLinkDescription>Action primitive.</span>
                    </a>
                    <div frNavigationLinkSeparator data-token-target="navigation-menu-link-separator"></div>
                    <a frNavigationMenuLink href="/docs/components/card">
                      <span frNavigationMenuLinkTitle>Card</span>
                      <span frNavigationMenuLinkDescription>Composable surface.</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }

        @default {
          <nav frNavigationMenu>
            <ul frNavigationMenuList>
              <li frNavigationMenuItem>
                <button [frNavigationMenuTrigger]="gettingStarted" type="button">
                  Getting started
                  <ng-icon name="tablerChevronDown" size="16" />
                </button>
                <ng-template #gettingStarted="frNavigationMenuContent" frNavigationMenuContent>
                  <div frNavigationMenuPanel>
                    <div frNavigationMenuGrid [columns]="2">
                      <a frNavigationMenuLink frNavigationMenuFeature href="/docs/overview">
                        <ng-icon name="tablerBrandAngular" size="22" />
                        <span frNavigationMenuLinkTitle>Angular Components</span>
                        <span frNavigationMenuLinkDescription>
                          Token-first primitives built for modern Angular.
                        </span>
                      </a>
                      <div frNavigationMenuGrid>
                        @for (link of gettingStartedLinks; track link.title) {
                          <a frNavigationMenuLink [href]="link.href">
                            <span frNavigationMenuLinkTitle>{{ link.title }}</span>
                            <span frNavigationMenuLinkDescription>{{ link.description }}</span>
                          </a>
                          @if (link.title === 'Installation') {
                            <div frNavigationLinkSeparator></div>
                          }
                        }
                      </div>
                    </div>
                  </div>
                </ng-template>
              </li>

              <li frNavigationMenuItem>
                <button [frNavigationMenuTrigger]="componentsMenu" type="button">
                  Components
                  <ng-icon name="tablerChevronDown" size="16" />
                </button>
                <ng-template #componentsMenu="frNavigationMenuContent" frNavigationMenuContent>
                  <div frNavigationMenuPanel>
                    <div frNavigationMenuGrid [columns]="2">
                      @for (link of componentLinks; track link.title) {
                        <a frNavigationMenuLink [href]="link.href">
                          <span frNavigationMenuLinkTitle>{{ link.title }}</span>
                          <span frNavigationMenuLinkDescription>{{ link.description }}</span>
                        </a>
                      }
                    </div>
                  </div>
                </ng-template>
              </li>

              <li frNavigationMenuItem>
                <a frNavigationMenuLink href="/docs">Docs</a>
              </li>
            </ul>
            <div frNavigationMenuIndicator></div>
          </nav>
        }
      }
    </div>
  `,
  styles: `
    .docs-navigation-menu-stack {
      display: grid;
      gap: 1rem;
      justify-items: center;
      width: min(100%, 42rem);
    }

    .docs-navigation-menu-viewport-preview {
      width: min(100%, 38rem);
      padding: 0.25rem;
    }

    .docs-navigation-menu-custom {
      --frame-navigation-menu-bg: color-mix(in srgb, var(--frame-primary) 8%, transparent);
      --frame-navigation-menu-trigger-hover-bg: color-mix(in srgb, var(--frame-primary) 14%, transparent);
      --frame-navigation-menu-trigger-open-bg: var(--frame-primary);
      --frame-navigation-menu-trigger-open-color: var(--frame-primary-foreground);
      --frame-navigation-menu-link-hover-bg: color-mix(in srgb, var(--frame-primary) 12%, transparent);
      --frame-dropdown-menu-panel-radius: var(--frame-radius-lg);
      --frame-dropdown-menu-panel-shadow: 0 24px 70px color-mix(in srgb, var(--frame-primary) 18%, transparent);
    }
  `,
})
export class DocsNavigationMenuPreviewComponent {
  readonly config = input<NavigationMenuPreviewConfig>({});

  protected readonly gettingStartedLinks = [
    {
      title: 'Introduction',
      description: 'Understand the component library and styling foundation.',
      href: '/docs/overview',
    },
    {
      title: 'Installation',
      description: 'Add the library and configure the shared styles.',
      href: '/docs/installation',
    },
    {
      title: 'Theming',
      description: 'Customize the token layer for your product.',
      href: '/docs/theming',
    },
  ];

  protected readonly componentLinks = [
    {
      title: 'Button',
      description: 'Actions with variants, sizes, loading, and icons.',
      href: '/docs/components/button',
    },
    {
      title: 'Card',
      description: 'Composable surfaces for grouped content.',
      href: '/docs/components/card',
    },
    {
      title: 'Command',
      description: 'Searchable command menus and palettes.',
      href: '/docs/components/command',
    },
    {
      title: 'Navigation Menu',
      description: 'Site navigation with dropdown panels.',
      href: '/docs/components/navigation-menu',
    },
  ];

  protected readonly platformLinks = [
    {
      title: 'Angular CDK',
      description: 'Overlay, menu, focus, and accessibility foundations.',
      href: '/docs/overview',
    },
    {
      title: 'CSS variables',
      description: 'Token-first customization without build-time coupling.',
      href: '/docs/theme-tokens',
    },
    {
      title: 'Components',
      description: 'Reusable primitives for product teams.',
      href: '/docs/components',
    },
    {
      title: 'AI Composer',
      description: 'Prompt-ready metadata for generated examples.',
      href: '/docs/ai-composer',
    },
  ];
}


