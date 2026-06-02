import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { FrSlider, FrSliderValue } from '../slider';

@Component({
  imports: [FrSlider],
  template: `
    <frame-slider
      [defaultValue]="defaultValue()"
      [min]="0"
      [max]="100"
      [step]="5"
      [orientation]="orientation()"
      (valueChange)="valueChange.set($event)"
    />
  `,
})
class SliderHost {
  readonly defaultValue = signal<FrSliderValue>(25);
  readonly orientation = signal<'horizontal' | 'vertical'>('horizontal');
  readonly valueChange = signal<FrSliderValue | null>(null);
}

@Component({
  imports: [FrSlider, ReactiveFormsModule],
  template: ` <frame-slider [formControl]="control" [min]="0" [max]="10" /> `,
})
class SliderFormHost {
  readonly control = new FormControl<number | number[]>(4, { nonNullable: true });
}

describe('FrSlider', () => {
  let fixture: ComponentFixture<SliderHost>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SliderHost],
    });

    fixture = TestBed.createComponent(SliderHost);
    fixture.detectChanges();
  });

  it('renders a slider with native range input and default value', () => {
    const slider = fixture.nativeElement.querySelector('frame-slider') as HTMLElement;
    const input = fixture.nativeElement.querySelector('input[type="range"]') as HTMLInputElement;

    expect(slider.classList.contains('frame-slider')).toBe(true);
    expect(slider.getAttribute('data-orientation')).toBe('horizontal');
    expect(input.value).toBe('25');
    expect(input.min).toBe('0');
    expect(input.max).toBe('100');
    expect(input.step).toBe('5');
  });

  it('emits snapped values on input', () => {
    const input = fixture.nativeElement.querySelector('input[type="range"]') as HTMLInputElement;

    input.value = '45';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    fixture.detectChanges();

    expect(fixture.componentInstance.valueChange()).toBe(45);
  });

  it('supports reactive forms', () => {
    const formFixture = TestBed.createComponent(SliderFormHost);
    formFixture.detectChanges();

    const input = formFixture.nativeElement.querySelector('input[type="range"]') as HTMLInputElement;
    input.value = '8';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    formFixture.detectChanges();

    expect(formFixture.componentInstance.control.value).toBe(8);
  });

  it('supports range values', () => {
    fixture.componentInstance.defaultValue.set([20, 80]);
    fixture.detectChanges();

    const inputs = fixture.nativeElement.querySelectorAll('input[type="range"]') as NodeListOf<HTMLInputElement>;

    expect(inputs.length).toBe(2);
    expect(inputs[0].value).toBe('20');
    expect(inputs[1].value).toBe('80');
  });

  it('drags the nearest thumb in a range slider', () => {
    fixture.componentInstance.defaultValue.set([20, 80]);
    fixture.detectChanges();

    const slider = fixture.nativeElement.querySelector('frame-slider') as HTMLElement;
    vi.spyOn(slider, 'getBoundingClientRect').mockReturnValue({
      bottom: 20,
      height: 20,
      left: 0,
      right: 100,
      toJSON: () => ({}),
      top: 0,
      width: 100,
      x: 0,
      y: 0,
    });

    slider.dispatchEvent(new PointerEvent('pointerdown', { button: 0, clientX: 25, clientY: 10, bubbles: true }));
    document.dispatchEvent(new PointerEvent('pointermove', { clientX: 35, clientY: 10, bubbles: true }));
    document.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));
    fixture.detectChanges();

    expect(fixture.componentInstance.valueChange()).toEqual([35, 80]);
  });

  it('maps vertical pointer movement to the same visual direction', () => {
    fixture.componentInstance.defaultValue.set(50);
    fixture.componentInstance.orientation.set('vertical');
    fixture.detectChanges();

    const slider = fixture.nativeElement.querySelector('frame-slider') as HTMLElement;
    vi.spyOn(slider, 'getBoundingClientRect').mockReturnValue({
      bottom: 100,
      height: 100,
      left: 0,
      right: 20,
      toJSON: () => ({}),
      top: 0,
      width: 20,
      x: 0,
      y: 0,
    });

    slider.dispatchEvent(new PointerEvent('pointerdown', { button: 0, clientX: 10, clientY: 20, bubbles: true }));
    document.dispatchEvent(new PointerEvent('pointermove', { clientX: 10, clientY: 80, bubbles: true }));
    document.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));
    fixture.detectChanges();

    expect(fixture.componentInstance.valueChange()).toBe(20);
  });
});
