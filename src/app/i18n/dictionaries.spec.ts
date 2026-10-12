import { DICTIONARIES } from './dictionaries';
import { LOCALES } from './locale';

type Leaf = readonly [path: string, value: unknown];

function collectLeaves(node: unknown, path = ''): Leaf[] {
  if (node !== null && typeof node === 'object') {
    return Object.entries(node).flatMap(([key, value]) =>
      collectLeaves(value, path ? `${path}.${key}` : key),
    );
  }
  return [[path, node]];
}

describe('DICTIONARIES', () => {
  const english = collectLeaves(DICTIONARIES.en);

  it.each(LOCALES)('has no empty strings in %s', (locale) => {
    const empty = collectLeaves(DICTIONARIES[locale]).filter(
      ([, value]) => typeof value === 'string' && value.trim() === '',
    );

    expect(empty).toEqual([]);
  });

  it.each(LOCALES)('exposes exactly the same message paths in %s as in English', (locale) => {
    const paths = collectLeaves(DICTIONARIES[locale]).map(([path]) => path);

    expect(paths).toEqual(english.map(([path]) => path));
  });

  it.each(LOCALES)('interpolates the copyright year in %s', (locale) => {
    expect(DICTIONARIES[locale].footer.rights(2026)).toContain('2026');
  });

  it('actually translates Brazilian Portuguese instead of repeating English', () => {
    const portuguese = new Map(collectLeaves(DICTIONARIES['pt-BR']));
    const untranslated = english.filter(
      ([path, value]) =>
        typeof value === 'string' && value.length > 24 && portuguese.get(path) === value,
    );

    expect(untranslated).toEqual([]);
  });
});
