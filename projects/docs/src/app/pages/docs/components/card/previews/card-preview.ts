import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { FrBadgeModule } from '@frame-ui/components/badge';
import { FrButtonModule } from '@frame-ui/components/button';
import { FrCardModule, FrCardSpacing } from '@frame-ui/components/card';
import { FrInputModule } from '@frame-ui/components/input';

export type CardPreviewMode =
  | 'basic'
  | 'size'
  | 'spacing'
  | 'image'
  | 'inspector'
  | 'rtl';

export type CardPreviewConfig = {
  mode?: CardPreviewMode;
  className?: string;
  style?: string;
};

@Component({
  selector: 'docs-card-preview',
  imports: [
    FrBadgeModule,
    FrButtonModule,
    FrCardModule,
    FrInputModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      [class]="config().className ?? 'w-full flex justify-center'"
      [style]="config().style ?? null"
    >
      @switch (config().mode ?? 'basic') {
        @case ('size') {
          <section frCard size="sm" class="docs-card-demo" data-token-target="card-root">
            <header frCardHeader>
              <h3 frCardTitle>Small Card</h3>
              <p frCardDescription>This card uses the compact size variant.</p>
              <button frButton appearance="outline" size="sm" type="button" frCardAction>
                Action
              </button>
            </header>
            <div frCardContent>
              <p>The small size reduces the shared spacing token for denser layouts.</p>
            </div>
          </section>
        }

        @case ('spacing') {
          <div class="grid gap-4">
            <div class="docs-card-spacing-controls" aria-label="Card spacing">
              @for (spacing of spacings; track spacing.label) {
                <button
                  (click)="selectedSpacing.set(spacing.value)"
                  [appearance]="selectedSpacing() === spacing.value ? 'primary' : 'outline'"
                  frButton
                  size="sm"
                  type="button"
                >
                  <span frButtonLabel>{{ spacing.label }}</span>
                </button>
              }
            </div>

            <section
              frCard
              [spacing]="selectedSpacing()"
              class="docs-card-demo"
            >
              <header frCardHeader>
                <h3 frCardTitle>Card</h3>
                <p frCardDescription>
                  The selected spacing is applied through the card spacing input.
                </p>
                <button frButton appearance="outline" size="sm" type="button" frCardAction>
                  Sign Up
                </button>
              </header>
              <div frCardContent>
                <label class="docs-card-field">
                  <span>Email</span>
                  <input frInput type="email" />
                </label>
                <label class="docs-card-field">
                  <span>Password</span>
                  <input frInput type="password" />
                </label>
              </div>
              <footer frCardFooter>
                <button frButton type="button">Login</button>
                <button frButton appearance="outline" type="button">Login with Google</button>
              </footer>
            </section>
          </div>
        }

        @case ('image') {
          <section frCard class="docs-card-demo">
            <img class="docs-card-image" [src]="imageSrc" alt="Abstract event cover" />
            <header frCardHeader>
              <span frBadge variant="secondary" class="docs-card-featured">Featured</span>
              <h3 frCardTitle>FrameUIs meetup</h3>
              <p frCardDescription>
                A practical talk on component APIs, accessibility, and shipping faster.
              </p>
            </header>
            <footer frCardFooter>
              <button frButton type="button">View Event</button>
            </footer>
          </section>
        }

        @case ('inspector') {
          <section frCard class="docs-card-demo" data-token-target="card-root">
            <header frCardHeader data-token-target="card-header">
              <h3 frCardTitle data-token-target="card-title">Login to your account</h3>
              <p frCardDescription data-token-target="card-description">
                Enter your email below to login to your account
              </p>
              <button
                frButton
                appearance="outline"
                size="sm"
                type="button"
                frCardAction
                data-token-target="card-action"
              >
                Sign Up
              </button>
            </header>
            <div frCardContent data-token-target="card-content">
              <label class="docs-card-field">
                <span>Email</span>
                <input frInput type="email" value="julia@example.com" />
              </label>
            </div>
            <footer frCardFooter data-token-target="card-footer">
              <button frButton type="button">Login</button>
            </footer>
          </section>
        }

        @case ('rtl') {
          <section frCard class="docs-card-demo" dir="rtl">
            <header frCardHeader>
              <h3 frCardTitle>تسجيل الدخول إلى حسابك</h3>
              <p frCardDescription>أدخل بريدك الإلكتروني أدناه لتسجيل الدخول إلى حسابك</p>
              <button frButton appearance="outline" size="sm" type="button" frCardAction>
                إنشاء حساب
              </button>
            </header>
            <div frCardContent>
              <label class="docs-card-field">
                <span>البريد الإلكتروني</span>
                <input frInput type="email" />
              </label>
              <label class="docs-card-field">
                <span>كلمة المرور</span>
                <input frInput type="password" />
              </label>
            </div>
            <footer frCardFooter>
              <button frButton type="button">تسجيل الدخول</button>
            </footer>
          </section>
        }

        @default {
          <section frCard class="docs-card-demo">
            <header frCardHeader>
              <h3 frCardTitle>Login to your account</h3>
              <p frCardDescription>Enter your email below to login to your account</p>
              <button frButton appearance="outline" size="sm" type="button" frCardAction>
                Sign Up
              </button>
            </header>
            <div frCardContent>
              <label class="docs-card-field">
                <span>Email</span>
                <input frInput type="email" />
              </label>
              <label class="docs-card-field">
                <span>Password</span>
                <input frInput type="password" />
              </label>
            </div>
            <footer frCardFooter>
              <button frButton type="button">Login</button>
              <button frButton appearance="outline" type="button">Login with Google</button>
            </footer>
          </section>
        }
      }
    </div>
  `,
  styles: `
    .docs-card-demo {
      width: min(100%, 24rem);
    }

    .docs-card-field {
      display: grid;
      gap: 0.375rem;
      margin-block-end: 0.875rem;
      font-size: 0.875rem;
      font-weight: 500;
    }

    .docs-card-field:last-child {
      margin-block-end: 0;
    }

    .docs-card-spacing-controls {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      justify-content: center;
    }

    .docs-card-spacing-grid {
      display: grid;
      gap: 1rem;
      width: min(100%, 42rem);
    }

    @media (min-width: 48rem) {
      .docs-card-spacing-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    .docs-card-spacing-card {
      min-width: 0;
    }

    .docs-card-edge-content {
      margin-inline: calc(var(--frame-card-spacing, 1rem) * -1);
      border-block: 1px solid var(--frame-border);
      background: var(--frame-muted);
      padding: var(--frame-card-spacing, 1rem);
    }

    .docs-card-image {
      aspect-ratio: 16 / 9;
      object-fit: cover;
    }

    .docs-card-featured {
      width: fit-content;
      margin-block-end: 0.25rem;
    }
  `,
})
export class DocsCardPreviewComponent {
  readonly config = input<CardPreviewConfig>({});

  readonly imageSrc =
    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 540"%3E%3Cdefs%3E%3ClinearGradient id="a" x1="0" x2="1" y1="0" y2="1"%3E%3Cstop stop-color="%23212529"/%3E%3Cstop offset=".55" stop-color="%237a5c31"/%3E%3Cstop offset="1" stop-color="%23f0c987"/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="960" height="540" fill="url(%23a)"/%3E%3Ccircle cx="760" cy="120" r="180" fill="%23fff" opacity=".18"/%3E%3Cpath d="M120 390c130-160 260-160 390 0s260 160 390 0" fill="none" stroke="%23fff" stroke-width="34" stroke-linecap="round" opacity=".35"/%3E%3C/svg%3E';

  readonly spacings: ReadonlyArray<{ label: string; value: FrCardSpacing }> = [
    { label: '12px', value: 'sm' },
    { label: '16px', value: 'md' },
    { label: '20px', value: 'lg' },
    { label: '32px', value: 'xl' },
  ];

  readonly selectedSpacing = signal<FrCardSpacing>('md');
}

