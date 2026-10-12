import { EN } from './dictionaries/en';
import { PT_BR } from './dictionaries/pt-br';
import { type Locale } from './locale';
import { type Messages } from './messages';

export const DICTIONARIES: Readonly<Record<Locale, Messages>> = {
  en: EN,
  'pt-BR': PT_BR,
};
