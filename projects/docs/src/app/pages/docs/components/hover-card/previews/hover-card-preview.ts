import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { provideIcons } from '@ng-icons/core';
import { tablerCalendar, tablerChevronRight, tablerUsers } from '@ng-icons/tabler-icons';
import { NgIcon } from '@ng-icons/core';

import { FrAvatarModule } from '@frame-ui/components/avatar';
import { FrButtonModule } from '@frame-ui/components/button';
import { FrHoverCardModule } from '@frame-ui/components/hover-card';

export type HoverCardPreviewMode = 'basic' | 'custom-delay' | 'custom-styling' | 'inspector' | 'rtl' | 'sides';

export type HoverCardPreviewConfig = {
  mode?: HoverCardPreviewMode;
};

@Component({
  selector: 'docs-hover-card-preview',
  imports: [
    FrAvatarModule,
    FrButtonModule,
    FrHoverCardModule,
    NgIcon,
    TitleCasePipe,
  ],
  providers: [
    provideIcons({
      tablerCalendar,
      tablerChevronRight,
      tablerUsers,
    }),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @switch (config().mode ?? 'basic') {
      @case ('sides') {
        <div class="docs-hover-card-grid">
          @for (side of sides; track side) {
            <frame-hover-card [openDelay]="120" [closeDelay]="120">
              <button frButton appearance="outline" [frHoverCardTrigger]="card" type="button">
                {{ side }}
              </button>

              <ng-template #card="frHoverCardContent" frHoverCardContent [side]="side" align="center" [sideOffset]="16">
                <div frHoverCardPanel>
                  <div class="docs-hover-card-profile">
                    <span frAvatar>
                      <span frAvatarFallback>{{ side.slice(0, 2).toUpperCase() }}</span>
                    </span>
                    <div>
                      <p class="frame-hover-card__title">{{ side | titlecase }} side</p>
                      <p class="frame-hover-card__description">The card prefers the {{ side }} side and falls back when needed.</p>
                    </div>
                  </div>
                </div>
              </ng-template>
            </frame-hover-card>
          }
        </div>
      }

      @case ('custom-delay') {
        <frame-hover-card [openDelay]="120" [closeDelay]="700">
          <button frButton appearance="outline" [frHoverCardTrigger]="card" type="button">Hover slowly</button>

          <ng-template #card="frHoverCardContent" frHoverCardContent side="top" align="center">
            <div frHoverCardPanel>
              <p class="frame-hover-card__title">Calmer timing</p>
              <p class="frame-hover-card__description">
                This card opens quickly and stays available a little longer when the pointer leaves.
              </p>
            </div>
          </ng-template>
        </frame-hover-card>
      }

      @case ('custom-styling') {
        <frame-hover-card [openDelay]="120">
          <button
            frButton
            appearance="outline"
            [frHoverCardTrigger]="card"
            type="button"
            class="docs-hover-card-custom-trigger"
          >
            Hover custom card
          </button>

          <ng-template #card="frHoverCardContent" frHoverCardContent side="right" align="center">
            <div frHoverCardPanel class="docs-hover-card-custom">
              <span class="docs-hover-card-badge">Team</span>
              <p class="frame-hover-card__title">FrameUIs Guild</p>
              <p class="frame-hover-card__description">
                Token overrides can reshape the card without changing the primitive.
              </p>
            </div>
          </ng-template>
        </frame-hover-card>
      }

      @case ('rtl') {
        <div dir="rtl">
          <frame-hover-card [openDelay]="120">
            <button frButton appearance="outline" [frHoverCardTrigger]="card" type="button">
              العربية
            </button>

            <ng-template #card="frHoverCardContent" frHoverCardContent side="bottom" align="end">
              <div frHoverCardPanel>
                <div class="docs-hover-card-profile">
                  <span frAvatar>
                    <span frAvatarFallback>عر</span>
                  </span>
                  <div>
                    <p class="frame-hover-card__title">@angular_ar</p>
                    <p class="frame-hover-card__description">
                      بطاقة تظهر عند التحويم وتدعم اتجاه النص من اليمين إلى اليسار.
                    </p>
                  </div>
                </div>
              </div>
            </ng-template>
          </frame-hover-card>
        </div>
      }

      @case ('inspector') {
        <div class="docs-hover-card-persistent-panel">
          <div class="frame-hover-card__content docs-hover-card-inspector" data-token-target="hover-card-content">
            <div class="docs-hover-card-profile">
              <span frAvatar data-token-target="hover-card-avatar">
                <span frAvatarFallback>FrameUI</span>
              </span>
              <div>
                <p class="frame-hover-card__title" data-token-target="hover-card-title">@FrameUI</p>
                <p class="frame-hover-card__description" data-token-target="hover-card-description">
                  Reusable Angular primitives with token-first styling.
                </p>
                <p class="frame-hover-card__meta" data-token-target="hover-card-meta">
                  <ng-icon name="tablerUsers" size="14" />
                  2,048 contributors
                </p>
              </div>
            </div>
          </div>
        </div>
      }

      @default {
        <frame-hover-card [openDelay]="120">
          <button frButton appearance="ghost" [frHoverCardTrigger]="card" type="button">
            @angular
            <ng-icon name="tablerChevronRight" size="14" />
          </button>

          <ng-template #card="frHoverCardContent" frHoverCardContent side="bottom" align="center">
            <div frHoverCardPanel>
              <div class="docs-hover-card-profile">
                <span frAvatar>
                  <span frAvatarFallback>NG</span>
                </span>
                <div>
                  <p class="frame-hover-card__title">@angular</p>
                  <p class="frame-hover-card__description">
                    The web development framework for building modern applications.
                  </p>
                  <p class="frame-hover-card__meta">
                    <ng-icon name="tablerCalendar" size="14" />
                    Joined January 2010
                  </p>
                </div>
              </div>
            </div>
          </ng-template>
        </frame-hover-card>
      }
    }
  `,
  styles: `
    .docs-hover-card-grid {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 0.75rem;
      padding: 4rem 5rem;
    }

    .docs-hover-card-profile {
      display: flex;
      gap: 0.75rem;
      align-items: flex-start;
    }

    .docs-hover-card-profile p {
      margin: 0;
    }

    .frame-hover-card__meta {
      display: inline-flex;
      align-items: center;
      gap: 0.375rem;
      margin-top: 0.625rem;
    }

    .docs-hover-card-custom-trigger {
      --frame-hover-card-content-width: 18rem;
      --frame-hover-card-content-radius: 1rem;
      --frame-hover-card-content-bg: linear-gradient(135deg, var(--frame-surface), color-mix(in srgb, var(--frame-primary) 10%, var(--frame-surface)));
      --frame-hover-card-content-shadow: 0 24px 70px color-mix(in srgb, var(--frame-primary) 18%, transparent);
      --frame-hover-card-title-color: var(--frame-primary);
    }

    .docs-hover-card-custom {
      overflow: hidden;
    }

    .docs-hover-card-badge {
      width: max-content;
      border-radius: 999px;
      background: color-mix(in srgb, var(--frame-primary) 12%, transparent);
      color: var(--frame-primary);
      font-size: 0.75rem;
      font-weight: 600;
      padding: 0.125rem 0.5rem;
    }

    .docs-hover-card-persistent-panel {
      display: flex;
      justify-content: center;
      width: 100%;
    }
  `,
})
export class DocsHoverCardPreviewComponent {
  readonly config = input<HoverCardPreviewConfig>({});
  protected readonly sides = ['top', 'right', 'bottom', 'left'] as const;
}

