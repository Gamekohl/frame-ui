import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { FrCornerHandles } from '../corner-handles';

@Component({
  imports: [FrCornerHandles],
  standalone: true,
  template: `
    <section frCornerHandles></section>
    <article [frCornerHandles]="enabled()"></article>
  `,
})
class TestHostComponent {
  readonly enabled = signal(false);
}

describe('FrCornerHandles', () => {
  it('adds corner handles by default and allows disabling them with an input', async () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    await fixture.whenStable();
    fixture.detectChanges();

    const section = fixture.nativeElement.querySelector('section') as HTMLElement;
    const article = fixture.nativeElement.querySelector('article') as HTMLElement;

    expect(section.classList.contains('frame-corner-handles')).toBe(true);
    expect(article.classList.contains('frame-corner-handles')).toBe(false);
    expect(article.getAttribute('data-frame-corner-handles')).toBe('false');
  });

  it('updates the corner handles class when the input changes', async () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    const component = fixture.componentInstance;

    component.enabled.set(true);
    await fixture.whenStable();
    fixture.detectChanges();

    const article = fixture.nativeElement.querySelector('article') as HTMLElement;

    expect(article.classList.contains('frame-corner-handles')).toBe(true);
    expect(article.hasAttribute('data-frame-corner-handles')).toBe(false);
  });
});
