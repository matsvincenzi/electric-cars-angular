import {
  DOCUMENT,
  type EnvironmentProviders,
  effect,
  inject,
  provideAppInitializer,
} from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { I18nStore } from './i18n-store';

export function provideDocumentLocaleSync(): EnvironmentProviders {
  return provideAppInitializer(() => {
    const i18n = inject(I18nStore);
    const document = inject(DOCUMENT);
    const meta = inject(Meta);

    effect(() => {
      const { description, ogLocale } = i18n.messages().meta;
      document.documentElement.lang = i18n.locale();
      meta.updateTag({ name: 'description', content: description });
      meta.updateTag({ property: 'og:description', content: description });
      meta.updateTag({ property: 'og:locale', content: ogLocale });
    });
  });
}
