import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import {
  FrItem,
  FrItemActions,
  FrItemContent,
  FrItemDescription,
  FrItemGroup,
  FrItemMedia,
  FrItemSeparator,
  FrItemTitle,
} from '../item';

@Component({
  imports: [
    FrItem,
    FrItemActions,
    FrItemContent,
    FrItemDescription,
    FrItemGroup,
    FrItemMedia,
    FrItemSeparator,
    FrItemTitle,
  ],
  template: `
    <div frItemGroup>
      <a frItem variant="outline" size="sm" interactive href="/docs">
        <span frItemMedia variant="icon">I</span>
        <span frItemContent>
          <span frItemTitle>Documentation</span>
          <span frItemDescription>Read the docs.</span>
        </span>
        <span frItemActions>Open</span>
      </a>
      <div frItemSeparator></div>
      <div frItem disabled>Disabled</div>
    </div>
  `,
})
class ItemHostComponent {}

describe('FrItem', () => {
  it('applies item structure attributes and classes', () => {
    const fixture = TestBed.createComponent(ItemHostComponent);
    fixture.detectChanges();

    const item = fixture.nativeElement.querySelector('[frItem]') as HTMLElement;
    const media = fixture.nativeElement.querySelector('[frItemMedia]') as HTMLElement;

    expect(item.classList.contains('frame-item')).toBe(true);
    expect(item.getAttribute('data-variant')).toBe('outline');
    expect(item.getAttribute('data-size')).toBe('sm');
    expect(item.hasAttribute('data-interactive')).toBe(true);
    expect(media.getAttribute('data-variant')).toBe('icon');
    expect(fixture.nativeElement.querySelector('[frItemGroup]')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('[frItemSeparator]')).not.toBeNull();
  });
});
