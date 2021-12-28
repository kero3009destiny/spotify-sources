import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';

import classNames from 'classnames';
import head from 'lodash/head';

import { useAppContext } from 'contexts/app-context';
import { useIsMobile } from 'utils/use-is-mobile';
import { useTranslation } from 'i18n/nexti18n';
import LOCALE_COUNTRIES from 'constants/localeCountries';
import { getCountryDefault } from 'utils/get-country-default';
import { locales } from 'i18n/config';
import { countries as enabledCountries } from 'constants/countries';
import * as Styled from './CountryField.styled';
import { countries, states } from './CountryField.data';

/**
 * CountryField Component
 * @param {number} tabIndex Attribute specifies the tab order of an element.
 * @param {string} modifier A modifier to use for style overrides.
 * @param {string} valueCountry Dropdown value for country.
 * @param {string} valueState Dropdown value for state.
 * @param {function} onChangeField Function to change Dropdowns
 * @param {function} onValidation Function to validate values
 * @param {boolean} required Whether required or not.
 * @returns {ReactElement}
 */
const CountryField = ({
  tabIndex = 0,
  modifier = '',
  valueCountry,
  valueState,
  onChangeField,
  onValidation,
  required = false,
}) => {
  const [renderCountries, setRenderCountries] = useState(false);
  const [visibleState, setVisibleState] = useState(false);
  const { t } = useTranslation();
  const [{ locale, localeNudge }] = useAppContext();
  const localeNudgeSuggestion = head(localeNudge);
  const isMobile = useIsMobile();
  const [localeCountry, setLocaleCountry] = useState(
    getCountryDefault(countries, locale),
  );
  const countryName =
    modifier === Styled.MODIFIERS.inlineForm ? 'Country' : 'country';

  const altMappingCountries = () => {
    const { altMapping: atlMappingKey } = locales.find(({ id, altMapping }) =>
      [id, ...altMapping].includes(locale),
    );
    const enabledCountriesAltMappping = enabledCountries.filter(
      ({ localeCode }) => {
        return atlMappingKey.includes(localeCode);
      },
    );
    const filteredCountries = countries.filter(({ value }) =>
      enabledCountriesAltMappping.some(
        ({ value: altValue }) => value === altValue,
      ),
    );
    const altMappingCountriesWithKey = filteredCountries.map(country => {
      const countryWithKey = { ...country };

      countryWithKey.key = `suggestion-${country.value}`;

      return countryWithKey;
    });

    return altMappingCountriesWithKey;
  };

  const onChange = e => {
    const isValid = e.currentTarget.value !== '';

    onChangeField({ target: e.currentTarget, currentTarget: e.currentTarget });
    onValidation({
      name: e.currentTarget.name,
      valid: isValid,
      message: isValid ? '' : t('formError.required'),
    });
  };

  useEffect(() => {
    const localeSelectorValue =
      sessionStorage.getItem('localeSelectorValue') || '';
    const country = getCountryDefault(countries, locale);

    if (localeSelectorValue !== '') {
      setLocaleCountry(
        country.disableAutoCountrySelection
          ? {
              ...country,
              value: localeSelectorValue,
              text: localeSelectorValue,
            }
          : country,
      );
    } else {
      setLocaleCountry(
        country.disableAutoCountrySelection ? countries[0] : country,
      );
    }
  }, [countries, locale]);

  useEffect(() => {
    if (localeCountry) {
      onChange({
        currentTarget: {
          value: localeCountry.value,
          name: countryName,
        },
      });
    }
  }, [localeCountry]);

  useEffect(() => {
    const isStateFieldVisible = valueCountry === LOCALE_COUNTRIES.UNITED_STATES;

    setVisibleState(isStateFieldVisible);
  }, [valueCountry]);

  const dropdownCountries = useMemo(() => {
    const localeNudgeCountry = getCountryDefault(
      countries,
      localeNudgeSuggestion,
    );
    const ipCountryOption = localeNudgeCountry &&
      localeNudgeCountry.value !== localeCountry.value && {
        ...localeNudgeCountry,
        key: `suggestion-${localeNudgeCountry.value}`,
      };
    const horizontalRule = !isMobile && {
      value: 'horizontal-rule',
      text: '────────────────────',
      disabled: true,
    };
    const altCountries = altMappingCountries();

    return [
      ...countries.slice(0, 1),
      ...(altCountries || {
        ...localeCountry,
        key: `suggestion-${localeCountry.value}`,
      }),
      ...(ipCountryOption ? [ipCountryOption] : []),
      ...(horizontalRule ? [horizontalRule] : []),
      ...countries.slice(1),
    ];
  }, [countries, localeNudgeSuggestion, isMobile]);

  const handleFocusCountries = () => setRenderCountries(true);

  return (
    <ThemeProvider theme={{ modifier }}>
      <Styled.Location aria-live="polite">
        <Styled.Country
          asInput
          key="country"
          aria-label={t('contactForm.country')}
          placeholder={t('contactForm.country')}
          value={valueCountry}
          name={countryName}
          options={renderCountries ? dropdownCountries : [localeCountry]}
          onChange={onChange}
          onFocus={handleFocusCountries}
          onTouchStart={handleFocusCountries}
          required={required}
          tabIndex={tabIndex}
        />
        <Styled.State
          className={classNames({ hidden: !visibleState })}
          aria-hidden={!visibleState}
          asInput
          key="state"
          aria-label={t('contactForm.state')}
          placeholder={t('contactForm.state')}
          value={valueState}
          name={modifier === Styled.MODIFIERS.inlineForm ? 'State' : 'state'}
          options={states}
          onChange={onChange}
          onBlur={onChange}
          required={required && visibleState}
          tabIndex={tabIndex}
        />
      </Styled.Location>
    </ThemeProvider>
  );
};

CountryField.propTypes = {
  /**
   * Attribute specifies the tab order of an element.
   */
  tabIndex: PropTypes.number,
  /**
   * A modifier to use for style overrides.
   */
  modifier: PropTypes.string,
  /**
   * Dropdown value for country.
   */
  valueCountry: PropTypes.string,
  /**
   * Dropdown value for state.
   */
  valueState: PropTypes.string,
  /**
   * Function to change Dropdowns
   */
  onChangeField: PropTypes.func,
  /**
   * Function to validate values
   */
  onValidation: PropTypes.func,
  /**
   * Whether required or not
   */
  required: PropTypes.bool,
};

export default CountryField;
