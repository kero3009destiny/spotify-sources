import { useLocale } from './useLocale';
import '@formatjs/intl-relativetimeformat/polyfill';
import '@formatjs/intl-locale/polyfill';
import '@formatjs/intl-relativetimeformat/locale-data/ar';
import '@formatjs/intl-relativetimeformat/locale-data/zh';
import '@formatjs/intl-relativetimeformat/locale-data/cs';
import '@formatjs/intl-relativetimeformat/locale-data/nl';
import '@formatjs/intl-relativetimeformat/locale-data/en';
import '@formatjs/intl-relativetimeformat/locale-data/fi';
import '@formatjs/intl-relativetimeformat/locale-data/fr-CA';
import '@formatjs/intl-relativetimeformat/locale-data/fr';
import '@formatjs/intl-relativetimeformat/locale-data/de';
import '@formatjs/intl-relativetimeformat/locale-data/el';
import '@formatjs/intl-relativetimeformat/locale-data/he';
import '@formatjs/intl-relativetimeformat/locale-data/hu';
import '@formatjs/intl-relativetimeformat/locale-data/id';
import '@formatjs/intl-relativetimeformat/locale-data/it';
import '@formatjs/intl-relativetimeformat/locale-data/ja';
import '@formatjs/intl-relativetimeformat/locale-data/ko';
import '@formatjs/intl-relativetimeformat/locale-data/ms';
import '@formatjs/intl-relativetimeformat/locale-data/pl';
import '@formatjs/intl-relativetimeformat/locale-data/pt';
import '@formatjs/intl-relativetimeformat/locale-data/ru';
import '@formatjs/intl-relativetimeformat/locale-data/es-419';
import '@formatjs/intl-relativetimeformat/locale-data/es';
import '@formatjs/intl-relativetimeformat/locale-data/sv';
import '@formatjs/intl-relativetimeformat/locale-data/th';
import '@formatjs/intl-relativetimeformat/locale-data/tr';
import '@formatjs/intl-relativetimeformat/locale-data/vi';

export function useRelativeTimeFormatter(
  options: Intl.RelativeTimeFormatOptions = {},
) {
  const locale = useLocale();
  return new Intl.RelativeTimeFormat(locale, options);
}
