import React, {Component} from 'react';
import { LoadingIndicator } from '@spotify-internal/encore-web';
import LandingPage from './LandingPage/LandingPage';
import Certomato from './Certomato';
import Auth from '../utils/Auth';
import { connect } from 'react-redux';
import { startCertSession, resumeCertSession, clearCertSession } from '../redux/actions/certSessionActions';
import PropTypes from 'prop-types';
import * as api from '../api/api';

/**
 * Main App, routes between:
 * Landing Page if no session is active.
 * Certomato if a session is active.
 * */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    this.props.resumeCertSession();
    return Auth.fetchAccessToken()
      .then(token => {
        this.setState({
          accessToken: token,
        });
        return api.verifyAccess(); // Will return error if no access
      })
      .then(() => {
        this.setState({
          hasAccess: true,
          isLoading: false,
        });
      })
      .catch(() => {
        this.setState({
          hasAccess: false,
          isLoading: false,
        });
      });
  }

  logout() {
    Auth.clearAccessToken();
    this.props.clearCertSession();
    this.setState({
      accessToken: null,
    });
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      window.open('https://accounts.spotify.com/us/logout/', '_new');
    } else {
      window.open('https://accounts.spotify.com/us/logout/?continue=https://certomato.spotify.com', '_self');
    }
  }

  renderBrowserErrorIfNotChrome() {
    const isChromiumBased = !!window.chrome;
    return !isChromiumBased && (<div className="errorBanner">
      <h3>This browser is not supported.</h3>
      We recommend using Google Chrome for Certomato.<br /><br />
      <h4><a href="https://www.google.com/chrome/" target="_blank"><u>Download Google Chrome</u></a></h4>
    </div>);
  }

  renderRouter() {
    if (this.state.accessToken && this.state.hasAccess) {
      return (<Certomato logout={this.logout} certSession={this.props.certSession} startCertSession={this.props.startCertSession}/>);
    } else if (this.state.isLoading) {
      return (
        <div className="fullPageLoader">
          <LoadingIndicator indicatorSize={LoadingIndicator.lg} aria-valuetext="Loading" />
        </div>
      );
    }
    return (<LandingPage loggedIn={!!this.state.accessToken} logout={this.logout}/>);
  }

  render() {
    return (
      <div>
        {this.renderBrowserErrorIfNotChrome()}
        {this.renderRouter()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.certSession,
});

App.propTypes = {
  startCertSession: PropTypes.func.isRequired,
  resumeCertSession: PropTypes.func.isRequired,
  clearCertSession: PropTypes.func.isRequired,
  certSession: PropTypes.object,
};

export default connect(mapStateToProps, { startCertSession, resumeCertSession, clearCertSession })(App);
