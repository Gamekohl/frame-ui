import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { FrAlert, FrAlertDescription, FrAlertIcon, FrAlertTitle, FrAlertVariant } from '../alert';

@Component({
  imports: [FrAlert, FrAlertIcon, FrAlertTitle, FrAlertDescription],
  standalone: true,
  template: `
    <section frAlert [variant]="variant()">
      <span frAlertIcon>!</span>
      <h5 frAlertTitle>Heads up</h5>
      <p frAlertDescription>This action can be undone later.</p>
    </section>
  `,
})
class TestHostComponent {
  readonly variant = signal<FrAlertVariant>('default');
}

describe('FrAlert', () => {
  it('adds the primitive host classes and role', async () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    await fixture.whenStable();
    fixture.detectChanges();

    const alert = fixture.nativeElement.querySelector('section') as HTMLElement;
    const icon = fixture.nativeElement.querySelector('[frAlertIcon]') as HTMLElement;
    const title = fixture.nativeElement.querySelector('[frAlertTitle]') as HTMLElement;
    const description = fixture.nativeElement.querySelector('[frAlertDescription]') as HTMLElement;

    expect(alert.classList.contains('frame-alert')).toBe(true);
    expect(alert.getAttribute('role')).toBe('alert');
    expect(icon.classList.contains('frame-alert__icon')).toBe(true);
    expect(title.classList.contains('frame-alert__title')).toBe(true);
    expect(description.classList.contains('frame-alert__description')).toBe(true);
  });

  it('reflects the selected variant as a host attribute', async () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    const component = fixture.componentInstance;

    component.variant.set('destructive');
    await fixture.whenStable();
    fixture.detectChanges();

    const alert = fixture.nativeElement.querySelector('section') as HTMLElement;

    expect(alert.getAttribute('data-variant')).toBe('destructive');
  });

  it('accepts the extended semantic variants', async () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    const component = fixture.componentInstance;

    component.variant.set('success');
    await fixture.whenStable();
    fixture.detectChanges();

    const alert = fixture.nativeElement.querySelector('section') as HTMLElement;

    expect(alert.getAttribute('data-variant')).toBe('success');
  });
});
