import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  Directive,
  input,
  ViewEncapsulation,
} from '@angular/core';
import {
  CDK_ROW_TEMPLATE,
  CDK_TABLE,
  CdkCellOutlet,
  CdkCellDef,
  CdkColumnDef,
  CdkFooterCellDef,
  CdkFooterRow,
  CdkFooterRowDef,
  CdkHeaderCellDef,
  CdkHeaderRow,
  CdkHeaderRowDef,
  CdkNoDataRow,
  CdkRow,
  CdkRowDef,
  CdkTable,
  DataRowOutlet,
  FooterRowOutlet,
  HeaderRowOutlet,
  NoDataRowOutlet,
  STICKY_POSITIONING_LISTENER,
} from '@angular/cdk/table';

export const FR_TABLE_DENSITIES = ['sm', 'md', 'lg'] as const;
export const FR_TABLE_VARIANTS = ['default', 'outline', 'card'] as const;

export type FrTableDensity = (typeof FR_TABLE_DENSITIES)[number];
export type FrTableVariant = (typeof FR_TABLE_VARIANTS)[number];

/** CDK table wrapper with FrameUI density and variant styling. */
@Component({
  selector: 'table[frTable], frame-table',
  exportAs: 'frTable',
  imports: [
    DataRowOutlet,
    FooterRowOutlet,
    HeaderRowOutlet,
    NoDataRowOutlet,
  ],
  host: {
    class: 'cdk-table frame-table',
    '[class.cdk-table-fixed-layout]': 'fixedLayout',
    '[attr.data-density]': 'density()',
    '[attr.data-variant]': 'variant()',
    '[attr.data-striped]': 'striped()',
    '[attr.data-hover]': 'hover()',
  },
  providers: [
    {
      provide: CdkTable,
      useExisting: FrTable,
    },
    {
      provide: CDK_TABLE,
      useExisting: FrTable,
    },
    {
      provide: STICKY_POSITIONING_LISTENER,
      useValue: null,
    },
  ],
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-content select="caption" />
    <ng-content select="colgroup, col" />

    @if (_isServer) {
      <ng-content />
    }

    @if (_isNativeHtmlTable) {
      <thead role="rowgroup" frTableHeader>
        <ng-container headerRowOutlet />
      </thead>
      <tbody role="rowgroup" frTableBody>
        <ng-container rowOutlet />
        <ng-container noDataRowOutlet />
      </tbody>
      <tfoot role="rowgroup" frTableFooter>
        <ng-container footerRowOutlet />
      </tfoot>
    } @else {
      <ng-container headerRowOutlet />
      <ng-container rowOutlet />
      <ng-container noDataRowOutlet />
      <ng-container footerRowOutlet />
    }
  `,
})
export class FrTable<T> extends CdkTable<T> {
  readonly density = input<FrTableDensity>('md');
  readonly hover = input(true, { transform: booleanAttribute });
  readonly striped = input(false, { transform: booleanAttribute });
  readonly variant = input<FrTableVariant>('default');
}

/** Scrollable container for tables. */
@Directive({
  selector: '[frTableContainer], frame-table-container',
  host: {
    class: 'frame-table-container',
  },
})
export class FrTableContainer {}

/** Caption slot for table. */
@Directive({
  selector: '[frTableCaption], frame-table-caption, caption[frTableCaption]',
  host: {
    class: 'frame-table__caption',
  },
})
export class FrTableCaption {}

/** Header slot for table. */
@Directive({
  selector: '[frTableHeader], frame-table-header, thead[frTableHeader]',
  host: {
    class: 'frame-table__header',
  },
})
export class FrTableHeader {}

/** Body slot for table. */
@Directive({
  selector: '[frTableBody], frame-table-body, tbody[frTableBody]',
  host: {
    class: 'frame-table__body',
  },
})
export class FrTableBody {}

/** Footer slot for table. */
@Directive({
  selector: '[frTableFooter], frame-table-footer, tfoot[frTableFooter]',
  host: {
    class: 'frame-table__footer',
  },
})
export class FrTableFooter {}

/** Column definition bridge to CDK table. */
@Directive({
  selector: '[frColumnDef]',
  hostDirectives: [
    {
      directive: CdkColumnDef,
      inputs: ['cdkColumnDef: frColumnDef', 'sticky', 'stickyEnd'],
    },
  ],
})
export class FrColumnDef {}

/** Header cell template definition for CDK table. */
@Directive({
  selector: '[frHeaderCellDef]',
  hostDirectives: [CdkHeaderCellDef],
})
export class FrHeaderCellDef {}

/** Body cell template definition for CDK table. */
@Directive({
  selector: '[frCellDef]',
  hostDirectives: [CdkCellDef],
})
export class FrCellDef {}

/** Footer cell template definition for CDK table. */
@Directive({
  selector: '[frFooterCellDef]',
  hostDirectives: [CdkFooterCellDef],
})
export class FrFooterCellDef {}

/** Header cell host for table columns. */
@Directive({
  selector: 'th[frHeaderCell], frame-header-cell',
  host: {
    class: 'frame-table__head',
  },
})
export class FrHeaderCell {}

/** Body cell host for table rows. */
@Directive({
  selector: 'td[frCell], frame-cell',
  host: {
    class: 'frame-table__cell',
  },
})
export class FrCell {}

/** Footer cell host for table summaries. */
@Directive({
  selector: 'td[frFooterCell], frame-footer-cell',
  host: {
    class: 'frame-table__cell frame-table__footer-cell',
  },
})
export class FrFooterCell {}

/** Header row rendered by CDK table. */
@Component({
  selector: 'tr[frHeaderRow], frame-header-row',
  imports: [CdkCellOutlet],
  host: {
    class: 'cdk-header-row frame-table__row frame-table__header-row',
    role: 'row',
  },
  providers: [
    {
      provide: CdkHeaderRow,
      useExisting: FrHeaderRow,
    },
  ],
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.None,
  template: CDK_ROW_TEMPLATE,
})
export class FrHeaderRow extends CdkHeaderRow {}

/** Body row rendered by CDK table. */
@Component({
  selector: 'tr[frRow], frame-row',
  imports: [CdkCellOutlet],
  host: {
    class: 'cdk-row frame-table__row',
    role: 'row',
  },
  providers: [
    {
      provide: CdkRow,
      useExisting: FrRow,
    },
  ],
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.None,
  template: CDK_ROW_TEMPLATE,
})
export class FrRow extends CdkRow {}

/** Footer row rendered by CDK table. */
@Component({
  selector: 'tr[frFooterRow], frame-footer-row',
  imports: [CdkCellOutlet],
  host: {
    class: 'cdk-footer-row frame-table__row frame-table__footer-row',
    role: 'row',
  },
  providers: [
    {
      provide: CdkFooterRow,
      useExisting: FrFooterRow,
    },
  ],
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.None,
  template: CDK_ROW_TEMPLATE,
})
export class FrFooterRow extends CdkFooterRow {}

/** Header row definition bridge to CDK table. */
@Directive({
  selector: '[frHeaderRowDef]',
  hostDirectives: [
    {
      directive: CdkHeaderRowDef,
      inputs: ['cdkHeaderRowDef: frHeaderRowDef', 'cdkHeaderRowDefSticky: frHeaderRowDefSticky'],
    },
  ],
})
export class FrHeaderRowDef {}

/** Body row definition bridge to CDK table. */
@Directive({
  selector: '[frRowDef]',
  hostDirectives: [
    {
      directive: CdkRowDef,
      inputs: ['cdkRowDefColumns: frRowDefColumns', 'cdkRowDefWhen: frRowDefWhen'],
    },
  ],
})
export class FrRowDef<T> {}

/** Footer row definition bridge to CDK table. */
@Directive({
  selector: '[frFooterRowDef]',
  hostDirectives: [
    {
      directive: CdkFooterRowDef,
      inputs: ['cdkFooterRowDef: frFooterRowDef', 'cdkFooterRowDefSticky: frFooterRowDefSticky'],
    },
  ],
})
export class FrFooterRowDef {}

/** Fallback row rendered when table data is empty. */
@Directive({
  selector: 'ng-template[frNoDataRow]',
  hostDirectives: [CdkNoDataRow],
})
export class FrNoDataRow {}

/** Numeric alignment helper for table cells. */
@Directive({
  selector: '[frTableNumeric]',
  host: {
    class: 'frame-table__numeric',
  },
})
export class FrTableNumeric {}

/** Muted text helper for table content. */
@Directive({
  selector: '[frTableMuted]',
  host: {
    class: 'frame-table__muted',
  },
})
export class FrTableMuted {}

/** Virtualized table viewport helper. */
@Directive({
  selector: '[frTableVirtual], frame-table-virtual',
  host: {
    class: 'frame-table-virtual',
  },
})
export class FrTableVirtual {}

/** Header slot for table virtual. */
@Directive({
  selector: '[frTableVirtualHeader], frame-table-virtual-header',
  host: {
    class: 'frame-table-virtual__header',
  },
})
export class FrTableVirtualHeader {}

/** Virtualized table row helper. */
@Directive({
  selector: '[frTableVirtualRow], frame-table-virtual-row',
  host: {
    class: 'frame-table-virtual__row',
  },
})
export class FrTableVirtualRow {}

/** Virtualized table cell helper. */
@Directive({
  selector: '[frTableVirtualCell], frame-table-virtual-cell',
  host: {
    class: 'frame-table-virtual__cell',
  },
})
export class FrTableVirtualCell {}

