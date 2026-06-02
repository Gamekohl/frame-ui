import { Component, TemplateRef, inject, input, viewChild } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import {
  FR_MODAL_DATA,
  FrModalBody,
  FrModalClose,
  FrModalContent,
  FrModalDescription,
  FrModalFooter,
  FrModalHeader,
  FrModalPanel,
  FrModalService,
  FrModalTitle,
  FrModalTrigger,
} from '../modal';

@Component({
  imports: [
    FrModalBody,
    FrModalClose,
    FrModalContent,
    FrModalDescription,
    FrModalFooter,
    FrModalHeader,
    FrModalPanel,
    FrModalTitle,
    FrModalTrigger,
  ],
  standalone: true,
  template: `
    <button [frModalTrigger]="modal">Open</button>

    <ng-template #modal="frModalContent" frModalContent aria-label="Edit profile">
      <frame-modal-panel>
        <frame-modal-header>
          <h2 frModalTitle>Edit profile</h2>
          <p frModalDescription>Make changes to your profile here.</p>
        </frame-modal-header>
        <frame-modal-body>
          <p>Modal body</p>
        </frame-modal-body>
        <frame-modal-footer>
          <button frModalClose="saved">Save changes</button>
        </frame-modal-footer>
      </frame-modal-panel>
    </ng-template>
  `,
})
class TriggerHostComponent {}

@Component({
  imports: [FrModalContent, FrModalPanel, FrModalTrigger],
  standalone: true,
  template: `
    <button [frModalTrigger]="modal">Open</button>

    <ng-template #modal="frModalContent" frModalContent>
      <frame-modal-panel [showCloseButton]="false">No close icon</frame-modal-panel>
    </ng-template>
  `,
})
class NoCloseHostComponent {}

@Component({
  imports: [FrModalClose, FrModalContent, FrModalFooter, FrModalPanel, FrModalTrigger],
  standalone: true,
  template: `
    <button [frModalTrigger]="modal">Open</button>

    <ng-template #modal="frModalContent" frModalContent disableClose>
      <frame-modal-panel>
        <p>Guarded modal</p>
        <frame-modal-footer>
          <button frModalClose>Close</button>
        </frame-modal-footer>
      </frame-modal-panel>
    </ng-template>
  `,
})
class DisableCloseHostComponent {}

@Component({
  imports: [FrModalContent, FrModalPanel, FrModalTrigger],
  standalone: true,
  template: `
    <button [frModalTrigger]="modal" style="--frame-modal-bg: rgb(1 2 3);">Open</button>

    <ng-template #modal="frModalContent" frModalContent>
      <frame-modal-panel>Custom modal</frame-modal-panel>
    </ng-template>
  `,
})
class CustomPropertyHostComponent {}

@Component({
  imports: [FrModalPanel],
  standalone: true,
  template: `<frame-modal-panel>{{ data.message }}</frame-modal-panel>`,
})
class ProgrammaticContentComponent {
  readonly data = inject<{ message: string }>(FR_MODAL_DATA);
}

@Component({
  standalone: true,
  template: `<p class="programmatic-shell-body">{{ message() }} {{ data.suffix }}</p>`,
})
class ProgrammaticShellBodyComponent {
  readonly message = input('');
  readonly data = inject<{ suffix: string }>(FR_MODAL_DATA);
}

@Component({
  standalone: true,
  template: `<ng-template #content><frame-modal-panel>Template modal</frame-modal-panel></ng-template>`,
  imports: [FrModalPanel],
})
class ProgrammaticTemplateHostComponent {
  readonly content = viewChild.required<TemplateRef<unknown>>('content');
  readonly modal = inject(FrModalService);
}

describe('FrModal', () => {
  afterEach(() => {
    TestBed.inject(FrModalService).closeAll();
    document.body.querySelector('.cdk-overlay-container')?.remove();
  });

  it('opens template content from a trigger and closes from FrModalClose', async () => {
    const fixture = TestBed.createComponent(TriggerHostComponent);
    fixture.detectChanges();

    const trigger = fixture.debugElement.query(By.directive(FrModalTrigger)).nativeElement as HTMLButtonElement;
    trigger.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const panel = document.body.querySelector('frame-modal-panel') as HTMLElement;

    expect(panel).not.toBeNull();
    expect(panel.textContent).toContain('Edit profile');
    expect(document.body.querySelector('.frame-modal__backdrop')).not.toBeNull();
    expect(trigger.getAttribute('data-state')).toBe('open');

    const close = document.body.querySelector('button[frmodalclose]') as HTMLButtonElement;
    close.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(document.body.querySelector('frame-modal-panel')).toBeNull();
    expect(trigger.getAttribute('data-state')).toBe('closed');
  });

  it('can render without the default close button', async () => {
    const fixture = TestBed.createComponent(NoCloseHostComponent);
    fixture.detectChanges();

    const trigger = fixture.debugElement.query(By.directive(FrModalTrigger)).nativeElement as HTMLButtonElement;
    trigger.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(document.body.querySelector('.frame-modal__close')).toBeNull();
  });

  it('closes from backdrop clicks by default', async () => {
    const fixture = TestBed.createComponent(TriggerHostComponent);
    fixture.detectChanges();

    const trigger = fixture.debugElement.query(By.directive(FrModalTrigger)).nativeElement as HTMLButtonElement;
    trigger.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const backdrop = document.body.querySelector('.frame-modal__backdrop') as HTMLElement;
    backdrop.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(document.body.querySelector('frame-modal-panel')).toBeNull();
    expect(trigger.getAttribute('data-state')).toBe('closed');
  });

  it('keeps the modal open on backdrop clicks when disableClose is set', async () => {
    const fixture = TestBed.createComponent(DisableCloseHostComponent);
    fixture.detectChanges();

    const trigger = fixture.debugElement.query(By.directive(FrModalTrigger)).nativeElement as HTMLButtonElement;
    trigger.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const backdrop = document.body.querySelector('.frame-modal__backdrop') as HTMLElement;
    backdrop.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(document.body.querySelector('frame-modal-panel')?.textContent).toContain('Guarded modal');
    expect(trigger.getAttribute('data-state')).toBe('open');

    const close = document.body.querySelector('button[frmodalclose]') as HTMLButtonElement;
    close.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(document.body.querySelector('frame-modal-panel')).toBeNull();
    expect(trigger.getAttribute('data-state')).toBe('closed');
  });

  it('opens component content programmatically with data', async () => {
    const modal = TestBed.inject(FrModalService);

    const modalRef = modal.open(ProgrammaticContentComponent, {
      data: { message: 'Opened from code' },
    });
    modalRef.componentRef?.changeDetectorRef.detectChanges();

    const panel = document.body.querySelector('frame-modal-panel') as HTMLElement;

    expect(panel.textContent).toContain('Opened from code');
  });

  it('opens template content programmatically', async () => {
    const fixture = TestBed.createComponent(ProgrammaticTemplateHostComponent);
    fixture.detectChanges();

    fixture.componentInstance.modal.open(fixture.componentInstance.content());
    fixture.detectChanges();
    await fixture.whenStable();

    const panel = document.body.querySelector('frame-modal-panel') as HTMLElement;

    expect(panel.textContent).toContain('Template modal');
  });

  it('opens a configured modal shell programmatically around body content', async () => {
    const modal = TestBed.inject(FrModalService);

    const modalRef = modal.open(ProgrammaticShellBodyComponent, {
      bodyData: { suffix: 'from data' },
      bodyInputs: { message: 'Rendered' },
      description: 'Shell description',
      footerActions: [
        { appearance: 'outline', label: 'Cancel', result: 'cancel' },
        { label: 'Save changes', result: 'saved' },
      ],
      title: 'Shell title',
    });
    modalRef.componentRef?.changeDetectorRef.detectChanges();

    const panel = document.body.querySelector('.frame-modal__panel') as HTMLElement;
    const body = document.body.querySelector('.programmatic-shell-body') as HTMLElement;

    expect(panel.textContent).toContain('Shell title');
    expect(panel.textContent).toContain('Shell description');
    expect(body.textContent?.trim()).toBe('Rendered from data');

    const actions = Array.from(document.body.querySelectorAll('button.frame-button')) as HTMLButtonElement[];
    actions.at(-1)?.click();
    await new Promise((resolve) => setTimeout(resolve));

    expect(document.body.querySelector('.frame-modal__panel')).toBeNull();
  });

  it('syncs modal custom properties from the trigger into the overlay', async () => {
    const fixture = TestBed.createComponent(CustomPropertyHostComponent);
    fixture.detectChanges();

    const trigger = fixture.debugElement.query(By.directive(FrModalTrigger)).nativeElement as HTMLButtonElement;
    trigger.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const overlayPane = document.body.querySelector('.frame-modal__overlay-pane') as HTMLElement;
    const panel = document.body.querySelector('frame-modal-panel') as HTMLElement;

    expect(overlayPane.style.getPropertyValue('--frame-modal-bg').trim()).toBe('rgb(1 2 3)');
    expect(panel.style.getPropertyValue('--frame-modal-bg').trim()).toBe('rgb(1 2 3)');
  });
});
