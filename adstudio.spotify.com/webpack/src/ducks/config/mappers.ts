import { isEmpty } from 'lodash';

import {
  AdstudioConfiguration,
  Country,
  CountryCurrencySymbolPosition,
  VatValidationType,
} from '@spotify-internal/adstudio-config/proto/config_pb';

import {
  ConfigCategories,
  ConfigEntry,
  CountryEntry,
  CurrencyEntry,
} from 'ducks/config/types';

import { CURRENCY_MICRO_DIVISOR } from 'config/config';
import { DEFAULT_BUDGET_THRESHOLDS, TOTAL_BUDGETS } from 'config/payments';

export const mapCountries = (countries: Country[]): CountryEntry[] =>
  countries.map(
    (country: Country): CountryEntry => {
      const countryAsObject = country.toObject();
      return {
        activeAudio: countryAsObject.activeAudio!,
        canTargetAllCostModels: countryAsObject.canTargetAllCostModels!,
        category: ConfigCategories.COUNTRY,
        currencyCode: countryAsObject.currency?.currencyCode!,
        currencyThresholds: {
          ...DEFAULT_BUDGET_THRESHOLDS,
          invoiceBudget:
            ((countryAsObject.currencyThreshold?.maximumThreshold! || 0) /
              CURRENCY_MICRO_DIVISOR) *
            20,
          maxBudget:
            (countryAsObject.currencyThreshold?.maximumThreshold! || 0) /
            CURRENCY_MICRO_DIVISOR,
          minBudget:
            (countryAsObject.currencyThreshold?.minimumThreshold! || 0) /
            CURRENCY_MICRO_DIVISOR,
          minPodcastBudget:
            ((countryAsObject.currencyThreshold?.minimumThreshold! || 0) *
              (countryAsObject.currencyThreshold
                ?.podcastMinimumBudgetMultiplier || 0)) /
            CURRENCY_MICRO_DIVISOR,
          premiumBudget:
            (countryAsObject.currencyThreshold?.maximumThreshold! || 0) /
            CURRENCY_MICRO_DIVISOR,
          suggestedBudgets:
            countryAsObject.currencyThreshold?.budgetSuggestions?.stepsMicrosList.map(
              step => step / CURRENCY_MICRO_DIVISOR,
            ) || TOTAL_BUDGETS,
        },
        displayName: countryAsObject.name,
        // NB if we fail to establish ID then the selectors will simply ignore this entry
        id: countryAsObject.countryCode,
        marketType: countryAsObject.marketType,
        name: countryAsObject.name,
        vatValidationType:
          countryAsObject.vatValidationType || VatValidationType.UNSUPPORTED,
        vatNumberRequired: countryAsObject.vatnumberrequired,
        marketCodes: countryAsObject.marketCodeList || [
          countryAsObject.countryCode?.toLowerCase(),
        ],
        rules: countryAsObject.rules! || {},
        targetability: countryAsObject.targetability! || {},
        targetingRestrictions: countryAsObject.targetingRestrictions
          ? {
              byCountry: countryAsObject.targetingRestrictions?.byCountryList!,
              supportsPodcastBooking:
                countryAsObject.targetingRestrictions?.supportsPodcastBooking,
            }
          : {},
      };
    },
  );

export const mapCurrenciesFromCountries = (
  countries: Country[],
): CurrencyEntry[] =>
  countries
    // The config service assigns some currencies to multiple countries (as well as the Euro
    // being a true multi-national currency, we price most beta markets in USD before they
    // become GA).  To prevent a multiplicity of currency entries, we only read the currencies
    // from their "home" country.  We will treat the Euro's home country as Germany because the
    // ECB is based in Frankfurt.
    .filter((country: Country) => {
      const countryAsObject = country.toObject();
      const currencyAsObject = countryAsObject.currency;
      if (currencyAsObject && !isEmpty(currencyAsObject)) {
        const currencyCode = currencyAsObject.currencyCode;
        const countryCode = countryAsObject.countryCode;
        return (
          currencyCode.substr(0, 2) === countryCode ||
          (currencyCode === 'EUR' && countryCode === 'DE')
        );
      }
      return false;
    })
    .map((country: Country) => {
      const countryAsObject = country.toObject();
      const currencyAsObject = countryAsObject.currency;
      return {
        // NB if we fail to establish ID then the selectors will simply ignore this entry
        id: currencyAsObject?.currencyCode! || '',
        category: ConfigCategories.CURRENCY,
        code: currencyAsObject?.currencyCode! || '',
        decimals: currencyAsObject?.decimals! || 2,
        decimalSeparator: currencyAsObject?.decimalSeparator! || '.',
        space: currencyAsObject?.currencyFormattingIncludesSpace! || false,
        symbol: currencyAsObject?.currencySymbol! || '',
        symbolPosition:
          (currencyAsObject?.currencySymbolPosition! ||
            CountryCurrencySymbolPosition.START) ===
          CountryCurrencySymbolPosition.END
            ? 'end'
            : 'start',
        thousandsSeparator: currencyAsObject?.thousandsSeparator! || ',',
      };
    });

export const mapConfig = (config: AdstudioConfiguration) => {
  const entities: ConfigEntry[] = [];
  const countries = config.getCountriesList();

  const mappedCountries = mapCountries(countries);
  entities.push(...mappedCountries);

  const mappedCurrencies = mapCurrenciesFromCountries(countries);
  entities.push(...mappedCurrencies);

  return entities;
};
