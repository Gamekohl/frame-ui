import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  TemplateRef,
  booleanAttribute,
  computed,
  forwardRef,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type FrCalendarMode = 'single' | 'range';
export type FrCalendarCaptionLayout = 'label' | 'dropdown';

export type FrCalendarDateRange = {
  from: Date | null;
  to: Date | null;
};

export type FrCalendarCellContext = {
  date: Date;
  day: number;
  dateLabel?: string;
  disabled: boolean;
  disabledDate: boolean;
  outside: boolean;
  selected: boolean;
  today: boolean;
};

export type FrCalendarDisabledMatcher = (date: Date) => boolean;

type CalendarDay = FrCalendarCellContext & {
  key: string;
  rangeEnd: boolean;
  rangeMiddle: boolean;
  rangeStart: boolean;
};

type CalendarMonth = {
  date: Date;
  key: string;
  label: string;
  weeks: CalendarDay[][];
};

const VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FrCalendar),
  multi: true,
};

/** Calendar control for single-date and range selection. */
@Component({
  selector: 'frame-calendar',
  imports: [NgTemplateOutlet],
  providers: [VALUE_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'frame-calendar',
    '[attr.data-mode]': 'mode()',
    '[attr.data-caption-layout]': 'captionLayout()',
    '[attr.data-disabled]': 'isDisabled() ? "" : null',
    '[attr.dir]': 'dir()',
  },
  template: `
    <div class="frame-calendar__header">
      <button
        class="frame-calendar__nav-button"
        type="button"
        [disabled]="isDisabled()"
        (click)="previousMonth()"
        [attr.aria-label]="previousMonthLabel()"
      >
        @if (previousMonthTemplate(); as template) {
          <ng-container [ngTemplateOutlet]="template" />
        } @else {
          {{ previousMonthIcon() }}
        }
      </button>

      @if (captionLayout() === 'dropdown') {
        <div class="frame-calendar__caption-controls">
          <select
            class="frame-calendar__select"
            [disabled]="isDisabled()"
            [value]="currentMonth().getMonth()"
            aria-label="Month"
            (change)="setMonth($any($event.target).value)"
          >
            @for (month of monthOptions(); track month.value) {
              <option [value]="month.value" [selected]="month.value === currentMonth().getMonth()">
                {{ month.label }}
              </option>
            }
          </select>

          <select
            class="frame-calendar__select"
            [disabled]="isDisabled()"
            [value]="currentMonth().getFullYear()"
            aria-label="Year"
            (change)="setYear($any($event.target).value)"
          >
            @for (year of yearOptions(); track year) {
              <option [value]="year" [selected]="year === currentMonth().getFullYear()">
                {{ year }}
              </option>
            }
          </select>
        </div>
      } @else {
        <div class="frame-calendar__caption" aria-live="polite">
          {{ monthLabel(currentMonth()) }}
        </div>
      }

      <button
        class="frame-calendar__nav-button"
        type="button"
        [disabled]="isDisabled()"
        (click)="nextMonth()"
        [attr.aria-label]="nextMonthLabel()"
      >
        @if (nextMonthTemplate(); as template) {
          <ng-container [ngTemplateOutlet]="template" />
        } @else {
          {{ nextMonthIcon() }}
        }
      </button>
    </div>

    <div class="frame-calendar__months">
      @for (month of months(); track month.key) {
        <section class="frame-calendar__month" [attr.aria-label]="month.label">
          @if (numberOfMonths() > 1 || captionLayout() === 'dropdown') {
            <h3 class="frame-calendar__month-caption">{{ month.label }}</h3>
          }

          <table class="frame-calendar__table" role="grid" [attr.aria-readonly]="true">
            <thead>
              <tr>
                @if (showWeekNumber()) {
                  <th class="frame-calendar__week-number-header" scope="col">Wk</th>
                }
                @for (weekday of weekdayLabels(); track weekday) {
                  <th class="frame-calendar__weekday" scope="col">{{ weekday }}</th>
                }
              </tr>
            </thead>
            <tbody>
              @for (week of month.weeks; track week[0].key) {
                <tr>
                  @if (showWeekNumber()) {
                    <td class="frame-calendar__week-number">{{ weekNumber(week[0].date) }}</td>
                  }
                  @for (day of week; track day.key) {
                    <td
                      class="frame-calendar__cell"
                      [attr.data-outside]="day.outside ? '' : null"
                      [attr.data-selected]="day.selected ? '' : null"
                      [attr.data-range-start]="day.rangeStart ? '' : null"
                      [attr.data-range-middle]="day.rangeMiddle ? '' : null"
                      [attr.data-range-end]="day.rangeEnd ? '' : null"
                      [attr.data-today]="day.today ? '' : null"
                      [attr.data-disabled-date]="day.disabledDate ? '' : null"
                    >
                      <button
                        class="frame-calendar__day"
                        type="button"
                        [disabled]="isDisabled() || day.disabled"
                        [attr.data-date]="day.key"
                        [attr.tabindex]="dayTabIndex(day)"
                        [attr.aria-label]="dayLabel(day.date)"
                        [attr.aria-pressed]="day.selected ? 'true' : 'false'"
                        [attr.aria-selected]="day.selected ? 'true' : 'false'"
                        [attr.aria-current]="day.today ? 'date' : null"
                        (click)="selectDay(day)"
                        (focus)="focusedDate.set(day.date)"
                        (keydown)="handleDayKeydown($event, day)"
                      >
                        @if (cellTemplate(); as template) {
                          <ng-container
                            [ngTemplateOutlet]="template"
                            [ngTemplateOutletContext]="day"
                          />
                        } @else {
                          <span class="frame-calendar__day-number">{{ day.day }}</span>
                          @if (day.dateLabel) {
                            <span class="frame-calendar__day-meta">{{ day.dateLabel }}</span>
                          }
                        }
                      </button>
                    </td>
                  }
                </tr>
              }
            </tbody>
          </table>
        </section>
      }
    </div>
  `,
})
export class FrCalendar implements ControlValueAccessor {
  readonly mode = input<FrCalendarMode>('single');
  readonly captionLayout = input<FrCalendarCaptionLayout>('label');
  readonly numberOfMonths = input(1);
  readonly firstDayOfWeek = input(0);
  readonly locale = input('en-US');
  readonly timeZone = input<string | undefined>(undefined);
  readonly dir = input<'ltr' | 'rtl'>('ltr');
  readonly fromYear = input(new Date().getFullYear() - 100);
  readonly toYear = input(new Date().getFullYear() + 20);
  readonly showOutsideDays = input(true, { transform: booleanAttribute });
  readonly showWeekNumber = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly disabledDates = input<Date[]>([]);
  readonly dateLabels = input<Record<string, string>>({});
  readonly disabledMatcher = input<FrCalendarDisabledMatcher | null>(null);
  readonly cellTemplate = input<TemplateRef<FrCalendarCellContext> | null>(null);
  readonly previousMonthTemplate = input<TemplateRef<unknown> | null>(null);
  readonly nextMonthTemplate = input<TemplateRef<unknown> | null>(null);
  readonly previousMonthIcon = input('‹');
  readonly nextMonthIcon = input('›');
  readonly previousMonthLabel = input('Previous month');
  readonly nextMonthLabel = input('Next month');
  readonly month = input<Date | null | undefined>(undefined);
  readonly selected = input<Date | FrCalendarDateRange | null | undefined>(undefined);

  readonly selectedChange = output<Date | FrCalendarDateRange | null>();
  readonly monthChange = output<Date>();

  readonly focusedDate = signal<Date | null>(null);
  private readonly navigatedMonth = signal<Date | null>(null);
  private readonly internalValue = signal<Date | FrCalendarDateRange | null>(null);
  private readonly cvaDisabled = signal(false);
  private readonly host = inject(ElementRef<HTMLElement>);

  readonly currentMonth = computed(() =>
    startOfMonth(this.navigatedMonth() ?? this.month() ?? new Date()),
  );
  readonly isDisabled = computed(() => this.disabled() || this.cvaDisabled());
  readonly value = computed(() => {
    const selected = this.selected();
    return normalizeValue(selected !== undefined ? selected : this.internalValue(), this.mode());
  });
  readonly weekdayLabels = computed(() =>
    buildWeekdayLabels(this.locale(), this.firstDayOfWeek(), this.timeZone()),
  );
  readonly monthOptions = computed(() =>
    Array.from({ length: 12 }, (_, value) => ({
      value,
      label: new Intl.DateTimeFormat(this.locale(), {
        month: 'short',
        timeZone: this.timeZone(),
      }).format(new Date(2026, value, 1)),
    })),
  );
  readonly yearOptions = computed(() =>
    Array.from(
      { length: Math.max(0, this.toYear() - this.fromYear() + 1) },
      (_, index) => this.fromYear() + index,
    ),
  );
  readonly months = computed(() =>
    Array.from({ length: Math.max(1, this.numberOfMonths()) }, (_, index) =>
      this.buildMonth(addMonths(this.currentMonth(), index)),
    ),
  );
  readonly activeDate = computed(() => this.resolveActiveDate());

  private onTouched: () => void = () => undefined;
  private onChange: (value: Date | FrCalendarDateRange | null) => void = () => undefined;

  writeValue(value: Date | FrCalendarDateRange | null): void {
    this.internalValue.set(normalizeValue(value, this.mode()));

    if (value instanceof Date) {
      this.navigatedMonth.set(startOfMonth(value));
    } else if (isRange(value) && value.from) {
      this.navigatedMonth.set(startOfMonth(value.from));
    }
  }

  registerOnChange(fn: (value: Date | FrCalendarDateRange | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.cvaDisabled.set(isDisabled);
  }

  previousMonth(): void {
    this.updateMonth(addMonths(this.currentMonth(), -1));
  }

  nextMonth(): void {
    this.updateMonth(addMonths(this.currentMonth(), 1));
  }

  setMonth(value: string): void {
    const month = new Date(this.currentMonth().getFullYear(), Number(value), 1);
    this.updateMonth(month);
  }

  setYear(value: string): void {
    const month = new Date(Number(value), this.currentMonth().getMonth(), 1);
    this.updateMonth(month);
  }

  selectDay(day: CalendarDay): void {
    if (this.isDisabled() || day.disabled) {
      return;
    }

    this.onTouched();

    const nextValue =
      this.mode() === 'range' ? nextRangeValue(this.value(), day.date) : cloneDate(day.date);

    this.internalValue.set(nextValue);
    this.onChange(nextValue);
    this.selectedChange.emit(nextValue);
  }

  handleDayKeydown(event: KeyboardEvent, day: CalendarDay): void {
    const offset = this.navigationOffset(event.key);

    if (offset === null || this.isDisabled()) {
      return;
    }

    event.preventDefault();

    const next = addDays(day.date, offset);
    this.focusedDate.set(next);

    if (!this.isDateVisible(next)) {
      this.updateMonth(startOfMonth(next));
    }

    this.focusDay(next);
  }

  dayTabIndex(day: CalendarDay): number {
    return sameDate(day.date, this.activeDate()) ? 0 : -1;
  }

  focusActiveDate(): void {
    this.focusDay(this.activeDate());
  }

  monthLabel(date: Date): string {
    return new Intl.DateTimeFormat(this.locale(), {
      month: 'long',
      year: 'numeric',
      timeZone: this.timeZone(),
    }).format(date);
  }

  dayLabel(date: Date): string {
    return new Intl.DateTimeFormat(this.locale(), {
      dateStyle: 'full',
      timeZone: this.timeZone(),
    }).format(date);
  }

  weekNumber(date: Date): string {
    return isoWeekNumber(date).toString().padStart(2, '0');
  }

  private navigationOffset(key: string): number | null {
    switch (key) {
      case 'ArrowLeft':
        return this.dir() === 'rtl' ? 1 : -1;
      case 'ArrowRight':
        return this.dir() === 'rtl' ? -1 : 1;
      case 'ArrowUp':
        return -7;
      case 'ArrowDown':
        return 7;
      default:
        return null;
    }
  }

  private resolveActiveDate(): Date {
    const focused = this.focusedDate();

    // Prefer the roving-focus target, then selection, then today, then first enabled day.
    if (focused && this.findDay(focused) && !this.isDayDisabled(focused)) {
      return cloneDate(focused);
    }

    const selected = this.selectedDate();

    if (selected && this.findDay(selected) && !this.isDayDisabled(selected)) {
      return cloneDate(selected);
    }

    const today = new Date();

    if (this.findDay(today) && !this.isDayDisabled(today)) {
      return cloneDate(today);
    }

    const firstEnabled = this.months()
      .flatMap((month) => month.weeks.flat())
      .find((day) => !day.disabled);

    return firstEnabled ? cloneDate(firstEnabled.date) : cloneDate(this.currentMonth());
  }

  private selectedDate(): Date | null {
    const value = this.value();

    if (value instanceof Date) {
      return value;
    }

    if (isRange(value)) {
      return value.from ?? value.to;
    }

    return null;
  }

  private isDateVisible(date: Date): boolean {
    return this.months().some((month) =>
      month.weeks.some((week) => week.some((day) => sameDate(day.date, date))),
    );
  }

  private findDay(date: Date): CalendarDay | null {
    for (const month of this.months()) {
      for (const week of month.weeks) {
        const day = week.find((item) => sameDate(item.date, date));

        if (day) {
          return day;
        }
      }
    }

    return null;
  }

  private isDayDisabled(date: Date): boolean {
    return this.findDay(date)?.disabled ?? true;
  }

  private focusDay(date: Date): void {
    if (this.focusDayElement(date)) {
      return;
    }

    // Month navigation may render the target button one tick later.
    setTimeout(() => {
      this.focusDayElement(date);
    });
  }

  private focusDayElement(date: Date): boolean {
    const button = this.host.nativeElement.querySelector(
      `.frame-calendar__day[data-date="${dateKey(date)}"]`,
    ) as HTMLButtonElement | null;

    button?.focus();

    return !!button;
  }

  private updateMonth(month: Date): void {
    const next = startOfMonth(month);
    this.navigatedMonth.set(next);
    this.monthChange.emit(cloneDate(next));
  }

  private buildMonth(monthDate: Date): CalendarMonth {
    const start = startOfMonth(monthDate);
    const gridStart = startOfWeek(start, this.firstDayOfWeek());
    const weeks: CalendarDay[][] = [];

    // Always build a six-week grid so layout height stays stable across months.
    for (let week = 0; week < 6; week++) {
      const days: CalendarDay[] = [];

      for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
        const date = addDays(gridStart, week * 7 + dayIndex);
        const outside = date.getMonth() !== start.getMonth();
        const key = dateKey(date);
        const disabledDate = hasDate(this.disabledDates(), date);
        const disabled =
          (!this.showOutsideDays() && outside) ||
          disabledDate ||
          (this.disabledMatcher()?.(cloneDate(date)) ?? false);
        const selection = selectionState(this.value(), date, this.mode());

        days.push({
          date,
          day: date.getDate(),
          key,
          dateLabel: this.dateLabels()[key],
          disabled,
          disabledDate,
          outside,
          today: sameDate(date, new Date()),
          ...selection,
        });
      }

      weeks.push(days);
    }

    return {
      date: start,
      key: `${start.getFullYear()}-${start.getMonth()}`,
      label: this.monthLabel(start),
      weeks,
    };
  }
}

function buildWeekdayLabels(locale: string, firstDayOfWeek: number, timeZone?: string): string[] {
  const baseSunday = new Date(2026, 5, 7);

  return Array.from({ length: 7 }, (_, index) => {
    const day = addDays(baseSunday, (firstDayOfWeek + index) % 7);
    return new Intl.DateTimeFormat(locale, {
      weekday: 'short',
      timeZone,
    }).format(day);
  });
}

function normalizeValue(
  value: Date | FrCalendarDateRange | null | undefined,
  mode: FrCalendarMode,
): Date | FrCalendarDateRange | null {
  if (!value) {
    return mode === 'range' ? { from: null, to: null } : null;
  }

  if (mode === 'range') {
    if (isRange(value)) {
      return {
        from: value.from ? cloneDate(value.from) : null,
        to: value.to ? cloneDate(value.to) : null,
      };
    }

    return { from: cloneDate(value), to: null };
  }

  return value instanceof Date ? cloneDate(value) : value.from ? cloneDate(value.from) : null;
}

function nextRangeValue(value: Date | FrCalendarDateRange | null, selected: Date): FrCalendarDateRange {
  const range = isRange(value) ? value : { from: null, to: null };

  if (!range.from || range.to) {
    return { from: cloneDate(selected), to: null };
  }

  if (selected < range.from) {
    return { from: cloneDate(selected), to: cloneDate(range.from) };
  }

  return { from: cloneDate(range.from), to: cloneDate(selected) };
}

function selectionState(value: Date | FrCalendarDateRange | null, date: Date, mode: FrCalendarMode) {
  if (mode === 'range' && isRange(value)) {
    const from = value.from;
    const to = value.to;
    const rangeStart = !!from && sameDate(date, from);
    const rangeEnd = !!to && sameDate(date, to);
    const rangeMiddle = !!from && !!to && date > from && date < to;

    return {
      selected: rangeStart || rangeEnd || rangeMiddle,
      rangeStart,
      rangeMiddle,
      rangeEnd,
    };
  }

  const selected = value instanceof Date && sameDate(date, value);

  return {
    selected,
    rangeStart: selected,
    rangeMiddle: false,
    rangeEnd: selected,
  };
}

function isRange(value: unknown): value is FrCalendarDateRange {
  return !!value && typeof value === 'object' && ('from' in value || 'to' in value);
}

function hasDate(dates: Date[], date: Date): boolean {
  return dates.some((item) => sameDate(item, date));
}

function sameDate(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function dateKey(date: Date): string {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function cloneDate(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function addMonths(date: Date, amount: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

function addDays(date: Date, amount: number): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + amount);
}

function startOfWeek(date: Date, firstDayOfWeek: number): Date {
  const normalized = ((firstDayOfWeek % 7) + 7) % 7;
  const diff = (date.getDay() - normalized + 7) % 7;
  return addDays(date, -diff);
}

function isoWeekNumber(date: Date): number {
  const target = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNumber = target.getUTCDay() || 7;
  target.setUTCDate(target.getUTCDate() + 4 - dayNumber);
  const yearStart = new Date(Date.UTC(target.getUTCFullYear(), 0, 1));
  return Math.ceil(((target.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

