import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import {
  FrRadioGroup,
  FrRadioGroupCard,
  FrRadioGroupCardMeta,
  FrRadioGroupField,
  FrRadioGroupItem,
} from '../radio-group';

@Component({
  imports: [FrRadioGroup, FrRadioGroupCard, FrRadioGroupCardMeta, FrRadioGroupField, FrRadioGroupItem],
  template: `
    <div frRadioGroup [orientation]="orientation()" [variant]="variant()" [disabled]="disabled()" aria-label="Density">
      <label frRadioGroupCard>
        <input frRadioGroupItem type="radio" name="density" value="compact" checked />
        Compact
        <span frRadioGroupCardMeta>Default</span>
      </label>
      <label frRadioGroupField>
        <input frRadioGroupItem type="radio" name="density" value="comfortable" />
        Comfortable
      </label>
    </div>
  `,
})
class RadioGroupHost {
  readonly orientation = signal<'vertical' | 'horizontal'>('vertical');
  readonly variant = signal<'default' | 'cards'>('default');
  readonly disabled = signal(false);
}

@Component({
  imports: [ReactiveFormsModule, FrRadioGroup, FrRadioGroupItem],
  template: `
    <div frRadioGroup aria-label="Plan">
      <label>
        <input frRadioGroupItem type="radio" name="plan" value="starter" [formControl]="control" />
        Starter
      </label>
      <label>
        <input frRadioGroupItem type="radio" name="plan" value="team" [formControl]="control" />
        Team
      </label>
    </div>
  `,
})
class ReactiveFormsHost {
  readonly control = new FormControl('starter', {
    nonNullable: true,
    validators: [Validators.required],
  });
}

describe('FrRadioGroup', () => {
  it('adds root and item classes with orientation metadata', () => {
    const fixture = TestBed.createComponent(RadioGroupHost);
    fixture.detectChanges();

    const group = fixture.nativeElement.querySelector('[frRadioGroup]') as HTMLElement;
    const items = fixture.nativeElement.querySelectorAll('[frRadioGroupItem]');

    expect(group.classList.contains('frame-radio-group')).toBe(true);
    expect(group.getAttribute('role')).toBe('radiogroup');
    expect(group.getAttribute('data-orientation')).toBe('vertical');
    expect(group.getAttribute('data-variant')).toBe('default');
    expect(items.length).toBe(2);
    expect(items[0].classList.contains('frame-radio-group__item')).toBe(true);
    expect(
      fixture.nativeElement
        .querySelector('[frRadioGroupCard]')
        ?.classList.contains('frame-radio-group__card'),
    ).toBe(true);
    expect(
      fixture.nativeElement
        .querySelector('[frRadioGroupCardMeta]')
        ?.classList.contains('frame-radio-group__card-meta'),
    ).toBe(true);
    expect(
      fixture.nativeElement
        .querySelector('[frRadioGroupField]')
        ?.classList.contains('frame-radio-group__field'),
    ).toBe(true);
    expect(fixture.nativeElement.querySelector('[frRadioGroupField]')?.getAttribute('data-orientation')).toBe(
      'horizontal',
    );

    fixture.componentInstance.orientation.set('horizontal');
    fixture.componentInstance.variant.set('cards');
    fixture.detectChanges();

    expect(group.getAttribute('data-orientation')).toBe('horizontal');
    expect(group.getAttribute('data-variant')).toBe('cards');
  });

  it('reflects disabled metadata on the group', () => {
    const fixture = TestBed.createComponent(RadioGroupHost);

    fixture.componentInstance.disabled.set(true);
    fixture.detectChanges();

    const group = fixture.nativeElement.querySelector('[frRadioGroup]') as HTMLElement;

    expect(group.getAttribute('data-disabled')).toBe('');
  });

  it('works with Angular reactive forms through native radio inputs', () => {
    const fixture = TestBed.createComponent(ReactiveFormsHost);
    fixture.detectChanges();

    const inputs = fixture.nativeElement.querySelectorAll('input') as NodeListOf<HTMLInputElement>;

    expect(inputs[0].checked).toBe(true);
    expect(inputs[1].checked).toBe(false);

    inputs[1].click();
    fixture.detectChanges();

    expect(fixture.componentInstance.control.value).toBe('team');
    expect(inputs[0].checked).toBe(false);
    expect(inputs[1].checked).toBe(true);

    fixture.componentInstance.control.disable();
    fixture.detectChanges();

    expect(inputs[0].disabled).toBe(true);
    expect(inputs[1].disabled).toBe(true);
  });
});
