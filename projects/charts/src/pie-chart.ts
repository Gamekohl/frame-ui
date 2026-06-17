import { chartColor, chartDatumColor } from './chart-colors';
import { formatChartLabel } from './chart-format';
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
    const slice = {
      key: String(datum[xKey] ?? index),
      label: formatChartLabel(datum[xKey] ?? index + 1),
      color,
      order: index,
      path:
        resolvedInnerRadius > 0
          ? donutArcPath(centerX, centerY, radius, resolvedInnerRadius, startAngle, endAngle)
          : arcPath(centerX, centerY, radius, startAngle, endAngle),
      startAngle,
      endAngle,
      value,
      xPercent: ((centerX + Math.cos(toRadians(middleAngle)) * radius * 0.65) / viewBoxWidth) * 100,
      yPercent: ((centerY + Math.sin(toRadians(middleAngle)) * radius * 0.65) / viewBoxHeight) * 100,
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

  const angle = (Math.atan2(pointY - centerY, pointX - centerX) * 180) / Math.PI;
  const normalizedAngle = (angle + 450) % 360;
  const index = slices.findIndex((slice) => normalizedAngle >= slice.startAngle + 90 && normalizedAngle < slice.endAngle + 90);

  return index === -1 ? null : index;
}

export function pieRadius(plotWidth: number, plotHeight: number): number {
  return Math.max(Math.min(plotWidth, plotHeight) / 2 - 10, 1);
}

export function donutInnerRadius(plotWidth: number, plotHeight: number): number {
  return Math.max(pieRadius(plotWidth, plotHeight) * 0.58, 1);
}

function arcPath(centerX: number, centerY: number, radius: number, startAngle: number, endAngle: number): string {
  if (endAngle - startAngle >= 359.999) {
    return [
      `M ${centerX} ${centerY}`,
      `L ${centerX} ${centerY - radius}`,
      `A ${radius} ${radius} 0 1 1 ${centerX} ${centerY + radius}`,
      `A ${radius} ${radius} 0 1 1 ${centerX} ${centerY - radius}`,
      'Z',
    ].join(' ');
  }

  const start = polarToCartesian(centerX, centerY, radius, startAngle);
  const end = polarToCartesian(centerX, centerY, radius, endAngle);
  const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

  return `M ${centerX} ${centerY} L ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y} Z`;
}

function donutArcPath(
  centerX: number,
  centerY: number,
  outerRadius: number,
  innerRadius: number,
  startAngle: number,
  endAngle: number,
): string {
  if (endAngle - startAngle >= 359.999) {
    return [
      `M ${centerX} ${centerY - outerRadius}`,
      `A ${outerRadius} ${outerRadius} 0 1 1 ${centerX} ${centerY + outerRadius}`,
      `A ${outerRadius} ${outerRadius} 0 1 1 ${centerX} ${centerY - outerRadius}`,
      `M ${centerX} ${centerY - innerRadius}`,
      `A ${innerRadius} ${innerRadius} 0 1 0 ${centerX} ${centerY + innerRadius}`,
      `A ${innerRadius} ${innerRadius} 0 1 0 ${centerX} ${centerY - innerRadius}`,
      'Z',
    ].join(' ');
  }

  const outerStart = polarToCartesian(centerX, centerY, outerRadius, startAngle);
  const outerEnd = polarToCartesian(centerX, centerY, outerRadius, endAngle);
  const innerStart = polarToCartesian(centerX, centerY, innerRadius, startAngle);
  const innerEnd = polarToCartesian(centerX, centerY, innerRadius, endAngle);
  const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

  return [
    `M ${outerStart.x} ${outerStart.y}`,
    `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${outerEnd.x} ${outerEnd.y}`,
    `L ${innerEnd.x} ${innerEnd.y}`,
    `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${innerStart.x} ${innerStart.y}`,
    'Z',
  ].join(' ');
}

function polarToCartesian(centerX: number, centerY: number, radius: number, angle: number): { x: number; y: number } {
  const radians = toRadians(angle);

  return {
    x: centerX + radius * Math.cos(radians),
    y: centerY + radius * Math.sin(radians),
  };
}

function toRadians(angle: number): number {
  return (angle * Math.PI) / 180;
}
