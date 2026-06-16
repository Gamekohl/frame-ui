import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FrModalService } from '@frame-ui-ng/components/modal';

import { FrConfirmModalService } from '../confirm-modal.service';
import { FrConfirmModalTrigger } from '../confirm-modal.trigger';

@Component({
  imports: [FrConfirmModalTrigger],
  standalone: true,
  template: `
    <button
      [frConfirmModal]="{
        title: 'Approve deployment?',
        description: 'Production will receive the selected build.'
      }"
      frConfirmModalConfirmLabel="Approve"
      (frConfirmModalConfirmed)="confirmed = true"
    >
      Approve
    </button>
  `,
})
class ConfirmTriggerHostComponent {
  confirmed = false;
}

describe('FrConfirmModal', () => {
  afterEach(() => {
    TestBed.inject(FrModalService).closeAll();
    document.body.querySelector('.cdk-overlay-container')?.remove();
  });

  it('opens a confirm modal with configurable title and description', async () => {
    const confirmModal = TestBed.inject(FrConfirmModalService);

    const modalRef = confirmModal.open({
      description: 'Shipping this release will notify all watchers.',
      title: 'Ship release?',
    });
    modalRef.componentRef?.changeDetectorRef.detectChanges();

    const panel = document.body.querySelector('.frame-modal__panel') as HTMLElement;

    expect(panel).not.toBeNull();
    expect(panel.textContent).toContain('Ship release?');
    expect(panel.textContent).toContain('Shipping this release will notify all watchers.');
  });

  it('uses configurable action labels and closes with the selected result', async () => {
    const confirmModal = TestBed.inject(FrConfirmModalService);
    const closedResults: unknown[] = [];

    const modalRef = confirmModal.open({
      cancelLabel: 'Keep draft',
      confirmLabel: 'Publish now',
      title: 'Publish release?',
    });
    modalRef.closed.subscribe((result) => closedResults.push(result));
    modalRef.componentRef?.changeDetectorRef.detectChanges();

    const actions = Array.from(document.body.querySelectorAll('button.frame-button')) as HTMLButtonElement[];

    expect(actions[0].textContent).toContain('Keep draft');
    expect(actions[1].textContent).toContain('Publish now');

    actions[1].click();
    await new Promise((resolve) => setTimeout(resolve));

    expect(closedResults).toEqual(['confirm']);
  });

  it('ignores backdrop clicks by default', async () => {
    const confirmModal = TestBed.inject(FrConfirmModalService);

    const modalRef = confirmModal.open({ title: 'Delete environment?' });
    modalRef.componentRef?.changeDetectorRef.detectChanges();

    const backdrop = document.body.querySelector('.frame-modal__backdrop') as HTMLElement;
    backdrop.click();
    await new Promise((resolve) => setTimeout(resolve));

    expect(document.body.querySelector('.frame-modal__panel')?.textContent).toContain('Delete environment?');
  });

  it('opens from the trigger directive and emits confirmed', async () => {
    const fixture = TestBed.createComponent(ConfirmTriggerHostComponent);
    fixture.detectChanges();

    const trigger = fixture.debugElement.query(By.directive(FrConfirmModalTrigger)).nativeElement as HTMLButtonElement;
    trigger.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(document.body.querySelector('.frame-modal__panel')?.textContent).toContain('Approve deployment?');

    const confirmButton = Array.from(document.body.querySelectorAll('button.frame-button'))
      .find((button) => button.textContent?.includes('Approve')) as HTMLButtonElement;
    confirmButton.click();
    await new Promise((resolve) => setTimeout(resolve));

    expect(fixture.componentInstance.confirmed).toBe(true);
  });
});
