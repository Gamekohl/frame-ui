import { buildComponentCode } from '../blocks-code';
import { BlockImplementation } from '../blocks.models';
import { AuthBlockPreview, AuthBlockVariant } from './auth-block-preview';

type AuthenticationBlockImplementation = BlockImplementation<AuthBlockVariant>;

const buttonImports = ['FrButton', 'FrButtonLabel'] as const;
const cardImports = ['FrCard', 'FrCardContent'] as const;
const checkboxImports = ['FrCheckbox', 'FrCheckboxField', 'FrCheckboxLabel'] as const;
const fieldImports = ['FrField', 'FrFieldContent', 'FrFieldLabel'] as const;
const inputGroupImports = ['FrInputGroup', 'FrInputGroupAddon', 'FrInputGroupInput'] as const;

const loginImports = [
  ...buttonImports,
  'FrButtonIcon',
  ...cardImports,
  ...checkboxImports,
  ...fieldImports,
  ...inputGroupImports,
  'FrSeparator',
] as const;

const signupImports = [
  ...buttonImports,
  'FrButtonIcon',
  ...cardImports,
  ...checkboxImports,
  ...fieldImports,
  'FrInput',
  'FrSeparator',
] as const;

const simpleFormImports = [
  ...buttonImports,
  ...cardImports,
  ...fieldImports,
  'FrFieldDescription',
  'FrInput',
] as const;

const twoFactorImports = [
  ...buttonImports,
  ...cardImports,
  'FrInputOtp',
  'FrInputOtpGroup',
  'FrInputOtpSeparator',
  'FrInputOtpSlot',
] as const;

const loginCode = `<section frCard spacing="xl" class="w-full max-w-md bg-surface/95">
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
            <input frInputGroupInput id="login-email" type="email" [formControl]="email" />
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
            <input frInputGroupInput id="login-password" type="password" [formControl]="password" />
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
  </div>
</section>`;

const signupCode = `<section frCard spacing="xl" class="w-full max-w-xl bg-surface/95">
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
            <input frInput id="first-name" [formControl]="firstName" />
          </div>
        </div>

        <div frField>
          <label frFieldLabel for="last-name">Last name</label>
          <div frFieldContent>
            <input frInput id="last-name" [formControl]="lastName" />
          </div>
        </div>
      </div>

      <div frField>
        <label frFieldLabel for="signup-email">Work email</label>
        <div frFieldContent>
          <input frInput id="signup-email" type="email" [formControl]="signupEmail" />
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
</section>`;

const resetCode = `<section frCard spacing="xl" class="w-full max-w-md bg-surface/95">
  <div frCardContent class="grid gap-6">
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
          <input frInput id="reset-email" type="email" [formControl]="resetEmail" />
        </div>
        <p frFieldDescription>Check your SSO provider first if your company manages passwords.</p>
      </div>

      <button frButton type="submit" class="w-full">
        <span frButtonLabel>Send reset link</span>
      </button>
    </form>
  </div>
</section>`;

const inviteCode = `<section frCard spacing="xl" class="w-full max-w-md bg-surface/95 md:max-w-3xl">
  <div frCardContent class="grid gap-6 md:grid-cols-2 md:items-center">
    <div class="hidden min-h-full content-center gap-3 border border-border bg-muted p-5 md:grid">
      <p class="font-mono text-xs font-extrabold uppercase tracking-wider text-primary">Invite from Linear Systems</p>
      <h2 class="m-0 text-2xl font-bold leading-tight">Join the Product workspace</h2>
      <p class="m-0 text-sm leading-6 text-muted-foreground">
        You were invited by Mira Chen. This invite expires in 48 hours.
      </p>
    </div>

    <form class="grid gap-4" (submit)="$event.preventDefault()">
      <div frField>
        <label frFieldLabel for="invite-name">Display name</label>
        <div frFieldContent>
          <input frInput id="invite-name" [formControl]="displayName" />
        </div>
      </div>

      <div frField>
        <label frFieldLabel for="invite-password">Password</label>
        <div frFieldContent>
          <input frInput id="invite-password" type="password" [formControl]="invitePassword" />
        </div>
        <p frFieldDescription>Use at least 12 characters with a number or symbol.</p>
      </div>

      <button frButton type="submit" class="w-full">
        <span frButtonLabel>Accept invite</span>
      </button>
    </form>
  </div>
</section>`;

const twoFactorCode = `<section frCard spacing="xl" class="w-full max-w-md bg-surface/95">
  <div frCardContent class="grid justify-items-center gap-6 text-center">
    <div class="grid size-11 place-items-center border border-primary bg-primary/10 text-primary">
      <ng-icon name="tablerShieldCheck" size="22" />
    </div>

    <div class="grid gap-1">
      <p class="font-mono text-xs font-extrabold uppercase tracking-wider text-primary">Two-factor authentication</p>
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
  </div>
</section>`;

export const AUTHENTICATION_BLOCK_IMPLEMENTATIONS = {
  login: {
    variant: 'login',
    previewComponent: AuthBlockPreview,
    previewInputs: ({ device }) => ({ device, variant: 'login' }),
    componentCode: buildComponentCode(
      'Login',
      'app-login',
      loginCode,
      `  readonly email = new FormControl('mika@acme.com', { nonNullable: true });
  readonly password = new FormControl('design-system', { nonNullable: true });
  readonly rememberMe = new FormControl(true, { nonNullable: true });`,
      {
        frameImports: loginImports,
        iconImports: ['tablerBrandGithub', 'tablerLock', 'tablerMail'],
      },
    ),
  },
  signup: {
    variant: 'signup',
    previewComponent: AuthBlockPreview,
    previewInputs: ({ device }) => ({ device, variant: 'signup' }),
    componentCode: buildComponentCode(
      'Signup',
      'app-signup',
      signupCode,
      `  readonly acceptedTerms = new FormControl(true, { nonNullable: true });
  readonly firstName = new FormControl('Mika', { nonNullable: true });
  readonly lastName = new FormControl('Stone', { nonNullable: true });
  readonly signupEmail = new FormControl('mika@acme.com', { nonNullable: true });`,
      {
        frameImports: signupImports,
        iconImports: ['tablerBrandGithub'],
      },
    ),
  },
  'password-reset': {
    variant: 'password-reset',
    previewComponent: AuthBlockPreview,
    previewInputs: ({ device }) => ({ device, variant: 'password-reset' }),
    componentCode: buildComponentCode(
      'PasswordReset',
      'app-password-reset',
      resetCode,
      `  readonly resetEmail = new FormControl('mika@acme.com', { nonNullable: true });`,
      {
        frameImports: simpleFormImports,
      },
    ),
  },
  invite: {
    variant: 'invite',
    previewComponent: AuthBlockPreview,
    previewInputs: ({ device }) => ({ device, variant: 'invite' }),
    componentCode: buildComponentCode(
      'InviteAccept',
      'app-invite-accept',
      inviteCode,
      `  readonly displayName = new FormControl('Mika Stone', { nonNullable: true });
  readonly invitePassword = new FormControl('workspace-access-2026', { nonNullable: true });`,
      {
        frameImports: simpleFormImports,
      },
    ),
  },
  'two-factor': {
    variant: 'two-factor',
    previewComponent: AuthBlockPreview,
    previewInputs: ({ device }) => ({ device, variant: 'two-factor' }),
    componentCode: buildComponentCode(
      'TwoFactor',
      'app-two-factor',
      twoFactorCode,
      `  readonly verificationCode = new FormControl('248016', { nonNullable: true });

  protected readonly firstThree = [0, 1, 2];
  protected readonly lastThree = [3, 4, 5];`,
      {
        frameImports: twoFactorImports,
        iconImports: ['tablerShieldCheck'],
      },
    ),
  },
} satisfies Record<string, AuthenticationBlockImplementation>;
