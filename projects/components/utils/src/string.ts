export function valueToCssSize(value: number | string | undefined): string | undefined {
  return typeof value === 'number' ? `${value}px` : value;
}