import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import {
  FrSidebar,
  FrSidebarContent,
  FrSidebarMenu,
  FrSidebarMenuButton,
  FrSidebarMenuItem,
  FrSidebarModule,
  FrSidebarProvider,
} from '@frame-ui/components/sidebar';

@Component({
  imports: [
    FrSidebarProvider,
    FrSidebar,
    FrSidebarContent,
    FrSidebarMenu,
    FrSidebarMenuItem,
    FrSidebarMenuButton,
  ],
  template: `
    <div frSidebarProvider>
      <aside frSidebar>
        <div frSidebarContent>
          <ul frSidebarMenu>
            <li frSidebarMenuItem>
              <button frSidebarMenuButton type="button">
                <span>Overview</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  `,
})
class SidebarImportsHost {}

@Component({
  imports: [FrSidebarModule],
  template: `
    <div frSidebarProvider>
      <aside frSidebar>
        <div frSidebarContent>
          <button frSidebarTrigger type="button">Toggle</button>
        </div>
      </aside>
    </div>
  `,
})
class SidebarModuleHost {}

describe('sidebar secondary entry point', () => {
  it('supports individual standalone imports', () => {
    const fixture = TestBed.configureTestingModule({
      imports: [SidebarImportsHost],
    }).createComponent(SidebarImportsHost);

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('[frSidebar]')).not.toBeNull();
    expect(compiled.querySelector('[frSidebarMenuButton]')?.textContent).toContain('Overview');
  });

  it('supports the optional sidebar module', () => {
    const fixture = TestBed.configureTestingModule({
      imports: [SidebarModuleHost],
    }).createComponent(SidebarModuleHost);

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('[frSidebarTrigger]')?.textContent).toContain('Toggle');
  });
});
