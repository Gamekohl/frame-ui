import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import {
  FrAccordion,
  FrAccordionContent,
  FrAccordionIcon,
  FrAccordionItem,
  FrAccordionTrigger,
  FrAccordionType,
} from '../accordion';

@Component({
  imports: [
    FrAccordion,
    FrAccordionItem,
    FrAccordionTrigger,
    FrAccordionContent,
    FrAccordionIcon,
  ],
  standalone: true,
  template: `
    <div
      frAccordion
      [type]="type()"
      [border]="border()"
      [collapsible]="collapsible()"
      [defaultValue]="defaultValue()"
    >
      <section frAccordionItem value="item-1">
        <button frAccordionTrigger>
          <span>First item</span>
          <span frAccordionIcon>+</span>
        </button>
        <div frAccordionContent>First content</div>
      </section>

      <section frAccordionItem value="item-2" [disabled]="disabledSecond()">
        <button frAccordionTrigger>
          <span>Second item</span>
          <span frAccordionIcon>+</span>
        </button>
        <div frAccordionContent>Second content</div>
      </section>
    </div>
  `,
})
class TestHostComponent {
  readonly type = signal<FrAccordionType>('single');
  readonly border = signal(true);
  readonly collapsible = signal(false);
  readonly defaultValue = signal<string | string[] | null>('item-1');
  readonly disabledSecond = signal(false);
}

describe('FrAccordion', () => {
  it('opens the default item in single mode', async () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    await fixture.whenStable();
    fixture.detectChanges();

    const items = fixture.nativeElement.querySelectorAll('[frAccordionItem]');
    const firstContent = items[0].querySelector('[frAccordionContent]') as HTMLElement;
    const secondContent = items[1].querySelector('[frAccordionContent]') as HTMLElement;

    expect(items[0].getAttribute('data-state')).toBe('open');
    expect(items[1].getAttribute('data-state')).toBe('closed');
    expect(firstContent.getAttribute('aria-hidden')).toBe('false');
    expect(secondContent.getAttribute('aria-hidden')).toBe('true');
  });

  it('exposes the border setting on the accordion root', async () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    const component = fixture.componentInstance;

    component.border.set(false);
    await fixture.whenStable();
    fixture.detectChanges();

    const root = fixture.nativeElement.querySelector('[frAccordion]') as HTMLElement;
    expect(root.getAttribute('data-border')).toBe('false');
  });

  it('toggles a single item when collapsible is enabled', async () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    const component = fixture.componentInstance;

    component.collapsible.set(true);
    await fixture.whenStable();
    fixture.detectChanges();

    const firstTrigger = fixture.nativeElement.querySelector('[frAccordionTrigger]') as HTMLButtonElement;
    firstTrigger.click();
    fixture.detectChanges();

    const firstItem = fixture.nativeElement.querySelector('[frAccordionItem]') as HTMLElement;
    expect(firstItem.getAttribute('data-state')).toBe('closed');
  });

  it('allows multiple items to be open in multiple mode', async () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    const component = fixture.componentInstance;

    component.type.set('multiple');
    component.defaultValue.set(['item-1']);
    await fixture.whenStable();
    fixture.detectChanges();

    const triggers = fixture.nativeElement.querySelectorAll('[frAccordionTrigger]') as NodeListOf<HTMLButtonElement>;
    triggers[1].click();
    fixture.detectChanges();

    const items = fixture.nativeElement.querySelectorAll('[frAccordionItem]');
    expect(items[0].getAttribute('data-state')).toBe('open');
    expect(items[1].getAttribute('data-state')).toBe('open');
  });

  it('prevents disabled items from opening', async () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    const component = fixture.componentInstance;

    component.disabledSecond.set(true);
    component.defaultValue.set(null);
    await fixture.whenStable();
    fixture.detectChanges();

    const triggers = fixture.nativeElement.querySelectorAll('[frAccordionTrigger]') as NodeListOf<HTMLButtonElement>;
    triggers[1].click();
    fixture.detectChanges();

    const items = fixture.nativeElement.querySelectorAll('[frAccordionItem]');
    expect(items[1].getAttribute('data-state')).toBe('closed');
    expect(triggers[1].hasAttribute('disabled')).toBe(true);
  });
});
