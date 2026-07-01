import { buildComponentCode, type ComponentCodeModule } from '../blocks-code';
import { BlockImplementation } from '../blocks.models';
import { AuthBlockPreview, AuthBlockVariant } from './auth-block-preview';

type AuthenticationBlockImplementation = BlockImplementation<AuthBlockVariant>;

const buttonModule = { name: 'FrButtonModule', path: 'button' } as const;
const cardModule = { name: 'FrCardModule', path: 'card' } as const;
const checkboxModule = { name: 'FrCheckboxModule', path: 'checkbox' } as const;
const fieldModule = { name: 'FrFieldModule', path: 'field' } as const;
const inputModule = { name: 'FrInputModule', path: 'input' } as const;
const inputOtpModule = { name: 'FrInputOtpModule', path: 'input-otp' } as const;
const separatorModule = { name: 'FrSeparatorModule', path: 'separator' } as const;

const loginImports = [
  buttonModule,
  cardModule,
  checkboxModule,
  fieldModule,
  inputModule,
  separatorModule,
] satisfies readonly ComponentCodeModule[];

const signupImports = [
  buttonModule,
  cardModule,
  checkboxModule,
  fieldModule,
  inputModule,
  separatorModule,
] satisfies readonly ComponentCodeModule[];

const simpleFormImports = [
  buttonModule,
  cardModule,
  fieldModule,
  inputModule,
] satisfies readonly ComponentCodeModule[];

const twoFactorImports = [
  buttonModule,
  cardModule,
  inputOtpModule,
] satisfies readonly ComponentCodeModule[];

const loginCode = `<section frCard spacing="xl" class="w-full max-w-md bg-surface/95">
  <div frCardContent class="grid gap-6">
    <div class="grid gap-1">
      <p class="font-mono text-xs font-extrabold uppercase tracking-wider text-primary!">Acme Console</p>
      <h2 class="m-0 text-2xl font-bold leading-tight">Sign in to your workspace</h2>
      <p class="m-0 text-sm leading-6 text-muted-foreground">Use your company account to continue.</p>
    </div>

    <form class="grid gap-4" [formGroup]="form" (ngSubmit)="submit()">
      <div frField>
        <label frFieldLabel for="login-email">Email</label>
        <div frFieldContent>
          <div frInputGroup>
            <span frInputGroupAddon align="inline-start" variant="ghost">
              <ng-icon name="tablerMail" size="16" />
            </span>
            <input frInputGroupInput id="login-email" type="email" formControlName="email" />
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
            <input frInputGroupInput id="login-password" type="password" formControlName="password" />
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between">
        <label frCheckboxField>
          <input frCheckbox type="checkbox" formControlName="rememberMe" />
          <span frCheckboxLabel>Remember me</span>
        </label>
        <a class="font-bold text-primary! no-underline hover:underline" href="#">Forgot password?</a>
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
      <p class="font-mono text-xs font-extrabold uppercase tracking-wider text-primary!">Start free</p>
      <h2 class="m-0 text-2xl font-bold leading-tight">Create your account</h2>
      <p class="m-0 text-sm leading-6 text-muted-foreground">Invite your team after the workspace is ready.</p>
    </div>

    <form class="grid gap-4" [formGroup]="form" (ngSubmit)="submit()">
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
            <input frInput id="first-name" formControlName="firstName" />
          </div>
        </div>

        <div frField>
          <label frFieldLabel for="last-name">Last name</label>
          <div frFieldContent>
            <input frInput id="last-name" formControlName="lastName" />
          </div>
        </div>
      </div>

      <div frField>
        <label frFieldLabel for="signup-email">Work email</label>
        <div frFieldContent>
          <input frInput id="signup-email" type="email" formControlName="signupEmail" />
        </div>
      </div>

      <label frCheckboxField>
        <input frCheckbox type="checkbox" formControlName="acceptedTerms" />
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
    <div class="grid size-11 place-items-center border border-primary! bg-primary/10! text-primary!">
      <ng-icon name="tablerKey" size="22" />
    </div>

    <div class="grid gap-1">
      <p class="font-mono text-xs font-extrabold uppercase tracking-wider text-primary!">Password recovery</p>
      <h2 class="m-0 text-2xl font-bold leading-tight">Reset your password</h2>
      <p class="m-0 text-sm leading-6 text-muted-foreground">
        Enter the email linked to your account and we will send recovery steps.
      </p>
    </div>

    <form class="grid gap-4" [formGroup]="form" (ngSubmit)="submit()">
      <div frField>
        <label frFieldLabel for="reset-email">Email address</label>
        <div frFieldContent>
          <input frInput id="reset-email" type="email" formControlName="email" />
        </div>
        <p frFieldDescription>Check your SSO provider first if your company manages passwords.</p>
      </div>

      <button frButton type="submit" class="w-full">
        <span frButtonLabel>Send reset link</span>
      </button>
    </form>

    <p class="m-0 text-center text-sm leading-6 text-muted-foreground">
      Remembered it?
      <a class="font-bold text-primary! no-underline hover:underline" href="#">Back to sign in</a>
    </p>
  </div>
</section>`;

const inviteCode = `<section frCard spacing="xl" class="w-full max-w-md bg-surface/95 md:max-w-3xl">
  <div frCardContent class="grid gap-6 md:grid-cols-2 md:items-center">
    <div class="hidden min-h-full content-center gap-3 border border-border bg-muted p-5 md:grid">
      <div class="grid size-11 place-items-center border border-primary! bg-primary/10! text-primary!">
        <ng-icon name="tablerUsers" size="22" />
      </div>
      <p class="font-mono text-xs font-extrabold uppercase tracking-wider text-primary!">Invite from Linear Systems</p>
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

    <form class="grid gap-4" [formGroup]="form" (ngSubmit)="submit()">
      <div frField>
        <label frFieldLabel for="invite-name">Display name</label>
        <div frFieldContent>
          <input frInput id="invite-name" formControlName="displayName" />
        </div>
      </div>

      <div frField>
        <label frFieldLabel for="invite-password">Password</label>
        <div frFieldContent>
          <input frInput id="invite-password" type="password" formControlName="password" />
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
    <div class="grid size-11 place-items-center border border-primary! bg-primary/10! text-primary!">
      <ng-icon name="tablerShieldCheck" size="22" />
    </div>

    <div class="grid gap-1">
      <p class="font-mono text-xs font-extrabold uppercase tracking-wider text-primary!">Two-factor authentication</p>
      <h2 class="m-0 text-2xl font-bold leading-tight">Enter your verification code</h2>
      <p class="m-0 text-sm leading-6 text-muted-foreground">We sent a six-digit code to mika&#64;acme.com.</p>
    </div>

    <form class="grid w-full justify-items-center gap-4" [formGroup]="form" (ngSubmit)="submit()">
      <frame-input-otp formControlName="verificationCode" [maxLength]="6">
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
      <a class="font-bold text-primary! no-underline hover:underline" href="#">Resend</a>
    </p>
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
      `  private readonly formBuilder = inject(NonNullableFormBuilder);

  readonly form = this.formBuilder.group({
    email: ['mika@acme.com', Validators.required],
    password: ['design-system', Validators.required],
    rememberMe: [true],
  });

  submit(): void {}`,
      {
        frameModules: loginImports,
        iconImports: ['tablerBrandGithub', 'tablerLock', 'tablerMail'],
        usesReactiveForms: true,
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
      `  private readonly formBuilder = inject(NonNullableFormBuilder);

  readonly form = this.formBuilder.group({
    acceptedTerms: [true],
    firstName: ['Mika', Validators.required],
    lastName: ['Stone', Validators.required],
    signupEmail: ['mika@acme.com', Validators.required],
  });

  submit(): void {}`,
      {
        frameModules: signupImports,
        iconImports: ['tablerBrandGithub'],
        usesReactiveForms: true,
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
      `  private readonly formBuilder = inject(NonNullableFormBuilder);

  readonly form = this.formBuilder.group({
    email: ['mika@acme.com', Validators.required],
  });

  submit(): void {}`,
      {
        frameModules: simpleFormImports,
        iconImports: ['tablerKey'],
        usesReactiveForms: true,
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
      `  private readonly formBuilder = inject(NonNullableFormBuilder);

  readonly form = this.formBuilder.group({
    displayName: ['Mika Stone', Validators.required],
    password: ['workspace-access-2026', Validators.required],
  });

  submit(): void {}`,
      {
        frameModules: simpleFormImports,
        iconImports: ['tablerBuilding', 'tablerSparkles', 'tablerUsers'],
        usesReactiveForms: true,
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
      `  private readonly formBuilder = inject(NonNullableFormBuilder);

  readonly form = this.formBuilder.group({
    verificationCode: ['248016', Validators.required],
  });

  protected readonly firstThree = [0, 1, 2];
  protected readonly lastThree = [3, 4, 5];

  submit(): void {}`,
      {
        frameModules: twoFactorImports,
        iconImports: ['tablerShieldCheck'],
        usesReactiveForms: true,
      },
    ),
  },
} satisfies Record<string, AuthenticationBlockImplementation>;
