import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { FrCheckbox, FrCheckboxField, FrCheckboxLabel } from '../checkbox';

@Component({
  imports: [FrCheckbox, FrCheckboxField, FrCheckboxLabel],
  standalone: true,
  template: `
    <label frCheckboxField>
      <input
        frCheckbox
        [checked]="checked()"
        [indeterminate]="indeterminate()"
        [attr.aria-invalid]="invalid() ? 'true' : null"
        type="checkbox"
      />
      <span frCheckboxLabel>Accept terms</span>
    </label>
  `,
})
class TestHostComponent {
  readonly checked = signal(false);
  readonly indeterminate = signal(false);
  readonly invalid = signal(false);
}

@Component({
  imports: [ReactiveFormsModule, FrCheckbox, FrCheckboxField, FrCheckboxLabel],
  standalone: true,
  template: `
    <label frCheckboxField>
      <input frCheckbox [formControl]="control" type="checkbox" />
      <span frCheckboxLabel>Accept terms</span>
    </label>
  `,
})
class ReactiveFormsHostComponent {
  readonly control = new FormControl(true, { nonNullable: true });
}

describe('FrCheckbox', () => {
  it('adds the primitive host class', async () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    await fixture.whenStable();
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    const field = fixture.nativeElement.querySelector('label') as HTMLLabelElement;
    const label = fixture.nativeElement.querySelector('[frCheckboxLabel]') as HTMLElement;

    expect(input.classList.contains('frame-checkbox')).toBe(true);
    expect(field.classList.contains('frame-checkbox-field')).toBe(true);
    expect(label.classList.contains('frame-checkbox-label')).toBe(true);
  });

  it('reflects indeterminate state to the native checkbox and aria contract', async () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    const component = fixture.componentInstance;

    component.indeterminate.set(true);
    await fixture.whenStable();
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;

    expect(input.indeterminate).toBe(true);
    expect(input.getAttribute('aria-checked')).toBe('mixed');
    expect(input.getAttribute('data-indeterminate')).toBe('');
  });

  it('preserves native checked binding support', async () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    const component = fixture.componentInstance;

    component.checked.set(true);
    await fixture.whenStable();
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;

    expect(input.checked).toBe(true);
  });

  it('supports native invalid styling hooks', async () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    const component = fixture.componentInstance;

    component.invalid.set(true);
    await fixture.whenStable();
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;

    expect(input.getAttribute('aria-invalid')).toBe('true');
  });

  it('works with Angular reactive forms', async () => {
    const fixture = TestBed.createComponent(ReactiveFormsHostComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;

    expect(input.checked).toBe(true);

    input.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(fixture.componentInstance.control.value).toBe(false);

    fixture.componentInstance.control.disable();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(input.disabled).toBe(true);
  });
});
