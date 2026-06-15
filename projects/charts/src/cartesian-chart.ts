import { chartColor } from './chart-colors';
import { formatChartLabel, toChartLabel } from './chart-format';
import { FrChartDatum, FrChartPoint, FrChartSeries, FrChartSeriesModel, FrChartTick } from './chart.types';
import { coerceNumber } from './chart-utils';

type BuildCartesianSeriesOptions = {
  readonly baselineY: number;
  readonly curve: 'linear' | 'smooth' | 'step';
  readonly data: readonly FrChartDatum[];
  readonly series: readonly FrChartSeries[];
  readonly seriesSpacing?: number;
  readonly xForIndex: (index: number) => number;
  readonly xKey: string;
  readonly yForValue: (value: number) => number;
};

export function buildCartesianSeries({
  baselineY,
  curve,
  data,
  series,
  seriesSpacing = 0,
  xForIndex,
  yForValue,
}: BuildCartesianSeriesOptions): readonly FrChartSeriesModel[] {
  return series.map((item, index) => {
    const yOffset = (index - (series.length - 1) / 2) * seriesSpacing;
    const points = data.map((datum, datumIndex) => {
      const value = coerceNumber(datum[item.key], 0);
      return {
        x: xForIndex(datumIndex),
        y: yForValue(value) + yOffset,
        value,
      };
    });
    const path = pathForPoints(points, curve);
    const areaPaths = buildAreaPaths(points, baselineY, curve);

    return {
      key: item.key,
      label: item.label ?? toChartLabel(item.key),
      color: item.color ?? chartColor(index),
      points,
      path,
      areaPath: areaPaths.join(' '),
      areaPaths,
    };
  });
}

export function pathForPoints(points: readonly FrChartPoint[], curve: 'linear' | 'smooth' | 'step' = 'smooth'): string {
  if (!points.length) {
    return '';
  }

  if (points.length === 1 || curve === 'linear') {
    return points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ');
  }

  if (curve === 'step') {
    return points.reduce((path, point, index, all) => {
      if (index === 0) {
        return `M ${point.x} ${point.y}`;
      }

      return `${path} H ${point.x} V ${point.y}`;
    }, '');
  }

  return points.reduce((path, point, index, all) => {
    if (index === 0) {
      return `M ${point.x} ${point.y}`;
    }

    const previous = all[index - 1];
    const controlX = (previous.x + point.x) / 2;
    return `${path} C ${controlX} ${previous.y}, ${controlX} ${point.y}, ${point.x} ${point.y}`;
  }, '');
}

export function buildAreaPath(
  points: readonly FrChartPoint[],
  baselineY: number,
  curve: 'linear' | 'smooth' | 'step' = 'smooth',
): string {
  return buildAreaPaths(points, baselineY, curve).join(' ');
}

export function buildAreaPaths(
  points: readonly FrChartPoint[],
  baselineY: number,
  curve: 'linear' | 'smooth' | 'step' = 'smooth',
): readonly string[] {
  if (!points.length) {
    return [];
  }

  const crossesBaseline = points.some((point, index) => {
    const previous = points[index - 1];

    return (
      !!previous &&
      previous.y !== baselineY &&
      point.y !== baselineY &&
      Math.sign(previous.y - baselineY) !== Math.sign(point.y - baselineY)
    );
  });
  const areaCurve = crossesBaseline ? 'linear' : curve;
  const segments = splitPointsAtBaseline(points, baselineY);

  return segments.map((segment) => closeAreaPath(segment, baselineY, areaCurve)).filter(Boolean);
}

function splitPointsAtBaseline(points: readonly FrChartPoint[], baselineY: number): readonly FrChartPoint[][] {
  if (points.length <= 1) {
    return [Array.from(points)];
  }

  const segments: FrChartPoint[][] = [[points[0]]];

  for (let index = 1; index < points.length; index++) {
    const previous = points[index - 1];
    const current = points[index];
    const active = segments[segments.length - 1];
    const crossesBaseline =
      previous.y !== baselineY &&
      current.y !== baselineY &&
      Math.sign(previous.y - baselineY) !== Math.sign(current.y - baselineY);

    if (crossesBaseline) {
      const ratio = (baselineY - previous.y) / (current.y - previous.y);
      const crossing = {
        x: previous.x + (current.x - previous.x) * ratio,
        y: baselineY,
        value: 0,
      };

      active.push(crossing);
      segments.push([crossing, current]);
      continue;
    }

    active.push(current);
  }

  return segments.filter((segment) => segment.length > 1);
}

function closeAreaPath(
  points: readonly FrChartPoint[],
  baselineY: number,
  curve: 'linear' | 'smooth' | 'step',
): string {
  const path = pathForPoints(points, curve);
  const first = points[0];
  const last = points.at(-1);

  return first && last ? `${path} L ${last.x} ${baselineY} L ${first.x} ${baselineY} Z` : '';
}

export function buildXTicks(
  data: readonly FrChartDatum[],
  xKey: string,
  xForIndex: (index: number) => number,
): readonly FrChartTick[] {
  if (!data.length) {
    return [];
  }

  const maxTicks = Math.min(6, data.length);
  const step = data.length <= 1 ? 1 : (data.length - 1) / (maxTicks - 1 || 1);
  const indexes = new Set(Array.from({ length: maxTicks }, (_, index) => Math.round(index * step)));

  return Array.from(indexes).map((index) => ({
    label: formatChartLabel(data[index]?.[xKey] ?? index + 1),
    x: xForIndex(index),
  }));
}

export function buildYTicks(
  min: number,
  max: number,
  yForValue: (value: number) => number,
  formatValue: (value: number) => string,
): readonly FrChartTick[] {
  const tickCount = 5;
  const range = max - min || 1;

  return Array.from({ length: tickCount }, (_, index) => {
    const value = min + (range / (tickCount - 1)) * index;
    return {
      label: formatValue(value),
      y: yForValue(value),
    };
  }).reverse();
}
