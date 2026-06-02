import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { FrButtonModule } from '@frame-ui/components/button';
import { FrFieldModule } from '@frame-ui/components/field';
import { FR_INPUT_OTP_PATTERN_DIGITS_AND_CHARS, FrInputOtpModule } from '@frame-ui/components/input-otp';

export type InputOtpPreviewMode =
  | 'alphanumeric'
  | 'basic'
  | 'disabled'
  | 'form'
  | 'four-digits'
  | 'inspector'
  | 'invalid'
  | 'rtl'
  | 'separator';

export type InputOtpPreviewConfig = {
  mode?: InputOtpPreviewMode;
};

@Component({
  selector: 'docs-input-otp-preview',
  imports: [
    FrButtonModule,
    FrFieldModule,
    FrInputOtpModule,
    ReactiveFormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @switch (config().mode ?? 'basic') {
      @case ('separator') {
        <frame-input-otp [formControl]="separatorCode" [maxLength]="6">
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
      }

      @case ('disabled') {
        <frame-input-otp [formControl]="disabledCode" [maxLength]="6">
          <div frInputOtpGroup>
            @for (index of six; track index) {
              <div frInputOtpSlot [index]="index"></div>
            }
          </div>
        </frame-input-otp>
      }

      @case ('invalid') {
        <div class="docs-input-otp-basic">
          <frame-input-otp [formControl]="invalidCode" [maxLength]="6">
            <div frInputOtpGroup>
              @for (index of six; track index) {
                <div frInputOtpSlot [index]="index"></div>
              }
            </div>
          </frame-input-otp>
          <p class="docs-input-otp-value">
            {{ invalidCode.invalid ? 'Enter all 6 digits.' : 'Code complete.' }}
          </p>
        </div>
      }

      @case ('four-digits') {
        <frame-input-otp [formControl]="pin" [maxLength]="4">
          <div frInputOtpGroup>
            @for (index of four; track index) {
              <div frInputOtpSlot [index]="index" placeholder="0"></div>
            }
          </div>
        </frame-input-otp>
      }

      @case ('alphanumeric') {
        <frame-input-otp
          [formControl]="alphanumericCode"
          [maxLength]="6"
          [pattern]="alphanumericPattern"
          ariaLabel="Invite code"
        >
          <div frInputOtpGroup>
            @for (index of six; track index) {
              <div frInputOtpSlot [index]="index"></div>
            }
          </div>
        </frame-input-otp>
      }

      @case ('form') {
        <form class="docs-input-otp-form" (submit)="$event.preventDefault()">
          <div frField [invalid]="verificationCode.invalid && verificationCode.touched">
            <label frFieldLabel>Verification code</label>
            <div frFieldContent>
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
            </div>
            <p frFieldDescription>Enter the verification code we sent to m@example.com.</p>

            @if (verificationCode.invalid && verificationCode.touched) {
              <p frFieldError>Enter all 6 digits.</p>
            }
          </div>

          <button frButton type="submit" [disabled]="verificationCode.invalid">Verify</button>
        </form>
      }

      @case ('rtl') {
        <div dir="rtl" class="docs-input-otp-rtl">
          <label class="docs-input-otp-label">رمز التحقق</label>
          <frame-input-otp [formControl]="rtlCode" [maxLength]="6" [pattern]="anyCharacterPattern" ariaLabel="رمز التحقق">
            <div frInputOtpGroup>
              @for (index of six; track index) {
                <div frInputOtpSlot [index]="index"></div>
              }
            </div>
          </frame-input-otp>
        </div>
      }

      @case ('inspector') {
        <frame-input-otp
          data-token-target="input-otp-root"
          [formControl]="inspectorCode"
          [maxLength]="6"
        >
          <div frInputOtpGroup data-token-target="input-otp-group">
            @for (index of firstThree; track index) {
              <div
                frInputOtpSlot
                [index]="index"
                [attr.data-token-target]="index === 1 ? 'input-otp-active-slot' : 'input-otp-slot'"
              ></div>
            }
          </div>
          <div frInputOtpSeparator data-token-target="input-otp-separator"></div>
          <div frInputOtpGroup>
            @for (index of lastThree; track index) {
              <div frInputOtpSlot [index]="index"></div>
            }
          </div>
        </frame-input-otp>
      }

      @default {
        <div class="docs-input-otp-basic">
          <frame-input-otp [formControl]="code" [maxLength]="6">
            <div frInputOtpGroup>
              @for (index of six; track index) {
                <div frInputOtpSlot [index]="index"></div>
              }
            </div>
          </frame-input-otp>
          <p class="docs-input-otp-value">Value: {{ code.value || 'empty' }}</p>
        </div>
      }
    }
  `,
  styles: `
    .docs-input-otp-basic,
    .docs-input-otp-rtl,
    .docs-input-otp-form {
      display: grid;
      justify-items: center;
      gap: 0.875rem;
    }

    .docs-input-otp-form {
      width: min(100%, 24rem);
      justify-items: stretch;
    }

    .docs-input-otp-value,
    .docs-input-otp-label {
      margin: 0;
      color: var(--frame-muted-foreground);
      font-size: 0.875rem;
    }
  `,
})
export class DocsInputOtpPreviewComponent {
  readonly config = input<InputOtpPreviewConfig>({});

  readonly code = new FormControl('123456');
  readonly separatorCode = new FormControl('123456');
  readonly invalidCode = new FormControl('123', {
    validators: [Validators.required, Validators.minLength(6)],
  });
  readonly pin = new FormControl('1234');
  readonly alphanumericCode = new FormControl('A1B2C3');
  readonly inspectorCode = new FormControl('123');
  readonly rtlCode = new FormControl('١٢٣٤٥٦');
  readonly verificationCode = new FormControl('', {
    validators: [Validators.required, Validators.minLength(6)],
  });
  readonly disabledCode = new FormControl({ value: '123456', disabled: true });

  protected readonly alphanumericPattern = FR_INPUT_OTP_PATTERN_DIGITS_AND_CHARS;
  protected readonly anyCharacterPattern = /^.$/u;
  protected readonly six = [0, 1, 2, 3, 4, 5];
  protected readonly four = [0, 1, 2, 3];
  protected readonly firstThree = [0, 1, 2];
  protected readonly lastThree = [3, 4, 5];
  protected readonly codeLength = computed(() => this.code.value?.length ?? 0);
}

