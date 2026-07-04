import { ChangeDetectionStrategy, Component, NO_ERRORS_SCHEMA, input } from '@angular/core';

import { FrChartModel } from '../chart.types';

@Component({
  selector: 'g[frCircularChartRenderer]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [NO_ERRORS_SCHEMA],
  template: `
    <svg:g class="frame-chart__pie">
      @for (slice of model().slices; track slice.key) {
        <svg:g class="frame-chart__pie-slice-frame" [style.--frame-chart-slice-order]="slice.order">
          <svg:path
            class="frame-chart__pie-slice"
            [attr.d]="slice.path"
            [attr.fill]="slice.color"
            [attr.aria-label]="slice.label + ': ' + formatValue(slice.value)"
          ></svg:path>
        </svg:g>
      }
    </svg:g>
  `,
})
export class FrCircularChartRenderer {
  readonly model = input.required<FrChartModel>();
  readonly valueFormatter = input<((value: number) => string) | null>(null);

  protected formatValue(value: number): string {
    return this.valueFormatter()?.(value) ?? new Intl.NumberFormat(undefined, { maximumFractionDigits: 1 }).format(value);
  }
}
