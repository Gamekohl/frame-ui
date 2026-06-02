import { ComponentDoc } from '../../shared/models/component-doc.model';
import { DocsInputOtpPreviewComponent } from './previews/input-otp-preview';

const importsCode = `import { FR_INPUT_OTP_PATTERN_DIGITS_AND_CHARS, FrInputOtpModule } from '@frame-ui/components/input-otp';`;

const formImportsCode = `import { FormControl, Validators } from '@angular/forms';
import { FrButtonModule } from '@frame-ui/components/button';
import { FrFieldModule } from '@frame-ui/components/field';

readonly code = new FormControl('', {
  validators: [Validators.required, Validators.minLength(6)],
});`;

const basicTs = `import { FormControl } from '@angular/forms';

readonly code = new FormControl('');`;

const basicHtml = `<frame-input-otp [formControl]="code" [maxLength]="6">
  <div frInputOtpGroup>
    <div frInputOtpSlot [index]="0"></div>
    <div frInputOtpSlot [index]="1"></div>
    <div frInputOtpSlot [index]="2"></div>
    <div frInputOtpSlot [index]="3"></div>
    <div frInputOtpSlot [index]="4"></div>
    <div frInputOtpSlot [index]="5"></div>
  </div>
</frame-input-otp>`;

const separatorHtml = `<frame-input-otp [formControl]="code" [maxLength]="6">
  <div frInputOtpGroup>
    <div frInputOtpSlot [index]="0"></div>
    <div frInputOtpSlot [index]="1"></div>
    <div frInputOtpSlot [index]="2"></div>
  </div>

  <div frInputOtpSeparator></div>

  <div frInputOtpGroup>
    <div frInputOtpSlot [index]="3"></div>
    <div frInputOtpSlot [index]="4"></div>
    <div frInputOtpSlot [index]="5"></div>
  </div>
</frame-input-otp>`;

const disabledTs = `import { FormControl } from '@angular/forms';

readonly code = new FormControl({
  value: '123456',
  disabled: true,
});`;

const disabledHtml = `<frame-input-otp [formControl]="code" [maxLength]="6">
  <div frInputOtpGroup>
    <div frInputOtpSlot [index]="0"></div>
    <div frInputOtpSlot [index]="1"></div>
    <div frInputOtpSlot [index]="2"></div>
    <div frInputOtpSlot [index]="3"></div>
    <div frInputOtpSlot [index]="4"></div>
    <div frInputOtpSlot [index]="5"></div>
  </div>
</frame-input-otp>`;

const invalidTs = `import { FormControl, Validators } from '@angular/forms';

readonly code = new FormControl('123', {
  validators: [Validators.required, Validators.minLength(6)],
});`;

const invalidHtml = `<frame-input-otp [formControl]="code" [maxLength]="6">
  <div frInputOtpGroup>
    <div frInputOtpSlot [index]="0"></div>
    <div frInputOtpSlot [index]="1"></div>
    <div frInputOtpSlot [index]="2"></div>
    <div frInputOtpSlot [index]="3"></div>
    <div frInputOtpSlot [index]="4"></div>
    <div frInputOtpSlot [index]="5"></div>
  </div>
</frame-input-otp>`;

const fourDigitsHtml = `<frame-input-otp [formControl]="pin" [maxLength]="4">
  <div frInputOtpGroup>
    <div frInputOtpSlot [index]="0" placeholder="0"></div>
    <div frInputOtpSlot [index]="1" placeholder="0"></div>
    <div frInputOtpSlot [index]="2" placeholder="0"></div>
    <div frInputOtpSlot [index]="3" placeholder="0"></div>
  </div>
</frame-input-otp>`;

const alphanumericTs = `import { FR_INPUT_OTP_PATTERN_DIGITS_AND_CHARS } from '@frame-ui/components/input-otp';

readonly inviteCode = new FormControl('');
readonly pattern = FR_INPUT_OTP_PATTERN_DIGITS_AND_CHARS;`;

const alphanumericHtml = `<frame-input-otp
  [formControl]="inviteCode"
  [maxLength]="6"
  [pattern]="pattern"
>
  <div frInputOtpGroup>
    <div frInputOtpSlot [index]="0"></div>
    <div frInputOtpSlot [index]="1"></div>
    <div frInputOtpSlot [index]="2"></div>
    <div frInputOtpSlot [index]="3"></div>
    <div frInputOtpSlot [index]="4"></div>
    <div frInputOtpSlot [index]="5"></div>
  </div>
</frame-input-otp>`;

const formHtml = `<form (submit)="$event.preventDefault()">
  <div frField [invalid]="code.invalid && code.touched">
    <label frFieldLabel>Verification code</label>
    <div frFieldContent>
      <frame-input-otp [formControl]="code" [maxLength]="6">
        <div frInputOtpGroup>
          <div frInputOtpSlot [index]="0"></div>
          <div frInputOtpSlot [index]="1"></div>
          <div frInputOtpSlot [index]="2"></div>
        </div>
        <div frInputOtpSeparator></div>
        <div frInputOtpGroup>
          <div frInputOtpSlot [index]="3"></div>
          <div frInputOtpSlot [index]="4"></div>
          <div frInputOtpSlot [index]="5"></div>
        </div>
      </frame-input-otp>
    </div>
    <p frFieldDescription>Enter the verification code we sent to m@example.com.</p>

    @if (code.invalid && code.touched) {
      <p frFieldError>Enter all 6 digits.</p>
    }
  </div>

  <button frButton type="submit" [disabled]="code.invalid">Verify</button>
</form>`;

const rtlHtml = `<div dir="rtl">
  <label>رمز التحقق</label>
  <frame-input-otp [formControl]="code" [maxLength]="6" [pattern]="anyCharacterPattern">
    <div frInputOtpGroup>
      <div frInputOtpSlot [index]="0"></div>
      <div frInputOtpSlot [index]="1"></div>
      <div frInputOtpSlot [index]="2"></div>
      <div frInputOtpSlot [index]="3"></div>
      <div frInputOtpSlot [index]="4"></div>
      <div frInputOtpSlot [index]="5"></div>
    </div>
  </frame-input-otp>
</div>`;

const rtlTs = `import { FormControl } from '@angular/forms';

readonly code = new FormControl('١٢٣٤٥٦');
readonly anyCharacterPattern = /^.$/u;`;

export const INPUT_OTP_DOC: ComponentDoc = {
  slug: 'input-otp',
  breadcrumb: 'Components / Input OTP',

  hero: {
    id: 'input-otp-hero',
    title: 'Preview',
    description: 'Accessible one-time password input with copy-paste support and Angular reactive forms compatibility.',
    preview: {
      component: DocsInputOtpPreviewComponent,
    },
  },

  installation: {
    cli: {
      language: 'bash',
      code: 'npx your-cli add input-otp',
    },
    manual: {
      steps: [
        {
          title: 'Import the input OTP primitives.',
          code: {
            language: 'ts',
            code: importsCode,
          },
        },
      ],
    },
  },

  usage: [
    { language: 'ts', code: importsCode },
    { language: 'ts', code: basicTs },
    { language: 'html', code: basicHtml },
  ],

  composition: `InputOTP
├── InputOTPGroup
│   ├── InputOTPSlot
│   ├── InputOTPSlot
│   └── InputOTPSlot
├── InputOTPSeparator
└── InputOTPGroup
    ├── InputOTPSlot
    ├── InputOTPSlot
    └── InputOTPSlot`,

  tokenInspector: {
    id: 'token-inspector',
    title: 'Token inspector',
    description: 'Inspect the root, slot, active slot, group, and separator tokens.',
    preview: {
      component: DocsInputOtpPreviewComponent,
      inputs: {
        config: { mode: 'inspector' },
      },
      inspectorLayout: 'popover',
      inspectorTargets: [
        {
          id: 'root',
          label: 'Root',
          selector: '[data-token-target="input-otp-root"]',
          description: 'The root controls the spacing between groups and separators.',
          tokens: ['--frame-input-otp-gap'],
        },
        {
          id: 'group',
          label: 'Group',
          selector: '[data-token-target="input-otp-group"]',
          description: 'Groups collapse adjacent slots into a segmented input surface.',
          tokens: ['--frame-input-otp-group-gap'],
        },
        {
          id: 'slot',
          label: 'Slot',
          selector: '[data-token-target="input-otp-slot"]',
          description: 'Slots inherit the base input surface while exposing OTP-specific sizing and typography.',
          tokens: [
            '--frame-input-otp-slot-size',
            '--frame-input-otp-slot-radius',
            '--frame-input-otp-slot-bg',
            '--frame-input-otp-slot-color',
            '--frame-input-otp-slot-border',
            '--frame-input-otp-slot-font-size',
            '--frame-input-otp-slot-font-weight',
          ],
        },
        {
          id: 'active-slot',
          label: 'Active slot',
          selector: '[data-token-target="input-otp-active-slot"]',
          description: 'The active slot uses the same focus treatment as FrInput.',
          tokens: ['--frame-input-otp-slot-focus-border', '--frame-input-otp-slot-focus-shadow'],
        },
        {
          id: 'separator',
          label: 'Separator',
          selector: '[data-token-target="input-otp-separator"]',
          description: 'Separators create visual grouping for longer codes.',
          tokens: ['--frame-input-otp-separator-color', '--frame-input-otp-separator-size'],
        },
      ],
    },
  },

  examples: [
    {
      id: 'separator',
      title: 'Separator',
      description: 'Use `FrInputOtpSeparator` to divide a code into readable groups.',
      preview: {
        component: DocsInputOtpPreviewComponent,
        inputs: { config: { mode: 'separator' } },
      },
      code: [
        { language: 'ts', code: basicTs },
        { language: 'html', code: separatorHtml },
      ],
    },
    {
      id: 'disabled',
      title: 'Disabled',
      description: 'Disable the reactive form control to disable the OTP input.',
      preview: {
        component: DocsInputOtpPreviewComponent,
        inputs: { config: { mode: 'disabled' } },
      },
      code: [
        { language: 'ts', code: disabledTs },
        { language: 'html', code: disabledHtml },
      ],
    },
    {
      id: 'controlled',
      title: 'Reactive Forms',
      description: 'Input OTP implements ControlValueAccessor and works directly with Angular reactive forms.',
      preview: {
        component: DocsInputOtpPreviewComponent,
      },
      code: [
        { language: 'ts', code: basicTs },
        { language: 'html', code: basicHtml },
      ],
    },
    {
      id: 'invalid',
      title: 'Invalid',
      description: 'Angular validation state drives the error treatment and clears when the value becomes valid.',
      preview: {
        component: DocsInputOtpPreviewComponent,
        inputs: { config: { mode: 'invalid' } },
      },
      code: [
        { language: 'ts', code: invalidTs },
        { language: 'html', code: invalidHtml },
      ],
    },
    {
      id: 'four-digits',
      title: 'Four Digits',
      description: 'Use a shorter `maxLength` for PIN-code patterns.',
      preview: {
        component: DocsInputOtpPreviewComponent,
        inputs: { config: { mode: 'four-digits' } },
      },
      code: [
        { language: 'ts', code: `import { FormControl } from '@angular/forms';

readonly pin = new FormControl("");` },
        { language: 'html', code: fourDigitsHtml },
      ],
    },
    {
      id: 'alphanumeric',
      title: 'Alphanumeric',
      description: 'Use `FR_INPUT_OTP_PATTERN_DIGITS_AND_CHARS` to accept letters and numbers.',
      preview: {
        component: DocsInputOtpPreviewComponent,
        inputs: { config: { mode: 'alphanumeric' } },
      },
      code: [
        { language: 'ts', code: alphanumericTs },
        { language: 'html', code: alphanumericHtml },
      ],
    },
    {
      id: 'form',
      title: 'Form',
      description: 'Pair Input OTP with Field and Angular validators for full form flows.',
      preview: {
        component: DocsInputOtpPreviewComponent,
        inputs: { config: { mode: 'form' } },
      },
      code: [
        { language: 'ts', code: formImportsCode },
        { language: 'html', code: formHtml },
      ],
    },
    {
      id: 'rtl',
      title: 'RTL',
      description: 'Input OTP inherits text direction from its container.',
      preview: {
        component: DocsInputOtpPreviewComponent,
        inputs: { config: { mode: 'rtl' } },
      },
      code: [
        { language: 'ts', code: rtlTs },
        { language: 'html', code: rtlHtml },
      ],
    },
  ],

  tokensTitle: 'Design Tokens',
  tokensDescription:
    'Input OTP builds its visible slots on top of the same surface decisions as FrInput, then adds slot, group, and separator tokens for segmented code entry.',
  tokens: `
  --frame-input-otp-gap: 0.5rem;
  --frame-input-otp-group-gap: 0;
  --frame-input-otp-slot-size: 2.5rem;
  --frame-input-otp-slot-radius: var(--frame-input-root-radius);
  --frame-input-otp-slot-bg: var(--frame-input-root-bg);
  --frame-input-otp-slot-color: var(--frame-input-root-color);
  --frame-input-otp-slot-border: var(--frame-input-root-border);
  --frame-input-otp-slot-font-size: 1rem;
  --frame-input-otp-slot-font-weight: 500;
  --frame-input-otp-slot-focus-border: var(--frame-input-root-focus-border);
  --frame-input-otp-slot-focus-shadow: var(--frame-input-root-focus-shadow);
  --frame-input-otp-slot-invalid-border: var(--frame-input-root-invalid-border);
  --frame-input-otp-slot-invalid-shadow: var(--frame-input-root-invalid-shadow);
  --frame-input-otp-slot-disabled-bg: var(--frame-input-root-disabled-bg);
  --frame-input-otp-slot-disabled-color: var(--frame-input-root-disabled-color);
  --frame-input-otp-slot-disabled-opacity: var(--frame-input-root-disabled-opacity);
  --frame-input-otp-slot-placeholder-color: var(--frame-input-root-placeholder-color);
  --frame-input-otp-separator-color: var(--frame-muted-foreground);
  --frame-input-otp-separator-size: 0.375rem;
  `,
};

