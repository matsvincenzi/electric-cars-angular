import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nStore } from '../../i18n/i18n-store';
import { Icon } from '../../shared/icon/icon';

@Component({
  selector: 'app-not-found-page',
  imports: [RouterLink, Icon],
  templateUrl: './not-found-page.html',
  styleUrl: './not-found-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundPage {
  protected readonly t = inject(I18nStore).messages;
}
