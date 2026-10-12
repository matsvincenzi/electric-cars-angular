import { isLocale, resolveInitialLocale } from './locale';

describe('isLocale', () => {
  it('accepts every supported locale', () => {
    expect(isLocale('en')).toBe(true);
    expect(isLocale('pt-BR')).toBe(true);
  });

  it('rejects unsupported, differently cased or non-string values', () => {
    expect(isLocale('pt-br')).toBe(false);
    expect(isLocale('es')).toBe(false);
    expect(isLocale('')).toBe(false);
    expect(isLocale(null)).toBe(false);
    expect(isLocale(42)).toBe(false);
  });
});

describe('resolveInitialLocale', () => {
  it('prefers a valid stored preference over the browser languages', () => {
    expect(resolveInitialLocale('pt-BR', ['en-US'])).toBe('pt-BR');
  });

  it('ignores a tampered stored value and falls back to the browser languages', () => {
    expect(resolveInitialLocale('<script>', ['pt-BR'])).toBe('pt-BR');
  });

  it('matches by primary language so regional variants resolve to the supported locale', () => {
    expect(resolveInitialLocale(null, ['pt-PT'])).toBe('pt-BR');
    expect(resolveInitialLocale(null, ['en-GB'])).toBe('en');
  });

  it('honours the order of the browser preferences', () => {
    expect(resolveInitialLocale(null, ['fr-FR', 'pt', 'en'])).toBe('pt-BR');
  });

  it('defaults to English when nothing matches', () => {
    expect(resolveInitialLocale(null, [])).toBe('en');
    expect(resolveInitialLocale(null, ['de-DE', 'ja'])).toBe('en');
  });
});
