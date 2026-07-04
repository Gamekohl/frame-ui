export interface ChartDomain {
  readonly min: number;
  readonly max: number;
}

export function buildChartDomain(values: readonly number[], options: { readonly zoomToData?: boolean } = {}): ChartDomain {
  const finiteValues = values.filter(Number.isFinite);

  if (!finiteValues.length) {
    return { min: 0, max: 1 };
  }

  const rawMin = Math.min(...finiteValues);
  const rawMax = Math.max(...finiteValues);

  if (!options.zoomToData) {
    return {
      min: Math.min(0, rawMin),
      max: Math.max(1, rawMax),
    };
  }

  if (rawMin === rawMax) {
    const padding = Math.max(Math.abs(rawMax) * 0.01, 1);

    return {
      min: rawMin - padding,
      max: rawMax + padding,
    };
  }

  const range = rawMax - rawMin;
  const padding = Math.max(range * 0.12, Math.abs(rawMax) * 0.002, 0.01);

  return {
    min: rawMin - padding,
    max: rawMax + padding,
  };
}

