import React from 'react';
import { Trans } from 'react-i18next';
import { connect } from 'react-redux';
import { window } from 'global';
import i18n from 'i18next';
import styled from 'styled-components';

import { Type } from '@spotify-internal/encore-web';
import { LoadingSpinner } from '@spotify-internal/encore-web/advertising/components/LoadingSpinner';

import { getIsAuthenticated, getIsAuthorized } from 'ducks/auth/selectors';

import { EXTERNAL_AUTHENTICATE_REDIRECT, routes } from 'config/routes';

interface RedirectLayoutProps {
  isAuthenticated: boolean;
  isAuthorized: boolean;
  other: object;
}

const SECONDS_TO_REDIRECT: number = 1000 * 2;
const FAIL_SAFE: number = 1000 * 4;
const { origin } = window.location;

const LayoutRedirect: React.FunctionComponent<React.HTMLAttributes<
  HTMLDivElement
>> = ({ className }) => (
  <div className={className}>
    <Type.h1
      variant={Type.body1}
      condensed
      className="signup-flow-primary-header"
    >
      {i18n.t(
        'I18N_YOU_LL_NEED_A_SPOTIFY_ACC',
        'Taking you to Spotify to log in...',
      )}
    </Type.h1>
    <LoadingSpinner diameter="150px" />
  </div>
);

const LayoutFailSafe: React.FunctionComponent<React.HTMLAttributes<
  HTMLDivElement
>> = ({ className }) => (
  <div className={className}>
    <Type.h1
      variant={Type.body1}
      condensed
      className="signup-flow-primary-header"
    >
      <Trans i18nKey="I18N_YOU_LL_NEED_A_SPOTIFY_FAILSAFE">
        To continue to Ad Studio, first click{' '}
        <a href={`${EXTERNAL_AUTHENTICATE_REDIRECT}${origin}`}>here </a> to
        login or sign up for Spotify.
      </Trans>
    </Type.h1>
    <LoadingSpinner diameter="150px" />
  </div>
);

const LayoutRedirectStyle: React.FunctionComponent = styled(LayoutRedirect)`
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  left: 50%;
  text-align: center;
`;

const LayoutFailSafeStyle: React.FunctionComponent = styled(LayoutFailSafe)`
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  left: 50%;
  text-align: center;
`;

const CloseWindowElement: React.FunctionComponent<RedirectLayoutProps> = (
  props: RedirectLayoutProps,
) => {
  const [failSafe, setFailSafe] = React.useState(true);
  const { isAuthenticated, isAuthorized } = props;
  if (isAuthorized || isAuthenticated) {
    window.parent.postMessage({ isAuthorized, isAuthenticated }, origin);
    window.close();
  }
  React.useEffect(() => {
    setTimeout(() => {
      window.location.href = `${EXTERNAL_AUTHENTICATE_REDIRECT}${origin}${routes.AUTHENTICATED_REDIRECT}`;
      setTimeout(() => setFailSafe(false), FAIL_SAFE);
    }, SECONDS_TO_REDIRECT);
  }, []);
  return failSafe ? <LayoutRedirectStyle /> : <LayoutFailSafeStyle />;
};

function mapStateToProps(state: Object) {
  return {
    isAuthenticated: getIsAuthenticated(state),
    isAuthorized: getIsAuthorized(state),
  };
}

export default connect(mapStateToProps)(CloseWindowElement);
