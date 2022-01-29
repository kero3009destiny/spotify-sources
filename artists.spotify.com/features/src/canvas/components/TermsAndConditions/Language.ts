// ignore-string-externalization
export const ALL_LANGUAGES = [
  'us',
  'sa-ar',
  'tw',
  'cz',
  'nl',
  'fi',
  'ca-fr',
  'fr',
  'de',
  'gr',
  'il-he',
  'hu',
  'id',
  'it',
  'jp',
  'kr-ko',
  'my-ms',
  'pl',
  'br',
  'ru-ru',
  'mx',
  'es',
  'se',
  'th-th',
  'tr',
  'vn-vi',
] as const;

export type Language = typeof ALL_LANGUAGES[number];

// maps locales in features/src/i18n/locales/info.json
const LOCALE_TO_LANG: { [key: string]: Language } = {
  ar: 'sa-ar',
  cs: 'cz',
  el: 'gr',
  en: 'us',
  'es-419': 'mx',
  'fr-CA': 'ca-fr',
  he: 'il-he',
  ja: 'jp',
  ko: 'kr-ko',
  ms: 'my-ms',
  pt: 'br',
  ru: 'ru-ru',
  sv: 'se',
  th: 'th-th',
  vi: 'vn-vi',
  zh: 'tw',
};

export const localeToLanguage = (locale: string): Language => {
  if (ALL_LANGUAGES.includes(locale as Language)) {
    return locale as Language;
  }

  if (LOCALE_TO_LANG[locale]) {
    return LOCALE_TO_LANG[locale];
  }

  return 'us';
};
