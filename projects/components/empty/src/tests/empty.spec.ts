import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { FrEmpty, FrEmptyContent, FrEmptyDescription, FrEmptyHeader, FrEmptyMedia, FrEmptyTitle } from '../empty';

@Component({
  imports: [FrEmpty, FrEmptyContent, FrEmptyDescription, FrEmptyHeader, FrEmptyMedia, FrEmptyTitle],
  standalone: true,
  template: `
    <div frEmpty variant="outline" orientation="horizontal">
      <div frEmptyHeader>
        <div frEmptyMedia variant="icon">I</div>
        <h3 frEmptyTitle>No projects</h3>
        <p frEmptyDescription>Create a project to get started.</p>
      </div>
      <div frEmptyContent>
        <button type="button">Create project</button>
      </div>
    </div>
  `,
})
class EmptyHostComponent {}

describe('FrEmpty', () => {
  it('applies composition classes and state attributes', () => {
    const fixture = TestBed.createComponent(EmptyHostComponent);
    fixture.detectChanges();

    const empty = fixture.nativeElement.querySelector('[frEmpty]') as HTMLElement;

    expect(empty.classList.contains('frame-empty')).toBe(true);
    expect(empty.getAttribute('data-variant')).toBe('outline');
    expect(empty.getAttribute('data-orientation')).toBe('horizontal');
    expect(fixture.nativeElement.querySelector('[frEmptyMedia]').getAttribute('data-variant')).toBe('icon');
    expect(fixture.nativeElement.querySelector('[frEmptyTitle]').textContent).toContain('No projects');
  });
});
