import { chartColor, chartDatumColor } from './chart-colors';
import { formatChartLabel } from './chart-format';
import { circularArcPath, polarToCartesian } from './chart-geometry';
import { FrChartDataPoint, FrChartRadialSegmentModel, FrChartSeries } from './chart.types';
import { clampNumber, coerceNumber } from './chart-utils';

type BuildRadialSegmentsOptions = {
  readonly data: readonly FrChartDataPoint[];
  readonly plotHeight: number;
  readonly plotWidth: number;
  readonly plotX: number;
  readonly plotY: number;
  readonly series: readonly FrChartSeries[];
  readonly viewBoxHeight: number;
  readonly viewBoxWidth: number;
  readonly xKey: string;
};

export function buildRadialSegments({
  data,
  plotHeight,
  plotWidth,
  plotX,
  plotY,
  series,
  viewBoxHeight,
  viewBoxWidth,
  xKey,
}: BuildRadialSegmentsOptions): readonly FrChartRadialSegmentModel[] {
  const valueKey = series[0]?.key;

  if (!valueKey || !data.length) {
    return [];
  }

  const values = data.map((datum) => Math.max(coerceNumber(datum[valueKey], 0), 0));

  if (!values.some((value) => value > 0)) {
    return [];
  }

  const centerX = plotX + plotWidth / 2;
  const centerY = plotY + plotHeight / 2;
  const maxRadius = Math.max(Math.min(plotWidth, plotHeight) / 2 - 14, 1);
  const ringGap = data.length > 5 ? 4 : 6;
  const strokeWidth = Math.max(Math.min((maxRadius / Math.max(data.length, 1)) * 0.58, 18), 5);
  const fullSweep = 300;
  const startAngle = 120;

  return data
    .map((datum, index) => {
      const value = values[index] ?? 0;
      const max = Math.max(coerceNumber(datum['max'], 100), 1);
      const percent = clampNumber(value / max, 0, 1);
      const radius = maxRadius - index * (strokeWidth + ringGap);

      if (radius <= strokeWidth / 2) {
        return null;
      }

      const endAngle = startAngle + fullSweep * percent;
      const color = chartDatumColor(datum) ?? series[index]?.color ?? chartColor(index);
      const labelPoint = polarToCartesian(centerX, centerY, radius, endAngle);

      return {
        key: String(datum[xKey] ?? index),
        label: formatChartLabel(datum[xKey] ?? index + 1),
        color,
        order: index,
        path: circularArcPath(centerX, centerY, radius, startAngle, endAngle),
        trackPath: circularArcPath(centerX, centerY, radius, startAngle, startAngle + fullSweep),
        radius,
        strokeWidth,
        startAngle,
        endAngle,
        value,
        max,
        percent,
        xPercent: (labelPoint.x / viewBoxWidth) * 100,
        yPercent: (labelPoint.y / viewBoxHeight) * 100,
      };
    })
    .filter((segment): segment is FrChartRadialSegmentModel => !!segment);
}

export function radialIndexFromPoint(
  segments: readonly FrChartRadialSegmentModel[],
  pointX: number,
  pointY: number,
  centerX: number,
  centerY: number,
): number | null {
  const distance = Math.hypot(pointX - centerX, pointY - centerY);
  const index = segments.findIndex(
    (segment) => Math.abs(distance - segment.radius) <= Math.max(segment.strokeWidth / 2 + 4, 8),
  );

  return index === -1 ? null : index;
}
