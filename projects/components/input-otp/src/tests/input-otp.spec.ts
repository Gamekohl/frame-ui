import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import {
  FR_INPUT_OTP_PATTERN_DIGITS_AND_CHARS,
  FrInputOtp,
  FrInputOtpGroup,
  FrInputOtpSeparator,
  FrInputOtpSlot,
} from '../input-otp';

@Component({
  imports: [
    FrInputOtp,
    FrInputOtpGroup,
    FrInputOtpSeparator,
    FrInputOtpSlot,
    ReactiveFormsModule,
  ],
  template: `
    <frame-input-otp
      [formControl]="control"
      [maxLength]="maxLength()"
      [pattern]="pattern()"
      [invalid]="invalid()"
    >
      <div frInputOtpGroup>
        <div frInputOtpSlot [index]="0"></div>
        <div frInputOtpSlot [index]="1"></div>
        <div frInputOtpSlot [index]="2"></div>
      </div>
      <div frInputOtpSeparator></div>
      <div frInputOtpGroup>
        <div frInputOtpSlot [index]="3"></div>
        <div frInputOtpSlot [index]="4"></div>
        <div frInputOtpSlot [index]="5"></div>
      </div>
    </frame-input-otp>
  `,
})
class InputOtpHostComponent {
  readonly control = new FormControl('123');
  readonly maxLength = signal(6);
  readonly pattern = signal<RegExp | string>(/^[0-9]$/);
  readonly invalid = signal(false);
}

describe('FrInputOtp', () => {
  let fixture: ComponentFixture<InputOtpHostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [InputOtpHostComponent],
    });

    fixture = TestBed.createComponent(InputOtpHostComponent);
    fixture.detectChanges();
  });

  it('renders form control value into slots', () => {
    const slots = fixture.nativeElement.querySelectorAll('.frame-input-otp__slot');

    expect(slots[0].textContent.trim()).toBe('1');
    expect(slots[1].textContent.trim()).toBe('2');
    expect(slots[2].textContent.trim()).toBe('3');
  });

  it('updates the reactive form value from input', () => {
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;

    input.value = '456789';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(fixture.componentInstance.control.value).toBe('456789');
  });

  it('filters characters with the pattern', () => {
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;

    input.value = '12ab34';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(fixture.componentInstance.control.value).toBe('1234');
  });

  it('supports alphanumeric patterns', () => {
    fixture.componentInstance.pattern.set(FR_INPUT_OTP_PATTERN_DIGITS_AND_CHARS);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    input.value = 'a1-b2';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(fixture.componentInstance.control.value).toBe('a1b2');
  });

  it('reflects disabled and invalid state', () => {
    fixture.componentInstance.invalid.set(true);
    fixture.componentInstance.control.disable();
    fixture.detectChanges();

    const root = fixture.nativeElement.querySelector('frame-input-otp') as HTMLElement;

    expect(root.hasAttribute('data-invalid')).toBe(true);
    expect(root.hasAttribute('data-disabled')).toBe(true);
  });
});
