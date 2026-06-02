import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { FrToggle, FrToggleIcon, FrToggleLabel } from '../toggle';

@Component({
  imports: [FrToggle, FrToggleIcon, FrToggleLabel],
  template: `
    <button
      frToggle
      [defaultPressed]="defaultPressed()"
      [disabled]="disabled()"
      [variant]="variant()"
      [size]="size()"
      (pressedChange)="pressedChange.set($event)"
    >
      <span frToggleIcon>+</span>
      <span frToggleLabel>Pin</span>
    </button>
  `,
})
class ToggleHost {
  readonly defaultPressed = signal(false);
  readonly disabled = signal(false);
  readonly variant = signal<'default' | 'outline'>('default');
  readonly size = signal<'sm' | 'default' | 'lg'>('default');
  readonly pressedChange = signal<boolean | null>(null);
}

@Component({
  imports: [FrToggle],
  template: ` <button frToggle [pressed]="pressed()" (pressedChange)="pressed.set($event)">Mute</button> `,
})
class ControlledToggleHost {
  readonly pressed = signal(true);
}

@Component({
  imports: [FrToggle, ReactiveFormsModule],
  template: ` <button frToggle [formControl]="control">Notifications</button> `,
})
class ToggleFormHost {
  readonly control = new FormControl(false, { nonNullable: true });
}

describe('FrToggle', () => {
  let fixture: ComponentFixture<ToggleHost>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ToggleHost],
    });

    fixture = TestBed.createComponent(ToggleHost);
    fixture.detectChanges();
  });

  it('reflects variant, size, and pressed state', () => {
    fixture.componentInstance.defaultPressed.set(true);
    fixture.componentInstance.variant.set('outline');
    fixture.componentInstance.size.set('lg');
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;

    expect(button.classList.contains('frame-toggle')).toBe(true);
    expect(button.getAttribute('aria-pressed')).toBe('true');
    expect(button.getAttribute('data-state')).toBe('on');
    expect(button.getAttribute('data-variant')).toBe('outline');
    expect(button.getAttribute('data-size')).toBe('lg');
    expect(button.getAttribute('type')).toBe('button');
  });

  it('toggles and emits when clicked', () => {
    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;

    button.click();
    fixture.detectChanges();

    expect(button.getAttribute('aria-pressed')).toBe('true');
    expect(fixture.componentInstance.pressedChange()).toBe(true);
  });

  it('does not toggle while disabled', () => {
    fixture.componentInstance.disabled.set(true);
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;

    button.click();
    fixture.detectChanges();

    expect(button.getAttribute('data-disabled')).toBe('');
    expect(fixture.componentInstance.pressedChange()).toBeNull();
  });

  it('supports controlled pressed state', () => {
    const controlledFixture = TestBed.createComponent(ControlledToggleHost);
    controlledFixture.detectChanges();

    const button = controlledFixture.nativeElement.querySelector('button') as HTMLButtonElement;

    expect(button.getAttribute('data-state')).toBe('on');

    button.click();
    controlledFixture.detectChanges();

    expect(controlledFixture.componentInstance.pressed()).toBe(false);
    expect(button.getAttribute('data-state')).toBe('off');
  });

  it('supports reactive forms', () => {
    const formFixture = TestBed.createComponent(ToggleFormHost);
    formFixture.detectChanges();

    const button = formFixture.nativeElement.querySelector('button') as HTMLButtonElement;

    button.click();
    formFixture.detectChanges();

    expect(formFixture.componentInstance.control.value).toBe(true);

    formFixture.componentInstance.control.disable();
    formFixture.detectChanges();

    expect(button.disabled).toBe(true);
  });
});
