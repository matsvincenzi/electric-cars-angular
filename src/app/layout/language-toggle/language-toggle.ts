import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { I18nStore } from '../../i18n/i18n-store';
import { type Locale } from '../../i18n/locale';
import { Flag, type FlagCode } from '../../shared/flag/flag';

interface LanguageOption {
  readonly locale: Locale;
  readonly flag: FlagCode;
  readonly code: string;
  readonly endonym: string;
}

const LANGUAGE_OPTIONS: readonly LanguageOption[] = [
  { locale: 'en', flag: 'us', code: 'EN', endonym: 'English' },
  { locale: 'pt-BR', flag: 'br', code: 'PT', endonym: 'Português (Brasil)' },
];

@Component({
  selector: 'app-language-toggle',
  imports: [Flag],
  templateUrl: './language-toggle.html',
  styleUrl: './language-toggle.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageToggle {
  private readonly i18n = inject(I18nStore);

  protected readonly options = LANGUAGE_OPTIONS;
  protected readonly locale = this.i18n.locale;
  protected readonly label = computed(() => this.i18n.messages().language.label);

  protected select(locale: Locale): void {
    this.i18n.setLocale(locale);
  }
}
