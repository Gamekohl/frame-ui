import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { FrCalendar, FrCalendarDateRange } from '../calendar';

@Component({
  imports: [FrCalendar],
  standalone: true,
  template: `
    <frame-calendar
      [month]="month"
      [selected]="selected"
      [disabledDates]="disabledDates"
      (selectedChange)="selected = $event"
    />
  `,
})
class SingleCalendarHostComponent {
  month = new Date(2026, 5, 1);
  selected: Date | FrCalendarDateRange | null = null;
  disabledDates = [new Date(2026, 5, 12), new Date(2026, 5, 14)];
}

@Component({
  imports: [FrCalendar],
  standalone: true,
  template: `
    <frame-calendar
      mode="range"
      [month]="month"
      [numberOfMonths]="2"
      [showWeekNumber]="true"
      (selectedChange)="selected = $event"
    />
  `,
})
class RangeCalendarHostComponent {
  month = new Date(2026, 0, 1);
  selected: Date | FrCalendarDateRange | null = null;
}

@Component({
  imports: [FrCalendar],
  standalone: true,
  template: `
    <frame-calendar
      captionLayout="dropdown"
      [month]="month"
      [fromYear]="2024"
      [toYear]="2028"
    />
  `,
})
class DropdownCalendarHostComponent {
  month = new Date(2026, 5, 1);
}

@Component({
  imports: [FrCalendar, ReactiveFormsModule],
  standalone: true,
  template: `<frame-calendar [formControl]="control" [month]="month" />`,
})
class FormsCalendarHostComponent {
  month = new Date(2026, 5, 1);
  control = new FormControl<Date | null>(new Date(2026, 5, 10));
}

@Component({
  imports: [FrCalendar],
  standalone: true,
  template: `
    <frame-calendar
      [month]="month"
      previousMonthLabel="Go back"
      nextMonthLabel="Go forward"
      [previousMonthTemplate]="previous"
      [nextMonthTemplate]="next"
    />

    <ng-template #previous>
      <span data-testid="previous-icon">Back</span>
    </ng-template>

    <ng-template #next>
      <span data-testid="next-icon">Forward</span>
    </ng-template>
  `,
})
class CustomNavigationCalendarHostComponent {
  month = new Date(2026, 5, 1);
}

describe('FrCalendar', () => {
  it('renders a month grid and emits single selected dates', () => {
    const fixture = TestBed.createComponent(SingleCalendarHostComponent);
    fixture.detectChanges();

    const calendar = fixture.nativeElement.querySelector('frame-calendar') as HTMLElement;
    const buttons = Array.from(
      fixture.nativeElement.querySelectorAll('.frame-calendar__day'),
    ) as HTMLButtonElement[];
    const tenth = buttons.find((button) => button.textContent?.trim() === '10')!;

    expect(calendar.classList.contains('frame-calendar')).toBe(true);

    tenth.click();
    fixture.detectChanges();

    expect(fixture.componentInstance.selected).toEqual(new Date(2026, 5, 10));
    expect(tenth.getAttribute('aria-pressed')).toBe('true');
  });

  it('disables configured disabled dates', () => {
    const fixture = TestBed.createComponent(SingleCalendarHostComponent);
    fixture.detectChanges();

    const buttons = Array.from(
      fixture.nativeElement.querySelectorAll('.frame-calendar__day'),
    ) as HTMLButtonElement[];
    const twelfth = buttons.find((button) => button.textContent?.trim() === '12')!;
    const fourteenth = buttons.find((button) => button.textContent?.trim() === '14')!;

    expect(twelfth.disabled).toBe(true);
    expect(fourteenth.disabled).toBe(true);
  });

  it('supports range selection and week numbers', () => {
    const fixture = TestBed.createComponent(RangeCalendarHostComponent);
    fixture.detectChanges();

    const buttons = Array.from(
      fixture.nativeElement.querySelectorAll('.frame-calendar__day'),
    ) as HTMLButtonElement[];
    const januaryButtons = buttons.filter((button) => button.closest('section')?.getAttribute('aria-label') === 'January 2026');
    const fifth = januaryButtons.find((button) => button.textContent?.trim() === '5')!;
    const ninth = januaryButtons.find((button) => button.textContent?.trim() === '9')!;

    fifth.click();
    ninth.click();
    fixture.detectChanges();

    expect(fixture.componentInstance.selected).toEqual({
      from: new Date(2026, 0, 5),
      to: new Date(2026, 0, 9),
    });
    expect(fixture.nativeElement.querySelector('.frame-calendar__week-number')).not.toBeNull();
    expect(fixture.nativeElement.querySelectorAll('.frame-calendar__month').length).toBe(2);
  });

  it('renders month and year dropdowns', () => {
    const fixture = TestBed.createComponent(DropdownCalendarHostComponent);
    fixture.detectChanges();

    const selects = fixture.nativeElement.querySelectorAll('select');

    expect(selects.length).toBe(2);
    expect(selects[0].value).toBe('5');
    expect(selects[1].value).toBe('2026');
  });

  it('works with reactive forms', async () => {
    const fixture = TestBed.createComponent(FormsCalendarHostComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    const selectedButton = fixture.nativeElement.querySelector('[aria-pressed="true"]') as HTMLButtonElement;
    expect(selectedButton.textContent?.trim()).toBe('10');

    const buttons = Array.from(
      fixture.nativeElement.querySelectorAll('.frame-calendar__day'),
    ) as HTMLButtonElement[];
    const eleventh = buttons.find((button) => button.textContent?.trim() === '11')!;

    eleventh.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(fixture.componentInstance.control.value).toEqual(new Date(2026, 5, 11));
  });

  it('uses the selected day as the roving tab stop', () => {
    const fixture = TestBed.createComponent(SingleCalendarHostComponent);
    fixture.componentInstance.selected = new Date(2026, 5, 10);
    fixture.detectChanges();

    const days = Array.from(
      fixture.nativeElement.querySelectorAll('.frame-calendar__day'),
    ) as HTMLButtonElement[];
    const tabbableDays = days.filter((day) => day.tabIndex === 0);

    expect(tabbableDays.length).toBe(1);
    expect(tabbableDays[0].getAttribute('data-date')).toBe('2026-06-10');
    expect(tabbableDays[0].getAttribute('aria-selected')).toBe('true');
  });

  it('moves focus between days with arrow keys without selecting', async () => {
    const fixture = TestBed.createComponent(SingleCalendarHostComponent);
    fixture.detectChanges();

    const tenth = fixture.nativeElement.querySelector('[data-date="2026-06-10"]') as HTMLButtonElement;
    tenth.focus();
    tenth.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    fixture.detectChanges();
    await fixture.whenStable();

    const eleventh = fixture.nativeElement.querySelector('[data-date="2026-06-11"]') as HTMLButtonElement;
    expect(document.activeElement).toBe(eleventh);
    expect(eleventh.tabIndex).toBe(0);
    expect(fixture.componentInstance.selected).toBeNull();

    eleventh.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    fixture.detectChanges();
    await fixture.whenStable();

    const eighteenth = fixture.nativeElement.querySelector('[data-date="2026-06-18"]') as HTMLButtonElement;
    expect(document.activeElement).toBe(eighteenth);
    expect(eighteenth.tabIndex).toBe(0);
  });

  it('moves focus across month boundaries with arrow keys', async () => {
    const fixture = TestBed.createComponent(SingleCalendarHostComponent);
    fixture.detectChanges();

    const thirtieth = fixture.nativeElement.querySelector('[data-date="2026-06-30"]') as HTMLButtonElement;
    thirtieth.focus();
    thirtieth.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const julyFirst = fixture.nativeElement.querySelector('[data-date="2026-07-01"]') as HTMLButtonElement;
    expect(document.activeElement).toBe(julyFirst);
    expect(julyFirst.tabIndex).toBe(0);
  });

  it('supports custom navigation labels and templates', () => {
    const fixture = TestBed.createComponent(CustomNavigationCalendarHostComponent);
    fixture.detectChanges();

    const buttons = fixture.nativeElement.querySelectorAll('.frame-calendar__nav-button');

    expect(buttons[0].getAttribute('aria-label')).toBe('Go back');
    expect(buttons[1].getAttribute('aria-label')).toBe('Go forward');
    expect(fixture.nativeElement.querySelector('[data-testid="previous-icon"]')?.textContent).toBe('Back');
    expect(fixture.nativeElement.querySelector('[data-testid="next-icon"]')?.textContent).toBe('Forward');
  });
});
