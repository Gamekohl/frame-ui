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
    <frame-accordion
      [type]="type()"
      [border]="border()"
      [collapsible]="collapsible()"
      [defaultValue]="defaultValue()"
    >
      <frame-accordion-item value="item-1">
        <button frameAccordionTrigger>
          <span>First item</span>
          <span frameAccordionIcon>+</span>
        </button>
        <ng-template frameAccordionContent>First content</ng-template>
      </frame-accordion-item>

      <frame-accordion-item value="item-2" [disabled]="disabledSecond()">
        <button frameAccordionTrigger>
          <span>Second item</span>
          <span frameAccordionIcon>+</span>
        </button>
        <ng-template frameAccordionContent>Second content</ng-template>
      </frame-accordion-item>
    </frame-accordion>
  `,
})
class TestHostComponent {
  readonly type = signal<FrAccordionType>('single');
  readonly border = signal(true);
  readonly collapsible = signal(false);
  readonly defaultValue = signal<string | string[] | null>('item-1');
  readonly disabledSecond = signal(false);
}

@Component({
  imports: [FrAccordion],
  standalone: true,
  template: `<frame-accordion></frame-accordion>`,
})
class DefaultAccordionHostComponent {}

describe('FrAccordion', () => {
  it('is borderless by default', async () => {
    const fixture = TestBed.createComponent(DefaultAccordionHostComponent);
    await fixture.whenStable();
    fixture.detectChanges();

    const root = fixture.nativeElement.querySelector('frame-accordion') as HTMLElement;
    expect(root.getAttribute('data-border')).toBe('false');
  });

  it('opens the default item in single mode', async () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    await fixture.whenStable();
    fixture.detectChanges();

    const items = fixture.nativeElement.querySelectorAll('frame-accordion-item');

    expect(items[0].getAttribute('data-state')).toBe('open');
    expect(items[1].getAttribute('data-state')).toBe('closed');
    expect(items[0].querySelector('.frame-accordion__content')).not.toBeNull();
    expect(items[1].querySelector('.frame-accordion__content')?.getAttribute('aria-hidden')).toBe(
      'true',
    );
  });

  it('exposes the border setting on the accordion root', async () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    const component = fixture.componentInstance;

    component.border.set(false);
    await fixture.whenStable();
    fixture.detectChanges();

    const root = fixture.nativeElement.querySelector('frame-accordion') as HTMLElement;
    expect(root.getAttribute('data-border')).toBe('false');
  });

  it('toggles a single item when collapsible is enabled', async () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    const component = fixture.componentInstance;

    component.collapsible.set(true);
    await fixture.whenStable();
    fixture.detectChanges();

    const firstTrigger = fixture.nativeElement.querySelector('[frameAccordionTrigger]') as HTMLButtonElement;
    firstTrigger.click();
    fixture.detectChanges();

    const firstItem = fixture.nativeElement.querySelector('frame-accordion-item') as HTMLElement;
    expect(firstItem.getAttribute('data-state')).toBe('closed');
    const closingContent = firstItem.querySelector('.frame-accordion__content') as HTMLElement;
    expect(closingContent).not.toBeNull();

    const transitionEnd = new Event('transitionend', { bubbles: true });
    Object.defineProperty(transitionEnd, 'propertyName', { value: 'height' });
    closingContent.dispatchEvent(transitionEnd);
    fixture.detectChanges();

    expect(firstItem.querySelector('.frame-accordion__content')?.getAttribute('aria-hidden')).toBe(
      'true',
    );
  });

  it('allows multiple items to be open in multiple mode', async () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    const component = fixture.componentInstance;

    component.type.set('multiple');
    component.defaultValue.set(['item-1']);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const triggers = fixture.nativeElement.querySelectorAll('[frameAccordionTrigger]') as NodeListOf<HTMLButtonElement>;
    triggers[1].click();
    fixture.detectChanges();

    const items = fixture.nativeElement.querySelectorAll('frame-accordion-item');
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

    const triggers = fixture.nativeElement.querySelectorAll('[frameAccordionTrigger]') as NodeListOf<HTMLButtonElement>;
    triggers[1].click();
    fixture.detectChanges();

    const items = fixture.nativeElement.querySelectorAll('frame-accordion-item');
    expect(items[1].getAttribute('data-state')).toBe('closed');
    expect(triggers[1].hasAttribute('disabled')).toBe(true);
  });
});
