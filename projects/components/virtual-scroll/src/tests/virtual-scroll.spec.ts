import { Component, viewChild } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { FrVirtualContent } from '../virtual-scroll.content';
import { FrVirtualFor } from '../virtual-scroll.for';
import { FrVirtualItem, FrVirtualItemMeta, FrVirtualList } from '../virtual-scroll.primitives';
import { FrVirtualViewport } from '../virtual-scroll.viewport';

@Component({
  imports: [
    FrVirtualViewport,
    FrVirtualContent,
    FrVirtualFor,
    FrVirtualList,
    FrVirtualItem,
    FrVirtualItemMeta,
  ],
  standalone: true,
  template: `
    <div frVirtualList>
      <div frVirtualViewport [height]="'96px'" [itemSize]="32" [overscan]="1" #viewport="frVirtualViewport">
        <div frVirtualContent>
          <button frVirtualItem class="row" *frVirtualFor="let item of items; let index = index">
            <span>{{ index }}:{{ item }}</span>
            <span frVirtualItemMeta>meta</span>
          </button>
        </div>
      </div>
    </div>
  `,
})
class TestHostComponent {
  readonly viewport = viewChild.required(FrVirtualViewport);

  protected readonly items = Array.from({ length: 100 }, (_, index) => `Item ${index}`);
}

describe('FrVirtualViewport', () => {
  it('renders only the visible slice with overscan', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    const viewportElement = fixture.nativeElement.querySelector('[frvirtualviewport]') as HTMLElement;

    Object.defineProperty(viewportElement, 'clientHeight', {
      configurable: true,
      value: 96,
    });

    fixture.detectChanges();
    fixture.componentInstance.viewport().measure();
    fixture.detectChanges();

    const rows = Array.from(fixture.nativeElement.querySelectorAll('.row')) as HTMLElement[];
    const content = fixture.nativeElement.querySelector('[frvirtualcontent]') as HTMLElement;

    expect(rows.length).toBe(5);
    expect(rows[0]?.textContent?.trim()).toBe('0:Item 0meta');
    expect(rows[4]?.textContent?.trim()).toBe('4:Item 4meta');
    expect(content.style.paddingTop).toBe('0px');
    expect(content.style.paddingBottom).toBe(`${95 * 32}px`);
    expect(viewportElement.style.blockSize).toBe('96px');
    expect(rows[0]?.classList.contains('frame-virtual-scroll__item')).toBe(true);
  });

  it('scrolls to an index and updates the rendered window', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    const viewportElement = fixture.nativeElement.querySelector('[frvirtualviewport]') as HTMLElement;

    Object.defineProperty(viewportElement, 'clientHeight', {
      configurable: true,
      value: 96,
    });

    let currentScrollTop = 0;

    Object.defineProperty(viewportElement, 'scrollTop', {
      configurable: true,
      get: () => currentScrollTop,
      set: (value: number) => {
        currentScrollTop = value;
      },
    });

    fixture.detectChanges();
    fixture.componentInstance.viewport().measure();
    fixture.componentInstance.viewport().scrollToIndex(20, 'start');
    fixture.detectChanges();

    const rows = Array.from(fixture.nativeElement.querySelectorAll('.row')) as HTMLElement[];
    const content = fixture.nativeElement.querySelector('[frvirtualcontent]') as HTMLElement;

    expect(currentScrollTop).toBe(20 * 32);
    expect(rows[0]?.textContent?.trim()).toBe('19:Item 19meta');
    expect(rows[4]?.textContent?.trim()).toBe('23:Item 23meta');
    expect(content.style.paddingTop).toBe(`${19 * 32}px`);
  });
});
