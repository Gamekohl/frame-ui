import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { FrCalendarDateRange } from '@frame-ui/components/calendar';
import { FrDatePicker } from '../date-picker';

@Component({
  imports: [FrDatePicker],
  standalone: true,
  template: `<frame-date-picker [month]="month" (valueChange)="value = $event" />`,
})
class DatePickerHostComponent {
  month = new Date(2026, 5, 1);
  value: Date | FrCalendarDateRange | null = null;
}

@Component({
  imports: [FrDatePicker, ReactiveFormsModule],
  standalone: true,
  template: `<frame-date-picker [formControl]="control" [month]="month" />`,
})
class FormsDatePickerHostComponent {
  month = new Date(2026, 5, 1);
  control = new FormControl<Date | null>(new Date(2026, 5, 10));
}

@Component({
  imports: [FrDatePicker, ReactiveFormsModule],
  standalone: true,
  template: `<frame-date-picker mode="range" [formControl]="control" [month]="month" />`,
})
class RangeDatePickerHostComponent {
  month = new Date(2026, 0, 1);
  control = new FormControl<FrCalendarDateRange>({ from: null, to: null });
}

@Component({
  imports: [FrDatePicker, ReactiveFormsModule],
  standalone: true,
  template: `<frame-date-picker editable [formControl]="control" [month]="month" />`,
})
class EditableDatePickerHostComponent {
  month = new Date(2026, 5, 1);
  control = new FormControl<Date | null>(null);
}

describe('FrDatePicker', () => {
  it('opens a calendar overlay and emits selected dates', async () => {
    const fixture = TestBed.createComponent(DatePickerHostComponent);
    fixture.detectChanges();

    const trigger = fixture.nativeElement.querySelector('.frame-date-picker__trigger') as HTMLButtonElement;
    trigger.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const overlay = document.querySelector('.frame-date-picker__content') as HTMLElement;
    const buttons = Array.from(overlay.querySelectorAll('.frame-calendar__day')) as HTMLButtonElement[];
    const tenth = buttons.find((button) => button.textContent?.trim() === '10')!;

    tenth.click();
    fixture.detectChanges();

    expect(fixture.componentInstance.value).toEqual(new Date(2026, 5, 10));
  });

  it('works with reactive forms', async () => {
    const fixture = TestBed.createComponent(FormsDatePickerHostComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    const trigger = fixture.nativeElement.querySelector('.frame-date-picker__trigger') as HTMLButtonElement;
    expect(trigger.textContent).toContain('Jun 10, 2026');

    trigger.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const overlay = document.querySelector('.frame-date-picker__content') as HTMLElement;
    const buttons = Array.from(overlay.querySelectorAll('.frame-calendar__day')) as HTMLButtonElement[];
    const eleventh = buttons.find((button) => button.textContent?.trim() === '11')!;

    eleventh.click();
    fixture.detectChanges();

    expect(fixture.componentInstance.control.value).toEqual(new Date(2026, 5, 11));
  });

  it('supports range values with reactive forms', async () => {
    const fixture = TestBed.createComponent(RangeDatePickerHostComponent);
    fixture.detectChanges();

    const trigger = fixture.nativeElement.querySelector('.frame-date-picker__trigger') as HTMLButtonElement;
    trigger.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const overlay = document.querySelector('.frame-date-picker__content') as HTMLElement;
    const buttons = Array.from(overlay.querySelectorAll('.frame-calendar__day')) as HTMLButtonElement[];
    const fifth = buttons.find((button) => button.getAttribute('aria-label')?.includes('January 5, 2026'))!;
    const ninth = buttons.find((button) => button.getAttribute('aria-label')?.includes('January 9, 2026'))!;

    fifth.click();
    fixture.detectChanges();
    ninth.click();
    fixture.detectChanges();

    expect(fixture.componentInstance.control.value).toEqual({
      from: new Date(2026, 0, 5),
      to: new Date(2026, 0, 9),
    });
  });

  it('parses editable input values', () => {
    const fixture = TestBed.createComponent(EditableDatePickerHostComponent);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('.frame-date-picker__input') as HTMLInputElement;
    input.value = '2026-06-12';
    input.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(fixture.componentInstance.control.value).toEqual(new Date(2026, 5, 12));
  });
});

