import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrTooltip, FrTooltipContent, FrTooltipPanel, FrTooltipShortcut, FrTooltipTrigger } from '../tooltip';

@Component({
  imports: [FrTooltip, FrTooltipContent, FrTooltipPanel, FrTooltipShortcut, FrTooltipTrigger],
  template: `
    <frame-tooltip [openDelay]="openDelay()" [closeDelay]="closeDelay()">
      <button [frTooltipTrigger]="tip" type="button">Hover</button>

      <ng-template #tip="frTooltipContent" frTooltipContent side="bottom" arrow>
        <div frTooltipPanel>
          Helpful hint
          <kbd frTooltipShortcut>Ctrl H</kbd>
        </div>
      </ng-template>
    </frame-tooltip>
  `,
})
class TooltipHostComponent {
  readonly openDelay = signal(0);
  readonly closeDelay = signal(0);
}

describe('FrTooltip', () => {
  let fixture: ComponentFixture<TooltipHostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TooltipHostComponent],
    });

    fixture = TestBed.createComponent(TooltipHostComponent);
    fixture.detectChanges();
  });

  afterEach(() => {
    document.querySelectorAll('.cdk-overlay-container').forEach((element) => element.remove());
  });

  it('opens and closes from pointer hover', async () => {
    const trigger = fixture.nativeElement.querySelector('button') as HTMLElement;

    trigger.dispatchEvent(new MouseEvent('mouseenter'));
    fixture.detectChanges();
    await wait(0);
    fixture.detectChanges();

    expect(document.querySelector('.frame-tooltip__content')?.textContent).toContain('Helpful hint');
    expect(trigger.getAttribute('data-state')).toBe('open');
    expect(trigger.getAttribute('aria-describedby')).toMatch(/^frame-tooltip-/);

    trigger.dispatchEvent(new MouseEvent('mouseleave'));
    fixture.detectChanges();
    await wait(0);
    fixture.detectChanges();

    expect(document.querySelector('.frame-tooltip__content')).toBeNull();
    expect(trigger.getAttribute('data-state')).toBe('closed');
  });

  it('opens on focus and closes with escape', async () => {
    const trigger = fixture.nativeElement.querySelector('button') as HTMLElement;

    trigger.dispatchEvent(new FocusEvent('focusin'));
    fixture.detectChanges();
    await wait(0);
    fixture.detectChanges();

    expect(document.querySelector('.frame-tooltip__content')).not.toBeNull();

    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    fixture.detectChanges();

    expect(document.querySelector('.frame-tooltip__content')).toBeNull();
  });

  it('respects open delay', async () => {
    fixture.componentInstance.openDelay.set(200);
    fixture.detectChanges();

    const trigger = fixture.nativeElement.querySelector('button') as HTMLElement;
    trigger.dispatchEvent(new MouseEvent('mouseenter'));
    fixture.detectChanges();
    await wait(40);
    fixture.detectChanges();

    expect(document.querySelector('.frame-tooltip__content')).toBeNull();

    await wait(220);
    fixture.detectChanges();

    expect(document.querySelector('.frame-tooltip__content')).not.toBeNull();
  });

  it('styles projected keyboard shortcuts', async () => {
    const trigger = fixture.nativeElement.querySelector('button') as HTMLElement;

    trigger.dispatchEvent(new MouseEvent('mouseenter'));
    fixture.detectChanges();
    await wait(0);
    fixture.detectChanges();

    const shortcut = document.querySelector('[frTooltipShortcut]') as HTMLElement;

    expect(shortcut.classList.contains('frame-tooltip__shortcut')).toBe(true);
    expect(shortcut.textContent).toContain('Ctrl H');
  });
});

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
