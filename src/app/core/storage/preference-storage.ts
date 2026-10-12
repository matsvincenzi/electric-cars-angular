import { DOCUMENT, InjectionToken, inject } from '@angular/core';

export interface PreferenceStorage {
  read(key: string): string | null;
  write(key: string, value: string): void;
}

export const PREFERENCE_STORAGE = new InjectionToken<PreferenceStorage>('PREFERENCE_STORAGE', {
  providedIn: 'root',
  factory: () => {
    const view = inject(DOCUMENT).defaultView;
    return createPreferenceStorage(() => view?.localStorage);
  },
});

export function createPreferenceStorage(
  resolveStorage: () => Storage | null | undefined,
): PreferenceStorage {
  return {
    read(key) {
      try {
        return resolveStorage()?.getItem(key) ?? null;
      } catch {
        return null;
      }
    },
    write(key, value) {
      try {
        resolveStorage()?.setItem(key, value);
      } catch {
        // Blocked or full storage (private mode, strict cookie settings) must never break the UI.
      }
    },
  };
}
