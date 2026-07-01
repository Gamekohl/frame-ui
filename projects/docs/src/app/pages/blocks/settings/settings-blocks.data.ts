import { buildComponentCode, type ComponentCodeModule } from '../blocks-code';
import { BlockImplementation } from '../blocks.models';
import { SettingsBlockPreview, SettingsBlockVariant } from './settings-block-preview';

type SettingsBlockImplementation = BlockImplementation<SettingsBlockVariant>;

const avatarModule = { name: 'FrAvatarModule', path: 'avatar' } as const;
const accordionModule = { name: 'FrAccordionModule', path: 'accordion' } as const;
const alertModule = { name: 'FrAlertModule', path: 'alert' } as const;
const badgeModule = { name: 'FrBadgeModule', path: 'badge' } as const;
const buttonModule = { name: 'FrButtonModule', path: 'button' } as const;
const cardModule = { name: 'FrCardModule', path: 'card' } as const;
const fieldModule = { name: 'FrFieldModule', path: 'field' } as const;
const inputModule = { name: 'FrInputModule', path: 'input' } as const;
const itemModule = { name: 'FrItemModule', path: 'item' } as const;
const selectModule = { name: 'FrSelectModule', path: 'select' } as const;
const switchModule = { name: 'FrSwitchModule', path: 'switch' } as const;
const textareaModule = { name: 'FrTextareaModule', path: 'textarea' } as const;

const profileSettingsImports = [
  avatarModule,
  badgeModule,
  buttonModule,
  cardModule,
  fieldModule,
  inputModule,
  textareaModule,
] satisfies readonly ComponentCodeModule[];

const notificationPreferencesImports = [
  badgeModule,
  cardModule,
  switchModule,
] satisfies readonly ComponentCodeModule[];

const teamAccessImports = [
  avatarModule,
  badgeModule,
  buttonModule,
  cardModule,
  fieldModule,
  inputModule,
  itemModule,
] satisfies readonly ComponentCodeModule[];

const loginSecurityImports = [
  accordionModule,
  alertModule,
  badgeModule,
  cardModule,
  selectModule,
  switchModule,
] satisfies readonly ComponentCodeModule[];

const profileSettingsCode = `<section frCard spacing="xl" class="w-full max-w-4xl bg-surface/95">
  <div frCardContent class="grid gap-6">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div class="grid gap-1">
        <p class="font-mono text-xs font-extrabold uppercase tracking-wider text-primary!">Account</p>
        <h2 class="m-0 text-2xl font-bold leading-tight">Profile settings</h2>
        <p class="m-0 text-sm leading-6 text-muted-foreground">
          Keep account identity, contact details, and team context current.
        </p>
      </div>
      <span frBadge variant="success">Synced</span>
    </div>

    <div class="grid gap-5 md:grid-cols-3">
      <aside class="grid self-start border border-border bg-surface">
        <div class="grid gap-4 border-b border-border bg-muted p-4">
          <span frAvatar size="lg" class="border border-primary! bg-primary/10! text-primary!">
          <span frAvatarFallback class="bg-primary/10! text-primary!">MS</span>
          <span frAvatarBadge>2</span>
        </span>
          <div class="grid gap-1">
            <p class="m-0 text-base font-semibold">Mika Stone</p>
            <p class="m-0 text-sm leading-6 text-muted-foreground">Product operations lead</p>
          </div>
        </div>
        <div class="grid gap-3 p-4 text-sm">
          <span class="flex items-center justify-between gap-3">
            <span class="text-muted-foreground">Workspace</span>
            <span class="inline-flex items-center gap-2 font-semibold">
              <ng-icon name="tablerBuilding" size="15" />
              Acme
            </span>
          </span>
          <span class="flex items-center justify-between gap-3">
            <span class="text-muted-foreground">Role</span>
            <span frBadge variant="secondary">Ops lead</span>
          </span>
        </div>
      </aside>

      <form class="grid gap-4 border border-border p-4 md:col-span-2" [formGroup]="form" (ngSubmit)="submit()">
        <div class="grid gap-4 md:grid-cols-2">
          <div frField>
            <label frFieldLabel for="profile-name">Full name</label>
            <div frFieldContent>
              <input frInput id="profile-name" formControlName="fullName" />
            </div>
          </div>

          <div frField>
            <label frFieldLabel for="profile-email">Email</label>
            <div frFieldContent>
              <input frInput id="profile-email" type="email" formControlName="email" />
            </div>
          </div>
        </div>

        <div frField>
          <label frFieldLabel for="profile-role">Role</label>
          <div frFieldContent>
            <input frInput id="profile-role" formControlName="role" />
          </div>
        </div>

        <div frField>
          <label frFieldLabel for="profile-bio">Profile note</label>
          <div frFieldContent>
            <textarea frTextarea id="profile-bio" rows="4" formControlName="bio"></textarea>
          </div>
        </div>

        <div class="flex flex-col gap-2 sm:flex-row sm:justify-end">
          <button frButton appearance="outline" type="button">
            <span frButtonLabel>Cancel</span>
          </button>
          <button frButton type="submit">
            <span frButtonLabel>Save profile</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</section>`;

const notificationPreferencesCode = `<section frCard spacing="xl" class="w-full max-w-3xl bg-surface/95">
  <div frCardContent class="grid gap-6">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div class="grid gap-1">
        <p class="font-mono text-xs font-extrabold uppercase tracking-wider text-primary!">Store alerts</p>
        <h2 class="m-0 text-2xl font-bold leading-tight">Order notifications</h2>
        <p class="m-0 text-sm leading-6 text-muted-foreground">
          Choose which order, stock, and weekly sales updates should reach the store team.
        </p>
      </div>
      <span frBadge variant="secondary">Workspace default</span>
    </div>

    <form class="grid gap-2" [formGroup]="form" (ngSubmit)="submit()">
      <label frSwitchField>
        <input frSwitch type="checkbox" formControlName="lowStockAlerts" />
        <span frSwitchContent>
          <span frSwitchLabel>Low stock alerts</span>
          <span frSwitchDescription>Warn the team when a product drops below 10 units.</span>
        </span>
      </label>

      <label frSwitchField>
        <input frSwitch type="checkbox" formControlName="largeOrderAlerts" />
        <span frSwitchContent>
          <span frSwitchLabel>Large order alerts</span>
          <span frSwitchDescription>Notify managers when an order is over $1,000.</span>
        </span>
      </label>

      <label frSwitchField>
        <input frSwitch type="checkbox" formControlName="weeklySalesSummary" />
        <span frSwitchContent>
          <span frSwitchLabel>Weekly sales summary</span>
          <span frSwitchDescription>Send Monday revenue, return, and fulfillment totals.</span>
        </span>
      </label>
    </form>

    <div class="grid gap-3 border border-border bg-muted p-4">
      <div class="flex items-center gap-3">
        <span class="grid size-9 place-items-center border border-primary! bg-primary/10! text-primary!">
          <ng-icon name="tablerBell" size="18" />
        </span>
        <div class="min-w-0">
          <p class="m-0 text-sm font-semibold">Summary schedule</p>
          <p class="m-0 text-xs leading-5 text-muted-foreground">Store digest sends every Monday at 09:00.</p>
        </div>
      </div>
    </div>
  </div>
</section>`;

const teamAccessCode = `<section frCard spacing="xl" class="w-full max-w-4xl bg-surface/95">
  <div frCardContent class="grid gap-6">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div class="grid gap-1">
        <p class="font-mono text-xs font-extrabold uppercase tracking-wider text-primary!">Access</p>
        <h2 class="m-0 text-2xl font-bold leading-tight">Team access</h2>
        <p class="m-0 text-sm leading-6 text-muted-foreground">
          Invite teammates and keep sensitive roles visible before they drift.
        </p>
      </div>
      <span frBadge variant="outline">3 active seats</span>
    </div>

    <div class="grid w-full min-w-0 justify-items-stretch gap-5">
      <form class="grid w-full min-w-0 gap-4 border border-border p-4" [formGroup]="form" (ngSubmit)="submit()">
        <div class="grid gap-1">
          <p class="m-0 text-sm font-semibold">Invite teammate</p>
          <p class="m-0 text-xs leading-5 text-muted-foreground">New members start with viewer access.</p>
        </div>

        <div frField>
          <label frFieldLabel for="invite-email">Work email</label>
          <div frFieldContent>
            <input frInput id="invite-email" type="email" formControlName="inviteEmail" />
          </div>
        </div>

        <button frButton type="submit" class="w-full">
          <ng-icon name="tablerPlus" size="16" frButtonIcon />
          <span frButtonLabel>Send invite</span>
        </button>
      </form>

      <div frItemGroup class="w-full min-w-0">
        @for (member of members; track member.email) {
          <div frItem>
            <span frItemMedia>
              <span frAvatar size="sm">
                <span frAvatarFallback>{{ member.initials }}</span>
              </span>
            </span>
            <span frItemContent>
              <span frItemTitle>{{ member.name }}</span>
              <span frItemDescription>{{ member.email }}</span>
            </span>
            <span frItemActions>
              <span frBadge [variant]="member.variant">{{ member.role }}</span>
            </span>
          </div>
          @if (!$last) {
            <div frItemSeparator></div>
          }
        }
      </div>
    </div>
  </div>
</section>`;

const loginSecurityCode = `<section frCard spacing="xl" class="w-full max-w-4xl bg-surface/95">
  <div frCardContent class="grid gap-6">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div class="grid gap-1">
        <p class="font-mono text-xs font-extrabold uppercase tracking-wider text-primary!">Security</p>
        <h2 class="m-0 text-2xl font-bold leading-tight">Login security</h2>
        <p class="m-0 text-sm leading-6 text-muted-foreground">
          Control how teammates sign in, approve new devices, and export customer data.
        </p>
      </div>
      <span frBadge variant="destructive">Review due</span>
    </div>

    <section frAlert variant="destructive">
      <ng-icon frAlertIcon name="tablerAlertTriangle" size="18" />
      <h3 frAlertTitle>Customer exports need approval</h3>
      <p frAlertDescription>Admins can currently export customer lists without a second reviewer.</p>
    </section>

    <form class="grid gap-5 lg:grid-cols-3" [formGroup]="form" (ngSubmit)="submit()">
      <aside class="grid content-start gap-4 border border-border bg-muted p-4">
        <div class="grid size-11 place-items-center border border-primary! bg-primary/10! text-primary!">
          <ng-icon name="tablerShieldCheck" size="22" />
        </div>

        <div class="grid gap-1">
          <p class="m-0 text-sm font-semibold">Session timeout</p>
          <p class="m-0 text-xs leading-5 text-muted-foreground">
            Choose when teammates must sign in again on trusted browsers.
          </p>
        </div>

        <ng-template #retentionMenu="frSelectContent" frSelectContent>
          <frame-select-panel>
            @for (option of retentionOptions; track option.value) {
              <button frSelectItem [value]="option.value" [label]="option.label">
                <span>{{ option.label }}</span>
              </button>
            }
          </frame-select-panel>
        </ng-template>

        <button type="button" [frSelect]="retentionMenu" formControlName="retention" class="w-full">
          <frame-select-value placeholder="Select retention"></frame-select-value>
          <span frSelectIcon>
            <ng-icon name="tablerChevronDown" size="16" />
          </span>
        </button>
      </aside>

      <div class="grid gap-3 lg:col-span-2">
        <frame-accordion type="multiple" [defaultValue]="securitySections" border>
          <frame-accordion-item value="identity">
            <button frameAccordionTrigger type="button">
              <span>Sign-in rules</span>
              <ng-icon frameAccordionIcon name="tablerChevronDown" size="18" />
            </button>
            <ng-template frameAccordionContent>
              <div class="grid gap-3 py-2">
                <label frSwitchField>
                  <input frSwitch type="checkbox" formControlName="requireMfa" />
                  <span frSwitchContent>
                    <span frSwitchLabel>Require multi-factor authentication</span>
                    <span frSwitchDescription>Ask teammates for a code when they open admin tools.</span>
                  </span>
                </label>
                <label frSwitchField>
                  <input frSwitch type="checkbox" formControlName="deviceApprovals" />
                  <span frSwitchContent>
                    <span frSwitchLabel>Approve new devices</span>
                    <span frSwitchDescription>Hold first-time laptops and phones until an owner approves them.</span>
                  </span>
                </label>
              </div>
            </ng-template>
          </frame-accordion-item>

          <frame-accordion-item value="data">
            <button frameAccordionTrigger type="button">
              <span>Customer data</span>
              <ng-icon frameAccordionIcon name="tablerChevronDown" size="18" />
            </button>
            <ng-template frameAccordionContent>
              <div class="grid gap-3 py-2">
                <label frSwitchField>
                  <input frSwitch type="checkbox" formControlName="exportAlerts" />
                  <span frSwitchContent>
                    <span frSwitchLabel>Alert on bulk exports</span>
                    <span frSwitchDescription>Notify owners when a customer list is downloaded.</span>
                  </span>
                </label>
                <label frSwitchField>
                  <input frSwitch type="checkbox" formControlName="dataRegionLock" />
                  <span frSwitchContent>
                    <span frSwitchLabel>Lock data region</span>
                    <span frSwitchDescription>Keep customer records and backups inside the EU.</span>
                  </span>
                </label>
              </div>
            </ng-template>
          </frame-accordion-item>
        </frame-accordion>
      </div>
    </form>
  </div>
</section>`;

export const SETTINGS_BLOCK_IMPLEMENTATIONS = {
  'profile-settings': {
    variant: 'profile-settings',
    previewComponent: SettingsBlockPreview,
    previewInputs: ({ device }) => ({ device, variant: 'profile-settings' }),
    componentCode: buildComponentCode(
      'ProfileSettings',
      'app-profile-settings',
      profileSettingsCode,
      `  private readonly formBuilder = inject(NonNullableFormBuilder);

  readonly form = this.formBuilder.group({
    bio: ['Owns onboarding, team workflows, and account hygiene.', Validators.required],
    email: ['mika@acme.com', Validators.required],
    fullName: ['Mika Stone', Validators.required],
    role: ['Product operations lead', Validators.required],
  });

  submit(): void {}`,
      {
        frameModules: profileSettingsImports,
        iconImports: ['tablerBuilding'],
        usesReactiveForms: true,
      },
    ),
  },
  'notification-preferences': {
    variant: 'notification-preferences',
    previewComponent: SettingsBlockPreview,
    previewInputs: ({ device }) => ({ device, variant: 'notification-preferences' }),
    componentCode: buildComponentCode(
      'OrderNotifications',
      'app-notification-preferences',
      notificationPreferencesCode,
      `  private readonly formBuilder = inject(NonNullableFormBuilder);

  readonly form = this.formBuilder.group({
    largeOrderAlerts: [true],
    lowStockAlerts: [true],
    weeklySalesSummary: [false],
  });

  submit(): void {}`,
      {
        frameModules: notificationPreferencesImports,
        iconImports: ['tablerBell'],
        usesReactiveForms: true,
      },
    ),
  },
  'login-security': {
    variant: 'login-security',
    previewComponent: SettingsBlockPreview,
    previewInputs: ({ device }) => ({ device, variant: 'login-security' }),
    componentCode: buildComponentCode(
      'LoginSecurity',
      'app-login-security',
      loginSecurityCode,
      `  private readonly formBuilder = inject(NonNullableFormBuilder);

  readonly form = this.formBuilder.group({
    dataRegionLock: [true],
    deviceApprovals: [false],
    exportAlerts: [true],
    requireMfa: [true],
    retention: ['30-days', Validators.required],
  });

  protected readonly retentionOptions = [
    { label: '7 days', value: '7-days' },
    { label: '30 days', value: '30-days' },
    { label: '90 days', value: '90-days' },
  ] as const;
  protected readonly securitySections = ['identity', 'data'];

  submit(): void {}`,
      {
        frameModules: loginSecurityImports,
        iconImports: ['tablerAlertTriangle', 'tablerChevronDown', 'tablerShieldCheck'],
        usesReactiveForms: true,
      },
    ),
  },
  'team-access': {
    variant: 'team-access',
    previewComponent: SettingsBlockPreview,
    previewInputs: ({ device }) => ({ device, variant: 'team-access' }),
    componentCode: buildComponentCode(
      'TeamAccess',
      'app-team-access',
      teamAccessCode,
      `  private readonly formBuilder = inject(NonNullableFormBuilder);

  readonly form = this.formBuilder.group({
    inviteEmail: ['nora@acme.com', Validators.required],
  });

  protected readonly members = [
    { email: 'mika@acme.com', initials: 'MS', name: 'Mika Stone', role: 'Owner', variant: 'success' },
    { email: 'mira@acme.com', initials: 'MC', name: 'Mira Chen', role: 'Admin', variant: 'secondary' },
    { email: 'jonas@acme.com', initials: 'JR', name: 'Jonas Reed', role: 'Viewer', variant: 'outline' },
  ] as const;

  submit(): void {}`,
      {
        frameModules: teamAccessImports,
        iconImports: ['tablerPlus'],
        usesReactiveForms: true,
      },
    ),
  },
} satisfies Record<string, SettingsBlockImplementation>;
