import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { srcsetFor } from '../../../../core/images/responsive-image-loader';
import { SOURCES_SECTION } from '../../../../core/navigation/landing-sections';
import { I18nStore } from '../../../../i18n/i18n-store';
import { Icon } from '../../../../shared/icon/icon';

@Component({
  selector: 'app-hero',
  imports: [NgOptimizedImage, RouterLink, Icon],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hero {
  protected readonly t = inject(I18nStore).messages;
  protected readonly imageSrcset = srcsetFor('hero');
  protected readonly sourcesSection = SOURCES_SECTION;
}
