import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  tablerBrandGithub,
  tablerBuilding,
  tablerKey,
  tablerLock,
  tablerMail,
  tablerShieldCheck,
  tablerSparkles,
  tablerUsers,
} from '@ng-icons/tabler-icons';
import {
  FrButton,
  FrButtonIcon,
  FrButtonLabel,
  FrCard,
  FrCardContent,
  FrCheckbox,
  FrCheckboxField,
  FrCheckboxLabel,
  FrField,
  FrFieldContent,
  FrFieldDescription,
  FrFieldLabel,
  FrInput,
  FrInputGroup,
  FrInputGroupAddon,
  FrInputGroupInput,
  FrInputOtp,
  FrInputOtpGroup,
  FrInputOtpSeparator,
  FrInputOtpSlot,
  FrSeparator,
} from '@frame-ui-ng/components';

export type AuthBlockVariant = 'invite' | 'login' | 'password-reset' | 'signup' | 'two-factor';
type AuthBlockPreviewDevice = 'desktop' | 'mobile';

@Component({
  selector: 'blocks-auth-preview',
  imports: [
    FrButton,
    FrButtonIcon,
    FrButtonLabel,
    FrCard,
    FrCardContent,
    FrCheckbox,
    FrCheckboxField,
    FrCheckboxLabel,
    FrField,
    FrFieldContent,
    FrFieldDescription,
    FrFieldLabel,
    FrInput,
    FrInputGroup,
    FrInputGroupAddon,
    FrInputGroupInput,
    FrInputOtp,
    FrInputOtpGroup,
    FrInputOtpSeparator,
    FrInputOtpSlot,
    FrSeparator,
    NgClass,
    NgIcon,
    ReactiveFormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block min-h-full',
  },
  viewProviders: [
    provideIcons({
      tablerBrandGithub,
      tablerBuilding,
      tablerKey,
      tablerLock,
      tablerMail,
      tablerShieldCheck,
      tablerSparkles,
      tablerUsers,
    }),
  ],
  template: `
    <div class="grid min-h-96 place-items-center bg-muted p-4 md:p-8">
      @switch (variant()) {
        @case ('signup') {
          <section frCard spacing="xl" class="w-full max-w-xl bg-surface/95">
            <div frCardContent class="grid gap-6">
              <div class="grid gap-1">
                <p class="font-mono text-xs font-extrabold uppercase tracking-wider text-primary">Start free</p>
                <h2 class="m-0 text-2xl font-bold leading-tight">Create your account</h2>
                <p class="m-0 text-sm leading-6 text-muted-foreground">Invite your team after the workspace is ready.</p>
              </div>

              <form class="grid gap-4" (submit)="$event.preventDefault()">
                <button frButton appearance="outline" type="button" class="w-full">
                  <ng-icon name="tablerBrandGithub" size="16" frButtonIcon />
                  <span frButtonLabel>Continue with GitHub</span>
                </button>

                <div class="flex items-center gap-3 text-xs font-bold uppercase text-muted-foreground">
                  <span class="flex-1" frSeparator></span>
                  <span>or</span>
                  <span class="flex-1" frSeparator></span>
                </div>

                <div class="grid gap-4 md:grid-cols-2">
                  <div frField>
                    <label frFieldLabel for="first-name">First name</label>
                    <div frFieldContent>
                      <input frInput id="first-name" autocomplete="given-name" [formControl]="firstName" />
                    </div>
                  </div>

                  <div frField>
                    <label frFieldLabel for="last-name">Last name</label>
                    <div frFieldContent>
                      <input frInput id="last-name" autocomplete="family-name" [formControl]="lastName" />
                    </div>
                  </div>
                </div>

                <div frField>
                  <label frFieldLabel for="signup-email">Work email</label>
                  <div frFieldContent>
                    <input frInput id="signup-email" type="email" autocomplete="email" [formControl]="signupEmail" />
                  </div>
                </div>

                <label frCheckboxField>
                  <input frCheckbox type="checkbox" [formControl]="acceptedTerms" />
                  <span frCheckboxLabel>I agree to the Terms and Data Processing Addendum.</span>
                </label>

                <button frButton type="submit" class="w-full">
                  <span frButtonLabel>Create workspace</span>
                </button>
              </form>
            </div>
          </section>
        }

        @case ('password-reset') {
          <section frCard spacing="xl" class="w-full max-w-md bg-surface/95">
            <div frCardContent class="grid gap-6">
              <div class="grid size-11 place-items-center border border-primary bg-primary/10 text-primary">
                <ng-icon name="tablerKey" size="22" />
              </div>

              <div class="grid gap-1">
                <p class="font-mono text-xs font-extrabold uppercase tracking-wider text-primary">Password recovery</p>
                <h2 class="m-0 text-2xl font-bold leading-tight">Reset your password</h2>
                <p class="m-0 text-sm leading-6 text-muted-foreground">
                  Enter the email linked to your account and we will send recovery steps.
                </p>
              </div>

              <form class="grid gap-4" (submit)="$event.preventDefault()">
                <div frField>
                  <label frFieldLabel for="reset-email">Email address</label>
                  <div frFieldContent>
                    <input frInput id="reset-email" type="email" autocomplete="email" [formControl]="resetEmail" />
                  </div>
                  <p frFieldDescription>Check your SSO provider first if your company manages passwords.</p>
                </div>

                <button frButton type="submit" class="w-full">
                  <span frButtonLabel>Send reset link</span>
                </button>
              </form>

              <p class="m-0 text-center text-sm leading-6 text-muted-foreground">
                Remembered it?
                <a class="font-bold text-primary no-underline hover:underline" href="#">Back to sign in</a>
              </p>
            </div>
          </section>
        }

        @case ('invite') {
          <section
            frCard
            spacing="xl"
            class="w-full max-w-md bg-surface/95"
            [ngClass]="device() === 'mobile' ? '' : 'md:max-w-3xl'"
          >
            <div
              frCardContent
              class="grid gap-6"
              [ngClass]="device() === 'mobile' ? '' : 'md:grid-cols-2 md:items-center'"
            >
              @if (device() !== 'mobile') {
                <div class="grid min-h-full content-center gap-3 border border-border bg-muted p-5">
                  <div class="grid size-11 place-items-center border border-primary bg-primary/10 text-primary">
                    <ng-icon name="tablerUsers" size="22" />
                  </div>
                  <p class="font-mono text-xs font-extrabold uppercase tracking-wider text-primary">
                    Invite from Linear Systems
                  </p>
                  <h2 class="m-0 text-2xl font-bold leading-tight">Join the Product workspace</h2>
                  <p class="m-0 text-sm leading-6 text-muted-foreground">
                    You were invited by Mira Chen. This invite expires in 48 hours.
                  </p>
                  <div class="mt-1 grid gap-2 text-sm font-bold text-muted-foreground">
                    <span class="inline-flex items-center gap-2">
                      <ng-icon name="tablerBuilding" size="16" />
                      Product team
                    </span>
                    <span class="inline-flex items-center gap-2">
                      <ng-icon name="tablerSparkles" size="16" />
                      Admin access pending
                    </span>
                  </div>
                </div>
              }

              <form class="grid gap-4" (submit)="$event.preventDefault()">
                <div frField>
                  <label frFieldLabel for="invite-name">Display name</label>
                  <div frFieldContent>
                    <input frInput id="invite-name" autocomplete="name" [formControl]="displayName" />
                  </div>
                </div>

                <div frField>
                  <label frFieldLabel for="invite-password">Password</label>
                  <div frFieldContent>
                    <input
                      frInput
                      id="invite-password"
                      type="password"
                      autocomplete="new-password"
                      [formControl]="invitePassword"
                    />
                  </div>
                  <p frFieldDescription>Use at least 12 characters with a number or symbol.</p>
                </div>

                <button frButton type="submit" class="w-full">
                  <span frButtonLabel>Accept invite</span>
                </button>
              </form>
            </div>
          </section>
        }

        @case ('two-factor') {
          <section frCard spacing="xl" class="w-full max-w-md bg-surface/95">
            <div frCardContent class="grid justify-items-center gap-6 text-center">
              <div class="grid size-11 place-items-center border border-primary bg-primary/10 text-primary">
                <ng-icon name="tablerShieldCheck" size="22" />
              </div>

              <div class="grid gap-1">
                <p class="font-mono text-xs font-extrabold uppercase tracking-wider text-primary">
                  Two-factor authentication
                </p>
                <h2 class="m-0 text-2xl font-bold leading-tight">Enter your verification code</h2>
                <p class="m-0 text-sm leading-6 text-muted-foreground">We sent a six-digit code to mika&#64;acme.com.</p>
              </div>

              <form class="grid w-full justify-items-center gap-4" (submit)="$event.preventDefault()">
                <frame-input-otp [formControl]="verificationCode" [maxLength]="6">
                  <div frInputOtpGroup>
                    @for (index of firstThree; track index) {
                      <div frInputOtpSlot [index]="index"></div>
                    }
                  </div>
                  <div frInputOtpSeparator></div>
                  <div frInputOtpGroup>
                    @for (index of lastThree; track index) {
                      <div frInputOtpSlot [index]="index"></div>
                    }
                  </div>
                </frame-input-otp>

                <button frButton type="submit" class="w-full">
                  <span frButtonLabel>Verify account</span>
                </button>
              </form>

              <p class="m-0 text-center text-sm leading-6 text-muted-foreground">
                Did not receive a code?
                <a class="font-bold text-primary no-underline hover:underline" href="#">Resend</a>
              </p>
            </div>
          </section>
        }

        @default {
          <section frCard spacing="xl" class="w-full max-w-md bg-surface/95">
            <div frCardContent class="grid gap-6">
              <div class="grid gap-1">
                <p class="font-mono text-xs font-extrabold uppercase tracking-wider text-primary">Acme Console</p>
                <h2 class="m-0 text-2xl font-bold leading-tight">Sign in to your workspace</h2>
                <p class="m-0 text-sm leading-6 text-muted-foreground">Use your company account to continue.</p>
              </div>

              <form class="grid gap-4" (submit)="$event.preventDefault()">
                <div frField>
                  <label frFieldLabel for="login-email">Email</label>
                  <div frFieldContent>
                    <div frInputGroup>
                      <span frInputGroupAddon align="inline-start" variant="ghost">
                        <ng-icon name="tablerMail" size="16" />
                      </span>
                      <input
                        frInputGroupInput
                        id="login-email"
                        type="email"
                        autocomplete="email"
                        [formControl]="email"
                      />
                    </div>
                  </div>
                </div>

                <div frField>
                  <label frFieldLabel for="login-password">Password</label>
                  <div frFieldContent>
                    <div frInputGroup>
                      <span frInputGroupAddon align="inline-start" variant="ghost">
                        <ng-icon name="tablerLock" size="16" />
                      </span>
                      <input
                        frInputGroupInput
                        id="login-password"
                        type="password"
                        autocomplete="current-password"
                        [formControl]="password"
                      />
                    </div>
                  </div>
                </div>

                <div class="flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between">
                  <label frCheckboxField>
                    <input frCheckbox type="checkbox" [formControl]="rememberMe" />
                    <span frCheckboxLabel>Remember me</span>
                  </label>
                  <a class="font-bold text-primary no-underline hover:underline" href="#">Forgot password?</a>
                </div>

                <button frButton type="submit" class="w-full">
                  <span frButtonLabel>Sign in</span>
                </button>

                <div class="flex items-center gap-3 text-xs font-bold uppercase text-muted-foreground">
                  <span class="flex-1" frSeparator></span>
                  <span>or</span>
                  <span class="flex-1" frSeparator></span>
                </div>

                <button frButton appearance="outline" type="button" class="w-full">
                  <ng-icon name="tablerBrandGithub" size="16" frButtonIcon />
                  <span frButtonLabel>Continue with GitHub</span>
                </button>
              </form>

              <p class="m-0 text-center text-sm leading-6 text-muted-foreground">
                New to Acme?
                <a class="font-bold text-primary no-underline hover:underline" href="#">Create an account</a>
              </p>
            </div>
          </section>
        }
      }
    </div>
  `,
})
export class AuthBlockPreview {
  readonly device = input<AuthBlockPreviewDevice>('desktop');
  readonly variant = input<AuthBlockVariant>('login');

  readonly acceptedTerms = new FormControl(true, { nonNullable: true });
  readonly displayName = new FormControl('Mika Stone', { nonNullable: true });
  readonly email = new FormControl('mika@acme.com', { nonNullable: true });
  readonly firstName = new FormControl('Mika', { nonNullable: true });
  readonly invitePassword = new FormControl('workspace-access-2026', { nonNullable: true });
  readonly lastName = new FormControl('Stone', { nonNullable: true });
  readonly password = new FormControl('design-system', { nonNullable: true });
  readonly rememberMe = new FormControl(true, { nonNullable: true });
  readonly resetEmail = new FormControl('mika@acme.com', { nonNullable: true });
  readonly signupEmail = new FormControl('mika@acme.com', { nonNullable: true });
  readonly verificationCode = new FormControl('248016', { nonNullable: true });

  protected readonly firstThree = [0, 1, 2];
  protected readonly lastThree = [3, 4, 5];
}
