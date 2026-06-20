import { FrChartDatum, FrChartHeatmapCellModel, FrChartHeatmapTick, FrChartSeries } from './chart.types';
import { coerceNumber } from './chart-utils';
import { emptyHeatmapModel, HeatmapModel, heatmapCellColor } from './heatmap-chart';

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;
const DAY_MS = 24 * 60 * 60 * 1000;

interface CalendarHeatmapSeries {
  readonly color: string;
  readonly key: string;
  readonly label: string;
}

export interface BuildCalendarHeatmapOptions {
  readonly data: readonly FrChartDatum[];
  readonly plotHeight: number;
  readonly plotWidth: number;
  readonly plotX: number;
  readonly plotY: number;
  readonly series: readonly CalendarHeatmapSeries[];
  readonly viewBoxHeight: number;
  readonly viewBoxWidth: number;
  readonly xKey: string;
}

interface CalendarHeatmapEntry {
  readonly date: Date;
  readonly key: string;
  readonly label: string;
  readonly value: number;
}

export type CalendarHeatmapModel = HeatmapModel;

export function buildCalendarHeatmap(options: BuildCalendarHeatmapOptions): CalendarHeatmapModel {
  const valueSeries = options.series[0];

  if (!valueSeries) {
    return emptyHeatmapModel();
  }

  const entries = options.data
    .map((datum) => entryFromDatum(datum, options.xKey, valueSeries))
    .filter((entry): entry is CalendarHeatmapEntry => !!entry)
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  if (!entries.length) {
    return emptyHeatmapModel();
  }

  const startDate = startOfWeek(entries[0].date);
  const endDate = endOfWeek(entries[entries.length - 1].date);
  const weekCount = Math.max(Math.floor(daysBetween(startDate, endDate) / 7) + 1, 1);
  const gap = 4;
  const cellWidth = Math.max((options.plotWidth - gap * Math.max(weekCount - 1, 0)) / weekCount, 1);
  const cellHeight = Math.max((options.plotHeight - gap * 6) / 7, 1);
  const maxValue = Math.max(...entries.map((entry) => entry.value), 0);
  const entriesByDate = new Map(entries.map((entry) => [entry.key, entry]));
  const cells: FrChartHeatmapCellModel[] = [];
  const monthTicks: FrChartHeatmapTick[] = [];
  const seenMonths = new Set<string>();

  for (let week = 0; week < weekCount; week++) {
    for (let day = 0; day < 7; day++) {
      const date = addDays(startDate, week * 7 + day);
      const key = dateKey(date);
      const entry = entriesByDate.get(key);
      const value = entry?.value ?? 0;
      const x = options.plotX + week * (cellWidth + gap);
      const y = options.plotY + day * (cellHeight + gap);
      const monthKey = `${date.getUTCFullYear()}-${date.getUTCMonth()}`;

      if (!seenMonths.has(monthKey) && date.getUTCDate() <= 7) {
        seenMonths.add(monthKey);
        monthTicks.push({
          label: new Intl.DateTimeFormat(undefined, { month: 'short' }).format(date),
          x: x + cellWidth / 2,
          y: options.plotY - 14,
        });
      }

      cells.push({
        key,
        label: entry?.label ?? formatDateLabel(date),
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
    }
  }

  return {
    cells,
    rowTicks: DAY_LABELS.map((label, index) => ({
      label,
      x: options.plotX - 10,
      y: options.plotY + index * (cellHeight + gap) + cellHeight / 2,
    })),
    columnTicks: monthTicks,
  };
}

function entryFromDatum(
  datum: FrChartDatum,
  xKey: string,
  series: Pick<FrChartSeries, 'key' | 'label'>,
): CalendarHeatmapEntry | null {
  const date = parseCalendarDate(datum[xKey]);

  if (!date) {
    return null;
  }

  return {
    date,
    key: dateKey(date),
    label: formatDateLabel(date),
    value: Math.max(coerceNumber(datum[series.key], 0), 0),
  };
}

function parseCalendarDate(value: unknown): Date | null {
  if (value instanceof Date && Number.isFinite(value.getTime())) {
    return new Date(Date.UTC(value.getFullYear(), value.getMonth(), value.getDate()));
  }

  if (typeof value !== 'string' && typeof value !== 'number') {
    return null;
  }

  const stringValue = String(value);
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(stringValue);

  if (match) {
    const year = Number(match[1]);
    const month = Number(match[2]) - 1;
    const day = Number(match[3]);
    const date = new Date(Date.UTC(year, month, day));

    return Number.isFinite(date.getTime()) ? date : null;
  }

  const date = new Date(value);

  if (!Number.isFinite(date.getTime())) {
    return null;
  }

  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
}

function startOfWeek(date: Date): Date {
  return addDays(date, -date.getUTCDay());
}

function endOfWeek(date: Date): Date {
  return addDays(date, 6 - date.getUTCDay());
}

function addDays(date: Date, days: number): Date {
  return new Date(date.getTime() + days * DAY_MS);
}

function daysBetween(start: Date, end: Date): number {
  return Math.round((start.getTime() - end.getTime()) / -DAY_MS);
}

function dateKey(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function formatDateLabel(date: Date): string {
  return new Intl.DateTimeFormat(undefined, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
}
