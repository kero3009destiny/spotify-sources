import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { ALLOW_SCROLL } from 'constants/js-css-classes';
import { colors } from 'styles/variables';
import { countries } from 'constants/countries';
import { locales } from 'i18n/config';
import { useTranslation } from 'i18n/nexti18n';

import * as Styled from './LocaleSelector.styled';

/**
 * Populates the href data for either a supported locale (identified by its
 * id or altMapping value) or for a locale hosted elsewhere.
 * @param {object} data
 * @param {object} data.localeCode - The country code id
 * @returns {object}
 */
const getHrefLink = ({ localeCode }) => {
  const supportedLocale = locales.find(({ id, altMapping }) =>
    [id, ...altMapping].includes(localeCode),
  );

  if (supportedLocale) {
    return {
      locale: supportedLocale.id,
      href: `/${supportedLocale.id}/`, // /en-US/
    };
  }

  return {
    href: `https://www.spotifyforbrands.com/${localeCode}/`,
  };
};

/**
 * LocaleSelector component
 * @param {object} props
 * @param {object} props.className - The class name to apply style changes
 * @param {object} props.backgroundColor - The background color
 * @param {object} props.color - The text color
 * @param {Function} onClick - on click handler function
 * @returns {ReactElement}
 */
const LocaleSelector = ({
  className = null,
  backgroundColor = colors.black,
  color = colors.white,
  onClick = () => {},
}) => {
  const { t } = useTranslation();

  return (
    <Styled.Root className={className} backgroundColor={backgroundColor}>
      <Styled.Title>{t('selectCountry')}</Styled.Title>
      <Styled.Container className={ALLOW_SCROLL}>
        {countries.map(
          (
            {
              value,
              text: countryName = '',
              flag: CountryFlag = () => null,
              localeCode,
            },
            index,
          ) => {
            const { href, locale } = getHrefLink({ localeCode });
            const itemClick = useCallback(
              event => {
                event.preventDefault();
                document.cookie = `localeSelector=${locale};max-age=86400;path=/`;
                sessionStorage.setItem('localeSelectorValue', value);
                onClick({ event, country: value });
                window.open(href, '_self');
              },
              [index, value, onClick],
            );

            return (
              <Styled.CountryItem key={countryName}>
                <Styled.LocaleCta href={href} onClick={itemClick}>
                  <Styled.CountryFlag>
                    <CountryFlag />
                  </Styled.CountryFlag>
                  <Styled.CountryName color={color}>
                    {countryName}
                  </Styled.CountryName>
                </Styled.LocaleCta>
              </Styled.CountryItem>
            );
          },
        )}
      </Styled.Container>
    </Styled.Root>
  );
};

LocaleSelector.propTypes = {
  /**
   * The class name to apply style changes
   */
  className: PropTypes.string,
  /**
   * The background color
   */
  backgroundColor: PropTypes.string,
  /**
   * The text color
   */
  color: PropTypes.string,
};

export default React.memo(LocaleSelector);
