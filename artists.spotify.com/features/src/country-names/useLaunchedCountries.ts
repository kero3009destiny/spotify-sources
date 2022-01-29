// ignore-string-externalization
import { createLoader, useRead } from '@spotify-internal/creator-data-loading';
import { webgateFetch } from '@mrkt/features/webgate-fetch';
import { useCollator } from '@mrkt/features/i18n';
import { useCountryNames, CountryNamesKeys } from './useCountryNames';
import { CountryObject } from './types';
import { S4X_DATA_API } from './constants';

type CountryFromResponse = {
  country: CountryNamesKeys;
};

type CountriesResponse = {
  geography: CountryFromResponse[];
};

const LaunchedCountriesLoader = createLoader(
  async (
    countryNames: ReturnType<typeof useCountryNames>,
  ): Promise<CountryObject[]> => {
    const response = await webgateFetch(
      `${S4X_DATA_API}/v1/launched-countries`,
    );
    try {
      if (!response.ok) return [];

      const data = (await response.json()) as CountriesResponse;
      const countriesFromResponse = data.geography;

      // Countries come back from this endpoints with codes only.
      // We'll need to key into the hardcoded country map we keep on the front-end to determine their names and provide both to the view.
      const countryObjects = countriesFromResponse.reduce(
        (accumulator: CountryObject[], current: CountryFromResponse) => {
          const countryCode = current.country;
          const countryName = countryNames[countryCode] || countryCode;

          accumulator.push({
            code: countryCode,
            name: countryName,
          });
          return accumulator;
        },
        [],
      );

      return countryObjects;
    } catch {
      return [];
    }
  },
  {
    cacheKeyFn: key => JSON.stringify(key),
  },
);

export const useLaunchedCountries = () => {
  const countryNames = useCountryNames();
  const launchedCountries = useRead(LaunchedCountriesLoader, countryNames);
  const collator = useCollator();
  return launchedCountries.sort(({ name: a }, { name: b }) =>
    collator.compare(a, b),
  );
};
