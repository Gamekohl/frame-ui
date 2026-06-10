import { Component, TemplateRef, inject, signal, viewChild } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import {
  FrCommand,
  FrCommandDialog,
  FrCommandDialogTrigger,
  FrCommandEmpty,
  FrCommandFooter,
  FrCommandGroup,
  FrCommandGroupHeading,
  FrCommandInput,
  FrCommandItem,
  FrCommandList,
  FrCommandService,
  FrCommandShortcut,
  FrCommandSeparator,
} from '../command';

@Component({
  imports: [
    FrCommand,
    FrCommandInput,
    FrCommandList,
    FrCommandEmpty,
    FrCommandFooter,
    FrCommandGroup,
    FrCommandGroupHeading,
    FrCommandItem,
    FrCommandShortcut,
    FrCommandSeparator,
  ],
  standalone: true,
  template: `
    <section frCommand [closeOnSelect]="closeOnSelect()" (itemSelected)="selected.set($event)">
      <input frCommandInput placeholder="Search commands" />
      <div frCommandList>
        <p frCommandEmpty>No results found.</p>
        <div frCommandGroup heading="Suggestions">
          <p frCommandGroupHeading>Suggestions</p>
          <button frCommandItem value="calendar" label="Calendar">Calendar</button>
          <button frCommandItem value="emoji" label="Search Emoji">Search Emoji</button>
          <button frCommandItem value="calculator" label="Calculator" keywords="math,numbers">
            Calculator
          </button>
        </div>
        <div frCommandSeparator></div>
        <div frCommandGroup heading="Settings">
          <p frCommandGroupHeading>Settings</p>
          <button frCommandItem value="profile" label="Profile">
            Profile
            <span frCommandShortcut>⌘P</span>
          </button>
          <button frCommandItem value="billing" label="Billing" [disabled]="billingDisabled()">
            Billing
          </button>
        </div>
      </div>
      <div frCommandFooter>
        <span><kbd>↑↓</kbd> to navigate</span>
        <span><kbd>↵</kbd> to select</span>
      </div>
    </section>
  `,
})
class CommandHostComponent {
  readonly billingDisabled = signal(false);
  readonly closeOnSelect = signal(false);
  readonly selected = signal<unknown>(null);
}

@Component({
  imports: [
    FrCommand,
    FrCommandDialog,
    FrCommandDialogTrigger,
    FrCommandInput,
    FrCommandItem,
    FrCommandList,
  ],
  standalone: true,
  template: `
    <button [frCommandDialogTrigger]="dialog">Open</button>

    <ng-template #dialog="frCommandDialog" frCommandDialog aria-label="Command palette">
      <section frCommand closeOnSelect>
        <input frCommandInput />
        <div frCommandList>
          <button frCommandItem value="calendar" label="Calendar">Calendar</button>
        </div>
      </section>
    </ng-template>
  `,
})
class CommandDialogHostComponent {}

@Component({
  imports: [FrCommand, FrCommandInput, FrCommandItem, FrCommandList],
  standalone: true,
  template: `
    <section frCommand>
      <input frCommandInput />
      <div frCommandList>
        <button frCommandItem value="programmatic" label="Programmatic">
          Programmatic
        </button>
      </div>
    </section>
  `,
})
class ProgrammaticCommandComponent {}

@Component({
  imports: [FrCommand, FrCommandInput, FrCommandItem, FrCommandList],
  standalone: true,
  template: `
    <ng-template #content>
      <section frCommand>
        <input frCommandInput />
        <div frCommandList>
          <button frCommandItem value="template" label="Template">Template</button>
        </div>
      </section>
    </ng-template>
  `,
})
class ProgrammaticTemplateHostComponent {
  readonly content = viewChild.required<TemplateRef<unknown>>('content');
  readonly command = inject(FrCommandService);
}

describe('FrCommand', () => {
  afterEach(() => {
    TestBed.inject(FrCommandService).closeAll();
    document.body.querySelector('.cdk-overlay-container')?.remove();
  });

  it('filters items from the input query and shows the empty state', async () => {
    const fixture = TestBed.createComponent(CommandHostComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    const input = fixture.debugElement.query(By.directive(FrCommandInput)).nativeElement as HTMLInputElement;
    input.value = 'calc';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const items = fixture.nativeElement.querySelectorAll('[frCommandItem]') as NodeListOf<HTMLElement>;
    expect(items[0].getAttribute('data-hidden')).toBe('');
    expect(items[2].hasAttribute('data-hidden')).toBe(false);
    expect(fixture.nativeElement.querySelector('[frCommandEmpty]').hasAttribute('hidden')).toBe(true);

    input.value = 'nothing';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('[frCommandEmpty]').hasAttribute('hidden')).toBe(false);
  });

  it('selects the highlighted item with the keyboard', async () => {
    const fixture = TestBed.createComponent(CommandHostComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    const root = fixture.debugElement.query(By.directive(FrCommand)).nativeElement as HTMLElement;
    root.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    root.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    fixture.detectChanges();

    expect(fixture.componentInstance.selected()).toBe('emoji');
  });

  it('scrolls the highlighted item into view during keyboard navigation', async () => {
    const originalScrollIntoView = HTMLElement.prototype.scrollIntoView;
    const scrollCalls: ScrollIntoViewOptions[] = [];

    HTMLElement.prototype.scrollIntoView = function scrollIntoView(options?: boolean | ScrollIntoViewOptions) {
      if (typeof options === 'object') {
        scrollCalls.push(options);
      }
    };

    try {
      const fixture = TestBed.createComponent(CommandHostComponent);
      fixture.detectChanges();
      await fixture.whenStable();

      const root = fixture.debugElement.query(By.directive(FrCommand)).nativeElement as HTMLElement;
      root.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
      fixture.detectChanges();

      expect(scrollCalls.some((call) => call.block === 'nearest' && call.inline === 'nearest')).toBe(true);
    } finally {
      HTMLElement.prototype.scrollIntoView = originalScrollIntoView;
    }
  });

  it('does not select disabled items', async () => {
    const fixture = TestBed.createComponent(CommandHostComponent);

    fixture.componentInstance.billingDisabled.set(true);
    fixture.detectChanges();
    await fixture.whenStable();

    const billing = fixture.nativeElement.querySelector('button[value="billing"]') as HTMLButtonElement;
    const items = fixture.nativeElement.querySelectorAll('[frCommandItem]') as NodeListOf<HTMLButtonElement>;

    expect(billing.hasAttribute('disabled')).toBe(true);
    items[4].click();
    fixture.detectChanges();

    expect(fixture.componentInstance.selected()).toBeNull();
  });

  it('opens template content from a trigger', async () => {
    const fixture = TestBed.createComponent(CommandDialogHostComponent);
    fixture.detectChanges();

    const trigger = fixture.debugElement.query(By.directive(FrCommandDialogTrigger))
      .nativeElement as HTMLButtonElement;
    trigger.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(document.body.querySelector('[frCommand]')?.textContent).toContain('Calendar');
    expect(document.body.querySelector('.frame-command-dialog__backdrop')).not.toBeNull();
    expect(trigger.getAttribute('data-state')).toBe('open');
  });

  it('opens component content programmatically', async () => {
    const command = TestBed.inject(FrCommandService);

    const ref = command.open(ProgrammaticCommandComponent);
    ref.componentRef?.changeDetectorRef.detectChanges();

    expect(document.body.querySelector('[frCommand]')?.textContent).toContain('Programmatic');
  });

  it('lets programmatic component content fill the command dialog pane', async () => {
    const command = TestBed.inject(FrCommandService);

    const ref = command.open(ProgrammaticCommandComponent);
    ref.componentRef?.changeDetectorRef.detectChanges();

    const overlayPane = document.body.querySelector('.frame-command-dialog__overlay-pane') as HTMLElement;
    const host = document.body.querySelector('ng-component') as HTMLElement;

    expect(overlayPane).not.toBeNull();
    expect(getComputedStyle(host).display).toBe('block');
    expect(host.style.getPropertyValue('inline-size')).toBe('100%');
  });

  it('opens template content programmatically', async () => {
    const fixture = TestBed.createComponent(ProgrammaticTemplateHostComponent);
    fixture.detectChanges();

    fixture.componentInstance.command.open(fixture.componentInstance.content());
    fixture.detectChanges();
    await fixture.whenStable();

    expect(document.body.querySelector('[frCommand]')?.textContent).toContain('Template');
  });
});
