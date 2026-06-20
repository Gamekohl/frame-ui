import { ChangeDetectionStrategy, Component, NO_ERRORS_SCHEMA, input } from '@angular/core';

import { FrChartModel } from '../chart.types';

@Component({
  selector: 'g[frCartesianChartRenderer]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [NO_ERRORS_SCHEMA],
  template: `
    @if (showGrid() && !isSparkline() && isHorizontalBar()) {
      <svg:g class="frame-chart__grid" aria-hidden="true">
        @for (tick of model().xTicks; track tick.label) {
          <svg:line [attr.x1]="tick.x" [attr.x2]="tick.x" [attr.y1]="model().plotY" [attr.y2]="model().plotY + model().plotHeight"></svg:line>
        }
      </svg:g>
    } @else if (showGrid() && !isSparkline()) {
      <svg:g class="frame-chart__grid" aria-hidden="true">
        @for (tick of model().yTicks; track tick.label) {
          <svg:line [attr.x1]="model().plotX" [attr.x2]="model().plotX + model().plotWidth" [attr.y1]="tick.y" [attr.y2]="tick.y"></svg:line>
        }
      </svg:g>
    }

    @if (model().showZeroBaseline && !isSparkline() && isHorizontalBar()) {
      <svg:line
        class="frame-chart__zero-line"
        [attr.x1]="model().baselineX"
        [attr.x2]="model().baselineX"
        [attr.y1]="model().plotY"
        [attr.y2]="model().plotY + model().plotHeight"
        aria-hidden="true"
      ></svg:line>
    } @else if (model().showZeroBaseline && isSparkline() && !isHorizontalBar()) {
      <svg:line
        class="frame-chart__zero-line frame-chart__sparkline-zero-line"
        [attr.x1]="model().plotX"
        [attr.x2]="model().plotX + model().plotWidth"
        [attr.y1]="model().baselineY"
        [attr.y2]="model().baselineY"
        aria-hidden="true"
      ></svg:line>
    } @else if (model().showZeroBaseline && !isSparkline()) {
      <svg:line
        class="frame-chart__zero-line"
        [attr.x1]="model().plotX"
        [attr.x2]="model().plotX + model().plotWidth"
        [attr.y1]="model().baselineY"
        [attr.y2]="model().baselineY"
        aria-hidden="true"
      ></svg:line>
    }

    @if (showYAxis() && !isSparkline()) {
      <svg:g class="frame-chart__axis frame-chart__axis--y" aria-hidden="true">
        @for (tick of model().yTicks; track tick.label) {
          <svg:text [attr.x]="model().plotX - 10" [attr.y]="tick.y" text-anchor="end" dominant-baseline="middle">
            {{ tick.label }}
          </svg:text>
        }
      </svg:g>
    }

    @if (isBarOnly()) {
      <svg:g class="frame-chart__bars">
        @for (bar of model().bars; track bar.key + '-' + $index) {
          <svg:rect
            class="frame-chart__bar"
            [style.--frame-chart-bar-order]="bar.order"
            [attr.x]="bar.x"
            [attr.y]="bar.y"
            [attr.width]="bar.width"
            [attr.height]="bar.height"
            [attr.fill]="bar.color"
            [attr.aria-label]="bar.label + ': ' + formatValue(bar.value)"
          ></svg:rect>
        }
      </svg:g>
    } @else {
      @if (isComposed()) {
        <svg:g class="frame-chart__bars">
          @for (bar of model().bars; track bar.key + '-' + $index) {
            <svg:rect
              class="frame-chart__bar"
              [style.--frame-chart-bar-order]="bar.order"
              [attr.x]="bar.x"
              [attr.y]="bar.y"
              [attr.width]="bar.width"
              [attr.height]="bar.height"
              [attr.fill]="bar.color"
              [attr.aria-label]="bar.label + ': ' + formatValue(bar.value)"
            ></svg:rect>
          }
        </svg:g>
      }
      <svg:g class="frame-chart__series" [attr.clip-path]="'url(#' + revealClipId() + ')'">
        @for (series of model().series; track series.key) {
          @if (series.type === 'area') {
            @for (areaPath of series.areaPaths; track $index) {
              <svg:path class="frame-chart__area" [attr.d]="areaPath" [attr.fill]="series.color"></svg:path>
            }
          }
          @if (series.type === 'area' || series.type === 'line') {
            <svg:path class="frame-chart__line" [attr.d]="series.path" [attr.stroke]="series.color"></svg:path>
          }
        }
      </svg:g>
    }

    @if (activeIndex() !== null && !isSparkline() && !isHorizontalBar()) {
      <svg:line
        class="frame-chart__cursor"
        [attr.x1]="cursorX()"
        [attr.x2]="cursorX()"
        [attr.y1]="model().plotY"
        [attr.y2]="model().plotY + model().plotHeight"
        aria-hidden="true"
      ></svg:line>
      @for (series of model().series; track series.key) {
        @if (series.type !== 'bar' && series.points[activeIndex() ?? 0]; as point) {
          <svg:circle class="frame-chart__dot" [attr.cx]="point.x" [attr.cy]="point.y" r="4" [attr.fill]="series.color"></svg:circle>
        }
      }
    }

    @if (activeIndex() !== null && isSparklinePointIndicator()) {
      @for (series of model().series; track series.key) {
        @if (series.points[activeIndex() ?? 0]; as point) {
          <svg:circle
            class="frame-chart__dot frame-chart__sparkline-dot"
            [attr.cx]="point.x"
            [attr.cy]="point.y"
            r="3.5"
            [attr.fill]="series.color"
          ></svg:circle>
        }
      }
    }

    @if (showXAxis() && !isSparkline()) {
      <svg:g class="frame-chart__axis frame-chart__axis--x" aria-hidden="true">
        @for (tick of model().xTicks; track tick.label) {
          <svg:text
            [attr.x]="tick.x"
            [attr.y]="model().plotY + model().plotHeight + 30"
            text-anchor="middle"
          >
            {{ formatAxisLabel(tick.label) }}
            @if (axisLabelTooltip(tick.label)) {
              <svg:title>{{ axisLabelTooltip(tick.label) }}</svg:title>
            }
          </svg:text>
        }
      </svg:g>
    }
  `,
})
export class FrCartesianChartRenderer {
  readonly activeIndex = input<number | null>(null);
  readonly cursorX = input(0);
  readonly isBarOnly = input(false);
  readonly isComposed = input(false);
  readonly isHorizontalBar = input(false);
  readonly isSparkline = input(false);
  readonly isSparklinePointIndicator = input(false);
  readonly model = input.required<FrChartModel>();
  readonly revealClipId = input.required<string>();
  readonly showGrid = input(true);
  readonly showXAxis = input(true);
  readonly showYAxis = input(true);
  readonly valueFormatter = input<((value: number) => string) | null>(null);
  readonly viewBoxWidth = input(640);

  protected formatValue(value: number): string {
    return this.valueFormatter()?.(value) ?? new Intl.NumberFormat(undefined, { maximumFractionDigits: 1 }).format(value);
  }

  protected formatAxisLabel(label: string): string {
    const maxLength = this.viewBoxWidth() < 520 ? 10 : 16;

    return label.length > maxLength ? `${label.slice(0, maxLength - 1)}…` : label;
  }

  protected axisLabelTooltip(label: string): string {
    return this.formatAxisLabel(label) === label ? '' : label;
  }
}
