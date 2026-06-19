import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { FrConfirmPopover } from '../confirm-popover';

@Component({
  imports: [FrConfirmPopover],
  template: `
    <div
      role="button"
      tabindex="0"
      [frConfirmPopover]="{
        title: 'Archive project?',
        description: 'The project can be restored from settings.',
        cancelLabel: 'Keep',
        confirmLabel: 'Archive'
      }"
      (frConfirmPopoverConfirmed)="confirmed.set(true)"
    >
      Project card
    </div>
  `,
})
class CardTriggerHostComponent {
  readonly confirmed = signal(false);
}

@Component({
  imports: [FrConfirmPopover],
  template: `
    <button frConfirmPopover="Ship release?" frConfirmPopoverDescription="The team will be notified." type="button">
      Ship
    </button>
  `,
})
class StringTriggerHostComponent {}

@Component({
  imports: [FrConfirmPopover],
  template: `
    <button
      frConfirmPopoverTitle="Discard draft?"
      frConfirmPopoverDescription="Your local edits will be removed."
      frConfirmPopoverCancelLabel="Keep editing"
      frConfirmPopoverConfirmLabel="Discard"
      type="button"
    >
      Discard draft
    </button>
  `,
})
class IndividualInputsHostComponent {}

describe('FrConfirmPopover', () => {
  afterEach(() => {
    document.querySelectorAll('.cdk-overlay-container').forEach((element) => element.remove());
  });

  it('opens from a non-button host element', async () => {
    const fixture = TestBed.createComponent(CardTriggerHostComponent);
    fixture.detectChanges();

    const trigger = fixture.nativeElement.querySelector('[role="button"]') as HTMLElement;
    trigger.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const panel = document.querySelector('.frame-confirm-popover__content') as HTMLElement;

    expect(panel).not.toBeNull();
    expect(panel.textContent).toContain('Archive project?');
    expect(panel.textContent).toContain('The project can be restored from settings.');
    expect(trigger.getAttribute('data-state')).toBe('open');
  });

  it('emits confirmed and closes when the confirm action is selected', async () => {
    const fixture = TestBed.createComponent(CardTriggerHostComponent);
    fixture.detectChanges();

    const trigger = fixture.nativeElement.querySelector('[role="button"]') as HTMLElement;
    trigger.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const confirmButton = Array.from(document.querySelectorAll('button.frame-button')).find((button) =>
      button.textContent?.includes('Archive'),
    ) as HTMLButtonElement;
    confirmButton.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(fixture.componentInstance.confirmed()).toBe(true);
    expect(document.querySelector('.frame-confirm-popover__content')).toBeNull();
  });

  it('supports string shorthand with individual input overrides', async () => {
    const fixture = TestBed.createComponent(StringTriggerHostComponent);
    fixture.detectChanges();

    const trigger = fixture.debugElement.query(By.directive(FrConfirmPopover)).nativeElement as HTMLButtonElement;
    trigger.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const panel = document.querySelector('.frame-confirm-popover__content') as HTMLElement;

    expect(panel.textContent).toContain('Ship release?');
    expect(panel.textContent).toContain('The team will be notified.');
  });

  it('supports individual inputs without the base frConfirmPopover input', async () => {
    const fixture = TestBed.createComponent(IndividualInputsHostComponent);
    fixture.detectChanges();

    const trigger = fixture.debugElement.query(By.directive(FrConfirmPopover)).nativeElement as HTMLButtonElement;
    trigger.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const panel = document.querySelector('.frame-confirm-popover__content') as HTMLElement;

    expect(panel.textContent).toContain('Discard draft?');
    expect(panel.textContent).toContain('Your local edits will be removed.');
    expect(panel.textContent).toContain('Keep editing');
    expect(panel.textContent).toContain('Discard');
  });
});
