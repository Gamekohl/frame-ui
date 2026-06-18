import {
  CdkConnectedOverlay,
  CdkOverlayOrigin,
  ConnectedOverlayPositionChange,
  ConnectedPosition,
} from '@angular/cdk/overlay';
import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  booleanAttribute,
  computed,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';

import {
  FrCalendar,
  FrCalendarCaptionLayout,
  FrCalendarCellContext,
  FrCalendarDateRange,
  FrCalendarDisabledMatcher,
  FrCalendarMode,
} from '@frame-ui-ng/components/calendar';
import { FrControlValueAccessor, provideDsValueAccessor } from '@frame-ui-ng/components/forms';

export type FrDatePickerValue = Date | FrCalendarDateRange | null;

export type FrDatePickerPreset = {
  label: string;
  value: FrDatePickerValue | (() => FrDatePickerValue);
};

export type FrDatePickerFormatter = (value: FrDatePickerValue, locale: string) => string;
export type FrDatePickerParser = (value: string, locale: string) => FrDatePickerValue | undefined;

const POSITIONS: ConnectedPosition[] = [
  {
    originX: 'start',
    originY: 'bottom',
    overlayX: 'start',
    overlayY: 'top',
    offsetY: 8,
  },
  {
    originX: 'start',
    originY: 'top',
    overlayX: 'start',
    overlayY: 'bottom',
    offsetY: -8,
  },
];

/** Date picker control backed by the calendar primitive. */
@Component({
  selector: 'frame-date-picker',
  exportAs: 'frDatePicker',
  imports: [CdkConnectedOverlay, CdkOverlayOrigin, FrCalendar, NgTemplateOutlet],
  providers: [provideDsValueAccessor(FrDatePicker)],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'frame-date-picker',
    '[attr.data-open]': 'isOpen() ? "" : null',
    '[attr.data-disabled]': 'disabled() ? "" : null',
    '[attr.data-invalid]': 'invalid() ? "" : null',
    '[attr.data-mode]': 'mode()',
    '[attr.dir]': 'dir()',
  },
  template: `
    <span cdkOverlayOrigin #origin="cdkOverlayOrigin" class="frame-date-picker__anchor">
      @if (editable()) {
        <span class="frame-date-picker__input-wrap">
          <span class="frame-date-picker__icon" aria-hidden="true">{{ icon() }}</span>
          <input
            class="frame-date-picker__input"
            type="text"
            [disabled]="disabled()"
            [readOnly]="readonlyInput()"
            [placeholder]="placeholder()"
            [value]="inputValue()"
            [attr.aria-expanded]="isOpen()"
            [attr.aria-invalid]="invalid() ? 'true' : null"
            aria-haspopup="dialog"
            (focus)="open()"
            (click)="open()"
            (input)="handleInput($any($event.target).value)"
            (change)="commitInput($any($event.target).value)"
            (keydown)="handleTriggerKeydown($event)"
            (blur)="markAsTouched()"
          />
        </span>
      } @else {
        <button
          class="frame-date-picker__trigger"
          type="button"
          [disabled]="disabled()"
          [attr.aria-expanded]="isOpen()"
          [attr.aria-invalid]="invalid() ? 'true' : null"
          aria-haspopup="dialog"
          (click)="toggle()"
          (keydown)="handleTriggerKeydown($event)"
        >
          <span class="frame-date-picker__icon" aria-hidden="true">{{ icon() }}</span>
          <span class="frame-date-picker__trigger-label" [attr.data-placeholder]="hasValue() ? null : ''">
            {{ displayValue() || placeholder() }}
          </span>
        </button>
      }
    </span>

    <ng-template
      cdkConnectedOverlay
      [cdkConnectedOverlayOrigin]="origin"
      [cdkConnectedOverlayOpen]="isOpen()"
      [cdkConnectedOverlayPositions]="positions"
      [cdkConnectedOverlayPanelClass]="overlayPanelClasses()"
      [cdkConnectedOverlayPush]="true"
      [cdkConnectedOverlayViewportMargin]="12"
      (overlayOutsideClick)="close()"
      (attach)="focusCalendar()"
      (detach)="close()"
      (positionChange)="handlePositionChange($event)"
    >
      <div class="frame-date-picker__content" role="dialog" [attr.aria-label]="dialogLabel()">
        @if (presets().length) {
          <div class="frame-date-picker__presets" aria-label="Date presets">
            @for (preset of presets(); track preset.label) {
              <button class="frame-date-picker__preset" type="button" (click)="selectPreset(preset)">
                {{ preset.label }}
              </button>
            }
          </div>
        }

        <ng-container [ngTemplateOutlet]="headerTemplate() ?? null" />

        <frame-calendar
          [mode]="mode()"
          [captionLayout]="captionLayout()"
          [numberOfMonths]="numberOfMonths()"
          [firstDayOfWeek]="firstDayOfWeek()"
          [locale]="locale()"
          [timeZone]="timeZone()"
          [dir]="dir()"
          [fromYear]="fromYear()"
          [toYear]="toYear()"
          [showOutsideDays]="showOutsideDays()"
          [showWeekNumber]="showWeekNumber()"
          [disabled]="disabled()"
          [disabledDates]="disabledDates()"
          [dateLabels]="dateLabels()"
          [disabledMatcher]="disabledMatcher()"
          [cellTemplate]="cellTemplate()"
          [previousMonthTemplate]="previousMonthTemplate()"
          [nextMonthTemplate]="nextMonthTemplate()"
          [previousMonthIcon]="previousMonthIcon()"
          [nextMonthIcon]="nextMonthIcon()"
          [previousMonthLabel]="previousMonthLabel()"
          [nextMonthLabel]="nextMonthLabel()"
          [month]="month()"
          [selected]="calendarValue()"
          (selectedChange)="selectCalendarValue($any($event))"
          (monthChange)="monthChange.emit($event)"
        />

        @if (showTime() && mode() === 'single') {
          <label class="frame-date-picker__time">
            <span class="frame-date-picker__time-label">{{ timeLabel() }}</span>
            <input
              class="frame-date-picker__time-input"
              type="time"
              [disabled]="disabled() || !singleDate()"
              [value]="timeValue()"
              (change)="setTime($any($event.target).value)"
            />
          </label>
        }

        <ng-container [ngTemplateOutlet]="footerTemplate() ?? null" />
      </div>
    </ng-template>
  `,
})
export class FrDatePicker extends FrControlValueAccessor<FrDatePickerValue> {
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
  readonly disabledInput = input(false, { alias: 'disabled', transform: booleanAttribute });
  readonly invalidInput = input(false, { alias: 'invalid', transform: booleanAttribute });
  readonly editable = input(false, { transform: booleanAttribute });
  readonly readonlyInput = input(false, { transform: booleanAttribute });
  readonly closeOnSelect = input(true, { transform: booleanAttribute });
  readonly debugVisible = input(false, { transform: booleanAttribute });
  readonly showTime = input(false, { transform: booleanAttribute });
  readonly placeholder = input('Pick a date');
  readonly dialogLabel = input('Choose date');
  readonly icon = input('◷');
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
  readonly headerTemplate = input<TemplateRef<unknown> | null>(null);
  readonly footerTemplate = input<TemplateRef<unknown> | null>(null);
  readonly month = input<Date | null | undefined>(undefined);
  readonly presets = input<FrDatePickerPreset[]>([]);
  readonly formatter = input<FrDatePickerFormatter>(defaultFormatter);
  readonly parser = input<FrDatePickerParser>(defaultParser);
  readonly timeLabel = input('Time');

  readonly valueChange = output<FrDatePickerValue>();
  readonly openChange = output<boolean>();
  readonly monthChange = output<Date>();

  readonly calendar = viewChild(FrCalendar);
  readonly positions = POSITIONS;
  readonly isOpen = signal(false);
  readonly overlaySide = signal<'bottom' | 'top'>('bottom');
  readonly value = signal<FrDatePickerValue>(null);
  readonly inputDraft = signal<string | null>(null);

  readonly disabled = computed(() => this.disabledInput() || this.formDisabled());
  readonly invalid = computed(() => this.invalidInput() || this.formInvalid());
  readonly hasValue = computed(() => hasValue(this.value(), this.mode()));
  readonly displayValue = computed(() => this.formatter()(this.value(), this.locale()));
  readonly inputValue = computed(() => this.inputDraft() ?? this.displayValue());
  readonly calendarValue = computed(() => normalizeValue(this.value(), this.mode()));
  readonly singleDate = computed(() => {
    const value = this.value();
    return value instanceof Date ? value : null;
  });
  readonly timeValue = computed(() => {
    const date = this.singleDate();
    return date ? `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}` : '';
  });

  constructor() {
    super();
    queueMicrotask(() => {
      if (this.debugVisible()) {
        this.open();
      }
    });
  }

  toggle(): void {
    this.isOpen() ? this.close() : this.open();
  }

  open(): void {
    if (this.disabled()) {
      return;
    }

    this.isOpen.set(true);
    this.openChange.emit(true);
  }

  close(): void {
    if (this.debugVisible()) {
      return;
    }

    this.isOpen.set(false);
    this.openChange.emit(false);
    this.inputDraft.set(null);
    this.markAsTouched();
  }

  clear(): void {
    this.commitValue(this.mode() === 'range' ? { from: null, to: null } : null);
  }

  selectPreset(preset: FrDatePickerPreset): void {
    const next = typeof preset.value === 'function' ? preset.value() : preset.value;
    this.commitValue(normalizeValue(next, this.mode()));

    if (this.closeOnSelect() && isCompleteValue(this.value(), this.mode())) {
      this.close();
    }
  }

  selectCalendarValue(value: FrDatePickerValue): void {
    const previous = this.singleDate();
    // Preserve the existing time when a calendar click only changes the date portion.
    const next = this.showTime() && value instanceof Date && previous ? mergeTime(value, previous) : value;

    this.commitValue(normalizeValue(next, this.mode()));

    if (this.closeOnSelect() && isCompleteValue(this.value(), this.mode())) {
      this.close();
    }
  }

  setTime(value: string): void {
    const date = this.singleDate();

    if (!date || !value) {
      return;
    }

    const [hours, minutes] = value.split(':').map(Number);
    const next = new Date(date);
    next.setHours(hours || 0, minutes || 0, 0, 0);
    this.commitValue(next);
  }

  handleInput(value: string): void {
    this.inputDraft.set(value);

    if (!value.trim()) {
      this.commitValue(this.mode() === 'range' ? { from: null, to: null } : null);
    }
  }

  commitInput(value: string): void {
    const parsed = this.parser()(value, this.locale());

    if (parsed !== undefined) {
      this.commitValue(normalizeValue(parsed, this.mode()));
    }

    this.inputDraft.set(null);
  }

  handleTriggerKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.open();
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      this.close();
    }
  }

  handlePositionChange(event: ConnectedOverlayPositionChange): void {
    this.overlaySide.set(event.connectionPair.overlayY === 'bottom' ? 'top' : 'bottom');
  }

  focusCalendar(): void {
    this.calendar()?.focusActiveDate();
  }

  overlayPanelClasses(): string[] {
    return ['frame-date-picker-overlay', `frame-date-picker-overlay--${this.overlaySide()}`];
  }

  protected setViewValue(value: FrDatePickerValue): void {
    this.value.set(normalizeValue(value, this.mode()));
    this.inputDraft.set(null);
  }

  private commitValue(value: FrDatePickerValue): void {
    this.value.set(value);
    this.inputDraft.set(null);
    this.notifyValueChange(value);
    this.valueChange.emit(value);
    this.markAsTouched();
  }
}

function normalizeValue(value: FrDatePickerValue | undefined, mode: FrCalendarMode): FrDatePickerValue {
  if (!value) {
    return mode === 'range' ? { from: null, to: null } : null;
  }

  // Normalize across modes so form writes, presets, and calendar selections share one shape.
  if (mode === 'range') {
    if (isRange(value)) {
      return {
        from: value.from ? cloneDateWithTime(value.from) : null,
        to: value.to ? cloneDateWithTime(value.to) : null,
      };
    }

    return { from: cloneDateWithTime(value), to: null };
  }

  return value instanceof Date ? cloneDateWithTime(value) : value.from ? cloneDateWithTime(value.from) : null;
}

function defaultFormatter(value: FrDatePickerValue, locale: string): string {
  if (!value) {
    return '';
  }

  const formatter = new Intl.DateTimeFormat(locale, { dateStyle: 'medium' });

  if (value instanceof Date) {
    return formatter.format(value);
  }

  if (value.from && value.to) {
    return `${formatter.format(value.from)} - ${formatter.format(value.to)}`;
  }

  return value.from ? formatter.format(value.from) : '';
}

function defaultParser(value: string): FrDatePickerValue | undefined {
  const trimmed = value.trim();

  if (!trimmed) {
    return null;
  }

  const isoDate = /^(\d{4})-(\d{2})-(\d{2})$/.exec(trimmed);

  if (isoDate) {
    return new Date(Number(isoDate[1]), Number(isoDate[2]) - 1, Number(isoDate[3]));
  }

  const parsed = new Date(trimmed);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed;
}

function isRange(value: unknown): value is FrCalendarDateRange {
  return !!value && typeof value === 'object' && ('from' in value || 'to' in value);
}

function hasValue(value: FrDatePickerValue, mode: FrCalendarMode): boolean {
  if (mode === 'range' && isRange(value)) {
    return !!value.from || !!value.to;
  }

  return value instanceof Date;
}

function isCompleteValue(value: FrDatePickerValue, mode: FrCalendarMode): boolean {
  if (mode === 'range' && isRange(value)) {
    return !!value.from && !!value.to;
  }

  return value instanceof Date;
}

function cloneDateWithTime(date: Date): Date {
  return new Date(date.getTime());
}

function mergeTime(date: Date, timeSource: Date): Date {
  const next = new Date(date);
  next.setHours(timeSource.getHours(), timeSource.getMinutes(), timeSource.getSeconds(), timeSource.getMilliseconds());
  return next;
}


