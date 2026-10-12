import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EvTypes } from './sections/ev-types/ev-types';
import { Examples } from './sections/examples/examples';
import { Hero } from './sections/hero/hero';
import { HowItWorks } from './sections/how-it-works/how-it-works';
import { ProsCons } from './sections/pros-cons/pros-cons';
import { Sources } from './sections/sources/sources';
import { WhatIs } from './sections/what-is/what-is';

@Component({
  selector: 'app-landing-page',
  imports: [Hero, WhatIs, HowItWorks, EvTypes, Examples, ProsCons, Sources],
  template: `
    <app-hero />
    <app-what-is />
    <app-how-it-works />
    <app-ev-types />
    <app-examples />
    <app-pros-cons />
    <app-sources />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPage {}
