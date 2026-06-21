import { Component, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import {
  FrSelect,
  FrSelectContent,
  FrSelectError,
  FrSelectGroup,
  FrSelectIcon,
  FrSelectItem,
  FrSelectItemIndicator,
  FrSelectPanel,
  FrSelectSeparator,
  FrSelectValue,
} from '../select';
import { FrCalendar } from '@frame-ui-ng/components/calendar';

@Component({
  imports: [
    FrSelect,
    FrSelectContent,
    FrSelectGroup,
    FrSelectIcon,
    FrSelectItem,
    FrSelectItemIndicator,
    FrSelectPanel,
    FrSelectSeparator,
    FrSelectValue,
  ],
  standalone: true,
  template: `
    <button [frSelect]="menu" [(value)]="value">
      <frame-select-icon position="leading">#</frame-select-icon>
      <frame-select-value placeholder="Select a fruit"></frame-select-value>
      <frame-select-icon>v</frame-select-icon>
    </button>

    <ng-template #menu="frSelectContent" frSelectContent>
      <frame-select-panel>
        <frame-select-group>
          <button frSelectItem value="apple">
            <frame-select-item-indicator>+</frame-select-item-indicator>
            <span>Apple</span>
          </button>
          <button frSelectItem value="banana">
            <frame-select-item-indicator>+</frame-select-item-indicator>
            <span>Banana</span>
          </button>
        </frame-select-group>
        <frame-select-separator></frame-select-separator>
      </frame-select-panel>
    </ng-template>
  `,
})
class TestHostComponent {
  readonly value = signal<string | null>(null);
}

@Component({
  imports: [
    ReactiveFormsModule,
    FrSelect,
    FrSelectContent,
    FrSelectGroup,
    FrSelectIcon,
    FrSelectItem,
    FrSelectItemIndicator,
    FrSelectPanel,
    FrSelectValue,
  ],
  standalone: true,
  template: `
    <button [frSelect]="menu" [formControl]="control">
      <frame-select-value placeholder="Select a fruit"></frame-select-value>
      <frame-select-icon>v</frame-select-icon>
    </button>

    <ng-template #menu="frSelectContent" frSelectContent>
      <frame-select-panel>
        <frame-select-group>
          <button frSelectItem value="apple">
            <frame-select-item-indicator>+</frame-select-item-indicator>
            <span>Apple</span>
          </button>
          <button frSelectItem value="banana">
            <frame-select-item-indicator>+</frame-select-item-indicator>
            <span>Banana</span>
          </button>
        </frame-select-group>
      </frame-select-panel>
    </ng-template>
  `,
})
class ReactiveFormsHostComponent {
  readonly control = new FormControl<string | null>('apple');
}

@Component({
  imports: [FrCalendar, FrSelect, FrSelectContent, FrSelectPanel, FrSelectValue],
  standalone: true,
  template: `
    <button [frSelect]="menu">
      <frame-select-value placeholder="Pick a date"></frame-select-value>
    </button>

    <ng-template #menu="frSelectContent" frSelectContent position="popper">
      <div frSelectPanel>
        <frame-calendar [month]="month" />
      </div>
    </ng-template>
  `,
})
class CalendarSelectHostComponent {
  month = new Date(2026, 5, 1);
}

describe('FrSelect', () => {
  afterEach(() => {
    document.body.querySelector('.cdk-overlay-container')?.remove();
  });

  it('shows the placeholder before a value is selected', async () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    const value = fixture.debugElement.query(By.directive(FrSelectValue)).nativeElement as HTMLElement;

    expect(value.textContent?.trim()).toBe('Select a fruit');
    expect(value.getAttribute('data-placeholder')).toBe('');
  });

  it('supports leading and trailing trigger icons', async () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    const icons = Array.from(fixture.nativeElement.querySelectorAll('frame-select-icon')) as HTMLElement[];

    expect(icons[0].getAttribute('data-position')).toBe('leading');
    expect(icons[1].getAttribute('data-position')).toBe('trailing');
  });

  it('updates the displayed value when an item is selected', async () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();

    const trigger = fixture.debugElement.query(By.directive(FrSelect)).nativeElement as HTMLElement;
    trigger.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const item = Array.from(document.body.querySelectorAll('button[frselectitem]'))[1] as HTMLElement;
    item.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const value = fixture.debugElement.query(By.directive(FrSelectValue)).nativeElement as HTMLElement;

    expect(fixture.componentInstance.value()).toBe('banana');
    expect(value.textContent?.trim()).toBe('Banana');
  });

  it('works with Angular reactive forms', async () => {
    const fixture = TestBed.createComponent(ReactiveFormsHostComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    const trigger = fixture.debugElement.query(By.directive(FrSelect)).nativeElement as HTMLButtonElement;
    const value = fixture.debugElement.query(By.directive(FrSelectValue)).nativeElement as HTMLElement;

    expect(fixture.componentInstance.control.value).toBe('apple');
    expect(value.textContent?.trim()).toBe('Apple');
    expect(trigger.disabled).toBe(false);

    trigger.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const item = Array.from(document.body.querySelectorAll('button[frselectitem]'))[1] as HTMLElement;
    item.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(fixture.componentInstance.control.value).toBe('banana');

    fixture.componentInstance.control.disable();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(trigger.disabled).toBe(true);
  });

  it('provides a built-in error message helper', async () => {
    @Component({
      imports: [FrSelectError],
      standalone: true,
      template: `<p frSelectError>Please select a fruit.</p>`,
    })
    class ErrorHostComponent {}

    const fixture = TestBed.createComponent(ErrorHostComponent);
    fixture.detectChanges();

    const error = fixture.nativeElement.querySelector('p') as HTMLElement;

    expect(error.classList.contains('frame-select__error')).toBe(true);
    expect(error.getAttribute('aria-live')).toBe('polite');
  });

  it('supports rendering a calendar inside a select panel', async () => {
    const fixture = TestBed.createComponent(CalendarSelectHostComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    const trigger = fixture.debugElement.query(By.directive(FrSelect)).nativeElement as HTMLElement;
    trigger.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const panel = document.body.querySelector('.cdk-overlay-pane [frselectpanel]') as HTMLElement;

    expect(panel).not.toBeNull();
    expect(panel.querySelector('frame-calendar')).not.toBeNull();
    expect(panel.getAttribute('data-position')).toBe('popper');
  });

  it('preserves debugVisible on FrSelectContent when the root select does not force it', async () => {
    @Component({
      imports: [FrSelect, FrSelectContent, FrSelectPanel, FrSelectValue],
      standalone: true,
      template: `
        <button [frSelect]="menu">
          <frame-select-value placeholder="Select a fruit"></frame-select-value>
        </button>

        <ng-template #menu="frSelectContent" frSelectContent [debugVisible]="true">
          <frame-select-panel></frame-select-panel>
        </ng-template>
      `,
    })
    class DebugVisibleHostComponent {}

    const fixture = TestBed.createComponent(DebugVisibleHostComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(document.body.querySelector('.cdk-overlay-pane frame-select-panel')).not.toBeNull();
  });
});
