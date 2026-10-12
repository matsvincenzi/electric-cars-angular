import { IMAGE_LOADER } from '@angular/common';
import { type Provider } from '@angular/core';
import { type Routes, provideRouter } from '@angular/router';
import { responsiveImageLoader } from '../app/core/images/responsive-image-loader';
import { type I18nTestingOptions, provideI18nTesting } from './i18n-testing';

export interface AppTestingOptions extends I18nTestingOptions {
  readonly routes?: Routes;
}

export function provideAppTesting(options: AppTestingOptions = {}): Provider[] {
  return [
    ...provideI18nTesting(options),
    provideRouter(options.routes ?? []),
    { provide: IMAGE_LOADER, useValue: responsiveImageLoader },
  ] as Provider[];
}
