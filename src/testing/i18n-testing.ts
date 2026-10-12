import { type Provider } from '@angular/core';
import { PREFERENCE_STORAGE, type PreferenceStorage } from '../app/core/storage/preference-storage';
import { BROWSER_LANGUAGES, LOCALE_STORAGE_KEY } from '../app/i18n/i18n-store';

export interface I18nTestingOptions {
  readonly storedLocale?: string;
  readonly browserLanguages?: readonly string[];
}

export function provideI18nTesting(options: I18nTestingOptions = {}): Provider[] {
  const entries = new Map<string, string>();
  if (options.storedLocale !== undefined) {
    entries.set(LOCALE_STORAGE_KEY, options.storedLocale);
  }
  const storage: PreferenceStorage = {
    read: (key) => entries.get(key) ?? null,
    write: (key, value) => void entries.set(key, value),
  };
  return [
    { provide: PREFERENCE_STORAGE, useValue: storage },
    { provide: BROWSER_LANGUAGES, useValue: options.browserLanguages ?? ['en-US'] },
  ];
}
