import {
  Directive,
  DoCheck,
  OnDestroy,
  booleanAttribute,
  inject,
  input,
  output,
} from '@angular/core';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDragEnd,
  CdkDragEnter,
  CdkDragExit,
  CdkDragHandle,
  CdkDragMove,
  CdkDragPlaceholder,
  CdkDragPreview,
  CdkDragRelease,
  CdkDragSortEvent,
  CdkDragStart,
  CdkDropList,
  CdkDropListGroup,
  DragAxis,
  DragConstrainPosition,
  DragStartDelay,
  DropListOrientation,
  PreviewContainer,
} from '@angular/cdk/drag-drop';
import { Subscription } from 'rxjs';

export const FR_DROP_LIST_ORIENTATIONS = ['horizontal', 'vertical', 'mixed'] as const;

export type FrDropListOrientation = (typeof FR_DROP_LIST_ORIENTATIONS)[number];

/** Connects child drop lists dynamically through the CDK group primitive. */
@Directive({
  selector: '[frDragDropGroup], frame-drag-drop-group',
  hostDirectives: [CdkDropListGroup],
  host: {
    class: 'frame-drag-drop-group',
    '[attr.data-disabled]': 'disabled() ? "" : null',
  },
})
export class FrDragDropGroup implements DoCheck {
  private readonly cdkGroup = inject(CdkDropListGroup);

  readonly disabled = input(false, {
    alias: 'frDragDropGroupDisabled',
    transform: booleanAttribute,
  });

  ngDoCheck(): void {
    this.cdkGroup.disabled = this.disabled();
  }
}

/** Drop target for sortable and transferable draggable items. */
@Directive({
  selector: '[frDropList], frame-drop-list',
  hostDirectives: [CdkDropList],
  host: {
    class: 'frame-drop-list',
    '[attr.data-disabled]': 'disabled() ? "" : null',
    '[attr.data-orientation]': 'orientation()',
    '[attr.data-sorting-disabled]': 'sortingDisabled() ? "" : null',
  },
})
export class FrDropList<T = unknown> implements DoCheck, OnDestroy {
  private readonly cdkDropList = inject<CdkDropList<T>>(CdkDropList);
  private readonly subscriptions = new Subscription();

  readonly connectedTo = input<Array<CdkDropList<unknown> | string> | CdkDropList<unknown> | string>([], {
    alias: 'frDropListConnectedTo',
  });
  readonly data = input<T | null>(null, { alias: 'frDropListData' });
  readonly orientation = input<FrDropListOrientation>('vertical', {
    alias: 'frDropListOrientation',
  });
  readonly id = input<string | null>(null, { alias: 'frDropListId' });
  readonly lockAxis = input<DragAxis | null>(null, { alias: 'frDropListLockAxis' });
  readonly disabled = input(false, {
    alias: 'frDropListDisabled',
    transform: booleanAttribute,
  });
  readonly sortingDisabled = input(false, {
    alias: 'frDropListSortingDisabled',
    transform: booleanAttribute,
  });
  readonly enterPredicate = input<CdkDropList<T>['enterPredicate'] | null>(null, {
    alias: 'frDropListEnterPredicate',
  });
  readonly sortPredicate = input<CdkDropList<T>['sortPredicate'] | null>(null, {
    alias: 'frDropListSortPredicate',
  });
  readonly autoScrollDisabled = input(false, {
    alias: 'frDropListAutoScrollDisabled',
    transform: booleanAttribute,
  });
  readonly autoScrollStep = input<number | null>(null, { alias: 'frDropListAutoScrollStep' });
  readonly elementContainerSelector = input<string | null>(null, {
    alias: 'frDropListElementContainer',
  });
  readonly hasAnchor = input(false, {
    alias: 'frDropListHasAnchor',
    transform: booleanAttribute,
  });

  readonly dropped = output<CdkDragDrop<T>>({ alias: 'frDropListDropped' });
  readonly entered = output<CdkDragEnter<T>>({ alias: 'frDropListEntered' });
  readonly exited = output<CdkDragExit<T>>({ alias: 'frDropListExited' });
  readonly sorted = output<CdkDragSortEvent<T>>({ alias: 'frDropListSorted' });

  constructor() {
    this.forward(this.cdkDropList.dropped, this.dropped);
    this.forward(this.cdkDropList.entered, this.entered);
    this.forward(this.cdkDropList.exited, this.exited);
    this.forward(this.cdkDropList.sorted, this.sorted);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngDoCheck(): void {
    // Forward signal inputs into the CDK directive hosted on the same element.
    const id = this.id();
    this.cdkDropList.id = id ?? this.cdkDropList.id;
    this.cdkDropList.connectedTo = this.connectedTo();
    this.cdkDropList.data = this.data() as T;
    this.cdkDropList.orientation = this.orientation() as DropListOrientation;
    this.cdkDropList.lockAxis = this.lockAxis();
    this.cdkDropList.disabled = this.disabled();
    this.cdkDropList.sortingDisabled = this.sortingDisabled();
    this.cdkDropList.autoScrollDisabled = this.autoScrollDisabled();
    this.cdkDropList.hasAnchor = this.hasAnchor();

    const enterPredicate = this.enterPredicate();
    if (enterPredicate) {
      this.cdkDropList.enterPredicate = enterPredicate;
    }

    const sortPredicate = this.sortPredicate();
    if (sortPredicate) {
      this.cdkDropList.sortPredicate = sortPredicate;
    }

    const autoScrollStep = this.autoScrollStep();
    if (autoScrollStep !== null) {
      this.cdkDropList.autoScrollStep = autoScrollStep;
    }

    const elementContainerSelector = this.elementContainerSelector();
    if (elementContainerSelector !== null) {
      this.cdkDropList.elementContainerSelector = elementContainerSelector;
    }
  }

  private forward<Value>(
    source: { subscribe(next: (value: Value) => void): { unsubscribe(): void } },
    target: { emit(value: Value): void },
  ): void {
    this.subscriptions.add(source.subscribe((event) => target.emit(event)));
  }
}

/** Makes the host element draggable; add a handle to narrow the drag gesture. */
@Directive({
  selector: '[frDrag], frame-drag',
  hostDirectives: [CdkDrag],
  host: {
    class: 'frame-drag',
    '[attr.data-disabled]': 'disabled() ? "" : null',
    '[attr.data-lock-axis]': 'lockAxis()',
  },
})
export class FrDrag<T = unknown> implements DoCheck, OnDestroy {
  private readonly cdkDrag = inject<CdkDrag<T>>(CdkDrag);
  private readonly subscriptions = new Subscription();

  readonly data = input<T | null>(null, { alias: 'frDragData' });
  readonly lockAxis = input<DragAxis | null>(null, { alias: 'frDragLockAxis' });
  readonly rootElementSelector = input<string | null>(null, { alias: 'frDragRootElement' });
  readonly boundaryElement = input<string | HTMLElement | null>(null, { alias: 'frDragBoundary' });
  readonly dragStartDelay = input<DragStartDelay | null>(null, {
    alias: 'frDragStartDelay',
  });
  readonly freeDragPosition = input<{ x: number; y: number } | null>(null, {
    alias: 'frDragFreeDragPosition',
  });
  readonly disabled = input(false, {
    alias: 'frDragDisabled',
    transform: booleanAttribute,
  });
  readonly constrainPosition = input<DragConstrainPosition | null>(null, {
    alias: 'frDragConstrainPosition',
  });
  readonly previewClass = input<string | string[] | null>(null, { alias: 'frDragPreviewClass' });
  readonly previewContainer = input<PreviewContainer | null>(null, {
    alias: 'frDragPreviewContainer',
  });
  readonly scale = input<number | null>(null, { alias: 'frDragScale' });

  readonly started = output<CdkDragStart<T>>({ alias: 'frDragStarted' });
  readonly released = output<CdkDragRelease<T>>({ alias: 'frDragReleased' });
  readonly ended = output<CdkDragEnd<T>>({ alias: 'frDragEnded' });
  readonly entered = output<CdkDragEnter<T>>({ alias: 'frDragEntered' });
  readonly exited = output<CdkDragExit<T>>({ alias: 'frDragExited' });
  readonly dropped = output<CdkDragDrop<T>>({ alias: 'frDragDropped' });
  readonly moved = output<CdkDragMove<T>>({ alias: 'frDragMoved' });

  constructor() {
    this.forward(this.cdkDrag.started, this.started);
    this.forward(this.cdkDrag.released, this.released);
    this.forward(this.cdkDrag.ended, this.ended);
    this.forward(this.cdkDrag.entered, this.entered);
    this.forward(this.cdkDrag.exited, this.exited);
    this.forward(this.cdkDrag.dropped, this.dropped);
    this.forward(this.cdkDrag.moved, this.moved);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngDoCheck(): void {
    // Keep FrameUI inputs as the public API while delegating behavior to CDK.
    this.cdkDrag.data = this.data() as T;
    this.cdkDrag.lockAxis = this.lockAxis();
    this.cdkDrag.disabled = this.disabled();

    const rootElementSelector = this.rootElementSelector();
    if (rootElementSelector !== null) {
      this.cdkDrag.rootElementSelector = rootElementSelector;
    }

    const boundaryElement = this.boundaryElement();
    if (boundaryElement !== null) {
      this.cdkDrag.boundaryElement = boundaryElement;
    }

    const dragStartDelay = this.dragStartDelay();
    if (dragStartDelay !== null) {
      this.cdkDrag.dragStartDelay = dragStartDelay;
    }

    const freeDragPosition = this.freeDragPosition();
    if (freeDragPosition !== null) {
      this.cdkDrag.freeDragPosition = freeDragPosition;
    }

    const constrainPosition = this.constrainPosition();
    if (constrainPosition !== null) {
      this.cdkDrag.constrainPosition = constrainPosition;
    }

    const previewClass = this.previewClass();
    if (previewClass !== null) {
      this.cdkDrag.previewClass = previewClass;
    }

    const previewContainer = this.previewContainer();
    if (previewContainer !== null) {
      this.cdkDrag.previewContainer = previewContainer;
    }

    const scale = this.scale();
    if (scale !== null) {
      this.cdkDrag.scale = scale;
    }
  }

  private forward<Value>(
    source: { subscribe(next: (value: Value) => void): { unsubscribe(): void } },
    target: { emit(value: Value): void },
  ): void {
    this.subscriptions.add(source.subscribe((event) => target.emit(event)));
  }
}

/** Optional projected handle that starts dragging for the nearest draggable host. */
@Directive({
  selector: '[frDragHandle], frame-drag-handle',
  hostDirectives: [CdkDragHandle],
  host: {
    class: 'frame-drag-handle',
    '[attr.data-disabled]': 'disabled() ? "" : null',
  },
})
export class FrDragHandle implements DoCheck {
  private readonly cdkHandle = inject(CdkDragHandle);

  readonly disabled = input(false, {
    alias: 'frDragHandleDisabled',
    transform: booleanAttribute,
  });

  ngDoCheck(): void {
    this.cdkHandle.disabled = this.disabled();
  }
}

/** Custom preview template rendered while an item is being dragged. */
@Directive({
  selector: 'ng-template[frDragPreview]',
  hostDirectives: [CdkDragPreview],
})
export class FrDragPreview {}

/** Custom placeholder template rendered in the source list during drag. */
@Directive({
  selector: 'ng-template[frDragPlaceholder]',
  hostDirectives: [CdkDragPlaceholder],
})
export class FrDragPlaceholder {}
