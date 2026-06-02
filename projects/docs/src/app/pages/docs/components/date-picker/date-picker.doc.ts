import { ComponentDoc } from '../../shared/models/component-doc.model';
import { DocsDatePickerPreviewComponent } from './previews/date-picker-preview';

const importsCode = `import { ReactiveFormsModule } from '@angular/forms';
import { FrDatePickerModule } from '@frame-ui/components/date-picker';`;

const formCode = `import { FormControl } from '@angular/forms';

readonly date = new FormControl<Date | null>(new Date());`;

const basicHtml = `<frame-date-picker [formControl]="date" />`;

const rangeTs = `import { FormControl } from '@angular/forms';
import { FrCalendarDateRange } from '@frame-ui/components/calendar';

readonly range = new FormControl<frCalendarDateRange>({
  from: new Date(2026, 0, 20),
  to: new Date(2026, 1, 9),
});`;

const rangeHtml = `<frame-date-picker
  mode="range"
  [numberOfMonths]="2"
  [formControl]="range"
/>`;

const dobTs = `import { FormControl } from '@angular/forms';

readonly birthday = new FormControl<Date | null>(null);`;

const dobHtml = `<frame-date-picker
  captionLayout="dropdown"
  placeholder="Select date"
  [fromYear]="1926"
  [toYear]="2026"
  [formControl]="birthday"
/>`;

const inputTs = `import { FormControl } from '@angular/forms';

readonly subscriptionDate = new FormControl<Date | null>(null);`;

const inputHtml = `<frame-date-picker
  editable
  placeholder="Select date"
  [formControl]="subscriptionDate"
/>`;

const timeTs = `import { FormControl } from '@angular/forms';

readonly startsAt = new FormControl<Date | null>(
  new Date(2026, 5, 10, 9, 0),
);`;

const timeHtml = `<frame-date-picker
  showTime
  placeholder="Select date"
  [formControl]="startsAt"
/>`;

const validationTs = `import { FormControl, Validators } from '@angular/forms';

readonly publishDate = new FormControl<Date | null>(null, {
  validators: Validators.required,
});`;

const validationHtml = `<div frField>
  <label frFieldLabel>Publish date</label>
  <div frFieldContent>
    <frame-date-picker
      placeholder="Select date"
      [formControl]="publishDate"
    />
  </div>
  <p frFieldDescription>Required date picker using Angular reactive forms.</p>

  @if (publishDate.hasError('required') && publishDate.touched) {
    <p frFieldError>Please select a date.</p>
  }
</div>`;

const customNavHtml = `<frame-date-picker
  [formControl]="date"
  [previousMonthTemplate]="previousIcon"
  [nextMonthTemplate]="nextIcon"
  previousMonthLabel="Previous calendar month"
  nextMonthLabel="Next calendar month"
/>

<ng-template #previousIcon>
  <ng-icon name="tablerChevronLeft" size="16" />
</ng-template>

<ng-template #nextIcon>
  <ng-icon name="tablerChevronRight" size="16" />
</ng-template>`;
const customNavTs = `${importsCode}
${formCode}`;

const presetsHtml = `<frame-date-picker
  [presets]="presets"
  [formControl]="date"
/>`;

const presetsTs = `import { FormControl } from '@angular/forms';
import { FrDatePickerPreset } from '@frame-ui/components/date-picker';

readonly date = new FormControl<Date | null>(new Date());

readonly presets: FrDatePickerPreset[] = [
  { label: 'Today', value: () => new Date(2026, 5, 7) },
  { label: 'Tomorrow', value: () => new Date(2026, 5, 8) },
  { label: 'In 7 days', value: () => new Date(2026, 5, 14) },
];`;

const rtlTs = `import { FormControl } from '@angular/forms';

readonly date = new FormControl<Date | null>(new Date());`;

const rtlHtml = `<div dir="rtl">
  <frame-date-picker
    dir="rtl"
    locale="ar-SA"
    captionLayout="dropdown"
    placeholder="اختر تاريخًا"
    [formControl]="date"
  />
</div>`;

export const DATE_PICKER_DOC: ComponentDoc = {
  slug: 'date-picker',
  breadcrumb: 'Components / Date Picker',

  hero: {
    id: 'date-picker-hero',
    title: 'Preview',
    description: 'A calendar-backed date picker with range selection, presets, editable input, time input, and reactive forms support.',
    preview: {
      component: DocsDatePickerPreviewComponent,
    },
  },

  installation: {
    cli: {
      language: 'bash',
      code: 'npx your-cli add date-picker',
    },
    manual: {
      steps: [
        {
          title: 'Import the date picker component.',
          code: {
            language: 'ts',
            code: importsCode,
          },
        },
      ],
    },
  },

  usage: [
    { language: 'ts', code: formCode },
    { language: 'html', code: basicHtml },
  ],

  composition: `DatePicker
└── Trigger / Editable input
    └── CDK Overlay
        ├── Presets
        ├── Calendar
        └── Time input`,

  tokenInspector: {
    id: 'token-inspector',
    title: 'Token inspector',
    description: 'Inspect the date picker panel surface, presets, calendar, and optional time input.',
    preview: {
      component: DocsDatePickerPreviewComponent,
      inputs: {
        config: { mode: 'inspector' },
      },
      inspectorLayout: 'popover',
      inspectorTargets: [
        {
          id: 'content',
          label: 'Panel',
          selector: '.docs-date-picker-inspector',
          description: 'The panel wraps presets, calendar, and optional time input with surface, radius, shadow, padding, and motion tokens.',
          tokens: [
            '--frame-date-picker-content-bg',
            '--frame-date-picker-content-border',
            '--frame-date-picker-content-radius',
            '--frame-date-picker-content-shadow',
            '--frame-date-picker-content-padding',
            '--frame-date-picker-motion-duration',
          ],
        },
        {
          id: 'preset',
          label: 'Preset',
          selector: '.docs-date-picker-inspector .frame-date-picker__preset',
          description: 'Preset buttons provide quick relative date choices above the calendar.',
          tokens: [
            '--frame-date-picker-preset-height',
            '--frame-date-picker-preset-radius',
            '--frame-date-picker-preset-hover-bg',
          ],
        },
        {
          id: 'calendar',
          label: 'Calendar',
          selector: '.docs-date-picker-inspector .frame-calendar',
          description: 'The picker reuses FrCalendar, so calendar-specific day, caption, range, and navigation tokens still apply.',
          tokens: ['--frame-calendar-bg', '--frame-calendar-cell-size', '--frame-calendar-day-selected-bg'],
        },
        {
          id: 'time',
          label: 'Time input',
          selector: '.docs-date-picker-inspector .frame-date-picker__time',
          description: 'The optional time row separates date selection from time selection while preserving one Date form value.',
          tokens: ['--frame-date-picker-time-border', '--frame-date-picker-time-padding'],
        },
      ],
    },
  },

  examples: [
    {
      id: 'basic',
      title: 'Basic',
      description: 'A basic date picker bound to an Angular reactive form control.',
      preview: {
        component: DocsDatePickerPreviewComponent,
      },
      code: [
        { language: 'ts', code: importsCode },
        { language: 'ts', code: formCode },
        { language: 'html', code: basicHtml },
      ],
    },
    {
      id: 'range',
      title: 'Range Picker',
      description: 'Use range mode with two visible months for selecting start and end dates.',
      preview: {
        component: DocsDatePickerPreviewComponent,
        inputs: { config: { mode: 'range' } },
      },
      code: [
        { language: 'ts', code: rangeTs },
        { language: 'html', code: rangeHtml },
      ],
    },
    {
      id: 'date-of-birth',
      title: 'Date of Birth',
      description: 'Use the dropdown caption layout and a constrained year range for birthday-style selection.',
      preview: {
        component: DocsDatePickerPreviewComponent,
        inputs: { config: { mode: 'dob' } },
      },
      code: [
        { language: 'ts', code: dobTs },
        { language: 'html', code: dobHtml },
      ],
    },
    {
      id: 'input',
      title: 'Input',
      description: 'Set `editable` when users should be able to type a date as well as pick it from the calendar.',
      preview: {
        component: DocsDatePickerPreviewComponent,
        inputs: { config: { mode: 'input' } },
      },
      code: [
        { language: 'ts', code: inputTs },
        { language: 'html', code: inputHtml },
      ],
    },
    {
      id: 'time-picker',
      title: 'Time Picker',
      description: 'Set `showTime` to preserve hours and minutes on the selected Date value.',
      preview: {
        component: DocsDatePickerPreviewComponent,
        inputs: { config: { mode: 'time' } },
      },
      code: [
        { language: 'ts', code: timeTs },
        { language: 'html', code: timeHtml },
      ],
    },
    {
      id: 'reactive-forms-validation',
      title: 'Reactive Forms Validation',
      description: 'Use Date Picker directly with Angular validators such as `Validators.required`.',
      preview: {
        component: DocsDatePickerPreviewComponent,
        inputs: { config: { mode: 'validation' } },
      },
      code: [
        { language: 'ts', code: validationTs },
        { language: 'html', code: validationHtml },
      ],
    },
    {
      id: 'custom-navigation',
      title: 'Custom Navigation',
      description: 'Pass custom previous and next templates through Date Picker to customize the underlying calendar navigation buttons.',
      preview: {
        component: DocsDatePickerPreviewComponent,
        inputs: { config: { mode: 'custom-nav' } },
      },
      code: [
        { language: 'ts', code: customNavTs },
        { language: 'html', code: customNavHtml },
      ],
    },
    {
      id: 'presets',
      title: 'Presets',
      description: 'Preset buttons can set absolute values or lazily compute values such as today, tomorrow, and relative offsets.',
      preview: {
        component: DocsDatePickerPreviewComponent,
        inputs: { config: { mode: 'presets' } },
      },
      code: [
        { language: 'ts', code: presetsTs },
        { language: 'html', code: presetsHtml },
      ],
    },
    {
      id: 'rtl',
      title: 'RTL',
      description: 'The trigger, overlay, and calendar inherit direction and locale configuration.',
      preview: {
        component: DocsDatePickerPreviewComponent,
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
    'Date picker tokens style the trigger and overlay shell. The inner calendar keeps using the existing calendar token contract.',
  tokens: `
  --frame-date-picker-trigger-height: 2.5rem;
  --frame-date-picker-trigger-width: 17.5rem;
  --frame-date-picker-trigger-padding: 0 0.75rem;
  --frame-date-picker-trigger-gap: 0.5rem;
  --frame-date-picker-trigger-radius: var(--frame-radius-md);
  --frame-date-picker-trigger-bg: var(--frame-background);
  --frame-date-picker-trigger-color: var(--frame-foreground);
  --frame-date-picker-trigger-border: var(--frame-border);
  --frame-date-picker-trigger-hover-border: color-mix(in srgb, var(--frame-ring) 42%, var(--frame-border));
  --frame-date-picker-trigger-placeholder-color: var(--frame-muted-foreground);
  --frame-date-picker-trigger-disabled-opacity: 0.5;
  --frame-date-picker-trigger-invalid-border: var(--frame-destructive);
  --frame-date-picker-trigger-focus-shadow: 0 0 0 3px color-mix(in srgb, var(--frame-ring) 26%, transparent);
  --frame-date-picker-content-bg: var(--frame-surface);
  --frame-date-picker-content-color: var(--frame-surface-foreground);
  --frame-date-picker-content-border: var(--frame-border);
  --frame-date-picker-content-radius: var(--frame-radius-lg);
  --frame-date-picker-content-shadow: var(--frame-shadow-md);
  --frame-date-picker-content-padding: 0.25rem;
  --frame-date-picker-presets-border: var(--frame-border);
  --frame-date-picker-preset-height: 2rem;
  --frame-date-picker-preset-radius: var(--frame-radius-md);
  --frame-date-picker-preset-hover-bg: var(--frame-muted);
  --frame-date-picker-time-border: var(--frame-border);
  --frame-date-picker-time-padding: 0.75rem;
  --frame-date-picker-motion-duration: 140ms;
  --frame-date-picker-motion-easing: cubic-bezier(0.16, 1, 0.3, 1);
  `,
};

