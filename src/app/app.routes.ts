import { type Routes } from '@angular/router';
import { pageTitle } from './i18n/localized-title-strategy';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    title: pageTitle('landing'),
    loadComponent: () => import('./features/landing/landing-page').then((m) => m.LandingPage),
  },
  {
    path: '**',
    title: pageTitle('notFound'),
    loadComponent: () => import('./features/not-found/not-found-page').then((m) => m.NotFoundPage),
  },
];
