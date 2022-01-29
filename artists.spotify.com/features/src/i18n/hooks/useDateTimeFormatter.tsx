import { useLocale } from './useLocale';

export function useDateTimeFormatter(options: Intl.DateTimeFormatOptions = {}) {
  const locale = useLocale();
  return new Intl.DateTimeFormat(locale, options);
}
