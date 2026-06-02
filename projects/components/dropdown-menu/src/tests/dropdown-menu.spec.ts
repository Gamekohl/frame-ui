import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import {
  FrDropdownMenu,
  FrDropdownMenuCheckboxItem,
  FrDropdownMenuContent,
  FrDropdownMenuItemIndicator,
  FrDropdownMenuPanel,
  FrDropdownMenuSub,
  FrDropdownMenuSubTrigger,
  FrDropdownMenuTrigger,
} from '../dropdown-menu';

@Component({
  imports: [
    FrDropdownMenu,
    FrDropdownMenuCheckboxItem,
    FrDropdownMenuContent,
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

      <ng-template #menu="frDropdownMenuContent" frDropdownMenuContent>
        <div frDropdownMenuPanel>
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
