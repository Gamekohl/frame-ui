import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { FrBadgeModule } from '@frame-ui/components/badge';
import { FrButtonModule } from '@frame-ui/components/button';
import { FrTableModule } from '@frame-ui/components/table';
import { FrVirtualScrollModule } from '@frame-ui/components/virtual-scroll';

export type TablePreviewMode =
  | 'actions'
  | 'basic'
  | 'custom-styling'
  | 'dynamic'
  | 'empty'
  | 'footer'
  | 'inspector'
  | 'rtl'
  | 'sticky'
  | 'sticky-header'
  | 'virtual';

export type TablePreviewConfig = {
  mode: TablePreviewMode;
};

type Deployment = {
  id: string;
  app: string;
  owner: string;
  status: 'Ready' | 'Queued' | 'Failed';
  region: string;
  cost: number;
};

const DEPLOYMENTS: Deployment[] = [
  { id: 'DEP-2048', app: 'Atlas Studio', owner: 'Mira', status: 'Ready', region: 'EU Central', cost: 1280 },
  { id: 'DEP-2049', app: 'Northwind Portal', owner: 'Jonas', status: 'Queued', region: 'US East', cost: 860 },
  { id: 'DEP-2050', app: 'Signal Desk', owner: 'Rhea', status: 'Ready', region: 'AP South', cost: 1440 },
  { id: 'DEP-2051', app: 'Beacon API', owner: 'Nora', status: 'Failed', region: 'EU West', cost: 520 },
  { id: 'DEP-2052', app: 'Orbit Console', owner: 'Theo', status: 'Ready', region: 'US West', cost: 1110 },
];

@Component({
  selector: 'docs-table-preview',
  host: {
    class: 'block w-full',
  },
  imports: [
    FrBadgeModule,
    FrButtonModule,
    FrTableModule,
    FrVirtualScrollModule,
    NgTemplateOutlet,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @switch (config().mode) {
      @case ('basic') {
        <ng-container [ngTemplateOutlet]="tableTemplate" />
      }

      @case ('footer') {
        <ng-container [ngTemplateOutlet]="footerTableTemplate" />
      }

      @case ('actions') {
        <ng-container [ngTemplateOutlet]="actionsTableTemplate" />
      }

      @case ('dynamic') {
        <div class="docs-table-stack">
          <div class="docs-table-toolbar">
            <button frButton appearance="outline" size="sm" type="button" (click)="toggleOwner()">
              {{ showOwner() ? 'Hide owner' : 'Show owner' }}
            </button>
          </div>
          <ng-container [ngTemplateOutlet]="dynamicTableTemplate" />
        </div>
      }

      @case ('empty') {
        <ng-container [ngTemplateOutlet]="emptyTableTemplate" />
      }

      @case ('sticky') {
        <ng-container [ngTemplateOutlet]="stickyTableTemplate" />
      }

      @case ('sticky-header') {
        <ng-container [ngTemplateOutlet]="stickyHeaderTableTemplate" />
      }

      @case ('virtual') {
        <div frTableVirtual style="--frame-table-virtual-columns: 8rem 14rem 8rem 9rem 7rem;" data-token-target="table-root">
          <div frTableVirtualHeader data-token-target="table-header">
            <div frTableVirtualCell>Deploy</div>
            <div frTableVirtualCell>Application</div>
            <div frTableVirtualCell>Owner</div>
            <div frTableVirtualCell>Region</div>
            <div frTableVirtualCell frTableNumeric>Cost</div>
          </div>

          <div frVirtualViewport [height]="'18rem'" [itemSize]="48" [overscan]="6">
            <div frVirtualContent>
              <div
                frTableVirtualRow
                *frVirtualFor="let deployment of largeDeployments; trackBy: trackDeployment"
                data-token-target="table-row"
              >
                <div frTableVirtualCell>{{ deployment.id }}</div>
                <div frTableVirtualCell>{{ deployment.app }}</div>
                <div frTableVirtualCell>{{ deployment.owner }}</div>
                <div frTableVirtualCell>{{ deployment.region }}</div>
                <div frTableVirtualCell frTableNumeric>{{ currency(deployment.cost) }}</div>
              </div>
            </div>
          </div>
        </div>
      }

      @case ('custom-styling') {
        <div class="docs-table-custom">
          <ng-container [ngTemplateOutlet]="tableTemplate" />
        </div>
      }

      @case ('rtl') {
        <div dir="rtl">
          <ng-container [ngTemplateOutlet]="rtlTableTemplate" />
        </div>
      }

      @case ('inspector') {
        <ng-container [ngTemplateOutlet]="inspectorTableTemplate" />
      }
    }

    <ng-template #tableTemplate>
      <div frTableContainer>
        <table frTable variant="outline" [dataSource]="deployments" data-token-target="table-root">
          <caption frTableCaption data-token-target="table-caption">
            Deployment activity from the current workspace.
          </caption>

          <ng-container frColumnDef="id">
            <th frHeaderCell *frHeaderCellDef data-token-target="table-head">Deploy</th>
            <td frCell *frCellDef="let deployment" data-token-target="table-cell">{{ deployment.id }}</td>
          </ng-container>

          <ng-container frColumnDef="app">
            <th frHeaderCell *frHeaderCellDef>Application</th>
            <td frCell *frCellDef="let deployment">{{ deployment.app }}</td>
          </ng-container>

          <ng-container frColumnDef="status">
            <th frHeaderCell *frHeaderCellDef>Status</th>
            <td frCell *frCellDef="let deployment">
              <span frBadge [variant]="badgeVariant(deployment.status)">{{ deployment.status }}</span>
            </td>
          </ng-container>

          <ng-container frColumnDef="region">
            <th frHeaderCell *frHeaderCellDef>Region</th>
            <td frCell *frCellDef="let deployment" frTableMuted>{{ deployment.region }}</td>
          </ng-container>

          <ng-container frColumnDef="cost">
            <th frHeaderCell frTableNumeric *frHeaderCellDef>Monthly</th>
            <td frCell frTableNumeric *frCellDef="let deployment">{{ currency(deployment.cost) }}</td>
          </ng-container>

          <tr frHeaderRow *frHeaderRowDef="columns"></tr>
          <tr frRow *frRowDef="let row; columns: columns" data-token-target="table-row"></tr>
        </table>
      </div>
    </ng-template>

    <ng-template #footerTableTemplate>
      <div frTableContainer>
        <table frTable variant="outline" [dataSource]="deployments">
          <ng-container frColumnDef="id">
            <th frHeaderCell *frHeaderCellDef>Deploy</th>
            <td frCell *frCellDef="let deployment">{{ deployment.id }}</td>
            <td frFooterCell *frFooterCellDef>Total</td>
          </ng-container>

          <ng-container frColumnDef="app">
            <th frHeaderCell *frHeaderCellDef>Application</th>
            <td frCell *frCellDef="let deployment">{{ deployment.app }}</td>
            <td frFooterCell *frFooterCellDef></td>
          </ng-container>

          <ng-container frColumnDef="status">
            <th frHeaderCell *frHeaderCellDef>Status</th>
            <td frCell *frCellDef="let deployment">{{ deployment.status }}</td>
            <td frFooterCell *frFooterCellDef></td>
          </ng-container>

          <ng-container frColumnDef="region">
            <th frHeaderCell *frHeaderCellDef>Region</th>
            <td frCell *frCellDef="let deployment">{{ deployment.region }}</td>
            <td frFooterCell *frFooterCellDef></td>
          </ng-container>

          <ng-container frColumnDef="cost">
            <th frHeaderCell frTableNumeric *frHeaderCellDef>Monthly</th>
            <td frCell frTableNumeric *frCellDef="let deployment">{{ currency(deployment.cost) }}</td>
            <td frFooterCell frTableNumeric *frFooterCellDef>{{ currency(totalCost()) }}</td>
          </ng-container>

          <tr frHeaderRow *frHeaderRowDef="columns"></tr>
          <tr frRow *frRowDef="let row; columns: columns"></tr>
          <tr frFooterRow *frFooterRowDef="columns"></tr>
        </table>
      </div>
    </ng-template>

    <ng-template #actionsTableTemplate>
      <div frTableContainer>
        <table frTable variant="outline" [dataSource]="deployments">
          <ng-container frColumnDef="id">
            <th frHeaderCell *frHeaderCellDef>Deploy</th>
            <td frCell *frCellDef="let deployment">{{ deployment.id }}</td>
          </ng-container>

          <ng-container frColumnDef="app">
            <th frHeaderCell *frHeaderCellDef>Application</th>
            <td frCell *frCellDef="let deployment">{{ deployment.app }}</td>
          </ng-container>

          <ng-container frColumnDef="status">
            <th frHeaderCell *frHeaderCellDef>Status</th>
            <td frCell *frCellDef="let deployment">{{ deployment.status }}</td>
          </ng-container>

          <ng-container frColumnDef="actions">
            <th frHeaderCell frTableNumeric *frHeaderCellDef>Actions</th>
            <td frCell frTableNumeric *frCellDef="let deployment">
              <button frButton appearance="ghost" size="sm" type="button">
                Review
              </button>
            </td>
          </ng-container>

          <tr frHeaderRow *frHeaderRowDef="actionColumns"></tr>
          <tr frRow *frRowDef="let row; columns: actionColumns"></tr>
        </table>
      </div>
    </ng-template>

    <ng-template #dynamicTableTemplate>
      <div frTableContainer>
        <table frTable variant="outline" [dataSource]="deployments">
          <ng-container frColumnDef="id">
            <th frHeaderCell *frHeaderCellDef>Deploy</th>
            <td frCell *frCellDef="let deployment">{{ deployment.id }}</td>
          </ng-container>

          <ng-container frColumnDef="app">
            <th frHeaderCell *frHeaderCellDef>Application</th>
            <td frCell *frCellDef="let deployment">{{ deployment.app }}</td>
          </ng-container>

          <ng-container frColumnDef="owner">
            <th frHeaderCell *frHeaderCellDef>Owner</th>
            <td frCell *frCellDef="let deployment">{{ deployment.owner }}</td>
          </ng-container>

          <ng-container frColumnDef="region">
            <th frHeaderCell *frHeaderCellDef>Region</th>
            <td frCell *frCellDef="let deployment">{{ deployment.region }}</td>
          </ng-container>

          <tr frHeaderRow *frHeaderRowDef="dynamicColumns()"></tr>
          <tr frRow *frRowDef="let row; columns: dynamicColumns()"></tr>
        </table>
      </div>
    </ng-template>

    <ng-template #emptyTableTemplate>
      <div frTableContainer>
        <table frTable variant="outline" [dataSource]="[]">
          <ng-container frColumnDef="id">
            <th frHeaderCell *frHeaderCellDef>Deploy</th>
            <td frCell *frCellDef="let deployment">{{ deployment.id }}</td>
          </ng-container>

          <ng-container frColumnDef="app">
            <th frHeaderCell *frHeaderCellDef>Application</th>
            <td frCell *frCellDef="let deployment">{{ deployment.app }}</td>
          </ng-container>

          <tr frHeaderRow *frHeaderRowDef="['id', 'app']"></tr>
          <tr frRow *frRowDef="let row; columns: ['id', 'app']"></tr>

          <ng-template frNoDataRow>
            <tr>
              <td frCell colspan="2" class="docs-table-empty">No deployments match the current filters.</td>
            </tr>
          </ng-template>
        </table>
      </div>
    </ng-template>

    <ng-template #stickyTableTemplate>
      <div frTableContainer class="docs-table-scroll-x">
        <table frTable variant="outline" fixedLayout [dataSource]="largeDeployments.slice(0, 8)" class="docs-table-wide">
          <ng-container frColumnDef="id" [sticky]="true">
            <th frHeaderCell *frHeaderCellDef>Deploy</th>
            <td frCell *frCellDef="let deployment">{{ deployment.id }}</td>
          </ng-container>

          <ng-container frColumnDef="app">
            <th frHeaderCell *frHeaderCellDef>Application</th>
            <td frCell *frCellDef="let deployment">{{ deployment.app }}</td>
          </ng-container>

          <ng-container frColumnDef="owner">
            <th frHeaderCell *frHeaderCellDef>Owner</th>
            <td frCell *frCellDef="let deployment">{{ deployment.owner }}</td>
          </ng-container>

          <ng-container frColumnDef="region">
            <th frHeaderCell *frHeaderCellDef>Region</th>
            <td frCell *frCellDef="let deployment">{{ deployment.region }}</td>
          </ng-container>

          <ng-container frColumnDef="status">
            <th frHeaderCell *frHeaderCellDef>Status</th>
            <td frCell *frCellDef="let deployment">
              <span frBadge [variant]="badgeVariant(deployment.status)">{{ deployment.status }}</span>
            </td>
          </ng-container>

          <ng-container frColumnDef="cost" [stickyEnd]="true">
            <th frHeaderCell frTableNumeric *frHeaderCellDef>Cost</th>
            <td frCell frTableNumeric *frCellDef="let deployment">{{ currency(deployment.cost) }}</td>
          </ng-container>

          <tr frHeaderRow *frHeaderRowDef="stickyColumns"></tr>
          <tr frRow *frRowDef="let row; columns: stickyColumns"></tr>
        </table>
      </div>
    </ng-template>

    <ng-template #stickyHeaderTableTemplate>
      <div frTableContainer class="docs-table-scroll-y">
        <table frTable variant="outline" fixedLayout [dataSource]="largeDeployments.slice(0, 18)">
          <ng-container frColumnDef="id">
            <th frHeaderCell *frHeaderCellDef>Deploy</th>
            <td frCell *frCellDef="let deployment">{{ deployment.id }}</td>
          </ng-container>

          <ng-container frColumnDef="app">
            <th frHeaderCell *frHeaderCellDef>Application</th>
            <td frCell *frCellDef="let deployment">{{ deployment.app }}</td>
          </ng-container>

          <ng-container frColumnDef="owner">
            <th frHeaderCell *frHeaderCellDef>Owner</th>
            <td frCell *frCellDef="let deployment">{{ deployment.owner }}</td>
          </ng-container>

          <ng-container frColumnDef="cost">
            <th frHeaderCell frTableNumeric *frHeaderCellDef>Cost</th>
            <td frCell frTableNumeric *frCellDef="let deployment">{{ currency(deployment.cost) }}</td>
          </ng-container>

          <tr frHeaderRow *frHeaderRowDef="headerColumns; sticky: true"></tr>
          <tr frRow *frRowDef="let row; columns: headerColumns"></tr>
        </table>
      </div>
    </ng-template>

    <ng-template #rtlTableTemplate>
      <div frTableContainer>
        <table frTable variant="outline" [dataSource]="deployments.slice(0, 3)">
          <ng-container frColumnDef="id">
            <th frHeaderCell *frHeaderCellDef>النشر</th>
            <td frCell *frCellDef="let deployment">{{ deployment.id }}</td>
          </ng-container>

          <ng-container frColumnDef="app">
            <th frHeaderCell *frHeaderCellDef>التطبيق</th>
            <td frCell *frCellDef="let deployment">{{ deployment.app }}</td>
          </ng-container>

          <ng-container frColumnDef="cost">
            <th frHeaderCell frTableNumeric *frHeaderCellDef>التكلفة</th>
            <td frCell frTableNumeric *frCellDef="let deployment">{{ currency(deployment.cost) }}</td>
          </ng-container>

          <tr frHeaderRow *frHeaderRowDef="['id', 'app', 'cost']"></tr>
          <tr frRow *frRowDef="let row; columns: ['id', 'app', 'cost']"></tr>
        </table>
      </div>
    </ng-template>

    <ng-template #inspectorTableTemplate>
      <div frTableContainer data-token-target="table-container">
        <table frTable variant="card" [dataSource]="deployments.slice(0, 3)" data-token-target="table-root">
          <caption frTableCaption data-token-target="table-caption">
            Token inspection table for deployments.
          </caption>

          <ng-container frColumnDef="id">
            <th frHeaderCell *frHeaderCellDef data-token-target="table-head">Deploy</th>
            <td frCell *frCellDef="let deployment" data-token-target="table-cell">{{ deployment.id }}</td>
          </ng-container>

          <ng-container frColumnDef="app">
            <th frHeaderCell *frHeaderCellDef>Application</th>
            <td frCell *frCellDef="let deployment">{{ deployment.app }}</td>
          </ng-container>

          <ng-container frColumnDef="cost">
            <th frHeaderCell frTableNumeric *frHeaderCellDef>Monthly</th>
            <td frCell frTableNumeric *frCellDef="let deployment">{{ currency(deployment.cost) }}</td>
          </ng-container>

          <tr frHeaderRow *frHeaderRowDef="['id', 'app', 'cost']" data-token-target="table-header-row"></tr>
          <tr frRow *frRowDef="let row; columns: ['id', 'app', 'cost']" data-token-target="table-row"></tr>
        </table>
      </div>
    </ng-template>
  `,
  styles: `
    .docs-table-stack {
      display: grid;
      gap: 1rem;
      width: 100%;
    }

    .docs-table-toolbar {
      display: flex;
      justify-content: flex-end;
    }

    .docs-table-scroll-x {
      max-inline-size: 100%;
    }

    .docs-table-scroll-y {
      max-block-size: 18rem;
      max-inline-size: 100%;
    }

    .docs-table-wide {
      min-inline-size: 56rem;
    }

    .docs-table-empty {
      padding-block: 2.5rem;
      color: var(--frame-muted-foreground);
      text-align: center;
    }

    .docs-table-custom {
      --frame-table-radius: 1.25rem;
      --frame-table-header-bg: color-mix(in srgb, var(--frame-primary) 12%, var(--frame-surface));
      --frame-table-header-color: var(--frame-foreground);
      --frame-table-row-hover-bg: color-mix(in srgb, var(--frame-primary) 10%, transparent);
      --frame-table-row-border: color-mix(in srgb, var(--frame-primary) 20%, transparent);
      --frame-table-shadow: 0 18px 45px rgb(0 0 0 / 0.08);
    }
  `,
})
export class DocsTablePreviewComponent {
  readonly config = input.required<TablePreviewConfig>();

  protected readonly deployments = DEPLOYMENTS;
  protected readonly columns = ['id', 'app', 'status', 'region', 'cost'];
  protected readonly actionColumns = ['id', 'app', 'status', 'actions'];
  protected readonly stickyColumns = ['id', 'app', 'owner', 'region', 'status', 'cost'];
  protected readonly headerColumns = ['id', 'app', 'owner', 'cost'];
  protected readonly showOwner = signal(true);
  protected readonly dynamicColumns = computed(() =>
    this.showOwner() ? ['id', 'app', 'owner', 'region'] : ['id', 'app', 'region'],
  );
  protected readonly largeDeployments = Array.from({ length: 240 }, (_, index) => {
    const source = DEPLOYMENTS[index % DEPLOYMENTS.length];
    return {
      ...source,
      id: `DEP-${3000 + index}`,
      cost: source.cost + (index % 12) * 35,
    };
  });
  protected readonly totalCost = computed(() =>
    this.deployments.reduce((sum, deployment) => sum + deployment.cost, 0),
  );

  protected toggleOwner(): void {
    this.showOwner.update((value) => !value);
  }

  protected badgeVariant(status: Deployment['status']): 'default' | 'secondary' | 'destructive' {
    if (status === 'Failed') {
      return 'destructive';
    }

    return status === 'Queued' ? 'secondary' : 'default';
  }

  protected currency(value: number): string {
    return new Intl.NumberFormat('en-US', {
      currency: 'USD',
      maximumFractionDigits: 0,
      style: 'currency',
    }).format(value);
  }

  protected readonly trackDeployment = (_index: number, deployment: Deployment) => deployment.id;
}
