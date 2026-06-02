import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { FrAvatarBadge } from '../avatar.badge';
import { FrAvatarFallback } from '../avatar.fallback';
import { FrAvatarGroup, FrAvatarGroupCount } from '../avatar.group';
import { FrAvatarIcon } from '../avatar.icon';
import { FrAvatarImage } from '../avatar.image';
import { FrAvatar } from '../avatar.root';
import { FrAvatarSize } from '../avatar.types';

@Component({
  imports: [
    FrAvatar,
    FrAvatarImage,
    FrAvatarFallback,
    FrAvatarIcon,
    FrAvatarBadge,
    FrAvatarGroup,
    FrAvatarGroupCount,
  ],
  standalone: true,
  template: `
    <span frAvatar [size]="size()">
      <img frAvatarImage [src]="src()" alt="Sarah Chen" />
      <span frAvatarFallback>SC</span>
      <span frAvatarBadge>4</span>
    </span>

    <span frAvatar>
      <span frAvatarIcon>@</span>
    </span>

    <div frAvatarGroup size="sm">
      <span frAvatar>
        <span frAvatarFallback>AB</span>
      </span>
      <span frAvatarGroupCount>+2</span>
    </div>
  `,
})
class TestHostComponent {
  readonly size = signal<FrAvatarSize>('md');
  readonly src = signal('data:image/gif;base64,R0lGODlhAQABAAAAACw=');
}

describe('FrAvatar', () => {
  it('exposes the semantic size on the root', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.componentInstance.size.set('lg');
    fixture.detectChanges();

    const root = fixture.nativeElement.querySelector('[frAvatar]') as HTMLElement;
    expect(root.getAttribute('data-size')).toBe('lg');
  });

  it('keeps the fallback visible before the image loads', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();

    const root = fixture.nativeElement.querySelector('[frAvatar]') as HTMLElement;
    const fallback = fixture.nativeElement.querySelector('[frAvatarFallback]') as HTMLElement;

    expect(root.getAttribute('data-status')).toBe('idle');
    expect(fallback.getAttribute('data-visible')).toBe('true');
  });

  it('marks the avatar as loaded when the image loads', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();

    const image = fixture.nativeElement.querySelector('[frAvatarImage]') as HTMLImageElement;
    image.dispatchEvent(new Event('load'));
    fixture.detectChanges();

    const root = fixture.nativeElement.querySelector('[frAvatar]') as HTMLElement;
    const fallback = fixture.nativeElement.querySelector('[frAvatarFallback]') as HTMLElement;

    expect(root.getAttribute('data-status')).toBe('loaded');
    expect(fallback.getAttribute('data-visible')).toBe('false');
  });

  it('shows the fallback when the image errors', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();

    const image = fixture.nativeElement.querySelector('[frAvatarImage]') as HTMLImageElement;
    image.dispatchEvent(new Event('error'));
    fixture.detectChanges();

    const root = fixture.nativeElement.querySelector('[frAvatar]') as HTMLElement;
    const fallback = fixture.nativeElement.querySelector('[frAvatarFallback]') as HTMLElement;

    expect(root.getAttribute('data-status')).toBe('error');
    expect(fallback.getAttribute('data-visible')).toBe('true');
  });

  it('renders badge, icon, and group helpers', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();

    const badge = fixture.nativeElement.querySelector('[frAvatarBadge]') as HTMLElement;
    const icon = fixture.nativeElement.querySelector('[frAvatarIcon]') as HTMLElement;
    const group = fixture.nativeElement.querySelector('[frAvatarGroup]') as HTMLElement;
    const count = fixture.nativeElement.querySelector('[frAvatarGroupCount]') as HTMLElement;

    expect(badge.textContent?.trim()).toBe('4');
    expect(icon.textContent?.trim()).toBe('@');
    expect(group.getAttribute('data-size')).toBe('sm');
    expect(count.textContent?.trim()).toBe('+2');
  });

  it('exposes the hover expansion setting on the group', () => {
    @Component({
      imports: [FrAvatarGroup],
      standalone: true,
      template: `<div frAvatarGroup expandOnHover></div>`,
    })
    class GroupHostComponent {}

    const fixture = TestBed.createComponent(GroupHostComponent);
    fixture.detectChanges();

    const group = fixture.nativeElement.querySelector('[frAvatarGroup]') as HTMLElement;
    expect(group.getAttribute('data-expand-on-hover')).toBe('true');
  });
});
