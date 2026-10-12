import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TrackSection } from '../../../../core/navigation/track-section';
import { I18nStore } from '../../../../i18n/i18n-store';
import { Icon } from '../../../../shared/icon/icon';
import { SectionHeading } from '../../../../shared/section-heading/section-heading';
import { DRIVETRAIN_PARTS, type DrivetrainPartId } from '../../data/drivetrain';
import { DrivetrainDiagram } from './drivetrain-diagram';

@Component({
  selector: 'app-how-it-works',
  imports: [RouterLink, TrackSection, Icon, SectionHeading, DrivetrainDiagram],
  templateUrl: './how-it-works.html',
  styleUrl: './how-it-works.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HowItWorks {
  protected readonly t = inject(I18nStore).messages;
  protected readonly parts = DRIVETRAIN_PARTS;
  protected readonly selected = signal<DrivetrainPartId>('charge-port');

  protected select(part: DrivetrainPartId): void {
    this.selected.set(part);
  }
}
