import { Component, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import {
  FrCombobox,
  FrComboboxChip,
  FrComboboxChips,
  FrComboboxChipsInput,
  FrComboboxContent,
  FrComboboxEmpty,
  FrComboboxInput,
  FrComboboxItem,
  FrComboboxList,
  FrComboboxPanel,
  FrComboboxValueList,
} from '../combobox';

@Component({
  imports: [
    FrCombobox,
    FrComboboxContent,
    FrComboboxEmpty,
    FrComboboxInput,
    FrComboboxItem,
    FrComboboxList,
    FrComboboxPanel,
  ],
  standalone: true,
  template: `
    <div frCombobox [(value)]="value" autoHighlight showClear>
      <input frComboboxInput placeholder="Select framework" />

      <ng-template frComboboxContent>
        <div frComboboxPanel>
          <p frComboboxEmpty>No items found.</p>
          <div frComboboxList>
            <button frComboboxItem value="next">Next.js</button>
            <button frComboboxItem value="svelte">SvelteKit</button>
            <button frComboboxItem value="nuxt">Nuxt.js</button>
            <button frComboboxItem value="remix">Remix</button>
          </div>
        </div>
      </ng-template>
    </div>
  `,
})
class TestHostComponent {
  readonly value = signal<unknown | unknown[] | null>(null);
}

@Component({
  imports: [
    ReactiveFormsModule,
    FrCombobox,
    FrComboboxContent,
    FrComboboxInput,
    FrComboboxItem,
    FrComboboxList,
    FrComboboxPanel,
  ],
  standalone: true,
  template: `
    <div frCombobox [formControl]="control">
      <input frComboboxInput />
      <ng-template frComboboxContent>
        <div frComboboxPanel>
          <div frComboboxList>
            <button frComboboxItem value="next">Next.js</button>
          </div>
        </div>
      </ng-template>
    </div>
  `,
})
class ReactiveFormsHostComponent {
  readonly control = new FormControl<unknown | unknown[] | null>('next');
}

@Component({
  imports: [FrCombobox, FrComboboxChip, FrComboboxChips, FrComboboxChipsInput, FrComboboxValueList],
  standalone: true,
  template: `
    <div frCombobox multiple [(value)]="value">
      <div frComboboxChips>
        <div #values="frComboboxValue" frComboboxValue>
          @for (item of values.values(); track item) {
            <span frComboboxChip [value]="item">{{ item }}</span>
          }
        </div>
        <input frComboboxChipsInput />
      </div>
    </div>
  `,
})
class MultipleChipsHostComponent {
  readonly value = signal<unknown | unknown[] | null>(['Next.js']);
}

describe('FrCombobox', () => {
  afterEach(() => {
    document.body.querySelector('.cdk-overlay-container')?.remove();
  });

  it('opens on input focus and filters visible items', async () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();

    const input = fixture.debugElement.query(By.directive(FrComboboxInput)).nativeElement as HTMLInputElement;
    input.dispatchEvent(new FocusEvent('focus'));
    input.value = 'svelte';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    await fixture.whenStable();

    const items = Array.from(document.body.querySelectorAll('button[frcomboboxitem]')) as HTMLElement[];

    expect(items.length).toBe(4);
    expect(items[0].getAttribute('data-hidden')).toBe('');
    expect(items[1].getAttribute('data-hidden')).toBeNull();
    expect(items[2].getAttribute('data-hidden')).toBe('');
    expect(items[3].getAttribute('data-hidden')).toBe('');
  });

  it('keeps every matching item visible while filtering', async () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();

    const input = fixture.debugElement.query(By.directive(FrComboboxInput)).nativeElement as HTMLInputElement;
    input.dispatchEvent(new FocusEvent('focus'));
    input.value = 'e';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    await fixture.whenStable();

    const visibleItems = Array.from(document.body.querySelectorAll('button[frcomboboxitem]')).filter(
      (item) => !item.hasAttribute('data-hidden'),
    );

    expect(visibleItems.map((item) => item.textContent?.trim())).toEqual(['Next.js', 'SvelteKit', 'Remix']);
  });

  it('selects an item and updates value state', async () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();

    const input = fixture.debugElement.query(By.directive(FrComboboxInput)).nativeElement as HTMLInputElement;
    input.dispatchEvent(new FocusEvent('focus'));
    fixture.detectChanges();
    await fixture.whenStable();

    const item = document.body.querySelector('button[frcomboboxitem]') as HTMLButtonElement;
    item.click();
    fixture.detectChanges();

    expect(fixture.componentInstance.value()).toBe('next');
  });

  it('works with Angular reactive forms', async () => {
    const fixture = TestBed.createComponent(ReactiveFormsHostComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    const input = fixture.debugElement.query(By.directive(FrComboboxInput)).nativeElement as HTMLInputElement;

    expect(fixture.componentInstance.control.value).toBe('next');

    fixture.componentInstance.control.disable();
    fixture.detectChanges();

    expect(input.disabled).toBe(true);
  });

  it('renders a default remove button for chips', async () => {
    const fixture = TestBed.createComponent(MultipleChipsHostComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    const remove = fixture.nativeElement.querySelector('.frame-combobox__chip-remove') as HTMLButtonElement;
    expect(remove).not.toBeNull();

    remove.click();
    fixture.detectChanges();

    expect(fixture.componentInstance.value()).toEqual([]);
  });
});
