export interface ScrollMetrics {
  readonly scrollLeft: number;
  readonly scrollWidth: number;
  readonly clientWidth: number;
}

export interface ScrollState {
  readonly atStart: boolean;
  readonly atEnd: boolean;
  readonly progress: number;
}

const EDGE_TOLERANCE_PX = 2;

export const INITIAL_SCROLL_STATE: ScrollState = { atStart: true, atEnd: false, progress: 0 };

export function measureScroll({
  scrollLeft,
  scrollWidth,
  clientWidth,
}: ScrollMetrics): ScrollState {
  const maxScroll = Math.max(scrollWidth - clientWidth, 0);
  if (maxScroll <= EDGE_TOLERANCE_PX) {
    return { atStart: true, atEnd: true, progress: 1 };
  }
  const position = Math.min(Math.max(scrollLeft, 0), maxScroll);
  return {
    atStart: position <= EDGE_TOLERANCE_PX,
    atEnd: position >= maxScroll - EDGE_TOLERANCE_PX,
    progress: position / maxScroll,
  };
}
