import React from 'react';
import { connect } from 'react-redux';
import i18n from 'i18next';
import get from 'lodash/get';
import moment from 'moment';
import { compose, pure } from 'recompose';

import { getAccountCountry } from 'ducks/account/selectors';
import { getExtendedCountry } from 'ducks/config/selectors';

import { DEFAULT_DATE_FORMAT, DEFAULT_TIME_FORMAT } from 'config/config';

import PropTypes from 'prop-types';

export const FORMAT_TYPES = {
  DATE: 'DATE',
  TIME: 'TIME',
  DATETIME: 'DATETIME',
};

/**
 * given a date, format the date based on the country the user's account is in.
 */
export const dateFormatter = (date: string, dateFormat: string) => {
  return date && moment(date).format(dateFormat);
};

interface FormatDateProps {
  date: string;
  dateFormat: string;
  placeholder: string;
}

export function FormatDate({ date, dateFormat, placeholder }: FormatDateProps) {
  const timestamp = dateFormatter(date, 'YYYY-MM-DD HH:mm');
  return (
    <time dateTime={timestamp} title={timestamp}>
      {dateFormatter(date, dateFormat)}
      {!date && placeholder}
    </time>
  );
}

FormatDate.propTypes = {
  date: PropTypes.string,
  dateFormat: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
};

FormatDate.defaultProps = {
  type: FORMAT_TYPES.DATE,
  placeholder: i18n.t('I18N_DATE', 'Date'),
};

function mapStateToProps(state = {}, ownProps: TSFixMe) {
  const type = ownProps.type || FormatDate.defaultProps.type;
  const accountCountry = getExtendedCountry(state, getAccountCountry(state)!);

  const formats = {
    [FORMAT_TYPES.DATE]: get(accountCountry, 'dateFormat', DEFAULT_DATE_FORMAT),
    [FORMAT_TYPES.TIME]: get(accountCountry, 'timeFormat', DEFAULT_TIME_FORMAT),
  };

  formats[FORMAT_TYPES.DATETIME] = `${formats[FORMAT_TYPES.DATE]} ${
    formats[FORMAT_TYPES.TIME]
  }`;

  return {
    dateFormat: formats[type],
  };
}

export default compose(
  connect(mapStateToProps),
  pure,
)(FormatDate as TSFixMe) as TSFixMe;
