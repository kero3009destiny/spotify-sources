import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import i18n from 'i18next';

import { ButtonPrimary } from '@spotify-internal/adstudio-shared/lib/components/CustomEncore';
import { ButtonTertiary, Type } from '@spotify-internal/encore-web';

import { logUserAction as logUserActionAC } from 'ducks/analytics/actions';

import NoAuthenticationRequired from 'components/Redirects/NoAuthenticationRequired';
import RedirectIfAuthorizedAdAccountOnDevice from 'components/Redirects/RedirectIfAuthorizedAdAccountOnDevice';

import AccountNoticeIllustration from './Illustration';

import { routes } from 'config/routes';

import PropTypes from 'prop-types';

const LOGIN_URL = `${routes.ADSTUDIO_SIGNUP}${routes.LOGIN}`;
const LOG_IN_TEXT = (
  <div>
    <Type.h1
      element="h1"
      variant={Type.heading2}
      condensed
      className="signup-flow-primary-header"
    >
      {i18n.t(
        'I18N_YOU_LL_NEED_A_SPOTIFY_ACC',
        'You’ll need a Spotify account to get started.',
      )}
    </Type.h1>
    <Type.p condensed variant={Type.body4} className="signup-flow-subheader">
      {i18n.t(
        'I18N_THIS_WILL_BE_THE_SPOTIFY',
        'This will be the Spotify account you’ll use to log in to Ad Studio.',
      )}
    </Type.p>
  </div>
);

export const AccountNotice = ({ logUserAction }) => {
  return (
    <NoAuthenticationRequired
      redirectUrl={`${routes.ADSTUDIO_SIGNUP}${routes.NEW_SIGNUP_FORM}`}
    >
      <RedirectIfAuthorizedAdAccountOnDevice>
        <div
          className="signup-flow-account-notice"
          data-test="signup-flow-account-notice"
        >
          {/* show for desktop and tablets */}
          <span className="signup-headers desktop">{LOG_IN_TEXT}</span>
          <div className="account-notice-illustration-container">
            <div className="account-notice-illustration">
              <AccountNoticeIllustration />
            </div>
            {/* show for mobile devices */}
            <span className="signup-headers mobile">{LOG_IN_TEXT}</span>
          </div>
          <div className="account-notice-actions">
            <div className="account-notice-primary-action">
              <ButtonPrimary
                buttonSize={ButtonPrimary.md}
                component={Link}
                className="account-notice-primary-action-button"
                to={`${LOGIN_URL}?signup=true`}
                onClick={() =>
                  logUserAction({
                    label: 'click_dont_have_spotify',
                    category: 'Account Setup',
                  })
                }
                buttonLegacy
              >
                {i18n.t(
                  'I18N_CREATE_SPOTIFY_ACCOUNT',
                  'Create Spotify Account',
                )}
              </ButtonPrimary>
            </div>
            <div className="account-notice-secondary-action">
              <ButtonTertiary
                buttonSize={ButtonTertiary.sm}
                color="green"
                component={Link}
                to={LOGIN_URL}
                className="account-notice-secondary-action-button"
                onClick={() =>
                  logUserAction({
                    label: 'click_log_in_to_spotify',
                    category: 'Account Setup',
                  })
                }
                buttonLegacy
              >
                {i18n.t(
                  'I18N_LOG_IN_WITH_AN_EXISTING_A',
                  'Log In With an Existing Account',
                )}
              </ButtonTertiary>
            </div>
          </div>
        </div>
      </RedirectIfAuthorizedAdAccountOnDevice>
    </NoAuthenticationRequired>
  );
};

AccountNotice.propTypes = {
  logUserAction: PropTypes.func.isRequired,
};

export default connect(undefined, {
  logUserAction: logUserActionAC,
})(AccountNotice);
