import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import {
  FrBreadcrumb,
  FrBreadcrumbEllipsis,
  FrBreadcrumbItem,
  FrBreadcrumbLink,
  FrBreadcrumbList,
  FrBreadcrumbPage,
  FrBreadcrumbSeparator,
} from '../breadcrumb';

@Component({
  imports: [
    FrBreadcrumb,
    FrBreadcrumbList,
    FrBreadcrumbItem,
    FrBreadcrumbLink,
    FrBreadcrumbPage,
    FrBreadcrumbSeparator,
    FrBreadcrumbEllipsis,
  ],
  standalone: true,
  template: `
    <nav frBreadcrumb aria-label="Site path">
      <ol frBreadcrumbList>
        <li frBreadcrumbItem>
          <a frBreadcrumbLink href="/">Home</a>
        </li>
        <li frBreadcrumbSeparator></li>
        <li frBreadcrumbItem>
          <span frBreadcrumbEllipsis label="More sections"></span>
        </li>
        <li frBreadcrumbSeparator>›</li>
        <li frBreadcrumbItem>
          <span frBreadcrumbPage>Components</span>
        </li>
      </ol>
    </nav>
  `,
})
class BreadcrumbHostComponent {}

describe('FrBreadcrumb', () => {
  it('adds semantic breadcrumb classes and aria attributes', () => {
    const fixture = TestBed.createComponent(BreadcrumbHostComponent);
    fixture.detectChanges();

    const nav = fixture.nativeElement.querySelector('nav') as HTMLElement;
    const list = fixture.nativeElement.querySelector('ol') as HTMLElement;
    const link = fixture.nativeElement.querySelector('a') as HTMLAnchorElement;
    const page = fixture.nativeElement.querySelector('[frBreadcrumbPage]') as HTMLElement;
    const separators = fixture.nativeElement.querySelectorAll('[frBreadcrumbSeparator]');

    expect(nav.classList.contains('frame-breadcrumb')).toBe(true);
    expect(nav.getAttribute('aria-label')).toBe('Site path');
    expect(list.classList.contains('frame-breadcrumb__list')).toBe(true);
    expect(link.classList.contains('frame-breadcrumb__link')).toBe(true);
    expect(page.classList.contains('frame-breadcrumb__page')).toBe(true);
    expect(page.getAttribute('aria-current')).toBe('page');
    expect(separators[0].getAttribute('aria-hidden')).toBe('true');
    expect(separators[0].getAttribute('role')).toBe('presentation');
  });

  it('renders an accessible ellipsis label', () => {
    const fixture = TestBed.createComponent(BreadcrumbHostComponent);
    fixture.detectChanges();

    const ellipsis = fixture.nativeElement.querySelector('[frBreadcrumbEllipsis]') as HTMLElement;

    expect(ellipsis.classList.contains('frame-breadcrumb__ellipsis')).toBe(true);
    expect(ellipsis.textContent).toContain('...');
    expect(ellipsis.textContent).toContain('More sections');
  });
});
