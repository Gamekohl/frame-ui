import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import {
  FrButton,
  FrButtonAppearance,
  FrButtonIcon,
  FrIconButton,
  FrButtonLabel,
  FrButtonLoadingDisplay,
  FrButtonLoading,
  FrButtonRadius,
  FrButtonSize,
} from '../button';

@Component({
  imports: [FrButton, FrButtonIcon, FrButtonLabel],
  standalone: true,
  template: `
    <button
      frButton
      [appearance]="appearance()"
      [disabled]="disabled()"
      [loading]="loading()"
      [loadingDisplay]="loadingDisplay()"
      [radius]="radius()"
      [size]="size()"
      type="button"
    >
      <span frButtonIcon>+</span>
      <span frButtonLabel>Save</span>
    </button>
  `,
})
class TestHostComponent {
  readonly appearance = signal<FrButtonAppearance>('ghost');
  readonly disabled = signal(false);
  readonly loading = signal(false);
  readonly loadingDisplay = signal<FrButtonLoadingDisplay>('replace');
  readonly radius = signal<FrButtonRadius>('full');
  readonly size = signal<FrButtonSize>('lg');
}

@Component({
  imports: [FrButton, FrButtonLabel, FrButtonLoading],
  standalone: true,
  template: `
    <button frButton [loading]="loading()" type="button">
      <span frButtonLabel>Save</span>
      <span frButtonLoading>Loading</span>
    </button>
  `,
})
class TestLoadingHostComponent {
  readonly loading = signal(true);
}

@Component({
  imports: [FrButtonIcon, FrIconButton],
  standalone: true,
  template: `
    <button
      frIconButton
      [appearance]="appearance()"
      [disabled]="disabled()"
      [size]="size()"
      aria-label="Add item"
      type="button"
    >
      <span frButtonIcon>+</span>
    </button>
  `,
})
class TestIconButtonHostComponent {
  readonly appearance = signal<FrButtonAppearance>('outline');
  readonly disabled = signal(false);
  readonly size = signal<FrButtonSize>('sm');
}

describe('FrButton', () => {
  it('reflects semantic variant inputs as host attributes', async () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    await fixture.whenStable();
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;

    expect(button.getAttribute('data-appearance')).toBe('ghost');
    expect(button.getAttribute('data-loading-display')).toBe('replace');
    expect(button.getAttribute('data-radius')).toBe('full');
    expect(button.getAttribute('data-size')).toBe('lg');
    expect(button.classList.contains('frame-button')).toBe(true);
  });

  it('updates disabled state and keeps optional slot markers stable', async () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    const component = fixture.componentInstance;

    component.disabled.set(true);
    await fixture.whenStable();
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    const icon = fixture.nativeElement.querySelector('[frButtonIcon]') as HTMLElement;
    const label = fixture.nativeElement.querySelector('[frButtonLabel]') as HTMLElement;

    expect(button.getAttribute('data-disabled')).toBe('');
    expect(button.getAttribute('aria-disabled')).toBe('true');
    expect(button.getAttribute('disabled')).toBe('');
    expect(button.classList.contains('frame-button-disabled')).toBe(true);
    expect(icon.classList.contains('frame-button__icon')).toBe(true);
    expect(label.classList.contains('frame-button__label')).toBe(true);
  });

  it('marks the host as loading and disabled while loading', async () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    const component = fixture.componentInstance;

    component.loading.set(true);
    component.loadingDisplay.set('inline');
    await fixture.whenStable();
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;

    expect(button.getAttribute('data-loading')).toBe('');
    expect(button.getAttribute('data-loading-display')).toBe('inline');
    expect(button.getAttribute('aria-busy')).toBe('true');
    expect(button.getAttribute('disabled')).toBe('');
    expect(button.classList.contains('frame-button-loading')).toBe(true);
  });

  it('detects a custom loading indicator slot', async () => {
    const fixture = TestBed.createComponent(TestLoadingHostComponent);
    await fixture.whenStable();
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    const loadingIndicator = fixture.nativeElement.querySelector('[frButtonLoading]') as HTMLElement;

    expect(button.getAttribute('data-radius')).toBe('none');
    expect(button.getAttribute('data-has-custom-loading')).toBe('');
    expect(loadingIndicator.classList.contains('frame-button__loading')).toBe(true);
  });

  it('composes FrIconButton on top of FrButton semantics', async () => {
    const fixture = TestBed.createComponent(TestIconButtonHostComponent);
    await fixture.whenStable();
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;

    expect(button.classList.contains('frame-button')).toBe(true);
    expect(button.classList.contains('frame-icon-button')).toBe(true);
    expect(button.getAttribute('data-appearance')).toBe('outline');
    expect(button.getAttribute('data-radius')).toBe('none');
    expect(button.getAttribute('data-size')).toBe('sm');
    expect(button.getAttribute('data-icon-button')).toBe('');
    expect(button.getAttribute('aria-label')).toBe('Add item');
  });
});
