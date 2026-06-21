import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { tablerChevronDown } from '@ng-icons/tabler-icons';
import { FrButtonModule } from '@frame-ui-ng/components/button';
import { FrCalendarModule, FrCalendarDateRange } from '@frame-ui-ng/components/calendar';
import { FrFieldModule } from '@frame-ui-ng/components/field';
import { FrSelectModule } from '@frame-ui-ng/components/select';

export type CalendarPreviewMode =
  | 'basic'
  | 'range'
  | 'dropdown'
  | 'presets'
  | 'date-time'
  | 'disabled-dates'
  | 'custom-size'
  | 'select-trigger'
  | 'inspector'
  | 'week-numbers'
  | 'timezone'
  | 'rtl';

export type CalendarPreviewConfig = {
  mode?: CalendarPreviewMode;
  className?: string;
  style?: string;
  tokenPrefix?: string;
};

function startOfToday(): Date {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date;
}

function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

@Component({
  host: {
    'class': 'flex justify-center items-center',
  },
  selector: 'docs-calendar-preview',
  imports: [
    FrButtonModule,
    FrCalendarModule,
    FrFieldModule,
    FrSelectModule,
    NgIcon,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [provideIcons({ tablerChevronDown })],
  template: `
    <div [class]="config().className ?? 'w-full'" [style]="config().style ?? null">
      @switch (config().mode ?? 'basic') {
        @case ('range') {
          <frame-calendar
            class="docs-calendar-range-demo"
            locale="de-DE"
            mode="range"
            [firstDayOfWeek]="1"
            [month]="june2026"
            [selected]="range()"
            (selectedChange)="range.set($any($event))"
          />
        }

        @case ('dropdown') {
          <frame-calendar
            captionLayout="dropdown"
            [month]="june2026"
            [fromYear]="1926"
            [toYear]="2026"
          />
        }

        @case ('presets') {
          <div class="grid gap-4">
            <frame-calendar [month]="june2026" [selected]="date()" (selectedChange)="date.set($any($event))" />
            <div class="flex flex-wrap gap-2">
              @for (preset of presets; track preset.label) {
                <button frButton appearance="outline" size="sm" type="button" (click)="date.set(preset.date)">
                  {{ preset.label }}
                </button>
              }
            </div>
          </div>
        }

        @case ('date-time') {
          <div class="flex flex-col gap-4">
            <frame-calendar [month]="june2026" [selected]="date()" (selectedChange)="date.set($any($event))" />
            <div class="grid content-start gap-4">
              <div frField>
                <label frFieldLabel for="calendar-start-time">Start Time</label>
                <div frFieldContent>
                  <input id="calendar-start-time" class="docs-calendar-time-input" type="time" value="09:00" />
                </div>
              </div>
              <div frField>
                <label frFieldLabel for="calendar-end-time">End Time</label>
                <div frFieldContent>
                  <input id="calendar-end-time" class="docs-calendar-time-input" type="time" value="17:00" />
                </div>
              </div>
            </div>
          </div>
        }

        @case ('disabled-dates') {
          <frame-calendar
            [month]="february2026"
            [disabledDates]="disabledDates"
            [selected]="date()"
            (selectedChange)="date.set($any($event))"
          />
        }

        @case ('custom-size') {
          <frame-calendar
            class="docs-calendar-custom-size"
            captionLayout="dropdown"
            [month]="december2026"
            [dateLabels]="dateLabels"
          />
        }

        @case ('select-trigger') {
          <button [frSelect]="calendarSelect" [value]="dateLabel()" type="button">
            <frame-select-value placeholder="Pick a date"></frame-select-value>
            <span frSelectIcon>
              <ng-icon name="tablerChevronDown" size="16" />
            </span>
          </button>

          <ng-template #calendarSelect="frSelectContent" frSelectContent position="popper" [sideOffset]="8">
            <div frSelectPanel>
              <frame-calendar
                [month]="june2026"
                [selected]="date()"
                (selectedChange)="date.set($any($event))"
              />
            </div>
          </ng-template>
        }

        @case ('inspector') {
          <frame-calendar
            class="docs-calendar-inspector-demo"
            locale="de-DE"
            mode="range"
            [firstDayOfWeek]="1"
            [month]="june2026"
            [selected]="range()"
            [disabledDates]="disabledDates"
            [dateLabels]="dateLabels"
            (selectedChange)="range.set($any($event))"
          />
        }

        @case ('week-numbers') {
          <frame-calendar [month]="february2026" [showWeekNumber]="true" />
        }

        @case ('timezone') {
          <div class="grid gap-3">
            <frame-calendar
              [month]="june2026"
              [selected]="date()"
              [timeZone]="timeZone()"
              (selectedChange)="date.set($any($event))"
            />
            <p class="text-sm text-muted-foreground">
              Time zone: <code>{{ timeZone() }}</code>
            </p>
          </div>
        }

        @case ('rtl') {
          <div dir="rtl">
            <frame-calendar
              dir="rtl"
              locale="ar-SA"
              captionLayout="dropdown"
              [month]="june2026"
              [selected]="date()"
              (selectedChange)="date.set($any($event))"
            />
          </div>
        }

        @default {
          <frame-calendar
            [month]="june2026"
            [selected]="date()"
            [attr.data-token-target]="tokenTarget('root')"
            (selectedChange)="date.set($any($event))"
          />
        }
      }
    </div>
  `,
  styles: `
    .docs-calendar-time-input {
      min-height: 2.5rem;
      border: 1px solid var(--frame-border);
      border-radius: var(--frame-radius-md);
      background: var(--frame-background);
      color: var(--frame-foreground);
      font: inherit;
      padding-inline: 0.75rem;
    }

    .docs-calendar-custom-size {
      --frame-calendar-cell-size: 3rem;
    }
  `,
})
export class DocsCalendarPreviewComponent {
  readonly config = input<CalendarPreviewConfig>({});

  readonly june2026 = new Date(2026, 5, 1);
  readonly january2026 = new Date(2026, 0, 1);
  readonly february2026 = new Date(2026, 1, 1);
  readonly december2026 = new Date(2026, 11, 1);

  readonly date = signal<Date | null>(new Date(2026, 5, 10));
  readonly range = signal<FrCalendarDateRange>({ from: new Date(2026, 5, 8), to: new Date(2026, 5, 13) });
  readonly timeZone = signal(Intl.DateTimeFormat().resolvedOptions().timeZone);
  readonly dateLabel = computed(() =>
    this.date()
      ? new Intl.DateTimeFormat('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }).format(this.date()!)
      : null,
  );

  private readonly today = startOfToday();

  readonly presets = [
    { label: 'Today', date: this.today },
    { label: 'Tomorrow', date: addDays(this.today, 1) },
    { label: 'In 3 days', date: addDays(this.today, 3) },
    { label: 'In a week', date: addDays(this.today, 7) },
    { label: 'In 2 weeks', date: addDays(this.today, 14) },
  ];

  readonly disabledDates = [
    new Date(2026, 5, 15),
    new Date(2026, 1, 6),
    new Date(2026, 1, 13),
    new Date(2026, 1, 20),
    new Date(2026, 1, 21),
  ];

  readonly dateLabels = computed(() =>
    Object.fromEntries(
      [
        ['2026-06-9', 'Note'],
        ['2026-06-11', 'Busy'],
        ...Array.from({ length: 31 }, (_, index) => {
        const day = `${index + 1}`.padStart(2, '0');
        const weekend = [5, 6, 12, 13, 19, 20, 26, 27].includes(index + 1);
        return [`2026-12-${day}`, weekend ? '$120' : '$100'];
        }),
      ].map(([key, value]) => [key.replace(/-(\d)$/, '-0$1'), value]),
    ),
  )();

  protected tokenTarget(key: string): string | null {
    const prefix = this.config().tokenPrefix;
    return prefix ? `${prefix}-${key}` : null;
  }

}

