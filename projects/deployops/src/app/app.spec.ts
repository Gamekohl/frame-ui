import { provideRouter } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { App } from './app';

describe('DeployOps shell', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create the app shell', () => {
    const fixture = TestBed.createComponent(App);

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render sidebar navigation and the routed content outlet', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('DeployOps');
    expect(compiled.textContent).toContain('Release Queue');
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });
});
