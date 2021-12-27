import React, { Component } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import { compose } from 'recompose';
import styled from 'styled-components';

import { Banner } from '@spotify-internal/adstudio-tape';
import { gray80, white } from '@spotify-internal/encore-foundation';

import { trackConversionAction as trackConversionActionAC } from 'ducks/analytics/actions';
import { scrollTo as scrollToAC } from 'ducks/window/actions';
import {
  getSignupAlert,
  getSignupSuccess,
  getSignupVixPixel,
} from 'ducks/signup/selectors';

import SpotifyAdvertisingLogo from 'components/common/SpotifyAdvertisingLogo';
import GlobalAlerts, {
  AD_BLOCKER_ALERT,
  BROWSER_SUPPORT_ALERT,
} from 'components/GlobalAlerts';

import { SignupBreakpointMid, SignupBreakpointSmall } from '../constants';
import { ConversionEventType } from 'ducks/analytics/constants';
import { SPOTIFY_ADVERTISING_LOGO_TITLE } from 'config';
import { routes } from 'config/routes';

import PropTypes from 'prop-types';

const pageWidth = 1272;
const padding = 40;

const SignupContainer = styled.div`
  width: 100vw;
  position: relative;
  z-index: 1;
`;

const SignupContent = styled.div`
  max-width: ${pageWidth + padding + padding}px;
  padding: ${padding}px ${padding}px 0 ${padding}px;
  margin: 0 auto;

  @media (${SignupBreakpointSmall}) {
    padding: ${padding}px 0;
  }
`;

const SignupHeader = styled.div`
  height: 88px;
  background-color: white;
  ${props =>
    props.hasShadow
      ? 'box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);'
      : `border-bottom: 1px solid ${gray80};`}
  @media (${SignupBreakpointMid}) {
    height: 64.25px; // match marketing site
  }
`;

const HeaderContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  max-width: ${pageWidth + padding + padding}px;
  padding: 0 ${padding}px;
  height: 100%;
`;

const StyledAdvertisingLogo = styled(SpotifyAdvertisingLogo)`
  position: relative;
  top: 2px;
  border: 5px solid red;
`;

export class SignupRoot extends Component {
  componentWillReceiveProps(nextProps) {
    if (
      this.props.accountCreationSuccess !== nextProps.accountCreationSuccess
    ) {
      this.setViqPixels(nextProps.signupVixPixel);
      this.props.trackConversionAction(ConversionEventType.SIGN_UP);
    }

    if (this.props.signupAlert !== nextProps.signupAlert) {
      nextProps.scrollTo(0, 0);
    }
  }

  setViqPixels(signupVixPixel) {
    const srcs = [
      `https://t.myvisualiq.net/activity_pixel?pt=i&et=a&r=${signupVixPixel}&ago=212&ao=796&px=713&ord=${signupVixPixel}&revenue=0`,
      `https://t.myvisualiq.net/activity_pixel?pt=s&et=a&r=${signupVixPixel}&ago=212&ao=796&px=800&ord=${signupVixPixel}&revenue=0`,
    ];

    srcs.forEach(url => {
      const viqPixel = new Image();
      viqPixel.src = url;
    });
  }

  render() {
    const { children, className, logoColor, signupAlert } = this.props;

    return (
      <main role="main" className={cx('signup-flow-container', className)}>
        {/* users can sign up on mobile, and with ad blocker on */}
        <GlobalAlerts disable={[BROWSER_SUPPORT_ALERT, AD_BLOCKER_ALERT]} />
        {/* used for showing an error after it happens on the Signup form */}
        {signupAlert && <Banner colorSet="negative">{signupAlert}</Banner>}

        <SignupContainer data-test="signup-root">
          <SignupHeader hasShadow={false}>
            <HeaderContent>
              <a href={routes.MAIN} className="">
                <StyledAdvertisingLogo title={SPOTIFY_ADVERTISING_LOGO_TITLE} />
              </a>
            </HeaderContent>
          </SignupHeader>
          <SignupContent>{children}</SignupContent>
        </SignupContainer>
      </main>
    );
  }
}

SignupRoot.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  logoColor: PropTypes.string,
  signupAlert: PropTypes.string,
  accountCreationSuccess: PropTypes.bool,
  signupVixPixel: PropTypes.number,
  scrollTo: PropTypes.func.isRequired,
  trackConversionAction: PropTypes.func.isRequired,
};

SignupRoot.defaultProps = {
  logoColor: white,
};

function mapStateToProps(state) {
  return {
    signupAlert: getSignupAlert(state),
    accountCreationSuccess: getSignupSuccess(state),
    signupVixPixel: getSignupVixPixel(state),
  };
}

export default compose(
  connect(mapStateToProps, {
    scrollTo: scrollToAC,
    trackConversionAction: trackConversionActionAC,
  }),
)(SignupRoot);
