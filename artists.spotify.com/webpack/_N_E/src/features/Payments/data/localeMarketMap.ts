/*
  We are temporarily providing a locale to market map due to
  checkout-sdk only allowing market to be passed for the `locale` prop.

  When adding a new locale to the list, locate the right market from here:
  https://ghe.spotify.net/lingo/country-attributes/blob/master/src/main/resources/v2/countries.json
*/
export var localeMarketMap = {
  ar: 'ae-ar',
  zh: 'tw',
  cs: 'cz',
  nl: 'be-nl',
  en: 'us',
  fi: 'fi',
  'fr-CA': 'ca-fr',
  fr: 'fr',
  de: 'de',
  el: 'gr',
  he: 'il-he',
  hu: 'hu',
  id: 'id',
  it: 'it',
  ja: 'jp',
  ko: 'kr-ko',
  ms: 'my-ms',
  pl: 'pl',
  pt: 'br',
  ru: 'ru-ru',
  'es-419': 'mx',
  es: 'es',
  sv: 'se',
  th: 'th-th',
  tr: 'tr',
  vi: 'vn-vi'
};