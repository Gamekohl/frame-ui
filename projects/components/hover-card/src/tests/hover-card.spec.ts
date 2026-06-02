import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrHoverCard, FrHoverCardContent, FrHoverCardPanel, FrHoverCardTrigger } from '../hover-card';

@Component({
  imports: [FrHoverCard, FrHoverCardContent, FrHoverCardPanel, FrHoverCardTrigger],
  template: `
    <frame-hover-card [openDelay]="openDelay()" [closeDelay]="closeDelay()">
      <button [frHoverCardTrigger]="card" type="button">Hover</button>

      <ng-template #card="frHoverCardContent" frHoverCardContent side="top" align="start">
        <div frHoverCardPanel>Content</div>
      </ng-template>
    </frame-hover-card>
  `,
})
class HoverCardHostComponent {
  readonly openDelay = signal(0);
  readonly closeDelay = signal(0);
}

describe('FrHoverCard', () => {
  let fixture: ComponentFixture<HoverCardHostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HoverCardHostComponent],
    });

    fixture = TestBed.createComponent(HoverCardHostComponent);
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

    expect(document.querySelector('.frame-hover-card__content')?.textContent).toContain('Content');
    expect(trigger.getAttribute('data-state')).toBe('open');

    trigger.dispatchEvent(new MouseEvent('mouseleave'));
    fixture.detectChanges();
    await wait(0);
    fixture.detectChanges();

    expect(document.querySelector('.frame-hover-card__content')).toBeNull();
    expect(trigger.getAttribute('data-state')).toBe('closed');
  });

  it('respects open delay', async () => {
    fixture.componentInstance.openDelay.set(200);
    fixture.detectChanges();

    const trigger = fixture.nativeElement.querySelector('button') as HTMLElement;
    trigger.dispatchEvent(new MouseEvent('mouseenter'));
    fixture.detectChanges();
    await wait(40);
    fixture.detectChanges();

    expect(document.querySelector('.frame-hover-card__content')).toBeNull();

    await wait(220);
    fixture.detectChanges();

    expect(document.querySelector('.frame-hover-card__content')).not.toBeNull();
  });
});

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
