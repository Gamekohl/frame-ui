import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import {
  FrDropdownMenu,
  FrDropdownMenuCheckboxItem,
  FrDropdownMenuContent,
  FrDropdownMenuItem,
  FrDropdownMenuItemIndicator,
  FrDropdownMenuPanel,
  FrDropdownMenuSub,
  FrDropdownMenuSubTrigger,
  FrDropdownMenuTrigger,
} from '../dropdown-menu';
import { buildConnectedPositions } from '../dropdown-menu.position';
import { FrDropdownMenuSide } from '../dropdown-menu.types';

@Component({
  imports: [
    FrDropdownMenu,
    FrDropdownMenuCheckboxItem,
    FrDropdownMenuContent,
    FrDropdownMenuItem,
    FrDropdownMenuItemIndicator,
    FrDropdownMenuPanel,
    FrDropdownMenuSub,
    FrDropdownMenuSubTrigger,
    FrDropdownMenuTrigger,
  ],
  standalone: true,
  template: `
    <div frDropdownMenu [triggerMode]="triggerMode()" [closeDelay]="closeDelay()">
      <button [frDropdownMenuTrigger]="menu" type="button">Open</button>

      <ng-template #menu="frDropdownMenuContent" frDropdownMenuContent [side]="side()">
        <div frDropdownMenuPanel>
          <button frDropdownMenuItem type="button">Plain item</button>

          <button
            frDropdownMenuCheckboxItem
            [checked]="checked()"
            type="button"
          >
            <span frDropdownMenuItemIndicator>+</span>
            <span>Bookmarks</span>
          </button>

          <div frDropdownMenuSub>
            <button [frDropdownMenuSubTrigger]="subMenu" type="button">
              <span>Share</span>
            </button>

            <ng-template #subMenu="frDropdownMenuContent" frDropdownMenuSubContent>
              <div frDropdownMenuPanel>
                <button frDropdownMenuCheckboxItem type="button">
                  <span frDropdownMenuItemIndicator>+</span>
                  <span>Copy link</span>
                </button>
              </div>
            </ng-template>
          </div>
        </div>
      </ng-template>
    </div>
  `,
})
class TestHostComponent {
  readonly checked = signal(true);
  readonly closeDelay = signal(0);
  readonly side = signal<FrDropdownMenuSide>('bottom');
  readonly triggerMode = signal<'both' | 'click' | 'hover'>('click');
}

describe('dropdown menu primitives', () => {
  afterEach(() => {
    document.body.querySelector('.cdk-overlay-container')?.remove();
  });

  it('opens the menu on click by default', async () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();

    const trigger = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    trigger.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const menu = document.body.querySelector('.frame-dropdown-menu__content') as HTMLElement | null;

    expect(menu).not.toBeNull();
    expect(trigger.getAttribute('data-state')).toBe('open');
  });

  it('opens the menu on hover when hover mode is enabled', async () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.componentInstance.triggerMode.set('hover');
    fixture.detectChanges();

    const trigger = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    trigger.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    fixture.detectChanges();
    await fixture.whenStable();

    const menu = document.body.querySelector('.frame-dropdown-menu__content') as HTMLElement | null;

    expect(menu).not.toBeNull();
    expect(trigger.getAttribute('data-state')).toBe('open');
  });

  it('reflects checkbox checked state for styling hooks', async () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();

    const trigger = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    trigger.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const checkboxItem = document.body.querySelector(
      '.frame-dropdown-menu__checkbox-item',
    ) as HTMLButtonElement | null;

    expect(checkboxItem?.getAttribute('data-checked')).toBe('');
  });

  it('reflects configured side on the opened panel', async () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.componentInstance.side.set('left');
    fixture.detectChanges();

    const trigger = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    trigger.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const menu = document.body.querySelector('.frame-dropdown-menu__content') as HTMLElement | null;

    expect(menu?.getAttribute('data-side')).toBe('left');
  });

  it('builds horizontal positions for left and right sides', () => {
    const positions = buildConnectedPositions({
      align: 'start',
      alignOffset: 0,
      isSubmenu: false,
      side: 'right',
      sideOffset: 4,
    });

    expect(positions[0]).toEqual(
      expect.objectContaining({
        originX: 'end',
        overlayX: 'start',
        offsetX: 4,
      }),
    );
    expect(positions[1]).toEqual(
      expect.objectContaining({
        originX: 'start',
        overlayX: 'end',
        offsetX: -4,
      }),
    );
  });

  it('builds auto positions across all sides', () => {
    const positions = buildConnectedPositions({
      align: 'start',
      alignOffset: 0,
      isSubmenu: false,
      side: 'auto',
      sideOffset: 4,
    });

    expect(positions).toHaveLength(8);
    expect(positions[0]).toEqual(expect.objectContaining({ originY: 'bottom', overlayY: 'top' }));
    expect(positions[4]).toEqual(expect.objectContaining({ originX: 'end', overlayX: 'start' }));
  });

  it('builds submenu auto positions only to the right and left', () => {
    const positions = buildConnectedPositions({
      align: 'start',
      alignOffset: 0,
      isSubmenu: true,
      side: 'auto',
      sideOffset: 4,
    });

    expect(positions).toHaveLength(4);
    expect(positions[0]).toEqual(
      expect.objectContaining({ originX: 'end', overlayX: 'start', offsetX: 16 }),
    );
    expect(positions[2]).toEqual(
      expect.objectContaining({ originX: 'start', overlayX: 'end', offsetX: -16 }),
    );
    expect(positions.some((position) => position.originY === 'bottom')).toBe(false);
  });

  it('normalizes vertical submenu sides to horizontal auto positions', () => {
    const positions = buildConnectedPositions({
      align: 'start',
      alignOffset: 0,
      isSubmenu: true,
      side: 'bottom',
      sideOffset: 4,
    });

    expect(positions).toHaveLength(4);
    expect(positions[0]).toEqual(
      expect.objectContaining({ originX: 'end', overlayX: 'start', offsetX: 16 }),
    );
    expect(positions[2]).toEqual(
      expect.objectContaining({ originX: 'start', overlayX: 'end', offsetX: -16 }),
    );
  });

  it('keeps larger configured submenu side offsets', () => {
    const positions = buildConnectedPositions({
      align: 'start',
      alignOffset: 0,
      isSubmenu: true,
      side: 'right',
      sideOffset: 20,
    });

    expect(positions[0]).toEqual(
      expect.objectContaining({ originX: 'end', overlayX: 'start', offsetX: 20 }),
    );
  });

  it('opens a submenu on hover when both trigger modes are enabled', async () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.componentInstance.triggerMode.set('both');
    fixture.detectChanges();

    const rootTrigger = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    rootTrigger.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const submenuTrigger = Array.from(
      document.body.querySelectorAll('.frame-dropdown-menu__sub-trigger'),
    )[0] as HTMLButtonElement | undefined;

    submenuTrigger?.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    fixture.detectChanges();
    await fixture.whenStable();

    const menus = document.body.querySelectorAll('.frame-dropdown-menu__content');

    expect(menus.length).toBeGreaterThan(1);
  });
});
