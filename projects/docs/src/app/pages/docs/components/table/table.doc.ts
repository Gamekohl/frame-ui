import { ComponentDoc } from '../../shared/models/component-doc.model';
import { DocsTablePreviewComponent } from './previews/table-preview';

const importsCode = `import { CurrencyPipe } from '@angular/common';
import { FrBadgeModule } from '@frame-ui-ng/components/badge';
import { FrTableModule } from '@frame-ui-ng/components/table';`;

const basicTs = `${importsCode}

columns = ['id', 'app', 'status', 'region', 'cost'];

deployments = [
  { id: 'DEP-2048', app: 'Atlas Studio', owner: 'Mira', status: 'Ready', region: 'EU Central', cost: 1280 },
  { id: 'DEP-2049', app: 'Northwind Portal', owner: 'Rhea', status: 'Queued', region: 'US East', cost: 860 },
  { id: 'DEP-2050', app: 'Signal Desk', owner: 'Nora', status: 'Ready', region: 'AP South', cost: 1440 },
];

badgeVariant(status: string): 'success' | 'secondary' | 'destructive' {
  if (status === 'Failed') {
    return 'destructive';
  }

  return status === 'Queued' ? 'secondary' : 'success';
}

totalCost(): number {
  return this.deployments.reduce((total, deployment) => total + deployment.cost, 0);
}`;

const basicHtml = `<div frTableContainer>
  <table frTable variant="outline" [dataSource]="deployments">
    <caption frTableCaption>Deployment activity from the current workspace.</caption>

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
      <td frCell *frCellDef="let deployment">
        <span frBadge [variant]="badgeVariant(deployment.status)">{{ deployment.status }}</span>
      </td>
    </ng-container>

    <ng-container frColumnDef="region">
      <th frHeaderCell *frHeaderCellDef>Region</th>
      <td frCell frTableMuted *frCellDef="let deployment">{{ deployment.region }}</td>
    </ng-container>

    <ng-container frColumnDef="cost">
      <th frHeaderCell frTableNumeric *frHeaderCellDef>Monthly</th>
      <td frCell frTableNumeric *frCellDef="let deployment">{{ deployment.cost | currency }}</td>
    </ng-container>

    <tr frHeaderRow *frHeaderRowDef="columns"></tr>
    <tr frRow *frRowDef="let row; columns: columns"></tr>
  </table>
</div>`;

const footerHtml = `<div frTableContainer>
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

    <ng-container frColumnDef="cost">
      <th frHeaderCell frTableNumeric *frHeaderCellDef>Monthly</th>
      <td frCell frTableNumeric *frCellDef="let deployment">{{ deployment.cost | currency }}</td>
      <td frFooterCell frTableNumeric *frFooterCellDef>{{ totalCost() | currency }}</td>
    </ng-container>

    <tr frHeaderRow *frHeaderRowDef="['id', 'app', 'cost']"></tr>
    <tr frRow *frRowDef="let row; columns: ['id', 'app', 'cost']"></tr>
    <tr frFooterRow *frFooterRowDef="['id', 'app', 'cost']"></tr>
  </table>
</div>`;

const actionsHtml = `<div frTableContainer>
  <table frTable variant="outline" [dataSource]="deployments">
    <ng-container frColumnDef="id">
      <th frHeaderCell *frHeaderCellDef>Deploy</th>
      <td frCell *frCellDef="let deployment">{{ deployment.id }}</td>
    </ng-container>

    <ng-container frColumnDef="app">
      <th frHeaderCell *frHeaderCellDef>Application</th>
      <td frCell *frCellDef="let deployment">{{ deployment.app }}</td>
    </ng-container>

    <ng-container frColumnDef="actions">
      <th frHeaderCell frTableNumeric *frHeaderCellDef>Actions</th>
      <td frCell frTableNumeric *frCellDef="let deployment">
        <button frButton appearance="ghost" size="sm" type="button">Review</button>
      </td>
    </ng-container>

    <tr frHeaderRow *frHeaderRowDef="['id', 'app', 'actions']"></tr>
    <tr frRow *frRowDef="let row; columns: ['id', 'app', 'actions']"></tr>
  </table>
</div>`;

const dynamicTs = `import { computed, signal } from '@angular/core';
import { FrButtonModule } from '@frame-ui-ng/components/button';
${basicTs}

showOwner = signal(true);

dynamicColumns = computed(() =>
  this.showOwner() ? ['id', 'app', 'owner', 'region'] : ['id', 'app', 'region'],
);`;

const dynamicHtml = `<button frButton appearance="outline" size="sm" type="button" (click)="showOwner.update((value) => !value)">
  {{ showOwner() ? 'Hide owner' : 'Show owner' }}
</button>

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
</table>`;

const emptyHtml = `<div frTableContainer>
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
        <td frCell colspan="2">No deployments match the current filters.</td>
      </tr>
    </ng-template>
  </table>
</div>`;

const stickyColumnsHtml = `<div frTableContainer>
  <table frTable variant="outline" fixedLayout [dataSource]="deployments" style="min-inline-size: 56rem;">
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
      <td frCell frTableNumeric *frCellDef="let deployment">{{ deployment.cost | currency }}</td>
    </ng-container>

    <tr frHeaderRow *frHeaderRowDef="['id', 'app', 'owner', 'region', 'status', 'cost']"></tr>
    <tr frRow *frRowDef="let row; columns: ['id', 'app', 'owner', 'region', 'status', 'cost']"></tr>
  </table>
</div>`;

const stickyHeaderHtml = `<div frTableContainer style="max-block-size: 18rem;">
  <table frTable variant="outline" fixedLayout [dataSource]="deployments">
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
      <td frCell frTableNumeric *frCellDef="let deployment">{{ deployment.cost | currency }}</td>
    </ng-container>

    <tr frHeaderRow *frHeaderRowDef="['id', 'app', 'owner', 'cost']; sticky: true"></tr>
    <tr frRow *frRowDef="let row; columns: ['id', 'app', 'owner', 'cost']"></tr>
  </table>
</div>`;

const virtualTs = `${importsCode}
import { FrVirtualScrollModule } from '@frame-ui-ng/components/virtual-scroll';

largeDeployments = Array.from({ length: 240 }, (_, index) => ({
  id: \`DEP-\${3000 + index}\`,
  app: ['Atlas Studio', 'Signal Desk', 'Beacon API'][index % 3],
  owner: ['Mira', 'Rhea', 'Nora'][index % 3],
  region: ['EU Central', 'US East', 'AP South'][index % 3],
  cost: 720 + (index % 12) * 35,
}));

trackDeployment = (_index: number, deployment: { id: string }) => deployment.id;`;

const virtualHtml = `<div frTableVirtual style="--frame-table-virtual-columns: 8rem 14rem 8rem 9rem 7rem;">
  <div frTableVirtualHeader>
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
      >
        <div frTableVirtualCell>{{ deployment.id }}</div>
        <div frTableVirtualCell>{{ deployment.app }}</div>
        <div frTableVirtualCell>{{ deployment.owner }}</div>
        <div frTableVirtualCell>{{ deployment.region }}</div>
        <div frTableVirtualCell frTableNumeric>{{ deployment.cost | currency }}</div>
      </div>
    </div>
  </div>
</div>`;

const customCss = `.workspace-table {
  --frame-table-radius: var(--frame-radius-lg);
  --frame-table-header-bg: color-mix(in srgb, var(--frame-primary) 12%, var(--frame-surface));
  --frame-table-row-hover-bg: color-mix(in srgb, var(--frame-primary) 10%, transparent);
  --frame-table-row-border: color-mix(in srgb, var(--frame-primary) 20%, transparent);
  --frame-table-shadow: 0 18px 45px rgb(0 0 0 / 0.08);
}`;

const rtlHtml = `<div dir="rtl">
  <table frTable variant="outline" [dataSource]="deployments">
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
      <td frCell frTableNumeric *frCellDef="let deployment">{{ deployment.cost | currency }}</td>
    </ng-container>

    <tr frHeaderRow *frHeaderRowDef="['id', 'app', 'cost']"></tr>
    <tr frRow *frRowDef="let row; columns: ['id', 'app', 'cost']"></tr>
  </table>
</div>`;

const tokens = `--frame-table-bg: var(--frame-background);
--frame-table-color: var(--frame-foreground);
--frame-table-border: var(--frame-border);
--frame-table-radius: var(--frame-radius-md);
--frame-table-shadow: var(--frame-shadow-sm);
--frame-table-caption-color: var(--frame-muted-foreground);
--frame-table-caption-font-size: 0.875rem;
--frame-table-header-bg: transparent;
--frame-table-header-color: var(--frame-muted-foreground);
--frame-table-header-font-size: 0.875rem;
--frame-table-header-font-weight: 500;
--frame-table-row-border: var(--frame-border);
--frame-table-row-hover-bg: var(--frame-accent);
--frame-table-row-selected-bg: color-mix(in srgb, var(--frame-primary) 10%, transparent);
--frame-table-row-striped-bg: color-mix(in srgb, var(--frame-muted) 45%, transparent);
--frame-table-cell-padding-block: 0.75rem;
--frame-table-cell-padding-inline: 1rem;
--frame-table-cell-font-size: 0.875rem;
--frame-table-cell-line-height: 1.5;
--frame-table-footer-bg: transparent;
--frame-table-footer-font-weight: 600;
--frame-table-transition-duration: 150ms;
--frame-table-sticky-shadow: 1px 0 0 var(--frame-table-border);`;

export const TABLE_DOC: ComponentDoc = {
  slug: 'table',
  breadcrumb: 'Components / Table',

  hero: {
    id: 'table-hero',
    title: 'Preview',
    preview: {
      component: DocsTablePreviewComponent,
      inputs: {
        config: { mode: 'basic' },
      },
    },
  },

  installation: {
    cli: {
      language: 'bash',
      code: 'npx your-cli add table',
    },
    manual: {
      steps: [
        {
          title: 'Import the table primitives.',
          code: {
            language: 'ts',
            code: importsCode,
          },
        },
        {
          title: 'Import virtual scrolling when rendering large table-like lists.',
          code: {
            language: 'ts',
            code: `import { FrVirtualScrollModule } from '@frame-ui-ng/components/virtual-scroll';`,
          },
        },
      ],
    },
  },

  usage: [
    {
      language: 'ts',
      code: basicTs,
    },
    {
      language: 'html',
      code: basicHtml,
    },
  ],

  tokenInspector: {
    id: 'token-inspector',
    title: 'Token inspector',
    description:
      'Inspect the container, table root, caption, header cells, body rows, and data cells used by the CDK-backed table.',
    preview: {
      component: DocsTablePreviewComponent,
      inputs: {
        config: { mode: 'inspector' },
      },
      inspectorTargets: [
        {
          id: 'container',
          label: 'Container',
          selector: '[data-token-target="table-container"]',
          description: 'The scroll container clips wide tables and carries the table radius.',
          tokens: ['--frame-table-radius'],
        },
        {
          id: 'root',
          label: 'Table root',
          selector: '[data-token-target="table-root"]',
          description: 'The table root controls the surface, foreground color, border, radius, shadow, and density.',
          tokens: [
            '--frame-table-bg',
            '--frame-table-color',
            '--frame-table-border',
            '--frame-table-radius',
            '--frame-table-shadow',
            '--frame-table-cell-font-size',
            '--frame-table-cell-line-height',
          ],
        },
        {
          id: 'caption',
          label: 'Caption',
          selector: '[data-token-target="table-caption"]',
          description: 'Caption tokens tune supporting table copy beneath the data grid.',
          tokens: ['--frame-table-caption-color', '--frame-table-caption-font-size'],
        },
        {
          id: 'header',
          label: 'Header cell',
          selector: '[data-token-target="table-head"]',
          description: 'Header cells define column labels and inherit the header row surface.',
          tokens: [
            '--frame-table-header-bg',
            '--frame-table-header-color',
            '--frame-table-header-font-size',
            '--frame-table-header-font-weight',
          ],
        },
        {
          id: 'row',
          label: 'Body row',
          selector: '[data-token-target="table-row"]',
          description: 'Rows carry the border, hover, selected, striped, and transition styling.',
          tokens: [
            '--frame-table-row-border',
            '--frame-table-row-hover-bg',
            '--frame-table-row-selected-bg',
            '--frame-table-row-striped-bg',
            '--frame-table-transition-duration',
          ],
        },
        {
          id: 'cell',
          label: 'Data cell',
          selector: '[data-token-target="table-cell"]',
          description: 'Cells define the table spacing rhythm and text alignment helpers.',
          tokens: [
            '--frame-table-cell-padding-block',
            '--frame-table-cell-padding-inline',
            '--frame-table-cell-font-size',
            '--frame-table-cell-line-height',
          ],
        },
      ],
    },
  },

  styling: {
    description:
      'Override tokens on the table or a parent wrapper to tune density, surfaces, borders, row hover states, and card treatments locally.',
    preview: {
      id: 'custom-styling-preview',
      title: 'Custom Styling Preview',
      description: 'This preview uses local CSS variables to give the table a stronger workspace-card treatment.',
      preview: {
        component: DocsTablePreviewComponent,
        inputs: {
          config: { mode: 'custom-styling' },
        },
      },
      code: [
        {
          language: 'css',
          code: customCss,
        },
      ],
    },
  },

  examples: [
    {
      id: 'basic',
      title: 'Basic',
      description: 'Use CDK column and row definitions for semantic tables with FrameUI styling.',
      preview: {
        component: DocsTablePreviewComponent,
        inputs: {
          config: { mode: 'basic' },
        },
      },
      code: [
        {
          language: 'ts',
          code: basicTs,
        },
        {
          language: 'html',
          code: basicHtml,
        },
      ],
    },
    {
      id: 'footer',
      title: 'Footer',
      description: 'Add footer cell definitions when the table needs totals, summaries, or closing metadata.',
      preview: {
        component: DocsTablePreviewComponent,
        inputs: {
          config: { mode: 'footer' },
        },
      },
      code: [
        {
          language: 'ts',
          code: basicTs,
        },
        {
          language: 'html',
          code: footerHtml,
        },
      ],
    },
    {
      id: 'actions',
      title: 'Actions',
      description: 'Place buttons or menus in a trailing action column while keeping the row structure accessible.',
      preview: {
        component: DocsTablePreviewComponent,
        inputs: {
          config: { mode: 'actions' },
        },
      },
      code: [
        {
          language: 'ts',
          code: `import { FrButtonModule } from '@frame-ui-ng/components/button';
${basicTs}`,
        },
        {
          language: 'html',
          code: actionsHtml,
        },
      ],
    },
    {
      id: 'dynamic-columns',
      title: 'Dynamic Columns',
      description: 'Drive the row definition from a signal or computed value when columns can be toggled.',
      preview: {
        component: DocsTablePreviewComponent,
        inputs: {
          config: { mode: 'dynamic' },
        },
      },
      code: [
        {
          language: 'ts',
          code: dynamicTs,
        },
        {
          language: 'html',
          code: dynamicHtml,
        },
      ],
    },
    {
      id: 'empty-state',
      title: 'Empty State',
      description: 'Use FrNoDataRow for empty results without special-casing the whole table template.',
      preview: {
        component: DocsTablePreviewComponent,
        inputs: {
          config: { mode: 'empty' },
        },
      },
      code: [
        {
          language: 'ts',
          code: importsCode,
        },
        {
          language: 'html',
          code: emptyHtml,
        },
      ],
    },
    {
      id: 'sticky',
      title: 'Sticky Columns',
      description: 'Use CDK sticky column inputs for wide tables that need pinned leading or trailing context.',
      preview: {
        component: DocsTablePreviewComponent,
        inputs: {
          config: { mode: 'sticky' },
        },
      },
      code: [
        {
          language: 'ts',
          code: basicTs,
        },
        {
          language: 'html',
          code: stickyColumnsHtml,
        },
      ],
    },
    {
      id: 'sticky-header',
      title: 'Sticky Header',
      description: 'Use row-definition sticky microsyntax when the header should remain visible inside a scrollable table container.',
      preview: {
        component: DocsTablePreviewComponent,
        inputs: {
          config: { mode: 'sticky-header' },
        },
      },
      code: [
        {
          language: 'ts',
          code: basicTs,
        },
        {
          language: 'html',
          code: stickyHeaderHtml,
        },
      ],
    },
    {
      id: 'virtual-scroll',
      title: 'Virtual Scroll',
      description: 'Compose table virtual primitives with FrVirtualScroll for large datasets with fixed row heights.',
      preview: {
        component: DocsTablePreviewComponent,
        inputs: {
          config: { mode: 'virtual' },
        },
      },
      code: [
        {
          language: 'ts',
          code: virtualTs,
        },
        {
          language: 'html',
          code: virtualHtml,
        },
      ],
    },
    {
      id: 'rtl',
      title: 'RTL',
      description: 'Logical spacing and numeric alignment helpers continue to work in right-to-left layouts.',
      preview: {
        component: DocsTablePreviewComponent,
        inputs: {
          config: { mode: 'rtl' },
        },
      },
      code: [
        {
          language: 'ts',
          code: basicTs,
        },
        {
          language: 'html',
          code: rtlHtml,
        },
      ],
    },
  ],

  tokensTitle: 'Design Tokens',
  tokensDescription:
    'Use these CSS custom properties to tune table surfaces, captions, header treatment, row states, cell spacing, footers, and sticky columns.',
  tokens,
};
