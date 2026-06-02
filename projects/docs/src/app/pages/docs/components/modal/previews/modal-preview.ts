import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { FrButtonModule } from '@frame-ui/components/button';
import { FrModalModule, FrModalService } from '@frame-ui/components/modal';

export type ModalPreviewConfig = {
  className?: string;
  mode?: 'basic' | 'disable-close' | 'inline' | 'no-close' | 'scrollable' | 'programmatic';
  style?: string;
  tokenPrefix?: string;
};

@Component({
  selector: 'docs-programmatic-modal-body',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="grid gap-3 text-sm leading-6 text-muted-foreground">
      <p>{{ summary() }}</p>
      <p>
        The body is a standalone Angular component rendered by
        <code>FrModalService.open()</code>, not a hidden template in this preview.
      </p>
    </div>
  `,
})
class DocsProgrammaticModalBodyComponent {
  readonly summary = input('Configure a focused workflow without sending people to a new route.');
}

@Component({
  selector: 'docs-modal-preview',
  host: {
    class: 'block w-full',
  },
  imports: [
    FrButtonModule,
    FrModalModule,
    NgTemplateOutlet,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      [class]="config().className ?? 'flex min-h-48 w-full items-center justify-center p-8'"
      [style]="config().style ?? null"
      [attr.data-token-target]="tokenTarget('trigger-area')"
    >
      @if (mode() === 'inline') {
        <ng-container [ngTemplateOutlet]="modalPanel" />
      } @else if (mode() === 'programmatic') {
        <button
          frButton
          type="button"
          (click)="openProgrammatic()"
          [attr.data-token-target]="tokenTarget('trigger')"
        >
          <span frButtonLabel>Open from code</span>
        </button>
      } @else {
        <button
          frButton
          type="button"
          [frModalTrigger]="mode() === 'disable-close' ? guardedModal : modal"
          [attr.data-token-target]="tokenTarget('trigger')"
        >
          <span frButtonLabel>{{ triggerLabel() }}</span>
        </button>
      }
    </div>

    <ng-template
      #modal="frModalContent"
      frModalContent
      aria-label="Workspace settings"
    >
      <div
        frModalPanel
        [size]="mode() === 'scrollable' ? 'lg' : 'md'"
        [showCloseButton]="mode() !== 'no-close'"
        [scrollable]="mode() === 'scrollable'"
        [stickyFooter]="mode() === 'scrollable'"
        [attr.data-token-target]="tokenTarget('panel')"
      >
        <div frModalHeader [attr.data-token-target]="tokenTarget('header')">
          <h2 frModalTitle [attr.data-token-target]="tokenTarget('title')">{{ title() }}</h2>
          <p frModalDescription [attr.data-token-target]="tokenTarget('description')">
            {{ description() }}
          </p>
        </div>

        <div frModalBody [attr.data-token-target]="tokenTarget('body')">
          @if (mode() === 'scrollable') {
            <div class="grid gap-3 text-sm leading-6 text-muted-foreground">
              @for (item of scrollItems; track item) {
                <p>{{ item }}</p>
              }
            </div>
          } @else {
            <span class="text-sm">Configure a focused workflow without sending people to a new route.</span>
          }
        </div>

        <div frModalFooter [attr.data-token-target]="tokenTarget('footer')">
          <button frButton appearance="outline" type="button" frModalClose>
            <span frButtonLabel>Cancel</span>
          </button>
          <button frButton type="button" [frModalClose]="'saved'">
            <span frButtonLabel>Save changes</span>
          </button>
        </div>
      </div>
    </ng-template>

    <ng-template
      #guardedModal="frModalContent"
      frModalContent
      aria-label="Unsaved changes"
      disableClose
    >
      <div frModalPanel [attr.data-token-target]="tokenTarget('panel')">
        <div frModalHeader [attr.data-token-target]="tokenTarget('header')">
          <h2 frModalTitle [attr.data-token-target]="tokenTarget('title')">{{ title() }}</h2>
          <p frModalDescription [attr.data-token-target]="tokenTarget('description')">
            {{ description() }}
          </p>
        </div>

        <div frModalBody [attr.data-token-target]="tokenTarget('body')">
          <span class="text-sm">Backdrop clicks are ignored for this modal.</span>
        </div>

        <div frModalFooter [attr.data-token-target]="tokenTarget('footer')">
          <button frButton appearance="outline" type="button" frModalClose>
            <span frButtonLabel>Cancel</span>
          </button>
          <button frButton type="button" [frModalClose]="'saved'">
            <span frButtonLabel>Save changes</span>
          </button>
        </div>
      </div>
    </ng-template>

    <ng-template #modalPanel>
      <div
        frModalPanel
        [size]="mode() === 'scrollable' ? 'lg' : 'md'"
        [showCloseButton]="mode() !== 'no-close'"
        [scrollable]="mode() === 'scrollable'"
        [stickyFooter]="mode() === 'scrollable'"
        [attr.data-token-target]="tokenTarget('panel')"
      >
        <div frModalHeader [attr.data-token-target]="tokenTarget('header')">
          <h2 frModalTitle [attr.data-token-target]="tokenTarget('title')">{{ title() }}</h2>
          <p frModalDescription [attr.data-token-target]="tokenTarget('description')">
            {{ description() }}
          </p>
        </div>

        <div frModalBody [attr.data-token-target]="tokenTarget('body')">
          @if (mode() === 'scrollable') {
            <div class="grid gap-3 text-sm leading-6 text-muted-foreground">
              @for (item of scrollItems; track item) {
                <p>{{ item }}</p>
              }
            </div>
          } @else {
            Configure a focused workflow without sending people to a new route.
          }
        </div>

        <div frModalFooter [attr.data-token-target]="tokenTarget('footer')">
          <button frButton appearance="outline" type="button" frModalClose>
            <span frButtonLabel>Cancel</span>
          </button>
          <button frButton type="button" [frModalClose]="'saved'">
            <span frButtonLabel>Save changes</span>
          </button>
        </div>
      </div>
    </ng-template>
  `,
})
export class DocsModalPreviewComponent {
  readonly config = input<ModalPreviewConfig>({});

  private readonly modal = inject(FrModalService);

  protected readonly scrollItems = [
    'Review modal content carefully when it includes long forms or multi-step decisions.',
    'The body can scroll independently while the footer stays reachable for confirmation actions.',
    'Use this pattern when closing the modal should not hide the primary decision controls.',
    'Angular CDK Dialog keeps focus management, escape handling, and backdrop behavior centralized.',
    'The component primitives only define the composition surface and styling hooks.',
    'This makes the modal easier to customize without reimplementing overlay behavior.',
    'Scrollable content should be long enough to prove the footer stays available.',
    'This final paragraph gives the preview enough height to exercise overflow behavior.',
    'Keep destructive or expensive actions visible in the footer instead of hiding them below long content.',
    'The modal panel owns the height while the modal body owns the scroll behavior.',
    'That distinction is useful because it keeps the layout predictable on small screens.',
    'It also avoids making the whole overlay page scroll when only the dialog content should move.',
    'Use this pattern sparingly: if a flow becomes too long, a dedicated route may be easier to understand.',
    'For focused forms, though, a scrollable modal can keep context and actions close together.',
  ];

  protected mode(): ModalPreviewConfig['mode'] {
    return this.config().mode ?? 'basic';
  }

  protected triggerLabel(): string {
    if (this.mode() === 'no-close') {
      return 'Open without close icon';
    }

    if (this.mode() === 'scrollable') {
      return 'Open scrollable modal';
    }

    if (this.mode() === 'disable-close') {
      return 'Open guarded modal';
    }

    return 'Open modal';
  }

  protected title(): string {
    if (this.mode() === 'no-close') {
      return 'Confirm deployment';
    }

    if (this.mode() === 'disable-close') {
      return 'Unsaved changes';
    }

    return 'Workspace settings';
  }

  protected description(): string {
    if (this.mode() === 'scrollable') {
      return 'Use a scrollable body with a sticky footer for longer modal workflows.';
    }

    if (this.mode() === 'no-close') {
      return 'Omit the default close button when the action needs an explicit choice.';
    }

    if (this.mode() === 'disable-close') {
      return 'Backdrop clicks are ignored, so users must choose one of the explicit controls.';
    }

    return 'A composable modal built on top of Angular CDK Dialog.';
  }

  protected openProgrammatic(): void {
    this.modal.open(DocsProgrammaticModalBodyComponent, {
      bodyInputs: {
        summary: 'This content is rendered from a dedicated body component.',
      },
      description: 'The shell is configured through FrModalConfig.',
      footerActions: [
        {
          appearance: 'outline',
          label: 'Cancel',
          result: 'cancel',
        },
        {
          label: 'Save changes',
          result: 'saved',
        },
      ],
      title: 'Programmatic workspace settings',
      width: '32rem',
      ariaLabel: 'Programmatic workspace settings',
    });
  }

  protected tokenTarget(key: string): string | null {
    const prefix = this.config().tokenPrefix;
    return prefix ? `${prefix}-${key}` : null;
  }
}

