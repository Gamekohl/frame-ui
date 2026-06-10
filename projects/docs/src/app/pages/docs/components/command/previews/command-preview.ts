import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { FrButtonModule } from '@frame-ui-ng/components/button';
import { FrCommandModule, FrCommandService } from '@frame-ui-ng/components/command';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  tablerCalendar,
  tablerCalculator,
  tablerCreditCard,
  tablerFile,
  tablerMoodSearch,
  tablerSearch,
  tablerSettings,
  tablerTerminal2,
  tablerUser,
} from '@ng-icons/tabler-icons';

export type CommandPreviewMode =
  | 'inline'
  | 'dialog'
  | 'shortcuts'
  | 'groups'
  | 'scrollable'
  | 'programmatic'
  | 'inspector'
  | 'rtl';

export type CommandPreviewConfig = {
  mode?: CommandPreviewMode;
  className?: string;
  style?: string;
};

const commandIcons = {
  tablerCalendar,
  tablerCalculator,
  tablerCreditCard,
  tablerFile,
  tablerMoodSearch,
  tablerSearch,
  tablerSettings,
  tablerTerminal2,
  tablerUser,
};

@Component({
  selector: 'docs-programmatic-command-body',
  imports: [
    FrCommandModule,
    NgIcon,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [provideIcons(commandIcons)],
  template: `
    <section frCommand closeOnSelect aria-label="Programmatic command menu">
      <input frCommandInput placeholder="Search programmatic commands..." />
      <div frCommandList>
        <p frCommandEmpty>No results found.</p>
        <div frCommandGroup heading="Actions">
          <p frCommandGroupHeading>Actions</p>
          <button frCommandItem value="calendar" label="Open calendar">
            <ng-icon frCommandItemIcon name="tablerCalendar" size="16" />
            <span>Open calendar</span>
          </button>
          <button frCommandItem value="settings" label="Open settings">
            <ng-icon frCommandItemIcon name="tablerSettings" size="16" />
            <span>Open settings</span>
            <span frCommandShortcut>⌘S</span>
          </button>
        </div>
      </div>
    </section>
  `,
})
export class DocsProgrammaticCommandBodyComponent {}

@Component({
  selector: 'docs-command-preview',
  imports: [
    FrButtonModule,
    FrCommandModule,
    NgTemplateOutlet,
    NgIcon,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [provideIcons(commandIcons)],
  template: `
    <div
      [class]="config().className ?? 'min-w-screen flex justify-center py-2'"
      [style]="config().style ?? null"
    >
      @switch (config().mode ?? 'inline') {
        @case ('dialog') {
          <button frButton [frCommandDialogTrigger]="commandDialog" type="button">
            <span frButtonLabel>Open Menu</span>
          </button>

          <ng-template #commandDialog="frCommandDialog" frCommandDialog aria-label="Command palette">
            <ng-container [ngTemplateOutlet]="commandMenu" />
          </ng-template>
        }

        @case ('shortcuts') {
          <button frButton [frCommandDialogTrigger]="shortcutDialog" type="button">
            <span frButtonLabel>Open Menu</span>
          </button>

          <ng-template #shortcutDialog="frCommandDialog" frCommandDialog aria-label="Command palette">
            <ng-container [ngTemplateOutlet]="shortcutCommandMenu" />
          </ng-template>
        }

        @case ('groups') {
          <button frButton [frCommandDialogTrigger]="groupDialog" type="button">
            <span frButtonLabel>Open Menu</span>
          </button>

          <ng-template #groupDialog="frCommandDialog" frCommandDialog aria-label="Command palette">
            <ng-container [ngTemplateOutlet]="groupCommandMenu" />
          </ng-template>
        }

        @case ('scrollable') {
          <button frButton [frCommandDialogTrigger]="scrollableDialog" type="button">
            <span frButtonLabel>Open Menu</span>
          </button>

          <ng-template #scrollableDialog="frCommandDialog" frCommandDialog aria-label="Command palette">
            <ng-container [ngTemplateOutlet]="scrollableCommandMenu" />
          </ng-template>
        }

        @case ('programmatic') {
          <button frButton type="button" (click)="openProgrammatic()">
            <span frButtonLabel>Open from code</span>
          </button>
        }

        @case ('inspector') {
          <section frCommand class="docs-command" data-token-target="command-root">
            <input
              frCommandInput
              placeholder="Type a command or search..."
              data-token-target="command-input"
            />
            <div frCommandList data-token-target="command-list">
              <p frCommandEmpty data-token-target="command-empty">No results found.</p>
              <div frCommandGroup heading="Suggestions" data-token-target="command-group">
                <p frCommandGroupHeading>Suggestions</p>
                <button frCommandItem value="calendar" label="Calendar" data-token-target="command-item">
                  <ng-icon frCommandItemIcon name="tablerCalendar" size="16" />
                  <span>Calendar</span>
                </button>
                <button frCommandItem value="emoji" label="Search Emoji">
                  <ng-icon frCommandItemIcon name="tablerMoodSearch" size="16" />
                  <span>Search Emoji</span>
                </button>
              </div>
              <div frCommandSeparator data-token-target="command-separator"></div>
              <div frCommandGroup heading="Settings">
                <p frCommandGroupHeading>Settings</p>
                <button frCommandItem value="profile" label="Profile">
                  <ng-icon frCommandItemIcon name="tablerUser" size="16" />
                  <span>Profile</span>
                  <span frCommandShortcut data-token-target="command-shortcut">⌘P</span>
                </button>
              </div>
            </div>
            <div frCommandFooter data-token-target="command-footer">
              <span><kbd>↑↓</kbd> to navigate</span>
              <span><kbd>↵</kbd> to select</span>
              <span><kbd>esc</kbd> to close</span>
            </div>
          </section>
        }

        @case ('rtl') {
          <section frCommand class="docs-command" dir="rtl">
            <input frCommandInput placeholder="ابحث عن أمر..." />
            <div frCommandList>
              <p frCommandEmpty>لم يتم العثور على نتائج.</p>
              <div frCommandGroup heading="اقتراحات">
                <p frCommandGroupHeading>اقتراحات</p>
                <button frCommandItem value="calendar" label="التقويم">
                  <ng-icon frCommandItemIcon name="tablerCalendar" size="16" />
                  <span>التقويم</span>
                </button>
                <button frCommandItem value="emoji" label="البحث عن الرموز التعبيرية">
                  <ng-icon frCommandItemIcon name="tablerMoodSearch" size="16" />
                  <span>البحث عن الرموز التعبيرية</span>
                </button>
                <button frCommandItem value="calculator" label="الآلة الحاسبة">
                  <ng-icon frCommandItemIcon name="tablerCalculator" size="16" />
                  <span>الآلة الحاسبة</span>
                </button>
              </div>
              <div frCommandSeparator></div>
              <div frCommandGroup heading="الإعدادات">
                <p frCommandGroupHeading>الإعدادات</p>
                <button frCommandItem value="profile" label="الملف الشخصي">
                  <ng-icon frCommandItemIcon name="tablerUser" size="16" />
                  <span>الملف الشخصي</span>
                  <span frCommandShortcut>⌘P</span>
                </button>
                <button frCommandItem value="billing" label="الفوترة">
                  <ng-icon frCommandItemIcon name="tablerCreditCard" size="16" />
                  <span>الفوترة</span>
                  <span frCommandShortcut>⌘B</span>
                </button>
              </div>
            </div>
          </section>
        }

        @default {
          <section frCommand class="docs-command">
            <div class="docs-command__input-wrap">
              <ng-icon class="docs-command__search-icon" name="tablerSearch" size="17" />
              <input frCommandInput placeholder="Type a command or search..." />
              <span class="docs-command__keys">
                <span frCommandShortcut>⌘</span>
                <span frCommandShortcut>K</span>
              </span>
            </div>
            <div frCommandList>
              <p frCommandEmpty>No results found.</p>
              <div frCommandGroup heading="Suggestions">
                <p frCommandGroupHeading>Suggested</p>
                <button frCommandItem value="file" label="Go to File">
                  <ng-icon frCommandItemIcon name="tablerFile" size="16" />
                  <span>Go to File</span>
                  <span frCommandShortcut>⌘ P</span>
                </button>
                <button frCommandItem value="symbol" label="Go to Symbol">
                  <ng-icon frCommandItemIcon name="tablerSearch" size="16" />
                  <span>Go to Symbol</span>
                  <span frCommandShortcut>⌘ ⇧ O</span>
                </button>
                <button frCommandItem value="commands" label="Show All Commands">
                  <ng-icon frCommandItemIcon name="tablerTerminal2" size="16" />
                  <span>Show All Commands</span>
                  <span frCommandShortcut>⌘ ⇧ P</span>
                </button>
                <button frCommandItem value="settings" label="Preferences: Open Settings">
                  <ng-icon frCommandItemIcon name="tablerSettings" size="16" />
                  <span>Preferences: Open Settings</span>
                  <span frCommandShortcut>⌘ ,</span>
                </button>
              </div>
            </div>
            <div frCommandFooter>
              <span><kbd>↑↓</kbd> to navigate</span>
              <span><kbd>↵</kbd> to select</span>
              <span><kbd>esc</kbd> to close</span>
            </div>
          </section>
        }
      }

      <ng-template #commandMenu>
        <section frCommand closeOnSelect aria-label="Command palette">
          <input frCommandInput placeholder="Search for a command to run..." />
          <div frCommandList>
            <p frCommandEmpty>No results found.</p>
            <div frCommandGroup heading="Suggestions">
              <p frCommandGroupHeading>Suggestions</p>
              <button frCommandItem value="calendar" label="Calendar">Calendar</button>
              <button frCommandItem value="emoji" label="Search Emoji">Search Emoji</button>
              <button frCommandItem value="calculator" label="Calculator">Calculator</button>
            </div>
          </div>
        </section>
      </ng-template>

      <ng-template #shortcutCommandMenu>
        <section frCommand closeOnSelect aria-label="Command palette">
          <input frCommandInput placeholder="Search for a command to run..." />
          <div frCommandList>
            <p frCommandEmpty>No results found.</p>
            <div frCommandGroup heading="Settings">
              <p frCommandGroupHeading>Settings</p>
              <button frCommandItem value="profile" label="Profile">
                <span>Profile</span>
                <span frCommandShortcut>⌘P</span>
              </button>
              <button frCommandItem value="billing" label="Billing">
                <span>Billing</span>
                <span frCommandShortcut>⌘B</span>
              </button>
              <button frCommandItem value="settings" label="Settings">
                <span>Settings</span>
                <span frCommandShortcut>⌘S</span>
              </button>
            </div>
          </div>
        </section>
      </ng-template>

      <ng-template #groupCommandMenu>
        <section frCommand closeOnSelect aria-label="Command palette">
          <input frCommandInput placeholder="Search for a command to run..." />
          <div frCommandList>
            <p frCommandEmpty>No results found.</p>
            <div frCommandGroup heading="Suggestions">
              <p frCommandGroupHeading>Suggestions</p>
              <button frCommandItem value="calendar" label="Calendar">
                <ng-icon frCommandItemIcon name="tablerCalendar" size="16" />
                <span>Calendar</span>
              </button>
              <button frCommandItem value="emoji" label="Search Emoji">
                <ng-icon frCommandItemIcon name="tablerMoodSearch" size="16" />
                <span>Search Emoji</span>
              </button>
            </div>
            <div frCommandSeparator></div>
            <div frCommandGroup heading="Settings">
              <p frCommandGroupHeading>Settings</p>
              <button frCommandItem value="profile" label="Profile">
                <ng-icon frCommandItemIcon name="tablerUser" size="16" />
                <span>Profile</span>
                <span frCommandShortcut>⌘P</span>
              </button>
            </div>
          </div>
        </section>
      </ng-template>

      <ng-template #scrollableCommandMenu>
        <section frCommand closeOnSelect aria-label="Command palette">
          <input frCommandInput placeholder="Search docs..." />
          <div frCommandList style="--frame-command-list-max-height: 14rem;">
            <p frCommandEmpty>No results found.</p>
            <div frCommandGroup heading="Components">
              <p frCommandGroupHeading>Components</p>
              @for (item of scrollableItems; track item) {
                <button frCommandItem [value]="item" [label]="item">{{ item }}</button>
              }
            </div>
          </div>
        </section>
      </ng-template>
    </div>
  `,
  styles: `
    .docs-command {
      width: min(100%, 36rem);
    }

    .docs-command__input-wrap {
      position: relative;
      display: grid;
      align-items: center;
    }

    .docs-command__input-wrap [frCommandInput] {
      padding-inline: 2.5rem 4.75rem;
    }

    .docs-command__search-icon {
      position: absolute;
      z-index: 1;
      inset-inline-start: 0.875rem;
      color: var(--frame-muted-foreground);
      pointer-events: none;
    }

    .docs-command__keys {
      position: absolute;
      z-index: 1;
      inset-inline-end: 0.5rem;
      display: inline-flex;
      gap: 0.25rem;
      pointer-events: none;
    }

  `,
})
export class DocsCommandPreviewComponent {
  private readonly command = inject(FrCommandService);

  readonly config = input<CommandPreviewConfig>({});
  readonly scrollableItems = [
    'Accordion',
    'Alert',
    'Avatar',
    'Badge',
    'Breadcrumb',
    'Button',
    'Calendar',
    'Card',
    'Carousel',
    'Checkbox',
    'Collapsible',
    'Combobox',
    'Command',
    'Dropdown Menu',
    'Input',
    'Modal',
    'Select',
    'Switch',
    'Textarea',
  ];

  openProgrammatic(): void {
    this.command.open(DocsProgrammaticCommandBodyComponent);
  }
}

