import { DOCUMENT } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAppTesting } from '../../../../../testing/app-testing';
import { type ScrollMetrics } from './scroll-state';
import { Examples } from './examples';

describe('Examples', () => {
  let fixture: ComponentFixture<Examples>;
  let host: HTMLElement;
  let track: HTMLUListElement;

  const controls = () => host.querySelectorAll<HTMLButtonElement>('.controls button');
  const previousButton = () => controls()[0];
  const nextButton = () => controls()[1];

  async function scrollTrackTo(metrics: ScrollMetrics): Promise<void> {
    for (const [property, value] of Object.entries(metrics)) {
      Object.defineProperty(track, property, { configurable: true, value });
    }
    track.dispatchEvent(new Event('scroll'));
    await new Promise((resolve) => requestAnimationFrame(resolve));
    await fixture.whenStable();
  }

  beforeEach(async () => {
    TestBed.configureTestingModule({ providers: provideAppTesting() });
    fixture = TestBed.createComponent(Examples);
    host = fixture.nativeElement;
    await fixture.whenStable();
    track = host.querySelector<HTMLUListElement>('#models-track') as HTMLUListElement;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('shows every model with its body style and a description', () => {
    const cards = Array.from(host.querySelectorAll('.model'));

    expect(cards).toHaveLength(7);
    expect(cards[0]?.querySelector('.model__name')?.textContent).toBe('BYD Dolphin');
    expect(cards[0]?.querySelector('.tag')?.textContent?.trim()).toBe('Hatchback');
    expect(cards.every((card) => card.querySelector('.model__text')?.textContent?.trim())).toBe(
      true,
    );
  });

  it('keeps the track reachable by keyboard and labelled for assistive tech', () => {
    expect(track.tabIndex).toBe(0);
    expect(track.getAttribute('aria-label')).toBe('Electric car models');
    expect(previousButton()?.getAttribute('aria-controls')).toBe('models-track');
    expect(nextButton()?.getAttribute('aria-controls')).toBe('models-track');
  });

  it('only offers "next" while there are still cards to the right', async () => {
    await scrollTrackTo({ scrollLeft: 0, scrollWidth: 2400, clientWidth: 800 });

    expect(previousButton()?.disabled).toBe(true);
    expect(nextButton()?.disabled).toBe(false);
  });

  it('only offers "previous" once the end of the track is reached', async () => {
    await scrollTrackTo({ scrollLeft: 1600, scrollWidth: 2400, clientWidth: 800 });

    expect(previousButton()?.disabled).toBe(false);
    expect(nextButton()?.disabled).toBe(true);
  });

  it('advances by exactly one card plus the gap between cards', async () => {
    await scrollTrackTo({ scrollLeft: 0, scrollWidth: 2400, clientWidth: 800 });
    vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(352);
    const view = TestBed.inject(DOCUMENT).defaultView as Window;
    vi.spyOn(view, 'getComputedStyle').mockReturnValue({
      columnGap: '24px',
    } as CSSStyleDeclaration);
    const scrollBy = vi.fn();
    track.scrollBy = scrollBy;

    nextButton()?.click();

    expect(scrollBy).toHaveBeenCalledWith({ left: 376 });
  });
});
