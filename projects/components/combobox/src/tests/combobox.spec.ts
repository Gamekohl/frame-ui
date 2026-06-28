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
  FrComboboxGroup,
  FrComboboxInput,
  FrComboboxItem,
  FrComboboxLabel,
  FrComboboxList,
  FrComboboxPanel,
  FrComboboxCollection,
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
  imports: [
    FrCombobox,
    FrComboboxContent,
    FrComboboxInput,
    FrComboboxItem,
    FrComboboxList,
    FrComboboxPanel,
  ],
  standalone: true,
  template: `
    <div frCombobox [(value)]="value" debugVisible>
      <input frComboboxInput />
      <ng-template frComboboxContent>
        <div frComboboxPanel>
          <div frComboboxList>
            <button frComboboxItem value="angular" label="Angular">angular</button>
          </div>
        </div>
      </ng-template>
    </div>
  `,
})
class LabelRegistrationHostComponent {
  readonly value = signal<unknown | unknown[] | null>('angular');
}

@Component({
  imports: [
    FrCombobox,
    FrComboboxContent,
    FrComboboxInput,
    FrComboboxItem,
    FrComboboxList,
    FrComboboxPanel,
  ],
  standalone: true,
  template: `
    <div frCombobox [(value)]="value" [itemToStringValue]="stringifyValue">
      <input frComboboxInput />
      <ng-template frComboboxContent>
        <div frComboboxPanel>
          <div frComboboxList>
            <button frComboboxItem value="angular" label="Angular">angular</button>
          </div>
        </div>
      </ng-template>
    </div>
  `,
})
class StringifierHostComponent {
  readonly value = signal<unknown | unknown[] | null>('angular');
  readonly stringifyValue = (value: unknown): string => (value === 'angular' ? 'Angular' : String(value ?? ''));
}

@Component({
  imports: [
    FrCombobox,
    FrComboboxContent,
    FrComboboxInput,
    FrComboboxItem,
    FrComboboxList,
    FrComboboxPanel,
  ],
  standalone: true,
  template: `
    <div frCombobox [(value)]="value">
      <input frComboboxInput />
      <ng-template frComboboxContent>
        <div frComboboxPanel>
          <div frComboboxList>
            <button frComboboxItem value="angular" label="Angular">Angular</button>
            <button frComboboxItem value="remix" label="Remix">Remix</button>
          </div>
        </div>
      </ng-template>
    </div>
  `,
})
class SelectedSearchHostComponent {
  readonly value = signal<unknown | unknown[] | null>('angular');
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

@Component({
  imports: [
    FrCombobox,
    FrComboboxChip,
    FrComboboxChips,
    FrComboboxChipsInput,
    FrComboboxContent,
    FrComboboxItem,
    FrComboboxList,
    FrComboboxPanel,
    FrComboboxValueList,
  ],
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

      <ng-template frComboboxContent>
        <div frComboboxPanel>
          <div frComboboxList>
            <button frComboboxItem value="next" label="Next.js">Next.js</button>
            <button frComboboxItem value="svelte" label="SvelteKit">SvelteKit</button>
            <button frComboboxItem value="remix" label="Remix">Remix</button>
          </div>
        </div>
      </ng-template>
    </div>
  `,
})
class ChipsNavigationHostComponent {
  readonly value = signal<unknown | unknown[] | null>(['Next.js']);
}

@Component({
  imports: [
    FrCombobox,
    FrComboboxCollection,
    FrComboboxContent,
    FrComboboxEmpty,
    FrComboboxGroup,
    FrComboboxInput,
    FrComboboxItem,
    FrComboboxLabel,
    FrComboboxList,
    FrComboboxPanel,
  ],
  standalone: true,
  template: `
    <div frCombobox>
      <input frComboboxInput />
      <ng-template frComboboxContent>
        <div frComboboxPanel>
          <p frComboboxEmpty>No matches found.</p>
          <div frComboboxCollection>
            <section frComboboxGroup data-testid="frontend-group">
              <p frComboboxLabel>Frontend</p>
              <div frComboboxList>
                <button frComboboxItem value="angular" label="Angular">Angular</button>
              </div>
            </section>
            <section frComboboxGroup data-testid="fullstack-group">
              <p frComboboxLabel>Full-stack</p>
              <div frComboboxList>
                <button frComboboxItem value="remix" label="Remix">Remix</button>
              </div>
            </section>
          </div>
        </div>
      </ng-template>
    </div>
  `,
})
class GroupedComboboxHostComponent {}

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

  it('does not render corner handles on the dropdown panel', async () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();

    const input = fixture.debugElement.query(By.directive(FrComboboxInput)).nativeElement as HTMLInputElement;
    input.dispatchEvent(new FocusEvent('focus'));
    fixture.detectChanges();
    await fixture.whenStable();

      const panel = document.body.querySelector('.frame-combobox__panel') as HTMLElement;
      expect(panel.classList.contains('frame-corner-handles')).toBe(false);
    });

  it('hides grouped sections without visible filter matches', async () => {
    const fixture = TestBed.createComponent(GroupedComboboxHostComponent);
    fixture.detectChanges();

    const input = fixture.debugElement.query(By.directive(FrComboboxInput)).nativeElement as HTMLInputElement;
    input.dispatchEvent(new FocusEvent('focus'));
    input.value = 'rem';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const frontendGroup = document.body.querySelector('[data-testid="frontend-group"]') as HTMLElement;
    const fullstackGroup = document.body.querySelector('[data-testid="fullstack-group"]') as HTMLElement;

    expect(frontendGroup.hasAttribute('hidden')).toBe(true);
    expect(fullstackGroup.hasAttribute('hidden')).toBe(false);
  });

  it('shows only the empty text when grouped filtering has no matches', async () => {
    const fixture = TestBed.createComponent(GroupedComboboxHostComponent);
    fixture.detectChanges();

    const input = fixture.debugElement.query(By.directive(FrComboboxInput)).nativeElement as HTMLInputElement;
    input.dispatchEvent(new FocusEvent('focus'));
    input.value = 'sxx';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const empty = document.body.querySelector('.frame-combobox__empty') as HTMLElement;
    const labels = Array.from(document.body.querySelectorAll('.frame-combobox__label')) as HTMLElement[];

    expect(empty.hasAttribute('hidden')).toBe(false);
    expect(labels.every((label) => label.closest('.frame-combobox__group')?.hasAttribute('hidden'))).toBe(true);
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

  it('scrolls the highlighted item into view during keyboard navigation', async () => {
    const scrollIntoView = vi.fn();
    const previousScrollIntoView = HTMLElement.prototype.scrollIntoView;
    HTMLElement.prototype.scrollIntoView = scrollIntoView;

    try {
      const fixture = TestBed.createComponent(TestHostComponent);
      fixture.detectChanges();

      const input = fixture.debugElement.query(By.directive(FrComboboxInput)).nativeElement as HTMLInputElement;
      input.dispatchEvent(new FocusEvent('focus'));
      fixture.detectChanges();
      await fixture.whenStable();

      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
      fixture.detectChanges();
      await fixture.whenStable();
      await new Promise((resolve) => queueMicrotask(() => resolve(undefined)));

      expect(scrollIntoView).toHaveBeenCalledWith({ block: 'nearest', inline: 'nearest' });
    } finally {
      HTMLElement.prototype.scrollIntoView = previousScrollIntoView;
    }
  });

  it('moves the highlighted item up and down from the chips input', async () => {
    const fixture = TestBed.createComponent(ChipsNavigationHostComponent);
    fixture.detectChanges();

    const input = fixture.debugElement.query(By.directive(FrComboboxChipsInput)).nativeElement as HTMLInputElement;
    input.dispatchEvent(new FocusEvent('focus'));
    fixture.detectChanges();
    await fixture.whenStable();

    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    fixture.detectChanges();
    await fixture.whenStable();

    let highlighted = document.body.querySelector('.frame-combobox__item[data-highlighted]') as HTMLElement;
    expect(highlighted.textContent?.trim()).toBe('SvelteKit');

    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
    fixture.detectChanges();
    await fixture.whenStable();

    highlighted = document.body.querySelector('.frame-combobox__item[data-highlighted]') as HTMLElement;
    expect(highlighted.textContent?.trim()).toBe('Next.js');
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

  it('updates the displayed value when a selected item label is registered', async () => {
    const fixture = TestBed.createComponent(LabelRegistrationHostComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const input = fixture.debugElement.query(By.directive(FrComboboxInput)).nativeElement as HTMLInputElement;

    expect(input.value).toBe('Angular');
  });

  it('uses itemToStringValue for initial values before lazy items are rendered', async () => {
    const fixture = TestBed.createComponent(StringifierHostComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    const input = fixture.debugElement.query(By.directive(FrComboboxInput)).nativeElement as HTMLInputElement;

    expect(input.value).toBe('Angular');
  });

  it('keeps the input empty when the user deletes the last query character from a selected value', async () => {
    const fixture = TestBed.createComponent(SelectedSearchHostComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const input = fixture.debugElement.query(By.directive(FrComboboxInput)).nativeElement as HTMLInputElement;
    expect(input.value).toBe('angular');

    input.dispatchEvent(new FocusEvent('focus'));
    input.value = 'A';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    input.value = '';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(input.value).toBe('');
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
