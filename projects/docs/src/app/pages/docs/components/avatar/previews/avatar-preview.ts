import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FrAvatarModule, FrAvatarSize } from '@frame-ui/components/avatar';

export type AvatarPreviewAvatar = {
  alt?: string;
  fallback?: string;
  imageSrc?: string;
  brokenImage?: boolean;
  icon?: string;
  badge?: string;
  size?: FrAvatarSize;
  className?: string;
  style?: string;
  tokenPrefix?: string;
};

export type AvatarPreviewGroup = {
  size?: FrAvatarSize;
  expandOnHover?: boolean;
  countLabel?: string;
  className?: string;
  style?: string;
  tokenPrefix?: string;
  members: AvatarPreviewAvatar[];
};

export type AvatarPreviewConfig = {
  className?: string;
  style?: string;
  avatars?: AvatarPreviewAvatar[];
  group?: AvatarPreviewGroup;
};

export const AVATAR_PREVIEW_IMAGE = "/avatar.jpg";

@Component({
  selector: 'docs-avatar-preview',
  imports: [
    FrAvatarModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="config().className ?? 'grid w-full max-w-2xl gap-6'" [style]="config().style ?? null">
      @if (config().avatars?.length) {
        <div class="flex flex-wrap items-center gap-4">
          @for (avatar of config().avatars!; track avatar.alt ?? avatar.fallback ?? avatar.icon ?? $index) {
            <span
              frAvatar
              [size]="avatar.size ?? 'md'"
              [class]="avatar.className ?? ''"
              [style]="avatar.style ?? null"
              [attr.data-token-target]="tokenTarget(avatar.tokenPrefix, 'root')"
            >
              @if (avatar.imageSrc || avatar.brokenImage) {
                <img
                  frAvatarImage
                  [src]="avatar.brokenImage ? '' : avatar.imageSrc!"
                  [alt]="avatar.alt ?? avatar.fallback ?? 'Avatar'"
                  [attr.data-token-target]="tokenTarget(avatar.tokenPrefix, 'image')"
                />
              }

              @if (avatar.fallback) {
                <span
                  frAvatarFallback
                  [attr.data-token-target]="tokenTarget(avatar.tokenPrefix, 'fallback')"
                >
                  {{ avatar.fallback }}
                </span>
              }

              @if (avatar.icon) {
                <span
                  frAvatarIcon
                  [attr.data-token-target]="tokenTarget(avatar.tokenPrefix, 'icon')"
                >
                  {{ avatar.icon }}
                </span>
              }

              @if (avatar.badge) {
                <span
                  frAvatarBadge
                  [attr.data-token-target]="tokenTarget(avatar.tokenPrefix, 'badge')"
                >
                  {{ avatar.badge }}
                </span>
              }
            </span>
          }
        </div>
      }

      @if (config().group; as group) {
        <div
          frAvatarGroup
          [size]="group.size ?? 'md'"
          [expandOnHover]="group.expandOnHover ?? false"
          [class]="group.className ?? ''"
          [style]="group.style ?? null"
          [attr.data-token-target]="tokenTarget(group.tokenPrefix, 'group')"
        >
          @for (avatar of group.members; track avatar.alt ?? avatar.fallback ?? avatar.icon ?? $index) {
            <span
              frAvatar
              [size]="avatar.size ?? group.size ?? 'md'"
              [class]="avatar.className ?? ''"
              [style]="avatar.style ?? null"
              [attr.data-token-target]="tokenTarget(avatar.tokenPrefix ?? group.tokenPrefix, 'root')"
            >
              @if (avatar.imageSrc || avatar.brokenImage) {
                <img
                  frAvatarImage
                  [src]="avatar.brokenImage ? '' : avatar.imageSrc!"
                  [alt]="avatar.alt ?? avatar.fallback ?? 'Avatar'"
                  [attr.data-token-target]="tokenTarget(avatar.tokenPrefix ?? group.tokenPrefix, 'image')"
                />
              }

              @if (avatar.fallback) {
                <span
                  frAvatarFallback
                  [attr.data-token-target]="tokenTarget(avatar.tokenPrefix ?? group.tokenPrefix, 'fallback')"
                >
                  {{ avatar.fallback }}
                </span>
              }

              @if (avatar.icon) {
                <span
                  frAvatarIcon
                  [attr.data-token-target]="tokenTarget(avatar.tokenPrefix ?? group.tokenPrefix, 'icon')"
                >
                  {{ avatar.icon }}
                </span>
              }
            </span>
          }

          @if (group.countLabel) {
            <span
              frAvatarGroupCount
              [attr.data-token-target]="tokenTarget(group.tokenPrefix, 'count')"
            >
              {{ group.countLabel }}
            </span>
          }
        </div>
      }
    </div>
  `,
})
export class DocsAvatarPreviewComponent {
  readonly config = input.required<AvatarPreviewConfig>();

  protected tokenTarget(prefix: string | undefined, key: string): string {
    return prefix ? `${prefix}-${key}` : key;
  }
}

