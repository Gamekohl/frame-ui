import { FrChartBarLayout, FrChartBarModel, FrChartBarOrientation, FrChartSeriesModel } from './chart.types';

type BuildBarsOptions = {
  readonly baselineY: number;
  readonly categorySize: number;
  readonly groupCount: number;
  readonly layout: FrChartBarLayout;
  readonly orientation: FrChartBarOrientation;
  readonly plotWidth: number;
  readonly series: readonly FrChartSeriesModel[];
  readonly xForValue: (value: number) => number;
  readonly yForValue: (value: number) => number;
  readonly yForIndex: (index: number) => number;
};

export function buildBars({
  baselineY,
  categorySize,
  groupCount,
  layout,
  orientation,
  plotWidth,
  series,
  xForValue,
  yForValue,
  yForIndex,
}: BuildBarsOptions): readonly FrChartBarModel[] {
  if (orientation === 'horizontal') {
    return layout === 'stacked'
      ? buildHorizontalStackedBars(series, categorySize, yForIndex, xForValue)
      : buildHorizontalGroupedBars(series, categorySize, yForIndex, xForValue);
  }

  if (layout === 'stacked') {
    return buildVerticalStackedBars(series, groupCount, plotWidth, yForValue);
  }

  return buildVerticalGroupedBars(series, groupCount, baselineY, plotWidth);
}

function buildVerticalGroupedBars(
  series: readonly FrChartSeriesModel[],
  groupCount: number,
  baselineY: number,
  plotWidth: number,
): readonly FrChartBarModel[] {
  const seriesCount = Math.max(series.length, 1);
  const groupWidth = groupCount <= 1 ? plotWidth * 0.55 : plotWidth / groupCount;
  const barWidth = Math.min(36, (groupWidth * 0.68) / seriesCount);
  const offsetStart = -(barWidth * seriesCount) / 2;

  return series.flatMap((item, seriesIndex) =>
    item.points.map((point, index) => ({
      key: `${item.key}-${index}`,
      label: item.label,
      color: item.color,
      order: index,
      x: point.x + offsetStart + seriesIndex * barWidth,
      y: Math.min(point.y, baselineY),
      width: Math.max(barWidth - 2, 1),
      height: Math.abs(baselineY - point.y),
      value: point.value,
    })),
  );
}

function buildVerticalStackedBars(
  series: readonly FrChartSeriesModel[],
  groupCount: number,
  plotWidth: number,
  yForValue: (value: number) => number,
): readonly FrChartBarModel[] {
  const groupWidth = groupCount <= 1 ? plotWidth * 0.55 : plotWidth / groupCount;
  const barWidth = Math.min(44, groupWidth * 0.56);
  const offsets = Array.from({ length: groupCount }, () => ({ negative: 0, positive: 0 }));

  return series.flatMap((item, seriesIndex) =>
    item.points.map((point, index) => {
      const stack = offsets[index];
      const isNegative = point.value < 0;
      const previous = isNegative ? stack.negative : stack.positive;
      const next = previous + point.value;
      const previousY = yForValue(previous);
      const nextY = yForValue(next);

      if (isNegative) {
        stack.negative = next;
      } else {
        stack.positive = next;
      }

      return {
        key: `${item.key}-${index}`,
        label: item.label,
        color: item.color,
        order: index + seriesIndex,
        x: point.x - barWidth / 2,
        y: Math.min(previousY, nextY),
        width: Math.max(barWidth - 2, 1),
        height: Math.abs(previousY - nextY),
        value: point.value,
      };
    }),
  );
}

function buildHorizontalGroupedBars(
  series: readonly FrChartSeriesModel[],
  categorySize: number,
  yForIndex: (index: number) => number,
  xForValue: (value: number) => number,
): readonly FrChartBarModel[] {
  const seriesCount = Math.max(series.length, 1);
  const barHeight = Math.min(28, (categorySize * 0.68) / seriesCount);
  const offsetStart = -(barHeight * seriesCount) / 2;

  return series.flatMap((item, seriesIndex) =>
    item.points.map((point, index) => {
      const x = xForValue(point.value);
      const baselineX = xForValue(0);

      return {
        key: `${item.key}-${index}`,
        label: item.label,
        color: item.color,
        order: index,
        x: Math.min(x, baselineX),
        y: yForIndex(index) + offsetStart + seriesIndex * barHeight,
        width: Math.abs(x - baselineX),
        height: Math.max(barHeight - 2, 1),
        value: point.value,
      };
    }),
  );
}

function buildHorizontalStackedBars(
  series: readonly FrChartSeriesModel[],
  categorySize: number,
  yForIndex: (index: number) => number,
  xForValue: (value: number) => number,
): readonly FrChartBarModel[] {
  const barHeight = Math.min(34, categorySize * 0.56);
  const offsets = Array.from({ length: series[0]?.points.length ?? 0 }, () => ({ negative: 0, positive: 0 }));

  return series.flatMap((item, seriesIndex) =>
    item.points.map((point, index) => {
      const stack = offsets[index];
      const isNegative = point.value < 0;
      const previous = isNegative ? stack.negative : stack.positive;
      const next = previous + point.value;
      const previousX = xForValue(previous);
      const nextX = xForValue(next);

      if (isNegative) {
        stack.negative = next;
      } else {
        stack.positive = next;
      }

      return {
        key: `${item.key}-${index}`,
        label: item.label,
        color: item.color,
        order: index + seriesIndex,
        x: Math.min(previousX, nextX),
        y: yForIndex(index) - barHeight / 2,
        width: Math.abs(nextX - previousX),
        height: Math.max(barHeight - 2, 1),
        value: point.value,
      };
    }),
  );
}
