import { DOCUMENT } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideI18nTesting } from '../../testing/i18n-testing';
import { provideDocumentLocaleSync } from './document-locale-sync';
import { I18nStore } from './i18n-store';

function metaContent(selector: string): string | null {
  return TestBed.inject(DOCUMENT).head.querySelector(selector)?.getAttribute('content') ?? null;
}

describe('provideDocumentLocaleSync', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideI18nTesting(), provideDocumentLocaleSync()],
    });
    TestBed.inject(I18nStore);
    TestBed.tick();
  });

  it('applies the initial locale to the document', () => {
    expect(TestBed.inject(DOCUMENT).documentElement.lang).toBe('en');
    expect(metaContent('meta[name="description"]')).toContain('bilingual guide');
    expect(metaContent('meta[property="og:locale"]')).toBe('en_US');
  });

  it('keeps lang and metadata in sync when the visitor switches language', () => {
    TestBed.inject(I18nStore).setLocale('pt-BR');
    TestBed.tick();

    expect(TestBed.inject(DOCUMENT).documentElement.lang).toBe('pt-BR');
    expect(metaContent('meta[name="description"]')).toContain('guia claro e bilíngue');
    expect(metaContent('meta[property="og:description"]')).toContain('guia claro e bilíngue');
    expect(metaContent('meta[property="og:locale"]')).toBe('pt_BR');
  });
});
