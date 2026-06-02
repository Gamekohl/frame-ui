import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import {
  FrInputGroup,
  FrInputGroupAddon,
  FrInputGroupInput,
  FrInputGroupText,
} from '../input';

@Component({
  imports: [FrInputGroup, FrInputGroupAddon, FrInputGroupInput, FrInputGroupText],
  standalone: true,
  template: `
    <div frInputGroup>
      <span frInputGroupAddon align="inline-start">
        <span frInputGroupText>https://</span>
      </span>
      <input frInputGroupInput type="text" />
      <span frInputGroupAddon align="inline-end">i</span>
    </div>
  `,
})
class TestHostComponent {}

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
    expect(text.classList.contains('frame-input-group__text')).toBe(true);
  });
});
