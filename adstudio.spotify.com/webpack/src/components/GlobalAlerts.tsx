import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import bowser from 'bowser';
import { branch, compose, withProps } from 'recompose';

import { Banner } from '@spotify-internal/adstudio-tape';

import { getComplianceAttempts } from 'ducks/account/selectors';
import { hasAdBlocker } from 'ducks/adBlocker/selectors';
import { getAdminAlert } from 'ducks/adminAlert/selectors';
import { getIsOnline } from 'ducks/network/selectors';
import { hasUserSeenNewFeature } from 'ducks/newFeatures/selectors';

import AdBlockerAlert from './Alerts/AdBlockerAlert';
import BrowserSupportAlert from './Alerts/BrowserSupportAlert';
import ComplianceAlert from './Alerts/ComplianceAlert';
import OfflineAlert from './Alerts/OfflineAlert';

import { ADDRESS_COLLECTION_MODAL } from 'ducks/newFeatures/constants';
import { SUPPORTED_BROWSER_VERSIONS } from 'config';

/**
 * IF YOU WANT TO ALERT TO ALL USERS:
 * 1. update our alert.json file in GCS and set the permissions to allUsers:
 *    STAGING: (to check before going live)
 *      https://console.cloud.google.com/storage/browser/adstudio-ui-alerts-staging?project=ad-selfserve.
 *    PRODUCTION:
 *      https://console.cloud.google.com/storage/browser/adstudio-ui-alerts?project=ad-selfserve.
 *    Instructions: https://ghe.spotify.net/ads/voltron-ui/blob/master/docs/global-notifications/index.md
 * 2. if GCS is down, you can set a value in the ADMIN_ALERT_OVERRIDE constant below to
 *    provide an admin alert from the code.  THIS WILL NOT BE LOCALIZED
 * If both an alert.json and the constant in code are set, the constant will win.
 */

const ADMIN_ALERT_OVERRIDE: boolean | string = false;

export const ADMIN_ALERT = 'adminAlert';
export const AD_BLOCKER_ALERT = 'adBlockerDetected';
export const OFFLINE_ALERT = 'isOffline';
export const BROWSER_SUPPORT_ALERT = 'showBrowserSupport';
export const COMPLIANCE_ALERT = 'complianceAlert';

const ALERT_TYPE_MAPPING: { [key: string]: React.ElementType } = {
  /* eslint-disable react/prop-types */
  [ADMIN_ALERT]: ({ adminAlert }: { adminAlert: string }) => (
    <Banner colorSet="warning">{adminAlert}</Banner>
  ),

  /* eslint-enable react/prop-types */
  [AD_BLOCKER_ALERT]: AdBlockerAlert,
  [OFFLINE_ALERT]: OfflineAlert,
  [BROWSER_SUPPORT_ALERT]: BrowserSupportAlert,
  [COMPLIANCE_ALERT]: ComplianceAlert,
};

export interface GlobalAlertsStateProps {
  [AD_BLOCKER_ALERT]: boolean;
  [ADMIN_ALERT]: boolean | string;
  [OFFLINE_ALERT]: boolean;
  [COMPLIANCE_ALERT]: boolean;
}

interface GlobalAlertsOwnProps {
  [BROWSER_SUPPORT_ALERT]: boolean;
  disable: Array<string | undefined>;
}

type GlobalAlertProps = GlobalAlertsStateProps & GlobalAlertsOwnProps;

export const GlobalAlerts = (props: GlobalAlertProps) => {
  return (
    <div className="global-alert-container">
      {Object.keys(ALERT_TYPE_MAPPING)
        .filter(
          (propName: string) =>
            !!props[propName as keyof GlobalAlertProps] &&
            !props.disable.includes(propName),
        )
        .map((propName: string) => {
          const AlertComponent = ALERT_TYPE_MAPPING[propName];
          return <AlertComponent key={propName} {...props} />;
        })}
    </div>
  );
};

GlobalAlerts.defaultProps = {
  [BROWSER_SUPPORT_ALERT]:
    !bowser.check(SUPPORTED_BROWSER_VERSIONS) || bowser.mobile,
  disable: [],
};

export function globalAlertsMapStateToProps(state: TSFixMe) {
  return {
    [AD_BLOCKER_ALERT]: hasAdBlocker(state),
    [ADMIN_ALERT]: getAdminAlert(state),
    [OFFLINE_ALERT]: !getIsOnline(state),
    [COMPLIANCE_ALERT]:
      hasUserSeenNewFeature(state, ADDRESS_COLLECTION_MODAL) &&
      getComplianceAttempts(state) > 0,
  };
}

export default compose<GlobalAlertProps, {}>(
  connect(globalAlertsMapStateToProps),
  // if you set ADMIN_ALERT_OVERRIDE above, use the value from it instead of the
  // value from alert.json on S3 to supply an error.
  branch(
    () => ADMIN_ALERT_OVERRIDE,
    withProps({ [ADMIN_ALERT]: ADMIN_ALERT_OVERRIDE }),
  ),
  withRouter,
)(GlobalAlerts);
