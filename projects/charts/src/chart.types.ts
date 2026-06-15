export type FrChartType = 'area' | 'bar' | 'line' | 'pie' | 'radial';
export type FrChartCurve = 'linear' | 'smooth' | 'step';
export type FrChartDatum = Record<string, Date | number | string | null | undefined>;

export interface FrChartSeries {
  readonly key: string;
  readonly label?: string;
  readonly color?: string;
}

export interface FrChartPoint {
  readonly x: number;
  readonly y: number;
  readonly value: number;
}

export interface FrChartSeriesModel {
  readonly key: string;
  readonly label: string;
  readonly color: string;
  readonly points: readonly FrChartPoint[];
  readonly path: string;
  readonly areaPath: string;
  readonly areaPaths: readonly string[];
}

export interface FrChartBarModel {
  readonly key: string;
  readonly label: string;
  readonly color: string;
  readonly order: number;
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly value: number;
}

export interface FrChartPieSliceModel {
  readonly key: string;
  readonly label: string;
  readonly color: string;
  readonly order: number;
  readonly path: string;
  readonly startAngle: number;
  readonly endAngle: number;
  readonly value: number;
  readonly xPercent: number;
  readonly yPercent: number;
}

export interface FrChartRadialSegmentModel {
  readonly key: string;
  readonly label: string;
  readonly color: string;
  readonly order: number;
  readonly path: string;
  readonly trackPath: string;
  readonly radius: number;
  readonly strokeWidth: number;
  readonly startAngle: number;
  readonly endAngle: number;
  readonly value: number;
  readonly max: number;
  readonly percent: number;
  readonly xPercent: number;
  readonly yPercent: number;
}

export interface FrChartLegendItem {
  readonly key: string;
  readonly label: string;
  readonly color: string;
}

export interface FrChartTick {
  readonly label: string;
  readonly x?: number;
  readonly y?: number;
}

export interface FrChartModel {
  readonly plotX: number;
  readonly plotY: number;
  readonly plotWidth: number;
  readonly plotHeight: number;
  readonly baselineY: number;
  readonly showZeroBaseline: boolean;
  readonly series: readonly FrChartSeriesModel[];
  readonly bars: readonly FrChartBarModel[];
  readonly slices: readonly FrChartPieSliceModel[];
  readonly radials: readonly FrChartRadialSegmentModel[];
  readonly legendItems: readonly FrChartLegendItem[];
  readonly xTicks: readonly FrChartTick[];
  readonly yTicks: readonly FrChartTick[];
}

export interface FrChartTooltip {
  readonly xPercent: number;
  readonly yPercent: number;
  readonly label: string;
  readonly values: readonly {
    readonly color: string;
    readonly label: string;
    readonly value: number;
  }[];
}
