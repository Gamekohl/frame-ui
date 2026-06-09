import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FrAvatarModule } from '@frame-ui-ng/components/avatar';
import { FrBadgeModule } from '@frame-ui-ng/components/badge';
import { FrButtonModule } from '@frame-ui-ng/components/button';
import { FrItemModule } from '@frame-ui-ng/components/item';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  tablerArrowRight,
  tablerBell,
  tablerCalendar,
  tablerChevronRight,
  tablerCode,
  tablerDots,
  tablerFileText,
  tablerFolder,
  tablerPalette,
  tablerSettings,
  tablerUser,
} from '@ng-icons/tabler-icons';

export type ItemPreviewMode =
  | 'actions'
  | 'avatar'
  | 'basic'
  | 'group'
  | 'inspector'
  | 'link'
  | 'media'
  | 'rtl'
  | 'sizes'
  | 'variants';

export type ItemPreviewConfig = {
  mode?: ItemPreviewMode;
  className?: string;
  style?: string;
};

@Component({
  selector: 'docs-item-preview',
  imports: [
    FrAvatarModule,
    FrBadgeModule,
    FrButtonModule,
    FrItemModule,
    NgIcon,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    provideIcons({
      tablerArrowRight,
      tablerBell,
      tablerCalendar,
      tablerChevronRight,
      tablerCode,
      tablerDots,
      tablerFileText,
      tablerFolder,
      tablerPalette,
      tablerSettings,
      tablerUser,
    }),
  ],
  template: `
    <div
      [class]="config().className ?? 'w-full flex justify-center'"
      [style]="config().style ?? null"
    >
      @switch (config().mode ?? 'basic') {
        @case ('group') {
          <div frItemGroup class="docs-item-demo">
            <div frItem interactive>
              <span frItemMedia variant="icon">
                <ng-icon name="tablerFileText" />
              </span>
              <span frItemContent>
                <span frItemTitle>Documentation</span>
                <span frItemDescription>Read setup guides and API reference.</span>
              </span>
              <span frItemActions>
                <ng-icon name="tablerChevronRight" size="16" />
              </span>
            </div>
            <div frItemSeparator></div>
            <div frItem interactive>
              <span frItemMedia variant="icon">
                <ng-icon name="tablerCode" />
              </span>
              <span frItemContent>
                <span frItemTitle>Examples</span>
                <span frItemDescription>Copy working patterns into your app.</span>
              </span>
              <span frItemActions>
                <ng-icon name="tablerChevronRight" size="16" />
              </span>
            </div>
          </div>
        }

        @case ('link') {
          <a frItem interactive variant="outline" class="docs-item-demo" href="/docs/components/item">
            <span frItemMedia variant="icon">
              <ng-icon name="tablerArrowRight" />
            </span>
            <span frItemContent>
              <span frItemTitle>Open component docs</span>
              <span frItemDescription>Items can be anchors when the whole row navigates.</span>
            </span>
            <span frItemActions>
              <ng-icon name="tablerChevronRight" size="16" />
            </span>
          </a>
        }

        @case ('variants') {
          <div class="docs-item-stack">
            <div frItem>
              <span frItemMedia variant="icon"><ng-icon name="tablerFileText" /></span>
              <span frItemContent>
                <span frItemTitle>Default</span>
                <span frItemDescription>Transparent by default for quiet layouts.</span>
              </span>
            </div>
            <div frItem variant="outline">
              <span frItemMedia variant="icon"><ng-icon name="tablerFolder" /></span>
              <span frItemContent>
                <span frItemTitle>Outline</span>
                <span frItemDescription>Adds a border for standalone rows.</span>
              </span>
            </div>
            <div frItem variant="muted">
              <span frItemMedia variant="icon"><ng-icon name="tablerPalette" /></span>
              <span frItemContent>
                <span frItemTitle>Muted</span>
                <span frItemDescription>Uses a soft background for subtle emphasis.</span>
              </span>
            </div>
          </div>
        }

        @case ('sizes') {
          <div class="docs-item-stack">
            @for (size of sizes; track size) {
              <div frItem variant="outline" [size]="size">
                <span frItemMedia variant="icon"><ng-icon name="tablerBell" /></span>
                <span frItemContent>
                  <span frItemTitle>{{ size === 'default' ? 'Default' : size.toUpperCase() }}</span>
                  <span frItemDescription>Use this density for {{ size }} item layouts.</span>
                </span>
              </div>
            }
          </div>
        }

        @case ('media') {
          <div class="docs-item-stack">
            <div frItem variant="outline">
              <span frItemMedia variant="icon"><ng-icon name="tablerCalendar" /></span>
              <span frItemContent>
                <span frItemTitle>Icon media</span>
                <span frItemDescription>Use icons for compact semantic hints.</span>
              </span>
            </div>
            <div frItem variant="outline">
              <span frItemMedia variant="image">
                <img [src]="imageSrc" alt="Abstract gradient" />
              </span>
              <span frItemContent>
                <span frItemTitle>Image media</span>
                <span frItemDescription>Use images for visual previews.</span>
              </span>
            </div>
          </div>
        }

        @case ('avatar') {
          <div frItem variant="outline" class="docs-item-demo">
            <span frItemMedia variant="avatar">
              <span frAvatar>
                <span frAvatarFallback>JD</span>
              </span>
            </span>
            <span frItemContent>
              <span frItemTitle>Julia Designer</span>
              <span frItemDescription>Product designer, FrameUIs</span>
            </span>
            <span frItemActions>
              <span frBadge variant="secondary">Online</span>
            </span>
          </div>
        }

        @case ('actions') {
          <div frItem variant="outline" class="docs-item-demo">
            <span frItemMedia variant="icon">
              <ng-icon name="tablerSettings" />
            </span>
            <span frItemContent>
              <span frItemTitle>Notification settings</span>
              <span frItemDescription>Choose how this workspace keeps you updated.</span>
            </span>
            <span frItemActions>
              <button frButton appearance="ghost" size="sm" type="button" aria-label="More options">
                <ng-icon frButtonIcon name="tablerDots" size="18" />
              </button>
            </span>
          </div>
        }

        @case ('rtl') {
          <div dir="rtl" class="docs-item-demo">
            <div frItem variant="outline">
              <span frItemMedia variant="icon">
                <ng-icon name="tablerUser" />
              </span>
              <span frItemContent>
                <span frItemTitle>ملف المستخدم</span>
                <span frItemDescription>العناصر تستخدم خصائص منطقية لدعم الاتجاه.</span>
              </span>
              <span frItemActions>
                <button frButton appearance="outline" size="sm" type="button">فتح</button>
              </span>
            </div>
          </div>
        }

        @case ('inspector') {
          <div frItemGroup class="docs-item-demo" data-token-target="item-group">
            <div frItem interactive variant="outline" data-token-target="item-root">
              <span frItemMedia variant="icon" data-token-target="item-media">
                <ng-icon name="tablerFileText" />
              </span>
              <span frItemContent data-token-target="item-content">
                <span frItemHeader data-token-target="item-header">
                  <span frItemTitle data-token-target="item-title">Design tokens</span>
                  <span frItemDescription data-token-target="item-description">
                    Inspect the root, media, content, title, description, and actions.
                  </span>
                </span>
                <span frItemFooter data-token-target="item-footer">Updated today</span>
              </span>
              <span frItemActions data-token-target="item-actions">
                <span frBadge variant="secondary">Stable</span>
              </span>
            </div>
            <div frItemSeparator data-token-target="item-separator"></div>
            <div frItem size="sm">
              <span frItemContent>
                <span frItemTitle>Secondary row</span>
                <span frItemDescription>Grouped items share the same surface.</span>
              </span>
            </div>
          </div>
        }

        @default {
          <div frItem variant="outline" class="docs-item-demo">
            <span frItemMedia variant="icon">
              <ng-icon name="tablerFileText" />
            </span>
            <span frItemContent>
              <span frItemTitle>Component documentation</span>
              <span frItemDescription>
                Build rows with media, content, descriptions, and actions.
              </span>
            </span>
            <span frItemActions>
              <button frButton appearance="outline" size="sm" type="button">Open</button>
            </span>
          </div>
        }
      }
    </div>
  `,
  styles: `
    .docs-item-demo {
      width: min(100%, 32rem);
    }

    .docs-item-stack {
      display: grid;
      gap: 0.75rem;
      width: min(100%, 32rem);
    }
  `,
})
export class DocsItemPreviewComponent {
  readonly config = input<ItemPreviewConfig>({});

  protected readonly sizes = ['default', 'sm', 'xs'] as const;

  protected readonly imageSrc =
    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"%3E%3Cdefs%3E%3ClinearGradient id="a" x1="0" x2="1" y1="0" y2="1"%3E%3Cstop stop-color="%23212529"/%3E%3Cstop offset=".55" stop-color="%23956f3f"/%3E%3Cstop offset="1" stop-color="%23f0c987"/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="120" height="120" rx="24" fill="url(%23a)"/%3E%3Ccircle cx="84" cy="36" r="22" fill="%23fff" opacity=".22"/%3E%3Cpath d="M20 82c18-24 38-24 58 0s32 24 44 6" fill="none" stroke="%23fff" stroke-width="8" stroke-linecap="round" opacity=".42"/%3E%3C/svg%3E';
}

