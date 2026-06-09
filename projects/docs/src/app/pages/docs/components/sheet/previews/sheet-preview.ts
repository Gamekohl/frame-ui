import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { FrButtonModule } from '@frame-ui-ng/components/button';
import { FrCardModule } from '@frame-ui-ng/components/card';
import { FrCheckboxModule } from '@frame-ui-ng/components/checkbox';
import { FrInputModule } from '@frame-ui-ng/components/input';
import { FrSheetModule, FrSheetService, FrSheetSide } from '@frame-ui-ng/components/sheet';

export type SheetPreviewMode =
  | 'basic'
  | 'custom-styling'
  | 'inspector'
  | 'no-close'
  | 'programmatic'
  | 'rtl'
  | 'scrollable'
  | 'side';

export type SheetPreviewConfig = {
  mode: SheetPreviewMode;
  side?: FrSheetSide;
  tokenPrefix?: string;
};

@Component({
  selector: 'docs-programmatic-sheet-body',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="docs-sheet-body-copy">
      <p>{{ summary() }}</p>
      <p>This body is rendered as a dedicated Angular component inside a configured sheet shell.</p>
    </div>
  `,
  styles: `
    .docs-sheet-body-copy {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      color: var(--frame-muted-foreground);
      font-size: 0.875rem;
      line-height: 1.6;
    }

    .docs-sheet-body-copy p {
      margin: 0;
    }
  `,
})
class DocsProgrammaticSheetBodyComponent {
  readonly summary = input('Review the generated setup before applying it to the workspace.');
}

@Component({
  selector: 'docs-sheet-preview',
  host: {
    class: 'block w-full',
  },
  imports: [
    FrButtonModule,
    FrCardModule,
    FrCheckboxModule,
    FrInputModule,
    FrSheetModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (mode() === 'side') {
      <div class="docs-sheet-side-grid">
        @for (side of sides; track side) {
          <button frButton appearance="outline" type="button" [frSheetTrigger]="sideSheet">
            <span frButtonLabel>{{ side }}</span>
          </button>

          <ng-template #sideSheet="frSheetContent" frSheetContent [attr.aria-label]="side + ' sheet'">
            <div frSheetPanel [side]="side">
              <div frSheetHeader>
                <h2 frSheetTitle>{{ sideLabel(side) }} sheet</h2>
                <p frSheetDescription>Sheets can enter from any screen edge.</p>
              </div>
              <div frSheetBody>
                <p class="docs-sheet-copy">Use the side that best preserves the current page context.</p>
              </div>
            </div>
          </ng-template>
        }
      </div>
    } @else if (mode() === 'programmatic') {
      <div class="docs-sheet-center">
        <button frButton type="button" (click)="openProgrammatic()">
          <span frButtonLabel>Open from code</span>
        </button>
      </div>
    } @else {
      <div
        class="docs-sheet-center"
        [class.docs-sheet-center--custom]="mode() === 'custom-styling'"
        [attr.data-token-target]="tokenTarget('trigger-area')"
      >
        <button
          frButton
          type="button"
          [appearance]="mode() === 'custom-styling' ? 'outline' : 'primary'"
          [frSheetTrigger]="sheet"
          [attr.data-token-target]="tokenTarget('trigger')"
        >
          <span frButtonLabel>{{ triggerLabel() }}</span>
        </button>
      </div>

      <ng-template
        #sheet="frSheetContent"
        frSheetContent
        [attr.aria-label]="ariaLabel()"
        [direction]="mode() === 'rtl' ? 'rtl' : null"
      >
        <div
          frSheetPanel
          [side]="side()"
          [scrollable]="mode() === 'scrollable'"
          [showCloseButton]="mode() !== 'no-close'"
          [class.docs-sheet-panel-custom]="mode() === 'custom-styling'"
          [attr.data-token-target]="tokenTarget('panel')"
        >
          <div frSheetHeader [attr.data-token-target]="tokenTarget('header')">
            <h2 frSheetTitle [attr.data-token-target]="tokenTarget('title')">{{ title() }}</h2>
            <p frSheetDescription [attr.data-token-target]="tokenTarget('description')">
              {{ description() }}
            </p>
          </div>

          <div frSheetBody [attr.data-token-target]="tokenTarget('body')">
            @if (mode() === 'scrollable') {
              <div class="docs-sheet-filter-stack">
                @for (item of scrollItems; track item) {
                  <label frCard frCheckboxField spacing="sm" class="docs-sheet-filter-card hover:bg-foreground/10!">
                    <span>
                      <strong>{{ item.title }}</strong>
                      <small>{{ item.description }}</small>
                    </span>
                    <input frCheckbox type="checkbox" [checked]="item.checked" />
                  </label>
                }
              </div>
            } @else if (mode() === 'rtl') {
              <label class="docs-sheet-field">
                <span>اسم المساحة</span>
                <input frInput value="مساحة المنتج" />
              </label>
            } @else {
              <label class="docs-sheet-field">
                <span>Workspace name</span>
                <input frInput value="Component library" />
              </label>
            }
          </div>

          <div frSheetFooter [attr.data-token-target]="tokenTarget('footer')">
            <button frButton appearance="outline" type="button" frSheetClose>
              <span frButtonLabel>{{ mode() === 'rtl' ? 'إلغاء' : 'Cancel' }}</span>
            </button>
            <button frButton type="button" [frSheetClose]="'saved'">
              <span frButtonLabel>{{ mode() === 'rtl' ? 'حفظ' : 'Save changes' }}</span>
            </button>
          </div>
        </div>
      </ng-template>
    }
  `,
  styles: `
    .docs-sheet-center,
    .docs-sheet-side-grid {
      display: flex;
      min-height: 12rem;
      width: 100%;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      padding: 2rem;
    }

    .docs-sheet-side-grid {
      flex-wrap: wrap;
    }

    .docs-sheet-center--custom {
      --frame-sheet-bg: color-mix(in srgb, var(--frame-primary) 8%, var(--frame-background));
      --frame-sheet-border: color-mix(in srgb, var(--frame-primary) 30%, var(--frame-border));
      --frame-sheet-inline-size: min(100vw, 32rem);
    }

    .docs-sheet-panel-custom {
      --frame-sheet-bg: linear-gradient(145deg, var(--frame-background), color-mix(in srgb, var(--frame-primary) 10%, var(--frame-background)));
      --frame-sheet-border: color-mix(in srgb, var(--frame-primary) 32%, var(--frame-border));
      --frame-sheet-shadow: 0 28px 90px color-mix(in srgb, var(--frame-primary) 22%, rgb(0 0 0 / 0.22));
    }

    .docs-sheet-copy {
      color: var(--frame-muted-foreground);
      font-size: 0.875rem;
      line-height: 1.6;
    }

    .docs-sheet-copy {
      margin: 0;
    }

    .docs-sheet-filter-stack {
      display: grid;
      gap: 0.75rem;
      padding-block-end: 0.5rem;
    }

    .docs-sheet-filter-card {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      padding-inline: 1rem;
      gap: 1rem;
      cursor: pointer;
      color: var(--frame-foreground);
    }

    .docs-sheet-filter-card span {
      display: grid;
      gap: 0.25rem;
    }

    .docs-sheet-filter-card small {
      color: var(--frame-muted-foreground);
      font-size: 0.8125rem;
      font-weight: 400;
      line-height: 1.45;
    }

    .docs-sheet-field {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      color: var(--frame-foreground);
      font-size: 0.875rem;
      font-weight: 600;
    }
  `,
})
export class DocsSheetPreviewComponent {
  readonly config = input.required<SheetPreviewConfig>();

  private readonly sheet = inject(FrSheetService);

  protected readonly sides: FrSheetSide[] = ['top', 'right', 'bottom', 'left'];
  protected readonly scrollItems = [
    {
      title: 'Unread activity',
      description: 'Show only updates that have not been reviewed by the current user.',
      checked: true,
    },
    {
      title: 'Assigned to me',
      description: 'Include tasks, reviews, and follow-ups where ownership is explicit.',
      checked: true,
    },
    {
      title: 'Mentions',
      description: 'Surface comments that reference your account or one of your teams.',
      checked: false,
    },
    {
      title: 'Build failures',
      description: 'Keep failed checks visible while hiding passing automation noise.',
      checked: true,
    },
    {
      title: 'Design changes',
      description: 'Include updates touching tokens, visual polish, layout, or content hierarchy.',
      checked: false,
    },
    {
      title: 'Documentation',
      description: 'Show component docs, examples, snippets, and usage guidance updates.',
      checked: true,
    },
    {
      title: 'Dependencies',
      description: 'Review dependency updates, lockfile changes, and framework migrations.',
      checked: false,
    },
    {
      title: 'Security',
      description: 'Prioritize authentication, authorization, package, and policy-related changes.',
      checked: true,
    },
    {
      title: 'Accessibility',
      description: 'Show updates that affect focus order, semantics, keyboard behavior, or contrast.',
      checked: true,
    },
    {
      title: 'Performance',
      description: 'Include rendering, bundle, hydration, and interaction latency improvements.',
      checked: false,
    },
    {
      title: 'Component API',
      description: 'Track input, output, selector, token, and composition changes.',
      checked: true,
    },
    {
      title: 'Needs follow-up',
      description: 'Keep unresolved threads visible even after the main task is complete.',
      checked: false,
    },
  ];

  protected mode(): SheetPreviewMode {
    return this.config().mode;
  }

  protected side(): FrSheetSide {
    return this.config().side ?? (this.mode() === 'rtl' ? 'left' : 'right');
  }

  protected title(): string {
    if (this.mode() === 'no-close') {
      return 'Review export';
    }

    if (this.mode() === 'scrollable') {
      return 'Filter activity';
    }

    if (this.mode() === 'rtl') {
      return 'إعدادات المساحة';
    }

    return 'Workspace settings';
  }

  protected description(): string {
    if (this.mode() === 'no-close') {
      return 'The default close icon is hidden, so users choose one of the footer actions.';
    }

    if (this.mode() === 'scrollable') {
      return 'Long sheet content scrolls inside the panel while actions stay available.';
    }

    if (this.mode() === 'rtl') {
      return 'تعمل خصائص الاتجاه والمنطق البصري مع تخطيطات RTL.';
    }

    return 'A sheet keeps related controls close without leaving the current page.';
  }

  protected triggerLabel(): string {
    if (this.mode() === 'no-close') {
      return 'Open without close icon';
    }

    if (this.mode() === 'scrollable') {
      return 'Open filter sheet';
    }

    if (this.mode() === 'rtl') {
      return 'فتح';
    }

    return 'Open sheet';
  }

  protected ariaLabel(): string {
    return this.mode() === 'rtl' ? 'إعدادات المساحة' : this.title();
  }

  protected sideLabel(side: FrSheetSide): string {
    return side[0].toUpperCase() + side.slice(1);
  }

  protected openProgrammatic(): void {
    this.sheet.open(DocsProgrammaticSheetBodyComponent, {
      ariaLabel: 'Programmatic setup sheet',
      bodyInputs: {
        summary: 'Configure a generated setup without adding a hidden sheet template to the page.',
      },
      description: 'The title, description, footer actions, side, and body component come from FrSheetConfig.',
      footerActions: [
        {
          appearance: 'outline',
          label: 'Cancel',
          result: 'cancel',
        },
        {
          label: 'Apply setup',
          result: 'applied',
        },
      ],
      side: 'right',
      title: 'Generated setup',
    });
  }

  protected tokenTarget(key: string): string | null {
    const prefix = this.config().tokenPrefix;
    return prefix ? `${prefix}-${key}` : null;
  }
}

