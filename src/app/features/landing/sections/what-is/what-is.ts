import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TrackSection } from '../../../../core/navigation/track-section';
import { I18nStore } from '../../../../i18n/i18n-store';
import { Icon } from '../../../../shared/icon/icon';
import { SectionHeading } from '../../../../shared/section-heading/section-heading';
import { PILLARS } from '../../data/sustainability';

@Component({
  selector: 'app-what-is',
  imports: [TrackSection, Icon, SectionHeading],
  templateUrl: './what-is.html',
  styleUrl: './what-is.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WhatIs {
  protected readonly t = inject(I18nStore).messages;
  protected readonly pillars = PILLARS;
}
