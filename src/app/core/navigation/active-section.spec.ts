import { TestBed } from '@angular/core/testing';
import { ActiveSection } from './active-section';

class FakeIntersectionObserver {
  static latest: FakeIntersectionObserver;
  readonly observed = new Set<Element>();

  constructor(private readonly callback: IntersectionObserverCallback) {
    FakeIntersectionObserver.latest = this;
  }

  observe(element: Element): void {
    this.observed.add(element);
  }

  unobserve(element: Element): void {
    this.observed.delete(element);
  }

  emit(target: Element, isIntersecting: boolean): void {
    this.callback(
      [{ target, isIntersecting } as IntersectionObserverEntry],
      this as unknown as IntersectionObserver,
    );
  }
}

describe('ActiveSection', () => {
  let activeSection: ActiveSection;
  let typesSection: HTMLElement;
  let examplesSection: HTMLElement;

  beforeEach(() => {
    vi.stubGlobal('IntersectionObserver', FakeIntersectionObserver);
    activeSection = TestBed.inject(ActiveSection);
    typesSection = document.createElement('section');
    examplesSection = document.createElement('section');
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('starts with no active section', () => {
    expect(activeSection.current()).toBeNull();
  });

  it('marks a section as current when it crosses the reading line', () => {
    activeSection.track(typesSection, 'types');

    FakeIntersectionObserver.latest.emit(typesSection, true);

    expect(activeSection.current()).toBe('types');
  });

  it('follows the reader to the next section', () => {
    activeSection.track(typesSection, 'types');
    activeSection.track(examplesSection, 'examples');
    const observer = FakeIntersectionObserver.latest;

    observer.emit(typesSection, true);
    observer.emit(typesSection, false);
    observer.emit(examplesSection, true);

    expect(activeSection.current()).toBe('examples');
  });

  it('does not clear the current section when a different one leaves', () => {
    activeSection.track(typesSection, 'types');
    activeSection.track(examplesSection, 'examples');
    const observer = FakeIntersectionObserver.latest;

    observer.emit(examplesSection, true);
    observer.emit(typesSection, false);

    expect(activeSection.current()).toBe('examples');
  });

  it('stops observing and resets when tracking ends', () => {
    const stopTracking = activeSection.track(typesSection, 'types');
    const observer = FakeIntersectionObserver.latest;
    observer.emit(typesSection, true);

    stopTracking();

    expect(observer.observed.has(typesSection)).toBe(false);
    expect(activeSection.current()).toBeNull();
  });

  it('degrades to a no-op where IntersectionObserver is unavailable', () => {
    vi.stubGlobal('IntersectionObserver', undefined);
    const fallback = new ActiveSection();

    const stopTracking = fallback.track(typesSection, 'types');

    expect(() => stopTracking()).not.toThrow();
    expect(fallback.current()).toBeNull();
  });
});
