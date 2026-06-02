import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import {
  FrContextMenu,
  FrContextMenuCheckboxItem,
  FrContextMenuContent,
  FrContextMenuItemIndicator,
  FrContextMenuPanel,
  FrContextMenuSub,
  FrContextMenuSubTrigger,
  FrContextMenuTrigger,
} from '../context-menu';

@Component({
  imports: [
    FrContextMenu,
    FrContextMenuCheckboxItem,
    FrContextMenuContent,
    FrContextMenuItemIndicator,
    FrContextMenuPanel,
    FrContextMenuSub,
    FrContextMenuSubTrigger,
    FrContextMenuTrigger,
  ],
  standalone: true,
  template: `
    <div frContextMenu [closeDelay]="0">
      <div [frContextMenuTrigger]="menu" [longPressDelay]="20">Right click here</div>

      <ng-template #menu="frContextMenuContent" frContextMenuContent>
        <div frContextMenuPanel>
          <button frContextMenuCheckboxItem [checked]="checked()" type="button">
            <span frContextMenuItemIndicator>+</span>
            <span>Show bookmarks</span>
          </button>

          <div frContextMenuSub>
            <button [frContextMenuSubTrigger]="subMenu" type="button">
              <span>Share</span>
            </button>

            <ng-template #subMenu="frContextMenuContent" frContextMenuSubContent>
              <div frContextMenuPanel>
                <button frContextMenuCheckboxItem type="button">
                  <span frContextMenuItemIndicator>+</span>
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
class ContextMenuHostComponent {
  readonly checked = signal(true);
}

describe('context menu primitives', () => {
  afterEach(() => {
    document.body.querySelector('.cdk-overlay-container')?.remove();
  });

  it('opens the menu from a contextmenu event', async () => {
    const fixture = TestBed.createComponent(ContextMenuHostComponent);
    fixture.detectChanges();

    const trigger = fixture.debugElement.query(By.directive(FrContextMenuTrigger))
      .nativeElement as HTMLElement;
    trigger.dispatchEvent(
      new MouseEvent('contextmenu', { bubbles: true, clientX: 100, clientY: 80 }),
    );
    fixture.detectChanges();
    await fixture.whenStable();

    const menu = document.body.querySelector('.frame-context-menu__content') as HTMLElement | null;

    expect(menu).not.toBeNull();
    expect(trigger.getAttribute('data-state')).toBe('open');
  });

  it('reflects checkbox checked state for styling hooks', async () => {
    const fixture = TestBed.createComponent(ContextMenuHostComponent);
    fixture.detectChanges();

    const trigger = fixture.debugElement.query(By.directive(FrContextMenuTrigger))
      .nativeElement as HTMLElement;
    trigger.dispatchEvent(
      new MouseEvent('contextmenu', { bubbles: true, clientX: 100, clientY: 80 }),
    );
    fixture.detectChanges();
    await fixture.whenStable();

    const checkboxItem = document.body.querySelector(
      '.frame-context-menu__checkbox-item',
    ) as HTMLButtonElement | null;

    expect(checkboxItem?.getAttribute('data-checked')).toBe('');
  });

  it('opens a submenu on hover', async () => {
    const fixture = TestBed.createComponent(ContextMenuHostComponent);
    fixture.detectChanges();

    const trigger = fixture.debugElement.query(By.directive(FrContextMenuTrigger))
      .nativeElement as HTMLElement;
    trigger.dispatchEvent(
      new MouseEvent('contextmenu', { bubbles: true, clientX: 100, clientY: 80 }),
    );
    fixture.detectChanges();
    await fixture.whenStable();

    const submenuTrigger = document.body.querySelector(
      '.frame-context-menu__sub-trigger',
    ) as HTMLButtonElement | null;
    submenuTrigger?.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    fixture.detectChanges();
    await fixture.whenStable();

    const menus = document.body.querySelectorAll('.frame-context-menu__content');

    expect(menus.length).toBeGreaterThan(1);
  });

  it('opens from long press for touch pointers', async () => {
    const fixture = TestBed.createComponent(ContextMenuHostComponent);
    fixture.detectChanges();

    const trigger = fixture.debugElement.query(By.directive(FrContextMenuTrigger))
      .nativeElement as HTMLElement;
    trigger.dispatchEvent(
      new PointerEvent('pointerdown', {
        bubbles: true,
        clientX: 100,
        clientY: 80,
        pointerType: 'touch',
      }),
    );

    await new Promise((resolve) => setTimeout(resolve, 30));
    fixture.detectChanges();
    await fixture.whenStable();

    const menu = document.body.querySelector('.frame-context-menu__content') as HTMLElement | null;

    expect(menu).not.toBeNull();
  });
});
