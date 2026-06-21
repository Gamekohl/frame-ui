import { ComponentDoc } from '../../shared/models/component-doc.model';
import { DocsCalendarPreviewComponent } from './previews/calendar-preview';

const calendarImportsCode = `import { FrCalendarModule } from '@frame-ui-ng/components/calendar';`;

export const CALENDAR_DOC: ComponentDoc = {
  slug: 'calendar',
  breadcrumb: 'Components / Calendar',

  hero: {
    id: 'calendar-hero',
    title: 'Preview',
    preview: {
      component: DocsCalendarPreviewComponent,
    },
  },

  installation: {
    cli: {
      language: 'bash',
      code: 'npx your-cli add calendar',
    },
    manual: {
      steps: [
        {
          title: 'Import the calendar component.',
          code: {
            language: 'ts',
            code: calendarImportsCode,
          },
        },
      ],
    },
  },

  usage: [
    {
      language: 'ts',
      code: `import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FrCalendarModule } from '@frame-ui-ng/components/calendar';

date = new FormControl<Date | null>(new Date());`,
    },
    {
      language: 'html',
      code: `<frame-calendar [formControl]="date" />`,
    },
  ],

  tokenInspector: {
    id: 'token-inspector',
    title: 'Token inspector',
    description:
      'Inspect the calendar shell, navigation, caption, weekday labels, day cells, selected state, and range state.',
    preview: {
      component: DocsCalendarPreviewComponent,
      inputs: {
        config: {
          mode: 'inspector',
        },
      },
      inspectorTargets: [
        {
          id: 'root',
          label: 'Calendar',
          selector: '.docs-calendar-inspector-demo',
          description: 'The calendar root controls surface, border, radius, padding, typography, and cell sizing.',
          tokens: [
            '--frame-calendar-bg',
            '--frame-calendar-color',
            '--frame-calendar-border',
            '--frame-calendar-radius',
            '--frame-calendar-width',
            '--frame-calendar-padding',
            '--frame-calendar-cell-size',
          ],
        },
        {
          id: 'navigation',
          label: 'Navigation',
          selector: '.docs-calendar-inspector-demo .frame-calendar__nav-button',
          description: 'Navigation buttons use compact square controls with hover and focus treatment.',
          tokens: [
            '--frame-calendar-nav-size',
            '--frame-calendar-nav-radius',
            '--frame-calendar-nav-hover-bg',
            '--frame-calendar-focus-shadow',
          ],
        },
        {
          id: 'caption',
          label: 'Caption',
          selector: '.docs-calendar-inspector-demo .frame-calendar__caption',
          description: 'The caption inherits calendar foreground color and establishes the visible month.',
          tokens: ['--frame-calendar-color'],
        },
        {
          id: 'weekday',
          label: 'Weekday',
          selector: '.docs-calendar-inspector-demo .frame-calendar__weekday',
          description: 'Weekday labels use the calendar cell size and muted foreground color.',
          tokens: [
            '--frame-calendar-cell-size',
            '--frame-calendar-muted-color',
          ],
        },
        {
          id: 'day',
          label: 'Day Cell',
          selector: '.docs-calendar-inspector-demo .frame-calendar__day',
          description: 'Day cells define the interactive hit target, radius, hover color, and focus ring.',
          tokens: [
            '--frame-calendar-cell-size',
            '--frame-calendar-cell-radius',
            '--frame-calendar-day-hover-bg',
            '--frame-calendar-day-hover-color',
            '--frame-calendar-focus-shadow',
          ],
        },
        {
          id: 'selected',
          label: 'Selected Day',
          selector: '.docs-calendar-inspector-demo [data-range-start] .frame-calendar__day',
          description: 'Selected range endpoints use the selected day background and foreground colors.',
          tokens: [
            '--frame-calendar-day-selected-bg',
            '--frame-calendar-day-selected-color',
            '--frame-calendar-day-range-outline',
          ],
        },
        {
          id: 'range',
          label: 'Range Fill',
          selector: '.docs-calendar-inspector-demo [data-range-middle]',
          description: 'Middle range cells use a subtle background band behind the day button.',
          tokens: ['--frame-calendar-day-range-bg'],
        },
        {
          id: 'disabled',
          label: 'Disabled Date',
          selector: '.docs-calendar-inspector-demo [data-disabled-date] .frame-calendar__day',
          description: 'Disabled dates are unavailable for selection and use reduced opacity plus decoration.',
          tokens: [
            '--frame-calendar-day-disabled-opacity',
            '--frame-calendar-day-disabled-date-decoration',
          ],
        },
        {
          id: 'metadata',
          label: 'Date Label',
          selector: '.docs-calendar-inspector-demo .frame-calendar__day-meta',
          description: 'Date labels render compact metadata below the day number.',
          tokens: ['--frame-calendar-cell-size'],
        },
      ],
    },
  },

  styling: {
    description:
      'Override calendar tokens locally to tune the surface, selected day color, focus ring, navigation controls, or cell size.',
    preview: {
      id: 'custom-styling-preview',
      title: 'Custom Styling Preview',
      description: 'This preview increases the cell size and uses the built-in date label slot.',
      preview: {
        component: DocsCalendarPreviewComponent,
        inputs: {
          config: { mode: 'custom-size' },
        },
      },
      code: [
        {
          language: 'css',
          code: `.booking-calendar {
  --frame-calendar-cell-size: 3rem;
  --frame-calendar-day-selected-bg: var(--frame-primary);
}`,
        },
      ],
    },
  },

  examples: [
    {
      id: 'basic',
      title: 'Basic',
      description: 'A single-date calendar with native button cells and month navigation.',
      preview: {
        component: DocsCalendarPreviewComponent,
      },
      code: [
        {
          language: 'ts',
          code: `${calendarImportsCode}

date: Date | null = new Date(2026, 5, 10);`,
        },
        {
          language: 'html',
          code: `<frame-calendar [selected]="date" (selectedChange)="date = $any($event)" />`,
        },
      ],
    },
    {
      id: 'range',
      title: 'Range Calendar',
      description: 'Set mode="range" and optionally render multiple months for start and end date selection.',
      preview: {
        component: DocsCalendarPreviewComponent,
        inputs: { config: { mode: 'range' } },
      },
      code: [
        {
          language: 'ts',
          code: `import { FrCalendarDateRange, FrCalendarModule } from '@frame-ui-ng/components/calendar';

month = new Date(2026, 5, 1);
range: FrCalendarDateRange = {
  from: new Date(2026, 5, 8),
  to: new Date(2026, 5, 13),
};`,
        },
        {
          language: 'html',
          code: `<frame-calendar
  locale="de-DE"
  mode="range"
  [firstDayOfWeek]="1"
  [month]="month"
  [selected]="range"
  (selectedChange)="range = $any($event)"
/>`,
        },
      ],
    },
    {
      id: 'dropdown',
      title: 'Month and Year Selector',
      description: 'Use captionLayout="dropdown" with fromYear and toYear to expose month and year selects.',
      preview: {
        component: DocsCalendarPreviewComponent,
        inputs: { config: { mode: 'dropdown' } },
      },
      code: [
        {
          language: 'ts',
          code: `${calendarImportsCode}

month = new Date(2026, 5, 1);`,
        },
        {
          language: 'html',
          code: `<frame-calendar
  captionLayout="dropdown"
  [month]="month"
  [fromYear]="1926"
  [toYear]="2026"
/>`,
        },
      ],
    },
    {
      id: 'presets',
      title: 'Presets',
      description: 'Compose preset buttons around the calendar and update the selected date from application state.',
      preview: {
        component: DocsCalendarPreviewComponent,
        inputs: { config: { mode: 'presets' } },
      },
      code: [
        {
          language: 'ts',
          code: `import { FrButtonModule } from '@frame-ui-ng/components/button';
import { FrCalendarModule } from '@frame-ui-ng/components/calendar';

date: Date | null = new Date(2026, 5, 10);
tomorrow = new Date(2026, 5, 7);`,
        },
        {
          language: 'html',
          code: `<frame-calendar [selected]="date" (selectedChange)="date = $any($event)" />

<button frButton appearance="outline" type="button" (click)="date = tomorrow">
  Tomorrow
</button>`,
        },
      ],
    },
    {
      id: 'date-time',
      title: 'Date and Time Picker',
      description: 'Pair the calendar with native time inputs when the flow needs a date and time range.',
      preview: {
        component: DocsCalendarPreviewComponent,
        inputs: { config: { mode: 'date-time' } },
      },
      code: [
        {
          language: 'ts',
          code: `import { FormsModule } from '@angular/forms';
import { FrCalendarModule } from '@frame-ui-ng/components/calendar';

date: Date | null = new Date(2026, 5, 10);
startTime = '09:00';
endTime = '17:00';`,
        },
        {
          language: 'html',
          code: `<frame-calendar [selected]="date" (selectedChange)="date = $any($event)" />
<input type="time" [(ngModel)]="startTime" />
<input type="time" [(ngModel)]="endTime" />`,
        },
      ],
    },
    {
      id: 'disabled-dates',
      title: 'Disabled dates',
      description: 'Pass disabledDates to prevent selection and style unavailable dates.',
      preview: {
        component: DocsCalendarPreviewComponent,
        inputs: { config: { mode: 'disabled-dates' } },
      },
      code: [
        {
          language: 'ts',
          code: `${calendarImportsCode}

disabledDates = [
  new Date(2026, 1, 6),
  new Date(2026, 1, 13),
  new Date(2026, 1, 20),
];`,
        },
        {
          language: 'html',
          code: `<frame-calendar [disabledDates]="disabledDates" />`,
        },
      ],
    },
    {
      id: 'custom-size',
      title: 'Custom Cell Size',
      description: 'Use --frame-calendar-cell-size to resize the day grid, including custom date labels.',
      preview: {
        component: DocsCalendarPreviewComponent,
        inputs: { config: { mode: 'custom-size' } },
      },
      code: [
        {
          language: 'ts',
          code: `${calendarImportsCode}

dateLabels = {
  '2026-12-01': '$100',
  '2026-12-05': '$120',
};`,
        },
        {
          language: 'html',
          code: `<frame-calendar class="booking-calendar" [dateLabels]="dateLabels" />`,
        },
        {
          language: 'css',
          code: `.booking-calendar {
  --frame-calendar-cell-size: 3rem;
}`,
        },
      ],
    },
    {
      id: 'select-trigger',
      title: 'Open from select',
      description:
        'Use the select trigger and panel primitives to present a compact date-picker style calendar.',
      preview: {
        component: DocsCalendarPreviewComponent,
        inputs: { config: { mode: 'select-trigger' } },
      },
      code: [
        {
          language: 'ts',
          code: `import { computed, signal } from '@angular/core';
import { FrCalendarModule } from '@frame-ui-ng/components/calendar';
import { FrSelectModule } from '@frame-ui-ng/components/select';

date = signal<Date | null>(new Date(2026, 5, 10));
dateLabel = computed(() =>
  this.date()
    ? new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }).format(this.date()!)
    : null,
);`,
        },
        {
          language: 'html',
          code: `<button [frSelect]="calendarSelect" [value]="dateLabel()" type="button">
  <frame-select-value placeholder="Pick a date"></frame-select-value>
  <span frSelectIcon>
    <ng-icon name="tablerChevronDown" size="16" />
  </span>
</button>

<ng-template #calendarSelect="frSelectContent" frSelectContent position="popper">
  <div frSelectPanel>
    <frame-calendar [selected]="date()" (selectedChange)="date.set($any($event))" />
  </div>
</ng-template>`,
        },
      ],
    },
    {
      id: 'week-numbers',
      title: 'Week Numbers',
      description: 'Use showWeekNumber to display ISO week numbers at the start of each row.',
      preview: {
        component: DocsCalendarPreviewComponent,
        inputs: { config: { mode: 'week-numbers' } },
      },
      code: [
        {
          language: 'ts',
          code: `${calendarImportsCode}

month = new Date(2026, 1, 1);`,
        },
        {
          language: 'html',
          code: `<frame-calendar [month]="month" showWeekNumber />`,
        },
      ],
    },
    {
      id: 'timezone',
      title: 'Selected Date With Time Zone',
      description: 'Pass timeZone when date labels and selected dates should be formatted for a specific zone.',
      preview: {
        component: DocsCalendarPreviewComponent,
        inputs: { config: { mode: 'timezone' } },
      },
      code: [
        {
          language: 'ts',
          code: `${calendarImportsCode}

date: Date | null = null;
timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;`,
        },
        {
          language: 'html',
          code: `<frame-calendar [timeZone]="timeZone" [selected]="date" />`,
        },
      ],
    },
    {
      id: 'rtl',
      title: 'RTL support',
      description: 'Pass dir="rtl" and an RTL locale to mirror layout and localize month and weekday labels.',
      preview: {
        component: DocsCalendarPreviewComponent,
        inputs: { config: { mode: 'rtl' } },
      },
      code: [
        {
          language: 'ts',
          code: `${calendarImportsCode}

date: Date | null = new Date(2026, 5, 10);`,
        },
        {
          language: 'html',
          code: `<div dir="rtl">
  <frame-calendar dir="rtl" locale="ar-SA" />
</div>`,
        },
      ],
    },
  ],

  tokensTitle: 'Design Tokens',
  tokensDescription:
    'Use these CSS custom properties to tune calendar surface, navigation, cells, selected dates, ranges, disabled dates, and focus treatment.',
  tokens: `
  --frame-calendar-bg: var(--frame-surface);
  --frame-calendar-color: var(--frame-surface-foreground);
  --frame-calendar-border: var(--frame-border);
  --frame-calendar-radius: var(--frame-radius-lg);
  --frame-calendar-width: fit-content;
  --frame-calendar-padding: 0.875rem;
  --frame-calendar-gap: 1rem;
  --frame-calendar-cell-size: 2.25rem;
  --frame-calendar-cell-radius: var(--frame-radius-md);
  --frame-calendar-muted-color: var(--frame-muted-foreground);
  --frame-calendar-day-hover-bg: var(--frame-muted);
  --frame-calendar-day-selected-bg: var(--frame-primary);
  --frame-calendar-day-selected-color: var(--frame-primary-foreground);
  --frame-calendar-day-range-bg: color-mix(in srgb, var(--frame-primary) 14%, transparent);
  --frame-calendar-day-today-border: color-mix(in srgb, var(--frame-primary) 55%, var(--frame-border));
  --frame-calendar-day-disabled-opacity: 0.38;
  `,
};

