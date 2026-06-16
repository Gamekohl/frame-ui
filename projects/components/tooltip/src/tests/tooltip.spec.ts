import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { FrTooltipDirective, FrTooltipShortcut } from '../tooltip';

@Component({
  imports: [FrTooltipDirective],
  template: `
    <button [frTooltip]="tooltip()" [frTooltipArrow]="true" frTooltipSide="bottom" type="button">
      Save
    </button>
  `,
})
class InlineTooltipHostComponent {
  readonly tooltip = signal('Save this draft');
}

@Component({
  imports: [FrTooltipDirective],
  template: `
    <button [frTooltip]="tooltip" disabled type="button">
      Ship release
    </button>
  `,
})
class DisabledInlineTooltipHostComponent {
  readonly tooltip = 'Every team member needs to approve.';
}

@Component({
  imports: [FrTooltipDirective],
  template: `
    <button [frTooltip]="tooltip" [disabled]="disabled()" type="button">
      Ship release
    </button>
  `,
})
class DynamicDisabledInlineTooltipHostComponent {
  readonly disabled = signal(false);
  readonly tooltip = 'Approval is still pending.';
}

@Component({
  imports: [FrTooltipDirective, FrTooltipShortcut],
  template: `
    <button [frTooltip]="tip" type="button">Save</button>

    <ng-template #tip>
      <span>Save current draft</span>
      <kbd frTooltipShortcut>Ctrl S</kbd>
    </ng-template>
  `,
})
class TemplateTooltipHostComponent {}

describe('FrTooltipDirective', () => {
  afterEach(() => {
    document.querySelectorAll('.cdk-overlay-container').forEach((element) => element.remove());
  });

  it('attaches a text tooltip directly to the trigger without an explicit delay', async () => {
    const fixture = TestBed.createComponent(InlineTooltipHostComponent);
    fixture.detectChanges();

    const trigger = fixture.nativeElement.querySelector('button') as HTMLElement;

    trigger.dispatchEvent(new MouseEvent('mouseenter'));
    fixture.detectChanges();
    await wait(0);
    fixture.detectChanges();

    const panel = document.querySelector('.frame-tooltip__content') as HTMLElement;

    expect(panel?.textContent).toContain('Save this draft');
    expect(panel?.getAttribute('data-arrow')).toBe('');
    expect(panel?.getAttribute('data-side')).toBe('bottom');
    expect(trigger.getAttribute('aria-describedby')).toMatch(/^frame-tooltip-inline-/);
    expect(trigger.getAttribute('data-state')).toBe('open');
  });

  it('aligns the arrow with the trigger center when the panel is shifted', async () => {
    const fixture = TestBed.createComponent(InlineTooltipHostComponent);
    fixture.detectChanges();

    const trigger = fixture.nativeElement.querySelector('button') as HTMLElement;

    trigger.dispatchEvent(new MouseEvent('mouseenter'));
    fixture.detectChanges();
    await wait(0);
    fixture.detectChanges();

    const panel = document.querySelector('.frame-tooltip__content') as HTMLElement;
    const directive = fixture.debugElement.query(By.directive(FrTooltipDirective)).injector.get(FrTooltipDirective) as unknown as {
      scheduleArrowPosition(side: 'bottom'): void;
    };

    panel.style.setProperty('--frame-tooltip-arrow-size', '8px');

    vi.spyOn(trigger, 'getBoundingClientRect').mockReturnValue({
      bottom: 140,
      height: 40,
      left: 100,
      right: 140,
      toJSON: () => ({}),
      top: 100,
      width: 40,
      x: 100,
      y: 100,
    });
    vi.spyOn(panel, 'getBoundingClientRect').mockReturnValue({
      bottom: 90,
      height: 40,
      left: 60,
      right: 220,
      toJSON: () => ({}),
      top: 50,
      width: 160,
      x: 60,
      y: 50,
    });

    directive.scheduleArrowPosition('bottom');
    await wait(16);

    expect(panel.style.getPropertyValue('--frame-tooltip-arrow-x')).toBe('56px');
  });

  it('closes on pointer leave', async () => {
    const fixture = TestBed.createComponent(InlineTooltipHostComponent);
    fixture.detectChanges();

    const trigger = fixture.nativeElement.querySelector('button') as HTMLElement;

    trigger.dispatchEvent(new MouseEvent('mouseenter'));
    fixture.detectChanges();
    await wait(0);
    fixture.detectChanges();

    expect(document.querySelector('.frame-tooltip__content')).not.toBeNull();

    trigger.dispatchEvent(new MouseEvent('mouseleave'));
    fixture.detectChanges();
    await wait(0);
    fixture.detectChanges();

    expect(document.querySelector('.frame-tooltip__content')).toBeNull();
    expect(trigger.getAttribute('data-state')).toBe('closed');
  });

  it('opens on focus and closes with escape', async () => {
    const fixture = TestBed.createComponent(InlineTooltipHostComponent);
    fixture.detectChanges();

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

  it('wraps disabled native controls so their tooltip can still open', async () => {
    const fixture = TestBed.createComponent(DisabledInlineTooltipHostComponent);
    fixture.detectChanges();

    const wrapper = fixture.nativeElement.querySelector('.frame-tooltip__disabled-trigger') as HTMLElement;
    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;

    wrapper.dispatchEvent(new MouseEvent('mouseenter'));
    fixture.detectChanges();
    await wait(0);
    fixture.detectChanges();

    expect(button.disabled).toBe(true);
    expect(document.querySelector('.frame-tooltip__content')?.textContent).toContain(
      'Every team member needs to approve.',
    );
  });

  it('handles native controls that become disabled after init', async () => {
    const fixture = TestBed.createComponent(DynamicDisabledInlineTooltipHostComponent);
    fixture.detectChanges();

    fixture.componentInstance.disabled.set(true);
    fixture.detectChanges();
    await wait(0);
    fixture.detectChanges();

    const wrapper = fixture.nativeElement.querySelector('.frame-tooltip__disabled-trigger') as HTMLElement;

    wrapper.dispatchEvent(new MouseEvent('mouseenter'));
    fixture.detectChanges();
    await wait(0);
    fixture.detectChanges();

    expect(document.querySelector('.frame-tooltip__content')?.textContent).toContain(
      'Approval is still pending.',
    );
  });

  it('renders template tooltip content with shortcut styling', async () => {
    const fixture = TestBed.createComponent(TemplateTooltipHostComponent);
    fixture.detectChanges();

    const trigger = fixture.nativeElement.querySelector('button') as HTMLElement;

    trigger.dispatchEvent(new MouseEvent('mouseenter'));
    fixture.detectChanges();
    await wait(0);
    fixture.detectChanges();

    const shortcut = document.querySelector('[frTooltipShortcut]') as HTMLElement;

    expect(document.querySelector('.frame-tooltip__content')?.textContent).toContain('Save current draft');
    expect(shortcut.classList.contains('frame-tooltip__shortcut')).toBe(true);
    expect(shortcut.textContent).toContain('Ctrl S');
  });
});

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
