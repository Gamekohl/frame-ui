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
  output,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { buildBars } from './bar-chart';
import {
  buildCartesianSeries,
  buildCategoryTicks,
  buildValueTicks,
  buildXTicks,
  buildYTicks,
} from './cartesian-chart';
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
import { chartColor } from './chart-colors';
import { formatChartLabel, inferChartSeries, toChartLabel } from './chart-format';
import { svgPointFromPointer } from './chart-geometry';
import { FrCartesianChartRenderer } from './renderer/cartesian-chart-renderer';
import { buildCalendarHeatmap } from './calendar-heatmap-chart';
import { FrCircularChartRenderer } from './renderer/circular-chart-renderer';
import { buildPieSlices, donutInnerRadius, pieIndexFromPoint, pieRadius } from './pie-chart';
import { buildRadialSegments, radialIndexFromPoint } from './radial-chart';
import { FrRadialChartRenderer } from './renderer/radial-chart-renderer';
import { buildHeatmap, emptyHeatmapModel, heatmapIndexFromPoint } from './heatmap-chart';
import { FrHeatmapChartRenderer } from './renderer/heatmap-chart-renderer';
import {
  FrChartCurve,
  FrChartBarLayout,
  FrChartBarOrientation,
  FrChartClickEvent,
  FrChartDataPoint,
  FrChartModel,
  FrChartSeries,
  FrChartSeriesType,
  FrChartTooltip,
  FrChartType,
} from './chart.types';
import { clampNumber, coerceNumber } from './chart-utils';

export type {
  FrChartBarLayout,
  FrChartBarOrientation,
  FrChartCurve,
  FrChartDatum,
  FrChartDataPoint,
  FrChartClickEvent,
  FrChartSeries,
  FrChartSeriesType,
  FrChartType,
} from './chart.types';

let nextChartId = 0;

type ResolvedChartSeries = FrChartSeries & {
  readonly color: string;
  readonly hidden: boolean;
  readonly label: string;
  readonly type: FrChartSeriesType;
};

@Component({
  selector: 'frame-chart, [frChart]',
  exportAs: 'frChart',
  imports: [
    FrCartesianChartRenderer,
    FrCircularChartRenderer,
    FrHeatmapChartRenderer,
    FrRadialChartRenderer,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'frame-chart',
    '[attr.data-type]': 'type()',
    '[attr.data-sparkline]': 'isSparklineChart() ? "" : null',
    '[style.--frame-chart-height.px]': 'chartHeight()',
    '(pointerleave)': 'clearActiveIndex()',
  },
  template: `
    <svg
      class="frame-chart__surface"
      role="img"
      [attr.aria-label]="ariaLabel()"
      [attr.viewBox]="'0 0 ' + viewBoxWidth() + ' ' + viewBoxHeight()"
      [attr.preserveAspectRatio]="
        isCircularChart() || type() === 'radial' ? 'xMidYMid meet' : 'none'
      "
      (pointermove)="handlePointerMove($event)"
      (pointerup)="handleChartClick($event)"
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
          ></rect>
        </clipPath>
      </defs>

      @if (isCircularChart()) {
        <g frCircularChartRenderer [model]="model()" [valueFormatter]="valueFormatter()"></g>
      } @else if (type() === 'radial') {
        <g frRadialChartRenderer [model]="model()" [valueFormatter]="valueFormatter()"></g>
      } @else if (isHeatmapChart()) {
        <g
          frHeatmapChartRenderer
          [activeIndex]="activeIndex()"
          [model]="model()"
          [showXAxis]="showXAxis()"
          [showYAxis]="showYAxis()"
          [valueFormatter]="valueFormatter()"
        ></g>
      } @else {
        <g
          frCartesianChartRenderer
          [activeIndex]="activeIndex()"
          [cursorX]="cursorX()"
          [isBarOnly]="isBarOnlyChart()"
          [isComposed]="isComposedChart()"
          [isHorizontalBar]="isHorizontalBarChart()"
          [isSparkline]="isSparklineChart()"
          [isSparklinePointIndicator]="isSparklinePointIndicatorChart()"
          [model]="model()"
          [revealClipId]="revealClipId"
          [showGrid]="showGrid()"
          [showXAxis]="showXAxis()"
          [showYAxis]="showYAxis()"
          [valueFormatter]="valueFormatter()"
          [viewBoxWidth]="viewBoxWidth()"
        ></g>
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

    @if (showLegend() && isHeatmapChart() && model().heatmapCells.length) {
      <div class="frame-chart__heatmap-legend" aria-hidden="true">
        <span>Less</span>
        @for (step of heatmapLegendSteps(); track step) {
          <span class="frame-chart__heatmap-legend-step" [style.background]="step"></span>
        }
        <span>More</span>
      </div>
    } @else if (showLegend() && !isSparklineChart() && !isHeatmapChart()) {
      <div class="frame-chart__legend" [attr.aria-hidden]="legendToggle() ? null : 'true'">
        @for (series of model().legendItems; track series.key) {
          @if (legendToggle() && series.type) {
            <button
              class="frame-chart__legend-item frame-chart__legend-button"
              type="button"
              [attr.aria-pressed]="!series.hidden"
              [attr.data-hidden]="series.hidden ? '' : null"
              (click)="toggleSeries(series.key)"
            >
              <span class="frame-chart__legend-marker" [style.background]="series.color"></span>
              {{ series.label }}
            </button>
          } @else {
            <span class="frame-chart__legend-item">
              <span class="frame-chart__legend-marker" [style.background]="series.color"></span>
              {{ series.label }}
            </span>
          }
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

  readonly data = input<readonly FrChartDataPoint[]>([]);
  readonly series = input<readonly FrChartSeries[]>([]);
  readonly xKey = input('name');
  readonly yKey = input<string | null>(null);
  readonly type = input<FrChartType>('area');
  readonly curve = input<FrChartCurve>('smooth');
  readonly barLayout = input<FrChartBarLayout>('grouped');
  readonly barOrientation = input<FrChartBarOrientation>('vertical');
  readonly height = input(320, { transform: numberAttribute });
  readonly ariaLabel = input('Chart', { alias: 'aria-label' });
  readonly showGrid = input(true, { transform: booleanAttribute });
  readonly showLegend = input(true, { transform: booleanAttribute });
  readonly showTooltip = input(true, { transform: booleanAttribute });
  readonly showXAxis = input(true, { transform: booleanAttribute });
  readonly showYAxis = input(true, { transform: booleanAttribute });
  readonly legendToggle = input(false, { transform: booleanAttribute });
  readonly seriesSpacing = input(0, { transform: numberAttribute });
  readonly valueFormatter = input<((value: number) => string) | null>(null);
  readonly activeIndex = model<number | null>(null);
  readonly hiddenSeriesKeys = model<readonly string[]>([]);
  readonly chartClick = output<FrChartClickEvent>();

  private readonly pointerTooltipPosition = signal<{ xPercent: number; yPercent: number } | null>(
    null,
  );
  protected readonly viewBoxWidth = signal(VIEWBOX_WIDTH);
  protected readonly chartHeight = computed(() =>
    this.isSparklineChart() && this.height() === 320 ? 80 : this.height(),
  );
  protected readonly viewBoxHeight = computed(() =>
    Math.max(this.chartHeight(), this.isSparklineChart() ? 48 : 160),
  );
  protected readonly model = computed(() => this.buildModel());
  protected readonly cursorX = computed(() => {
    const activeIndex = this.activeIndex();
    const firstSeries = this.model().series[0];

    return activeIndex === null ? 0 : (firstSeries?.points[activeIndex]?.x ?? 0);
  });
  protected readonly isEmptyChart = computed(() => {
    const model = this.model();

    if (this.isCircularChart()) {
      return !model.slices.length;
    }

    if (this.type() === 'radial') {
      return !model.radials.length;
    }

    if (this.isHeatmapChart()) {
      return !model.heatmapCells.length;
    }

    return !model.series.some((series) => series.points.length > 0);
  });
  protected readonly activeTooltip = computed<FrChartTooltip | null>(() => {
    const activeIndex = this.activeIndex();

    if (activeIndex === null) {
      return null;
    }

    const model = this.model();
    const datum = this.data()[activeIndex];
    const activeSlice = model.slices[activeIndex];
    const activeRadial = model.radials[activeIndex];
    const activeHeatmapCell = model.heatmapCells[activeIndex];
    const firstPoint = model.series[0]?.points[activeIndex];

    if (this.isCircularChart() && activeSlice) {
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

    if (this.isHeatmapChart() && activeHeatmapCell) {
      const heatmapSeries = this.resolveSeries(this.inputSeries(this.data()))[0];

      return {
        xPercent: activeHeatmapCell.xPercent,
        yPercent: activeHeatmapCell.yPercent,
        label: activeHeatmapCell.label,
        values: [
          {
            color: activeHeatmapCell.color,
            label: heatmapSeries?.label ?? 'Value',
            value: activeHeatmapCell.value,
          },
        ],
      };
    }

    if (!datum || !firstPoint) {
      return null;
    }

    const pointerPosition =
      this.isHorizontalBarChart() || this.isSparklineChart() ? this.pointerTooltipPosition() : null;

    return {
      xPercent: pointerPosition?.xPercent ?? (firstPoint.x / this.viewBoxWidth()) * 100,
      yPercent: pointerPosition?.yPercent ?? (firstPoint.y / this.viewBoxHeight()) * 100,
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

    if (this.isCircularChart()) {
      this.activeIndex.set(this.pieIndexFromPointer(event, rect));
      return;
    }

    if (this.type() === 'radial') {
      this.activeIndex.set(this.radialIndexFromPointer(event, rect));
      return;
    }

    if (this.isHeatmapChart()) {
      this.activeIndex.set(this.heatmapIndexFromPointer(event, rect));
      return;
    }

    const count = this.data().length;
    const model = this.model();
    const pointerX = ((event.clientX - rect.left) / rect.width) * this.viewBoxWidth();
    const pointerY = ((event.clientY - rect.top) / rect.height) * this.viewBoxHeight();
    const relative = this.isHorizontalBarChart()
      ? clampNumber((pointerY - model.plotY) / model.plotHeight, 0, 1)
      : clampNumber((pointerX - model.plotX) / model.plotWidth, 0, 1);
    const nextIndex = count <= 1 ? 0 : Math.round(relative * (count - 1));
    this.activeIndex.set(nextIndex);
  }

  protected clearActiveIndex(): void {
    this.activeIndex.set(null);
    this.pointerTooltipPosition.set(null);
  }

  protected handleChartClick(event: PointerEvent): void {
    const element = event.currentTarget as SVGSVGElement;
    const rect = element.getBoundingClientRect();

    if (!rect.width) {
      return;
    }

    const index = this.indexFromPointerEvent(event, rect);
    const clickEvent = index === null ? null : this.chartClickEventForIndex(index);

    if (clickEvent) {
      this.activeIndex.set(index);
      this.chartClick.emit(clickEvent);
    }
  }

  protected formatValue(value: number): string {
    return (
      this.valueFormatter()?.(value) ??
      new Intl.NumberFormat(undefined, { maximumFractionDigits: 1 }).format(value)
    );
  }

  protected isHorizontalBarChart(): boolean {
    return (
      this.type() === 'bar-sparkline' ||
      (this.type() === 'bar' && this.barOrientation() === 'horizontal')
    );
  }

  protected isBarOnlyChart(): boolean {
    return (
      this.type() === 'bar' || this.type() === 'bar-sparkline' || this.type() === 'column-sparkline'
    );
  }

  protected isComposedChart(): boolean {
    return this.type() === 'composed';
  }

  protected isSparklineChart(): boolean {
    return (
      this.type() === 'area-sparkline' ||
      this.type() === 'bar-sparkline' ||
      this.type() === 'column-sparkline' ||
      this.type() === 'line-sparkline'
    );
  }

  protected isSparklinePointIndicatorChart(): boolean {
    return this.type() === 'area-sparkline' || this.type() === 'line-sparkline';
  }

  protected isCircularChart(): boolean {
    return this.type() === 'pie' || this.type() === 'donut';
  }

  protected isHeatmapChart(): boolean {
    return this.type() === 'calendar-heatmap' || this.type() === 'heatmap';
  }

  protected isCalendarHeatmapChart(): boolean {
    return this.type() === 'calendar-heatmap';
  }

  protected heatmapLegendSteps(): readonly string[] {
    const color = this.resolveSeries(this.inputSeries(this.data()))[0]?.color ?? chartColor(0);

    return [20, 40, 60, 80, 100].map(
      (strength) =>
        `color-mix(in srgb, ${color} ${strength}%, var(--frame-chart-heatmap-empty-bg))`,
    );
  }

  protected toggleSeries(key: string): void {
    const hiddenKeys = new Set(this.hiddenSeriesKeys());

    if (hiddenKeys.has(key)) {
      hiddenKeys.delete(key);
    } else {
      hiddenKeys.add(key);
    }

    this.hiddenSeriesKeys.set(Array.from(hiddenKeys));
  }

  private buildModel(): FrChartModel {
    const data = this.data();
    const series = this.resolveSeries(this.inputSeries(data));
    const visibleSeries = series.filter((item) => !item.hidden);
    const values = this.valuesForDomain(data, visibleSeries);
    const hasVisibleBars = visibleSeries.some((item) => item.type === 'bar');
    const domain = buildChartDomain(values, {
      zoomToData:
        this.type() === 'line' ||
        this.type() === 'line-sparkline' ||
        this.type() === 'area-sparkline' ||
        (this.type() === 'composed' && !hasVisibleBars),
    });
    const minValue = domain.min;
    const maxValue = domain.max;
    const range = maxValue - minValue || 1;
    const plotX =
      this.sparklineInset('left') ??
      (this.isHorizontalBarChart() ? 96 : this.showYAxis() ? PLOT_LEFT : PLOT_LEFT_COMPACT);
    const plotY = this.sparklineInset('top') ?? PLOT_TOP;
    const plotBottom =
      this.sparklineInset('bottom') ??
      (this.type() === 'bar'
        ? PLOT_BOTTOM_BARS
        : this.isCircularChart()
          ? PLOT_BOTTOM_PIE
          : PLOT_BOTTOM);
    const plotRight = this.sparklineInset('right') ?? PLOT_RIGHT;
    const plotWidth = Math.max(this.viewBoxWidth() - plotX - plotRight, 1);
    const plotHeight = Math.max(this.viewBoxHeight() - plotY - plotBottom, 1);
    const categorySize =
      data.length <= 1 ? plotHeight * 0.55 : plotHeight / Math.max(data.length, 1);
    const usesCategoryBands =
      this.type() === 'bar' ||
      this.type() === 'bar-sparkline' ||
      this.type() === 'column-sparkline' ||
      (this.type() === 'composed' && hasVisibleBars);
    const xForIndex = usesCategoryBands
      ? (index: number) => plotX + (plotWidth / Math.max(data.length, 1)) * (index + 0.5)
      : (index: number) =>
          plotX + (data.length <= 1 ? plotWidth / 2 : (index / (data.length - 1)) * plotWidth);
    const yForValue = (value: number) =>
      plotY + plotHeight - ((value - minValue) / range) * plotHeight;
    const xForValue = (value: number) => plotX + ((value - minValue) / range) * plotWidth;
    const yForIndex = (index: number) =>
      plotY + (data.length <= 1 ? plotHeight / 2 : (plotHeight / data.length) * (index + 0.5));
    const baselineY = yForValue(0);
    const baselineX = xForValue(0);
    const seriesModels = buildCartesianSeries({
      baselineY,
      curve: this.curve(),
      data,
      defaultType: this.defaultSeriesType(),
      series: visibleSeries,
      seriesSpacing: this.type() === 'line' ? this.seriesSpacing() : 0,
      xForIndex,
      xKey: this.xKey(),
      yForValue,
    });
    const slices = buildPieSlices({
      data,
      innerRadius: this.type() === 'donut' ? donutInnerRadius(plotWidth, plotHeight) : 0,
      plotHeight,
      plotWidth,
      plotX,
      plotY,
      series: visibleSeries,
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
      series: visibleSeries,
      viewBoxHeight: this.viewBoxHeight(),
      viewBoxWidth: this.viewBoxWidth(),
      xKey: this.xKey(),
    });
    const heatmap = this.isCalendarHeatmapChart()
      ? buildCalendarHeatmap({
          data,
          plotHeight,
          plotWidth,
          plotX,
          plotY,
          series: visibleSeries,
          viewBoxHeight: this.viewBoxHeight(),
          viewBoxWidth: this.viewBoxWidth(),
          xKey: this.xKey(),
        })
      : this.type() === 'heatmap'
        ? buildHeatmap({
            data,
            plotHeight,
            plotWidth,
            plotX,
            plotY,
            series: visibleSeries,
            viewBoxHeight: this.viewBoxHeight(),
            viewBoxWidth: this.viewBoxWidth(),
            xKey: this.xKey(),
            yKey: this.yKey(),
          })
        : emptyHeatmapModel();

    return {
      plotX,
      plotY,
      plotWidth,
      plotHeight,
      baselineX,
      baselineY,
      showZeroBaseline: minValue < 0 && maxValue > 0,
      series: seriesModels,
      bars: buildBars({
        baselineY,
        categorySize,
        groupCount: data.length,
        layout: this.sparklineBarLayout(),
        orientation: this.sparklineBarOrientation(),
        plotWidth,
        series: seriesModels.filter((series) => series.type === 'bar'),
        xForValue,
        yForIndex,
        yForValue,
      }),
      slices,
      radials,
      heatmapCells: heatmap.cells,
      heatmapColumnTicks: heatmap.columnTicks,
      heatmapRowTicks: heatmap.rowTicks,
      legendItems: this.isCircularChart()
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
          : this.isHeatmapChart()
            ? visibleSeries.slice(0, 1).map((item) => ({
                key: item.key,
                label: item.label,
                color: item.color,
              }))
            : series.map((item) => ({
                key: item.key,
                label: item.label,
                color: item.color,
                hidden: item.hidden,
                type: item.type,
              })),
      xTicks: this.isHeatmapChart()
        ? []
        : this.isHorizontalBarChart()
          ? buildValueTicks(minValue, maxValue, xForValue, (value) => this.formatValue(value), 'x')
          : buildXTicks(data, this.xKey(), xForIndex),
      yTicks: this.isHeatmapChart()
        ? []
        : this.isHorizontalBarChart()
          ? buildCategoryTicks(data, this.xKey(), yForIndex)
          : buildYTicks(minValue, maxValue, yForValue, (value) => this.formatValue(value)),
    };
  }

  private pieIndexFromPointer(event: PointerEvent, rect: DOMRect): number | null {
    const model = this.model();
    const firstSlice = model.slices[0];

    if (!firstSlice) {
      return null;
    }

    const pointer = svgPointFromPointer(event, rect, this.viewBoxWidth(), this.viewBoxHeight());
    const centerX = model.plotX + model.plotWidth / 2;
    const centerY = model.plotY + model.plotHeight / 2;
    return pieIndexFromPoint(
      model.slices,
      pointer.x,
      pointer.y,
      centerX,
      centerY,
      pieRadius(model.plotWidth, model.plotHeight),
      this.type() === 'donut' ? donutInnerRadius(model.plotWidth, model.plotHeight) : 0,
    );
  }

  private valuesForDomain(
    data: readonly FrChartDataPoint[],
    series: readonly FrChartSeries[],
  ): readonly number[] {
    if (
      (this.type() !== 'bar' &&
        this.type() !== 'bar-sparkline' &&
        this.type() !== 'column-sparkline') ||
      this.sparklineBarLayout() !== 'stacked'
    ) {
      return data.flatMap((datum) => series.map((item) => coerceNumber(datum[item.key], 0)));
    }

    return data.flatMap((datum) => {
      const totals = series.reduce(
        (sum, item) => {
          const value = coerceNumber(datum[item.key], 0);

          if (value < 0) {
            sum.negative += value;
          } else {
            sum.positive += value;
          }

          return sum;
        },
        { negative: 0, positive: 0 },
      );

      return [totals.negative, totals.positive];
    });
  }

  private resolveSeries(series: readonly FrChartSeries[]): readonly ResolvedChartSeries[] {
    const hiddenKeys = new Set(this.hiddenSeriesKeys());

    return series.map((item, index) => ({
      ...item,
      color: item.color ?? chartColor(index),
      hidden: item.hidden || hiddenKeys.has(item.key),
      label: item.label ?? toChartLabel(item.key),
      type: item.type ?? this.defaultSeriesType(),
    }));
  }

  private defaultSeriesType(): FrChartSeriesType {
    if (this.type() === 'area' || this.type() === 'area-sparkline') {
      return 'area';
    }

    if (
      this.type() === 'bar' ||
      this.type() === 'bar-sparkline' ||
      this.type() === 'column-sparkline'
    ) {
      return 'bar';
    }

    return 'line';
  }

  private sparklineBarLayout(): FrChartBarLayout {
    return this.isSparklineChart() ? 'grouped' : this.barLayout();
  }

  private sparklineBarOrientation(): FrChartBarOrientation {
    if (this.type() === 'bar-sparkline') {
      return 'horizontal';
    }

    if (this.type() === 'column-sparkline') {
      return 'vertical';
    }

    return this.barOrientation();
  }

  private sparklineInset(side: 'bottom' | 'left' | 'right' | 'top'): number | null {
    if (!this.isSparklineChart()) {
      return null;
    }

    if (this.type() === 'bar-sparkline') {
      return side === 'left' || side === 'right' ? 4 : 6;
    }

    return 6;
  }

  private radialIndexFromPointer(event: PointerEvent, rect: DOMRect): number | null {
    const model = this.model();
    const firstRadial = model.radials[0];

    if (!firstRadial) {
      return null;
    }

    const pointer = svgPointFromPointer(event, rect, this.viewBoxWidth(), this.viewBoxHeight());
    const centerX = model.plotX + model.plotWidth / 2;
    const centerY = model.plotY + model.plotHeight / 2;

    return radialIndexFromPoint(model.radials, pointer.x, pointer.y, centerX, centerY);
  }

  private inputSeries(data: readonly FrChartDataPoint[]): readonly FrChartSeries[] {
    const series = this.series();

    if (series.length) {
      return series;
    }

    return inferChartSeries(data, this.xKey(), this.yKey() ? [this.yKey() as string] : []);
  }

  private heatmapIndexFromPointer(event: PointerEvent, rect: DOMRect): number | null {
    const model = this.model();

    if (!model.heatmapCells.length) {
      return null;
    }

    const pointer = svgPointFromPointer(event, rect, this.viewBoxWidth(), this.viewBoxHeight());

    return heatmapIndexFromPoint(model.heatmapCells, pointer.x, pointer.y);
  }

  private indexFromPointerEvent(event: PointerEvent, rect: DOMRect): number | null {
    if (this.isCircularChart()) {
      return this.pieIndexFromPointer(event, rect);
    }

    if (this.type() === 'radial') {
      return this.radialIndexFromPointer(event, rect);
    }

    if (this.isHeatmapChart()) {
      return this.heatmapIndexFromPointer(event, rect);
    }

    const count = this.data().length;

    if (!count) {
      return null;
    }

    const model = this.model();
    const pointerX = ((event.clientX - rect.left) / rect.width) * this.viewBoxWidth();
    const pointerY = ((event.clientY - rect.top) / rect.height) * this.viewBoxHeight();
    const relative = this.isHorizontalBarChart()
      ? clampNumber((pointerY - model.plotY) / model.plotHeight, 0, 1)
      : clampNumber((pointerX - model.plotX) / model.plotWidth, 0, 1);

    return count <= 1 ? 0 : Math.round(relative * (count - 1));
  }

  private chartClickEventForIndex(index: number): FrChartClickEvent | null {
    const model = this.model();
    const datum = this.data()[index];
    const activeSlice = model.slices[index];
    const activeRadial = model.radials[index];
    const activeHeatmapCell = model.heatmapCells[index];

    if (this.isCircularChart() && activeSlice) {
      return {
        datum,
        index,
        label: activeSlice.label,
        type: this.type(),
        values: [
          {
            color: activeSlice.color,
            key: activeSlice.key,
            label: activeSlice.label,
            value: activeSlice.value,
          },
        ],
      };
    }

    if (this.type() === 'radial' && activeRadial) {
      return {
        datum,
        index,
        label: activeRadial.label,
        type: this.type(),
        values: [
          {
            color: activeRadial.color,
            key: activeRadial.key,
            label: activeRadial.label,
            value: activeRadial.value,
          },
        ],
      };
    }

    if (this.isHeatmapChart() && activeHeatmapCell) {
      const heatmapSeries = this.resolveSeries(this.inputSeries(this.data()))[0];

      return {
        datum,
        index,
        label: activeHeatmapCell.label,
        type: this.type(),
        values: [
          {
            color: activeHeatmapCell.color,
            key: heatmapSeries?.key ?? 'value',
            label: heatmapSeries?.label ?? 'Value',
            value: activeHeatmapCell.value,
          },
        ],
      };
    }

    if (!datum) {
      return null;
    }

    return {
      datum,
      index,
      label: formatChartLabel(datum[this.xKey()] ?? index + 1),
      type: this.type(),
      values: model.series.map((series) => ({
        color: series.color,
        key: series.key,
        label: series.label,
        value: series.points[index]?.value ?? 0,
      })),
    };
  }

  private tooltipPositionFromPointer(
    event: PointerEvent,
    rect: DOMRect,
  ): { xPercent: number; yPercent: number } {
    return {
      xPercent: clampNumber(((event.clientX - rect.left) / rect.width) * 100, 0, 100),
      yPercent: clampNumber(((event.clientY - rect.top) / rect.height) * 100, 0, 100),
    };
  }
}
