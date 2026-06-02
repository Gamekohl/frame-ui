import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrTabs, FrTabsContent, FrTabsList, FrTabsTrigger } from '../tabs';

@Component({
  imports: [FrTabs, FrTabsContent, FrTabsList, FrTabsTrigger],
  template: `
    <div frTabs [defaultValue]="defaultValue()" [(value)]="value">
      <div frTabsList>
        <button frTabsTrigger value="overview">Overview</button>
        <button frTabsTrigger value="settings">Settings</button>
        <button frTabsTrigger value="disabled" disabled>Disabled</button>
      </div>
      <div frTabsContent value="overview">Overview panel</div>
      <div frTabsContent value="settings">Settings panel</div>
    </div>
  `,
})
class TabsHost {
  readonly defaultValue = signal('overview');
  readonly value = signal<string | null>(null);
}

describe('FrTabs', () => {
  let fixture: ComponentFixture<TabsHost>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TabsHost],
    });

    fixture = TestBed.createComponent(TabsHost);
    fixture.detectChanges();
  });

  it('selects the default tab and hides inactive content', () => {
    const triggers = fixture.nativeElement.querySelectorAll('[frTabsTrigger]') as NodeListOf<HTMLElement>;
    const panels = fixture.nativeElement.querySelectorAll('[frTabsContent]') as NodeListOf<HTMLElement>;

    expect(triggers[0].getAttribute('data-active')).toBe('');
    expect(panels[0].hidden).toBe(false);
    expect(panels[1].hidden).toBe(true);
  });

  it('changes selected tab when a trigger is clicked', () => {
    const triggers = fixture.nativeElement.querySelectorAll('[frTabsTrigger]') as NodeListOf<HTMLButtonElement>;

    triggers[1].click();
    fixture.detectChanges();

    expect(fixture.componentInstance.value()).toBe('settings');
    expect(triggers[1].getAttribute('data-active')).toBe('');
  });

  it('does not select disabled triggers', () => {
    const triggers = fixture.nativeElement.querySelectorAll('[frTabsTrigger]') as NodeListOf<HTMLButtonElement>;

    triggers[2].click();
    fixture.detectChanges();

    expect(fixture.componentInstance.value()).toBeNull();
  });
});
