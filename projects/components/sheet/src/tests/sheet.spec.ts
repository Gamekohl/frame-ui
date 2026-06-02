import { Component, TemplateRef, inject, input, viewChild } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import {
  FR_SHEET_DATA,
  FrSheetBody,
  FrSheetClose,
  FrSheetContent,
  FrSheetDescription,
  FrSheetFooter,
  FrSheetHeader,
  FrSheetPanel,
  FrSheetService,
  FrSheetTitle,
  FrSheetTrigger,
} from '../sheet';

@Component({
  imports: [
    FrSheetBody,
    FrSheetClose,
    FrSheetContent,
    FrSheetDescription,
    FrSheetFooter,
    FrSheetHeader,
    FrSheetPanel,
    FrSheetTitle,
    FrSheetTrigger,
  ],
  template: `
    <button [frSheetTrigger]="sheet">Open</button>

    <ng-template #sheet="frSheetContent" frSheetContent aria-label="Edit workspace">
      <div frSheetPanel side="left">
        <div frSheetHeader>
          <h2 frSheetTitle>Edit workspace</h2>
          <p frSheetDescription>Update local workspace settings.</p>
        </div>
        <div frSheetBody>
          <p>Sheet body</p>
        </div>
        <div frSheetFooter>
          <button frSheetClose="saved">Save changes</button>
        </div>
      </div>
    </ng-template>
  `,
})
class TriggerHostComponent {}

@Component({
  imports: [FrSheetContent, FrSheetPanel, FrSheetTrigger],
  template: `
    <button [frSheetTrigger]="sheet">Open</button>

    <ng-template #sheet="frSheetContent" frSheetContent>
      <div frSheetPanel [showCloseButton]="false">No close icon</div>
    </ng-template>
  `,
})
class NoCloseHostComponent {}

@Component({
  imports: [FrSheetPanel],
  template: `<div frSheetPanel>{{ data.message }}</div>`,
})
class ProgrammaticContentComponent {
  readonly data = inject<{ message: string }>(FR_SHEET_DATA);
}

@Component({
  template: `<p class="programmatic-sheet-body">{{ message() }} {{ data.suffix }}</p>`,
})
class ProgrammaticShellBodyComponent {
  readonly message = input('');
  readonly data = inject<{ suffix: string }>(FR_SHEET_DATA);
}

@Component({
  template: `<ng-template #content><div frSheetPanel>Template sheet</div></ng-template>`,
  imports: [FrSheetPanel],
})
class ProgrammaticTemplateHostComponent {
  readonly content = viewChild.required<TemplateRef<unknown>>('content');
  readonly sheet = inject(FrSheetService);
}

describe('FrSheet', () => {
  afterEach(() => {
    TestBed.inject(FrSheetService).closeAll();
    document.body.querySelector('.cdk-overlay-container')?.remove();
  });

  it('opens template content from a trigger and closes from FrSheetClose', async () => {
    const fixture = TestBed.createComponent(TriggerHostComponent);
    fixture.detectChanges();

    const trigger = fixture.debugElement.query(By.directive(FrSheetTrigger)).nativeElement as HTMLButtonElement;
    trigger.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const panel = document.body.querySelector('[frSheetPanel]') as HTMLElement;

    expect(panel).not.toBeNull();
    expect(panel.textContent).toContain('Edit workspace');
    expect(panel.getAttribute('data-side')).toBe('left');
    expect(document.body.querySelector('.frame-sheet__backdrop')).not.toBeNull();
    expect(trigger.getAttribute('data-state')).toBe('open');

    const close = document.body.querySelector('button[frsheetclose]') as HTMLButtonElement;
    close.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(document.body.querySelector('[frSheetPanel]')).toBeNull();
    expect(trigger.getAttribute('data-state')).toBe('closed');
  });

  it('can render without the default close button', async () => {
    const fixture = TestBed.createComponent(NoCloseHostComponent);
    fixture.detectChanges();

    const trigger = fixture.debugElement.query(By.directive(FrSheetTrigger)).nativeElement as HTMLButtonElement;
    trigger.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(document.body.querySelector('.frame-sheet__close')).toBeNull();
  });

  it('opens component content programmatically with data', async () => {
    const sheet = TestBed.inject(FrSheetService);

    const sheetRef = sheet.open(ProgrammaticContentComponent, {
      data: { message: 'Opened from code' },
    });
    sheetRef.componentRef?.changeDetectorRef.detectChanges();

    const panel = document.body.querySelector('[frSheetPanel]') as HTMLElement;

    expect(panel.textContent).toContain('Opened from code');
  });

  it('opens template content programmatically', async () => {
    const fixture = TestBed.createComponent(ProgrammaticTemplateHostComponent);
    fixture.detectChanges();

    fixture.componentInstance.sheet.open(fixture.componentInstance.content());
    fixture.detectChanges();
    await fixture.whenStable();

    const panel = document.body.querySelector('[frSheetPanel]') as HTMLElement;

    expect(panel.textContent).toContain('Template sheet');
  });

  it('opens a configured sheet shell programmatically around body content', async () => {
    const sheet = TestBed.inject(FrSheetService);

    const sheetRef = sheet.open(ProgrammaticShellBodyComponent, {
      bodyData: { suffix: 'from data' },
      bodyInputs: { message: 'Rendered' },
      description: 'Shell description',
      footerActions: [
        { appearance: 'outline', label: 'Cancel', result: 'cancel' },
        { label: 'Save', result: 'saved' },
      ],
      side: 'bottom',
      title: 'Shell title',
    });
    sheetRef.componentRef?.changeDetectorRef.detectChanges();

    const panel = document.body.querySelector('.frame-sheet__panel') as HTMLElement;
    const body = document.body.querySelector('.programmatic-sheet-body') as HTMLElement;

    expect(panel.getAttribute('data-side')).toBe('bottom');
    expect(panel.textContent).toContain('Shell title');
    expect(panel.textContent).toContain('Shell description');
    expect(body.textContent?.trim()).toBe('Rendered from data');

    const actions = Array.from(document.body.querySelectorAll('button.frame-button')) as HTMLButtonElement[];
    actions.at(-1)?.click();
    await new Promise((resolve) => setTimeout(resolve));

    expect(document.body.querySelector('.frame-sheet__panel')).toBeNull();
  });
});
