import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import {
  FrButton,
  FrButtonIcon,
  FrButtonLabel,
} from '@frame-ui-ng/components/button';

import {
  FrInputGroup,
  FrInputGroupAddon,
  FrInputGroupInput,
  FrInputGroupText,
} from '../input';

@Component({
  imports: [
    FrInputGroup,
    FrInputGroupAddon,
    FrInputGroupInput,
    FrInputGroupText,
  ],
  standalone: true,
  template: `
    <div frInputGroup>
      <span frInputGroupAddon align="inline-start">
        <span frInputGroupText>https://</span>
      </span>
      <input frInputGroupInput type="text" />
      <span frInputGroupAddon align="inline-end" variant="ghost">i</span>
    </div>
  `,
})
class TestHostComponent {}

@Component({
  imports: [
    FrButton,
    FrButtonIcon,
    FrButtonLabel,
    FrInputGroup,
    FrInputGroupAddon,
    FrInputGroupInput,
  ],
  standalone: true,
  template: `
    <div frInputGroup>
      <input frInputGroupInput type="search" />
      <span frInputGroupAddon align="inline-end">
        <button frButton appearance="ghost" type="button">
          <span frButtonIcon>F</span>
          <span frButtonLabel>Filter</span>
        </button>
      </span>
    </div>
  `,
})
class TestButtonAddonHostComponent {}

describe('FrInputGroup', () => {
  it('adds the group and addon classes', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();

    const group = fixture.nativeElement.querySelector('[frinputgroup]') as HTMLElement;
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    const addons = Array.from(
      fixture.nativeElement.querySelectorAll('[frinputgroupaddon]'),
    ) as HTMLElement[];
    const text = fixture.nativeElement.querySelector('[frinputgrouptext]') as HTMLElement;

    expect(group.classList.contains('frame-input-group')).toBe(true);
    expect(input.classList.contains('frame-input')).toBe(true);
    expect(input.classList.contains('frame-input-group__input')).toBe(true);
    expect(addons[0].getAttribute('data-align')).toBe('inline-start');
    expect(addons[1].getAttribute('data-align')).toBe('inline-end');
    expect(addons[0].getAttribute('data-variant')).toBe('default');
    expect(addons[1].getAttribute('data-variant')).toBe('ghost');
    expect(text.classList.contains('frame-input-group__text')).toBe(true);
  });

  it('supports buttons inside addons', () => {
    const fixture = TestBed.createComponent(TestButtonAddonHostComponent);
    fixture.detectChanges();

    const addon = fixture.nativeElement.querySelector('[frinputgroupaddon]') as HTMLElement;
    const button = addon.querySelector('button') as HTMLButtonElement;

    expect(addon.getAttribute('data-align')).toBe('inline-end');
    expect(addon.getAttribute('data-variant')).toBe('default');
    expect(button.classList.contains('frame-button')).toBe(true);
    expect(button.getAttribute('data-appearance')).toBe('ghost');
  });
});
