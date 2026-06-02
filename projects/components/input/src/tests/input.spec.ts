import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import {
  FrInputBadge,
  FrInputControl,
  FrInput,
  FrInputDescription,
  FrInputError,
  FrInputField,
  FrInputFieldGroup,
  FrInputHeader,
  FrInputLabel,
} from '../input';

@Component({
  imports: [
    FrInput,
    FrInputBadge,
    FrInputControl,
    FrInputDescription,
    FrInputError,
    FrInputField,
    FrInputFieldGroup,
    FrInputHeader,
    FrInputLabel,
  ],
  standalone: true,
  template: `
    <div frInputFieldGroup>
      <div frInputField>
        <div frInputHeader>
          <label frInputLabel for="email">Email</label>
          <span frInputBadge>Beta</span>
        </div>
        <div frInputControl>
          <input frInput id="email" [value]="value()" type="email" />
        </div>
        <p frInputDescription>We will never share your email.</p>
        <p frInputError>There is a validation issue.</p>
      </div>
    </div>
  `,
})
class TestHostComponent {
  readonly value = signal('hello@example.com');
}

@Component({
  imports: [ReactiveFormsModule, FrInput, FrInputField, FrInputLabel],
  standalone: true,
  template: `
    <div frInputField>
      <label frInputLabel for="name">Name</label>
      <input frInput id="name" [formControl]="control" />
    </div>
  `,
})
class ReactiveFormsHostComponent {
  readonly control = new FormControl('Sarah');
}

describe('FrInput', () => {
  it('adds the primitive and helper classes', async () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    const fieldGroup = fixture.nativeElement.querySelector('[frinputfieldgroup]') as HTMLElement;
    const field = fixture.nativeElement.querySelector('[frinputfield]') as HTMLElement;
    const header = fixture.nativeElement.querySelector('[frinputheader]') as HTMLElement;
    const control = fixture.nativeElement.querySelector('[frinputcontrol]') as HTMLElement;
    const label = fixture.nativeElement.querySelector('[frinputlabel]') as HTMLElement;
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    const badge = fixture.nativeElement.querySelector('[frinputbadge]') as HTMLElement;
    const description = fixture.nativeElement.querySelector('[frinputdescription]') as HTMLElement;
    const error = fixture.nativeElement.querySelector('[frinputerror]') as HTMLElement;

    expect(fieldGroup.classList.contains('frame-input-field-group')).toBe(true);
    expect(field.classList.contains('frame-input-field')).toBe(true);
    expect(header.classList.contains('frame-input-header')).toBe(true);
    expect(control.classList.contains('frame-input-control')).toBe(true);
    expect(label.classList.contains('frame-input-label')).toBe(true);
    expect(input.classList.contains('frame-input')).toBe(true);
    expect(badge.classList.contains('frame-input-badge')).toBe(true);
    expect(description.classList.contains('frame-input-description')).toBe(true);
    expect(error.classList.contains('frame-input-error')).toBe(true);
    expect(error.getAttribute('aria-live')).toBe('polite');
  });

  it('preserves native input value binding support', async () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;

    expect(input.value).toBe('hello@example.com');
  });

  it('supports native file inputs', async () => {
    @Component({
      imports: [FrInput],
      standalone: true,
      template: `<input frInput type="file" />`,
    })
    class FileHostComponent {}

    const fixture = TestBed.createComponent(FileHostComponent);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;

    expect(input.type).toBe('file');
    expect(input.classList.contains('frame-input')).toBe(true);
  });

  it('works with Angular reactive forms', async () => {
    const fixture = TestBed.createComponent(ReactiveFormsHostComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;

    expect(input.value).toBe('Sarah');
    expect(input.disabled).toBe(false);

    fixture.componentInstance.control.setValue('Taylor');
    fixture.detectChanges();
    await fixture.whenStable();

    expect(input.value).toBe('Taylor');

    fixture.componentInstance.control.disable();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(input.disabled).toBe(true);
  });
});
