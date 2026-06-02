import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { FrButtonGroup } from '../button-group';

@Component({
  imports: [FrButtonGroup],
  standalone: true,
  template: `
    <div frButtonGroup>
      <button type="button">One</button>
      <button type="button">Two</button>
    </div>
  `,
})
class TestHostComponent {}

describe('FrButtonGroup', () => {
  it('adds the helper class and role', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();

    const group = fixture.nativeElement.querySelector('[frbuttongroup]') as HTMLElement;

    expect(group.classList.contains('frame-button-group')).toBe(true);
    expect(group.getAttribute('role')).toBe('group');
    expect(group.getAttribute('data-orientation')).toBe('horizontal');
  });
});
