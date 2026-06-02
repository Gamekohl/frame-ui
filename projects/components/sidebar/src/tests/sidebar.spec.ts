import { Component, signal, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import {
  FrSidebar,
  FrSidebarContent,
  FrSidebarGroup,
  FrSidebarGroupContent,
  FrSidebarGroupLabel,
  FrSidebarMenu,
  FrSidebarMenuButton,
  FrSidebarMenuItem,
  FrSidebarMenuSkeleton,
  FrSidebarProvider,
  FrSidebarRail,
  FrSidebarTrigger,
} from '../sidebar';

@Component({
  imports: [
    FrSidebar,
    FrSidebarContent,
    FrSidebarGroup,
    FrSidebarGroupContent,
    FrSidebarGroupLabel,
    FrSidebarMenu,
    FrSidebarMenuButton,
    FrSidebarMenuItem,
    FrSidebarMenuSkeleton,
    FrSidebarProvider,
    FrSidebarRail,
    FrSidebarTrigger,
  ],
  template: `
    <div frSidebarProvider #provider="frSidebarProvider" [defaultOpen]="defaultOpen()">
      <aside frSidebar collapsible="icon" variant="inset">
        <div frSidebarContent>
          <div frSidebarGroup>
            <div frSidebarGroupLabel>Workspace</div>
            <div frSidebarGroupContent>
              <ul frSidebarMenu>
                <li frSidebarMenuItem>
                  <a frSidebarMenuButton active href="/home">
                    <span>Home</span>
                  </a>
                </li>
                <li frSidebarMenuItem>
                  <button frSidebarMenuButton disabled type="button">Disabled</button>
                </li>
                <li frSidebarMenuItem>
                  <div frSidebarMenuSkeleton showIcon width="54%"></div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div frSidebarRail></div>
      </aside>
      <main>
        <button frSidebarTrigger type="button">Toggle</button>
      </main>
    </div>
  `,
})
class SidebarHost {
  readonly defaultOpen = signal(true);
  readonly provider = viewChild.required(FrSidebarProvider);
}

@Component({
  imports: [FrSidebar, FrSidebarProvider],
  template: `
    <div frSidebarProvider [open]="open()" (openChange)="openChange.set($event)">
      <aside frSidebar></aside>
    </div>
  `,
})
class ControlledSidebarHost {
  readonly open = signal(false);
  readonly openChange = signal<boolean | null>(null);
}

describe('FrSidebar', () => {
  let fixture: ComponentFixture<SidebarHost>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SidebarHost],
    });

    fixture = TestBed.createComponent(SidebarHost);
    fixture.detectChanges();
  });

  it('provides expanded state to the sidebar and primitives', () => {
    const provider = fixture.nativeElement.querySelector('[frSidebarProvider]') as HTMLElement;
    const sidebar = fixture.nativeElement.querySelector('[frSidebar]') as HTMLElement;
    const activeButton = fixture.nativeElement.querySelector('[frSidebarMenuButton][data-active]') as HTMLElement;
    const skeleton = fixture.nativeElement.querySelector('[frSidebarMenuSkeleton]') as HTMLElement;

    expect(provider.getAttribute('data-state')).toBe('expanded');
    expect(sidebar.getAttribute('data-collapsible')).toBe('icon');
    expect(sidebar.getAttribute('data-variant')).toBe('inset');
    expect(activeButton.textContent).toContain('Home');
    expect(skeleton.getAttribute('data-show-icon')).toBe('');
    expect(skeleton.style.getPropertyValue('--frame-sidebar-skeleton-width')).toBe('54%');
  });

  it('toggles collapsed state from the trigger', () => {
    const trigger = fixture.debugElement.query(By.directive(FrSidebarTrigger)).nativeElement as HTMLButtonElement;

    trigger.click();
    fixture.detectChanges();

    const provider = fixture.nativeElement.querySelector('[frSidebarProvider]') as HTMLElement;
    const sidebar = fixture.nativeElement.querySelector('[frSidebar]') as HTMLElement;

    expect(provider.getAttribute('data-state')).toBe('collapsed');
    expect(sidebar.getAttribute('data-state')).toBe('collapsed');
  });

  it('toggles from the sidebar rail', () => {
    const rail = fixture.debugElement.query(By.directive(FrSidebarRail)).nativeElement as HTMLElement;

    rail.click();
    fixture.detectChanges();

    expect(fixture.componentInstance.provider().state()).toBe('collapsed');
  });

  it('resizes from the sidebar rail without toggling', () => {
    const provider = fixture.nativeElement.querySelector('[frSidebarProvider]') as HTMLElement;
    const sidebar = fixture.nativeElement.querySelector('[frSidebar]') as HTMLElement;
    const rail = fixture.debugElement.query(By.directive(FrSidebarRail)).nativeElement as HTMLElement;

    vi.spyOn(sidebar, 'getBoundingClientRect').mockReturnValue({
      bottom: 0,
      height: 0,
      left: 0,
      right: 192,
      toJSON: () => ({}),
      top: 0,
      width: 192,
      x: 0,
      y: 0,
    });

    rail.dispatchEvent(new PointerEvent('pointerdown', { clientX: 0, bubbles: true }));
    document.dispatchEvent(new PointerEvent('pointermove', { clientX: 48, bubbles: true }));
    document.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));
    fixture.detectChanges();

    expect(provider.style.getPropertyValue('--frame-sidebar-width')).toBe('240px');
    expect(fixture.componentInstance.provider().state()).toBe('expanded');
  });

  it('prevents disabled menu button actions', () => {
    const disabled = fixture.nativeElement.querySelector('button[frSidebarMenuButton][data-disabled]') as HTMLButtonElement;
    const event = new MouseEvent('click', { bubbles: true, cancelable: true });

    disabled.dispatchEvent(event);

    expect(event.defaultPrevented).toBe(true);
  });

  it('emits openChange without mutating controlled open state', () => {
    const controlledFixture = TestBed.createComponent(ControlledSidebarHost);
    controlledFixture.detectChanges();

    const provider = controlledFixture.debugElement.query(By.directive(FrSidebarProvider)).injector.get(FrSidebarProvider);
    provider.toggleSidebar();
    controlledFixture.detectChanges();

    expect(provider.open()).toBe(false);
    expect(controlledFixture.componentInstance.openChange()).toBe(true);
  });
});
