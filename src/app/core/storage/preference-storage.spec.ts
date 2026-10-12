import { createPreferenceStorage } from './preference-storage';

function createFakeStorage(): Storage {
  const entries = new Map<string, string>();
  return {
    get length() {
      return entries.size;
    },
    clear: () => entries.clear(),
    getItem: (key) => entries.get(key) ?? null,
    key: (index) => [...entries.keys()][index] ?? null,
    removeItem: (key) => entries.delete(key),
    setItem: (key, value) => entries.set(key, value),
  };
}

describe('createPreferenceStorage', () => {
  it('writes and reads back a value', () => {
    const backingStorage = createFakeStorage();
    const storage = createPreferenceStorage(() => backingStorage);

    storage.write('locale', 'pt-BR');

    expect(storage.read('locale')).toBe('pt-BR');
  });

  it('returns null for a key that was never written', () => {
    const storage = createPreferenceStorage(() => createFakeStorage());

    expect(storage.read('missing')).toBeNull();
  });

  it('returns null instead of throwing when the browser denies storage access', () => {
    const storage = createPreferenceStorage(() => {
      throw new DOMException('Access denied', 'SecurityError');
    });

    expect(storage.read('locale')).toBeNull();
  });

  it('swallows write failures such as an exceeded quota', () => {
    const quotaExceeded = createFakeStorage();
    quotaExceeded.setItem = () => {
      throw new DOMException('Quota exceeded', 'QuotaExceededError');
    };
    const storage = createPreferenceStorage(() => quotaExceeded);

    expect(() => storage.write('locale', 'en')).not.toThrow();
  });

  it('is a harmless no-op when no storage exists', () => {
    const storage = createPreferenceStorage(() => undefined);

    storage.write('locale', 'en');

    expect(storage.read('locale')).toBeNull();
  });
});
