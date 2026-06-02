import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { FrSwitch, FrSwitchContent, FrSwitchDescription, FrSwitchField, FrSwitchLabel } from '../switch';

@Component({
  imports: [FrSwitch, FrSwitchField, FrSwitchContent, FrSwitchDescription, FrSwitchLabel],
  standalone: true,
  template: `
    <label frSwitchField>
      <input frSwitch type="checkbox" size="sm" />
      <span frSwitchContent>
        <span frSwitchLabel>Airplane mode</span>
        <span frSwitchDescription>Disable wireless connections.</span>
      </span>
    </label>
  `,
})
class SwitchHostComponent {}

@Component({
  imports: [ReactiveFormsModule, FrSwitch],
  standalone: true,
  template: `<input frSwitch type="checkbox" [formControl]="control" />`,
})
class ReactiveFormsSwitchHostComponent {
  readonly control = new FormControl(false, { nonNullable: true });
}

describe('FrSwitch', () => {
  it('renders as a native checkbox switch with size state', () => {
    const fixture = TestBed.createComponent(SwitchHostComponent);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;

    expect(input.classList.contains('frame-switch')).toBe(true);
    expect(input.getAttribute('role')).toBe('switch');
    expect(input.getAttribute('data-size')).toBe('sm');
  });

  it('toggles with native checkbox behavior', () => {
    const fixture = TestBed.createComponent(SwitchHostComponent);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    input.click();
    fixture.detectChanges();

    expect(input.checked).toBe(true);
  });

  it('works with Angular reactive forms', () => {
    const fixture = TestBed.createComponent(ReactiveFormsSwitchHostComponent);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;

    input.click();
    fixture.detectChanges();

    expect(fixture.componentInstance.control.value).toBe(true);

    fixture.componentInstance.control.disable();
    fixture.detectChanges();

    expect(input.disabled).toBe(true);
  });
});
