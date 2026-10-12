import { type ImageLoaderConfig } from '@angular/common';

export const IMAGE_WIDTHS = {
  hero: [768, 1280, 1920],
  interior: [640, 1024, 1600],
  charging: [640, 1024, 1600],
  models: [320, 640],
} as const satisfies Record<string, readonly number[]>;

export type ImageGroup = keyof typeof IMAGE_WIDTHS;

export function responsiveImageLoader({ src, width }: ImageLoaderConfig): string {
  const widths: readonly number[] = IMAGE_WIDTHS[groupOf(src)];
  if (width !== undefined && !widths.includes(width)) {
    throw new Error(`Image "${src}" has no ${width}w variant. Available: ${widths.join(', ')}.`);
  }
  return `images/${src}-${width ?? Math.max(...widths)}w.webp`;
}

export function srcsetFor(group: ImageGroup): string {
  return IMAGE_WIDTHS[group].map((width) => `${width}w`).join(', ');
}

function groupOf(src: string): ImageGroup {
  const group = src.split('/')[0] ?? '';
  if (!isImageGroup(group)) {
    throw new Error(`No responsive variants are registered for image "${src}".`);
  }
  return group;
}

function isImageGroup(value: string): value is ImageGroup {
  return Object.hasOwn(IMAGE_WIDTHS, value);
}
