import { useLocale } from './useLocale';

export function useCollator(options: Intl.CollatorOptions = {}) {
  const locale = useLocale();
  return new Intl.Collator(locale, options);
}
