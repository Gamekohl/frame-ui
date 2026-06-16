import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  PLATFORM_ID,
  booleanAttribute,
  computed,
  inject,
  input,
  model,
  numberAttribute,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { buildBars } from './bar-chart';
import { buildCartesianSeries, buildXTicks, buildYTicks } from './cartesian-chart';
import { buildChartDomain } from './chart-domain';
import {
  PLOT_BOTTOM,
  PLOT_BOTTOM_BARS,
  PLOT_BOTTOM_PIE,
  PLOT_LEFT,
  PLOT_LEFT_COMPACT,
  PLOT_RIGHT,
  PLOT_TOP,
  VIEWBOX_HEIGHT,
  VIEWBOX_WIDTH,
} from './chart.constants';
import { formatChartLabel, inferChartSeries } from './chart-format';
import { buildPieSlices, pieIndexFromPoint, pieRadius } from './pie-chart';
import { buildRadialSegments, radialIndexFromPoint } from './radial-chart';
import {
  FrChartCurve,
  FrChartDatum,
  FrChartModel,
  FrChartSeries,
  FrChartTooltip,
  FrChartType,
} from './chart.types';
import { clampNumber, coerceNumber } from './chart-utils';

export type { FrChartCurve, FrChartDatum, FrChartSeries, FrChartType } from './chart.types';

let nextChartId = 0;

@Component({
  selector: 'frame-chart, [frChart]',
  exportAs: 'frChart',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'frame-chart',
    '[attr.data-type]': 'type()',
    '[style.--frame-chart-height.px]': 'height()',
    '(pointerleave)': 'clearActiveIndex()',
  },
  template: `
    <svg
      class="frame-chart__surface"
      role="img"
      [attr.aria-label]="ariaLabel()"
      [attr.viewBox]="'0 0 ' + viewBoxWidth() + ' ' + viewBoxHeight()"
      [attr.preserveAspectRatio]="type() === 'pie' || type() === 'radial' ? 'xMidYMid meet' : 'none'"
      (pointermove)="handlePointerMove($event)"
      (focusout)="clearActiveIndex()"
    >
      <defs>
        <clipPath [attr.id]="revealClipId">
          <rect
            class="frame-chart__reveal-mask"
            [attr.x]="model().plotX"
            [attr.y]="model().plotY"
            [attr.width]="model().plotWidth"
            [attr.height]="model().plotHeight"
          />
        </clipPath>
      </defs>

      @if (showGrid() && type() !== 'pie' && type() !== 'radial') {
        <g class="frame-chart__grid" aria-hidden="true">
          @for (tick of model().yTicks; track tick.label) {
            <line [attr.x1]="model().plotX" [attr.x2]="model().plotX + model().plotWidth" [attr.y1]="tick.y" [attr.y2]="tick.y" />
          }
        </g>
      }

      @if (model().showZeroBaseline && type() !== 'pie' && type() !== 'radial') {
        <line
          class="frame-chart__zero-line"
          [attr.x1]="model().plotX"
          [attr.x2]="model().plotX + model().plotWidth"
          [attr.y1]="model().baselineY"
          [attr.y2]="model().baselineY"
          aria-hidden="true"
        />
      }

      @if (showYAxis() && type() !== 'pie' && type() !== 'radial') {
        <g class="frame-chart__axis frame-chart__axis--y" aria-hidden="true">
          @for (tick of model().yTicks; track tick.label) {
            <text [attr.x]="model().plotX - 10" [attr.y]="tick.y" text-anchor="end" dominant-baseline="middle">
              {{ tick.label }}
            </text>
          }
        </g>
      }

      @if (type() === 'pie') {
        <g class="frame-chart__pie">
          @for (slice of model().slices; track slice.key) {
            <g class="frame-chart__pie-slice-frame" [style.--frame-chart-slice-order]="slice.order">
              <path
                class="frame-chart__pie-slice"
                [attr.d]="slice.path"
                [attr.fill]="slice.color"
                [attr.aria-label]="slice.label + ': ' + formatValue(slice.value)"
              />
            </g>
          }
        </g>
      } @else if (type() === 'radial') {
        <g class="frame-chart__radial">
          @for (segment of model().radials; track segment.key) {
            <path
              class="frame-chart__radial-track"
              [attr.d]="segment.trackPath"
              [attr.stroke-width]="segment.strokeWidth"
            />
            <path
              class="frame-chart__radial-segment"
              [style.--frame-chart-radial-order]="segment.order"
              [style.--frame-chart-radial-stroke-width]="segment.strokeWidth + 'px'"
              [attr.d]="segment.path"
              [attr.stroke]="segment.color"
              [attr.stroke-width]="segment.strokeWidth"
              pathLength="1"
              [attr.aria-label]="segment.label + ': ' + formatValue(segment.value)"
            />
          }
          @if (model().radials[0]; as firstRadial) {
            <text
              class="frame-chart__radial-value"
              [attr.x]="model().plotX + model().plotWidth / 2"
              [attr.y]="model().plotY + model().plotHeight / 2 - 4"
              text-anchor="middle"
            >
              {{ formatValue(firstRadial.value) }}
            </text>
            <text
              class="frame-chart__radial-label"
              [attr.x]="model().plotX + model().plotWidth / 2"
              [attr.y]="model().plotY + model().plotHeight / 2 + 20"
              text-anchor="middle"
            >
              {{ firstRadial.label }}
            </text>
          }
        </g>
      } @else if (type() === 'bar') {
        <g class="frame-chart__bars">
          @for (bar of model().bars; track bar.key + '-' + $index) {
            <rect
              class="frame-chart__bar"
              [style.--frame-chart-bar-order]="bar.order"
              [attr.x]="bar.x"
              [attr.y]="bar.y"
              [attr.width]="bar.width"
              [attr.height]="bar.height"
              [attr.fill]="bar.color"
              [attr.aria-label]="bar.label + ': ' + formatValue(bar.value)"
            />
          }
        </g>
      } @else {
        <g class="frame-chart__series" [attr.clip-path]="'url(#' + revealClipId + ')'">
          @for (series of model().series; track series.key) {
            @if (type() === 'area') {
              @for (areaPath of series.areaPaths; track areaPath) {
                <path class="frame-chart__area" [attr.d]="areaPath" [attr.fill]="series.color" />
              }
            }
            <path class="frame-chart__line" [attr.d]="series.path" [attr.stroke]="series.color" />
          }
        </g>
      }

      @if (activeIndex() !== null && type() !== 'pie' && type() !== 'radial') {
        <line
          class="frame-chart__cursor"
          [attr.x1]="cursorX()"
          [attr.x2]="cursorX()"
          [attr.y1]="model().plotY"
          [attr.y2]="model().plotY + model().plotHeight"
          aria-hidden="true"
        />
        @for (series of model().series; track series.key) {
          @if (series.points[activeIndex() ?? 0]; as point) {
            <circle class="frame-chart__dot" [attr.cx]="point.x" [attr.cy]="point.y" r="4" [attr.fill]="series.color" />
          }
        }
      }

      @if (showXAxis() && type() !== 'pie' && type() !== 'radial') {
        <g class="frame-chart__axis frame-chart__axis--x" aria-hidden="true">
          @for (tick of model().xTicks; track tick.label) {
            <text
              [attr.x]="tick.x"
              [attr.y]="model().plotY + model().plotHeight + 30"
              text-anchor="middle"
            >
              {{ formatAxisLabel(tick.label) }}
              @if (axisLabelTooltip(tick.label)) {
                <title>{{ axisLabelTooltip(tick.label) }}</title>
              }
            </text>
          }
        </g>
      }
    </svg>

    @if (isEmptyChart()) {
      <div class="frame-chart__empty" role="status">
        <strong>No chart data</strong>
        <span>There are no positive values to display.</span>
      </div>
    }

    @if (showTooltip() && activeTooltip(); as tooltip) {
      <div
        class="frame-chart__tooltip"
        [attr.data-side]="tooltip.xPercent > 70 ? 'left' : 'right'"
        [style.left.%]="tooltip.xPercent"
        [style.top.%]="tooltip.yPercent"
      >
        <div class="frame-chart__tooltip-label">{{ tooltip.label }}</div>
        @for (item of tooltip.values; track item.label) {
          <div class="frame-chart__tooltip-row">
            <span class="frame-chart__tooltip-marker" [style.background]="item.color"></span>
            <span>{{ item.label }}</span>
            <strong>{{ formatValue(item.value) }}</strong>
          </div>
        }
      </div>
    }

    @if (showLegend()) {
      <div class="frame-chart__legend" aria-hidden="true">
        @for (series of model().legendItems; track series.key) {
          <span class="frame-chart__legend-item">
            <span class="frame-chart__legend-marker" [style.background]="series.color"></span>
            {{ series.label }}
          </span>
        }
      </div>
    }
  `,
})
export class FrChart implements AfterViewInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly platformId = inject(PLATFORM_ID);
  private resizeObserver: ResizeObserver | null = null;
  protected readonly revealClipId = `frame-chart-reveal-${nextChartId++}`;

  readonly data = input<readonly FrChartDatum[]>([]);
  readonly series = input<readonly FrChartSeries[]>([]);
  readonly xKey = input('name');
  readonly type = input<FrChartType>('area');
  readonly curve = input<FrChartCurve>('smooth');
  readonly height = input(320, { transform: numberAttribute });
  readonly ariaLabel = input('Chart', { alias: 'aria-label' });
  readonly showGrid = input(true, { transform: booleanAttribute });
  readonly showLegend = input(true, { transform: booleanAttribute });
  readonly showTooltip = input(true, { transform: booleanAttribute });
  readonly showXAxis = input(true, { transform: booleanAttribute });
  readonly showYAxis = input(true, { transform: booleanAttribute });
  readonly seriesSpacing = input(0, { transform: numberAttribute });
  readonly valueFormatter = input<((value: number) => string) | null>(null);
  readonly activeIndex = model<number | null>(null);

  private readonly pointerTooltipPosition = signal<{ xPercent: number; yPercent: number } | null>(null);
  protected readonly viewBoxWidth = signal(VIEWBOX_WIDTH);
  protected readonly viewBoxHeight = computed(() => Math.max(this.height(), 160));
  protected readonly model = computed(() => this.buildModel());
  protected readonly cursorX = computed(() => {
    const activeIndex = this.activeIndex();
    const firstSeries = this.model().series[0];

    return activeIndex === null ? 0 : firstSeries?.points[activeIndex]?.x ?? 0;
  });
  protected readonly isEmptyChart = computed(
    () =>
      (this.type() === 'pie' && !this.model().slices.length) ||
      (this.type() === 'radial' && !this.model().radials.length),
  );
  protected readonly activeTooltip = computed<FrChartTooltip | null>(() => {
    const activeIndex = this.activeIndex();

    if (activeIndex === null) {
      return null;
    }

    const model = this.model();
    const datum = this.data()[activeIndex];
    const activeSlice = model.slices[activeIndex];
    const activeRadial = model.radials[activeIndex];
    const firstPoint = model.series[0]?.points[activeIndex];

    if (this.type() === 'pie' && activeSlice) {
      const pointerPosition = this.pointerTooltipPosition();

      return {
        xPercent: pointerPosition?.xPercent ?? activeSlice.xPercent,
        yPercent: pointerPosition?.yPercent ?? activeSlice.yPercent,
        label: activeSlice.label,
        values: [
          {
            color: activeSlice.color,
            label: activeSlice.label,
            value: activeSlice.value,
          },
        ],
      };
    }

    if (this.type() === 'radial' && activeRadial) {
      const pointerPosition = this.pointerTooltipPosition();

      return {
        xPercent: pointerPosition?.xPercent ?? activeRadial.xPercent,
        yPercent: pointerPosition?.yPercent ?? activeRadial.yPercent,
        label: activeRadial.label,
        values: [
          {
            color: activeRadial.color,
            label: activeRadial.label,
            value: activeRadial.value,
          },
        ],
      };
    }

    if (!datum || !firstPoint) {
      return null;
    }

    return {
      xPercent: (firstPoint.x / this.viewBoxWidth()) * 100,
      yPercent: (firstPoint.y / this.viewBoxHeight()) * 100,
      label: formatChartLabel(datum[this.xKey()] ?? activeIndex + 1),
      values: model.series.map((series) => ({
        color: series.color,
        label: series.label,
        value: series.points[activeIndex]?.value ?? 0,
      })),
    };
  });

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId) || typeof ResizeObserver === 'undefined') {
      return;
    }

    const updateWidth = () => {
      const width = this.elementRef.nativeElement.getBoundingClientRect().width;

      if (width > 0) {
        this.viewBoxWidth.set(Math.max(Math.round(width), 320));
      }
    };

    updateWidth();
    this.resizeObserver = new ResizeObserver(updateWidth);
    this.resizeObserver.observe(this.elementRef.nativeElement);

    this.destroyRef.onDestroy(() => {
      this.resizeObserver?.disconnect();
      this.resizeObserver = null;
    });
  }

  protected handlePointerMove(event: PointerEvent): void {
    const element = event.currentTarget as SVGSVGElement;
    const rect = element.getBoundingClientRect();

    if (!rect.width) {
      return;
    }

    this.pointerTooltipPosition.set(this.tooltipPositionFromPointer(event, rect));

    if (this.type() === 'pie') {
      this.activeIndex.set(this.pieIndexFromPointer(event, rect));
      return;
    }

    if (this.type() === 'radial') {
      this.activeIndex.set(this.radialIndexFromPointer(event, rect));
      return;
    }

    const relativeX = clampNumber((event.clientX - rect.left) / rect.width, 0, 1);
    const count = this.data().length;
    const nextIndex = count <= 1 ? 0 : Math.round(relativeX * (count - 1));
    this.activeIndex.set(nextIndex);
  }

  protected clearActiveIndex(): void {
    this.activeIndex.set(null);
    this.pointerTooltipPosition.set(null);
  }

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

  private buildModel(): FrChartModel {
    const data = this.data();
    const series = this.series().length ? this.series() : inferChartSeries(data, this.xKey());
    const values = data.flatMap((datum) => series.map((item) => coerceNumber(datum[item.key], 0)));
    const domain = buildChartDomain(values, { zoomToData: this.type() === 'line' });
    const minValue = domain.min;
    const maxValue = domain.max;
    const range = maxValue - minValue || 1;
    const plotX = this.showYAxis() ? PLOT_LEFT : PLOT_LEFT_COMPACT;
    const plotY = PLOT_TOP;
    const plotBottom =
      this.type() === 'bar' ? PLOT_BOTTOM_BARS : this.type() === 'pie' ? PLOT_BOTTOM_PIE : PLOT_BOTTOM;
    const plotWidth = Math.max(this.viewBoxWidth() - plotX - PLOT_RIGHT, 1);
    const plotHeight = Math.max(this.viewBoxHeight() - plotY - plotBottom, 1);
    const xForIndex =
      this.type() === 'bar'
        ? (index: number) => plotX + (plotWidth / Math.max(data.length, 1)) * (index + 0.5)
        : (index: number) => plotX + (data.length <= 1 ? plotWidth / 2 : (index / (data.length - 1)) * plotWidth);
    const yForValue = (value: number) => plotY + plotHeight - ((value - minValue) / range) * plotHeight;
    const baselineY = yForValue(0);
    const seriesModels = buildCartesianSeries({
      baselineY,
      curve: this.curve(),
      data,
      series,
      seriesSpacing: this.type() === 'line' ? this.seriesSpacing() : 0,
      xForIndex,
      xKey: this.xKey(),
      yForValue,
    });
    const slices = buildPieSlices({
      data,
      plotHeight,
      plotWidth,
      plotX,
      plotY,
      series,
      viewBoxHeight: this.viewBoxHeight(),
      viewBoxWidth: this.viewBoxWidth(),
      xKey: this.xKey(),
    });
    const radials = buildRadialSegments({
      data,
      plotHeight,
      plotWidth,
      plotX,
      plotY,
      series,
      viewBoxHeight: this.viewBoxHeight(),
      viewBoxWidth: this.viewBoxWidth(),
      xKey: this.xKey(),
    });

    return {
      plotX,
      plotY,
      plotWidth,
      plotHeight,
      baselineY,
      showZeroBaseline: minValue < 0 && maxValue > 0,
      series: seriesModels,
      bars: buildBars(seriesModels, data.length, baselineY, plotWidth),
      slices,
      radials,
      legendItems:
        this.type() === 'pie'
          ? slices.map((slice) => ({
              key: slice.key,
              label: slice.label,
              color: slice.color,
            }))
          : this.type() === 'radial'
            ? radials.map((radial) => ({
                key: radial.key,
                label: radial.label,
                color: radial.color,
              }))
          : seriesModels.map((item) => ({
              key: item.key,
              label: item.label,
              color: item.color,
            })),
      xTicks: buildXTicks(data, this.xKey(), xForIndex),
      yTicks: buildYTicks(minValue, maxValue, yForValue, (value) => this.formatValue(value)),
    };
  }

  private pieIndexFromPointer(event: PointerEvent, rect: DOMRect): number | null {
    const model = this.model();
    const firstSlice = model.slices[0];

    if (!firstSlice) {
      return null;
    }

    const scale = Math.min(rect.width / this.viewBoxWidth(), rect.height / this.viewBoxHeight());
    const renderedWidth = this.viewBoxWidth() * scale;
    const renderedHeight = this.viewBoxHeight() * scale;
    const offsetX = (rect.width - renderedWidth) / 2;
    const offsetY = (rect.height - renderedHeight) / 2;
    const pointerX = (event.clientX - rect.left - offsetX) / scale;
    const pointerY = (event.clientY - rect.top - offsetY) / scale;
    const centerX = model.plotX + model.plotWidth / 2;
    const centerY = model.plotY + model.plotHeight / 2;
    return pieIndexFromPoint(
      model.slices,
      pointerX,
      pointerY,
      centerX,
      centerY,
      pieRadius(model.plotWidth, model.plotHeight),
    );
  }

  private radialIndexFromPointer(event: PointerEvent, rect: DOMRect): number | null {
    const model = this.model();
    const firstRadial = model.radials[0];

    if (!firstRadial) {
      return null;
    }

    const scale = Math.min(rect.width / this.viewBoxWidth(), rect.height / this.viewBoxHeight());
    const renderedWidth = this.viewBoxWidth() * scale;
    const renderedHeight = this.viewBoxHeight() * scale;
    const offsetX = (rect.width - renderedWidth) / 2;
    const offsetY = (rect.height - renderedHeight) / 2;
    const pointerX = (event.clientX - rect.left - offsetX) / scale;
    const pointerY = (event.clientY - rect.top - offsetY) / scale;
    const centerX = model.plotX + model.plotWidth / 2;
    const centerY = model.plotY + model.plotHeight / 2;

    return radialIndexFromPoint(model.radials, pointerX, pointerY, centerX, centerY);
  }

  private tooltipPositionFromPointer(event: PointerEvent, rect: DOMRect): { xPercent: number; yPercent: number } {
    return {
      xPercent: clampNumber(((event.clientX - rect.left) / rect.width) * 100, 0, 100),
      yPercent: clampNumber(((event.clientY - rect.top) / rect.height) * 100, 0, 100),
    };
  }
}
