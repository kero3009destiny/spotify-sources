import { locales } from 'i18n/config';

const getCountryDefault = (countries, locale) => {
  const localeObj = locales.find(item => item.id === locale);

  if (!localeObj) return undefined;

  const { disableAutoCountrySelection } = localeObj;
  const countryData = countries.find(
    country => country.value === localeObj.country,
  );

  return {
    ...countryData,
    disableAutoCountrySelection,
  };
};

export default getCountryDefault;
