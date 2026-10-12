import { TestBed } from '@angular/core/testing';
import { provideAppTesting } from '../../../testing/app-testing';
import { NotFoundPage } from './not-found-page';

describe('NotFoundPage', () => {
  it('explains the problem and offers a way back to the guide', async () => {
    TestBed.configureTestingModule({ providers: provideAppTesting() });
    const fixture = TestBed.createComponent(NotFoundPage);
    await fixture.whenStable();
    const host: HTMLElement = fixture.nativeElement;

    expect(host.querySelector('h1')?.textContent).toContain('doesn’t go anywhere');
    const backLink = host.querySelector<HTMLAnchorElement>('a.button');
    expect(backLink?.getAttribute('href')).toBe('/');
    expect(backLink?.textContent?.trim()).toBe('Back to the guide');
  });
});
