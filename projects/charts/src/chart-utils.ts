export function coerceNumber(value: unknown, fallback = 0): number {
  const numeric = Number(value);

  return Number.isFinite(numeric) ? numeric : fallback;
}

export function clampNumber(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), Math.max(min, max));
}
