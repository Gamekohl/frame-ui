import { chartColor } from './chart-colors';
import { formatChartLabel } from './chart-format';
import { FrChartDatum, FrChartHeatmapCellModel, FrChartHeatmapTick, FrChartSeries } from './chart.types';
import { coerceNumber } from './chart-utils';

export interface HeatmapSeries {
  readonly color: string;
  readonly key: string;
  readonly label: string;
}

export interface HeatmapModel {
  readonly cells: readonly FrChartHeatmapCellModel[];
  readonly columnTicks: readonly FrChartHeatmapTick[];
  readonly rowTicks: readonly FrChartHeatmapTick[];
}

export interface BuildHeatmapOptions {
  readonly data: readonly FrChartDatum[];
  readonly plotHeight: number;
  readonly plotWidth: number;
  readonly plotX: number;
  readonly plotY: number;
  readonly series: readonly HeatmapSeries[];
  readonly viewBoxHeight: number;
  readonly viewBoxWidth: number;
  readonly xKey: string;
  readonly yKey: string | null;
}

interface HeatmapEntry {
  readonly column: string;
  readonly row: string;
  readonly value: number;
}

export function buildHeatmap(options: BuildHeatmapOptions): HeatmapModel {
  const valueSeries = options.series[0];

  if (!valueSeries || !options.yKey) {
    return emptyHeatmapModel();
  }

  const entries = options.data
    .map((datum) => entryFromDatum(datum, options.xKey, options.yKey as string, valueSeries))
    .filter((entry): entry is HeatmapEntry => !!entry);

  if (!entries.length) {
    return emptyHeatmapModel();
  }

  const columns = unique(entries.map((entry) => entry.column));
  const rows = unique(entries.map((entry) => entry.row));
  const gap = 4;
  const cellWidth = Math.max((options.plotWidth - gap * Math.max(columns.length - 1, 0)) / columns.length, 1);
  const cellHeight = Math.max((options.plotHeight - gap * Math.max(rows.length - 1, 0)) / rows.length, 1);
  const maxValue = Math.max(...entries.map((entry) => entry.value), 0);
  const valuesByPosition = new Map(entries.map((entry) => [`${entry.row}::${entry.column}`, entry.value]));
  const cells: FrChartHeatmapCellModel[] = [];

  rows.forEach((row, rowIndex) => {
    columns.forEach((column, columnIndex) => {
      const value = valuesByPosition.get(`${row}::${column}`) ?? 0;
      const x = options.plotX + columnIndex * (cellWidth + gap);
      const y = options.plotY + rowIndex * (cellHeight + gap);

      cells.push({
        key: `${row}-${column}`,
        label: `${row} / ${column}`,
        color: heatmapCellColor(valueSeries.color, value, maxValue),
        order: cells.length,
        x,
        y,
        width: cellWidth,
        height: cellHeight,
        value,
        xPercent: ((x + cellWidth / 2) / options.viewBoxWidth) * 100,
        yPercent: ((y + cellHeight / 2) / options.viewBoxHeight) * 100,
      });
    });
  });

  return {
    cells,
    columnTicks: columns.map((label, index) => ({
      label,
      x: options.plotX + index * (cellWidth + gap) + cellWidth / 2,
      y: options.plotY - 14,
    })),
    rowTicks: rows.map((label, index) => ({
      label,
      x: options.plotX - 10,
      y: options.plotY + index * (cellHeight + gap) + cellHeight / 2,
    })),
  };
}

export function heatmapIndexFromPoint(
  cells: readonly FrChartHeatmapCellModel[],
  x: number,
  y: number,
): number | null {
  const index = cells.findIndex(
    (cell) => x >= cell.x && x <= cell.x + cell.width && y >= cell.y && y <= cell.y + cell.height,
  );

  return index >= 0 ? index : null;
}

export function heatmapCellColor(color: string, value: number, maxValue: number): string {
  if (value <= 0 || maxValue <= 0) {
    return 'var(--frame-chart-heatmap-empty-bg)';
  }

  const strength = Math.round(18 + Math.min(value / maxValue, 1) * 82);

  return `color-mix(in srgb, ${color || chartColor(0)} ${strength}%, var(--frame-chart-heatmap-empty-bg))`;
}

export function emptyHeatmapModel(): HeatmapModel {
  return {
    cells: [],
    columnTicks: [],
    rowTicks: [],
  };
}

function entryFromDatum(
  datum: FrChartDatum,
  xKey: string,
  yKey: string,
  series: Pick<FrChartSeries, 'key'>,
): HeatmapEntry | null {
  const columnValue = datum[xKey];
  const rowValue = datum[yKey];

  if (columnValue == null || rowValue == null) {
    return null;
  }

  return {
    column: formatChartLabel(columnValue),
    row: formatChartLabel(rowValue),
    value: Math.max(coerceNumber(datum[series.key], 0), 0),
  };
}

function unique(values: readonly string[]): readonly string[] {
  return Array.from(new Set(values));
}
