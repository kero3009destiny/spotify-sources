import React from 'react';
import PropTypes from 'prop-types';
import {Banner} from '@spotify-internal/creator-tape';
import { connect } from 'react-redux';
import { dismissWarning } from '../redux/actions/userActions';

const WarningBanner = (props) => {
  return props.userInfo.license === 'premium' ?
    <Banner variant={Banner.warning} onClose={() => {props.dismissWarning();}}>
      <strong>Warning:</strong> You are currently logged in with a Spotify premium account.
      Certomato requires a Spotify <em>free</em> account to run all tests properly.
      Log in with a free account or request access for a new account
      <a href="https://spotify.atlassian.net/servicedesk/customer/portal/3"> <u>here</u></a>.
      <button className="warningBannerLogOut" onClick={props.logout}>Log out</button>
    </Banner>
    : null;
};

const mapStateToProps = state => ({
  ...state.userInfo,
});


WarningBanner.propTypes = {
  dismissWarning: PropTypes.func.isRequired,
  userInfo: PropTypes.object,
  logout: PropTypes.func,
};

export default connect(mapStateToProps, { dismissWarning })(WarningBanner);
