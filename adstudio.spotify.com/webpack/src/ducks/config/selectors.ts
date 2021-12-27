import formatNumber from 'format-number';
import i18n from 'i18next';
import { get, isEmpty } from 'lodash';

import { MarketType } from '@spotify-internal/adstudio-config/proto/config_pb';

import { getSelectedLang } from 'ducks/i18n/selectors';

import { transformCountryCurrencyToFormatNumberOptions } from 'utils/currencyHelpers';
import { mergeObjects } from 'utils/dataHelpers';
import { mapI18N } from '../../utils/i18nHelpers';

import { TARGETING_MIN_AGE } from 'config';
import {
  DEFAULT_COUNTRY,
  DEFAULT_CURRENCY,
  DEFAULT_DATE_FORMAT,
  DEFAULT_LANGUAGE,
  DEFAULT_REGION,
  DEFAULT_TIME_FORMAT,
  emptyConfigEntry,
  SUBDIVISION_CATEGORIES,
} from 'config/config';

import {
  ConfigCategories,
  ConfigEntry,
  ConfigState,
  CountryEntry,
  CountryKey,
  CurrencyEntry,
  LanguageEntry,
  RegionEntry,
  Rules,
  TargetingRestrictions,
} from './types';

/**
 * Normalizes an array of config entries to a config state
 * @param {ConfigState|ConfigEntry[]} state The collection that may need to be normalized
 * @returns {ConfigState} Normalized state
 */
const normalizeState = (state: ConfigState | ConfigEntry[]) =>
  Array.isArray(state) ? { config: state } : state;

/**
 * Generic reducer for combining config entries with the same ID into a single, merged
 * ConfigEntry, together with their ancestors. By default, if there is any property clash, then
 * the newest object wins, unless the previous object had a higher priority property in which
 * case it wins.
 * @param {ConfigState|ConfigEntry[]} state State for any parent lookups
 * @param {ConfigEntry[]} entries Config entries to be reduced.
 * @returns {ConfigEntry} Reduced single config entry.
 */
const reduceEntries = (
  state: ConfigState | ConfigEntry[],
  entries: ConfigEntry[] = [],
) =>
  entries.reduce((acc: ConfigEntry, curr: ConfigEntry) => {
    let parent = curr.parent;
    // Default parent for a language is the default language (English)
    if (!parent && curr.category === ConfigCategories.LANGUAGE) {
      parent = DEFAULT_LANGUAGE;
    }
    const mergedCurr: ConfigEntry =
      parent && parent !== curr.id
        ? // eslint-disable-next-line @typescript-eslint/no-use-before-define
          <ConfigEntry>mergeObjects(curr, getById(state, parent))
        : curr;
    return <ConfigEntry>(
      ((mergedCurr.priority || 0) < (acc.priority || 0)
        ? mergeObjects(mergedCurr, acc)
        : mergeObjects(acc, mergedCurr))
    );
  }, emptyConfigEntry);

// General selectors
export const getAll = (
  state: ConfigState | ConfigEntry[] = {},
): ConfigEntry[] => normalizeState(state).config || [emptyConfigEntry];
export const getByProperty = (
  state: ConfigState | ConfigEntry[],
  property: keyof ConfigEntry | string,
  value: any,
): ConfigEntry[] =>
  getAll(state).filter(
    (entry: ConfigEntry) => get(entry, property, false) === value,
  );
export const reduceByProperty = (
  state: ConfigState | ConfigEntry[],
  property: keyof ConfigEntry,
  value: any,
): ConfigEntry => {
  const reducedEntry = reduceEntries(
    state,
    getAll(state).filter((entry: ConfigEntry) => entry[property] === value),
  );
  delete reducedEntry.priority; // Purely for reducing and not for public consumption.
  // If country, ensure a default language is set
  return reducedEntry.category === ConfigCategories.COUNTRY
    ? { defaultLanguage: DEFAULT_LANGUAGE, ...reducedEntry }
    : reducedEntry;
};
export const getById = (
  state: ConfigState | ConfigEntry[],
  id: string,
): ConfigEntry => reduceByProperty(state, 'id', id);
export const getByCategory = (
  state: ConfigState | ConfigEntry[],
  category: string,
): ConfigEntry[] => getByProperty(state, 'category', category);
export const getIds = (state: ConfigState | ConfigEntry[]): string[] =>
  // @ts-ignore
  getAll(state)
    .map(entry => entry.id)
    .sort();

// Language selectors
export const getLanguages = (
  state: ConfigState | ConfigEntry[],
): ConfigEntry[] => getByCategory(state, ConfigCategories.LANGUAGE);
export const getLanguageIds = (state: ConfigState | ConfigEntry[]): string[] =>
  // @ts-ignore
  getLanguages(state)
    .map(entry => entry.id)
    .sort();

// Currency selectors
export const getCurrencies = (
  state: ConfigState | ConfigEntry[],
): ConfigEntry[] => getByCategory(state, ConfigCategories.CURRENCY);
export const getCurrencyIds = (state: ConfigState | ConfigEntry[]): string[] =>
  // @ts-ignore
  getCurrencies(state)
    .map(entry => entry.id)
    .sort();
export const getCurrencyObj = (
  state: ConfigState | ConfigEntry[],
  currencyCode: string,
) => {
  const currency = getById(state, currencyCode);
  if (currency && currency.id) {
    return { useCodeAsSymbol: false, ...currency };
  }
  return { useCodeAsSymbol: true };
};
export const getCurrencyFormatter = (
  state: ConfigState | ConfigEntry[],
  currencyCode: string,
) => {
  const currencyObj = getCurrencyObj(state, currencyCode);
  return (number: number, overrides?: object) =>
    formatNumber(
      // @ts-ignore
      transformCountryCurrencyToFormatNumberOptions({
        ...currencyObj,
        ...overrides,
      }),
    )(number);
};

// Country selectors
export const getCountries = (
  state: ConfigState | ConfigEntry[],
): CountryEntry[] =>
  getByCategory(state, ConfigCategories.COUNTRY) as CountryEntry[];
export const getCountryIds = (state: ConfigState | ConfigEntry[]): string[] =>
  // @ts-ignore
  getCountries(state)
    .map(entry => entry.id)
    .sort();
export const getCountryRestrictions = (
  state: ConfigState | CountryEntry[],
): Record<CountryKey, TargetingRestrictions> =>
  getCountries(state)
    .filter(
      (entry: CountryEntry) =>
        entry.targetingRestrictions && !isEmpty(entry.targetingRestrictions),
    )
    .reduce(
      (acc: Record<CountryKey, TargetingRestrictions>, entry: CountryEntry) => {
        acc[entry.id as CountryKey] = entry.targetingRestrictions!;
        return acc;
      },
      {} as Record<CountryKey, TargetingRestrictions>,
    );
export const hasCountryRestrictions = (
  state: ConfigState | ConfigEntry[],
  id: string,
) =>
  // @ts-ignore
  Object.keys(getCountryRestrictions(state)).includes(id);
export const getByBooleanRule = (
  state: ConfigState | CountryEntry[],
  rule: keyof Rules,
): ConfigEntry[] =>
  getCountries(state).filter(
    entry => (entry.rules && entry.rules[rule]) || false,
  );
export const getExtendedCountry = (
  state: ConfigState | ConfigEntry[],
  id: string,
): CountryEntry => {
  let country: CountryEntry = getById(state, id) as CountryEntry;
  if (!country || country.category !== ConfigCategories.COUNTRY) {
    // if not a country, return the default language instead
    return getById(state, DEFAULT_LANGUAGE) as CountryEntry;
  }

  // get the language
  const language: LanguageEntry = getById(
    state,
    country.defaultLanguage || DEFAULT_LANGUAGE,
  );
  const strings = language!.strings;

  // get the language
  const currency: CurrencyEntry = getById(
    state,
    country.currencyCode || DEFAULT_CURRENCY,
  );

  // get the region
  const region: RegionEntry = getById(state, country.region || DEFAULT_REGION);
  country = mergeObjects(country, region) as CountryEntry;
  if (strings && country.strings) {
    country.strings = mergeObjects(country.strings, strings);
  }

  // set default formats
  country.dateFormat = country.dateFormat || DEFAULT_DATE_FORMAT;
  country.timeFormat = country.timeFormat || DEFAULT_TIME_FORMAT;

  return {
    language,
    currency,
    ...country,
  };
};
export const getMarket = (state: ConfigState | ConfigEntry[], id: string) => {
  const country = getById(state, id);
  const lang = getSelectedLang(state).toLowerCase();
  const markets = get(country, 'marketCodes', []);
  switch (markets.length) {
    case 0:
      // No market, then return the ID
      return get(country, 'id', DEFAULT_COUNTRY).toLowerCase();
    case 1:
      // If the country only has one market, then return it.
      return markets[0];
    default:
      // Here's where it gets trickier...  If the country has more than one market, which are
      // differentiated by language, prefer the lang that matches the user's selected lang,
      // otherwise return the first.
      return markets.reduce(
        (acc: string, market: string) =>
          get(market.split('-'), '[1]', '').toLowerCase() === lang
            ? market
            : acc,
        markets[0],
      );
  }
};
export const getGAMarkets = (state: ConfigState | ConfigEntry[]) =>
  getByProperty(state, 'marketType', MarketType.GA);
export const getBetaMarkets = (state: ConfigState | ConfigEntry[]) =>
  getByProperty(state, 'marketType', MarketType.BETA);
export const getAllMarkets = (state: ConfigState | ConfigEntry[]) =>
  getGAMarkets(state).concat(getBetaMarkets(state));
export const getCountriesByCountryCode = (
  state: ConfigState | ConfigEntry[],
) => {
  return getAllMarkets(state).reduce((acc: object, entry: ConfigEntry) => {
    // @ts-ignore
    acc[entry.id] = entry.name;
    return acc;
  }, {});
};
export const getMinTargetingAgeByCountry = (
  state: ConfigState,
  targetedCountry: string,
) =>
  get(getById(state, targetedCountry), 'rules.minAgeTarget', TARGETING_MIN_AGE);
export const getSubdivisionCategoriesByCountry = (
  state: ConfigState,
  targetedCountry: string,
) => {
  const principalSubdivision = get(
    getById(state, targetedCountry),
    'principalSubdivision',
    'Region',
  );

  const secondarySubdivision = get(
    getById(state, targetedCountry),
    'secondarySubdivision',
    'County',
  );

  /*
    Maps the SUBDIVISION_CATEGORIES, which has shape {
      KEY: () => i18n(STRING),
      KEY: () => i18n(STRING),
      ...etc
    }
    to the same object with all the values invoked, so {
      KEY: STRING,
      KEY: STRING,
      ...etc
    }.

    This is done to ensure that the i18n function is ready by the time we try and access these strings.
  */

  const SUBDIVISION_CATEGORIES_STRINGS = Object.entries(
    SUBDIVISION_CATEGORIES,
  ).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: mapI18N(key, value, 'I18N_SUBDIVISION'),
    }),
    {},
  );

  return {
    ...SUBDIVISION_CATEGORIES_STRINGS,
    REGION: i18n.t(
      `I18N_SUBDIVISION_${principalSubdivision
        .toUpperCase()
        .replace(/\s/g, '_')}`,
      principalSubdivision,
    ),
    COUNTY: i18n.t(
      `I18N_SUBDIVISION_${secondarySubdivision
        .toUpperCase()
        .replace(/\s/g, '_')}`,
      secondarySubdivision,
    ),
  };
};

export const getMarketsWithPostalCodeSupport = (
  state: ConfigState | ConfigEntry[],
) => {
  return getCountries(state).filter(
    country => country.targetability?.supportsPostalCodes,
  );
};
