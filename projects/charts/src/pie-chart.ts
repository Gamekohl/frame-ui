import { chartColor, chartDatumColor } from './chart-colors';
import { formatChartLabel } from './chart-format';
import { normalizedAngleFromPoint, polarToCartesian, ringSectorPath, sectorPath } from './chart-geometry';
import { FrChartDatum, FrChartPieSliceModel, FrChartSeries } from './chart.types';
import { coerceNumber } from './chart-utils';

type BuildPieSlicesOptions = {
  readonly data: readonly FrChartDatum[];
  readonly innerRadius?: number;
  readonly plotHeight: number;
  readonly plotWidth: number;
  readonly plotX: number;
  readonly plotY: number;
  readonly series: readonly FrChartSeries[];
  readonly viewBoxHeight: number;
  readonly viewBoxWidth: number;
  readonly xKey: string;
};

export function buildPieSlices({
  data,
  innerRadius = 0,
  plotHeight,
  plotWidth,
  plotX,
  plotY,
  series,
  viewBoxHeight,
  viewBoxWidth,
  xKey,
}: BuildPieSlicesOptions): readonly FrChartPieSliceModel[] {
  const valueKey = series[0]?.key;

  if (!valueKey || !data.length) {
    return [];
  }

  const values = data.map((datum) => Math.max(coerceNumber(datum[valueKey], 0), 0));
  const total = values.reduce((sum, value) => sum + value, 0);

  if (total <= 0) {
    return [];
  }

  const centerX = plotX + plotWidth / 2;
  const centerY = plotY + plotHeight / 2;
  const radius = pieRadius(plotWidth, plotHeight);
  const resolvedInnerRadius = Math.max(Math.min(innerRadius, radius - 1), 0);
  let startAngle = -90;

  return data.map((datum, index) => {
    const value = values[index] ?? 0;
    const sweep = (value / total) * 360;
    const endAngle = startAngle + sweep;
    const middleAngle = startAngle + sweep / 2;
    const color = chartDatumColor(datum) ?? series[index]?.color ?? chartColor(index);
    const labelPoint = polarToCartesian(centerX, centerY, radius * 0.65, middleAngle);
    const slice = {
      key: String(datum[xKey] ?? index),
      label: formatChartLabel(datum[xKey] ?? index + 1),
      color,
      order: index,
      path:
        resolvedInnerRadius > 0
          ? ringSectorPath(centerX, centerY, radius, resolvedInnerRadius, startAngle, endAngle)
          : sectorPath(centerX, centerY, radius, startAngle, endAngle),
      startAngle,
      endAngle,
      value,
      xPercent: (labelPoint.x / viewBoxWidth) * 100,
      yPercent: (labelPoint.y / viewBoxHeight) * 100,
    };

    startAngle = endAngle;
    return slice;
  });
}

export function pieIndexFromPoint(
  slices: readonly FrChartPieSliceModel[],
  pointX: number,
  pointY: number,
  centerX: number,
  centerY: number,
  radius: number,
  innerRadius = 0,
): number | null {
  const distance = Math.hypot(pointX - centerX, pointY - centerY);

  if (!slices.length || distance > radius || distance < innerRadius) {
    return null;
  }

  const normalizedAngle = normalizedAngleFromPoint(pointX, pointY, centerX, centerY);
  const index = slices.findIndex((slice) => normalizedAngle >= slice.startAngle + 90 && normalizedAngle < slice.endAngle + 90);

  return index === -1 ? null : index;
}

export function pieRadius(plotWidth: number, plotHeight: number): number {
  return Math.max(Math.min(plotWidth, plotHeight) / 2 - 10, 1);
}

export function donutInnerRadius(plotWidth: number, plotHeight: number): number {
  return Math.max(pieRadius(plotWidth, plotHeight) * 0.58, 1);
}
