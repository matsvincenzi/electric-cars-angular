import { DOCUMENT } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { Router, TitleStrategy } from '@angular/router';
import { provideAppTesting } from '../testing/app-testing';
import { App } from './app';
import { routes } from './app.routes';
import { provideDocumentLocaleSync } from './i18n/document-locale-sync';
import { LocalizedTitleStrategy } from './i18n/localized-title-strategy';

describe('App', () => {
  let fixture: ComponentFixture<App>;
  let host: HTMLElement;

  async function navigate(url: string): Promise<void> {
    await TestBed.inject(Router).navigateByUrl(url);
    await fixture.whenStable();
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideAppTesting({ routes }),
        provideDocumentLocaleSync(),
        { provide: TitleStrategy, useClass: LocalizedTitleStrategy },
      ],
    });
    fixture = TestBed.createComponent(App);
    host = fixture.nativeElement;
  });

  it('renders the full landing page inside the site chrome', async () => {
    await navigate('/');

    expect(host.querySelector('.skip-link')?.getAttribute('href')).toBe('/#main');
    expect(host.querySelector('app-site-header')).not.toBeNull();
    expect(host.querySelector('app-site-footer')).not.toBeNull();
    expect(
      ['what-is', 'how-it-works', 'types', 'examples', 'pros-cons', 'sources'].every((id) =>
        host.querySelector(`section#${id}`),
      ),
    ).toBe(true);
  });

  it('has exactly one top-level heading on the landing page', async () => {
    await navigate('/');

    const headings = host.querySelectorAll('h1');
    expect(headings).toHaveLength(1);
    expect(headings[0]?.textContent).toContain('Sustainable driving');
  });

  it('switches page content, document language and title from the header toggle', async () => {
    await navigate('/');

    host.querySelector<HTMLButtonElement>('.header button[lang="pt-BR"]')?.click();
    await fixture.whenStable();

    expect(host.querySelector('h1')?.textContent).toContain('Direção sustentável');
    expect(TestBed.inject(DOCUMENT).documentElement.lang).toBe('pt-BR');
    expect(TestBed.inject(Title).getTitle()).toContain('Carros Elétricos');
  });

  it('opens every external link in a new tab without exposing window.opener', async () => {
    await navigate('/');

    const external = Array.from(host.querySelectorAll<HTMLAnchorElement>('a[target="_blank"]'));
    expect(external.length).toBeGreaterThan(0);
    for (const link of external) {
      expect(link.href).toMatch(/^https:\/\//);
      expect(link.rel.split(' ')).toEqual(expect.arrayContaining(['noopener', 'noreferrer']));
      expect(link.querySelector('.visually-hidden')?.textContent).toContain('new tab');
    }
  });

  it('shows the not-found page for an unknown address', async () => {
    await navigate('/this/does/not/exist');

    expect(host.querySelector('app-not-found-page h1')).not.toBeNull();
    expect(TestBed.inject(Title).getTitle()).toBe('Page not found — Electric Cars');
  });
});
