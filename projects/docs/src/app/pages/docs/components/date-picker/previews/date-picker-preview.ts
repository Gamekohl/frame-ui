import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { FrButtonModule } from '@frame-ui/components/button';
import { FrCalendarModule, FrCalendarDateRange } from '@frame-ui/components/calendar';
import { FrDatePickerModule, FrDatePickerPreset } from '@frame-ui/components/date-picker';
import { FrFieldModule } from '@frame-ui/components/field';

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
                captionLayout="dropdown"
                placeholder="Select date"
                [fromYear]="1926"
                [toYear]="2026"
                [month]="june2026"
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
                [month]="june2026"
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
                [month]="june2026"
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
                [month]="june2026"
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
            [month]="june2026"
            [formControl]="dateControl"
            [previousMonthTemplate]="previousIcon"
            [nextMonthTemplate]="nextIcon"
            previousMonthLabel="Previous calendar month"
            nextMonthLabel="Next calendar month"
          />

          <ng-template #previousIcon>
            <span aria-hidden="true">←</span>
          </ng-template>

          <ng-template #nextIcon>
            <span aria-hidden="true">→</span>
          </ng-template>
        }

        @case ('presets') {
          <frame-date-picker [presets]="presets" [month]="june2026" [formControl]="dateControl" />
        }

        @case ('rtl') {
          <div dir="rtl">
            <frame-date-picker
              dir="rtl"
              locale="ar-SA"
              captionLayout="dropdown"
              placeholder="اختر تاريخًا"
              [month]="june2026"
              [formControl]="dateControl"
            />
          </div>
        }

        @case ('inspector') {
          <div class="docs-date-picker-inspector frame-date-picker__content">
            <div class="frame-date-picker__presets" aria-label="Date presets">
              @for (preset of presets; track preset.label) {
                <button class="frame-date-picker__preset" type="button">
                  {{ preset.label }}
                </button>
              }
            </div>

            <frame-calendar [month]="june2026" [selected]="timeControl.value" />

            <label class="frame-date-picker__time">
              <span class="frame-date-picker__time-label">Time</span>
              <input class="frame-date-picker__time-input" type="time" value="09:00" />
            </label>
          </div>
        }

        @default {
          <frame-date-picker [month]="june2026" [formControl]="dateControl" />
        }
      }
    </div>
  `,
})
export class DocsDatePickerPreviewComponent {
  readonly config = input<DatePickerPreviewConfig>({});

  readonly june2026 = new Date(2026, 5, 1);
  readonly january2026 = new Date(2026, 0, 1);
  readonly dateControl = new FormControl<Date | null>(new Date(2026, 5, 10));
  readonly emptyDateControl = new FormControl<Date | null>(null);
  readonly timeControl = new FormControl<Date | null>(new Date(2026, 5, 10, 9, 0));
  readonly requiredDateControl = new FormControl<Date | null>(null, {
    validators: Validators.required,
  });
  readonly rangeControl = new FormControl<FrCalendarDateRange>({
    from: new Date(2026, 0, 20),
    to: new Date(2026, 1, 9),
  });

  readonly presets: FrDatePickerPreset[] = [
    { label: 'Today', value: () => new Date(2026, 5, 7) },
    { label: 'Tomorrow', value: () => new Date(2026, 5, 8) },
    { label: 'In 7 days', value: () => new Date(2026, 5, 14) },
  ];
}

