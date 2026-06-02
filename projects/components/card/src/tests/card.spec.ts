import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import {
  FrCard,
  FrCardAction,
  FrCardContent,
  FrCardDescription,
  FrCardFooter,
  FrCardHeader,
  FrCardTitle,
} from '../card';

@Component({
  imports: [
    FrCard,
    FrCardHeader,
    FrCardTitle,
    FrCardDescription,
    FrCardAction,
    FrCardContent,
    FrCardFooter,
  ],
  standalone: true,
  template: `
    <section frCard size="sm" spacing="lg">
      <header frCardHeader>
        <h3 frCardTitle>Card title</h3>
        <p frCardDescription>Card description</p>
        <button frCardAction type="button">Action</button>
      </header>
      <div frCardContent>Card content</div>
      <footer frCardFooter>Card footer</footer>
    </section>
  `,
})
class CardHostComponent {}

@Component({
  imports: [FrCard],
  standalone: true,
  template: `<section frCard [spacing]="spacing()">Dynamic card</section>`,
})
class DynamicCardHostComponent {
  readonly spacing = signal<'sm' | 'md' | 'lg' | 'xl'>('sm');
}

describe('FrCard', () => {
  it('adds card classes and size attributes to composed parts', () => {
    const fixture = TestBed.createComponent(CardHostComponent);
    fixture.detectChanges();

    const card = fixture.nativeElement.querySelector('[frCard]') as HTMLElement;
    const header = fixture.nativeElement.querySelector('[frCardHeader]') as HTMLElement;
    const title = fixture.nativeElement.querySelector('[frCardTitle]') as HTMLElement;
    const description = fixture.nativeElement.querySelector('[frCardDescription]') as HTMLElement;
    const action = fixture.nativeElement.querySelector('[frCardAction]') as HTMLElement;
    const content = fixture.nativeElement.querySelector('[frCardContent]') as HTMLElement;
    const footer = fixture.nativeElement.querySelector('[frCardFooter]') as HTMLElement;

    expect(card.classList.contains('frame-card')).toBe(true);
    expect(card.getAttribute('data-size')).toBe('sm');
    expect(card.getAttribute('data-spacing')).toBe('lg');
    expect(card.style.getPropertyValue('--frame-card-spacing')).toBe('1.25rem');
    expect(header.classList.contains('frame-card__header')).toBe(true);
    expect(title.classList.contains('frame-card__title')).toBe(true);
    expect(description.classList.contains('frame-card__description')).toBe(true);
    expect(action.classList.contains('frame-card__action')).toBe(true);
    expect(content.classList.contains('frame-card__content')).toBe(true);
    expect(footer.classList.contains('frame-card__footer')).toBe(true);
  });

  it('updates the spacing variable when the spacing input changes', () => {
    const fixture = TestBed.createComponent(DynamicCardHostComponent);
    fixture.detectChanges();

    const card = fixture.nativeElement.querySelector('[frCard]') as HTMLElement;

    expect(card.getAttribute('data-spacing')).toBe('sm');
    expect(card.style.getPropertyValue('--frame-card-spacing')).toBe('0.75rem');

    fixture.componentInstance.spacing.set('xl');
    fixture.detectChanges();

    expect(card.getAttribute('data-spacing')).toBe('xl');
    expect(card.style.getPropertyValue('--frame-card-spacing')).toBe('2rem');
  });
});
