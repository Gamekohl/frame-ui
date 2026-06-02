import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { FrResizableHandle, FrResizablePanel, FrResizablePanelGroup } from '../resizable';

@Component({
  imports: [FrResizableHandle, FrResizablePanel, FrResizablePanelGroup],
  template: `
    <div
      frResizablePanelGroup
      [orientation]="orientation()"
      (layoutChange)="layout.set($event)"
      style="width: 400px; height: 300px;"
    >
      <div frResizablePanel [defaultSize]="30" [minSize]="20">Sidebar</div>
      <div frResizableHandle withHandle></div>
      <div frResizablePanel [defaultSize]="70" [minSize]="30">Content</div>
    </div>
  `,
})
class ResizableHost {
  readonly orientation = signal<'horizontal' | 'vertical'>('horizontal');
  readonly layout = signal<number[]>([]);
}

@Component({
  imports: [FrResizableHandle, FrResizablePanel, FrResizablePanelGroup],
  template: `
    <div frResizablePanelGroup style="width: 400px; height: 300px;">
      <div frResizablePanel [defaultSize]="30">Optional sidebar</div>
      <div frResizableHandle withHandle></div>
      <div frResizablePanel [defaultSize]="70">Content</div>
    </div>
  `,
})
class CollapsibleByDefaultHost {}

describe('FrResizable', () => {
  it('initializes panel layout and handle metadata', async () => {
    const fixture = TestBed.createComponent(ResizableHost);
    fixture.detectChanges();
    await fixture.whenStable();

    const group = fixture.nativeElement.querySelector('[frResizablePanelGroup]') as HTMLElement;
    const panels = fixture.nativeElement.querySelectorAll('[frResizablePanel]') as NodeListOf<HTMLElement>;
    const handle = fixture.nativeElement.querySelector('[frResizableHandle]') as HTMLElement;

    expect(group.classList.contains('frame-resizable')).toBe(true);
    expect(group.getAttribute('data-orientation')).toBe('horizontal');
    expect(panels[0].style.flexBasis).toBe('30%');
    expect(panels[1].style.flexBasis).toBe('70%');
    expect(handle.classList.contains('frame-resizable__handle')).toBe(true);
    expect(handle.getAttribute('role')).toBe('separator');
    expect(handle.getAttribute('aria-orientation')).toBe('horizontal');
    expect(handle.getAttribute('data-handle')).toBe('');
    expect(fixture.componentInstance.layout()).toEqual([30, 70]);
  });

  it('supports keyboard resizing and respects min size', async () => {
    const fixture = TestBed.createComponent(ResizableHost);
    fixture.detectChanges();
    await fixture.whenStable();

    const panels = fixture.nativeElement.querySelectorAll('[frResizablePanel]') as NodeListOf<HTMLElement>;
    const handle = fixture.nativeElement.querySelector('[frResizableHandle]') as HTMLElement;

    handle.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    fixture.detectChanges();

    expect(panels[0].style.flexBasis).toBe('40%');
    expect(panels[1].style.flexBasis).toBe('60%');

    handle.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }));
    fixture.detectChanges();

    expect(panels[0].style.flexBasis).toBe('20%');
    expect(panels[1].style.flexBasis).toBe('80%');
  });

  it('reflects vertical orientation', async () => {
    const fixture = TestBed.createComponent(ResizableHost);

    fixture.componentInstance.orientation.set('vertical');
    fixture.detectChanges();
    await fixture.whenStable();

    const group = fixture.nativeElement.querySelector('[frResizablePanelGroup]') as HTMLElement;
    const handle = fixture.nativeElement.querySelector('[frResizableHandle]') as HTMLElement;

    expect(group.getAttribute('data-orientation')).toBe('vertical');
    expect(handle.getAttribute('aria-orientation')).toBe('vertical');
  });

  it('can fully collapse a panel without minSize and expand it again from the handle', async () => {
    const fixture = TestBed.createComponent(CollapsibleByDefaultHost);
    fixture.detectChanges();
    await fixture.whenStable();

    const panels = fixture.nativeElement.querySelectorAll('[frResizablePanel]') as NodeListOf<HTMLElement>;
    const handle = fixture.nativeElement.querySelector('[frResizableHandle]') as HTMLElement;

    handle.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }));
    fixture.detectChanges();

    expect(panels[0].style.flexBasis).toBe('0%');
    expect(panels[0].getAttribute('data-collapsed')).toBe('');
    expect(panels[1].style.flexBasis).toBe('100%');
    expect(handle.getAttribute('aria-valuenow')).toBe('0');

    handle.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    fixture.detectChanges();

    expect(panels[0].style.flexBasis).toBe('10%');
    expect(panels[0].hasAttribute('data-collapsed')).toBe(false);
    expect(panels[1].style.flexBasis).toBe('90%');
    expect(handle.getAttribute('aria-valuenow')).toBe('10');
  });
});
