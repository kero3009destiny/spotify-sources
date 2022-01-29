import { useLocale } from '..';
import { info } from '../locales/info';

export function mapAcceptLanguage(locale: string) {
  return info[locale]?.acceptLanguage ?? locale;
}

export function useAcceptLanguage() {
  const locale = useLocale();
  return mapAcceptLanguage(locale);
}
