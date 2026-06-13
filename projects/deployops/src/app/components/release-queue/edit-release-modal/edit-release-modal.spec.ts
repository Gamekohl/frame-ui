import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FR_MODAL_DATA, FrModalRef } from '@frame-ui-ng/components/modal';
import { FrSelect } from '@frame-ui-ng/components/select';
import { FrTextarea } from '@frame-ui-ng/components/textarea';
import { describe, expect, it, vi } from 'vitest';

import { Release } from '../../../services/api.service';
import { EditReleaseModalComponent, type EditReleaseModalResult } from './edit-release-modal';

const release: Release = {
  environment: 'Production',
  id: 'rel-1001',
  progress: 92,
  release: 'Checkout Refactor',
  service: 'checkout-api',
  status: 'healthy',
  team: [],
  updatedAt: '4 min ago',
  version: '1.4.0',
};

describe('EditReleaseModalComponent', () => {
  it('renders release data with component library form primitives', async () => {
    const closeSpy = vi.fn();

    await TestBed.configureTestingModule({
      imports: [EditReleaseModalComponent],
      providers: [
        { provide: FR_MODAL_DATA, useValue: { release } },
        { provide: FrModalRef, useValue: { close: closeSpy } },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(EditReleaseModalComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('Edit release');
    expect(compiled.textContent).toContain('checkout-api');
    expect(compiled.textContent).toContain('Healthy');
    expect(compiled.textContent).not.toContain('Rollout progress');
    expect(fixture.debugElement.queryAll(By.directive(FrSelect))).toHaveLength(2);
    expect(fixture.debugElement.query(By.directive(FrTextarea))).not.toBeNull();
    expect(compiled.querySelector('.edit-release-select')).toBeNull();
    expect(compiled.querySelector('.edit-release-textarea')).toBeNull();
  });

  it('closes with typed modal results', async () => {
    const closeSpy = vi.fn<(result: EditReleaseModalResult) => void>();

    await TestBed.configureTestingModule({
      imports: [EditReleaseModalComponent],
      providers: [
        { provide: FR_MODAL_DATA, useValue: { release } },
        { provide: FrModalRef, useValue: { close: closeSpy } },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(EditReleaseModalComponent);
    fixture.detectChanges();

    const buttons = Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLButtonElement>('button[frButton]'),
    );

    buttons.find((button) => button.textContent?.includes('Cancel'))?.click();
    buttons.find((button) => button.textContent?.includes('Save changes'))?.click();

    expect(closeSpy).toHaveBeenCalledWith('cancel');
    expect(closeSpy).toHaveBeenCalledWith('saved');
  });

  it('requires every form field before saving', async () => {
    const closeSpy = vi.fn<(result: EditReleaseModalResult) => void>();

    await TestBed.configureTestingModule({
      imports: [EditReleaseModalComponent],
      providers: [
        { provide: FR_MODAL_DATA, useValue: { release } },
        { provide: FrModalRef, useValue: { close: closeSpy } },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(EditReleaseModalComponent);
    fixture.detectChanges();

    const component = fixture.componentInstance;
    const saveButton = Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLButtonElement>('button[frButton]'),
    ).find((button) => button.textContent?.includes('Save changes'))!;

    expect(saveButton.disabled).toBe(false);

    component.form.controls.release.setValue('');
    component.form.controls.version.setValue('');
    component.form.controls.environment.setValue('');
    component.form.controls.status.setValue(null as unknown as Release['status']);
    component.form.controls.note.setValue('');
    component.form.markAllAsTouched();
    fixture.detectChanges();

    expect(component.form.invalid).toBe(true);
    expect(saveButton.disabled).toBe(true);
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('Release name is required.');
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('Version is required.');
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('Environment is required.');
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('Status is required.');
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('Rollout note is required.');

    component.save();

    expect(closeSpy).not.toHaveBeenCalledWith('saved');
  });
});
