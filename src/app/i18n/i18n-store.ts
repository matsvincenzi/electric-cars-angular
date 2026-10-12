import { DOCUMENT, Injectable, InjectionToken, computed, inject, signal } from '@angular/core';
import { PREFERENCE_STORAGE } from '../core/storage/preference-storage';
import { DICTIONARIES } from './dictionaries';
import { type Locale, resolveInitialLocale } from './locale';

export const LOCALE_STORAGE_KEY = 'electric-cars.locale';

export const BROWSER_LANGUAGES = new InjectionToken<readonly string[]>('BROWSER_LANGUAGES', {
  providedIn: 'root',
  factory: () => inject(DOCUMENT).defaultView?.navigator.languages ?? [],
});

@Injectable({ providedIn: 'root' })
export class I18nStore {
  private readonly storage = inject(PREFERENCE_STORAGE);
  private readonly activeLocale = signal<Locale>(
    resolveInitialLocale(this.storage.read(LOCALE_STORAGE_KEY), inject(BROWSER_LANGUAGES)),
  );

  readonly locale = this.activeLocale.asReadonly();
  readonly messages = computed(() => DICTIONARIES[this.activeLocale()]);

  setLocale(locale: Locale): void {
    this.activeLocale.set(locale);
    this.storage.write(LOCALE_STORAGE_KEY, locale);
  }
}
