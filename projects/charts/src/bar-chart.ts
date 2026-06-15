import { FrChartBarModel, FrChartSeriesModel } from './chart.types';

export function buildBars(
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
