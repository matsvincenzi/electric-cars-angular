import { TestBed } from '@angular/core/testing';
import { type I18nTestingOptions, provideI18nTesting } from '../../testing/i18n-testing';
import { PREFERENCE_STORAGE } from '../core/storage/preference-storage';
import { I18nStore, LOCALE_STORAGE_KEY } from './i18n-store';

function createStore(options: I18nTestingOptions = {}): I18nStore {
  TestBed.configureTestingModule({ providers: provideI18nTesting(options) });
  return TestBed.inject(I18nStore);
}

describe('I18nStore', () => {
  it('starts in the stored locale when the visitor chose one before', () => {
    const store = createStore({ storedLocale: 'pt-BR', browserLanguages: ['en-US'] });

    expect(store.locale()).toBe('pt-BR');
    expect(store.messages().brand).toBe('Carros Elétricos');
  });

  it('starts in the browser language for a first-time visitor', () => {
    const store = createStore({ browserLanguages: ['pt-BR', 'en'] });

    expect(store.locale()).toBe('pt-BR');
  });

  it('falls back to English when the stored value is not a supported locale', () => {
    const store = createStore({ storedLocale: 'xx', browserLanguages: ['de-DE'] });

    expect(store.locale()).toBe('en');
    expect(store.messages().brand).toBe('Electric Cars');
  });

  it('switches every message when the locale changes', () => {
    const store = createStore();

    store.setLocale('pt-BR');

    expect(store.locale()).toBe('pt-BR');
    expect(store.messages().hero.primaryCta).toBe('Começar a explorar');
  });

  it('remembers the chosen locale for the next visit', () => {
    const store = createStore();

    store.setLocale('pt-BR');

    expect(TestBed.inject(PREFERENCE_STORAGE).read(LOCALE_STORAGE_KEY)).toBe('pt-BR');
  });
});
