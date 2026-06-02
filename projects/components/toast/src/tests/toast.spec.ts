import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { vi } from 'vitest';

import { FrToastService, FrToastViewport } from '../toast-public';

@Component({
  imports: [FrToastViewport],
  template: `<frame-toast-viewport strategy="inline" />`,
})
class ToastHostComponent {}

@Component({
  imports: [FrToastViewport],
  template: `
    <ng-template #closeIcon>
      <span class="custom-close">Close</span>
    </ng-template>
    <frame-toast-viewport strategy="inline" [closeIcon]="closeIcon" />
  `,
})
class ToastCustomIconHostComponent {}

describe('FrToast', () => {
  let service: FrToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ToastHostComponent, ToastCustomIconHostComponent],
    });

    service = TestBed.inject(FrToastService);
    service.dismissAll();
  });

  afterEach(() => {
    service.dismissAll();
    vi.useRealTimers();
  });

  it('renders stackable toasts from the service', () => {
    const fixture = TestBed.createComponent(ToastHostComponent);

    service.show('First notification', { duration: 0 });
    service.success('Second notification', { duration: 0 });
    fixture.detectChanges();

    const toasts = fixture.nativeElement.querySelectorAll('.frame-toast');
    expect(toasts.length).toBe(2);
    expect(toasts[0].textContent).toContain('Second notification');
    expect(toasts[1].textContent).toContain('First notification');
    expect(toasts[0].getAttribute('data-variant')).toBe('success');
  });

  it('supports descriptions, actions, and dismiss buttons', () => {
    vi.useFakeTimers();
    const fixture = TestBed.createComponent(ToastHostComponent);
    let actionCalls = 0;

    service.info('Draft saved', {
      description: 'The local version can be restored later.',
      duration: 0,
      action: {
        label: 'Undo',
        handler: () => actionCalls++,
      },
    });
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.frame-toast__description').textContent).toContain(
      'local version',
    );
    expect(fixture.nativeElement.querySelector('.frame-toast__close')).toBeNull();

    fixture.nativeElement.querySelector('.frame-toast__action').click();
    vi.advanceTimersByTime(180);
    fixture.detectChanges();

    expect(actionCalls).toBe(1);
    expect(fixture.nativeElement.querySelector('.frame-toast')).toBeNull();
  });

  it('renders a custom close icon template for dismissible toasts without actions', () => {
    const fixture = TestBed.createComponent(ToastCustomIconHostComponent);

    service.show('Dismiss me', { duration: 0 });
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.custom-close')?.textContent).toContain('Close');
  });

  it('keeps loading toasts open until they are updated or dismissed', () => {
    vi.useFakeTimers();
    const fixture = TestBed.createComponent(ToastHostComponent);
    const id = service.loading('Uploading asset');

    vi.advanceTimersByTime(10000);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.frame-toast__loader')).not.toBeNull();
    expect(service.toasts().length).toBe(1);

    service.update(id, {
      title: 'Upload complete',
      variant: 'success',
      loading: false,
      duration: 100,
    });
    vi.advanceTimersByTime(99);
    fixture.detectChanges();
    expect(service.toasts().length).toBe(1);

    vi.advanceTimersByTime(1);
    fixture.detectChanges();
    expect(service.toasts()[0].state).toBe('dismissing');

    vi.advanceTimersByTime(180);
    fixture.detectChanges();
    expect(service.toasts().length).toBe(0);
  });

  it('auto dismisses timed toasts', () => {
    vi.useFakeTimers();
    service.show('Short lived', { duration: 250 });

    vi.advanceTimersByTime(249);
    expect(service.toasts().length).toBe(1);

    vi.advanceTimersByTime(1);
    expect(service.toasts()[0].state).toBe('dismissing');

    vi.advanceTimersByTime(180);
    expect(service.toasts().length).toBe(0);
  });

  it('can dismiss individual toasts and all toasts', () => {
    vi.useFakeTimers();
    const first = service.show('One', { duration: 0 });
    service.show('Two', { duration: 0 });

    service.dismiss(first);
    vi.advanceTimersByTime(180);
    expect(service.toasts().map((toast) => toast.title)).toEqual(['Two']);

    service.dismissAll();
    expect(service.toasts()).toEqual([]);
  });
});
