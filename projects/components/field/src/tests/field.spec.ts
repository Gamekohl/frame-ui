import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import {
  FrField,
  FrFieldContent,
  FrFieldDescription,
  FrFieldError,
  FrFieldGroup,
  FrFieldLabel,
  FrFieldLegend,
  FrFieldSeparator,
  FrFieldSet,
} from '../field';

@Component({
  imports: [
    FrField,
    FrFieldContent,
    FrFieldDescription,
    FrFieldError,
    FrFieldGroup,
    FrFieldLabel,
    FrFieldLegend,
    FrFieldSeparator,
    FrFieldSet,
  ],
  standalone: true,
  template: `
    <fieldset frFieldSet>
      <legend frFieldLegend variant="label">Profile</legend>
      <p frFieldDescription>This appears on invoices.</p>
      <div frFieldGroup>
        <div frField invalid disabled>
          <label frFieldLabel for="name">Full name</label>
          <div frFieldContent>
            <input id="name" />
            <p frFieldError [errors]="errors"></p>
          </div>
        </div>
        <div frFieldSeparator>or</div>
        <div frField orientation="horizontal">
          <label frFieldLabel for="username">Username</label>
          <div frFieldContent>
            <input id="username" />
            <span frFieldLabel>Inline label helper</span>
            <span frFieldDescription>Choose a unique username.</span>
          </div>
        </div>
      </div>
    </fieldset>
  `,
})
class FieldHostComponent {
  readonly errors = { message: 'Name is required.' };
}

describe('FrField', () => {
  it('applies field composition classes and states', () => {
    const fixture = TestBed.createComponent(FieldHostComponent);
    fixture.detectChanges();

    const field = fixture.nativeElement.querySelector('[frfield]') as HTMLElement;
    const legend = fixture.nativeElement.querySelector('[frfieldlegend]') as HTMLElement;

    expect(field.classList.contains('frame-field')).toBe(true);
    expect(field.getAttribute('role')).toBe('group');
    expect(field.hasAttribute('data-orientation')).toBe(false);
    expect(field.getAttribute('data-disabled')).toBe('');
    expect(field.getAttribute('data-invalid')).toBe('');
    expect(legend.getAttribute('data-variant')).toBe('label');
    expect(fixture.nativeElement.querySelector('span.frame-field-label')?.textContent).toContain(
      'Inline label helper',
    );
  });

  it('renders grouped fields with horizontal orientation metadata only when requested', () => {
    const fixture = TestBed.createComponent(FieldHostComponent);
    fixture.detectChanges();

    const fields = fixture.nativeElement.querySelectorAll('[frfield]') as NodeListOf<HTMLElement>;

    expect(fields.length).toBe(2);
    expect(fields[0].hasAttribute('data-orientation')).toBe(false);
    expect(fields[1].getAttribute('data-orientation')).toBe('horizontal');
  });

  it('renders a single field error message from the errors input', () => {
    const fixture = TestBed.createComponent(FieldHostComponent);
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    const message = host.querySelector<HTMLElement>('.frame-field-error')?.textContent?.trim();

    expect(message).toBe('Name is required.');
  });
});
