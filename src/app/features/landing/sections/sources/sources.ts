import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SOURCES_SECTION } from '../../../../core/navigation/landing-sections';
import { I18nStore } from '../../../../i18n/i18n-store';
import { Icon } from '../../../../shared/icon/icon';
import { SectionHeading } from '../../../../shared/section-heading/section-heading';
import { SOURCES } from '../../data/sources';

@Component({
  selector: 'app-sources',
  imports: [Icon, SectionHeading],
  templateUrl: './sources.html',
  styleUrl: './sources.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sources {
  protected readonly t = inject(I18nStore).messages;
  protected readonly sources = SOURCES;
  protected readonly sectionId = SOURCES_SECTION;
}
