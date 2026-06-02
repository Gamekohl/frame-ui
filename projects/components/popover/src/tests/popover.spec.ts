import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import {
  FrPopover,
  FrPopoverBody,
  FrPopoverClose,
  FrPopoverContent,
  FrPopoverDescription,
  FrPopoverHeader,
  FrPopoverPanel,
  FrPopoverTitle,
  FrPopoverTrigger,
} from '../popover';

@Component({
  imports: [
    FrPopover,
    FrPopoverBody,
    FrPopoverClose,
    FrPopoverContent,
    FrPopoverDescription,
    FrPopoverHeader,
    FrPopoverPanel,
    FrPopoverTitle,
    FrPopoverTrigger,
  ],
  template: `
    <frame-popover [(open)]="open">
      <button [frPopoverTrigger]="content" type="button">Open</button>

      <ng-template #content="frPopoverContent" frPopoverContent side="right" align="start">
        <div frPopoverPanel>
          <div frPopoverHeader>
            <h3 frPopoverTitle>Workspace</h3>
            <p frPopoverDescription>Adjust project settings.</p>
          </div>
          <div frPopoverBody>
            <button frPopoverClose type="button">Close</button>
          </div>
        </div>
      </ng-template>
    </frame-popover>
  `,
})
class TestHostComponent {
  readonly open = signal(false);
}

describe('FrPopover', () => {
  afterEach(() => {
    document.body.querySelector('.cdk-overlay-container')?.remove();
  });

  it('opens and closes from the trigger', async () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();

    const trigger = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    trigger.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(document.body.querySelector('.frame-popover__content')).not.toBeNull();
    expect(trigger.getAttribute('data-state')).toBe('open');
    expect(fixture.componentInstance.open()).toBe(true);

    trigger.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(document.body.querySelector('.frame-popover__content')).toBeNull();
    expect(fixture.componentInstance.open()).toBe(false);
  });

  it('renders structural primitives and closes from close directive', async () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();

    const trigger = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    trigger.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const panel = document.body.querySelector('.frame-popover__content') as HTMLElement | null;

    expect(panel?.querySelector('.frame-popover__header')).not.toBeNull();
    expect(panel?.querySelector('.frame-popover__title')?.textContent).toContain('Workspace');
    expect(panel?.querySelector('.frame-popover__description')?.textContent).toContain('Adjust project settings');
    expect(panel?.querySelector('.frame-popover__body')).not.toBeNull();

    const close = panel?.querySelector('[frPopoverClose]') as HTMLButtonElement;
    close.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(document.body.querySelector('.frame-popover__content')).toBeNull();
  });
});
