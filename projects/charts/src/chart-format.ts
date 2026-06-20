import { FrChartDatum, FrChartSeries } from './chart.types';

export function formatChartLabel(value: Date | number | string): string {
  if (value instanceof Date) {
    return new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric' }).format(value);
  }

  return String(value);
}

export function toChartLabel(value: string): string {
  return value
    .replace(/[-_]+/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

export function inferChartSeries(
  data: readonly FrChartDatum[],
  xKey: string,
  excludedKeys: readonly string[] = [],
): readonly FrChartSeries[] {
  const first = data[0];

  if (!first) {
    return [];
  }

  const excludedKeySet = new Set([xKey, ...excludedKeys]);

  return Object.keys(first)
    .filter((key) => !excludedKeySet.has(key) && Number.isFinite(Number(first[key])))
    .map((key) => ({ key, label: toChartLabel(key) }));
}
