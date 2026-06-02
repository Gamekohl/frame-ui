import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { FrCard, FrCardContent } from '@frame-ui/components/card';
import { FrTabsModule } from '@frame-ui/components/tabs';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { tablerChartBar, tablerCode, tablerEye, tablerSettings } from '@ng-icons/tabler-icons';

export type TabsPreviewMode =
  | 'basic'
  | 'controlled'
  | 'custom-styling'
  | 'disabled'
  | 'icons'
  | 'inspector'
  | 'line'
  | 'router'
  | 'rtl'
  | 'vertical';

export type TabsPreviewConfig = {
  mode: TabsPreviewMode;
};

@Component({
  selector: 'docs-tabs-preview',
  host: {
    class: 'block w-full',
  },
  imports: [FrCard, FrCardContent, FrTabsModule, NgIcon, NgTemplateOutlet],
  viewProviders: [
    provideIcons({
      tablerChartBar,
      tablerCode,
      tablerEye,
      tablerSettings,
    }),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @switch (config().mode) {
      @case ('basic') {
        <div frTabs defaultValue="overview" class="docs-tabs-demo">
          <div frTabsList>
            <button frTabsTrigger value="overview">Overview</button>
            <button frTabsTrigger value="activity">Activity</button>
            <button frTabsTrigger value="notes">Notes</button>
          </div>
          <div frTabsContent value="overview">
            <ng-container *ngTemplateOutlet="overviewPanel" />
          </div>
          <div frTabsContent value="activity">
            <ng-container *ngTemplateOutlet="activityPanel" />
          </div>
          <div frTabsContent value="notes">
            <ng-container *ngTemplateOutlet="notesPanel" />
          </div>
        </div>
      }

      @case ('line') {
        <div frTabs defaultValue="overview" class="docs-tabs-demo">
          <div frTabsList variant="line">
            <button frTabsTrigger value="overview">Overview</button>
            <button frTabsTrigger value="activity">Activity</button>
            <button frTabsTrigger value="notes">Notes</button>
          </div>
          <div frTabsContent value="overview">
            <ng-container *ngTemplateOutlet="overviewPanel" />
          </div>
          <div frTabsContent value="activity">
            <ng-container *ngTemplateOutlet="activityPanel" />
          </div>
          <div frTabsContent value="notes">
            <ng-container *ngTemplateOutlet="notesPanel" />
          </div>
        </div>
      }

      @case ('vertical') {
        <div frTabs defaultValue="profile" orientation="vertical" class="docs-tabs-demo docs-tabs-demo--vertical">
          <div frTabsList>
            <button frTabsTrigger value="profile">Profile</button>
            <button frTabsTrigger value="security">Security</button>
            <button frTabsTrigger value="billing">Billing</button>
          </div>
          <div frTabsContent value="profile">
            <ng-container *ngTemplateOutlet="profilePanel" />
          </div>
          <div frTabsContent value="security">
            <ng-container *ngTemplateOutlet="securityPanel" />
          </div>
          <div frTabsContent value="billing">
            <ng-container *ngTemplateOutlet="billingPanel" />
          </div>
        </div>
      }

      @case ('disabled') {
        <div frTabs defaultValue="home" class="docs-tabs-demo">
          <div frTabsList>
            <button frTabsTrigger value="home">Home</button>
            <button frTabsTrigger value="locked" disabled>Locked</button>
          </div>
          <div frTabsContent value="home">
            <ng-container *ngTemplateOutlet="overviewPanel" />
          </div>
        </div>
      }

      @case ('icons') {
        <div frTabs defaultValue="preview" class="docs-tabs-demo">
          <div frTabsList>
            <button frTabsTrigger value="preview">
              <ng-icon name="tablerEye" size="16" />
              Preview
            </button>
            <button frTabsTrigger value="code">
              <ng-icon name="tablerCode" size="16" />
              Code
            </button>
          </div>
          <div frTabsContent value="preview">
            <ng-container *ngTemplateOutlet="overviewPanel" />
          </div>
          <div frTabsContent value="code">
            <ng-container *ngTemplateOutlet="codePanel" />
          </div>
        </div>
      }

      @case ('controlled') {
        <div frTabs [value]="controlledValue()" (valueChange)="setControlledValue($event)" class="docs-tabs-demo">
          <div frTabsList>
            <button frTabsTrigger value="overview">Overview</button>
            <button frTabsTrigger value="activity">Activity</button>
          </div>
          <p class="docs-tabs-meta">Current tab: {{ controlledValue() }}</p>
          <div frTabsContent value="overview">
            <ng-container *ngTemplateOutlet="overviewPanel" />
          </div>
          <div frTabsContent value="activity">
            <ng-container *ngTemplateOutlet="activityPanel" />
          </div>
        </div>
      }

      @case ('router') {
        <div class="docs-tabs-demo">
          <div frTabsList variant="line" aria-label="Project routes">
            <a frTabsTrigger active href="#/overview">Overview</a>
            <a frTabsTrigger href="#/settings">Settings</a>
            <a frTabsTrigger href="#/billing">Billing</a>
          </div>
          <ng-container *ngTemplateOutlet="routerPanel" />
        </div>
      }

      @case ('custom-styling') {
        <div frTabs defaultValue="overview" class="docs-tabs-demo docs-tabs-demo--custom">
          <div frTabsList>
            <button frTabsTrigger value="overview">Overview</button>
            <button frTabsTrigger value="activity">Activity</button>
          </div>
          <div frTabsContent value="overview">
            <ng-container *ngTemplateOutlet="overviewPanel" />
          </div>
        </div>
      }

      @case ('rtl') {
        <div frTabs defaultValue="overview" class="docs-tabs-demo" dir="rtl" lang="ar">
          <div frTabsList>
            <button frTabsTrigger value="overview">نظرة عامة</button>
            <button frTabsTrigger value="activity">النشاط</button>
            <button frTabsTrigger value="settings">الإعدادات</button>
          </div>
          <div frTabsContent value="overview">
            <ng-container *ngTemplateOutlet="rtlPanel" />
          </div>
        </div>
      }

      @case ('inspector') {
        <div frTabs defaultValue="overview" class="docs-tabs-demo" data-token-target="tabs-root">
          <div frTabsList data-token-target="tabs-list">
            <button frTabsTrigger value="overview" data-token-target="tabs-active-trigger">Overview</button>
            <button frTabsTrigger value="activity" data-token-target="tabs-trigger">Activity</button>
          </div>
          <div frTabsContent value="overview" data-token-target="tabs-content">
            <ng-container *ngTemplateOutlet="overviewPanel" />
          </div>
        </div>
      }
    }

    <ng-template #overviewPanel>
      <div frCard class="docs-tabs-card">
        <div frCardContent>
          <h3>Workspace overview</h3>
          <p>See current work, recent changes, and small signals that help a team orient quickly.</p>
        </div>
      </div>
    </ng-template>

    <ng-template #activityPanel>
      <div frCard class="docs-tabs-card">
        <div frCardContent>
          <h3>Recent activity</h3>
          <p>Three reviews were completed and one release note is waiting for approval.</p>
        </div>
      </div>
    </ng-template>

    <ng-template #notesPanel>
      <div frCard class="docs-tabs-card">
        <div frCardContent>
          <h3>Team notes</h3>
          <p>Capture lightweight context without sending users away from the current surface.</p>
        </div>
      </div>
    </ng-template>

    <ng-template #profilePanel>
      <div frCard class="docs-tabs-card">
        <div frCardContent>
          <h3>Profile</h3>
          <p>Adjust display name, avatar, and workspace identity from one panel.</p>
        </div>
      </div>
    </ng-template>

    <ng-template #securityPanel>
      <div frCard class="docs-tabs-card">
        <div frCardContent>
          <h3>Security</h3>
          <p>Review sessions, passkeys, and recovery methods.</p>
        </div>
      </div>
    </ng-template>

    <ng-template #billingPanel>
      <div frCard class="docs-tabs-card">
        <div frCardContent>
          <h3>Billing</h3>
          <p>Manage invoices, seats, and plan limits.</p>
        </div>
      </div>
    </ng-template>

    <ng-template #codePanel>
      <div frCard class="docs-tabs-card">
        <div frCardContent>
          <h3>Example code</h3>
          <p>Switch between live output and implementation details without changing layout.</p>
        </div>
      </div>
    </ng-template>

    <ng-template #routerPanel>
      <div frCard class="docs-tabs-card">
        <div frCardContent>
          <h3>Router tabs</h3>
          <p>Use anchor triggers with routerLink and routerLinkActive, then bind active to the router state.</p>
        </div>
      </div>
    </ng-template>

    <ng-template #rtlPanel>
      <div frCard class="docs-tabs-card">
        <div frCardContent>
          <h3>نظرة عامة</h3>
          <p>تتبع علامات التبويب اتجاه الصفحة وتستخدم خصائص منطقية للتباعد.</p>
        </div>
      </div>
    </ng-template>
  `,
  styles: `
    .docs-tabs-demo {
      width: min(100%, 36rem);
      margin-inline: auto;
    }

    .docs-tabs-demo--vertical {
      width: min(100%, 42rem);
    }

    .docs-tabs-card h3,
    .docs-tabs-card p,
    .docs-tabs-meta {
      margin: 0;
    }

    .docs-tabs-card h3 {
      font-size: 1rem;
      font-weight: 700;
    }

    .docs-tabs-card p,
    .docs-tabs-meta {
      color: var(--frame-muted-foreground);
      font-size: 0.875rem;
      line-height: 1.55;
    }

    .docs-tabs-demo--custom {
      --frame-tabs-list-bg: color-mix(in srgb, var(--frame-primary) 10%, var(--frame-background));
      --frame-tabs-trigger-active-bg: var(--frame-primary);
      --frame-tabs-trigger-active-color: var(--frame-primary-foreground);
      --frame-tabs-trigger-active-shadow: 0 10px 30px color-mix(in srgb, var(--frame-primary) 22%, transparent);
      --frame-tabs-trigger-hover-bg: color-mix(in srgb, var(--frame-primary) 16%, var(--frame-background));
    }
  `,
})
export class DocsTabsPreviewComponent {
  readonly config = input.required<TabsPreviewConfig>();
  protected readonly controlledValue = signal('overview');

  protected setControlledValue(value: string | null): void {
    if (value) {
      this.controlledValue.set(value);
    }
  }
}
