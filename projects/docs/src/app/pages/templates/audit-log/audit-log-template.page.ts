import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FrAlertModule } from '@frame-ui-ng/components/alert';
import { FrAvatarModule } from '@frame-ui-ng/components/avatar';
import { FrBadgeModule } from '@frame-ui-ng/components/badge';
import { FrBreadcrumbModule } from '@frame-ui-ng/components/breadcrumb';
import { FrButtonModule } from '@frame-ui-ng/components/button';
import { type FrCalendarDateRange } from '@frame-ui-ng/components/calendar';
import { FrDatePickerModule } from '@frame-ui-ng/components/date-picker';
import { FrEmptyModule } from '@frame-ui-ng/components/empty';
import { FrInputModule } from '@frame-ui-ng/components/input';
import { FrSelectModule } from '@frame-ui-ng/components/select';
import { FrSheetModule, FrSheetService } from '@frame-ui-ng/components/sheet';
import { FrSidebarModule } from '@frame-ui-ng/components/sidebar';
import { FrTableModule } from '@frame-ui-ng/components/table';
import { FrToastModule, FrToastService } from '@frame-ui-ng/components/toast';
import { FrTooltipModule } from '@frame-ui-ng/components/tooltip';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  tablerActivity,
  tablerArrowRight,
  tablerBrandGithub,
  tablerBuildingStore,
  tablerCalendar,
  tablerChevronDown,
  tablerClock,
  tablerDatabase,
  tablerDots,
  tablerDownload,
  tablerFileText,
  tablerHome,
  tablerLayoutBoard,
  tablerLayoutSidebar,
  tablerSearch,
  tablerSettings,
  tablerShieldCheck,
  tablerShieldLock,
  tablerUsers,
  tablerX,
} from '@ng-icons/tabler-icons';

import { CommerceAdminAuditStore } from '../shared/commerce-admin-audit.store';
import {
  ADMIN_NAV,
  AUDIT_AREAS,
  AUDIT_COLUMNS,
  AUDIT_OUTCOMES,
  MAIN_NAV,
  type AuditEvent,
  type AuditOutcome,
} from './audit-log-template.data';

const DEFAULT_RANGE: FrCalendarDateRange = {
  from: new Date(2026, 6, 15),
  to: new Date(2026, 6, 22),
};

@Component({
  selector: 'docs-audit-log-template-page',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    FrAlertModule,
    FrAvatarModule,
    FrBadgeModule,
    FrBreadcrumbModule,
    FrButtonModule,
    FrDatePickerModule,
    FrEmptyModule,
    FrInputModule,
    FrSelectModule,
    FrSheetModule,
    FrSidebarModule,
    FrTableModule,
    FrToastModule,
    FrTooltipModule,
    NgIcon,
  ],
  templateUrl: './audit-log-template.page.html',
  styleUrl: './audit-log-template.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    provideIcons({
      tablerActivity,
      tablerArrowRight,
      tablerBrandGithub,
      tablerBuildingStore,
      tablerCalendar,
      tablerChevronDown,
      tablerClock,
      tablerDatabase,
      tablerDots,
      tablerDownload,
      tablerFileText,
      tablerHome,
      tablerLayoutBoard,
      tablerLayoutSidebar,
      tablerSearch,
      tablerSettings,
      tablerShieldCheck,
      tablerShieldLock,
      tablerUsers,
      tablerX,
    }),
  ],
})
export class AuditLogTemplatePage {
  private readonly auditStore = inject(CommerceAdminAuditStore);
  private readonly document = inject(DOCUMENT);
  private readonly sheet = inject(FrSheetService);
  private readonly toast = inject(FrToastService);
  private readonly eventDetailsSheet =
    viewChild.required<TemplateRef<unknown>>('eventDetailsSheet');

  protected readonly mainNav = MAIN_NAV;
  protected readonly adminNav = ADMIN_NAV;
  protected readonly columns = AUDIT_COLUMNS;
  protected readonly areaOptions = AUDIT_AREAS;
  protected readonly outcomeOptions = AUDIT_OUTCOMES;
  protected readonly dateRangeControl = new FormControl<FrCalendarDateRange>(DEFAULT_RANGE, {
    nonNullable: true,
  });

  protected readonly searchTerm = signal('');
  protected readonly areaFilter = signal('All areas');
  protected readonly outcomeFilter = signal('All outcomes');
  protected readonly selectedEventId = signal(this.auditStore.events()[0]?.id ?? 0);
  protected readonly dateRange = toSignal(this.dateRangeControl.valueChanges, {
    initialValue: this.dateRangeControl.value,
  });

  protected readonly filteredEvents = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    const area = this.areaFilter();
    const outcome = this.outcomeFilter();
    const range = this.dateRange();

    return this.auditStore.events().filter((event) => {
      const occurredAt = new Date(event.occurredAt).getTime();
      const from = range.from ? this.startOfDay(range.from).getTime() : Number.NEGATIVE_INFINITY;
      const to = range.to ? this.endOfDay(range.to).getTime() : Number.POSITIVE_INFINITY;
      const matchesTerm =
        term.length === 0 ||
        event.action.toLowerCase().includes(term) ||
        event.target.toLowerCase().includes(term) ||
        event.actor.toLowerCase().includes(term) ||
        event.summary.toLowerCase().includes(term);
      const matchesArea = area === 'All areas' || event.area === area;
      const matchesOutcome = outcome === 'All outcomes' || event.outcome === outcome;

      return matchesTerm && matchesArea && matchesOutcome && occurredAt >= from && occurredAt <= to;
    });
  });

  protected readonly selectedEvent = computed(
    () =>
      this.auditStore.events().find((event) => event.id === this.selectedEventId()) ??
      this.auditStore.events()[0],
  );

  protected readonly metrics = computed(() => {
    const events = this.auditStore.events();

    return [
      {
        label: 'Recorded',
        value: events.length.toString(),
        detail: 'Events in the current window',
      },
      {
        label: 'Needs review',
        value: events.filter((event) => event.outcome === 'Review').length.toString(),
        detail: 'Sensitive changes to verify',
      },
      {
        label: 'Blocked',
        value: events.filter((event) => event.outcome === 'Blocked').length.toString(),
        detail: 'Policies prevented the action',
      },
    ];
  });

  protected setSearch(event: Event): void {
    this.searchTerm.set((event.target as HTMLInputElement | null)?.value ?? '');
  }

  protected resetFilters(): void {
    this.searchTerm.set('');
    this.areaFilter.set('All areas');
    this.outcomeFilter.set('All outcomes');
    this.dateRangeControl.setValue(DEFAULT_RANGE);
  }

  protected openEventDetails(event: AuditEvent): void {
    this.selectedEventId.set(event.id);
    this.sheet.open(this.eventDetailsSheet(), {
      ariaLabel: `${event.action}: ${event.target}`,
      side: 'right',
      width: '28rem',
    });
  }

  protected outcomeVariant(outcome: AuditOutcome): 'destructive' | 'secondary' | 'success' {
    if (outcome === 'Success') {
      return 'success';
    }

    if (outcome === 'Blocked') {
      return 'destructive';
    }

    return 'secondary';
  }

  protected exportEvents(): void {
    const rows = [
      ['Time', 'Actor', 'Action', 'Target', 'Area', 'Outcome'],
      ...this.filteredEvents().map((event) => [
        event.displayTime,
        event.actor,
        event.action,
        event.target,
        event.area,
        event.outcome,
      ]),
    ];
    const csv = rows
      .map((row) => row.map((cell) => `"${cell.replaceAll('"', '""')}"`).join(','))
      .join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const anchor = this.document.createElement('a');

    anchor.href = url;
    anchor.download = 'commerce-audit-log.csv';
    anchor.click();
    URL.revokeObjectURL(url);
    this.toast.success(`Exported ${this.filteredEvents().length} audit events.`);
  }

  private startOfDay(value: Date): Date {
    const date = new Date(value);
    date.setHours(0, 0, 0, 0);
    return date;
  }

  private endOfDay(value: Date): Date {
    const date = new Date(value);
    date.setHours(23, 59, 59, 999);
    return date;
  }
}
