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

@Component({
  imports: [FrSidebar, FrSidebarProvider, FrSidebarRail],
  template: `
    <div frSidebarProvider>
      <aside frSidebar collapsible="offcanvas">
        <div frSidebarRail></div>
      </aside>
    </div>
  `,
})
class OffcanvasRailHost {}

@Component({
  imports: [FrSidebar, FrSidebarMenuButton, FrSidebarProvider, FrSidebarRail],
  template: `
    <div frSidebarProvider>
      <aside frSidebar [minSize]="minSize()" [maxSize]="maxSize()" [resizable]="resizable()">
        <a frSidebarMenuButton>
          <span data-long-label>Extremely long workspace navigation item</span>
        </a>
        <div frSidebarRail></div>
      </aside>
    </div>
  `,
})
class ResizableSidebarHost {
  readonly minSize = signal<number | null>(null);
  readonly maxSize = signal<number | null>(384);
  readonly resizable = signal(true);
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

  it('does not toggle icon-collapsed sidebars from a rail click', () => {
    const trigger = fixture.debugElement.query(By.directive(FrSidebarTrigger)).nativeElement as HTMLButtonElement;
    const provider = fixture.nativeElement.querySelector('[frSidebarProvider]') as HTMLElement;
    const rail = fixture.debugElement.query(By.directive(FrSidebarRail)).nativeElement as HTMLElement;

    trigger.click();
    fixture.detectChanges();

    expect(fixture.componentInstance.provider().state()).toBe('collapsed');

    rail.click();
    fixture.detectChanges();

    expect(fixture.componentInstance.provider().state()).toBe('collapsed');
    expect(provider.style.getPropertyValue('--frame-sidebar-width')).toBe('');
  });

  it('keeps expanded width after an icon rail click followed by trigger expansion', () => {
    const trigger = fixture.debugElement.query(By.directive(FrSidebarTrigger)).nativeElement as HTMLButtonElement;
    const provider = fixture.nativeElement.querySelector('[frSidebarProvider]') as HTMLElement;
    const rail = fixture.debugElement.query(By.directive(FrSidebarRail)).nativeElement as HTMLElement;

    trigger.click();
    fixture.detectChanges();

    rail.dispatchEvent(new PointerEvent('pointerdown', { clientX: 0, bubbles: true }));
    document.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));
    rail.click();
    fixture.detectChanges();

    trigger.click();
    fixture.detectChanges();

    expect(fixture.componentInstance.provider().state()).toBe('expanded');
    expect(provider.style.getPropertyValue('--frame-sidebar-width')).toBe('');
  });

  it('toggles offcanvas sidebars from the sidebar rail', () => {
    const offcanvasFixture = TestBed.createComponent(OffcanvasRailHost);
    offcanvasFixture.detectChanges();

    const provider = offcanvasFixture.debugElement.query(By.directive(FrSidebarProvider)).injector.get(FrSidebarProvider);
    const rail = offcanvasFixture.debugElement.query(By.directive(FrSidebarRail)).nativeElement as HTMLElement;

    rail.click();
    offcanvasFixture.detectChanges();

    expect(provider.state()).toBe('collapsed');
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

  it('expands an icon-collapsed sidebar when dragging the rail to resize', () => {
    const trigger = fixture.debugElement.query(By.directive(FrSidebarTrigger)).nativeElement as HTMLButtonElement;
    const provider = fixture.nativeElement.querySelector('[frSidebarProvider]') as HTMLElement;
    const sidebar = fixture.nativeElement.querySelector('[frSidebar]') as HTMLElement;
    const rail = fixture.debugElement.query(By.directive(FrSidebarRail)).nativeElement as HTMLElement;

    trigger.click();
    fixture.detectChanges();

    vi.spyOn(sidebar, 'getBoundingClientRect').mockReturnValue({
      bottom: 0,
      height: 0,
      left: 0,
      right: 48,
      toJSON: () => ({}),
      top: 0,
      width: 48,
      x: 0,
      y: 0,
    });

    rail.dispatchEvent(new PointerEvent('pointerdown', { clientX: 0, bubbles: true }));
    document.dispatchEvent(new PointerEvent('pointermove', { clientX: 48, bubbles: true }));
    document.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));
    fixture.detectChanges();

    expect(provider.style.getPropertyValue('--frame-sidebar-width')).toBe('192px');
    expect(fixture.componentInstance.provider().state()).toBe('expanded');
  });

  it('clamps rail resizing to explicit minSize and maxSize inputs', () => {
    const resizeFixture = TestBed.createComponent(ResizableSidebarHost);
    resizeFixture.componentInstance.minSize.set(220);
    resizeFixture.componentInstance.maxSize.set(260);
    resizeFixture.detectChanges();

    const provider = resizeFixture.nativeElement.querySelector('[frSidebarProvider]') as HTMLElement;
    const sidebar = resizeFixture.nativeElement.querySelector('[frSidebar]') as HTMLElement;
    const rail = resizeFixture.debugElement.query(By.directive(FrSidebarRail)).nativeElement as HTMLElement;

    vi.spyOn(sidebar, 'getBoundingClientRect').mockReturnValue({
      bottom: 0,
      height: 0,
      left: 0,
      right: 240,
      toJSON: () => ({}),
      top: 0,
      width: 240,
      x: 0,
      y: 0,
    });

    rail.dispatchEvent(new PointerEvent('pointerdown', { clientX: 0, bubbles: true }));
    document.dispatchEvent(new PointerEvent('pointermove', { clientX: -80, bubbles: true }));
    document.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));

    expect(provider.style.getPropertyValue('--frame-sidebar-width')).toBe('220px');

    rail.dispatchEvent(new PointerEvent('pointerdown', { clientX: 0, bubbles: true }));
    document.dispatchEvent(new PointerEvent('pointermove', { clientX: 80, bubbles: true }));
    document.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));

    expect(provider.style.getPropertyValue('--frame-sidebar-width')).toBe('260px');
  });

  it('does not resize from the rail when resizable is false', () => {
    const resizeFixture = TestBed.createComponent(ResizableSidebarHost);
    resizeFixture.componentInstance.resizable.set(false);
    resizeFixture.detectChanges();

    const provider = resizeFixture.nativeElement.querySelector('[frSidebarProvider]') as HTMLElement;
    const sidebar = resizeFixture.nativeElement.querySelector('[frSidebar]') as HTMLElement;
    const rail = resizeFixture.debugElement.query(By.directive(FrSidebarRail)).nativeElement as HTMLElement;

    vi.spyOn(sidebar, 'getBoundingClientRect').mockReturnValue({
      bottom: 0,
      height: 0,
      left: 0,
      right: 240,
      toJSON: () => ({}),
      top: 0,
      width: 240,
      x: 0,
      y: 0,
    });

    rail.dispatchEvent(new PointerEvent('pointerdown', { clientX: 0, bubbles: true }));
    document.dispatchEvent(new PointerEvent('pointermove', { clientX: 80, bubbles: true }));
    document.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));

    expect(sidebar.getAttribute('data-resizable')).toBeNull();
    expect(provider.style.getPropertyValue('--frame-sidebar-width')).toBe('');
  });

  it('defaults minSize to the widest sidebar content during rail resizing', () => {
    const resizeFixture = TestBed.createComponent(ResizableSidebarHost);
    resizeFixture.detectChanges();

    const provider = resizeFixture.nativeElement.querySelector('[frSidebarProvider]') as HTMLElement;
    const sidebar = resizeFixture.nativeElement.querySelector('[frSidebar]') as HTMLElement;
    const longLabel = resizeFixture.nativeElement.querySelector('[data-long-label]') as HTMLElement;
    const rail = resizeFixture.debugElement.query(By.directive(FrSidebarRail)).nativeElement as HTMLElement;

    vi.spyOn(sidebar, 'scrollWidth', 'get').mockReturnValue(192);
    vi.spyOn(longLabel, 'scrollWidth', 'get').mockReturnValue(276);
    vi.spyOn(sidebar, 'getBoundingClientRect').mockReturnValue({
      bottom: 0,
      height: 0,
      left: 0,
      right: 320,
      toJSON: () => ({}),
      top: 0,
      width: 320,
      x: 0,
      y: 0,
    });
    vi.spyOn(longLabel, 'getBoundingClientRect').mockReturnValue({
      bottom: 0,
      height: 0,
      left: 12,
      right: 288,
      toJSON: () => ({}),
      top: 0,
      width: 276,
      x: 12,
      y: 0,
    });

    rail.dispatchEvent(new PointerEvent('pointerdown', { clientX: 0, bubbles: true }));
    document.dispatchEvent(new PointerEvent('pointermove', { clientX: -200, bubbles: true }));
    document.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));

    expect(provider.style.getPropertyValue('--frame-sidebar-width')).toBe('288px');
  });

  it('keeps automatic resize bounds stable during a drag gesture', () => {
    const resizeFixture = TestBed.createComponent(ResizableSidebarHost);
    resizeFixture.detectChanges();

    const provider = resizeFixture.nativeElement.querySelector('[frSidebarProvider]') as HTMLElement;
    const sidebar = resizeFixture.nativeElement.querySelector('[frSidebar]') as HTMLElement;
    const longLabel = resizeFixture.nativeElement.querySelector('[data-long-label]') as HTMLElement;
    const rail = resizeFixture.debugElement.query(By.directive(FrSidebarRail)).nativeElement as HTMLElement;

    vi.spyOn(sidebar, 'getBoundingClientRect').mockReturnValue({
      bottom: 0,
      height: 0,
      left: 0,
      right: 320,
      toJSON: () => ({}),
      top: 0,
      width: 320,
      x: 0,
      y: 0,
    });
    vi.spyOn(longLabel, 'scrollWidth', 'get').mockReturnValue(240);
    vi.spyOn(longLabel, 'getBoundingClientRect').mockReturnValue({
      bottom: 0,
      height: 0,
      left: 12,
      right: 252,
      toJSON: () => ({}),
      top: 0,
      width: 240,
      x: 12,
      y: 0,
    });

    rail.dispatchEvent(new PointerEvent('pointerdown', { clientX: 0, bubbles: true }));
    document.dispatchEvent(new PointerEvent('pointermove', { clientX: 90, bubbles: true }));
    document.dispatchEvent(new PointerEvent('pointermove', { clientX: 180, bubbles: true }));
    document.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));

    expect(provider.style.getPropertyValue('--frame-sidebar-width')).toBe('384px');
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
