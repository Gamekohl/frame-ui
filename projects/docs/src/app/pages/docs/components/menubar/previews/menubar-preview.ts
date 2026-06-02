import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { FrMenubarModule } from '@frame-ui/components/menubar';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  tablerCheck,
  tablerCopy,
  tablerDeviceFloppy,
  tablerEdit,
  tablerFile,
  tablerFileText,
  tablerFolder,
  tablerPalette,
  tablerPrinter,
  tablerShare,
  tablerUser,
} from '@ng-icons/tabler-icons';

export type MenubarPreviewMode =
  | 'basic'
  | 'checkbox'
  | 'icons'
  | 'inspector'
  | 'radio'
  | 'rtl'
  | 'submenu';

export type MenubarPreviewConfig = {
  mode?: MenubarPreviewMode;
  className?: string;
  style?: string;
};

@Component({
  selector: 'docs-menubar-preview',
  imports: [
    FrMenubarModule,
    NgIcon,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    provideIcons({
      tablerCheck,
      tablerCopy,
      tablerDeviceFloppy,
      tablerEdit,
      tablerFile,
      tablerFileText,
      tablerFolder,
      tablerPalette,
      tablerPrinter,
      tablerShare,
      tablerUser,
    }),
  ],
  template: `
    <div [class]="config().className ?? 'flex items-start justify-center'" [style]="config().style ?? null">
      @switch (config().mode ?? 'basic') {
        @case ('checkbox') {
          <div frMenuBar>
            <div frMenuBarMenu>
              <button [frMenuBarTrigger]="viewMenu" type="button">View</button>
              <ng-template #viewMenu="frMenuBarContent" frMenuBarContent>
                <div frMenuBarPanel>
                  <button
                    frMenuBarCheckboxItem
                    [checked]="showToolbar()"
                    (click)="showToolbar.set(!showToolbar())"
                    type="button"
                  >
                    <span frMenuBarItemIndicator><ng-icon name="tablerCheck" size="14" /></span>
                    Toolbar
                  </button>
                  <button
                    frMenuBarCheckboxItem
                    [checked]="showStatusBar()"
                    (click)="showStatusBar.set(!showStatusBar())"
                    type="button"
                  >
                    <span frMenuBarItemIndicator><ng-icon name="tablerCheck" size="14" /></span>
                    Status Bar
                  </button>
                  <button
                    frMenuBarCheckboxItem
                    [checked]="showSidebar()"
                    (click)="showSidebar.set(!showSidebar())"
                    type="button"
                  >
                    <span frMenuBarItemIndicator><ng-icon name="tablerCheck" size="14" /></span>
                    Sidebar
                  </button>
                </div>
              </ng-template>
            </div>

            <div frMenuBarMenu>
              <button [frMenuBarTrigger]="formatMenu" type="button">Format</button>
              <ng-template #formatMenu="frMenuBarContent" frMenuBarContent>
                <div frMenuBarPanel>
                  <button frMenuBarCheckboxItem checked type="button">
                    <span frMenuBarItemIndicator><ng-icon name="tablerCheck" size="14" /></span>
                    Wrap Text
                  </button>
                </div>
              </ng-template>
            </div>
          </div>
        }

        @case ('radio') {
          <div frMenuBar>
            <div frMenuBarMenu>
              <button [frMenuBarTrigger]="profilesMenu" type="button">Profiles</button>
              <ng-template #profilesMenu="frMenuBarContent" frMenuBarContent>
                <div frMenuBarPanel>
                  <div frMenuBarLabel>People</div>
                  <div frMenuBarRadioGroup>
                    <button
                      frMenuBarRadioItem
                      [checked]="profile() === 'julia'"
                      (click)="profile.set('julia')"
                      type="button"
                    >
                      <span frMenuBarItemIndicator><ng-icon name="tablerCheck" size="14" /></span>
                      Julia
                    </button>
                    <button
                      frMenuBarRadioItem
                      [checked]="profile() === 'alex'"
                      (click)="profile.set('alex')"
                      type="button"
                    >
                      <span frMenuBarItemIndicator><ng-icon name="tablerCheck" size="14" /></span>
                      Alex
                    </button>
                  </div>
                </div>
              </ng-template>
            </div>

            <div frMenuBarMenu>
              <button [frMenuBarTrigger]="themeMenu" type="button">Theme</button>
              <ng-template #themeMenu="frMenuBarContent" frMenuBarContent>
                <div frMenuBarPanel>
                  <div frMenuBarRadioGroup>
                    <button frMenuBarRadioItem checked type="button">
                      <span frMenuBarItemIndicator><ng-icon name="tablerCheck" size="14" /></span>
                      System
                    </button>
                    <button frMenuBarRadioItem type="button">
                      <span frMenuBarItemIndicator><ng-icon name="tablerCheck" size="14" /></span>
                      Light
                    </button>
                    <button frMenuBarRadioItem type="button">
                      <span frMenuBarItemIndicator><ng-icon name="tablerCheck" size="14" /></span>
                      Dark
                    </button>
                  </div>
                </div>
              </ng-template>
            </div>
          </div>
        }

        @case ('submenu') {
          <div frMenuBar>
            <div frMenuBarMenu>
              <button [frMenuBarTrigger]="fileMenu" type="button">File</button>
              <ng-template #fileMenu="frMenuBarContent" frMenuBarContent>
                <div frMenuBarPanel>
                  <button frMenuBarItem type="button">New Tab <span frMenuBarShortcut>⌘T</span></button>
                  <button frMenuBarItem type="button">New Window</button>
                  <div frMenuBarSeparator></div>
                  <div frMenuBarSub>
                    <button [frMenuBarSubTrigger]="shareMenu" type="button">
                      Share
                    </button>
                    <ng-template #shareMenu="frMenuBarContent" frMenuBarSubContent>
                      <div frMenuBarPanel>
                        <button frMenuBarItem type="button">Copy link</button>
                        <button frMenuBarItem type="button">Email link</button>
                      </div>
                    </ng-template>
                  </div>
                  <button frMenuBarItem type="button">Print <span frMenuBarShortcut>⌘P</span></button>
                </div>
              </ng-template>
            </div>

            <div frMenuBarMenu>
              <button [frMenuBarTrigger]="editMenu" type="button">Edit</button>
              <ng-template #editMenu="frMenuBarContent" frMenuBarContent>
                <div frMenuBarPanel>
                  <button frMenuBarItem type="button">Undo <span frMenuBarShortcut>⌘Z</span></button>
                  <button frMenuBarItem type="button">Redo <span frMenuBarShortcut>⇧⌘Z</span></button>
                </div>
              </ng-template>
            </div>
          </div>
        }

        @case ('icons') {
          <div frMenuBar>
            <div frMenuBarMenu>
              <button [frMenuBarTrigger]="fileMenu" type="button">File</button>
              <ng-template #fileMenu="frMenuBarContent" frMenuBarContent>
                <div frMenuBarPanel>
                  <button frMenuBarItem type="button">
                    <ng-icon name="tablerFileText" size="14" />
                    New File
                    <span frMenuBarShortcut>⌘N</span>
                  </button>
                  <button frMenuBarItem type="button">
                    <ng-icon name="tablerFolder" size="14" />
                    Open Folder
                  </button>
                  <button frMenuBarItem type="button">
                    <ng-icon name="tablerDeviceFloppy" size="14" />
                    Save
                    <span frMenuBarShortcut>⌘S</span>
                  </button>
                </div>
              </ng-template>
            </div>

            <div frMenuBarMenu>
              <button [frMenuBarTrigger]="moreMenu" type="button">More</button>
              <ng-template #moreMenu="frMenuBarContent" frMenuBarContent>
                <div frMenuBarPanel>
                  <button frMenuBarItem type="button">
                    <ng-icon name="tablerShare" size="14" />
                    Share
                  </button>
                  <button frMenuBarItem type="button">
                    <ng-icon name="tablerPrinter" size="14" />
                    Print
                  </button>
                </div>
              </ng-template>
            </div>
          </div>
        }

        @case ('rtl') {
          <div dir="rtl">
            <div frMenuBar>
              <div frMenuBarMenu>
                <button [frMenuBarTrigger]="fileMenu" type="button">ملف</button>
                <ng-template #fileMenu="frMenuBarContent" frMenuBarContent align="end">
                  <div frMenuBarPanel>
                    <button frMenuBarItem type="button">تبويب جديد <span frMenuBarShortcut>⌘T</span></button>
                    <button frMenuBarItem type="button">نافذة جديدة</button>
                    <div frMenuBarSeparator></div>
                    <button frMenuBarItem type="button">طباعة <span frMenuBarShortcut>⌘P</span></button>
                  </div>
                </ng-template>
              </div>
              <div frMenuBarMenu>
                <button [frMenuBarTrigger]="viewMenu" type="button">عرض</button>
                <ng-template #viewMenu="frMenuBarContent" frMenuBarContent align="end">
                  <div frMenuBarPanel>
                    <button frMenuBarCheckboxItem checked type="button">
                      <span frMenuBarItemIndicator><ng-icon name="tablerCheck" size="14" /></span>
                      الشريط الجانبي
                    </button>
                  </div>
                </ng-template>
              </div>
            </div>
          </div>
        }

        @case ('inspector') {
            <div class="docs-menubar-inspector">
              <div frMenuBar data-token-target="menubar-root">
                <div frMenuBarMenu>
                <button type="button" class="frame-menubar__trigger" data-token-target="menubar-trigger">
                  File
                </button>
                </div>
                <div frMenuBarMenu>
                <button
                  type="button"
                  class="frame-menubar__trigger"
                  data-token-target="menubar-trigger-open"
                  data-state="open"
                >
                  View
                </button>
                </div>
                <div frMenuBarMenu>
                <button type="button" class="frame-menubar__trigger">Edit</button>
                </div>
              </div>

            <div class="frame-dropdown-menu__content docs-menubar-static-panel" data-token-target="menubar-panel">
              <div class="frame-dropdown-menu__label" data-token-target="menubar-label">File</div>
              <button class="frame-dropdown-menu__item" data-token-target="menubar-item" type="button">
                <ng-icon name="tablerFileText" size="14" />
                New Tab
                <span class="frame-dropdown-menu__shortcut" data-token-target="menubar-shortcut">⌘T</span>
              </button>
              <button
                class="frame-dropdown-menu__item frame-dropdown-menu__checkbox-item"
                data-checked
                type="button"
              >
                <span class="frame-dropdown-menu__indicator" data-token-target="menubar-indicator">
                  <ng-icon name="tablerCheck" size="14" />
                </span>
                Show sidebar
              </button>
              <div class="frame-dropdown-menu__separator" data-token-target="menubar-separator"></div>
              <button class="frame-dropdown-menu__item frame-dropdown-menu__sub-trigger" type="button">
                Share
              </button>
            </div>
          </div>
        }

        @default {
          <div frMenuBar>
            <div frMenuBarMenu>
              <button [frMenuBarTrigger]="fileMenu" type="button">File</button>
              <ng-template #fileMenu="frMenuBarContent" frMenuBarContent>
                <div frMenuBarPanel>
                  <button frMenuBarItem type="button">New Tab <span frMenuBarShortcut>⌘T</span></button>
                  <button frMenuBarItem type="button">New Window</button>
                  <div frMenuBarSeparator></div>
                  <button frMenuBarItem type="button">Share</button>
                  <button frMenuBarItem type="button">Print <span frMenuBarShortcut>⌘P</span></button>
                </div>
              </ng-template>
            </div>

            <div frMenuBarMenu>
              <button [frMenuBarTrigger]="editMenu" type="button">Edit</button>
              <ng-template #editMenu="frMenuBarContent" frMenuBarContent>
                <div frMenuBarPanel>
                  <button frMenuBarItem type="button">Undo <span frMenuBarShortcut>⌘Z</span></button>
                  <button frMenuBarItem type="button">Redo <span frMenuBarShortcut>⇧⌘Z</span></button>
                </div>
              </ng-template>
            </div>

            <div frMenuBarMenu>
              <button [frMenuBarTrigger]="viewMenu" type="button">View</button>
              <ng-template #viewMenu="frMenuBarContent" frMenuBarContent>
                <div frMenuBarPanel>
                  <button frMenuBarCheckboxItem checked type="button">
                    <span frMenuBarItemIndicator><ng-icon name="tablerCheck" size="14" /></span>
                    Show Toolbar
                  </button>
                  <button frMenuBarCheckboxItem type="button">
                    <span frMenuBarItemIndicator><ng-icon name="tablerCheck" size="14" /></span>
                    Show Sidebar
                  </button>
                </div>
              </ng-template>
            </div>

            <div frMenuBarMenu>
              <button [frMenuBarTrigger]="profilesMenu" type="button">Profiles</button>
              <ng-template #profilesMenu="frMenuBarContent" frMenuBarContent>
                <div frMenuBarPanel>
                  <div frMenuBarLabel>People</div>
                  <button frMenuBarItem type="button">
                    <ng-icon name="tablerUser" size="14" />
                    Julia
                  </button>
                  <button frMenuBarItem type="button">
                    <ng-icon name="tablerUser" size="14" />
                    Alex
                  </button>
                </div>
              </ng-template>
            </div>
          </div>
        }
      }
    </div>
  `,
  styles: `
    .docs-menubar-inspector {
      display: grid;
      gap: 1rem;
      justify-items: center;
      width: min(100%, 36rem);
    }

    .docs-menubar-static-panel {
      position: static;
      width: min(100%, 16rem);
    }
  `,
})
export class DocsMenubarPreviewComponent {
  readonly config = input<MenubarPreviewConfig>({});

  protected readonly profile = signal<'alex' | 'julia'>('julia');
  protected readonly showSidebar = signal(false);
  protected readonly showStatusBar = signal(true);
  protected readonly showToolbar = signal(true);
}

