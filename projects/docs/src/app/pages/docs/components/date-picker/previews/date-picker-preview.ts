import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { FrButtonModule } from '@frame-ui-ng/components/button';
import { FrCalendarModule, FrCalendarDateRange } from '@frame-ui-ng/components/calendar';
import { FrDatePickerModule, FrDatePickerPreset } from '@frame-ui-ng/components/date-picker';
import { FrFieldModule } from '@frame-ui-ng/components/field';

export type DatePickerPreviewMode =
  | 'basic'
  | 'range'
  | 'dob'
  | 'input'
  | 'time'
  | 'validation'
  | 'custom-nav'
  | 'presets'
  | 'rtl'
  | 'inspector';

export type DatePickerPreviewConfig = {
  mode?: DatePickerPreviewMode;
  className?: string;
  style?: string;
};

function startOfToday(): Date {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date;
}

function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function withTime(date: Date, hours: number, minutes: number): Date {
  const next = new Date(date);
  next.setHours(hours, minutes, 0, 0);
  return next;
}

@Component({
  selector: 'docs-date-picker-preview',
  imports: [
    FrCalendarModule,
    FrDatePickerModule,
    FrFieldModule,
    ReactiveFormsModule,
    FrButtonModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      [class]="config().className ?? 'grid w-full place-items-center gap-4'"
      [style]="config().style ?? null"
    >
      @switch (config().mode ?? 'basic') {
        @case ('range') {
          <frame-date-picker
            mode="range"
            [numberOfMonths]="2"
            [month]="january2026"
            [formControl]="rangeControl"
          />
        }

        @case ('dob') {
          <div frField class="w-72">
            <label frFieldLabel>Date of birth</label>
            <div frFieldContent>
              <frame-date-picker
                placeholder="Select date"
                [fromYear]="1926"
                [toYear]="currentYear"
                [month]="currentMonth"
                [formControl]="dateControl"
              />
            </div>
          </div>
        }

        @case ('input') {
          <div frField class="w-72">
            <label frFieldLabel>Subscription Date</label>
            <div frFieldContent>
              <frame-date-picker
                editable
                placeholder="Select date"
                [month]="currentMonth"
                [formControl]="emptyDateControl"
              />
            </div>
            <p frFieldDescription>Type YYYY-MM-DD or pick from the calendar.</p>
          </div>
        }

        @case ('time') {
          <div frField class="w-72">
            <label frFieldLabel>Date</label>
            <div frFieldContent>
              <frame-date-picker
                showTime
                placeholder="Select date"
                [month]="currentMonth"
                [formControl]="timeControl"
              />
            </div>
          </div>
        }

        @case ('validation') {
          <div frField class="w-80">
            <label frFieldLabel>Publish date</label>
            <div frFieldContent>
              <frame-date-picker
                placeholder="Select date"
                [month]="currentMonth"
                [formControl]="requiredDateControl"
              />
            </div>
            <p frFieldDescription>Required date picker using Angular reactive forms.</p>
            @if (requiredDateControl.hasError('required') && requiredDateControl.touched) {
              <p frFieldError>Please select a date.</p>
            }
            <button frButton type="button" (click)="requiredDateControl.markAsTouched()">
              Validate
            </button>
          </div>
        }

        @case ('custom-nav') {
          <frame-date-picker
            [month]="currentMonth"
            [formControl]="dateControl"
            [previousMonthTemplate]="previousIcon"
            [nextMonthTemplate]="nextIcon"
            previousMonthLabel="Previous calendar month"
            nextMonthLabel="Next calendar month"
          />

          <ng-template #previousIcon>
            <svg aria-hidden="true" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="m15 18-6-6 6-6"></path>
            </svg>
          </ng-template>

          <ng-template #nextIcon>
            <svg aria-hidden="true" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="m9 18 6-6-6-6"></path>
            </svg>
          </ng-template>
        }

        @case ('presets') {
          <frame-date-picker [presets]="presets" [month]="currentMonth" [formControl]="dateControl" />
        }

        @case ('rtl') {
          <div dir="rtl">
            <frame-date-picker
              dir="rtl"
              locale="ar-SA"
              placeholder="اختر تاريخًا"
              [month]="currentMonth"
              [formControl]="dateControl"
            />
          </div>
        }

        @case ('inspector') {
          <div class="docs-date-picker-inspector frame-date-picker__content">
            <frame-calendar [month]="currentMonth" [selected]="timeControl.value" />

            <label class="frame-date-picker__time">
              <span class="frame-date-picker__time-label">Time</span>
              <input class="frame-date-picker__time-input" type="time" value="09:00" />
            </label>

            <div class="frame-date-picker__presets" aria-label="Date presets">
              @for (preset of presets; track preset.label) {
                <button class="frame-date-picker__preset" type="button">
                  {{ preset.label }}
                </button>
              }
            </div>
          </div>
        }

        @default {
          <frame-date-picker [month]="currentMonth" [formControl]="dateControl" />
        }
      }
    </div>
  `,
})
export class DocsDatePickerPreviewComponent {
  readonly config = input<DatePickerPreviewConfig>({});

  readonly january2026 = new Date(2026, 0, 1);
  private readonly today = startOfToday();
  readonly currentYear = this.today.getFullYear();
  readonly currentMonth = startOfMonth(this.today);
  readonly dateControl = new FormControl<Date | null>(this.today);
  readonly emptyDateControl = new FormControl<Date | null>(null);
  readonly timeControl = new FormControl<Date | null>(withTime(this.today, 9, 0));
  readonly requiredDateControl = new FormControl<Date | null>(null, {
    validators: Validators.required,
  });
  readonly rangeControl = new FormControl<FrCalendarDateRange>({
    from: new Date(2026, 0, 20),
    to: new Date(2026, 1, 9),
  });

  readonly presets: FrDatePickerPreset[] = [
    { label: 'Today', value: () => startOfToday() },
    { label: 'Tomorrow', value: () => addDays(startOfToday(), 1) },
    { label: 'In 7 days', value: () => addDays(startOfToday(), 7) },
  ];
}

