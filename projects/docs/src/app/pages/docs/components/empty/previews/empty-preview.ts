import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FrAvatarModule } from '@frame-ui-ng/components/avatar';
import { FrButtonModule } from '@frame-ui-ng/components/button';
import { FrEmptyModule } from '@frame-ui-ng/components/empty';
import { FrInputModule } from '@frame-ui-ng/components/input';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  tablerArrowUpRight,
  tablerBell,
  tablerCloud,
  tablerFolderCode,
  tablerPlus,
  tablerRefresh,
  tablerSearch,
} from '@ng-icons/tabler-icons';

export type EmptyPreviewMode =
  | 'avatar'
  | 'avatar-group'
  | 'background'
  | 'basic'
  | 'input-group'
  | 'inspector'
  | 'outline'
  | 'rtl';

export type EmptyPreviewConfig = {
  mode?: EmptyPreviewMode;
  className?: string;
  style?: string;
};

@Component({
  selector: 'docs-empty-preview',
  imports: [
    FrAvatarModule,
    FrButtonModule,
    FrEmptyModule,
    FrInputModule,
    NgIcon,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    provideIcons({
      tablerArrowUpRight,
      tablerBell,
      tablerCloud,
      tablerFolderCode,
      tablerPlus,
      tablerRefresh,
      tablerSearch,
    }),
  ],
  template: `
    <div [class]="config().className ?? 'w-full'" [style]="config().style ?? null">
      @switch (config().mode ?? 'basic') {
        @case ('outline') {
          <div frEmpty variant="outline">
            <div frEmptyHeader>
              <div frEmptyMedia variant="icon">
                <ng-icon name="tablerCloud" />
              </div>
              <h3 frEmptyTitle>Cloud Storage Empty</h3>
              <p frEmptyDescription>Upload files to your cloud storage to access them anywhere.</p>
            </div>
            <div frEmptyContent>
              <button frButton type="button">Upload Files</button>
            </div>
          </div>
        }

        @case ('background') {
          <div
            frEmpty
            variant="soft"
            style="--frame-empty-soft-bg: linear-gradient(135deg, color-mix(in srgb, var(--frame-primary) 10%, transparent), var(--frame-muted));"
          >
            <div frEmptyHeader>
              <div frEmptyMedia variant="icon">
                <ng-icon name="tablerBell" />
              </div>
              <h3 frEmptyTitle>No Notifications</h3>
              <p frEmptyDescription>You're all caught up. New notifications will appear here.</p>
            </div>
            <div frEmptyContent>
              <button frButton appearance="outline" type="button">
                <ng-icon frButtonIcon name="tablerRefresh" size="16" />
                Refresh
              </button>
            </div>
          </div>
        }

        @case ('avatar') {
          <div frEmpty variant="outline">
            <div frEmptyHeader>
              <div frEmptyMedia>
                <span frAvatar>
                  <span frAvatarFallback>LR</span>
                </span>
              </div>
              <h3 frEmptyTitle>User Offline</h3>
              <p frEmptyDescription>This user is currently offline. You can leave a message or try again later.</p>
            </div>
            <div frEmptyContent>
              <button frButton type="button">Leave Message</button>
            </div>
          </div>
        }

        @case ('avatar-group') {
          <div frEmpty variant="outline">
            <div frEmptyHeader>
              <div frEmptyMedia>
                <div frAvatarGroup size="sm">
                  <span frAvatar><span frAvatarFallback>CN</span></span>
                  <span frAvatar><span frAvatarFallback>LR</span></span>
                  <span frAvatar><span frAvatarFallback>ER</span></span>
                </div>
              </div>
              <h3 frEmptyTitle>No Team Members</h3>
              <p frEmptyDescription>Invite your team to collaborate on this project.</p>
            </div>
            <div frEmptyContent>
              <button frButton type="button">
                <ng-icon frButtonIcon name="tablerPlus" size="16" />
                Invite Members
              </button>
            </div>
          </div>
        }

        @case ('input-group') {
          <div frEmpty variant="outline">
            <div frEmptyHeader>
              <div frEmptyMedia variant="icon">
                <ng-icon name="tablerSearch" />
              </div>
              <h3 frEmptyTitle>404 - Not Found</h3>
              <p frEmptyDescription>The page you're looking for doesn't exist. Try searching below.</p>
            </div>
            <div frEmptyContent class="w-full max-w-sm">
              <input frInput placeholder="/" />
            </div>
            <a class="text-sm font-medium text-muted-foreground underline-offset-4 hover:underline" href="#">
              Need help? Contact support
            </a>
          </div>
        }

        @case ('rtl') {
          <div dir="rtl">
            <div frEmpty variant="outline">
              <div frEmptyHeader>
                <div frEmptyMedia variant="icon">
                  <ng-icon name="tablerFolderCode" />
                </div>
                <h3 frEmptyTitle>لا توجد مشاريع بعد</h3>
                <p frEmptyDescription>لم تقم بإنشاء أي مشاريع بعد. ابدأ بإنشاء مشروعك الأول.</p>
              </div>
              <div frEmptyContent>
                <button frButton type="button">إنشاء مشروع</button>
                <button frButton appearance="outline" type="button">استيراد مشروع</button>
              </div>
              <a class="text-sm font-medium text-muted-foreground underline-offset-4 hover:underline" href="#">
                تعرف على المزيد
              </a>
            </div>
          </div>
        }

        @case ('inspector') {
          <div frEmpty variant="outline" class="docs-empty-inspector">
            <div frEmptyHeader data-token-target="empty-header">
              <div frEmptyMedia variant="icon" data-token-target="empty-media">
                <ng-icon name="tablerFolderCode" />
              </div>
              <h3 frEmptyTitle data-token-target="empty-title">No Projects Yet</h3>
              <p frEmptyDescription data-token-target="empty-description">
                You haven't created any projects yet. Get started by creating your first project.
              </p>
            </div>
            <div frEmptyContent data-token-target="empty-content">
              <button frButton type="button">Create Project</button>
              <button frButton appearance="outline" type="button">Import Project</button>
            </div>
          </div>
        }

        @default {
          <div frEmpty>
            <div frEmptyHeader>
              <div frEmptyMedia variant="icon">
                <ng-icon name="tablerFolderCode" />
              </div>
              <h3 frEmptyTitle>No Projects Yet</h3>
              <p frEmptyDescription>
                You haven't created any projects yet. Get started by creating your first project.
              </p>
            </div>
            <div frEmptyContent>
              <button frButton type="button">Create Project</button>
              <button frButton appearance="outline" type="button">Import Project</button>
            </div>
            <a class="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground underline-offset-4 hover:underline" href="#">
              Learn More
              <ng-icon name="tablerArrowUpRight" size="14" />
            </a>
          </div>
        }
      }
    </div>
  `,
})
export class DocsEmptyPreviewComponent {
  readonly config = input<EmptyPreviewConfig>({});
}

