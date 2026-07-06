import { DEFAULT_COLORS } from './chart.constants';
import { FrChartDatum } from './chart.types';

const MIX_STEPS = [0, 18, 32, 46, 60, 72] as const;

export function chartColor(index: number): string {
  const baseColor = DEFAULT_COLORS[index % DEFAULT_COLORS.length];
  const cycle = Math.floor(index / DEFAULT_COLORS.length);

  if (cycle === 0) {
    return baseColor;
  }

  const mixStep = MIX_STEPS[cycle % MIX_STEPS.length];
  const mixColor = cycle % 2 === 0 ? 'var(--frame-background)' : 'var(--frame-foreground)';

  return `color-mix(in oklch, ${baseColor} ${100 - mixStep}%, ${mixColor} ${mixStep}%)`;
}

export function chartDatumColor(datum: FrChartDatum): string | null {
  const color = datum['color'];

  return typeof color === 'string' && color.trim().length ? color : null;
}
