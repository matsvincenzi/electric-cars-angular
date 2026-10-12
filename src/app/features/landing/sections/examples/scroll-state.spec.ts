import { measureScroll } from './scroll-state';

describe('measureScroll', () => {
  it('is at the start before any scrolling', () => {
    expect(measureScroll({ scrollLeft: 0, scrollWidth: 2000, clientWidth: 800 })).toEqual({
      atStart: true,
      atEnd: false,
      progress: 0,
    });
  });

  it('reports partial progress in the middle of the track', () => {
    expect(measureScroll({ scrollLeft: 600, scrollWidth: 2000, clientWidth: 800 })).toEqual({
      atStart: false,
      atEnd: false,
      progress: 0.5,
    });
  });

  it('is at the end when the last card is fully visible', () => {
    const state = measureScroll({ scrollLeft: 1200, scrollWidth: 2000, clientWidth: 800 });

    expect(state.atEnd).toBe(true);
    expect(state.progress).toBe(1);
  });

  it('treats sub-pixel offsets near the edges as the edges', () => {
    expect(measureScroll({ scrollLeft: 1.4, scrollWidth: 2000, clientWidth: 800 }).atStart).toBe(
      true,
    );
    expect(measureScroll({ scrollLeft: 1198.6, scrollWidth: 2000, clientWidth: 800 }).atEnd).toBe(
      true,
    );
  });

  it('clamps elastic overscroll so progress stays between 0 and 1', () => {
    expect(measureScroll({ scrollLeft: -40, scrollWidth: 2000, clientWidth: 800 }).progress).toBe(
      0,
    );
    expect(measureScroll({ scrollLeft: 1300, scrollWidth: 2000, clientWidth: 800 }).progress).toBe(
      1,
    );
  });

  it('disables both directions when every card already fits', () => {
    expect(measureScroll({ scrollLeft: 0, scrollWidth: 800, clientWidth: 800 })).toEqual({
      atStart: true,
      atEnd: true,
      progress: 1,
    });
  });
});
