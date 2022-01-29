import { useLocale } from './useLocale';

export function useNumberFormatter(options: Intl.NumberFormatOptions = {}) {
  const locale = useLocale();
  return new Intl.NumberFormat(locale, options);
}
