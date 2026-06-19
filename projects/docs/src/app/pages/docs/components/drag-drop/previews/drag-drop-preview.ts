import { ChangeDetectionStrategy, Component, WritableSignal, input, signal } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FrBadgeModule } from '@frame-ui-ng/components/badge';
import { FrDragDropModule } from '@frame-ui-ng/components/drag-drop';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  tablerGripVertical,
  tablerLayoutKanban,
  tablerListCheck,
  tablerUser,
} from '@ng-icons/tabler-icons';

export type DragDropPreviewMode =
  | 'between-lists'
  | 'disabled'
  | 'handles'
  | 'list'
  | 'nested'
  | 'reorder'
  | 'swimlanes'
  | 'whole-element';

export type DragDropPreviewConfig = {
  mode?: DragDropPreviewMode;
  className?: string;
  style?: string;
};

type Task = {
  id: string;
  title: string;
  meta: string;
  owner?: string;
  disabled?: boolean;
};

type Lane = {
  id: string;
  title: string;
  status: string;
  tasks: Task[];
};

type NestedCard = Task & {
  children: Task[];
};

@Component({
  selector: 'docs-drag-drop-preview',
  imports: [FrBadgeModule, FrDragDropModule, NgIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    provideIcons({
      tablerGripVertical,
      tablerLayoutKanban,
      tablerListCheck,
      tablerUser,
    }),
  ],
  template: `
    <div
      [class]="config().className ?? 'w-full'"
      [style]="config().style ?? null"
    >
      @switch (config().mode ?? 'list') {
        @case ('whole-element') {
          <div class="docs-dnd-panel docs-dnd-panel--compact">
            <div class="docs-dnd-heading">
              <div>
                <h3>Basic</h3>
                <p>The entire row is the drag target when no handle is projected.</p>
              </div>
            </div>

            <div
              frDropList
              [frDropListData]="wholeElementTasks()"
              (frDropListDropped)="dropWholeElement($event)"
            >
              @for (item of wholeElementTasks(); track item.id) {
                <article frDrag [frDragData]="item">
                  <div class="docs-dnd-card-content">
                    <strong>{{ item.title }}</strong>
                    <span>{{ item.meta }}</span>
                  </div>
                </article>
              }
            </div>
          </div>
        }

        @case ('handles') {
          <div class="docs-dnd-panel docs-dnd-panel--compact">
            <div class="docs-dnd-heading">
              <div>
                <h3>Drag handles</h3>
                <p>Project <code>frDragHandle</code> when only part of the row should start dragging.</p>
              </div>
            </div>

            <div frDropList [frDropListData]="simpleList()" (frDropListDropped)="dropSimple($event)">
              @for (item of simpleList(); track item.id) {
                <article frDrag [frDragData]="item">
                  <button frDragHandle class="docs-dnd-handle" type="button" aria-label="Move item">
                    <ng-icon name="tablerGripVertical" size="18" />
                  </button>
                  <div class="docs-dnd-card-content">
                    <strong>{{ item.title }}</strong>
                    <span>{{ item.meta }}</span>
                  </div>
                </article>
              }
            </div>
          </div>
        }

        @case ('reorder') {
          <div class="docs-dnd-panel">
            <div class="docs-dnd-heading">
              <span class="docs-dnd-icon"><ng-icon name="tablerListCheck" size="16" /></span>
              <div>
                <h3>Release checklist</h3>
                <p>Drag rows to reprioritize the rollout.</p>
              </div>
            </div>

            <div
              frDropList
              [frDropListData]="checklist()"
              (frDropListDropped)="reorderChecklist($event)"
            >
              @for (item of checklist(); track item.id) {
                <article frDrag [frDragData]="item">
                  <button frDragHandle class="docs-dnd-handle" type="button" aria-label="Move task">
                    <ng-icon name="tablerGripVertical" size="18" />
                  </button>
                  <div class="docs-dnd-card-content">
                    <strong>{{ item.title }}</strong>
                    <span>{{ item.meta }}</span>
                  </div>
                </article>
              }
            </div>
          </div>
        }

        @case ('nested') {
          <div class="docs-dnd-panel docs-dnd-panel--compact">
            <div class="docs-dnd-heading">
              <div>
                <h3>Nested draggables</h3>
                <p>Drag cards by the outer handle, or reorder child rows inside each card.</p>
              </div>
            </div>

            <div
              frDropList
              [frDropListData]="nestedCards()"
              (frDropListDropped)="dropNestedCard($event)"
            >
              @for (card of nestedCards(); track card.id) {
                <article frDrag [frDragData]="card" class="docs-dnd-nested-card">
                  <button frDragHandle class="docs-dnd-handle" type="button" aria-label="Move card">
                    <ng-icon name="tablerGripVertical" size="18" />
                  </button>
                  <div class="docs-dnd-card-content">
                    <strong>{{ card.title }}</strong>
                    <span>{{ card.meta }}</span>

                    <div
                      frDropList
                      class="docs-dnd-child-list"
                      [frDropListData]="card.children"
                      (frDropListDropped)="dropNestedChild(card.id, $event)"
                    >
                      @for (child of card.children; track child.id) {
                        <div frDrag [frDragData]="child" class="docs-dnd-child-row">
                          <button
                            frDragHandle
                            class="docs-dnd-handle"
                            type="button"
                            aria-label="Move nested item"
                          >
                            <ng-icon name="tablerGripVertical" size="16" />
                          </button>
                          <span>{{ child.title }}</span>
                        </div>
                      }
                    </div>
                  </div>
                </article>
              }
            </div>
          </div>
        }

        @case ('disabled') {
          <div class="docs-dnd-panel docs-dnd-panel--compact">
            <div class="docs-dnd-heading">
              <div>
                <h3>Disabled dragging</h3>
                <p>Disable individual drags while keeping the rest of the list sortable.</p>
              </div>
            </div>

            <div
              frDropList
              [frDropListData]="disabledTasks()"
              (frDropListDropped)="dropDisabled($event)"
            >
              @for (item of disabledTasks(); track item.id) {
                <article frDrag [frDragData]="item" [frDragDisabled]="item.disabled">
                  <button
                    frDragHandle
                    class="docs-dnd-handle"
                    type="button"
                    aria-label="Move item"
                    [frDragHandleDisabled]="item.disabled"
                  >
                    <ng-icon name="tablerGripVertical" size="18" />
                  </button>
                  <div class="docs-dnd-card-content">
                    <strong>{{ item.title }}</strong>
                    <span>{{ item.disabled ? 'Locked for this workflow' : item.meta }}</span>
                  </div>
                  @if (item.disabled) {
                    <span frBadge variant="secondary">Disabled</span>
                  }
                </article>
              }
            </div>
          </div>
        }

        @case ('between-lists') {
          <div frDragDropGroup class="docs-dnd-board docs-dnd-board--two">
            @for (list of transferLists(); track list.id) {
              <section class="docs-dnd-panel">
                <div class="docs-dnd-heading">
                  <div>
                    <h3>{{ list.title }}</h3>
                    <p>{{ list.tasks.length }} tasks</p>
                  </div>
                  <span frBadge variant="secondary">{{ list.status }}</span>
                </div>

                <div
                  frDropList
                  [frDropListData]="list.tasks"
                  (frDropListDropped)="dropTransfer($event)"
                >
                  @for (task of list.tasks; track task.id) {
                    <article frDrag [frDragData]="task">
                      <button frDragHandle class="docs-dnd-handle" type="button" aria-label="Move task">
                        <ng-icon name="tablerGripVertical" size="18" />
                      </button>
                      <div class="docs-dnd-card-content">
                        <strong>{{ task.title }}</strong>
                        <span>{{ task.meta }}</span>
                      </div>
                    </article>
                  }
                </div>
              </section>
            }
          </div>
        }

        @case ('swimlanes') {
          <div frDragDropGroup class="docs-dnd-board docs-dnd-board--swimlanes">
            @for (lane of lanes(); track lane.id) {
              <section class="docs-dnd-panel docs-dnd-lane">
                <div class="docs-dnd-heading">
                  <span class="docs-dnd-icon"><ng-icon name="tablerLayoutKanban" size="16" /></span>
                  <div>
                    <h3>{{ lane.title }}</h3>
                    <p>{{ lane.status }}</p>
                  </div>
                </div>

                <div
                  frDropList
                  [frDropListData]="lane.tasks"
                  (frDropListDropped)="dropLane($event)"
                >
                  @for (task of lane.tasks; track task.id) {
                    <article frDrag [frDragData]="task" class="docs-dnd-task">
                      <button frDragHandle class="docs-dnd-handle" type="button" aria-label="Move card">
                        <ng-icon name="tablerGripVertical" size="18" />
                      </button>
                      <div class="docs-dnd-card-content">
                        <strong>{{ task.title }}</strong>
                        <span>{{ task.meta }}</span>
                        @if (task.owner) {
                          <small><ng-icon name="tablerUser" size="13" /> {{ task.owner }}</small>
                        }
                      </div>
                    </article>
                  }
                </div>
              </section>
            }
          </div>
        }

        @default {
          <div class="docs-dnd-panel docs-dnd-panel--compact">
            <div class="docs-dnd-heading">
              <div>
                <h3>Backlog list</h3>
                <p>A drop list can start as a simple ordered collection.</p>
              </div>
            </div>
            <div frDropList [frDropListData]="simpleList()" (frDropListDropped)="dropSimple($event)">
              @for (item of simpleList(); track item.id) {
                <article frDrag [frDragData]="item">
                  <button frDragHandle class="docs-dnd-handle" type="button" aria-label="Move item">
                    <ng-icon name="tablerGripVertical" size="18" />
                  </button>
                  <div class="docs-dnd-card-content">
                    <strong>{{ item.title }}</strong>
                    <span>{{ item.meta }}</span>
                  </div>
                </article>
              }
            </div>
          </div>
        }
      }
    </div>
  `,
  styles: `
    .docs-dnd-board {
      display: grid;
      gap: 1rem;
      width: 100%;
    }

    .docs-dnd-board--two {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .docs-dnd-board--swimlanes {
      grid-template-columns: repeat(3, minmax(14rem, 1fr));
      overflow-x: auto;
      padding-bottom: 0.25rem;
    }

    .docs-dnd-panel {
      display: grid;
      gap: 0.75rem;
      min-width: 0;
      border: 1px solid var(--frame-border);
      background: var(--frame-surface);
      padding: 0.875rem;
    }

    .docs-dnd-panel--compact {
      width: min(100%, 34rem);
      margin-inline: auto;
    }

    .docs-dnd-lane {
      min-width: 14rem;
    }

    .docs-dnd-heading {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 0.75rem;
    }

    .docs-dnd-heading h3 {
      margin: 0;
      font-size: 0.9375rem;
      font-weight: 650;
    }

    .docs-dnd-heading p {
      margin: 0.125rem 0 0;
      color: var(--frame-muted-foreground);
      font-size: 0.8125rem;
      line-height: 1.4;
    }

    .docs-dnd-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 2rem;
      height: 2rem;
      border: 1px solid var(--frame-border);
      background: var(--frame-background);
      color: var(--frame-muted-foreground);
    }

    .docs-dnd-handle {
      border: 0;
      background: transparent;
      padding: 0.125rem;
    }

    .docs-dnd-card-content {
      display: grid;
      gap: 0.25rem;
      min-width: 0;
    }

    .docs-dnd-card-content strong {
      font-size: 0.875rem;
      line-height: 1.3;
    }

    .docs-dnd-card-content span,
    .docs-dnd-card-content small {
      color: var(--frame-muted-foreground);
      font-size: 0.75rem;
      line-height: 1.35;
    }

    .docs-dnd-card-content small {
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
    }

    .docs-dnd-nested-card {
      align-items: flex-start;
    }

    .docs-dnd-child-list {
      margin-top: 0.5rem;
      --frame-drag-drop-gap: 0.375rem;
      --frame-drop-list-min-height: 2rem;
      --frame-drop-list-padding: 0.375rem;
      --frame-drop-list-bg: var(--frame-muted);
      --frame-drag-padding: 0.5rem;
      --frame-drag-shadow: none;
    }

    .docs-dnd-child-row {
      align-items: center;
    }

    @media (max-width: 760px) {
      .docs-dnd-board--two {
        grid-template-columns: 1fr;
      }
    }
  `,
})
export class DocsDragDropPreviewComponent {
  readonly config = input<DragDropPreviewConfig>({});

  readonly simpleList = signal<Task[]>([
    { id: 'research', title: 'Research interaction states', meta: 'Foundation' },
    { id: 'tokens', title: 'Map drag tokens', meta: 'Styling' },
    { id: 'docs', title: 'Draft usage examples', meta: 'Docs' },
  ]);

  readonly wholeElementTasks = signal<Task[]>([
    { id: 'row-a', title: 'Drag from anywhere on this row', meta: 'No handle required' },
    { id: 'row-b', title: 'Full-card gesture target', meta: 'Useful for compact lists' },
    { id: 'row-c', title: 'Content moves as one element', meta: 'The host owns frDrag' },
  ]);

  readonly checklist = signal<Task[]>([
    { id: 'audit', title: 'Audit keyboard paths', meta: 'Accessibility' },
    { id: 'motion', title: 'Review drag motion', meta: 'Interaction' },
    { id: 'handoff', title: 'Prepare release notes', meta: 'Delivery' },
    { id: 'publish', title: 'Publish package', meta: 'Release' },
  ]);

  readonly disabledTasks = signal<Task[]>([
    { id: 'copy', title: 'Can be moved', meta: 'Drag enabled' },
    { id: 'billing', title: 'Billing migration', meta: 'Requires approval', disabled: true },
    { id: 'release', title: 'Release notes', meta: 'Drag enabled' },
  ]);

  readonly nestedCards = signal<NestedCard[]>([
    {
      id: 'profile',
      title: 'Profile card',
      meta: 'Parent card with nested checklist',
      children: [
        { id: 'avatar', title: 'Avatar upload', meta: 'Nested' },
        { id: 'timezone', title: 'Timezone selector', meta: 'Nested' },
      ],
    },
    {
      id: 'billing',
      title: 'Billing card',
      meta: 'Independent child ordering',
      children: [
        { id: 'invoice', title: 'Invoice address', meta: 'Nested' },
        { id: 'tax', title: 'Tax ID field', meta: 'Nested' },
      ],
    },
  ]);

  readonly transferLists = signal<Lane[]>([
    {
      id: 'backlog',
      title: 'Backlog',
      status: 'Planned',
      tasks: [
        { id: 'filters', title: 'Add filter controls', meta: 'Feature' },
        { id: 'audit-log', title: 'Design audit log', meta: 'Research' },
        { id: 'bulk-edit', title: 'Batch edit flow', meta: 'UX' },
      ],
    },
    {
      id: 'done',
      title: 'Done',
      status: 'Shipped',
      tasks: [
        { id: 'tokens', title: 'Token migration', meta: 'System' },
        { id: 'empty-state', title: 'Empty state pass', meta: 'Polish' },
      ],
    },
  ]);

  readonly lanes = signal<Lane[]>([
    {
      id: 'todo',
      title: 'To do',
      status: 'Ready',
      tasks: [
        { id: 'copy', title: 'Tighten onboarding copy', meta: 'Low', owner: 'Mira' },
        { id: 'empty', title: 'Empty states QA', meta: 'Medium', owner: 'Ivo' },
      ],
    },
    {
      id: 'active',
      title: 'Active',
      status: 'In flight',
      tasks: [
        { id: 'dashboard', title: 'Dashboard drag cards', meta: 'High', owner: 'Noor' },
        { id: 'metrics', title: 'Metrics panel polish', meta: 'Medium', owner: 'Kai' },
      ],
    },
    {
      id: 'review',
      title: 'Review',
      status: 'Needs signoff',
      tasks: [
        { id: 'keyboard', title: 'Keyboard review', meta: 'High', owner: 'Ana' },
      ],
    },
  ]);

  dropSimple(event: CdkDragDrop<Task[]>): void {
    this.reorderSignal(this.simpleList, event);
  }

  dropWholeElement(event: CdkDragDrop<Task[]>): void {
    this.reorderSignal(this.wholeElementTasks, event);
  }

  reorderChecklist(event: CdkDragDrop<Task[]>): void {
    this.reorderSignal(this.checklist, event);
  }

  dropDisabled(event: CdkDragDrop<Task[]>): void {
    this.reorderSignal(this.disabledTasks, event);
  }

  dropNestedCard(event: CdkDragDrop<NestedCard[]>): void {
    this.nestedCards.update((cards) => {
      const next = cards.map((card) => ({ ...card, children: [...card.children] }));
      moveItemInArray(next, event.previousIndex, event.currentIndex);
      return next;
    });
  }

  dropNestedChild(cardId: string, event: CdkDragDrop<Task[]>): void {
    this.nestedCards.update((cards) =>
      cards.map((card) => {
        if (card.id !== cardId) {
          return card;
        }

        const children = [...card.children];
        moveItemInArray(children, event.previousIndex, event.currentIndex);
        return { ...card, children };
      }),
    );
  }

  dropTransfer(event: CdkDragDrop<Task[]>): void {
    this.transferLists.update((lists) => this.dropAcrossLists(lists, event));
  }

  dropLane(event: CdkDragDrop<Task[]>): void {
    this.lanes.update((lanes) => this.dropAcrossLists(lanes, event));
  }

  private reorderSignal(
    source: WritableSignal<Task[]>,
    event: CdkDragDrop<Task[]>,
  ): void {
    source.update((items) => {
      const next = [...items];
      moveItemInArray(next, event.previousIndex, event.currentIndex);
      return next;
    });
  }

  private dropAcrossLists(lists: Lane[], event: CdkDragDrop<Task[]>): Lane[] {
    const previousIndex = lists.findIndex((list) => list.tasks === event.previousContainer.data);
    const currentIndex = lists.findIndex((list) => list.tasks === event.container.data);
    const next = lists.map((list) => ({ ...list, tasks: [...list.tasks] }));
    const previous = next[previousIndex];
    const current = next[currentIndex];

    if (!previous || !current) {
      return next;
    }

    if (event.previousContainer === event.container) {
      moveItemInArray(current.tasks, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(previous.tasks, current.tasks, event.previousIndex, event.currentIndex);
    }

    return next;
  }
}
