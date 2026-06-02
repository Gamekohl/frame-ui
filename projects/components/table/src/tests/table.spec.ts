import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { FrTableModule } from '../../table.module';
import { FrVirtualScrollModule } from '@frame-ui/components/virtual-scroll';

type Invoice = {
  id: string;
  status: string;
  method: string;
  amount: number;
};

const INVOICES: Invoice[] = [
  { id: 'INV-1001', status: 'Paid', method: 'Card', amount: 240 },
  { id: 'INV-1002', status: 'Pending', method: 'Transfer', amount: 180 },
];

@Component({
  imports: [FrTableModule],
  standalone: true,
  template: `
    <div frTableContainer>
      <table frTable variant="card" density="sm" striped [dataSource]="invoices">
        <caption frTableCaption>Recent invoices</caption>

        <ng-container frColumnDef="id">
          <th frHeaderCell *frHeaderCellDef>Invoice</th>
          <td frCell *frCellDef="let invoice">{{ invoice.id }}</td>
        </ng-container>

        <ng-container frColumnDef="status">
          <th frHeaderCell *frHeaderCellDef>Status</th>
          <td frCell *frCellDef="let invoice">{{ invoice.status }}</td>
        </ng-container>

        <tr frHeaderRow *frHeaderRowDef="columns"></tr>
        <tr frRow *frRowDef="let row; columns: columns" data-selected="true"></tr>
      </table>
    </div>
  `,
})
class StaticTableHostComponent {
  protected readonly columns = ['id', 'status'];
  protected readonly invoices = INVOICES.slice(0, 1);
}

@Component({
  imports: [FrTableModule],
  standalone: true,
  template: `
    <table frTable [dataSource]="invoices" fixedLayout>
      <ng-container frColumnDef="id">
        <th frHeaderCell *frHeaderCellDef>Invoice</th>
        <td frCell *frCellDef="let invoice">{{ invoice.id }}</td>
        <td frFooterCell *frFooterCellDef>Total</td>
      </ng-container>

      <ng-container frColumnDef="status">
        <th frHeaderCell *frHeaderCellDef>Status</th>
        <td frCell *frCellDef="let invoice">{{ invoice.status }}</td>
        <td frFooterCell *frFooterCellDef></td>
      </ng-container>

      <ng-container frColumnDef="amount">
        <th frHeaderCell frTableNumeric *frHeaderCellDef>Amount</th>
        <td frCell frTableNumeric *frCellDef="let invoice">{{ invoice.amount }}</td>
        <td frFooterCell frTableNumeric *frFooterCellDef>{{ total }}</td>
      </ng-container>

      <tr frHeaderRow *frHeaderRowDef="columns"></tr>
      <tr frRow *frRowDef="let row; columns: columns"></tr>
      <tr frFooterRow *frFooterRowDef="columns"></tr>
    </table>
  `,
})
class CdkTableHostComponent {
  protected readonly columns = ['id', 'status', 'amount'];
  protected readonly invoices = INVOICES;
  protected readonly total = INVOICES.reduce((sum, invoice) => sum + invoice.amount, 0);
}

@Component({
  imports: [FrTableModule],
  standalone: true,
  template: `
    <div frTableContainer>
      <table frTable [dataSource]="invoices" fixedLayout>
        <ng-container frColumnDef="id" [sticky]="true">
          <th frHeaderCell *frHeaderCellDef>Invoice</th>
          <td frCell *frCellDef="let invoice">{{ invoice.id }}</td>
        </ng-container>

        <ng-container frColumnDef="status">
          <th frHeaderCell *frHeaderCellDef>Status</th>
          <td frCell *frCellDef="let invoice">{{ invoice.status }}</td>
        </ng-container>

        <ng-container frColumnDef="amount" [stickyEnd]="true">
          <th frHeaderCell frTableNumeric *frHeaderCellDef>Amount</th>
          <td frCell frTableNumeric *frCellDef="let invoice">{{ invoice.amount }}</td>
        </ng-container>

        <tr frHeaderRow *frHeaderRowDef="columns; sticky: true"></tr>
        <tr frRow *frRowDef="let row; columns: columns"></tr>
      </table>
    </div>
  `,
})
class StickyTableHostComponent {
  protected readonly columns = ['id', 'status', 'amount'];
  protected readonly invoices = INVOICES;
}

@Component({
  imports: [FrTableModule, FrVirtualScrollModule],
  standalone: true,
  template: `
    <div frTableVirtual style="--frame-table-virtual-columns: 8rem 1fr 6rem;">
      <div frTableVirtualHeader>
        <div frTableVirtualCell>Invoice</div>
        <div frTableVirtualCell>Status</div>
        <div frTableVirtualCell frTableNumeric>Amount</div>
      </div>

      <div frVirtualViewport [height]="'96px'" [itemSize]="32" [overscan]="1" #viewport="frVirtualViewport">
        <div frVirtualContent>
          <div frTableVirtualRow class="virtual-row" *frVirtualFor="let invoice of invoices">
            <div frTableVirtualCell>{{ invoice.id }}</div>
            <div frTableVirtualCell>{{ invoice.status }}</div>
            <div frTableVirtualCell frTableNumeric>{{ invoice.amount }}</div>
          </div>
        </div>
      </div>
    </div>
  `,
})
class VirtualTableHostComponent {
  protected readonly invoices = Array.from({ length: 100 }, (_, index) => ({
    id: `INV-${index + 1}`,
    status: index % 2 === 0 ? 'Paid' : 'Pending',
    amount: index * 10,
  }));
}

describe('FrTable', () => {
  it('styles native table primitives', () => {
    const fixture = TestBed.createComponent(StaticTableHostComponent);
    fixture.detectChanges();

    const table = fixture.nativeElement.querySelector('table') as HTMLTableElement;
    const container = fixture.nativeElement.querySelector('[frtablecontainer]') as HTMLElement;
    const caption = fixture.nativeElement.querySelector('[frtablecaption]') as HTMLElement;
    const cell = fixture.nativeElement.querySelector('[frcell]') as HTMLElement;

    expect(container.classList.contains('frame-table-container')).toBe(true);
    expect(table.classList.contains('frame-table')).toBe(true);
    expect(table.getAttribute('data-variant')).toBe('card');
    expect(table.getAttribute('data-density')).toBe('sm');
    expect(table.getAttribute('data-striped')).toBe('true');
    expect(caption.classList.contains('frame-table__caption')).toBe(true);
    expect(cell.classList.contains('frame-table__cell')).toBe(true);
  });

  it('renders rows through CDK table aliases', () => {
    const fixture = TestBed.createComponent(CdkTableHostComponent);
    fixture.detectChanges();

    const rows = Array.from(fixture.nativeElement.querySelectorAll('tbody tr')) as HTMLTableRowElement[];
    const footer = fixture.nativeElement.querySelector('tfoot') as HTMLElement;

    expect(rows.length).toBe(2);
    expect(rows[0]?.textContent).toContain('INV-1001');
    expect(rows[1]?.textContent).toContain('Pending');
    expect(footer.textContent).toContain('420');
  });

  it('supports sticky column and header row aliases', () => {
    const fixture = TestBed.createComponent(StickyTableHostComponent);
    fixture.detectChanges();
    fixture.detectChanges();

    const firstHeaderCell = fixture.nativeElement.querySelector('thead th:first-child') as HTMLTableCellElement;
    const middleHeaderCell = fixture.nativeElement.querySelector('thead th:nth-child(2)') as HTMLTableCellElement;
    const lastHeaderCell = fixture.nativeElement.querySelector('thead th:last-child') as HTMLTableCellElement;
    const firstBodyCell = fixture.nativeElement.querySelector('tbody td:first-child') as HTMLTableCellElement;
    const lastBodyCell = fixture.nativeElement.querySelector('tbody td:last-child') as HTMLTableCellElement;

    expect(firstHeaderCell.classList.contains('cdk-table-sticky')).toBe(true);
    expect(middleHeaderCell.classList.contains('cdk-table-sticky')).toBe(true);
    expect(lastHeaderCell.classList.contains('cdk-table-sticky')).toBe(true);
    expect(firstBodyCell.classList.contains('cdk-table-sticky')).toBe(true);
    expect(lastBodyCell.classList.contains('cdk-table-sticky')).toBe(true);
    expect(middleHeaderCell.style.position).toBe('sticky');
    expect(middleHeaderCell.style.top).toBe('0px');
    expect(firstBodyCell.style.position).toBe('sticky');
    expect(firstBodyCell.style.left).toBe('0px');
    expect(lastBodyCell.style.position).toBe('sticky');
    expect(lastBodyCell.style.right).toBe('0px');
  });

  it('composes table styling with FrVirtualScroll', () => {
    const fixture = TestBed.createComponent(VirtualTableHostComponent);
    const viewportElement = fixture.nativeElement.querySelector('[frvirtualviewport]') as HTMLElement;

    Object.defineProperty(viewportElement, 'clientHeight', {
      configurable: true,
      value: 96,
    });

    fixture.detectChanges();

    const table = fixture.nativeElement.querySelector('[frtablevirtual]') as HTMLElement;
    const rows = Array.from(fixture.nativeElement.querySelectorAll('.virtual-row')) as HTMLElement[];

    expect(table.classList.contains('frame-table-virtual')).toBe(true);
    expect(rows.length).toBeGreaterThan(0);
    expect(rows[0]?.classList.contains('frame-table-virtual__row')).toBe(true);
  });
});
