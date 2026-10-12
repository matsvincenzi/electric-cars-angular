import { responsiveImageLoader, srcsetFor } from './responsive-image-loader';

describe('responsiveImageLoader', () => {
  it('maps a requested width to the matching pre-generated variant', () => {
    expect(responsiveImageLoader({ src: 'hero', width: 1280 })).toBe('images/hero-1280w.webp');
  });

  it('resolves nested sources by their top-level group', () => {
    expect(responsiveImageLoader({ src: 'models/nissan-leaf', width: 320 })).toBe(
      'images/models/nissan-leaf-320w.webp',
    );
  });

  it('falls back to the largest variant when no width is requested', () => {
    expect(responsiveImageLoader({ src: 'interior' })).toBe('images/interior-1600w.webp');
  });

  it('fails fast for a width that was never generated', () => {
    expect(() => responsiveImageLoader({ src: 'hero', width: 999 })).toThrow(/no 999w variant/);
  });

  it('fails fast for an unregistered image group', () => {
    expect(() => responsiveImageLoader({ src: 'unknown/photo', width: 320 })).toThrow(
      /No responsive variants/,
    );
  });

  it('does not treat inherited object keys as image groups', () => {
    expect(() => responsiveImageLoader({ src: 'toString' })).toThrow(/No responsive variants/);
  });
});

describe('srcsetFor', () => {
  it('lists every registered width descriptor for a group', () => {
    expect(srcsetFor('models')).toBe('320w, 640w');
  });
});
