import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import {
  FrMenuBar,
  FrMenuBarCheckboxItem,
  FrMenuBarContent,
  FrMenuBarItem,
  FrMenuBarItemIndicator,
  FrMenuBarMenu,
  FrMenuBarPanel,
  FrMenuBarSeparator,
  FrMenuBarShortcut,
  FrMenuBarSub,
  FrMenuBarSubTrigger,
  FrMenuBarTrigger,
} from '../menubar';

@Component({
  imports: [
    FrMenuBar,
    FrMenuBarCheckboxItem,
    FrMenuBarContent,
    FrMenuBarItem,
    FrMenuBarItemIndicator,
    FrMenuBarMenu,
    FrMenuBarPanel,
    FrMenuBarSeparator,
    FrMenuBarShortcut,
    FrMenuBarSub,
    FrMenuBarSubTrigger,
    FrMenuBarTrigger,
  ],
  template: `
    <div frMenuBar [triggerMode]="triggerMode()">
      <div frMenuBarMenu>
        <button [frMenuBarTrigger]="fileMenu" type="button">File</button>

        <ng-template #fileMenu="frMenuBarContent" frMenuBarContent>
          <div frMenuBarPanel>
            <button frMenuBarItem type="button">
              New Tab
              <span frMenuBarShortcut>⌘T</span>
            </button>
            <div frMenuBarSeparator></div>
            <button frMenuBarCheckboxItem [checked]="checked()" type="button">
              <span frMenuBarItemIndicator>✓</span>
              Show sidebar
            </button>

            <div frMenuBarSub>
              <button [frMenuBarSubTrigger]="shareMenu" type="button">Share</button>
              <ng-template #shareMenu="frMenuBarContent" frMenuBarSubContent>
                <div frMenuBarPanel>
                  <button frMenuBarItem type="button">Copy link</button>
                </div>
              </ng-template>
            </div>
          </div>
        </ng-template>
      </div>
    </div>
  `,
})
class TestHostComponent {
  readonly checked = signal(true);
  readonly triggerMode = signal<'both' | 'click' | 'hover'>('click');
}

describe('FrMenuBar', () => {
  afterEach(() => {
    document.body.querySelector('.cdk-overlay-container')?.remove();
  });

  it('opens menubar content through the dropdown foundation', async () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();

    const trigger = fixture.nativeElement.querySelector('.frame-menubar__trigger') as HTMLButtonElement;
    trigger.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const panel = document.body.querySelector('.frame-dropdown-menu__content') as HTMLElement | null;

    expect(panel).not.toBeNull();
    expect(trigger.classList.contains('frame-menubar__trigger')).toBe(true);
    expect(trigger.getAttribute('data-state')).toBe('open');
  });

  it('reflects checkbox state through menubar item aliases', async () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();

    const trigger = fixture.nativeElement.querySelector('.frame-menubar__trigger') as HTMLButtonElement;
    trigger.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const checkbox = document.body.querySelector('.frame-menubar__checkbox-item') as HTMLElement | null;

    expect(checkbox?.getAttribute('data-checked')).toBe('');
  });
});
