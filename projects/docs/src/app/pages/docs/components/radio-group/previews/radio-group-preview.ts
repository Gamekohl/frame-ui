import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { FrButtonModule } from '@frame-ui-ng/components/button';
import { FrFieldModule } from '@frame-ui-ng/components/field';
import { FrRadioGroupModule } from '@frame-ui-ng/components/radio-group';

export type RadioGroupPreviewMode =
  | 'basic'
  | 'cards'
  | 'custom-styling'
  | 'descriptions'
  | 'disabled'
  | 'fieldset'
  | 'hero'
  | 'inspector'
  | 'invalid'
  | 'rtl';

export type RadioGroupPreviewConfig = {
  mode: RadioGroupPreviewMode;
};

@Component({
  selector: 'docs-radio-group-preview',
  host: {
    class: 'block w-full',
  },
  imports: [
    FrButtonModule,
    FrFieldModule,
    FrRadioGroupModule,
    ReactiveFormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @switch (config().mode) {
      @case ('hero') {
        <div frRadioGroup aria-label="Editor density" class="docs-radio-stack">
          @for (option of densityOptions; track option.value) {
            <label frRadioGroupField>
              <input frRadioGroupItem type="radio" name="hero-density" [value]="option.value" [checked]="option.value === 'balanced'" />
              <span frFieldContent>
                <span frFieldLabel>{{ option.label }}</span>
                <span frFieldDescription>{{ option.description }}</span>
              </span>
            </label>
          }
        </div>
      }

      @case ('basic') {
        <div frRadioGroup aria-label="Notification channel" class="docs-radio-stack">
          <label frRadioGroupField>
            <input frRadioGroupItem type="radio" name="channel" value="email" checked />
            <span frFieldLabel>Email</span>
          </label>
          <label frRadioGroupField>
            <input frRadioGroupItem type="radio" name="channel" value="slack" />
            <span frFieldLabel>Slack</span>
          </label>
          <label frRadioGroupField>
            <input frRadioGroupItem type="radio" name="channel" value="digest" />
            <span frFieldLabel>Daily digest</span>
          </label>
        </div>
      }

      @case ('descriptions') {
        <div frRadioGroup aria-label="Review cadence" class="docs-radio-stack">
          @for (option of cadenceOptions; track option.value) {
            <label frRadioGroupField>
              <input frRadioGroupItem type="radio" name="cadence" [value]="option.value" [checked]="option.value === 'weekly'" />
              <span frFieldContent>
                <span frFieldLabel>{{ option.label }}</span>
                <span frFieldDescription>{{ option.description }}</span>
              </span>
            </label>
          }
        </div>
      }

      @case ('cards') {
        <div frRadioGroup variant="cards" aria-label="Workspace plan" class="docs-radio-cards">
          @for (option of planOptions; track option.value) {
            <label frRadioGroupCard>
              <input frRadioGroupItem type="radio" name="plan" [value]="option.value" [checked]="option.value === 'team'" />
              <span frFieldContent>
                <span frFieldLabel>{{ option.label }}</span>
                <span frFieldDescription>{{ option.description }}</span>
              </span>
              <span frRadioGroupCardMeta>{{ option.price }}</span>
            </label>
          }
        </div>
      }

      @case ('fieldset') {
        <fieldset frFieldSet class="docs-radio-fieldset">
          <legend frFieldLegend>Export schedule</legend>
          <p frFieldDescription>Choose when reports should be generated for your workspace.</p>

          <div frRadioGroup aria-label="Export schedule" class="docs-radio-stack">
            @for (option of scheduleOptions; track option.value) {
              <label frRadioGroupField>
                <input frRadioGroupItem type="radio" name="schedule" [value]="option.value" [checked]="option.value === 'weekly'" />
                <span frFieldLabel>{{ option.label }}</span>
              </label>
            }
          </div>
        </fieldset>
      }

      @case ('disabled') {
        <div frRadioGroup aria-label="Region" class="docs-radio-stack">
          <label frRadioGroupField disabled>
            <input frRadioGroupItem type="radio" name="region" value="eu" disabled />
            <span frFieldLabel>Europe locked by policy</span>
          </label>
          <label frRadioGroupField>
            <input frRadioGroupItem type="radio" name="region" value="us" checked />
            <span frFieldLabel>United States</span>
          </label>
          <label frRadioGroupField>
            <input frRadioGroupItem type="radio" name="region" value="apac" />
            <span frFieldLabel>Asia-Pacific</span>
          </label>
        </div>
      }

      @case ('invalid') {
        <div class="docs-radio-stack">
          <fieldset frFieldSet>
            <legend frFieldLegend>Escalation path</legend>
            <p frFieldDescription>Select one owner before saving the workflow.</p>

            <div frRadioGroup aria-label="Escalation path" class="docs-radio-stack">
              @for (option of ownerOptions; track option.value) {
                <label frRadioGroupField [invalid]="ownerControl.invalid && ownerControl.touched">
                  <input
                    frRadioGroupItem
                    type="radio"
                    name="owner"
                    [value]="option.value"
                    [formControl]="ownerControl"
                    [attr.aria-invalid]="ownerControl.invalid && ownerControl.touched ? 'true' : null"
                  />
                  <span frFieldLabel>{{ option.label }}</span>
                </label>
              }
            </div>

            @if (ownerControl.invalid && ownerControl.touched) {
              <p frFieldError>Choose an escalation owner to continue.</p>
            }
          </fieldset>

          <button class="mt-4" frButton type="button" (click)="ownerControl.markAsTouched()">Validate</button>
        </div>
      }

      @case ('custom-styling') {
        <div frRadioGroup aria-label="Theme accent" class="docs-radio-stack docs-radio-custom">
          <label frRadioGroupField>
            <input frRadioGroupItem type="radio" name="accent" value="ocean" checked />
            <span frFieldContent>
              <span frFieldLabel>Ocean</span>
              <span frFieldDescription>Use a cool highlight for dashboards and dense data views.</span>
            </span>
          </label>
          <label frRadioGroupField>
            <input frRadioGroupItem type="radio" name="accent" value="forest" />
            <span frFieldContent>
              <span frFieldLabel>Forest</span>
              <span frFieldDescription>Use a calmer highlight for planning and review surfaces.</span>
            </span>
          </label>
        </div>
      }

      @case ('rtl') {
        <div dir="rtl" frRadioGroup aria-label="كثافة العرض" class="docs-radio-stack">
          <label frRadioGroupField>
            <input frRadioGroupItem type="radio" name="rtl-density" value="standard" checked />
            <span frFieldContent>
              <span frFieldLabel>قياسي</span>
              <span frFieldDescription>تباعد مناسب لمعظم شاشات الإعدادات.</span>
            </span>
          </label>
          <label frRadioGroupField>
            <input frRadioGroupItem type="radio" name="rtl-density" value="compact" />
            <span frFieldContent>
              <span frFieldLabel>مضغوط</span>
              <span frFieldDescription>يعرض مزيدا من الخيارات في مساحة أصغر.</span>
            </span>
          </label>
        </div>
      }

      @case ('inspector') {
        <div frRadioGroup aria-label="Token inspector radio group" class="docs-radio-stack" data-token-target="radio-group">
          <label frRadioGroupField data-token-target="radio-field">
            <input frRadioGroupItem type="radio" name="inspector-radio" value="priority" checked data-token-target="radio-item" />
            <span frFieldContent data-token-target="radio-content">
              <span frFieldLabel data-token-target="radio-label">Priority updates</span>
              <span frFieldDescription data-token-target="radio-description">
                Send changes that affect production workflows.
              </span>
            </span>
          </label>
          <label frRadioGroupField data-token-target="radio-disabled-field">
            <input frRadioGroupItem type="radio" name="inspector-radio" value="locked" disabled data-token-target="radio-disabled-item" />
            <span frFieldContent>
              <span frFieldLabel>Organization default</span>
              <span frFieldDescription>Locked by workspace policy.</span>
            </span>
          </label>
          <label frRadioGroupCard data-token-target="radio-card">
            <input frRadioGroupItem type="radio" name="inspector-radio" value="card" />
            <span frFieldContent>
              <span frFieldLabel>Card option</span>
              <span frFieldDescription>Inspect the supported card selection surface.</span>
            </span>
            <span frRadioGroupCardMeta data-token-target="radio-card-meta">Recommended</span>
          </label>
        </div>
      }
    }
  `,
  styles: `
    .docs-radio-stack,
    .docs-radio-cards,
    .docs-radio-fieldset {
      width: min(100%, 30rem);
      margin-inline: auto;
    }

    .docs-radio-fieldset {
      display: grid;
      gap: 1rem;
    }

    .docs-radio-custom {
      --frame-radio-group-gap: 0.875rem;
      --frame-radio-group-item-size: 1.125rem;
      --frame-radio-group-item-dot-size: 0.5625rem;
      --frame-radio-group-item-border: color-mix(in srgb, var(--frame-primary) 28%, var(--frame-border));
      --frame-radio-group-item-hover-border: color-mix(in srgb, var(--frame-primary) 68%, var(--frame-border));
      --frame-radio-group-item-checked-border: var(--frame-primary);
      --frame-radio-group-item-color: var(--frame-primary);
      --frame-radio-group-item-focus-shadow: 0 0 0 4px color-mix(in srgb, var(--frame-primary) 18%, transparent);
    }
  `,
})
export class DocsRadioGroupPreviewComponent {
  readonly config = input.required<RadioGroupPreviewConfig>();

  protected readonly ownerControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  protected readonly densityOptions = [
    { value: 'spacious', label: 'Spacious', description: 'More breathing room for review-heavy settings.' },
    { value: 'balanced', label: 'Balanced', description: 'A default rhythm for most workspace forms.' },
    { value: 'compact', label: 'Compact', description: 'A tighter layout for dense configuration panels.' },
  ];

  protected readonly cadenceOptions = [
    { value: 'daily', label: 'Daily review', description: 'Check activity every morning before standup.' },
    { value: 'weekly', label: 'Weekly review', description: 'Bundle updates into one predictable team pass.' },
    { value: 'manual', label: 'Manual review', description: 'Only notify reviewers when someone requests attention.' },
  ];

  protected readonly planOptions = [
    { value: 'starter', label: 'Starter', description: 'For pilots and internal tooling.', price: 'Free' },
    { value: 'team', label: 'Team', description: 'For shared workspaces and release reviews.', price: '$24' },
    { value: 'scale', label: 'Scale', description: 'For larger organizations with governance needs.', price: 'Custom' },
  ];

  protected readonly scheduleOptions = [
    { value: 'daily', label: 'Daily at 08:00' },
    { value: 'weekly', label: 'Weekly on Monday' },
    { value: 'monthly', label: 'Monthly on the first day' },
  ];

  protected readonly ownerOptions = [
    { value: 'design', label: 'FrameUIs team' },
    { value: 'platform', label: 'Platform engineering' },
    { value: 'support', label: 'Customer support' },
  ];
}

