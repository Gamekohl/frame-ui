import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { FrBadgeModule } from '@frame-ui/components/badge';
import { FrButtonModule } from '@frame-ui/components/button';
import { FrCollapsibleModule } from '@frame-ui/components/collapsible';
import { FrSidebarModule } from '@frame-ui/components/sidebar';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  tablerBell,
  tablerChevronDown,
  tablerDots,
  tablerFolder,
  tablerHome,
  tablerLayoutSidebar,
  tablerPlus,
  tablerSearch,
  tablerSettings,
  tablerSparkles,
  tablerUsers,
} from '@ng-icons/tabler-icons';

export type SidebarPreviewMode =
  | 'basic'
  | 'controlled'
  | 'custom-styling'
  | 'floating'
  | 'icon'
  | 'inset'
  | 'inspector'
  | 'menu'
  | 'right'
  | 'rtl'
  | 'scrollable'
  | 'skeleton';

export type SidebarPreviewConfig = {
  mode: SidebarPreviewMode;
};

@Component({
  selector: 'docs-sidebar-preview',
  imports: [
    FrBadgeModule,
    FrButtonModule,
    FrCollapsibleModule,
    FrSidebarModule,
    NgIcon,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    provideIcons({
      tablerBell,
      tablerChevronDown,
      tablerDots,
      tablerFolder,
      tablerHome,
      tablerLayoutSidebar,
      tablerPlus,
      tablerSearch,
      tablerSettings,
      tablerSparkles,
      tablerUsers,
    }),
  ],
  template: `
    <div class="docs-sidebar-frame" [class.docs-sidebar-frame--compact]="isCompactMode()">
      <div
        frSidebarProvider
        class="docs-sidebar-shell"
        [class.docs-sidebar-shell--custom]="mode() === 'custom-styling'"
        [defaultOpen]="mode() !== 'icon'"
        [open]="mode() === 'controlled' ? controlledOpen() : null"
        (openChange)="handleOpenChange($event)"
        data-token-target="sidebar-provider"
      >
        <aside
          frSidebar
          [side]="mode() === 'right' || mode() === 'rtl' ? 'right' : 'left'"
          [variant]="variant()"
          [collapsible]="collapsible()"
          [attr.dir]="mode() === 'rtl' ? 'rtl' : null"
          data-token-target="sidebar-root"
        >
          <div frSidebarHeader data-token-target="sidebar-header">
            <a frSidebarMenuButton size="lg" href="#" data-token-target="sidebar-menu-button">
              <ng-icon name="tablerSparkles" size="18" />
              <span>Atlas Studio</span>
            </a>
          </div>

          <div frSidebarContent data-token-target="sidebar-content">
            @if (mode() === 'skeleton') {
              <div frSidebarGroup>
                <div frSidebarGroupLabel>Loading</div>
                <ul frSidebarMenu>
                  @for (item of skeletonRows; track item.width) {
                    <li frSidebarMenuItem>
                      <div frSidebarMenuSkeleton [showIcon]="item.icon" [width]="item.width"></div>
                    </li>
                  }
                </ul>
              </div>
            } @else {
              <div frSidebarGroup data-token-target="sidebar-group">
                <div frSidebarGroupLabel data-token-target="sidebar-group-label">Workspace</div>
                <button frSidebarGroupAction type="button" aria-label="Create project">
                  <ng-icon name="tablerPlus" size="15" />
                </button>
                <div frSidebarGroupContent>
                  <ul frSidebarMenu data-token-target="sidebar-menu">
                    @for (item of visibleNavItems(); track item.label) {
                      <li frSidebarMenuItem data-token-target="sidebar-menu-item">
                        <a
                          frSidebarMenuButton
                          [active]="item.active"
                          [href]="item.href"
                          [attr.data-token-target]="item.active ? 'sidebar-active-button' : null"
                        >
                          <ng-icon [name]="item.icon" size="17" />
                          <span>{{ item.label }}</span>
                        </a>
                        @if (item.badge) {
                          <span frSidebarMenuBadge data-token-target="sidebar-menu-badge">{{ item.badge }}</span>
                        }
                        @if (item.action) {
                          <button frSidebarMenuAction showOnHover type="button" aria-label="More options">
                            <ng-icon name="tablerDots" size="15" />
                          </button>
                        }
                      </li>
                    }
                  </ul>
                </div>
              </div>

              @if (mode() === 'menu' || mode() === 'inspector') {
                <div frSidebarGroup>
                  <div frCollapsible defaultOpen>
                    <button frSidebarGroupLabel frCollapsibleTrigger type="button">
                      Teams
                      <ng-icon name="tablerChevronDown" size="14" />
                    </button>
                    <div frCollapsibleContent>
                      <ul frSidebarMenuSub data-token-target="sidebar-menu-sub">
                        <li frSidebarMenuSubItem>
                          <a frSidebarMenuSubButton active href="#" data-token-target="sidebar-menu-sub-button">
                            FrameUIs
                          </a>
                        </li>
                        <li frSidebarMenuSubItem>
                          <a frSidebarMenuSubButton href="#">Platform</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              }
            }
          </div>

          <div frSidebarFooter data-token-target="sidebar-footer">
            <a frSidebarMenuButton variant="outline" href="#">
              <ng-icon name="tablerSettings" size="17" />
              <span>Settings</span>
            </a>
          </div>

          <div frSidebarRail data-token-target="sidebar-rail"></div>
        </aside>

        <main frSidebarInset class="docs-sidebar-main" data-token-target="sidebar-inset">
          <div class="docs-sidebar-toolbar">
            <button frSidebarTrigger type="button" aria-label="Toggle sidebar" data-token-target="sidebar-trigger">
              <ng-icon name="tablerLayoutSidebar" size="17" />
            </button>
            @if (mode() === 'controlled') {
              <button frButton appearance="outline" type="button" (click)="controlledOpen.set(!controlledOpen())">
                <span frButtonLabel>{{ controlledOpen() ? 'Collapse' : 'Expand' }}</span>
              </button>
            }
            @if (mode() === 'icon') {
              <span frBadge>Icon collapse</span>
            }
          </div>

          <section class="docs-sidebar-card">
            <p class="docs-sidebar-eyebrow">{{ title() }}</p>
            <h3>{{ heading() }}</h3>
            <p>{{ description() }}</p>
          </section>
        </main>
      </div>
    </div>
  `,
  styles: `
    .docs-sidebar-frame {
      width: min(100%, 56rem);
      height: 28rem;
      margin-inline: auto;
      overflow: hidden;
      border: 1px solid var(--frame-border);
      border-radius: var(--frame-radius-lg);
      background: var(--frame-background);
    }

    .docs-sidebar-frame--compact {
      width: min(100%, 46rem);
    }

    .docs-sidebar-shell {
      height: 100%;
    }

    .docs-sidebar-shell--custom {
      --frame-sidebar-bg: color-mix(in srgb, var(--frame-primary) 8%, var(--frame-background));
      --frame-sidebar-accent: color-mix(in srgb, var(--frame-primary) 14%, var(--frame-background));
      --frame-sidebar-primary: var(--frame-primary);
      --frame-sidebar-border: color-mix(in srgb, var(--frame-primary) 28%, var(--frame-border));
      --frame-sidebar-radius: 1.25rem;
      --frame-sidebar-shadow: 0 24px 80px color-mix(in srgb, var(--frame-primary) 20%, transparent);
    }

    .docs-sidebar-main {
      display: grid;
      align-content: start;
      gap: 1rem;
      min-height: 0;
      padding: 1rem;
      background:
        radial-gradient(circle at top right, color-mix(in srgb, var(--frame-primary) 8%, transparent), transparent 32%),
        var(--frame-background);
    }

    .docs-sidebar-toolbar {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .docs-sidebar-card {
      display: grid;
      gap: 0.5rem;
      max-width: 30rem;
      padding: 1rem;
      border: 1px solid var(--frame-border);
      border-radius: var(--frame-radius-lg);
      background: var(--frame-surface);
      box-shadow: 0 16px 40px rgb(0 0 0 / 0.06);
    }

    .docs-sidebar-card h3,
    .docs-sidebar-card p {
      margin: 0;
    }

    .docs-sidebar-card h3 {
      font-size: 1.125rem;
      font-weight: 700;
    }

    .docs-sidebar-card p:not(.docs-sidebar-eyebrow) {
      color: var(--frame-muted-foreground);
      font-size: 0.875rem;
      line-height: 1.6;
    }

    .docs-sidebar-eyebrow {
      color: var(--frame-muted-foreground);
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }
  `,
})
export class DocsSidebarPreviewComponent {
  readonly config = input.required<SidebarPreviewConfig>();
  protected readonly controlledOpen = signal(true);

  protected readonly navItems = [
    { label: 'Dashboard', href: '#', icon: 'tablerHome', active: true, badge: null, action: false },
    { label: 'Search', href: '#', icon: 'tablerSearch', active: false, badge: null, action: false },
    { label: 'Projects', href: '#', icon: 'tablerFolder', active: false, badge: '12', action: true },
    { label: 'Members', href: '#', icon: 'tablerUsers', active: false, badge: null, action: false },
    { label: 'Alerts', href: '#', icon: 'tablerBell', active: false, badge: '3', action: true },
  ];

  protected readonly scrollableNavItems = [
    { label: 'Dashboard', href: '#', icon: 'tablerHome', active: true, badge: null, action: false },
    { label: 'Search', href: '#', icon: 'tablerSearch', active: false, badge: null, action: false },
    { label: 'Projects', href: '#', icon: 'tablerFolder', active: false, badge: '12', action: true },
    { label: 'Members', href: '#', icon: 'tablerUsers', active: false, badge: null, action: false },
    { label: 'Alerts', href: '#', icon: 'tablerBell', active: false, badge: '3', action: true },
    { label: 'Roadmap', href: '#', icon: 'tablerSparkles', active: false, badge: null, action: false },
    { label: 'Assets', href: '#', icon: 'tablerFolder', active: false, badge: '28', action: true },
    { label: 'Experiments', href: '#', icon: 'tablerSparkles', active: false, badge: null, action: false },
    { label: 'Billing', href: '#', icon: 'tablerSettings', active: false, badge: null, action: false },
    { label: 'Audit log', href: '#', icon: 'tablerSearch', active: false, badge: null, action: false },
    { label: 'Integrations', href: '#', icon: 'tablerPlus', active: false, badge: null, action: true },
    { label: 'Archive', href: '#', icon: 'tablerFolder', active: false, badge: null, action: false },
  ];

  protected readonly skeletonRows = [
    { icon: true, width: '68%' },
    { icon: true, width: '52%' },
    { icon: true, width: '76%' },
    { icon: true, width: '44%' },
  ];

  protected mode(): SidebarPreviewMode {
    return this.config().mode;
  }

  protected variant(): 'sidebar' | 'floating' | 'inset' {
    if (this.mode() === 'floating' || this.mode() === 'custom-styling') {
      return 'floating';
    }

    if (this.mode() === 'inset') {
      return 'inset';
    }

    return 'sidebar';
  }

  protected collapsible(): 'offcanvas' | 'icon' | 'none' {
    if (this.mode() === 'icon') {
      return 'icon';
    }

    if (this.mode() === 'right' || this.mode() === 'rtl') {
      return 'none';
    }

    return 'offcanvas';
  }

  protected isCompactMode(): boolean {
    return this.mode() === 'icon' || this.mode() === 'skeleton';
  }

  protected visibleNavItems() {
    return this.mode() === 'scrollable' ? this.scrollableNavItems : this.navItems;
  }

  protected handleOpenChange(open: boolean): void {
    if (this.mode() === 'controlled') {
      this.controlledOpen.set(open);
    }
  }

  protected title(): string {
    if (this.mode() === 'controlled') {
      return 'Controlled';
    }

    if (this.mode() === 'icon') {
      return 'Collapsible';
    }

    return 'Application shell';
  }

  protected heading(): string {
    if (this.mode() === 'right') {
      return 'Right-aligned sidebar';
    }

    if (this.mode() === 'rtl') {
      return 'RTL-ready navigation';
    }

    if (this.mode() === 'skeleton') {
      return 'Loading menu state';
    }

    if (this.mode() === 'scrollable') {
      return 'Scrollable navigation content';
    }

    return 'Composable sidebar layout';
  }

  protected description(): string {
    if (this.mode() === 'menu') {
      return 'Menu buttons, badges, actions, and submenus compose inside grouped sidebar sections.';
    }

    if (this.mode() === 'controlled') {
      return 'Bind the provider open input and respond to openChange when parent state should own the sidebar.';
    }

    if (this.mode() === 'scrollable') {
      return 'The sidebar keeps its header and footer fixed while the content region scrolls independently.';
    }

    return 'Use the provider to coordinate trigger, rail, sidebar state, and the surrounding inset content.';
  }
}

