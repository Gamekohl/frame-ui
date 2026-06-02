import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { FrCollapsible, FrCollapsibleContent, FrCollapsibleTrigger } from '../collapsible';

@Component({
  imports: [FrCollapsible, FrCollapsibleTrigger, FrCollapsibleContent],
  standalone: true,
  template: `
    <section
      frCollapsible
      [defaultOpen]="defaultOpen()"
      [disabled]="disabled()"
      [open]="controlledOpen()"
      (openChange)="openChange.set($event)"
    >
      <button frCollapsibleTrigger>Toggle</button>
      <div frCollapsibleContent>Details</div>
    </section>
  `,
})
class TestHostComponent {
  readonly defaultOpen = signal(false);
  readonly disabled = signal(false);
  readonly controlledOpen = signal<boolean | undefined>(undefined);
  readonly openChange = signal<boolean | null>(null);
}

describe('FrCollapsible', () => {
  it('renders closed by default', async () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    await fixture.whenStable();
    fixture.detectChanges();

    const root = fixture.nativeElement.querySelector('[frCollapsible]') as HTMLElement;
    const content = fixture.nativeElement.querySelector('[frCollapsibleContent]') as HTMLElement;

    expect(root.getAttribute('data-state')).toBe('closed');
    expect(content.getAttribute('aria-hidden')).toBe('true');
  });

  it('opens from defaultOpen', async () => {
    const fixture = TestBed.createComponent(TestHostComponent);

    fixture.componentInstance.defaultOpen.set(true);
    await fixture.whenStable();
    fixture.detectChanges();

    const trigger = fixture.nativeElement.querySelector('[frCollapsibleTrigger]') as HTMLButtonElement;
    const content = fixture.nativeElement.querySelector('[frCollapsibleContent]') as HTMLElement;

    expect(trigger.getAttribute('aria-expanded')).toBe('true');
    expect(content.getAttribute('aria-hidden')).toBe('false');
  });

  it('toggles uncontrolled state from the trigger', async () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    await fixture.whenStable();
    fixture.detectChanges();

    const trigger = fixture.nativeElement.querySelector('[frCollapsibleTrigger]') as HTMLButtonElement;
    trigger.click();
    fixture.detectChanges();

    const root = fixture.nativeElement.querySelector('[frCollapsible]') as HTMLElement;
    expect(root.getAttribute('data-state')).toBe('open');
    expect(fixture.componentInstance.openChange()).toBe(true);
  });

  it('emits changes without mutating controlled open state', async () => {
    const fixture = TestBed.createComponent(TestHostComponent);

    fixture.componentInstance.controlledOpen.set(false);
    await fixture.whenStable();
    fixture.detectChanges();

    const trigger = fixture.nativeElement.querySelector('[frCollapsibleTrigger]') as HTMLButtonElement;
    trigger.click();
    fixture.detectChanges();

    const root = fixture.nativeElement.querySelector('[frCollapsible]') as HTMLElement;
    expect(root.getAttribute('data-state')).toBe('closed');
    expect(fixture.componentInstance.openChange()).toBe(true);
  });

  it('prevents toggling while disabled', async () => {
    const fixture = TestBed.createComponent(TestHostComponent);

    fixture.componentInstance.disabled.set(true);
    await fixture.whenStable();
    fixture.detectChanges();

    const trigger = fixture.nativeElement.querySelector('[frCollapsibleTrigger]') as HTMLButtonElement;
    trigger.click();
    fixture.detectChanges();

    const root = fixture.nativeElement.querySelector('[frCollapsible]') as HTMLElement;
    expect(root.getAttribute('data-state')).toBe('closed');
    expect(trigger.hasAttribute('disabled')).toBe(true);
    expect(fixture.componentInstance.openChange()).toBeNull();
  });
});
