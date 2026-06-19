export type FrChartPoint2D = {
  readonly x: number;
  readonly y: number;
};

export function toRadians(angle: number): number {
  return (angle * Math.PI) / 180;
}

export function toDegrees(radians: number): number {
  return (radians * 180) / Math.PI;
}

export function polarToCartesian(
  centerX: number,
  centerY: number,
  radius: number,
  angle: number,
): FrChartPoint2D {
  const radians = toRadians(angle);

  return {
    x: centerX + radius * Math.cos(radians),
    y: centerY + radius * Math.sin(radians),
  };
}

export function circularArcPath(
  centerX: number,
  centerY: number,
  radius: number,
  startAngle: number,
  endAngle: number,
): string {
  const start = polarToCartesian(centerX, centerY, radius, startAngle);

  if (endAngle <= startAngle) {
    return `M ${start.x} ${start.y} L ${start.x} ${start.y}`;
  }

  const end = polarToCartesian(centerX, centerY, radius, endAngle);
  const largeArcFlag = largeArcFlagForAngles(startAngle, endAngle);

  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`;
}

export function sectorPath(
  centerX: number,
  centerY: number,
  radius: number,
  startAngle: number,
  endAngle: number,
): string {
  if (endAngle - startAngle >= 359.999) {
    return [
      `M ${centerX} ${centerY}`,
      `L ${centerX} ${centerY - radius}`,
      `A ${radius} ${radius} 0 1 1 ${centerX} ${centerY + radius}`,
      `A ${radius} ${radius} 0 1 1 ${centerX} ${centerY - radius}`,
      'Z',
    ].join(' ');
  }

  const start = polarToCartesian(centerX, centerY, radius, startAngle);
  const end = polarToCartesian(centerX, centerY, radius, endAngle);
  const largeArcFlag = largeArcFlagForAngles(startAngle, endAngle);

  return `M ${centerX} ${centerY} L ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y} Z`;
}

export function ringSectorPath(
  centerX: number,
  centerY: number,
  outerRadius: number,
  innerRadius: number,
  startAngle: number,
  endAngle: number,
): string {
  if (endAngle - startAngle >= 359.999) {
    return [
      `M ${centerX} ${centerY - outerRadius}`,
      `A ${outerRadius} ${outerRadius} 0 1 1 ${centerX} ${centerY + outerRadius}`,
      `A ${outerRadius} ${outerRadius} 0 1 1 ${centerX} ${centerY - outerRadius}`,
      `M ${centerX} ${centerY - innerRadius}`,
      `A ${innerRadius} ${innerRadius} 0 1 0 ${centerX} ${centerY + innerRadius}`,
      `A ${innerRadius} ${innerRadius} 0 1 0 ${centerX} ${centerY - innerRadius}`,
      'Z',
    ].join(' ');
  }

  const outerStart = polarToCartesian(centerX, centerY, outerRadius, startAngle);
  const outerEnd = polarToCartesian(centerX, centerY, outerRadius, endAngle);
  const innerStart = polarToCartesian(centerX, centerY, innerRadius, startAngle);
  const innerEnd = polarToCartesian(centerX, centerY, innerRadius, endAngle);
  const largeArcFlag = largeArcFlagForAngles(startAngle, endAngle);

  return [
    `M ${outerStart.x} ${outerStart.y}`,
    `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${outerEnd.x} ${outerEnd.y}`,
    `L ${innerEnd.x} ${innerEnd.y}`,
    `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${innerStart.x} ${innerStart.y}`,
    'Z',
  ].join(' ');
}

export function normalizedAngleFromPoint(
  pointX: number,
  pointY: number,
  centerX: number,
  centerY: number,
): number {
  return (toDegrees(Math.atan2(pointY - centerY, pointX - centerX)) + 450) % 360;
}

export function svgPointFromPointer(
  event: PointerEvent,
  rect: DOMRect,
  viewBoxWidth: number,
  viewBoxHeight: number,
): FrChartPoint2D {
  const scale = Math.min(rect.width / viewBoxWidth, rect.height / viewBoxHeight);
  const renderedWidth = viewBoxWidth * scale;
  const renderedHeight = viewBoxHeight * scale;
  const offsetX = (rect.width - renderedWidth) / 2;
  const offsetY = (rect.height - renderedHeight) / 2;

  return {
    x: (event.clientX - rect.left - offsetX) / scale,
    y: (event.clientY - rect.top - offsetY) / scale,
  };
}

export function largeArcFlagForAngles(startAngle: number, endAngle: number): 0 | 1 {
  return endAngle - startAngle > 180 ? 1 : 0;
}
