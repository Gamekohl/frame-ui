import { ChangeDetectionStrategy, Component, NO_ERRORS_SCHEMA, input } from '@angular/core';

import { FrChartModel } from '../chart.types';

@Component({
  selector: 'g[frRadialChartRenderer]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [NO_ERRORS_SCHEMA],
  template: `
    <svg:g class="frame-chart__radial">
      @for (segment of model().radials; track segment.key) {
        <svg:path
          class="frame-chart__radial-track"
          [attr.d]="segment.trackPath"
          [attr.stroke-width]="segment.strokeWidth"
        ></svg:path>
        <svg:path
          class="frame-chart__radial-segment"
          [style.--frame-chart-radial-order]="segment.order"
          [style.--frame-chart-radial-stroke-width]="segment.strokeWidth + 'px'"
          [attr.d]="segment.path"
          [attr.stroke]="segment.color"
          [attr.stroke-width]="segment.strokeWidth"
          pathLength="1"
          [attr.aria-label]="segment.label + ': ' + formatValue(segment.value)"
        ></svg:path>
      }
      @if (model().radials[0]; as firstRadial) {
        <svg:text
          class="frame-chart__radial-value"
          [attr.x]="model().plotX + model().plotWidth / 2"
          [attr.y]="model().plotY + model().plotHeight / 2 - 4"
          text-anchor="middle"
        >
          {{ formatValue(firstRadial.value) }}
        </svg:text>
        <svg:text
          class="frame-chart__radial-label"
          [attr.x]="model().plotX + model().plotWidth / 2"
          [attr.y]="model().plotY + model().plotHeight / 2 + 20"
          text-anchor="middle"
        >
          {{ firstRadial.label }}
        </svg:text>
      }
    </svg:g>
  `,
})
export class FrRadialChartRenderer {
  readonly model = input.required<FrChartModel>();
  readonly valueFormatter = input<((value: number) => string) | null>(null);

  protected formatValue(value: number): string {
    return this.valueFormatter()?.(value) ?? new Intl.NumberFormat(undefined, { maximumFractionDigits: 1 }).format(value);
  }
}
