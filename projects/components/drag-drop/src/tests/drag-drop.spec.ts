import { Component, signal } from '@angular/core';
import { CdkDrag, CdkDragHandle, CdkDropList } from '@angular/cdk/drag-drop';
import { TestBed } from '@angular/core/testing';

import { FrDrag, FrDragHandle, FrDropList, FrDragDropGroup } from '../drag-drop';

@Component({
  imports: [FrDrag, FrDragHandle, FrDropList, FrDragDropGroup],
  standalone: true,
  template: `
    <div frDragDropGroup [frDragDropGroupDisabled]="groupDisabled()">
      <div
        frDropList
        frDropListId="tasks"
        [frDropListData]="items()"
        [frDropListDisabled]="listDisabled()"
        frDropListOrientation="vertical"
      >
        @for (item of items(); track item) {
          <div frDrag [frDragData]="item" [frDragDisabled]="dragDisabled()">
            <span frDragHandle [frDragHandleDisabled]="handleDisabled()">Handle</span>
            {{ item }}
          </div>
        }
      </div>
    </div>
  `,
})
class TestHostComponent {
  readonly items = signal(['Design', 'Build']);
  readonly groupDisabled = signal(false);
  readonly listDisabled = signal(false);
  readonly dragDisabled = signal(false);
  readonly handleDisabled = signal(false);
}

@Component({
  imports: [FrDrag, FrDragHandle, FrDropList],
  standalone: true,
  template: `
    <div frDropList [frDropListData]="cards()">
      @for (card of cards(); track card.id) {
        <article frDrag [frDragData]="card">
          <button frDragHandle type="button">Move card</button>
          {{ card.title }}

          <div frDropList [frDropListData]="card.children">
            @for (child of card.children; track child.id) {
              <div frDrag [frDragData]="child">
                <button frDragHandle type="button">Move child</button>
                {{ child.title }}
              </div>
            }
          </div>
        </article>
      }
    </div>
  `,
})
class NestedHostComponent {
  readonly cards = signal([
    {
      id: 'profile',
      title: 'Profile',
      children: [{ id: 'avatar', title: 'Avatar' }],
    },
  ]);
}

@Component({
  imports: [FrDrag],
  standalone: true,
  template: `<div frDrag [frDragData]="item">Whole element drag</div>`,
})
class WholeElementHostComponent {
  readonly item = 'whole-element';
}

describe('FrDragDrop', () => {
  it('applies frame classes and forwards drop list inputs to CDK', async () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    await fixture.whenStable();
    fixture.detectChanges();

    const listElement = fixture.nativeElement.querySelector('[frDropList]') as HTMLElement;
    const list = fixture.debugElement.query((node) => !!node.injector.get(CdkDropList, null))!
      .injector.get<CdkDropList<string[]>>(CdkDropList);

    expect(listElement.classList.contains('frame-drop-list')).toBe(true);
    expect(listElement.getAttribute('data-orientation')).toBe('vertical');
    expect(list.id).toBe('tasks');
    expect(list.data).toEqual(['Design', 'Build']);
  });

  it('applies drag state and forwards drag data to CDK', async () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    await fixture.whenStable();
    fixture.detectChanges();

    const dragElement = fixture.nativeElement.querySelector('[frDrag]') as HTMLElement;
    const drag = fixture.debugElement.query((node) => !!node.injector.get(CdkDrag, null))!
      .injector.get<CdkDrag<string>>(CdkDrag);

    expect(dragElement.classList.contains('frame-drag')).toBe(true);
    expect(drag.data).toBe('Design');
  });

  it('reflects disabled state on group, list, drag, and handle', async () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    const component = fixture.componentInstance;

    component.groupDisabled.set(true);
    component.listDisabled.set(true);
    component.dragDisabled.set(true);
    component.handleDisabled.set(true);
    await fixture.whenStable();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('[frDragDropGroup]').getAttribute('data-disabled')).toBe('');
    expect(fixture.nativeElement.querySelector('[frDropList]').getAttribute('data-disabled')).toBe('');
    expect(fixture.nativeElement.querySelector('[frDrag]').getAttribute('data-disabled')).toBe('');
    expect(fixture.nativeElement.querySelector('[frDragHandle]').getAttribute('data-disabled')).toBe('');

    const drag = fixture.debugElement.query((node) => !!node.injector.get(CdkDrag, null))!
      .injector.get<CdkDrag<string>>(CdkDrag);
    const handle = fixture.debugElement.query((node) => !!node.injector.get(CdkDragHandle, null))!
      .injector.get<CdkDragHandle>(CdkDragHandle);

    expect(drag.disabled).toBe(true);
    expect(handle.disabled).toBe(true);
  });

  it('supports whole-element dragging without a projected drag handle', async () => {
    const fixture = TestBed.createComponent(WholeElementHostComponent);
    await fixture.whenStable();
    fixture.detectChanges();

    const drag = fixture.debugElement.query((node) => !!node.injector.get(CdkDrag, null))!
      .injector.get<CdkDrag<string>>(CdkDrag);

    expect(drag.data).toBe('whole-element');
    expect(fixture.nativeElement.querySelector('[frDragHandle]')).toBeNull();
  });

  it('creates independent CDK drags for nested draggable elements', async () => {
    const fixture = TestBed.createComponent(NestedHostComponent);
    await fixture.whenStable();
    fixture.detectChanges();

    const drags = fixture.debugElement
      .queryAll((node) => Object.prototype.hasOwnProperty.call(node.attributes, 'frDrag'))
      .map((node) => node.injector.get<CdkDrag<{ id: string; title: string }>>(CdkDrag));
    const lists = fixture.debugElement.queryAll((node) =>
      Object.prototype.hasOwnProperty.call(node.attributes, 'frDropList'),
    );

    expect(drags.length).toBe(2);
    expect(lists.length).toBe(2);
    expect(drags.map((drag) => drag.data.id)).toEqual(['profile', 'avatar']);
  });
});
