export const LOCALES = ['en', 'pt-BR'] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (LOCALES as readonly string[]).includes(value);
}

export function resolveInitialLocale(
  storedPreference: string | null,
  browserLanguages: readonly string[],
): Locale {
  if (isLocale(storedPreference)) {
    return storedPreference;
  }
  for (const tag of browserLanguages) {
    const match = LOCALES.find((locale) => primarySubtag(locale) === primarySubtag(tag));
    if (match) {
      return match;
    }
  }
  return DEFAULT_LOCALE;
}

function primarySubtag(languageTag: string): string {
  return languageTag.split('-')[0]?.toLowerCase() ?? '';
}
