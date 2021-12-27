import React from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';
import moment from 'moment';

import { getAccountCountry } from 'ducks/account/selectors';
import { getExtendedCountry } from 'ducks/config/selectors';
import { getSelectedLocale } from 'ducks/i18n/selectors';

import { DEFAULT_LANGUAGE } from 'config/config';

import PropTypes from 'prop-types';

export const LocalizeMoment = ({ countryCode, selectedLocale }) => {
  moment.locale(selectedLocale);
  return <div id={countryCode} />;
};

LocalizeMoment.propTypes = {
  countryCode: PropTypes.string,
  selectedLocale: PropTypes.string,
};

// TODO: I18N - When we save user's preferred language separately, use that
const mapStateToProps = state => {
  const accountCountry = getAccountCountry(state);
  const countryCode = get(
    getExtendedCountry(state, accountCountry),
    'defaultLanguage',
    DEFAULT_LANGUAGE,
  );

  const selectedLocale = getSelectedLocale(state);

  return {
    countryCode,
    selectedLocale,
  };
};

export default connect(mapStateToProps)(LocalizeMoment);
