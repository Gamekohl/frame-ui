import { ChangeDetectionStrategy, Component, NO_ERRORS_SCHEMA, input } from '@angular/core';

import { FrChartModel } from '../chart.types';

@Component({
  selector: 'g[frHeatmapChartRenderer]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [NO_ERRORS_SCHEMA],
  template: `
    <svg:g class="frame-chart__heatmap" role="list">
      @if (showXAxis()) {
        <svg:g class="frame-chart__heatmap-columns" aria-hidden="true">
          @for (tick of model().heatmapColumnTicks; track tick.label + '-' + tick.x) {
            <svg:text [attr.x]="tick.x" [attr.y]="tick.y" text-anchor="middle">{{ tick.label }}</svg:text>
          }
        </svg:g>
      }
      @if (showYAxis()) {
        <svg:g class="frame-chart__heatmap-rows" aria-hidden="true">
          @for (tick of model().heatmapRowTicks; track tick.label) {
            <svg:text [attr.x]="tick.x" [attr.y]="tick.y" text-anchor="end" dominant-baseline="middle">
              {{ tick.label }}
            </svg:text>
          }
        </svg:g>
      }
      @for (cell of model().heatmapCells; track cell.key) {
        <svg:rect
          class="frame-chart__heatmap-cell"
          role="listitem"
          [style.--frame-chart-heatmap-order]="cell.order"
          [attr.data-active]="activeIndex() === cell.order ? '' : null"
          [attr.x]="cell.x"
          [attr.y]="cell.y"
          [attr.width]="cell.width"
          [attr.height]="cell.height"
          [attr.fill]="cell.color"
          [attr.aria-label]="cell.label + ': ' + formatValue(cell.value)"
        ></svg:rect>
      }
    </svg:g>
  `,
})
export class FrHeatmapChartRenderer {
  readonly activeIndex = input<number | null>(null);
  readonly model = input.required<FrChartModel>();
  readonly showXAxis = input(true);
  readonly showYAxis = input(true);
  readonly valueFormatter = input<((value: number) => string) | null>(null);

  protected formatValue(value: number): string {
    return this.valueFormatter()?.(value) ?? new Intl.NumberFormat(undefined, { maximumFractionDigits: 1 }).format(value);
  }
}
