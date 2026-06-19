import { ComponentDoc } from '../../shared/models/component-doc.model';
import { DocsDragDropPreviewComponent } from './previews/drag-drop-preview';

const dragDropImportsCode = `import {
  CdkDragDrop,
  FrDragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@frame-ui-ng/components/drag-drop';`;

const singleListTs = `readonly items = [
  { id: 'research', title: 'Research interaction states' },
  { id: 'tokens', title: 'Map drag tokens' },
  { id: 'docs', title: 'Draft usage examples' },
];

drop(event: CdkDragDrop<Array<{ id: string; title: string }>>): void {
  moveItemInArray(this.items, event.previousIndex, event.currentIndex);
}`;

const usageListTs = `readonly tasks = [
  { id: 'audit', title: 'Audit keyboard paths' },
  { id: 'motion', title: 'Review drag motion' },
  { id: 'publish', title: 'Publish package' },
];

drop(event: CdkDragDrop<Array<{ id: string; title: string }>>): void {
  moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
}`;

const transferListTs = `readonly lists = [
  {
    id: 'backlog',
    title: 'Backlog',
    tasks: [
      { id: 'filters', title: 'Add filter controls' },
      { id: 'audit-log', title: 'Design audit log' },
    ],
  },
  {
    id: 'done',
    title: 'Done',
    tasks: [
      { id: 'tokens', title: 'Token migration' },
    ],
  },
];

drop(event: CdkDragDrop<Array<{ id: string; title: string }>>): void {
  if (event.previousContainer === event.container) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    return;
  }

  transferArrayItem(
    event.previousContainer.data,
    event.container.data,
    event.previousIndex,
    event.currentIndex,
  );
}`;

const nestedTs = `readonly cards = [
  {
    id: 'profile',
    title: 'Profile card',
    children: [
      { id: 'avatar', title: 'Avatar upload' },
      { id: 'timezone', title: 'Timezone selector' },
    ],
  },
  {
    id: 'billing',
    title: 'Billing card',
    children: [
      { id: 'invoice', title: 'Invoice address' },
      { id: 'tax', title: 'Tax ID field' },
    ],
  },
];

dropCard(
  event: CdkDragDrop<Array<{
    id: string;
    title: string;
    children: Array<{ id: string; title: string }>;
  }>>,
): void {
  moveItemInArray(this.cards, event.previousIndex, event.currentIndex);
}

dropChild(
  cardId: string,
  event: CdkDragDrop<Array<{ id: string; title: string }>>,
): void {
  const card = this.cards.find((item) => item.id === cardId);

  if (card) {
    moveItemInArray(card.children, event.previousIndex, event.currentIndex);
  }
}`;

const disabledTs = `readonly task = {
  id: 'billing',
  title: 'Billing migration',
  locked: true,
};`;

const swimlaneTs = `readonly lanes = [
  {
    id: 'todo',
    title: 'To do',
    tasks: [
      { id: 'copy', title: 'Tighten onboarding copy' },
      { id: 'empty', title: 'Empty states QA' },
    ],
  },
  {
    id: 'active',
    title: 'Active',
    tasks: [
      { id: 'dashboard', title: 'Dashboard drag cards' },
    ],
  },
];

dropLane(event: CdkDragDrop<Array<{ id: string; title: string }>>): void {
  if (event.previousContainer === event.container) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    return;
  }

  transferArrayItem(
    event.previousContainer.data,
    event.container.data,
    event.previousIndex,
    event.currentIndex,
  );
}`;

export const DRAG_DROP_DOC: ComponentDoc = {
  slug: 'drag-drop',
  breadcrumb: 'Components / Drag Drop',

  hero: {
    id: 'drag-drop-hero',
    title: 'Preview',
    preview: {
      component: DocsDragDropPreviewComponent,
      inputs: {
        config: { mode: 'swimlanes' },
      },
    },
  },

  installation: {
    cli: {
      language: 'bash',
      code: 'npx your-cli add drag-drop',
    },
    manual: {
      steps: [
        {
          title: 'Import the drag and drop primitives.',
          code: {
            language: 'ts',
            code: dragDropImportsCode,
          },
        },
        {
          title: 'Update the backing arrays when a drop completes.',
          description:
            'The CDK moves DOM placeholders while dragging, but your data model still needs to be updated in the drop handler.',
          code: {
            language: 'ts',
            code: `drop(event: CdkDragDrop<Task[]>): void {
  if (event.previousContainer === event.container) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  } else {
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex,
    );
  }
}`,
          },
        },
      ],
    },
  },

  usage: [
    {
      language: 'ts',
      code: dragDropImportsCode,
    },
    {
      language: 'ts',
      code: usageListTs,
    },
    {
      language: 'html',
      code: `<div frDropList [frDropListData]="tasks" (frDropListDropped)="drop($event)">
  @for (task of tasks; track task.id) {
    <article frDrag [frDragData]="task">
      {{ task.title }}
    </article>
  }
</div>`,
    },
  ],

  tokenInspector: {
    id: 'token-inspector',
    title: 'Token inspector',
    description:
      'Inspect the list surface, draggable item, placeholder, preview, and drag handle tokens that shape drag-and-drop density and interaction treatment.',
    preview: {
      component: DocsDragDropPreviewComponent,
      inputs: {
        config: { mode: 'list' },
      },
      inspectorTargets: [
        {
          id: 'list',
          label: 'Drop list',
          selector: '[frDropList]',
          description:
            'The drop list token set controls the receiving surface, spacing, minimum height, and active drag border.',
          tokens: [
            '--frame-drop-list-min-height',
            '--frame-drop-list-padding',
            '--frame-drop-list-radius',
            '--frame-drop-list-bg',
            '--frame-drop-list-border',
            '--frame-drop-list-hover-border',
          ],
        },
        {
          id: 'drag',
          label: 'Drag item',
          selector: '[frDrag]',
          description:
            'Drag item tokens control the row surface, spacing, shadow, radius, and hover state.',
          tokens: [
            '--frame-drag-gap',
            '--frame-drag-padding',
            '--frame-drag-radius',
            '--frame-drag-bg',
            '--frame-drag-border',
            '--frame-drag-shadow',
            '--frame-drag-hover-bg',
          ],
        },
        {
          id: 'handle',
          label: 'Drag handle',
          selector: '[frDragHandle]',
          description:
            'The handle provides a focused movement affordance while leaving the rest of the card available for content and actions.',
          tokens: ['--frame-drag-handle-color', '--frame-drag-handle-hover-color'],
        },
      ],
    },
  },

  composition:
    'FrameUI drag and drop primitives wrap Angular CDK Drag&Drop. Use `frDropList` for receiving containers, `frDrag` for draggable items, `frDragHandle` when only part of an item should start dragging, and `frDragDropGroup` when a dynamic set of lists should connect automatically. Applying `frDrag` to an element makes the whole host draggable unless a handle is projected.',

  examples: [
    {
      id: 'whole-element',
      title: 'Basic',
      description:
        'Apply `frDrag` to the host when the full row or card should be draggable. No handle is required.',
      preview: {
        component: DocsDragDropPreviewComponent,
        inputs: {
          config: { mode: 'whole-element' },
        },
      },
      code: [
        {
          language: 'ts',
          code: dragDropImportsCode,
        },
        {
          language: 'ts',
          code: singleListTs,
        },
        {
          language: 'html',
          code: `<div frDropList [frDropListData]="items" (frDropListDropped)="drop($event)">
  @for (item of items; track item.id) {
    <article frDrag [frDragData]="item">
      <span>{{ item.title }}</span>
    </article>
  }
</div>`,
        },
      ],
    },
    {
      id: 'handles',
      title: 'Drag handles',
      description:
        'Add `frDragHandle` when dragging should only start from a specific affordance inside the draggable item.',
      preview: {
        component: DocsDragDropPreviewComponent,
        inputs: {
          config: { mode: 'handles' },
        },
      },
      code: [
        {
          language: 'ts',
          code: dragDropImportsCode,
        },
        {
          language: 'ts',
          code: singleListTs,
        },
        {
          language: 'html',
          code: `<div frDropList [frDropListData]="items" (frDropListDropped)="drop($event)">
  @for (item of items; track item.id) {
    <article frDrag [frDragData]="item">
      <button frDragHandle type="button" aria-label="Move item">::</button>
      <span>{{ item.title }}</span>
    </article>
  }
</div>`,
        },
      ],
    },
    {
      id: 'list',
      title: 'List',
      description:
        'Start with a single drop list when you need a simple draggable collection with FrameUI surfaces.',
      preview: {
        component: DocsDragDropPreviewComponent,
        inputs: {
          config: { mode: 'list' },
        },
      },
      code: [
        {
          language: 'ts',
          code: dragDropImportsCode,
        },
        {
          language: 'ts',
          code: singleListTs,
        },
        {
          language: 'html',
          code: `<div frDropList [frDropListData]="items" (frDropListDropped)="drop($event)">
  @for (item of items; track item.id) {
    <article frDrag [frDragData]="item">
      <button frDragHandle type="button" aria-label="Move item">::</button>
      <span>{{ item.title }}</span>
    </article>
  }
</div>`,
        },
      ],
    },
    {
      id: 'reordering',
      title: 'Reordering',
      description:
        'Use `moveItemInArray` in the drop handler to persist the visual order back into the source array.',
      preview: {
        component: DocsDragDropPreviewComponent,
        inputs: {
          config: { mode: 'reorder' },
        },
      },
      code: [
        {
          language: 'ts',
          code: `import { CdkDragDrop, moveItemInArray } from '@frame-ui-ng/components/drag-drop';`,
        },
        {
          language: 'ts',
          code: usageListTs,
        },
      ],
    },
    {
      id: 'between-lists',
      title: 'Drag and drop between lists',
      description:
        'Wrap related lists in `frDragDropGroup` to auto-connect them, then use `transferArrayItem` when an item crosses containers.',
      preview: {
        component: DocsDragDropPreviewComponent,
        inputs: {
          config: { mode: 'between-lists' },
        },
      },
      code: [
        {
          language: 'ts',
          code: dragDropImportsCode,
        },
        {
          language: 'ts',
          code: transferListTs,
        },
        {
          language: 'html',
          code: `<div frDragDropGroup>
  @for (list of lists; track list.id) {
    <section>
      <h3>{{ list.title }}</h3>
      <div
        frDropList
        [frDropListData]="list.tasks"
        (frDropListDropped)="drop($event)"
      >
        @for (task of list.tasks; track task.id) {
          <article frDrag [frDragData]="task">{{ task.title }}</article>
        }
      </div>
    </section>
  }
</div>`,
        },
      ],
    },
    {
      id: 'nested-draggables',
      title: 'Nested draggables',
      description:
        'Use handles on the outer draggable when a card contains its own nested draggable rows. This keeps child drag gestures from accidentally starting the parent drag.',
      preview: {
        component: DocsDragDropPreviewComponent,
        inputs: {
          config: { mode: 'nested' },
        },
      },
      code: [
        {
          language: 'ts',
          code: dragDropImportsCode,
        },
        {
          language: 'ts',
          code: nestedTs,
        },
        {
          language: 'html',
          code: `<div frDropList [frDropListData]="cards" (frDropListDropped)="dropCard($event)">
  @for (card of cards; track card.id) {
    <article frDrag [frDragData]="card">
      <button frDragHandle type="button" aria-label="Move card">::</button>

      <div
        frDropList
        [frDropListData]="card.children"
        (frDropListDropped)="dropChild(card.id, $event)"
      >
        @for (child of card.children; track child.id) {
          <div frDrag [frDragData]="child">
            <button frDragHandle type="button" aria-label="Move child">::</button>
            {{ child.title }}
          </div>
        }
      </div>
    </article>
  }
</div>`,
        },
      ],
    },
    {
      id: 'disabled-dragging',
      title: 'Disabled dragging',
      description:
        'Disable a draggable item with `frDragDisabled`. Disable the projected handle too when the handle should reflect the same unavailable state.',
      preview: {
        component: DocsDragDropPreviewComponent,
        inputs: {
          config: { mode: 'disabled' },
        },
      },
      code: [
        {
          language: 'ts',
          code: dragDropImportsCode,
        },
        {
          language: 'ts',
          code: disabledTs,
        },
        {
          language: 'html',
          code: `<article frDrag [frDragData]="task" [frDragDisabled]="task.locked">
  <button
    frDragHandle
    type="button"
    aria-label="Move task"
    [frDragHandleDisabled]="task.locked"
  >
    ::
  </button>
  {{ task.title }}
</article>`,
        },
      ],
    },
    {
      id: 'swimlanes',
      title: 'Swimlanes',
      description:
        'Use the same grouped-list pattern for kanban boards and status swimlanes where every lane can receive cards.',
      preview: {
        component: DocsDragDropPreviewComponent,
        inputs: {
          config: { mode: 'swimlanes' },
        },
      },
      code: [
        {
          language: 'ts',
          code: dragDropImportsCode,
        },
        {
          language: 'ts',
          code: swimlaneTs,
        },
        {
          language: 'html',
          code: `<div frDragDropGroup class="board">
  @for (lane of lanes; track lane.id) {
    <section class="lane">
      <h3>{{ lane.title }}</h3>
      <div
        frDropList
        [frDropListData]="lane.tasks"
        (frDropListDropped)="dropLane($event)"
      >
        @for (task of lane.tasks; track task.id) {
          <article frDrag [frDragData]="task">
            <button frDragHandle type="button" aria-label="Move card">::</button>
            {{ task.title }}
          </article>
        }
      </div>
    </section>
  }
</div>`,
        },
      ],
    },
  ],

  styling: {
    description:
      'Override the drag and drop tokens on a local wrapper when a board needs denser cards, stronger previews, or a different receiving surface.',
    preview: {
      id: 'custom-styling-preview',
      title: 'Custom Styling Preview',
      description:
        'This preview tightens the list surface, changes the active drag border, and gives draggable rows a compact card treatment.',
      preview: {
        component: DocsDragDropPreviewComponent,
        inputs: {
          config: {
            mode: 'reorder',
            style: `--frame-drop-list-padding: 0.375rem;
--frame-drop-list-radius: 0;
--frame-drop-list-hover-border: var(--frame-primary);
--frame-drag-padding: 0.75rem;
--frame-drag-radius: 0;
--frame-drag-shadow: none;`,
          },
        },
      },
      code: [
        {
          language: 'css',
          code: `.compact-board {
  --frame-drop-list-padding: 0.375rem;
  --frame-drop-list-radius: 0;
  --frame-drop-list-hover-border: var(--frame-primary);
  --frame-drag-padding: 0.75rem;
  --frame-drag-radius: 0;
  --frame-drag-shadow: none;
}`,
        },
      ],
    },
  },

  tokensTitle: 'Design Tokens',
  tokensDescription:
    'Use these CSS custom properties to tune drag surfaces, drop-list spacing, placeholders, previews, and handle affordances.',
  tokens: `
  --frame-drag-drop-gap: 0.75rem;
  --frame-drag-drop-group-gap: 1rem;
  --frame-drop-list-min-height: 3.5rem;
  --frame-drop-list-padding: 0.5rem;
  --frame-drop-list-radius: var(--frame-radius-lg);
  --frame-drop-list-bg: var(--frame-surface);
  --frame-drop-list-border: var(--frame-border);
  --frame-drop-list-hover-border: color-mix(in srgb, var(--frame-primary) 45%, var(--frame-border));
  --frame-drag-gap: 0.75rem;
  --frame-drag-padding: 0.875rem;
  --frame-drag-radius: var(--frame-radius-md);
  --frame-drag-bg: var(--frame-background);
  --frame-drag-color: var(--frame-foreground);
  --frame-drag-border: var(--frame-border);
  --frame-drag-shadow: var(--frame-shadow-xs);
  --frame-drag-hover-bg: var(--frame-accent);
  --frame-drag-preview-shadow: var(--frame-shadow-xl);
  --frame-drag-placeholder-opacity: 0.24;
  --frame-drag-sort-duration: 250ms;
  --frame-drag-sort-easing: cubic-bezier(0, 0, 0.2, 1);
  --frame-drag-handle-color: var(--frame-muted-foreground);
  --frame-drag-handle-hover-color: var(--frame-foreground);
  `,
};
