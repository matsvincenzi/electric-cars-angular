import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { TitleStrategy, provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { provideI18nTesting } from '../../testing/i18n-testing';
import { I18nStore } from './i18n-store';
import { LocalizedTitleStrategy, pageTitle } from './localized-title-strategy';

@Component({ template: '', changeDetection: ChangeDetectionStrategy.OnPush })
class BlankPage {}

describe('LocalizedTitleStrategy', () => {
  let harness: RouterTestingHarness;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        provideI18nTesting(),
        provideRouter([
          { path: '', component: BlankPage, title: pageTitle('landing') },
          { path: 'untitled', component: BlankPage },
          { path: 'typo', component: BlankPage, title: 'lnading' },
          { path: '**', component: BlankPage, title: pageTitle('notFound') },
        ]),
        { provide: TitleStrategy, useClass: LocalizedTitleStrategy },
      ],
    });
    harness = await RouterTestingHarness.create();
  });

  it('sets the localized title of the current page', async () => {
    await harness.navigateByUrl('/does-not-exist');
    TestBed.tick();

    expect(TestBed.inject(Title).getTitle()).toBe('Page not found — Electric Cars');
  });

  it('re-translates the title of the current page when the language changes', async () => {
    await harness.navigateByUrl('/');
    TestBed.inject(I18nStore).setLocale('pt-BR');
    TestBed.tick();

    expect(TestBed.inject(Title).getTitle()).toBe(
      'Carros Elétricos — Um guia claro sobre mobilidade sustentável',
    );
  });

  it('falls back to the landing title for routes without one', async () => {
    await harness.navigateByUrl('/untitled');
    TestBed.tick();

    expect(TestBed.inject(Title).getTitle()).toBe(
      'Electric Cars — A clear guide to sustainable mobility',
    );
  });

  it('rejects a route title that is not a known key instead of showing it raw', async () => {
    await expect(harness.navigateByUrl('/typo')).rejects.toThrow(/not a known page title key/);
  });
});
