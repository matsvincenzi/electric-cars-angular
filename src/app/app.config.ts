import { IMAGE_LOADER } from '@angular/common';
import {
  type ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import {
  TitleStrategy,
  provideRouter,
  withInMemoryScrolling,
  withRouterConfig,
} from '@angular/router';
import { routes } from './app.routes';
import { responsiveImageLoader } from './core/images/responsive-image-loader';
import { provideDocumentLocaleSync } from './i18n/document-locale-sync';
import { LocalizedTitleStrategy } from './i18n/localized-title-strategy';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(
      routes,
      withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }),
      withRouterConfig({ onSameUrlNavigation: 'reload' }),
    ),
    { provide: TitleStrategy, useClass: LocalizedTitleStrategy },
    { provide: IMAGE_LOADER, useValue: responsiveImageLoader },
    provideDocumentLocaleSync(),
  ],
};
