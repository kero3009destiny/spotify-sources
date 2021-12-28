const getConfig = require('next/config').default;
const LOCALE_COUNTRIES = require('../constants/localeCountries');

const { publicRuntimeConfig } = getConfig() || {
  publicRuntimeConfig: { CONTENTFUL_PREVIEW: false }, // Only provide default for CONTENTFUL_PREVIEW, if undefined
};
// Allow ALL locales to display on environments with preview flag (development-dot, preview-dot)
const { CONTENTFUL_PREVIEW } = publicRuntimeConfig;
const allowAllLocales = CONTENTFUL_PREVIEW === 'true';

const defaultLocale = {
  id: 'en-US',
  name: 'English US',
  localeName: 'English (United States)',
  country: LOCALE_COUNTRIES.UNITED_STATES,
  altMapping: [],
  enabled: true,
};

/**
 * Default and inclusive list of locales.
 * NOTE: Ensure `defaultLocale` is the initial locale.
 * NOTE: Ensure newly added locales are also enabled in Contentful.
 */
const locales = [
  defaultLocale,
  {
    id: 'en-GB',
    name: 'English GB',
    localeName: 'English (United Kingdom)',
    country: LOCALE_COUNTRIES.UNITED_KINGDOM,
    altMapping: [],
    enabled: true,
  },
  {
    id: 'en-AU',
    name: 'English AU',
    localeName: 'English (Australia)',
    country: LOCALE_COUNTRIES.AUSTRALIA,
    altMapping: [],
    enabled: true,
  },
  {
    id: 'en-CA',
    name: 'English CA',
    localeName: 'English (Canada)',
    country: LOCALE_COUNTRIES.CANADA,
    altMapping: [],
    enabled: true,
  },
  {
    id: 'en-NL',
    name: 'English NL',
    localeName: 'English (Netherlands)',
    country: LOCALE_COUNTRIES.NETHERLANDS,
    altMapping: ['nl-NL'],
    enabled: true,
  },
  {
    id: 'en-SE',
    name: 'English SE',
    localeName: 'English (Sweden)',
    country: LOCALE_COUNTRIES.SWEDEN,
    altMapping: ['sv-SE', 'da-DK', 'fi', 'nn-NO'],
    enabled: true,
    disableAutoCountrySelection: true,
  },
  {
    id: 'de-DE',
    name: 'German',
    localeName: 'German',
    country: LOCALE_COUNTRIES.GERMANY,
    altMapping: [],
    enabled: true,
  },
  {
    id: 'es-ES',
    name: 'Spanish',
    localeName: 'Spanish',
    country: LOCALE_COUNTRIES.SPAIN,
    altMapping: ['es'],
    enabled: true,
  },
  {
    id: 'es-MX',
    name: 'Spanish MX',
    localeName: 'Spanish (Mexico)',
    country: LOCALE_COUNTRIES.MEXICO,
    altMapping: [],
    enabled: true,
  },
  {
    id: 'it-IT',
    name: 'Italian',
    localeName: 'Italian',
    country: LOCALE_COUNTRIES.ITALY,
    altMapping: ['it'],
    enabled: true,
  },
  {
    id: 'fr-FR',
    name: 'French',
    localeName: 'French',
    country: LOCALE_COUNTRIES.FRANCE,
    altMapping: ['fr'],
    enabled: true,
  },
  {
    id: 'pt-BR',
    name: 'Portuguese BR',
    localeName: 'Portuguese (Brazil)',
    country: LOCALE_COUNTRIES.BRAZIL,
    altMapping: [],
    enabled: true,
  },
  {
    id: 'ja-JP',
    name: 'Japanese',
    localeName: 'Japanese',
    country: LOCALE_COUNTRIES.JAPAN,
    altMapping: ['ja'],
    enabled: true,
    flipNameOrder: true,
  },
  {
    id: 'ru-RU',
    name: 'Russian',
    localeName: 'Russian (Russia)',
    country: LOCALE_COUNTRIES.RUSSIA,
    altMapping: [],
    enabled: true,
  },
  {
    id: 'en-SG',
    name: 'Singapore',
    localeName: 'Singapore',
    country: LOCALE_COUNTRIES.SINGAPORE,
    altMapping: [
      'en-SG',
      'zh-Hant-TW',
      'vi',
      'ms-MY',
      'id-ID',
      'th-TH',
      'zh-Hant-HK',
      'fil-PH',
    ],
    formEndPointOverride:
      'https://asia.spotifyforbrands.com/l/860593/2020-12-18/bb95l',
    enabled: true,
    disableAutoCountrySelection: true,
  },
];
const enabledLocales = locales.filter(locale => locale.enabled);

module.exports.defaultLocale = defaultLocale;
module.exports.allLocales = locales; // ALL locales, regardless of 'enabled' flag
module.exports.locales = allowAllLocales ? locales : enabledLocales; // Only enabled (live) locales
module.exports.supportedLocaleCodes = allowAllLocales // Only enabled (live) locale codes
  ? locales.map(locale => locale.id)
  : enabledLocales.map(locale => locale.id);

/**
 * List of content types to be localized.
 */
module.exports.localizedContentTypes = [
  {
    id: 'navigation',
    name: 'Navigation',
  },
  {
    id: 'footer',
    name: 'Footer',
  },
  {
    id: 'pageHome',
    name: 'Page: Home',
  },
  {
    id: 'pageLanding',
    name: 'Page: Landing',
  },
  {
    id: 'pageDetail',
    name: 'Page: Detail',
  },
  {
    id: 'pageDynamicLanding',
    name: 'Page: Dynamic Landing',
  },
];
