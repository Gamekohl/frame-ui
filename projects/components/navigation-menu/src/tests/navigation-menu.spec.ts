import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import {
  FrNavigationLinkSeparator,
  FrNavigationMenu,
  FrNavigationMenuContent,
  FrNavigationMenuFeature,
  FrNavigationMenuGrid,
  FrNavigationMenuIndicator,
  FrNavigationMenuItem,
  FrNavigationMenuLink,
  FrNavigationMenuLinkDescription,
  FrNavigationMenuLinkTitle,
  FrNavigationMenuList,
  FrNavigationMenuPanel,
  FrNavigationMenuTrigger,
  FrNavigationMenuViewport,
} from '../navigation-menu';

@Component({
  imports: [
    FrNavigationMenu,
    FrNavigationLinkSeparator,
    FrNavigationMenuContent,
    FrNavigationMenuFeature,
    FrNavigationMenuGrid,
    FrNavigationMenuIndicator,
    FrNavigationMenuItem,
    FrNavigationMenuLink,
    FrNavigationMenuLinkDescription,
    FrNavigationMenuLinkTitle,
    FrNavigationMenuList,
    FrNavigationMenuPanel,
    FrNavigationMenuTrigger,
    FrNavigationMenuViewport,
  ],
  template: `
    <nav frNavigationMenu>
      <ul frNavigationMenuList>
        <li frNavigationMenuItem>
          <button [frNavigationMenuTrigger]="componentsMenu" type="button">Components</button>

          <ng-template #componentsMenu="frNavigationMenuContent" frNavigationMenuContent>
            <div frNavigationMenuPanel>
              <div frNavigationMenuGrid [columns]="2">
                <a frNavigationMenuLink frNavigationMenuFeature href="/docs/components/button">
                  <span frNavigationMenuLinkTitle>Button</span>
                  <span frNavigationMenuLinkDescription>Action primitive.</span>
                </a>
              </div>
              <a frNavigationMenuLink href="/docs/components/card">
                <span frNavigationMenuLinkTitle>Card</span>
                <span frNavigationMenuLinkDescription>Composable surface.</span>
              </a>
              <div frNavigationLinkSeparator></div>
            </div>
          </ng-template>
        </li>
        <li frNavigationMenuItem>
          <a frNavigationMenuLink active href="/docs">Docs</a>
        </li>
      </ul>
      <div frNavigationMenuIndicator></div>
      <div frNavigationMenuViewport></div>
    </nav>
  `,
})
class TestHostComponent {}

describe('FrNavigationMenu', () => {
  afterEach(() => {
    document.body.querySelector('.cdk-overlay-container')?.remove();
  });

  it('opens navigation content through the dropdown foundation', async () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();

    const trigger = fixture.nativeElement.querySelector(
      '.frame-navigation-menu__trigger',
    ) as HTMLButtonElement;
    trigger.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const panel = document.body.querySelector('.frame-navigation-menu__content') as HTMLElement | null;

    expect(panel).not.toBeNull();
    expect(trigger.getAttribute('data-state')).toBe('open');
  });

  it('adds active state and structural classes', async () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();

    const trigger = fixture.nativeElement.querySelector(
      '.frame-navigation-menu__trigger',
    ) as HTMLButtonElement;
    trigger.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const activeLink = fixture.nativeElement.querySelector(
      '[frNavigationMenuLink][data-active]',
    ) as HTMLElement | null;
    const panel = document.body.querySelector('.frame-navigation-menu__content') as HTMLElement | null;

    expect(fixture.nativeElement.querySelector('.frame-navigation-menu__list')).not.toBeNull();
    expect(panel?.querySelector('.frame-navigation-menu__grid')).not.toBeNull();
    expect(panel?.querySelector('.frame-navigation-menu__feature')).not.toBeNull();
    expect(panel?.querySelector('.frame-navigation-menu__link-title')).not.toBeNull();
    expect(panel?.querySelector('.frame-navigation-menu__link-description')).not.toBeNull();
    expect(panel?.querySelector('.frame-navigation-menu__link-separator')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('.frame-navigation-menu__indicator')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('.frame-navigation-menu__viewport')).not.toBeNull();
    expect(activeLink).not.toBeNull();
  });
});
