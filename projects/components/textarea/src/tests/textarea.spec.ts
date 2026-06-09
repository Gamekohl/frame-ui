import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { FrButton, FrButtonLabel } from '@frame-ui-ng/components/button';
import { FrField, FrFieldDescription, FrFieldLabel } from '@frame-ui-ng/components/field';
import { FrInputDescription, FrInputField, FrInputLabel } from '@frame-ui-ng/components/input';
import { FrTextarea } from '../textarea';

@Component({
  imports: [FrInputDescription, FrInputField, FrInputLabel, FrTextarea],
  standalone: true,
  template: `
    <div frInputField>
      <label frInputLabel for="message">Message</label>
      <textarea frTextarea id="message" placeholder="Type your message"></textarea>
      <p frInputDescription>Enter your message below.</p>
    </div>
  `,
})
class TextareaHostComponent {}

@Component({
  imports: [ReactiveFormsModule, FrTextarea, FrField, FrFieldDescription, FrFieldLabel],
  standalone: true,
  template: `
    <div frField [disabled]="control.disabled" [invalid]="control.invalid && control.touched">
      <label frFieldLabel for="feedback">Feedback</label>
      <textarea
        frTextarea
        id="feedback"
        [formControl]="control"
        [attr.aria-invalid]="control.invalid && control.touched ? 'true' : null"
      ></textarea>
      <p frFieldDescription>Please enter a valid message.</p>
    </div>
  `,
})
class TextareaReactiveFormsHostComponent {
  readonly control = new FormControl('Initial message', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(10)],
  });
}

@Component({
  imports: [FrButton, FrButtonLabel, FrTextarea],
  standalone: true,
  template: `
    <div class="textarea-inline-row">
      <textarea frTextarea placeholder="Type your message"></textarea>
      <button frButton type="button">
        <span frButtonLabel>Send message</span>
      </button>
    </div>
  `,
})
class TextareaButtonHostComponent {}

describe('FrTextarea', () => {
  it('adds the primitive class', () => {
    const fixture = TestBed.createComponent(TextareaHostComponent);
    fixture.detectChanges();

    const textarea = fixture.nativeElement.querySelector('textarea') as HTMLTextAreaElement;

    expect(textarea.classList.contains('frame-textarea')).toBe(true);
  });

  it('supports helper content with the input field primitives', () => {
    const fixture = TestBed.createComponent(TextareaHostComponent);
    fixture.detectChanges();

    const field = fixture.nativeElement.querySelector('[frinputfield]') as HTMLElement;
    const label = fixture.nativeElement.querySelector('[frinputlabel]') as HTMLElement;
    const description = fixture.nativeElement.querySelector('[frinputdescription]') as HTMLElement;

    expect(field.classList.contains('frame-input-field')).toBe(true);
    expect(label.classList.contains('frame-input-label')).toBe(true);
    expect(description.classList.contains('frame-input-description')).toBe(true);
  });

  it('works with Angular reactive forms', async () => {
    const fixture = TestBed.createComponent(TextareaReactiveFormsHostComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    const textarea = fixture.nativeElement.querySelector('textarea') as HTMLTextAreaElement;
    const field = fixture.nativeElement.querySelector('[frfield]') as HTMLElement;

    expect(textarea.value).toBe('Initial message');
    expect(field.getAttribute('data-invalid')).toBeNull();

    fixture.componentInstance.control.setValue('Updated feedback');
    fixture.detectChanges();
    await fixture.whenStable();

    expect(textarea.value).toBe('Updated feedback');

    fixture.componentInstance.control.setValue('');
    fixture.componentInstance.control.markAsTouched();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(textarea.classList.contains('ng-invalid')).toBe(true);
    expect(textarea.getAttribute('aria-invalid')).toBe('true');
    expect(field.getAttribute('data-invalid')).toBe('');

    fixture.componentInstance.control.disable();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(textarea.disabled).toBe(true);
    expect(field.getAttribute('data-disabled')).toBe('');
  });

  it('can be paired with a button in inline layouts', () => {
    const fixture = TestBed.createComponent(TextareaButtonHostComponent);
    fixture.detectChanges();

    const textarea = fixture.nativeElement.querySelector('textarea') as HTMLTextAreaElement;
    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;

    expect(textarea.classList.contains('frame-textarea')).toBe(true);
    expect(button.classList.contains('frame-button')).toBe(true);
  });
});

