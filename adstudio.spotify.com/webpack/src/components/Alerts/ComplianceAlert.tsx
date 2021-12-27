import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import i18n from 'i18next';

import { Banner } from '@spotify-internal/encore-web';

import { getAccountId } from 'ducks/account/selectors';

import { routeFragmentLiterals, routes } from 'config/routes';

interface ComplianceAlertProps {
  id: string;
}
const ComplianceAlert = (props: ComplianceAlertProps) => (
  <Banner colorSet="warning">
    {i18n.t(
      'I18N_ADS_COMPLIANCE_COMPLETE_BANNER_USER',
      'In order to book your next campaign, please enter the required information in your account.',
    )}{' '}
    <Link
      to={routes.ACCOUNT_ADDRESS.replace(
        routeFragmentLiterals.ACCOUNT_ID,
        props.id,
      )}
    >
      {i18n.t('I18N_ADS_COMPLIANCE_COMPLETE_BANNER_LINK', 'Update ad account')}
    </Link>
  </Banner>
);

export default connect(state => ({
  id: getAccountId(state),
}))(ComplianceAlert);
