import { clampNumber } from '@frame-ui-ng/components/utils';

export interface FrVirtualRange {
  start: number;
  end: number;
  before: number;
  after: number;
}

export interface FrVirtualRangeOptions {
  itemSize: number;
  overscan: number;
  scrollTop: number;
  totalCount: number;
  viewportSize: number;
}

export type FrVirtualScrollAlignment = 'auto' | 'start' | 'center' | 'end' | 'nearest';

export function calculateVirtualRange(options: FrVirtualRangeOptions): FrVirtualRange {
  const itemSize = Math.max(options.itemSize, 1);
  const totalCount = Math.max(options.totalCount, 0);
  const viewportSize = Math.max(options.viewportSize, 0);
  const overscan = Math.max(Math.trunc(options.overscan), 0);
  const visibleCount = Math.max(Math.ceil(viewportSize / itemSize), 1);
  const rawStart = Math.floor(Math.max(options.scrollTop, 0) / itemSize) - overscan;
  const start = clampNumber(rawStart, 0, totalCount);
  const end = clampNumber(start + visibleCount + overscan * 2, start, totalCount);

  return {
    start,
    end,
    before: start * itemSize,
    after: Math.max(totalCount - end, 0) * itemSize,
  };
}

export function calculateScrollOffsetForIndex(
  index: number,
  alignment: FrVirtualScrollAlignment,
  itemSize: number,
  viewportSize: number,
  totalCount: number,
  currentScrollTop: number,
): number {
  const normalizedItemSize = Math.max(itemSize, 1);
  const normalizedViewportSize = Math.max(viewportSize, 0);
  const maxScrollTop = Math.max(totalCount * normalizedItemSize - normalizedViewportSize, 0);
  const clampedIndex = clampNumber(index, 0, Math.max(totalCount - 1, 0));
  const itemStart = clampedIndex * normalizedItemSize;
  const itemEnd = itemStart + normalizedItemSize;

  switch (alignment) {
    case 'start':
      return clampNumber(itemStart, 0, maxScrollTop);
    case 'center':
      return clampNumber(itemStart - (normalizedViewportSize - normalizedItemSize) / 2, 0, maxScrollTop);
    case 'end':
      return clampNumber(itemEnd - normalizedViewportSize, 0, maxScrollTop);
    case 'nearest':
    case 'auto':
    default:
      if (itemStart < currentScrollTop) {
        return clampNumber(itemStart, 0, maxScrollTop);
      }

      if (itemEnd > currentScrollTop + normalizedViewportSize) {
        return clampNumber(itemEnd - normalizedViewportSize, 0, maxScrollTop);
      }

      return clampNumber(currentScrollTop, 0, maxScrollTop);
  }
}
