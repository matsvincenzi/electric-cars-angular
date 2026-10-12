import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { srcsetFor } from '../../../../core/images/responsive-image-loader';
import { TrackSection } from '../../../../core/navigation/track-section';
import { I18nStore } from '../../../../i18n/i18n-store';
import { Icon } from '../../../../shared/icon/icon';
import { SectionHeading } from '../../../../shared/section-heading/section-heading';
import { ADVANTAGES, CHALLENGES } from '../../data/trade-offs';

@Component({
  selector: 'app-pros-cons',
  imports: [NgOptimizedImage, TrackSection, Icon, SectionHeading],
  templateUrl: './pros-cons.html',
  styleUrl: './pros-cons.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProsCons {
  protected readonly t = inject(I18nStore).messages;
  protected readonly advantages = ADVANTAGES;
  protected readonly challenges = CHALLENGES;
  protected readonly interiorSrcset = srcsetFor('interior');
  protected readonly chargingSrcset = srcsetFor('charging');
}
